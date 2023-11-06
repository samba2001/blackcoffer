import { useNavigate } from "react-router-dom";


import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function HistogramChart( params ) {
    const navigate = useNavigate()
        const data = params.data
    const field = params.field
    const chartName = params.chartName
     const binSize = params.binSize
  useEffect(() => {
    if (data && data.length > 0) {
      const plotData = [
        {
          x: data.map((d) => d[field]),
          type: "histogram",
          marker: { color: "steelblue" },
        },
      ];

      const layout = {
        title: chartName,
        xaxis: { title: field },
        yaxis: { title: "Frequency" },
      };

      setChartData({ plotData, layout });
    }
  }, [data]);

  const [chartData, setChartData] = useState(null);

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
          style={{ width: "98%", height: "100%" }}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
