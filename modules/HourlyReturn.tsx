import React, {useEffect, useRef} from "react";
import Chart from "chart.js/auto";

// @ts-ignore
export default function HourlyReturn({ json }) {
    let usersData = json.map((item: { averageCount: any; }) => item.averageCount);
    let timeData = json.map((item: { time: any; }) => item.time);

    const canvasEl = useRef(null);

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    useEffect(() => {
        // @ts-ignore
        const ctx = canvasEl.current.getContext("2d");

        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const data = {
            labels: timeData,
            datasets: [
                {
                    backgroundColor: gradient,
                    label: "Players",
                    data: usersData,
                    fill: true,
                    borderWidth: 2,
                    borderColor: colors.purple.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 3
                }
            ]
        };
        const config = {
            type: "line",
            data: data
        };
        // @ts-ignore
        const myLineChart = new Chart(ctx, config);

        return function cleanup() {
            myLineChart.destroy();
        };
    });

    return (
        <canvas id="myChart" ref={canvasEl} height="100" />
    );
}