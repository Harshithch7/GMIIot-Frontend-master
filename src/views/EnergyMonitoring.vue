<template>
  <v-container fluid>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->
     <div id="app " >
     <v-row>
          <v-col cols="11">
    <Breadcrumb class="row justify-content-center mt-4" :crumbs="crumbs" @selected="selected" />
    </v-col>
    <v-col cols="1" v-if="showLoader">
        <LoaderProgress
      ></LoaderProgress>
    </v-col>
</v-row>  </div>
    <v-row class="mt-0 border-bottom">
      <v-col>
        <filterHeaderComp style="margin-right: 5px !important" />
      </v-col>
    </v-row>

    <v-row class="mb-3 mt-5">
      <v-col cols="6" sm="3" md="2">
        <router-link
          :to="{
            name: 'multiGauge',
            params: { macId: availiability.machine_id },
          }"
        >
          <v-card class="oee-card oee-card-white mini-card" elevation="2">
            <v-card-text class="">
              <v-row align="center" class="text-center mbN-4">
                <v-col cols="12" sm="12" md="12" class="pr-0 pl-0 pa-1">
                  <div id="chartavailiability">
                    <apexchart
                      type="radialBar"
                      height="170"
                      :options="availiability.chartOptions"
                      :series="availiability.series"
                    ></apexchart>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="6" sm="3" md="2">
        <v-card class="oee-card oee-card-white mini-card" elevation="2">
          <v-row align="center" class="text-center mbN-4">
            <v-col cols="12" sm="12" md="12" class="pr-0 pl-0" style="margin-top:-50px;">
              <div
                class="
                  transition-swing
                  text-subtitle-2
                  
                  text-gray
                "
              >
                {{ cardsData[0].headerName }}
              </div>
              <div
                class="transition-swing  text-h4 font-weight-light text-success" style=" margin-top:22px;"
              >
                {{ cardsData[0].contentName }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3" md="2">
        <v-card class="oee-card oee-card-white mini-card" elevation="2">
          <v-row align="center" class="text-center mbN-4">
            <v-col cols="12" sm="12" md="12" class="pr-0 pl-0" style="margin-top:-50px;">
              <div
                class="
                  transition-swing
                  text-subtitle-2
                  
                  text-gray
                "
              >
                {{ cardsData[1].headerName }}
              </div>
              <div class="transition-swing text-h4  font-weight-light text-blue" style=" margin-top:22px;">
                {{ cardsData[1].contentName }}
              </div>
              <!-- <div class="transition-swing text-h6 text-blue mtN-1">Uptime</div> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3" md="2">
        <v-card class="oee-card oee-card-white mini-card" elevation="2">
          <v-row align="center" class="text-center mbN-4">
            <v-col cols="12" sm="12" md="12" class="pr-0 pl-0" style="margin-top:-50px; ">

                            <div
                class="
                  transition-swing
                  text-subtitle-2
                  
                  text-gray
                "
              >
                {{ cardsData[2].headerName }} (kWh)
              </div>
              <div class="transition-swing text-h4  font-weight-light text-blue" style=" margin-top:22px;">
                {{ cardsData[2].contentName }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3" md="2">
        <v-card class="oee-card oee-card-white mini-card" elevation="2">
          <v-row align="center" class="text-center mbN-4">
            <v-col cols="12" sm="12" md="12" class="pr-0 pl-0" style="margin-top:-50px;">
              <div
                class="
                  transition-swing
                  text-subtitle-2
                  
                  text-gray
                "
              >
                {{ cardsData[3].headerName }} (kWh)
              </div>
              <div class="transition-swing text-h4 font-weight-light text-blue" style=" margin-top:22px;">
                {{ cardsData[3].contentName }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3" md="2">
        <v-card class="oee-card oee-card-white mini-card" elevation="2">
          <v-row align="center" class="text-center mbN-4">
            <v-col cols="12" sm="12" md="12" class="pr-0 pl-0" style="margin-top:-50px; ">
              <div
                class="
                  transition-swing
                  text-subtitle-2
                  
                  text-gray
                "
              >
                {{ cardsData[4].headerName }} (kWh)
              </div>
              <div class="transition-swing text-h4  font-weight-light text-blue" style=" margin-top:22px;">
                {{ cardsData[4].contentName }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-3 mt-5">
      <v-col cols="12" sm="12" md="12">
        <v-card class="oee-card oee-card-white " elevation="2">
          <v-card-text class="">
            <v-row align="center" class="text-center">
              <v-col cols="12" sm="12" md="12" class="">
                <div id="chart">
                  <apexchart
                    ref="barChart"
                    type="bar"
                    height="200"
                    :options="cycletimechart.chartOptions"
                    :series="cycletimechart.series"
                  ></apexchart>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import filterHeaderComp from "../components/filterHeaderComp.vue";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import VueApexCharts from "vue-apexcharts";
import constants from "../constants";
import axios from "axios";
import router from "../router";
export default {
  components: {
    filterHeaderComp,
    apexchart: VueApexCharts,
    Breadcrumb,
    LoaderProgress
  },

  data: (
    energy = "-",
    chartDates = [],
    // machineItems = [],

    chartPlots = []
  ) => ({
    showLoader: false,

                crumbs: ['Home', 'Plant Monitoring Dashboard', 'Energy Monitoring Dashboard','Energy Monitoring Trends'],

    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Energy Monitoring Dashboard",
        disabled: false,
        href: "/EnergyMonitoring",
      },

      {
        text: "Machine DPIMM1",
        disabled: true,
      },
    ],
    energy: energy,

    cardsData: [],

    availiability: {
      id: "sanitisedData.id",
      // series: [70],
      chartOptions: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "59%",
            },
            dataLabels: {
              textAnchor: "middle",
              name: {
                fontSize: "30px",
                offsetY: 14,
                color: "#FF9806",
              },
              value: {
                offsetY: -5,
                fontSize: "23px",
                color: "orange",
                formatter: function(val) {
                  console.log("formatter", val);
                  return val;
                },
                // fontSize: "23px",
                // show: false,
              },
            },
          },
        },
        fill: {
          colors: [
            function() {
              console.log("checking energyu", energy);
              if (energy < 50) {
                return "#ff0000";
              } else if (energy == 50 || energy <= 75) {
                return "#ffff00";
              } else {
                return "#29a329";
              }
            },
          ],
        },
        labels: [""],
      },
    },
    cycletimechart: {
      series: [
        {
          data: chartPlots,
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        // legend: {
        //   position: "top",
        //           horizontalAlign: "center",
        //                                           showForSingleSeries: true,

        // },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            radiusOnLastStackedBar: true,
            columnWidth: "70%",
            barHeight: "70%",
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                },
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
            },
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        // stroke: {
        //   show: true,
        //   width: 2,
        //   colors: ["transparent"],
        // },
        xaxis: {
          title: {
            text: "Time",
            align: "right",
            style: {
              color: "#484848",
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          categories: chartDates,
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },

        yaxis: {
          title: {
            text: "Energy(kWh)",
            fontSize: "14px",
          },
        },
        fill: {
          colors: ["#C9D6E9"],
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "" + val + " Count";
            },
          },
        },
      },
    },
  }),
  created() {
        this.setCardsData();

    console.log("Checking addition")
      this.$root.$on("route_first_option", (text) => {
            console.log(
              "checking  route_first_option text",
              text,
              typeof text,
              this.checkbox,
              typeof this.checkbox
            );
            // if (text) {
            //   ("checking whetehr text is satisfied");
            //   this.checkbox = true;
            // } else {
            //   this.checkbox = false;
            // }
          });

    console.log("checking set of card");
    this.machine_id_Selected = this.machine_id_Selected = this.$route.params.macId;
    console.log("checking after set of card", this.cardsData);
    // this.setMachineData();
    // console.log("Checking machine_items inside mounted",this.machineItems );

    this.energy = 0;
  },
  aftermounted() {},
  methods: {
                         selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/machine')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }      }
           else if (crumb === 'Plant Monitoring Dashboard')
      {
        router.push('/plantMonitoringDashboard')
      }
        else if (crumb === 'Energy Monitoring Dashboard')
      {
        router.push('/EnergyMonitoring')
      }
      
      
      console.log(crumb);
    },
    setMachineData() {
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachineNames`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          console.log("response--getMachineNames", response.data);
          let machineData = response.data.data;
          machineData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "machine_name"
            );
          });
          console.log("cehcking machine dayta=>", machineData);
          // this.machineItems = machineData;
          // console.log("Checking machine_items", this.machineItems);
          // this.machineItems = response.data.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("error--getMachineNames", error);
          }
        });
    },
    setCardsData: function() {
      this.cardsData = [
        { id: "1", headerName: "Machine State", contentName: "-" },
        { id: "2", headerName: "Uptime", contentName: "-" },
        { id: "3", headerName: "Total Today", contentName: "-" },
        { id: "4", headerName: "Total", contentName: "-" },
        { id: "5", headerName: "Daily avg", contentName: "-" },
      ];
    },
    getTimeInHours: (mins) => {
      let hours = Math.floor(mins / 60);
      let minutes = mins % 60;
      return `${hours}h${minutes}m`;
    },

    searchNew: function(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
      console.log(
        "start and end date while calling searchNew",
        this.start_date,
        this.end_date
      );
      this.machine_id_Selected = machine_id;
      console.log(
        "machine select",
        this.machine_id_Selected,
        "Done to say",
        machine_id
      );
      let config = {};
            this.showLoader = true;

      if (this.start_date == "") {
        config = {
          method: "get",
          url: `${constants.backend_url}/getEnergyMonitoringData?machine=${machine_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      } else {
        config = {
          method: "get",
          url: `${constants.backend_url}/getEnergyMonitoringData?machine=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          let responseData = response.data.data;
          console.log("Checking response",response.data);
          // if (responseData == undefined)
          // {
          //             console.log("the energy response is: ", response.data);

          //           console.log("the energy response is: ",JSON.parse( response.data));

          // }

          if (responseData != undefined) {
            this.cardsData.forEach((card) => {
              if (card.headerName === "Machine State") {
                card.contentName = responseData.status || "-";
              } else if (card.headerName === "Uptime") {
                // card.contentName = `${responseData.total_up_time}mins` || "-";
                card.contentName =
                  responseData.total_up_time &&
                  responseData.total_up_time !== null
                    ? this.getTimeInHours(responseData.total_up_time)
                    : "-";
              } else if (card.headerName === "Total Today") {
                card.contentName =
                  responseData.today_kwh && responseData.today_kwh !== null
                    ? `${responseData.today_kwh}`
                    : "-";
              } else if (card.headerName === "Total") {
                card.contentName =
                  responseData.total_kwh && responseData.total_kwh !== null
                    ? `${responseData.total_kwh}`
                    : "-";
              } else if (card.headerName === "Daily avg") {
                card.contentName =
                  responseData.daily_avg_kwh &&
                  responseData.daily_avg_kwh !== null
                    ? `${responseData.daily_avg_kwh}`
                    : "-";
              }
            });
          }
          // else{
          //   this.cardsData.forEach((card) => {
          //     if (card.headerName === "Plug State") {
          //       card.contentName = response.status || "-";
          //     } else if (card.headerName === "Uptime") {
          //       // card.contentName = `${responseData.total_up_time}mins` || "-";
          //       card.contentName =
          //         response.total_up_time &&
          //         response.total_up_time !== null
          //           ? this.getTimeInHours(responseData.total_up_time)
          //           : "-";
          //     } else if (card.headerName === "Total Today") {
          //       card.contentName =
          //         response.today_kwh && response.today_kwh !== null
          //           ? `${response.today_kwh}`
          //           : "-";
          //     } else if (card.headerName === "Total") {
          //       card.contentName =
          //         response.total_kwh && response.total_kwh !== null
          //           ? `${response.total_kwh}`
          //           : "-";
          //     } else if (card.headerName === "Daily avg") {
          //       card.contentName =
          //         response.daily_avg_kwh &&
          //         response.daily_avg_kwh !== null
          //           ? `${response.daily_avg_kwh}`
          //           : "-";
          //     }
          //   });

          // }
          this.energy = responseData.today_kwh || [0];
          // console.log("checking cards data",this.cardsData);
          this.availiability.series = [this.energy] || [0];
          this.availiability.machine_id = this.machine_id_Selected;
          this.availiability.labels = this.energy.toString() || "0";
          if (
            responseData.daily_total_kwh ||
            responseData.daily_total_kwh.length
          ) {
            let plots = [];
            let dates = [];
            responseData.daily_total_kwh.forEach((reading) => {
              dates.push(reading.kwh_date);
              plots.push(reading.avg_reading);
            });
            // console.log("the dates are", dates);
            // console.log("the plots are", plots);
            this.chartDates = dates;
            this.chartPlots = plots;
                                this.showLoader = false;

            console.log("the refs", this.$refs);
            this.$refs.barChart.updateOptions({
              xaxis: {
                categories: this.chartDates,
              },
            });
            this.$refs.barChart.updateSeries(
              [
                {
                  data: this.chartPlots,
                },
              ],
              false,
              true
            );
            this.$refs.barChart.updateOptions();
          }

        }
        
        )
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("axios error", error.message);
          }
        });
    },
    intervalFetchData: function(machine_id, startDate, endDate) {
      console.log("being called on load");
      let self = this;
      console.log("in energy with: ", machine_id, startDate, endDate);
      console.log(
        "inside interval fetchdata with data",
        machine_id,
        startDate,
        endDate
      );
      if (!machine_id) {
        console.log("mac id is null");
        machine_id = this.machine_id_Selected;
      }
      this.machine_id_Selected = machine_id;
      this.start_date = startDate;
      this.end_date = endDate;
      console.log("machine id", machine_id);
      console.log(
        "1 selected start date",
        this.start_date,
        "selected end date",
        this.end_date
      );
      self.searchNew(this.machine_id_Selected, this.start_date, this.end_date);
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>