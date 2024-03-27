import { useState } from 'react';
import PropTypes from "prop-types";

const PostForm = ({ idToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {   
    console.log(idToken);
    fetch('https://c16-backend.onrender.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Post successfully sent:', data);
      })
      .catch(error => {
        console.error('There was a problem sending the post:', error);
      });
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title..."
      />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description..."
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

PostForm.propTypes = {
    idToken: PropTypes.string, // Define prop types for idToken
  };

export default PostForm;

