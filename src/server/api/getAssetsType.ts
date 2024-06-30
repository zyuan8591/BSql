import useReadRTDB from '@/composables/useReadRTDB'

export interface AssetType {
  id: string
  name: string
}

interface AssetTypeResponse {
  data: AssetType[]
}

export default () => {
  return new Promise<AssetTypeResponse>((resolve, reject) => {
    useReadRTDB<AssetType[]>('setting/assets')
      .then((res) => {
        resolve({ data: res.data })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
