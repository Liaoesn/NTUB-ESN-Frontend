# 啟動

- npm install 下載套件
- npm run dev 開啟server
- npm install @mui/material @emotion/react @emotion/styled 下載Mui套件

# 使用套件

- css:
    - scss: 可以使用 Easy Less 幫忙編譯，如果要換 scss or postcss 也可以

- icon:
    - material icon [連結](https://react-icons.github.io/react-icons/icons?name=md)

- sidebar:
    - [連結](https://www.npmjs.com/package/react-pro-sidebar)

- Mui:
    - [連結](https://www.npmjs.com/package/react-pro-sidebar)

# 說明

- global.d.ts 共用的型態直接放全域，component專屬直接放component內

- API如果是post body
    - config 可以省略
    - 細節內容多到說不完，建議ctrl + 左鍵點 post 可以觀看有哪些設定
      ```js
      API.post("URL_PATH", /* body 內容 */, config);
      ```