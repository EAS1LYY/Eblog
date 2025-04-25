<template>
    <a-scrollbar>
        <div class="indexmain_container content_height">
            <div style="flex:1;display:flex;flex-direction: column;background: #f1f3f4;">
                <div class="content-box content_height">
                    <router-view></router-view>
                </div>
                <div class="copyrightvisible bottom_copyright">
                    QiaoXijie<a href="https://beian.miit.gov.cn" target="_blank">
                        津ICP备2022000997号-1
                    </a>
                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=12011302120410" target="_blank">
                        <img style="width:14px;height:14px" src="https://www.toolr.cn/备案图标.png"/>
                        津公网安备 12011302120410号
                    </a>
                </div>
            </div>
            <div class="rightsider" style="background-color: #f9f9f9;background-size: 100% 100%;  background-size: 100% 100%;background-attachment: fixed;">
                <rightSider :key="componentKey"></rightSider>
            </div>
        </div>
    </a-scrollbar>
</template>
<script setup>
import rightSider from '@/components/rightSider.vue';
</script>
<style>

</style>