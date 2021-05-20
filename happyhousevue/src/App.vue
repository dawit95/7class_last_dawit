<template>
  <div id="app">
    <header-form />
    <div id="contains">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderForm from '@/components/HeaderForm';

export default {
  name: 'app',
  components: {
    HeaderForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
