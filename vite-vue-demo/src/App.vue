<template>
  <div>
    <h1>App</h1>
    <button class="btn" @click="count++">
      {{ count }}
    </button>
    <div @click="changeImg">
      <button value="spring">春</button>
      <button value="summer">夏</button>
    </div>
    <div>
      <img :src="imgPath" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { get } from 'lodash-es'
const count = ref(0)
const img = ref('spring')
const changeImg = (e: Event) => {
  img.value = (e.target as HTMLButtonElement).value
}
// const imgPath = computed(() => {
//   const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL
//   const res = new URL(`${img.value}.jpg`, baseUrl).href
//   console.log(res)
//   return res
// })

// 动态加载图片
// 1.使用 new URL
// const imgPath = computed(() => {
//   return new URL(`./assets/${img.value}.jpg`, import.meta.url).href
// })
// 2.使用 import.meta.glob
const imgPath = computed(() => {
  const res = images[`./assets/${img.value}.jpg`]
  return res as string
})
const images = import.meta.glob('./assets/**/*.jpg', {
  eager: true,
  import: 'default',
})
const obj = {
  name: '张三',
  age: 18,
  height: 1.88,
}
console.log(get(obj, 'name'))
console.log(get(obj, 'age'))
console.log(get(obj, 'height'))
console.log(images)
</script>

<style scoped lang="scss">
.btn {
  color: $color;
  font-size: $size30;
}
</style>
