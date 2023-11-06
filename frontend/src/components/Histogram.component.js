import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";

export default function HistogramChart(props) {
    const navigate = useNavigate()

    const Data = props.Data
    const field = props.field
    const chartName = props.chartName
    const Frequency = props.Frequency
    const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (Data && Data.length > 0) {
      const plotData = [
        {
          x: Data.map((d) => d[field]),
          y: Data.map((d) => d[Frequency]),
          type: "bar",
          marker: { color: "steelblue" },
        },
      ];

      const layout = {
        title: chartName,
        xaxis: { title: field },
        yaxis: { title: "frequency" },
      };

      setChartData({ plotData, layout });
    }
  }, [Data]);


  return (
    <div>
      {chartData ? (
        <Plot
     
        config={{
            // responsive: true,  
            displayModeBar: false, 
            displaylogo: false,    
        
          }}   
          onClick={(event) =>{
            navigate('/reports/'+event.points[0].x+'/'+field)
            console.log(event.points[0].x)
          }} 
          data={chartData.plotData}
          layout={chartData.layout}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
