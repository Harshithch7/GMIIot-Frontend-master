let constants = {
    // backend_url: "http://182.73.138.71/mobilserv",
    backend_url: "http://localhost:5000",
    // backend_url: "https://mobilserv.triniti.com/mobilserv",
    user: "",
    chartNameMapping: {
        bulk_resistance: "Bulk Resistance",
        processed_bulk: "Processed Bulk",
        s1_bulk_res: "Bulk Resistance",
        s1_bulk_res_smoothed: "Bulk Resistance Smoothed",
        s1_magnitude: "Magnitude",
        s1_phase: "Phase",
        "high frequency impedance": "High Frequency Impedance",
        "interfacial impedance": "Interfacial Impedance",
        humidity: "Humidity",
        oil_temperature: "Oil Temperature",
        s4_hf_bulk_imp: "Bulk Impedance",
        s0_imaginary_imp: "Imaginary Impedance",
        relative_humidity: "Relative Humidity",
        health_indicator: "Health Indicator",
        processed_hf_smoothed: "Processed Smoothed",
        s4_hf_bulk_imp_smoothed: "Bulk Impedance Smoothed",
        s4_magnitude: "Magnitude",
        s4_phase: "Phase",
        processed_inter_smoothed: "Processed Inter Smoothed",
        health_indicator_combined: "Health Indicator Combined",
        c_data: "Cycle Time",
        p_data: "Production Quantity",
        cycle_time_data: "Cycle Time Analysis"
    },
    labelMapping: {
        "Relative Humidity": "Relative Humidity %",
        "Bulk Impedance": "Bulk Impedance",
        "Oil Temperature": "Temperature(°C)",
        "Health Indicator Combined": "Health Indicator Combined",
        "RH Data" : "RH %",
        "RH" : "RH %"
    },
    colors: [
        "#18c918",
        "#4C0707",
        "#800080",
        "#6e636d",
        "#00c8ff",
        "#bfb73f",
        "#476e5e",
        "#40A0FC",
    ],
    exxonRed: "#FE000C",
    rapBlue: "#0093df",
    darkOrange: "#FFA500",

    organizationDateFilter: {
        "4": 1,
    },
    compareObjects(object1, object2, key) {
        // console.log("checking beofr inserting",object1, object2, key);
        const obj1 = object1[key].toUpperCase();
        const obj2 = object2[key].toUpperCase();
  
        if (obj1 < obj2) {
          return -1;
        }
        if (obj1 > obj2) {
          return 1;
        }
        return 0;
      },
};
export default constants;