<template>
  <div>
    <card>
      <form>
        <div class="col-md-12" style="text-align:center">
          <strong> {{ notice.title }} </strong>
        </div>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-7">작성자 : {{ notice.authorId }}</div>
          <div class="col-md-3">작성날짜 : {{ notice.postdate }}</div>
          <div class="col-md-1"></div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
                v-model="notice.content"
                readonly
              >
              </textarea>
            </div>
          </div>
        </div>

        <!-- <div class="text-right" aline="right">
          작성날짜 : {{ notice.postdate }}
        </div>
        <p class="mt-3">Store.state.notice : {{ notice }}</p> -->

        <div class="row" v-if="isAdmin()">
          <div class="col-md-1">
            <!-- <b-button variant="outline-info">글쓰기</b-button> -->
          </div>
          <div class="col-md-9"></div>
          <div class="col-md-1">
            <b-button variant="outline-info" @click="toggleFixMode"
              >수정</b-button
            >
          </div>
          <div class="col-md-1">
            <b-button variant="outline-info" @click="deleteBoard"
              >삭제</b-button
            >
          </div>
        </div>

        <!-- <div class="text-center">
          <button
            type="submit"
            class="btn btn-info btn-fill float-right"
            @click.prevent="updateProfile"
          >
            Update Profile
          </button>
        </div> -->
        <div class="clearfix"></div>
      </form>
    </card>

    <card v-if="fixMode">
      <form>
        <div class="row">
          <div class="col-md-12">
            <base-input type="text" v-model="notice.title"> </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Here can be your description"
                v-model="notice.content"
              >
              </textarea>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            type="button"
            class="btn btn-info btn-fill float-right"
            @click.prevent="updateBoard"
          >
            수정 완료
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </card>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";

const storage = window.sessionStorage;

export default {
  name: "l-table-detail",
  components: {
    Card
  },
  data() {
    return {
      notice: {},
      fixMode: false
    };
  },
  computed: {
    getNotice() {
      return this.$store.state.boardSession.notice;
    }
  },
  watch: {
    getNotice(val) {
      this.notice = val;
    }
  },
  methods: {
    isAdmin() {
      const jwt = require("jsonwebtoken");
      const decodeAccessToken = jwt.decode(
        storage.getItem("at-jwt-access-token"),
        "MYSALT",
        { algorithms: ["HS256"] }
      );

      console.log(decodeAccessToken);

      if (decodeAccessToken.Member.type === "admin") {
        return true;
      } else {
        return false;
      }
    },
    toggleFixMode() {
      this.fixMode = !this.fixMode;
    },
    updateBoard() {
      this.$store.dispatch("boardSession/modifyBoard", this.notice);
      this.$store.dispatch("boardSession/setNotice", this.notice);
      this.fixMode = !this.fixMode;
    },
    deleteBoard() {
      this.$store.dispatch("boardSession/deleteBoard", this.notice);
    }
  }
};
</script>

<style></style>
