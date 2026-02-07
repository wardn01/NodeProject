import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**
 * Profile component to display and edit user profile information
 * @param {function} setPage - Function to change the current page (used for logout)
 * @returns JSX for the profile component
 */
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

  // Fetch profile data on component mount
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/profile", {
          withCredentials: true,
        });
        setProfileData(res.data);
        setProfileDataToEdit((prev) => ({
          ...prev,
          nickname: res.data.nickname || "",
        }));
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

  // Handle profile update (nickname or password)
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
      setProfileDataToEdit((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to update profile.");
      }
      setSuccessMessage("");
    }
  };

  // Handle Edit Button Click
  const handleBtnEditClick = (editMode) => {
    if (isEditing !== "nothing" && isEditing !== editMode) {
      handlebtnCancelEditClick();
    }

    setIsEditing(editMode);
    setErrorMessage("");
    setSuccessMessage("");

    if (editMode === "nickname") {
      setProfileDataToEdit((prev) => ({
        ...prev,
        nickname: profileData.nickname,
      }));
    } else {
      setProfileDataToEdit((prev) => ({ ...prev, password: "" }));
    }
  };

  // Handle Cancel Edit Button Click
  const handlebtnCancelEditClick = () => {
    setIsEditing("nothing");
    setErrorMessage("");
    setSuccessMessage("");
    setProfileDataToEdit({
      nickname: profileData?.nickname || "",
      password: "",
    });
  };

  // Handle input changes for nickname and password
  const handleChange = (e) => {
    setProfileDataToEdit({
      ...profileDataToEdit,
      [e.target.name]: e.target.value,
    });
  };

  // Component for rendering action buttons (Edit, Save, Cancel)
  const ActionButtons = ({ mode }) => {
    if (isEditing === mode) {
      return (
        <div className={styles.editButtons}>
          <span
            className={styles.editButton}
            onClick={handleUpdateProfile}
            title="Save"
          >
            ✔️
          </span>
          <span
            className={styles.editButton}
            onClick={handlebtnCancelEditClick}
            title="Cancel"
          >
            ✖️
          </span>
        </div>
      );
    }
    return (
      <span
        className={styles.editButton}
        onClick={() => handleBtnEditClick(mode)}
        title="Edit"
      >
        ✏️
      </span>
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2 className={styles.profileTitle}>My Profile</h2>
        <div className={styles.avatar}>
          {profileData?.nickname?.charAt(0).toUpperCase() || "?"}
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.infoGroup}>
          <label className={styles.infoLabel}>Username</label>
          <div className={styles.infoValue}>
            {profileData?.username || "Loading..."}
          </div>
        </div>

        <div className={styles.infoGroup}>
          <label className={styles.infoLabel}>Email Address</label>
          <div className={styles.infoValue}>
            {profileData?.email || "Loading..."}
          </div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.labelWithEdit}>
            <label className={styles.infoLabel}>Nickname</label>
            <ActionButtons mode="nickname" />
          </div>

          <div className={styles.valueContainer}>
            {isEditing === "nickname" ? (
              <input
                className={styles.editInput}
                type="text"
                name="nickname"
                placeholder="Enter new nickname"
                value={profileDataToEdit.nickname}
                onChange={handleChange}
                autoFocus
              />
            ) : (
              <div className={styles.infoValue}>
                {profileData?.nickname || "Loading..."}
              </div>
            )}
          </div>
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.labelWithEdit}>
            <label className={styles.infoLabel}>Password</label>
            <ActionButtons mode="password" />
          </div>

          <div className={styles.valueContainer}>
            {isEditing === "password" ? (
              <div className={styles.passwordInputContainer}>
                <input
                  className={styles.editInput}
                  type={eyeInvisible ? "password" : "text"}
                  name="password"
                  placeholder="New Password"
                  value={profileDataToEdit.password}
                  onChange={handleChange}
                  autoFocus
                />
                <span
                  className={styles.passwordToggleIcon}
                  onClick={() => setEyeInvisible(!eyeInvisible)}
                >
                  {eyeInvisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            ) : (
              <div className={styles.infoValue}>••••••••</div>
            )}
          </div>
        </div>
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
