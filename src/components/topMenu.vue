<template>
    <div id="parentNode" class="header-box">
        <!--手机头部-->
        <div class="phone-box">
            <div class="row">
                <a-button @click="handleClick" style="width:50px;height:50px;background-color:rgba(255, 255, 255, 0);">
                <template #icon>
                    <icon-menu style="color:white" />
                </template>
              </a-button>
              <div class="header-title"><icon-home :size="18" style="color:white;margin-right:15px" />{{ webConfig.webName }}</div>
              <a-button style="width:50px;height:50px;background-color:rgba(255, 255, 255, 0);">
                <template #icon>
                    <icon-search style="color:white" />
                </template>
              </a-button>    
            </div>
        </div>
        <!--电脑头部-->
        <div class="desktop-box">
            <div class="row">
                <div class="desktop-box-title">
                    <div class="header-title"><icon-home :size="18" style="color:white;margin-right:5px" />{{ webConfig.webName }}</div>
                </div>
                <!--搜索-->
                <!-- <div class="desktop-box-inputbox">
                    <div class="desktop-box-shadow">
                        <a-input class="desktop-box-input" placeholder="请输入字段" allow-clear />
                        <a-button class="desktop-box-input-button" style="background-color:white;" type="primary">
                            <template #icon>
                              <icon-search style="color:black" />
                            </template>
                        </a-button>
                    </div>
                </div> -->
                <!-- 头像
                <div class="desktop-box-imagebox">
                    <a-button class="desktop-box-imagebox-button" type="text">
                        <span style="margin-right:10px;color:black">
                            <span class="desktop-box-imagebox-name">{{ webConfig.webAuthor }}</span>
                        </span>
                        <a-avatar class="desktop-box-imagebox-avatar" :style="{ backgroundColor: '#3370ff' }">
                            <img
                            alt="avatar"
                            :src="webConfig.webAuthorAvatar"
                          />
                          </a-avatar>
                        
                    </a-button>
                </div> -->
            </div>


        </div>
    </div>

<!--侧栏-->
    <a-drawer 
    :width="340" 
    :visible="visible" 
    @ok="handleOk" 
    @cancel="handleCancel" 
    placement="left" 
    :header="false"
    :footer="false"
    :hide-cancel="true"
    popup-container="#parentNode"
    unmountOnClose>
    <div class="leftSiderBox-TOP">
        <!--头像和用户名-->
        <div class="leftSiderBox-TOP-infoBox">
            <a-avatar class="leftSiderBox-TOP-infoBox-image">
                <img
                  alt="avatar"
                  :src="webConfig.webAuthorAvatar"
                />
            </a-avatar>
            <div class="leftSiderBox-TOP-infoBox-nametitle">
                <div class="leftSiderBox-TOP-infoBox-title">{{ webConfig.webAuthor }}</div>
                <span class="leftSiderBox-TOP-infoBox-word">{{ webConfig.webAuthorIntroduce }}</span>
            </div>
        </div>
        <!--选项-->
        <div class="leftSiderBox-TOP-selectBox">
            <button @click="routerPush('/')" class="TOPleftbutton-item">
                <icon-home :size="16" style="margin-left:10px;margin-right:10px" />主页
            </button>
            <button @click="routerPush('/picture')" class="TOPleftbutton-item">
                <icon-image :size="16" style="margin-left:10px;margin-right:10px" />相册
            </button>
            <button class="TOPleftbutton-item">
                <icon-cloud-download :size="16" style="margin-left:10px;margin-right:10px" />下载
            </button>
            <button class="TOPleftbutton-item">
                <icon-archive :size="16" style="margin-left:10px;margin-right:10px" />归档
            </button>
            <a-divider />
            <button @click="assorthandle" class="TOPleftbutton-item">
                <icon-apps :size="16" style="margin-left:10px;margin-right:10px" />
                <span>分类</span>
                <icon-right :size="16" style="margin-left:10px;margin-right:10px;float:right" />
            </button>
            <div class="assort-box"  v-if="assortvisible">
                <button class="assort-item">
                    归档
                </button>
            </div>
        </div>
        <!--底部-->
        <div class="left_footer">
            <a-tooltip content="后台管理">
                <a-button type="text">
                    <template #icon>
                        <icon-settings style="color:black" />
                    </template>
                  </a-button>
              </a-tooltip>
        </div>
    </div>
      </a-drawer>


</template>
<style>
.left_footer {
    border-radius: 5px;
    float: bottom;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
    margin: 10px;
    background-color: white;
    padding: 5px;
}
.leftSiderBox-TOP{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.leftSiderBox-TOP-infoBox{
    display: flex;
    padding-top: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
}
.assort-box{
    margin: 10px;
    border-radius: 5px;
    background-color: white;
    padding: 10px;
}
.leftSiderBox-TOP-infoBox-image{
    width: 80px;
    height: 80px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}
.leftSiderBox-TOP-infoBox-nametitle{
    margin-top: 10px;
}
.leftSiderBox-TOP-infoBox-title{
    font-size: 14px;
    font-weight: bold;
    color: #777;
}
.leftSiderBox-TOP-infoBox-word{
    color: #888888;
    font-size: 12px;
    font-weight: 600;
}
.leftSiderBox-TOP-selectBox{
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    margin-top: 10px;
    width: 100%;
}
.TOPleftbutton-item {
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
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s; /* 背景颜色变化过渡动画 */
    cursor: pointer; /* 鼠标悬停时显示指针形状 */
    border-radius: 3px;
    color: #777;
    font-weight: 700;
  }
  .assort-item{
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 14px;
    border: 0;
    width: 100%;
    text-align: left;
    background-color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s; /* 背景颜色变化过渡动画 */
    cursor: pointer; /* 鼠标悬停时显示指针形状 */
    border-radius: 3px;
    color: #777;
    font-weight: 700;
  }
  .assort-item:hover {
    background-color: #d4d4d4; /* 鼠标悬停时的背景颜色 */
  }
  .leftbutton-item:hover {
    background-color: #d4d4d4; /* 鼠标悬停时的背景颜色 */
  }






.header-box{
    z-index: 999;
    background-color: #f9f9f9;
    height: 50px;
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, .05);
}
.header-title{
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    height: 50px;
}
.desktop-box{
    .desktop-box-title{
        width: 250px;
        background-color: #23b7e5;
    }
    .desktop-box-input{
        background-color: white;
        width: 150px;
        height: 30px;
    }
    .desktop-box-inputbox{
        flex: 1;
        margin-left: 10px;
        height: 50px;
        display: flex;
        align-items: center;
    }
    .desktop-box-input-button{
        background-color: white;
        height: 30px;
        width: 30px;
    }
    .desktop-box-shadow{
        box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
    }
    .desktop-box-imagebox{
        display: flex;
        align-items: center;
        float: right;
        height: 50px;
    }
    .desktop-box-imagebox-button{
        margin-right: 5px;
        height: 40px;
    }
    .desktop-box-imagebox-avatar{
        width: 32px;
        height: 32px;
    }
    .desktop-box-imagebox-name{
        font-weight: 700;
        color: #777;
    }
}
</style>
<script>
import { ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
import { reqBasicData } from '@/api/article';

export default {
  setup() {
    const visible = ref(false);
    const assortvisible=ref(false)
    const handleClick = () => {
      visible.value = true;
    };
    const assorthandle=async () => {
    if (assortvisible.value==false) {
        assortvisible.value=true
    }else{
        assortvisible.value=false
    }
}
const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }
    const $router = useRouter();
    const routerPush=(path)=> {
    $router.push(`${path}`);
  }
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
    getBasicData()
    return {
      visible,
      handleClick,
      assortvisible,
      assorthandle,
      handleOk,
      handleCancel,
      routerPush,
      webConfig
    }
  },
};

</script>