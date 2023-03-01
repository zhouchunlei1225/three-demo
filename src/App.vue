<template>
  <div class="box">

    <div class="left">
      <Menu theme="dark">
        <MenuItem :to="item.path" :name="item.name" v-for="(item,index) in myRouter" :key="index">
          {{ item.title }}
        </MenuItem>
      </Menu>
    </div>

    <div class="right">
      <RouterView/>
    </div>


  </div>
</template>


<script setup>
import {onMounted, ref, reactive} from 'vue'
import {useRouter} from 'vue-router'

//  渲染左侧的菜单栏
const Router = useRouter()
const myRouter = reactive([...Router.options.routes])

console.log(myRouter)


</script>

<style scoped>
.box {
  display: flex;
  height: 100%;
  width: 100%;
}

.left .ivu-menu {
  width: 100%;
  height: 100%;
}

.right {
  flex: 1;
  overflow: hidden;
}

.right > div {
  height: 100%;
  width: 100%;
}
</style>
