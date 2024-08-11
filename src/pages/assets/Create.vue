<script setup lang="ts">
import dayjs from 'dayjs'
import * as z from 'zod'

import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import mutateAsset from '@/server/api/mutateAsset'
import { type AssetType } from '@/server/api/queryAssetsType'
import { type CurrencyType } from '@/server/api/queryCurrencyType'
import { useAuthStore } from '@/store/auth'

interface Props {
  id: number
  assetsType: AssetType[]
  currencyType: CurrencyType[]
}

const props = defineProps<Props>()

const authStore = useAuthStore()

const { mutateAsync } = mutateAsset()

const schema = z.object({
  name: z.string({ required_error: '請輸入名稱' }),

  assetType: z
    .enum(props.assetsType.map((a) => a.name) as [string, ...string[]])
    .default(props.assetsType[0].name),

  currencyType: z
    .enum(props.currencyType.map((c) => c.name) as [string, ...string[]])
    .default(props.currencyType[0].name),

  amount: z.coerce.number({ required_error: '請輸入金額' }).default(0)
})

async function onSubmit(values: Record<string, any>) {
  const AT = props.assetsType.find((a) => a.name === values.assetType)?.id
  const CT = props.currencyType.find((c) => c.name === values.currencyType)?.id

  const payload = {
    id: `${props.id}`,
    userId: authStore.userInfo.userId,
    data: {
      name: values.name,
      assetsType: AT as string,
      currencyType: CT as string,
      amount: values.amount,
      createDate: dayjs().format('YYYY-MM-DD')
    }
  }

  await mutateAsync(payload)
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :field-config="{
      name: { label: '名稱' },
      assetType: { label: '資產類型' },
      currencyType: { label: '幣別' },
      amount: { label: '金額' }
    }"
    @submit="onSubmit"
  >
    <Button type="submit">新增</Button>
  </AutoForm>
</template>
