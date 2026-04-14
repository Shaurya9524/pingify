export type RedditPostData = {
  subreddit: string,
  postId: string,
  title: string,
  author: string,
  createdAt: Date,
  url: string
}

export interface Subreddit {
  id: string,                  // "fzfujx"
  name: string,                // "ShadowDen"
  displayName: string,         // "ShadowDen"
  displayNamePrefixed: string, // "r/ShadowDen"
  title: string,               // "ShadowDen"
  description: string,         // Plain text description
  publicDescription: string,   // Short description
  subscribers: number,         // 1
  over18: boolean,             // NSFW flag
  url: string,                 // "/r/ShadowDen/"
  createdUtc: number           // timestamp
}
