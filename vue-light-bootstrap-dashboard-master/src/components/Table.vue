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
    >
      <template #cell(delete)="row">
        <b-button size="sm" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
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
    goDetailModal(notice) {
      this.$store.dispatch("boardSession/setNotice", notice);
      notice.views += 1;
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
