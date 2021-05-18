<template>
  <div>
    <button @click="takeApt">가져와</button>
    <div id="aptMap"></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
// import axios from '@/util/http-common';
export default {
  name: 'AptMap',
  data() {
    return {
      apts: [],
      infowindow: {},
    };
  },
  // methods: {
  //   initMap() {
  //     var mapContainer = document.getElementById('aptMap'), // 지도를 표시할 div
  //       mapOption = {
  //         center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
  //         level: 3, // 지도의 확대 레벨
  //       };

  //     var map = new kakao.maps.Map(mapContainer, mapOption);
  //   },
  //   takeApt() {
  //     axios
  //       .get('/apt/all?dong' + '방학동')
  //       .then((response) => {
  //         console.log(response);
  //         this.apts = response;
  //         this.initMap();
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   },
  // },
  // mounted() {
  //   if (window.kakao && window.kakao.maps) {
  //     this.initMap();
  //   } else {
  //     const script = document.createElement('script');
  //     /* global kakao */
  //     script.onload = () => kakao.maps.load(this.initMap);
  //     script.src =
  //       'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=bcfb0cc7747cba9a89c33514eff6fd1c&libraries=services';
  //     document.head.appendChild(script);
  //   }
  // },
};
</script>

<style></style>
