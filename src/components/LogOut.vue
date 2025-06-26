<template >
  <div v-if="isOpen" >
     <div class="header">
        <ul class="dropdown-menu">
      <li @click="handleLogout">注销</li>
    </ul>
     </div>
  </div>
</template>

<script setup>
import {ref, watch } from 'vue';
const props = defineProps({
    visible: Boolean,
})
const isOpen = ref(false);


watch(
    () => props.visible,
    (newVal) => 
    {
        if(newVal)
    {
        isOpen.value=true;
    }
    else{
        isOpen.value=false;
    }
    console.log('已更新:', newVal)
    }
);
const emit = defineEmits(['logout'])
const handleLogout = () => {
emit('logout')
};

// 点击外部关闭菜单
// onMounted(() => {
//   document.addEventListener('click', (e) => {
//     if (!e.target.closest('.dropdown-menu')) {
//       isOpen.value = true;
//     }
//   });
// });
</script>

<style scoped>
.header {
  position: absolute;
  top: 7%;
  right: 10px;
}

.dropdown-menu {
  position: sticky ; 
  /* left:20px; */
  top: 0;
  z-index: 999;
  width: 100px;
  height: 60px;
  background: rgb(233, 228, 228);
  border-radius: 10px;
 
}

</style>