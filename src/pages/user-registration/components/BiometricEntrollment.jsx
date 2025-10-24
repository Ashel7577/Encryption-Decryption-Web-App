import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricEnrollment = ({ onEnrollmentComplete }) => {
  const [enrollmentStep, setEnrollmentStep] = useState('idle'); // idle, scanning, success, error
  const [scanProgress, setScanProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  const startEnrollment = async () => {
    // Check WebAuthn support
    if (!window.PublicKeyCredential) {
      setIsSupported(false);
      return;
    }

    setEnrollmentStep('scanning');
    setScanProgress(0);

    // Simulate fingerprint scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setEnrollmentStep('success');
          setTimeout(() => {
            onEnrollmentComplete(true);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Mock WebAuthn credential creation
      const credential = await navigator.credentials?.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "CryptoVault" },
          user: {
            id: new Uint8Array(16),
            name: "user@example.com",
            displayName: "User"
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "direct"
        }
      });

      if (credential) {
        // Success handled by progress simulation
      }
    } catch (error) {
      clearInterval(progressInterval);
      setEnrollmentStep('error');
      console.error('Biometric enrollment failed:', error);
    }
  };

  const resetEnrollment = () => {
    setEnrollmentStep('idle');
    setScanProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-lg p-6 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Fingerprint" size={24} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Biometric Security</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Enhance your account security with fingerprint authentication
        </p>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <AnimatePresence mode="wait">
          {enrollmentStep === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Fingerprint" size={48} className="text-accent" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Ready to Enroll</p>
                <p className="text-xs text-muted-foreground">
                  Click below to start fingerprint enrollment
                </p>
              </div>
            </motion.div>
          )}

          {enrollmentStep === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Fingerprint" size={48} className="text-accent animate-biometric-pulse" />
                </div>
                <motion.div
                  className="absolute inset-0 border-4 border-accent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: `conic-gradient(from 0deg, transparent ${360 - (scanProgress * 3.6)}deg, var(--color-accent) ${360 - (scanProgress * 3.6)}deg)`
                  }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Scanning Fingerprint</p>
                <p className="text-xs text-muted-foreground">
                  Please place your finger on the sensor
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    className="h-2 bg-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-accent font-medium">{scanProgress}% Complete</p>
              </div>
            </motion.div>
          )}

          {enrollmentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-gradient-to-br from-success/20 to-success/40 rounded-full flex items-center justify-center"
              >
                <Icon name="Check" size={48} className="text-success" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-success">Enrollment Complete!</p>
                <p className="text-xs text-muted-foreground">
                  Your fingerprint has been successfully registered
                </p>
              </div>
            </motion.div>
          )}

          {enrollmentStep === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-destructive/20 to-destructive/40 rounded-full flex items-center justify-center">
                <Icon name="X" size={48} className="text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">Enrollment Failed</p>
                <p className="text-xs text-muted-foreground">
                  Please try again or use alternative authentication
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isSupported && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-2 p-4 bg-warning/10 border border-warning/20 rounded-lg"
          >
            <Icon name="AlertTriangle" size={24} className="text-warning mx-auto" />
            <p className="text-sm font-medium text-warning">Biometric Not Supported</p>
            <p className="text-xs text-muted-foreground">
              Your device doesn't support biometric authentication
            </p>
          </motion.div>
        )}

        <div className="flex space-x-3">
          {enrollmentStep === 'idle' && isSupported && (
            <Button
              variant="default"
              onClick={startEnrollment}
              iconName="Fingerprint"
              iconPosition="left"
              className="animate-micro"
            >
              Start Enrollment
            </Button>
          )}

          {enrollmentStep === 'error' && (
            <Button
              variant="outline"
              onClick={resetEnrollment}
              iconName="RotateCcw"
              iconPosition="left"
              className="animate-micro"
            >
              Try Again
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => onEnrollmentComplete(false)}
            className="animate-micro"
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BiometricEnrollment;
