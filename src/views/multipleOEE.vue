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
                  <DateRange></DateRange>
      </v-col>
    </v-row>

          <div  v-if="oeeData" class="d-flex align-content-space-around flex-wrap">
        <div v-bind:key="apq.id" v-for="apq in oeeData" class="mb-3 mt-5" >
                <v-col >

          <router-link
            :to="{ name: 'apqMachine', params: { macId: apq.machine_id } }"
            style="text-decoration: none"
          >
            <SingleMachine v-bind:apq="apq" style="padding-top: 20px" />
          </router-link>
                </v-col>

        </div>
        <h1 v-if="oeeData.length == 0 && !showLoader" style="margin-top:10px;">No Data Available</h1>
      </div>
  </v-container>
</template>

<script>
import SingleMachine from "../components/newSingleOEE";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import axios from "axios";
import constants from "../constants";
import router from "../router";
import DateRange from "../components/dateFilter";


export default {
    components: {
    SingleMachine,
    DateRange,
    Breadcrumb,
    LoaderProgress
  },

  data: () => ({
                    crumbs: ['Home', 'Plant Monitoring Dashboard', 'OEE Monitoring Dashboard'
                    ],

    oeeData:[],
    showLoader: false,
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
    dates: [],
    items1: ["Today", "Last Day", "Last 7 Days", "Last 15 Days", "Last Month"],
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
        disabled: true,
        
      },
    ],
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  methods: {
                             selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/multipleOEE')
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
      //   else if (crumb === 'Energy Monitoring Dashboard')
      // {
      //   router.push('/EnergyMonitoring')
      // }
      
      
      console.log(crumb);
    },
        datePicked(x) {
      console.log(">>>> [datePicked] in OEE", x);
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
      console.log(">>>> [getOEE] in OEE", startDate, endDate, withoutDate);
      let todaysDate = new Date();
      let dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`;
      let start = startDate
        ? startDate
        : (new Date(dateString).getTime() / 1000).toFixed();
      let end = endDate ? endDate : (new Date().getTime() / 1000).toFixed();
      let params = withoutDate
        ? ""
        : `?startdate=${start}&enddate=${end}`;
      this.showLoader = true;
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getOEEParameters${params}`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        };
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          this.showLoader = false;
          let data = response.data.data;
          let dataKeys = [];
          Object.entries(data).forEach(([key, value]) => {
            console.log(key, value);
            dataKeys.push(key);
          });
          console.log("keys lsit to evalutaiton", dataKeys);
          let structuredAPQ = data.map((e) => {
            let id = e.machine_name;
            let availability = e.availability * 100;
            availability = availability.toFixed(0);
            let performance = e.performance * 100;
            performance = performance.toFixed(0);
            let quality = e.quality * 100;
            quality = quality.toFixed(0);
            let oee = (availability * performance * quality) / (100 * 100) || 0;
            oee = oee.toFixed(0);
            let machine_id = e.machine_id;
            let singleMachineOEE = {
              id,
              availability,
              performance,
              quality,
              oee,
              machine_id,
            };
            return singleMachineOEE;
          });

          this.oeeData = structuredAPQ;
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
    onSelectCustomDate(val) {
      this.selectedDate = val;
    },
    onSelectFromToDate() {
      this.selectedDate = this.fromDate + ' ~ ' + this.toDate;
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
.my-datelist.v-list {
  border-top: 1px solid #e1e1e1 !important;
}

.my-datelist .v-list-item__title {
  align-self: center;
  font-size: 1.1rem;
  color: #7e84a3;
}

.my-datelist .v-list-item:hover {
  background-color: #e9e9e9;
}

.my-datelist .v-list-item:hover .v-list-item__title {
  color: #0c479d;
}

.my-datelist.v-sheet.v-list {
  padding: 0;
  margin-top: -35px;
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
