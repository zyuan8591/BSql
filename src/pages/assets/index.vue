<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Progress } from '@/components/ui/progress'
import getAssetsType, { type AssetType } from '@/server/api/getAssetsType'
import getAssetsCurrency, { type Currency } from '@/server/api/getCurrencyType'
import num from '@/utils/num'

const assetsType = ref<AssetType[]>([])
const currencyType = ref<Currency[]>([])

const additionInfo = {
  createData: '建立日期'
}

const assetList = ref([
  {
    id: 1,
    name: '元大銀行',
    assetsType: '2002',
    currencyType: '1001',
    initialAmount: 100000,
    amount: 200000,
    createDate: '2021-10-01'
  },
  {
    id: 2,
    name: '國泰銀行',
    assetsType: '2002',
    currencyType: '1001',
    initialAmount: 1100000,
    amount: 300000,
    createDate: '2021-10-01'
  }
])

const data = computed(() => {
  return assetList.value.map((a) => {
    return {
      ...a,
      assetTypeStr: assetsType.value.find((t) => t.id === a.assetsType)?.name,
      currencyTypeStr: currencyType.value.find((t) => t.id === a.currencyType)?.symbol
    }
  })
})

interface CollapseArr {
  [key: string]: boolean
}
const collapseArr = ref<CollapseArr>({})

interface AssetsPercentage {
  [key: string]: number
}
const assetsPercentage = computed(() => {
  const total = assetList.value.reduce((acc, cur) => acc + cur.amount, 0)
  const result: AssetsPercentage = {}
  assetList.value.forEach((a) => {
    result[a.id] = (a.amount / total) * 100
  })
  return result
})

onMounted(async () => {
  const res = await getAssetsType()
  assetsType.value = res.data
  const res2 = await getAssetsCurrency()
  currencyType.value = res2.data
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <Collapsible v-for="a in data" :key="a.id" v-model:open="collapseArr[a.id]">
      <CollapsibleTrigger>
        <div class="mb-2 flex items-center justify-between">
          <div class="text-xl font-bold">{{ a.name }}</div>
          <div>{{ a.currencyTypeStr }} {{ num(a.amount) }}</div>
        </div>
        <Progress :model-value="assetsPercentage[a.id]" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div v-for="(i, key) in additionInfo" :key="key" class="flex justify-between">
          <div>{{ i }}</div>
          <div>{{ a.createDate }}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
