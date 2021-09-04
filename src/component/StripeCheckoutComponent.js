import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({ price }) => {
    const publishableKey = "pk_test_51JVsvsAHgKq91qjD8jjOEACp2ULGKdRkVzZdPqaOZn0wctTbKmYDxbw8yKcQlY5xL919YPLA1fwpzTnuOmCS09Cs007phLrRAC";
    const stripePrice = price ;

    const onToken = (token) => {
        console.log(token);
        axios
            .post("http://localhost:8080/payment", {
                amount: stripePrice,
                description: "100xu",
                token,
            })
            .then((response) => {
                console.log(response);
                alert("payment success");
            })
            .catch((error) => {
                console.log(error);
                alert("Payment failed");
            });
    };

    return (
        <StripeCheckout
            amount={stripePrice}
            label="Pay Now"
            name="Wolf Elite"
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is ${price}`}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            currency="USD"
        />
    );
};

export default StripeButton;