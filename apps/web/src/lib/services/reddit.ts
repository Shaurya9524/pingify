import { GetSubredditRes } from "../types/api"

export async function getSubreddit(subredditName: string): Promise<GetSubredditRes | null> {
  const res = await fetch("/api/reddit/subreddit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subredditName })
  })

  const data: GetSubredditRes = await res.json()
  return data
}
