<template>
  <div class="tools-collection">
    <h1 class="page-title">工具集合</h1>
    
    <div class="tools-category" v-for="category in categories" :key="category.name">
      <h2 class="category-title">
        <i :class="category.icon"></i>
        {{ category.title }}
      </h2>
      
      <div class="tools-grid">
        <router-link
          v-for="tool in category.tools"
          :key="tool.path"
          :to="tool.path"
          class="tool-card"
        >
          <div class="tool-icon">
            <i :class="tool.icon"></i>
          </div>
          <div class="tool-info">
            <h3 class="tool-title">
              {{ tool.title }}
              <span v-if="tool.isDeprecated" class="deprecated-tag">未完成</span>
            </h3>
            <p class="tool-desc">{{ tool.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tool {
  title: string
  description: string
  path: string
  icon: string
  isDeprecated: boolean
}

interface Category {
  name: string
  title: string
  icon: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    name: 'format',
    title: '格式转换',
    icon: 'fas fa-exchange-alt',
    tools: [
      {
        title: 'JSON格式化',
        description: 'JSON格式化、压缩、转义等功能',
        path: '/tools/json-format',
        icon: 'fas fa-code',
        isDeprecated: false
      },
      {
        title: 'XML格式化',
        description: 'XML格式化、压缩、校验等功能',
        path: '/tools/xml-format',
        icon: 'fas fa-file-code',
        isDeprecated: false
      },
      {
        title: 'JSON_XML相互转化',
        description: 'JSON_XML相互转化',
        path: '/tools/json-xml',
        icon: 'fas fa-file-code',
        isDeprecated: false
      },
      {
        title: '时间转换',
        description: '时间戳转换、格式化等功能',
        path: '/tools/unix-time',
        icon: 'fas fa-clock',
        isDeprecated: false
      }
    ]
  },
  {
    name: 'encode',
    title: '编码解码',
    icon: 'fas fa-key',
    tools: [
      {
        title: 'Base64',
        description: 'Base64编码解码、图片转换',
        path: '/tools/base64',
        icon: 'fas fa-file-image',
        isDeprecated: false
      },
      {
        title: 'URL编码',
        description: 'URL编码解码转换',
        path: '/tools/url-encode',
        icon: 'fas fa-link',
        isDeprecated: false
      },
      {
        title: 'Unicode',
        description: 'Unicode编码解码转换',
        path: '/tools/unicode',
        icon: 'fas fa-font',
        isDeprecated: false
      }
    ]
  },
  {
    name: 'generator',
    title: '生成工具',
    icon: 'fas fa-magic',
    tools: [
      {
        title: 'UUID生成',
        description: '生成UUID/GUID',
        path: '/tools/generate-uuid',
        icon: 'fas fa-fingerprint',
        isDeprecated: false
      },
      {
        title: '随机密码',
        description: '生成随机密码',
        path: '/tools/password-generator',
        icon: 'fas fa-key',
        isDeprecated: true
      },
      {
        title: '二维码',
        description: '生成/解析二维码',
        path: '/tools/qr-code',
        icon: 'fas fa-qrcode',
        isDeprecated: false
      },
    ]
  }
]
</script>

<style lang="scss" scoped>
.tools-collection {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .page-title {
    font-size: 28px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 40px;
    text-align: center;
  }

  .tools-category {
    margin-bottom: 40px;

    .category-title {
      font-size: 20px;
      font-weight: 500;
      color: #3a3a3a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      i {
        color: #409eff;
      }
    }
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .tool-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    gap: 16px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    }

    .tool-icon {
      width: 48px;
      height: 48px;
      background-color: #ecf5ff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 24px;
        color: #409eff;
      }
    }

    .tool-info {
      flex: 1;
      min-width: 0;

      .tool-title {
        font-size: 16px;
        font-weight: 500;
        color: #2c3e50;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 8px;

        .deprecated-tag {
          font-size: 12px;
          padding: 2px 6px;
          background-color: #fef0f0;
          color: #f56c6c;
          border-radius: 4px;
          font-weight: normal;
        }
      }

      .tool-desc {
        font-size: 14px;
        color: #606266;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

@media (max-width: 768px) {
  .tools-collection {
    padding: 16px;

    .page-title {
      font-size: 24px;
      margin-bottom: 30px;
    }

    .tools-grid {
      grid-template-columns: 1fr;
    }

    .tool-card {
      padding: 16px;
    }
  }
}
</style>