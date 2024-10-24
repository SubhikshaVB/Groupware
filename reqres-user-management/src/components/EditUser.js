// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';

// const EditUser = () => {
//   const { id } = useParams();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const refetchUsers = location.state?.refetchUsers; // Refetch users

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`https://reqres.in/api/users/${id}`);
//         const userData = response.data.data;
//         setFirstName(userData.first_name);
//         setLastName(userData.last_name);
//         setEmail(userData.email);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.put(`https://reqres.in/api/users/${id}`, {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//       });
//       if (refetchUsers) {
//         refetchUsers(); // Refresh the users list after updating
//       }
//       navigate('/users');
//     } catch (error) {
//       console.error('Error updating user:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="edit-user-container">
//       <h2>Edit User</h2>
//       <form onSubmit={handleUpdate}>
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser  = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser  = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        const userData = response.data.data;
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser ();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: firstName,
 last_name: lastName,
        email,
      });
      localStorage.setItem('refetchUsers', 'true'); // Trigger refetch
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser  ;