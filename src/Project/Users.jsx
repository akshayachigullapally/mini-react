import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrashAlt, FaEnvelope, FaPhone, FaHome, FaUser, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import './Users.css';
import { CiSaveDown2 } from "react-icons/ci";
import { BsEmojiLaughingFill } from 'react-icons/bs';

function Users({addToRemovedUsers}) {
    const [users, setUsers] = useState([]);
    const [userEditStatus, setUserEditStatus] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [currentUser, setCurrentUser] = useState(null);
    const [removedUsers, setRemovedUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log("Error in fetching users:", err));
    }, []);

    function onUserProfileEdit(user) {
        setCurrentUser(user);
        setUserEditStatus(true);
        
        // Set form values
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("dob", user.dob);
        setValue("phoneno", user.phoneno);
        setValue("address", user.address);
        setValue("aboutMe", user.aboutMe);
    }

    function onModifiedUserSave(modifiedUser) {
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify(modifiedUser)
        })
        .then(res => res.json())
        .then(updatedUser => {
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            setUserEditStatus(false);
            setCurrentUser(null);
        })
        .catch(err => console.log("Error in saving modified user:", err));
    }

    function onUserDelete(user) {
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "DELETE",
        })
        .then(() => {
            addToRemovedUsers(user);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        })
        .catch(err => console.log("Error in deleting user:", err));
    }

    return (
        <div className='container my-4'>
            <h2 className='text-center mb-4 mt-4'>Welcome to Users Dashboard...
            <BsEmojiLaughingFill className="emoji-icon"/>
            </h2>
            <div className='row row-sm-1 row-md-2 row-lg-3'>
                {users.map(user => (
                    <div className='col col-sm-12 col-md-6 col-lg-4 mb-3' key={user.id}>
                        {userEditStatus && currentUser?.id === user.id ? (
                            <form onSubmit={handleSubmit(onModifiedUserSave)} className="w-100 editform p-4">
                                {/* Username Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaUser /></span>
                                    <input 
                                        type="text" 
                                        {...register('username', { required: 'Username is required' })} 
                                        className="form-control" 
                                        placeholder="Username"
                                    />
                                </div>
                                {errors.username && <p className="text-danger">{errors.username.message}</p>}

                                {/* Email Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaEnvelope /></span>
                                    <input 
                                        type="email" 
                                        {...register('email', { required: 'Email is required' })} 
                                        className="form-control" 
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                                {/* Date of Birth Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaCalendarAlt /></span>
                                    <input 
                                        type="date" 
                                        {...register('dob', { required: 'Date of birth is required' })} 
                                        className="form-control"
                                    />
                                </div>
                                {errors.dob && <p className="text-danger">{errors.dob.message}</p>}

                                {/* Phone Number Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaPhone /></span>
                                    <input 
                                        type="tel" 
                                        {...register('phoneno', { 
                                            required: 'Phone number is required', 
                                            minLength: { value: 10, message: 'Phone number must be 10 digits' }, 
                                            maxLength: { value: 10, message: 'Phone number must be 10 digits' } 
                                        })} 
                                        className="form-control" 
                                        placeholder="Phone Number"
                                    />
                                </div>
                                {errors.phoneno && <p className="text-danger">{errors.phoneno.message}</p>}

                                {/* Address Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaHome /></span>
                                    <input 
                                        type="text" 
                                        {...register('address', { required: 'Address is required' })} 
                                        className="form-control" 
                                        placeholder="Address"
                                    />
                                </div>
                                {errors.address && <p className="text-danger">{errors.address.message}</p>}

                                {/* About Me Field */}
                                <div className="mb-3 input-group">
                                    <span className="input-group-text"><FaInfoCircle /></span>
                                    <textarea 
                                        {...register('aboutMe', { required: 'About Me section is required' })} 
                                        className="form-control" 
                                        placeholder="About Me"
                                        rows="3"
                                    ></textarea>
                                </div>
                                {errors.aboutMe && <p className="text-danger">{errors.aboutMe.message}</p>}

                                <button type="submit" className="btn btn-primary mb-3 mt-3">
                                    <CiSaveDown2 className='fs-4 me-2' /> Save
                                </button>
                            </form>
                        ) : (
                            <div className="card h-100 usercard">
                                <div className="card-body">
                                    <h5 className="card-title"><FaUser className="me-2" />{user.username}</h5>
                                    <p className="card-text"><FaEnvelope className="me-2" /> <strong>Email:</strong> {user.email}</p>
                                    <p className="card-text"><FaPhone className="me-2" /> <strong>Phone:</strong> {user.phoneno}</p>
                                    <p className="card-text"><FaHome className="me-2" /> <strong>Address:</strong> {user.address}</p>
                                    <p className="card-text"><strong>About Me:</strong> {user.aboutMe}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => onUserProfileEdit(user)}>
                                        <FaEdit className="me-1" /> Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => onUserDelete(user)}>
                                        <FaTrashAlt className="me-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;
