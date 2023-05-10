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
        "5/10/2023",
        "5/11/2023",
        "5/12/2023",
        "5/13/2023",
        "5/14/2023",
        "5/15/2023",
        "5/16/2023",
        "5/17/2023",
        "5/18/2023",
        "5/19/2023",
        "5/20/2023",
        "5/21/2023",
        "5/22/2023",
        "5/23/2023",
      ],
      datasets: [
        {
          type: "line",
          label: "Blood Sugar",
          borderColor: documentStyle.getPropertyValue("--primary-color"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [
            80, 70, 130, 120, 80, 100, 140, 115, 85, 85, 110, 170, 120, 95,
          ],
        },
        {
          type: "bar",
          label: "Blood Pressure",
          barwidth: 0.2,
          borderWidth: 0.2,

          backgroundColor: "#01b8e2",
          data: [
            { x: "5/10/2023", y: [75, 115] },
            { x: "5/11/2023", y: [85, 120] },
            { x: "5/12/2023", y: [85, 110] },
            { x: "5/13/2023", y: [60, 120] },
            { x: "5/14/2023", y: [70, 130] },
            { x: "5/15/2023", y: [70, 110] },
            { x: "5/16/2023", y: [90, 160] },
            { x: "5/17/2023", y: [85, 140] },
            { x: "5/18/2023", y: [100, 140] },
            { x: "5/19/2023", y: [105, 145] },
            { x: "5/20/2023", y: [75, 135] },
            { x: "5/21/2023", y: [95, 135] },
            { x: "5/22/2023", y: [90, 115] },
            { x: "5/23/2023", y: [80, 115] },
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
