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
                          :csv-title="'Dash Board Configuration Data'"
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
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Machine*"
                        :items="machineItems"
                        v-model="editeditem.machine_name"
                        prepend-icon="icon-dpimm"
                        v-if="!isEdit"
                        @change="setparametersData()"
                        item-text="machine_name"
                        item-value="machine_id"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Parameter*"
                        :items="parameters"
                        v-model="editeditem.parameter_id"
                        item-text="parameter_name"
                        prepend-icon="icon-cog-single"
                        item-value="parameter_id"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Dashboard Name"
                        v-model="editeditem.alias_name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Group*"
                        :items="groupItems"
                        v-model="editeditem.group_id"
                        item-text="group_name"
                        item-value="group_id"
                        required
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                       <label class="radiolabel">Enable</label>
                      <v-radio-group
                        v-model="editeditem.enable_status"
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
        <v-icon small class="mr-2" @click="editItem(item)">
          icon-action
        </v-icon>
      </template>
      <template v-slot:item.enable_status="{ item }">
        <v-switch
          color="indigo"
          @change="changeStatus(item, item.enable_status)"
          false-value="N"
          true-value="Y"
          v-model="item.enable_status"
        ></v-switch>
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
    showLoader: false,
                            crumbs: ['Home', 'Admin Menu','Dash Board Configuration'],

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
    isEdit: false,
    dataDownload: [],
    parameters: [],
    machineItems: [],
    groupItems: [],
    selectProps: {
      phones: [],
    },

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
        text: "Dash Board Management",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,

    editedIndex: -1,
    editeditem: {
      id: null,
      machine_id: "",
      parameter_name: "",
      parameter_id: "",
      machine_name: "",
      group_id: "",
      group_name: "",
      enable_status: "Y",
      alias_name: null,
    },
    defaultItem: {
      machine_id: "",
      machine_name: "",
      parameter_id: "",
      parameter_name: "",
      group_id: "",
      group_name: "",
      enable_status: "",
      alias_name: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Dash Board Config" : "Edit Dash Board Config";
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
    this.setGroupData();
    this.setparametersData();
  },

  methods: {
                                          selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
      
      console.log(crumb);
    },
        changeActivestatus(item) {

      this.editeditem.enable_status = item;
    },
    createPDF() {
      let content = this.$refs["theDataTable"];
      console.log("pagination", this.pagination);
      let doc = new jsPDF();
      doc.text(14, 7.5, "Dash Board Configuration");
      doc.addImage(logo, "png", 161, 3, 35, 5.5);
      let columnHeaders = ["Machine", "Parameter", "Group", "Status"];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.parameter_name || "",
            data.alias_name || "",
            data.group_name || "",
            data.enable_status === "Y" ? "On" : "Off",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Dash_Board_Configuration_Management ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },
    changeStatus(item, enable_status) {
      console.log("checking item and status", item, enable_status);
      let updated_user = sessionStorage.getItem("activeUser") || "";
      console.log("checking updated user", updated_user);

      const req = {
        id: item.id,
        // machine_id: item.machine_id,
        // parameter_name: item.parameter_name,
        // updated_by: updated_user,
        //    group_name: item.group_name,
        // machine_id: item.machine_id,
        active: enable_status,
      };
      // console.log("modifying machines", req, enable_status);
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateDashBoardConfiguration`,
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
          text: "Parameter",
          value: "parameter_name",
          sortable: true,
        },
        {
          text: "Dashboard Name",
          value: "alias_name",
          sortable: true,
        },
        {
          text: "Group",
          value: "group_name",
          sortable: true,
        },
        {
          text: "Status",
          value: "enable_status",
          sortable: true,
        },

        { text: "Actions", value: "actions", sortable: true },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getDashBoardConfiguration`,
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
    setGroupData(mac_id = null) {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getGroupNames?machine_id=${mac_id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      if (mac_id == null) {
        config = {
          method: "get",
          url: `${constants.backend_url}/getGroupNames`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
      }
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log("response--getMachineNames", response.data);
          let groupData = response.data.data;
          groupData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "group_name"
            );
          });
          console.log("cehcking group dayta=>", groupData);
          let replaceKeyData = this.replaceKey(groupData);
          console.log("replace key=>", replaceKeyData);
          this.groupItems = groupData;
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
    setparametersData(mac_id = null) {
      console.log("checking machine_id", this.editeditem.machine_id);

      this.showLoader = true;
      //   console.log("this.machineItems=>",this.machineItems);
      // Object.keys(this.machineItems).forEach((key) => {
      // key.forEach((machi)=>{
      //     console.log(machi.id,machi.machine_name);
      // });});
      for (let i = 0; i < this.machineItems.length; i++) {
        // console.log("checking items",this.machineItems[i],this.editeditem.machine_name);
        if (this.machineItems[i].machine_name == this.editeditem.machine_name) {
          mac_id = this.machineItems[i].id;
        }
      }
      //   console.log("checking edited item",this.editeditem, mac_id);

      //   let machine_id =
      let config = null;
      if (mac_id != null) {
        //   console.log("checking edited item inside",this.editeditem);
        config = {
          method: "get",
          url: `${constants.backend_url}/getParametersData?machine_id=${mac_id}`,
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
      this.setGroupData(mac_id);
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          //   console.log("response--getParametersData", response.data);
          let deviceType = response.data.data;
          deviceType.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "parameter_name"
            );
          });
          //   console.log("cehcking machine dayta=>", deviceType);
          let replaceKeyData = this.replaceKey(deviceType);
          console.log("replace key=>", replaceKeyData);
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
    editItem(item) {
      this.setparametersData(item.machine_id);
      this.setGroupData(item.machine_id);
      this.isEdit = true;

      this.editedIndex = this.operatorsData.indexOf(item);
      this.editeditem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editeditem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (
        this.editeditem.parameter_id === null ||
        this.editeditem.parameter_id === ""
      ) {
        alert("Please Enter parameter ");
        return;
      } else if (
        this.editeditem.enable_status === null ||
        this.editeditem.enable_status === ""
      ) {
        alert("Please enable or disable ");
        return;
      } else if (
        this.editeditem.machine_name === null ||
        this.editeditem.machine_name === ""
      ) {
        alert("Please Enter machine name ");
        return;
      } else if (
        this.editeditem.group_id === null ||
        this.editeditem.group_id === ""
      ) {
        alert("Please Enter group name ");
        return;
      }
      console.log("checking edit=>", this.editeditem);
      // console.log("checking machines", this.machineItems);

      for (let i in this.parameters) {
        if (this.parameters[i].parameter_id == this.editeditem.parameter_id) {
          this.editeditem.parameter_name = this.parameters[i].parameter_name;
        }
      }
      for (let i in this.machineItems) {
        // console.log("checkign inside for", this.machineItems[i]);
        if (this.machineItems[i].machine_name == this.editeditem.machine_name)
          this.editeditem.machine_id = this.machineItems[i].id;
      }
      let updated_user = sessionStorage.getItem("activeUser") || "";
      let user = sessionStorage.getItem("activeUser") || "";
      console.log("checking parameters=>", this.parameters);
      const req = {
        id: this.isEdit ? this.editeditem.id : undefined,
        created_by: this.isEdit ? undefined : user,
        updated_by: this.isEdit ? updated_user : undefined,
        parameter_name: this.editeditem.parameter_name,
        parameter_id: this.editeditem.parameter_id,
        machine_id: this.editeditem.machine_id,
        machine_name: this.editeditem.machine_name,
        alias_name: this.editeditem.alias_name,
        group_name: this.editeditem.group_name,
        group_id: this.editeditem.group_id,
        active: this.editeditem.enable_status,
      };
      console.log("checking req", req);
      let url = this.isEdit
        ? `${constants.backend_url}/updateDashBoardConfiguration`
        : `${constants.backend_url}/DashBoardConfigurationDataEntry`;
      console.log("req is", req);
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#sucessAlert {
  display: none;
}
#errorAlert {
  display: none;
}
</style>
