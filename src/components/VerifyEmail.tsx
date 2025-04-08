import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resendVerificationEmail } from '../services/firebase';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('pendingUser');
    if (storedUser) {
      setPendingUser(JSON.parse(storedUser));
    } else {
      navigate('/register');
    }
  }, [navigate]);

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await resendVerificationEmail();
      setSuccess('Verification email has been resent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = () => {
    // Reload the page to check if the user has verified their email
    window.location.reload();
  };

  if (!pendingUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification email to{' '}
            <span className="font-medium text-gray-900">{pendingUser.email}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={loading}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {loading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-5 w-5 mr-2" />
                Resend Verification Email
              </>
            )}
          </button>

          <button
            onClick={handleCheckVerification}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            I've Verified My Email
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Didn't receive the email? Check your spam folder or try resending.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 