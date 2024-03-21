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
         })  */
       
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

   
// ================================ here we link the donation button to the payment stripe system ================================


// ================================ here we end the block of code for linking the donation button to the stripe payment system  ================================
    
    return (
        <div className=" border-2 border-sky-200 rounded p-4 h-80 w-96">
            <h1>Make a Donation </h1>
            <div className="border-2border-sky-500 p-4">
                <form onSubmit={handleDonationSubmit}>
                    <div className="p-2">
                        <label className="p-2">Amount:</label>
                        <input type="text" value={amount} onChange={handleAmount} className="border-2 border-gray-300 rounded"/>
                    </div>
                    <div>
                        <label className="p-2">Payment Method:</label>
                        <select value={paymentMethod} onChange={handlePaymentMethod} className="border-2 border-gray-300 rounded">
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="p-2">Leave a message:</label>
                        <textarea type="text" value={comments} onChange={handleComment} cols="20" rows="2" className="border-2 border-gray-300 rounded w-80" placeholder='Enter your message'>
                       
                        </textarea>
                    </div>
                    <div className="flex flex-col p-3  ">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">Donate</button>
                        <p>{errors}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default DonationForm;
