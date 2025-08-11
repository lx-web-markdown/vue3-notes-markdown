<script setup lang="ts">
import { ref, computed, defineAsyncComponent, type Component } from 'vue'

// Import source code as raw text for display
// Vite supports `?raw` to import file contents as string
import codeFlexCenter from './diff-demos/01-center.vue?raw'
import codeGridCenter from './diff-demos/02-grid-center.vue?raw'

type DemoItem = {
  key: string
  title: string
  component: Component
  code: string
}

const demos = ref<DemoItem[]>([
  {
    key: 'flex-center',
    title: 'Flex 居中',
    component: defineAsyncComponent(() => import('./diff-demos/01-center.vue')),
    code: codeFlexCenter,
  },
  {
    key: 'grid-center',
    title: 'Grid 居中',
    component: defineAsyncComponent(() => import('./diff-demos/02-grid-center.vue')),
    code: codeGridCenter,
  },
  // 后续可以在此追加更多 Demo：仅需新增一个对象，配置 key/title/component/code
])

const activeKey = ref<string>(demos.value[0]?.key || '')
const activeDemo = computed<DemoItem | undefined>(() =>
  demos.value.find((d) => d.key === activeKey.value),
)

function switchDemo(key: string): void {
  activeKey.value = key
}
</script>

<template>
  <div class="center-css">
    <!-- Toolbar: demo switcher -->
    <div class="center-css__toolbar">
      <button
        v-for="demo in demos"
        :key="demo.key"
        class="toolbar__btn"
        :class="{ 'toolbar__btn--active': demo.key === activeKey }"
        @click="switchDemo(demo.key)"
      >
        {{ demo.title }}
      </button>
    </div>

    <!-- Content: left (code) | right (preview) -->
    <div class="center-css__content">
      <div class="content__left">
        <div class="panel__header">Source Code</div>
        <pre class="code-block"><code v-text="activeDemo?.code"></code></pre>
      </div>

      <div class="content__right">
        <div class="panel__header">Preview</div>
        <div class="preview-runner">
          <Suspense>
            <component :is="activeDemo?.component" />
          </Suspense>
        </div>
      </div>
    </div>
  </div>
  
</template>


<style scoped lang="scss">
.center-css {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
}

.center-css__toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.toolbar__btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: #f3f4f6;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 1;

  &:hover {
    background: #e5e7eb;
  }

  &--active {
    background: #4f46e5;
    color: #fff;
  }
}

.center-css__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0; // for child overflow handling in grid
}

.content__left,
.content__right {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.panel__header {
  padding: 8px 12px;
  font-weight: 600;
  font-size: 13px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.code-block {
  flex: 1;
  margin: 0;
  padding: 12px;
  overflow: auto;
  background: #0b1021;
  color: #e5e7eb;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre;
}

.preview-runner {
  flex: 1;
  overflow: auto;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .center-css__content {
    grid-template-columns: 1fr;
  }
}
</style>