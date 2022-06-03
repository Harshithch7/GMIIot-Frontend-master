<template>
  <div class="card-sty">
    <v-card
      class="item1 card-shadow"
      id="gauge-card"
      :width="gag.maxwidth"
      :height="gag.maxheight"
    >
      <v-card-title> </v-card-title>
      <v-card-text>
        <div class="transition-swing text-h6 font-weight-bold text-center" style="margin-top: -20px;margin-bottom: -10px;">
            Machine Up Time
          </div>
        <apexchart
          type="radialBar"
          :width="gag.width"
          :options="chartOptions"
          :series="gag.series"
          style="margin: 0px 0px 01px 0px"
        >
        </apexchart>
        <h5
          v-bind:class="{
            minClass: isEnergy == 'true',
            minClass1: gag.isEnergy == 'false',
          }"
        >
          {{ gag.minValue }}
        </h5>
        <h5
          v-bind:class="{
            maxClass: isEnergy == 'true',
            maxClass1: gag.isEnergy == 'false',
          }"
        >
          {{ gag.maxValue }}
        </h5>
        <h5
          style="font-size: small; font-weight: bold; 
        text-align: center"
        >
          {{ gag.originalValue }}
        </h5>

        <h6 style="font-size: -small; text-align: center">
          {{ gag.timestamp }}
        </h6>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "guage",
  props: ["gag"],
  components: {
    apexchart: VueApexCharts,
  },
  data: function() {
    return {
      //message: 'time to update',
      //unit: 'unit',
      //component_name: "name",
      //series: [76],
      isEnergy: "true",
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        // title: {
        //   text: this.gag.component_name,
        //   align: "center",
        //   style: {
        //     color: "#484848",
        //     // fontFamily: "EMPrint",
        //     marginTop:"-5px;",
        //     fontSize: "18px",
        //     fontWeight: "bold",
        //   },
        // },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            //                                  hollow: {
            //                  margin: 0,
            //                  size: '70%',
            //                background: '#fff',
            //              image: undefined,
            //            imageOffsetX: 0,
            //          imageOffsetY: 0,
            //        position: 'front',
            //      dropShadow: {
            //        enabled: true,
            //        top: 3,
            //        left: 0,
            //        blur: 4,
            //        opacity: 0.24
            //     }
            //   },
            track: {
              background: "#e7e7e7",
              strokeWidth: "90%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              textAnchor: "middle",
              name: {
                // show: false,
                name: {
                  fontSize: "18px",
                  offsetY: -50,
                  color: "#222222",
                },
              },
              value: {
                offsetY: -2,
                fontSize: "0px",
                formatter: function(val) {
                  return val + "%";
                },
              },
            },
          },
        },
        //grid: {
        //padding: {
        //top: -10,
        //},
        //},
        fill: {
          // type: "gradient",
          colors: ["#002080"],
          //       gradient: {
          //       shade: "dark",
          //     shadeIntensity: 0.4,
          //   inverseColors: false,
          // opacityFrom: 1,
          //opacityTo: 1,
          //stops: [0, 50, 53, 91],
          // },
        },
        // stroke: {
        //   dashArray: 4
        //    },
        labels: [""],
      },
    };
  },
};
</script>

<style scope>
#gauge-card {
  /* border-style: solid ;
  border-radius: 15px;
    border-color: #a7a7a7; */
}
.item2 {
  font-family: "EMPrint";
  font-size: 16px;
  font-weight: bold;
}
.minClass {
  font-size: small;
  font-weight: bolder;
  text-align: center;
  margin: -20px 50px -5px -60px;
}
.minClass1 {
  font-size: small;
  font-weight: bolder;
  text-align: center;
  margin: -20px 140px -5px -60px;
}
.maxClass {
  font-size: small;
  font-weight: bolder;
  text-align: center;
  margin: -22px -200px 0px -80px;
}
.maxClass1 {
  font-size: small;
  font-weight: bolder;
  text-align: center;
  margin: -22px -300px 0px -80px;
}
@media screen and (max-width: 600px)  {
.card-sty{
  width: 350px
}

}

</style>
