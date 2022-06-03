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
</v-row>      </div>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->
    <v-row>
      <v-col>
        <filterHeaderComp />
      </v-col>
    </v-row>
    <v-data-table
      ref="theDataTable"
      :headers="headersData"
      :items="operatorsData"
      :search="search"
      :items-per-page="5"
      class="elevation-1"
      @pagination="pagination = $event"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <!-- <v-dialog v-model="dialog" max-width="800px">
            
            <template v-slot:activator="{ on, attrs }">

              <v-btn
                fab
                small
                outlined
                color="#0C479D"
                style="margin: 0px 5px 0px -2px"
              >
                <vue-json-to-csv
                  :json-data="dataDownload"
                  :csv-title="'Production Data'"
                >
                  <v-icon>mdi-table</v-icon>
                </vue-json-to-csv>
              </v-btn>
            </template>
          </v-dialog> -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="50"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class=""
                outlined
                fab
                small
                color="#0C479D"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>icon-download</v-icon>
              </v-btn>
            </template>

            <v-card>
              <!-- <v-list> -->
              <!-- <v-list-item> -->
              <!-- <v-list-item-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-list-item-avatar> -->

              <!-- <v-list-item-content> -->
              <!-- <v-list-item-title class="font-weight-bold text-blue text-uppercase">options</v-list-item-title> -->
              <!-- <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle> -->
              <!-- </v-list-item-content> -->

              <!-- <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action> -->
              <!-- </v-list-item> -->
              <!-- </v-list> -->

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <vue-json-to-csv
                      :json-data="dataDownload"
                      :csv-title="'Insights Data'"
                    >
                      <v-btn color="indigo" dark style="">
                        CSV
                      </v-btn>
                    </vue-json-to-csv>

                    <!-- <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Menu as Popover
        </v-btn> -->
                  </v-list-item-action>
                  <!-- <v-list-item-title>CSV Download</v-list-item-title> -->
                </v-list-item>

                <v-list-item>
                  <v-list-item-action>
                    <v-btn @click="createPDF" color="indigo" dark>PDF </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-toolbar>
      </template>

      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
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
import jsPDF from "jspdf";
import "jspdf-autotable";
const logo = require("../assets/Mobil_Serv-SM.png");
export default {
  components: { VueJsonToCsv, filterHeaderComp, Breadcrumb,LoaderProgress },

  data() {
    return {
                crumbs: ['Home', 'Report Menu','Machine Insights'],
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
          text: "Machine Insights Report",
          disabled: true,
        },
      ],
      showWarning: false,
      showLoader: false,
      dataDownload: [],
      search: "",
       menu: false,
      operatorsData: [],
      headersData: [],
      pagination: {
        page: null,
        itemsPerPage: null,
        pageStart: null,
        pageStop: null,
        pageCount: null,
        itemsLength: null,
      },
    };
  },
  mounted() {},

  methods: {
        selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
      console.log(crumb);
    },
    createPDF() {
      let content = this.$refs["theDataTable"];
      console.log("pagination", this.pagination);
      let doc = new jsPDF("latitude");
      doc.text(14, 7.5, "Machine Insights");
      doc.addImage(logo, "png", 247, 3, 35, 5.5);
     let columnHeaders = [
        "Machine Name",
        "Parameter Name",
        "Parameter Value",
        "Alert",
        "Alert Start",
        "Alert End",
        "High Value",
        "Low Value"
      ];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.parameter_name || "",
            data.parameter_value || "",
            data.caution_type || "",
            data.alert_start || "",
            data.alert_end || "",
            data.high_value || "",
            data.low_value || "",
          ];
          rows.push(tempRow);
        }
      });
      console.log("checkign temp row=>", rows);
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Machine_Insights ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },
    intervalFetchData: function(machine_id, startDate, endDate) {
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
        url: `${constants.backend_url}/getmachineInsightsData${params}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.setGridData(config);
    },
    setGridData: function(config) {
      this.headersData = [
        //         {
        //   text: "Customer Name",
        //   value: "customer_name",
        //   class: "indigo--text subtitle-1",
        // },
        {
          text: "Machine Name",
          value: "machine_name",
sortable: true,        },
        {
          text: "Parameter Name",
          value: "parameter_name",
sortable: true,        },
        {
          text: "Parameter Value",
          value: "parameter_value",
sortable: true,        },
        {
          text: "Alert",
          value: "caution_type",
sortable: true,        },
        {
          text: "Alert Start",
          value: "alert_start",
sortable: true,        },
        {
          text: "Alert End",
          value: "alert_end",
sortable: true,        },

        {
          text: "High Value",
          value: "high_value",
sortable: true,        },
        {
          text: "Low Value",
          value: "low_value",
sortable: true,        },
      ];

      this.showLoader = true;
      this.showWarning = false;
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          let _data = response.data.data;
          console.log("checkign resp", response.data.data);
          this.operatorsData = response.data.data;
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          this.dataDownload = result[0][1];
          this.item = _data;
          this.showLoader = false;
        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            this.showWarning = true;
            this.item = [];
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