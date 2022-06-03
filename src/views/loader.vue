<template>
  <v-container fluid>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <template>
      <div class="text-center">
        <v-btn
          :disabled="dialog"
          :loading="dialog"
          class="white--text"
          color="purple darken-2"
          @click="dialog = true"
        >
          Start loading
        </v-btn>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text class="pt-5">
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template>
      <div class="text-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :width="3"
          color="red"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :width="3"
          color="green"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    },
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
