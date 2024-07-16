import { useQuery } from '@tanstack/vue-query'

import useReadRTDB from '@/composables/useReadRTDB'

interface Currency {
  id: string
  name: string
  symbol: string
  value: string
}

function getCurrencyType() {
  return new Promise<Currency[]>((resolve, reject) => {
    useReadRTDB<Currency[]>('setting/currency')
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default function useQueryCurrencyType() {
  return useQuery({
    queryKey: ['QUERY_CURRENCY'],
    queryFn: () => getCurrencyType(),
    staleTime: 1000 * 60 * 60 * 24 // 24 hrs
  })
}
