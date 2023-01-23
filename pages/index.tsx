import React, {useEffect, useRef} from "react";
import styles from "../styles/Home.module.css";
import DayReturn from "@/modules/DayReturn";
import AllReturn from "@/modules/AllReturn";
import HourlyReturn from "@/modules/HourlyReturn";

// @ts-ignore
export default function App({ json, dailyjson, alljson }) {
  return (
      <div className="App">
        <h1 className={styles.title}>DragonCore Stats</h1>
        <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Last 3 hours</h2>
          <HourlyReturn json={json} />
        </div>
        <div className={styles.card}>
            <h2>Last 24 hours</h2>
            <DayReturn json={dailyjson} />
        </div>
        <div className={styles.card}>
            <h2>All time</h2>
            <AllReturn json={alljson} />
        </div>
          <div className={styles.card}>
            <h2>API Information</h2>
            <p className={styles.description}>Work in progress, check the updates for this sections</p>
            <p className={styles.description}>API Status: Online</p>
            <p className={styles.description}>Last player: {}</p>
            <p className={styles.description}>Made with love by WhiXard using NextJS</p>
          </div>
        </div>
      </div>
  );
}

export async function getServerSideProps(){
  const api = "http://mc.dragoncraft.it:8800/api/v1/players/hourly?time=10800";
  const dailyapi = "http://mc.dragoncraft.it:8800/api/v1/players/hourly?time=86400";
  const allapi = "http://mc.dragoncraft.it:8800/api/v1/players/all";

  const res = await fetch(allapi);
  const alljson = await res.json();

  const dailyusers = await fetch(dailyapi);
  const dailyjson = await dailyusers.json();

  const data = await fetch(api)
  const json = await data.json()

  return {props: {json, dailyjson, alljson}}
}