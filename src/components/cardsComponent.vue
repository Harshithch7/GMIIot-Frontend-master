<template>
<!-- <div class="grid-container">   -->
  <div id ="playout">
  <table class="tableStyle">
    <th class="thStyle"> 
      <td class="tdStyle">   
         <div> {{cardsCompData.headerName}}</div>    
      </td>
    </th>
    <tr class="trStyle"> 
      <td class="tdStyle">       
          <div v-if="cardsCompData.headerName === 'Plug State'">
              <div v-if="cardsCompData.contentName === 'ON'">
                  <p id ="buttonLayout1">{{cardsCompData.contentName}}</p>
              </div> 
              <div v-else>
                  <p id ="buttonLayout2">{{cardsCompData.contentName}}</p>
              </div>   
          </div> 
          <div v-else>
                        <div v-if="cardsCompData.headerName==='Total Today'">
            <vue-custom-tooltip :label="date" >
                           {{cardsCompData.contentName}}

            </vue-custom-tooltip>
          </div >
          <div v-else>
            {{cardsCompData.contentName}}
          </div>
          </div>
      </td>
    </tr>   
  </table>
  </div>
  <!-- </div> -->
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
  name: 'cardsComponent',
  props:["cardsCompData"],
  components: {
VueCustomTooltip
  },
  data: function(){
return{
  date: "From:",

}
  },
    mounted(){
      var d = new Date();
d.setHours(0,0,0,0);     console.log("checking today",d,this.cardsCompData.headerName);
this.date = "From: "+d ;

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tableStyle{
  width: 100%;
  border-collapse: collapse; 
}
.thStyle{ 
  border-bottom: 3px solid rgb(175, 173, 173);
}
.trStyle{
  height: 80px;
  border-collapse: collapse; 
}
.tdStyle{
  text-align: center;
  padding: 5px;
}

#playout {
  border-radius: 10px;
  border: 2px solid  rgb(173, 171, 171);
  padding: 5px; 
  width: 160px;
  height: 120px;  
  background-color: #fff;
  margin: 5px;
}

#buttonLayout1 {
  border-radius: 5px;
  background:rgb(118, 192, 6);
  padding-top: 5px;
  padding-bottom: 10px; 
  width: 100px;
  height: 40px;  
  color:white; 
  font: bold;
  align-content: center;
}

#buttonLayout2 {
  border-radius: 5px;
  background:red;
  padding-top: 5px;
  padding-bottom: 10px;  
  width: 100px;
  height: 40px;   
  color:white; 
  font: bold;
  align-content: center;
}

.grid-container {
  display: grid; 
  grid-gap: 5px;
  background-color: white;
  padding: 10px;
  height:40%;
  width: 90%;
}

.grid-container > div {
  background-color:white;
  text-align: center;
  font-size: 20px;
  border-radius: 20px;
}
</style>