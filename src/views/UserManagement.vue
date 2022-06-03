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
      :headers="headersData"
      :items="usersData"
      :search="search"
      :items-per-page="5"
      class="elevation-1"
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
              <!-- <v-btn class="" outlined fab small color="#0C479D">
                <v-icon>icon-download</v-icon>
              </v-btn> -->

              <v-btn
                class="mr-2"
                outlined
                small
                fab
                @click="addDoc()"
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
                      <v-text-field
                        label="UserName*"
                        v-model="editeditem.user_name"
                        required
                        :disabled="isEdit"
                        :rules="rules"
                        prepend-icon="icon-user"
                      ></v-text-field>
                      <small
                        v-if="!isEdit && editeditem.user_name"
                        class="form-text text-muted"
                      >
                        <span v-if="usernameSearchInProgress">searching </span>
                        <v-progress-circular
                          v-if="usernameSearchInProgress"
                          :size="20"
                          color="amber"
                          indeterminate
                        ></v-progress-circular>

                        <v-icon small color="green" v-if="usernameAvailable"
                          >mdi-check-circle</v-icon
                        >
                        <span v-if="usernameAvailable">available</span>
                        <v-icon small color="red" v-if="usernameNotAvailable"
                          >mdi-minus-circle-off</v-icon
                        >
                        <span v-if="usernameNotAvailable"
                          >{{ editeditem.user_name }} is not available</span
                        >
                      </small>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="First Name*"
                        v-model="editeditem.first_name"
                        required
                        v-if="!isEdit"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Last Name*"
                        v-model="editeditem.last_name"
                        required
                        v-if="!isEdit"
                        :rules="rules"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Email*"
                        v-model="editeditem.email"
                        prepend-icon="icon-email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Password"
                        :type="type"
                        prepend-icon="icon-lock"
                        v-model="editeditem.password"
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

                        <!-- <span style="color:red" v-if="passwordNotAllowed"
                          >Password not Allowed.</span
                        >
                        <span style="color:#689868;" v-if="passwordAllowed"
                          >Password Allowed.</span 
                        > -->
                      </small>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        label="Roles*"
                        :items="roleData"
                        item
                        prepend-icon="icon-role"
                        v-model="editeditem.roles"
                        item-text="role_name"
                        item-value="id"
                        required
                        multiple
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
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
      <!-- <template v-slot:item.status="{ item }">
        <v-switch color="success" v-model="item.active"></v-switch>
      </template>
      <template v-slot:item.isadmin="{ item }">
        <v-switch color="success" v-model="item.admin"></v-switch>
      </template> -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          icon-action
        </v-icon>
      </template>
      <template v-slot:item.active="{ item }">
        <v-switch
          color="indigo"
          @change="changeActiveStatus(item, item.active)"
          false-value="N"
          true-value="Y"
          v-model="item.active"
        ></v-switch>
      </template>

      <template v-slot:item.admin="{ item }">
        <v-switch
          color="indigo"
          @change="changeAdminStatus(item, item.admin)"
          false-value="N"
          true-value="Y"
          v-model="item.admin"
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
import router from "../router";
export default {
  components: {Breadcrumb,
  LoaderProgress},

  data: () => ({
    isEdit: false,
              crumbs: ['Home', 'Admin Menu','User Management'],

    showLoader: false,

    roleData: [],
    editedIndex: -1,
    search: "",
    headersData: [],
    usersData: [],
    dataDownload: [],
    dialog: false,
    btnText: "Show Password",

    checkbox: false,

    usernameSearchInProgress: false,
    usernameAvailable: false,
    usernameNotAvailable: false,
    passwordNotAllowed: false,
    passwordSearchInProgress: false,
    passwordAllowed: false,
    // menu: false,
    editeditem: {
      id: null,
      user_id: null,
      customer_name: "",
      user_name: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      roles: [],
      admin: "",
      active: "",
    },
    defaultItem: {
      customer_name: "",
      user_name: "",
      password: "",
    },
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
        text: "User Management",
        disabled: true,
      },
    ],

    type: "password",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Your password must be at least 8 characters",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) =>
        (v && v.length <= 20) ||
        "Name must be less than or equals to 20 characters",
    ],
    emailRules: [
      (v) =>
        !v ||
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) ||
        "E-mail must be valid",
    ],

    //password validation
    has_minimum_length: false,
    has_number: false,
    has_lowercase: false,
    has_uppercase: false,
    has_special: false,
    equalto_username: false,

    dialogDelete: false,
    validEmail: false,
    rules: [(value) => !!value || "Required."],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New User" : "Edit User";
    },
  },

  watch: {
    "editeditem.password": function(val = 0) {
      console.log("checking password", val);
      this.has_minimum_length = this.editeditem.password.length > 8;
      console.log("chekcing has_minimum_length", this.has_minimum_length);
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
      // if (val) {
      //   if (!this.passwordSearchInProgress) {
      //     setTimeout(() => {
      //       this.validatePassword();
      //     }, 2000);
      //   }
      // this.passwordSearchInProgress = true;
      // this.passwordAllowed = false;
      // this.passwordNotAllowed = false;
      // }
    },
    "editeditem.email"() {
      this.validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.editeditem.email
      );
    },
    "editeditem.user_name": function(val) {
      if (val) {
        if (!this.usernameSearchInProgress) {
          setTimeout(() => {
            this.searchUserName();
          }, 2000);
        }
        this.usernameSearchInProgress = true;
        this.usernameAvailable = false;
        this.usernameNotAvailable = false;
      }
    },

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
    changeAdminStatus(item) {
      document.querySelector("#errorAlert").style.display = "none";

      console.log("changeAdminStatus item --> ", item);
      this.showLoader = true;
      let req = {
        user_id: item.user_id,
        updated_by: sessionStorage.getItem("jwt"),
        admin: item.admin,
        active: item.active,
        role_ids: item.role_ids,
      };
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateUsersData`,
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
    },
    changeActiveStatus(item) {
      document.querySelector("#errorAlert").style.display = "none";
      console.log("changeActiveStatus item --> ", item);

      let req = {
        user_id: item.user_id,
        updated_by: sessionStorage.getItem("jwt"),

        active: item.active,
        admin: item.admin,
        role_ids: item.role_ids,
      };
      this.showLoader = true;
      let config = {
        method: "post",
        url: `${constants.backend_url}/updateUsersData`,
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
          } else if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message ===
              "This Password is not allowed, Choose different password."
          ) {
            alert(error.response.data.message);
          } else if (error.response && error.response.status === 429) {
            alert(error.response.data);
          } else {
            document.querySelector("#errorAlert").style.display = "block";
            console.log("axios error", error.message);
          }
        });
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
    addDoc() {
      this.isEdit = false;
    },
    setGridData: async function() {
      this.headersData = [
        {
          text: "User Name",
          value: "user_name",
          sortable: true,
        },
        {
          text: "Role(s)",
          value: "userRoleNames",
          sortable: true,
        },
        {
          text: "Email",
          value: "email",
          sortable: true,
        },
        {
          text: "Status",
          value: "active",
          sortable: true,
        },
        {
          text: "is Admin",
          value: "admin",
          sortable: true,
        },
        { text: "Actions", value: "actions", sortable: true },
      ];
      this.showLoader = true;
      let functionCalls = [this.getUsers(), this.getRoles()];
      let responses = await Promise.all(functionCalls);
      let users = responses[0];
      let roles = responses[1];
      users.forEach((user) => {
        let userRoleNames = [];
        user.role_ids.forEach((userRole) => {
          userRoleNames.push(
            roles.find((role) => role.id === userRole).role_name
          );
        });
        user["userRoleNames"] = userRoleNames;
      });
      this.roleData = roles;
      this.usersData = users;
      this.showLoader = false;
    },
    async getUsers() {
      try {
        let config = {
          method: "get",
          url: `${constants.backend_url}/getUsers`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
        this.showLoader=true;
        this.noteLastAPICallTime();
        let response = await axios(config);
                  this.showLoader=false;

        if (response.data.status === "S") {
          return response.data.data;
        }
      } catch (error) {
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
          return [];
        }
      }
    },
    async getRoles() {
      try {
        let config = {
          method: "get",
          url: `${constants.backend_url}/getRoles`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
        this.noteLastAPICallTime();
                  this.showLoader=true;

        let response = await axios(config);
                  this.showLoader=false;

        if (response.data.status === "S") {
          return response.data.data;
        }
      } catch (error) {
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
          return [];
        }
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    searchUserName() {
      console.log("searchUserName  --> ");

      let req = {
        user_name: this.editeditem.user_name,
      };
      this.usernameSearchInProgress = true;
      this.usernameAvailable = false;
      this.usernameNotAvailable = false;
      let config = {
        method: "post",
        url: `${constants.backend_url}/UserNameValidation`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: req,
      };
                this.showLoader=true;

      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
                    this.showLoader=false;

          this.usernameSearchInProgress = false;
          if (response.data.valid === true) {
            this.usernameAvailable = true;
            this.usernameNotAvailable = false;
          } else if (response.data.valid === false) {
            this.usernameNotAvailable = true;
            this.usernameAvailable = false;
          }
        })
        .catch((error) => {
                    this.showLoader=false;

          alert("internal error", error);
          this.usernameSearchInProgress = false;
        });
    },
    validatePassword() {
      let req = {
        password: this.editeditem.password,
      };
      this.passwordSearchInProgress = true;
      this.passwordAllowed = false;
      this.passwordNotAllowed = false;
      let config = {
        method: "post",
        url: `${constants.backend_url}/PasswordValidation`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        data: req,
      };
                this.showLoader=true;

      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
                    this.showLoader=false;

          this.passwordSearchInProgress = false;
          if (response.data.valid === true) {
            this.passwordAllowed = true;
            this.passwordNotAllowed = false;
          } else if (response.data.valid === false) {
            this.passwordNotAllowed = true;
            this.passwordAllowed = false;
          }
        })
        .catch((error) => {
                    this.showLoader=false;

          alert("internal error", error);
          this.passwordSearchInProgress = false;
        });
    },
    editItem(item) {
      this.isEdit = true;
      this.editeditem = { ...item };
      this.editeditem.roles = item.role_ids;
      this.editedIndex = this.usersData.indexOf(item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.isEdit = false;
      this.$nextTick(() => {
        this.editeditem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      document.querySelector("#errorAlert").style.display = "none";

      console.log("checking password", this.editeditem);

      if (!this.isEdit && this.usernameNotAvailable) {
        alert("Please enter a valid UserName");
        return;
      }
      if (
        this.editeditem.user_name === null ||
        this.editeditem.user_name === ""
      ) {
        alert("Please Enter User Name ");
        return;
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
        console.log(
          "checking value",
          this.has_minimum_length,
          this.has_lowercase,
          this.has_special,
          this.equalto_username
        );

        alert("Please make sure that proper password is entered");
        return;
      } else if (
        this.editeditem.first_name === "" ||
        this.editeditem.last_name === ""
      ) {
        alert("Please enter First Name & Last Name");
        return;
      } else if (!this.validEmail) {
        alert("Please enter valid email");
        return;
      } else if (!this.editeditem.roles.length) {
        alert("Please select atleast one role");
        return;
      }
      console.log("cehcking is editemd=>", this.isEdit, this.editeditem.id);
      let req = {
        user_id: this.isEdit ? this.editeditem.user_id : undefined,
        user_name: this.isEdit ? undefined : this.editeditem.user_name,
        password:
          this.editeditem.password === ""
            ? undefined
            : this.editeditem.password,
        role_ids: this.editeditem.roles,
        email: this.editeditem.email,
        first_name:
          this.editeditem.first_name === ""
            ? undefined
            : this.editeditem.first_name,
        last_name:
          this.editeditem.last_name === ""
            ? undefined
            : this.editeditem.last_name,
        created_by: this.isEdit ? undefined : sessionStorage.getItem("jwt"),
        updated_by: this.isEdit ? sessionStorage.getItem("jwt") : undefined,
        admin: this.isEdit ? this.editeditem.admin : "N",
        active: this.isEdit ? this.editeditem.active : "Y",
      };
      console.log("req is", req);

      let url = this.isEdit
        ? `${constants.backend_url}/updateUsersData`
        : `${constants.backend_url}/UserDataEntry`;
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
          } else if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message ===
              "This Password is not allowed, Choose different password."
          ) {
            alert(error.response.data.message);
          } else if (error.response && error.response.status === 429) {
            alert(error.response.data);
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
.h4Style {
  color: #fe000c;
}
.has_required {
  text-decoration: line-through;
  color: #689868;
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
