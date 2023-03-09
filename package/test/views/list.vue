<template lang="pug">
main
  div(style="text-align: center")
    h1 文章列表
    router-link.h-50.lh-50.bd-1.t-l.px-20.mb-10.br-4.c-1e1e1e.dspl-bl.fs-16(
      v-for="(item, index) in list",
      style="text-decoration: none",
      :to="`/about/${item.id}`"
    )
      .inbl.vtal-top.h-50.w-400 {{ index }} : {{ item.title }}
</template>

<script setup>
import { onMounted } from 'vue';

let list = $ref([]);

onMounted(() => {
  document.title = '列表';

  list = [
    {
      id: 1,
      title: '哈哈哈',
    },
  ];
});
</script>
