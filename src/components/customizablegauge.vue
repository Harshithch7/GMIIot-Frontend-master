<template>
  
  <div class="card-sty">
    <v-card
      class="card-shadow"
      id="gauge-card"
      :width="gauge_data.cardWidth"
      :height="gauge_data.cardHeight"
    >
      <v-card-title > 
      <div class="pt-0 pb-0" style="margin: auto; color:#0C479D; font:Roboto, sans-serif; font-size: 20px"><b>{{gauge_data.componentName}}</b></div>
      </v-card-title>

      <v-card-text>
      <div class="d-flex justify-center ma-0" style="padding-top=-40px">
      <v-chart class="chart" :option="option" /> 
      </div>       
      </v-card-text>
    </v-card>


  </div>

</template>

<script>
import "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "customizableGauge",
  props:["gauge_data"],
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  mounted(){
    setInterval(()=>{
    //Assigning values to chart properties
    this.option.series[0].data[0].value=this.gauge_data.data

    //setting color
    for(let i in this.gauge_data.range)
    {if(this.gauge_data.data>this.gauge_data.range[i][0] && this.gauge_data.data<=this.gauge_data.range[i][1])
    this.option.series[0].itemStyle.color=this.gauge_data.range[i][2]}
    
    //console.log("from set interval",this.gauge_data.data)
},100)
    },
  data() {
    return {
      option: {
        series:[
              {
                width: "100%",
                type: 'gauge',
                center: ['50%', '65%'],
                startAngle: 200,
                endAngle: -20,
                min: this.gauge_data.min,
                max: this.gauge_data.max,
                splitNumber: this.gauge_data.splitNumber,
                itemStyle: {
                color: '#002080'
                },
                progress: {
                  show: true,
                  width: 30,
                },
                pointer: {
                  show: true,
                  width:5,
                  length:'67%',
                  icon:'triangle'
                },
                axisLine: {
                  lineStyle: {
                    width: 30
                  }
                },
                axisTick: {
                  distance: -40,
                  splitNumber: this.gauge_data.smallTicks,
                  lineStyle: {
                    width: 2,
                    //color: '#999'
                  }
                },
                splitLine: {
                  distance: -45,
                  length: 14,
                  lineStyle: {
                    width: 3,
                    //color: '#999'
                  }
                },
                axisLabel: {
                  distance: -16,
                  //color: '#999',
                  fontSize: 15
                },
                anchor: {
                  show: false
                },
                title: {
                  show: false,
                },
                detail: {
                  valueAnimation: true,
                  width: '60%',
                  lineHeight: 40,
                  borderRadius: 8,
                  offsetCenter: [0, '60%'],
                  fontSize: 20,
                  fontWeight: 'bolder',
                  formatter:`{value} ${this.gauge_data.formatter}`,
                  color: 'auto'
                },
                data: [
                  {
                   value: this.gauge_data.data,
                  }
                ]
              },
  ]
      }
    };
  }
};
</script>

<style scoped>

@media screen and (min-width: 600px)  {
.card-sty{
  display: true;
  position: absolute
}
.chart {
  height: 260px;
  width: 320px; 
  padding-bottom:35px; 
  }

}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
 .card-sty{
  display: true;
  position:absolute;
}
.chart {
  height: 210px;
  width: 320px;
  /* position: absolute    */
  }

}

</style>