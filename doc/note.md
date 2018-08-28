# Vue cli 3 & Plop

---

## Sources:

* [Vue Cli](https://cli.vuejs.org/guide/)
* [Plop](https://plopjs.com/documentation/)

---

## Vue Cli 3

```sh
npm i -g @vue/cli

vue create <<proj>>
```

---

TODO:
vue-class-component
vuex-class: Type Script 在 vuex 會有問題，可靠此解決

---

## Plop

> 用來建立模板程式，減少重工或團隊協作定義

```sh
npm i -g plop

npm i -D plop
```

### 建立產生 component 的模版

> 目標是在 components/ 下建立 <ComponentName>/<ComponentName>.vue, <ComponentName>/index.js

基本上會經歷 2 個步驟：

1. 建立設定檔(<root>/plopfile.js)
2. 建立模版檔
   * plop-templates/<templateName>/<templateName>.plopvue
   * plop-templates/<templateName>/index.js

#### 建立設定檔 plopfile.js

```js
module.exports = function(plop) {
  // properCase 是 plop 內鍵轉成大駝峰
  // name 指的是 prompts 的 name 變數
  const name = '{{ properCase name }}';
  plop.setGenerator('component', { // Generator Name
    description: 'generate vue component', // Generator Description
    // prompts 是用來和使用者互動的訊息及操作
    prompts: [{
      type: 'input', // 要求使用者輸入
      name: 'name', // 定義要在 action 中用的變數名稱，綁定使用者多入的資料
      message: 'component name please' // 顯示給使用者的訊息
    }],
    // actions 是定義 plop 要執行的行為
    // 可以運用 plop 內鍵的 modifiers (eg. properCase)來做設定
    actions: [{
      type: 'add', // 要產生檔案
      path: `src/components/${name}/index.js`, // 目的檔案
      templateFile: 'plop-templates/component/index.plopjs' // 來源模板
    }, {
      type: 'add',
      path: `src/components/${name}/${name}.vue`,
      templateFile: 'plop-templates/component/component.plopvue'
    }]
  });

  plop.setGenerator('none', {});
};
```

### 建立模板

基本上，就是照本宣科把模版內容複製到目標路徑並產生檔案。
不過在模板中可以使用 {{}} 來運用 plop 內鍵函數及前而定義使用者屬入的變數。
只是若模板中原本就使用 Mustache 應該就會衝突吧？日後再測……


```html
<!-- component.plopvue -->
<template lang="pug">
  div
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>
<style lang="scss" scoped>

</style>
```

```js
// index.plopjs
export { default } from './{{ properCase name }}.vue'
```

[Plop Modifiers](https://plopjs.com/documentation/#case-modifiers)

模版的副檔名隨意，若要在 VS Code 中可以依語言 highlight，需設定：

```json
"files.associations": {
  "*.plopjs":"javascript",
  "*.plopvue": "vue",
},
```

---

### 透過模板產生檔案

* 方法一：

```sh
# 只用 plop 指令時，會依照 plopfile.js 定義顯示選項
>plop
? [PLOP] Please choose a generator. (Use arrow keys)
> component - generate vue component
  test

# 要求輸入(此處是輸入 Button)，Enter 後就會產生轉換結果
? component name please Button
[SUCCESS] add \src\components\Button\index.js
[SUCCESS] add \src\components\Button\Button.vue
```

* 方法二：

```sh
# 一氣呵成
>plop component Button
[SUCCESS] add \src\components\Button\index.js
[SUCCESS] add \src\components\Button\Button.vue
```

之後就可在 src/components/ 中看到 Button 目錄，其中包含了 Button.vue 及 index.js

---

附帶說明，上面產生 vue component 為何要附帶那個 index.js？
目的是要在 router import 時，不用指定全名 components/Button/Button.vue，只要 component/Button 即可，
它會自動找到 index.js 並依內容 export。
