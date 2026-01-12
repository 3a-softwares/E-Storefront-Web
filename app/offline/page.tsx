'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faRefresh, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@3asoftwares/ui';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 xs:w-40 xs:h-40 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-xl">
            <FontAwesomeIcon 
              icon={faWifi} 
              className="w-16 h-16 xs:w-20 xs:h-20 text-gray-400"
            />
            {/* Crossed out line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-red-500 rotate-45 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          You're Offline
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm xs:text-base sm:text-lg mb-8 max-w-sm mx-auto leading-relaxed">
          It looks like you've lost your internet connection. 
          Please check your network and try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center">
          <Button
            onClick={handleRetry}
            variant="primary"
            size="lg"
            className="w-full xs:w-auto min-h-[48px] px-6"
          >
            <FontAwesomeIcon icon={faRefresh} className="mr-2" />
            Try Again
          </Button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all min-h-[48px] w-full xs:w-auto"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Go Home
          </Link>
        </div>

        {/* Cached Pages Notice */}
        <div className="mt-12 p-4 xs:p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-3 text-sm xs:text-base">
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2 text-gray-600" />
            While you're offline
          </h2>
          <p className="text-xs xs:text-sm text-gray-600 mb-4">
            Some pages you've visited before may still be available:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs xs:text-sm rounded-lg hover:bg-gray-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs xs:text-sm rounded-lg hover:bg-gray-200 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs xs:text-sm rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cart
            </Link>
            <Link
              href="/wishlist"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs xs:text-sm rounded-lg hover:bg-gray-200 transition-colors"
            >
              Wishlist
            </Link>
          </div>
        </div>

        {/* Connection Tips */}
        <div className="mt-8 text-left bg-blue-50 rounded-xl p-4 xs:p-5 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm xs:text-base">
            Troubleshooting Tips
          </h3>
          <ul className="text-xs xs:text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Check if your Wi-Fi or mobile data is turned on
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Try moving closer to your router
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Restart your device or network connection
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Disable airplane mode if enabled
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
