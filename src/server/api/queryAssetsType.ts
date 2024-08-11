import { useQuery } from '@tanstack/vue-query'

import useReadRTDB from '@/composables/useReadRTDB'

export interface AssetType {
  id: string
  name: string
}

function getAssetsType() {
  return new Promise<AssetType[]>((resolve, reject) => {
    useReadRTDB<AssetType[]>('setting/assets')
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default function queryAssetsType() {
  return useQuery({
    queryKey: ['QUERY_ASSETS_TYPE'],
    queryFn: getAssetsType,
    initialData: []
  })
}
