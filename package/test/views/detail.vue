<template>
  <div>
    <div class="w-100 h-100 bg-red"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = '详情';
});
</script>
