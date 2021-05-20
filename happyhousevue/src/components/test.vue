<template>
  <div id="app">
    <label for="id">id</label>
    <input type="id" name="id" id="id" v-model="id" />
    <label for="password">password</label>
    <input type="password" name="password" password="password" v-model="password" />
    <input type="submit" value="로그인" id="login" @click="login" />
    <hr />
    <span>
      사용자 정보:
      <span>{{ message }}</span>
    </span>
    <hr />
    <button id="getInfo" @click="getInfo">정보확인</button>
    <button id="logout" @click="logout">로그아웃</button>
    <hr />
    <table>
      <tr>
        <th>상태</th>
        <td id="status">{{ status }}</td>
      </tr>
      <tr>
        <th>토큰</th>
        <td id="token">{{ token }}</td>
      </tr>
      <tr>
        <th>정보</th>
        <td id="info">{{ info }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  word-break: break-all;
}
th {
  width: 50px;
}
td,
th {
  border: 1px solid black;
}
</style>
