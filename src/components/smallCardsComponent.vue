<template>
<div class="grid-container">  
  <div id ="playout">
  <table class="tableStyle">
    <th class="thStyle"> 
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
            {{cardsCompData.contentName}}
          </div>
      </td>
    </tr>   
  </table>
  </div>
  </div>
</template> 

<script>
export default {
  name: 'smallcardsComponent',
  props:["cardsCompData"]
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
  font: bold;
}

#playout {
  border-radius: 10px;
  /* border: 2px solid  rgb(173, 171, 171); */
  padding: 5px; 
  width: 80px;
  height: 90px;  
  background-color: #fff;
  margin: 5px;
}

#buttonLayout1 {
  border-radius: 5px;
  background:rgb(118, 192, 6);
  padding-bottom: 10px; 
    margin-top: -20px;

  width: 40px;
  height: 20px;  
  color:white; 
  font: bold;
  align-content: center;
}

#buttonLayout2 {
  border-radius: 5px;
  background:red;
  margin-top: -20px;
  
  padding-bottom: 10px;  
  width: 40px;
  height: 20px;   
  color:white; 
  font: bold;
  align-content: center;
}

.grid-container {
  display: grid; 
  grid-gap: 5px;
  /* margin-top: -10px; */
  background-color: white;
  padding: 10px;
  height:40%;
  width: 90%;
}

.grid-container > div {
  background-color:white;
  text-align: center;
  font-size: 10px;
  border-radius: 20px;
}
</style>