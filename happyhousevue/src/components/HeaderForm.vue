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
              <router-link to="{ name: 'board' }">공지사항</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">오늘의 뉴스</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">주변 탐방</a>
            </li>
          </ul>
          <button type="button" id="loginBtn">로그인</button>
          <button type="button" id="join">회원가입</button>
        </div>
      </div>
    </nav>
  </div>
  <!-- 로그인 후! 
			<c:if test="${userinfo ne null }">
				<div class="ml-2" id="welcome" >[${userinfo.username}님]</div>
				<button type="button" class="get-started-btn" id="logout"
					onclick="javascript: logout()">로그아웃</button>
				<button class="get-started-btn" id="infobtn"
					onclick="javascript: memberinfo()">회원정보</button>
			</c:if> -->
</template>

<script>
export default {
  name: 'HeaderForm',
};
</script>

<style></style>
