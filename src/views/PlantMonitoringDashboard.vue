<template>

  <div>
    
    <v-container style="margin-left: 25px 0px 10px 20px">
      <div id="app " >
        <v-row>
          <v-col cols="11">
    <Breadcrumb class="row justify-content-center mt-4" :crumbs="crumbs" @selected="selected" />
    </v-col>
    <v-col cols="1" v-if="showLoader">
        <LoaderProgress
      ></LoaderProgress>
    </v-col>
</v-row>
  </div>
      <v-dialog v-model="dialog" max-width="200">
        <v-card>
          <!-- <v-card-text class="cardText">Drill down for further analysis. Choose the relevant option.</v-card-text> -->
          <v-card-actions class="cardButtonsDiv">
            <v-btn color="primary" small class="button" @click="navigateTo('/multipleOEE')">
              OEE Dashboard
            </v-btn>
            <v-btn color="primary" small class="button" @click="navigateTo('/EnergyMonitoring')">
              Energy Dashboard
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-row class="mt-0 border-bottom">
      <v-col>
                  <DateRange></DateRange>

      </v-col>

    </v-row>
      <div class="d-flex align-content-space-around flex-wrap" v-if="oeeData">
        <div v-bind:key="apq.id" v-for="apq in oeeData" style="padding: 50px">
          <a v-on:click="openDialog()"
            ><plantSingleCard v-bind:apq="apq" style="padding-top: 20px"
          /></a>
        </div>
        <h1 style="margin-top:10px;" v-if="oeeData.length == 0 && !showLoader">No Data Available</h1>
      </div>
    </v-container>
  </div>
</template>

<script>
// import SingleMachine from "../components/singleOEE";
import Breadcrumb from '../components/breadcrumbs.vue';
// import LoaderProgress from '../components/progressLoader.vue'

import plantSingleCard from "../components/PlantSingleCard";
import DateRange from "../components/dateFilter";
import axios from "axios";
import constants from "../constants";
import router from "../router";
import LoaderProgress from "../components/progressLoader";


export default {
  name: "plantMonitoringDashboard",
  components: {
    DateRange,
    plantSingleCard,
    Breadcrumb,
    LoaderProgress,
    
  },
  data: function () {
    return {
      oeeData: [0],
                              crumbs: ['Home', 'Plant Monitoring Dashboard'],

      showLoader: false,
      dialog: false,
    };
  },
  mounted() {
    this.showLoader = false;
    // this.getOEE(null, null, true);
  },
  methods: {
                                    selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/plantMonitoringDashboard')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }       }
 
      
      console.log(crumb);
    },
    openDialog() {
      this.dialog = true;
    },
    navigateTo(address) {
      router.push(`${address}`);
    },
    getTimeInHours: (mins) => {
      let hours = Math.floor(mins / 60);
      let minutes = mins % 60;
      return `${hours}hrs ${minutes}mins`;
    },

    datePicked(x) {
      // console.log(">>>> [datePicked] in OEE", x);
      const start = parseInt(x[0]);
      const end = parseInt(x[1]);
      console.log(
        "human readable format: ",
        new Date(start * 1000),
        new Date(end * 1000)
      );
      this.getOEE(x[0], x[1]);
    },
    addSelectedMachineToSession(machineId) {
      sessionStorage.setItem("machineID", machineId);
    },
    getOEE(startDate, endDate, withoutDate) {
                  // document.querySelector("#loaderStyle").style.display = "none";

      console.log(">>>> [getOEE] in OEE", startDate, endDate, withoutDate);
      let todaysDate = new Date();
      let dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`;
      let start = startDate
        ? startDate
        : (new Date(dateString).getTime() / 1000).toFixed();
      let end = endDate ? endDate : (new Date().getTime() / 1000).toFixed();
      let params = withoutDate ? "" : `?startdate=${start}&enddate=${end}`;
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getPlantDashboard${params}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
                      sessionStorage["loadervalue"]=true;

      this.noteLastAPICallTime();
            // sessionStorage.setItem("loadervalue",true);
    // this.$session.set("username", "");


      axios(config)
        .then((response) => {
      // sessionStorage["loadervalue"]="";
console.log("checking value in plant",sessionStorage.getItem("loadervalue"));
      // sessionStorage["loadervalue"]="";
            // sessionStorage["loadervalue"]="";

      console.log("checking value in plant",sessionStorage.getItem("loadervalue"));


          this.showLoader = false;
          let data = response.data.data;
          let dataKeys = [];
          Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
            dataKeys.push(key);
          });
          console.log("keys lsit to evalutaiton", dataKeys);
          let structuredAPQ = data.map((e) => {
            let id = e.machine_id;
            let machine_name = e.machine_name;

            let totalUpTime = this.getTimeInHours(e.total_up_time);

            // totalUpTime = totalUpTime.toFixed(2);
            let contentName = e.status;
            let plugState = {
              headerName: "Plug State",
              contentName: contentName,
            };
            // console.log("checking plug state",plugState);
            let availability = e.availability * 100;
            availability = availability.toFixed(2);
            let performance = e.performance * 100;
            performance = performance.toFixed(2);
            let quality = e.quality * 100;
            quality = quality.toFixed(2);
            let oee = (availability * performance * quality) / (100 * 100);
            oee = oee.toFixed(0);
            let powerConsumption = e.total_kwh;
            let productionQty = e.total_production_quantity;
            let singleMachineOEE = {
              id,
              machine_name,
              totalUpTime,
              plugState,
              powerConsumption,
              productionQty,
              oee,
            };
            return singleMachineOEE;
          });

          this.oeeData = structuredAPQ || [];
        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            alert("internal error");
            console.log("axios error", error.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.h2Style {
  color: #000000;
  padding: 12px;
}
.button{
 text-transform: none !important;
 margin: 10px !important;
 width: 120px;
}
/* .cardText{
  padding:10px !important ; 
  text-align: center !important;
} */
.cardButtonsDiv{
  flex-flow:column wrap;
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
