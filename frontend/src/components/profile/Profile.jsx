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
        <h2 className={styles.profileTitle}>User Profile</h2>
      </div>

      {profileData ? (
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {profileData.username?.charAt(0).toUpperCase()}
          </div>

          <div className={styles.infoGroup}>
            <label>Username</label>
            <p>{profileData.username}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Nickname</label>
            <p>{profileData.nickname}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Email Address</label>
            <p>{profileData.email}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Password</label>
            <p>********</p>
          </div>

          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout from Session
          </button>
        </div>
      ) : (
        <p className={styles.loading}>Loading profile details...</p>
      )}
    </div>
  );
};

export default Profile;
