<template>
  <div class="theLoginPage " >
    <v-row v-if="this.$mq!=='sm'">
      <v-col cols="9" class="imageLogin"
        >
        <!-- <img class="image container" src="../assets/Background.jpg" alt="bg image" /> -->
                <img class="image " src="../assets/loginBG.jpg" alt="bg image" />

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
        <form @submit="login()" class="loginForm">
          <!-- <div style="padding-bottom:3vh"> -->
                      <div style="padding-bottom:3vh">

            <!-- <img
              src="@/assets/tribackground.png"
              width="200"
              alt="Mobil Serv logo"
            /> -->
                        <img
              src="../assets/Mobil_Serv-SM.png"
              width="200"
              alt="Mobil Serv logo"
            />
          </div>


          <v-text-field
            style="width: 250px;"
            v-model="username"
            required
            dense
            outlined
            label="Username"
          ></v-text-field>

          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            style="width: 250px"
            v-model="password"
            required
            dense
            outlined
            label="Password"
          >
          </v-text-field>

          <p>
            <input
              :disabled="this.disableLoginButton"
              class="loginButton"
              type="submit"
              @click.stop.prevent="login()"
              :value="this.disableLoginButton? 'loading': 'Login'"
            />
          </p>
          <small>
              <router-link to="/forgotPassword" class="link"><span class="link">Forgot Password?</span></router-link>
           </small>
           <small v-if="this.invalidPassword">
              <span style="color:red; margin-right:1.25em; display:inline-block;">{{ this.errorMessage }}</span>
           </small>
           <br v-if="!this.invalidPassword">
           <small>
              <router-link target="_blank" to="/termsAndConditions"><span>User Terms & Conditions</span></router-link>,
           </small>
        </form>
        <div class="generalTermsAndConditions" >
             <a style="text-decoration:none; color:#2e2d2d" target="_blank" href="https://corporate.exxonmobil.com/Global-legal-pages/terms-and-conditions"><span>General Terms & Conditions</span></a>
              <br>
             <a style="text-decoration:none; color:#2e2d2d" target="_blank" href="https://corporate.exxonmobil.com/Global-legal-pages/privacy-policy"><span>Privacy Policy</span></a>
           </div>
      </v-col>
    </v-row>
    <v-row v-if="this.$mq==='sm'" class="theLoginForm">
      <v-col >
        <form @submit="login()" class="loginForm">
          <div style="padding-bottom:3vh">
            <img
              src="../assets/mobil_serve_with_bg.png"
              width="200"
              alt="Mobil Serv logo"
            />
          </div>

          <v-text-field
            style="width: 250px"
            v-model="username"
            required
            dense
            outlined
            label="Username"
          ></v-text-field>

          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            style="width: 250px"
            v-model="password"
            required
            dense
            outlined
            label="Password"
          >
          </v-text-field>

          <p>
            <input
              :disabled="this.disableLoginButton"
              class="loginButton"
              type="submit"
              @click.stop.prevent="login()"
              :value="this.disableLoginButton? 'loading': 'Login'"
            />
          </p>
          <small>
              <router-link to="/forgotPassword" class="link"><span class="link">Forgot Password?</span></router-link>
           </small>
           <small v-if="this.invalidPassword">
              <span style="color:red; margin-right:1.25em; display:inline-block;">{{ this.errorMessage }}</span>
           </small>
           <br v-if="!this.invalidPassword">
           <small>
              <router-link target="_blank" to="/termsAndConditions"><span>User Terms & Conditions</span></router-link>
           </small>
        </form>
        <div class="generalTermsAndConditions">
             <a style="text-decoration:none; color:#2e2d2d" target="_blank" href="https://corporate.exxonmobil.com/Global-legal-pages/terms-and-conditions"><span>General Terms & Conditions</span></a>
              <br>
             <a target="_blank" style="text-decoration:none; color:#2e2d2d" href="https://corporate.exxonmobil.com/Global-legal-pages/privacy-policy"><span>Privacy Policy</span></a>
           </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import constants from "../constants";
const axios = require("axios").default;
let organizationMapping = {};

export default {
  data: () => ({
    username: "",
    password: "",
    select: "",
    showPassword: false,
    invalidPassword: false,
    disableLoginButton:false,
  }),

  methods: {
    reset() {
      //this.$refs.form.reset();
      this.username = "";
      this.password = "";
      this.select = "";
    },

    login: async function() {
      this.invalidPassword = false;
      this.disableLoginButton = true;
      sessionStorage.setItem("activeUser", this.username);

      const passwordHash = Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64');

      this.success = false;
      this.error = null;

      try {
        var config = {
          method: "post",
          url: `${constants.backend_url}/login`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${passwordHash}`
          },
        };
        const res = await axios(config);
        this.invalidPassword = false;
        this.disableLoginButton = false;
        console.log(res);
        console.log(res.data);
        console.log(res.data.status);
        if (res.data && res.data.access_token && res.data.status === "S") {
                this.disableLoginButton = true;

          console.log("cheking login.vue",this.$router.currentRoute.path);
          //  this.$root.$emit('loginevent', true);
          sessionStorage.setItem("jwt", this.username);
          sessionStorage.setItem("organizationName", this.select);
          sessionStorage.setItem("token", res.data.access_token)
          sessionStorage.setItem("refreshToken", res.data.refresh_token)
          sessionStorage.setItem(
            "organizationId",
            organizationMapping[this.select]
          );
          this.$router.push("/");
        } else {
          // alert("Enter Valid Details");
          this.disableLoginButton = false;
          this.invalidPassword = true;
          this.errorMessage = "Invalid Credentials, Please Try Again.";
        }
      } catch (err) {
        // alert("Login Failed, Please Enter Valid Details");
        this.disableLoginButton = false;
        this.invalidPassword = true;
        this.error = err.message;
        if (err.response && err.response.status === 401 && err.response.data.includes("Invalid credentials, remaining")) {
          this.errorMessage = err.response.data;
        } else if (err.response && err.response.status === 401 && err.response.data.includes("Your account is blocked")) {
          this.errorMessage = err.response.data;
        } else {
          this.errorMessage = "Invalid Credentials, Please Try Again.";
        }
      }
    },
  },
  beforeMount() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
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
  
  /* background-image: url("../assets/imageedit_1_2770519114.gif"); */
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
.generalTermsAndConditions{
  position:absolute;
   bottom:0;
   right: 0;
   padding-right: 10px;
   height: 50px;
   /* width: 100%; */
   text-align: right;
   font-size: small;
   

}
.link{
    color: black;
    text-decoration: none;
}
</style>
