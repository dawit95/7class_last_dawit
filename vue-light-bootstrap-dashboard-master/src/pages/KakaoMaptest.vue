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
          let obj = {};
          if (status === kakao.maps.services.Status.OK) {
            obj = {
              content: element.no,
              position: [result[0].y, result[0].x]
            };
            markerPositions.push(obj);
          }
        });
      }
      setTimeout(() => {
        this.displayMarker(markerPositions);
      }, 1000);
    },
    displayMarker(markerPositions) {
      let MARKER_WIDTH = 33, // 기본, 클릭 마커의 너비
        MARKER_HEIGHT = 36, // 기본, 클릭 마커의 높이
        OFFSET_X = 12, // 기본, 클릭 마커의 기준 X좌표
        OFFSET_Y = MARKER_HEIGHT, // 기본, 클릭 마커의 기준 Y좌표
        OVER_MARKER_WIDTH = 40, // 오버 마커의 너비
        OVER_MARKER_HEIGHT = 42, // 오버 마커의 높이
        OVER_OFFSET_X = 13, // 오버 마커의 기준 X좌표
        OVER_OFFSET_Y = OVER_MARKER_HEIGHT, // 오버 마커의 기준 Y좌표
        SPRITE_MARKER_URL =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png", // 스프라이트 마커 이미지 URL
        SPRITE_WIDTH = 126, // 스프라이트 이미지 너비
        SPRITE_HEIGHT = 146, // 스프라이트 이미지 높이
        SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격
      let markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 기본, 클릭 마커의 크기
        markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y), // 기본, 클릭 마커의 기준좌표
        overMarkerSize = new kakao.maps.Size(
          OVER_MARKER_WIDTH,
          OVER_MARKER_HEIGHT
        ), // 오버 마커의 크기
        overMarkerOffset = new kakao.maps.Point(OVER_OFFSET_X, OVER_OFFSET_Y), // 오버 마커의 기준 좌표
        spriteImageSize = new kakao.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      let imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      let imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      for (let idx = 0; idx < markerPositions.length; idx++) {
        const element = markerPositions[idx];
        let markerPosition = new kakao.maps.LatLng(element.position);
        let marker = new kakao.maps.Marker({
          map: this.map,
          image: markerImage, // 마커 이미지
          position: markerPosition
        });
        let info = new kakao.maps.InfoWindow({
          content: element.content
        });

        kakao.maps.event.addListener(marker, "mouseover", () => {});

        kakao.maps.event.addListener(marker, "mouseout", () => {});
        kakao.maps.event.addListener(marker, "click", () => {});
        markers.push(marker);
      }

      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
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
