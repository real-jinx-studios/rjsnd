import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { Store } from "../../utils/store";
import Layout from "../../components/layout";
import Link from "next/link";
import MyImage from "../../components/myImage";
import NumberFormat from "react-number-format";
export default function Checkout() {
  const { state } = useContext(Store);
  const {
    checkout: { checkoutItems },
  } = state;

  //handle and calculate total prices
  const [totalPrices, setTotalPrices] = useState({
    subtotal: 0,
    vat: 25,
    total: 0,
  });
  useEffect(() => {
    calculateTP();
  }, []);
  const calculateTP = () => {
    let tempSub = 0;
    const tempVat = 25;
    checkoutItems.forEach((item) => {
      tempSub += item.price * item.quantity;
    });
    let tempTotal = (tempSub, tempVat) => {
      return {
        subtotal: tempSub,
        vat: tempSub * (tempVat / 100),
        total: tempSub + tempSub * (tempVat / 100),
      };
    };
    setTotalPrices({ ...tempTotal(tempSub, tempVat) });
  };

  //format numbers to look more like prices
  const numFormat = (num) => {
    let fNum = num.toFixed(2);
    fNum = fNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "2,");
    return fNum;
  };

  //generate cart/checkout items
  const items = checkoutItems.map((x) => (
    <div className="cart__items" key={x.name}>
      <div className="cart__items__icon flex-c-c">
        <MyImage src={x.icon} width={50} height={50} layout="intrinsic" />
      </div>
      <div className="cart__items__name flex-c-c justify-left font-bold">
        <span>{x.name}</span>
      </div>
      <div className="cart__items__edition flex-c-c justify-left">
        <span className="font-size-xs">{x.edition}</span>
      </div>
      <div className="cart__items__license flex-c-c justify-left">
        <span>{x.license}</span>
      </div>
      <div className="cart__items__duration flex-c-c justify-left font-size-s">
        <span>
          {x.duration}
          {x.duration !== "lifetime" && "/mo."}
        </span>
      </div>
      <div className="cart__items__quantity flex-c-c">
        <span>
          <sub>x</sub>
          {x.quantity}
        </span>
      </div>
      <div className="cart__items__total flex-c-c">
        <span>
          <NumberFormat
            value={x.price * x.quantity}
            displayType={"text"}
            thousandSeparator={true}
          />
          <sup>EUR</sup>
        </span>
      </div>
    </div>
  ));

  return (
    <Layout
      title="EZTitles store checkout"
      description="checkout page for products purchased on EZTitles.com"
    >
      <section className="checkout">
        <div className="billing">
          <div className="billing__inner">
            <h2 className="billing__title">Welcome to EZTitles store</h2>
            <h2 className="billing__description">
              Please, log-in in your profile or continue as new customer
            </h2>
            <div className="billing__buttons">
              <a href="#" className="button button_basic_long">
                LOG IN
              </a>
              <a href="#" className="button button_basic_long_inverted">
                NEW CUSTOMER
              </a>
            </div>
          </div>
          <div className="billing__inner-step">
            <h2 className="billing-step__title">whatever next step is</h2>
          </div>
        </div>
        <div className="cart">
          <div className="cart__inner">
            <div className="cart__title-section">
              <h2 className="cart__title">Order Summary</h2>
              <span className="cart__edit">Edit</span>
            </div>
            {items || "loading..."}
            <div className="cart__sum">
              <div className="cart__sum__title flex justify-sb">
                <span className="font-size-m">subtotal: </span>
                <span className="font-size-m">
                  <NumberFormat
                    value={totalPrices.subtotal}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <sup> EUR</sup>
                </span>
              </div>
              <div className="cart__sum__title flex justify-sb">
                <span className="font-size-m">VAT 25%: </span>
                <span className="font-size-m">
                  <NumberFormat
                    value={totalPrices.vat}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <sup> EUR</sup>
                </span>
              </div>
              <div className="cart__sum__title-total flex justify-sb font-bold">
                <span className="font-size-ml">TOTAL: </span>
                <span className="font-size-ml">
                  <NumberFormat
                    value={totalPrices.total}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  <sup> EUR</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*   {checkoutItems.length > 0 ? (
        <section className="checkout">
          <div className="billing">
            <div className="billing__inner">
              <h2 className="billing__title">Welcome to EZTitles store</h2>
              <h2 className="billing__description">
                Please, log-in in your profile or continue as new customer
              </h2>
              <div className="billing__buttons">
                <a href="#" className="button button_basic_long">
                  LOG IN
                </a>
                <a href="#" className="button button_basic_long_inverted">
                  NEW CUSTOMER
                </a>
              </div>
            </div>
            <div className="billing__inner-step">
              <h2 className="billing-step__title">whatever next step is</h2>
            </div>
          </div>
          <div className="cart">
            <div className="cart__inner">
              <div className="cart__title-section">
                <h2 className="cart__title">Order Summary</h2>
                <span className="cart__edit">Edit</span>
              </div>
              {items}
              <div className="cart__sum">
                <h5 className="cart__sum__title">
                  subtotal: {totalPrices.subtotal}
                  <sup> EUR</sup>
                </h5>
                <h5 className="cart__sum__title">
                  VAT 25%: {totalPrices.vat}
                  <sup> EUR</sup>
                </h5>
                <h4 className="cart__sum__title-total">
                  TOTAL: {totalPrices.total} <sup> EUR</sup>
                </h4>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="checkout checkout-empty">
          <h1 className="checkout-empty__h1">EMPTY CHECKOUT</h1>
          <Link href="/">
            <a className="checkout-empty__link">Back to home</a>
          </Link>
        </section>
      )}*/}
    </Layout>
  );
}
