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
</v-row>     </div>
    <v-row>
      <v-col>
        <filterHeaderComp />
      </v-col>
    </v-row>
 
    <div v-if="!nothing" class="vertical-center" >
                                 <v-btn color="primary" tile dark x-large  v-if="showLoader" style="font-size: 20px">

          Loading Data Please Wait ...
    </v-btn>              
    <v-btn color="white" tile  x-large  v-if="!showLoader">



              <v-btn
                class=""
                outlined
                fab
                small
                
            disabled
                
              >
                <v-icon>icon-download</v-icon>
              </v-btn>

                
 <span><div style="margin-left: 20px;margin-right: 20px; font-size: 20px">  Download Now </div></span>
    </v-btn>
      </div>
    <div v-if="nothing" class="vertical-center" >
        <v-btn color="primary" tile dark x-large  v-if="showLoader" style="font-size: 20px">

          Loading Data Please Wait ...
    </v-btn>
                                      <vue-json-to-csv
                      :json-data="dataDownload"
                      :csv-title="title_csv"
                      v-if="!showLoader"
                    >
    <v-btn color="primary" tile dark x-large  v-if="!showLoader">



              <v-btn
                class=""
                outlined
                fab
                small
                
            
                
              >
                <v-icon>icon-download</v-icon>
              </v-btn>

                
 <span><div style="margin-left: 20px;margin-right: 20px; font-size: 20px">  Download Now </div></span>
    </v-btn>
                                      </vue-json-to-csv>
    </div>
   </v-container>
</template>
<script>
import filterHeaderComp from "../components/filterHeaderComp.vue";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import axios from "axios";
import VueJsonToCsv from "vue-json-to-csv";
import constants from "../constants";
import router from "../router";

export default {
  components: { VueJsonToCsv, filterHeaderComp, Breadcrumb, LoaderProgress },

  data() {
    return {
                                        crumbs: ['Home', 'Report Menu','GMIIOT Machine Data Report'],
      items: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
          {
        text: "Report Menu",
        disabled: true,
        href: "/",
      },
        {
          text: "GMIIOT Machine Data Report",
          disabled: true,
        },
      ],
            nothing: false,

      showWarning: false,
      showLoader: false,
      menu: false,
      dataDownload: [],
      title_csv: "",
      search: "",
      operatorsData: [],
      headersData: [],
     
    };
  },
  mounted() {},
beforeMount(){
this.nothing =false;
},
  methods: {

     timeConverter(UNIX_timestamp)  {
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
                        selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);

     
      }
      console.log(crumb);
    },

    intervalFetchData: function(machine_id, startDate, endDate) {
      // this.nothing =true;
      this.machine_id_Selected = machine_id;
      this.start_date = startDate;
      this.end_date = endDate;
      console.log("machine id", machine_id);
      console.log(
        "selected start date",
        startDate,
        "selected end date",
        startDate
      );

      this.searchNew(this.machine_id_Selected, startDate, endDate);
    },
    searchNew: function(machine_id, startDate, endDate) {
      this.start_date = startDate;
      this.end_date = endDate;
      this.machine_id_Selected = machine_id;
      console.log(
        "machine select",
        this.machine_id_Selected,
        "Done to say",
        machine_id
      );
      let params = "";
      if (this.start_date == "") {
        params = `?machine_id=${machine_id}`;
      } else {
        params = `?machine_id=${machine_id}&startdate=${this.start_date}&enddate=${this.end_date}`;
      }
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachineRawData${params}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.setGridData(config);
    },
    setGridData: function(config) {
      
        
//       this.headersData = [
//         {
//         text: "Machine Name",
//         value: "machine_name",
// sortable:true      },
//       {
//         text: "Time Stamp",
//         value: "timestamp",
// sortable:true      },
//       {
//         text: "Current Cycle Time(seconds)",
//         value: "current_cycle_time",
// sortable:true      },
//       {
//         text: "Previous Cycle Time(seconds)",
//         value: "previous_cycle_time",
// sortable:true      },
//       {
//         text: "CT Variance %",
//         value: "ct_variance",
// sortable:true      },
//       ];

      this.showLoader = true;
      this.showWarning = false;
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          let _data = response.data.data;
          console.log("checkign resp", response.data.data);
          let value = response.data.data['device_parameters'];
          let lisValue  = [];
          let rec = {};
          let machine_name =  response.data.data['machine']||'';
                    let device_name =  response.data.data['device']||'';

          for (let i in value  )
          {
            
            rec = {
              text: value[i],
              value: value[i]
            }
            lisValue.push(rec)
          }
          this.headersData = lisValue;
                    this.operatorsData = response.data.data['data'];

          console.log("Checking parameters",value);
          let result = [];
          for (let i in response.data['data']) result.push([i, response.data['data'][i]]);
          let starDate = this.timeConverter(this.start_date);
                    let enDate = this.timeConverter(this.end_date);

          this.title_csv = machine_name + '_'+device_name+  '_'+ starDate + '--to--' + enDate;
          console.log("checking title")
          this.dataDownload = result[0][1]  ;


          this.item = _data;
          this.showLoader = false;
                this.nothing =true;

        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
                            this.nothing =true;

            sessionStorage.clear();
            router.push("/login");
          } else {
            this.showWarning = true;
              alert('No Data Found')
            this.item = [];
                            this.nothing =false;

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
@media screen and (max-width: 600px) {
 
.vertical-center {
  margin: 0;
  position: absolute;
  top: 80%;
  left: 10%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
}
@media screen and (min-width: 600px)  {
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
}

</style>