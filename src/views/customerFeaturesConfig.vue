<template>
  <v-container style="margin-left: 25px 0px 10px 20px">
    <div>
      <!-- <v-breadcrumbs :items="items1">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs> -->
       <div id="app " >
    <Breadcrumb class="row justify-content-center mt-4" :crumbs="crumbs" @selected="selected" />
  </div>
      <v-card id="div1" style="margin-top:10px;">
        <v-row class="justify-space-between">
          <v-col cols="3">
            <h3 class="h3Style text-blue">Name of the Customer</h3>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="select"
              :items="items"
              @change="getCustomerFeatures"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-btn
              
              @click="saveCustomerFeatures()"
              id="save_button"
              :disabled="disabled == 0"
                            outlined
              color="indigo"
              class="mb-2"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
            <v-card id="div2" >
        <v-row class="justify-space-between">
          <v-col cols="6" >
            <h3 class="h3Style text-blue">Name of the Customer</h3>
          </v-col>
          <v-col cols="6" >
            <v-select
              v-model="select"
              :items="items"
              @change="getCustomerFeatures"
            ></v-select>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              
              @click="saveCustomerFeatures()"
              id="save_button"
              :disabled="disabled == 0"
                            outlined
              color="indigo"
              class="mb-2"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="!isHidden" class="mx-auto mt-5 mb-8">
        <v-container id="div1">
          <v-row class="justify-space-between">
            <v-col cols="4" class="h4Style text-blue "> Menu Name </v-col>
            <v-col cols="5" class="h4Style text-blue "> Enabled </v-col>
          </v-row>
          <hr />

          <div
            v-for="eachFeature in CustomerFeaturesList"
            :key="eachFeature.id"
          >
            <v-row class="justify-space-between">
              <v-col cols="4">
                <v-card class="pa-2">{{ eachFeature.display_name }}</v-card>
              </v-col>
              <v-col cols="5">
                <template>
                  <v-switch
                    color="indigo"
                    @click="changeStatus(eachFeature, eachFeature.status)"
                    false-value="N"
                    true-value="Y"
                    v-model="eachFeature.status"
                  ></v-switch>
                  <!-- <v-icon
                    x-large
                    @click="changeStatus(eachFeature, 'N')"
                    color="green"
                    v-if="eachFeature.status === 'Y'"
                  >
                    mdi-toggle-switch
                  </v-icon>
                  <v-icon
                    x-large
                    @click="changeStatus(eachFeature, 'Y')"
                    color="red"
                    v-if="eachFeature.status === 'N'"
                  >
                    mdi-toggle-switch-off
                  </v-icon> -->
                </template>
              </v-col>
            </v-row>
          </div>
        </v-container>
                <v-container id="div2">
          <v-row class="justify-space-between">
            <v-col cols="4" class="h4Style text-blue "> Menu Name </v-col>
            <v-col cols="5" class="h4Style text-blue "> Enabled </v-col>
          </v-row>
          <hr />

          <div
            v-for="eachFeature in CustomerFeaturesList"
            :key="eachFeature.id"
          >
            <v-row class="justify-space-between">
              <v-col cols="6">
                <v-card class="pa-2">{{ eachFeature.display_name }}</v-card>
              </v-col>
              <v-col cols="5">
                <template>
                  <v-switch
                    color="indigo"
                    @click="changeStatus(eachFeature, eachFeature.status)"
                    false-value="N"
                    true-value="Y"
                    v-model="eachFeature.status"
                  ></v-switch>
                  <!-- <v-icon
                    x-large
                    @click="changeStatus(eachFeature, 'N')"
                    color="green"
                    v-if="eachFeature.status === 'Y'"
                  >
                    mdi-toggle-switch
                  </v-icon>
                  <v-icon
                    x-large
                    @click="changeStatus(eachFeature, 'Y')"
                    color="red"
                    v-if="eachFeature.status === 'N'"
                  >
                    mdi-toggle-switch-off
                  </v-icon> -->
                </template>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
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
    </div>
  </v-container>
</template>

<script>
import Breadcrumb from '../components/breadcrumbs.vue';

import axios from "axios";
import constants from "../constants";
import router from "../router";
let organizationMapping = {};
export default {
  components: {Breadcrumb},
  name: "customerFeatures",
  data: () => ({
        crumbs: ['Home', 'Admin Menu','Customers Features Setup'],

    items1: [
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
        text: "Customers Features Management",
        disabled: true,
      },
    ],
    showLoader: false,
    select: "",
    items: [],
    CustomerFeaturesList: [],
    disabled: 0,
    isHidden: true,
  }),
  methods: {
                                                      selected(crumb) {
      if (crumb === 'Home')
      {
                  router.push(`/${sessionStorage.getItem("route_first_option")}`);
      }
      
      console.log(crumb);
    },
    getCustomerFeatures() {
      this.isHidden = false;
      document.querySelector("#errorAlert").style.display = "None";
      document.querySelector("#sucessAlert").style.display = "none";
      console.log("orgs ", organizationMapping);

      console.log("selected customer is ", organizationMapping[this.select]);
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getCustomerFeatures?customer_id=${
          organizationMapping[this.select]
        }`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log("incoming customer features ", response.data.data);
          this.CustomerFeaturesList = response.data.data;
          this.disabled = 0;
          console.log("CustomerFeaturesList ", this.CustomerFeaturesList);
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
      this.disabled = 1;
      console.log("item while changeing data", status);
      if (status == "N") {
        item.status = "N";
      } else {
        item.status = "Y";
      }
      console.log("item AFTER changeing data", item);
    },
    saveCustomerFeatures() {
      console.log("this.CustomerFeaturesList", this.CustomerFeaturesList);
      let user = sessionStorage.getItem("activeUser") || "";
      const payload = {
        data: this.CustomerFeaturesList,
        customer_id: organizationMapping[this.select],
        assigned_by: user,
      };
      // const payload = {"data":this.CustomerFeaturesList,"customer_id":organizationMapping[this.select]};
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/saveCustomerFeatures`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: payload,
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          this.showLoader = false;
          console.log("response save operator data ", response.data);
          this.disabled = 0;
          if (response.data.status == "S") {
            document.querySelector("#sucessAlert").style.display = "block";
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
  },
  beforeMount() {
    this.showLoader = true;
    axios.get(`${constants.backend_url}/getCustomerNames`).then((response) => {
      this.showLoader = false;
      let organization = {};
      response.data.data.forEach((org) => {
        organization[org.customer_name] = org.id;
      });
      organizationMapping = organization;
      this.items = response.data.data.map((org) => org.customer_name);
      console.log("organization mapping ", organizationMapping);
      console.log("items ", this.items);
    });
  },
};
</script>
<style scoped>
.h2Style {
  color: #000000;
  padding: 12px;
}
.h3Style {
  margin-left: 30px;
  margin-top: 20px;
}
.h4Style {
  font-weight: bold;
  margin-left: 30px;
  margin-top: 0px;
  font-size: 20px;
}
#loaderStyle {
  display: none;
}
#warningAlert {
  display: none;
}
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
@media screen and (min-width: 600px)  {
#div2{
  display: none;
}

}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
 
#div1{
  display: none;
}

}
</style>
