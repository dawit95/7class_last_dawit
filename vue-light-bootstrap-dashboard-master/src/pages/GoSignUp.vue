<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <card>
            <h4 slot="header" class="card-title">회원 가입</h4>
              <form>
                <!-- (#{id}, #{pw}, #{name}, #{email}, #{phone}, #{gender}, #{birthdate}, #{address}, curdate(), #{type} -->
                <div class="row">
                  <div class="col-md-5">
                    <div>
                      <base-input type="text"
                              label="아이디"
                              placeholder="아이디"
                              v-model="user.id">
                      </base-input>
                    </div>
                    <div>{{ idCheckMsg }}</div>
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
                    <b-form-group style="ml-1" label="성별" v-slot="{ ariaDescribedby }">
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
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'
import axios from "@/plugins/axios"

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
      },
      idCheckMsg: ''
    }
  },
  created() {
    this.$watch(
      () => this.user.id,
      (newVal, oldVal) => {
        console.log("shi val...");

        axios
          .get("/member/checkid?id=" + newVal)
          .then(res => {
            console.log("==== TRUE ====");
            console.log(res);
            this.idCheckMsg = "사용할 수 있는 아이디입니다.";
          })
          .catch(e => {
            console.log("check id fail : " + e);
            this.idCheckMsg = "사용할 수 없는 아이디입니다.";
          })
      }
    )
  },
  methods: {
    checkForm() {
      if(this.user.id === "") {
        alert("아이디를 입력하세요.");
      } else if(this.user.name === "") {
        alert("이름을 입력하세요.");
      } else if(this.user.email === "") {
        alert("이메일을 입력하세요.");
      } else if(this.user.address === "") {
        alert("주소를 입력하세요.");
      } else if(this.user.phone === "") {
        alert("전화번호를 입력하세요.");
      } else if(this.user.gender === "") {
        alert("성별을 입력하세요.");
      } else if(this.user.birthdate === "") {
        alert("생일을 입력하세요.");
      } else if(this.user.pw === "") {
        alert("비밀번호를 입력하세요.");
      } else if(this.user.pwConfirm === "") {
        alert("비밀번호 확인을 입력하세요.");
      } else if(this.user.pw === this.user.pwConfirm) {
        this.doSignUp();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        this.user.pw = '';
        this.user.pwConfirm = '';
      }
    },
    doSignUp() {
      axios
        .post("/member/signup", this.user)
        .then(res => {
          if(res.status == 200) {
            alert("회원가입에 성공했습니다.");
            this.$router.push("/admin/overview");
          }
        })
        .catch(e => {
          console.log("signUp error : " + e);
          alert("회원가입에 실패했습니다.");
        })
    }
  }
}
</script>

<style>
</style>
