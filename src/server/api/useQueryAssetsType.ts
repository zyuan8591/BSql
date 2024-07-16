import { useQuery } from '@tanstack/vue-query'

import useReadRTDB from '@/composables/useReadRTDB'

interface AssetType {
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

export default function useQueryAssetsType() {
  return useQuery({
    queryKey: ['QUERY_ASSETS_TYPE'],
    queryFn: getAssetsType,
    staleTime: 1000 * 60 * 60 * 24 // 24 hrs
  })
}
