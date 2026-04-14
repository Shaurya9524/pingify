import { XUser } from "@/lib/types/x"
import { xApi } from "@/config/constants"
import { GetXUserReq, GetXUserRes } from "@/lib/types/api"

const bearerToken = process.env.X_BEARER_TOKEN

export async function POST(req: Request) {
  const { username } = await req.json() as GetXUserReq
  const url = `${xApi}/users/by/username/${username}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  })

  if (!res.ok) {
    const response: GetXUserRes = { error: "An error occured while fetching the user" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const data = await res.json()

  if (!data || !data.data.id) {
    const response: GetXUserRes = { error: "Invalid X user" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const info = data.data
  const xUser: XUser = {
    username,
    name: info.name,
    userId: info.id
  }

  const response: GetXUserRes = { xUser }
  return new Response(JSON.stringify(response), { status: 200 })
}
