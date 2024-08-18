<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Progress } from '@/components/ui/progress'
import Create from '@/pages/asset/Create.vue'
import queryAssetsList from '@/server/api/queryAssetsList'
import queryAssetsType from '@/server/api/queryAssetsType'
import queryCurrencyType from '@/server/api/queryCurrencyType'
import { useAuthStore } from '@/store/auth'
import num from '@/utils/num'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

const isCreating = ref(false)

const additionInfo = {
  createDate: '建立日期'
}

const { data, refetch } = queryAssetsList({
  userId: userInfo.value.userId
})

const { data: assetsType } = queryAssetsType()
const { data: currencyType } = queryCurrencyType()

const collapses = ref([])

const totalAmount = computed(() => {
  return data.value?.reduce((acc, cur) => acc + cur.amount, 0) || 0
})

function getCurrencySymbol(type: string) {
  const currency = currencyType.value?.find((c) => c.id === type)
  return currency?.symbol || ''
}

function getAssetsTypeName(type: string) {
  const assets = assetsType.value?.find((a) => a.id === type)
  return assets?.name || ''
}

const createHandler = async () => {
  await refetch()
  isCreating.value = false
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <Collapsible v-for="(a, idx) in data" :key="a.id" v-model:open="collapses[idx]">
      <CollapsibleTrigger>
        <div>{{ getAssetsTypeName(a.assetsType) }}</div>
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

    <Drawer v-model:open="isCreating">
      <DrawerTrigger
        class="center fixed bottom-8 left-1/2 size-12 -translate-x-1/2 rounded-full border border-border"
      >
        <PlusIcon class="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>建立新帳戶資產</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Create
            :id="+data[data?.length - 1]?.id + 1"
            :assetsType="assetsType"
            :currencyType="currencyType"
            @submit="createHandler"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
