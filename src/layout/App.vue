<!--
 * @FilePath: \vue2.7_Mars3D_template\src\layout\App.vue
 * @Author: maggot-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 11:17:05
 * @Description:
-->
<script setup>
import MainLayout from "@/layout/main-layout";
import Popup from "@/layout/Popup.vue";
import ProgressMask from "@/components/ProgressMask.vue";
</script>

<template>
    <div id="app">
        <ProgressMask></ProgressMask>
        <Popup>
            <main-layout></main-layout>
        </Popup>
    </div>
</template>

<style scoped lang="scss"></style>
