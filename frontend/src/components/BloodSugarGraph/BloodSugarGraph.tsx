import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { API } from "../../API/API";
import { base_url } from "../../API/API";

export default function BloodSugarGraph() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const token = localStorage.getItem("token");

    const fetchBloodSugarData = async () => {
      try {
        const response = await API.getAPI(`${base_url}vitals/sugar`, token!);
        console.log(response);
        const data = {
          labels: response.bloodsugar.map((item: any) =>
            item.timestamp.substring(0, 10)
          ),
          datasets: [
            {
              label: "Blood Sugar",
              data: response.bloodsugar.map((item: any) => item.value),
              fill: false,
              tension: 0.4,
              borderColor: documentStyle.getPropertyValue("--blue-500"),
            },
          ],
        };
        const options = {
          maintainAspectRatio: false,
          aspectRatio: 1.6,
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchBloodSugarData();
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
