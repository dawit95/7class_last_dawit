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
                :data="table.data"
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
const tableColumns = [
  { no: "번호" },
  { title: "글제목" },
  { postdate: "작성일" },
  { authorid: "작성자" },
  { views: "조회수" }
];
const tableData = [
  {
    no: 1,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 2,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 3,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 4,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 5,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 6,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 7,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 8,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 9,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  },
  {
    no: 10,
    title: "Dakota Rice",
    postdate: "$36.738",
    views: "Niger",
    content: "Oud-Turnhout",
    authorid: "Dakota Rice",
    type: "$36.738"
  }
];
export default {
  components: {
    LTable,
    LTableDtail,
    Card
  },
  data() {
    return {
      table: {
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>
<style></style>
