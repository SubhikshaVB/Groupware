// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/');
//     }
//     fetchUsers();
//   }, [page, token, navigate]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
//     setUsers(response.data.data);
//     setLoading(false);
//   };

//   const handleEdit = (userId) => {
//     // Navigate to edit page without passing non-serializable data like functions
//     navigate(`/edit/${userId}`);
//   };

//   const handleDelete = async (userId) => {
//     await axios.delete(`https://reqres.in/api/users/${userId}`);
//     setUsers(users.filter((user) => user.id !== userId));
//   };

//   return (
//     <div className="users-list-container">
//       <h2>Users List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {users.map((user) => (
//             <div key={user.id} className="user-card">
//               <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
//               <p>{user.first_name} {user.last_name}</p>
//               <button onClick={() => handleEdit(user.id)}>Edit</button>
//               <button onClick={() => handleDelete(user.id)}>Delete</button>
//             </div>
//           ))}
//           <div className="pagination">
//             <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//               Previous
//             </button>
//             <button onClick={() => setPage(page + 1)}>Next</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    setUsers(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    fetchUsers(); // Call fetchUsers to load users
  }, [page, token, navigate, refetch,fetchUsers]); // Ensure fetchUsers is called

  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
    setRefetch(true); // Set refetch to true when navigating to edit
  };

  const handleDelete = async (userId) => {
    await axios.delete(`https://reqres.in/api/users/${userId}`);
    setUsers(users.filter((user) => user.id !== userId));
    setRefetch(true); // Set refetch to true after deleting a user
  };

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <p>{user.first_name} {user.last_name}</p>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;