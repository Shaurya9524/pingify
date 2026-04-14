"use client"

import { useUser } from "@/lib/hooks/useUser"

interface AuthRouteProps extends React.HTMLAttributes<HTMLDivElement> {
  UnauthenticatedFallback?: React.ComponentType,
  LoadingComponent?: React.ComponentType
}

export default function AuthRoute({
  UnauthenticatedFallback,
  LoadingComponent,
  children,
  ...props
}: AuthRouteProps) {
  const { user, loading } = useUser()

  return (
    <div {...props}>{
      loading
        ? LoadingComponent ? <LoadingComponent /> : <div>Loading...</div>
        : user
          ? <>{children}</>
          : UnauthenticatedFallback ? <UnauthenticatedFallback /> : <div>You are not authorized to access this page</div>
    }</div>
  )
}
