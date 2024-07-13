<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Progress } from '@/components/ui/progress'
import getAssetsList, { type Asset } from '@/server/api/getAssetsList'
import getAssetsType, { type AssetType } from '@/server/api/getAssetsType'
import getAssetsCurrency, { type Currency } from '@/server/api/getCurrencyType'
import { useAuthStore } from '@/store/auth'
import num from '@/utils/num'

const assetsType = ref<AssetType[]>([])
const currencyType = ref<Currency[]>([])

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

const additionInfo = {
  createDate: '建立日期'
}

interface AssetData extends Asset {
  assetTypeStr: string
  currencyTypeStr: string
  isOpen: boolean
  percentage: number
}
const data = ref<AssetData[]>([])

const setData = async () => {
  try {
    const res = await getAssetsList(userInfo.value.userId)
    const totalAmount = res.reduce((acc, cur) => acc + cur.amount, 0)
    data.value = res.map((a) => {
      return {
        ...a,
        assetTypeStr: assetsType.value.find((t) => t.id === a.assetType)?.name || '',
        currencyTypeStr: currencyType.value.find((t) => t.id === a.currencyType)?.symbol || '',
        isOpen: false,
        percentage: (a.amount / totalAmount) * 100 || 0
      }
    })
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    const res = await getAssetsType()
    assetsType.value = res.data
    const res2 = await getAssetsCurrency()
    currencyType.value = res2.data
  } catch (e) {
    console.error(e)
  }
  await setData()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <Collapsible v-for="a in data" :key="a.id" v-model:open="a.isOpen">
      <CollapsibleTrigger>
        <div class="mb-2 flex items-center justify-between">
          <div class="font-bold">{{ a.name }}</div>
          <div>{{ a.currencyTypeStr }} {{ num(a.amount) }}</div>
        </div>
        <Progress :model-value="a.percentage" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div v-for="(i, key) in additionInfo" :key="key" class="flex justify-between">
          <div>{{ i }}</div>
          <div>{{ a[key] }}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <Drawer>
      <DrawerTrigger
        class="center fixed bottom-8 left-1/2 size-12 -translate-x-1/2 rounded-full border border-border"
      >
        <PlusIcon class="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>建立新帳戶資產</DrawerTitle>
          <DrawerDescription>$＿$</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>送出</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
