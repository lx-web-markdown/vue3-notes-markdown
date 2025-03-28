<script lang="ts">
export default {
  name: 'HeaderView',
};
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// router
import { useRoute, useRouter } from 'vue-router';
// hooks
import useHooks from './hooks/useHooks';
// language
import useLanguage from '@/language/hooks/useLanguage';
// 引入主题切换组件
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
//
const { handleDropdownCommand } = useHooks();
const { currentLocale } = useLanguage();

// router
const router = useRouter();
const route = useRoute();

const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
];

const currentLanguageName = ref('中文');
watch(currentLocale, (newValue: any) => {
  newValue === 'zh'
    ? (currentLanguageName.value = '中文')
    : (currentLanguageName.value = 'English');
});

onMounted(() => {
  //
  console.log('currentIndex', currentLocale.value);
});

const showLinks = () => {
  router.push('/demo');
};

const avatarClick = () => {};

const openMKViewr = (command: string) => {
  console.log(command);
  switch (command) {
    case 'HTML':
      router.push('/notelist/html');
      break;
    case 'CSS':
      router.push('/notelist/css');
      break;
    case 'JS':
      router.push('/notelist/js');
      break;
    case 'Vue2':
      router.push('/notelist/vue2');
      break;
    case 'Vue3':
      router.push('/notelist/vue3');
      break;
    case 'work-doc':
      router.push('/notelist/work-doc');
      break;
    default:
      break;
  }
};
</script>

<template>
  <div class="main-view">
    <div class="left-view">
      <img src="@/assets/images/common/favicon.jpeg" alt="" />
      <div class="title">
        {{ $t('appTitle') }}
      </div>
    </div>
    <div class="right-view">
      <el-button @click="showLinks" link>DEMO</el-button>

      <el-dropdown class="el-dropdown-cls" @command="openMKViewr">
        <span class="el-dropdown-link">
          {{ $t('navi.books') }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="HTML">HTML</el-dropdown-item>
            <el-dropdown-item command="CSS">CSS</el-dropdown-item>
            <el-dropdown-item command="JS">JS</el-dropdown-item>
            <el-dropdown-item command="Vue2">Vue2</el-dropdown-item>
            <el-dropdown-item command="Vue3">Vue3</el-dropdown-item>
            <el-dropdown-item command="work-doc">所有文件类型</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 主题切换器 -->
      <ThemeSwitcher />

      <!-- language -->
      <el-dropdown class="el-dropdown-cls" @command="handleDropdownCommand">
        <span class="el-dropdown-link">
          <!-- {{ $t('common.changeLanguage') }} -->
          {{ currentLanguageName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- avatar -->
      <el-image
        class="avatar-cls"
        :src="srcList[0]"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="srcList"
        :initial-index="4"
        :z-index="9999"
        :preview-teleported="true"
        fit="cover"
        @click="avatarClick"
        circle
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/element-plus-styles/el-button-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-dropdown-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-switch-scoped.scss';
</style>

<style scoped lang="scss">
:deep(.el-button) {
  margin-left: 0px;
}

.main-view {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: var(--lx-header-height);
  background-color: var(--bg-tertiary);

  .left-view {
    display: flex;
    align-items: center;
    margin-left: 20px;

    img {
      height: 80%;
      aspect-ratio: 1 / 1;
      /* 宽高比为 1:1 */
      background-color: rebeccapurple;
      border-radius: 50%;
      margin-top: calc(var(--header-height) * 0.1);
    }

    .title {
      line-height: var(--header-height);
      margin-left: 15px;
      background-color: transparent;
    }
  }

  .right-view {
    display: flex;
    justify-content: right;
    align-items: center; // 垂直居中
    gap: 15px;
    margin-right: 20px;

    .el-dropdown-cls {
      :hover {
        cursor: pointer;
      }

      height: 100%;

      .el-dropdown-link {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 600;

        .el-icon--right {
          margin-left: 5px;
        }

        .el-icon {
          height: 16px;
          width: 16px;
          line-height: 100%;

          svg {
            height: 100%;
            width: 100%;
          }
        }
      }
    }

    .avatar-cls {
      width: 40px;
      height: 40px;
      border: 0px;
      border-radius: 50%;
      // background-image: url('@/assets/images/common/avatar.jpeg');
      // background-repeat: no-repeat;
      // background-size: cover;
      // background-position: center center;
    }
  }
}
</style>
