import styles from "./main.module.css";
import { useState } from "react";
import Auth from "../auth/Auth";
import Profile from "../profile/Profile";
import AllEnemies from "../allEnemies/AllEnemies";

function Main({ isAuth, setIsAuth }) {
  const [user, setUser] = useState(null);
  const [allEnemies, setAllEnemies] = useState([]);
  const [selectedEnemy, setSelectedEnemy] = useState(null);

  const [propAllEnemies, setPropAllEnemies] = useState(false);

  return (
    <main className={styles.main}>
      {!isAuth ? (
        <Auth
          setisAuth={setIsAuth}
          setUser={setUser}
          setAllEnemies={setAllEnemies}
        />
      ) : (
        <div>
          <Profile user={user} />

          <button onClick={() => setPropAllEnemies(!propAllEnemies)}>
            "Show Enemies"
          </button>
          {propAllEnemies && (
            <AllEnemies
              allEnemies={allEnemies}
              setSelectedEnemy={setSelectedEnemy}
              setPropAllEnemies={setPropAllEnemies}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default Main;
