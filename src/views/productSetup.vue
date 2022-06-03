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

    <v-card>
      <v-data-table
        ref="theDataTable"
        :headers="headersData"
        :items="productsData"
        :search="search"
        :items-per-page="5"
        @pagination="pagination = $event"
      >
        <!-- Toolbar template -->
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
            <v-btn
              v-if="manipulationsMade"
              color="indigo"
              outlined
              small
              fab
              @click="saveChangesInBackend"
              class="mr-3"
            >
              <v-icon dark>mdi-content-save</v-icon>
              <!-- Save -->
            </v-btn>
            <v-btn
              @click="addNew"
              class="mr-2"
              outlined
              small
              fab
              color="#0C479D"
            >
              <v-icon>icon-add</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <!-- Parameter Name Text Input Template -->
        <template v-slot:item.product_code="{ item }">
          <v-text-field
            v-model="recordBeingEdited.product_code"
            :hide-details="true"
            dense
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.product_code }}</span>
        </template>
        <!-- Parameter Description Text Input Template -->
        <template v-slot:item.comments="{ item }">
          <v-text-field
            v-model="recordBeingEdited.comments"
            :hide-details="true"
            dense
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.comments }}</span>
        </template>
        <!-- Parameter Node Number Input Template -->
        <template v-slot:item.cycle_time_seconds="{ item }">
          <v-text-field
            v-model="recordBeingEdited.cycle_time_seconds"
            :hide-details="true"
            dense
            type="number"
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.cycle_time_seconds }}</span>
        </template>
        <!-- Parameter Address Number Input Template -->
        <template v-slot:item.setup_time_minutes="{ item }">
          <v-text-field
            v-model="recordBeingEdited.setup_time_minutes"
            :hide-details="true"
            type="number"
            dense
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.setup_time_minutes }}</span>
        </template>

        <!-- Actions Template -->
        <template v-slot:item.actions="{ item }">
          <div v-if="recordBeingEdited.id === item.id">
            <v-icon color="red" class="mr-3" @click="close">
              mdi-window-close
            </v-icon>
            <!-- <v-icon color="green" @click="saveItem"> mdi-check </v-icon> -->
          </div>
          <div v-else>
            <v-icon small class="mr-2" @click="editItem(item)">
              icon-action
            </v-icon>
            <v-icon
              v-if="item.isNew"
              small
              class="mr-2"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
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
import constants from "../constants";
import router from "../router";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";



export default {
  name: "productsManagement",
  components: {Breadcrumb,
  LoaderProgress},
  data() {
    return {
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
          text: "Locations Management",
          disabled: true,
        },
      ],
      showLoader: false,
      pagination: {
        page: null,
        itemsPerPage: null,
        pageStart: null,
        pageStop: null,
        pageCount: null,
        itemsLength: null,
      },
      headersData: [],
                                      selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
      
      console.log(crumb);
    },
                        crumbs: ['Home', 'Admin Menu','Product Setup'],

      search: "",
      productsData: [],
      dialog: false,
      deviceName: "",
      deviceId: undefined,
      recordBeingEdited: {},
      manipulationsMade: false,
      model: null,
    };
  },
  beforeMount() {
    this.headersData = [
      {
        text: "Product Code",
        value: "product_code",
        sortable: true,
      },
      {
        text: "Description",
        value: "comments",
        sortable: true,
      },
      {
        text: "Cycle Time (secs)",
        value: "cycle_time_seconds",
        sortable: true,
      },
      {
        text: "Setup Time (mins)",
        value: "setup_time_minutes",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false },
    ];
    this.setProductsData();
  },
  watch: {},
  methods: {
    setProductsData() {
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
          this.productsData = response.data.data
            ? response.data.data.length
              ? response.data.data
              : []
            : [];
        })
        .catch((error) => {
          this.productsData = [];
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

    editItem(item) {
      this.manipulationsMade = true;
      this.recordBeingEdited = {};
      this.recordBeingEdited = item;
      this.recordBeingEdited["isEdited"] = true;
    },

    close() {
      this.recordBeingEdited = {};
    },

    // saveItem () {
    //   this.manipulationsMade = true
    //   this.productsData.forEach(parameter=>{
    //     if(parameter.id===this.recordBeingEdited.id){
    //       parameter.isEdited= true
    //       parameter.product_code =this.recordBeingEdited.product_code
    //       parameter.comments= this.recordBeingEdited.comments
    //       parameter.cycle_time_seconds= this.recordBeingEdited.cycle_time_seconds
    //       parameter.setup_time_minutes= this.recordBeingEdited.setup_time_minutes
    //     }
    //   })
    //   this.recordBeingEdited = {}
    // },

    async saveChangesInBackend() {
      this.recordBeingEdited = {};
      this.showLoader = true;

      let newRecords = this.productsData
        .filter((record) => record.isNew)
        .map((each) => {
          return {
            comments: each.comments,
            setup_time_minutes: each.setup_time_minutes,
            product_code: each.product_code,
            cycle_time_seconds: each.cycle_time_seconds,
          };
        });
      let editedRecords = this.productsData
        .filter((record) => !record.isNew && record.isEdited)
        .map((each) => {
          return {
            id: each.id,
            comments: each.comments,
            setup_time_minutes: each.setup_time_minutes,
            product_code: each.product_code,
            cycle_time_seconds: each.cycle_time_seconds,
          };
        });
      let calls = [];
      if (newRecords.length) {
        calls.push(this.addNewCall(newRecords));
      }
      if (editedRecords.length) {
        calls.push(this.editRecordsCall(editedRecords));
      }
      let x = await Promise.all(calls);
      console.log("after call", x[0], x[1]);
      this.showLoader = false;
      this.manipulationsMade = false;
      this.setProductsData(this.machineId, this.deviceId);
    },
    addNew() {
      let newRecord = {
        id: this.productsData.length + 1000,
        comments: "",
        setup_time_minutes: null,
        product_code: "",
        cycle_time_seconds: null,
        isNew: true,
      };
      this.productsData.unshift(newRecord);
      this.editItem(newRecord);
    },

    deleteItem(item) {
      let index = this.productsData.indexOf(item);
      this.productsData.splice(index, 1);
    },

    async addNewCall(newRecords) {
      try {
        let config = {
          method: "post",
          url: `${constants.backend_url}/multiProductsDataEntry`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: { data: newRecords },
        };
        this.noteLastAPICallTime();
        let response = await axios(config);
        if (response.data.status === "S") {
          this.$toasted
            .show("Sucessfully to Added New Record(s)", {
              className: ["successToast"],
            })
            .goAway(6000);
          return true;
        } else {
          this.$toasted
            .show("Failed to Add New Record(s)", { className: ["failedToast"] })
            .goAway(6000);
          return false;
        }
      } catch (error) {
        this.$toasted
          .show("Failed to Add New Record(s)", { className: ["failedToast"] })
          .goAway(6000);
        return false;
      }
    },
    async editRecordsCall(editedRecords) {
      try {
        let config = {
          method: "post",
          url: `${constants.backend_url}/UpdateMultipleProductDataEntry`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: { data: editedRecords },
        };
        this.noteLastAPICallTime();
        let response = await axios(config);
        if (response.data.status === "S") {
          this.$toasted
            .show("Sucessfully Edited Record(s)", {
              className: ["successToast"],
            })
            .goAway(6000);
          return true;
        } else {
          this.$toasted
            .show("Failed to Edit Record(s)", { className: ["failedToast"] })
            .goAway(6000);
          return false;
        }
      } catch (error) {
        this.$toasted
          .show("Failed to Edit Record(s)", { className: ["failedToast"] })
          .goAway(6000);
        return false;
      }
    },
    isEmpty(obj) {
      obj && // 👈 null and undefined check
        Object.keys(obj).length === 0 &&
        obj.constructor === Object;
    },
    changeStatus(item, status) {
      item.active = status;
    },
  },
};
</script>
<style scoped>

.h4Style {
  color: #fe000c;
}
.h2Style {
  color: #000000;
  padding: 12px;
}
#sucessAlert {
  display: none;
}
#errorAlert {
  display: none;
}
.gridHeader {
  color: #0a47ba;
  font: bold;
}
.failedToast {
  color: black !important;
  background-color: red !important;
}
.successToast {
  color: black !important;
  background-color: green !important;
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
