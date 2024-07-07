import { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      if (
        !formData.referrerName ||
        !formData.referrerEmail ||
        !formData.refereeName ||
        !formData.refereeEmail
      ) {
        setErrorMessage("Please fill in all fields.");
        setLoader(false);
        return;
      }
      // Email validation using a simple regex pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !emailRegex.test(formData.referrerEmail) ||
        !emailRegex.test(formData.refereeEmail)
      ) {
        setErrorMessage("Please enter valid email addresses.");
        setLoader(false);
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:4000/api/referrals",
        formData
      );

      if (
        response &&
        response.data.message === "Referral submitted successfully"
      ) {
        setLoader(false);
        setErrorMessage("");
        setFormData({
          referrerName: "",
          referrerEmail: "",
          refereeName: "",
          refereeEmail: "",
        });

        setShowModal(false);
      } else {
        setErrorMessage(response.data.error || "An error occurred.");
        setLoader(false);
      }
    } catch (error) {
      console.error("Error submitting referral:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-20 md:py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="md:flex md:items-center md:gap-16">
            {/* Text Content */}
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Refer Your Friends, Earn Rewards
              </h1>
              <p className="text-lg md:text-xl">
                Invite your friends and family to join our platform. For every
                successful referral, you'll both receive exclusive rewards.
              </p>

              {showModal && (
                <div className=" h-screen">
                  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md md:max-w-lg lg:max-w-xl">
                      <h2 className="text-2xl font-semibold mb-4">
                        Referral Form
                      </h2>
                      <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="referrerName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Your Name:
                          </label>
                          <input
                            type="text"
                            id="referrerName"
                            placeholder="Enter your name"
                            name="referrerName"
                            value={formData.referrerName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                          />
                        </div>
                        {/* Referrer Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="referrerEmail"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Your Email:
                          </label>
                          <input
                            type="email"
                            id="referrerEmail"
                            name="referrerEmail"
                            value={formData.referrerEmail}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                          />
                        </div>

                        {/* Referee Name */}
                        <div className="mb-4">
                          <label
                            htmlFor="refereeName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Friend's Name:
                          </label>
                          <input
                            type="text"
                            id="refereeName"
                            name="refereeName"
                            value={formData.refereeName}
                            onChange={handleInputChange}
                            placeholder="Enter your friend's name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                          />
                        </div>

                        {/* Referee Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="refereeEmail"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Friend's Email:
                          </label>
                          <input
                            type="email"
                            id="refereeEmail"
                            name="refereeEmail"
                            value={formData.refereeEmail}
                            onChange={handleInputChange}
                            placeholder="Enter your friend's email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                          />
                        </div>

                        {errorMessage && (
                          <p className="text-red-500 text-sm">{errorMessage}</p>
                        )}
                        <div className="flex justify-end mt-6 gap-3">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="mr-2 text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            {loader ? (
                              <Bars
                                height="30"
                                width="30"
                                color="white"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                              />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="bg-white text-indigo-500 hover:bg-gray-100 transition-colors py-2 px-6 rounded-md shadow-md"
                onClick={() => setShowModal(true)}
              >
                Refer Now
              </button>
            </div>

            {/* Illustration */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="/referal.jpg"
                alt="Referral Illustration"
                className="w-full max-w-md mx-auto rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="md:flex md:items-center md:gap-16">
            {/* Illustration */}
            <div className="md:w-1/2">
              <img
                src="/benifts.jpg"
                alt="Referral Benefits"
                className="w-full max-w-md mx-auto"
              />
            </div>

            {/* Benefits Content */}
            <div className="md:w-1/2 mt-8 md:mt-0 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Unlock Exclusive Rewards
              </h2>
              <p className="text-gray-600">
                When you refer your friends, you'll both receive special
                discounts, early access to new features, and other exclusive
                rewards. It's our way of saying thank you for being a part of
                our community.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 text-indigo-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Discounts on future purchases
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 text-indigo-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Early access to new features
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 text-indigo-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Exclusive community events
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
