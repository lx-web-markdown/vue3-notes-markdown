const toolsRouters = [
  {
    path: '/tools',
    name: 'ToolsCollection',
    component: () => import('@/views/ToolsCollection/ToolsCollection.vue'),
  },
  {
    path: '/tools/json-conversion',
    name: 'JsonConversion',
    component: () => import('@/views/ToolsCollection/JsonConversion/JsonConversion.vue'),
  },
  {
    path: '/tools/generate-qr-code',
    name: 'GenerateQRCode',
    component: () => import('@/views/ToolsCollection/GenerateQRCode/GenerateQRCode.vue'),
  }
]

export default toolsRouters;