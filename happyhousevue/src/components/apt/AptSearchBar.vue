<template>
  <div>
    <h1>아파트 셀랙트 바 위치</h1>
    <b-form-select v-model="sidoSelected" :options="sidoOptions"></b-form-select>
    <b-form-select v-model="gugunSelected" :options="gugunOptions"></b-form-select>
    <b-form-select v-model="dongSelected" :options="dongOptions"></b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
import http from '@/util/http-common';

const sidoAddr = '/address/sido';
const gugunAddr = '/address/gugun';
const dongAddr = '/address/dong';

export default {
  data() {
    return {
      sidoSelected: null,
      sidoOptions: [],
      gugunSelected: null,
      gugunOptions: [],
      dongSelected: null,
      dongOptions: [],
    }
  },
  watch: {
    sidoSelected: function() {
      http
        .get(gugunAddr)
        .then((response) => {
          this.gugunOptions = response.gugun;
        })
        .catch((error) => {
          console.log("sidoSelected ERROR : " + error);
        })
    },
    gugunSelected: function() {
      http
        .get(dongAddr)
        .then((response) => {
          this.dongOptions = response.dong;
        })
        .catch((error) => {
          console.log("gugunSelected ERROR : " + error);
        })
    },
    dongSelected: function() {

    }
  },
  created() {
    http
      .get(sidoAddr)
      .then((response) => {
        this.sidoOptions = response.sido;
      })
      .catch((error) => {
        console.log("sido : " + error);
      })
  },
};
</script>

<style></style>
