const toolsRouters = [
  {
    path: '/tools',
    name: 'ToolsCollection',
    component: () => import('@/views/modules/ToolsCollection/ToolsCollection.vue'),
  },
  {
    path: '/tools/json-format',
    name: 'JsonFormat',
    component: () => import('@/views/modules/ToolsCollection/JSONFormat/JSONFormat.vue'),
  },
  {
    path: '/tools/xml-format',
    name: 'XMLFormat',
    component: () => import('@/views/modules/ToolsCollection/XMLFormat/XMLFormat.vue'),
  },
  {
    path: '/tools/json-xml',
    name: 'JSONXML',
    component: () => import('@/views/modules/ToolsCollection/JSON_XML/JSON_XML.vue'),
  },
  {
    path: '/tools/base64',
    name: 'Base64',
    component: () => import('@/views/modules/ToolsCollection/Base64/Base64.vue'),
  },
  {
    path: '/tools/url-encode',
    name: 'URLEncode',
    component: () => import('@/views/modules/ToolsCollection/URLEncode/URLEncode.vue'),
  },
  {
    path: '/tools/unicode',
    name: 'Unicode',
    component: () => import('@/views/modules/ToolsCollection/Unicode/Unicode.vue'),
  },
  {
    path: '/tools/unix-time',
    name: 'UnixTime',
    component: () => import('@/views/modules/ToolsCollection/UnixTime/UnixTime.vue'),
  },
  {
    path: '/tools/generate-uuid',
    name: 'GenerateUUID',
    component: () => import('@/views/modules/ToolsCollection/GenerateUUID/GenerateUUID.vue'),
  },
  {
    path: '/tools/qr-code',
    name: 'QRCode',
    component: () => import('@/views/modules/ToolsCollection/QRCode/QRCodeTool.vue'),
  },
  {
    path: '/tools/html-convert',
    name: 'HtmlConvert',
    component: () => import('@/views/modules/ToolsCollection/HtmlConvert/html-convert.vue'),
  },
]

export default toolsRouters;