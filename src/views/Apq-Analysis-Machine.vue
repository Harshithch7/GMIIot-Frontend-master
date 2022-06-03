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
      <v-col cols="10">
        <filterHeaderComp style="margin-right: 5px !important" />
      </v-col>
      <v-col cols="12" sm="2" md="2" style="margin-top: -10px;">
        <v-row class="text-right" >
          <v-col cols="12" sm="12" md="12" class="chart-toggle-btn">
            <v-btn
              v-bind:class="{ active: viewType === 'pieChart' }"
              v-on:click="changeViewType('pieChart')"
              depressed
              class="btn-barchart btn-square mr-1"
            >
              <v-icon>icon-pie-chart</v-icon>
            </v-btn>
            <v-btn
              v-bind:class="{ active: viewType === 'barChart' }"
              v-on:click="changeViewType('barChart')"
              depressed
              class="btn-square btn-piechart "
            >
              <v-icon>icon-chart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mb-3 mt-5" v-if="viewType === 'pieChart'">
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
           <div v-bind:key="val.id" v-for="val in insightsData" >
        <v-container>
          <v-row>
      <v-col >
             
        <v-card
          class="oee-card oee-card-danger bg-lightblue  card-shadow"
          style="overflow-y: auto;"
          v-if=" apqData.length !=0"
          width="330px" height="255px"
        >
          <v-card-text class="">
            <v-row align="center" class="mb-2">
              <v-icon color="primary">icon-insights</v-icon>
              <v-card-title class="pt-0 pb-0">Insights</v-card-title>
            </v-row>
                     <v-row align="center"  >
              <div v-bind:key="epa.id" v-for="epa in val.insights">
                <span v-if="epa.status !='Normal'">
                  <p>
                    <span
                      v-if="'high_alert' in epa || 'low_alert' in epa"
                      class="insights_param"
                      >{{ epa.parameter_name }}:
                    </span>
                    <span
                      v-if="'high_alert' in epa || 'low_alert' in epa"
                      v-bind:class="{
                        insights_normal:
                          epa.status != 'High' && epa.status != 'Low',
                        insights_alert:
                          epa.status == 'High' || epa.status == 'Low',
                      }"
                    >
                      {{ epa.current }} was {{ epa.status }} @
                      {{ epa.current_time }}. <br />

                      <span
                        v-if="
                          epa.high_alert != 'null' && epa.low_alert != 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value range ( {{ epa.low_alert }}-{{
                          epa.high_alert
                        }})
                      </span>
                      <span
                        v-if="
                          epa.high_alert == 'null' && epa.low_alert != 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value &gt; {{ epa.low_alert }}
                      </span>

                      <span
                        v-if="
                          epa.high_alert != 'null' && epa.low_alert == 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value &lt;  {{ epa.high_alert }}
                      </span>
                      <span
                        v-if="
                          epa.high_alert == 'null' && epa.low_alert == 'null'
                        "
                      >
                      </span>
                    </span>
                  </p>
                </span>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
 </v-row>
        </v-container>
      </div>

      <div v-bind:key="apq.id" v-for="apq in apqData">
        <v-container>
          <v-row>
            <v-col>
              <v-card
                :class="ChangeLowerEdgeColor(apq.series)"
                @click="moveToPerformancePage(apq.chart_title)"
                width="330px" height="255px"
              >
                <v-card-text class="">
                  <v-row align="center" class="mbN-2">
                    <v-icon color="primary">{{
                      Changeiconaspertitle(apq.chart_title)
                    }}</v-icon>
                    <v-card-title class="pt-0 pb-0">{{
                      apq.chart_title
                    }}</v-card-title>
                  </v-row>
                  <v-row align="center" class="text-center mbN-4">
                    <v-col
                      cols="6"
                      sm="6"
                      md="6"
                      class="border-right pr-0 pl-0"
                    >
                      <div class="transition-swing text-subtitle-2">
                        Min: {{ apq.min }}
                      </div>
                      <div class="transition-swing text-subtitle-2">
                        Avg: {{ apq.average }}
                      </div>
                      <div class="transition-swing text-subtitle-2">
                        Max: {{ apq.max }}
                      </div>
                    
                    </v-col>
                    <v-col cols="6" sm="6" md="6" class="pr-0 pl-6 pa-1">
                      <div id="chartavailiability" style="margin-left: -48px">
                        <apexchart
                          type="radialBar"
                          height="190"
                          :options="apq.chartOptions"
                          :series="apq.series"
                        ></apexchart>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>


    </v-row>

    <v-row class="mb-3 mt-5" v-if="viewType === 'barChart'">
        <v-col v-if="present1">
       <!-- <div >
        <v-btn  color="primary " class="ml-10">
          No Data Found
        </v-btn>
      </div> -->
            <h1  style="margin-top:10px; color=blue;" color="primary" >
          No Data Available
        </h1>
      </v-col>
      <div v-bind:key="apq.id" v-for="apq in apqData1">
        <v-container>
          <v-row>
            <v-col>
              <v-card class="oee-card oee-card-white card-shadow" width="330px"  height= '255px'>
                <v-card-text class="">
                  <v-row align="center" class="mbN-2">
                    <v-icon color="primary">{{
                      Changeiconaspertitle(apq.chartTitle)
                    }}</v-icon>
                    <v-card-title class="pt-0 pb-0">{{
                      apq.chartTitle
                    }}</v-card-title>
                  </v-row>
                  <v-row align="center" class="text-center mbN-4">
                    <v-col cols="12" sm="12" md="12" class="pr-0 pl-0 pa-1">
                      <div id="chartavailiability">
                        <apexchart
                          type="area"
                          :options="apq.chartOptions"
                          :series="apq.series"
                        ></apexchart>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-col>
        <v-card
          class="oee-card oee-card-danger bg-lightblue  card-shadow"
          style="overflow-y: auto;  width: 330px;  height: 255px;"
          v-if=" apqData1.length !=0"
        >
          <v-card-text class="">
            <v-row align="center" class="mb-2">
              <v-icon>icon-insights</v-icon>
              <v-card-title class="pt-0 pb-0">Insights</v-card-title>
            </v-row>
            <v-row align="center"  >
              <div v-bind:key="epa.id" v-for="epa in insightsData">
                <span v-if="epa.status !='Normal'">
                  <p>
                    <span
                      v-if="'high_alert' in epa || 'low_alert' in epa"
                      class="insights_param"
                      >{{ epa.parameter_name }}:
                    </span>
                    <span
                      v-if="'high_alert' in epa || 'low_alert' in epa"
                      v-bind:class="{
                        insights_normal:
                          epa.status != 'High' && epa.status != 'Low',
                        insights_alert:
                          epa.status == 'High' || epa.status == 'Low',
                      }"
                    >
                      {{ epa.current }} was {{ epa.status }} @
                      {{ epa.current_time }}. <br />

                      <span
                        v-if="
                          epa.high_alert != 'null' && epa.low_alert != 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value range ( {{ epa.low_alert }}-{{
                          epa.high_alert
                        }})
                      </span>
                      <span
                        v-if="
                          epa.high_alert == 'null' && epa.low_alert != 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value &gt; {{ epa.low_alert }}
                      </span>

                      <span
                        v-if="
                          epa.high_alert != 'null' && epa.low_alert == 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value &lt;  {{ epa.high_alert }}
                      </span>
                      <span
                        v-if="
                          epa.high_alert == 'null' && epa.low_alert == 'null'
                        "
                      >
                      </span>
                    </span>
                  </p>
                </span>
              </div>
              <!-- <v-col cols="6" sm="6" md="3" class="border-after">
                <div>
                  <div class="transition-swing text-subtitle-2">RH</div>
                  <div class="text-success transition-swing text-h3">31</div>
                  <div class="text-success transition-swing text-subtitle-2">
                    was normal
                  </div>
                  <div
                    class="transition-swing text-caption font-weight-bold mt-1"
                  >
                    @ 24 JUN 2021 | THU | 16:00:00 Ideal value for this
                    parameter is below 50
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="6" md="3" class="border-after">
                <div>
                  <div class="transition-swing text-subtitle-2">6U</div>
                  <div class="text-success transition-swing text-h3">3</div>
                  <div class="text-success transition-swing text-subtitle-2">
                    was normal
                  </div>
                  <div
                    class="transition-swing text-caption font-weight-bold mt-1"
                  >
                    @ 24 JUN 2021 | THU | 16:00:00 Ideal value for this
                    parameter is below 18
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="6" md="3" class="border-after">
                <div>
                  <div class="transition-swing text-subtitle-2">14U</div>
                  <div class="text-success transition-swing text-h3">0</div>
                  <div class="text-success transition-swing text-subtitle-2">
                    was normal
                  </div>
                  <div
                    class="transition-swing text-caption font-weight-bold mt-1"
                  >
                    @ 24 JUN 2021 | THU | 16:00:00 Ideal value for this
                    parameter is below 15
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="6" md="3">
                <div>
                  <div class="transition-swing text-subtitle-2">4U</div>
                  <div class="text-red transition-swing text-h3">18</div>
                  <div class="text-red transition-swing text-subtitle-2">
                    was High
                  </div>
                  <div
                    class="transition-swing text-caption font-weight-bold mt-1"
                  >
                    @ 24 JUN 2021 | THU | 16:00:00 Ideal value for this
                    parameter is below 18
                  </div>
                </div>
              </v-col> -->
            </v-row>
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
  mounted() {
    this.showLoader = false;
    this.machine_id_Selected = this.$route.params.macId;

    //console.log("mac id passed ", this.machine_id_Selected);
  },
  data: () => ({
                        crumbs: ['Home', 'Plant Monitoring Dashboard', 'OEE Monitoring Dashboard', 'APQ Analysis By Machine '],

    apqData1: [],
    present: false,
    apqData: [],
    present1: false,
    machineId: 0,
          showLoader: false,

    macId: 0,
    checkbox: false,
    showInsights: false,
    insightsData: [],
    epaData: [],
    machine_id_Selected: "",
    date_filter_id_Selected: "",
    start_date: "",
    end_date: "",
    dateRangeSelected: "",
    isActive: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    items: [
      {
        text: "",
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
        text: "APQ Analysis by Machine",
        disabled: true,
      },
    ],

    viewType: "pieChart",
  }),

  methods: {
                                 selected(crumb) {
      if (crumb === 'Home')
      {
   
        if (`/${sessionStorage.getItem("route_first_option")}` == '/analysis_machine')
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
      
      
      console.log(crumb);
    },
    //     moveToPerformancePage(parameter) {
    //   if (parameter === "performance") {
    //     this.$router.push({
    //       name: "performanceTrends",
    //       params: { macId: this.machine_id_Selected },
    //     });
    //   }
    // },
    ChangeLowerEdgeColor(value) {
      if (value < 50) {
        return "oee-card oee-card-danger  card-shadow";
      } else if (value == 50 || value <= 75) {
        return "oee-card oee-card-warning  card-shadow";
      } else {
        return "oee-card oee-card-sucess  card-shadow";
      }
    },
    Changeiconaspertitle(value) {
      console.log("checking value", value);
      if (value == "Availability") return "icon-availability";
      else if (value == "Performance") return "icon-performance";
      else if (value == "Quality") return "icon-quality";
    },
    toChangeTextColor: () => {
      console.log("checking if possible or not.");
    },
    moveToPerformancePage(parameter) {
      console.log("checking t");
      if (parameter === "Performance") {
        this.$router.push({
          name: "performanceTrends",
          params: { macId: this.machine_id_Selected },
        });
      }
    },

    formatDateData: (x) => {
      var today = new Date();
      today.setDate(today.getDate() - x);
      return (today / 1000).toFixed(0);
    },
    formatDate: (y) => {
      var today = new Date(y);
      return (today / 1000).toFixed(0);
    },
    searchNew(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
      this.machineId = machine_id;
      let config = {};
this.showLoader=true;
      if (this.start_date == "" || this.start_date == "undefined") {
        config = {
          method: "get",
          url: `${constants.backend_url}/getAPQAnalysis?machine=${machine_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      } else {
        config = {
          method: "get",
          url: `${constants.backend_url}/getAPQAnalysis?machine=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          if (response.data.data != []) {
            this.showInsights = true;
            this.insightsData = [];
          }
          try {
            let data = response.data.data[0];
            if (data) {
              let machineinsights = response.data.data[0].machine_insights;
              let mapping_data = response.data.data[0].mapping_data;
              let sanitisedData = this.sanitisedData(data);
              let finalData = this.finalizeData(
                sanitisedData,
                machineinsights,
                mapping_data
              );
              //console.log("checking the final data after assigned", finalData);
              sessionStorage.removeItem("machineID");
              let insights = finalData[1];
              let condemn_list = response.data.data[0].condemning_limit || [];

              let presetParameterList = [];
              let parameterGroup = response.data.data[0].parameter_group;

              for (let i = 0; i < finalData[1].length; i++) {
                //console.log("checking final data each in it=>", finalData[1][i]);
                presetParameterList.push(finalData[1][i].parameter_name);
              }
              for (let i = 0; i < machineinsights.length; i++) {
                for (let j = 0; j < parameterGroup.length; j++) {
                  for (
                    let _m = 0;
                    _m < parameterGroup[j].parameter_list.length;
                    _m++
                  ) {
                    if (
                      parameterGroup[j].parameter_list[_m].name ==
                        insights[i].parameter_name &&
                      insights[i].parameter_name != "low_caution" &&
                      insights[i].parameter_name != "high_caution"
                    ) {
                      for (let c_l = 0; c_l < condemn_list.length; c_l++) {
                        // console.log("checking codemning list=>",condemn_list[c_l]);
                        if (
                          condemn_list[c_l].parameter_name ==
                          insights[i].parameter_name
                        ) {
                          insights[i].high_alert = condemn_list[c_l].high_alert;
                          insights[i].low_alert = condemn_list[c_l].low_alert;
                        }
                      }
                    }
                  }
                }
              }

              for (let i = 0; i < insights.length; i++) {
                if (insights[i].status == "high_alert") {
                  insights[i].status = "High";
                }
                if (insights[i].status == "low_alert") {
                  insights[i].status = "Low";
                }
                if (insights[i].status == "OK") {
                  insights[i].status = "Normal";
                }
                if (insights[i].status == "low_caution") {
                  insights[i] = {};
                }
                if (insights[i].status == "high_caution") {
                  insights[i] = {};
                }
              }
              //console.log("checking insigfhts=>", insights);
                let value = {
                    id: 1,
   insights:insights
                  }
              this.insightsData = [value] || [[]];
                          this.present = false;
              console.log("checkig final Data",finalData);

              (this.showInsights = true), (this.apqData = finalData[0]);
            } else {
              let sanitisedData = this.sanitisedData({});
              let finalData = this.finalizeData(sanitisedData, {});
              console.log("checkig final Data",finalData);
              this.apqData = finalData[0];
            }
                      this.showLoader=false;

          } catch (exception) {
            this.apqData = [];
                                  this.showLoader=false;

            this.present = true
            console.log("error in catch block [searchNew]", exception);
          }
        })
        .catch((error) => {
                                            this.showLoader=false;

          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("axios error", error.message);
          }
        });
    },
    sanitisedData(data) {
      let id = this.machineId;
      //console.log("checking data insanitize=>",data);
      let availability =
        Object.keys(data).length !== 0 && data["availability statistics"]
          ? {
              values: [
                data["availability statistics"].average
                  ? data["availability statistics"].average
                  : 0,
                data["availability statistics"].max
                  ? data["availability statistics"].max
                  : 0,
                data["availability statistics"].min
                  ? data["availability statistics"].min
                  : 0,
              ],
            }
          : { values: [0, 0, 0] };
      let performance =
        Object.keys(data).length !== 0 && data["performance statistics"]
          ? {
              values: [
                data["performance statistics"].average
                  ? data["performance statistics"].average
                  : 0,
                data["performance statistics"].max
                  ? data["performance statistics"].max
                  : 0,
                data["performance statistics"].min
                  ? data["performance statistics"].min
                  : 0,
              ],
            }
          : { values: [0, 0, 0] };
      let quality =
        Object.keys(data).length !== 0 && data["quality statistics"]
          ? {
              values: [
                data["quality statistics"].average
                  ? data["quality statistics"].average
                  : 0,
                data["quality statistics"].max
                  ? data["quality statistics"].max
                  : 0,
                data["quality statistics"].min
                  ? data["quality statistics"].min
                  : 0,
              ],
            }
          : { values: [0, 0, 0] };
      //console.log("checking what is assigned",'Avali=>',availability,"Perf=>",
      //performance,'Qual=>',quality);
      let singleMachineAPQ = {
        id,
        data: {
          availability,
          performance,
          quality,
        },
      };
      return singleMachineAPQ;
    },
    finalizeData: (sanitisedAPQ, machineinsights, mapping_data) => {
      //console.log(">>>> finalizeData >>>>", machineinsights, sanitisedAPQ,mapping_data);
      let sanitisedData = sanitisedAPQ;
      let charts = ["availability", "performance", "quality"];
      let finalResp = [];
      charts.forEach((chartTitle) => {
        if (Object.keys(sanitisedData.data[chartTitle]).length !== 0) {
          // sanitisedData=sanitisedData.data
          // console.log("Data in foreach",sanitisedData)
          //console.log("checking chart title", chartTitle);

          let val = sanitisedData.data[chartTitle].values;
          let average = val[0];
          //console.log("checkig average", average);
          for (let i = 0; i < machineinsights.length; i++) {
            if (machineinsights[i].parameter_name.toLowerCase() == chartTitle) {
              //let avg = (average * 100).toFixed(2);
              if (machineinsights[i].status == "OK") {
                //console.log("checking mapping data=>",mapping_data,chartTitle);
                for (let dict in mapping_data) {
                  //console.log("checking mapping data with dict=>",dict,chartTitle);

                  if (chartTitle == dict) {
                    //console.log("checkig befire map",mapping_data[dict]);
                    machineinsights[i].current = mapping_data[dict][0].value;
                  }
                }
              }
            }
          }
          //console.log("checking amchine isnghts=>", machineinsights,sanitisedData.data);
          let textcolr = null;
          let avg_val =
            (sanitisedData.data[chartTitle].values[0] * 100).toFixed() || 0;
          if (avg_val)
            if (avg_val < 50) {
              textcolr = "#ff0000";
            } else if (avg_val == 50 || avg_val <= 75) {
              textcolr = "#FF9806";
            } else {
              textcolr = "#29a329";
            }
          let chartData = {
            id: sanitisedData.id,
            chart_title:
              chartTitle.charAt(0).toUpperCase() + chartTitle.slice(1),
            average:
              (sanitisedData.data[chartTitle].values[0] * 100).toFixed() || 0,
            max:
              (sanitisedData.data[chartTitle].values[1] * 100).toFixed() || 0,
            min:
              (sanitisedData.data[chartTitle].values[2] * 100).toFixed() || 0,
            // last: sanitisedData.data[chartTitle].values[3] * 100,

            chartOptions: {
              chart: {
                type: "radialBar",
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: "60%",
                  },
                  track: {
                    background: "#f0f0f0",
                    margin: 5, // margin is in pixels
                    // dropShadow: {
                    //   enabled: true,
                    //   top: 2,
                    //   left: 0,
                    //   color: "#999",
                    //   opacity: 1,
                    //   blur: 2,
                    // },
                  },
                  dataLabels: {
                    textAnchor: "middle",
                    style: {
                        marginBottom: "10px"
                    },
                    name: {
                      fontSize: "30px",
                      color: "#F0000B",
                      offsetY: 14,

                      show: false,
                    },
                    value: {
                      fontSize: "30px",
                      color: textcolr,
                      marginBottom: "10px",

                      formatter: function(val) {
                        return val;
                      },
                    },
                  },
                },
              },
              fill: {
                colors: [
                  function(average) {
                    if (average.value < 50) {
                      return "#ff0000";
                    } else if (average.value == 50 || average.value <= 75) {
                      return "#FF9806";
                    } else {
                      return "#29a329";
                    }
                  },
                ],
              },
              // stroke: {
              //   dashArray: 4,
              // },
            },
            series:
              typeof average === "number" ? [Math.round(average * 100)] : "-",
          };
          finalResp.push(chartData);
        }
      });
      //console.log("checking machine insights", machineinsights);
      return [finalResp, machineinsights];
    },

    changeViewType(type) {
      console.log(type);
      this.viewType = type;
      this.isActive = !this.isActive;
      console.log(
        "Checking after view change",
        this.machine_id_Selected,
        sessionStorage.apqmachinestartdate,
        sessionStorage.endDate
      );
      this.intervalFetchData(
        this.machine_id_Selected,
        sessionStorage.apqmachinestartdate,
        sessionStorage.endDate
      );
    },

    intervalFetchData(machine_id, startDate, endDate) {
      console.log("checing chart type", this.viewType);
      sessionStorage.setItem("apqmachine", machine_id);
      sessionStorage.setItem("apqmachinestartdate", startDate);
      sessionStorage.setItem("apqmachineenddate", endDate);

      if (this.viewType == "pieChart") {
        if (machine_id == null || isNaN(machine_id)) {
          //console.log("mac id is null");
          machine_id = this.machine_id_Selected;
        }
        // this.macId = machine_id;
        this.machine_id_Selected = machine_id;
        if (
          sessionStorage.datefilter != null ||
          sessionStorage.startdate != null ||
          sessionStorage.enddate != null
        ) {
          // var machine_id = this.macId;
          //var datefilter = sessionStorage.datefilter;
          //console.log("date filter is ", datefilter);

          this.searchNew(machine_id, startDate, endDate);
        } else {
          this.searchNew(machine_id, startDate, endDate);
        }
      } else {
        if (isNaN(machine_id)) {
          machine_id = this.$route.params.macId;
        }
        this.machine_id_Selected = machine_id;
        this.start_date = startDate;
        this.end_date = endDate;
        console.log("checking to search", this.checkbox);
        console.log("inside interval fetch  of apqcharts", this.checkbox);
        this.searchNew1(
          this.machine_id_Selected,
          this.start_date,
          this.end_date
        );
        this.oilInterval = setInterval(() => {
          console.log("inside set interval of apqcharts", this.checkbox);
          let unix = Math.round(+new Date() / 1000);
          // console.log("getting current time stamp=>",unix);
          this.end_date = unix;
          this.$root.$on("value_of_checkbox", (text) => {
            console.log(
              "checking text",
              text,
              typeof text,
              this.checkbox,
              typeof this.checkbox
            );
            if (text) {
              ("checking whetehr text is satisfied");
              this.checkbox = true;
            } else {
              this.checkbox = false;
            }
          });
          console.log("checkign after assinging text", this.checkbox);
          if (this.checkbox == true) {
            this.searchNew(
              this.machine_id_Selected,
              this.start_date,
              this.end_date
            );
          } else if (this.checkbox == false) {
            console.log("Autorefresh is disabled.");
          }
        }, 100000);
      }
    },
    searchNew1: function(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
      this.machine_id_Selected = machine_id;
      // document.querySelector("#loaderStyle").style.display = "block";
                                  this.showLoader=true;

      let config = {};
      if (this.start_date == "") {
        config = {
          method: "get",
          url: `${constants.backend_url}/getMachineAPQAnalysis?machine=${machine_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      } else {
        config = {
          method: "get",
          url: `${constants.backend_url}/getMachineAPQAnalysis?machine=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {

          if (response.data.data != []) {
            this.showInsights = false;
          }
          try {
            this.present1=false;
            let data = response.data.data[0];
            let condemn_list = response.data.data[0].condemning_limit || [];

            let machineinsights = response.data.data[0].machine_insights;
            console.log("checkign isnifhts=>", machineinsights);
            let paramNames = Object.keys(response.data.data[0].data).map(
              function(k) {
                return k;
              }
            );
            // console.log("params",paramNames);
            // console.log("dataNew", data, paramNames);
            let sanitisedData = this.sanitisedDataNew1(data.data, paramNames);
            // console.log("sanitisedDataNew", sanitisedData);
            let finalData = this.finalizeDataNew1(
              sanitisedData,
              paramNames,
              machineinsights,
              condemn_list
            );
            this.showInsights = true;
            let presetParameterList = [];
            let parameterGroup = response.data.data[0].parameter_group;
            console.log("checking total present  list=>", parameterGroup);
            let insights = finalData[1];
            for (let i = 0; i < finalData[1].length; i++) {
              console.log("checking final data each in it=>", finalData[1][i]);
              presetParameterList.push(finalData[1][i].parameter_name);
            }
            for (let i = 0; i < insights.length; i++) {
              for (let j = 0; j < parameterGroup.length; j++) {
                for (
                  let _m = 0;
                  _m < parameterGroup[j].parameter_list.length;
                  _m++
                ) {
                  if (
                    parameterGroup[j].parameter_list[_m].name ==
                      insights[i].parameter_name &&
                    insights[i].parameter_name != "low_caution" &&
                    insights[i].parameter_name != "high_caution"
                  ) {
                    for (let c_l = 0; c_l < condemn_list.length; c_l++) {
                      // console.log("checking codemning list=>",condemn_list[c_l]);
                      if (
                        condemn_list[c_l].parameter_name ==
                        insights[i].parameter_name
                      ) {
                        insights[i].high_alert = condemn_list[c_l].high_alert;
                        insights[i].low_alert = condemn_list[c_l].low_alert;
                      }
                    }
                  }
                }
              }
            }
            for (let i = 0; i < insights.length; i++) {
              if (insights[i].status == "high_alert") {
                insights[i].status = "High";
              }
              if (insights[i].status == "low_alert") {
                insights[i].status = "Low";
              }
              if (insights[i].status == "OK") {
                insights[i].status = "Normal";
              }
            }
            console.log("checking insigfhts=>", insights);
            this.insightsData = insights;

            this.apqData1 = finalData[0];
            console.log("checki g",response.data.data[0].data.availability.length);
            if (response.data.data[0].data.availability.length ==0)
            {
              this.apqData1 = [];
              this.present1=true;
            }
                                                        this.showLoader=false;

          } catch (exception) {
            this.apqData1 = [];
                                                        this.showLoader=false;

          }
        })
        .catch((error) => {
                                                      this.showLoader=false;

          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("axios error", error.message);
          }
        });
    },
    sanitisedDataNew1: (data, paramNames) => {
      let id = "CAT 3306";
      let segData = {};
      let newNames = [];
      for (let i = 0; i < paramNames.length; ++i) {
        let name = paramNames[i].replace(" ", "_");
        segData[name] = { timestamps: [], values: [], param: [] };
        newNames.push(name);
      }
      for (let j = 0; j < paramNames.length; j++) {
        for (var i = 0; i < data[paramNames[j]].length; i++) {
          //console.log("checking loop",data[paramNames[j]][i]);
          var obj = data[paramNames[j]][i];
          segData[newNames[j]].timestamps.push(obj.time * 1000);
          segData[newNames[j]].values.push(obj.value);
          segData[newNames[j]].param.push(paramNames[j]);
        }
      }
      let singleMachineAPQ = {
        id,
        data: {},
      };
      for (i = 0; i < newNames.length; i++) {
        if (paramNames[i] == segData[newNames[i]].param[0]) {
          //console.log(segData[newNames[i]]);
          id = segData[newNames[i]].param[0]
          singleMachineAPQ.data[newNames[i]] = segData[newNames[i]];
          console.log("Checking id",id);
        }
      }
      //singleMachineAPQ[data] = segData;
      return singleMachineAPQ;
    },
    finalizeDataNew1: (
      sanitisedAPQ,
      paramNames,
      machineinsights,
      condemn_list
    ) => {
      // console.log("inside final data sanitisedAPQ", sanitisedAPQ.data.performance.timestamps);
      console.log("cateogry=>", paramNames, condemn_list);

      let sanitisedData = sanitisedAPQ;
      let charts = paramNames;
      let finalResp = [];
      let minList = [];
      let maxList = [];

      // let maX = [];
      // let readingLength = 0;
      let checkin = "";
      // let readingLength = 0;

      // let currentValue = [];
      let maxCheck = undefined;
      let minCheck = undefined;

      charts.forEach((chartTitle) => {
        let seriesValues = [];
        console.log("checking  title=>", chartTitle);
        for (let i = 0; i < condemn_list.length; i++) {
          Object.entries(condemn_list[i]).forEach(([key, value]) => {
            if (key == "") {
              console.log("key=>", key);
            }
            console.log("checking value and chartname=>", value);
            let tit = chartTitle[0].toUpperCase() + chartTitle.slice(1);
            if (value == tit) {
              console.log("checking title", value, tit);
              checkin = condemn_list[i];

              if ("low_caution" in checkin) {
                delete checkin["low_caution"];
              }
              if ("high_caution" in checkin) {
                delete checkin["high_caution"];
              }
            }
          });
        }

        let _title = chartTitle;
        let y_title = _title;
        y_title = y_title.charAt(0).toUpperCase() + y_title.slice(1);
        _title = y_title;
        chartTitle = chartTitle.replace(" ", "_");
        // console.log(
        //   "changed title",
        //   chartTitle,
        //   sanitisedAPQ.data[chartTitle].values
        // );

        // console.log("hello man", sanitisedAPQ.data[chartTitle].values);sanitisedAPQ.data[chartTitle].timestamps
        for (let i = 0; i < machineinsights.length; i++) {
          if (machineinsights[i].parameter_name.toLowerCase() == chartTitle) {
            let cur = sanitisedAPQ.data[chartTitle].values;
            let singlValue = { chartTitle, cur };
            seriesValues.push(singlValue);
            let maxCUrrent = Math.max(...cur) || 0;
            let minCUrrent = Math.min(...cur) || 0;
            minList.push(minCUrrent);
            maxList.push(maxCUrrent);
            maxCheck = maxCUrrent || 0;
            minCheck = minCUrrent || 0;
            if (machineinsights[i].status == "OK") {
              machineinsights[i].current = cur[cur.length - 1];
            }
            let time = sanitisedAPQ.data[chartTitle].timestamps;
            let date = time[time.length - 1];
            console.log("cehclkif data", date, typeof date);
            //  let _date = this.timeConverter(date);
            let ma = new Date(date);
            console.log("checking ma=>", ma);
            // 1412743274  1614879000 1614879000000
            //  let _date = this.getDateTimeFromTimestamp(date);
            //  console.log("checkig time=>",_date,time);
            // machineinsights[i].current_time = ma;
          }
        }
        console.log(
          "checking minlist and maxlist out of loop=>",
          minList,
          maxList
        );
        minCheck = Math.min(...minList);
        maxCheck = Math.max(...maxList);
        let lowAlertValue = [];
        let highAlertValue = [];
        let lowAlertChart = {
          chartTitle: "Alert",
          cur: lowAlertValue,
        };
        let highAlertChart = {
          chartTitle: "Alert",
          cur: highAlertValue,
        };
        if (checkin.high_alert != "null" && checkin.high_alert > maxCheck) {
          console.log(
            maxCheck +
              " high alert greater than max satisfied" +
              checkin.high_alert
          );
          maxCheck = checkin.high_alert;
        } else if (
          checkin.high_alert == "null" &&
          checkin.low_alert != "null" &&
          checkin.low_alert > maxCheck
        ) {
          console.log(
            maxCheck +
              " low alert greater than max satisfied" +
              checkin.low_alert
          );
          maxCheck = checkin.low_alert;
        }
        if (checkin.high_alert != "null" && checkin.high_alert < minCheck) {
          minCheck = checkin.high_alert;
        } else if (
          checkin.high_alert == "null" &&
          checkin.low_alert != "null" &&
          checkin.low_alert < minCheck
        ) {
          minCheck = checkin.low_alert;
        } else if (
          checkin.high_alert != "null" &&
          checkin.low_alert != "null" &&
          checkin.low_alert < minCheck
        ) {
          minCheck = checkin.low_alert;
        }
        console.log("checking min and max", minCheck, maxCheck);
        let alertsValues = [];
        console.log("cehcking alerts", checkin.low_alert, checkin.high_alert);
        if (checkin.low_alert != "null") {
          alertsValues.push(lowAlertChart);
        } else if (checkin.high_alert != "null") {
          alertsValues.push(highAlertChart);
        }
        console.log("checking alerts values=>", alertsValues);
        seriesValues = alertsValues.concat(seriesValues);
        console.log("checking series values=>", seriesValues);
        // let getColors = (x) => {
        //   let colors = [];
        //   let joiningColors = [];
        //   let alertColor = [];
        //   if (x == 2) {
        //     colors = constants.colors.slice(0, x - 1);
        //     colors.pop();
        //     colors.push(constants.rapBlue);
        //     alertColor.push(constants.exxonRed);
        //     joiningColors = alertColor.concat(colors);
        //   } else if (x == 1) {
        //     colors = constants.colors.slice(0, x);
        //     colors.pop();
        //     colors.push(constants.rapBlue);
        //     joiningColors = alertColor.concat(colors);
        //   }
        //   else {
        //     colors = constants.colors.slice(0, x);
        //     alertColor.push(constants.exxonRed);
        //     joiningColors = alertColor.concat(colors);
        //   }
        //   return joiningColors;
        // };
        let getAnnotationData = (value) => {
          let originalValue = value;
          if (value == "null") {
            value = -Infinity;
          } else {
            value = originalValue;
          }
          return value;
        };
       

        let chartData = {
          id: sanitisedData.id,
          chartTitle: _title,
          chartOptions: {
            // colors:getColors(seriesValues.length),
            chart: {
              height: "180px",
              type: "area",
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
            },

            annotations: {
              yaxis: [
                {
                  y: getAnnotationData(checkin["high_alert"]) || -Infinity,
                  borderColor: "#ff0000",
                  borderWidth: 3,
                  label: {
                    borderColor: "#cc0066",
                    style: {
                      color: "#fff",
                      width: 2,
                      background: "#cc0066",
                    },
                  },
                },
                {
                  y: getAnnotationData(checkin["low_alert"]) || -Infinity,
                  borderColor: "#ff0000",
                  borderWidth: 3,
                  label: {
                    borderColor: "#996633",
                    style: {
                      color: "#fff",
                      width: 2,
                      background: "#996633",
                    },
                  },
                },
              ],
            },
            dataLabels: { enabled: false },
            // title: {
            //   text: _title,
            //   align: "left",
            //   style: {
            //     color: "#484848",
            //     fontFamily: "EMPrint",
            //     fontSize: "18px",
            //     fontWeight: "bold",
            //   },
            // },
            legend: {
              position: "top",
              horizontalAlign: "left",
            },
            xaxis: {
              title: {
                text: "Time",
                align: "right",
                // offsetY: 10,
                style: {
                  color: "#484848",
                  // fontFamily: "EMPrint",
                  fontSize: "16px",
                  fontWeight: "bold",
                  // marginBottom: "12px"
                },
              },
              type: "datetime",
              categories: sanitisedAPQ.data[chartTitle]
                ? sanitisedAPQ.data[chartTitle].timestamps
                : [],
              datetimeUTC: true,
              labels: {
                datetimeUTC: false,
              },
              axisBorder: {
                show: true,
                color: "#78909C",
                height: 1,
                width: "100%",
                offsetX: 0,
                offsetY: 0,
              },
            },
            yaxis: {
              title: {
                text: y_title + "%",
              },
            },
            stroke: {
              width: 2,
              curve: "smooth",

              // colors: "#FF2B2B",
            },
            tooltip: {
              shared: false,
              x: {
                format: "dd MMM - HH : mm: ss ",
              },
            },
          },
          series: [
            {
              name: chartTitle,
              data: sanitisedAPQ.data[chartTitle]
                ? sanitisedAPQ.data[chartTitle].values
                : [],
            },
          ],
        };
        finalResp.push(chartData);
      });
      console.log("chekcig  amcine insghts=>", machineinsights);
      return [finalResp, machineinsights];
    },
  },
  beforeDestroy() {
    console.log("beforeDestroy apq analysis page");

    clearInterval(this.oilInterval);
    // sessionStorage. removeItem('apqmachinestartdate','endDate');
  },
};
</script>
<style scoped >
/* .insights_ideal
 {
  color: #484848;
  font-family: "EMPrint";
  font-size: 14px;
  font-weight: bold;
} */
.insights_ideal {
  color: #484848;
  font-size: 14px;
  font-weight: bold;
}
.insights_alert {
  color: #fe000c;
  font-size: 14px;
  font-weight: bold;
}
/* .insights_normal {
  color: #228517a4;
  font-size: 14px;
  font-weight: bold;
} */
.insights_param {
  color: #484848;
  font-size: 16px;
  font-weight: bold;
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