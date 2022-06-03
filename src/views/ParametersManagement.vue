<template>
  <v-container>
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
        :items="parametersData"
        :search="search"
        :items-per-page="5"
        @pagination="pagination = $event"
      >
        <!-- Toolbar template -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
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

        <!-- On Off Status Toggle Template -->

        <template v-slot:item.active="{ item }">
          <v-switch
            color="indigo"
            false-value="N"
            true-value="Y"
            v-model="item.active"
          @change="changeStatus(item, item.active)"
          v-if="recordBeingEdited.id === item.id"
          ></v-switch>
          <v-switch
            color="indigo"
            false-value="N"
            true-value="Y"
            disabled
            v-model="item.active"
            v-if="recordBeingEdited.id !== item.id"
          ></v-switch>
          <!-- <v-icon
            x-large
            @click="changeStatus(item, 'N')"
            color="green"
            v-if="item.active === 'Y' && recordBeingEdited.id === item.id"
          >
            mdi-toggle-switch
          </v-icon>
          <v-icon
            x-large
            @click="changeStatus(item, 'Y')"
            color="red"
            v-if="item.active === 'N' && recordBeingEdited.id === item.id"
          >
            mdi-toggle-switch-off
          </v-icon> -->

          <!--  -->

          <!-- <v-icon
            x-large
            color="green"
            v-if="item.active === 'Y' && recordBeingEdited.id !== item.id"
          >
            mdi-toggle-switch
          </v-icon>
          <v-icon
            x-large
            color="red"
            v-if="item.active === 'N' && recordBeingEdited.id !== item.id"
          >
            mdi-toggle-switch-off
          </v-icon> -->
        </template>

        <!-- Parameter Name Text Input Template -->
        <template v-slot:item.parameter_name="{ item }">
          <v-text-field
            v-model="recordBeingEdited.parameter_name"
            :hide-details="true"
            dense
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.parameter_name }}</span>
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
        <template v-slot:item.parameter_node="{ item }">
          <v-text-field
            v-model="recordBeingEdited.parameter_node"
            :hide-details="true"
            dense
            type="number"
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.parameter_node }}</span>
        </template>
        <!-- Parameter Address Number Input Template -->
        <template v-slot:item.parameter_address="{ item }">
          <v-text-field
            v-model="recordBeingEdited.parameter_address"
            :hide-details="true"
            type="number"
            dense
            single-line
            v-if="recordBeingEdited.id === item.id"
          ></v-text-field>
          <span v-else>{{ item.parameter_address }}</span>
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
              class="mr-1"
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
import LoaderProgress from "../components/progressLoader";

import constants from "../constants";
import router from "../router";
import Breadcrumb from '../components/breadcrumbs.vue';

export default {
  // name: "parametersManagement",
  components: {Breadcrumb,
  LoaderProgress
  },
  data() {

    return {
      crumbs: ['Home', 'Admin Menu','Devices Management', 'Parameters Management'],
showLoader: false,

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
          disabled: false,
          href: "/devicesManagement",
        },
        {
          text: "Parameters Management",
          disabled: true,
        },
      ],
      pagination: {
        page: null,
        itemsPerPage: null,
        pageStart: null,
        pageStop: null,
        pageCount: null,
        itemsLength: null,
      },
      headersData: [],
      search: "",
      parametersData: [],
      dialog: false,
      deviceName: "",
      deviceId: undefined,
      recordBeingEdited: {},
      manipulationsMade: false,
      model: null,
    };
  },
  beforeMount() {
    console.log("entered with parameters ==>", this.$route.params.previousIds);
    let pathParamsData = this.$route.params.previousIds;
    this.deviceName = pathParamsData.device_name;
    this.deviceId = pathParamsData.id;
    this.machineId = pathParamsData.machine_id;
    this.machineName = pathParamsData.machine_name;
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
        text: "Description",
        value: "comments",
        sortable: true,
      },
      {
        text: "Parameter Node",
        value: "parameter_node",
        sortable: true,
      },
      {
        text: "Parameter Address",
        value: "parameter_address",
        sortable: true,
      },
      {
        text: "Parameter Name",
        value: "parameter_name",
        sortable: true,
      },
      {
        text: "Parameter Sequence",
        value: "parameter_sequence",
        sortable: true,
      },
      {
        text: "Status",
        value: "active",
        sortable: false,
      },
      { text: "Actions", value: "actions", sortable: false },
    ];
    this.setParametersData(pathParamsData.machine_id, pathParamsData.id);
  },
  watch: {},
  methods: {
                    selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
        else    if (crumb === 'Devices Management')
      {
        router.push('/devicesManagement')
      }
      console.log(crumb);
    },
    moveToDevices() {
      this.$router.push({ name: "devicesManagement" });
    },
    setParametersData(machineId, deviceId) {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getDeviceParametersData?machine_id=${machineId}&device_id=${deviceId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          this.parametersData = response.data.data
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
            alert("internal error");
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
    //   this.parametersData.forEach(parameter=>{
    //     if(parameter.id===this.recordBeingEdited.id){
    //       parameter.isEdited= true
    //       parameter.parameter_name =this.recordBeingEdited.parameter_name
    //       parameter.comments= this.recordBeingEdited.comments
    //       parameter.parameter_node= this.recordBeingEdited.parameter_node
    //       parameter.parameter_address= this.recordBeingEdited.parameter_address
    //     }
    //   })
    //   this.recordBeingEdited = {}
    // },

    deleteItem(item) {
      let index = this.parametersData.indexOf(item);
      this.parametersData.splice(index, 1);
    },

    async saveChangesInBackend() {
      let newRecords = this.parametersData
        .filter((record) => record.isNew)
        .map((each) => {
          return {
            active: each.active,
            comments: each.comments,
            customer_id: each.customer_id,
            device_id: each.device_id,
            device_name: each.device_name,
            machine_id: each.machine_id,
            machine_name: each.machine_name,
            parameter_address: each.parameter_address,
            parameter_name: each.parameter_name,
            parameter_node: each.parameter_node,
            parameter_sequence: each.parameter_sequence,
          };
        });
      let editedRecords = this.parametersData
        .filter((record) => !record.isNew && record.isEdited)
        .map((each) => {
          return {
            id: each.id,
            active: each.active,
            comments: each.comments,
            customer_id: each.customer_id,
            device_id: each.deviceId,
            device_name: each.deviceName,
            machine_id: each.machineId,
            machine_name: each.machineName,
            parameter_address: each.parameter_address,
            parameter_name: each.parameter_name,
            parameter_node: each.parameter_node,
            parameter_sequence: each.parameter_sequence,
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
      this.manipulationsMade = false;
      this.setParametersData(this.machineId, this.deviceId);
    },
    addNew() {
      let newRecord = {
        id: this.parametersData.length + 1,
        active: "Y",
        comments: "",
        customer_id: sessionStorage.getItem("organizationId"),
        device_id: this.deviceId,
        device_name: this.deviceName,
        machine_id: this.machineId,
        machine_name: this.machineName,
        parameter_address: "",
        parameter_name: "",
        parameter_node: undefined,
        parameter_sequence: undefined,
        isNew: true,
      };
      this.parametersData.unshift(newRecord);
      this.editItem(newRecord);
    },
    async addNewCall(newRecords) {
      try {
        let config = {
          method: "post",
          url: `${constants.backend_url}/multideviceParametersDataEntry`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: { data: newRecords },
        };
        this.noteLastAPICallTime();
        this.showLoader= true;

        let response = await axios(config);
        if (response.data.status === "S") {
                  this.showLoader= false;

          this.$toasted
            .show("Sucessfully to Added New Record(s)", {
              className: ["successToast"],
            })
            .goAway(6000);
          return true;
        } else {
                            this.showLoader= false;

          this.$toasted
            .show("Failed to Add New Record(s)", { className: ["failedToast"] })
            .goAway(6000);
          return false;
        }
      } catch (error) {
                          this.showLoader= false;

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
          url: `${constants.backend_url}/multideviceParametersDataUpdate`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: { data: editedRecords },
        };
        this.noteLastAPICallTime();
                          this.showLoader= true;

        let response = await axios(config);
        if (response.data.status === "S") {
                            this.showLoader= false;

          this.$toasted
            .show("Sucessfully Edited Record(s)", {
              className: ["successToast"],
            })
            .goAway(6000);
          this.close();
          return true;
        } else {
                           this.showLoader= false;

          this.$toasted
            .show("Failed to Edit Record(s)", { className: ["failedToast"] })
            .goAway(6000);
          return false;
        }
      } catch (error) {
                          this.showLoader= false;

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
