<template>
  <div id="app">
    <headerForm/>
    <searchForm/>
    <div id="nav">네비게이션 바</div>
    <div id="contains">
      <span>라우터 뷰가 아래에 보일 겁니다</span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderForm from "@/components/HeaderForm"
import SearchForm from "@/components/SearchForm"

export default {
  name: 'app',
  components: {
    HeaderForm,
    SearchForm,
  }
}
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
