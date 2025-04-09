<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <!-- Widgets-->
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="domain" title="3153.66" :subTitle="'上证指数'":supTitle="'+8.52'+'     ' +'+0.26%'"  color="#dc3545"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="money_off" title="9556.04" :subTitle="'深证成指'" :supTitle="'+8.52'+'     ' +'+0.26%'" color="#dc3545"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="computer" title="1865.29" :subTitle="'创业板指'"  :supTitle="'+8.52'+'     ' +'+0.26%'" color="#dc3545"/>
      </v-flex>
      <v-flex d-flex lg3 sm6 xs12>
        <widget icon="watch_later" title="13.00%" :subTitle="'北证50'" :supTitle="'+8.52'+'     ' +'+0.26%'" color="#dc3545"/>
      </v-flex>
      <!-- Widgets Ends -->
      <!-- Statistics -->
      <v-flex d-flex lg4 sm6 xs12>
        <site-view-statistic/>
      </v-flex>
<!--      <v-flex d-flex lg4 sm6 xs12>-->
<!--        <location-statistic/>-->
<!--      </v-flex>-->
      <v-flex d-flex lg4 sm6 xs12>
        <total-earnings-statistic/>
      </v-flex>
      <!-- Statistics Ends -->
      <!-- DataTable&TimeLine Starts -->
      <v-flex d-flex lg8 sm6 xs12>
        <data-table/>
      </v-flex>
      <v-flex d-flex lg4 sm6 xs12>
        <time-line />
      </v-flex>
      <!-- DataTable&TimeLine Ends -->
      <v-flex d-flex lg6 sm6 xs12>
        <stepper/>
      </v-flex>
      <v-flex d-flex lg6 sm6 xs12>
        <user-tree-view />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`
    }
  }
}
</script>

<style>

</style>
