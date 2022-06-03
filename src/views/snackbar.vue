<template>
  <v-container fluid>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <template>
      <div class="text-center">
        <v-btn dark color="red darken-2" @click="snackbar = true">
          Open Snackbar
        </v-btn>

        <v-snackbar v-model="snackbar" :multi-line="multiLine">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
    <template>
  <v-card
    height="300"
    flat
  >
    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      left
      shaped
      top
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      color="blue-grey"
      absolute
      right
      rounded="pill"
      top
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      centered
      color="deep-purple accent-4"
      elevation="24"
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="primary"
      left
      text
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
  </v-card>
</template>
   
  </v-container>
</template>

<script>
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    text: `I'm a multi-line snackbar.`,
     timeout: 50,
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Snack Bar",
        disabled: true,
      },
    ],
  }),
};
</script>

