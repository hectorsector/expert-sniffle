import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to a backend
    console.log('Saving user:', editedUser);
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div data-testid="no-user">
        No user data available
      </div>
    );
  }

  return (
    <div className="user-profile" data-testid="user-profile">
      <h2>User Profile</h2>
      
      {!isEditing ? (
        <div className="profile-view" data-testid="profile-view">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
          <button 
            onClick={() => setIsEditing(true)}
            data-testid="edit-button"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-edit" data-testid="profile-edit">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editedUser.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              data-testid="name-input"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editedUser.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              data-testid="email-input"
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              value={editedUser.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              data-testid="age-input"
            />
          </div>
          <div>
            <label>Bio:</label>
            <textarea
              value={editedUser.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              data-testid="bio-input"
            />
          </div>
          <div className="edit-actions">
            <button 
              onClick={handleSave}
              data-testid="save-button"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              data-testid="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;