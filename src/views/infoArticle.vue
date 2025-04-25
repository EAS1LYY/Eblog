<template>
    <div class="infoBox">
        <div class="blog-info-box">
            <p>{{contentdata.title}}</p>
            <div class="blog-info-box-details">
                <icon-user />{{contentdata.authorId}}
                <icon-schedule />{{ formatTimestamp(contentdata.created) }}
                <icon-eye />{{contentdata.views}}次浏览 
                <icon-pen />{{contentdata.text.length}}字数
            </div>
        </div>
        <div class="card-box">
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <icon-home style="margin-right:5px" />
                    首页
                </a-breadcrumb-item>
                <a-breadcrumb-item>正文</a-breadcrumb-item>
              </a-breadcrumb>
        </div>
        <div class="articleboxa">
            <div class="image" style="background-image: url(https://www.toolr.cn/usr/uploads/2022/07/880690174.jpeg)"></div>
            <div class="markdownbox">
                <Viewer
                style="z-index: 1;"
                ref="markDownRef"
                :locale="zh"
                :value="value"
                :plugins="plugins"
                />
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script setup>
import {
  reactive,
  toRefs,
  markRaw,
  onMounted,
  nextTick,
  onUnmounted,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { Viewer } from "@bytemd/vue-next";
import { getProcessor } from "bytemd";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight"; // 代码高亮
import frontmatter from "@bytemd/plugin-frontmatter"; // 解析前题
import mediumZoom from "@bytemd/plugin-medium-zoom"; // 缩放图片
import breaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import "highlight.js/styles/googlecode.css"; //样式文件
import "bytemd/dist/index.css";
import "juejin-markdown-themes/dist/juejin.min.css"; // 掘金同款样式
import { findIndex } from "lodash";

import { reqarticleContent } from "@/api/article";

const formatTimestamp=(value)=> {
    const date = new Date(value*1000);
  // 使用toLocaleDateString转换为本地日期格式
     return date.toLocaleDateString();
}
const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
  highlightssr(),
];
/*
 *@Description: 状态初始化
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:36
 */
const state = reactive({
  value: "",
  plugins: markRaw(pluginsList),
  zh: zhHans,
  cateList: [], // 目录内容
  offsetTopList: [], //文档流中锚点距离顶部距离集合
  anchor: 0,
});
const postform=reactive({
  id:''
})
const contentdata=reactive({
    title:"",
    created:"",
    likes:"",
    authorId:"",
    views:"",
    text:""

})

const { anchor, value, plugins, zh, markDownRef, cateList } = toRefs(state);

onMounted(async () => {
    const router = useRouter();
    const currentPath = router.currentRoute.value.path;
    const articleid=currentPath.split('/').pop() || '';
    postform.id=articleid
    const articledata=await reqarticleContent(postform)
    contentdata.title=articledata.title
    contentdata.created=articledata.created
    contentdata.views=articledata.views
    contentdata.authorId=articledata.authorId
    contentdata.text=articledata.text
    state.value=articledata.text
});
</script> 