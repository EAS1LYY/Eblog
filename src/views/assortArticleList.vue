<template>
    <div ref="childComponent" class="articleListbox">
        <div class="articlebox">
            <a-card @click="routerPush(articleitem.id)" v-for="articleitem in articleassortlist" :key="articleitem.id"
                class="card"
                hoverable
                >
                <div class="image" style="background-image: url(https://www.toolr.cn/usr/uploads/2022/07/880690174.jpeg);">
                </div>
              <div class="article_title">
                {{articleitem.title}}
                <div class="article_info">
                    <icon-user />EAS1LY <icon-calendar /> {{formatTimestamp(articleitem.created)}}
                </div>
                </div>
            </a-card>
            <div class="pagecenter">
                <div class="pagecard">
                    <a-pagination @change="changepage" :page-size="5" :total="total" />
                </div>
            </div>

        </div>
    </div>

</template>
<style>
.articleListbox{
    background: rgb(241, 243, 244);
    display: flex;
    flex-direction: column;
    .blog-info-box{
        background-color: white;
        padding: 15px;
        .font-thin {
            font-weight: 400;
        }
        
        .l-h {
            line-height: 1.42857143;
        }
        .m-n {
            margin: 0 !important;
        }
        .text-black {
            color: #000;
        }
        .h1, h1 {
            font-size: 30px;
        }
    }
    .article_info{
        background: #fafafa;
        padding: 10px;
        border-radius: 5px;
        font-size: small;
        margin-right: 20px;
        margin-top: 10px;
        text-align: center;
        margin-bottom: 20px;
    }
    .articlebox{
        margin: 20px;
        .arco-card-size-medium .arco-card-body {
            padding: 0px 0px;
        }
        .article_title{
            font-size: large;
            margin-top: 20px;
            margin-left: 30px;
            margin-right: 30px;
            color: inherit;
            text-decoration: none;
            cursor: pointer;
            word-break: break-all;
        }
        .image{
                min-height: 250px;
                position: relative;
                display: block;
                background-position: 50% 50%;
                background-size: cover;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
        }
    }
}
.pagecenter{
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagecard{
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-top: 20px;
    transition-property: all;
    border-radius: 6px;
    border: none;
    position: relative;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}
.card {
    margin-top:20px ;
    transition-property: all;
    border-radius: 6px;
    border: none;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
  }
.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 10px rgba(73, 90, 47, 0.47);
  }

</style>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {reqassortarticleList} from '../api/article.js'
const $router = useRouter();
const articleassortlist=ref()
const total=ref()

function routerPush(value) {
            $router.push("/infoArticle/"+value);
        }
const formatTimestamp=(value)=> {
    const date = new Date(value*1000);
  // 使用toLocaleDateString转换为本地日期格式
     return date.toLocaleDateString();
}

const assort=reactive({
  id:''
})
const getarticleassortList = async () => {
    assort.id=localStorage.getItem('assortid')
const articledata=ref(await reqassortarticleList("1",assort.id));
articleassortlist.value=articledata.value.content
total.value=articledata.value.total
}
const changepage=async(current)=>{
    const articledatapage=ref(await reqassortarticleList(current,assort.id));
    articleassortlist.value=articledatapage.value.content
    total.value=articledatapage.value.total
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
}

getarticleassortList();
</script>