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
  { views: "조회수" },
];
export default {
  components: {
    LTable,
    LTableDetail,
    Card
  },
  data() {
    return {
      tableData: [],
      table: {
        columns: [...tableColumns]
      },
      notifications: {
        topCenter: false
      }
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notifications.notify({
        message: `<span><b> 로그인해주세요~!! </b> - 회원만 사용가능한 서비스입니다 ".alert-danger"</span>`,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    }
  },
  created() {
    axios
      .get("/board/all")
      .then(response => {
        this.tableData = response.data.boardlist;
        alert(response.data.usertype);
      })
      .catch(error => {
        console.log(error);
        this.notifyVue("top", "center");
        this.$router.push("/admin/overview");
      });
  },
  computed() {
    currentBoardNotice() {
      return this.$store.state.boardSession.notice;
    }
  }
};
</script>
<style></style>
