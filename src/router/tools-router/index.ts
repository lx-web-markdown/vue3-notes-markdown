const toolsRouters = [
  {
    path: '/tools',
    name: 'ToolsCollection',
    component: () => import('@/views/ToolsCollection/ToolsCollection.vue'),
  },
  {
    path: '/tools/json-format',
    name: 'JsonFormat',
    component: () => import('@/views/ToolsCollection/JSONFormat/JSONFormat.vue'),
  },
  {
    path: '/tools/xml-format',
    name: 'XMLFormat',
    component: () => import('@/views/ToolsCollection/XMLFormat/XMLFormat.vue'),
  },
  {
    path: '/tools/json-xml',
    name: 'JSONXML',
    component: () => import('@/views/ToolsCollection/JSON_XML/JSON_XML.vue'),
  },
  {
    path: '/tools/generate-uuid',
    name: 'GenerateUUID',
    component: () => import('@/views/ToolsCollection/GenerateUUID/GenerateUUID.vue'),
  },
  {
    path: '/tools/generate-qr-code',
    name: 'GenerateQRCode',
    component: () => import('@/views/ToolsCollection/GenerateQRCode/GenerateQRCode.vue'),
  },
]

export default toolsRouters;