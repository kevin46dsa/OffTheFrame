import type { AnalyticsTrackingEvent, AnalyticsIdentity } from '../types'

let identity: AnalyticsIdentity | undefined = undefined

export function setAnalyticsIdentity(
  anonUserId: string,
  sessionId: string
) {
  identity = { anonUserId, sessionId }
}


export function trackEvent(
  event: Omit<AnalyticsTrackingEvent, 'identity' | 'timestamp'>
) {
  if (!identity) {
    console.warn('[Analytics] Identity not initialized')
    return
  }

  const fullEvent: AnalyticsTrackingEvent = {
    ...event,
    anonUserId: identity.anonUserId,
    sessionId: identity.sessionId,
    timestamp: Date.now(),
  }

  console.log('[Analytics Event]', fullEvent)

  // later:
  // fetch('/events', { method: 'POST', body: JSON.stringify(fullEvent) })
}
