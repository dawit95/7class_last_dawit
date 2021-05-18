<template>
  <div>
    <h1>아파트 목록 위치</h1>
    <b-table striped hover :items="apts"></b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AptList',
  computed: {
    ...mapState(['apts']),
  },
};
</script>

<style></style>
