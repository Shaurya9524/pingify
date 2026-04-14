"use client"

import { useEffect, useState } from "react"
import { supabase } from "../auth/supabase"
import { User } from "@supabase/supabase-js"

export function useUser() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        const { error: refreshSessionError } = await supabase.auth.refreshSession()

        if (refreshSessionError) {
          setErrorMessage(refreshSessionError.message)
          setLoading(false)
          return
        }
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      setLoading(false)

      if (userError) {
        setErrorMessage(userError.message)
        return
      }

      if (user) setUser(user)
    }

    getUser()

    supabase.auth.onAuthStateChange((event) => {
      setTimeout(async () => {
        if (event === "SIGNED_OUT") {
          setUser(undefined)
        }
      }, 0)
    })
  }, [])

  return { user, loading, errorMessage }
}
