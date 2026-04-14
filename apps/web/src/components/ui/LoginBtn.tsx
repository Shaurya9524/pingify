import { signInWithDiscord } from "@/lib/auth/discord"
import styles from "@/styles/ui/loginBtn.module.css"

export default function LoginBtn() {
  return (
    <div className={styles.loginBtn} onClick={signInWithDiscord}>
      Login
    </div>
  )
}
