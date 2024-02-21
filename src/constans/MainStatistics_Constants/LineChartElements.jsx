const labels = [
  "0",
  "01.01",
  "01.02",
  "01.03",
  "01.04",
  "01.05",
  "01.06",
  "01.07",
];
export const xAxis = [
  {
    scaleType: "point",
    data: labels,
  },
];

export const series = [
  {
    data: [null, 10, 15, 25, 30, 20, 60, 50],
    color: "rgb(86, 138, 53)",
    curve: "linear",
    label: "구매자",
    area: true,
  },
  {
    data: [null, 50, 30, 10, 20, 50, 60, 80],
    color: "rgb(124, 177, 72)",
    curve: "linear",
    label: "가입자",
    area: true,
  },
];
