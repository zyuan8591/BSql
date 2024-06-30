<script setup lang="ts">
import { onMounted, ref } from 'vue'

import getAssetsType, { type AssetType } from '@/server/api/getAssetsType'
import getAssetsCurrency, { type Currency } from '@/server/api/getCurrencyType'

const assetsType = ref<AssetType[]>([])
const currencyType = ref<Currency[]>([])

onMounted(async () => {
  const res = await getAssetsType()
  assetsType.value = res.data
  const res2 = await getAssetsCurrency()
  currencyType.value = res2.data
})
</script>

<template>
  <div v-for="a in assetsType" :key="a.id">
    <div>{{ a.id }}</div>
    <div>{{ a.name }}</div>
  </div>
  <div v-for="c in currencyType" :key="c.id">
    <div>{{ c.id }}</div>
    <div>{{ c.name }}</div>
    <div>{{ c.symbol }}</div>
    <div>{{ c.value }}</div>
  </div>
  <div>123</div>
</template>
