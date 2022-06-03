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
          <v-dialog v-model="dialog" max-width="400px">
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
                          :csv-title="'Customer analysis Data'"
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
                @click="addDoc"
              >
                <v-icon>icon-add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                               <span class="text-h5" v-if="!isEdit">Add  Customer Analysis Config</span>
                <span class="text-h5" v-if="isEdit">Edit Customer Analysis Config</span>

              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                      prepend-icon="icon-dpimm"
                        label="Machines"
                        :items="machineItems"
                        v-model="editeditem.machine_name"
                        v-if="!isEdit"
                        @change="setDevicesData()"
                        item-text="machine_name"
                        item-value="machine_id"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Device"
                        prepend-icon="icon-device"
                        :items="devices"
                        v-model="editeditem.device_id"
                        @change="setparametersData()"
                        item-text="device_name"
                        item-value="id"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Parameter"
                        :items="parameters"
                                                prepend-icon="icon-cog-single"

                        v-model="editeditem.parameter_id"
                        item-text="parameter_name"
                        item-value="parameter_id"
                        required
                      ></v-autocomplete>
                    </v-col>
                                        <v-col cols="12" sm="12" md="12">

                         <v-autocomplete
                      label="Config Type"
                      :items="selectProps.config_type_list"
                      v-model="editeditem.config_type"
                      @change="checkdisabled()"
                      required
                    ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Buckets"
                        v-model="editeditem.bucket_value"
                        :disabled="disabled"
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
                                crumbs: ['Home', 'Admin Menu','Customer Analysis Config'],
showLoader: false,
    dataDownload: [],
    headersData: [],
    operatorsData: [],

    pagination: {
      page: null,
      itemsPerPage: null,
      pageStart: null,
      pageStop: null,
      pageCount: null,
      itemsLength: null,
    },
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
        text: "Customer Analysis Config Management",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,
    dialogDelete: false,

    editedIndex: -1,
    editeditem: {
      id: null,
      machine_id: "",
      parameter_name: "",
      parameter_id: "",
      machine_name: "",
      device_id: "",
      device_name: "",
      config_type: "",
      sensor_parameter_id: "",
      sensor_device_id: "",
      bucket_value: "",
    },
    defaultItem: {
      machine_id: "",
      machine_name: "",
      parameter_id: "",
      parameter_name: "",
      device_id: "",
      device_name: "",
      bucket_value: "",
      config_type: "",
      sensor_parameter_id: "",
      sensor_device_id: "",
    },
    isEdit: false,
    disabled: true,
          parameters: [],
      devices: [],
      machineItems: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Machine" : "Edit Machine";
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
    this.setDevicesData();
    this.setparametersData();
    this.selectProps = {
      config_type_list: ["Cycle Time", "Availability", "Performance"],
    };
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
      let doc = new jsPDF();
      doc.text(14, 7.5, "Customer Analysis Configuration");
      doc.addImage(logo, "png", 161, 3, 35, 5.5);
      let columnHeaders = [
        "Machine",
        "Device",
        "Parameter",
        "Config Type",
        "Buckets",
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
            data.parameter_name || "",
            data.config_type || "",
            data.bucket_value || "",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Customer_Analysis_Configuration_Management ${d
          .toISOString()
          .slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },

        checkdisabled() {
      if (this.editeditem.config_type == "Availability") this.disabled = false;
      else {
        this.disabled = true;
      }
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
          let machineData = response.data.data;
          machineData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "machine_name"
            );
          });
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
    setDevicesData() {
      this.showLoader = true;
      let mac_id = null;
      for (let i = 0; i < this.machineItems.length; i++) {
        if (this.machineItems[i].machine_name == this.editeditem.machine_name) {
          mac_id = this.machineItems[i].id;
        }
      }
      let config = null;
      if (mac_id != null) {
        config = {
          method: "get",
          url: `${constants.backend_url}/getDevicesList?machine_id=${mac_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      } else {
        config = {
          method: "get",
          url: `${constants.backend_url}/getDevicesList`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          let groupData = response.data.data;
          groupData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "device_name"
            );
          });
          this.devices = groupData;
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
    setparametersData(dev_id = null) {
      console.log("checking editeditems=>", this.editeditem);
      this.showLoader = true;
      let mac_id = null;
      for (let i = 0; i < this.machineItems.length; i++) {
        if (this.machineItems[i].machine_name == this.editeditem.machine_name) {
          mac_id = this.machineItems[i].id;
        }
      }

      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].id == this.editeditem.device_id) {
          dev_id = this.devices[i].id;
        }
      }
      console.log("checking mac and deivce", mac_id, dev_id);

      let config = null;
      if (mac_id != null) {
        config = {
          method: "get",
          url: `${constants.backend_url}/getParametersData?machine_id=${mac_id}&device_id=${dev_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      } else {
        config = {
          method: "get",
          url: `${constants.backend_url}/getParametersData?`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          let deviceType = response.data.data;
          deviceType.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "parameter_name"
            );
          });
          this.parameters = deviceType;
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
    addDoc() {
      this.isEdit = false;
    },
    changeStatus(item, enable_status) {
      let updated_user = sessionStorage.getItem("activeUser") || "";
      console.log("checking item and status", item, enable_status);
      const req = {
        id: item.id,
        machine: item.machine_name,
        enable_status: enable_status,
        updated_by: updated_user,
      };
      console.log("modifying machines", req, enable_status);
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateMachineData`,
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
          sortable: true,
        },
        {
          text: "Device",
          value: "device_name",
          sortable: true,
        },
        {
          text: "Parameter",
          value: "parameter_name",
          sortable: true,
        },
        {
          text: "Config Type",
          value: "config_type",
          sortable: true,
        },
        {
          text: "Buckets Value",
          value: "bucket_value",
          sortable: true,
        },

        { text: "Actions", value: "actions", sortable: false },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getCustomerAnalysisConfig`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log("checking machines=>", response.data.data);
          let _data = response.data.data;
          this.operatorsData = response.data.data;
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          console.log("checking result data=>", result[0][1]);
          this.dataDownload = result[0][1];
          this.item = _data;
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


    editDoc(item) {
      this.editedIndex = this.operatorsData.indexOf(item);
      this.editeditem = Object.assign({}, item);
      if (item.config_type == "Availability") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      this.editeditem.machine_name = item.machine_name;
      this.setDevicesData();
      this.setparametersData(item.device_id);
      this.isEdit = true;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.parameters = null;
      this.$nextTick(() => {
        this.editeditem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (
        this.editeditem.machine_name === null ||
        this.editeditem.machine_name === ""
      ) {
        alert("Please Enter machine  ");
        return;
      } else if (
        this.editeditem.device_id === null ||
        this.editeditem.device_id === ""
      ) {
        alert("Please Enter device ");
        return;
      } else if (
        this.editeditem.parameter_id === null ||
        this.editeditem.parameter_id === ""
      ) {
        alert("Please Enter parameter ");
        return;
      } else if (
        this.editeditem.config_type === null ||
        this.editeditem.config_type === ""
      ) {
        alert("Please Enter Config Type ");
        return;
      }

      for (let i in this.parameters) {
        if (this.parameters[i].parameter_id == this.editeditem.parameter_id) {
          this.editeditem.parameter_name = this.parameters[i].parameter_name;
        }
      }
      for (let i in this.devices) {
        if (this.devices[i].id == this.editeditem.device_id) {
          this.editeditem.device_name = this.devices[i].device_name;
          this.editeditem.sensor_device_id = this.devices[i].device_id;
        }
      }
      for (let i in this.machineItems) {
        if (this.machineItems[i].machine_name == this.editeditem.machine_name)
          this.editeditem.machine_id = this.machineItems[i].id;
      }
      let updated_user = sessionStorage.getItem("activeUser") || "";
      let user = sessionStorage.getItem("activeUser") || "";
      const req = {
        id: this.isEdit ? this.editeditem.id : undefined,
        created_by: this.isEdit ? undefined : user,
        updated_by: this.isEdit ? updated_user : undefined,
        parameter_name: this.editeditem.parameter_name,
        parameter_id: this.editeditem.parameter_id,
        machine_id: this.editeditem.machine_id,
        machine_name: this.editeditem.machine_name,
        device_id: this.editeditem.device_id,
        sensor_parameter_id: this.editeditem.sensor_parameter_id,
        sensor_device_id: this.editeditem.sensor_device_id,
        device_name: this.editeditem.device_name,
        config_type: this.editeditem.config_type,
        buckets: this.editeditem.bucket_value,
      };
      let url = this.isEdit
        ? `${constants.backend_url}/updatecustomeranalysisconfig`
        : `${constants.backend_url}/CustomerAnalysisConfigurationDataEntry`;
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
