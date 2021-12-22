import React, { useState } from "react";
import { useEntries } from "../../lib/swr-hooks";
import { useRouter } from "next/router";
import styles from "../../styles/login.module.css";

export default function ServicePortal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { entries, isLoading, time } = useEntries();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (isLoading) {
      console.log("waiting for shit");
    } else {
      console.log(entries, "the fuck");

      if (
        entries.filter(function (e) {
          return (
            e.username === username &&
            e.password === password &&
            e.verified === 1
          );
        }).length > 0
      ) {
        router.push(
          "/user-login/user-profile?select-all-query-execution-time=" +
            entries[entries.length - 1].time
        );
      } else {
        setError(true);
      }
    }
  };
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_inner}>
        <form noValidate onSubmit={handleClick}>
          <button className={styles.submit_button} type="submit">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
