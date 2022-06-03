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
</v-row>      </div>

    <v-data-table
      ref="theDataTable"
      :headers="headersData"
      :items="operatorsData"
      :search="search"
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
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
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
                          :csv-title="'Operator Data'"
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
                        <v-btn @click="createPDF" color="indigo" dark
                          >PDF
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
              <!-- <v-btn
                @click="createPDF"
                class=""
                outlined
                fab
                small
                color="#0C479D"
              >
                <v-icon>icon-download</v-icon>
                  
              </v-btn>
              <v-btn
                fab
                small
                outlined
                color="#0C479D"
                style="margin: 0px 5px 0px -2px"
              >
                <vue-json-to-csv
                  :json-data="dataDownload"
                  :csv-title="'Operator Data'"
                >
                  <v-icon>mdi-table</v-icon>
                </vue-json-to-csv>
              </v-btn> -->
              <v-btn
                class="mr-2"
                outlined
                small
                fab
                color="#0C479D"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>icon-add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="machineItems"
                        v-model="editedItem.machine_id"
                        prepend-icon="icon-dpimm"
                        menu-props="auto"
                        hide-details
                        label="Select Machine"
                        item-text="machine_name"
                        item-value="id"
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                        v-model="date"
                        label="Production Start Time"
                        prepend-icon="icon-calender"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field> -->
                      <h4>Production Start Time</h4>
                      <input
                        type="datetime-local"
                        v-model="editedItem.production_start_time"
                        label="Production Start Time"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                      <!-- <v-text-field
                        v-model="date"
                        label="Production End Time"
                        prepend-icon="icon-calender"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field> -->
                      <h4>Production End Time</h4>
                      <input
                        type="datetime-local"
                        v-model="editedItem.production_end_time"
                        label="Production End Time"
                      />
                    </v-col>

                    <v-col cols="6" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cycletime"
                        label="Estimated Cycle Time"
                        :disabled="true"
                        @keypress="onlyNumber"
                        prepend-icon="icon-clock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="2">
                      <v-select
                        v-model="editedItem.estimated_time_unit"
                        :items="timeplanned.filters"
                        menu-props="auto"
                        hide-details
                        label="UOM"
                        :disabled="true"
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.setup_time"
                        prepend-icon="icon-clock"
                        label="Setup Time"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="2">
                      <v-select
                        v-model="editedItem.setup_time_unit"
                        :items="timeplanned.filters"
                        menu-props="auto"
                        hide-details
                        label="UOM"
                        single-line
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="productCodes"
                        item-value="product_code"
                        item-text="product_code"
                        v-model="editedItem.product_code"
                        label="Product Code"
                        prepend-icon="icon-select-code"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.actual_production_quantity"
                        label="Actual Production Quantity"
                        prepend-icon="icon-actual-production-qty"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.rejection_quantity"
                        label="Rejection Quantity"
                        prepend-icon="icon-rejection-qty"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions class="pb-5">
                <v-spacer></v-spacer>
                <v-btn outlined rounded color="error" @click="close">
                  <v-icon left>icon-cancel</v-icon>
                  Cancel
                </v-btn>
                <v-btn rounded color="primary" @click="save">
                  <v-icon left>icon-availability</v-icon>
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editDoc(item)">
          icon-action
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="setGridData"> Reset </v-btn>
      </template> -->
    </v-data-table>
  </v-container>
</template>
<script>
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
  components: { VueJsonToCsv, Breadcrumb, LoaderProgress },

  data: () => ({
                    crumbs: ['Home', 'Operator Data Entry'],
    showLoader: false,
    dialog: false,
    dialogDelete: false,
    search: "",
    pagination: {
      page: null,
      itemsPerPage: null,
      pageStart: null,
      pageStop: null,
      pageCount: null,
      itemsLength: null,
    },
    headersData: [],
    operatorsData: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      machine_id: "",
      production_start_time: "",
      production_end_time: "",
      estimated_time_unit: "",
      estimated_cycle_time: "",
      setup_time: "",
      setup_time_unit: "",
      product_code: "",
      rejection_quantity: 0,
      actual_production_quantity: 0,
    },
    dataDownload: [],
    defaultItem: {
      machine_id: "",
      production_start_time: "",
      production_end_time: "",
      setup_time: "",
      setup_time_unit: "",
      actual_production_quantity: 0,
      estimated_time_unit: "",
      estimated_cycle_time: "",
      product_code: "",
      rejection_quantity: 0,
    },
    productCodes: [],
    timeplanned: {
      filters: [],
    },
    selectedValue: {
      filter: [],
      // selectedValue: null,
    },

    machineSelected: "",
    machineItems: [],

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
        text: "Operator Data Entry for Standard Operations Parameters",
        disabled: true,
      },
    ],

    oeemonitoring: [],
  }),
  mounted() {
    this.setGridData();
    this.setMachineData();
    this.getProducts();
    this.timeplanned = {
      filters: ["hrs", "minutes", "seconds"],
    };
    this.selectedValue = {
      filter: ["hrs", "minutes", "seconds"],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Operator Data"
        : "Edit Operator Data";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    
    "editedItem.product_code"() {
      let product = this.productCodes.find(
        (e) => e.product_code === this.editedItem.product_code
      );
      this.editedItem.estimated_cycle_time = product.cycle_time_seconds;
      this.editedItem.estimated_time_unit = "seconds";
      this.editedItem.setup_time = product.setup_time_minutes;
      this.editedItem.setup_time_unit = "minutes";
    },
  },

  created() {
    this.setGridData();
  },

  methods: {
            selected(crumb) {
      if (crumb === 'Home')
      {
        if (`/${sessionStorage.getItem("route_first_option")}` == '/OperatorDataEntry')
        {
                  console.log("Checking duplicate and proved ",`/${sessionStorage.getItem("route_first_option")}` );

        }
        else 
        {
          router.push(`/${sessionStorage.getItem("route_first_option")}`);
        }       }

      console.log(crumb);
    },
    editDoc(item) {
      console.log("checkign items", item);
      this.isEdit = true;
      this.editedItem = item;
      this.dialog = true;
      this.editedIndex = item;
    },
    createPDF() {
      let content = this.$refs["theDataTable"];

      let doc = new jsPDF();
      doc.text(14, 7.5, "Operator Data Entry");
      doc.addImage(logo, "png", 161, 3, 35, 5.5);
      let columnHeaders = [
        "Selected Machine(s)",
        "Production Start Time",
        "Production End Time",
        "Estimated Cycle Time",
        "Setup Time",
        "Product Code",
        "Planned Production Quantity",
        "Actual Production Quantity",
        "Rejection Quantity",
      ];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.production_start_time || "",
            data.production_end_time || "",
            (data.estimated_cycle_time || "") +
              " " +
              (data.estimated_time_unit || ""),
            (data.setup_time || "") + " " + (data.setup_time_unit || ""),
            data.product_code || "",
            data.production_quantity || "",
            data.actual_production_quantity || "",
            data.rejection_quantity || "",
          ];
          rows.push(tempRow);
        }
      });
      console.log("checkign temp row=>", rows);

      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `operatorDataEntry ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },
    downloadData() {
      alert("downloading csv file");
    },

    setMachineData() {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachineNames`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          let machineData = response.data.data;
          machineData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "machine_name"
            );
          });
          this.machineItems = machineData;
          this.showLoader = false;
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
    getProducts() {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getProductsData`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          this.productCodes = response.data.data
            ? response.data.data.length
              ? response.data.data
              : []
            : [];
        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            this.$toasted
              .show("Failed to Fetch Product(s)", {
                className: ["failedToast"],
              })
              .goAway(6000);
            console.log("axios error", error.message);
          }
        });
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    addDoc() {
      this.isEdit = false;
    },

    save() {
      if (
        this.editedItem.machine_id === null ||
        this.editedItem.machine_id === ""
      ) {
        alert("Please select Machine ");
        return;
      } else if (
        this.editedItem.production_start_time === null ||
        this.editedItem.production_start_time === ""
      ) {
        alert("Please select production Start Time ");
        return;
      } else if (
        this.editedItem.production_end_time === null ||
        this.editedItem.production_end_time === ""
      ) {
        alert("Please select production End Time ");
        return;
      } else if (
        this.editedItem.estimated_cycle_time === null ||
        this.editedItem.estimated_cycle_time === ""
      ) {
        alert("Please Enter Estimated Cycle Time ");
        return;
      } else if (
        this.editedItem.estimated_time_unit === null ||
        this.editedItem.estimated_time_unit === ""
      ) {
        alert("Select the time unit for estimated cycle time");
        return;
      } else if (
        this.editedItem.setup_time != null &&
        this.editedItem.setup_time.length > 20
      ) {
        alert(
          "Please Enter Setup Time value less than or equal to 20 characters"
        );
        return;
      } else if (
        this.editedItem.setup_time_unit === null ||
        this.editedItem.setup_time_unit === ""
      ) {
        alert("Select the time unit for Setup time");
        return;
      } else if (
        this.editedItem.product_code === null ||
        this.editedItem.product_code === ""
      ) {
        alert("Please select Product Code ");
        return;
      } else if (
        this.editedItem.actual_production_quantity != null &&
        this.editedItem.actual_production_quantity.length > 10
      ) {
        alert(
          "Please Enter Actual Production Quantity less than or equal to 10 digits"
        );
        return;
      } else if (
        this.editedItem.rejection_quantity != null &&
        this.editedItem.rejection_quantity.length > 10
      ) {
        alert(
          "Please Enter Rejection Quantity less than or equal to 10 digits"
        );
        return;
      }
      let created_user = sessionStorage.getItem("activeUser") || "";
      let updated_user = sessionStorage.getItem("activeUser") || "";
      //console.log("checking est_cyc_time=>",this.editedItem.estimated_cycle_time);
      const req = {
        id: this.isEdit ? this.editedItem.id : undefined,
        machine_id: this.editedItem.machine_id,
        created_by: this.isEdit ? undefined : created_user,
        updated_by: this.isEdit ? updated_user : undefined,
        production_start_time: this.editedItem.production_start_time,
        production_end_time: this.editedItem.production_end_time,
        estimated_cycle_time: this.editedItem.estimated_cycle_time,
        estimated_time_unit: this.editedItem.estimated_time_unit,
        setup_time: this.editedItem.setup_time,
        setup_time_unit: this.editedItem.setup_time_unit.replace(" ", ""),
        product_code: this.editedItem.product_code,
        actual_production_quantity: this.editedItem.actual_production_quantity,
        rejection_quantity: this.editedItem.rejection_quantity,
      };

      let url = this.isEdit
        ? `${constants.backend_url}/UpdateOperatorData`
        : `${constants.backend_url}/operatorDataEntry`;
      this.showLoader = true;
      let config = {
        method: "post",
        url: url,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: req,
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          if (response.data.status == "S") {
            document.querySelector("#sucessAlert").style.display = "block";
            this.setGridData();
          }
        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            document.querySelector("#errorAlert").style.display = "block";
            console.log("axios error", error.message);
          }
        });
      this.close();
    },
    toDateTime(date) {
      var str = "";
      var year, month, day, hour, min;
      year = date.getUTCFullYear();
      month = date.getUTCMonth() + 1;
      month = month < 10 ? "0" + month : month;
      day = date.getUTCDate();
      day = day < 10 ? "0" + day : day;
      hour = date.getUTCHours();
      hour = hour < 10 ? "0" + hour : hour;
      min = date.getUTCMinutes();
      min = min < 10 ? "0" + min : min;

      str += year + "-" + month + "-" + day;
      str += " " + hour + ":" + min;
      return str;
    },
    setGridData: function() {
      this.headersData = [
        {
          text: "Select Machine(s)",
          value: "machine_name",
          align: "start",
          sortable: true,
        },
        {
          text: "Production Start Time",
          value: "production_start_time",
          align: "start",
          sortable: true,
        },
        {
          text: "Production End Time",
          value: "production_end_time",
          align: "start",
          sortable: true,
        },
        {
          text: "Estimated Cycle Time",
          value: "estimated_cycle_time",
          align: "start",
          sortable: true,
        },
        {
          text: "UOM",
          value: "estimated_time_unit",
          align: "start",
          sortable: true,
        },
        {
          text: "Setup Time",
          value: "setup_time",
          align: "start",
          sortable: true,
        },
        {
          text: "UOM",
          value: "setup_time_unit",
          align: "start",
          sortable: true,
        },
        {
          text: "Product Code",
          value: "product_code",
          align: "start",
          sortable: true,
        },
        {
          text: "Planned Production Quantity",
          value: "production_quantity",
          align: "start",
          sortable: true,
        },
        {
          text: "Actual Production Quantity",
          value: "actual_production_quantity",
          align: "start",
          sortable: true,
        },
        {
          text: "Rejection Quantity",
          value: "rejection_quantity",
          align: "start",
          sortable: true,
        },
        { text: "Actions", value: "actions", align: "start", sortable: true },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getoperatorDataEntry`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          this.operatorsData = response.data.data;

          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          // console.log("hello", result[0][1]);
          this.dataDownload = result[0][1];
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>