import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ setPage }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileData = await axios.get(
          "http://localhost:8000/user/profile",
          {
            withCredentials: true,
          },
        );
        setProfileData(profileData.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/user/logout",
        {},
        { withCredentials: true },
      );
      setPage("authPage");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <p className={styles.profileTitle}>Profile</p>
        <div className={styles.avatar}>
          {profileData?.username?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.infoGroup}>
          <p className={styles.infoLabel}>Username</p>
          <p className={styles.infoValue}>
            {profileData?.username || "Loading..."}
          </p>
        </div>

        <div className={styles.infoGroup}>
          <p className={styles.infoLabel}>Nickname</p>
          <p className={styles.infoValue}>
            {profileData?.nickname || "Loading..."}
          </p>
        </div>

        <div className={styles.infoGroup}>
          <p className={styles.infoLabel}>Email Address</p>
          <p className={styles.infoValue}>
            {profileData?.email || "Loading..."}
          </p>
        </div>

        <div className={styles.infoGroup}>
          <p className={styles.infoLabel}>Password</p>
          <p className={styles.infoValue}>********</p>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Profile;
