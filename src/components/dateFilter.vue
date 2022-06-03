<template>
  <div>
    <v-row v-if="this.$mq!=='sm'">
      <v-col cols="4">
        <v-select
          :items="dateFilterItems"
          v-model="dateFilterSelected"
           prepend-icon="icon-calender"
          label="Select Duration:"
          item-text="val"
          item-value="id"
          dense
          @change="triggerDatesFilter($event)"
        />
      </v-col>
      <v-col cols="4">
        <div id="datesRangeDisplay">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
              ></v-text-field>
            </template>
            <v-date-picker v-model="dates" no-title scrollable range>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates), datePicked()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </v-col>
    </v-row>
    <div v-if="this.$mq==='sm'" style="align:flex">
      <div>
        <v-select
          :items="dateFilterItems"
          v-model="dateFilterSelected"
           prepend-icon="icon-calender"
          label="Select Dates Filter:"
          item-text="val"
          item-value="id"
          dense
          @change="triggerDatesFilter($event)"
        />
      </div>
      <div>
        <div id="datesRangeDisplay">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Date range"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="dates" no-title scrollable range>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates), datePicked()"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let todaysDate = new Date();
let dateString = `${todaysDate.getFullYear()}-${
  todaysDate.getMonth() + 1
}-${todaysDate.getDate()}`;
export default {
  name: "dateFilter",
  data: () => ({
    menu: false,
    dates: [dateString, dateString],
    dateFilterSelected: "",
    dateFilterItems: [
      { id: 6, val: "Today" },
      { id: 1, val: "Last Day" },
      { id: 2, val: "Last 7 Days" },
      { id: 3, val: "Last 15 Days" },
      { id: 4, val: "Last Month" },
      { id: 5, val: "Custom" },
    ],
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" --> ");
    },
  },
  mounted() {
    let selectedDateFilter = sessionStorage.getItem('selectedDateFilter');
    if (this.$route.name === 'plantMonitoringDashboard') {
      selectedDateFilter = null
    }
    if (selectedDateFilter) {
      selectedDateFilter = parseInt(selectedDateFilter);
      if (selectedDateFilter === 5) {
        this.dates = JSON.parse(sessionStorage.getItem('selectedDateRange'));
        this.triggerDatesFilter(selectedDateFilter);
        this.datePicked();
      } else {
        this.triggerDatesFilter(selectedDateFilter);
      }
    } else {
      this.triggerDatesFilter(6);
    }
  },
  methods: {
    triggerDatesFilter(event) {
      this.dateFilterSelected = event;
      sessionStorage.setItem('selectedDateFilter', this.dateFilterSelected)
      console.log("before getTimeStamps", this.dateFilterSelected, this.dates);
      console.log("trigged date filter", this.dateFilterSelected);
      if (event === 5) {
        document.querySelector("#datesRangeDisplay").style.display = "block";
      } else {
        this.getTimeStamps(this.dateFilterSelected, this.dates);
        this.$toasted
          .show(
            `${new Date(
              this.start_date * 1000
            ).toLocaleString()} --> ${new Date(
              this.end_date * 1000
            ).toLocaleString()}`
          )
          .goAway(6000);
        this.$parent.datePicked([this.start_date, this.end_date]);
        document.querySelector("#datesRangeDisplay").style.display = "none";
      }
    },
    datePicked() {
      //this.$parent.datePicked(this.dates)
      this.$parent.dateRangeSelected = this.dates;
      sessionStorage.setItem('selectedDateRange', JSON.stringify(this.$parent.dateRangeSelected));
      console.log(
        "before getTimeStamps lala",
        this.dateFilterSelected,
        this.dates
      );
      this.getTimeStamps(this.dateFilterSelected, this.dates);
      this.$toasted
        .show(
          `${new Date(this.start_date * 1000).toLocaleString()} --> ${new Date(
            this.end_date * 1000
          ).toLocaleString()}`
        )
        .goAway(6000);
      this.$parent.datePicked([this.start_date, this.end_date]);
    },
    formatDateData(x) {
      console.log("inside the formatDateData", x);
      var today = new Date();
      today.setDate(today.getDate() - x);
      return (today / 1000).toFixed(0);
    },
    formatStartDate: (x) => {
      var today = new Date();
      today.setDate(today.getDate() - x);
      today.setHours(0, 0, 0, 0);
      return (today / 1000).toFixed(0);
    },
    formatEndDate: (x) => {
      var today = new Date();
      today.setDate(today.getDate() - x);
      today.setHours(23, 59, 59, 0);
      return (today / 1000).toFixed(0);
    },
    formatDate(y) {
      var today = new Date(y);
      return (today / 1000).toFixed(0);
    },
    getTimeStamps(date_filter_id, date_range_id) {
      if (date_filter_id === 1) {
        this.start_date = this.formatStartDate(1);
        this.end_date = this.formatEndDate(1);
      } else if (date_filter_id === 6) {
        this.start_date = this.formatStartDate(0);
        this.end_date = this.formatDateData(0);
      } else if (date_filter_id === 2) {
        this.start_date = this.formatStartDate(7);
        this.end_date = this.formatDateData(0);
      } else if (date_filter_id === 3) {
        this.start_date = this.formatStartDate(15);
        this.end_date = this.formatDateData(0);
      } else if (date_filter_id === 4) {
        this.start_date = this.formatStartDate(30);
        this.end_date = this.formatDateData(0);
      } else if (date_filter_id === 5) {
        let datesSelected =
          date_range_id != null ? date_range_id.toString().split(",") : "";
        if (datesSelected.length > 1) {
          this.start_date = this.formatDate(datesSelected[0]);
          this.end_date = this.formatDate(datesSelected[1]);
        } else {
          alert("Please select valid date range");
          return;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

#datesRangeDisplay {
  display: none;
}
.stuff {
  z-index: 90;
}
</style>