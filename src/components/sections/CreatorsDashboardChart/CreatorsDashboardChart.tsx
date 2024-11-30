import React, { useEffect, useRef, useMemo } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

// Register the required chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);

interface DashboardChartProps {
  data: number[];
  labels: string[];
  title: string;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  data,
  labels,
  title,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  // Use useMemo to memoize formattedData and formattedLabels
  const formattedData = useMemo(() => {
    const result = [...data];
    while (result.length < 8) {
      result.push(0); // Fill with 0 if necessary
    }
    return result.slice(0, 8); // Limit to 8 entries
  }, [data]);

  const formattedLabels = useMemo(() => {
    const result = [...labels];
    while (result.length < 8) {
      result.push(""); // Fill with empty string if necessary
    }
    return result.slice(0, 8); // Limit to 8 entries
  }, [labels]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Define gradient colors based on chart title
      let gradient;
      if (ctx) {
        if (title === "Buyers" || title === "Content Bought") {
          gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#004C4C");
          gradient.addColorStop(1, "#92FFFF");
        } else if (title === "Revenue") {
          gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#FF604E");
          gradient.addColorStop(1, "#FFFFFF");
        }
      }

      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: formattedLabels,
          datasets: [
            {
              label: title,
              data: formattedData,
              backgroundColor: gradient,
              borderColor: "white",
              borderWidth: 1,
              // Adjust bar thickness
              barThickness: window.innerWidth < 768 ? 8 : 15, // Adjusted values
              maxBarThickness: 30,
              borderRadius: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Important for flexible layout
          plugins: {
            legend: {
              display: false, // Hide legend
            },
            title: {
              display: false, // Hide title
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Hide y-axis grid lines
              },
              ticks: {
                display: false, // Hide y-axis ticks
              },
              border: {
                display: false, // Set the y-axis border to invisible
              },
            },
            x: {
              grid: {
                display: false, // Hide x-axis grid lines
              },
              ticks: {
                display: false, // Hide x-axis ticks
              },
              border: {
                display: false, // Set the x-axis border to invisible
              },
              
            },
          },
        },
      });

      return () => {
        chart.destroy(); // Clean up chart when component unmounts
      };
    }
  }, [formattedData, formattedLabels, title]);

  return (
    <div className="bg-white p- rounded-lg w-full h-full min-h-[200px] sm:min-h-[200px] md:min-h-[250px]">
          
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default DashboardChart;
