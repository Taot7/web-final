<script>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="page-container">
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </RouterView>
  </div>
</template>
  
<style>
.page-container{
  width: 100%;
  height: 100%;
}

</style>
