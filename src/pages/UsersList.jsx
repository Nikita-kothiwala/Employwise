import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../API/api';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const getUsers = async (page) => {
    const res = await fetchUsers(page);
    setUsers(res.data.data.slice(0, 8));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

//   const handleUpdateUser = (updatedUser) => {
//     const updatedUsers = users.map((user) =>
//       user.id === updatedUser.id ? updatedUser : user
//     );
//     setUsers(updatedUsers);
//   };

const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };
  
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 p-6">
   
      <div className="bg-white shadow-lg px-8 py-4 flex justify-between items-center rounded-lg">
        <h2 className="text-4xl font-extrabold text-gray-700">EmployWise</h2>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 pl-10 w-80 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

   
      <div className="container mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
           Users List
        </h2>

        {filteredUsers.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No users found. Try adjusting your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDelete}
                onUpdate={handleUpdateUser}
              />
            ))}
          </div>
        )}

     
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-6 py-2 text-white rounded-lg ${
              page === 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition'
            }`}
          >
           Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Next 
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
