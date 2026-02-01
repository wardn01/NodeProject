import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ setPage }) => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdateProfile = async () => {
    try {
      await axios.post(
        "http://localhost:8000/user/update",
        {
          nickname: profileData.nickname,
          password: profileData.password,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleBtnEditClick = () => {
    if (isEditing) {
      handleUpdateProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <p className={styles.profileTitle}>Profile</p>
        <div className={styles.avatar}>
          {profileData?.nickname?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.profileCard}>
          <div className={styles.infoGroup}>
            <p className={styles.infoLabel}>Username</p>
            <p className={styles.infoValue}>
              {profileData?.username || "Loading..."}
            </p>
          </div>
          <div className={styles.infoGroup}>
            <p className={styles.infoLabel}>Email Address</p>
            <p className={styles.infoValue}>
              {profileData?.email || "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.infoGroup}>
        <div className={styles.editProfile}>
          <p className={styles.infoLabel}>Nickname</p>
          {isEditing ? (
            <p className={styles.editButton} onClick={handleBtnEditClick}>
              save
            </p>
          ) : (
            <p className={styles.editButton} onClick={handleBtnEditClick}>
              ✏️
            </p>
          )}
        </div>
        <p className={styles.infoValue}>
          {isEditing ? (
            <input
              className={styles.editInput}
              type="text"
              name="nickname"
              value={profileData?.nickname || ""}
              onChange={handleChange}
            />
          ) : (
            profileData?.nickname || "Loading..."
          )}
        </p>
      </div>
      <div className={styles.infoGroup}>
        <div className={styles.editProfile}>
          <p className={styles.infoLabel}>Password</p>
          {isEditing ? (
            <p className={styles.editButton} onClick={handleBtnEditClick}>
              save
            </p>
          ) : (
            <p className={styles.editButton} onClick={handleBtnEditClick}>
              ✏️
            </p>
          )}
        </div>

        <p className={styles.infoValue}>
          {isEditing ? (
            <input
              className={styles.editInput}
              type="password"
              name="password"
              value={profileData?.password || ""}
              onChange={handleChange}
            />
          ) : (
            "********"
          )}
        </p>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
