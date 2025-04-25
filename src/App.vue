<template>
  <div style="height: 100%">
    <router-view />
  </div>
</template>

<style>
@import url("./css/joeBlog.css");
@font-face{
  font-family:FontStyle;
  src:url('./assets/12.woff2') format('truetype');;
  font-display:swap;
}
*{
  font-family:FontStyle;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: white;
  height: 100%;
}
html, body {
  height: 100%; /* 将 html 和 body 的高度设置为100% */
  margin: 0; /* 重置默认的外边距 */
  overflow: hidden; /* 防止页面出现滚动条 */
}
</style>
