<template lang="pug">
main
  div(style="text-align: center")
    h1.bgred 列表
    router-link.h-50.lh-50.bd-1.t-l.px-20.mb-10.br-4.c-1e1e1e.dspl-bl.fs-16(
      style="text-decoration: none",
      :to="`/about/1`"
    )
      .inbl.vtal-top.h-50.w-400 测试测试1111
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = '列表';
});
</script>
