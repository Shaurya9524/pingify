"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { socialColors } from "@/config/palette"
import { getChannel } from "@/lib/utils/channel"
import { useAlertContext } from "@/contexts/Alert"
import { unsubscribe } from "@/database/utils/unsubscribe"
import { updateSubscription } from "@/database/utils/subscription"
import { SubscriptionDocument } from "@/database/types/subscription"
import { BellIcon, CalendarIcon, DeleteIcon, EditIcon, HashtagIcon, integrationIcons, PauseIcon, ResumeIcon } from "./Icons"
import styles from "@/styles/ui/subscriptionCard.module.css"
import animationStyles from "@/styles/ui/animations.module.css"

const pulsingLine = (
  <div
    className={animationStyles.pulse}
    style={{ height: "1rem", width: "10rem", backgroundColor: "var(--color-secondary-alt)", borderRadius: 5 }}
  />
)

export function SubscriptionCard({ subscription, onDeleted }: { subscription: SubscriptionDocument, onDeleted: (id: string) => void }) {
  const { setAlert } = useAlertContext()
  const [subscriptionError, setSubscriptionError] = useState("")
  const [notificationChannelName, setNotificationChannelName] = useState("")
  const { integration, notificationChannelId, socialId, uploadMessage, status, createdAt, _id } = subscription
  const docId = _id as unknown as string
  const [currStatus, setCurrStatus] = useState(status)
  const isActive = currStatus === "Active"
  const IntegrationIcon = integrationIcons[integration]
  const readableTime = createdAt ? (new Date(createdAt)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : "Unable to load data"

  useEffect(() => {
    async function getNotificationChannel() {
      const { channel, error } = await getChannel(notificationChannelId)

      if (channel) {
        setNotificationChannelName(channel.name)
      }

      if (error === "Not Found") {
        setSubscriptionError("The channel associated with this subscription was not found. It may have been deleted or the bot may have lost access to it.")
      } else if (error) {
        setSubscriptionError("An error occurred while fetching the notification channel. Please try again later.")
      }
    }

    getNotificationChannel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleEdit() {
    setAlert({ message: "This feature is under development" })
  }

  async function handleStatus() {
    const { error } = await updateSubscription(docId, { status: isActive ? "Paused" : "Active" })
    setAlert({ message: "Updating subscription" })

    if (error) {
      setAlert({ message: error, type: "danger" })
      return
    }

    setCurrStatus(isActive ? "Paused" : "Active")
    setAlert({ message: isActive ? "Subscription paused" : "Subscription resumed" })
  }

  async function handleDelete() {
    const { error, message } = await unsubscribe(docId)
    setAlert({ message: message, type: error ? "danger" : "success" })
    if (!error) onDeleted(docId)
  }

  return (
    <div className={styles.subscriptionCard}>
      <div style={{ height: 4, width: "100%", backgroundColor: socialColors[integration].color }} />
      <Image src={IntegrationIcon} alt="" className={styles.integrationWatermark} />

      <div className={styles.header}>
        <div className={styles.pulseWrap}>
          <div className={styles.pulseBadge} data-error={!!subscriptionError} />
          <div className={styles.tooltip}>
            {subscriptionError || uploadMessage}
          </div>
        </div>
        <Image src={IntegrationIcon} alt={integration[0]} width={50} height={50} priority />
        <div className={styles.ellipsisContainer}>
          <div className={`${styles.socialName} ${styles.ellipsisContent}`}>{socialId}</div>
          <div className={styles.integrationSub}>{integration} Notification</div>
        </div>
      </div>

      <div className={styles.metaList}>
        <div className={styles.metaRow}>
          <CalendarIcon size={30} className={`${styles.metaIcon} ${styles.calendarIcon}`} />
          <div>
            <div className={styles.metaLabel}>CREATED</div>
            <div className={styles.metaValue}>{readableTime}</div>
          </div>
        </div>

        <div className={styles.metaRow}>
          <HashtagIcon size={30} className={`${styles.metaIcon} ${styles.hashtagIcon}`} />
          <div className={styles.ellipsisContainer}>
            <div className={styles.metaLabel}>CHANNEL</div>
            <div className={`${styles.metaValue} ${styles.ellipsisContent}`}>
              {notificationChannelName ? `#${notificationChannelName}` : pulsingLine}
            </div>
          </div>
        </div>

        <div className={styles.metaRow}>
          <BellIcon size={30} className={`${styles.metaIcon} ${styles.bellIcon}`} />
          <div>
            <div className={styles.metaLabel}>STATUS</div>
            <div className={styles.metaValue} style={{ color: `var(--color-${isActive ? "green" : "red"})` }}>{currStatus}</div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.actions}>
        <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={handleEdit}>
          <EditIcon size={12} />
          <span>Edit</span>
        </button>
        <button className={`${styles.actionBtn} ${isActive ? styles.pauseBtn : styles.resumeBtn}`} onClick={handleStatus}>{
          isActive ? <>
            <PauseIcon size={12} />
            <span>Pause</span>
          </> : <>
            <ResumeIcon size={12} />
            <span>Resume</span>
          </>
        }</button>
        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={handleDelete}>
          <DeleteIcon size={12} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export function SubscriptionCardSkeleton() {
  return (
    <div className={styles.subscriptionCard}>
      <div style={{ height: 4, width: "100%", backgroundColor: "var(--color-secondary)" }} />

      <div className={styles.header}>
        <div className={styles.pulseWrap}>
          <div className={styles.pulseBadge} />
          <div className={styles.tooltip}>
            Loading...
          </div>
        </div>
        <div style={{ backgroundColor: "var(--color-secondary-alt)", width: 50, height: 50, borderRadius: 10 }} className={animationStyles.pulse} />
        <div className={styles.ellipsisContainer}>
          <div
            className={animationStyles.pulse}
            style={{ height: "1.2rem", width: "12rem", backgroundColor: "var(--color-secondary-alt)", borderRadius: 5 }}
          />
          <div className={styles.integrationSub}>Social Notification</div>
        </div>
      </div>

      <div className={styles.metaList}>
        <div className={styles.metaRow}>
          <CalendarIcon size={30} className={`${styles.metaIcon} ${styles.calendarIcon}`} />
          <div>
            <div className={styles.metaLabel}>CREATED</div>
            {pulsingLine}
          </div>
        </div>

        <div className={styles.metaRow}>
          <HashtagIcon size={30} className={`${styles.metaIcon} ${styles.hashtagIcon}`} />
          <div className={styles.ellipsisContainer}>
            <div className={styles.metaLabel}>CHANNEL</div>
            {pulsingLine}
          </div>
        </div>

        <div className={styles.metaRow}>
          <BellIcon size={30} className={`${styles.metaIcon} ${styles.bellIcon}`} />
          <div>
            <div className={styles.metaLabel}>STATUS</div>
            {pulsingLine}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.actions}>
        <button className={`${styles.actionBtn} ${styles.editBtn} ${animationStyles.pulse}`}>
          <EditIcon size={12} />
          <span>Edit</span>
        </button>
        <button className={`${styles.actionBtn} ${styles.pauseBtn} ${animationStyles.pulse}`}>
          <PauseIcon size={12} />
          <span>Pause</span>
        </button>
        <button className={`${styles.actionBtn} ${styles.deleteBtn} ${animationStyles.pulse}`}>
          <DeleteIcon size={12} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}
