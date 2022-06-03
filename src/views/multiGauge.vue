<template>
  <v-container fluid>

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
<v-row>
   <v-col v-if="present">
      <h1  style="margin-top:10px; " color="primary">
          No Data Available
        </h1>
      </v-col>
</v-row>
    <v-row class="mb-3 mt-5">
      <div v-bind:key="gag.id" v-for="gag in epaData" class="gauge">
        <guage v-bind:gag="gag" />
      </div>
    </v-row>


    <!-- <v-row class="mb-3 mt-5">
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">I-R</div>
          <div id="chart">
            <apexchart
              type="radialBar"
              height="200"
              :options="ir.chartOptions"
              :series="ir.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">I-B</div>
          <div id="chart">
            <apexchart
              type="radialBar"
              height="200"
              :options="ir.chartOptions"
              :series="ir.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">I-Y</div>
          <div id="iychart">
            <apexchart
              type="radialBar"
              height="200"
              :options="iy.chartOptions"
              :series="iy.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">V-R</div>
          <div id="vrchart">
            <apexchart
              type="radialBar"
              height="200"
              :options="vr.chartOptions"
              :series="vr.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">V-B</div>
          <div id="vbchart">
            <apexchart
              type="radialBar"
              height="200"
              :options="vb.chartOptions"
              :series="vb.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="2">
        <v-card class="oee-card oee-card-white">
          <div class="transition-swing text-center text-h6">V-Y</div>
          <div id="vychart">
            <apexchart
              type="radialBar"
              height="200"
              :options="vy.chartOptions"
              :series="vy.series"
            ></apexchart>
            <div
              class="
                transition-swing
                text-subtitle-2 text-center text-gray
                mtN-2
                mb-2
              "
            >
              26 June 2021 | 2:09:25 PM
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" sm="12" md="6" >
        <v-card class="oee-card oee-card-white card-shadow  "  style="overflow-y: auto; " v-if="this.showInsights" height="280px" >
          <v-card-text >
            <v-row align="center" class="mb-2">
              <v-icon>icon-insights</v-icon>
              <v-card-title class="pt-0 pb-0"> Machine Insights</v-card-title>
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

      <v-col cols="12" sm="12" md="6">
        <v-card class="oee-card oee-card-white card-shadow" v-if="this.showInsights" height="280px">
          <v-card-text class="">
            <v-row align="center" class="mb-2">
              <v-icon>icon-bolt</v-icon>
              <v-card-title class="pt-0 pb-0"
                >{{apqData.chartTitle}}</v-card-title
              >
            </v-row>
            <apexchart
              height="200"
              :options="apqData.chartOptions"
              :series="apqData.series"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="oee-card oee-card-white card-shadow" v-if="this.showInsights" height="280px">
          <v-card-text class="">
            <v-row align="center" class="mb-2">
              <v-icon>icon-energy-parameters-analysis</v-icon>
              <v-card-title class="pt-0 pb-0"
                >{{apqData_i.chartTitle}}</v-card-title
              >
            </v-row>
            <apexchart
              height="200"
              :options="apqData_i.chartOptions"
              :series="apqData_i.series"
            ></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


              <!-- <v-row>

        <div v-bind:key="epa.id" v-for="epa in apqData">
          <v-col cols="12">
            <v-container class="Chart1">
              <apexchart
                v-bind:epa="epa"
                type="line"
                height="300"
                :options="epa.chartOptions"
                :series="epa.series"
              ></apexchart>
            </v-container>
          </v-col>
        </div>

        <div v-bind:key="epa.id" v-for="epa in apqData_i">
          <v-col cols="12">
            <v-container class="Chart2">
              <apexchart
                v-bind:epa="epa"
                type="line"
                height="300"
                :options="epa.chartOptions"
                :series="epa.series"
              ></apexchart>
            </v-container>
          </v-col>
        </div>
      </v-row> -->
  </v-container>
</template>

<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import guage from "../components/guage";
import axios from "axios";
import filterHeaderComp from "../components/filterHeaderComp.vue";
import constants from "../constants";
// import VueApexCharts from "vue-apexcharts";
import router from "../router";

export default {
  prop: ["epaData", "apqData"],
  components: {
    guage,
    filterHeaderComp,
    Breadcrumb,
    LoaderProgress
  },
  data: () => ({
      crumbs: ['Home', 'Plant Monitoring Dashboard', 'Energy Monitoring Dashboard',
      'Energy Monitoring Trends', 'Energy Parameter Analysis'],
present: false,
showLoader: false,
      macId: 0,
      epaData: [],
      apqData: [],
      insightsData: [],
      apqData_i: [],
      machine_id_Selected: "",
      start_date: "",
      end_date: "",
      checkbox: false,
      oilInterval: "",
      showInsights: false,






    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,




 




  }),
  mounted() {
    this.machine_id_Selected = this.$route.params.macId;
 //   console.log("mac id passed ", this.machine_id_Selected);
         
  },
    beforeDestroy() {
    console.log("beforeDestroy enerrgy parameter analysis page");
    clearInterval(this.oilInterval);
    this.checkbox = false;
  },
    methods: {
                               selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/multiGauge')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }       }
           else if (crumb === 'Plant Monitoring Dashboard')
      {
        router.push('/plantMonitoringDashboard')
      }
        else if (crumb === 'Energy Monitoring Dashboard')
      {
        router.push('/EnergyMonitoring')
      }
              else if (crumb === 'Energy Monitoring Trends')
      {
        router.push('/machine')
      }
      
      
      console.log(crumb);
    },
    moveToEnergyMonitoring() {
      // console.log("checking trends machine=>",this.$route.params.macId);
      this.$router.push({
        name: "EnergyMonitoringTrends",
        params: { macId: this.machine_id_Selected },
      });
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
    searchNew: function(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
        console.log("start and end date while calling searchNew", this.start_date, this.end_date);
      // document.querySelector("#warningAlert").style.display = "none";
      this.machine_id_Selected = machine_id;
      
      let params = "";
      this.showLoader = true;
      // document.querySelector("#loaderStyle").style.display = "block";
      if (this.start_date == "") {
        params = `?machine=${machine_id}`;
      } else {
        params = `?machine=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`;
      }
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getEnergyParameterAnalysis${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        };
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          if (response.data.data != []) {
            this.showInsights = false;
          }
          try {
            let data = response.data.data[0];
                        let condemn_list =
              response.data.data[0].condemning_limit_list || [];
           // console.log("coming response", data.data);
            let minMaxValues = data.boundary_values;
            data = response.data.data[0].data;
            // Assigning readings to gauges
            let structuredGauge = data.map((param, identity) => {
              let id = identity;
              let component_name = param.parameter_name;
              //console.log("param value", param.value);
              const milliseconds = param.unix_ts * 1000;
              const dateObject = new Date(milliseconds);
              const humanDateFormat = dateObject.toLocaleString();
              var timestamp = humanDateFormat;
              //console.log(timestamp);
              var originalValue = param.value;
              var maxValue = minMaxValues[component_name].max;
              var minValue = 0;
              let compareValue = (originalValue * 100) / maxValue;
              // console.log("checking min and max", minValue, maxValue);
              // console.log("checking original value",originalValue);
              var series = [compareValue];
              let width = "100%";
              let maxwidth = "155px";
              let maxheight = "200px";
              let singleCardComponent = {
                id,
                originalValue,
                component_name,
                maxheight,
                maxwidth,
                series,
                width,
                timestamp,
                minValue,
                maxValue,
              };
              return singleCardComponent;
            });
            this.epaData = structuredGauge;
            // Dividing into groups
            let group1 = response.data.data[0].parameter_group[0].group;
            let group2 = response.data.data[0].parameter_group[1].group;
            let param_1 =
              response.data.data[0].parameter_group[0].parameter_list;
            let param_2 =
              response.data.data[0].parameter_group[1].parameter_list;
            // console.log(group1,group2,param_2, param_1);
            // console.log("param group",parameter_group);
            let paramNames = Object.keys(
              response.data.data[0].boundary_values
            ).map(function(k) {
              return k;
            });
            data = response.data.data[0].analysis;
            let sanitisedData = this.sanitisedDataNew(
              data,
              paramNames,
              response.data.data[0].parameter_group
            );
            let names = [group1, group2];
            let finalData = this.finalizeDataNew(
              sanitisedData[0],
              paramNames,
              param_1,
              names[0], condemn_list
            );
            let finalData_i = this.finalizeDataNew(
              sanitisedData[1],
              paramNames,
              param_2,
              names[1], condemn_list
            );
            this.showInsights = true;
            this.apqData_i = finalData_i[0];
            this.apqData = finalData[0];
                              let parameterGroup = response.data.data[0].parameter_group;
                                          let machineinsights = response.data.data[0].machine_insights;

                  let presetParameterList = [];
                  // console.log("chekcing final data 2=>", finalData[1]);
                  for (let i = 0; i < finalData[1].length; i++) {
                    // console.log("checking final data each=>", finalData[1][i]);
                    presetParameterList.push(finalData[1][i].parameter_name);
                  }
                  // console.log(
                  //   "checking total present  list=>",
                  //   parameterGroup
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
                 // console.log("checking insights from api", machineinsights);
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
                                    let eligibleInsight = [];
                  for (let i = 0; i < uniqueChars.length; i++) {
              
                    if (
                      presetParameterList.includes(
                        uniqueChars[i].parameter_name
                      ) == true
                    ) {
                      eligibleInsight.push(uniqueChars[i]);
                    }
                  }
                 console.log("eligible insights are=>", eligibleInsight);
               this.present = false;

                  // eligibleInsight = eligibleInsight.concat(eligibleInsight);
                  this.insightsData = eligibleInsight || [];
this.showLoader = false;
            console.log("checking amchien insights after assigning from response",machineinsights);
            // document.querySelector("#loaderStyle").style.display = "none";
          } catch (exception) {
            // document.querySelector("#loaderStyle").style.display = "none";
            // document.querySelector("#warningAlert").style.display = "block";
            this.apqData = [];
            this.epaData = [];
            this.present = true;
            this.showLoader = false;
            console.log("error", exception);
          }
        })
        .catch((error) => {
          this.showLoader = false;
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
      // console.log("data inside sanitised",data);
      // console.log("category inside sanitised", category);
      // let id = "CAT 3306";
      let segData = {};
      let newNames = [];
      for (let i = 0; i < paramNames.length; ++i) {
        let name = paramNames[i].replace("-", "_");
        segData[name] = { timestamps: [], values: [], param: [] };
        newNames.push(name);
      }
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        for (let j = 0; j < paramNames.length; j++) {
          if (obj.parameter_name == paramNames[j]) {
            segData[newNames[j]].timestamps.push((obj.unix_ts + 19800) * 1000);
            segData[newNames[j]].values.push(obj.value);
            segData[newNames[j]].param.push(obj.parameter_name);
          }
        }
      }
      // console.log(
      //   "this is segdata after assigning",
      //   segData,
      //   category[0].parameter_list[0]
      // );
      //console.log("this is segdata after assigning",category);
      let singleMachineAPQ = {
        id: 'voltage',
        data: {},
      };
      let singleMachineAPQ_i = {
        id: 'current',
        data: {},
      };
      for (i = 0; i < category[0].parameter_list.length; i++) {
       // console.log(category[0].parameter_list[i].name);
        for (let j = 0; j < newNames.length; j++) {
          if (
            category[0].parameter_list[i].name == segData[newNames[j]].param[0]
          ) {
            singleMachineAPQ.data[newNames[j]] = segData[newNames[j]];
          }
        }
      }
      for (i = 0; i < category[1].parameter_list.length; i++) {
        for (let j = 0; j < newNames.length; j++) {
          if (
            category[1].parameter_list[i].name == segData[newNames[j]].param[0]
          ) {
            singleMachineAPQ_i.data[newNames[j]] = segData[newNames[j]];
          }
        }
      }
      // console.log("single machine apq of i",singleMachineAPQ_i);
      // console.log("single machine apq of not i",singleMachineAPQ);
      return [singleMachineAPQ, singleMachineAPQ_i];
    },
    finalizeDataNew: (sanitisedAPQ, paramNames, category, chartname,condemn_list) => {
      //console.log("inside final data=>", sanitisedAPQ);
      let sanitisedData = sanitisedAPQ;
      let seriesValues = [];
      let timestamp = "";
      let unit = "";
      let minList = [];
      let maxList = [];

      let maX = [];
      let readingLength = 0; 

      let checkin = "";
      let currentValue = [];

      chartname = chartname[0].toUpperCase() + chartname.slice(1).toLowerCase();
      if (chartname == "Current") {
        unit = "(A)";
        
      } else if (chartname == "Voltage") {
        unit = "(V)";
      }
      // console.log("categoies in final data",category);
                        let format_times = [];

      for (let i = 0; i < category.length; i++) {
        let newName = category[i].name.replace("-", "_");
      for (let i = 0; i < condemn_list.length; i++) {
        Object.entries(condemn_list[i]).forEach(([key, value]) => {
                  if (key == "") {
                    console.log("key=>", key);
                  }
                  console.log("checking value and chartname=>",value,chartname);
                  if (value == chartname.toLowerCase()) {
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
        //  console.log("checking condemning limit=>",checkin,sanitisedAPQ.data);
        if (category[i].name == sanitisedAPQ.data[newName].param[0]) {
          timestamp = sanitisedAPQ.data[newName].timestamps;



        //  console.log("sucess", category[i]);
          break;
        }
      }
            let maxCheck =undefined;
            let minCheck = undefined;

      for (let k = 0; k < category.length; k++) {
        let name = category[k].name;
        let newName = category[k].name.replace("-", "_");
        // console.log("name to show", newName, name);
        let data = sanitisedAPQ.data[newName].values;
        //console.log("checking data",data);
                              maX.push(Number(sanitisedAPQ.data[newName].values));

        let currentReading = data[0];
       // console.log("checking current reading=>",currentReading);
        let singlValue = { name, data };
        seriesValues.push(singlValue);
        let nameI = singlValue.name;
        //console.log("checking maxlist=>",maX);
        let maxCUrrent = Math.max(...data) || 0;          
        let minCUrrent = Math.min(...data) || 0;
              //console.log("checking mincurrent and maxcurrent",minCUrrent,maxCUrrent);
                  minList.push(minCUrrent);
                  maxList.push(maxCUrrent);
                  maxCheck = maxCUrrent || 0;
                  minCheck = minCUrrent || 0;

                  let dict = {};
                  dict["parameter_name"] = nameI;
                  dict["reading"] = Number(currentReading);
                  dict["current_time"] = format_times[format_times.length - 1];
                  currentValue.push(dict);


      }
                                                      console.log("checking minlist and maxlist out of loop=>",minList,maxList);
                                                minCheck = Math.min(...minList);
                                                maxCheck = Math.max(...maxList);
      let finalResp = [];
            let lowAlertValue = [];
            let highAlertValue = [];

            for (let i = 0; i < readingLength; i++) {
              lowAlertValue.push(checkin.low_alert);
              highAlertValue.push(checkin.high_alert);
            }
            // for (let i = 0; i < readingLength; i++) {
            //   highAlertValue.push(checkin.high_alert);
            // }
            //console.log("checking low_alert and high_alert=>",checkin,checkin.low_alert,checkin.high_alert);
            
            let lowAlertChart = {
              name: "Alert",
              data: lowAlertValue,
            };
            let highAlertChart = {
              name: "Alert",
              data: highAlertValue,
            };
                       // console.log("checking min and max before assigning to checkjing=>",minCheck,maxCheck);

            if(checkin.high_alert!= "null" 
            && checkin.high_alert>maxCheck)
            {
              //console.log(maxCheck + " high alert greater than max satisfied" + checkin.high_alert);
              maxCheck = checkin.high_alert;
            }
            else if(checkin.high_alert=="null"
             && checkin.low_alert!="null" &&  checkin.low_alert>maxCheck)
            {
              //console.log(maxCheck + " low alert greater than max satisfied" + checkin.low_alert);
              maxCheck = checkin.low_alert;
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
            //console.log("checking min and max",minCheck,maxCheck)
            let alertsValues = [];
            
            if (checkin.low_alert != "null") {
              alertsValues.push(lowAlertChart);
            } else if (checkin.high_alert != "null")
              alertsValues.push(highAlertChart);
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
                joiningColors = alertColor.concat(colors);
              } else if (x == 1) {
                colors = constants.colors.slice(0, x);
                colors.pop();
                colors.push(constants.rapBlue);
                joiningColors = alertColor.concat(colors);
              } else {
                colors = constants.colors.slice(0, x);
                alertColor.push(constants.exxonRed);
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
              let totalSeries = seriesValues.length;
              //console.log("checking values for data=>", seriesValues);
               // console.log("checking maxcheck before assigning=>",maxCheck);
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
                //console.log("checking minimum and maximum=>",minCheck,maxCheck);
                let properties = [];
                let usual = {};
                if (totalSeries === 3 || totalSeries > 2) {
                  usual.title = {
                    text: chartname + unit,
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
                
                return usual;
              }
            };

      let chartData = {
        id: sanitisedData.id,
        chartTitle: "Energy Parameters Analysis" + "("+ chartname + ")",
        chartOptions: {
                          colors: getColors(seriesValues.length),

          chart: {
            type: "line",
            height: "200",
            stack: false,
            markers: {
              size: 5,
              colors: ["#000524"],
              strokeColor: "#00BAEC",
              strokeWidth: 3,
            },
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
              export:{
                csv: {
filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'Voltage',
            headerValue: 'timestamp',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }                }
              }
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
          // title: {
          //   text: "Energy Parameters Analysis  (" + chartname + ")",
          //   align: "left",
          //   style: {
          //     color: "#484848",
          //     fontFamily: "EMPrint",
          //     fontSize: "18px",
          //     fontWeight: "bold",
          //   },
          // },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
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
              },
            },
            type: "datetime",
            categories: timestamp,
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
          yaxis:getYAxisProperties(seriesValues),
          stroke: {
            curve: "smooth",
            width: 1,
          },
          tooltip: {
            shared: false,
            x: {
              format: "dd MMM - HH : mm: ss",
            },
          },
        },
        series: seriesValues,
      };
      finalResp.push(chartData);
      return [chartData,currentValue];
    },
    intervalFetchData: function(machine_id, startDate, endDate) {
      //console.log("inside interval fetchdata", startDate, endDate);
      this.machine_id_Selected = machine_id;
      this.start_date = startDate;
      this.end_date = endDate;
      //console.log("machine id", machine_id);
      
      
      this.searchNew(this.machine_id_Selected, startDate, endDate);
      this.oilInterval = setInterval(() => {
        //console.log("inside set interval");
        //console.log("present machine id", this.machine_id_Selected);
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
          let unix = Math.round(+new Date() / 1000);
          // console.log("getting current time stamp=>",unix);
          this.end_date = unix;
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
  },
};
</script>
<style scoped>
@media screen and (min-width: 600px)  {
#div2{
  display: none;
}

}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
 
#div1{
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
</style>

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