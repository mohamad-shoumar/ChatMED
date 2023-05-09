import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import "../../Prime-theme/theme.css";
export default function Radar() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--secondary-color");
    const textColorSecondary =
      documentStyle.getPropertyValue("--primary-color");
    const data = {
      labels: [
        " Sysytolic Blood Pressure",
        " Diastolic Blood Pressure",
        "Blood Sugar",
        "BMI",
        "physical activity",
      ],
      datasets: [
        {
          label: "",
          borderColor: documentStyle.getPropertyValue("primary-color"),
          pointBackgroundColor: documentStyle.getPropertyValue("primary-color"),
          pointBorderColor: documentStyle.getPropertyValue("primary-color"),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor:
            documentStyle.getPropertyValue("primary-color"),
          data: [75, 95, 60, 86, 90],
          tension: 0.3,
        },
      ],
    };
    const options = {
      plugins: {
        // legend: {
        //   labels: {
        //     color: documentStyle.getPropertyValue("--primary-color"),
        //   },
        //   position: "bottom",
        //   padding: 0,
        // },
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          grid: {
            color: "#01b8e2",
          },
        },
      },
      element: {
        area: {
          backgroundColor: "red", // Lighter blue background
          borderColor: "red", // Darker blue border
          borderWidth: 3, // Adjust border width as desired
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="radar"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-25rem"
        style={{
          width: "30rem",
          height: "23rem",
          transform: "scale(1)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      />
    </div>
  );
}
