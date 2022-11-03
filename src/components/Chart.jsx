import { createRef, useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Chart } from "react-google-charts";
import { BudgetContext } from "../context/BudgetContext";
import { useSnackbar } from "notistack";
import { jsPDF } from "jspdf";

function ChartComponent() {
  const chartRef = createRef();

  const { budget, remaining } = useContext(BudgetContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const spent = budget - remaining;

  const options = {
    slices: {
      0: { color: "#83F0AC", textStyle: { color: "#000", fontSize: 16 } },
      1: { color: "#D9DFDD", textStyle: { color: "transparent" } },
    },
    legend: "none",
    width: "100%",
    height: 400,
    pieHole: 0.7,
    tooltip: { trigger: "none" },
    pieStartAngle: 0,
    enableInteractivity: false,
    backgroundColor: "transparent",
    chartArea: {
      left: 20,
      top: 0,
      width: "100%",
      height: "75%",
    },
  };

  const chartEvents = [
    {
      eventName: "ready",
      callBack: (Chart) => {
        console.log(Chart.chart.getImageURI());
      },
    },
  ];

  useEffect(() => {
    if (budget / 4 > remaining) {
      options.slices[0].color = "#FA4141";
      enqueueSnackbar(" Be careful, you are about to run out of budget", {
        variant: "error",
      });
    } else if (budget / 2 > remaining) {
      options.slices[0].color = "#FCA44C";
      enqueueSnackbar("Pist, you have less than half of the budget left", {
        variant: "warning",
      });
    }
  }, [remaining]);

  function exportChart(chartRef) {
    const doc = new jsPDF();
    console.log(Chart)
    // let svgURL = new XMLSerializer().serializeToString(chartSVG);
    //let svgBlob = new Blob([svgURL], { type: "image/svg+xml;charset=utf-8" });
    //doc.addSvgAsImage(svgBlob, 0, 0, 100, 100, "chart", "none", 0);
    //doc.save("chart.pdf");
  }

  return (
    <div id="capture">
      <Chart
        ref={Chart}
        key={remaining}
        chartType="PieChart"
        options={options}
        data={[
          ["Label", "value"],
          ["Spent", spent],
          ["Remaning", remaining || 1],
        ]}
        chartEvents={chartEvents}
      />
      <button
        type="button"
        onClick={() => {
          exportChart(chartRef);
        }}
      >
        Export chart
      </button>
    </div>
  );
}

export default ChartComponent;
