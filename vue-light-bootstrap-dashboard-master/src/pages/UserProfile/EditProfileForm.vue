<template>
  <card>
    <h4 slot="header" class="card-title">회원 가입</h4>
      <form>
        <!-- (#{id}, #{pw}, #{name}, #{email}, #{phone}, #{gender}, #{birthdate}, #{address}, curdate(), #{type} -->
        <div class="row">
          <div class="col-md-5">
            <div>
              <base-input type="text"
                      label="아이디"
                      :disabled="true"
                      placeholder="아이디"
                      v-model="user.id">
              </base-input>
            </div>
          </div>
          <div class="col-md-3">
            <base-input type="text"
                      label="이름"
                      placeholder="이름"
                      v-model="user.name">
            </base-input>
          </div>
          <div class="col-md-4">
            <base-input type="email"
                      label="이메일"
                      placeholder="이메일"
                      v-model="user.email">
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input type="password"
                      label="비밀번호"
                      placeholder="비밀번호"
                      v-model="user.pw">
            </base-input>
          </div>
          <div class="col-md-6">
            <base-input type="password"
                      label="비밀번호 확인"
                      placeholder="비밀번호 확인"
                      v-model="user.pwConfirm">
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <base-input type="text"
                      label="주소"
                      placeholder="주소"
                      v-model="user.address">
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <base-input type="text"
                      label="전화번호"
                      placeholder="전화번호"
                      v-model="user.phone">
            </base-input>
          </div>
          <div class="col-md-4">
            <b-form-group label="성별" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="user.gender"
                :aria-describedby="ariaDescribedby"
                name="genderRadio"
              >
                <b-form-radio value="M">남자</b-form-radio>
                <b-form-radio value="F">여자</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <div>생일</div>
            <b-form-datepicker id="birth-datepicker" v-model="user.birthdate" class="mb-2"></b-form-datepicker>
          </div>
        </div>

        <div class="text-center">
          <button type="reset" class="btn btn-danger btn-fill float-right">
            초기화
          </button>
          <button type="button" class="btn btn-info btn-fill float-right" @click.prevent="checkForm">
            회원 가입
          </button>
        </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'

const storage = window.sessionStorage;

export default {
  components: {
    Card
  },
  data () {
    return {
      user: {
        id: '',
        pw: '',
        pwConfirm: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthdate: '',
        address: '',
        type: 'user',
      }
    }
  },
  created() {
    const jwt = require("jsonwebtoken");
    const decodeAccessToken = jwt.decode(
      storage.getItem("at-jwt-access-token"),
      "MYSALT",
      { algorithms: ["HS256"] }
    );

    this.user.id = decodeAccessToken.Member.id;
    this.user.name = decodeAccessToken.Member.name;
    this.user.email = decodeAccessToken.Member.email;
    this.user.address = decodeAccessToken.Member.address;
    this.user.phone = decodeAccessToken.Member.phone;
    this.user.gender = decodeAccessToken.Member.gender;

    let str = decodeAccessToken.Member.birthdate;
    let year = str.slice(0, 2);
    let month = str.slice(2, 4);
    let day = str.slice(4, );
    
    year *= 1;
    if(year < 22) {
      year = 2000 + year;
    } else {
      year = 1900 + year;
    }
    year += "";

    this.user.birthdate = year + "-" + month + "-" + day;
  },
  methods: {
    updateProfile () {
      alert('Your data: ' + JSON.stringify(this.user))
    },
    checkForm() {
      console.log(this.user.birthdate);
    }
  }
}
</script>

<style>
</style>
