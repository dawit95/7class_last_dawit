<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">HappyHOUSE</a>
      <!-- <button
        type="button"
        class="navbar-toggler navbar-toggler-right"
        :class="{ toggled: $sidebar.showSidebar }"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button> -->
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li>
          <!-- <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </base-dropdown> -->
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li> -->
        </ul>
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              Account
            </a>
          </li> -->
          <!-- <base-dropdown title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown> -->
          <li class="nav-item">
            <b-button v-b-modal.login-modal>Log In</b-button>
            <!-- <a href="#" class="nav-link">
              Log In
            </a> -->
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Sign Up
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>

    <b-modal
      id="login-modal"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Id"
          label-for="id-input"
          invalid-feedback="아이디를 입력하세요"
          :state="idState">
          <b-form-input
            id="id-input"
            v-model="id"
            :state="idState"
            required>
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Pswd"
          label-for="pswd-input"
          invalid-feedback="비밀번호를 입력하세요"
          :state="pswdState">
          <b-form-input
            id="pswd-input"
            v-model="pswd"
            :state="pswdState"
            required>
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </nav>
</template>

<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      id: '',
      idState: null,
      pswd: '',
      pswdState: null,
      state: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.idState = valid
      this.pswdState = valid
      this.state = valid
      return valid
    },
    resetModal() {
      this.id = ''
      this.idState = null
      this.pswd = ''
      this.pswdState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if(!this.checkFormValidity()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('login-modal')
      })
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // toggleNotificationDropDown() {
    //   this.activeNotifications = !this.activeNotifications;
    // },
    // closeDropDown() {
    //   this.activeNotifications = false;
    // }
    // toggleSidebar() {
    //   this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    // },
    // hideSidebar() {
    //   this.$sidebar.displaySidebar(false);
    // }
  }
};
</script>

<style></style>
