import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function ComboDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "8/1/2023",
        "8/2/2023",
        "8/3/2023",
        "8/4/2023",
        "8/5/2023",
        "8/6/2023",
        "8/7/2023",
      ],
      datasets: [
        {
          type: "line",
          label: "Blood Sugar",
          borderColor: documentStyle.getPropertyValue("--primary-color"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [80, 120, 110, 130, 100, 90, 77],
        },
        {
          type: "bar",
          label: "Blood Pressure",
          barwidth: 0.2,
          borderWidth: 0.2,

          backgroundColor: "#01b8e2",
          data: [
            { x: "8/1/2023", y: [75, 135] },
            { x: "8/2/2023", y: [95, 145] },
            { x: "8/3/2023", y: [88, 155] },
            { x: "8/4/2023", y: [77, 125] },
            { x: "8/5/2023", y: [70, 105] },
            { x: "8/6/2023", y: [80, 115] },
            { x: "8/7/2023", y: [65, 140] },
          ],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,

      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          min: 50,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
