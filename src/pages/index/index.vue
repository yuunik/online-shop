<script setup lang="ts">
//
const change = () => {}
</script>

<template>
  <uni-calendar
    :insert="true"
    :lunar="true"
    :start-date="'2019-3-2'"
    :end-date="'2019-5-20'"
    @change="change"
  />
</template>

<style lang="scss">
//
</style>
