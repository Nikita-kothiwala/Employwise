import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();
  const { setUpdateUserData } = useUserContext();

  const handleEdit = () => {
    setUpdateUserData(user);
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200">
      <div className="flex justify-center">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 transition duration-300"
        />
      </div>

      <h3 className="text-xl font-bold text-gray-700 text-center mb-1">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-center text-gray-500 mb-4">{user.email}</p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleEdit}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
        >
        Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
