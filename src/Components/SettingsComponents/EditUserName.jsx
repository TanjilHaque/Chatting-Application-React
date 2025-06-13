//EditUserName.jsx
import React from "react";

const EditUserName = () => {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("A B M Shawon Islam");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    setSavedName(name);
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Hide message after 3s
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Change Profile Name</h2>

      <p className="text-gray-600 mb-2">
        Current Name: <span className="font-semibold">{savedName}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Name
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-600 text-sm">
          Name updated successfully!
        </p>
      )}
    </div>
  );
};

export default EditUserName;
