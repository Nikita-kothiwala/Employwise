import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchUserById } from '../API/api';
import { useUserContext } from '../context/UserContext';
import EditUserModal from '../components/EditUserModal';

const EditUser = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUserData, setUpdateUserData } = useUserContext();

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (state && state.user) {
      setUpdateUserData(state.user);
    } else {
      fetchUserById(id).then((res) => {
        setUpdateUserData(res.data);
      });
    }
  }, [id, state, setUpdateUserData]);

  const handleUpdateUser = (updatedUser) => {
    setUpdateUserData(updatedUser);
    setShowModal(false);
    navigate('/users'); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
   
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Edit User"
            className="w-20 h-20"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">Edit User</h2>
        <p className="text-center text-gray-500 mb-6">
          Update user information and click "Update" to save changes.
        </p>

        {showModal && updateUserData && (
          <EditUserModal
            user={updateUserData}
            onUpdate={handleUpdateUser}
            onClose={() => {
              setShowModal(false);
              navigate('/users'); 
            }}
          />
        )}

        <button
          onClick={() => navigate('/users')}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg mt-4 hover:bg-gray-400 transition duration-300"
        >
         Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUser;
