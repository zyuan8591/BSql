import { useMutation } from '@tanstack/vue-query'

import useWriteRTDB from '@/composables/useWriteRTDB'

interface Asset {
  name: string
  assetsType: string
  currencyType: string
  amount: number
  createDate: string
}

interface AssetPayload {
  id: string
  userId: string
  data: Asset
}

function postAsset(asset: AssetPayload) {
  return new Promise<void>((resolve, reject) => {
    useWriteRTDB(`assets/${asset.userId}/${asset.id}`, asset.data)
      .then(() => {
        resolve()
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default function mutateAsset() {
  return useMutation({
    mutationFn: (asset: AssetPayload) => postAsset(asset)
  })
}
