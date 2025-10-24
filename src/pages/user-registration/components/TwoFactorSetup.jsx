import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TwoFactorSetup = ({ onSetupComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('sms');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('setup'); // setup, verify, complete
  const [isLoading, setIsLoading] = useState(false);

  const methods = [
    {
      id: 'sms',
      name: 'SMS Authentication',
      description: 'Receive codes via text message',
      icon: 'MessageSquare',
      recommended: true
    },
    {
      id: 'authenticator',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar app',
      icon: 'Smartphone',
      recommended: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleSetupSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStep('verify');
      setIsLoading(false);
    }, 1500);
  };

  const handleVerificationSubmit = async () => {
    setIsLoading(true);
    
    // Mock verification - accept "123456" as valid code
    setTimeout(() => {
      if (verificationCode === '123456') {
        setStep('complete');
        setTimeout(() => {
          onSetupComplete(true);
        }, 2000);
      } else {
        alert('Invalid code. Please use: 123456');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-lg p-6 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Shield" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>
      {step === 'setup' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Choose Authentication Method:</p>
            {methods?.map((method) => (
              <motion.div
                key={method?.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMethodSelect(method?.id)}
                className={`
                  relative p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${selectedMethod === method?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${selectedMethod === method?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <Icon name={method?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground">{method?.name}</p>
                      {method?.recommended && (
                        <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${selectedMethod === method?.id
                      ? 'border-primary bg-primary' :'border-muted-foreground'
                    }
                  `}>
                    {selectedMethod === method?.id && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedMethod === 'sms' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e?.target?.value)}
                description="We'll send verification codes to this number"
                className="animate-micro"
              />
            </motion.div>
          )}

          {selectedMethod === 'authenticator' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-4"
            >
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-xs text-slate-800 font-mono">QR CODE</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={handleSetupSubmit}
              loading={isLoading}
              disabled={selectedMethod === 'sms' && !phoneNumber?.trim()}
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1 animate-micro"
            >
              Continue Setup
            </Button>
            <Button
              variant="ghost"
              onClick={() => onSetupComplete(false)}
              className="animate-micro"
            >
              Skip
            </Button>
          </div>
        </motion.div>
      )}
      {step === 'verify' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="MessageSquare" size={32} className="text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Verification Code Sent</p>
            <p className="text-xs text-muted-foreground">
              {selectedMethod === 'sms' 
                ? `Enter the 6-digit code sent to ${phoneNumber}`
                : 'Enter the code from your authenticator app'
              }
            </p>
          </div>

          <Input
            label="Verification Code"
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e?.target?.value)}
            description="Use code: 123456 for demo"
            maxLength={6}
            className="text-center text-lg tracking-widest animate-micro"
          />

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={handleVerificationSubmit}
              loading={isLoading}
              disabled={verificationCode?.length !== 6}
              iconName="Check"
              iconPosition="left"
              className="flex-1 animate-micro"
            >
              Verify Code
            </Button>
            <Button
              variant="outline"
              onClick={() => setStep('setup')}
              iconName="ArrowLeft"
              iconPosition="left"
              className="animate-micro"
            >
              Back
            </Button>
          </div>
        </motion.div>
      )}
      {step === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto"
          >
            <Icon name="Check" size={32} className="text-success" />
          </motion.div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-success">2FA Setup Complete!</p>
            <p className="text-xs text-muted-foreground">
              Your account is now protected with two-factor authentication
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TwoFactorSetup;