import { connect, Mongoose } from "mongoose"

const uri = process.env.MONGODB_URI as string

if (!uri) {
  throw new Error("MONGODB_URI environment variable not found")
}

interface MongooseCache {
  connection: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache || { connection: null, promise: null }
global.mongooseCache = cached

export async function connectDb(): Promise<Mongoose> {
  if (cached.connection) {
    return cached.connection
  }

  if (!cached.promise) {
    cached.promise = connect(uri, {
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 5000,
    })
  }

  try {
    cached.connection = await cached.promise

    if (process.env.NODE_ENV === "development") {
      console.log("MongoDB Connected")
    }
  } catch (err) {
    cached.promise = null
    const { message } = err as Error
    console.error("MongoDB Connection Error:", message)
    throw err
  }

  return cached.connection
}
