<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useLanguage from '@/language/hooks/useLanguage';
const { currentLocale, translate } = useLanguage()

onMounted(() => {
  // 系统初始化日志
  console.log('系统信息:', {
    语言: currentLocale.value,
    页面标题: translate('appTitle'),
    初始化时间: new Date().toLocaleString()
  });

  // 天气信息
  console.log('天气信息:', {
    temperature: '25°C',
    weather: '晴',
    humidity: '65%',
    wind: '东南风 3级'
  });

  // 设置页面标题
  document.title = translate('appTitle') || '';
});

</script>
