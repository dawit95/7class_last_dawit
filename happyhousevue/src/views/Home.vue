<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h2>아파트 매매 정보</h2>
      </b-col>
    </b-row>
    <apt-search-bar></apt-search-bar>
    <b-row>
      <b-col cols="6" align="left">
        <apt-list />
      </b-col>
      <b-col cols="6">
        <kakao-map />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AptSearchBar from '@/components/apt/AptSearchBar.vue';
import AptList from '@/components/apt/AptList.vue';
import KakaoMap from '@/components/KakaoMap.vue';

export default {
  name: 'Home',
  components: {
    AptSearchBar,
    AptList,
    KakaoMap,
  },
};
</script>

<style></style>
