<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <l-table-dtail></l-table-dtail>
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
import LTableDtail from "src/components/TableDtail.vue";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";

import http from "../util/http-common";
import { mapActions } from "vuex";

const storage = window.sessionStorage;

const tableColumns = [
  { no: "번호" },
  { title: "글제목" },
  { postdate: "작성일" },
  { authorid: "작성자" },
  { views: "조회수" }
];
export default {
  components: {
    LTable,
    LTableDtail,
    Card
  },
  data() {
    return {
      tableData: [],
      table: {
        columns: [...tableColumns]
      }
    };
  },
  created() {
    http
      .get("/board/all", {
        headers: {
          "jwt-auth-token": storage.getItem("jwt-auth-token")
        }
      })
      .then(response => {
        this.tableData = response.data;
      })
      .catch(error => {
        alert("로그인해주세요~!");
        this.$router.push("/admin/overview");
      });
  }
};
</script>
<style></style>
