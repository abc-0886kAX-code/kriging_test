<script setup>
import { uuid } from "@/shared/uuid.js";
import { useUserStore } from "@/store/useUser";
const user = useUserStore();
user.setupToken(uuid());
</script>

<template>
    <div></div>
</template>

<style scoped lang="scss"></style>
