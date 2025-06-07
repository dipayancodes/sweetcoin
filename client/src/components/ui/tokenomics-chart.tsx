import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";
import { motion } from "framer-motion";

const chartData = {
  labels: ['Liquidity Pool', 'Community', 'Development', 'Airdrops', 'Marketing'],
  datasets: [{
    data: [40, 25, 20, 10, 5],
    backgroundColor: [
      'hsl(340, 82%, 52%)',
      'hsl(270, 70%, 55%)',
      'hsl(180, 65%, 55%)',
      'hsl(50, 90%, 60%)',
      'hsl(25, 95%, 53%)'
    ],
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    hoverOffset: 10
  }]
};

export function TokenomicsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration = {
          type: 'doughnut',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'hsl(340, 82%, 52%)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                  label: function(context) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 2000
            }
          }
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      className="glass rounded-2xl p-8 w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <canvas ref={chartRef} width="300" height="300" />
    </motion.div>
  );
}
