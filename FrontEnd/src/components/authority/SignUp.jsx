import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      subscribe,
    };

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white mt-10 p-6">
      <form className="bg-white w-full max-w-md" onSubmit={handleSubmit}>
        <img src="//www.stevemadden.com/cdn/shop/files/SM_PASS_Horizontal_Black.png?v=4558769538502108335" alt="Sm pass"/>
        <p className="text-left text-gray-500 mb-6 mt-6">Join SM PASS for exclusive offers, rewards, and even early access to new products.</p>

        <label className="block mb-4">
          <span className="block text-gray-700 font-bold mb-4">Email Address*</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <div className="flex justify-between space-x-4 mb-4">
        <label className="block w-1/2 mb-4">
          <span className="block text-gray-700 font-bold mb-4">First Name*</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block w-1/2 mb-4">
          <span className="block text-gray-700 font-bold mb-4">Last Name*</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>
        </div>

        <label className="block mb-4">
          <span className="block text-gray-700 font-bold mb-4">Enter a Password*</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Yes, sign me up to receive emails on new arrivals, special offers and promotions.</span>
        </label>

        <p className="text-sm text-gray-600 mb-6">
          By clicking “Continue”, you agree to our <a href="https://www.stevemadden.com/pages/terms-of-use" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="https://www.stevemadden.com/pages/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already registered? <a href="#login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
