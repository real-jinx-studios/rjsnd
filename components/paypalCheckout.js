import Script from 'next/script'
import React, {useEffect, useState} from "react";
export default function PaypalCheckout(){
    const [ready,setReady]=useState(false)
    useEffect(()=>{
        setReady(true);
        paypal.Buttons({
            style: {
                shape: 'pill',
                color: 'white',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                plan_id: 'P-8DX34730HC176870VMGHFJDA',
                    quantity: 1 // The quantity of the product for a subscription
            });
            },
            onApprove: function(data, actions) {
                alert(data.subscriptionID); // You can add optional success message for the subscriber here
            }
        }).render('#paypal-button-container');
        },[])
   /* <div id="paypal-button-container-P-8DX34730HC176870VMGHFJDA"></div>
    <script src="https://www.paypal.com/sdk/js?client-id=AdcCKGpVZQtU8C19gm1uRxzMTq0cPKg0lZIXpurYnOPSLBEZE_Q6sNpVdxpeyRI6MiQ71ItvjS1Oxcpv&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
    <script>
        paypal.Buttons({
        style: {
        shape: 'pill',
        color: 'white',
        layout: 'vertical',
        label: 'subscribe'
    },
        createSubscription: function(data, actions) {
        return actions.subscription.create({
        /!* Creates the subscription *!/
        plan_id: 'P-8DX34730HC176870VMGHFJDA',
        quantity: 1 // The quantity of the product for a subscription
    });
    },
        onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
    }
    }).render('#paypal-button-container-P-8DX34730HC176870VMGHFJDA'); // Renders the PayPal button
    </script>*/
    return(
        <>
            <Script src="https://www.paypal.com/sdk/js?client-id=AbPfHl4rmjuW5fptWJJec7Vx9_VqCUxsqR48RSTepYhyE9dcYDsimVGgontvstnHOcrYZBE6WPMglcR3&vault=true&intent=subscription" defer/>
            {ready?<div id='paypal-button-container' style={{position:'relative'}}>BUY SHIT</div>:<h3>loading shit</h3>}
        </>
    )
}