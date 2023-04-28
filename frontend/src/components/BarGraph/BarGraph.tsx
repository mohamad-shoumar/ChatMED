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

