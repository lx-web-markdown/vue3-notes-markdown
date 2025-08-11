export interface RouteItem {
  path: string
  name: string
  description: string
  icon?: string
}

export const routesList: RouteItem[] = [
  {
    path: '/css',
    name: '首页',
    description: '应用的主页面',
    icon: '🏠'
  },
  {
    path: '/notes',
    name: '笔记',
    description: 'Markdown笔记编辑器',
    icon: '📝'
  },
  {
    path: '/about',
    name: '关于',
    description: '关于本应用',
    icon: 'ℹ️'
  }, 
  {
    path: '/demo',
    name: '关于',
    description: '关于本应用',
    icon: 'ℹ️'
  }, 
  {
    path: '/notelist',
    name: '关于',
    description: '关于本应用',
    icon: 'ℹ️'
  }, 
  {
    path: '/tools',
    name: '关于',
    description: '关于本应用',
    icon: 'ℹ️'
  }, 
] 