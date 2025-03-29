import { useState } from 'react';

const EditUserModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleSubmit = () => {
    onUpdate(user.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Edit User</h2>

        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg mt-2 hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
