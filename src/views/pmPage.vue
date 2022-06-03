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
</v-row>  </div>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->

    <v-data-table
    ref="theDataTable"
      :headers="headersData"
      :items="operatorsData"
      :search="search"
      class="elevation-1"
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
                          :csv-title="'Preventive Maintanance Data'"
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
                @click="addDoc()"
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
                        multiple
                        item-text="machine_name"
                        item-value="id"
                        label="Machine Id"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.message_type"
                        prepend-icon="icon-message"
                        label="Type Message"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.frequency"
                        label="Frequency"
                        prepend-icon="icon-frequency"
                        @keypress="onlyNumber"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6" md="4">
                      <v-select
                        :items="selectProps.frequency_durations"
                        prepend-icon="icon-clock"
                        v-model="editedItem.frequency_duration"
                        label="Duration"
                      ></v-select>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <input type="date" v-model="editedItem.due_date" style="margin-top: 20px; "/>
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
          @change="changeStatus(item, item.enable_flag)"
          false-value="N"
          true-value="Y"
          v-model="item.enable_flag"
        ></v-switch>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          icon-action
        </v-icon>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template> -->
    </v-data-table>
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
    showLoader:false,
          crumbs: ['Home', 'Admin Menu','Preventive Maintenance Schedule'],

        pagination: {
      page: null,
      itemsPerPage: null,
      pageStart: null,
      pageStop: null,
      pageCount: null,
      itemsLength: null,
    },
    machineItems: [],
    operatorsData: [],
    dataDownload: [],
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
        text: "Preventive Maintenance Schedule",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,

    editedIndex: -1,
    editedItem: {
      id: null,
      machine_id: "",
      message_type: "",
      frequency: 0,
      frequency_duration: "days",
      due_date: "",
      enable_flag: "Y",
    },
    defaultItem: {
      machine_id: "",
      message_type: "",
      frequency: 0,
      frequency_duration: "days",
      due_date: "",
      enable_flag: "Y",
    },
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
    // this.initialize();
    this.setGridData();
    this.setMachineData();
    this.selectProps = {
      enable: ["Y", "N"],
      frequency_durations: ["days", "months", "weeks"],
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
      console.log("pagination", this.pagination);
      let doc = new jsPDF('latitude');
      doc.text(14, 7.5, "Preventive Maintainance Schedule Configuration");
      doc.addImage(logo, 'png', 247, 3, 35, 5.5)
      let columnHeaders = [
        "Machine(s)",
        "Message",
        "Frequency",
        "Duration",
        "Due Date",
        "Status"
      ];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.machine_name || "",
            data.message_type || "",
            data.frequency || "",
            data.frequency_duration || "",
            data.due_date || "",
            data.status || "",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Preventive_Maintainance ${
          d.toISOString().slice(0, 10) +
          " " +
          d.toTimeString().split("(")[0].slice(0, -1)
        }.pdf`
      );
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
          // this.machineItems = response.data.data;
          // console.log(this.machineItems);
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
    changeActivestatus(item) {
      document.querySelector("#errorAlert").style.display = "none";

      this.editeditem.enable_status = item;
    },
    setGridData: function() {
      this.headersData = [
        {
          text: "Machine(s)",
          value: "machine_name",
          sortable: true,
        },
        {
          text: "Type Message",
          value: "message_type",
          sortable: true,
        },
        {
          text: "Frequency",
          value: "frequency",
          sortable: true,
        },
        {
          text: "Duration",
          value: "frequency_duration",
          sortable: true,
        },
        {
          text: "Due Date",
          value: "due_date",
          sortable: true,
        },
        { text: "Status", value: "status", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getPreventiveMaintainceData`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log(
            "incoming preventive maitainance schedule response of",
            response.data.data
          );
          console.log("checking machines in data", this.machineItems);
          this.operatorsData = response.data.data.reverse();
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          console.log("checking result data=>", result[0][1]);
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
    initialize() {
      this.oeemonitoring = [
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: true,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
        {
          machine: "CAT 3306",
          typemessage: "checking again",
          frequency: "25",
          duration: "Months",
          duedate: "08/23/2019",
          status: false,
        },
      ];
    },

    editItem(item) {
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

    formatDateData(x) {
      var someDate = new Date();
      someDate.setDate(someDate.getDate() + x); //number  of days to add, e.x. 15 days
      var dateFormated = someDate.toISOString().substr(0, 10);
      console.log(dateFormated);
      return dateFormated;
    },
    save() {
      if (
        this.editedItem.machine_id === null ||
        this.editedItem.machine_id === ""
      ) {
        alert("Please select Machine");
        return;
      } else if (
        this.editedItem.message_type === null ||
        this.editedItem.message_type === ""
      ) {
        alert("Please Enter Message. ");
        return;
      } else if (
        this.editedItem.frequency === null ||
        this.editedItem.frequency === "" ||
        this.editedItem.threshold === 0
      ) {
        alert("Please Enter freqency.");
        return;
      } else if (
        this.editedItem.frequency_duration === null ||
        this.editedItem.frequency_duration === ""
      ) {
        alert("Please Enter frequency duration. ");
        return;
      }
      // else if(this.editedItem.due_date===null || this.editedItem.due_date===""){
      //   alert("Please Enter due date. ");
      //   return;
      // }
      else if (
        this.editedItem.enable === null ||
        this.editedItem.enable === ""
      ) {
        alert("Please select Enable");
        return;
      }

      if (this.editedItem.frequency_duration == "days") {
        // console.log("frequency while assigning",this.editedItem.frequency);
        // console.log("frequency duration while assigning",this.editedItem.frequency_duration);
        console.log(
          "frequency to due date assignment number",
          this.editedItem.frequency * 1
        );
        let _check = this.formatDateData(this.editedItem.frequency * 1);
        console.log("checking after format", _check);
        this.editedItem.due_date = _check;
        console.log(
          "hcekcing after assigning datetime to duedate",
          this.editedItem.due_date
        );
      } else if (this.editedItem.frequency_duration == "weeks") {
        console.log(
          "frequency to due date assignment number",
          this.editedItem.frequency * 1
        );
        let _check = this.formatDateData(this.editedItem.frequency * 7);
        console.log("checking after format", _check);
        this.editedItem.due_date = _check;
        // document.getElementById("dueDate").value=_check;
        console.log(
          "hcekcing after assigning datetime to duedate",
          this.editedItem.due_date
        );
      } else if (this.editedItem.frequency_duration == "months") {
        console.log(
          "frequency to due date assignment number",
          this.editedItem.frequency * 1
        );
        let _check = this.formatDateData(this.editedItem.frequency * 30);
        console.log("checking after format", _check);
        this.editedItem.due_date = _check;
        // document.getElementById("dueDate").value=_check;
        console.log(
          "hcekcing after assigning datetime to duedate",
          this.editedItem.due_date
        );
      }
      let created_user = sessionStorage.getItem("activeUser") || "";
      let updated_user = sessionStorage.getItem("activeUser") || "";

      const req = {
        id: this.isEdit ? this.editedItem.id : undefined,
        created_by: this.isEdit ? undefined : created_user,
        updated_by: this.isEdit ? updated_user : undefined,
        machine_id: this.editedItem.machine_id,
        type_message: this.editedItem.message_type,
        frequency: this.editedItem.frequency,
        frequency_duration: this.editedItem.frequency_duration,
        due_date: this.editedItem.due_date,
        status: this.editedItem.enable_flag,
      };
      console.log("before checking edit or not", req);
      console.log("frequency duration", this.editedItem.frequency_duration);
      let url = this.isEdit
        ? `${constants.backend_url}/UpdatePreventiveMaintainanceData`
        : `${constants.backend_url}/PreventiveMaintainanceDataEntry`;
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
          console.log("response save operator data ", response.data);
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
            console.log("axios error", error.message);
            document.querySelector("#errorAlert").style.display = "block";
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
</style>