import styles from "../../styles/login.module.css";
import { useState } from "react";
import Router from "next/router";
import { useEntries } from "../../lib/swr-hooks";
import useSWR from "swr";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeUsr = (e) => {
    setUsername(e.target.value);
  };
  async function handleClick(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/create-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);

      Router.push(
        "/user-login/register-success?query-insert-execution-time=" +
          json.message +
          "ms"
      );
    } catch (e) {
      throw Error(e.message);
    }
  }

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.main_inner}></div>
    </div>
  );
}
