<template>
  <div class="uuid-generator">
    <h1 class="title">UUID在线生成器-在线批量生成UUID</h1>
    
    <div class="controls">
      <div class="input-group">
        <label>生成数量</label>
        <input 
          type="number" 
          v-model="count" 
          min="1" 
          class="count-input"
          placeholder="请输入生成数量"
        >
      </div>
      
      <div class="button-group">
        <button class="btn generate" @click="generateUUIDs">生成</button>
        <button class="btn clear" @click="clearUUIDs">清空</button>
        <button class="btn copy" @click="copyUUIDs">复制</button>
      </div>
    </div>

    <textarea
      v-model="uuids"
      class="uuid-output"
      readonly
      placeholder="生成的UUID将显示在这里..."
    ></textarea>

    <div class="tool-description">
      <h2>工具介绍</h2>
      <p>UUID 是 通用唯一识别码（Universally Unique Identifier）的缩写，是一种软件建构的标准，亦为开放软件基金会组织在分布式计算环境领域的一部分。其目的，是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。如此一来，每个人都可以创建不与其它人冲突的UUID。在这样的情况下，就不需考虑数据库创建时的名称重复问题。最广泛应用的UUID，是微软公司的全局唯一标识符（GUID），而其他重要的应用，则有Linux ext2/ext3文件系统、LUKS加密分区、GNOME、KDE、Mac OS X等等。另外我们也可以在各种progs包中的UUID库找到实现。</p>
      <p>UUID是由一组32位数的16进制数字所构成，故UUID理论上的总数为16^32=2^128，约等于3.4 × 10^38。也就是说若每纳秒产生1兆个UUID，要花100亿年才会将所有UUID用完。</p>
      <p>UUID的标准型式包含32个16进制数字，以连字号分为五段，形式为8-4-4-4-12的32个字符。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const count = ref(1)
const uuids = ref('')

const generateUUIDs = () => {
  const generatedUUIDs = Array.from(
    { length: count.value }, 
    () => uuidv4()
  ).join('\n')
  uuids.value = generatedUUIDs
}

const clearUUIDs = () => {
  uuids.value = ''
  count.value = 1
}

const copyUUIDs = async () => {
  if (!uuids.value) return
  try {
    await navigator.clipboard.writeText(uuids.value)
    alert('复制成功！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}
</script>

<style lang="scss" scoped>
.uuid-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .controls {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    flex-wrap: wrap;

    .input-group {
      display: flex;
      align-items: center;
      gap: 10px;

      label {
        font-size: 16px;
        color: #666;
      }

      .count-input {
        width: 120px;
        height: 36px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #00c58e;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 10px;

      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;

        &.generate {
          background-color: #00c58e;
          color: white;

          &:hover {
            background-color: #00c58d2e;
          }
        }

        &.clear {
          background-color: #f5f5f5;
          color: #666;

          &:hover {
            background-color: #f5f5f52d;
          }
        }

        &.copy {
          background-color: #f5f5f5;
          color: #666;

          &:hover {
            background-color: #f5f5f52d;
          }
        }
      }
    }
  }

  .uuid-output {
    width: 100%;
    min-height: 200px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    margin-bottom: 20px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: #00c58e;
    }
  }

  .tool-description {
    color: #666;
    line-height: 1.6;

    h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #333;
    }

    p {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>