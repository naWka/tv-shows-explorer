import { requestJson } from '@api/client'
import type { Session } from '@contract/session'

export async function postSession(email: string): Promise<Session> {
  return (await requestJson('/session', { method: 'POST', body: { email } })) as Session
}
