<template>
    <div class="rightSiderBox ">
        <!--博客信息-->
        <div class="info">博客信息</div>
        <div class="blog-infobox">
            <div class="button-item">
                <div class="center" style="flex:1;"><icon-archive class="center" :size="16" style="margin-left:10px;margin-right:10px" />文章数目</div>
                <div class="badge">{{ BasicDataForm.total }}</div>
            </div>
            <div class="button-item">
                <div class="center" style="flex:1;"><icon-calendar class="center" :size="16" style="margin-left:10px;margin-right:10px" />运行天数</div>
                <div class="badge">{{ BasicDataForm.time }}天</div>
            </div>
            <div class="button-item">
                <div class="center" style="flex:1;"><icon-user class="center" :size="16" style="margin-left:10px;margin-right:10px" />访客总数</div>
                <div class="badge">{{ BasicDataForm.Visitor }}</div>
            </div>
            <div class="button-item">
                <div class="center" style="flex:1;"><icon-pen  class="center" :size="16" style="margin-left:10px;margin-right:10px" />全站字数</div>
                <div class="badge">{{ BasicDataForm.words }}</div>
            </div>
        </div>
    </div>
    <div style="position: sticky;top: 5px;background-attachment: fixed;padding: 20px;background-color: #f9f9f9;flex-direction: column;" v-if="routerpath()">
      <div style="margin-top:20px;" class="info">目录</div>
      <div class="blog-infobox">
         <a-scrollbar class="scroll">
            <ul>
              <li
                type="text"
                v-for="(item, index) in cateList"
                :key="index"
                :class="[
                  { active: anchor == index },
                  item.tagName + '-class',
                ]"
              >
                <button class="button-item">{{ item.text }}</button>
              </li>
            </ul>
          </a-scrollbar>
        </div> 
    </div>
</template>
<style>
.info{
  font-size: 14px;
  font-weight: 700;
  color: #777;
}
.rightSiderBox{  
    background-attachment: fixed;
    padding: 20px;
    background-color: #f9f9f9;
    flex-direction: column;
    .grid-wapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .grid-view {
          width: 1200px;
        }
      }
    .scroll {
        overflow: auto;
        max-height: calc(60vh);
      }    
    .blog-infobox{
        margin-right: 20px;
        margin-top: 10px;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
    }
    .info{
        font-size: 14px;
        font-weight: 700;
        color: #777;
    }

        .badge {
            font-size: 12px;
            background-color: #f4f4f4;
            color: #555;
            text-shadow: none !important;
            font-weight: 400;
            border-radius: 4px;
            padding: 5px;
        }
    .button-item {
        display: flex;
        background-color: white;
        font-size: 14px;
        border: 0;
        width: 90%;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 3px;
        color: #777;
        font-weight: 700;
      }
      .center{
        font-size: 12px;
        display: flex;
        align-items: center;
      }
}
  .scroll-container {
    overflow: hidden;
    scrollbar-width: none; /* 针对Firefox */
  }
  .arco-scrollbar-thumb {
    display: none;
}
 
  /* 针对其他浏览器隐藏滚动条 */
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  li {
    letter-spacing: 0.04em;
    line-height: 2em;
    color: #3d3d3d;
  }
  ul{
    list-style: none;
    margin: 0;
    padding: 10px;
  }
  .blog-infobox{
    margin-right: 20px;
    margin-top: 10px;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}
.button-item {
  display: flex;
  background-color: white;
  font-size: 14px;
  border: 0;
  width: 90%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px;
  color: #777;
  font-weight: 700;
}
</style>
<script setup>
import {
  reactive,
  toRefs,
  markRaw,
  onMounted,
  nextTick,
  onUnmounted,
  ref,} from "vue";
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
import { reqBasicData, reqarticleContent, reqarticleList } from "@/api/article";
import { computed } from 'vue';

const pluginsList = [
  gfm(),
  gemoji(),
  highlight(),
  frontmatter(),
  mediumZoom(),
  breaks(),
  highlightssr(),
];
const containerRef = ref()
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
const { anchor, value, plugins, zh, markDownRef, cateList } = toRefs(state);

onMounted(async () => {
  getCataLogData();
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandle);
});

const treelist=async ()=>{
  const router = useRouter();
    const currentPath = router.currentRoute.value.path;
    const articleid=currentPath.split('/').pop() || '';
    postform.id=articleid
    const articledata=ref(await reqarticleContent(postform))
    state.value=articledata.value.text
}
const routerpath=()=>{
  const router = useRouter();
  const currentPath = router.currentRoute.value.path;
  if(currentPath=="/" || currentPath=="/picture" || currentPath.includes("assort")){
    return false;
  }else{
    treelist()
    getCataLogData();
    return true;
  }
}


const BasicDataForm=reactive({
  'words':'',
  'time':'',
  'total':'',
  'Visitor':''

})
const BasicData=async ()=>{
  const BasicData=await reqBasicData()
  const num = parseInt(BasicData.Words, 10);
      if (num >= 10000) {
        BasicDataForm.words=`${num / 10000}万`;
      }else{
        BasicDataForm.words=BasicData.Words;
      }
      BasicDataForm.Visitor=BasicData.webConfig.webVisitor
      const currentDate = new Date();
      const startDate = new Date('2021-12-25');
      // 计算时间差，单位为毫秒
      const timeDiff = currentDate - startDate;
      // 将时间差转换为天数
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      // 向下取整得到整数天数
      BasicDataForm.time=Math.floor(daysDiff);
      const articledata=ref(await reqarticleList("1"));
      BasicDataForm.total=articledata.value.total

}
BasicData();

/*
 *@Description: 获取目录
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:49
 */
const getCataLogData = () => {
  getProcessor({
    plugins: [
      {
        rehype: (p) =>
          p.use(() => (tree) => {
            if (tree && tree.children.length) {
              createCataLog(tree);
            }
          }),
      },
    ],
  }).processSync(state.value);
};

const createCataLog = (tree) => {
  const items = [];
  tree.children
    .filter((v) => v.type == "element")
    .forEach((node) => {
      if (
        node.tagName === "h1" ||
        node.tagName === "h2" ||
        node.tagName === "h3" ||
        node.tagName === "h4" ||
        node.tagName === "h5" ||
        (node.tagName === "h6" && node.children.length > 0)
      ) {
        items.push({
          tagName: node.tagName,
          text: stringifyHeading(node),
        });
      }
    });
  state.cateList = items;
};

const stringifyHeading = (node) => {
  let result = "";
  node.children.forEach((item) => {
    if (item.type == "text") {
      result += item.value;
    }
  });
  return result;
};
/*
 *@Description: 设置锚点ID
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 17:03:21
 */
const transformToId = () => {
  const dom = document.querySelector(".markdown-body");
  let children = Array.from(dom.children);
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const tagName = children[i].tagName;
      if (tagName === "H1" || tagName === "H2" || tagName === "H3") {
        const index = findIndex(
          state.cateList,
          (v) => v.text === children[i].textContent
        );
        if (index >= 0) {
          children[i].setAttribute("id", `head-${index}`);
        }
      }
    }
  }
};
/**
 * 目录与标题联动问题
 * 1:点击目录滚动到锚点
 * 2:监听滚动-获取滚动位置最近的标签-做目录联动
 *
 */
const scrollToSection = (sectionId, index) => {
  state.anchor = index;
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = 100;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
const getCalcLateTop = () => {
  const mainEl = document.querySelector("#main");
  state.offsetTopList = state.cateList.map((item, index) => {
    const element = document.querySelector(`#head-${index}`);
    return {
      offsetTop: index === 0 ? mainEl.offsetTop : element.offsetTop,
      anchor: index,
    };
  });
};
const scrollHandle = () => {
  const curScrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;

  let flag = true;
  const len = state.offsetTopList.length;
  const min = state.offsetTopList[0].offsetTop;
  // 滚动的距离 小于 第一个锚点距离顶部的距离
  if (curScrollTop < min) {
    state.anchor = 0;
    return;
  }
  // 滚动的距离 与 全部锚点距离顶部距离的集合 比较 获取最近的锚点标识
  for (let i = len - 1; i >= 0; i--) {
    const curReference = state.offsetTopList[i].offsetTop; // 当前参考值
    if (flag && curScrollTop >= curReference - 100) {
      flag = false;
      state.anchor = state.offsetTopList[i].anchor;
    }
  }
};
</script>
