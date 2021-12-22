import styles from "../styles/subtitle3.module.css";
import MyImage from "../components/myImage";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useCycle,
  useViewportScroll,
  useTransform,
  AnimateSharedLayout,
} from "framer-motion";
import { stagger, fadeInUp, easing } from "../components/animations";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimateOnScroll from "../components/animateOnScroll";
import AnimateDirectionSlide from "../components/animateDirectionSlide";
import { useSpring } from "react-spring";
import { useRouter } from "next/router";
import ScrollDownPrompt from "../components/scrollDownPrompt";
import PaypalCheckout from "../components/paypalCheckout";
import Head from "next/head";
import { ref } from "react";
import Layout from "../components/layout";
import { Store } from "../utils/store";
import axios from "axios";

export default function Subtitle() {
  /*intersection observer shit*/

  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();
  const section5 = useRef();
  const sections = [section1, section2, section3, section4, section5];
  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          console.log(entry);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-25%",
      }
    );

    sections.forEach((section) => {
      observer.observe(section.current);
    });
  }, []);
  /*some more impractical bullshit about product prices*/
  const prices = {
    essentials: {
      ot: "1720",
      rent: "80",
      installment: "436",
      installment_contd: "435",
    },
    standard: {
      ot: "1940",
      rent: "90",
      installment: "491",
      installment_contd: "490",
    },
    ultimate: {
      ot: "2380",
      rent: "100",
      installment: "601",
      installment_contd: "600",
    },
  };

  /*state management is below*/
  const [currentNav, setCurrentNav] = useState("none");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRentDropdownOpen, setIsRentDropdownOpen] = useState(false);
  const [isInstallmentDropdownOpen, setIsInstallmentDropdownOpen] =
    useState(false);
  const [isPaymentSelected, setIsPaymentSelected] = useState("one-time");
  const [isStreamingServices, setIsStreamingServices] = useState(false);
  const [isDigitalCinema, setIsDigitalCinema] = useState(false);
  const [isClosedCaptions, setIsClosedCaptions] = useState(false);
  const [isBlueray, setIsBlueray] = useState(false);

  /*viewport scroll handlers*/
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  /*scrolling triggers below for components in view*/
  const [ref, inView] = useInView();
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();
  const [ref4, inView4] = useInView();
  const videoRef = useRef();
  const router = useRouter();
  useEffect(() => {
    const nav = router.asPath.split("#");

    if (inView1) {
      setCurrentNav("compatibility");
    } else if (inView2) {
      setCurrentNav("formats");
    } else if (inView3) {
      setCurrentNav("features");
    } else if (inView4) {
      setCurrentNav("editions");
    } else if (inView) {
      setCurrentNav("none");
    } /*else{
            setCurrentNav('none')
        }*/
  }, [inView1, inView2, inView3, inView4]);

  /*event handlers like clicks and such below*/
  const handleVideoPlay = () => {
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };
  const handlePaymentSelect = (e) => {
    setIsPaymentSelected(e);
  };
  const handleStreamingServices = () => {
    setIsStreamingServices(!isStreamingServices);
  };
  const handleDigitalCinema = () => {
    setIsDigitalCinema(!isDigitalCinema);
  };
  const handleCloseCards = () => {
    setIsDigitalCinema(false);
    setIsStreamingServices(false);
  };
  const handleBlueray = () => {
    setIsBlueray(!isBlueray);
  };
  useEffect(() => {
    if (isStreamingServices) {
      cycleCardsVariants(1);
    } else {
      cycleCardsVariants(0);
    }
  }, [isStreamingServices]);

  useEffect(() => {
    if (isDigitalCinema) {
      cycleCardsVariants(2);
    } else {
      cycleCardsVariants(0);
    }
  }, [isDigitalCinema]);
  useEffect(() => {
    console.log(isDigitalCinema, isStreamingServices, isBlueray);
  }, [isDigitalCinema, isStreamingServices, isBlueray]);

  const handleClosedCaptions = () => {
    setIsClosedCaptions(!isClosedCaptions);
  };
  const toggleRentDropdown = () => setIsRentDropdownOpen(!isRentDropdownOpen);
  const toggleInstallmentDropdown = () =>
    setIsInstallmentDropdownOpen(!isInstallmentDropdownOpen);

  /*animation setup is below*/
  const dropdownAnimVariantOption1 = {
    initial: {
      opacity: 0,
      y: -75,
    },
    animate: {
      opacity: 1,
      y: 2,
      transition: {
        type: "tween",
        duration: 0.12,
        ease: [0.68, -0.55, 0.27, 1.55],
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };
  const dropdownAnimVariantOption2 = {
    initial: {
      opacity: 0,
      y: -75,
    },
    animate: {
      opacity: 1,
      y: 3.5,
      transition: {
        type: "tween",
        delay: 0.096,
        duration: 0.12,
        ease: [0.68, -0.55, 0.27, 1.55],
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.2,
      },
    },
  };
  const dropdownAnimVariantRentOption = {
    initial: {
      opacity: 0,
      y: 83,
    },
    animate: {
      opacity: 1,
      y: 83,
      transition: {
        staggerChildren: 0.08,
        transition: {
          type: "tween",
          ease: [0.68, -0.55, 0.27, 1.55],
        },
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };
  const dropdownAnimVariantRentItem = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        transition: {
          type: "tween",
          ease: [0.68, -0.55, 0.27, 1.55],
        },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  const dropdownAnimVariantInstallmentOption = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 48.5,
      transition: {
        staggerChildren: 0.11,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };
  const paymentRentInstallmentVariant = {
    initial: {
      opacity: 0,
      y: -98,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {},
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };
  const cardTransition = {
    type: "tween",
    duration: 0.25,
    ease: [0.86, 0, 0.07, 1],
  };
  const cardsVariantsOuter = {
    closed: {
      flex: "0 0 32%",
      transition: cardTransition,
    },
    open: {
      flex: "0 0 2%",
      transition: cardTransition,
    },
    bluerayClosed: {
      flex: "0 0 32%",
      transition: cardTransition,
    },
    bluerayOpen: {
      flex: "0 0 93%",
      transition: cardTransition,
    },
  };

  /*every const is like an animation end state. first is the initial animation when page loads or nothing is selected. the following const are representing each of the two states
   * of a card being clicked. every const has the same object properties.
   * the useCycle at the end is what effectively changes the state of the animation from one const to another. By doing this the Framer library automatically animates between states.*/
  const cardsVariantsInitial = {
    streamingServicesOuter: { flex: "0 1 32%" },
    streamingServicesInner: {
      opacity: 1,
      zIndex: 2,
      transition: { delay: 0.1 },
    },
    streamingServicesExtended: {
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.1 },
    },
    closedCaptionsOuter: { flex: "0 1 32%" },
    closedCaptionsInner: { opacity: 1, zIndex: 2 },
    closedCaptionsExtended: { opacity: 0, zIndex: 1 },
    digitalCinemaOuter: { flex: "0 1 32%" },
    digitalCinemaInner: { opacity: 1, zIndex: 2 },
    digitalCinemaExtended: { opacity: 0, zIndex: 1 },
  };
  const cardsVariantsStreamingOpen = {
    streamingServicesOuter: { flex: "0 1 93%" },
    streamingServicesInner: {
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.1 },
    },
    streamingServicesExtended: {
      opacity: 1,
      zIndex: 2,
      transition: { delay: 0.1 },
    },
    closedCaptionsOuter: { flex: "0 1 2%" },
    closedCaptionsInner: { opacity: 0, zIndex: 1 },
    closedCaptionsExtended: { opacity: 1, zIndex: 2 },
    digitalCinemaOuter: { flex: "0 1 2%" },
    digitalCinemaInner: { opacity: 1, zIndex: 2 },
    digitalCinemaExtended: { opacity: 0, zIndex: 1 },
  };
  const cardsVariantsDigitalOpen = {
    streamingServicesOuter: { flex: "0 1 2%" },
    streamingServicesInner: { opacity: 1, zIndex: 2 },
    streamingServicesExtended: { opacity: 2, zIndex: 1 },
    closedCaptionsOuter: { flex: "0 1 2%" },
    closedCaptionsInner: { opacity: 0, zIndex: 1 },
    closedCaptionsExtended: { opacity: 1, zIndex: 2 },
    digitalCinemaOuter: { flex: "0 1 93%" },
    digitalCinemaInner: { opacity: 0, zIndex: 1 },
    digitalCinemaExtended: { opacity: 1, zIndex: 2 },
  };
  const [cardsVariants, cycleCardsVariants] = useCycle(
    cardsVariantsInitial,
    cardsVariantsStreamingOpen,
    cardsVariantsDigitalOpen
  );

  /*dynamic element generation*/
  const toggleDropdown = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
    setLicense(e);
  };

  const license_editions = [
    {
      name: "Essentials",
      info: "For subtitling streaming services.",
    },
    {
      name: "Standard",
      info: "For more standard sub stuff.",
    },
    {
      name: "Ultimate",
      info: "for tesla owners.",
    },
  ];
  const [license, setLicense] = useState("Essentials");
  const liOptionsElement = license_editions.map((x, i) => {
    if (x.name != license) {
      return (
        <motion.div
          variants={
            i == 1 ? dropdownAnimVariantOption1 : dropdownAnimVariantOption2
          }
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.version_dropdown}
          onClick={() => {
            toggleDropdown(x.name);
          }}
          key={x.name}
        >
          <div key={i} className={styles.option_version}>
            <div className={styles.version_inner}>
              <h2 data-tip data-for={`info ${i}`}>
                {x.name}
                {/*  <svg className={styles.version_info_icon} xmlns="http://www.w3.org/2000/svg" height="18px"
                                 viewBox="0 0 24 24" width="18px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path
                                    d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                            </svg>*/}
              </h2>
              <ReactTooltip id={`info ${i}`} type="info">
                <span>{x.info}</span>
              </ReactTooltip>
            </div>
          </div>
        </motion.div>
      );
    }
  });
  const liSelectedElement = license_editions.map((x, i) => {
    if (x.name == license) {
      return (
        <div
          key={x.name}
          className={styles.version_dropdown}
          onClick={() => {
            toggleDropdown(x.name);
          }}
        >
          <div className={styles.selected_version}>
            <div className={styles.version_inner}>
              <h2 data-tip data-for={`info ${i}`}>
                {x.name}
                {/* <svg className={styles.version_info_icon} xmlns="http://www.w3.org/2000/svg" height="18px"
                                 viewBox="0 0 24 24" width="18px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path
                                    d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                            </svg>*/}
              </h2>
              <ReactTooltip id={`info ${i}`} type="info">
                <span>{x.info}</span>
              </ReactTooltip>
            </div>
          </div>
          {!isDropdownOpen && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.version_dropdown_svg}
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 0 24 24"
              width="36px"
              fill="#FFFFFF"
            >
              <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
              <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
            </motion.svg>
          )}
          {isDropdownOpen && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.version_dropdown_svg}
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 0 24 24"
              width="36px"
              fill="#FFFFFF"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 0h24v24H0V0z"
                fill="none"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </motion.svg>
          )}
        </div>
      );
    }
  });

  const { state, dispatch } = useContext(Store);
  const handleCheckout = async (e) => {
    e.preventDefault();
    const product = {
      _id: "61b0a72c24d6d0daa195e22a",
      name: "3dtitles",
    };
    const { data } = await axios.get(`/api/mongodb/products/${product._id}`);
    //do some check on data and stuff
    console.log(data);
    dispatch({
      type: "ADD_TO_CHECKOUT_NORMAL",
      payload: {
        name: "EZTitles",
        icon: "/images/icons/ez_icon3.png",
        edition: "essentials",
        license: "Rent",
        duration: "1",
        quantity: 1,
        price: 80,
      },
    });
    router.push("/buy/checkout/#");
  };
  const handleCheckoutConvert = async (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TO_CHECKOUT_NORMAL",
      payload: {
        name: "EZConvert",
        icon: "/images/icons/ezc_icon3.png",
        edition: "PROFESSIONAL",
        license: "Purchase",
        duration: "lifetime",
        quantity: 1,
        price: 6800,
      },
    });
    router.push("/buy/checkout/#");
  };
  const handleCheckoutPlugins = async (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TO_CHECKOUT_NORMAL",
      payload: {
        name: "EZT Plugins",
        icon: "/images/icons/ep_icon3.png",
        edition: "ProMedia Carbon",
        license: "Purchase",
        duration: "lifetime",
        quantity: 1,
        price: 500,
      },
    });
    router.push("/buy/checkout/#");
  };

  return (
    <Layout
      title="EZTitles subtitle software"
      description="Subtitle anything with the worlds most advanced subtitling and captioning software!"
    >
      <Head>
        <meta
          name="google-site-verification"
          content="ysxVMioFPf2YJs3BRu3gefvPmShIoplEtnSp3FJJbAg"
        />
      </Head>
      <div className={styles.video_background}>
        <video autoPlay loop>
          <source src="/videos/hero-eztitles.webm" type="video/webm" />

          <source src="/videos/hero-eztitles.mp4" type="video/mp4" />
        </video>
      </div>
      <motion.header className={styles.main_wrapper} ref={ref}>
        {/*eztitles purchase menu*/}
        <motion.div className={styles.page_top}>
          <div className={styles.page_top_grid}>
            <div className={styles.title_desc_cell}>
              <h1 className={styles.main_title_description_text}>
                The world’s best professional subtitling and captioning software
              </h1>
            </div>
            <div className={styles.title_cell}>
              <h2 className={styles.main_title_text}>EZTITLES</h2>
            </div>
            <div className={styles.free_trial_cell}>
              <input
                className="chk"
                type="checkbox"
                id="button-mover-trigger"
              />

              <a
                onClick={handleCheckoutConvert}
                href="#"
                className="button button_basic_long"
              >
                FREE TRIAL
              </a>
              <label htmlFor="button-mover-trigger">
                <div className="chk_trigger"></div>
              </label>
            </div>
            <div className={styles.license_editions_cell}>
              <a
                onClick={handleCheckoutPlugins}
                href="#"
                className="button button_basic_long"
              >
                LICENSE EDITIONS
              </a>
            </div>
            <div className={styles.pricing_cell}>
              <h4 className={styles.pricing_options_description_title}>
                CHECK PRICING OPTIONS
                <br />
                <span>
                  EZTitles license editions differ only in the supported file
                  formats
                </span>
              </h4>
            </div>
            <div className={styles.dropdown_cell}>
              <div className={styles.dropdown_menu}>
                <select className={styles.select_custom}>
                  <option value="">ESSENTIAL</option>
                  <option value="">STANDARD</option>
                  <option value="">ULTIMATE</option>
                </select>
                <span className={styles.custom_arrow}></span>
              </div>
              {/*         <select className={styles.version_dropdown_select}>
                <option value="essentials">Essentials</option>
                <option value="standard">Standard</option>
                <option value="ultimate">Ultimate</option>
              </select>
              {liSelectedElement}

              <AnimatePresence exitBeforeEnter>
                {isDropdownOpen && <>{liOptionsElement}</>}
              </AnimatePresence>*/}
            </div>

            <div className={styles.payment_select_cell}>
              <p className={styles.payment_text_cell_text}>Payment:</p>
              <div className={styles.select}>
                <div className={styles.purchase_options}>
                  <div
                    className={styles.product_version}
                    key="one-time"
                    onClick={() => handlePaymentSelect("one-time")}
                  >
                    <div
                      className={
                        isPaymentSelected == "one-time"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      one-time
                    </div>
                  </div>

                  <div
                    className={styles.product_version}
                    key="rent"
                    onClick={() => handlePaymentSelect("rent")}
                  >
                    <div
                      className={
                        isPaymentSelected == "rent"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      rent
                    </div>
                  </div>

                  <div
                    className={styles.product_version}
                    key="installment"
                    onClick={() => handlePaymentSelect("installment")}
                  >
                    <div
                      className={
                        isPaymentSelected == "installment"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      installments
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.payment_installment_cell}>
              <p className={styles.text_installment}>
                1 payment of €436 and 3 payments of €435
              </p>
              <div className={styles.dropdown_menu}>
                <select className={styles.select_custom}>
                  <option value="">12 Months (4 payments)</option>
                  <option value="">24 Months (8 payments)</option>
                  <option value="">36 Months (12 payments)</option>
                </select>
                <span className={styles.custom_arrow}></span>
              </div>
            </div>
            <div className={styles.checkout_btn_cell}>
              <a
                href="#"
                onClick={handleCheckout}
                className="button button_basic_long"
              >
                GO TO CHECKOUT
              </a>
            </div>
            <div className={styles.checkout_price_cell}>
              {isPaymentSelected == "one-time" && (
                <p className={styles.price_text}>
                  {prices[license.toLowerCase()].ot}€ w/o VAT<sup>*</sup>
                </p>
              )}
              {isPaymentSelected == "rent" && (
                <p className={styles.price_text}>
                  {prices[license.toLowerCase()].rent}€ w/o VAT
                  <br />
                  <small>per/MO.</small>
                </p>
              )}
              {isPaymentSelected == "installment" && (
                <p className={styles.price_text}>
                  1 x {prices[license.toLowerCase()].installment}€ w/o VAT
                  <br />
                  <small>then</small>
                  <br />
                  <small>
                    3<small> x </small>
                    {prices[license.toLowerCase()].installment_contd}€ w/o VAT
                  </small>
                </p>
              )}
            </div>
            <div className={styles.payment_info_cell}>
              <p>
                &#127544; Edit stuff at checkout. Add whatever you want or not.
                &#127544;
              </p>
            </div>
            <div className={styles.arrow_cell}>
              <div className={styles.scroll_down_svg}>
                <Link href="#video">
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 50 50"
                      height="48px"
                      viewBox="0 0 50 50"
                      width="48px"
                      fill="#FFFFFF"
                    >
                      <path d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15  c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422  C15.172,39.813,15.172,40.446,15.563,40.836z" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
      <div className={styles.content_wrapper}>
        <div className={styles.secondary_nav}>
          <div className={styles.secondary_nav_inner}>
            <Link href="#compatibility">
              <motion.a
                className={`${styles.secondary_nav_inner_item1} ${
                  currentNav == "compatibility" ? styles.active_item1 : ""
                }`}
              >
                What you can do
              </motion.a>
            </Link>
            <Link href="#formats">
              <motion.a
                className={`${styles.secondary_nav_inner_item2} ${
                  currentNav == "formats" ? styles.active_item2 : ""
                }`}
              >
                How to do it easy
              </motion.a>
            </Link>
            <Link href="#features">
              <motion.a
                className={`${styles.secondary_nav_inner_item3} ${
                  currentNav == "features" ? styles.active_item3 : ""
                }`}
              >
                Ensure the quality
              </motion.a>
            </Link>
            <Link href="#editions">
              <motion.a
                className={`${styles.secondary_nav_inner_item4} ${
                  currentNav == "editions" ? styles.active_item4 : ""
                }`}
              >
                Complete and export
              </motion.a>
            </Link>
          </div>
        </div>

        {/*video section*/}
        <section ref={section1} className={styles.video_section}>
          <div className={styles.container} id="video">
            <div className={styles.content_inner_text}>
              <div className={styles.paragraph}>
                <h2 className={styles.subsection_title}>
                  Take a quick look at EZTitles’ capabilities
                </h2>
              </div>
            </div>
            <AnimateSharedLayout>
              <motion.div className={styles.video_wrapper}>
                <motion.div
                  layout
                  data-isopen={isVideoOpen}
                  initial={{ borderRadius: 50 }}
                  className={styles.video_parent}
                  onClick={() => {
                    setIsVideoOpen(!isVideoOpen);
                    handleVideoPlay();
                  }}
                >
                  <motion.div layout className={styles.video_play}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 0 24 24"
                      width="48px"
                      fill="#fefefe"
                    >
                      <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                    </svg>
                  </motion.div>

                  <motion.div className={styles.video_actual}>
                    <video
                      ref={videoRef}
                      style={{ maxWidth: 985, maxHeight: 554 }}
                    >
                      <source src="/videos/subass_video.mp4" />
                    </video>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimateSharedLayout>
            <div className={styles.content_inner_text}>
              <div className={styles.paragraph}>
                <h2 className={styles.subsection_title}>
                  and explore its full power
                </h2>
              </div>
              <div className={styles.scroll_down_svg}>
                <Link href="#compatibility">
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 50 50"
                      height="48px"
                      viewBox="0 0 50 50"
                      width="48px"
                      fill="#FFFFFF"
                    >
                      <path d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15  c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422  C15.172,39.813,15.172,40.446,15.563,40.836z" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/*first section*/}
        {/*<section className={styles.card_section}>
                <div className={styles.container}>
                    <div style={{ paddingTop:30}} ref={ref1} className={styles.content_inner} id='compatibility'>
                <div className={styles.content_inner_text}>
                        <div className={styles.paragraph}>
                            <h2 className={styles.subsection_title}>Prepare subtitles for any content</h2>

                        </div>
                </div>
                <AnimateSharedLayout>
                    <motion.div layout className={styles.card_wrapper_flex}>


                        streaming services
                        <motion.div variants={cardsVariants} animate='streamingServicesOuter' transition={cardTransition} layout className={styles.card_flex}>
                            shrunk part
                            <motion.div
                                variants={cardsVariants}
                                animate='streamingServicesInner'
                                key='streaming'
                                className={`${styles.card_inner} ${styles.streaming_services}`}>
                                <div className={styles.card_inner_title}>
                                    <h4>Streaming Services</h4>
                                </div>
                                <div className={styles.card_inner_description}>
                                    <p className={styles.card_inner_description_text}>EZTitles is designed to subtitle
                                        all major Streaming Services
                                        with a world class quality.</p>

                                </div>
                               <div className={styles.streaming_services_icons}>
                                   <MyImage src='/images/software/eztitles/netflix.png' width={153} height={75}/>
                                   <MyImage src='/images/software/eztitles/hbo_max.png' width={153} height={75}/>
                                   <MyImage src='/images/software/eztitles/apple_tv_plus.png' width={153} height={75}/>
                                   <MyImage src='/images/software/eztitles/prime_video.png' width={153} height={75}/>
                                   <MyImage src='/images/software/eztitles/disney_plus.png' width={153} height={75}/>
                                   <MyImage src='/images/software/eztitles/hulu.png' width={153} height={75}/>

                               </div>

                                <div className={styles.card_inner_more_icon}>
                                    <motion.svg
                                        onClick={handleStreamingServices} xmlns="http://www.w3.org/2000/svg"
                                        height="48px" viewBox="0 0 20 20" width="48px" fill="#FFFFFF">
                                        <g>
                                            <rect fill="none" height="20" width="20"/>
                                            <path
                                                d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z"/>
                                        </g>
                                    </motion.svg>

                                </div>

                            </motion.div>
                            extended part
                            <motion.div
                                variants={cardsVariants}
                                animate='streamingServicesExtended'
                                key='initial'
                                className={styles.card_inner_extended}>
                                <div className={styles.card_inner_title_extended}>
                                    <div className={styles.card_inner_title_extended_icon}>
                                        <MyImage src='/images/software/eztitles/streaming-icon.svg' width={65} height={65}/>
                                    </div>
                                    <div className={styles.card_inner_title_extended_text}>
                                        <h4>Streaming Services an Open Subtitles</h4>
                                    </div>

                                </div>
                                <div className={styles.card_inner_extended_description}>
                                    <div className={styles.card_inner_extended_description_text}>
                                        <p className={styles.simple_text}>EZTitles is designed to comply with all the <span className={styles.text_highlight_bold}>Streaming Services</span>  as <span className={styles.text_highlight_bold}>Netflix, Disney+, Apple TV+, Amazon Prime, Hulu
                                        </span> and others, <span className={styles.text_highlight_bold}>TV broadcast, film</span> and <span className={styles.text_highlight_bold}>NLE standards</span>.</p>
                                    </div>
                                    <div className={styles.card_inner_extended_description_list}>
                                        <ul>
                                            <li className={styles.simple_text}>
                                                EZTitles is an official <Link href='#'><a className={styles.link}>Netflix Partner</a></Link> for Timed Text creation and works together with both Netflix and Disney
                                                on the easy and accurate fulfillment of their requirements with our products.
                                            </li>
                                            <li className={styles.simple_text}>
                                                With our subtitling tools you could work in any language - West, Central and East European, Arabic, Hebrew,
                                                Persian, South and East Asian, incl. <Link href='#'><a className={styles.link}>vertical orientation, Rubies and Bouten for Chinese, Japanese and
                                                Korean scripts</a></Link>.
                                            </li>
                                            <li className={styles.simple_text}>
                                                Export all industry standard <Link href='#'><a className={styles.link}>Timed Text and Open Subtitles File Formats</a></Link>.
                                            </li>
                                            <li className={styles.simple_text}>
                                                Always deliver perfect subtitles to meet your client’s requirements thanks to the automated <Link href='#'><a className={styles.link}>Checks and Fixes</a></Link>.
                                            </li>
                                            <li className={styles.simple_text}>
                                                EZTitles is fully geared up to prepare flawless SDH subtitles. They can be in the source language of the video,
                                                as they include important non-dialogue audio sound effects and speaker identification, or in foreign languages
                                                if needed. Overlaps, colors and precise text positioning on the screen are all supported by EZTitles.
                                            </li>
                                        </ul>

                                    </div>


                                </div>


                                <div className={styles.card_inner_extended_more_icon}>
                                    <motion.svg
                                        onClick={handleStreamingServices} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24"
                                        width="48px" fill="#FFFFFF">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path
                                            d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                    </motion.svg>

                                </div>

                            </motion.div>

                        </motion.div>
                        closed captions plain
                        <motion.div variants={cardsVariants} animate='closedCaptionsOuter' transition={cardTransition}  layout className={styles.card_flex}>
                            <motion.div variants={cardsVariants}
                                        animate='closedCaptionsInner'
                                        className={`${styles.card_inner} ${styles.closed_captions}`}>
                                {!isStreamingServices && (<><div className={styles.card_inner_title}>
                                    <h4>Closed Captions</h4>
                                </div>
                                    <div className={styles.card_inner_description}>
                                    <p className={styles.card_inner_description_text}>EZTitles is a great software for
                                        Closed Captions creation.
                                        You can prepare stellar Roll-up,
                                        Paint-on and Pop-on Closed
                                        Captions stunningly fast in
                                        CEA-608, CEA-708
                                        or other file formats.</p>

                                    </div>
                                    <div className={styles.cc_button}>
                                        Learn More

                                    </div>
                                </>)}


                            </motion.div>
                        </motion.div>
                        digital cinema
                        <motion.div variants={cardsVariants} animate='digitalCinemaOuter' transition={cardTransition} layout className={styles.card_flex}>

                                shrunk part
                                <motion.div
                                    variants={cardsVariants}
                                    animate='digitalCinemaInner'
                                    key='digital'
                                    className={`${styles.card_inner} ${styles.digital_cinema}`}>
                                    <div className={styles.card_inner_title}>
                                        <h4>Digital Cinema</h4>
                                    </div>
                                    <div className={styles.card_inner_description}>
                                        <p className={styles.card_inner_description_text}>Prepare quality subtitles for
                                            Digital Cinema and see
                                            exactly how they will look like
                                            on the theater’s screen in any
                                            resolution from 2K up to 4K.</p>
                                    </div>
                                    <div className={styles.digital_cinema_aspect_ratios}>
                                        <div className={styles.digital_cinema_resolution}>
                                            <p>Resolution</p>
                                            <ul>
                                                <li>1998 x 1080</li>
                                                    <li>2048 x 858</li>
                                                        <li>2048 x 1080</li>
                                                            <li>3996 x 2160</li>
                                                                <li>4096 x 1716</li>
                                                                    <li>4096 x 2160</li>
                                            </ul>
                                        </div>
                                        <div className={styles.digital_cinema_ratio}>
                                            <p>Aspect Ratio</p>
                                            <ul>
                                                <li>1.85 : 1</li>
                                                    <li>2.39 : 1</li>
                                                        <li>1.90 : 1</li>
                                                            <li>1.85 : 1</li>
                                                                <li>2.39 : 1</li>
                                                                    <li>1.90 : 1</li>
                                            </ul>

                                        </div>

                                    </div>

                                    <div className={styles.card_inner_more_icon}>
                                        <motion.svg
                                            onClick={handleDigitalCinema} xmlns="http://www.w3.org/2000/svg"
                                            height="48px" viewBox="0 0 20 20" width="48px" fill="#FFFFFF" style={{transform: 'rotate(-180deg)'}}>
                                            <g>
                                                <rect fill="none" height="20" width="20"/>
                                                <path
                                                    d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z"/>
                                            </g>
                                        </motion.svg>

                                    </div>

                                </motion.div>
                                extended part
                                <motion.div
                                    variants={cardsVariants}
                                    animate='digitalCinemaExtended'
                                    key='digital_extended'
                                    className={styles.card_inner_extended}>
                                    <div className={styles.card_inner_title_extended}>
                                        <div className={styles.card_inner_title_extended_icon}>
                                            <MyImage src='/images/software/eztitles/digital-icon.svg' width={65} height={65}/>
                                        </div>
                                        <div className={styles.card_inner_title_extended_text}>
                                            <h4>Digital Cinema</h4>
                                        </div>

                                    </div>
                                    <div className={styles.card_inner_extended_description}>
                                        <div className={styles.card_inner_extended_description_title}>
                                            <h4>Digital Cinema Ready</h4>
                                        </div>
                                        <div className={styles.card_inner_extended_description_text}>
                                            <p className={styles.simple_text} style={{marginTop:6}}>EZTitles supports Texas Instruments CineCanvas XML-based subtitles for the DLP Cinema projection system
                                                and the SMPTE 428-7-2014 DCDM (Digital Cinema Distribution Master) XML specifications.
                                                Get a 100% accurate preview of your subtitles in the exact way they appear on the theater’s screen.</p>
                                        </div>





                                    </div>
                                    <div className={styles.card_inner_extended_description}>
                                        <div className={styles.card_inner_extended_description_title}>
                                            <h4>Digital Cinema Mode</h4>
                                        </div>
                                        <div className={styles.card_inner_extended_description_text}>
                                            <p className={styles.simple_text} style={{marginTop:6}}>EZTitles has a dedicated presentation mode which complies with all the standards and requirements of
                                                Digital Cinema subtitling. The Digital Cinema mode supports the following image resolutions:</p>
                                        </div>
                                        <div className={styles.card_inner_extended_digital_cinema_list}>
                                            <ul  style={{margin:0, padding:0}}>
                                                <li>1998 x 1080, 2K flat in 1.85 : 1 aspect ratio;</li>
                                                <li>2048 x 858, 2K scope in 2.39 : 1 aspect ratio;</li>
                                                <li>2048 x 1080, 2K full container in 1.90:1 aspect ratio;</li>
                                                <li>3996 x 2160, 4K flat in 1.85 : 1 aspect ratio;</li>
                                                <li>4096 x 1716, 4K scope in 2.39 : 1 aspect ratio;</li>
                                                <li>4096 x 2160, 4K full container in 1.90:1 aspect ratio.</li>
                                            </ul>

                                        </div>
                                        <div className={styles.card_inner_extended_description_text}>
                                            <p className={styles.simple_text} style={{marginTop:6}}>EZTitles covers the full range of the Digital Cinema subtitle specifications by adding support for the <Link href='#'><a className={styles.link}>ruby characters
                                                and vertical text</a></Link>. Subtitles containing ruby characters and vertical text can now be exported and imported as text
                                                or image-based subtitles for Digital Cinema. Check all <Link href='#'><a className={styles.link}>exporting options</a></Link>.</p>
                                        </div>



                                    </div>


                                    <div className={styles.card_inner_extended_more_icon}>
                                        <motion.svg
                                            onClick={handleDigitalCinema} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24"
                                            width="48px" fill="#FFFFFF">
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path
                                                d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                        </motion.svg>

                                    </div>

                                </motion.div>



                        </motion.div>

                </motion.div>
                    <motion.div layout className={styles.card_wrapper_flex}>


                        blue-ray services
                        <motion.div variants={cardsVariantsOuter}
                                    animate={isBlueray?'bluerayOpen':'bluerayClosed'}
                                    layout className={styles.card_flex}>
                            shrunk part
                            <motion.div
                                animate={isBlueray?{opacity:0, zIndex:1}:{opacity:1, zIndex:2}}
                                key='streaming'
                                className={`${styles.card_inner} ${styles.blue_ray_pad}`}>
                                <div className={styles.card_inner_title}>
                                    <h4>Blu-ray and DVD</h4>
                                </div>
                                <div className={styles.card_inner_description}>
                                    <p className={styles.card_inner_description_text}>EZTitles can create BDN subtitle
                                        files in compliance with all
                                        industry standards.
                                        Whether it is DVD, NLE or Blu-ray
                                        with EZTitles you can create
                                        subtitles for them all. Text script
                                        formats and high-quality
                                        anti-aliased images are available.</p>

                                </div>


                                <div className={styles.card_inner_more_icon}>
                                    <motion.svg
                                        onClick={handleBlueray} xmlns="http://www.w3.org/2000/svg"
                                        height="48px" viewBox="0 0 20 20" width="48px" fill="#FFFFFF">
                                        <g>
                                            <rect fill="none" height="20" width="20"/>
                                            <path
                                                d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z"/>
                                        </g>
                                    </motion.svg>

                                </div>

                            </motion.div>
                            extended part
                            <motion.div
                                animate={isBlueray?{opacity:1, zIndex:2}:{opacity:0, zIndex:1}}
                                key='initial'
                                className={styles.card_inner_extended}>
                                <div className={styles.card_inner_title_extended}>
                                    <div className={styles.card_inner_title_extended_icon}>
                                        <MyImage src='/images/software/eztitles/blueray-icon.svg' width={65} height={65}/>
                                    </div>
                                    <div className={styles.card_inner_title_extended_text}>
                                        <h4>Blu-ray and DVD</h4>
                                    </div>

                                </div>
                                <div className={styles.card_inner_extended_description}>
                                    <div className={styles.card_inner_extended_description_text}>
                                        <p className={styles.simple_text} style={{marginTop:6}}>EZTitles can prepare BDN subtitle files in compliance with all industry standards. Whether it is DVD, NLE or Blu-ray.
                                            With EZTitles you can create subtitles for them all. Text script formats and high-quality anti-aliased images are
                                            available for the following systems:</p>
                                    </div>
                                    <div className={styles.card_inner_extended_digital_cinema_list}>
                                        <ul style={{margin:0, padding:0}}>
                                            <li>DaVinci Resolve,</li>
                                            <li>Sony Blu-print™,</li>
                                            <li>Sonic Scenarist HDMV (Blu-ray),</li>
                                            <li>Sonic Scenarist Advanced Contents (HD-DVD),</li>
                                            <li>Adobe® Encore® DVD,</li>
                                            <li>Apple® DVD Studio Pro®,</li>
                                            <li>Spruce DVD Maestro,</li>
                                            <li>Final Cut Pro®,</li>
                                            <li>Sony DoStudio,</li>
                                            <li>Sony DVD Architect and many more.</li>
                                        </ul>

                                    </div>
                                    <div className={styles.card_inner_extended_description_text}>
                                        <p className={styles.simple_text} style={{marginTop:6}}>Check <Link href='#'><a className={styles.link}>all supported formats</a></Link>.</p>
                                    </div>



                                </div>


                                <div className={styles.card_inner_extended_more_icon}>
                                    <motion.svg
                                        onClick={handleBlueray} xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24"
                                        width="48px" fill="#FFFFFF">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path
                                            d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                    </motion.svg>

                                </div>

                            </motion.div>

                        </motion.div>
                        teletext plain
                        <motion.div variants={cardsVariantsOuter} animate={isBlueray?'open':'closed'} className={styles.card_flex}>
                            <motion.div   animate={isBlueray?{opacity:0, zIndex:1}:{opacity:1, zIndex:2}}
                                          key='teletext'
                                        className={`${styles.card_inner} ${styles.teletext}`}>
                                {!isBlueray && (<><div className={styles.card_inner_title}>
                                    <h4>Teletext</h4>
                                </div>
                                    <div className={styles.card_inner_description}>
                                        <p className={styles.card_inner_description_text}>EZTitles easily prepare Teletext
                                            subtitles and even offers
                                            a specified profile preset for that.
                                            Just choose it and the program
                                            will change the interface to focus
                                            on the tools you’d mostly need
                                            to get the job done.</p>

                                    </div></>)}


                            </motion.div>
                        </motion.div>
                        dvb plain
                        <motion.div variants={cardsVariantsOuter} animate={isBlueray?'open':'closed'}  layout className={styles.card_flex}>
                            <motion.div   animate={isBlueray?{opacity:0, zIndex:1}:{opacity:1, zIndex:2}}
                                          key='dvb'
                                        className={`${styles.card_inner}`}>
                                {!isBlueray && (<><div className={styles.card_inner_title}>
                                    <h4>DVB Subtitles</h4>
                                </div>
                                    <div className={styles.card_inner_description}>
                                        <p className={styles.card_inner_description_text}>Generate ETSI EN 300 743
                                            compatible DVB subtitling
                                            elementary stream for
                                            muxing with ProMedia Carbon
                                            multiplexers. There is an option
                                            to export Generic DVB
                                            Elementary Stream as well.</p>

                                    </div></>)}


                            </motion.div>
                        </motion.div>

                    </motion.div>
                </AnimateSharedLayout>

            </div>
                </div>
            </section>*/}
        <section ref={section2} className={styles.card_section}>
          <div className={styles.container} id="compatibility" ref={ref1}>
            <div className={styles.content_inner_text}>
              <div className={styles.paragraph}>
                <h2 className={styles.subsection_title}>
                  Prepare subtitles for any content
                </h2>
              </div>
            </div>
            <AnimateSharedLayout>
              <motion.div layout className={styles.card_wrapper_flex}>
                <motion.div
                  variants={cardsVariants}
                  animate="streamingServicesOuter"
                  transition={cardTransition}
                  layout
                  className={styles.card_flex}
                >
                  <motion.div
                    variants={cardsVariants}
                    animate="streamingServicesInner"
                    key="streaming"
                    className={`${styles.card_inner} ${styles.streaming_services}`}
                    onClick={isDigitalCinema ? handleCloseCards : () => {}}
                  >
                    {!isDigitalCinema && (
                      <>
                        <div className={styles.card_inner_title}>
                          <h4>Streaming Services</h4>
                        </div>
                        <div className={styles.card_inner_description}>
                          <p className={styles.card_inner_description_text}>
                            EZTitles is designed to subtitle all major Streaming
                            Services with a world class quality.
                          </p>
                        </div>
                        <div className={styles.streaming_services_icons}>
                          <MyImage
                            src="/images/software/eztitles/netflix.png"
                            width={153}
                            height={75}
                          />
                          <MyImage
                            src="/images/software/eztitles/hbo_max.png"
                            width={153}
                            height={75}
                          />
                          <MyImage
                            src="/images/software/eztitles/apple_tv_plus.png"
                            width={153}
                            height={75}
                          />
                          <MyImage
                            src="/images/software/eztitles/prime_video.png"
                            width={153}
                            height={75}
                          />
                          <MyImage
                            src="/images/software/eztitles/disney_plus.png"
                            width={153}
                            height={75}
                          />
                          <MyImage
                            src="/images/software/eztitles/hulu.png"
                            width={153}
                            height={75}
                          />
                        </div>

                        <div className={styles.card_inner_more_icon}>
                          <motion.svg
                            onClick={handleStreamingServices}
                            xmlns="http://www.w3.org/2000/svg"
                            height="48px"
                            viewBox="0 0 20 20"
                            width="48px"
                            fill="#FFFFFF"
                          >
                            <g>
                              <rect fill="none" height="20" width="20" />
                              <path d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z" />
                            </g>
                          </motion.svg>
                        </div>
                      </>
                    )}
                  </motion.div>

                  <motion.div
                    variants={cardsVariants}
                    animate="streamingServicesExtended"
                    key="initial"
                    className={styles.card_inner_extended}
                  >
                    <div className={styles.card_inner_title_extended}>
                      <div className={styles.card_inner_title_extended_icon}>
                        <MyImage
                          src="/images/software/eztitles/streaming-icon.svg"
                          width={65}
                          height={65}
                        />
                      </div>
                      <div className={styles.card_inner_title_extended_text}>
                        <h4>Streaming Services an Open Subtitles</h4>
                      </div>
                    </div>
                    <div className={styles.card_inner_extended_description}>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p className={styles.simple_text}>
                          EZTitles is designed to comply with all the{" "}
                          <span className={styles.text_highlight_bold}>
                            Streaming Services
                          </span>{" "}
                          as{" "}
                          <span className={styles.text_highlight_bold}>
                            Netflix, Disney+, Apple TV+, Amazon Prime, Hulu
                          </span>{" "}
                          and others,{" "}
                          <span className={styles.text_highlight_bold}>
                            TV broadcast, film
                          </span>{" "}
                          and{" "}
                          <span className={styles.text_highlight_bold}>
                            NLE standards
                          </span>
                          .
                        </p>
                      </div>
                      <div
                        className={styles.card_inner_extended_description_list}
                      >
                        <ul>
                          <li className={styles.simple_text}>
                            EZTitles is an official{" "}
                            <Link href="#">
                              <a className={styles.link}>Netflix Partner</a>
                            </Link>{" "}
                            for Timed Text creation and works together with both
                            Netflix and Disney on the easy and accurate
                            fulfillment of their requirements with our products.
                          </li>
                          <li className={styles.simple_text}>
                            With our subtitling tools you could work in any
                            language - West, Central and East European, Arabic,
                            Hebrew, Persian, South and East Asian, incl.{" "}
                            <Link href="#">
                              <a className={styles.link}>
                                vertical orientation, Rubies and Bouten for
                                Chinese, Japanese and Korean scripts
                              </a>
                            </Link>
                            .
                          </li>
                          <li className={styles.simple_text}>
                            Export all industry standard{" "}
                            <Link href="#">
                              <a className={styles.link}>
                                Timed Text and Open Subtitles File Formats
                              </a>
                            </Link>
                            .
                          </li>
                          <li className={styles.simple_text}>
                            Always deliver perfect subtitles to meet your
                            client’s requirements thanks to the automated{" "}
                            <Link href="#">
                              <a className={styles.link}>Checks and Fixes</a>
                            </Link>
                            .
                          </li>
                          <li className={styles.simple_text}>
                            EZTitles is fully geared up to prepare flawless SDH
                            subtitles. They can be in the source language of the
                            video, as they include important non-dialogue audio
                            sound effects and speaker identification, or in
                            foreign languages if needed. Overlaps, colors and
                            precise text positioning on the screen are all
                            supported by EZTitles.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className={styles.card_inner_extended_more_icon}>
                      <motion.svg
                        onClick={handleStreamingServices}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        width="48px"
                        fill="#FFFFFF"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </motion.svg>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={cardsVariants}
                  animate="closedCaptionsOuter"
                  transition={cardTransition}
                  layout
                  className={styles.card_flex}
                >
                  <motion.div
                    variants={cardsVariants}
                    animate="closedCaptionsInner"
                    className={`${styles.card_inner} ${styles.closed_captions}`}
                    onClick={
                      isStreamingServices || isDigitalCinema
                        ? handleCloseCards
                        : () => {}
                    }
                  >
                    {!isStreamingServices && (
                      <>
                        <div className={styles.card_inner_title}>
                          <h4>Closed Captions</h4>
                        </div>
                        <div className={styles.card_inner_description}>
                          <p className={styles.card_inner_description_text}>
                            EZTitles is a great software for Closed Captions
                            creation. You can prepare stellar Roll-up, Paint-on
                            and Pop-on Closed Captions stunningly fast in
                            CEA-608, CEA-708 or other file formats.
                          </p>
                        </div>
                        <div className={styles.cc_button}>Learn More</div>
                      </>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={cardsVariants}
                  animate="digitalCinemaOuter"
                  transition={cardTransition}
                  layout
                  className={styles.card_flex}
                >
                  <motion.div
                    variants={cardsVariants}
                    animate="digitalCinemaInner"
                    key="digital"
                    className={`${styles.card_inner} ${styles.digital_cinema}`}
                    onClick={isStreamingServices ? handleCloseCards : () => {}}
                  >
                    {
                      <>
                        <div className={styles.card_inner_title}>
                          <h4>Digital Cinema</h4>
                        </div>
                        <div className={styles.card_inner_description}>
                          <p className={styles.card_inner_description_text}>
                            Prepare quality subtitles for Digital Cinema and see
                            exactly how they will look like on the theater’s
                            screen in any resolution from 2K up to 4K.
                          </p>
                        </div>
                        <div className={styles.digital_cinema_aspect_ratios}>
                          <div className={styles.digital_cinema_resolution}>
                            <p>Resolution</p>
                            <ul>
                              <li>1998 x 1080</li>
                              <li>2048 x 858</li>
                              <li>2048 x 1080</li>
                              <li>3996 x 2160</li>
                              <li>4096 x 1716</li>
                              <li>4096 x 2160</li>
                            </ul>
                          </div>
                          <div className={styles.digital_cinema_ratio}>
                            <p>Aspect Ratio</p>
                            <ul>
                              <li>1.85 : 1</li>
                              <li>2.39 : 1</li>
                              <li>1.90 : 1</li>
                              <li>1.85 : 1</li>
                              <li>2.39 : 1</li>
                              <li>1.90 : 1</li>
                            </ul>
                          </div>
                        </div>

                        <div className={styles.card_inner_more_icon}>
                          <motion.svg
                            onClick={handleDigitalCinema}
                            xmlns="http://www.w3.org/2000/svg"
                            height="48px"
                            viewBox="0 0 20 20"
                            width="48px"
                            fill="#FFFFFF"
                            style={{ transform: "rotate(-180deg)" }}
                          >
                            <g>
                              <rect fill="none" height="20" width="20" />
                              <path d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z" />
                            </g>
                          </motion.svg>
                        </div>
                      </>
                    }
                  </motion.div>

                  <motion.div
                    variants={cardsVariants}
                    animate="digitalCinemaExtended"
                    key="digital_extended"
                    className={styles.card_inner_extended}
                  >
                    <div className={styles.card_inner_title_extended}>
                      <div className={styles.card_inner_title_extended_icon}>
                        <MyImage
                          src="/images/software/eztitles/digital-icon.svg"
                          width={65}
                          height={65}
                        />
                      </div>
                      <div className={styles.card_inner_title_extended_text}>
                        <h4>Digital Cinema</h4>
                      </div>
                    </div>
                    <div className={styles.card_inner_extended_description}>
                      <div
                        className={styles.card_inner_extended_description_title}
                      >
                        <h4>Digital Cinema Ready</h4>
                      </div>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p
                          className={styles.simple_text}
                          style={{ marginTop: 6 }}
                        >
                          EZTitles supports Texas Instruments CineCanvas
                          XML-based subtitles for the DLP Cinema projection
                          system and the SMPTE 428-7-2014 DCDM (Digital Cinema
                          Distribution Master) XML specifications. Get a 100%
                          accurate preview of your subtitles in the exact way
                          they appear on the theater’s screen.
                        </p>
                      </div>
                    </div>
                    <div className={styles.card_inner_extended_description}>
                      <div
                        className={styles.card_inner_extended_description_title}
                      >
                        <h4>Digital Cinema Mode</h4>
                      </div>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p
                          className={styles.simple_text}
                          style={{ marginTop: 6 }}
                        >
                          EZTitles has a dedicated presentation mode which
                          complies with all the standards and requirements of
                          Digital Cinema subtitling. The Digital Cinema mode
                          supports the following image resolutions:
                        </p>
                      </div>
                      <div
                        className={
                          styles.card_inner_extended_digital_cinema_list
                        }
                      >
                        <ul>
                          <li>
                            1998 x 1080, 2K flat in 1.85 : 1 aspect ratio;
                          </li>
                          <li>
                            2048 x 858, 2K scope in 2.39 : 1 aspect ratio;
                          </li>
                          <li>
                            2048 x 1080, 2K full container in 1.90:1 aspect
                            ratio;
                          </li>
                          <li>
                            3996 x 2160, 4K flat in 1.85 : 1 aspect ratio;
                          </li>
                          <li>
                            4096 x 1716, 4K scope in 2.39 : 1 aspect ratio;
                          </li>
                          <li>
                            4096 x 2160, 4K full container in 1.90:1 aspect
                            ratio.
                          </li>
                        </ul>
                      </div>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p
                          className={styles.simple_text}
                          style={{ marginTop: 6 }}
                        >
                          EZTitles covers the full range of the Digital Cinema
                          subtitle specifications by adding support for the{" "}
                          <Link href="#">
                            <a className={styles.link}>
                              ruby characters and vertical text
                            </a>
                          </Link>
                          . Subtitles containing ruby characters and vertical
                          text can now be exported and imported as text or
                          image-based subtitles for Digital Cinema. Check all{" "}
                          <Link href="#">
                            <a className={styles.link}>exporting options</a>
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <div className={styles.card_inner_extended_more_icon}>
                      <motion.svg
                        onClick={handleDigitalCinema}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        width="48px"
                        fill="#FFFFFF"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </motion.svg>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div layout className={styles.card_wrapper_flex}>
                <motion.div
                  variants={cardsVariantsOuter}
                  animate={isBlueray ? "bluerayOpen" : "bluerayClosed"}
                  layout
                  className={styles.card_flex}
                >
                  <motion.div
                    animate={
                      isBlueray
                        ? { opacity: 0, zIndex: 1 }
                        : { opacity: 1, zIndex: 2 }
                    }
                    key="streaming"
                    className={`${styles.card_inner} ${styles.blue_ray_pad}`}
                  >
                    <div className={styles.card_inner_title}>
                      <h4>Blu-ray and DVD</h4>
                    </div>
                    <div className={styles.card_inner_description}>
                      <p className={styles.card_inner_description_text}>
                        EZTitles can create BDN subtitle files in compliance
                        with all industry standards. Whether it is DVD, NLE or
                        Blu-ray with EZTitles you can create subtitles for them
                        all. Text script formats and high-quality anti-aliased
                        images are available.
                      </p>
                    </div>

                    <div className={styles.card_inner_more_icon}>
                      <motion.svg
                        onClick={handleBlueray}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 20 20"
                        width="48px"
                        fill="#FFFFFF"
                      >
                        <g>
                          <rect fill="none" height="20" width="20" />
                          <path d="M10,4c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6S6.69,4,10,4 M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7 c3.87,0,7-3.13,7-7C17,6.13,13.87,3,10,3L10,3z M9.5,10v2.5c0,0.28,0.22,0.5,0.5,0.5h0c0.28,0,0.5-0.22,0.5-0.5V10H13l-3-3l-3,3 H9.5z" />
                        </g>
                      </motion.svg>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={
                      isBlueray
                        ? { opacity: 1, zIndex: 2 }
                        : { opacity: 0, zIndex: 1 }
                    }
                    key="initial"
                    className={styles.card_inner_extended}
                  >
                    <div className={styles.card_inner_title_extended}>
                      <div className={styles.card_inner_title_extended_icon}>
                        <MyImage
                          src="/images/software/eztitles/blueray-icon.svg"
                          width={65}
                          height={65}
                        />
                      </div>
                      <div className={styles.card_inner_title_extended_text}>
                        <h4>Blu-ray and DVD</h4>
                      </div>
                    </div>
                    <div className={styles.card_inner_extended_description}>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p
                          className={styles.simple_text}
                          style={{ marginTop: 6 }}
                        >
                          EZTitles can prepare BDN subtitle files in compliance
                          with all industry standards. Whether it is DVD, NLE or
                          Blu-ray. With EZTitles you can create subtitles for
                          them all. Text script formats and high-quality
                          anti-aliased images are available for the following
                          systems:
                        </p>
                      </div>
                      <div
                        className={
                          styles.card_inner_extended_digital_cinema_list
                        }
                      >
                        <ul>
                          <li>DaVinci Resolve,</li>
                          <li>Sony Blu-print™,</li>
                          <li>Sonic Scenarist HDMV (Blu-ray),</li>
                          <li>Sonic Scenarist Advanced Contents (HD-DVD),</li>
                          <li>Adobe® Encore® DVD,</li>
                          <li>Apple® DVD Studio Pro®,</li>
                          <li>Spruce DVD Maestro,</li>
                          <li>Final Cut Pro®,</li>
                          <li>Sony DoStudio,</li>
                          <li>Sony DVD Architect and many more.</li>
                        </ul>
                      </div>
                      <div
                        className={styles.card_inner_extended_description_text}
                      >
                        <p
                          className={styles.simple_text}
                          style={{ marginTop: 6 }}
                        >
                          Check{" "}
                          <Link href="#">
                            <a className={styles.link}>all supported formats</a>
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <div className={styles.card_inner_extended_more_icon}>
                      <motion.svg
                        onClick={handleBlueray}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        width="48px"
                        fill="#FFFFFF"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 7c-.55 0-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V8c0-.55-.45-1-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </motion.svg>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={cardsVariantsOuter}
                  animate={isBlueray ? "open" : "closed"}
                  className={styles.card_flex}
                >
                  <motion.div
                    animate={
                      isBlueray
                        ? { opacity: 0, zIndex: 1 }
                        : { opacity: 1, zIndex: 2 }
                    }
                    key="teletext"
                    className={`${styles.card_inner} ${styles.teletext}`}
                    onClick={isBlueray ? handleBlueray : () => {}}
                  >
                    {!isBlueray && (
                      <>
                        <div className={styles.card_inner_title}>
                          <h4>Teletext</h4>
                        </div>
                        <div className={styles.card_inner_description}>
                          <p className={styles.card_inner_description_text}>
                            EZTitles easily prepare Teletext subtitles and even
                            offers a specified profile preset for that. Just
                            choose it and the program will change the interface
                            to focus on the tools you’d mostly need to get the
                            job done.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={cardsVariantsOuter}
                  animate={isBlueray ? "open" : "closed"}
                  layout
                  className={styles.card_flex}
                >
                  <motion.div
                    animate={
                      isBlueray
                        ? { opacity: 0, zIndex: 1 }
                        : { opacity: 1, zIndex: 2 }
                    }
                    key="dvb"
                    className={`${styles.card_inner}`}
                    onClick={isBlueray ? handleBlueray : () => {}}
                  >
                    {!isBlueray && (
                      <>
                        <div className={styles.card_inner_title}>
                          <h4>DVB Subtitles</h4>
                        </div>
                        <div className={styles.card_inner_description}>
                          <p className={styles.card_inner_description_text}>
                            Generate ETSI EN 300 743 compatible DVB subtitling
                            elementary stream for muxing with ProMedia Carbon
                            multiplexers. There is an option to export Generic
                            DVB Elementary Stream as well.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimateSharedLayout>
          </div>
        </section>
        {/*video format resolution and aspect ratio section*/}
        <section ref={section3} className={styles.video_format_section}>
          <div className={styles.v_r_a_video_background}>
            <video autoPlay loop muted>
              <source src="/videos/noway.webm" type="video/webm" />

              <source src="/videos/noway.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.container}>
            <div
              className={styles.content_inner_text}
              style={{ flex: "unset" }}
            >
              <div className={styles.paragraph}>
                <h2 className={styles.v_r_a_title}>Subtitle any video file</h2>
              </div>
            </div>
            {/*commented out sections using grid*/}
            {/*<div className={styles.video_resolution_aspect_wrapper}>

                        <div className={styles.v_r_a_card}>
                            <div className={`${styles.v_r_a_card_inner}`}>
                              <div className={styles.v_r_a_card_inner_title}>
                                    <h4>any file format</h4>
                                </div>
                                    <div className={styles.v_r_a_card_inner_description}>
                                        <p className={styles.v_r_a_card_inner_description_text}>EZTitles works with nearly
                                            any known video format
                                            with embedded timecode</p>

                                    </div>
                                <div className={styles.v_r_a_card_inner_format_wrapper}>
                                    <ul>
                                        <li>MPEG-1</li>
                                        <li>MPEG-2</li>
                                        <li>MPEG-4</li>
                                        <li>AVI</li>
                                    </ul>
                                    <ul>
                                        <li>WMV</li>
                                        <li>MOV</li>
                                        <li>MXF</li>
                                        <li>MVF</li>
                                    </ul>

                                </div>


                            </div>
                        </div>

                        <div className={styles.v_r_a_card}>
                            <div className={`${styles.v_r_a_card_inner}`}>
                              <div className={styles.v_r_a_card_inner_title}>
                                    <h4>any resolution</h4>
                                </div>
                                    <div className={styles.v_r_a_card_inner_description}>
                                        <p className={styles.v_r_a_card_inner_description_text}>from SD up to 4K
                                            and any custom resolution</p>

                                    </div>
                                <div className={styles.v_r_a_card_inner_format_wrapper_resolution}>
                                    <ul>
                                        <li><span>SD<br/>640x480</span></li>
                                        <li><span>HD<br/>1280x720</span></li>
                                        <li><span>FULL HD<br/>1920x1080</span></li>
                                        <li><span>4K<br/>4096x2160</span></li>
                                    </ul>

                                </div>


                            </div>
                        </div>

                        <div className={styles.v_r_a_card}>
                            <div className={`${styles.v_r_a_card_inner}`}>
                                <div className={styles.v_r_a_card_inner_title}>
                                    <h4>any screen ratio</h4>
                                </div>
                                <div className={styles.v_r_a_card_inner_format_wrapper_ratio}>
                                    <ul>
                                        <li>
                                            <span>16:10</span>
                                            <div className={styles.ratio_icons}>
                                                <MyImage src='/images/software/eztitles/computer-widescreen.png' width={35} height={35}/>
                                                <MyImage src='/images/software/eztitles/pc.png' width={35} height={35}/>
                                                <MyImage src='/images/software/eztitles/smartphone.png' width={35} height={35}/>

                                            </div>
                                        </li>
                                        <li>
                                        <span>16:9</span>
                                        <div className={styles.ratio_icons}>
                                            <MyImage src='/images/software/eztitles/computer-widescreen.png' width={35} height={35}/>
                                            <MyImage src='/images/software/eztitles/tv.png' width={35} height={35}/>
                                            <MyImage src='/images/software/eztitles/smartphone.png' width={35} height={35}/>

                                        </div>
                                    </li>
                                        <li>
                                        <span>1.85:1</span>
                                        <div className={styles.ratio_icons}>
                                            <MyImage src='/images/software/eztitles/cinema.png' width={35} height={35}/>

                                        </div>
                                    </li>
                                        <li>
                                            <span>2.35:1</span>
                                            <div className={styles.ratio_icons}>
                                                <MyImage src='/images/software/eztitles/movie-reel.png' width={35} height={35}/>

                                            </div>
                                        </li>

                                    </ul>
                                    <ul>
                                        <li>
                                            <span>1:1</span>
                                            <div className={styles.ratio_icons}>
                                                <MyImage src='/images/software/eztitles/social_media.png' width={35} height={35}/>

                                            </div>
                                        </li>
                                        <li>
                                            <span>5:4</span>
                                            <div className={styles.ratio_icons}>
                                                <MyImage src='/images/software/eztitles/pc.png' width={35} height={35}/>

                                            </div>
                                        </li>
                                        <li>
                                            <span>3:2</span>
                                            <div className={styles.ratio_icons}>
                                                <MyImage src='/images/software/eztitles/film.png' width={35} height={35}/>
                                                <MyImage src='/images/software/eztitles/camera.png' width={35} height={35}/>
                                                <MyImage src='/images/software/eztitles/tablet.png' width={35} height={35}/>

                                            </div>
                                        </li>
                                    </ul>

                                </div>


                            </div>
                        </div>




                    </div>*/}
            {/*section using flex for more responsiveness*/}
            <div className={styles.video_resolution_aspect_wrapper_flex}>
              {/*file format card*/}
              <div className={styles.v_r_a_card_flex}>
                <div className={`${styles.v_r_a_card_inner}`}>
                  <div className={styles.v_r_a_card_inner_title}>
                    <h4>any file format</h4>
                  </div>
                  <div className={styles.v_r_a_card_inner_description}>
                    <p className={styles.v_r_a_card_inner_description_text}>
                      EZTitles works with nearly any known video format with
                      embedded timecode
                    </p>
                  </div>
                  <div className={styles.v_r_a_card_inner_format_wrapper}>
                    <ul>
                      <li>MPEG-1</li>
                      <li>MPEG-2</li>
                      <li>MPEG-4</li>
                      <li>AVI</li>
                    </ul>
                    <ul>
                      <li>WMV</li>
                      <li>MOV</li>
                      <li>MXF</li>
                      <li>MVF</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/*resolution card*/}
              <div className={styles.v_r_a_card_flex}>
                <div className={`${styles.v_r_a_card_inner}`}>
                  <div className={styles.v_r_a_card_inner_title}>
                    <h4>any resolution</h4>
                  </div>
                  <div className={styles.v_r_a_card_inner_description}>
                    <p className={styles.v_r_a_card_inner_description_text}>
                      from SD up to 4K and any custom resolution
                    </p>
                  </div>
                  <div
                    className={
                      styles.v_r_a_card_inner_format_wrapper_resolution
                    }
                  >
                    <ul>
                      <li>
                        <span>
                          SD
                          <br />
                          640x480
                        </span>
                      </li>
                      <li>
                        <span>
                          HD
                          <br />
                          1280x720
                        </span>
                      </li>
                      <li>
                        <span>
                          FULL HD
                          <br />
                          1920x1080
                        </span>
                      </li>
                      <li>
                        <span>
                          4K
                          <br />
                          4096x2160
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/*aspect ratio card*/}
              <div className={styles.v_r_a_card_flex}>
                <div className={`${styles.v_r_a_card_inner}`}>
                  <div className={styles.v_r_a_card_inner_title}>
                    <h4>any screen ratio</h4>
                  </div>
                  <div className={styles.v_r_a_card_inner_format_wrapper_ratio}>
                    <ul>
                      <li>
                        <span>16:10</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/computer-widescreen.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/pc.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/smartphone.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                      <li>
                        <span>16:9</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/computer-widescreen.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/tv.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/smartphone.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                      <li>
                        <span>1.85:1</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/cinema.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                      <li>
                        <span>2.35:1</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/movie-reel.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <span>1:1</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/social_media.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                      <li>
                        <span>5:4</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/pc.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                      <li>
                        <span>3:2</span>
                        <div className={styles.ratio_icons}>
                          <MyImage
                            src="/images/software/eztitles/film.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/camera.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                          <MyImage
                            src="/images/software/eztitles/tablet.png"
                            width={35}
                            height={35}
                            layout="intrinsic"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*language section*/}
        <section ref={section4} className={styles.language_section}>
          <div className={styles.container}>
            <div
              style={{ marginTop: "230px" }}
              className={styles.content_inner}
            >
              <div className={styles.content_inner_text}>
                <dd className={styles.language_text}>
                  <span className={styles.big_text}>in any language</span>{" "}
                  <span className={styles.language_text_color}>
                    dans n'importe quelle languein{" "}
                  </span>
                  en cualquier idioma{" "}
                  <span className={styles.language_text_color}>
                    in jeder sprache
                  </span>{" "}
                  на любом языке{" "}
                  <span className={styles.language_text_color}>
                    به هر زبانی
                  </span>
                  &nbsp;
                  <span className={styles.language_text_color}>
                    herhangi bir dilde
                  </span>{" "}
                  in qualsiasi lingua{" "}
                  <span className={styles.language_text_color}>
                    w dowolnym języku{" "}
                  </span>{" "}
                  בכל שפה på hvilket som helst språk &nbsp;{" "}
                  <span className={styles.language_text_color}>任何語言</span>{" "}
                  &nbsp; σε οποιαδήποτε γλώσσα
                  <span className={styles.language_text_color}> بأي لغة</span>
                  &nbsp;
                  <span className={styles.language_text_color}>
                    bármilyen nyelven
                  </span>{" "}
                  em qualquer idioma{" "}
                  <span className={styles.language_text_color}>
                    किसी भी भाषा म
                  </span>{" "}
                  ในภาษาใดก็ได้ 모든 언어로&nbsp;{" "}
                  <span className={styles.language_text_color}>
                    任意の言語で
                  </span>{" "}
                  &nbsp; på vilket språk som helst{" "}
                  <span className={styles.language_text_color}>
                    на всеки език
                  </span>
                </dd>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.last_section} ref={section5}>
          <h1>Sample section w/text</h1>
          <p>
            The song came from the bathroom belting over the sound of the
            shower's running water. It was the same way each day began since he
            could remember. It listened intently and concluded that the singing
            today was as terrible as it had ever been. She sat deep in thought.
            The next word that came out o her mouth would likely be the most
            important word of her life. It had to be exact with no possibility
            of being misinterpreted. She was ready. She looked deeply into his
            eyes and said, "Octopus." "Do Not Enter." The sign made it clear
            that they didn't want anyone around. That wasn't going to stop Jack.
            Jack always lived with the notion that signs were mere suggestions,
            not actually absolute rules. That's why the moment Jack looked at
            the "Do Not Enter" sign, he walked past it and onto their property.
          </p>
          <p>
            The song came from the bathroom belting over the sound of the
            shower's running water. It was the same way each day began since he
            could remember. It listened intently and concluded that the singing
            today was as terrible as it had ever been. She sat deep in thought.
            The next word that came out o her mouth would likely be the most
            important word of her life. It had to be exact with no possibility
            of being misinterpreted. She was ready. She looked deeply into his
            eyes and said, "Octopus." "Do Not Enter." The sign made it clear
            that they didn't want anyone around. That wasn't going to stop Jack.
            Jack always lived with the notion that signs were mere suggestions,
            not actually absolute rules. That's why the moment Jack looked at
            the "Do Not Enter" sign, he walked past it and onto their property.
          </p>
          <p>
            The song came from the bathroom belting over the sound of the
            shower's running water. It was the same way each day began since he
            could remember. It listened intently and concluded that the singing
            today was as terrible as it had ever been. She sat deep in thought.
            The next word that came out o her mouth would likely be the most
            important word of her life. It had to be exact with no possibility
            of being misinterpreted. She was ready. She looked deeply into his
            eyes and said, "Octopus." "Do Not Enter." The sign made it clear
            that they didn't want anyone around. That wasn't going to stop Jack.
            Jack always lived with the notion that signs were mere suggestions,
            not actually absolute rules. That's why the moment Jack looked at
            the "Do Not Enter" sign, he walked past it and onto their property.
          </p>
        </section>
      </div>
      {/*<PaypalCheckout/>*/}
    </Layout>
  );
}
