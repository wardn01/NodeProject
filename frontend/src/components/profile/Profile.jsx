import axios from "axios";
import styles from "./profile.module.css";
import { useState } from "react";

const Profile = ({ setisAuth }) => {
  const [profileData, setProfileData] = useState(null);
  const getProfileData = () => {
    axios
      .get("http://localhost:8000/user/profile", { withCredentials: true })
      .then((res) => {
        setProfileData(res.data.user);
        console.log(res.data.user);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };
  const handleLogout = () => {
    axios
      .post("http://localhost:8000/user/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        setProfileData(null);
        setisAuth(false);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileControls}>
        <p className={styles.profileText}>Profile Page</p>
        <button className={styles.profileButton} onClick={getProfileData}>
          Get Profile Data
        </button>
        <button className={styles.profileButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className={styles.profileData}>
        <p className={styles.profileInfo}>Profile Information</p>
        <p className={styles.profileInfo}>
          Name: {profileData?.username || "Not available"}
        </p>
        <p className={styles.profileInfo}>
          Email: {profileData?.email || "Not available"}
        </p>
        <p className={styles.profileInfo}>
          Nickname: {profileData?.nickname || "Not available"}
        </p>
        <p className={styles.profileInfo}>password: *******</p>
      </div>
    </div>
  );
};

export default Profile;
