import { worker } from "../utils/wokrer"
import { PostData } from "../types/woker"
import { TypedClient } from "../types/client"
import { youtubeApi } from "../../config/constants"
import { youtubeVideoLink } from "../utils/youtube"
import { log } from "../utils/console"

const apiKey = process.env.YOUTUBE_API_KEY

export async function youtubeWorker(client: TypedClient) {
  if (!apiKey) {
    log({ type: "error", label: "ENV missing" }, "YouTube api key missing")
    return
  }

  return worker(client, "YouTube", getLatestYouTubeVideo)
}

async function getLatestYouTubeVideo(channelId: string) {
  const playlistId = await getChannelUploadsPlaylistId(channelId)
  const latestVideo = playlistId ? await getLatestVideoDataFromPlaylist(playlistId) : null
  return latestVideo
}

async function getChannelUploadsPlaylistId(channelId: string): Promise<string | null> {
  const url = `${youtubeApi}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  const res = await fetch(url)

  if (!res.ok) return null

  const data = await res.json()
  const uploadsPlaylistId: string = data.items?.[0].contentDetails?.relatedPlaylists?.uploads
  return uploadsPlaylistId || null
}

async function getLatestVideoDataFromPlaylist(playlistId: string): Promise<PostData | null> {
  const url = `${youtubeApi}/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  const postInfo = data.items?.[0]?.snippet
  if (!postInfo) return null

  return {
    socialName: postInfo.channelTitle,
    postId: postInfo.resourceId.videoId,
    postTitle: postInfo.title,
    publishedAt: postInfo.publishedAt,
    url: youtubeVideoLink(postInfo.resourceId.videoId as string)
  }
}
