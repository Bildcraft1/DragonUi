import React, {useEffect, useRef} from "react";
import Chart from "chart.js/auto";
import styles from "../styles/Home.module.css";
import DayReturn from "@/modules/_dayreturn";
import _allreturn from "@/modules/_allreturn";

// @ts-ignore
export default function App({ json, dailyjson, alljson }) {
  let usersData = json.map((item: { player: any; }) => item.player);
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
    // const ctx = document.getElementById("myChart");

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
      <div className="App">
        <h1 className={styles.title}>DragonCore Stats</h1>
        <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Last 3 hours</h2>
          <canvas id="myChart" ref={canvasEl} height="100" />
        </div>
        <div className={styles.card}>
            <h2>Last 24 hours</h2>
            <DayReturn json={dailyjson} />
        </div>
        <div className={styles.card}>
            <h2>All time</h2>
            <_allreturn json={alljson} />
        </div>
          <div className={styles.card}>
            <h2>API Information</h2>
            <p className={styles.description}>Work in progress, check the updates for this sections</p>
            <p className={styles.description}>API Status: Online</p>
            <p className={styles.description}>Made with love by WhiXard using NextJS</p>
          </div>
        </div>
      </div>
  );
}

export async function getServerSideProps(){
  const api = "http://stats:8080/api/v1/players/average";
  const dailyapi = "http://stats:8080/api/v1/players/day";
  const allapi = "http://stats:8080/api/v1/players/all";
    const res = await fetch(allapi);
    const alljson = await res.json();

  const dailyusers = await fetch(dailyapi);
  const dailyjson = await dailyusers.json();

  const data = await fetch(api)
  const json = await data.json()

  return {props: {json, dailyjson, alljson}}
}