<template>
  <div class="theLoginPage">
    <v-row v-if="this.$mq!=='sm'">
      <v-col cols="9" class="imageLogin"
        >
        <!-- <img class="image container" src="../assets/Background.jpg" alt="bg image" /> -->
                <img class="image container" src="../assets/loginBG.jpg" alt="bg image" />

        <div class="appTitle">
          <v-row>
            <v-col>
              <v-row> <img
              src="../assets/mobil_serve_with_bg.png"
              width="200"
              alt="Mobil Serv logo"
            /> </v-row>
              <v-row class="appTitleActual"> IIoT Insights </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col >
        <form @submit="resetPassword()" class="loginForm">
          <div style="padding-bottom:3vh">
            <!-- <img
              src="@/assets/tribackground.png"
              width="200"
              alt="Triniti"
            /> -->
              <img
              src="../assets/Mobil_Serv-SM.png"
              width="200"
              alt="Mobil Serv logo"
            />
          </div>

          <v-text-field
            style="width: 250px"
            v-model="newPassword"
            :type="'password'"
            id="newPassword"
            required
            dense
            outlined
            persistent-hint
            label="New Password"
            :rules="newPasswordRules"
          >
          </v-text-field>

          <v-text-field
            style="width: 250px"
            v-model="confirmPassword"
            :type="'password'"
            required
            dense
            outlined
            label="Confirm Password"
            :rules="confirmPasswordRules"
          >
          </v-text-field>

          <p>
            <input
              class="loginButton"
              type="submit"
              @click.stop.prevent="resetPassword()"
              value="Submit"
            />
          </p>
        </form>
      </v-col>
    </v-row>
    <v-row v-if="this.$mq==='sm'" class="theLoginForm">
      <v-col >
        <form @submit="resetPassword()" class="loginForm">
          <div style="padding-bottom:3vh">
            <img
              src="../assets/mobil_serve_with_bg.png"
              width="200"
              alt="Mobil Serv logo"
            />
          </div>

          <v-text-field
            style="width: 250px"
            v-model="newPassword"
            id="newPassword"
            :type="'password'"
            required
            dense
            outlined
            label="New Password"
            :rules="newPasswordRules"
          >
          </v-text-field>
          
          <v-text-field
            style="width: 250px"
            v-model="confirmPassword"
            :type="'password'"
            required
            dense
            outlined
            label="Confirm Password"
            :rules="confirmPasswordRules"
          >
          </v-text-field>

          <p>
            <input
              class="loginButton"
              type="submit"
              @click.stop.prevent="resetPassword()"
              value="Submit"
            />
          </p>
        </form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import constants from "../constants";
const axios = require("axios").default;
import $ from "jquery"
import jwt_decode from "jwt-decode";

export default {
  data: () => ({
    newPassword: "",
    confirmPassword: "",
    user_name: sessionStorage.getItem("username"),

    //password validation
      has_minimum_length: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      equalto_username: false,

      passwordMatch: false,

      newPasswordRules: [
        value => !!value || 'Required.',
        value => (
          value
          && value.length >=8
          && /\d/.test(value)
          && /[a-z]/.test(value)
          && /[A-Z]/.test(value)
          /* eslint-disable-next-line */
          && /[!@#\$%\^\&*\)\(+=._-]/.test(value)
          && value !== sessionStorage.getItem("username")
          ) || "Password should contain atleast 8 characters, 1 lowercase letter, 1 Uppercase letter, 1 number & 1 special character & not equal to username",
      ],
      confirmPasswordRules: [
        value => !!value || 'Required.',
        value => (value === $('#newPassword').val()) || "Password should match."
      ]
  }),

  methods: {

    get_user_name: function() {
      this.decode = jwt_decode(this.$route.params.token)
      return this.decode.user_id
    },

    resetPassword: function() {
      if(
        !this.has_minimum_length
        || !this.has_number
        || !this.has_lowercase
        || !this.has_uppercase
        || !this.has_special
        || !this.equalto_username
        ){
          alert('please make sure that all the password rules are Satisfied.')
          return;
      }
      if(!this.passwordMatch){
        alert('please make sure that the password types in both the text boxes is same.')
        return;
      }
        var config = {
          method: "post",
          url: `${constants.backend_url}/resetPassword`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$route.params.token}`
          },
          data: {password: this.confirmPassword}
        };
        axios(config)
        .then(response=>{
          if (response.data && response.data.status === "S") {
          alert("password reset successful");
          this.$router.push("/login");
        } else {
          alert("Password Reset Failed, Please Try Again");
        }
        }).catch(err=>{
          if(err.response && (err.response.status === 401)){
            alert("link expired, please contact Admin.");
          } else if (err.response && err.response.status === 400 && err.response.data.message === "This Password is not allowed, Choose different password.") {
                alert(err.response.data.message)
          }else{
            alert("Password Reset Failed, please contact Admin.");
          }
        })
  
    },
  },
  beforeMount() {
    sessionStorage.setItem("username", this.get_user_name())
  },
  watch: {
    newPassword(){
                this.has_minimum_length = (this.newPassword.length > 8);
                /* eslint-disable-next-line */
                this.has_number    = /\d/.test(this.newPassword);
                /* eslint-disable-next-line */
                this.has_lowercase = /[a-z]/.test(this.newPassword);
                /* eslint-disable-next-line */
                this.has_uppercase = /[A-Z]/.test(this.newPassword);
                /* eslint-disable-next-line */
                this.has_special   = /[!@#\$%\^\&*\)\(+=._-]/.test(this.newPassword);
                /* eslint-disable-next-line */
                this.equalto_username = (this.newPassword !== this.user_name);
            },
    confirmPassword(){
                this.passwordMatch = (this.newPassword===this.confirmPassword)
            }
  },
};
</script>
<style>
.span1 {
  color: #0000cd;
}
.span2,
.org,
.username,
.pwd {
  color: red;
}
.create {
  width: 15pm;
}
.spacer5 {
  height: 5px;
}
.label {
  color: red;
  font-weight: bold;
  font-size: 17px;
}

.tdLabel {
  text-align: right;
  padding-right: 50px;
}

.tdContent {
  align-content: center;
}

.tdbutton {
  text-align: center;
  padding: 5px;
}
.imageLogin {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  overflow: hidden;
  position: relative;
  text-align: center;
  color: white;
}
.image {
  height: 100vh;
  width: 100%;
    /* padding-top: 30px; */

}
.toBeFilled {
  padding-left: 10% !important;
  padding-right: 10% !important;
  margin: auto;
  width: 50%;
}
.appTitle {
  position: absolute;
  bottom: 8px;
  left: 60px;
}
.appTitleActual {
  font-size: 370%;
}
.logoClass {
  padding-top: 40%;
}
.eachForm {
  padding-top: 5%;
}
#loginButton {
  color: #ffffff;
}

.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 26vh;
}
.theLoginForm{
  overflow: hidden;
}
.theLoginPage{
  overflow: hidden;
    background-color: white;
    display: flex;
}
.loginButton {
  background-color: #0c479d;
  padding: 1px 90px 1px 90px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 6px;

  color: white;
}
.loginInput {
  border: 1px solid black;
  padding: 10px 40px 10px 40px;
  border-radius: 5px;
}
</style>