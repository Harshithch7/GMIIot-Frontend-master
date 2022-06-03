import Vue from 'vue'
import App from './App.vue'
// Import your component
import SideBar from './components/SideBar'
import vuetify from './plugins/vuetify'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import VTooltip from 'v-tooltip'
import jwt_decode from "jwt-decode";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faTable} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toasted from 'vue-toasted';
import VueMq from 'vue-mq';
import axios from "axios";
import constants from "./constants";


Vue.use(VTooltip)
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  }
})
Vue.mixin({
  methods: {
    noteLastAPICallTime: () => {
      sessionStorage.setItem('lastCall',(new Date().getTime()/1000).toFixed())
    }
  }
})

setInterval(()=>{
  let decoded = jwt_decode(sessionStorage.getItem('token'));
  let tokenValidityIsSeconds = decoded.exp - decoded.iat;
  let currentTimeStamp = (new Date().getTime()/1000).toFixed();
  let lastCallTimeStamp =  sessionStorage.getItem('lastCall');
  let expiryTimeStamp = decoded.exp;
  console.log("clearing session and going to login");

  if((currentTimeStamp-lastCallTimeStamp)>tokenValidityIsSeconds){
    sessionStorage.clear();
    console.log("checking time",tokenValidityIsSeconds);  
    router.push("/login");
  }else if((expiryTimeStamp-currentTimeStamp)<=120 && (currentTimeStamp-lastCallTimeStamp)<tokenValidityIsSeconds){
    console.log('fetching new token')
    let config = {
      method: 'post',
      url: `${constants.backend_url}/mobilserv/refresh`,
      headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem('refreshToken')}` 
      }
    };
    axios(config)
    .then(function (response) {
      if(response && response.data && response.data.access_token){
        sessionStorage.setItem('token',response.data.access_token);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
},60000);

Vue.use(Toasted)
library.add(faDesktop)
library.add(faTable)
library.add(faAngleRight)
library.add(faUser)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false;

// Globally register your component
Vue.component('side-bar', SideBar);
Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  VueApexCharts,
  router,
  render: h => h(App)
}).$mount('#app')
