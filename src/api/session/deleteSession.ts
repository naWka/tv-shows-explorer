import { requestJson } from '@api/client'

export async function deleteSession(): Promise<void> {
  await requestJson('/session', { method: 'DELETE' })
}
