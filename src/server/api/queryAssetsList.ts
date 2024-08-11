import { useQuery } from '@tanstack/vue-query'

import useReadRTDB from '@/composables/useReadRTDB'

interface Asset {
  id: string
  name: string
  assetsType: string
  currencyType: string
  amount: number
  createDate: string
  history: {
    [key: string]: number[]
  }
}

function getAssetsList(userId: string) {
  return new Promise<Asset[]>((resolve, reject) => {
    useReadRTDB<Asset[]>(`assets/${userId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

interface QueryAssetsList {
  userId: string
}

export default function queryAssetsList(payload: QueryAssetsList) {
  const { userId } = payload
  return useQuery({
    queryKey: ['QUERY_ASSETS_LIST', userId],
    queryFn: () => getAssetsList(userId),
    initialData: []
  })
}
