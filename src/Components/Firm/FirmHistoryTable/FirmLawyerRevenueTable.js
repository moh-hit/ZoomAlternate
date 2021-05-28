import React from "react";
import { Table, Tag, Space } from "antd";
import { Line, Pie, Radar } from "@ant-design/charts";
import { View } from "react-native";

//RADAR DATA
const dataRadar = [
  { name: "G2", star: 10178 },
  { name: "G6", star: 7077 },
  { name: "F2", star: 7345 },
  { name: "L7", star: 2029 },
  { name: "X6", star: 298 },
  { name: "AVA", star: 806 },
];

//RADAR CONFIG
const configRadar = {
  data: dataRadar.map((d) => ({ ...d, star: Math.log(d.star).toFixed(2) })),
  xField: "name",
  yField: "star",
  meta: {
    star: {
      alias: "Earning",
      min: 0,
      nice: true,
    },
  },
  xAxis: {
    line: null,
    tickLine: null,
  },
  yAxis: {
    label: false,
    grid: {
      alternateColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  point: {},
  area: {},
};

//PIE DATA
var dataPie = [
  {
    type: "XL",
    value: 37,
  },
  {
    type: "X",
    value: 13,
  },
  {
    type: "L",
    value: 18,
  },
  {
    type: "Unknown Tier",
    value: 32,
  },
];

//PIE CONFIG
var configPie = {
  appendPadding: 10,
  data: dataPie,
  angleField: "value",
  colorField: "type",
  radius: 0.9,
  label: {
    type: "inner",
    offset: "-30%",
    content: function content(_ref) {
      var percent = _ref.percent;
      return parseFloat("".concat(percent * 100, "%")).toFixed(2);
    },
    style: {
      fontSize: 14,
      textAlign: "center",
    },
  },
  interactions: [{ type: "element-active" }],
};
//GRAPH DATA
const data = [
  { Date: "20 Feb", Earning: 3 },
  { Date: "21 Feb", Earning: 4 },
  { Date: "22 Feb", Earning: 3.5 },
  { Date: "23 Feb", Earning: 5 },
  { Date: "24 Feb", Earning: 4.9 },
  { Date: "25 Feb", Earning: 6 },
  { Date: "26 Feb", Earning: 7 },
  { Date: "27 Feb", Earning: 9 },
  { Date: "28 Feb", Earning: 13 },
];
//GRAPH CONFIG
const config = {
  data,
  width: 1000,
  height: 400,
  autoFit: false,
  xField: "Date",
  yField: "Earning",
  point: {
    size: 5,
    shape: "diamond",
  },
  label: {
    style: {
      fill: "#aaa",
    },
  },
};
let chart;
//TABLE CONFIG
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 330,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tier",
    dataIndex: "tier",
    key: "tier",
    width: 330,
    align: "center",
  },
  {
    title: "Earning",
    dataIndex: "earning",
    key: "earning",
    width: 330,
    align: "right",
    render: (text) => <h2 style={{ color: "#16c79a" }}>$ {text}</h2>,
  },
];
//TABLE DATA
const dataTable = [
  {
    name: "John Brown",
    tier: "XL",
    earning: 6.4,
  },
  {
    name: "Jim Green",
    tier: "L",
    earning: 3,
  },
  {
    name: "Joe Black",
    tier: "X",
    earning: 5,
  },
];

export default function FirmLawyerRevenueTable() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Table columns={columns} dataSource={dataTable} />
      <h3 style={{ marginBottom: 20, marginTop: 10 }}>
        Daily Earning Analysis
      </h3>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 50,
        }}
      >
        <Pie {...configPie} />
        <Radar {...configRadar} />
      </View>
    </View>
  );
}
