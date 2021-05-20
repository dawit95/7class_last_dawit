<template>
  <div id="app">
    <label for="id">id</label>
    <input type="id" name="id" id="id" v-model="loginID" />
    <label for="pw">pw</label>
    <input type="pw" name="pw" id="pw" v-model="loginPW" />
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
import axios from '@/util/http-common';
const storage = window.sessionStorage;

export default {
  data() {
    return {
      loginID: '',
      loginPW: '',
      message: '로그인해주세요.',
      status: '',
      token: '',
      info: '',
    };
  },
  methods: {
    setInfo(status, token, info) {
      this.status = status;
      this.token = token;
      this.info = info;
    },
    logout() {
      storage.setItem('jst-auth-token', '');
      storage.setItem('login_user', '');
      this.message = '로그인해주세요.';
      this.setInfo('로그아웃 성공', '', '');
    },
    getInfo() {
      axios
        .post(
          '/info',
          {
            id: 'commonID',
            pw: 'some pw',
          },
          {
            headers: {
              'jwt-auth-token': storage.getItem('jwt-auth-token'),
            },
          }
        )
        .then((res) => {
          this.setInfo('정보 조회 성송', res.headers.auth_token, JSON.stringify(res.data));
        })
        .catch((e) => {
          this.setInfo('정보 조회 실패', '', e.response.data.msg);
        });
    },
    login() {
      storage.setItem('jwt-auth-token', '');
      storage.setItem('login_user', '');
      let obj = {};
      obj.id = this.loginID;
      obj.pw = this.loginPW;
      axios
        .post('/member/signin', obj)
        .then((res) => {
          console.log(res);
          if (res.status) {
            this.message = res.data.data.id + '로 로그인 되었습니다.';
            console.dir(res.headers['jst-auth-token']);
            this.setInfo('성공', res.headers['jwt-auth-token'], JSON.stringify(res.data.data));
            storage.setItem('jwt-auth-token', res.headers['jwt-auth-token']);
            storage.setItem('login_user', res.data.data.id);
          } else {
            this.setInfo('', '', '');
            this.message = '로그인해주세요.';
            alert('입력 정보를 확인하세요.');
          }
        })
        .catch((e) => {
          this.setInfo('실패', '', JSON.stringify(e.response || e.message));
        });
    },
    init() {
      if (storage.getItem('jwt-auth-token')) {
        this.message = storage.getItem('login_user') + '로 로그인 되었습니다.';
      } else {
        storage.setItem('jwt-auth-token', '');
      }
    },
  },
  mounted() {
    this.init();
  },
};
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
