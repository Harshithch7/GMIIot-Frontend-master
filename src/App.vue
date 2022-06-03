<template>
  <v-app>
    <v-main v-if="!loggedIn()">
      <router-view />
    </v-main>

    <v-main id="main" class="pt-4" v-if="loggedIn()">
      <v-container>
        <v-navigation-drawer
          v-model="drawer"
          app
          class="sidebar sidebar-shadow"
        >
          <v-row justify="center" class="mt-5 ">
         <a href="https://corporate.exxonmobil.com/" target="blank">   <img :src="image" width="200" style="padding-top:20px; padding-bottom: 10px;" /></a>
          </v-row>
          <!-- <v-row justify="center" class="mt-1 mb-1">
            <v-avatar color="primary" size="75">
              <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
            </v-avatar>
          </v-row> -->
          <v-row justify="center" class="mt-1 mb-5">
            <strong class="avtar-title"> {{ getUserName() }}</strong>
          </v-row>
          <div>
            <v-list
              v-for="each in this.sideOptions"
              :key="each.display_name"
              dense
            >
              <router-link :to="each.route_path" v-if="!each.submenu">
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-chart-areaspline</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ each.display_name }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </router-link>

              <v-list-group
                prepend-icon="mdi-account"
                no-action
                v-if="each.submenu"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      each.display_name
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <div v-for="eac in each.submenu" :key="eac.display_name">
                  <router-link :to="eac.route_path">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon>icon-speed-disable</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          eac.display_name
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </router-link>
                </div>
              </v-list-group>
            </v-list>
          </div>
        </v-navigation-drawer>

        <v-app-bar app flat color="#ffffff">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title class="font-weight-bold text-capitalize pl-1">
            <div class="text-blue">{{ pageTitle }}</div></v-toolbar-title
          >
          <v-spacer></v-spacer>
              <div class="loaderStyle" style="margin-right:10px" v-if="scroll">
      <v-progress-circular
        color="primary"
        indeterminate
        :size="20"
        :width="3"
        :value="0"
      ></v-progress-circular>
    </div>
    
          <div v-if="show">
          <v-switch 
            label="Auto Refresh"
            @change="change_value"
            v-model="switch1"
            color="primary"
            hide-details
            class=""
          ></v-switch>
          </div>
          <a
            class="text-decoration-underline ml-4 red--text"
            v-on:click="this.logUserOut"
          >
            <strong class="">Logout</strong>
          </a>
        </v-app-bar>
        <!-- </v-app> -->
      </v-container>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import SideBar from "./components/SideBar";
// import VueApexCharts from 'vue-apexcharts'
// import $ from "jquery";

import router from "./router";
import constants from "./constants";
import axios from "axios";

export default {
  name: "App",
  components: {
    // SideBar,
  },

  data: () => ({
    show: true,
    drawer: null,
    sideOptions: [],
    scroll: false,
    switch1: false,
    mad: "mdi-chart-areaspline",
    // image: require("@/assets/logo.png"),
    image: require("./assets/Mobil_Serv-SM.png"),

    user: {
      avatar: require("@/assets/user-profile.png"),
      name: "John Leider",
    },
  }),
  methods: {
    change_value()
    {
      console.log("checking value",this.switch1);
           this.$root.$emit('value_of_checkbox', this.switch1);
    },
    getUserName() {
      let storage = sessionStorage.getItem("jwt");
      // let self = this;

      if (storage) {
        console.log("username is here", storage,this.show);
          console.log("inside mounted in app.vue");
    console.log("checking session state",sessionStorage.getItem("switch_state"),typeof(sessionStorage.getItem("switch_state")));
    if (sessionStorage.getItem("switch_state")=="false"){

    this.show = false;
    console.log("Checking after assining session bject",this.show);
    console.log("checking scroll",this.scroll);
    sessionStorage.setItem("loaderchange", 0);
    this.switch1 = false;
    console.log("checking loader",sessionStorage.getItem("loaderchange")==='1');
    
    // this.scroll =sessionStorage.getItem("loaderchange");
      this.scroll = sessionStorage.getItem("loaderchange")==='1'
 
    // console.log("checking scroll",this.scroll, typeof(this.scroll));
    }
    else{
          this.show = true;

    }
        if (!this.optionsReceived) {
          this.getOptions();
        }
        return storage;
      } else {
        return null;
      }
    },
    getOrganizationName() {
      if (
        sessionStorage.getItem("organizationName").toUpperCase() ===
        "SUNDARAM AUTO COMPONENTS LTD"
      ) {
        return "SACL";
      }
      console.log(
        "Checking organization",
        sessionStorage.getItem("organizationName").toUpperCase()
      );
      return sessionStorage.getItem("organizationName").toUpperCase();
    },
    loggedIn() {
      let storage = sessionStorage.getItem("jwt");
      if (storage) {
        return true;
      } else {
        return false;
      }
    },
    logUserOut() {
      this.optionsReceived = false;
      let req = {
        organizationId: sessionStorage.getItem("organizationId"),
        username: sessionStorage.getItem("activeUser"),
      };
      // console.log("req=>",req,sessionStorage);
      axios.post(`${constants.backend_url}/logout`, req).then((response) => {
        console.log("success fully logged out=>", response);
      });

      sessionStorage.clear();
      router.push("/login");
    },

    getOptions() {
      let config = {
        method: "get",
        url: `${constants.backend_url}/getConfiguredCustomerFeatures`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          console.log(response.data.data);
          this.sideOptions = response.data.data;
          // this.sideOptions.push({
          //   display_name: "Cycle Time  Analysis",
          //   feature_id: 40,
          //   feature_name: "cycle-time-analysis",
          //   image_path: null,
          //   order_id: 40,
          //   route_path: "cycle-time-analysis",
          // });
          // this.sideOptions.push({
          //   display_name: "machineInsights",
          //   feature_id: 41,
          //   feature_name: "machineInsights",
          //   image_path: null,
          //   order_id: 41,
          //   route_path: "machineInsights",
          // });  
          // console.log("checking side options", this.sideOptions,this.$router.currentRoute.path);
         
          this.optionsReceived = true;
          // if (router.name != undefined)
          // {
          console.log("checking path before push",this.sideOptions[0].route_path)
                sessionStorage.setItem("route_first_option", this.sideOptions[0].route_path);

                    // this.$root.$emit('route_first_option', this.sideOptions[0].route_path);

          router.push(this.sideOptions[0].route_path);
          // }
          // else if  (router.name == 'loading') {
          //             console.log("checking path before push",router)
          // router.push(this.sideOptions[0].route_path);

          // }
          //           else if  (router.name == 'login') {
          //             console.log("checking path before push",router)
          // router.push(this.sideOptions[0].route_path);

          // }

        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            // Handle error
          }
        });
      router.push(this.sideOptions[0].route_path);
    },
    
  },
  mounted(){
  
  },
  beforeMounted() {
     
  sessionStorage.setItem("switch_state",true);
  },
  computed: {
    pageTitle: function() {
      return this.$route.meta.title;
    },
  },
};
</script>
<style>
@import "./assets/fonts/style.css";
@import "./assets/custome.css";
</style>
