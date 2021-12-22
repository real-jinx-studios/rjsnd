import { useState, useEffect, useContext } from "react";
import styles from "./navbar2.module.css";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import MyImage from "./myImage";
import cn from "classnames";
import { useRouter } from "next/router";
import HeaderMenuButton from "./HeaderMenuButton";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Store } from "../utils/store";

export default function Navbar2() {
  const { state, dispatch } = useContext(Store);
  const { logged_in, checkout } = state;

  const handleStateChange = (e) => {
    if (logged_in == true) {
      dispatch({ type: "LOG_OUT" });
      Cookies.set("logged_in", "false");
    } else {
      if (logged_in == false) {
        dispatch({ type: "LOG_IN" });
        Cookies.set("logged_in", "true");
      }
    }
    console.log(e, state);
  };

  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const sticky = 80;
  const catchScroll = (e) => {
    if (window.scrollY > sticky) {
      setScroll(true);
    } else if (window.scrollY <= sticky) {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.onscroll = function (e) {
      catchScroll(e);
    };
  }, []);

  return (
    <nav
      className={cn({
        [styles.navbar_wrapper]: scroll === false,
        [styles.navbar_wrapper_scroll]: scroll === true,
      })}
      role="navigation"
      aria-label="Primary"
    >
      <div className={styles.navbar_inner}>
        <ul className={`${styles.nav_ul_left}`}>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/subtitle3">
              <a className={styles.nav_link_a}>Subtitle</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/convert">
              <a className={styles.nav_link_a}>Convert</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/subass">
              <a className={styles.nav_link_a}>Subtitling Assistant</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/Burn-in">
              <a className={styles.nav_link_a}>Burn-in</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/go3d">
              <a className={styles.nav_link_a}>Go 3D</a>
            </Link>
          </li>
        </ul>

        <div className={styles.nav_sec_center}>
          <div
            className={cn({
              [router.pathname !== "/"
                ? styles.nav_icon_wrapper
                : styles.nav_icon_wrapper_home]: scroll === false,
              [styles.nav_icon_wrapper_scroll]: scroll === true,
            })}
          >
            <Link href={router.pathname !== "/" ? "/" : "/buy/products"}>
              <a>
                <MyImage
                  priority={true}
                  src="/images/ezlogo.png"
                  height={50}
                  width={100}
                  alt="EZTitles Logo"
                  layout="intrinsic"
                />
              </a>
            </Link>
          </div>
        </div>
        <ul className={styles.nav_ul_right}>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/subtitle">
              <a className={styles.nav_link_a}>Services Portal</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/buy/checkout">
              <a className={styles.buy_now_wrapper}>BUY NOW</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <div className="btn_store">
              <input
                id="shit"
                type="checkbox"
                className={styles.store_control}
              />
              <label
                htmlFor="shit"
                className={styles.lbl}
                onClick={handleStateChange}
              >
                <span>
                  <div className={styles.s_control_button_wrapper}>
                    <div className={styles.s_control_circle}></div>
                  </div>
                </span>
              </label>
            </div>
          </li>
          {/* <li className={cn({
                            [styles.nav_li]: scroll === false,
                            [styles.nav_li_scroll]: scroll === true
                        })}><Link href='/user-login'><a className={styles.profile_wrapper}><svg xmlns="http://www.w3.org/2000/svg" height="29px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 13.5c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5zM7.82 12l1.06-1.06L9.94 12 11 10.94 9.94 9.88 11 8.82 9.94 7.76 8.88 8.82 7.82 7.76 6.76 8.82l1.06 1.06-1.06 1.06zm4.17-10C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.18-12.24l-1.06 1.06-1.06-1.06L13 8.82l1.06 1.06L13 10.94 14.06 12l1.06-1.06L16.18 12l1.06-1.06-1.06-1.06 1.06-1.06z"/></svg></a></Link></li>
                        <li className={cn({
                            [styles.nav_li]: scroll === false,
                            [styles.nav_li_scroll]: scroll === true
                        })}><a className={styles.cart_wrapper} onClick={handleCartClick}>{isCart && <div
                            className={styles.cart_items}>
                            <div className={styles.cart_items_inner}></div>
                            <div className={styles.cart_items_inner_number}>{isCart.cart.length}</div>
                        </div>}<svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="29px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"/></g></svg></a></li>
                       */}
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <a className={styles.search_wrapper}>
              <svg
                className={styles.nav_search_svg}
                xmlns="http://www.w3.org/2000/svg"
                height="29px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </a>
          </li>

          {/*<li className={cn({
                           [styles.nav_li]: scroll === false,
                           [styles.nav_li_scroll]: scroll === true
                       })}><HeaderMenuButton/></li>*/}
        </ul>
      </div>
    </nav>
  );
}
