import { ref as dbRef } from 'firebase/database'
import { useDatabaseList } from 'vuefire'

import { db } from '@/server/firebase/config'

export default async function useReadRTDB<T>(route: string): Promise<{ data: T }> {
  const response = useDatabaseList(dbRef(db, route))

  await response.promise.value

  return { data: response.value as T }
}
