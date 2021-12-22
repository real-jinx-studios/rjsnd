import styles from "./subs.module.css";
import MyImage from "./myImage";
import { useState } from "react";

export default function SubscriptionCards(props) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  const formats_list = props.formats.map((x, i) => <li key={i}>{x}</li>);

  const add = () => {};

  return (
    <div className={styles.card_outer}>
      <div className={styles.card_inner}>
        <div className={styles.card_title}>
          <MyImage src={props.url} width={38} height={38} />
          <h4>
            {props.title}{" "}
            <small style={{ fontWeight: "200" }}>({props.type})</small>
          </h4>
        </div>
        <div className={styles.card_content}>
          <div className={styles.card_content_description}>
            <p>{props.description}</p>
          </div>
          <div className={styles.card_content_formats}>
            <span onClick={onClick}>
              {props.formats.length} supported file formats{" "}
              <span style={{ transform: "rotateY(90deg)" }}>&#x2253;</span>
            </span>
            <div className={styles.card_content_format_list}>
              {!open && <ul style={{ display: "none" }}>{formats_list}</ul>}
              {open && <ul style={{ display: "block" }}>{formats_list}</ul>}
            </div>
          </div>
        </div>
        <div className={styles.card_bottom}>
          <div className={styles.price}>
            <h3>€{props.price}</h3>
          </div>
          <div className={styles.buy_button}>
            <div className={styles.buy_button_actual} onClick={add}>
              <span>Buy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
