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

var mode = "light";

var fonts = {
  base: "Open Sans",
};

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
    primary: "#5e72e4",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

ChartJS.defaults.font.family = fonts.base;
ChartJS.defaults.color = colors.gray[600];

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

const parseOptions = (parent, options) => {
  for (let item in options) {
    if (typeof options[item] !== 'object') {
      parent[item] = options[item];
    } else {
      parseOptions(parent[item], options[item]);
    }
  }
};

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

export { chartOptions, parseOptions, chartExample1, chartExample2 };