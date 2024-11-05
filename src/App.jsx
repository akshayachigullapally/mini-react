import React, { useState } from 'react';
import RootLayOut from './Project/RootLayOut';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewUser from './Project/NewUser';
import Users from './Project/Users';
import RemovedUsers from './Project/RemovedUsers';

function App() {
    const [removedUsers, setRemovedUsers] = useState([]);

    const restoreUser = (user) => {
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(() => {
            setRemovedUsers(prevRemovedUsers => prevRemovedUsers.filter(u => u.id !== user.id));
        })
        .catch(err => console.log("Error in restoring user:", err));
    };

    const addToRemovedUsers = (user) => {
        setRemovedUsers(prevRemovedUsers => [...prevRemovedUsers, user]);
    };

    const browserRouterObject = createBrowserRouter([
        {
            path: "",
            element: <RootLayOut />,
            children: [
                {
                    path: "users",
                    element: <Users addToRemovedUsers={addToRemovedUsers} />
                },
                {
                    path: "newuser",
                    element: <NewUser />
                },
                {
                    path: "removedusers",
                    element: <RemovedUsers removedUsers={removedUsers} restoreUser={restoreUser} />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={browserRouterObject} />
    );
}

export default App;
