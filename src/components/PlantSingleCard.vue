<template>
  <v-card :class="card_color(apq.oee)" min-width="300px">
    <v-card-text>
      <v-row align="center" class="mb-2">
        <v-icon>icon-dpimm</v-icon>
        <v-card-title class="pt-0 pb-0">
          <div>
            <vue-custom-tooltip :label="machine">
              {{ apq.machine_name }}
            </vue-custom-tooltip>
                          
            <!-- <smallcardsComponent
              v-bind:cardsCompData="{
                headerName: apq.plugState.headerName,
                contentName: apq.plugState.contentName,
              }"
            />&nbsp; -->
          </div>
<div v-if="apq.plugState.headerName === 'Plug State'">
   <v-btn
   v-if="apq.plugState.contentName === 'ON'"
      style="margin-left: 150px"
      
      
      color="success"
      
    >
      {{apq.plugState.contentName}}
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>
       <v-btn
       v-else
      style="margin-left: 150px"
      
      
      color="error"
      
    >
      {{apq.plugState.contentName}}
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>

              </div>
          </v-card-title
        >
      </v-row>
      <v-row align="center" class="mb-1">
        <div class="text-red border-right pr-4">
                 <h3 class="text-success" v-if="parseInt(apq.oee) >= 75">OEE</h3>
                                    <h3 class="text-warning" v-if="parseInt(apq.oee) >= 50 && parseInt(apq.oee) < 75">OEE</h3>
                  <h3 class="text-red" v-if="parseInt(apq.oee) < 50">OEE</h3>

          <h1 class="text-success transition-swing text-h2" v-if="parseInt(apq.oee) >= 75">
            {{ apq.oee == "NaN" ? "--" : apq.oee }}
          </h1>
          <h1
            class="text-warning transition-swing text-h2"
            v-if="parseInt(apq.oee) >= 50 && parseInt(apq.oee) < 75"
          >
            {{ apq.oee == "NaN" ? "--" : apq.oee }}
          </h1>
          <h1 class="text-danger transition-swing text-h2" v-if="parseInt(apq.oee) < 50">
            {{ apq.oee == "NaN" ? "--" : apq.oee }}
          </h1>
        </div>

        <div class="pl-5">
          <div class="transition-swing text-subtitle-4">
            Total Uptime:
            {{ apq.totalUpTime == "NaN" ? "--" : apq.totalUpTime }}
          </div>
          <div class="transition-swing text-subtitle-4">
            Total Power Consumption:
            {{ apq.powerConsumption == "NaN" ? "--" : apq.powerConsumption }} kWh
          </div>
          <div class="transition-swing text-subtitle-4">
            Total Production:
            {{ apq.productionQty == "NaN" ? "--" : apq.productionQty }} units
          </div>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip";

Vue.use(VueCustomTooltip, {
  name: "VueCustomTooltip",
  color: "#fff",
  background: "#000",
  borderRadius: 12,
  fontWeight: 400,
});

export default {
  name: "SingleMachine",
  props: ["apq"],
  components: {
    // VueCustomTooltip,
  },
  data: function() {
    return {
      avail: "Availability",
      perf: "Performance",
      Qty: "Quantity",
      machine: "Machine name",
    };
  },
  methods: {
        card_color(value){
console.log("card coo",value);
      if (value < 50) {
        return "oee-card oee-card-danger  card-shadow";
      } else if (value == 50 || value < 75) {
        return "oee-card oee-card-warning  card-shadow";
      } else {
        return "oee-card oee-card-sucess  card-shadow";
      }
    },
    getColors(value) {
      value = parseInt(value);
      if (value >= 75) {
        return "#92D050";
      } else if (value >= 50 && value < 75) {
        return "#ED8B00";
      } else {
        return "#ff0000";
      }
    },
  },
  mounted() {
    // console.log("checking eadername",this.apq.plugState.headerName);
    // let elements = document.getElementsByClassName("oeeValue");
    // elements.forEach((element, index) => {
    //   let color = this.getColors(element.innerHTML);
    //   console.log("the element is ==> ",element , this.apq.oee," the color is ==> ",color);
    //   element.style.color = color;
    //   document.getElementsByClassName("oeeHeading")[index].style.color = color;
    // });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  padding: 0px 30px 0px 10px;
}
.text {
  padding-bottom: 0x;
}
.oeeGreen {
  color: #92d050 !important;
}
.oeeOrange {
  color: #ed8b00 !important;
}
.oeeRed {
  color: #ff0000 !important;
}
</style>
