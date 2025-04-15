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
  }
]

export default toolsRouters;