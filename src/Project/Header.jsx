import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa6";
import './Header.css'

function Header() {
    return (
        <div className="bg-dark text-white py-2 d-flex justify-content-between mb-5">
            {/* Left Aligned Nav */}
            <ul className="nav justify-content-start fs-2 ">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="users">
                        <FaUsers className="me-1" /> Users
                    </Link>
                </li>
            </ul>

            {/* Right Aligned Nav */}
            <ul className="nav justify-content-end mt-2">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="users">
                        <FaUser  className="me-1 fs-5" /> Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="newuser">
                        <FaUserPlus className="me-1 fs-5" /> New User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="removedusers">
                        <FaUserMinus className="me-1 fs-5" /> Removed Users
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
