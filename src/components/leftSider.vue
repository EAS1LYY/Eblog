<template>
    <div class="leftSiderBox">
        <!--头像和用户名-->
        <div class="leftSiderBox-infoBox">
            <a-avatar class="leftSiderBox-infoBox-image">
                <img
                  alt="avatar"
                  :src="webConfig.webAuthorAvatar"
                />
            </a-avatar>
            <div class="leftSiderBox-infoBox-nametitle">
                <div class="leftSiderBox-infoBox-title">{{ webConfig.webAuthor }}</div>
                <span class="leftSiderBox-infoBox-word">{{ webConfig.webAuthorIntroduce }}</span>
            </div>
        </div>
        <!--选项-->
        <div class="leftSiderBox-selectBox">
            <button @click="routerPush('/')" class="leftbutton-item">
                <icon-home :size="16" style="margin-left:10px;margin-right:10px" />主页
            </button>
            <button @click="routerPush('/picture')" class="leftbutton-item">
                <icon-image :size="16" style="margin-left:10px;margin-right:10px" />相册
            </button>
            <button class="leftbutton-item">
                <icon-cloud-download :size="16" style="margin-left:10px;margin-right:10px" />下载
            </button>
            <button class="leftbutton-item">
                <icon-archive :size="16" style="margin-left:10px;margin-right:10px" />归档
            </button>
            <a-divider />
            <button @click="assorthandle" class="leftbutton-item">
                <icon-apps :size="16" style="margin-left:10px;margin-right:10px" />
                <span>分类</span>
                <icon-right :size="16" style="margin-left:10px;margin-right:10px;float:right" />
            </button>
            <div class="assort-box"  v-if="assortvisible">
                <div v-for="item in assortlistData.value.content" :key="item.id">
                    <button @click="assortpush(item.id)" class="assort-item">
                    {{ item.name }}
                </button>
                </div>

            </div>
        </div>
        <!--底部-->
        <div class="left_footer">
            <a-tooltip @click="routerPush('controller/login')" content="后台管理">
                <a-button type="text">
                    <template #icon>
                        <icon-settings style="color:black" />
                    </template>
                  </a-button>
              </a-tooltip>
        </div>
    </div>
</template>
<style>

</style>
<script setup>
import {ref,reactive} from 'vue';
import { useRouter } from "vue-router";
import { reqAssortList } from '@/api/assort';
import { reqBasicData } from '@/api/article';

const webConfig=reactive({
    webName:'',
    webIntroduce:'',
    webAuthor:'',
    webAuthorIntroduce:'',
    webAuthorAvatar:''
});
const getBasicData=async()=>{
    const req=ref(await reqBasicData())
    webConfig.webName=req.value.webConfig.webName
    webConfig.webIntroduce=req.value.webConfig.webIntroduce
    webConfig.webAuthor=req.value.webConfig.webAuthor
    webConfig.webAuthorIntroduce=req.value.webConfig.webAuthorIntroduce
    webConfig.webAuthorAvatar=req.value.webConfig.webAuthorAvatar
}

const assortvisible=ref(false)
const assortlistData=ref()
const assorthandle=async () => {
    if (assortvisible.value==false) {
        assortvisible.value=true
    }else{
        assortvisible.value=false
    }
}
const $router = useRouter();
  function routerPush(path) {
    $router.push(`${path}`);
  }
  const assortlist=async ()=>{
    assortlistData.value=ref(await reqAssortList())
  }
  const assortpush=async(id)=>{
    $router.push(`/assort/`);
    localStorage.setItem('assortid',id)
    await sleep(1000);
    location.reload()
  }
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
getBasicData()
  assortlist()
</script>
