import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";

const HistoryChart = ({ height = 360 }) => {
  const [isDark] = useDarkMode();

  const series = [
    {
      name: "Agendamentos",
      data: [40, 40, 37, 40, 39, 37, 40],
    },
    {
      name: "Comparecimentos",
      data: [39, 32, 32, 35, 39, 30, 36],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    colors: [colors.primary, colors.warning],
    tooltip: {
      theme: "dark",
    },
    legend: {
      offsetY: 4,
      show: true,
      fontSize: "12px",
      fontFamily: "Inter",
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 30, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2023-01-01T00:00:00.000Z",
        "2023-01-02T00:00:00.000Z",
        "2023-01-03T00:00:00.000Z",
        "2023-01-04T00:00:00.000Z",
        "2023-01-05T00:00:00.000Z",
        "2023-01-06T00:00:00.000Z",
        "2023-01-07T00:00:00.000Z",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
        format: 'dd/MM', // Formato da data para dia/mês
      },
    },
  };
  return (
    <>
      <Chart options={options} series={series} type="area" height={height} />
    </>
  );
};

export default HistoryChart;
