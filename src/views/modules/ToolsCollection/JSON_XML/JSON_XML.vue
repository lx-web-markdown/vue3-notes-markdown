<template>
  <div class="json-xml-converter">
    <div class="converter-container">
      <div class="panel input-panel">
        <div class="panel-header">
          <span class="panel-title">输入区域</span>
          <div class="panel-controls">
            <button 
              class="btn" 
              :class="{ active: mode === 'XML_TO_JSON' }"
              @click="setMode('XML_TO_JSON')"
            >
              XML转JSON
            </button>
            <button 
              class="btn" 
              :class="{ active: mode === 'JSON_TO_XML' }"
              @click="setMode('JSON_TO_XML')"
            >
              JSON转XML
            </button>
            <button 
              class="btn example-btn"
              @click="loadExample"
            >
              加载示例
            </button>
          </div>
        </div>
        <div class="panel-content">
          <textarea
            v-model="inputText"
            :placeholder="placeholder"
            class="code-input"
          ></textarea>
        </div>
      </div>

      <div class="panel output-panel">
        <div class="panel-header">
          <span class="panel-title">输出结果</span>
          <div class="panel-controls">
            <label class="pretty-switch">
              <input 
                type="checkbox" 
                v-model="prettyPrint"
              >
              <span class="switch-label">格式化输出</span>
            </label>
          </div>
        </div>
        <div class="panel-content">
          <textarea
            v-model="outputText"
            readonly
            class="code-output"
            placeholder="转换后的结果将显示在这里"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

type ConversionMode = 'XML_TO_JSON' | 'JSON_TO_XML'

const mode = ref<ConversionMode>('XML_TO_JSON')
const inputText = ref('')
const prettyPrint = ref(true)

const exampleData = {
  XML_TO_JSON: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <person>
    <name>张三</name>
    <age>28</age>
    <hobbies>
      <hobby>读书</hobby>
      <hobby>旅行</hobby>
    </hobbies>
  </person>
</root>`,
  JSON_TO_XML: `{
  "person": {
    "name": "张三",
    "age": 28,
    "hobbies": {
      "hobby": ["读书", "旅行"]
    }
  }
}`
}

const loadExample = () => {
  inputText.value = exampleData[mode.value]
}

const placeholder = computed(() => {
  return mode.value === 'XML_TO_JSON' 
    ? '请输入XML代码...' 
    : '请输入JSON代码...'
})

const outputText = computed(() => {
  if (!inputText.value.trim()) return ''
  
  try {
    if (mode.value === 'XML_TO_JSON') {
      const parser = new XMLParser()
      const result = parser.parse(inputText.value)
      return prettyPrint.value 
        ? JSON.stringify(result, null, 2)
        : JSON.stringify(result)
    } else {
      const jsonObj = JSON.parse(inputText.value)
      const builder = new XMLBuilder({
        format: prettyPrint.value,
        indentBy: '  ',
      })
      return builder.build(jsonObj)
    }
  } catch (error: any) {
    return `错误: ${error.message}`
  }
})

const setMode = (newMode: ConversionMode) => {
  mode.value = newMode
  inputText.value = ''
}
</script>

<style scoped lang="scss">
.json-xml-converter {
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f5f7fa;
  
  .converter-container {
    display: flex;
    gap: 20px;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e4e7ed;

      .panel-title {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }

      .panel-controls {
        display: flex;
        gap: 8px;
        align-items: center;
      }
    }

    .panel-content {
      flex: 1;
      padding: 16px;
    }
  }

  .code-input,
  .code-output {
    width: 100%;
    height: 100%;
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    color: #2c3e50;
    
    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &::placeholder {
      color: #909399;
    }
  }

  .code-output {
    background: #fcfcfc;
    &[readonly] {
      cursor: default;
    }
  }

  .btn {
    padding: 6px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }

    &.active {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      
      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }

    &.example-btn {
      margin-left: 12px;
      color: #67c23a;
      border-color: #e1f3d8;
      background-color: #f0f9eb;

      &:hover {
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
      }
    }
  }

  .pretty-switch {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    
    input {
      margin-right: 6px;
    }

    .switch-label {
      font-size: 14px;
      color: #606266;
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .json-xml-converter {
    padding: 10px;
    
    .converter-container {
      flex-direction: column;
    }
    
    .panel {
      min-height: 300px;
    }
  }
}
</style>