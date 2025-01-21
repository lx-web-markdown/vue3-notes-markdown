<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
const { currentLocale, translate } = useLanguage()

onMounted(() => {
  // 设置页面标题，国际化信息
  console.log('currentLocale =', currentLocale.value);
  document.title = translate('appTitle') || '';
});

</script>
