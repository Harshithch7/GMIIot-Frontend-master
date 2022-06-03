<template>
  <nav >
    <ol class="breadcrumb">
      <li
      
        v-for="(crumb, ci) in crumbs"
        :key="ci"
        class="breadcrumb-item align-items-center  "
        style="text-decoration: none"
      >

        <h1 style="margin-top:-8px;" 
        class="btn  " :class="{ disabled: isLast(ci,crumb) || crumb == 'Admin Menu' }" @click="selected(crumb)">
        <!-- <span style="font-size: 14px;color:#1b52a4">  {{ crumb }}
          
        </span> -->
                <span style="font-size: 14px;color:#1b52a4; ">  {{ crumb }}
          
        </span>
                <!-- <span style="font-size: 14px;color:#1b52a4">  {{ crumb }}
          
        </span> -->
        <!-- <v-icon style="margin-left:5px; margin-right:5px" >mdi-chevron-right</v-icon> -->
        </h1>
      </li>
    </ol>
  </nav>
</template>

<script>
// import router from "../router";
export default {
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  
  methods: {
    isLast(index,crumb=0) {
      if (crumb ==='Admin Menu' || crumb ==='Report Menu')
      {
      return index === this.crumbs.length - 2;

      }
      else
      {
              return index === this.crumbs.length - 1;

      }
    },
    selected(crumb) {
        console.log("checking breadcrumbs",crumb);
//         if (crumb === 'Home')
//         {
// // router.push("/");
//         }
      this.$emit('selected', crumb);
    },
  },
};
</script>
 
<style scoped src='bootstrap/dist/css/bootstrap.min.css'>
.breadcrumb {
  background-color: white; 
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.37rem;
}
</style>