import { useEffect, useState } from 'react'

const ANON_USER_KEY = 'offtheframe_anon_user_id'
const SESSION_KEY = 'offtheframe_session_id'

function generateId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}

function getOrCreateAnonUserId() {
  let id = localStorage.getItem(ANON_USER_KEY)

  if (!id) {
    id = generateId('anon')
    localStorage.setItem(ANON_USER_KEY, id)
  }

  return id
}

function getOrCreateSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY)

  if (!id) {
    id = generateId('session')
    sessionStorage.setItem(SESSION_KEY, id)
  }

  return id
}

export function useAnalyticsIdentity() {
  const [anonUserId, setAnonUserId] = useState<string | undefined>(undefined)
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setAnonUserId(getOrCreateAnonUserId())
    setSessionId(getOrCreateSessionId())
  }, [])

  return {
    anonUserId,
    sessionId,
    isReady: anonUserId !== undefined && sessionId !== undefined,
  }
}
