<template >
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
</v-row>    </div>
    <v-row class="mt-0 border-bottom">
      <v-col>
                <DateRange></DateRange>
      </v-col>
     
    </v-row>
          <div class="d-flex align-content-space-around flex-wrap " >
        <div
          v-bind:key="energy.id"
          v-for="energy in energyData"
          style="padding: 10px 10px 10px 10px"
          class="mb-3 mt-5"
        >
          <router-link
            :to="{
              name: 'EnergyMonitoringTrends',
              params: { macId: energy.machine_id },
            }"
            style="text-decoration: none"
          >
            <SingleMachine v-bind:energy="energy" style="padding-top: 20px" />
          </router-link>
        </div>
        <h1 v-if="isActive" style="margin-top:10px;">
          No Data Available
        </h1>
      </div>
  </v-container>
</template>
<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import SingleMachine from "../components/singleEnergy";
import DateRange from "../components/dateFilter";
import axios from "axios";
import constants from "../constants";
import router from "../router";
export default {
    components: {
    SingleMachine,
    DateRange,
    Breadcrumb,
    LoaderProgress
  },
  mounted() {
    // this.showLoader = false;
    // this.getenergy(null, null, true);
  },
  data: () => ({
                        crumbs: ['Home', 'Plant Monitoring Dashboard', 'Energy Monitoring Dashboard'],
                  showLoader: false,

    energyData: [],
    isActive: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Energy Monitoring Dashboard",
        disabled: true,
      },
    ],
  }),
    methods: {
      
                      selected(crumb) {
                        console.log('checking doing or not',`/${sessionStorage.getItem("route_first_option")}`);
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/EnergyMonitoring')
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
      
      console.log(crumb);
    },
    datePicked(x) {
      console.log("datePicked", x);
      const start = parseInt(x[0]);
      const end = parseInt(x[1]);
      console.log(
        "human readable format: ",
        new Date(start * 1000),
        new Date(end * 1000)
      );
      this.getenergy(x[0], x[1]);
    },
    addSelectedMachineToSession(machineId) {
      sessionStorage.setItem("machineID", machineId);
    },
    getenergy(startDate, endDate, withoutDate) {
      let todaysDate = new Date();
      let dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`;
      let start = startDate
        ? startDate
        : (new Date(dateString).getTime() / 1000).toFixed();
      let end = endDate ? endDate : (new Date().getTime() / 1000).toFixed();
      console.log("Checking without date",withoutDate);
      this.showLoader = true;
      let params = withoutDate
        ? ""
        : `?startdate=${start}&enddate=${end}`;
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getEMDashboard${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        };
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          let data = response.data.data;
          console.log("the type of data is", typeof data);
          console.log("data is", data);
          let structuredenergy = data.map((e) => {
            let id = e.machine_name;
            let start_date = start;
            let end_date = end;
            let avg = e.avg;
            avg = avg && typeof avg === "number" ? avg.toFixed(2) : "--";
            let min = e.min;
            min = min && typeof min === "number" ? min.toFixed(2) : min;
            let max = e.max;
            max = max && typeof max === "number" ? max.toFixed(2) : "--";
            let energy = e.total;
            energy =
              energy && typeof energy === "number" ? energy.toFixed(2) : "--";
            let machine_id = e.machine_id;
            let cost = e.cost;
            cost = cost && typeof cost === "number" ? cost.toFixed(2) : "--";
            let singleMachineenergy = {
              start_date,
              end_date,
              id,
              avg,
              min,
              max,
              energy,
              machine_id,
              cost,
            };
            return singleMachineenergy;
          });

          this.energyData = structuredenergy;
          this.isActive = false
          this.showLoader = false;
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