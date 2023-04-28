import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { API } from "../../API/API";
import { base_url } from "../../API/API";

export default function BloodPressure() {
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
    const getBloodPressure = async () => {
      try {
        const response = await API.getAPI(
          `${base_url}vitals/bloodpressure`,
          token!
        );
        console.log(response.bloodPressure);
        const systolicValues = response.bloodPressure.map((item: any) => {
          const [systolic, diastolic] = item.value.split("/");
          return systolic;
        });

        const diastolicValues = response.bloodPressure.map((item: any) => {
          const [systolic, diastolic] = item.value.split("/");
          return diastolic;
        });

        const data = {
          labels: response.bloodPressure.map((item: any) =>
            item.timestamp.substring(0, 10)
          ),

          datasets: [
            {
              label: " Systolic Blood Pressure",
              data: systolicValues,
              fill: false,
              tension: 0.4,
              borderColor: documentStyle.getPropertyValue("--blue-500"),
            },
            {
              label: "Daistolic Blood Pressure",
              data: diastolicValues,
              fill: false,
              borderDash: [5, 5],
              tension: 0.4,
              borderColor: documentStyle.getPropertyValue("--teal-500"),
            },
          ],
        };
        const options = {
          maintainAspectRatio: false,
          aspectRatio: 2,
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
    getBloodPressure();
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
