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
</v-row>   </div>
    <v-data-table
    ref="theDataTable"
      :headers="headersData"
      :items="operatorsData"
      :search="search"
      :items-per-page="15"
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
                          :csv-title="'Alerts Data'"
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
              <v-btn
                class="mr-2"
                outlined
                small
                fab
                color="#0C479D"
                v-bind="attrs"
                v-on="on"
                @click="addDoc()"
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
                      <v-autocomplete
                        :items="machineItems"
                        v-model="editedItem.machine_id"
                        prepend-icon="icon-dpimm"
                        @change="assignparam($event)"
                        label="Select Machines(s)*"
                        item-text="machine_name"
                        item-value="id"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        :items="parameters"
                        v-model="editedItem.parameter_id"
                        prepend-icon="icon-cog-single"
                        label="Operational Parameter*"
                        item-text="parameter_name"
                        item-value="parameter_id"
                      />
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.thresholdvalue"
                        prepend-icon="icon-threshold-value"
                        label="Threshold Value"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        prepend-icon="icon-email"
                        label="eMail*"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone_number"
                        label="Phone"
                        prepend-icon="icon-phone"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label class="radiolabel">Enable</label>
                      <v-radio-group
                        v-model="editedItem.enable_flag"
                        row
                        class="radiogroup"
                      >
                        <v-radio
                          label="Yes"
                          value="Y"
                          @change="changeActivestatus('Y')"
                        ></v-radio>
                        <v-radio
                          label="No"
                          value="N"
                          @change="changeActivestatus('N')"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label class="radiolabel">Send SMS*</label>
                      <v-radio-group
                        v-model="editedItem.sms_enable_flag"
                        row
                        class="radiogroup"
                      >
                        <v-radio
                          label="Yes"
                          value="Y"
                          @change="changeActiveSMSstatus('Y')"
                        ></v-radio>
                        <v-radio
                          label="No"
                          value="N"
                          @change="changeActiveSMSstatus('N')"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                                        <v-col cols="12" sm="6" md="4">
                      <label class="radiolabel">Send Email*</label>
                      <v-radio-group
                        v-model="editedItem.email_enable_flag"
                        row
                        class="radiogroup"
                      >
                        <v-radio
                          label="Yes"
                          value="Y"
                          @change="changeActiveEmailstatus('Y')"
                        ></v-radio>
                        <v-radio
                          label="No"
                          value="N"
                          @change="changeActiveEmailstatus('N')"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.low_alert"
                        prepend-icon="icon-low-alert"
                        label="Low Alert"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.high_alert"
                        prepend-icon="icon-high-alert"
                        label="High Alert"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.low_caution"
                        label="Low Caution"
                        @keypress="onlyNumber"
                        prepend-icon="icon-low-caution"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.high_caution"
                        label="High Caution"
                        prepend-icon="icon-high-caution"
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
      <template v-slot:item.status="{ item }">
        <v-switch
          color="indigo"
          @change="changeStatus(item, item.status)"
          false-value="N"
          true-value="Y"
          v-model="item.enable_flag"
        ></v-switch>
      
      </template>
            <template v-slot:item.sms_enable_flag="{ item }">
        <v-switch
          color="indigo"
          @change="changeStatus(item, item.status)"
          false-value="N"
          true-value="Y"
          v-model="item.sms_enable_flag"
        ></v-switch>
      
      </template>
                  <template v-slot:item.email_enable_flag="{ item }">
        <v-switch
          color="indigo"
          @change="changeStatus(item, item.status)"
          false-value="N"
          true-value="Y"
          v-model="item.email_enable_flag"
        ></v-switch>
              </template>


      
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          icon-action
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="setGridData"> Reset </v-btn>
      </template> -->
    </v-data-table>
            <div id="sucessAlert">
          <v-alert outlined type="success" text>
            Data Saved successfully.
          </v-alert>
        </div>
        <div id="errorAlert">
          <v-alert outlined type="warning" prominent border="left">
            Error while saving the data.
          </v-alert>
        </div>
  </v-container>
</template>
<script>
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import axios from "axios";
import constants from "../constants";
import VueJsonToCsv from "vue-json-to-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import router from "../router";
const logo = require("../assets/Mobil_Serv-SM.png");

export default {
  components: {
    VueJsonToCsv,
    Breadcrumb,
    LoaderProgress
  },

  data: () => ({
        showLoader: false,

              crumbs: ['Home', 'Admin Menu','Configuration For Alerts  Notifications'],

    isEdit: false,
    machineItems: [],
    parameters: [],
    dataDownload: [],
    // search: "",
    headersData: [],
    operatorsData: [],

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    switch1: true,
    menu: false,
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Admin Menu",
        disabled: true,
        href: "/",
      },
      {
        text: "Configuration for Alerts / Notifications",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Machine",
        align: "start",
        sortable: true,
        value: "machine",
      },
      {
        text: "Operational Parameter",
        align: "start",
        sortable: true,
        value: "operationalparameter",
      },
      {
        text: "Threshold Value",
        align: "start",
        sortable: true,
        value: "thresholdvalue",
      },
      {
        text: "Low Alert",
        align: "start",
        sortable: true,
        value: "lowalert",
      },
      {
        text: "High Alert",
        align: "start",
        sortable: true,
        value: "highalert",
      },
      {
        text: "Low Caution",
        align: "start",
        sortable: true,
        value: "lowcaution",
      },
      {
        text: "High Caution",
        align: "start",
        sortable: true,
        value: "highcaution",
      },
      {
        text: "Email Detail",
        align: "start",
        sortable: true,
        value: "emaildetail",
      },
      {
        text: "Phone Number",
        align: "start",
        sortable: true,
        value: "phonenumber",
      },
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "enable_flag",
      },
            {
        text: "Send SMS",
        align: "start",
        sortable: true,
        value: "sms_enable_flag",
      },
                  {
        text: "Send Email",
        align: "start",
        sortable: true,
        value: "email_enable_flag",
      },
      { text: "Action", value: "actions", sortable: false },
    ],
    oeemonitoring: [],
    editedIndex: -1,
      editedItem: {
        id: null,
        machine_id: "",
        parameter_id: "",
        // threshold_value: "",
        low_alert: null,
        low_caution: null,
        high_alert: null,
        high_caution: null,
        email: "",
        phone_number: "",
        enable_flag: "Y",
         sms_enable_flag: 'Y',
      email_enable_flag: 'Y',
      },
      defaultItem: {
        parameter_id: "",
        machine_id: "",
        // threshold_value: "",
        low_alert: null,
        low_caution: null,
        high_alert: null,
        high_caution: null,
        email: "",
        phone_number: "",
        enable_flag: "Y",
         sms_enable_flag: 'Y',
      email_enable_flag: 'Y',
      },
    machine: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    operationalparameter: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.setGridData();
    this.setMachineData();
  },

  methods: {
        selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
      console.log(crumb);
    },
     addDoc() {
      this.isEdit = false;
    },
        onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
        changeActivestatus(item) {
      document.querySelector("#errorAlert").style.display = "none";
console.log("checking enabled flag",item);
      this.editedItem.enable_flag = item;
    },
            changeActiveEmailstatus(item) {
      document.querySelector("#errorAlert").style.display = "none";
console.log("checking SMS enabled flag",item);
      this.editedItem.email_enable_flag = item;
    },
     changeActiveSMSstatus(item) {
      document.querySelector("#errorAlert").style.display = "none";
console.log("checking Email enabled flag",item);
      this.editedItem.sms_enable_flag = item;
    },
    createPDF() {
      let content = this.$refs["theDataTable"];
      console.log("pagination", this.pagination);
      let doc = new jsPDF("landscape");
      doc.text(14, 7.5, "Alerts/Notifications Configuration");
      doc.addImage(logo, "png", 247, 3, 35, 5.5);
      let columnHeaders = [
        "Machine(s)",
        "Operational Parameter",
        "Threshold Value",
        "Low Alert",
        "High Alert",
        "Low Caution",
        "High Caution",
        "eMail",
        "Phone Number",
        "Status",
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
            // data.threshold_value || "",
            data.low_alert || "",
            data.high_alert || "",
            data.low_caution || "",
            data.high_caution || "",
            data.email || "",
            data.phone_number || "",
            data.enable_flag === "Y" ? "On" : "Off",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Alerts_Notifications_Config ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
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
          this.showLoader = false;
          console.log("response--getMachineNames", response.data);
          let machineData = response.data.data;
          machineData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "machine_name"
            );
          });
          console.log("cehcking machine dayta=>", machineData);
          this.machineItems = machineData;
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

      // this.selectProps = ["Nozzle Temperature","Z1 Temperature"]
    },
 
    assignparam(event) {
      // let machineID = event;
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getParametersData?machine_id=${event}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          // console.log("response--parameter names", response.data.data);
          this.parameters = [];
          let parametersList = response.data.data;
          parametersList.sort((first_operator, second_operator) => {
            return constants.compareObjects(
              first_operator,
              second_operator,
              "parameter_name"
            );
          });
          this.parameters = parametersList;
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
    changeStatus(item, status) {
      console.log("checking item and status",item,status);
      let updated_user = sessionStorage.getItem("activeUser") || "";

      const req = {
        id: item.id,
        machine_id: item.machine_id,
        parameter_id: item.parameter_id,
        updated_by: updated_user,
        // threshold_value: item.threshold_value,
        low_alert: item.low_alert,
        high_alert: item.high_alert,
        low_caution: item.low_caution,
        high_caution: item.high_caution,
        email: item.email,
        phone_number: item.phone_number,
        enable_flag: item.enable_flag,
        sms_enable_flag: item.sms_enable_flag,
        email_enable_flag: item.email_enable_flag
      };
      console.log("checking reqad item",req,item);
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/UpdateAlertsData`,
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
    },
    setGridData: function() {
      this.headersData = [
        {
          text: "Machine",
          value: "machine_name",
          align: "start",
          sortable: true,
        },
        {
          text: "Operational  Parameter",
          value: "parameter_name",
          sortable: true,
        },

        // {
        //   text: "Threshold Value",
        //   value: "threshold_value",
        //   class: "indigo--text subtitle-1",
        // },
        {
          text: "Low Alert",
          value: "low_alert",
          sortable: true,
        },
        {
          text: "High Alert",
          value: "high_alert",
          sortable: true,
        },
        {
          text: "Low Caution",
          value: "low_caution",
          sortable: true,
        },
        {
          text: "High Caution",
          value: "high_caution",
          sortable: true,
        },
        {
          text: "eMail Details",
          value: "email",
          sortable: true,
        },
        {
          text: "Phone Number",
          value: "phone_number",
          sortable: true,
        },
        { text: "Status", value: "status", sortable: true },
                { text: "Send SMS", value: "sms_enable_flag", sortable: true },
                { text: "Send Email", value: "email_enable_flag", sortable: true },

        { text: "Actions", value: "actions", sortable: true },
      ];
      let config = {
        method: "get",
        url: `${constants.backend_url}/getAlertsData`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
            this.showLoader = true;

      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          console.log("checking customers=>", response.data.data);
          this.operatorsData = response.data.data;
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          console.log("checking result data=>", result[0][1]);
          this.dataDownload = result[0][1];
                this.showLoader = false;

        })
        .catch((error) => {
                          this.showLoader = false;

          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message ===
              "This Password is not allowed, Choose different password."
          ) {
            alert(error.response.data.message);
          } else {
            alert("internal error");
            console.log("axios error", error.message);
          }
        });
    },


    editItem(item) {
            this.assignparam(item.machine_id);
      this.isEdit = true;

      this.editedIndex = this.operatorsData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      console.log("checking dATA",this.editedItem);
      if (!this.editedItem.machine_id) {
        alert("Please select Machine ");
        return;
      } else if (!this.editedItem.parameter_id) {
        alert("Please select Operational Parameter");
        return;
      }
      //  else if (!this.editedItem.threshold_value) {
      //   alert("Please Enter Threshold");
      //   return;
      // } 
      else if (!this.editedItem.email) {
        alert("Please Enter eMail ");
        return;
      }  
      else if (!this.editedItem.enable_flag) {
        alert("Please select Enable");
        return;
      }
      else if (!this.editedItem.sms_enable_flag) {
        alert("Please select SMS Enable");
        return;
      }
            else if (!this.editedItem.email_enable_flag) {
        alert("Please select SMS Enable");
        return;
      }
      let updated_user = sessionStorage.getItem("activeUser") || "";
      let user = sessionStorage.getItem("activeUser") || "";
      const req = {
        id: this.isEdit ? this.editedItem.id : undefined,
        machine_id: this.editedItem.machine_id,
                created_by: this.isEdit ? undefined : user,
        updated_by: this.isEdit ? updated_user : undefined,
        parameter_id: this.editedItem.parameter_id,
        // threshold_value: this.editedItem.threshold_value,
        email: this.editedItem.email,
        phone_number: this.editedItem.phone_number ? this.editedItem.phone_number : undefined,
        enable_flag: this.editedItem.enable_flag,
        sms_enable_flag: this.editedItem.sms_enable_flag,
                email_enable_flag: this.editedItem.email_enable_flag,

        low_alert: this.editedItem.low_alert,
        low_caution: this.editedItem.low_caution,
        high_alert: this.editedItem.high_alert,
        high_caution: this.editedItem.high_caution,
      };
      console.log("checking request data", req);
      let url = this.isEdit
        ? `${constants.backend_url}/UpdateAlertsData`
        : `${constants.backend_url}/AlertsDataEntry`;
      this.showLoader = true;
      let config = {
        method: 'post',
        url: url,
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        data: req
      };
      this.noteLastAPICallTime()
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
  },
};
</script>
<style scoped>
#sucessAlert {
  display: none;
}
#errorAlert {
  display: none;
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
