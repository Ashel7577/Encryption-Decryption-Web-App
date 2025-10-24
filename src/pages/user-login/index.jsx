import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import BiometricScanner from './components/BiometricScanner';
import SecurityTrustBadges from './components/SecurityTrustBadges';
import TwoFactorBackup from './components/TwoFactorBackup';

const UserLogin = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState('password'); // password, biometric
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop",
    "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?w=1920&h=1080&fit=crop",
    "https://images.pixabay.com/photo/2018/09/27/09/22/artificial-intelligence-3706562_1280.jpg"
  ];

  // Mock credentials for demo
  const mockCredentials = {
    email: "admin@cryptovault.com",
    password: "SecurePass123!"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages?.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [backgroundImages?.length]);

  const handlePasswordLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store user session
        localStorage.setItem('cryptovault_user', JSON.stringify({
          id: 1,
          name: 'John Doe',
          email: formData?.email,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));

        // Navigate to dashboard with success animation
        setTimeout(() => {
          navigate('/main-dashboard');
        }, 800);
      } else {
        setError(`Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async (success) => {
    if (success) {
      // Store user session
      localStorage.setItem('cryptovault_user', JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: 'admin@cryptovault.com',
        loginTime: new Date()?.toISOString(),
        authMethod: 'biometric'
      }));

      setTimeout(() => {
        navigate('/main-dashboard');
      }, 1000);
    } else {
      setShowTwoFactor(true);
      setIsScanning(false);
    }
  };

  const handleScanStart = () => {
    setIsScanning(true);
    setError('');
  };

  const handleTwoFactorVerify = (success) => {
    if (success) {
      setShowTwoFactor(false);
      localStorage.setItem('cryptovault_user', JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: 'admin@cryptovault.com',
        loginTime: new Date()?.toISOString(),
        authMethod: '2fa'
      }));
      navigate('/main-dashboard');
    }
  };

  const handleResendCode = () => {
    // Mock resend functionality
    console.log('Resending verification code...');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {backgroundImages?.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === backgroundIndex ? 0.1 : 0,
              scale: index === backgroundIndex ? 1.1 : 1
            }}
            transition={{ duration: 2 }}
          >
            <Image
              src={image}
              alt={`Futuristic cybersecurity background showing digital encryption patterns and security elements ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
          </motion.div>
        ))}
      </div>
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding & Security Info */}
        <motion.div
          className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-elevation-2">
                  <Icon name="Shield" size={32} className="text-primary-foreground" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">CryptoVault</h1>
                <p className="text-lg text-muted-foreground">Advanced Encryption Platform</p>
              </div>
            </div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-foreground">
                Secure Your Digital World
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Experience next-generation encryption with biometric authentication. 
                Protect your sensitive data with military-grade security and cutting-edge technology.
              </p>
            </motion.div>
          </motion.div>

          {/* Security Trust Badges */}
          <SecurityTrustBadges />
        </motion.div>

        {/* Right Panel - Authentication */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Authentication Card */}
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-modal p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h3>
                <p className="text-muted-foreground">
                  Sign in to access your secure vault
                </p>
              </motion.div>

              {/* Authentication Method Toggle */}
              <motion.div
                className="flex bg-surface rounded-lg p-1 mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setAuthMethod('password')}
                  className={`
                    flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200
                    ${authMethod === 'password' ?'bg-primary text-primary-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name="Key" size={16} />
                  <span className="text-sm font-medium">Password</span>
                </button>
                <button
                  onClick={() => setAuthMethod('biometric')}
                  className={`
                    flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200
                    ${authMethod === 'biometric' ?'bg-primary text-primary-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name="Fingerprint" size={16} />
                  <span className="text-sm font-medium">Biometric</span>
                </button>
              </motion.div>

              {/* Authentication Forms */}
              <motion.div
                key={authMethod}
                initial={{ opacity: 0, x: authMethod === 'password' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {authMethod === 'password' ? (
                  <LoginForm
                    onSubmit={handlePasswordLogin}
                    isLoading={isLoading}
                    error={error}
                  />
                ) : (
                  <BiometricScanner
                    onBiometricAuth={handleBiometricAuth}
                    isScanning={isScanning}
                    onScanStart={handleScanStart}
                  />
                )}
              </motion.div>
            </div>

            {/* Mobile Security Info */}
            <motion.div
              className="lg:hidden mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <SecurityTrustBadges />
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Two-Factor Authentication Modal */}
      <TwoFactorBackup
        isVisible={showTwoFactor}
        onClose={() => setShowTwoFactor(false)}
        onVerify={handleTwoFactorVerify}
        onResendCode={handleResendCode}
      />
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-card border border-border rounded-xl p-8 flex flex-col items-center space-y-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Loader" size={32} className="text-accent" />
            </motion.div>
            <p className="text-foreground font-medium">Authenticating...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UserLogin;
