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
      :items-per-page="5"
      @pagination="pagination = $event"
    >
      <template v-slot:item.enable_status="{ item }">
        <v-switch
          color="indigo"
          @click="changeStatus(item, item.enable_status, 'active')"
          false-value="N"
          true-value="Y"
          v-model="item.enable_status"
        ></v-switch>
        <!-- <v-icon
          x-large
          @click="changeStatus(item, 'N', 'active')"
          color="green"
          v-if="item.enable_status === 'Y'"
        >
          mdi-toggle-switch
        </v-icon>
        <v-icon
          x-large
          @click="changeStatus(item, 'Y', 'active')"
          color="red"
          v-if="item.enable_status === 'N'"
        >
          mdi-toggle-switch-off
        </v-icon> -->
      </template>
      <template v-slot:item.check_data="{ item }">
        <v-switch
          color="indigo"
          @click="changeStatus(item, item.check_data, 'check_data')"
          false-value="N"
          true-value="Y"
          v-model="item.check_data"
        ></v-switch>
        <!-- <v-icon
          x-large
          @click="changeStatus(item, 'N', 'check_data')"
          color="green"
          v-if="item.check_data === 'Y'"
        >
          mdi-toggle-switch
        </v-icon>
        <v-icon
          x-large
          @click="changeStatus(item, 'Y', 'check_data')"
          color="red"
          v-if="item.check_data === 'N'"
        >
          mdi-toggle-switch-off
        </v-icon> -->
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-col cols="12" sm="6" md="6">
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

          <v-dialog v-model="dialog" max-width="600px">
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
                          :csv-title="'Devices Data'"
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
                @click="addDoc()"
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
                <span class="text-h5" >{{formTitle}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        label="Machines"
                        :items="machineItems"
                        prepend-icon="icon-dpimm"
                        menu-props="auto"
                        hide-details
                        single-line
                        v-model="editeditem.machine_name"
                        v-if="!isEdit"
                        item-text="machine_name"
                        item-value="machine_id"
                        required
                      ></v-autocomplete>
                    
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                     <v-text-field
                      label="Device "
                      v-model="editeditem.device_name"
                      prepend-icon="icon-device"
                      required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      label="Sensor Device ID "
                      prepend-icon="icon-device"
                      v-model="editeditem.device_id"
                      required
                    ></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                      label="Device type"
                      :items="deviceTypes"
                      prepend-icon="icon-device"
                      v-model="editeditem.device_type_id"
                      item-text="type_name"
                      item-value="id"
                      required
                    ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6 " md="6">
                      <label class="radiolabel">Enable Device</label>
                      <v-radio-group
                        v-model="editeditem.enable_status"
                        row
                        class="radiogroup"
                      >
                        <v-radio
                          label="Yes"
                          value="Y"
                        ></v-radio>
                        <v-radio
                          label="No"
                          value="N"
                        ></v-radio>
                      </v-radio-group>
                      <label class="radiolabel">Data Check</label>
                      <v-radio-group
                        v-model="editeditem.check_data"
                        row
                        class="radiogroup"
                      >
                        <v-radio
                          label="Yes"
                          value="Y"
                        ></v-radio>
                        <v-radio
                          label="No"
                          value="N"
                        ></v-radio>
                      </v-radio-group>
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
        <v-switch color="success" v-model="item.value"></v-switch>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small  @click="editItem(item)" >
          icon-action
        </v-icon>
      </template>
      <template v-slot:item.device_parameters="{ item }">
        <v-btn class="ma-2" outlined color="indigo" @click="onButtonClick(item)"
          >Parameters Setup
        </v-btn>
      </template>
   
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
            <div id="sucessAlert">
      <v-alert outlined type="success" text> Data Saved successfully. </v-alert>
    </div>
    <div id="errorAlert">
      <v-alert outlined type="warning" prominent border="left">
        Error while saving the data.
      </v-alert>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

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
    dataDownload: [],
                      crumbs: ['Home', 'Admin Menu','Devices Management'],
showLoader: false,
    machineItems: [],
    isEdit: false,
    deviceTypes: [],
    headersData: [],
    // search: "",
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
        text: "Devices Management",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,

    editedIndex: -1,
    editeditem: {
      id: null,
      machine_id: "",
      device_name: "",
      device_id: "",
      machine_name: "",
      enable_status: "Y",
      check_data: "Y",
      device_type_id: "",
    },
    defaultItem: {
      machine_id: "",
      device_name: "",
      device_id: "",
      enable_status: "",
      machine_name: "",
      device_type_id: "",
    },
    machinelist: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Device" : "Edit Device";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
 
  },

  created() {
    // this.initialize();
        this.setMachineData();
    this.setDeviceTypeData();

    this.setGridData();
  },

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
      let doc = new jsPDF();
      doc.text(14, 7.5, "Device Configuration");
      doc.addImage(logo, 'png', 161, 3, 35, 5.5)
      let columnHeaders = [
        "Machine",
        "Device",
        "Device Type",
        "Status",
        "Check Data"
      ];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.device_name || "",
			data.device_id || "",
            data.device_type_name || "",
            data.enable_status === "Y" ? "On" : "Off",
            data.check_data === "Y" ? "On" : "Off",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Devices_Management ${
          d.toISOString().slice(0, 10) +
          " " +
          d.toTimeString().split("(")[0].slice(0, -1)
        }.pdf`
      );
    },
        replaceKey(oldObject) {
      let newWordsObject = {};
      Object.keys(oldObject).forEach((key) => {
        if (key === "machine_id") {
          let newPair = { ["machine_id"]: oldObject[key] };
          newWordsObject = { ...newWordsObject, ...newPair };
        } else {
          newWordsObject = { ...newWordsObject, [key]: oldObject[key] };
        }
      });
    },
        setMachineData() {
      this.showLoader = true;
      let config = {
          method: 'get',
          url: `${constants.backend_url}/getMachineNames`,
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        };
      this.noteLastAPICallTime()
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
          // console.log("cehcking machine dayta=>", machineData);
          let replaceKeyData = this.replaceKey(machineData);
          console.log("replace key=>", replaceKeyData);
          this.machineItems = machineData;
        })
        .catch((error) => {
          this.showLoader = false;
            if (error.response && error.response.status === 401) {
                sessionStorage.clear();
                router.push("/login");
            } else {
                console.log("axios error", error.message);
            }
        });
    },
        setDeviceTypeData() {
      this.showLoader = true;
      let config = {
        method: 'get',
        url: `${constants.backend_url}/getDeviceType`,
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      };
      this.noteLastAPICallTime()
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log("response--getDeviceTypes", response.data);
          let deviceType = response.data.data;
          deviceType.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "type_name"
            );
          });
          // console.log("cehcking machine dayta=>", deviceType);
          let replaceKeyData = this.replaceKey(deviceType);
          console.log("replace key=>", replaceKeyData);
          this.deviceTypes = deviceType;
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
        addDoc() {
      this.isEdit = false;
    },
    editItem(item) {
      this.isEdit = true;
      console.log("checking item", item);
      this.editedIndex = this.operatorsData.indexOf(item);
      this.editeditem = item;
      this.dialog = true;
    },
    changeStatus(item, status, type_of_status) {
                  document.querySelector("#errorAlert").style.display = "none";

      let updated_user = sessionStorage.getItem("activeUser") || "";
      console.log("checking item and status", item, status);
      if (type_of_status === "active") {
        this.enable_flag_status = status;
      } else {
        this.enable_flag_status = item.enable_status;
      }
      if (type_of_status === "check_data") {
        this.check_data_status = status;
      } else {
        this.check_data_status = item.check_data;
      }
      const req = {
        id: item.id,
        device_name: item.device_name,
        device_id: item.device_id,
        updated_by: updated_user,
        device_type_id: item.device_type_id,
        machine_id: item.machine_id,
        enable_status: this.enable_flag_status,
        check_data: this.check_data_status,
      };
      // console.log("modifying machines", req, enable_status);
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateDeviceData`,
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
    onButtonClick(item) {
      // console.log("checking button data", item);
      this.$router.push({
        name: "parametersManagement",
        params: { previousIds: item },
      });
    },
    setGridData: function() {
      this.headersData = [
        {
          text: "Machine",
          value: "machine_name",
          sortable: true,
        },
        {
          text: "Device",
          value: "device_name",
          sortable: true,
        },
        {
          text: "Sensor Device ID",
          value: "device_id",
          sortable: true,
        },
        {
          text: "Device Type",
          value: "device_type_name",
          sortable: true,
        },
        {
          text: "Status",
          value: "enable_status",
          sortable: true,
        },
        {
          text: "Check Data",
          value: "check_data",
          sortable: true,
        },
        { text: "Actions", value: "actions", sortable: true },
        {
          text: "Parameters Setup",
          value: "device_parameters",
          

          sortable: false,
        },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getDevices`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
          console.log("checking loader in devices",sessionStorage.getItem('loaderchange'));

          sessionStorage.setItem("loaderchange", 1);
                    console.log("checking loader in devices after assigning 1",sessionStorage.getItem('loaderchange'));


      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
                    sessionStorage.setItem("loaderchange", 1);

          this.showLoader = false;
          // console.log("checking machines=>", response.data.data);
          let _data = response.data.data;
          this.operatorsData = response.data.data;
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          // console.log("checking result data=>", result[0][1]);
          this.dataDownload = result[0][1];
          this.item = _data;
        })
        .catch((error) => {
          this.showLoader = false;
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("axios error", error.message);
          }
        });
    },
    initialize() {
      this.oeemonitoring = [
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
        {
          machine: "DPIMMO1",
          device: "APQ",
          devicetype: "Energy",
          status: true,
        },
      ];
    },

    // editItem(item) {
    //   this.isEdit = true;
    //         console.log("checking item", item);

    //   this.editedIndex = this.operatorsData.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

 
  

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editeditem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },


    save() {
                  document.querySelector("#errorAlert").style.display = "none";

      if (
        this.editeditem.device_name === null ||
        this.editeditem.device_name === ""
      ) {
        alert("Please Enter Device ");
        return;
      } else if (
        this.editeditem.enable_status === null ||
        this.editeditem.enable_status === ""
      ) {
        alert("Please enable or disable ");
        return;
      } else if (
        this.editeditem.check_data === null ||
        this.editeditem.check_data === ""
      ) {
        alert("Please enable or disable checking data");
        return;
      } else if (
        this.editeditem.machine_name === null ||
        this.editeditem.machine_name === ""
      ) {
        alert("Please Enter machine name ");
        return;
      }
      // console.log("checking edit=>", this.editeditem);
      // console.log("checking machines", this.machineItems);
      for (let i in this.machineItems) {
        // console.log("checkign inside for", this.machineItems[i]);
        if (this.machineItems[i].machine_name == this.editeditem.machine_name)
          this.editeditem.machine_id = this.machineItems[i].id;
      }
      let updated_user = sessionStorage.getItem("activeUser") || "";
      let user = sessionStorage.getItem("activeUser") || "";

      const req = {
        id: this.isEdit ? this.editeditem.id : undefined,
        created_by: this.isEdit ? undefined : user,
        updated_by: this.isEdit ? updated_user : undefined,
        device_name: this.editeditem.device_name,
		device_id: this.editeditem.device_id,
        device_type_id: this.editeditem.device_type_id,
        machine_id: this.editeditem.machine_id,
        machine_name: this.editeditem.machine_name,
        enable_status: this.editeditem.enable_status,
        check_data: this.editeditem.check_data,
      };
      let url = this.isEdit
        ? `${constants.backend_url}/updateDeviceData`
        : `${constants.backend_url}/deviceDataEntry`;
      // console.log("req is", req);
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