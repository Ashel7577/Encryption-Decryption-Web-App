import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TwoFactorBackup = ({ isVisible, onClose, onVerify, onResendCode }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = (index, value) => {
    if (value?.length <= 1 && /^\d*$/?.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !verificationCode?.[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode?.join('');
    if (code?.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock verification - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (code === '123456') {
        onVerify(true);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      onResendCode();
      setError('');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-card border border-border rounded-xl shadow-modal p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon name="Smartphone" size={20} className="text-warning" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Biometric authentication failed</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Instructions */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a 6-digit verification code to your registered mobile device. 
                Please enter the code below to complete authentication.
              </p>
              
              <div className="flex items-center space-x-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm text-accent">Code: 123456 (Demo)</span>
              </div>
            </motion.div>

            {/* Verification Code Input */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-foreground mb-3">
                Verification Code
              </label>
              <div className="flex space-x-3 justify-center">
                {verificationCode?.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e?.target?.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold bg-input border border-border rounded-lg focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                    whileFocus={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                onClick={handleVerify}
                iconName="Shield"
                iconPosition="left"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Use Password Instead
                </Button>
              </div>
            </motion.div>

            {/* Alternative Methods */}
            <motion.div
              className="mt-6 pt-4 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-muted-foreground text-center mb-3">
                Alternative authentication methods
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Mail"
                  iconPosition="left"
                  className="text-xs"
                >
                  Email Code
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  className="text-xs"
                >
                  Voice Call
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TwoFactorBackup;