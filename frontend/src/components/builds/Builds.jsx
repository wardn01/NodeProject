import styles from "./builds.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Build from "../build/Build";
import CreateBuild from "../createBuild/CreateBuild";

const Builds = () => {
  const [builds, setBuilds] = useState([]);

  const fetchBuilds = async () => {
    try {
      const buildsData = await axios.get("http://localhost:8000/build/all", {
        withCredentials: true,
      });
      setBuilds(buildsData.data.builds);
    } catch (error) {
      console.error("Error fetching builds:", error);
    }
  };
  useEffect(() => {
    fetchBuilds();
  }, []);

  return (
    <div className={styles.buildsContainer}>
      <CreateBuild onBuildCreated={fetchBuilds} />
      <h2 className={styles.buildsTitle}>Your Builds</h2>
      {builds.length === 0 ? (
        <p className={styles.noBuildsText}>No builds available.</p>
      ) : (
        builds.map((build) => (
          <Build key={build.id} buildData={build} refreshBuilds={fetchBuilds} />
        ))
      )}
    </div>
  );
};

export default Builds;
