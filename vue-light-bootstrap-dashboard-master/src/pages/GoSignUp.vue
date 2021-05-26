<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <card>
            <h4 slot="header" class="card-title">회원 가입</h4>
              <form>
                <!-- (#{id}, #{pw}, #{name}, #{email}, #{phone}, #{gender}, #{birthdate}, #{address}, curdate(), #{type} -->
                <div class="row">
                  <div class="col-md-5">
                    <base-input type="text"
                              label="아이디"
                              :disabled="false"
                              placeholder="아이디"
                              v-model="user.company">
                    </base-input>
                  </div>
                  <div class="col-md-3">
                    <base-input type="text"
                              label="이름"
                              placeholder="이름"
                              v-model="user.username">
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
                    <base-input type="text"
                              label="비밀번호"
                              placeholder="비밀번호"
                              v-model="user.firstName">
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input type="text"
                              label="비밀번호 확인"
                              placeholder="비밀번호 확인"
                              v-model="user.lastName">
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
                              v-model="user.city">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="text"
                              label="성별"
                              placeholder="성별"
                              v-model="user.country">
                    </base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input type="number"
                              label="생일"
                              placeholder="생일"
                              v-model="user.postalCode">
                    </base-input>
                  </div>
                </div>

                <div class="text-center">
                  <button type="reset" class="btn btn-danger btn-fill float-right">
                    초기화
                  </button>
                  <button type="button" class="btn btn-info btn-fill float-right" @click.prevent="doSignUp">
                    회원 가입
                  </button>
                </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </div>
        <div class="col-md-4">
          <card class="card-user">
            <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
            <div class="author">
              <a href="#">
                <img class="avatar border-gray" src="img/faces/face-3.jpg" alt="..."/>

                <h4 class="title">Mike Andrew<br />
                  <small>michael24</small>
                </h4>
              </a>
            </div>
            <p class="description text-center"> "Lamborghini Mercy <br>
              Your chick she so thirsty <br>
              I'm in that two seat Lambo"
            </p>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          company: '',
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
          aboutMe: ``
        }
      }
    },
    methods: {
      doSignUp () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
