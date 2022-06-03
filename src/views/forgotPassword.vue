<template>
  <div class="theLoginPage">
    <v-row v-if="this.$mq!=='sm'">
      <v-col cols="9" class="imageLogin"
        ><img class="image container" src="../assets/loginBG.jpg" alt="bg image" />
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
        <form @submit="forgotPassword()" class="loginForm">
          <div style="padding-bottom:3vh">
            <!-- <router-link to="/login"><img
              src="@/assets/tribackground.png"
              width="200"
              alt="Mobil Serv logo"
            /></router-link> -->
              <router-link to="/login"><img
              src="../assets/Mobil_Serv-SM.png"
              width="200"
              alt="Mobil Serv logo"
            /></router-link>
          </div>


          <v-text-field
            style="width: 250px"
            v-model="username"
            required
            dense
            outlined
            label="Username"
          ></v-text-field>

          <p>
            <input
              class="loginButton"
              type="submit"
              @click.stop.prevent="forgotPassword()"
              value="Request"
            />
          </p>
        </form>
      </v-col>
    </v-row>
    <v-row v-if="this.$mq==='sm'" class="theLoginForm">
      <v-col >
        <form @submit="forgotPassword()" class="loginForm">
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

          <p>
            <input
              class="loginButton"
              type="submit"
              @click.stop.prevent="forgotPassword()"
              value="Request"
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

export default {
  data: () => ({
    username: "",
  }),

  methods: {

    forgotPassword: function() {
      if(this.organization===""){
        alert('please select orgnization')
        return;
      }else if(this.username==="" || this.username===null){
        alert('please enter username')
        return;
      }
        var config = {
          method: "post",
          url: `${constants.backend_url}/forgotPwd`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_name: this.username
          }
        };
        axios(config)
        .then(response=>{
          if (response.data && response.data.status === "S") {
          alert("password reset link will be sent to your registered email");
          this.$router.push("/login");
          } else {
            alert("request failed, please make sure that you've entered proper username and password");
          }
        }).catch(err=>{
            alert("request failed, please make sure that you've entered proper username and password");
            console.log(err)
        })
    },
  },
  beforeMount() {
  },
};
</script>
<style scoped>
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
  padding: 1px 70px 1px 70px;
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
