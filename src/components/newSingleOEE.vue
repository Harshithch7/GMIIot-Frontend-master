<template>
          <v-card :class="card_color(apq.oee)" min-width="270px">
            <v-card-text>
              <v-row align="center" class="mb-2">
                <v-icon>icon-dpimm</v-icon>
                <v-card-title class="pt-0 pb-0">     <div>
        <vue-custom-tooltip :label="machine">
            {{ apq.id }}
        </vue-custom-tooltip>
      </div></v-card-title>
              </v-row>
              <v-row align="center" class="mb-1">
                <div class="border-right pr-4">
                  <h3 class="text-success" v-if="parseInt(apq.oee) >= 75">OEE</h3>
                                    <h3 class="text-warning" v-if="parseInt(apq.oee) >= 50 && parseInt(apq.oee) < 75">OEE</h3>
                  <h3 class="text-red" v-if="parseInt(apq.oee) < 50">OEE</h3>

                  <h1 class="text-success transition-swing text-h2 "  v-if="parseInt(apq.oee) >= 75">{{ apq.oee == "NaN" ? "--" : apq.oee }}</h1>
                  <h1 class="text-warning transition-swing text-h2 "  v-if="parseInt(apq.oee) >= 50 && parseInt(apq.oee) < 75">{{ apq.oee == "NaN" ? "--" : apq.oee }}</h1>
                  <h1 class="text-red transition-swing text-h2 "  v-if="parseInt(apq.oee) < 50">{{ apq.oee == "NaN" ? "--" : apq.oee }}</h1>


                </div>
                
                <div class="pl-5">
                  <div class="transition-swing text-subtitle-2">A: {{ apq.availability == "NaN" ? "--" : apq.availability }}</div>
                  <div class="transition-swing text-subtitle-2">P: {{ apq.performance == "NaN" ? "--" : apq.performance }}</div>
                  <div class="transition-swing text-subtitle-2">Q: {{ apq.quality == "NaN" ? "--" : apq.quality }}</div>
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
