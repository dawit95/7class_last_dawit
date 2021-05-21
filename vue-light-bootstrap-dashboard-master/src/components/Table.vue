<template>
  <div class="overflow-auto">
    <b-table
      id="my-table"
      :fields="columns"
      :items="data"
      :per-page="perPage"
      :current-page="currentPage"
      hover
      @row-clicked="goDetailModal"
    ></b-table>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
  <!-- <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
      </slot>
    </tr>
    </tbody>
  </table> -->
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "l-table",
  data() {
    return {
      perPage: 5,
      currentPage: 1
    };
  },
  props: {
    columns: Array,
    data: Array
  },
  methods: {
    ...mapActions(["setNotice"]),
    goDetailModal(notice) {
      this.setNotice(notice);
    }
  },
  computed: {
    rows() {
      return this.data.length;
    }
  }
};
</script>
<style></style>
