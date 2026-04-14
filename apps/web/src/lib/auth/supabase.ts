import { SaveTokenReq } from "../types/api"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "INITIAL_SESSION" && session) {
    const { user, provider_token, provider_refresh_token } = session
    const userId = user.user_metadata.provider_id
    if (!provider_token || !provider_refresh_token) return

    const postData: SaveTokenReq = {
      userId,
      accessToken: provider_token
    }

    await fetch("/api/token/save", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" }
    })
  }
})
