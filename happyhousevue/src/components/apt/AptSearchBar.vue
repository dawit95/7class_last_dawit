<template>
  <div>
    <h1>아파트 셀랙트 바 위치</h1>
    <b-form-select v-model="sidoSelected" :options="sidoOptions"></b-form-select>
    <b-form-select v-model="gugunSelected" :options="gugunOptions"></b-form-select>
    <b-form-select v-model="dongSelected" :options="dongOptions"></b-form-select>
  </div>
</template>

<script>
import http from '@/util/http-common';
import { mapActions } from 'vuex';

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
    };
  },
  watch: {
    sidoSelected: function () {
      http
        .get(gugunAddr + '?sido=' + this.sidoSelected)
        .then((response) => {
          let List = response.data;
          for (let idx = 0; idx < List.length; idx++) {
            let gugunObj = List[idx].gugunName;
            this.gugunOptions.push({
              text: gugunObj,
              value: gugunObj,
            });
          }
        })
        .catch((error) => {
          console.log('sidoSelected ERROR : ' + error);
        });
    },
    gugunSelected: function () {
      http
        .get(dongAddr + '?gugun=' + this.gugunSelected)
        .then((response) => {
          let List = response.data;
          for (let idx = 0; idx < List.length; idx++) {
            let dongObj = List[idx].dongName;
            this.dongOptions.push({
              text: dongObj,
              value: dongObj,
            });
          }
        })
        .catch((error) => {
          console.log('gugunSelected ERROR : ' + error);
        });
    },
    dongSelected: function () {
      this.getAptgo();
    },
  },
  methods: {
    ...mapActions(['getAPT']),
    getAptgo() {
      this.getAPT(this.dongSelected);
    },
  },
  created() {
    http
      .get(sidoAddr)
      .then((response) => {
        let sidoList = response.data;
        for (let idx = 0; idx < sidoList.length; idx++) {
          let sidoObj = sidoList[idx].sidoName;
          this.sidoOptions.push({
            text: sidoObj,
            value: sidoObj,
          });
        }
      })
      .catch((error) => {
        console.log('sido : ' + error);
      });
  },
};
</script>

<style></style>
