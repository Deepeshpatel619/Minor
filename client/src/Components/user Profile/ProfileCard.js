import React from 'react';
import PropTypes from 'prop-types';
import './ProfileCard.css';

function ProfileCard(props) {
  return (
    <div className='container profileCardContainer'>    
      <div className="profile-card-container">
          <img className="profile-image" src={props.profileImage} alt="Profile" />
          <h2 className="username">{props.username}</h2>
          <p className="bio">{props.bio}</p>
        <div className="profile-card-details">
          <p className="mobile">Mobile: {props.mobile}</p>
          <p className="email">Email: {props.email}</p>
        </div>
       </div>
    </div>

  );
}

ProfileCard.propTypes = {
  profileImage: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileCard;
