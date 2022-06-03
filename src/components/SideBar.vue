<template>
  <v-container >
    <!-- <v-app id="inspire" name="Sidebar"> -->
    <v-navigation-drawer v-model="drawer" app class="sidebar sidebar-shadow" >
      <v-row justify="center" class="mt-5 mb-5">
        <img :src="image" />
      </v-row>
      <v-row justify="center" class="mt-1 mb-1">
        <!-- <span class="profile-status"></span> -->
        <v-avatar color="primary" size="75">
          <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
        </v-avatar>
      </v-row>
      <v-row justify="center" class="mt-1 mb-5">

        <strong v-html="user.name" class="avtar-title"></strong>
      </v-row>
      <div >
      <v-list dense>
        <router-link :to="'oee-monitoring-dashboard'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-chart-areaspline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> OEE Monitoring Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'oil-cleanliness-monitoring'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-apple-keyboard-command</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Oil Cleanliness Monitoring</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'cycle-time-analysis'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-sync</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Cycle Time Analysis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'performance-trends'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-chart-timeline-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Perfomance Trends</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'energy-dashboard'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-file-chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Energy Monitoring Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'data-entry'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi mdi-flash</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Operator Data Entry</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-group prepend-icon="mdi-account" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin Menu</v-list-item-title>
            </v-list-item-content>
          </template>
          <router-link :to="'maitenance-schedule-configuration'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  >Preventive Maintenance Schedule
                  Configuration</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="'config-notifications'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  >Configuration for Alerts / Notifications</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="'machine-management'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Machines Management</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="'devices-management'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Devices Management</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="'user-management'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>User Management</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="'role-management'">
            <v-list-item>
              <v-list-item-action>
                <v-icon>icon-speed-disable</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Role Management</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
        <v-list-group prepend-icon="mdi-clipboard-text" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Report Menu</v-list-item-title>
            </v-list-item-content>
          </template>
          <!-- <router-link :to="'oee-dashboard'"> -->
          <v-list-item>
            <v-list-item-action>
              <v-icon>icon-speed-disable</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Report menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- </router-link> -->
          <!-- <router-link :to="'oee-dashboard'"> -->
          <v-list-item>
            <v-list-item-action>
              <v-icon>icon-speed-disable</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Report menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- </router-link> -->
          <!-- <router-link :to="'oee-dashboard'"> -->
          <v-list-item>
            <v-list-item-action>
              <v-icon>icon-speed-disable</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Report menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- </router-link> -->
        </v-list-group>
        <router-link :to="'loader'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-cached</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Loader</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="'snackbar'">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-alert</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Error Message</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app flat color="#ffffff">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold text-uppercase pl-1">
        <div class="text-blue">{{ pageTitle }}</div></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-switch
        label="Auto Refresh"
        color="primary"
        value="success"
        hide-details
        class=""
      ></v-switch>

      <a
        class="text-decoration-underline ml-4 red--text"
        v-on:click="this.logUserOut"
      >
        <strong class="">Logout</strong>
      </a>
    </v-app-bar>
    <!-- </v-app> -->
  </v-container>
</template>

<script>
import router from "../router";
import constants from "../constants";
import axios from "axios";

export default {
  name: "Sidbar",
  pageTitle: "",
  data: () => ({
    drawer: null,
    // termsAndLoginAndForgot: false,
    image: require("@/assets/logo.png"),
    user: {
      avatar: require("@/assets/user-profile.png"),
      name: "John Leider",
    },
  }),
  mounted: function() {
    console.log("inside mouted in sidebar");
    this.$root.$on("loginevent", (text) => {
      if (

        this.$router.currentRoute.path == "/login" ||
        this.$router.currentRoute.path == "/termsAndConditions"
      ) {
        this.termsAndLoginAndForgot = text;
      }
    });
  },


  methods: {
            getUserName() {
      let storage = sessionStorage.getItem("jwt");
      let self = this;

      if (storage) {
        console.log("username is here", storage);
        if (!this.optionsReceived) {
          self.getOptions();
        }
        return storage;
      } else {
        return null;
      }
    },
    logUserOut() {
      // console.log("Checking route", this.$router.currentRoute.path);

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
  },
  computed: {
    pageTitle: function() {
      return this.$route.meta.title;
    },
  },
};
</script>
