<script setup>
import topMenu from '../components/topMenu.vue'
import leftsider from '../components/leftSider.vue'
import indexMain from '../views/indexMain.vue'
</script>
<template>
    <div id="container" class="box app container">
            <a-layout>
                <a-layout-header><topMenu></topMenu></a-layout-header>
            <a-layout class="height">
                    <div class="leftsider" style="background:rgba(0, 0, 0, 0)">
                        <a-layout-sider :width="250" style="height:100%"><leftsider></leftsider></a-layout-sider>
                    </div>
                    <a-layout-content>
                        <indexMain></indexMain>
                    </a-layout-content>
                </a-layout>
                <a-layout-footer></a-layout-footer>
            </a-layout>
    </div>

</template>
<style>

</style>