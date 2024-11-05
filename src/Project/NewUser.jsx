import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaPen, FaInfoCircle, FaHome, FaCalendarAlt } from 'react-icons/fa';
import './NewUser.css'
import { useNavigate } from 'react-router-dom';

function NewUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate();

    function handleFormSubmit(newuser) {
        console.log(newuser);
        //make hhtp post req to save newuser in api
        fetch("http://localhost:3000/users",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newuser),
        })
        .then((res)=>{
            if(res.status===201){
                navigate("/users");
            }
        })
        .catch(err=>console.log("err is"))
    }

    return (
        <div className='main w-50 container'>
            <h1 className="text-center mb-3">New User</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-50 mx-auto">

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

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mb-3 mt-3">Submit</button>
            </form>
        </div>
    );
}

export default NewUser;
