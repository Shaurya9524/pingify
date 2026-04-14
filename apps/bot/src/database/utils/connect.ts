import { connect } from "mongoose"
import { log } from "../../lib/utils/console"

const uri = process.env.MONGODB_URI || ""

export async function connectDb() {
  try {
    await connect(uri, {
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 5000
    })

    log({ type: "success" }, "MongoDB connected")
  } catch (err) {
    const { message } = err as Error
    log({ type: "error", label: "MongoDB Connection Error" }, message)
  }
}
