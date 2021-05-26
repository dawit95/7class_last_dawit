<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h3 class="card-title"><strong>공지사항</strong></h3>
              <p class="card-category">목록 'click'시 상세내용 확인가능</p>
            </template>
            <l-table-detail></l-table-detail>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <card v-if="fixMode">
            <form>
              <div class="row">
                <div class="col-md-12">
                  <base-input type="text" v-model="createNotice.title">
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <textarea
                      rows="5"
                      class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="createNotice.content"
                    >
                    </textarea>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-success btn-fill float-right"
                  @click.prevent="createBoard"
                >
                  공지사항 등록
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </div>
      </div>
      <div class="row" v-if="isAdmin()">
        <div class="col-md-11"></div>
        <div class="col-md-1">
          <b-button variant="outline-primary" @click="toggleFixMode"
            >글쓰기</b-button
          >
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <div class="table-responsive">
              <l-table
                class="table-hover"
                :columns="table.columns"
                :data="tableData"
              >
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LTableDetail from "src/components/BoardTableDtail.vue";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";

import axios from "@/plugins/axios";

const storage = window.sessionStorage;

const tableColumns = [
  { no: "번호" },
  { title: "글제목" },
  { postdate: "작성일" },
  { authorId: "작성자" },
  { views: "조회수" }
];
export default {
  components: {
    LTable,
    LTableDetail,
    Card
  },
  data() {
    return {
      fixMode: false,
      tableData: [],
      table: {
        columns: [...tableColumns]
      },
      notifications: {
        topCenter: false
      },
      createNotice: {
        authorId: "관리인",
        title: "",
        content: "",
        type: "notice"
      }
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notifications.notify({
        message: `<span><b> 로그인해주세요~!! </b> - 회원만 사용가능한 서비스입니다 </span>`,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    notifyVue2(verticalAlign, horizontalAlign) {
      this.$notifications.notify({
        message: `<span><b> 등록에 실패했습니다. </b> - 서버에 문제가 생겼습니다. </span>`,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    isAdmin() {
      const jwt = require("jsonwebtoken");
      const decodeAccessToken = jwt.decode(
        storage.getItem("at-jwt-access-token"),
        "MYSALT",
        { algorithms: ["HS256"] }
      );

      if (decodeAccessToken.Member.type === "admin") {
        return true;
      } else {
        return false;
      }
    },
    toggleFixMode() {
      this.fixMode = !this.fixMode;
    },
    createBoard() {
      // this.$store.dispatch("boardSession/modifyBoard", this.notice);
      axios
        .post("/board/write", this.createNotice)
        .then(res => {
          this.fixMode = !this.fixMode;
        })
        .catch(err => {
          this.notifyVue2("center", "center");
        });
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
  },
  computed: {
    currentBoardNotice() {
      return this.$store.state.boardSession.notice;
    }
  },
  watch: {
    currentBoardNotice(val) {
      console.log("나 포문!!");
      for (let idx = 0; idx < this.tableData.length; idx++) {
        const element = this.tableData[idx];
        if (element.no == val.no) {
          this.tableData[idx] = val;
        }
      }
    }
  }
};
</script>
<style></style>
