<template lang="pug">
div(style="max-width: 1000px; margin: 0 auto")
  router-view
  app-footer
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppFooter from './components/footer.vue';
</script>
