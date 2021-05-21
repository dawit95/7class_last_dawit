<template>
  <div>
    <div id="map"></div>
    <!-- <div class="button-group">
      <button @click="displayMarker([])">marker(empty)</button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: "",
      markers: [],
      apts: [],
      infowindow: null
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=bcfb0cc7747cba9a89c33514eff6fd1c&libraries=drawing,clusterer,services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5
      };
      this.map = new kakao.maps.Map(container, options);
    },
    // changeSize(size) {
    //   const container = document.getElementById('map');
    //   container.style.width = `${size}px`;
    //   container.style.height = `${size}px`;
    //   this.map.relayout();
    // },
    makeMarker() {
      let geocoder = new kakao.maps.services.Geocoder();
      let markerPositions = [];
      for (let idx = 0; idx < this.aptList.length; idx++) {
        const element = this.aptList[idx];
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(element.address, function(result, status) {
          if (status === kakao.maps.services.Status.OK)
            markerPositions.push([result[0].y, result[0].x]);
        });
      }
      setTimeout(() => {
        this.displayMarker(markerPositions);
      }, 1000);
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      const positions = markerPositions.map(
        position => new kakao.maps.LatLng(...position)
      );

      let imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      let imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map,
              image: markerImage, // 마커 이미지
              position
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      });

      this.map.setCenter(iwPosition);
    }
  },
  computed: {
    check_apts() {
      return this.$store.state.apts;
    }
  },
  watch: {
    check_apts(val) {
      this.aptList = val;
      this.makeMarker();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 100%;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
