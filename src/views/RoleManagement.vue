<template>
  <v-container fluid style="margin-left: 25px 0px 10px 20px">
    <div>
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
      <v-card id="div1">
        <v-row justify="space-between">
          <v-col cols="3">
            <h3 class="h3Style text-blue">Select Role from drop down</h3>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="select"
              :items="allRoles"
              item-text="role_name"
              item-value="id"
              @change="getRoleFeatures()"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn
              @click="saveUpdates()"
              id="save_button"
              :disabled="disabled == 0"
              class="ma-3"
              outlined
              color="indigo"
            >
              Save Updates
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              v-if="roleStatus === 'Y'"
              color="error"
              @click="activateOrDeactivate('N')"
              id="save_button"
              class="ma-3"
              outlined
            >
              Disable
            </v-btn>
            <v-btn
              v-if="roleStatus === 'N'"
              color="success"
              @click="activateOrDeactivate('Y')"
              id="save_button"
              class="ma-3"
              outlined
            >
              Enable
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  style="margin-left:-32px; margin-top: 12px  "
                  outlined
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add New Role
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Create New Role</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Role Name*"
                          v-model="newRoleName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="allPages"
                          v-model="selectedPages"
                          item-text="display_name"
                          item-value="id"
                          label="Pages Access"
                          multiple
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveNewRole">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
            <v-card id="div2">
        <v-row justify="space-between" align="center">
          <v-col cols="6" >
            <h3 class="h3Style text-blue">Select Role from drop down</h3>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="select"
              :items="allRoles"
              item-text="role_name"
              item-value="id"
              @change="getRoleFeatures()"
            ></v-select>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              @click="saveUpdates()"
              id="save_button"
              :disabled="disabled == 0"
              outlined
              color="indigo"
            >
              Save Updates
            </v-btn>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              v-if="roleStatus === 'Y'"
              color="error"

              @click="activateOrDeactivate('N')"
              id="save_button"
              outlined
            >
              Disable
            </v-btn>
                        <v-btn
              v-if="roleStatus === 'N'"
              color="success"
              @click="activateOrDeactivate('Y')"
              id="save_button"
              outlined

            >
              Enable
            </v-btn>
          </v-col>
         
          <v-col cols="12" align="center" >
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"

                >
                  Add New Role
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Create New Role</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Role Name*"
                          v-model="newRoleName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="allPages"
                          v-model="selectedPages"
                          item-text="display_name"
                          item-value="id"
                          label="Pages Access"
                          multiple
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveNewRole">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="!isHidden" class="mx-auto mt-5 mb-8">
        <v-container id="div1">
          <v-row justify="space-between">
            <v-col cols="4" class="h4Style text-blue "> Menu Name </v-col>
            <v-col cols="5" class="h4Style text-blue"> Enabled </v-col>
          </v-row>
          <hr />
          <div v-for="eachFeature in selectedRolePages" :key="eachFeature.id">
            <v-row justify="space-between">
              <v-col cols="4">
                <v-card class="pa-2">{{ eachFeature.display_name }}</v-card>
              </v-col>
              <v-col cols="5">
                <template>
                  <v-switch
                    color="indigo"
                    @change="changeStatus(eachFeature, eachFeature.status)"
                    false-value="N"
                    true-value="Y"
                    v-model="eachFeature.status"
                  ></v-switch>
                 </template>
              </v-col>
            </v-row>
          </div>
        </v-container>
                <v-container id="div2">
          <v-row justify="space-between">
            <v-col cols="4" class="h4Style text-blue "> Menu Name </v-col>
            <v-col cols="5" class="h4Style text-blue"> Enabled </v-col>
          </v-row>
          <hr />
          <div v-for="eachFeature in selectedRolePages" :key="eachFeature.id">
            <v-row justify="space-between">
              <v-col cols="6">
                <v-card class="pa-2">{{ eachFeature.display_name }}</v-card>
              </v-col>
              <v-col cols="5">
                <template>
                  <v-switch
                    color="indigo"
                    @change="changeStatus(eachFeature, eachFeature.status)"
                    false-value="N"
                    true-value="Y"
                    v-model="eachFeature.status"
                  ></v-switch>
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
import axios from "axios";
import Breadcrumb from '../components/breadcrumbs.vue';
import LoaderProgress from "../components/progressLoader";

import constants from "../constants";
import router from "../router";
export default {
  name: "customerFeatures",
  components: {Breadcrumb,
  LoaderProgress},
  data: () => ({
              crumbs: ['Home', 'Admin Menu','Roles Management'],

    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Admin Menu",
        disabled: true,
      },
      {
        text: "Role Management",
        disabled: true,
      },
    ],
    showLoader: false,
    select: "",
    roleStatus: "",
    dialog: false,
    editDialog: false,
    roleSelected: {},
    allRoles: [],
    allPages: [],
    selectedPages: [],
    newRoleName: "",
    selectedRolePages: [],
    disabled: 0,
    editDisabled: 1,
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
    getRoleFeatures() {
      this.disabled = 0;
      this.editDisabled = 0;
      console.log(">>>> getRoleFeatures with : ", this.select);
      let role = this.allRoles.filter((role) => role.id === this.select)[0];
      this.roleStatus = role.active;
      this.roleSelected = role;
      let pages = this.allPages;
      let pagesofThisRole = [];
      pages.forEach((page) => {
        let pageObj = {};
        pageObj["id"] = page.id;
        pageObj["display_name"] = page.display_name;
        console.log("role pages", role.pages);
        pageObj["status"] = role.pages.includes(page.id) ? "Y" : "N";
        pagesofThisRole.push(pageObj);
      });
      this.selectedRolePages = pagesofThisRole;
      console.log(pagesofThisRole);
      this.isHidden = false;
    },
    saveUpdates() {
      console.log(
        ">>>> saveUpdates with : ",
        this.select,
        this.selectedRolePages
      );
      let req = {
        role_id: this.select,
        updated_by: sessionStorage.getItem("jwt"),
        application_feature_id: this.selectedRolePages
          .filter((page) => page.status === "Y")
          .map((page) => page.id),
      };
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateRolePagesData`,
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
            this.getAllRoles();
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
      this.disabled = 0;
    },
    activateOrDeactivate(status) {
      let req = {
        role_id: this.select,
        active: status,
        updated_by: sessionStorage.getItem("jwt"),
      };
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateRolePagesData`,
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
            this.getAllRoles();
            this.getRoleFeatures();
            this.roleStatus = status;
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
    changeStatus(item, status) {
      this.disabled = 1;
      console.log("item while changeing data", status,item);
      if (status == "Y") {
        item.status = "Y";
      } else if (status == "N") {
        item.status = "N";
      }
      console.log("item AFTER changeing data", item.status);
    },
    close() {
      this.dialog = false;
      this.selectedPages = [];
      this.newRoleName = "";
    },
    closeEdit() {
      this.editDialog = false;
    },
    saveNewRole() {
      if (!this.newRoleName || !this.newRoleName.trim()) {
        alert("'Role Name' is required");
        return;
      }
      const req = {
        role_name: this.newRoleName,
        application_feature_id: this.selectedPages,
        active: "Y",
        created_by: sessionStorage.getItem("jwt"),
      };
      console.log("req is", req);

      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/createRole`,
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
            this.getAllRoles();
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
    getAllRoles() {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getRoles`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();

      axios(config)
        .then((response) => {

          this.showLoader = false;
          console.log("typeof response.data", typeof response.data);
          console.log("typeof response.data.data", typeof response.data.data);
          if (response.data.data) {
            this.allRoles = response.data.data;
          } else {
            this.allRoles = [];
          }
                    console.log("checking roles",this.allRoles);

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
    getAllPages() {
      this.showLoader = true;
      let config = {
        method: "get",
        url: `${constants.backend_url}/getPages`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();

      axios(config)
        .then((response) => {
                                
          this.showLoader = false;
          if (response.data.data) {
            this.allPages = response.data.data;
          } else {
            this.allPages = [];
          }
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
  },

  beforeMount() {

    this.getAllRoles();
    
    this.getAllPages();
  },
};
</script>
<style scoped>
.h2Style {
  color: #000000;
  padding: 12px;
}
.h3Style {
  font-size: 16px;

  margin-left: 30px;
  margin-top: 20px;
}
.h4Style {
  /* color: #0400fe; */
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
