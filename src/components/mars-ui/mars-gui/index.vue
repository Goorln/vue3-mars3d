<template>
  <a-form :class="{ 'mars-gui-form': true, 'pad-none': props.noPadding }" :label-col="labelCol"
    :wrapper-col="wrapperCol">
    <template v-for="(item, i) in renderOptions" :key="i">
      <a-form-item v-if="(item.show as any)(attrForm)" :label="item.label">
        <div :style="getItemStyle(item)">
          <component
            :is="getComponent(item.type)"
            v-model:value="item.value"
            :min="item.min || item.min === 0 ? item.min : -Infinity"
            :max="item.max || item.max === 0 ? item.max : Infinity"
            :step="item.step || 0.1"
            :range="item.range || false"
            :options="item.data || []"
            :units="item.units"
            @change="itemChange(item)">
          </component>
          <span v-if="item.extraAfter" class="extra_follow_close">{{ item.extraAfter }}</span>
        </div>
        <div v-if="item.extra !== undefined" class="mars-gui-extra">
          <template v-if="item.extraType === 'string'">{{ item.extra(attrForm) }}</template>
          <component v-else :is="item.extra(attrForm)"></component>
        </div>
      </a-form-item>
    </template>
  </a-form>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { components, GuiItem } from "./index"

const props = defineProps<{
  options: GuiItem[]
  labelCol?: number
  noPadding?: boolean
}>()

const emits = defineEmits(["change"])

const renderOptions = ref<GuiItem[]>([])

const attrForm = computed(() => {
  const modelValues: Record<string, any> = {}
  renderOptions.value.forEach((item) => {
    modelValues[item.field] = item.value
  })

  return modelValues
})

const labelCol = { span: props.labelCol || 6 }
const wrapperCol = { span: 24 - labelCol.span }

watchEffect(() => {
  renderOptions.value = props.options.map((item) => mergeItemOption(item))
})

defineExpose({
  // 删除指定 field 或 索引的 元素
  delete: (key: string | number) => {
    let index: number
    if (typeof key === "string") {
      renderOptions.value.forEach((item, i) => {
        if (item.field === key) {
          index = i
        }
      })
    }
    if (typeof key === "number" && key >= 0 && key < renderOptions.value.length) {
      index = key
    }
    if (index !== undefined) {
      renderOptions.value.splice(index, 1)
    }
  },
  // 在指定位置插入 一个 或 多个 元素
  insert(index: number, ...args: GuiItem[]) {
    args.forEach((item) => {
      renderOptions.value.splice(index, 0, mergeItemOption(item))
    })
  },
  updateField(field: string, value) {
    renderOptions.value.forEach((item) => {
      if (item.field === field) {
        item.value = value
      }
    })
  },
  updateExtra(field: string, value) {
    renderOptions.value.forEach((item) => {
      if (item.field === field) {
        item.extra = mergeExtra(value)
      }
    })
  },
  updateFields(fieldObj: any) {
    renderOptions.value.forEach((item) => {
      if (fieldObj[item.field]) {
        item.value = fieldObj[item.field]
      }
    })
  },
  getValue(field: string) {
    const item = renderOptions.value.find((it) => {
      return it.field === field
    })
    if (item) {
      return item.value
    }
    throw new Error("field is not exist")
  },
  getValues() {
    return attrForm.value
  }
})

const getItemStyle = ({ extraWidth, extra, label }: GuiItem) => {
  if (!extraWidth && extraWidth !== 0) {
    extraWidth = 63
  }
  return extra !== undefined
    ? {
      width: `calc(100% - ${extraWidth || extraWidth === 0 ? extraWidth : 100}px)`,
      display: "inline-block",
      marginRight: "6px"
    }
    : {
      display: "inline-block",
      width: "100%"
    }
}

function getComponent(type: keyof typeof components) {
  return components[type]
}

function mergeItemOption(item) {
  // show字段转为function
  if (typeof item.show !== "function") {
    item.show = () => (item.show === undefined ? true : !!item.show)
  }

  // extra 字段转为function
  item.extra = mergeExtra(item.extra)
  item.extraType = item.extraType || "string"
  return item
}

function mergeExtra(extra) {
  let extraNew = extra
  if (extraNew === undefined || extraNew === null) {
    return undefined
  }

  if (typeof extraNew !== "function" && extraNew) {
    extraNew = () => {
      if (typeof extra === "string") {
        let str = extra
        const paramsPattern = /[^{\}]+(?=})/g
        const extractParams = str.match(paramsPattern) || []
        extractParams.forEach((key) => {
          str = str.replace(new RegExp(`{${key}}`, "g"), attrForm.value[key])
        })
        return str
      } else {
        return extra
      }
    }
  }

  return extraNew
}

function itemChange(item: GuiItem) {
  if (item.change) {
    item.change(item.value, attrForm.value)
  } else {
    emits("change", attrForm.value)
  }
}
</script>
<script lang="ts">
export default {
  name: "mars-gui"
}
</script>

<style lang="less">
.mars-gui-form {
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mars-gui-extra {
      display: block;
      font-family: var(--mars-font-family);
      font-size: 12px;
      font-weight: normal;
      color: var(--mars-extra-text-color);
    }

    .extra_follow_close {
      display: inline-block;
      font-family: var(--mars-font-family);
      font-size: 12px;
      font-weight: normal;
      color: var(--mars-extra-text-color);
      margin-left: 10px;
    }

    .ant-input-affix-wrapper {
      padding: 4px;

      .ant-input {
        text-align: center;
      }
    }
  }
}
</style>
