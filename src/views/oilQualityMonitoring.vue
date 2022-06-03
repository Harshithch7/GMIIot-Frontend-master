<template>
  <v-container fluid>
         <div  id="app">
     <v-row>
          <v-col cols="11">
    <Breadcrumb class="row justify-content-center mt-4" :crumbs="crumbs" @selected="selected" />
    </v-col>
    <v-col cols="1" v-if="showLoader">
        <LoaderProgress
      ></LoaderProgress>
    </v-col>
</v-row>      </div>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->
    <v-row class="mt-0 border-bottom">
      <v-col>
        <filterHeaderComp style="margin-right: 5px !important" />
      </v-col>

    </v-row>
  <v-row >
     
          <div v-if="show_oil"
          style="margin-left:2%; font-weight:bold; font-size:20px; color:#0c479d"
        >
          Oil Name
          <v-chip class="ma-2" color="#0c479d" label outlined>
            {{ oil_name  }} 
          </v-chip>
        </div>
      </v-row>
    <v-row>
           <div v-bind:key="val.id" v-for="val in insightsData">
<v-row>
<v-col >
                       <v-container>

        <v-card id='ins1' class="oee-card oee-card-white card-shadow " height="280px" width="350px"

         style="overflow-y: auto; " >
          <v-card-text  >
            <v-row align="center" class="mbN-2">
              <v-icon color="primary">icon-insights</v-icon>
              <v-card-title class="pt-0 pb-0"> Machine Insights</v-card-title>
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
                <v-card id='ins2' class="oee-card oee-card-white card-shadow " height="280px" width="505px"

         style="overflow-y: auto; " >
          <v-card-text  >
            <v-row align="center" class="mbN-2">
              <v-icon color="primary">icon-insights</v-icon>
              <v-card-title class="pt-0 pb-0"> Machine Insights</v-card-title>
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
                        Ideal value &lt; {{ epa.low_alert }}
                      </span>

                      <span
                        v-if="
                          epa.high_alert != 'null' && epa.low_alert == 'null'
                        "
                        class="insights_ideal"
                      >
                        Ideal value &gt;  {{ epa.high_alert }}
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
                </v-container>
          </v-col >
          </v-row>
  </div>
            <div v-bind:key="apq.id" v-for="apq in apqData">
          <v-row>
            <v-col >
                      <v-container>

              <v-card class="oee-card oee-card-white card-shadow">
                  <v-row align="center" class="mbN-2 ">
                    <v-icon color="primary" class="pt-3 pl-3 pb-3">{{
                      Changeiconaspertitle(apq.chartTitle)
                    }}</v-icon>
                    <v-card-title class=" pt-3 pl-3 pb-3">{{
                      apq.chartTitle
                    }}</v-card-title>
                  </v-row>
                  <v-row align="center" class="text-center mbN-4">
                                        <v-col cols="12" sm="12" md="12" class="pr-4 pl-3 pa-1 pb-3">
                      <div id="div1">
                        <apexchart
 type="line"
 height="200px"
 width=475px
                                        :options="apq.chartOptions"
                          :series="apq.series"
                        ></apexchart>
                                              </div>
                                                <div id="div2">
                        <apexchart
 type="line"
 height="200px"
 width=320px
                                        :options="apq.chartOptions"
                          :series="apq.series"
                        ></apexchart>
                                              </div>
                    </v-col>

                  </v-row>
              </v-card>
                      </v-container>

            </v-col>
          </v-row>
      </div>
      <!-- <v-col cols="12" sm="12" md="6">
        <v-card class="oee-card oee-card-white my-height pa-5">
          <div class="transition-swing text-h6 font-weight-bold text-center">
            Machine Up Time
          </div>
          <apexchart
            type="radialBar"
            :options="machineUp.chartOptions"
            :series="machineUp.series"
          ></apexchart>
        </v-card>
      </v-col> -->
                      <v-col cols="6" class="chartClass1">
          <div v-if="this.showGauge">
            <guage v-bind:gag="guageData" v-if="this.showGauge" />
          </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import guage from "../components/oilqualitygauge.vue";
import axios from "axios";
import filterHeaderComp from "../components/filterHeaderComp.vue";
import constants from "../constants";
import VueApexCharts from "vue-apexcharts";
import router from "../router";
const chartNameMapping = constants.chartNameMapping;
export default {
  prop: ["apqData","guageData"],
  components: {
    apexchart: VueApexCharts,
    filterHeaderComp,
    guage,
    Breadcrumb,
    LoaderProgress
  },
  data: () => ({
    showLoader: false,
              crumbs: ['Home', 'Oil Quality Monitoring'],

          apqData: [],
      apqData_i: [],
      insightsData: [],
      machine_id_Selected: "",
      start_date: "",
      end_date: "",
      param_grps: [],
      showInsights: false,
      results: "",
      showGauge: false,
      guageData: [],
      checkbox: false,
      oilInterval: "",



    fromDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    toDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    menu1: false,
    menu2: false,
    selectedDate: "Today",
    show_oil: false,
    machinelist: ["DPIMM01", "DPIMM02", "DPIMM03", "DPIMM04", "DPIMM05"],
    dates: [],
    items1: ["Today", "Last Day", "Last 7 Days", "Last 15 Days", "Last Month"],
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Oil Quality Monitoring",
        disabled: true,
      },
    ],
    isoRating: {
      series: [
        {
          name: "4U",
          data: [5, 11, 14, 22, 13, 8, 9, 5],
        },
        {
          name: "6U",
          data: [4, 12, 17, 8, 9, 3, 13, 6],
        },
        {
          name: "14U",
          data: [8, 18, 4, 7, 8, 12, 18, 16],
        },
        {
          name: "Alert",
          data: [22, 22, 22, 22, 22, 22, 22, 22],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [2, 2, 2],
          curve: "straight",
        },
        colors: ["#ff9806", "#00e396", "#008FFB", "#f00f00"],
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "13:50:00",
            "14:05:00",
            "14:20:00",
            "14:35:00",
            "15:20:00",
            "16:22:02",
            "16:57:41",
            "17:07:13",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    },
    rhData: {
      series: [
        {
          name: "Time",
          data: [8, 18, 4, 7, 8, 12, 18, 16],
        },
        {
          name: "Alert",
          data: [22, 22, 22, 22, 22, 22, 22, 22],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [2],
          curve: "straight",
          //   colors: ["#008ffb", "#f00f00"],
        },
        colors: ["#008ffb", "#f00f00"],
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "13:50:00",
            "14:05:00",
            "14:20:00",
            "14:35:00",
            "15:20:00",
            "16:22:02",
            "16:57:41",
            "17:07:13",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    },
    machineUp: {
      series: [76],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        
        plotOptions: {
          radialBar: {
              hollow: {
              size: "70%",
               background: 'transparent',
            },
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "14%",
              margin: "5px", // margin is in pixels
            },
            
            dataLabels: {
             textAnchor: "middle",
              name: {
                fontSize: "18px",
                offsetY: -50,
                color: "#222222",
              },
              value: {
                   offsetY: -16,
                fontSize: "18px",
                show: true,
              },
            },
          },
        },
       
        fill: {
          colors: ["#FF9806"],
        },
        labels: ["26 June 2021 | 2:09:25 PM"],
      },
    },
  }),
   beforeDestroy() {
    console.log("beforeDestroy oil cleaning page");
    clearInterval(this.oilInterval);
    this.checkbox = false;
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  methods: {
        selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/oilQualityMonitoring')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }        }
      console.log(crumb);
    },
    Changeiconaspertitle(value) {
      console.log("checking value", value);
      if (value == "ISO Rating") return "mdi-seal";
      else if (value == "RH Data") return "icon-bolt";
      else if (value == "Quality") return "icon-quality";
    },
 timeConverter: (UNIX_timestamp) => {
      // let a = new Date(UNIX_timestamp * 1000);
      let a = new Date((UNIX_timestamp-19800) * 1000);
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let min = a.getMinutes();
      let sec = a.getSeconds();
      let time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
    },



       searchNew: function(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
      // document.querySelector("#warningAlert").style.display = "none";
      this.machine_id_Selected = machine_id;
      let params = "";
      // document.querySelector("#loaderStyle").style.display = "block";
      if (this.start_date == "") {
        params = `?machine=${machine_id}`;
      } else {
        params = `?&machine=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`;
      }
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getMachineOilQualityMonitoring${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        };
        this.showLoader=true;
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          this.showLoader=false;
          if (response.data.data != []) {
            this.showInsights = false;
            this.showGauge = false;
          }
          try {
            let condemn_list =
              response.data.data[0].condemning_limit_list || [];
                let oil_name_m = response.data.data[0].oil_name || 'Mobil';

                                  // console.log("checking oil name",oil_name_m);

                              this.oil_name = oil_name_m || 'Mobil';
                              if (this.oil_name !="")
                              {
                                this.show_oil = true;
                              }
            let theResultKeys = [];
            response.data.data[0].parameter_group.forEach((data) => {
              // console.log("sudheer reddy hello", data.group);
              if (data.group === "ISO Rating") {
                 console.log("sudheer reddy hello 2", data.group);
                data.parameter_list.forEach((param) => {
                   console.log("sudheer reddy hello 3", param);
                  theResultKeys.push(param.id);
                });
              }
            });
			console.log("checking resultkeys",theResultKeys);
			theResultKeys = theResultKeys.sort();
            let theResults = [];
            theResultKeys.forEach((key) => {
              let theData = response.data.data[0].data[0].data[key];
              theResults.push(theData[theData.length - 1].reading);
            });
            let theString = "";
            theResults.forEach((num, index) => {
              if (index < theResults.length - 1) {
                theString = theString + `≥	${num.toFixed()}/ `;
              } else {
                theString = theString + `≥${num.toFixed()} `;
              }
            });
            this.results = theString;
            let sanitisedData = this.sanitisedDataNew(
              response.data.data[0].data[0].data,
              "",
              response.data.data[0].parameter_group
            );
              let latestTimeStamp = (data)=>{
              let theData = data;
              let allLastTimeStamps = [];
              for(let each in theData){
                // eslint-disable-next-line no-prototype-builtins
                if(theData.hasOwnProperty(each) && typeof theData[each] === "object"){
                  allLastTimeStamps.push(theData[each].pop().unix_time)
                }
              }
              return allLastTimeStamps;
            };
            let latestTimeStampsOfAllPlots = latestTimeStamp(response.data.data[0].data[0].data)
            {
              {
                {
                  let finalData = this.finalizeDataNew(
                    sanitisedData,
                    response.data.data[0].parameter_group,
                    "",
                    condemn_list
                  );
                  this.showInsights = true;
                  this.apqData = finalData[0];
                  let parameterGroup = response.data.data[0].parameter_group;
                  let machineinsights = response.data.data[0].machine_insights;
                  let presetParameterList = [];
                  console.log("chekcing final data 2=>", finalData[1]);
                  for (let i = 0; i < finalData[1].length; i++) {
                    // console.log("checking final data each=>", finalData[1][i]);
                    presetParameterList.push(finalData[1][i].parameter_name);
                  }
                  // console.log(
                  //   "checking total present  list=>",
                  //   presetParameterList
                  // );
                  for (let i = 0; i < machineinsights.length; i++) {
                    for (let j = 0; j < parameterGroup.length; j++) {
                      for (
                        let _m = 0;
                        _m < parameterGroup[j].parameter_list.length;
                        _m++
                      ) {
                        if (
                          parameterGroup[j].parameter_list[_m].name ==
                            machineinsights[i].parameter_name &&
                          machineinsights[i].parameter_name != "low_caution" &&
                          machineinsights[i].parameter_name != "high_caution"
                        ) {
                          for (let c_l = 0; c_l < condemn_list.length; c_l++) {
                            // console.log("checking codemning list=>",condemn_list[c_l]);
                            if (
                              condemn_list[c_l].parameter_name == machineinsights[i].parameter_name
                            ) {
                              machineinsights[i].high_alert =
                                condemn_list[c_l].high_alert;
                              machineinsights[i].low_alert =
                                condemn_list[c_l].low_alert;
                            }
                          }
                        }
                      }
                    }
                  }
                  console.log(
                    "checking insights from api part3",
                    machineinsights
                  );
                  for (let i = 0; i < machineinsights.length; i++) {
                    for (let j = 0; j < parameterGroup.length; j++) {
                      for (
                        let _m = 0;
                        _m < parameterGroup[j].parameter_list.length;
                        _m++
                      ) {
                        if (
                          parameterGroup[j].parameter_list[_m].name ==
                          machineinsights[i].parameter_name
                        ) {
                          for (let f_l = 0; f_l < finalData[1].length; f_l++) {
                            if (
                              parameterGroup[j].parameter_list[_m].name ==
                              finalData[1][f_l].parameter_name
                            ) {
                              machineinsights[i].max =
                                finalData[1][f_l].reading;
                                if(machineinsights[i].status == "OK")
                                {
                                 machineinsights[i].current =  finalData[1][f_l].reading;
                                }
                              // machineinsights[i].current_time =
                              //   finalData[1][f_l].current_time;
                            }
                          }
                        }
                      }
                    }
                  }
                  console.log(
                    "checking insights from api part1",
                    machineinsights
                  );
                  for (let m_i = 0; m_i < machineinsights.length; m_i++) {
                    if (machineinsights[m_i].status == "high_alert") {
                      machineinsights[m_i].status = "High";
                    } else if (machineinsights[m_i].status == "low_alert") {
                      machineinsights[m_i].status = "Low";
                    } else if (machineinsights[m_i].status == "OK") {
                      console.log("checking machine insights in OK=>",machineinsights[m_i]);
                      machineinsights[m_i].status = "Normal";
                    }
                      else  if (machineinsights[m_i].status == "low_caution") {
                      machineinsights[m_i] = {};
                    } else  if (machineinsights[m_i].status == "high_caution") {
                      machineinsights[m_i] = {};
                    }
                  }
                  console.log("checking insights from api", machineinsights);
                  let uniqueChars = [];
                  // $.each(machineinsights, function(i, el) {
                  //   if ($.inArray(el.parameter_name, uniqueNames) === -1) uniqueNames.push(el);
                  // });
                  // console.log("checking unique",uniqueNames);
                  machineinsights.forEach((i) => {
                    if (!uniqueChars.includes(i.id)) {
                      uniqueChars.push(i);
                    }
                  });
                  let timeStamp = this.timeConverter(this.end_date);
                  let total_up_time_details =
                    response.data.data[0].machine_up_time[0] || [];
                  console.log(
                    "checking finally before ordering insights=>",
                    uniqueChars
                  );
                                                      if (
                    total_up_time_details.total_minutes != null &&
                    total_up_time_details.avg_minutes != null
                  ) {
                    this.showGauge = true;

                    let hours = Math.floor(
                      total_up_time_details.total_minutes / 60
                    );
                    let minutes = total_up_time_details.total_minutes % 60;
                    let curr_value = hours + " Hrs :" + minutes + " Mins";
                    // console.log(
                    //   " total up time details ",
                    //   total_up_time_details.total_minutes,
                    //   "checking machine uotime frotval",response.data.data[0].machine_up_time[0] 
                    // );
                    let machineUpTime =
                      response.data.data[0].machine_up_time[0] || [];
                    machineUpTime.timestamp = timeStamp;
                    // console.log("checking up time=>",machineUpTime);
                    let start = this.start_date;                
                    if (this.end_date - this.start_date == 3600)
                    {
                      // console.log("checki diff=>",this.end_date - this.start_date);
                    let d  = new Date() ;
                     start = d.setHours(0,0,0,0)/ 1000;
                    }
                     console.log("checki g start=>",start,this.end_date);
                    let totalTime = (this.end_date - start)/60;
                     hours = Math.floor(
                      totalTime / 60
                    );
                    minutes = totalTime % 60;
                    let maxValue = hours + " Hrs :" + minutes.toFixed() + " Mins";

                    let series = ((machineUpTime.total_minutes/totalTime)*100).toFixed(2);
                    machineUpTime.width = "100%";
                    let maxwidth=   "510px";
                    let maxlength= "280px";
                    this.guageData = {
                      component_name: "Machine Up Time",
                      width: "100%",
                      maxwidth: maxwidth,
                      maxheight:maxlength,
                      minValue: "00 Hrs: 00 Mins",
                      isEnergy: 'false',
                      maxValue: maxValue,
                      originalValue: curr_value,
                      series: [series] ,
                      id: 1,
                      timestamp: this.timeConverter(Math.max(...latestTimeStampsOfAllPlots)),
                    };
                    console.log("checking right=>",this.guageData);
                  }
                  else if(total_up_time_details.total_minutes == null &&
                    total_up_time_details.avg_minutes == null){
                    this.showGauge = true;
                                       let machineUpTime =
                       {};
                    machineUpTime.timestamp = timeStamp;
                      let curr_value = "0 Hrs :"  + "0 Mins";
                    machineUpTime.width = "100%";
                    let maxwidth=   "460px";
                    let maxlength= "270px";
                               this.guageData = {
                      component_name: "Machine Up Time",
                      width: "100%",
                      maxwidth: maxwidth,
                      maxheight:maxlength,
                      originalValue: curr_value,
                      series: [0] ,
                      id: 1,
                      timestamp: this.timeConverter(Math.max(...latestTimeStampsOfAllPlots)),
                    };
                  }
                  let eligibleInsight = [];
                  for (let i = 0; i < uniqueChars.length; i++) {
                    console.log(
                      "checking ewhete is ther",
                      uniqueChars[i].parameter_name,
                      presetParameterList
                    );
                    if (
                      presetParameterList.includes(
                        uniqueChars[i].parameter_name
                      ) == true
                    ) {
                      eligibleInsight.push(uniqueChars[i]);
                    }
                  }
                  console.log("eligible insights are=>", eligibleInsight);
                  console.log(
                    "checking finally before assigningand after ordering insights=>",
                    eligibleInsight
                  );
                  
                  let value = {
                    id: 1,
   insights:eligibleInsight
                  }
                  this.insightsData = [value] || [[]];                }
              }
              // document.querySelector("#loaderStyle").style.display = "none";
            }
          } catch (exception) {
            // document.querySelector("#loaderStyle").style.display = "none";
            // document.querySelector("#warningAlert").style.display = "block";
            this.apqData = [];
            console.log("error", exception);
          }
        })
        .catch((error) => {
                    this.showLoader=false;

            if (error.response && error.response.status === 401) {
                sessionStorage.clear();
                router.push("/login");
            } else {
                alert('internal error')
                console.log("axios error", error.message);
            }
        });
    },
    sanitisedDataNew: (data, paramNames, category) => {
      let chartsGroupList = [];
      for (let i = 0; i < category.length; i++) {
        let singleMachineAPQ = {
          id: category[i].group,
          data: {},
        };
        let eachParameterList = category[i].parameter_list;
        for (let j = 0; j < eachParameterList.length; j++) {
          let eachParamNameDict = eachParameterList[j];
          let eachParamData = data[eachParamNameDict.id];
          if (eachParamData != undefined) {
            singleMachineAPQ.data[eachParamNameDict.name] = eachParamData;
          }
        }
        chartsGroupList.push(singleMachineAPQ);
      }
      return chartsGroupList;
    },
    finalizeDataNew: (
      sanitisedDataGrp,
      param_grps,
      chartname,
      condemn_list
    ) => {
      let currentValue = [];
      let finalResp = [];
            let maxCheck =undefined;
            let minCheck = undefined;
      for (let i = 0; i < sanitisedDataGrp.length; i++) {
        let eachGrpName = sanitisedDataGrp[i].id;
        for (let j = 0; j < param_grps.length; j++) {
          if (param_grps[j].group == eachGrpName) {
            chartname = eachGrpName;
            let category = param_grps[j].parameter_list;
            let sanitisedData = sanitisedDataGrp[i];
            let seriesValues = [];
            let timestamps = [];
            let checkin = "";
            let readingLength = 0; 
            let minList = [];
            let maxList = [];
            for (let i = 0; i < category.length; i++) {
              let newName = category[i].name.replace("-", "_");
              for (let i = 0; i < condemn_list.length; i++) {
                Object.entries(condemn_list[i]).forEach(([key, value]) => {
                  if (key == "") {
                    console.log("key=>", key);
                  }
                  if (value == chartname) {
                    checkin = condemn_list[i];
                    // if ("low_caution" in checkin) {
                    //   delete checkin["low_caution"];
                    // }
                    // if ("high_caution" in checkin) {
                    //   delete checkin["high_caution"];
                    // }
                  }
                });
              }
              {
                let chartData = sanitisedData.data[newName];
                if (chartData != undefined) {
                  timestamps = [];
                  let readings = [];
                  let format_times = [];
                  let max = [];
                  for (let j = 0; j < chartData.length; j++) {
                    if (typeof chartData[j].reading === "number") {
                      // timestamps.push((chartData[j].unix_time + 19800) * 1000);
                      timestamps.push((chartData[j].unix_time) * 1000);
                      format_times.push(chartData[j].time);
                      readings.push(chartData[j].reading.toFixed());
                      max.push(Number(chartData[j].reading));
                    }
                  }
                              // console.log("mincheck list of data=>",minList,maxList);
                  let singlValue = {
                    name: chartNameMapping[newName] || newName,
                    data: readings,
                  };
                  seriesValues.push(singlValue);
                  let currentReading = readings.slice(-1)[0];
                  console.log("checking reading whole=>",readings);
                  console.log("checking reading=>",currentReading);
                  let maxCUrrent = Math.max(...max) || 0;
                  
                  let minCUrrent = Math.min(...max) || 0;
                  minList.push(minCUrrent);
                  maxList.push(maxCUrrent);
                  // console.log("checking minlist and maxlist inside loop=>",minList,maxList);
                  maxCheck = maxCUrrent || 0;
                  minCheck = minCUrrent || 0;
                  console.log("checking current max value=>",maxCheck,"mincheck=>",minCheck);
                  let nameI = singlValue.name;
                  let dict = {};
                  dict["parameter_name"] = nameI;
                  dict["reading"] = Number(currentReading);
                  dict["current_time"] = format_times[format_times.length - 1];
                  // console.log("cehcking time stamps",format_times,"checking single timestamp=>",readings);
                  currentValue.push(dict);
                }
              }
                                                console.log("checking minlist and maxlist out of loop=>",minList,maxList);
                                                minCheck = Math.min(...minList);
                                                maxCheck = Math.max(...maxList);
            }
            let lowAlertValue = [];
            let highAlertValue = [];
            let lowCautionValue = [];
            let highCautionValue = [];
            console.log("checkin checking before asigning",checkin)
            for (let i = 0; i < readingLength; i++) {
              lowAlertValue.push(checkin.low_alert);
              lowCautionValue.push(checkin.low_caution);
              highAlertValue.push(checkin.high_alert);
              highCautionValue.push(checkin.high_caution);
            }
            // for (let i = 0; i < readingLength; i++) {
            //   highAlertValue.push(checkin.high_alert);
            // }
            let lowAlertChart = {
              name: "Alert",
              data: lowAlertValue,
            };
            let lowCautionChart = {
              name: "Caution",
              data: lowCautionValue
            };
            let highAlertChart = {
              name: "Alert",
              data: highAlertValue,
            };
            let highCautionChart = {
              name: "Caution",
              data: highCautionValue
            };
            if(checkin.high_alert!= "null" 
            && checkin.high_alert>maxCheck)
            {
              console.log(maxCheck + " high alert greater than max satisfied" + checkin.high_alert);
              maxCheck = checkin.high_alert;
            }
            else if(checkin.high_alert=="null"
             && checkin.low_alert!="null" &&  checkin.low_alert>maxCheck)
            {
              console.log(maxCheck + " low alert greater than max satisfied" + checkin.low_alert);
              maxCheck = checkin.low_alert;
            }
                        if(checkin.high_caution!= "null" 
            && checkin.high_caution>maxCheck)
            {
              console.log(maxCheck + " high alert greater than max satisfied" + checkin.high_caution);
              maxCheck = checkin.high_caution;
            }
            else if(checkin.high_caution=="null"
             && checkin.low_caution!="null" &&  checkin.low_caution>maxCheck)
            {
              console.log(maxCheck + " low alert greater than max satisfied" + checkin.low_alert);
              maxCheck = checkin.low_caution;
            }
           if(checkin.high_alert!= "null" 
            && checkin.high_alert<minCheck)
            {
              minCheck = checkin.high_alert;
            }
            else if(checkin.high_alert=="null"
             && checkin.low_alert!="null" &&  checkin.low_alert<minCheck)
            {
              minCheck = checkin.low_alert;
            }
                        else if(checkin.high_alert!="null"
             && checkin.low_alert!="null" &&  checkin.low_alert<minCheck)
            {
              minCheck = checkin.low_alert;
            }
            


                       if(checkin.high_caution!= "null" 
            && checkin.high_caution<minCheck)
            {
              minCheck = checkin.high_caution;
            }
            else if(checkin.high_caution=="null"  
             && checkin.low_caution!="null" &&  checkin.low_caution<minCheck)
            {
              minCheck = checkin.low_caution;
            }
                        else if(checkin.high_caution!="null"
             && checkin.low_caution!="null" &&  checkin.low_caution<minCheck)
            {
              minCheck = checkin.low_caution;
            }
            let alertsValues = [];
            let cautionsValues = [];
            console.log(
              "cehcking alerts",
              checkin.low_alert,
              checkin.high_alert
            );
            if (checkin.low_alert != "null") {
              alertsValues.push(lowAlertChart);
            } else if (checkin.high_alert != "null")
              alertsValues.push(highAlertChart);
                        
              if (checkin.low_caution != "null") {
              cautionsValues.push(lowCautionChart);
            } else if (checkin.high_caution != "null")
              cautionsValues.push(highCautionChart);
            seriesValues = cautionsValues.concat(seriesValues);
            seriesValues = alertsValues.concat(seriesValues);
            let getColors = (x) => {
              let colors = [];
              let joiningColors = [];
              let alertColor = [];
              if (x == 2) {
                colors = constants.colors.slice(0, x - 1);
                colors.pop();
                colors.push(constants.rapBlue);
                alertColor.push(constants.exxonRed);
                alertColor.push(constants.darkOrange);
                joiningColors = alertColor.concat(colors);
              } else if (x == 1) {
                // console.log("checking adata",x)
                colors = constants.colors.slice(0, x);
                colors.pop();
                colors.push(constants.rapBlue);
                joiningColors = alertColor.concat(colors);
              } else {
                colors = constants.colors.slice(0, x);
                alertColor.push(constants.exxonRed);
                alertColor.push(constants.darkOrange);
                joiningColors = alertColor.concat(colors);
              }
              return joiningColors;
            };
            let getAnnotationData = (value) => {
              let originalValue = value;
              if (value == "null") {
                value = -Infinity;
              } else {
                value = originalValue;
              }
              return value;
            };
            let getYAxisProperties = (seriesValues) => {
              if (0 < minCheck < 100) {
                minCheck = 0
              }
              let totalSeries = seriesValues.length;
              console.log("checking values for data=>", seriesValues);
                console.log("checking maxcheck before assigning=>",maxCheck);
              let usualProperty = {
                labels: {
                  formatter: function(value) {
                    if (value > 1000 || value < -1000) {
                      // console.log("checking value with k computation",value);
                      return (value / 1000).toFixed(2) + "K";
                    } else if (value === Number.MIN_VALUE) {
                      // console.log("checking value checking as  min value",value);
                      return 0;
                    } else {
                      // console.log(
                      //   "checking value without k computation",
                      //   value,
                      //   typeof value
                      // );
                      var er = /^-?[0-9]+$/;
                      // console.log(er.test(value),typeof(er.test(value)));
                      if (er.test(value)) {
                        return value;
                      } else {
                        value.toFixed(2);
                      }
                      // if (typeof value == Float32Array) return value;
                    }
                  },
                  forceNiceScale: true,
                },
                               forceNiceScale: true,
                min: minCheck,
                max:maxCheck, 
              };
              if (totalSeries > 2) {
                if (0 < minCheck < 100) {
                  minCheck = 0
                }
                let properties = [];
                let usual = {};
                if (totalSeries === 3 || totalSeries > 2) {
                  usual.title = {
                    text: chartNameMapping[chartname] || chartname,
                  };
                                    usual.max =                 maxCheck;
                                    usual.min = minCheck;
                                                      usual.forceNiceScale= true;
                }
                properties.push(usual);
                return properties;
              } else {
                let usual = { ...usualProperty };
                usual.title = {
                  text:
                    seriesValues[0].name === "Alert"
                      ? constants.labelMapping[seriesValues[1].name] ||
                        seriesValues[1].name
                      : constants.labelMapping[seriesValues[0].name],
                };
                console.log(
                  "chekcing total series inside mapping whennot is totalseires(2)=>",
                  usual,
                  "checking without mapping",
                  usual.title
                );
                return usual;
              }
            };
            let chartData = {
              id: sanitisedData.id,
              chartTitle: sanitisedData.id,
              chartOptions: {
                colors: getColors(seriesValues.length),
                dataLabels: { enabled: false },
                chart: {
                    height: "200px",
                    type: "line",
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
                      y: getAnnotationData(checkin["high_caution"]) || -Infinity,
                      borderColor: "#FFA500",
                      borderWidth: 3,
                      label: {
                        borderColor: "#A52A2A",
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
                                        {
                      y: getAnnotationData(checkin["low_caution"]) || -Infinity,
                      borderColor: "#FFA500",
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
                
                legend: {
                  position: "bottom",
                  horizontalAlign: "center",
                  style: {
                    paddingBottom:"10px"
                  }
          //          tooltipHoverFormatter: function (val, opts) {
          //   return (
          //     val +
          //     " - " +
          //     opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          //     ""
          //   );
          // },
                },
                   markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
                xaxis: {
                  title: {
                    text: "Time",
                    align: "right",
                    // offsetY: 10,
                    style: {
                      color: "#484848",
                      // fontFamily: "EMPrint",
                      fontSize: "14px",
                      fontWeight: "bold",
                      // paddingBottom: "20px",
                      // marginBottom: "20px"
                    },
                  },
                  type: "datetime",
                  categories: timestamps,
                  datetimeUTC: true,
                  labels: {
                    
                    datetimeUTC: true,
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
                 grid: {
          borderColor: "#f1f1f1",
        },
                yaxis: getYAxisProperties(seriesValues),
                stroke: {
                  width: [2, 2, 2],
          curve: "straight",
                },
                tooltip: {
                  shared: true,
                  intersect: false,
                  x: {
                    format: "dd MMM - HH : mm: ss",
                  },
                },
              },
              series: seriesValues,
            };
            finalResp.push(chartData);
          }
        }
      }
      return [finalResp, currentValue];
    },
    intervalFetchData: function(machine_id, startDate, endDate) {
      this.machine_id_Selected = machine_id;
      this.start_date = startDate;
      this.end_date = endDate;
      console.log(
        "Autorefresh state inside interfetch data oilqualitymontioring",
        this.checkbox
      );
      this.searchNew(this.machine_id_Selected, this.start_date, this.end_date);
      this.oilInterval = setInterval(() => {
                             this.$root.$on("value_of_checkbox", (text) => {
            console.log(
              "checking text",
              text,
              typeof (text),
              this.checkbox,
              typeof (this.checkbox)
            );
            if (text) {
              ("checking whetehr text is satisfied");
              this.checkbox = true;
            } else {
              this.checkbox = false;
            }
          });

        if (this.checkbox == true) {
          console.log("inside set interval");
          console.log(
            "checking to search inside oil cleanliness monitoring",
            this.checkbox
          );
          let unix = Math.round(+new Date() / 1000);
          // console.log("getting current time stamp=>",unix);
          this.end_date = unix;
          // console.log("chekcinf stat time",this.start_date);
          this.searchNew(
            this.machine_id_Selected,
            this.start_date,
            this.end_date
          );
        } else if (this.checkbox == false) {
          console.log("Autorefresh is disabled.");
        }
      }, 100000);
    },










    onSelectCustomDate(val) {
      this.selectedDate = val;
    },
    onSelectFromToDate() {
      this.selectedDate = this.fromDate + " ~ " + this.toDate;
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 600px)  {
#div2{
  display: none;
}
#ins1{
    display: none;
}
}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
 
#div1{
  display: none;
}
#ins2{
    display: none;
}
}
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
.insights_normal {
  color: #228517a4;
  font-size: 14px;
  font-weight: bold;
}
.insights_param {
  color: #484848;
  font-size: 16px;
  font-weight: bold;
}
.chartClass {
  border-style: solid;
  border-radius: 10px;
  border-color: #a7a7a7;
  border-width: thin;
  width: 460px;
  background-color: #fafafa;
  height: 270px;
  margin-right: 4px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
