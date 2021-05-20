<template>
  <div>
    <div id="aptMap"></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
// import axios from '@/util/http-common';
// export default {
//   name: 'AptMap',
//   data() {
//     return {
//       map: null,
//     };
//   },
//   mounted() {
//     window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
//   },
//   methods: {
//     initMap() {
//       let container = document.getElementById('aptMap');
//       let options = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3,
//       };
//       let map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다.
//       this.map = map;
//       var marker = new kakao.maps.Marker({ position: map.getCenter() });
//       marker.setMap(map);
//     },
//     addScript() {
//       const script = document.createElement('script');
//       /* global kakao */ script.onload = () => kakao.maps.load(this.initMap);
//       script.src =
//         'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=bcfb0cc7747cba9a89c33514eff6fd1c&libraries=services';
//       document.head.appendChild(script);
//     },
//   },
// };
export default {
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addKakaoMapScript();
  },
  updated() {
    this.initMap();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement('aptMap');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=bcfb0cc7747cba9a89c33514eff6fd1c&libraries=services';
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById('aptMap'); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      var map2 = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      var markerPosition = new kakao.maps.LatLng(37.566826, 126.9786567);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map2);
    },
  },
};
</script>

<style></style>
