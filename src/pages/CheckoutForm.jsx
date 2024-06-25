import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import {
    PaymentElement,
    Elements,
    CardElement,
    ElementsConsumer,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const API_URL = process.env.VITE_SERVER_URL;


function CheckoutForm() {
    const {user} = useContext(AuthContext);
    const { campaignId, institutionId } = useParams();
    const [donationInfo, setDonationInfo] = useState(null);
    const [campaignData, setCampaignData] = useState(null);
    const [institutionData, setInstitutionData] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();

    const stripePromise = loadStripe('pk_test_51OtXZPFX1zDqFMubqatRbGTVyw8bDN2ygsAAl8JqFhcZE7ZO7VgJzi0XAHzmEND7uGJJfm01iMBKQ2eDAte7li4k00Pr85suiE');

    const donationData = location.state?.donationData;
    console.log("donationData",donationData);
    console.log(location.state);

    useEffect(() => {
        // Set donationInfo from donationData prop
        setDonationInfo(donationData);
        // Set clientSecret from donationData prop
        setClientSecret(donationData.clientSecret);
    }, [donationData]);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/campaigns/${donationData.campaign}`) || await axios.get(`${API_URL}/api/institutions/${donationData.campaign}`);
                setCampaignData(response.data);
                console.log("response --->", response.data);
            } catch (error) {
                console.error('Error fetching data:', error);

            }
    }
    fetchData();
    }, [donationData]);
    

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            console.log("Client secret not found");
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clientSecret]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not yet loaded.');
            return;
        }

        setIsLoading(true);

        const cardElement = elements.getElement(CardElement);
        
        try {
            const { error } = await stripe.confirmPayment({
                payment_method: {
                    card: elements.getElement(CardElement),
                    clientSecret: clientSecret,
                    billing_details: {
                        // Inclua os detalhes de cobrança, se necessário
                    },
                },
                confirmParams: {
                    return_url: `${window.location.origin}/campaign || ${window.location.origin}/institutions/${donationInfo.campaignId}`,
                }, 
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            } else {
                // Payment succeeded
                const response = await axios.post(`${API_URL}/api/user/${user._id}/${campaignId ? "campaign" : "institutions"}/${campaignId || institutionId}/donations`, reqBody);
                console.log("Donation created:", response.data);
                // Redirect to a thank you page or handle success as needed
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
            setMessage("An error occurred during payment confirmation.");
        }

        setIsLoading(false);
    };


    const paymentElementOptions = {
        layout: "tabs"
      }
      const appearance = {
        theme: 'flat',
        labels: 'floating',
        variables: { colorPrimaryText: '#262626'} 
      };
      const options = {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: true
        },
        clientSecret,
        appearance,
        paymentElementOptions,
       
      };
      
      console.log("campaignData --->",campaignData)
      //console.log("donationInfo --->",donationInfo)
      
    return (
        <>
        <div className='flex flex-col m-20 bg-gray-50 '>
            <div className='p-10'>
            <h1 className="text-2xl font-bold text-gray-800">Donation Checkout</h1>
            </div>
        <div className='flex flex-row items-center justify-center gap-20'>
        {donationInfo && (
            <div className='flex flex-row border-2 border-gray-300 rounded-xl gap-5'>
                
                {campaignData && (
                    <div>
                    <img src={campaignData.campaign.campaignImage} alt="" className='w-64 h-80'/>
                    </div>
                )}
                <div className='mr-5'>
               {campaignData && (
                <div className='flex flex-col mt-2 mb-5'>
                   <h1>{campaignData.campaign.title}</h1>
                   <h3>{campaignData.campaign.description}</h3>
                </div>
               )}
               <div className='flex flex-col mt-2 gap-2'>
                <p><strong>Amount</strong>: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(donationInfo.amount)}</p>
                <p><strong>Comment:</strong> {donationInfo.comments}</p>
                <p><strong>Donor:</strong> {donationInfo.donor.name}</p>
                <p><strong>Email:</strong> {donationInfo.donor.email}</p>
                </div>
                </div>
            </div>
        )}
        <hr className='h-96 border-2 border-gray-300'/>
        <div className=''>
        {clientSecret && (
            <form onSubmit={handleSubmit}>
                 <Elements stripe={stripePromise} options={options}>
                    <PaymentElement id="payment-element" options={options}  className='mt-20 w-96'/>
                </Elements>
                <button type="submit" disabled={isLoading || !stripe || !elements}  className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-96 mt-1'>
                    {isLoading ? <div className="spinner" id="spinner"></div> : `Pay €${donationInfo.amount}`}
                </button>
        </form>
        )}
    </div>
    </div>
    </div>
    </>
    );
}

export default CheckoutForm;