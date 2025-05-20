// pages/api/validate-license.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { licenseKey, hardwareId } = req.body;

  if (!licenseKey || !hardwareId) {
    return res.status(400).json({ error: 'License key and hardware ID are required' });
  }

  const license = await prisma.license.findUnique({ where: { key: licenseKey } });

  if (!license) return res.status(404).json({ error: 'License not found' });

  if (license.isRevoked) return res.status(403).json({ error: 'License has been revoked' });

  if (license.hardwareId && license.hardwareId !== hardwareId) {
    return res.status(403).json({ error: 'This license is already bound to another device' });
  }

  // Bind HWID if not already set
  if (!license.hardwareId) {
    await prisma.license.update({
      where: { key: licenseKey },
      data: {
        hardwareId,
        usageCount: { increment: 1 },
        lastUsed: new Date(),
      },
    });
  } else {
    // Just update usage
    await prisma.license.update({
      where: { key: licenseKey },
      data: {
        usageCount: { increment: 1 },
        lastUsed: new Date(),
      },
    });
  }

  res.status(200).json({ success: true, message: 'License valid' });
}
