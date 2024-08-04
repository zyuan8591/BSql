import { useMutation } from '@tanstack/vue-query'

import useWriteRTDB from '@/composables/useWriteRTDB'

interface Asset {
  id: string
  name: string
  userId: string
  assetsType: string
  currencyType: string
  amount: number
  createDate: string
}

function postAsset(asset: Asset) {
  return new Promise<void>((resolve, reject) => {
    useWriteRTDB(`assets/${asset.userId}/${asset.id}`, asset)
      .then(() => {
        resolve()
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default function mutateAsset(asset: Asset) {
  return useMutation({
    mutationFn: () => postAsset(asset)
  })
}
