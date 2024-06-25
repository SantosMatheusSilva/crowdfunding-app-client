// Necessary imports:
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

// Import / Declare the local host:
const API_URL = "http://localhost:5005";

const CommentComponent = (props) => {
  const {campaignId, institutionId} = props;
  const { user, isLoggedIn } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  

  useEffect(() => {
    const fetchComments = async () => {
    
      try {
        const response = await axios
        .get(`${API_URL}/api/${"campaigns" || "institutions"}/${campaignId || institutionId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [props]);

  const handleAddComment = async () => {
    
    const reqBody = { comment: newComment };

    if (!newComment.trim()) {
      console.log("Please enter a comment.");
      return;
    }
      try {
        //console.log(user._id)
        const response = await axios
        .post(`${API_URL}/api/user/${user._id}/${"campaigns" || "institutions"}/${campaignId || institutionId}/comments`, reqBody);
        setComments([...comments, response.data]);
        setNewComment('');
        window.location.reload();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    //add handleAddComent in the dependencies
  };


  return (
    <>
    {!isLoggedIn ? (
      <>
      <div className="flex flex-col mb-10">
        <h1 className="text-2xl font-bold text-gray-800 m-10">Login to join the discussion</h1>
        <button>
          <a href="/login" className="w-full text-white bg-sky-500 font-medium rounded-lg text-lg px-5 py-2.5 text-center mb-10 hover:scale-105">
            Login
          </a>
        </button>
      </div>
      </>
    ) :
    <div /* className=" border-2 border-gray-500 rounded-lg w-full" */>
      <div className='p-5 w-full'>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Comments ({comments.length})</h1>
      <div className="flex flex-row gap-2">
        <img src={user.profilePic} alt="" className='rounded-full w-12 h-12 border-2 border-gray-200'/>
        <div className="flex flex-col">
        <textarea className="border-2 border-gray-200 rounded h-40 w-96 p-2"
          name="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder= "add a comment..." 
        />
         <button type="button" onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded w-fit justify-end">Add Comment</button>
        </div>
      </div>
     
      </div>
    </div>
}
{comments && comments.length === 0 && <p className="text-2xl font-bold text-gray-500 m-20 text-center">No comments yet.</p>}
  </>
  );
};

export default CommentComponent;
