import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'

export interface XMLFormatterState {
  inputText: string
  outputText: string
  formatting: boolean
}

const exampleXML = `<?xml version="1.0" encoding="UTF-8"?><bookstore><book category="儿童读物"><title lang="zh">小王子</title><author>安托万·德·圣-埃克苏佩里</author><year>1943</year><price>29.90</price></book><book category="编程"><title lang="en">Learning XML</title><author>Erik T. Ray</author><year>2003</year><price>39.95</price></book></bookstore>`

export const useXMLFormatter = () => {
  const state = ref<XMLFormatterState>({
    inputText: '',
    outputText: '',
    formatting: false
  })

  const formatXML = (xml: string): string => {
    try {
      // 先解析XML以验证其有效性
      const parser = new XMLParser({
        ignoreAttributes: false,
        preserveOrder: true
      })
      const parsed = parser.parse(xml)

      // 重新构建格式化的XML
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        format: true,
        indentBy: '  ',
        preserveOrder: true
      })
      return builder.build(parsed)
    } catch (error) {
      throw new Error('XML格式无效')
    }
  }

  const format = async () => {
    if (!state.value.inputText.trim()) {
      ElMessage.warning('请输入需要格式化的XML内容')
      return
    }

    state.value.formatting = true
    try {
      state.value.outputText = formatXML(state.value.inputText)
      ElMessage.success('格式化成功')
    } catch (error) {
      ElMessage.error('格式化失败，请检查XML格式是否正确')
      console.error(error)
      state.value.outputText = ''
    } finally {
      state.value.formatting = false
    }
  }

  const clear = () => {
    state.value.inputText = ''
    state.value.outputText = ''
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(state.value.outputText)
      ElMessage.success('复制成功')
    } catch (error) {
      ElMessage.error('复制失败')
    }
  }

  const loadExample = () => {
    state.value.inputText = exampleXML
    format()
  }

  return {
    state,
    format,
    clear,
    copy,
    loadExample
  }
} 