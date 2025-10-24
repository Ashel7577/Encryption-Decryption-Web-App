import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import BiometricEnrollment from './components/BiometricEnrollment';
import TwoFactorSetup from './components/TwoFactorSetup';
import SecurityBadges from './components/SecurityBadges';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('registration'); // registration, biometric, twoFactor, complete
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    setUserData(formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('biometric');
    }, 2000);
  };

  const handleBiometricComplete = (enrolled) => {
    if (enrolled) {
      setCurrentStep('twoFactor');
    } else {
      setCurrentStep('twoFactor');
    }
  };

  const handleTwoFactorComplete = (setup) => {
    setCurrentStep('complete');
    setTimeout(() => {
      navigate('/main-dashboard');
    }, 3000);
  };

  const handleSignInRedirect = () => {
    navigate('/user-login');
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'registration': return 25;
      case 'biometric': return 50;
      case 'twoFactor': return 75;
      case 'complete': return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                    Create Your
                    <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                      Secure Account
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                    Join CryptoVault and protect your sensitive data with military-grade encryption and biometric security.
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Setup Progress</span>
                    <span className="text-accent font-medium">{getStepProgress()}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getStepProgress()}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Step Content */}
              <div className="space-y-6">
                {currentStep === 'registration' && (
                  <div className="space-y-6">
                    <RegistrationForm 
                      onSubmit={handleRegistrationSubmit}
                      isLoading={isLoading}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center space-y-4"
                    >
                      <div className="flex items-center justify-center space-x-4">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-sm text-muted-foreground">Already have an account?</span>
                        <div className="h-px bg-border flex-1"></div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        onClick={handleSignInRedirect}
                        iconName="LogIn"
                        iconPosition="left"
                        className="animate-micro"
                      >
                        Sign In Instead
                      </Button>
                    </motion.div>
                  </div>
                )}

                {currentStep === 'biometric' && (
                  <BiometricEnrollment onEnrollmentComplete={handleBiometricComplete} />
                )}

                {currentStep === 'twoFactor' && (
                  <TwoFactorSetup onSetupComplete={handleTwoFactorComplete} />
                )}

                {currentStep === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-6 py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      className="w-24 h-24 bg-gradient-to-br from-success/20 to-success/40 rounded-full flex items-center justify-center mx-auto"
                    >
                      <Icon name="Check" size={48} className="text-success" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">Welcome to CryptoVault!</h2>
                      <p className="text-muted-foreground">
                        Your account has been created successfully. Redirecting to dashboard...
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-biometric-pulse"></div>
                      <span className="text-sm text-muted-foreground">Setting up your workspace</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Security Information */}
            <div className="space-y-6">
              <SecurityBadges />
              
              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-card border border-border rounded-lg p-6 space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">What You Get</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive security features for your peace of mind
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: 'FileText',
                      title: 'Text Encryption',
                      description: 'Secure your sensitive messages and documents'
                    },
                    {
                      icon: 'FolderLock',
                      title: 'File Protection',
                      description: 'Encrypt files of any size with drag-and-drop'
                    },
                    {
                      icon: 'Fingerprint',
                      title: 'Biometric Access',
                      description: 'Login with your fingerprint for ultimate security'
                    },
                    {
                      icon: 'History',
                      title: 'Encryption History',
                      description: 'Track and manage all your encrypted data'
                    }
                  ]?.map((feature, index) => (
                    <motion.div
                      key={feature?.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon name={feature?.icon} size={16} className="text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{feature?.title}</p>
                        <p className="text-xs text-muted-foreground">{feature?.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Trusted by Professionals</h3>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of security-conscious users worldwide
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-primary">10K+</p>
                      <p className="text-xs text-muted-foreground">Active Users</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-accent">99.9%</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-success">256-bit</p>
                      <p className="text-xs text-muted-foreground">Encryption</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
