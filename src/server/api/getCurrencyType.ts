import useReadRTDB from '@/composables/useReadRTDB'

export interface Currency {
  id: string
  name: string
  symbol: string
  value: string
}

interface CurrencyResponse {
  data: Currency[]
}

export default () => {
  return new Promise<CurrencyResponse>((resolve, reject) => {
    useReadRTDB<Currency[]>('setting/currency')
      .then((res) => {
        resolve({ data: res.data })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
