<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <h1 class="logo mr-auto">
          <img id="logo_img" src="img/logo.png" width="60" alt="" />
          Happy House
        </h1>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/board">공지사항</router-link>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="">오늘의 뉴스</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">주변 탐방</a>
            </li> -->
          </ul>

          <!-- 로그인 안함. -->
          <div class="navbar-nav ml-auto" v-if="!currentUser">
            <li class="nav-item">
              <a href="/login" class="nav-link"> <font-awesome-icon icon="sign-in-alt" /> Login </a>
            </li>
            <li class="nav-item">
              <a href="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Sign Up
              </a>
            </li>
          </div>

          <!-- 로그인 함. -->
          <div class="navbar-nav ml-auto" v-if="currentUser">
            <li class="nav-item">
              <a href="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </a>
            </li>
            <li class="nav-item">
              <a href class="nav-link" @click="logOut">
                <font-awesome-icon icon="sign-out-alt" /> LogOut
              </a>
            </li>
          </div>
        </div>
        <!-- 제목 옆 nav 목록 끝! -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderForm',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
