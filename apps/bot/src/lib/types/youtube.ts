export type YouTubeVideoData = {
  channelName: string,
  videoId: string,
  title: string,
  publishedAt: Date
}

type YouTubeThumbnail = {
  url: string,
  width: number,
  height: number
}

export interface YouTubeChannel {
  title: string,
  description: string,
  customUrl: string,
  publishedAt: Date,
  thumbnails: Record<string, YouTubeThumbnail>
}
