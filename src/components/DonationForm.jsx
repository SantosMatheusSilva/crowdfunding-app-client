 //Necessary imports:
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

//Import / Declare the local host:
const API_URL = "http://localhost:5005";

function DonationForm () { // props ??
    const [amount, setAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("credit_card, paypal");
    /* const [status, setStatus] = useState([]); */
    const [comments, setComments] = useState("");
    const [errors, setErrors] = useState("");

    const {userId} = useParams(); 
    const {campaignId} = useParams();
    const {user, authenticateUser} = useContext(AuthContext);

    const navigate = useNavigate(); // if the donation form is in another page. redirect to the campaign page.

    const handleAmount = (e) => setAmount(e.target.value);
    const handlePaymentMethod = (e) => setPaymentMethod(e.target.value);
    const handleComment = (e) => setComments(e.target.value);

    const handleDonationSubmit = async (e) => {
        e.preventDefault();

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
            .post(`${API_URL}/api/user/${user._id}/campaign/${campaignId}/donations`, reqBody);
            console.log(response.data);
            navigate(`/campaigns-details-page/${campaignId}`);
        }
        catch(error) {
            console.log(error);
            setErrors("An error occurred while submiting your donation. Please try again.");
        }

    }

    return (
        <div className="border-2border-sky-500">
            <h1>Donation Form</h1>
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

/* 
const DonationSchema = new Schema({
     amount: { type: Number, required: true },
     date: { type: Date, default: Date.now },
     donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     paymentMethod: { type: String, required: true, enum: [ 'credit_card', 'paypal', 'other '] }, 
     status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }, 
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    comments: {type: String, default: '', required: false },
   });

*/