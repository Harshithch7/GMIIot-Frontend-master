import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/multipleOEE.vue'

Vue.use(Router)

let router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [    {
        path: "/",
        name: "loading",
        component: () => import("./components/loading.vue"),
        meta: {
          requiresAuth: true,
        },
      },
        {
            path: '/multipleOEE',
            name: 'OEE Monitoring Dashboard',
            meta: { title: 'OEE Monitoring Dashboard',
          
            requiresAuth: true, },
            component: () => import("./views/multipleOEE.vue"),
        },
        {
            path: "/termsAndConditions",
            name: "termsAndConditions",
            component: () => import("./views/termsAndConditions.vue"),
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
            path: '/EnergyMonitoring',
            name: 'Energy-Dashboard',
            meta: { title: 'Energy Dashboard',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/multipleEnergy.vue')
        },
        {
            path: '/OperatorDataEntry',
            name: 'Data-Entry',
            meta: { title: 'Operator Data Entry for Standard Operations Parameters' },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/OperatorDataEntry.vue')
        },
        {
            path: "/plantMonitoringDashboard",
            name: "plantMonitoringDashboard",
            component: () => import("./views/PlantMonitoringDashboard.vue"),
            meta: {
                title:'plant Monitoring Dashboard',
                
              requiresAuth: true,
            },
          },
        {
            path: "/login",
            name: "login",
            // meta: { title: 'Login' },

            component: () => import("./views/login.vue"),
        },
        {
            path: '/NotificationConfig',
            name: 'Configuration For Notifications/Alerts',
            meta: { title: 'Configuration for Alerts / Notifications',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/notificationsOrAlerts.vue')
        },
        {
            path: '/pmPage',
            name: 'Maintenance-Schedule-Configuration',
            meta: { title: 'Preventive Maintenance Schedule Configuration' ,
            requiresAuth: true,},
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/pmPage.vue')
        },
        {
            path: '/devicesManagement',
            name: 'devicesManagement',
            meta: { title: 'Devices Management',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/DevicesManagement.vue')
        },
        {
          path: '/LocationsManagement',
          name: 'LocationsManagement',
          meta: { title: 'Locations Management',
          requiresAuth: true, },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
              import ( /* webpackChunkName: "about" */ './views/LocationsManagement.vue')
      },
      {
        path: '/CustomersManagement',
        name: 'CustomersManagement',
        meta: { title: 'Customers Management',
        requiresAuth: true, },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ './views/CustomersManagement.vue')
    },
    {
      path: '/DashBoardConfigGroup',
      name: 'DashBoardConfigGroup',
      meta: { title: 'DashBoard Configuration Groups',
      requiresAuth: true, },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
          import ( /* webpackChunkName: "about" */ './views/DashBoardConfigurationGroup.vue')
  },
  {
    path: '/DashboardConfig',
    name: 'DashboardConfig',
    meta: { title: 'DashBoard Configuration ',
    requiresAuth: true, },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ './views/DashBoardConfiguration.vue')
},
        {
            path: '/roleManagement',
            name: 'Role Management',
            meta: { title: 'Role Management',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/RoleManagement.vue')
        },
        {
            path: '/machinesManagement',
            name: 'Machine Management',
            meta: { title: 'Machines Management',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/machinesManagement.vue')
        },
        {
          path: '/topicManagement',
          name: 'topicManagement',
          meta: { title: 'Topic Management',
          requiresAuth: true, },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
              import ( /* webpackChunkName: "about" */ './views/topicManagement.vue')
      },
      {
        path: '/CustomerAnalysisConfig',
        name: 'CustomerAnalysisConfig',
        meta: { title: 'Customer Analysis Config',
        requiresAuth: true, },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ './views/CustomerAnalysisConfig.vue')
    },
    {
      path: '/customerFeatures',
      name: 'customerFeatures',
      meta: { title: 'Customer Features Setup',
      requiresAuth: true, },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
          import ( /* webpackChunkName: "about" */ './views/customerFeaturesConfig.vue')
  },
  {
    path: '/productSetup',
    name: 'productSetup',
    meta: { title: 'Product Setup',
    requiresAuth: true, },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ './views/productSetup.vue')
},
        {
            path: '/userManagement',
            name: 'UserManagement',
            meta: { title: 'User Management',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/UserManagement.vue')
        },
        {
            path: '/analysis_machine ',
            name: 'apqMachine',
            meta: { title: 'APQ Analysis by Machine',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Apq-Analysis-Machine.vue')
        },

        {
            path: '/machine',
            name: 'EnergyMonitoringTrends',
            meta: { title: 'Energy Monitoring Trends' ,
            requiresAuth: true,},
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/EnergyMonitoring.vue')
        },
        {
            path: '/multiGauge',
            name: 'multiGauge',
            meta: { title: 'Energy Parameter Analysis' ,
            requiresAuth: true,},
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/multiGauge.vue')
        },
        {
            path: '/parametersManagement',
            name: 'parametersManagement',
            meta: { title: 'Device Parameter Setup',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ParametersManagement.vue')
        }, {
            path: '/loader',
            name: 'loader',
            meta: { title: 'loader',
        requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/loader.vue')
        },
        {
            path: '/snackbar',
            name: 'snackbar',
            meta: { title: 'snackbar' },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/snackbar.vue')
        },
        {
            path: '/oilCleanlinessMonitoring',
            name: 'Oil Cleanliness Monitoring',
            meta: { title: 'Oil Cleanliness Monitoring',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/oilCleanlinessMonitoring.vue')
        },
                {
            path: '/oilQualityMonitoring',
            name: 'oilQualityMonitoring',
            meta: { title: 'Oil Quality Monitoring',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/oilQualityMonitoring.vue')
        },
        {
            path: '/cycle-time-analysis',
            name: 'boxplot',
            meta: { title: 'Cycle Time Analysis' ,
            requiresAuth: true,},
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/boxplot.vue')
        },
        
        {
            path: '/machineInsights',
            name: 'machineInsights',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/MachineInsights.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'Machine Insights Report',
              requiresAuth: true,
            },
          },
          {
            path: '/productionReport',
            name: 'Production Report',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/ProductionReport.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'Production Report',
              requiresAuth: true,
            },
          },
          {
            path: '/gmiiotMachineRawDataReport',
            name: 'gmiiotMachineRawDataReport',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/allDeviceParametersDataReport.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'GMIIOT Machine Data Report',
              requiresAuth: true,
            },
          },
          {
            path: '/EnergyConsumptionReport',
            name: 'EnergyConsumptionReport',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/EnergyConsumptionReport.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'Energy Consumption Report',
              requiresAuth: true,
            },
          },
          {
            path: '/ProductionEnergyConsumptionReport',
            name: 'ProductionEnergyConsumptionReport',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/ProductionEnergyConsumptionReport.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'Production Energy Consumption Report',
              requiresAuth: true,
            },
          },
          {
            path: '/cycleTimeVarianceReports',
            name: 'cycleTimeVarianceReports',
            component: () =>
             import( /* webpackChunkName: "about" */'./views/cycleTimeVarianceReports.vue'),
            meta: {
            //   requiresAuth: true,
              title: 'Cycle Time Variance Report',
              requiresAuth: true,
            },
          },
        {
            path: '/performance-trends',
            name: 'performanceTrends',
            meta: { title: 'Performance Trends',
            requiresAuth: true, },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/performanceTrends.vue')
        },
    ]
})
router.beforeEach((to, from, next) => {
  console.log("Checking all routes before check",to,from);
  console.log("checking route to show refresh component",to.name );
  if (to.name == "OEE Monitoring Dashboard"
  || to.name == "plantMonitoringDashboard"
  || to.name == "OEE Monitoring Dashboard"
  || to.name == "Energy-Dashboard"
  || to.name =="boxplot"
  || to.name =="Maintenance-Schedule-Configuration"
  || to.name =="machineInsights"
|| to.name =="machineInsights"
|| to.name ==	"Production Report"
|| to.name =="EnergyConsumptionReport"
|| to.name =="ProductionEnergyConsumptionReport"
|| to.name == "gmiiotMachineRawDataReport"
|| to.name =="cycleTimeVarianceReports"
|| to.name =="productSetup"
|| to.name =="customerFeatures"
|| to.name =="CustomerAnalysisConfig"
|| to.name =="Role Management"
|| to.name =="DashboardConfig"
|| to.name =="devicesManagement"
|| to.name =="Maintenance-Schedule-Configuration"
|| to.name =="Configuration For Notifications/Alerts"
|| to.name =="Data-Entry"
|| to.name =="Role Management"
|| to.name =="DashboardConfig"
|| to.name =="CustomerAnalysisConfig"
|| to.name =="DashBoardConfigGroup"
|| to.name =="CustomersManagement"
|| to.name =="LocationsManagement"
|| to.name =="devicesManagement"
|| to.name =="parametersManagement"
|| to.name =="Machine Management"
|| to.name =="UserManagement"
|| to.name =="topicManagement"
|| to.name =="gmiiotMachineRawDataReport"


  )
  {
    console.log("Checking to name inside satisgiled",to.name);
    sessionStorage.setItem("switch_state",false);

  }
  else
  {    console.log("Checking to name inside non satisgiled",to.name);
  sessionStorage.setItem("switch_state",true);
}

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (sessionStorage.getItem("token") == null) {
        next({
          path: "/login",
          params: { nextUrl: to.fullPath },
        });
      } else {
        console.log("checking in first else",to,from);
        next();
      }
    } else {
      console.log("checking in second else",to,from);
      next();
    }
    
  });

  export default router;
