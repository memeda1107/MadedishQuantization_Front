
<template>
   <v-card>
      <v-layout>
         <v-navigation-drawer
                 expand-on-hover
                 rail
         >
            <v-list>
               <v-list-item
                       prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                       title="拼盘量化"
               ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
<!--               <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>-->
<!--               <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>-->
<!--               <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>-->

               <v-list-item @click="changeRoute('HelloWorld', 1)">
                  <v-list-tile-action>
                     <v-icon>dashboard</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title :class="'item-title'" >行情</v-list-tile-title>
               </v-list-item>

                <v-list-item @click="changeRoute('CalendarStock', 2)">
                    <v-list-tile-action>
                        <v-icon>calendar_today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">复盘日记</v-list-tile-title>
                </v-list-item>



            </v-list>
         </v-navigation-drawer>

         <v-main style="height: 250px"></v-main>
      </v-layout>
   </v-card>
</template>
<script>
    export default {
         name: 'Navigation-bar',
        props: {
            msg: String
        },
        data() {
            return {
                selectedIndex: 1
            }
        },

        methods: {
            changeRoute(routeName) {
                debugger;
                console.log(routeName)
                // const vm = this;

                // vm.selectedIndex = selectedIndex;

                // return vm.$router.push({ name: routeName ,replace: true});
                // this.$router.push({ path: '/HelloWorld' })

                this.$router.replace({ path: '/HelloWorld' })
            }
        },



    }





</script>


<style>
   .toolbar {
      font-weight: bold;
      font-size: 18px;
   }

   .toolbar .text {
      padding-left: 15px;
      color: white;
      text-decoration:none;
   }

   .item-title {
      font-size: 17px;
      font-weight: 500;
   }
   .item-sub-title {
      font-size: 15px;
      font-weight: 500;
   }

   .active {
      font-weight: bold;
   }
</style>