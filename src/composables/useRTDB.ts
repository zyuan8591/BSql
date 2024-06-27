import { ref as dbRef } from 'firebase/database'
import { nextTick } from 'vue'
import { useDatabaseList } from 'vuefire'

import { db } from '@/server/firebase/config'

export default async function useRTDB<T>(route: string): Promise<{ data: T }> {
  const response = useDatabaseList(dbRef(db, route))

  await nextTick()
  await response.promise.value

  return { data: response.value as T }
}
