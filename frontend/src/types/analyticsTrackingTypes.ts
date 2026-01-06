export type AnalyticsTrackingEvent = {
    event: string
    anonUserId?: string
    sessionId?: string
    timestamp?: number
    page?: string
    // TODO: Update this to be a more specific type
    properties?: Record<string, unknown>
  }


  export type AnalyticsIdentity = {
    anonUserId: string
    sessionId: string
  }