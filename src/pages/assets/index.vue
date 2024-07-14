<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
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
import getAssetsType, { type AssetType } from '@/server/api/getAssetsType'
import getAssetsCurrency, { type Currency } from '@/server/api/getCurrencyType'
import useQueryAssetsList from '@/server/api/useQueryAssetsList'
import { useAuthStore } from '@/store/auth'
import num from '@/utils/num'

const assetsType = ref<AssetType[]>([])
const currencyType = ref<Currency[]>([])

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

const additionInfo = {
  createDate: '建立日期'
}

const { data } = useQueryAssetsList({
  userId: userInfo.value.userId
})

const collapses = ref([])

const totalAmount = computed(() => {
  return data.value.reduce((acc, cur) => acc + cur.amount, 0)
})

function getCurrencySymbol(type: string) {
  const currency = currencyType.value.find((c) => c.id === type)
  return currency?.symbol || ''
}
// function getAssetsTypeName(type: string) {
//   const assets = assetsType.value.find((a) => a.id === type)
//   return assets?.name || ''
// }

onMounted(async () => {
  try {
    const res = await getAssetsType()
    assetsType.value = res.data
    const res2 = await getAssetsCurrency()
    currencyType.value = res2.data
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <Collapsible v-for="(a, idx) in data" :key="a.id" v-model:open="collapses[idx]">
      <CollapsibleTrigger>
        <!-- <div>{{ getAssetsTypeName(a.assetsType) }}</div> -->
        <div class="mb-2 flex items-center justify-between">
          <div class="font-bold">{{ a.name }}</div>
          <div>{{ getCurrencySymbol(a.currencyType) }} {{ num(a.amount) }}</div>
        </div>
        <Progress :model-value="(a.amount / totalAmount) * 100" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div v-for="(val, key) in additionInfo" :key="key" class="flex justify-between">
          <div v-text="val" />
          <div v-text="a[key]" />
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
