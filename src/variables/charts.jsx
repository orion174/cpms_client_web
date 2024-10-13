/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//
// Chart extension for making the bars rounded
// Code from: https://codepen.io/jedtrow/full/ygRYgo
//

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

// 전역 폰트와 색상 정의
var mode = "light"; // 테마 모드 (light 또는 dark)
var fonts = {
  base: "Open Sans",
};

// Colors (전역 색상 정의)
var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4", // 주요 테마 색상
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

// Chart.js 전역 설정 업데이트
ChartJS.defaults.font.family = fonts.base;
ChartJS.defaults.color = colors.gray[600];

// 차트 옵션 정의
const chartOptions = {
  scales: {
    y: {
      grid: {
        borderDash: [2],
        borderDashOffset: [2],
        color: colors.gray[300], // 전역 색상 사용
        zeroLineColor: colors.gray[300],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2],
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        callback: function (value) {
          if (!(value % 10)) {
            return value;
          }
        },
      },
    },
    x: {
      grid: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        padding: 20,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
    },
    legend: {
      display: false,
    },
  },
};

// 옵션 병합을 위한 parseOptions 함수 정의
const parseOptions = (parent, options) => {
  for (let item in options) {
    if (typeof options[item] !== 'object') {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
};

// 차트 데이터 정의 (전역 색상 사용)
const chartExample1 = {
  data1: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Performance',
        data: [0, 20, 10, 30, 15, 40, 20, 60],
        backgroundColor: colors.theme.primary, // 전역 색상 적용
      },
    ],
  },
  data2: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Performance',
        data: [0, 20, 5, 25, 10, 30, 15, 40],
        backgroundColor: colors.theme.primary, // 전역 색상 적용
      },
    ],
  },
  options: chartOptions, // 전역 옵션 사용
};

const chartExample2 = {
  data: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [25, 20, 30, 22, 17, 29],
        backgroundColor: colors.theme.info, // 전역 색상 적용
        maxBarThickness: 10,
      },
    ],
  },
  options: chartOptions, // 전역 옵션 사용
};

// 필요한 함수와 변수를 내보냅니다.
export { chartOptions, parseOptions, chartExample1, chartExample2 };