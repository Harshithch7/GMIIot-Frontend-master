<template>
          <v-card class="energy-card" min-width="320px">
            <v-card-text>
              <v-row align="center" class="mb-2">
                <v-icon class="text-bule">icon-dpimm</v-icon>
                <v-card-title class="font-weight-bold text-bule pt-0 pb-0"
                  >        
                  <!-- <vue-custom-tooltip :label="machine"> -->
          <!-- <h2> -->
            {{ energy.id }}

          <!-- </h2> -->
        <!-- </vue-custom-tooltip> -->
        </v-card-title
                >
                <v-icon class="text-red text-right float right"
                  >mdi mdi-information</v-icon
                >
                
              </v-row>
              <v-row align="center" class="mb-1 border-bottom pb-3">
                <div class="text-success pr-lg-3 pr-xl-4">
                  <div class="font-weight-bold transition-swing text-h6">
                    kWh
                  </div>
                </div>
                <div
                  class="
                    text-success
                    transition-swing
                   font-weight-light
                    text-h3
                  "
                >
                  {{
                    energy.energy == "NaN" ? "--" : energy.energy
                  }}
                </div>
              </v-row>
              <v-row align="center" class="mb-1">
                <div class="text-bule pr-lg-3 pr-xl-4">
                  <div class="font-weight-bold transition-swing text-h6">
                    Cost
                  </div>
                </div>
                <div
                  class="text-bule transition-swing font-weight-light text-h3"
                >
                  <sup class="mrN-2">
                    <v-icon class="text-bule">mdi mdi-currency-inr</v-icon>
                  </sup>
                 {{ energy.energy == "NaN" ? "--" : energy.cost }}
                </div>
              </v-row>
              <v-row
                align="center"
                class="justify-space-between border-top pt-2"
              >
                <div
                  class="transition-swing text-subtitle-2 text-gray font-bold"
                >
                  Avg: {{ energy.avg == "NaN" ? "--" : energy.avg }}
                </div>
                <div
                  class="transition-swing text-subtitle-2 text-gray font-bold"
                >
                  Min: {{ energy.min == "NaN" ? "--" : energy.min }}
                </div>
                <div
                  class="transition-swing text-subtitle-2 text-gray font-bold"
                >
                  Max: {{ energy.max == "NaN" ? "--" : energy.max }}
                </div>
              </v-row>
            </v-card-text>
          </v-card>
</template>

<script>
import Vue from "vue";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip";

// library.add(faRupeeSign);

// Vue.use(VueCustomTooltip, {
//   name: "VueCustomTooltip",
//   color: "#fff",
//   background: "#000",
//   borderRadius: 12,
//   fontWeight: 400,
// });

// Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
export default {
  name: "SingleMachine",
  props: ["energy"],
  components: {
    // VueCustomTooltip
  },
  data: function (){
    return {
      hover: false,
      total: "Total value in given interval of time",
      cost: "Price of total energy units(). ",
      min: "Minimum value of the ",
      max: "max",
      avg: "avg",
      machine: "machine",
    };
  },
  methods: {
         convert:(time)=>{

 // Unixtimestamp
 let unixtimestamp = time;

 // Months array
 let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

 // Convert timestamp to milliseconds
 let date = new Date(unixtimestamp*1000);

 // Year
 let year = date.getFullYear();

 // Month
 let month = months_arr[date.getMonth()];

 // Day
 let day = date.getDate();

 // Hours
 let hours = date.getHours();

 // Minutes
 let minutes = "0" + date.getMinutes();

 // Seconds
 let seconds = "0" + date.getSeconds();

 // Display date time in MM-dd-yyyy h:m:s format
 let convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 
 return convdataTime
},
        addDoc: function() {
      if (this.energy.id == "All Machines") {
        this.machine = "All Machines";
        this.avg =
          "Average of average values from daily readings of all the machines in kWh given time interval.";
        this.min =
          "Minimum of minimum values from daily readings of all the machines in kWh given time interval.";
        this.max =
          "Maximum of maximum values from daily readings of all the machines in kWh given time interval.";
        this.total =
          "Sum of total number of units in given interval for all machines.";
        this.cost =
          "Sum of cost of total energy units for all machines= total energy(kWh) * cost price of each energy unit";
      } else {
        this.machine = "machine name";
        this.avg =
          "Average value from daily readings of in kWh" +  " From: " + this.convert(this.energy.start_date) + " To: " + this.convert(this.energy.end_date);
        this.min =
          "Minimum value from daily readings of in kWh" +
          
          " From: " + this.convert(this.energy.start_date) + " To: " + this.convert(this.energy.end_date);
        this.max =
          "Maximum value from daily readings of in kWh"  +" From: " + this.convert(this.energy.start_date) + " To: " + this.convert(this.energy.end_date);
        this.total =
          "Total energy units in given time interval of " +
          this.energy.id ;
          
        this.cost =
          "Cost of total energy units of individual machine= total energy(kWh) * cost price of each energy unit";
      }
      // console.log("checking data", this.energy.id, typeof this.energy.id);
    },
  },
  mounted() {
    console.log("in mounted", this.energy.kw);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  /* padding:0px 30px 0px 10px; */
}
.text {
  padding-bottom: 0x;
}
.kw {
  color: #92d050;
}
</style>
