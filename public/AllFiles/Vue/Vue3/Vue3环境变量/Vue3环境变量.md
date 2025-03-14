* [Vite官网 - 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode#env-variables-and-modes)
* [Vite官网 - 配置](https://cn.vitejs.dev/config/)
* [【Vite环境变量】import.meta.env 和 loadEnv使用和区别](https://blog.csdn.net/weixin_42373175/article/details/131080666)



# [环境变量](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables)

Vite 在一个特殊的 **`import.meta.env`** 对象上暴露环境变量，这些变量在构建时会被静态地替换掉。这里有一些在所有情况下都可以使用的内建变量：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境（使用 `NODE_ENV='production'` 运行开发服务器或构建应用时使用 `NODE_ENV='production'` ）。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
- **`import.meta.env.SSR`**: {boolean} 应用是否运行在 [server](https://cn.vitejs.dev/guide/ssr.html#conditional-logic) 上。





# 图片

![我的图片111](/AllFiles/Vue/Vue3/Vue3环境变量/images/001.png)


![我的up222](/AllFiles/Vue/Vue3/Vue3环境变量/images/002.png)




