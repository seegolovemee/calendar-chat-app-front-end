import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-50">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to the App
      </h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
        >
          Go to Login
        </button>

        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
        >
          Go to Register
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
