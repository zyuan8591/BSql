import useReadRTDB from '@/composables/useReadRTDB'

export interface Asset {
  id: string
  name: string
  assetType: string
  currencyType: string
  amount: number
  createDate: string
  history: {
    [key: string]: number[]
  }
}

export default (userId: string) => {
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
