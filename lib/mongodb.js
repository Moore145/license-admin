import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
let client
let clientPromise

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a new client for every connection
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
