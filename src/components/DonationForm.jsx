 //Necessary imports:
import { useParams} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
//Necessary imports for stripe:
//Import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function DonationForm (props) { // props ??
    const {campaignId, institutionId} = props;
    const [amount, setAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("credit_card", "paypal", "other");
    const [status, setStatus] = useState("pending", "completed", "canceled"); 
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState("");
    const [donation, setDonation] = useState([]);
    const {userId} = useParams(); 
    const {user, authenticateUser} = useContext(AuthContext);
    //Stripe
    //const [success, setSuccess] = useState(false);

    // Initialize Stripe
    //const stripe = useStripe()
    //Initialize Stripe Elements
    //const elements = useElements()

    const handleAmount = (e) => setAmount(e.target.value);
    const handlePaymentMethod = (e) => setPaymentMethod(e.target.value);
    const handleComment = (e) => setComments(e.target.value);

    const handleDonationSubmit = async (e) => {
        e.preventDefault();

      /*   const {error, paymentMethod }= await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        }) */
       
        if(!amount || amount <= 0){ 
            setErrors("Please enter an amount.");
            return;
        }
        
         if(!paymentMethod){ 
            setErrors("Please select a payment method.");
            return;
        }
       
        const reqBody = {amount, paymentMethod, comments};
        console.log(reqBody);

        try {
            const response = await axios
            .post(`${API_URL}/api/user/${user._id}/${campaignId ? "campaign" : "institutions"}/${campaignId || institutionId}/donations`, reqBody); // TEST
            console.log(response.data);

            setAmount("");
            setPaymentMethod("");
            setComments("");

            alert("Thank you for your donation!");
            setStatus("completed");
            /* navigate(`/campaigns-details-page/${campaignId}`); */
            window.location.reload();

        }
        catch(error) {
            console.log(error);
            setErrors("An error occurred while submiting your donation. Please try again.");
        }

       

    }

    return (
        <div className="border-2border-sky-500">
            <h1>Make a Donation </h1>
            <div className="border-2border-sky-500">
                <form onSubmit={handleDonationSubmit}>
                    <div>
                        <label>Amount:</label>
                        <input type="text" value={amount} onChange={handleAmount}/>
                    </div>
                    <div>
                        <label>Payment Method:</label>
                        <select value={paymentMethod} onChange={handlePaymentMethod}>
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Leave a message:</label>
                        <textarea type="text" value={comments} onChange={handleComment} cols="20" rows="2"></textarea>
                    </div>
                    <div>
                        <button type="submit">Donate</button>
                        <p>{errors}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default DonationForm;
