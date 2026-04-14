import { redditUrl } from "@/config/constants"
import { Subreddit } from "@/lib/types/reddit"
import { GetSubredditReq, GetSubredditRes } from "@/lib/types/api"

export async function POST(req: Request) {
  const { subredditName } = await req.json() as GetSubredditReq
  const url = `${redditUrl}/r/${subredditName}/about.json`
  const res = await fetch(url)

  if (!res.ok) {
    const response: GetSubredditRes = { error: "An error occured while fetching the subreddit" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const data = await res.json()

  if (!data || !data.data.id) {
    const response: GetSubredditRes = { error: "Invalid subreddit" }
    return new Response(JSON.stringify(response), { status: 200 })
  }

  const info = data.data
  const subreddit: Subreddit = {
    id: info.id,
    name: info.display_name,
    displayName: info.display_name,
    displayNamePrefixed: info.display_name_prefixed,
    title: info.title,
    description: info.description ?? "",
    publicDescription: info.public_description ?? "",
    subscribers: info.subscribers,
    over18: info.over18,
    url: info.url,
    createdUtc: info.created_utc
  }

  const response: GetSubredditRes = { subreddit }
  return new Response(JSON.stringify(response), { status: 200 })
}
