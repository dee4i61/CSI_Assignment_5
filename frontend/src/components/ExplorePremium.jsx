import React from "react";
import { Check, Clock } from "lucide-react";

const SpotifyPremiumInterface = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg p-8 text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Try 3 months of Premium for ₹59.00
            </h2>
            <p className="text-xl mb-6">
              Only ₹119/month after. Cancel anytime.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Clock className="w-5 h-5" />
              <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                Offer ends in 8 days
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Try 3 months for ₹59
              </button>
              <button className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
                View all plans
              </button>
            </div>

            <p className="text-sm mt-6 opacity-80">
              Premium Individual only. ₹59 for 3 months, then ₹119 per month
              after. Offer only available if you haven't tried Premium before.
              Terms apply.
              <br />
              Offer ends July 2, 2025.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Affordable plans for any situation
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Choose a Premium plan and listen to ad-free music without limits
              on your phone,
              <br />
              speaker, and other devices. Pay in various ways. Cancel anytime.
            </p>

            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xs">PhonePe UPI</span>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Y!</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xl">G</span>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PayTM</span>
              </div>
            </div>

            <button className="text-gray-400 underline">+ 6 more</button>
          </div>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            All Premium plans include
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Download to listen offline</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Play songs in any order</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>High audio quality</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Listen with friends in real time</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Organize listening queue</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Listening insights (not in Mini)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Individual Plan */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="bg-pink-200 text-black px-4 py-1 rounded-full text-sm inline-block mb-4">
                ₹59 for 3 months
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-sm">Premium</span>
              </div>

              <h3 className="text-3xl font-bold text-pink-400 mb-2">
                Individual
              </h3>
              <div className="mb-6">
                <div className="text-xl font-semibold">₹59 for 3 months</div>
                <div className="text-gray-400">₹119 / month after</div>
              </div>

              <ul className="space-y-2 mb-8">
                <li>• 1 Premium account</li>
                <li>• Cancel anytime</li>
                <li>• Subscribe or one-time payment</li>
              </ul>
            </div>

            {/* Family Plan */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="bg-blue-300 text-black px-4 py-1 rounded-full text-sm inline-block mb-4">
                ₹179 for 2 months
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-sm">Premium</span>
              </div>

              <h3 className="text-3xl font-bold text-blue-400 mb-2">Family</h3>
              <div className="mb-6">
                <div className="text-xl font-semibold">₹179 for 2 months</div>
                <div className="text-gray-400">₹179 / month after</div>
              </div>

              <ul className="space-y-2 mb-8">
                <li>• Up to 6 Premium accounts</li>
                <li>• Control content marked as explicit</li>
                <li>• Cancel anytime</li>
                <li>• Subscribe or one-time payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Duo Plan */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-sm">Premium</span>
            </div>

            <h3 className="text-3xl font-bold text-yellow-400 mb-2">Duo</h3>
            <div className="mb-6">
              <div className="text-xl font-semibold">₹149 for 2 months</div>
              <div className="text-gray-400">₹149 / month after</div>
            </div>

            <ul className="space-y-2 mb-8">
              <li>• 2 Premium accounts</li>
              <li>• Cancel anytime</li>
              <li>• Subscribe or one-time payment</li>
            </ul>

            <button className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              Try 2 months for ₹149
            </button>

            <p className="text-xs text-gray-400 mt-4">
              ₹149 for 2 months, then ₹149 per month after. Offer only available
              if you haven't tried Premium before. For couples who reside at the
              same address. Terms apply.
            </p>
          </div>

          {/* Student Plan */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-sm">Premium</span>
            </div>

            <h3 className="text-3xl font-bold text-purple-400 mb-2">Student</h3>
            <div className="mb-6">
              <div className="text-xl font-semibold">₹59 for 2 months</div>
              <div className="text-gray-400">₹59 / month after</div>
            </div>

            <ul className="space-y-2 mb-8">
              <li>• 1 verified Premium account</li>
              <li>• Discount for eligible students</li>
              <li>• Cancel anytime</li>
              <li>• Subscribe or one-time payment</li>
            </ul>

            <button className="w-full bg-purple-400 text-white py-3 rounded-full font-semibold hover:bg-purple-300 transition-colors">
              Try 2 months for ₹59
            </button>

            <p className="text-xs text-gray-400 mt-4">
              ₹59 for 2 months, then ₹59 per month after. Offer available only
              to students at an accredited higher education institution and if
              you haven't tried Premium before. Terms apply.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Experience the difference</h1>
        <p className="text-gray-300 text-lg mb-12">
          Go Premium and enjoy full control of your listening. Cancel anytime.
        </p>

        <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8">
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-800 rounded-full p-1">
              <div className="px-6 py-2 text-gray-400">
                <div className="text-sm">Spotify's</div>
                <div className="font-semibold">Free plan</div>
              </div>
              <div className="px-6 py-2 bg-white text-black rounded-full flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Premium
              </div>
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-xl font-semibold mb-6">What you'll get</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span className="underline">Ad-free music listening</span>
                <div className="flex gap-8">
                  <span className="text-gray-500 text-2xl">—</span>
                  <Check className="w-6 h-6 text-white bg-gray-600 rounded-full p-1" />
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span className="underline">Download songs</span>
                <div className="flex gap-8">
                  <span className="text-gray-500 text-2xl">—</span>
                  <Check className="w-6 h-6 text-white bg-gray-600 rounded-full p-1" />
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="underline">Play songs in any order</span>
                <div className="flex gap-8">
                  <span className="text-gray-500 text-2xl">—</span>
                  <Check className="w-6 h-6 text-white bg-gray-600 rounded-full p-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPremiumInterface;
