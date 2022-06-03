<template>
<div>
       <v-progress-circular
        color="primary"
        indeterminate
        :size="20"
        :width="3"
        :value="0"
        style=" margin-bottom: -30px; margin-left: 20px   "
      ></v-progress-circular>
</div>
</template>
<script>
export default {
  name: "LoaderProgress",


}
</script>