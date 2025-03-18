import Vue from 'vue';
import VueI18n from 'vue-i18n';
import eleLocale from 'element-ui/lib/locale';

import zhCnLocale from 'element-ui/src/locale/lang/zh-CN';
// import zhTwLocale from 'element-ui/src/locale/lang/zh-TW';
// import enUsLocale from 'element-ui/src/locale/lang/en';

Vue.use(VueI18n);

let lang = 'zh-CN'
Vue.config.lang = lang

let localDict = localStorage.i18nDict || {};
try {
  localDict = JSON.parse(localDict)
  localDict = localDict['zh-CN']
}catch (e){
  console.log(e)
}

localDict.el = zhCnLocale.el;

Vue.locale = () => {};
const messages = {
    'zh-CN': Object.assign(localDict),
    // 'zh-TW': Object.assign(zhTwLocale),
    // 'en-US': Object.assign(enUsLocale),
};

const i18n = new VueI18n({
    locale: lang,
    messages,
    silentTranslationWarn: true
});

eleLocale.i18n((key, value) => i18n.t(key, value))

export default i18n;
