import styles from "./builds.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Build from "../build/Build";
import CreateBuild from "../createBuild/CreateBuild";

/**
 * Builds component to display a list of builds and allow creating new builds
 * @returns JSX for the builds component
 */
const Builds = () => {
  const [builds, setBuilds] = useState([]);

  // Fetch builds from the server
  const fetchBuilds = async () => {
    try {
      const responseData = await axios.get("http://localhost:8000/build/all", {
        withCredentials: true,
      });
      setBuilds(responseData.data.builds);
    } catch (error) {
      console.error("Error fetching builds:", error);
    }
  };
  useEffect(() => {
    fetchBuilds();
  }, []);

  return (
    <div className={styles.buildsContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.buildsTitle}>
          <span className={styles.buildsTitleIcon}>⚔️</span>Your Builds
        </h2>
        <CreateBuild onBuildCreated={fetchBuilds} />
      </div>

      {builds.length === 0 ? (
        <div className={styles.noBuildsContainer}>
          <p className={styles.noBuildsTitle}>No builds available.</p>
          <p className={styles.noBuildsSubtitle}>
            Create a new build to start your journey!
          </p>
        </div>
      ) : (
        builds.map((build) => (
          <Build key={build.id} buildData={build} refreshBuilds={fetchBuilds} />
        ))
      )}
    </div>
  );
};

export default Builds;
