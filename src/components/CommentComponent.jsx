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
    <div className=" border-2 border-sky-200 rounded p-4 h-80 w-96">
    <h1>Leave a Comment</h1>
    <div className="flex flex-col p-3  ">
      <textarea className="border-2 border-gray-200 rounded h-40 w-70"
        name="newComment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="button" onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded ">Add Comment</button>
    </div>
  </div>
  
  );
};

export default CommentComponent;


 /*  <div>
      <h3>Leave a Comment</h3>
      <div>
        <textarea
          name="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="button" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div> */