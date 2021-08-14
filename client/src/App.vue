<template>
  <div id="app">
    <!-- <TopBar></TopBar> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import TopBar from './components/TopBar.vue';
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    }
  }, 
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false 
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
  // components: {
  //   TopBar
  // },
};
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: Arial;
  }

  button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }
</style>

