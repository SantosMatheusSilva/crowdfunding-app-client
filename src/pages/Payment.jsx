import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
/* import DonationForm from "../components/DonationForm"; */ // <-- import the donation form to the payment page

// Public Key 
const PUBLIC_KEY = "pk_test_51OtXZPFX1zDqFMubqatRbGTVyw8bDN2ygsAAl8JqFhcZE7ZO7VgJzi0XAHzmEND7uGJJfm01iMBKQ2eDAte7li4k00Pr85suiE";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const API_URL = "http://localhost:5005";

function Payment() {
	
	
	const payDonation = () => {        
    axios
     
  };

  useEffect(()=> {             
    getDundie();
  }, [] );
	return (
    // Elements Stripe loaded with Test Mode
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}

export default Payment;