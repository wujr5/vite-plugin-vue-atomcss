<template lang="pug">
div
  .w-100.h-100.bg-yellow
  div {{ count }}
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

let route = useRoute();

let count = $ref(0);

onMounted(() => {
  document.title = '博客详情';

  count = 10;
});
</script>
