<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h3 class="card-title">
                <strong>"{{ getAptDetail[0].aptName }}"의 매매 내역</strong>
              </h3>
              <p class="card-category">
                마지막 거래 날짜 : {{ getAptDetail[0].dealDate }}
              </p>
            </template>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">면적(m^2)</p>
              <h4 class="card-title">{{ getAptDetail[0].area }}</h4>
            </div>
            <div slot="footer"></div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">마지막 매매 가격</p>
              <h4 class="card-title">
                {{ getAptDetail[0].dealAmount }}(단위:만원)
              </h4>
            </div>
            <div slot="footer"></div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">APT 층</p>
              <h4 class="card-title">{{ getAptDetail[0].floor }} 층</h4>
            </div>
            <div slot="footer"></div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <a @click="getGood">
                <img
                  src="@/assets/img/like.png"
                  alt=""
                  style="width:66px; height:66px;"
                  v-if="toggle"
                />
                <img
                  src="@/assets/img/unlike.png"
                  alt=""
                  style="width:66px; height:66px;"
                  v-if="!toggle"
                />
              </a>
            </div>
            <div slot="content">
              <p class="card-category">관심등록</p>
              <h4 class="card-title">+{{ goodCount }}</h4>
            </div>
            <div slot="footer"></div>
          </stats-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <chart-card
            :chart-data="getLineChart.data"
            :chart-options="getLineChart.options"
            :responsive-options="lineChart.responsiveOptions"
          >
            <template slot="header">
              <h4 class="card-title">
                [{{ getAptDetail[0].aptName }}]의 거래금액
              </h4>
              <p class="card-category">최근 거래 기준(단위:백만)</p>
            </template>
            <template slot="footer">
              <!-- <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div> -->
              <!-- <hr /> -->
              <!-- <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div> -->
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="getStores.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">주변 상권 정보</h4>
              <!-- <p class="card-category">Last Campaign Performance</p> -->
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> 마트
                <i class="fa fa-circle text-danger"></i> 주차장
                <i class="fa fa-circle text-warning"></i> 음식점
                <i class="fa fa-circle text-secondary"></i> 지하철역
                <i class="fa fa-circle text-success"></i> 카페
                <i class="fa fa-circle text-primary"></i> 병원
              </div>
              <hr />
              <!-- <div class="stats">
                <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
              </div> -->
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar"
          >
            <template slot="header">
              <h4 class="card-title">2014 Sales</h4>
              <p class="card-category">All products including Taxes</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr />
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div> -->

        <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title">아파트 거래내역</h5>
              <!-- <p class="category">Backend development</p> -->
            </template>
            <l-table :data="getAptDetail" :columns="table.columns">
              <template slot="columns"></template>

              <template slot-scope="{ row }">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{ row.title }}</td>
                <td class="td-actions text-right">
                  <button
                    type="button"
                    class="btn-simple btn btn-xs btn-info"
                    v-tooltip.top-center="editTooltip"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn-simple btn btn-xs btn-danger"
                    v-tooltip.top-center="deleteTooltip"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <!-- <hr />
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div> -->
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import { createNamespacedHelpers } from "vuex";

import axios from "@/plugins/axios";

const mainMapHelper = createNamespacedHelpers("mainMapSession");

const storage = window.sessionStorage;

const tableColumns = [
  { key: "dealAmount", label: "매매 금액", sortable: true },
  { key: "dealDate", label: "거래 일자", sortable: true },
  { key: "area", label: "면적(m^2)", sortable: true },
  { key: "floor", label: "아파트 층", sortable: true },
  { key: "address", label: "상세주소", sortable: false }
];

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard
  },
  computed: {
    ...mainMapHelper.mapGetters(["getLineChart", "getAptDetail"]),
    ...mainMapHelper.mapGetters(["getStores"])
  },
  methods: {
    // dong, aptname, jibun, buildyear
    getGood() {
      let templist = this.getAptDetail[0].address.split(" ");
      let payload = {
        sido: templist[0],
        gugun: templist[1],
        dong: this.getAptDetail[0].dong,
        aptname: this.getAptDetail[0].aptName,
        jibun: this.getAptDetail[0].jibun,
        buildyear: this.getAptDetail[0].buildYear
      };
      console.log("getGood paload");
      console.log(payload);
      let url = "/good";
      if (this.toggle) {
        url = "/good/delete";
      }
      axios
        .post(url, payload)
        .then(res => {
          this.goodCount += this.toggle ? -1 : 1;
          this.toggle = !this.toggle;
          console.log("여기 들어왔다가 정상으로 끝남");
          console.log(res.data);
        })
        .catch(err => {
          console.log("여기 들어왔다가 비정상으로 끝남");
          console.log(err);
        });
    },
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notifications.notify({
        message: `<span><b> 로그인해주세요~!! </b> - 회원만 사용가능한 서비스입니다 </span>`,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    }
  },
  created() {
    axios
      .get("/board/all")
      .then(response => {
        console.log(response);
        this.tableData = response.data.boardlist;
      })
      .catch(error => {
        console.log(error);
        this.notifyVue("top", "center");
        this.$router.push("/admin/overview");
      });
  },
  mounted() {
    const jwt = require("jsonwebtoken");
    const decodeAccessToken = jwt.decode(
      storage.getItem("at-jwt-access-token"),
      "MYSALT",
      { algorithms: ["HS256"] }
    );
    let templist = this.getAptDetail[0].address.split(" ");
    let payload = {
      sido: templist[0],
      gugun: templist[1],
      dong: this.getAptDetail[0].dong,
      aptname: this.getAptDetail[0].aptName,
      jibun: this.getAptDetail[0].jibun,
      buildyear: this.getAptDetail[0].buildYear
    };
    console.log(payload);
    axios
      .post("/good/idlist", payload)
      .then(res => {
        this.goodCount = res.data.idlist.length;
        for (let idx = 0; idx < res.data.idlist.length; idx++) {
          const element = res.data.idlist[idx];
          if (decodeAccessToken.Member.id == element) {
            this.toggle = true;
          }

          console.log("정상작동하면 찍혀요 uname ");
          console.log(decodeAccessToken);
          console.log(element);
        }
      })
      .catch(err => {});
  },
  data() {
    return {
      goodCount: 0,
      toggle: false,
      table: {
        columns: [...tableColumns]
      },
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40]
        }
      },
      lineChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          low: 0,
          high: 100000,
          showArea: false,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      barChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false }
        ]
      }
    };
  }
};
</script>
<style></style>
