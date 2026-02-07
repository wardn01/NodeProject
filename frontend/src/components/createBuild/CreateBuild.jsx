import styles from "./createBuild.module.css";
import { useState } from "react";
import axios from "axios";

/**
 * CreateBuild component
 * @param {function} onBuildCreated - Callback function when a build is created
 * @returns JSX for the create build component
 */
const CreateBuild = ({ onBuildCreated }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle the creation of a new build
  const handleCreateBuild = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const responseData = await axios.post(
        "http://localhost:8000/build/create",
        {},
        { withCredentials: true },
      );

      if (responseData.status === 201) {
        setSuccessMessage("Build created successfully!");
        onBuildCreated();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => setErrorMessage(""), 3000);
      } else {
        console.error("Error creating build:", error);
      }
    }
  };

  return (
    <div className={styles.createBuildContainer}>
      <button className={styles.createBuildButton} onClick={handleCreateBuild}>
        +
      </button>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
    </div>
  );
};

export default CreateBuild;
