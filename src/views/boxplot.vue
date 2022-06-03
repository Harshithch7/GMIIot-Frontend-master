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
      <v-col >
        <filterHeaderComp />
      </v-col>
              

      <!-- <v-col xs="6" sm="4" md="2">
        <v-select
          v-model="e2"
          :items="machinelist"
          prepend-icon="icon-dpimm"
          menu-props="auto"
          hide-details
          label="Select Machine"
          single-line
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="my-custom-datepiker">
        <v-menu
          :key="text"
          :close-on-content-click="true"
          offset-y
          class="my-custom-datepiker bg-white"
          background-color="white"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectedDate"
              label="Date Filter"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-list class="my-datelist2">
            <v-list-item v-for="item in items1" :key="item" link>
              <v-list-item-title
                @click="onSelectCustomDate(item)"
                v-text="item"
                class="text-center"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col> -->
      <!-- <v-col cols="12" sm="4" md="3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Date Range"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dates" no-title scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col> -->
    </v-row>

    <v-row>
            <v-col v-if="present">
       <!-- <div >
        <v-btn  color="primary " class="ml-10">
          No Data Found
        </v-btn>
      </div> -->
            <h1  style="margin-top:10px; color=blue;" color="primary" >
          No Data Available
        </h1>
      </v-col>
      <v-col cols="12" sm="12" md="12" v-if="!present">
        <v-card class="oee-card oee-card-white" >
          <v-card-text class="">
          <v-row align="center" class="mb-2" >
              <v-icon>icon-clock</v-icon>
              <v-card-title class="pt-0 pb-0"
                >BoxPlot-Cycle Time Analysis</v-card-title
              >
            </v-row>
            <div id="chart">
              <apexchart
          v-if="boxPlotChart.series"
          v-bind:boxPlotChart="boxPlotChart"
          type="boxPlot"
          height="400"
          :options="boxPlotChart.chartOptions"
          :series="boxPlotChart.series"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import filterHeaderComp from "../components/filterHeaderComp.vue";
import VueApexCharts from "vue-apexcharts";
import router from "../router";
// import filterHeaderComp from "../components/filterHeaderComp.vue";
import axios from "axios";
import constants from "../constants";
export default {
    components: {
    apexchart: VueApexCharts,
    filterHeaderComp: filterHeaderComp,
    Breadcrumb,
    LoaderProgress
    // BackButton: backButton,
  },
    mounted() {
    let machine_id = this.$route.params.macId;
    let startDate = parseInt(sessionStorage.getItem("startDate"));
    let endDate = parseInt(sessionStorage.getItem("endDate"));
    console.log("mounted box plot", machine_id, startDate, endDate);
    this.search(machine_id, startDate, endDate);
  },
  data: () => ({
    present: false,
          boxPlotChart: {},
                  showLoader: false,

      machine_id_Selected: "",
                                  crumbs: ['Home', 'Plant Monitoring Dashboard', 'OEE Monitoring Dashboard',
                             'APQ Analysis By Machine','Performance Trends','Cycle Time Analysis'],
            // showLoader: false,

    // fromDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    // toDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    // menu: false,
    // menu1: false,
    // menu2: false,
    // selectedDate: "Today",
    // machinelist: ["DPIMM01", "DPIMM02", "DPIMM03", "DPIMM04", "DPIMM05"],
    // dates: [],
    // items1: ["Today", "Last Day", "Last 7 Days", "Last 15 Days", "Last Month"],
        items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
                  {
        text: "Plant Monitoring Dashboard",
        disabled: false,
        href: "/plantMonitoringDashboard",
      },
      {
        text: "OEE Monitoring Dashboard",
        disabled: false,
        href: "/multipleOEE",
      },

      {
        text: "Performance Trends",
        disabled: false,
                href: "/performance-trends",

      },
            {
        text: "Cycle Time Analysis",
        disabled: true,
      },
    ],
    // boxPlotCycle: {
    //   series: [
    //     {
    //       name: "box",
    //       type: "boxPlot",
    //       data: [
    //         {
    //           x: new Date("2017-01-01").getTime(),
    //           y: [54, 66, 69, 75, 88],
    //         },
    //         {
    //           x: new Date("2018-01-01").getTime(),
    //           y: [43, 65, 69, 76, 81],
    //         },
    //         {
    //           x: new Date("2019-01-01").getTime(),
    //           y: [31, 39, 45, 51, 59],
    //         },
    //         {
    //           x: new Date("2020-01-01").getTime(),
    //           y: [39, 46, 55, 65, 71],
    //         },
    //         {
    //           x: new Date("2021-01-01").getTime(),
    //           y: [29, 31, 35, 39, 44],
    //         },
    //       ],
    //     },
    //     {
    //       name: "outliers",
    //       type: "scatter",
    //       data: [
    //         {
    //           x: new Date("2017-01-01").getTime(),
    //           y: 32,
    //         },
    //         {
    //           x: new Date("2018-01-01").getTime(),
    //           y: 25,
    //         },
    //         {
    //           x: new Date("2019-01-01").getTime(),
    //           y: 64,
    //         },
    //         {
    //           x: new Date("2020-01-01").getTime(),
    //           y: 27,
    //         },
    //         {
    //           x: new Date("2020-01-01").getTime(),
    //           y: 78,
    //         },
    //         {
    //           x: new Date("2021-01-01").getTime(),
    //           y: 15,
    //         },
    //       ],
    //     },
    //   ],
    //   chartOptions: {
    //     chart: {
    //       type: "boxPlot",
    //     },
    //     colors: ["#0C479D", "#00E396"],
    //     xaxis: {
    //       type: "datetime",
    //       tooltip: {
    //         formatter: function (val) {
    //           return new Date(val).getFullYear();
    //         },
    //       },
    //     },
    //     tooltip: {
    //       shared: false,
    //       intersect: true,
    //     },
    //   },
    // },
  }),
  // computed: {
  //   dateRangeText() {
  //     return this.dates.join(" ~ ");
  //   },
  // },
  methods: {                                     selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/cycle-time-analysis')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }
      }
           else if (crumb === 'Plant Monitoring Dashboard')
      {
        router.push('/plantMonitoringDashboard')
      }
        else if (crumb === 'OEE Monitoring Dashboard')
      {
        router.push('/multipleOEE')
      }
      
        else if (crumb === 'APQ Analysis By Machine')
      {
        this.$router.push(
        {name:  'apqMachine',
        params: { macId: this.machine_id_Selected }
        }
          )
      }
      
        else if (crumb === 'Performance Trends')
      {
        this.$router.push(
        {name:  'performanceTrends',
                  params: { macId: this.machine_id_Selected },

        }
          )
      }
      
      
      console.log(crumb);
    },
        search(machineId, startDate, endDate) {
      // console.log("in boxplot page [search]", constants.backend_url);
      let machine = machineId ? machineId : this.machine_id;
            this.machine_id_Selected = machineId;

      let theStartDate = startDate ? startDate : this.startDate;
      let theEndDate = endDate ? endDate : this.endDate;
              this.showLoader= true;

      let params = 
        machine === "all"
          ? `?startdate=${theStartDate}&enddate=${theEndDate}`
          : `?machine=${machine}&startdate=${theStartDate}&enddate=${theEndDate}`;
      this.showLoader = true;
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getCycleTimeAnalysisdata${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
      };
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          
          this.showLoader = false;
          this.present=false;
          let data = response.data.data;
          console.log("daata of boxpolot",data);
          if (data.length==0)
          {
            this.present=true;
          }
          if (data && data.length) {
            let tempBoxPlot = [];
            let tempOutliersPlot = [];
            data.forEach((eachJson) => {
              console.log(">>>>[search]>>>>[then]>>>>>[forEach] : ", machine);
              let tempBoxPlotJson = {};
              tempBoxPlotJson["x"] =
                machine === "all"
                  ? eachJson.machine_name
                  : new Date(eachJson.perform_date).getTime();
              tempBoxPlotJson["y"] = [];
              tempBoxPlotJson.y.push(eachJson.min_cycle_time.toFixed(2));
              tempBoxPlotJson.y.push(eachJson.percentile_25.toFixed(2));
              tempBoxPlotJson.y.push(eachJson.avg.toFixed(2));
              tempBoxPlotJson.y.push(eachJson.percentile_75.toFixed(2));
              tempBoxPlotJson.y.push(eachJson.max_cycle_time.toFixed(2));
              tempBoxPlot.push(tempBoxPlotJson);
              if (
                machine !== "all" &&
                ((eachJson.minimum_value &&
                  eachJson.minimum_value < eachJson.min_cycle_time) ||
                  (eachJson.maximum_value &&
                    eachJson.maximum_value > eachJson.max_cycle_time))
              ) {
                let tempOutliersPlotJson = {};
                if (
                  eachJson.minimum_value &&
                  eachJson.minimum_value < eachJson.min_cycle_time
                ) {
                  tempOutliersPlotJson["x"] = new Date(
                    eachJson.perform_date
                  ).getTime();
                  tempOutliersPlotJson["y"] = eachJson.minimum_value.toFixed(2);
                }
                if (
                  eachJson.maximum_value &&
                  eachJson.maximum_value > eachJson.max_cycle_time
                ) {
                  tempOutliersPlotJson["x"] = new Date(
                    eachJson.perform_date
                  ).getTime();
                  tempOutliersPlotJson["y"] = eachJson.maximum_value.toFixed(2);
                }
                tempOutliersPlot.push(tempOutliersPlotJson);
              }
            });
            console.log("machine", machine);
            console.log(
              "xaxis:",
              tempBoxPlot.map((each) => each.x)
            );
            let theChart = {
              series: [
                {
                  name: "BoxPlot",
                  type: "boxPlot",
                  data: [],
                },
                {
                  name: "outliers",
                  type: "scatter",
                  data: [],
                },
              ],
              chartOptions: {
                chart: {
                  type: "boxPlot",
                  height: 350,
                },
                colors: ["#008FFB", "#FEB019"],
                // title: {
                //   text: "BoxPlot - Cycle Time Analysis",
                //   align: "left",
                // },
                xaxis:
                  machine == "all"
                    ? {
                        title: {
                          text: "Machines",
                          align: "right",
                          offsetY: 10,
                          style: {
                            color: "#484848",
                            
                            fontSize: "14px",
                            fontWeight: "bold",
                          },
                        },
                        type: "category",
                        categories: tempBoxPlot.map((each) => each.x),
                        labels: {
                          show: false,
                        },
                        tooltip: {
                          show: false,
                        },
                      }
                    : {
                        title: {
                          text: "Time",
                          align: "right",
                          
                          style: {
                            color: "#484848",
                            
                            fontSize: "14px",
                            fontWeight: "bold",
                          },
                        },
                        type: "datetime",
                        tooltip: {
                          show: true,
                          formatter: function(val) {
                            return `${new Date(val).getDate()}/${new Date(
                              val
                            ).getMonth() + 1}`;
                          },
                        },
                        datetimeUTC: true,
                        labels: {
                          show: true,
                          datetimeUTC: false,
                        },
                      },
                yaxis: {
                  title: {
                    text: "Cycle Time (seconds)",
                  },
                },
                tooltip: {
                  shared: false,
                  intersect: true,
                },
              },
            };
            console.log("tempBoxPlot tempBoxPlot tempBoxPlot", tempBoxPlot);
            if (machine === "all") {
              theChart.series = [];
              tempBoxPlot.forEach((machine) => {
                let temp = {
                  name: machine.x,
                  type: "boxPlot",
                  data: [machine],
                };
                theChart.series.push(temp);
              });
            } else {
              theChart.series[0].data = tempBoxPlot;
            }

            if (tempOutliersPlot.length) {
              theChart.series[1].data = tempOutliersPlot;
            }
            this.present=false;
            this.boxPlotChart = theChart;
          } else {
            this.boxPlotChart = {};
            this.present=true;
          }
        })
        .catch((error) => {
          this.showLoader = false;
            if (error.response && error.response.status === 401) {
                sessionStorage.clear();
                router.push("/login");
            } else {
                alert('internal error')
                this.present=true;
                console.log("axios error", error.message);
            }
        });
    },
        intervalFetchData(machineId, startDate, endDate) {
            this.machine_id_Selected = machineId;

      this.search(machineId, startDate, endDate);
    },
    // onSelectCustomDate(val) {
    //   this.selectedDate = val;
    // },
    // onSelectFromToDate() {
    //   this.selectedDate = this.fromDate + " ~ " + this.toDate;
    // },
  },
};
</script>

<style scoped>


.v-list-item--link {
  border-bottom: 1px solid #e1e1e1;
}

.row.bg-white.mydrop {
  padding: 13px;
}
.my-datelist2.v-list {
  border-top: 1px solid #e1e1e1 !important;
}

.my-datelist2 .v-list-item__title {
  align-self: center;
  font-size: 0.91rem;
  color: #7e84a3;
}

.my-datelist2 .v-list-item {
  min-height: 34px;
}
.my-datelist2 .v-list-item:hover {
  background-color: #e9e9e9;
}

.my-datelist2 .v-list-item:hover .v-list-item__title {
  color: #0c479d;
}

.my-datelist2.v-sheet.v-list {
  padding: 0;
  /* margin-top: -35px; */
}

.btn-square2 {
  height: 48px !important;
  min-width: 48px !important;
  padding: 0 !important;
  border-radius: 5px !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
