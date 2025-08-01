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



![](/AllFiles/Vue3/07-实战经验/Vue3环境变量/images/001.png)





# `.env` 文件

加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```js
// .env 文件
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

如果不想使用`VITE开头`，自己修改就在 `vite.config.ts` 文件中添加：

```json
envPrefix: 'VUE_APP_',
```



## 加载顺序

- `.env` 文件 → `.env.local` → `.env.[mode]` → `.env.[mode].local`
- 后面的文件会覆盖前面的文件。

**安全性**

- 只加载以 `VITE_` 开头的变量到客户端代码中，避免敏感信息泄露。



##[`dotenv`](https://github.com/motdotla/dotenv)

Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从 [环境目录](https://vite.vuejs.ac.cn/config/shared-options#envdir) 中的以下文件加载额外的环境变量。





#  `env.d.ts` 文件

在 Vue 3 项目中，`env.d.ts` 文件主要用于为 TypeScript 提供类型声明，尤其是在使用 Vite 构建工具时，它对项目中的环境变量（`import.meta.env`）提供类型支持。

## 主要作用
1. **扩展 TypeScript 的类型声明**  
   默认情况下，TypeScript 并不知道 `import.meta.env` 中的环境变量有哪些以及它们的类型。`env.d.ts` 用于为这些环境变量声明类型，使开发过程中能获得更好的类型检查和智能提示。

2. **管理和规范环境变量**  
   通过声明的方式，明确项目中可用的环境变量，避免使用不存在的或拼写错误的环境变量。

---

## 常见的 `env.d.ts` 内容
以下是一个典型的 `env.d.ts` 文件：
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // 其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**解释：**

- `/// <reference types="vite/client" />`：引入 Vite 的类型声明，使 TypeScript 知道 `import.meta.env` 的基本结构。
- `ImportMetaEnv` 接口：定义所有环境变量的类型。以 `VITE_` 开头的变量通常是 Vite 的约定（环境变量必须以 `VITE_` 开头才能被导入）。
- `ImportMeta` 接口：扩展 `import.meta` 对象，使其包含 `env` 属性。

---

## 使用示例
假设在 `.env` 文件中定义了以下内容：
```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My Vue App
```

在代码中，您可以这样使用：
```typescript
console.log(import.meta.env.VITE_API_URL); // https://api.example.com
console.log(import.meta.env.VITE_APP_TITLE); // My Vue App
```

如果没有 `env.d.ts` 文件或没有正确声明，TypeScript 会报错：
```
Property 'VITE_API_URL' does not exist on type 'ImportMetaEnv'.
```

---

## 优势
1. **减少错误**：明确列出环境变量，避免拼写错误或引用不存在的变量。
2. **增强可维护性**：团队成员可以清晰地了解有哪些环境变量可用。
3. **更好的开发体验**：提供智能提示和类型检查。

---

## 适用场景
- 使用 TypeScript 的 Vue 3 项目，尤其是基于 Vite 搭建的项目。
- 项目中需要管理多个环境变量（如开发环境和生产环境）。

如果你对环境变量的类型声明有更多需求，可以将 `ImportMetaEnv` 拓展得更全面。





# `import.meta.env` 和 `loadEnv()`



## `import.meta.env` 和 `loadEnv` 的使用场景不同

* `import.meta.env` 是在**运行时**获取环境变量的值，适用于应用程序代码中需要动态获取环境变量的场合。（**配置文件中获取不到**，因为配置文件是在构建时被读取！！！）

* 而 `loadEnv` 则是在构建时加载环境变量，适用于**打包时（构建时）**需要引用环境变量的场合。



## `loadEnv()` 介绍

在 Vue 3 项目中，**`loadEnv`** 是一个 Vite 提供的实用函数，用于加载指定模式（例如开发、生产、测试等）的环境变量到代码中。

**vite 中不支持 import.mete.env，环境变量通常从 process 获得。使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件。**

- 加载指定模式的 `.env` 文件（如 `.env.development`、`.env.production`）。
- 用于在构建配置文件（如 `vite.config.ts`）中动态加载和使用环境变量。

注：在**vite.config.js**中使用，不能用 **import.meta.env**。



## 详细介绍

我们需要使用 `loadEnv(mode, envDir)` 获取环境变量，

① `mode` - 构建模式；

② `envDir` - 环境变量的配置文件所在目录；

可以使用 `process.cwd()` 获取 `envDir`，该函数返回 node 的工作目录，一般为项目的根目录。

![](/AllFiles/Vue3/07-实战经验/Vue3环境变量/images/002.png)



### `vite.config.ts` 代码一：

```json
export default ({ command, mode }: any) => {
  //
  console.log('command', command);
  console.log('mode', mode);

  // 加载指定模式的环境变量
  // 可以使用 process.cwd() 获取 envDir，该函数返回 node 的工作目录，一般为项目的根目录
  const env = loadEnv(mode, process.cwd());
  // 访问环境变量
  console.log(env);
  console.log(env.VITE_BASE_PPP);

  // 合并到 process.env
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  console.log('process.env', process.env);

  return defineConfig({
    // 配置服务器路径
    base: '/xishan/',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // scss 全局变量的配置
    css: {
    },
    envPrefix: 'VUE_APP_',
  });
}
```



### `vite.config.ts` 代码二：

```json
export default defineConfig(({ command, mode }) => {
  //
  console.log('command', command);
  console.log('mode', mode);

  // 加载指定模式的环境变量
  // 可以使用 process.cwd() 获取 envDir，该函数返回 node 的工作目录，一般为项目的根目录
  const env = loadEnv(mode, process.cwd());
  // 访问环境变量
  console.log(env);
  console.log(env.VITE_BASE_PPP);

  // 合并到 process.env
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  console.log('process.env', process.env);
    
  return {
    // 配置服务器路径
    base: '/xishan/',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // scss 全局变量的配置
    css: {
    },
    envPrefix: 'VUE_APP_',
  };
});
```



