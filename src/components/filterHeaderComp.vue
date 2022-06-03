<template>
  <v-row>
    <v-col cols="12" md="4" sm="12">
      <v-autocomplete
        :items="machineItems"
        v-model="machineSelected"
        prepend-icon="icon-dpimm"
        label="Select Machine:"
        item-text="machine_name"
        item-value="id"
        dense
        @change="triggerMachine($event)"
      />
    </v-col>
    <v-col cols="12" md="3" sm="12">
      <v-select
        :items="dateFilterItems"
        v-model="dateFilterSelected"
        prepend-icon="icon-calender"
        label="Select Duration"
        item-text="val"
        item-value="id"
        dense
        @change="triggerDatesFilter($event)"
      />
    </v-col>
    <v-col cols="12" md="5" sm="12">
      <div id="datesRangeDisplay">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
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
          <div class="dateAndTimePicker">
            <v-date-picker v-model="dates" no-title range>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates), datePicked()"
              >
                OK
              </v-btn>
            </v-date-picker>
            <v-time-picker v-model="startTime" :max="endTime"></v-time-picker>
            <v-time-picker
              v-model="endTime"
              :min="this.startTime"
            ></v-time-picker>
          </div>
        </v-menu>
      </div>
    </v-col>
    
  </v-row>
</template>

<script>
import axios from "axios";
import constants from "../constants";
import moment from "moment";
import router from "../router";
let todaysDate = new Date();
let dateString = `${todaysDate.getFullYear()}-${todaysDate.getMonth() +
  1}-${todaysDate.getDate()}`;
export default {
  name: "filterHeaderComp",
  data: () => ({
    menu: false,
    dates: [dateString, dateString],
    dateFilterSelected: "",
    dateFilterItems: [
      { id: 6, val: "Last Hour" },
      { id: 7, val: "Today" },
      { id: 1, val: "Last Day" },
      { id: 2, val: "Last 7 Days" },
      { id: 3, val: "Last 15 Days" },
      { id: 4, val: "Last Month" },
      { id: 5, val: "Custom" },
    ],
    machineSelected: "",
    machineItems: [],
    date_filter_id: "",
    date_filter_id_Selected: "",
    dateRangeSelected: "",
    start_date: "",
    end_date: "",
    startTime: "00:00",
    endTime: "23:59",
  }),
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate page in filter", to, "--from ", from, next);
  },
  mounted() {
    console.log("The Parent Data", this.$parent.$options.name);
    if (
      this.$route.name == "boxplot" ||
      this.$route.name == "machineInsights" ||
      this.$route.name == "energyConsumptionReport" ||
      this.$route.name == "productionEnergyConsumptionReport" ||  
      this.$route.name == "performanceTrends" ||
      this.$route.name == "productionReport" ||
      this.$route.name == "cycleTimeVarianceReports"
    ) {
      this.dateFilterItems = [
        { id: 7, val: "Today" },
        { id: 1, val: "Last Day" },
        { id: 2, val: "Last 7 Days" },
        { id: 3, val: "Last 15 Days" },
        { id: 4, val: "Last Month" },
        { id: 5, val: "Custom" },
      ];
    }
    // apqCharts
    console.log("url is --", this.$route.name);
    if (
      this.$route.name == "apqMachine" ||
      this.$route.name == "machineInsights" ||
      this.$route.name == "EnergyConsumptionReport" ||
      this.$route.name == "ProductionEnergyConsumptionReport" ||
      this.$route.name == "performanceTrends" ||
      this.$route.name == "Production Report" ||
      this.$route.name == "cycleTimeVarianceReports"
    ) {
      let selectedDate = sessionStorage.getItem("selectedDateFilter");
      if (selectedDate && selectedDate < 6) {
        selectedDate = parseInt(selectedDate);
        this.dateFilterSelected = selectedDate;
      } else {
        this.dateFilterSelected = 7;
      }
    }
    
    else if (this.$route.name == "boxplot") {
      let selectedDate = sessionStorage.getItem("selectedDateFilter");
      if (selectedDate && selectedDate < 6) {
        selectedDate = parseInt(selectedDate);
        this.dateFilterSelected = selectedDate;
      } else {
        this.dateFilterSelected = 2;
      }
    } else if (this.$route.name == "oilQualityMonitoring") {
      this.dateFilterSelected = 7;
    }
    else if (this.$route.name == "gmiiotMachineRawDataReport") {
      this.dateFilterSelected = "";
    } 
     else {
      let selectedDate = sessionStorage.getItem("selectedDateFilter");
      if (this.$route.name === "oilCleanlinessMonitoring") {
        selectedDate = null;
      }
      if (selectedDate && selectedDate < 6) {
        selectedDate = parseInt(selectedDate);
        this.dateFilterSelected = selectedDate;
      } else {
        this.dateFilterSelected = 6;
      }
    }

    console.log("url is --", this.$route);

    let datesInSession = sessionStorage.getItem("dates");

    if (datesInSession && this.dateFilterSelected === 5) {
      this.dates = datesInSession;
      document.querySelector("#datesRangeDisplay").style.display = "block";
    } else if (this.dateFilterSelected === 5) {
      this.dates =
        JSON.parse(sessionStorage.getItem("selectedDateRange"))[0] +
        "," +
        JSON.parse(sessionStorage.getItem("selectedDateRange"))[1];
      document.querySelector("#datesRangeDisplay").style.display = "block";
      this.dates = this.dates.split(",");
    }
    this.assigningFilteredStartDateAndEndDate(
      this.dateFilterSelected,
      this.dates
    );
    this.setMachineData();
    if (this.$route.params != null && this.$route.params.macId != null) {
      this.machineSelected = this.$route.params.macId;
      console.log("assigning mac test ", this.machineSelected);
    }
    if (
      sessionStorage.getItem("selectedMachine") &&
      !this.$route.params.macId
    ) {
      this.machineSelected = JSON.parse(
        sessionStorage.getItem("selectedMachine")
      ).machine_name;
      this.triggerMachine(
        JSON.parse(sessionStorage.getItem("selectedMachine")).id
      );
    }
  },
  computed: {
    dateRangeText() {
      let startDateAndTime = this.dates[0] + " " + this.startTime;
      let endDateAndTime = this.dates[1] + " " + this.endTime;
      return startDateAndTime + " --> " + endDateAndTime;
    },
  },
  methods: {
    setMachineData() {
      let config = {
        method: "get",
        url: `${constants.backend_url}/getMachineNames`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      this.noteLastAPICallTime();
      axios(config)
        .then((response) => {
          if (response.data.data.length == 1) {
            console.log("hello", response.data.data[0].id);
            this.machineSelected = response.data.data[0].id;
            // let filter=1;
            // this.dateFilterSelected = 6;
            // let filter = 1;
            console.log(
              "going to assigningFilteredStartDateAndEndDate",
              this.machineSelected
            );
            if (this.dateFilterSelected != "")
            {
            this.assigningFilteredStartDateAndEndDate(
              this.dateFilterSelected,
              this.dates
            );
            console.log(
              "going to parent with",
              this.machineSelected,
              this.start_date,
              this.end_date
            );
            if (isNaN(this.machineSelected) == false) {
              this.$toasted
                .show(
                  `${new Date(
                    this.start_date * 1000
                  ).toLocaleString()} --> ${new Date(
                    this.end_date * 1000
                  ).toLocaleString()}`
                )
                .goAway(6000);
              this.$parent.intervalFetchData(
                this.machineSelected,
                this.start_date,
                this.end_date
              );
            }
            }
          } else {
            // this.machineSelected = parseInt(
            //   sessionStorage.getItem("machineID")
            // );
            let machine_id = parseInt(sessionStorage.getItem("machineID"));
            let startDate = parseInt(sessionStorage.getItem("startDate"));
            let endDate = parseInt(sessionStorage.getItem("endDate"));
            console.log(
              "going to parent in case of qpqmachine else of filter comp",
              this.machineSelected,
              this.start_date,
              this.end_date,
              this.$route.name
            );
            console.log(
              "going to parent in else of filter comp",
              machine_id,
              startDate,
              endDate
            );
            if (isNaN(machine_id) == false) {
              this.$toasted
                .show(
                  `${new Date(
                    this.start_date * 1000
                  ).toLocaleString()} --> ${new Date(
                    this.end_date * 1000
                  ).toLocaleString()}`
                )
                .goAway(6000);
              this.$parent.intervalFetchData(
                machine_id,
                startDate
                  ? startDate
                  : Math.floor(moment().startOf("day") / 1000),
                endDate ? endDate : Math.floor(Date.now() / 1000)
              );
            } else if (
              this.$route.name == "apqMachine" ||
              this.$route.name == "multiGauge" ||
              this.$route.name == "EnergyMonitoringTrends" ||
              ((this.$route.name == "apqCharts" ||
                this.$route.name == "performanceTrends") &&
                isNaN(this.machineSelected) == false)
            ) {
              this.$toasted
                .show(
                  `${new Date(
                    this.start_date * 1000
                  ).toLocaleString()} --> ${new Date(
                    this.end_date * 1000
                  ).toLocaleString()}`
                )
                .goAway(6000);
              this.$parent.intervalFetchData(
                this.machineSelected,
                startDate
                  ? startDate
                  : Math.floor(moment().startOf("day") / 1000),
                endDate ? endDate : Math.floor(Date.now() / 1000)
              );
            }
          }

          console.log("response--getMachineNames", response.data);
          let machineData = response.data.data;
          machineData.sort((first_machine, second_machine) => {
            return constants.compareObjects(
              first_machine,
              second_machine,
              "machine_name"
            );
          });
          console.log("cehcking machine dayta=>", machineData);
          this.machineItems = machineData;

          this.machineItems = response.data.data;
          if (this.$route.name == "boxplot") {
            this.machineItems.push({ id: "all", machine_name: "All Machines" });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            router.push("/login");
          } else {
            console.log("error--getMachineNames", error);
          }
        });
    },
    triggerMachine(event) {
      console.log("trigger machine event is ", event);
      this.machineSelected = event;
      for (let i = 0; i < this.machineItems.length; i++) {
        if (this.machineItems[i].id == this.machineSelected) {
          sessionStorage.setItem(
            "selectedMachine",
            JSON.stringify(this.machineItems[i])
          );
        }
      }
      console.log(
        "checking after selecting machine",
        "machine id",
        this.machineSelected,
        "datefilterselect",
        this.dateFilterSelected,
        "dates range id",
        this.dates
      );
      this.assigningFilteredStartDateAndEndDate(
        this.dateFilterSelected,
        this.dates
      );
      console.log(
        "goign to parent after selcting machine start date - ",
        this.start_date,
        this.end_date
      );
      if (this.machineSelected) {
        this.$toasted
          .show(
            `${new Date(
              this.start_date * 1000
            ).toLocaleString()} --> ${new Date(
              this.end_date * 1000
            ).toLocaleString()}`
          )
          .goAway(6000);
        this.$parent.intervalFetchData(
          this.machineSelected,
          this.start_date,
          this.end_date
        );
      }
    },
    formatDateData: (x) => {
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
    formatDate: (y) => {
      var today = new Date(y);
      return (today / 1000).toFixed(0);
    },
    assigningFilteredStartDateAndEndDate(date_filter_id, date_range) {
      console.log(
        "Inside assigningFilteredStartDateAndEndDate",
        date_filter_id,
        "checking range",
        date_range
      );
      this.date_filter_id_Selected = date_filter_id;
      let date_range_id = date_range;
      console.log(
        "checking date filter and date range before assigning start and end date",
        this.date_filter_id_Selected,
        date_range_id
      );
      if (this.date_filter_id_Selected === 1) {
        this.start_date = this.formatStartDate(1);
        this.end_date = this.formatEndDate(1);
        sessionStorage.setItem("startDate", this.start_date);
        sessionStorage.setItem("endDate", this.end_date);
      } else if (this.date_filter_id_Selected === 2) {
        this.start_date = this.formatStartDate(7);
        this.end_date = this.formatDateData(0);
      } else if (this.date_filter_id_Selected === 3) {
        this.start_date = this.formatStartDate(15);
        this.end_date = this.formatDateData(0);
      } else if (this.date_filter_id_Selected === 4) {
        this.start_date = this.formatStartDate(30);
        this.end_date = this.formatDateData(0);
      } else if (this.date_filter_id_Selected === 5) {
        let datesSelected =
          date_range_id != null ? date_range_id.toString().split(",") : "";
        if (datesSelected.length > 1) {
          console.log(">>>>>>>> datesSelected >>>>>>>>>>", datesSelected);
          this.start_date = moment(
            `${datesSelected[0]} ${this.startTime}`,
            "yyyy-MM-DD hh:mm"
          ).unix();
          this.end_date = moment(
            `${datesSelected[1]} ${this.endTime}`,
            "yyyy-MM-DD hh:mm"
          ).unix();
        } else {
          alert("Please select valid date range");
          return;
        }
      } else if (this.date_filter_id_Selected === 6) {
        let timeNow = new Date().getTime();
        this.start_date = ((timeNow - 60 * 60 * 1000) / 1000).toFixed();
        this.end_date = (timeNow / 1000).toFixed();
      } else if (this.date_filter_id_Selected === 7) {
        this.start_date = this.formatStartDate(0);
        this.end_date = this.formatDateData(0);
      } else {
        //     this.start_date = this.formatDateData(7);
        //   this.end_date = this.formatDateData(0);
      }
      sessionStorage.setItem("startDate", this.start_date);
      sessionStorage.setItem("endDate", this.end_date);
    },
    triggerDatesFilter(event) {
      this.dateFilterSelected = event;
      // sessionStorage.setItem('selectedDateFilter', this.dateFilterSelected);
      sessionStorage.setItem("dateFilter", this.dateFilterSelected);

      this.assigningFilteredStartDateAndEndDate(
        this.dateFilterSelected,
        this.dates
      );
      console.log(
        "checking after selecting datefilter",
        "machine id",
        this.machineSelected,
        "datefilterselect",
        this.dateFilterSelected,
        "dates range id",
        this.dates
      );

      if (event === 5) {
        document.querySelector("#datesRangeDisplay").style.display = "block";
        this.menu = true;
      } else {
        console.log(
          "1 calling Parent with",
          this.machineSelected,
          this.start_date,
          this.end_date
        );
        if (isNaN(this.machineSelected) == false)
          this.$toasted
            .show(
              `${new Date(
                this.start_date * 1000
              ).toLocaleString()} --> ${new Date(
                this.end_date * 1000
              ).toLocaleString()}`
            )
            .goAway(6000);
        this.$parent.intervalFetchData(
          this.machineSelected,
          this.start_date,
          this.end_date
        );
        document.querySelector("#datesRangeDisplay").style.display = "none";
      }
    },
    datePicked() {
      console.log(
        "the machine selected in custom date is: ",
        this.machineSelected
      );
      this.dateRangeSelected = this.dates;
      sessionStorage.setItem("dates", this.dates);

      this.assigningFilteredStartDateAndEndDate(5, this.dates);
      console.log(
        "1 calling Parent with",
        this.machineSelected,
        this.start_date,
        this.end_date
      );
      if (isNaN(this.machineSelected) == false)
        this.$toasted
          .show(
            `${new Date(
              this.start_date * 1000
            ).toLocaleString()} --> ${new Date(
              this.end_date * 1000
            ).toLocaleString()}`
          )
          .goAway(6000);
      this.$parent.intervalFetchData(
        this.machineSelected,
        this.start_date,
        this.end_date
      );
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* @media screen and (min-width: 600px)  {
#div2{
  display: none;
}

}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
 .dateAndTimePicker {
  display: auto;
}

} 
@media screen and (min-width: 601px) {
 .dateAndTimePicker {
  display: flex;
}

} 
#datesRangeDisplay {
  display: none;
  
}
.stuff {
  z-index: 90;
}

</style>
