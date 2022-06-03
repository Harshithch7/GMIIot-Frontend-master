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
                          :csv-title="'Machine Data'"
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
                @click="addDoc()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>icon-add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5" v-if="!isEdit">Add New Machine</span>
                <span class="text-h5" v-if="isEdit">Edit Machine Details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Machine "
                        v-model="editeditem.machine_name"
                        prepend-icon="icon-dpimm"
                        required
                      ></v-text-field>
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
                  crumbs: ['Home', 'Admin Menu','Machines Management'],
showLoader: false,
    dataDownload: [],
    isEdit: false,
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
        text: "Machines Management",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,
    dialogDelete: false,

    editedIndex: -1,
    editeditem: {
      id: null,
      machine_name: "",
      enable_status: "Y",
      created_by: null,
      updated_by: null,
    },
    defaultItem: {
      machine_name: "",
      enable_status: "",
      created_by: null,
      updated_by: null,
    },
  }),

  computed: {
   
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
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
    addDoc() {
      this.isEdit = false;
    },
    createPDF() {
      let content = this.$refs["theDataTable"];
      console.log("pagination", this.pagination);
      let doc = new jsPDF();
      doc.text(14, 7.5, "Machine Configuration");
      doc.addImage(logo, "png", 161, 3, 35, 5.5);
      let columnHeaders = ["Machine", "Status"];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.enable_status === "Y" ? "On" : "Off",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Machines_Management ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },
    changeStatus(item, enable_status) {
      document.querySelector("#errorAlert").style.display = "none";

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
    changeActivestatus(item) {
      document.querySelector("#errorAlert").style.display = "none";

      this.editeditem.enable_status = item;
    },
    setGridData: function() {
      this.headersData = [
        {
          text: "Machine",
          align: "start",
          sortable: true,
          value: "machine_name",
        },
        {
          text: "Status",
          // align: "end",
          sortable: false,
          value: "enable_status",
        },
        { text: "Action", value: "actions", sortable: false, align: "end" },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachines`,
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

    editItem(item) {
      this.isEdit = true;
      console.log("checking item", item);
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
      document.querySelector("#errorAlert").style.display = "none";

      console.log("checking edited item", this.editeditem);
      if (
        this.editeditem.machine_name === null ||
        this.editeditem.machine_name === ""
      ) {
        alert("Please Enter Machine ");
        return;
      } else if (
        this.editeditem.enable_status === null ||
        this.editeditem.enable_status === ""
      ) {
        alert("Please Enter Admin name ");
        return;
      }

      let user = sessionStorage.getItem("activeUser") || "";
      let updated_user = sessionStorage.getItem("activeUser") || "";

      const req = {
        id: this.isEdit ? this.editeditem.id : undefined,
        created_by: this.isEdit ? undefined : user,
        updated_by: this.isEdit ? updated_user : undefined,
        machine: this.editeditem.machine_name,
        enable_status: this.editeditem.enable_status,
      };
      let url = this.isEdit
        ? `${constants.backend_url}/updateMachineData`
        : `${constants.backend_url}/machineDataEntry`;
      console.log("req is", req);
      // console.log("checkingf item=>", this.item);
      // this.isEditing = !this.isEditing;
      // this.hasSaved = true;
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
