<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <b-form-select
            v-model="selectedSido"
            :options="sidoOptions"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- 도/광역시 --</b-form-select-option
              >
            </template>
          </b-form-select>
          <!-- <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Updated now</div>
          </stats-card> -->
        </div>

        <div class="col-xl-3 col-md-6">
          <b-form-select
            v-model="selectedGugun"
            :options="gugunOptions"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- 시/구/군 --</b-form-select-option
              >
            </template>
          </b-form-select>
          <!-- <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>Last day</div>
          </stats-card> -->
        </div>

        <div class="col-xl-3 col-md-6">
          <b-form-select
            v-model="selectedDong"
            :options="dongOptions"
            class="mb-3"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- 동 --</b-form-select-option
              >
            </template>
          </b-form-select>
          <!-- <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer"><i class="fa fa-clock-o"></i>Last day</div>
          </stats-card> -->
        </div>

        <div class="col-xl-3 col-md-6">
          <div class="font-icon-detail">
            <b-button v-b-toggle.collapse-1 variant="primary" v-if="isFilter"
              ><i class="nc-icon nc-preferences-circle-rotate"></i
            ></b-button>
          </div>
        </div>
      </div>
      <!-- 여기에 필터 검색을 만듬. -->
      <div class="row">
        <div class="col-xl-12 col-md-12">
          <b-collapse id="collapse-1" class="mt-2">
            <div class="row">
              <div class="col-md-3">
                <b-card>
                  <p class="card-text">면적(m^2) 필터</p>
                  <vue-slider
                    v-model="search.area"
                    :min="10"
                    :max="300"
                    :interval="5"
                    :lazy="true"
                  ></vue-slider>
                </b-card>
              </div>
              <div class="col-md-3">
                <b-card>
                  <p class="card-text">매매 금액 필터</p>
                  <vue-slider
                    v-model="search.price"
                    :min="0"
                    :max="150000"
                    :interval="10000"
                    :lazy="true"
                  ></vue-slider>
                </b-card>
              </div>
              <div class="col-md-6">
                <b-card>
                  <p class="card-text">아파트 이름</p>
                  <input
                    v-model="search.name"
                    type="text"
                    placeholder="검색하고 싶은 아파트 이름을 입력하세요!"
                    style="width:80%"
                  />
                  <!-- @input="target" -->
                  <!-- <div class="autocomplete disabled" id="temp">
                    <div
                      id="list"
                      @click="searchSkillAdd(data)"
                      style="cursor: pointer"
                      v-for="(data, i) in AutoList"
                      :key="i"
                    >
                      {{ data }}
                    </div>
                  </div>-->
                  &nbsp;
                  <b-button variant="outline-primary" @click="searchOption"
                    >필터 검색</b-button
                  >
                </b-card>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- 여기에 지도. -->
          <kakao-map></kakao-map>
          <!-- <chart-card
            :chart-data="lineChart.data"
            :chart-options="lineChart.options"
            :responsive-options="lineChart.responsiveOptions"
          >
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr />
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card> -->
        </div>

        <!-- <div class="col-md-4"> -->
        <!-- 여기에 지도 설명서 같은거 하나 -->
        <!-- <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Email Statistics</h4>
              <p class="card-category">Last Campaign Performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Bounce
                <i class="fa fa-circle text-warning"></i> Unsubscribe
              </div>
              <hr />
              <div class="stats">
                <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
              </div>
            </template>
          </chart-card> -->
        <!-- </div> -->
      </div>

      <div class="row">
        <div class="col-md-12">
          <card class="card-plain">
            <template slot="header">
              <h3 class="card-title"><strong>좋아요 표시한 목록</strong></h3>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover" :data="goodList"> </l-table>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- <div class="text-center">
            <h1>뉴스</h1>
          </div> -->
        </div>

        <div class="col-md-6">
          <div class="text-center">
            <h1>HappyHouse Good!!!!!!!</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import KakaoMap from "@/pages/KakaoMap.vue";

import axios from "@/plugins/axios";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

import { createNamespacedHelpers } from "vuex";

const memberHelper = createNamespacedHelpers("memberSession");

const sidoAddr = "/address/sido";
const gugunAddr = "/address/gugun";
const dongAddr = "/address/dong";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard,
    KakaoMap,
    VueSlider
  },
  data() {
    return {
      isFilter: false,
      search: {
        sido: "",
        gugun: "",
        dong: "",
        area: [10, 300],
        price: [0, 150000],
        name: ""
      },
      AutoList: [],
      selectedSido: "",
      selectedGugun: "",
      selectedDong: "",
      sidoOptions: [],
      gugunOptions: [],
      dongOptions: [],
      goodList: []
    };
  },
  watch: {
    selectedSido: function() {
      axios
        .get(gugunAddr + "?sido=" + this.selectedSido)
        .then(response => {
          this.selectedDong = "";
          this.isFilter = false;
          this.gugunOptions = [];
          this.search.sido = this.selectedSido;
          let List = response.data;
          for (let idx = 0; idx < List.length; idx++) {
            let gugunObj = List[idx].gugunName;
            this.gugunOptions.push({
              text: gugunObj,
              value: gugunObj
            });
          }
        })
        .catch(error => {
          console.log("selectedSido ERROR : " + error);
        });
    },
    selectedGugun: function() {
      axios
        .get(dongAddr + "?gugun=" + this.selectedGugun)
        .then(response => {
          this.selectedDong = "";
          this.isFilter = false;
          this.dongOptions = [];
          this.search.gugun = this.selectedGugun;
          let List = response.data;
          for (let idx = 0; idx < List.length; idx++) {
            let dongObj = List[idx].dongName;
            this.dongOptions.push({
              text: dongObj,
              value: dongObj
            });
          }
        })
        .catch(error => {
          console.log("selectedGugun ERROR : " + error);
        });
    },
    selectedDong: function() {
      if (this.selectedDong.trim() === "" || !this.selectedDong) {
        this.isFilter = false;
      } else {
        this.isFilter = true;
      }
      this.search.dong = this.selectedDong;
      let payload = {
        sido: this.selectedSido,
        gugun: this.selectedGugun,
        dong: this.selectedDong
      };
      this.$store.dispatch("mainMapSession/getAPT", payload);
    }
  },
  created() {
    axios
      .get(sidoAddr)
      .then(response => {
        let sidoList = response.data;
        for (let idx = 0; idx < sidoList.length; idx++) {
          let sidoObj = sidoList[idx].sidoName;
          this.sidoOptions.push({
            text: sidoObj,
            value: sidoObj
          });
        }
      })
      .catch(error => {
        console.log("sido : " + error);
      });
  },
  mounted() {
    this.$watch(
      () => this.uname,
      (newVal, oldVal) => {
        axios
          .get("/good/mylist")
          .then(res => {
            console.log("유저의 좋아요 리스트");
            this.goodList = res.data.mylist;
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
    // 로그인 여부 확인 후 aeccess토큰과 같이 보내야 함.
    if (this.uname) {
      axios
        .get("/good/mylist")
        .then(res => {
          console.log("유저의 좋아요 리스트");
          this.goodList = res.data.mylist;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    searchOption() {
      this.$store.dispatch("mainMapSession/getAPTOption", this.search);
    }
    //   searchSkillAdd(data) {
    //     this.search.name = data;
    //   },
    //   target(e) {
    //     console(e.target.value);
    //     let aptNameList = this.$store.state.mainMapSession.aptdetail;
    //     let mainlist = [];
    //     for (let idx = 0; idx < aptNameList.length; idx++) {
    //       const element = aptNameList[idx];
    //       mainlist.push(element.aptName);
    //     }
    //     console.log(mainlist);

    //     this.AutoList = [];
    //     for (let idx = 0; idx < mainlist.length; idx++) {
    //       const element = mainlist[idx];
    //       if (element.includes(e.target.value)) {
    //         this.AutoList.push(element);
    //       }
    //     }
    //   }
  },
  computed: {
    ...memberHelper.mapState({
      uname: state => state.uname
    })
  }
};
</script>
<style></style>
