import { ref as dbRef, set } from 'firebase/database'

import { db } from '@/server/firebase/config'

export default function useWriteRTDB(route: string, payload?: any) {
  return new Promise((resolve, reject) => {
    try {
      set(dbRef(db, route), payload)
      resolve('success')
    } catch (error) {
      reject(error)
    }
  })
}
