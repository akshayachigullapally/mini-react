import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaInfoCircle, FaRedo } from 'react-icons/fa';
import { BsHandThumbsUp } from 'react-icons/bs';
import './RemovedUsers.css'; 

function RemovedUsers({ removedUsers, restoreUser }) {
    return (
        <div className='container my-4'>
            <h2 className='text-center mb-4'>
                Removed Users 
                <BsHandThumbsUp className="emoji-icon" />
            </h2>
            <div className='row row-sm-1 row-md-2 row-lg-3'>
                {removedUsers.map(user => (
                    <div className='col col-sm-12 col-md-6 col-lg-4 mb-3' key={user.id}>
                        <div className="card h-100 usercard">
                            <div className="card-body">
                                <h5 className="card-title"><FaUser className="me-2" />{user.username}</h5>
                                <p className="card-text"><FaEnvelope className="me-2" /> <strong>Email:</strong> {user.email}</p>
                                <p className="card-text"><FaPhone className="me-2" /> <strong>Phone:</strong> {user.phoneno}</p>
                                <p className="card-text"><FaHome className="me-2" /> <strong>Address:</strong> {user.address}</p>
                                <p className="card-text"><strong>About:</strong> {user.aboutMe}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-success" onClick={() => restoreUser(user)}>
                                    <FaRedo className="me-1" /> Restore
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RemovedUsers;
