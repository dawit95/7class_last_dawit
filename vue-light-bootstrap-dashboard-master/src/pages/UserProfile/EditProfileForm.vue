<template>
  <card>
    <h4 slot="header" class="card-title">회원 정보 수정</h4>
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

        <button type="button" class="btn btn-info btn-fill float-right" @click.prevent="checkForm">
          수정 완료
        </button>
        <button type="button" class="float-right" style="visibility:hidden">
        </button>
        <button type="button" class="btn btn-danger btn-fill float-right" @click.prevent="deleteId">
          회원 삭제
        </button>
        <button type="button" class="float-right" style="visibility:hidden">
        </button>
        <button type="reset" class="btn btn-secondary btn-fill float-right">
          초기화
        </button>
      <div class="clearfix"></div>
    </form>
  </card>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'
import axios from "@/plugins/axios";

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
    axios
      .get("/board/all")
      .then(response => {
        console.log(response);
        this.tableData = response.data.boardlist;
      })
      .catch(error => {
        console.log(error);
        this.notifyVue("top", "center");
        this.$router.push("/admin/overview");
      });

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
    this.user.birthdate = decodeAccessToken.Member.birthdate;
  },
  methods: {
    updateProfile () {
      alert('Your data: ' + JSON.stringify(this.user))
    },
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
        this.doEdit();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        this.user.pw = '';
        this.user.pwConfirm = '';
      }
    },
    doEdit() {
      axios
        .post("/member/update", this.user)
        .then(res => {
          if(res.status == 200) {
            alert("정보 수정에 성공했습니다.");
            this.$store.dispatch("memberSession/rename", this.user.name);
            this.$router.push("/admin/overview");
          }
        })
        .catch(e => {
          console.log("signUp error : " + e);
          alert("정보 수정에 실패했습니다.");
        })
    },
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notifications.notify({
      message: `<span><b> 로그인해주세요~!! </b> - 회원만 사용가능한 서비스입니다 </span>`,
      icon: "nc-icon nc-app",
      horizontalAlign: horizontalAlign,
      verticalAlign: verticalAlign,
      type: "danger"
      });
    },
    deleteId() {
      axios
        .delete("/member/delete?id=" + this.user.id)
        .then(res => {
          if(res.status == 200) {
            alert("탈퇴했습니다.");
            this.$store.dispatch("memberSession/logOut");
            setTimeout(() => {
              this.$router.push("/admin/overview");
            }, 100);
          }
        })
        .catch(e => {
          console.log("signUp error : " + e);
          alert("회원 탈퇴에 실패했습니다.");
        });
    }
  },
}
</script>

<style>
</style>
