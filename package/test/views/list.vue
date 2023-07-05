<template lang="pug">
main
  div(style="text-align: center")
    h1.bgred 列表
    router-link.h-50.lh-50.bd-1.t-l.px-20.mb-10.br-4.c-1e1e1e.dspl-bl.fs-16(
      style="text-decoration: none",
      to="/about/1"
    )
      .inbl.vtal-top.h-50.w-400.c-theme 测试测试1111

  .mt-30.fs-32 弹性盒子
    .dspl-flex.fld-row.justify-sa
      .w-100.h-100.bg-red.order-3 1
      .w-100.h-100.bg-blue.order-1 2
      .w-100.h-100.bg-yellow.order-2 3
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = '列表';
});
</script>
