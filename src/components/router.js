import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";/

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/customerFeatures",
      name: "customerFeatures",
      component: () => import("./views/customerFeaturesConfig.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/CustomersManagement",
      name: "CustomersManagement",
      component: () => import("./views/CustomersManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/plantMonitoringDashboard",
      name: "plantMonitoringDashboard",
      component: () => import("./views/PlantMonitoringDashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/CustomerAnalysisConfig",
      name: "CustomerAnalysisConfig",
      component: () => import("./views/CustomerAnalysisConfig.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/LocationsManagement",
      name: "LocationsManagement",
      component: () => import("./views/LocationsManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/userManagement",
      name: "userManagement",
      component: () => import("./views/UserManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/productSetup",
      name: "productSetup",
      component: () => import("./views/productSetup.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/cycleTimeVarianceReports",
      name: "cycleTimeVarianceReports",
      component: () => import("./views/cycleTimeVarianceReports.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/roleManagement",
      name: "roleManagement",
      component: () => import("./views/RoleManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/machinesManagement",
      name: "machinesManagement",
      component: () => import("./views/machinesManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/devicesManagement",
      name: "devicesManagement",
      component: () => import("./views/DevicesManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/machineInsights",
      name: "machineInsights",
      component: () => import("./views/MachineInsights.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/productionReport",
      name: "productionReport",
      component: () => import("./views/ProductionReport.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/EnergyConsumptionReport",
      name: "energyConsumptionReport",
      component: () => import("./views/EnergyConsumptionReport.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ProductionEnergyConsumptionReport",
      name: "productionEnergyConsumptionReport",
      component: () => import("./views/ProductionEnergyConsumptionReport.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/parametersManagement/:previousIds",
      name: "parametersManagement",
      component: () => import("./views/ParametersManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue"),
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: () => import("./views/forgotPassword.vue"),
    },
    {
      path: "/resetPassword/:token",
      name: "resetPassword",
      component: () => import("./views/resetPassword.vue"),
    },
    {
      path: "/termsAndConditions",
      name: "termsAndConditions",
      component: () => import("./views/termsAndConditions.vue"),
    },
    {
      path: "/privacyAndCookiePolicy",
      name: "privacyAndCookiePolicy",
      component: () => import("./views/privacyAndCookiePolicy.vue"),
    },
    {
      path: "/",
      name: "loading",
      component: () => import("./components/loading.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/performanceTrends",
      name: "performanceTrends",
      component: () => import("./views/performanceTrends.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/boxplot",
      name: "boxplot",
      component: () => import("./views/boxplot.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/multipleEnergy",
      name: "multipleEnergy",
      component: () => import("./views/multipleEnergy.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/multipleOEE",
      name: "multipleOEE",
      component: () => import("./views/multipleOEE.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/pmPage",
      name: "pmPage",
      component: () => import("./views/pmPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/machineProcessTemperature",
      name: "machineProcessTemperature",
      component: () => import("./views/machineProcessTemperature.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/multiGauge/:macId",
      name: "multiGauge",
      component: () => import("./views/multiGauge.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/getAPQMachine/:macId",
      name: "apqMachine",
      component: () => import("./views/apqanalysisbyMachine.vue"),
      meta: {
        requiresAuth: true,
      },
    },


    {
      path: "/EnergyMonitoring",
      name: "EnergyMonitoring",
      component: () => import("./views/multipleEnergy.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/EnergyMonitoringTrends",
      name: "EnergyMonitoringTrends",
      component: () => import("./views/EnergyMonitoring.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/OperatorDataEntry",
      name: "OperatorDataEntry",
      component: () => import("./views/OperatorDataEntry.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/alerts",
      name: "NotificationConfig",
      component: () => import("./views/notificationsOrAlerts.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/DashboardConfig",
      name: "DashBoardConfig",
      component: () => import("./views/DashBoardConfiguration.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/DashBoardConfigGroup",
      name: "DashBoardConfigGroup",
      component: () => import("./views/DashBoardConfigurationGroup.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/oilQualityMonitoring",
      name: "oilQualityMonitoring",
      component: () => import("./views/oilQualityMonitoring.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topicManagement",
      name: "topicManagement",
      component: () => import("./views/topicManagement.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/oilCleanlinessMonitoring",
      name: "oilCleanlinessMonitoring",
      component: () => import("./views/oilCleanlinessMonitoring.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/**",
      name: "NotFound",
      component: () => import("./views/NotFound.vue"),
    },
    {
      path: "/onOffRefresh",
      name: "onOffRefresh",
      component: () => import("./components/onOffRefresh.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (sessionStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
