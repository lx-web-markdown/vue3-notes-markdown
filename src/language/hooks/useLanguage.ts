import { ref } from 'vue';

export default function useLanguage() {
  const currentLocale = ref('zh-CN');
  
  const translate = (key: string): string => {
    // TODO: 实现实际的翻译逻辑
    return key;
  };

  return {
    currentLocale,
    translate
  };
}