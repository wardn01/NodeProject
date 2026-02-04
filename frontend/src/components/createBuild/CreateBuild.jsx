import styles from "./createBuild.module.css";
import { useState } from "react";
import axios from "axios";

const CreateBuild = ({ onBuildCreated }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateBuild = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/build/create",
        {},
        { withCredentials: true },
      );

      if (res.status === 201) {
        setSuccessMessage("Build created successfully!");
        setErrorMessage("");
        onBuildCreated();
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
        return;
      } else {
        console.error("Error creating build:", error);
      }
    }
  };
  return (
    <div className={styles.createBuildContainer}>
      <button className={styles.createBuildButton} onClick={handleCreateBuild}>
        Create New Build
      </button>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
    </div>
  );
};

export default CreateBuild;
