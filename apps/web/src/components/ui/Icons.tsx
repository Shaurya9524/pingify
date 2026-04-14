import Image from "next/image"
import { Integration } from "@/lib/types/integration"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

import XIcon from "@/assets/icons/x.svg"
import KickIcon from "@/assets/icons/kick.svg"
import TrovoIcon from "@/assets/icons/trovo.svg"
import RedditIcon from "@/assets/icons/reddit.svg"
import TwitchIcon from "@/assets/icons/twitch.svg"
import OdyseeIcon from "@/assets/icons/odysee.svg"
import YouTubeIcon from "@/assets/icons/youtube.svg"
import BlueSkyIcon from "@/assets/icons/bluesky.svg"

export const integrationIcons: Record<Integration, string | StaticImport> = {
  YouTube: YouTubeIcon,
  Reddit: RedditIcon,
  Twitch: TwitchIcon,
  Kick: KickIcon,
  X: XIcon,
  Bluesky: BlueSkyIcon,
  Odysee: OdyseeIcon,
  Trovo: TrovoIcon
}

// social icons
export { SiKick as KickIcon } from "react-icons/si"
export { FaRedditAlien as RedditIcon, FaXTwitter as XIcon } from "react-icons/fa6"
export { FaYoutube as YoutubeIcon, FaTwitch as TwitchIcon, FaDiscord as DiscordIcon } from "react-icons/fa"

// general icons
export { HiHashtag as HashtagIcon } from "react-icons/hi"
export { FiCalendar as CalendarIcon } from "react-icons/fi"
export { IoIosArrowRoundBack as BackIcon } from "react-icons/io"
export { PiCrownSimpleFill as PremiumIcon } from "react-icons/pi"
export { IoMenu as HamburgerMenuIcon, IoClose as CloseIcon } from "react-icons/io5"
export { FaCaretDown as DropdownCaretIcon, FaPause as PauseIcon } from "react-icons/fa6"
export { FaRegBell as BellIcon, FaEdit as EditIcon, FaPlay as ResumeIcon } from "react-icons/fa"
export { RiDashboardHorizontalFill as DashboardIcon, RiGlobalLine as PlatformIcon } from "react-icons/ri"
export { MdOutlineDarkMode as DarkModeIcon, MdOutlineLightMode as LightModeIcon, MdDelete as DeleteIcon } from "react-icons/md"

// alert icons
export { GoCheckCircle as SuccessIcon } from "react-icons/go"
export { PiInfoDuotone as InfoIcon, PiWarningOctagonDuotone as DangerIcon, PiWarningDuotone as WarningIcon } from "react-icons/pi"

export function OnlineIcon({ size = 26 }: { size?: number }) {
  return <div style={{ backgroundColor: "var(--color-green)", width: size, height: size, borderRadius: "50%" }} />
}

// colored social icons
export function IntegrationIcon({ integration, size = 30 }: { integration: Integration, size?: number }) {
  return <Image src={integrationIcons[integration]} alt={integration} height={size} width={size} style={{ borderRadius: 5 }} />
}
