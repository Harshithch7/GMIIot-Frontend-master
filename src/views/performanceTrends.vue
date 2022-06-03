<template>
  <v-container >

        <v-dialog v-model="dialog" max-width="220">
        <v-card>
          <v-card-actions class="cardButtonsDiv">
            <v-btn small color="primary" class="button" @click="navigateTo('/boxplot')">
              Cycle Time Analysis
            </v-btn>
            <v-btn small color="primary" class="button" @click="navigateTo('/multiGauge')">
              Energy Parameter Analysis
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    <v-row>
            
<div v-bind:key="apq.id" v-for="apq in apqData">
<v-col cols="12" sm="6" md="12" >
  <div @click="openDialog(apq.chartTitle)">
        <v-card class="oee-card oee-card-white">
          <v-card-text class="">
            <v-row align="center" class="mb-2">
              <v-icon>{{Changeiconaspertitle(apq.chartTitle)}}</v-icon>
              <v-card-title class="pt-0 pb-0">{{apq.chartTitle}}</v-card-title>
            </v-row>
            <apexchart
              type="area"
              height="200"
            width="450"
              :options="apq.chartOptions"
              :series="apq.series"
            >
            </apexchart>
          </v-card-text>
        </v-card>
        </div>
</v-col>
</div>
    </v-row>
<v-row>
      <div v-bind:key="epa.id" v-for="epa in epaData">
        <v-col cols="12" sm="12" md="12">
          <v-card class="oee-card oee-card-white">
            <v-card-text class="">
              <v-row align="center" class="mb-2">
                <v-icon>icon-clock</v-icon>
                <v-card-title class="pt-0 pb-0"
                  >{{epa.chartTitle}}</v-card-title
                >
              </v-row>
              <apexchart
                v-bind:epa="epa"
                width="1000"
                type="bar"
                height="200"
                :options="epa.chartOptions"
                :series="epa.series"
              >
              </apexchart>
            </v-card-text>
          </v-card>
        </v-col>
      </div>
    </v-row>
    <v-row>
        <v-col cols="6">
          <customizablegauge :gauge_data="parameter"/>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";
import customizablegauge from '../components/customizablegauge.vue';
import filterHeaderComp from "../components/filterHeaderComp.vue";
import VueApexCharts from "vue-apexcharts";
import constants from "../constants";
import axios from "axios";
import router from "../router";
export default {
  components: {
    filterHeaderComp,
    customizablegauge,
    apexchart: VueApexCharts,
    Breadcrumb,
    LoaderProgress
  },

  data: () => ({
    parameter : {
        cardWidth:'510px',
        cardHeight:'280px',
        componentName:'Production Loss',
        data:0,
        max:100,
        min:0,
        splitNumber:10 ,
        formatter:"%" ,
        smallTicks:5,
        range:[
    [0,20,"black"],
    [21,40,"green"],
    [41,60,"yellow"],
    [61,80,"orange"],
    [81,100,"red"]
    ]
      },
        showLoader: false,

        crumbs: ['Home', 'Plant Monitoring Dashboard', 'OEE Monitoring Dashboard',
                             'APQ Analysis By Machine','Performance Trends'],

    // new data
    dialog: false,
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
        disabled: true,
      },
    ],
    epaData: [],
    apqData: [],
    gauge_data: [],
    machine_id_Selected: "",
    start_date: "",
    end_date: "",
    checkbox: false,
    index: 0,

    // old data
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
    machinelist: ["DPIMM01", "DPIMM02", "DPIMM03", "DPIMM04", "DPIMM05"],
    dates: [],
    items1: ["Today", "Last Day", "Last 7 Days", "Last 15 Days", "Last Month"],

    boxPlotCycle: {
      series: [
        {
          name: "Network",
          data: [
            {
              x: "Dec 23 2017",
              y: 55,
            },
            {
              x: "Dec 24 2017",
              y: 44,
            },
            {
              x: "Dec 25 2017",
              y: 31,
            },
            {
              x: "Dec 26 2017",
              y: 38,
            },
            {
              x: "Dec 27 2017",
              y: 55,
            },
            {
              x: "Dec 28 2017",
              y: 32,
            },
            {
              x: "Dec 29 2017",
              y: 55,
            },
            {
              x: "Dec 30 2017",
              y: 51,
            },
            {
              x: "Dec 31 2017",
              y: 67,
            },
            {
              x: "Jan 01 2018",
              y: 22,
            },
            {
              x: "Jan 02 2018",
              y: 34,
            },
            {
              x: "Jan 03 2018",
              y: 45,
            },
            {
              x: "Jan 04 2018",
              y: 40,
            },
            {
              x: "Jan 05 2018",
              y: 11,
            },
            {
              x: "Jan 06 2018",
              y: 4,
            },
            {
              x: "Jan 07 2018",
              y: 15,
            },
            {
              x: "Jan 08 2018",
              y: 8,
            },
            {
              x: "Jan 09 2018",
              y: 9,
            },
            {
              x: "Jan 10 2018",
              y: 34,
            },
            {
              x: "Jan 11 2018",
              y: 7,
            },
            {
              x: "Jan 12 2018",
              y: 10,
            },
            {
              x: "Jan 13 2018",
              y: 13,
            },
            {
              x: "Jan 14 2018",
              y: 15,
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          height: 200,
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",

          width: [2],
        },

        colors: ["#0C479D"],
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },

        tooltip: {
          intersect: true,
          shared: false,
        },
        theme: {
          palette: "palette1",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Bytes Received",
          },
        },
      },
    },
    anyCycle: {
      series: [
        {
          name: "Cycle Time Analysis",
          data: [
            10,
            20,
            28,
            56,
            61,
            58,
            63,
            60,
            66,
            44,
            55,
            57,
            56,
            61,
            58,
            63,
            60,
            66,
            57,
            56,
            61,
            58,
            63,
            60,
            2,
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 200,
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "0-2",
            "2-2",
            "2-4",
            "4-8",
            "6-10",
            "8-12",
            "10-14",
            "12-16",
            "14-18",
            "16-20",
            "18-22",
            "20-24",
            "22-26",
            "24-28",
            "26-30",
            "28-32",
            "30-34",
            "32-36",
            "34-38",
            "36-40",
            "38-42",
            "40-44",
            "42-46",
            "44-48",
            "46-50",
          ],
        },
        yaxis: {
          title: {
            text: "Count",
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

  beforeDestroy() {
    console.log("beforeDestroy oil page");
    clearInterval(this.oilInterval);
    this.checkbox = false;
  },
  mounted() {
    let machine_id = this.$route.params.macId;
    let startDate = parseInt(sessionStorage.getItem("startDate"));
    let endDate = parseInt(sessionStorage.getItem("endDate"));
    // sent_id
    console.log(
      "apq charts inside interval fetchdata with data",
      machine_id,
      startDate,
      endDate
    );
    //this.functioncall();
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
        if (`/${sessionStorage.getItem("route_first_option")}` == '/performance-trends')
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
      
      
      console.log(crumb);
    },
        Changeiconaspertitle(value){
      console.log('checking value',value);
      if (value == 'Production Quantity')
      return 'icon-cog'
            else if (value == 'Cycle Time')
      return 'icon-clock'

    },
    clickChart: function(event, chartContext, config) {
      this.index = config.seriesIndex;
    },
    openDialog(parameter) {
      console.log("checking parameter",parameter);
      if (parameter === "Cycle Time" && this.index === 0) {
        this.dialog = true;
      } else if (parameter === "Production Quantity" && this.index === 0) {
         this.$router.push({
          name: "apqMachine",
          params: { macId: this.machine_id_Selected },
        });
        // router.push(`/apqMachine/${this.machine_id_Selected}`);
      }
    },
        navigateTo(address) {
      if (address === "/boxplot") {
        this.$router.push({
          name: "boxplot",
          params: { macId: this.machine_id_Selected },
        });
      }else if(address==='/multiGauge'){
 this.$router.push({
          name: "multiGauge",
          params: { macId: this.machine_id_Selected },
        });      }
    },
    intervalFetchData(machine_id, startDate, endDate) {
      if (isNaN(machine_id)) {
        machine_id = this.$route.params.macId;
      }
      this.machine_id_Selected = machine_id;
      this.start_date = startDate;
      this.end_date = endDate;
      console.log("checking to search", this.checkbox);
      console.log(
        "inside interval fetch  of performance Trends",
        this.checkbox
      );
      this.searchNew(this.machine_id_Selected, this.start_date, this.end_date);
      this.functioncall(this.machine_id_Selected, this.start_date, this.end_date);
      this.oilInterval = setInterval(() => {
        console.log("inside set interval of apqcharts", this.checkbox);
        let unix = Math.round(+new Date() / 1000);
        this.end_date = unix;
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
    searchNew: function(machine_id, startDate, endDate) {
      console.log("hello from searchnew 1");
      this.start_date = startDate;
      this.end_date = endDate;
      // document.querySelector("#warningAlert").style.display = "none";
      this.machine_id_Selected = machine_id;
      let params = "";
            this.showLoader= true;

      // document.querySelector("#loaderStyle").style.display = "block";
      if (this.start_date == "") {
        params = `?machine=` + machine_id;
      } else {
        params =
          `?machine=` +
          machine_id +
          `&startdate=` +
          this.start_date +
          `&enddate=` +
          this.end_date;
      }
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachinePandCTdata${params}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };

      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          try {
            console.log("hello from searchnew 2");
            var data = response.data.data[0][0];
            var paramNames = Object.keys(response.data.data[0][0]).map(function(
              k
            ) {
              return k;
            });
            console.log("params", paramNames);
            let sanitisedData = this.sanitisedDataNew(data, paramNames);
            let finalData = this.finalizeDataNew(
              { data: sanitisedData },
              paramNames
            );

            console.log("hello from searchnew 2");
            let data1 = response.data.data[1][0];

            let sanitisedData1 = this.sanitisedDataNew1(data1, "");
            console.log(
              "sanitisedDataNew after adding cycle hist",
              sanitisedData1
            );
            let finalData1 = this.finalizeDataNew1(
              { data: sanitisedData1 },
              ""
            );
            this.apqData = finalData;

            this.epaData = finalData1;
            console.log(
              "checking when before hist from final data",
              finalData[0].series[0].data
            );

            // document.querySelector("#loaderStyle").style.display = "none";
          
          this.showLoader= false;
          
          
          
          } catch (exception) {
            // document.querySelector("#loaderStyle").style.display = "none";
            // document.querySelector("#warningAlert").style.display = "block";
            this.apqData = [];
            this.epaData = [];
                      this.showLoader= false;

          }
        })
        .catch((error) => {
                    this.showLoader= false;

          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            alert("internal error");
            console.log("axios error", error.message);
          }
        });
    },
    functioncall: function(machine_id,startDate,endDate) {

      var params="";
      if (this.start_date == "") {
        params =
          `?machine=`+machine_id;
      } else {
        params =
          `?startdate=${startDate}&enddate=${endDate}&machine=${machine_id}`
      }
      let myconfig = {
        method: 'get',
        url: `${constants.backend_url}/Productionloss${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        };
        
    axios(myconfig)
        .then((response) => {this.parameter.data=response.data.data["Production loss (%):"]
          console.log("Production loss Data:",response);
          console.log("Production loss (%):",response.data.data["Production loss (%):"]);
          console.log("Prod component:",this.parameter.data);
          //console.log("TEST");
    }); 
    
  },

    sanitisedDataNew: (data, paramNames) => {
      let singleMachineAPQ = {
        c_data: { time: [], value: [] },
        p_data: { time: [], value: [] },
      };
      let singleMachineAPQ1 = {
        cycle_time_data: { time: [], value: [] },
      };
      if (paramNames === "") {
        data["cycle_time_data"].forEach((dataObject) => {
          let time = dataObject.perform_date;

          let value = dataObject.cycle_time;
          singleMachineAPQ1["cycle_time_data"].value.push(value);
          singleMachineAPQ1["cycle_time_data"].time.push(time);
        });
      } else {
        paramNames.forEach((param) => {
          data[param].forEach((dataObject) => {
            let time =
              param === "c_data"
                ? dataObject.cycle_time_date
                : dataObject.perform_date;
            let value =
              param === "c_data" ? dataObject.cycle_time : dataObject.value;
            singleMachineAPQ[param].time.push(time);
            singleMachineAPQ[param].value.push(value);
          });
        });
      }

      if (paramNames === "") {
        return singleMachineAPQ1;
      } else {
        return singleMachineAPQ;
      }
    },
    sanitisedDataNew1: (data, paramNames) => {
      console.log("inside sanitisedDataNew", data, paramNames);
      let singleMachineAPQ = {
        c_data: { time: [], value: [] },
        p_data: { time: [], value: [] },
      };
      let singleMachineAPQ1 = {
        cycle_time_data: { time: [], value: [] },
      };

      if (paramNames === "") {
        data["cycle_time_data"].forEach((dataObject) => {
          console.log("checking data ob", dataObject);
          let time = dataObject.cycle_range;
          let value = dataObject.cycle_count;

          singleMachineAPQ1["cycle_time_data"].value.push(value);
          singleMachineAPQ1["cycle_time_data"].time.push(time);
        });
        console.log("single machine apq", singleMachineAPQ1);
      } else {
        paramNames.forEach((param) => {
          data[param].forEach((dataObject) => {
            let time =
              param === "c_data"
                ? dataObject.cycle_time_date
                : dataObject.perform_date;
            let value =
              param === "c_data" ? dataObject.cycle_time : dataObject.value;
            singleMachineAPQ[param].time.push(time);
            singleMachineAPQ[param].value.push(value);
          });
        });
      }
      if (paramNames === "") {
        return singleMachineAPQ1;
      } else {
        return singleMachineAPQ;
      }
    },
    finalizeDataNew: (sanitisedAPQ, paramNames) => {
      let charts = paramNames;
      if (paramNames === "") {
        charts = ["cycle_time_data"];
      }

      let finalResp = [];
      charts.forEach((chartTitle) => {
        let _title = chartTitle;
        chartTitle = chartTitle.replace(" ", "_");
        let unit = "";
        console.log("checking title", _title);
        if (_title == "c_data") {
          unit = "Seconds";
        } else if (_title == "p_data") {
          unit = "Each";
        } else if (_title == "cycle_time_data") {
          unit = "Seconds";
        }
        let chartData = {
          chartTitle: constants.chartNameMapping[_title],
          chartOptions: {
            chart: {
              animations: {
            enabled: false,
          },
              id: "line",
              height: 200,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
            },
            
            dataLabels: { enabled: false },
            // title: {
            //   text: constants.chartNameMapping[_title] || _title,
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
                // style: {
                //   color: "#484848",
                //   fontFamily: "EMPrint",
                //   fontSize: "16px",
                //   fontWeight: "bold",
                // },
              },
              type: "datetime",
              categories: sanitisedAPQ.data[chartTitle]
                ? sanitisedAPQ.data[chartTitle].time
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
                text:
                  constants.chartNameMapping[_title] + "( " + unit + ")" ||
                  _title + "( " + unit + ")" ||
                  "Cycle Time Data",
              },
            },
                    colors: ["#0C479D"],
        markers: {
          size: 5,
          hover: {
            size: 9,
          },
        },
            stroke: {
          curve: "straight",

          width: [2],
            },
            tooltip: {
                        intersect: true,
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
                ? sanitisedAPQ.data[chartTitle].value
                : [],
            },
          ],
        };
        finalResp.push(chartData);
      });
      return finalResp;
    },
    finalizeDataNew1: (sanitisedAPQ, paramNames) => {
      let charts = paramNames;
      if (paramNames === "") {
        charts = ["cycle_time_data"];
      }

      let finalResp = [];
      charts.forEach((chartTitle) => {
        let _title = chartTitle;
        chartTitle = chartTitle.replace(" ", "_");
        console.log("changed title", chartTitle);
        console.log("hello man", sanitisedAPQ.data[chartTitle].values);

        // let unit = "";
        console.log("checking title", _title);
        let chartData = {
          chartTitle:  constants.chartNameMapping[_title],
          chartOptions: {
            chart: {
              id: "line",
              height: 200,
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
            },
            dataLabels: { enabled: false },

            legend: {
              position: "top",
              horizontalAlign: "left",
            },
            xaxis: {
              title: {
                text: "Cycle Time (seconds)",
                align: "right",
                // offsetY: 10,
                // style: {
                //   color: "#484848",
                //   fontFamily: "EMPrint",
                //   fontSize: "16px",
                //   fontWeight: "bold",
                // },
              },
              type: "text",
              categories: sanitisedAPQ.data[chartTitle]
                ? sanitisedAPQ.data[chartTitle].time
                : [],

              labels: {
                datetimeUTC: false,
              },
              // axisBorder: {
              //   show: true,
              //   color: "#78909C",
              //   height: 1,
              //   width: "100%",
              //   offsetX: 0,
              //   offsetY: 0,
              // },
            },
            yaxis: {
              title: {
                text: "Count",
              },
            },
            fill: {
              colors: ["#C9D6E9"],
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
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
                ? sanitisedAPQ.data[chartTitle].value
                : [],
            },
          ],
        };
        finalResp.push(chartData);
      });
      return finalResp;
    },
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
.cardButtonsDiv{
  flex-flow:column wrap;
}
.button{
 text-transform: none !important;
 margin: 10px !important;
 width: 180px;
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
