import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Profile = ({ setPage }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileDataToEdit, setProfileDataToEdit] = useState({
    nickname: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState("nothing");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [eyeInvisible, setEyeInvisible] = useState(true);

  // Fetch user profile data on component mount
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true,
        });
        setProfileData(res.data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setErrorMessage("Failed to fetch profile data.");
      }
    };
    getProfileData();
  }, []);

  // Handle user logout
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
      setErrorMessage("Failed to logout.");
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      await axios.post(
        "http://localhost:8000/user/update",
        {
          nickname:
            isEditing === "nickname" ? profileDataToEdit.nickname : null,
          password:
            isEditing === "password" ? profileDataToEdit.password : null,
        },
        { withCredentials: true },
      );

      setSuccessMessage("Profile updated successfully.");
      setErrorMessage("");

      if (isEditing === "nickname") {
        setProfileData((prev) => ({
          ...prev,
          nickname: profileDataToEdit.nickname,
        }));
      }
      setIsEditing("nothing");
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to update profile.");
      }
      setSuccessMessage("");
    }
  };

  // Handle edit button click
  const handleBtnEditClick = (editMode) => {
    if (editMode !== "nothing") {
      setProfileDataToEdit({
        nickname: profileData.nickname,
        password: "",
      });
    }

    if (isEditing === editMode) {
    } else {
      setIsEditing(editMode);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  // Handle cancel edit button click
  const handlebtnCancelEditClick = () => {
    setIsEditing("nothing");
    setErrorMessage("");
    setSuccessMessage("");
    setProfileDataToEdit({
      nickname: profileData.nickname,
      password: "",
    });
  };

  // Handle input changes for profile editing
  const handleChange = (e) => {
    setProfileDataToEdit({
      ...profileDataToEdit,
      [e.target.name]: e.target.value,
    });
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
          {isEditing === "nickname" ? (
            <div className={styles.editButtons}>
              <p className={styles.editButton} onClick={handleUpdateProfile}>
                ✔️
              </p>
              <p
                className={styles.editButton}
                onClick={handlebtnCancelEditClick}
              >
                ✖️
              </p>
            </div>
          ) : (
            <p
              className={styles.editButton}
              onClick={() => handleBtnEditClick("nickname")}
            >
              ✏️
            </p>
          )}
        </div>

        <p className={styles.infoValue}>
          {isEditing === "nickname" ? (
            <input
              className={styles.editInput}
              type="text"
              name="nickname"
              placeholder="New Nick Name"
              value={profileDataToEdit.nickname}
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
          {isEditing === "password" ? (
            <div className={styles.editButtons}>
              <p className={styles.editButton} onClick={handleUpdateProfile}>
                ✔️
              </p>
              <p
                className={styles.editButton}
                onClick={handlebtnCancelEditClick}
              >
                ✖️
              </p>
            </div>
          ) : (
            <p
              className={styles.editButton}
              onClick={() => handleBtnEditClick("password")}
            >
              ✏️
            </p>
          )}
        </div>

        <p className={styles.infoValue}>
          {isEditing === "password" ? (
            <div className={styles.passwordInputContainer}>
              <input
                className={styles.editInput}
                type={eyeInvisible ? "password" : "text"}
                name="password"
                placeholder="New Password"
                value={profileDataToEdit.password}
                onChange={handleChange}
              />
              <span
                className={styles.passwordToggleIcon}
                onClick={() => setEyeInvisible(!eyeInvisible)}
              >
                {eyeInvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          ) : (
            "********"
          )}
        </p>
      </div>

      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <button className={styles.logoutButton} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
