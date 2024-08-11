import { useQuery } from '@tanstack/vue-query'

import useReadRTDB from '@/composables/useReadRTDB'

export interface CurrencyType {
  id: string
  name: string
  symbol: string
  value: string
}

function getCurrencyType() {
  return new Promise<CurrencyType[]>((resolve, reject) => {
    useReadRTDB<CurrencyType[]>('setting/currency')
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default function queryCurrencyType() {
  return useQuery({
    queryKey: ['QUERY_CURRENCY_TYPE'],
    queryFn: getCurrencyType,
    initialData: []
  })
}
