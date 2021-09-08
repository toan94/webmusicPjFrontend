import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";

const StripeButton = ({ coin, setCointAmount, setShowBuy }) => {
    const publishableKey = "pk_test_51JVsvsAHgKq91qjD8jjOEACp2ULGKdRkVzZdPqaOZn0wctTbKmYDxbw8yKcQlY5xL919YPLA1fwpzTnuOmCS09Cs007phLrRAC";
    const price = coin/10;
    const stripePrice = price*100;
    const authHeader = useAuthHeader();

    const onToken = (token) => {
        console.log(token);
        setShowBuy(false);
        axios
            .post("http://localhost:8080/payment", {
                amount: stripePrice,
                description: coin + " coin",
                token,
            }, {headers: {"Authorization": authHeader()}})
            .then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    setCointAmount(response.data.currentBalance);
                } else {
                    console.log(response.data);
                    alert("Payment failed");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Payment failed");
            });
    };
    return (

        <StripeCheckout
            className="m-2"
            amount={stripePrice}
            label={`${coin} Coins`}
            name="Coin"
            image="https://cdn2.iconfinder.com/data/icons/dollar-banking-red/512/music_camera_video_arrow_play_sound_stop_dollar_money_finance-512.png"
            description={`Your total is ${coin} coins`}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            currency="USD"
        />
    );
};

export default StripeButton;