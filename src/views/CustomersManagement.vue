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
</v-row>       </div>
    <v-data-table
      ref="theDataTable"
      :headers="headersData"
      :items="operatorsData"
      :search="search"
      :items-per-page="5"
      @pagination="pagination = $event"
    >
      <template v-slot:item.password="{ item }">
        <v-text-field :type="type" label="******" disabled>{{
          item.password
        }}</v-text-field>
      </template>
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
                          :csv-title="'Customers Data'"
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
                      <v-text-field
                        label="Customer Name"
                        v-model="editeditem.customer_name"
                        prepend-icon="icon-user"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-autocomplete
                        label="Location"
                        :items="locationData"
                        v-model="editeditem.device_type_id"
                        item-text="location_name"
                        item-value="id"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Admin Name"
                        v-model="editeditem.user_name"
                        prepend-icon="icon-user"
                        required
                        v-if="!isEdit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                         <v-text-field
                      label="Email"
                      v-model="editeditem.email"
                      :rules="emailRules"
                      required
                      v-if="!isEdit"
                    ></v-text-field>
                       </v-col>
                    <v-col cols="12" sm="12" md="12">
                                          <v-text-field
                      label="Admin Password"
                      :type="type"
                      prepend-icon="icon-lock"
                      v-model="editeditem.password"
                      required
                    ></v-text-field>
                    <small
                      v-if="editeditem.password"
                      id="passwordHelp"
                      class="form-text text-muted"
                      >Password should contain
                      <span :class="has_minimum_length ? 'has_required' : ''"
                        >atleast 8 characters</span
                      >,
                      <span :class="has_lowercase ? 'has_required' : ''"
                        >1 lowercase letter</span
                      >,
                      <span :class="has_uppercase ? 'has_required' : ''"
                        >1 Uppercase letter</span
                      >,
                      <span :class="has_number ? 'has_required' : ''"
                        >1 number</span
                      >,
                      <span :class="has_special ? 'has_required' : ''"
                        >1 special character.</span
                      >, and
                      <span :class="equalto_username ? 'has_required' : ''"
                        >Should not be same as User Name.</span
                      >
                    </small>
                       </v-col>
                    <v-col cols="12" sm="12" md="12">
                      
                    <v-text-field
                      label="Price per kWh"
                      v-model="editeditem.kwh_price"
                      required
                    ></v-text-field>
                     </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-checkbox
                      v-model="checkbox"
                      @click="showPassword"
                      :label="btnText"
                    ></v-checkbox>
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
              <template v-slot:item.kwh_price="{ item }">
          <font-awesome-icon
            icon="rupee-sign"
            style="color: black;"
            transform="shrink-2"
            size="sm"
          />
          {{ item.kwh_price }}
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

import Vue from "vue";
import axios from "axios";
import constants from "../constants";
import VueJsonToCsv from "vue-json-to-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import router from "../router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const logo = require("../assets/Mobil_Serv-SM.png");
const organizationId = parseInt(sessionStorage.getItem("organizationId"));
library.add(faRupeeSign);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

export default {
  components: {
    VueJsonToCsv,
    Breadcrumb,
    LoaderProgress
  },
  data: () => ({
          crumbs: ['Home', 'Admin Menu','Customers Management'],
showLoader: false,
    btnText: "Show Password",
    checkbox: false,
    locationData: [],
    isEdit: false,
    dataDownload: [],
    headersData: [],
    operatorsData: [],
    type: "password",
          emailRules: [
        (v) =>
          !v ||
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) ||
          "E-mail must be valid",
      ],
      validEmail: false,
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
         //password validation
      has_minimum_length: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      equalto_username: false,

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
        text: "Customers Management",
        disabled: true,
      },
    ],
    search: "",
    dialog: false,
    dialogDelete: false,

    editedIndex: -1,
    editeditem: {
      id: null,
      user_id: null,
      kwh_price: "",
      customer_name: "",
      user_name: "",
      email: "",
      password: "",
      created_by: "",
    },
    defaultItem: {
      kwh_price: "",
      customer_name: "",
      user_name: "",
      email: "",
      password: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Customer" : "Edit Customer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
        "editeditem.email"() {
      this.validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.editeditem.email
      );
    },
    "editeditem.password"() {
      this.has_minimum_length = this.editeditem.password.length > 8;
      /* eslint-disable-next-line */
      this.has_number = /\d/.test(this.editeditem.password);
      /* eslint-disable-next-line */
      this.has_lowercase = /[a-z]/.test(this.editeditem.password);
      /* eslint-disable-next-line */
      this.has_uppercase = /[A-Z]/.test(this.editeditem.password);
      /* eslint-disable-next-line */
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(
        this.editeditem.password
      );
      /* eslint-disable-next-line */
      this.equalto_username =
        this.editeditem.password !== this.editeditem.user_name;
    },
  
  },

  created() {
    this.setGridData();
    this.getLocation();
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
      doc.text(14, 7.5, "Customer Configuration");
      doc.addImage(logo, "png", 161, 3, 35, 5.5);
      let columnHeaders = ["Customer Name", "Admin User", "Admin Password"];
      let rows = [];
      content.items.forEach((data, index) => {
        if (
          index >= this.pagination.pageStart &&
          index < this.pagination.pageStop
        ) {
          let tempRow = [
            data.customer_name || "",
            data.user_name || "",
            data.password || "",
          ];
          rows.push(tempRow);
        }
      });
      doc.setFontSize(9);
      doc.autoTable(columnHeaders, rows, { startY: 11.5 });
      let d = new Date();
      doc.save(
        `Customer_Management ${d.toISOString().slice(0, 10) +
          " " +
          d
            .toTimeString()
            .split("(")[0]
            .slice(0, -1)}.pdf`
      );
    },
    addDoc() {
      this.isEdit = false;
    },
    getLocation() {
      let config = {
        method: "get",
        url: `${constants.backend_url}/getLocations`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          console.log("checking locations=>", response.data.data);
          // this.operatorsData = response.data.data;
          let result = [];
          for (let i in response.data) result.push([i, response.data[i]]);
          console.log("checking result data=>", result[0][1]);
          this.locationData = result[0][1];
        })
        .catch((error) => {
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
          text: "Customer Name",
          value: "customer_name",
          align: "start",
          sortable: true,
        },
        {
          text: "Admin User",
          value: "user_name",
          //   align: "start",
          sortable: true,
        },

        {
          text: "Admin Password",
          value: "password",
          sortable: false,
        },
        {
          text: "Price per kWh",
          value: "kwh_price",
          sortable: true,
        },

        { text: "Actions", value: "actions", sortable: false },
      ];
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getCustomers`,
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

      this.editedIndex = this.operatorsData.indexOf(item);
      this.editeditem = Object.assign({}, item);
      this.dialog = true;
    },

    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
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
        this.editeditem.customer_name === null ||
        this.editeditem.customer_name === ""
      ) {
        alert("Please Enter Customer ");
        return;
      } else if (
        this.editeditem.user_name === null ||
        this.editeditem.user_name === ""
      ) {
        alert("Please Enter Admin name ");
        return;
      } else if (
        this.editeditem.email === null ||
        this.editeditem.email === ""
      ) {
        if (!this.isEdit) {
          alert("Please Enter Admin name ");
          return;
        }
      } else if (!this.validEmail) {
        if (!this.isEdit) {
          alert("Please enter valid email");
          return;
        }
      } else if (
        this.editeditem.password &&
        this.editeditem.password !== "" &&
        this.editeditem.password !== null &&
        (!this.has_minimum_length ||
          !this.has_number ||
          !this.has_lowercase ||
          !this.has_uppercase ||
          !this.has_special ||
          !this.equalto_username)
      ) {
        alert("Please make sure that proper password is entered");
        return;
      }
      let created_user = sessionStorage.getItem("activeUser") || "";
      let updated_user = sessionStorage.getItem("activeUser") || "";

      console.log("cehcking is editemd=>", this.isEdit, this.editeditem.id);
      const req = {
        user_id: this.isEdit ? this.editeditem.user_id : undefined,
        admin_email: !this.isEdit ? this.editeditem.email : undefined,
        id: this.isEdit ? this.editeditem.id : undefined,
        organization: this.editeditem.customer_name,
        admin_name: this.editeditem.user_name,
        creator_organization_id: organizationId,
        created_by: this.isEdit ? undefined : created_user,
        updated_by: this.isEdit ? updated_user : undefined,
        admin_password:
          this.editeditem.password === ""
            ? undefined
            : this.editeditem.password,
        kwh_price: this.editeditem.kwh_price,
      };
      console.log("req is", req);

      let url = this.isEdit
        ? `${constants.backend_url}/UpdateCustomerData`
        : `${constants.backend_url}/customerDataEntry`;
      // let url = `${constants.backend_url}/customerDataEntry`;
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
          } else if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message ===
              "This Password is not allowed, Choose different password."
          ) {
            alert(error.response.data.message);
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
.has_required {
  text-decoration: line-through;
  color: #689868;
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
