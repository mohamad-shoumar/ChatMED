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
          label: "Patients Health Profile",
          borderColor: documentStyle.getPropertyValue("primary-color"),
          pointBackgroundColor: documentStyle.getPropertyValue("primary-color"),
          pointBorderColor: documentStyle.getPropertyValue("primary-color"),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor:
            documentStyle.getPropertyValue("primary-color"),
          data: [65, 59, 90, 81, 56],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            color: textColorSecondary,
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary,
          },
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
        style={{ width: "20rem", height: "20rem" }}
      />
    </div>
  );
}
