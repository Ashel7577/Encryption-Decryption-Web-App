import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingWorkspace = ({ 
  isProcessing, 
  processingStage, 
  progress, 
  onStartDecryption, 
  onPauseDecryption, 
  onCancelDecryption,
  selectedAlgorithm,
  keyInfo,
  contentInfo 
}) => {
  const [processingSteps, setProcessingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [securityChecks, setSecurityChecks] = useState([]);

  const decryptionSteps = [
    { 
      id: 'validation', 
      label: 'Input Validation', 
      description: 'Verifying content integrity and format',
      icon: 'CheckCircle2'
    },
    { 
      id: 'keyVerification', 
      label: 'Key Verification', 
      description: 'Validating decryption key compatibility',
      icon: 'Key'
    },
    { 
      id: 'algorithmSetup', 
      label: 'Algorithm Setup', 
      description: 'Initializing decryption algorithm',
      icon: 'Cpu'
    },
    { 
      id: 'securityScan', 
      label: 'Security Scan', 
      description: 'Performing security integrity checks',
      icon: 'Shield'
    },
    { 
      id: 'decryption', 
      label: 'Decryption Process', 
      description: 'Executing decryption algorithm',
      icon: 'Unlock'
    },
    { 
      id: 'verification', 
      label: 'Output Verification', 
      description: 'Verifying decrypted content integrity',
      icon: 'CheckCircle'
    }
  ];

  const mockSecurityChecks = [
    { id: 'integrity', label: 'Content Integrity', status: 'passed', time: '0.12s' },
    { id: 'signature', label: 'Digital Signature', status: 'passed', time: '0.08s' },
    { id: 'malware', label: 'Malware Scan', status: 'passed', time: '0.34s' },
    { id: 'authenticity', label: 'Authenticity Check', status: 'passed', time: '0.05s' }
  ];

  useEffect(() => {
    if (isProcessing) {
      setProcessingSteps(decryptionSteps);
      simulateProcessing();
    }
  }, [isProcessing]);

  const simulateProcessing = () => {
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < decryptionSteps?.length) {
        setCurrentStep(stepIndex);
        
        // Simulate security checks during security scan step
        if (decryptionSteps?.[stepIndex]?.id === 'securityScan') {
          simulateSecurityChecks();
        }
        
        stepIndex++;
      } else {
        clearInterval(stepInterval);
      }
    }, 2000);

    return () => clearInterval(stepInterval);
  };

  const simulateSecurityChecks = () => {
    let checkIndex = 0;
    const checkInterval = setInterval(() => {
      if (checkIndex < mockSecurityChecks?.length) {
        setSecurityChecks(prev => [...prev, mockSecurityChecks?.[checkIndex]]);
        checkIndex++;
      } else {
        clearInterval(checkInterval);
      }
    }, 500);
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep && isProcessing) return 'active';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-accent';
      case 'passed': return 'text-success';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'active': return 'bg-accent';
      case 'passed': return 'bg-success/20';
      case 'failed': return 'bg-error/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center"
            animate={{ 
              rotate: isProcessing ? 360 : 0,
              scale: isProcessing ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 2, repeat: isProcessing ? Infinity : 0, ease: "linear" },
              scale: { duration: 1, repeat: isProcessing ? Infinity : 0, ease: "easeInOut" }
            }}
          >
            <Icon name="Zap" size={20} className="text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Processing Workspace</h3>
            <p className="text-sm text-muted-foreground">
              {isProcessing ? 'Decryption in progress...' : 'Ready to decrypt content'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isProcessing ? (
            <Button
              variant="default"
              onClick={onStartDecryption}
              iconName="Play"
              iconPosition="left"
              disabled={!selectedAlgorithm || !keyInfo?.validation?.isValid}
            >
              Start Decryption
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onPauseDecryption}
                iconName="Pause"
              >
                Pause
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onCancelDecryption}
                iconName="X"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Processing Configuration */}
      {!isProcessing && (selectedAlgorithm || keyInfo || contentInfo) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-muted/20 rounded-lg p-4"
        >
          <h4 className="text-sm font-medium text-foreground mb-3">Decryption Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedAlgorithm && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Cpu" size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Algorithm</p>
                  <p className="text-sm font-medium text-foreground">{selectedAlgorithm?.algorithm}</p>
                </div>
              </div>
            )}
            
            {keyInfo?.validation?.isValid && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Key" size={14} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Key Status</p>
                  <p className="text-sm font-medium text-success">Validated</p>
                </div>
              </div>
            )}
            
            {contentInfo && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={14} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Content Type</p>
                  <p className="text-sm font-medium text-foreground">{contentInfo?.type}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      {/* Processing Steps */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <h4 className="text-sm font-medium text-foreground mb-4">Decryption Progress</h4>
            <div className="space-y-3">
              {processingSteps?.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <motion.div
                    key={step?.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center space-x-4 p-3 rounded-lg border transition-all duration-300
                      ${status === 'active' ?'border-accent bg-accent/5 shadow-elevation-1' 
                        : status === 'completed' ?'border-success/20 bg-success/5' :'border-border bg-muted/20'
                      }
                    `}
                  >
                    <motion.div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${getStatusBg(status)}
                      `}
                      animate={{ 
                        scale: status === 'active' ? [1, 1.2, 1] : 1,
                        rotate: status === 'active' ? [0, 180, 360] : 0
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: status === 'active' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon 
                        name={status === 'completed' ? 'Check' : step?.icon} 
                        size={16} 
                        className={getStatusColor(status)}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{step?.label}</p>
                      <p className="text-xs text-muted-foreground">{step?.description}</p>
                    </div>
                    {status === 'active' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full animate-biometric-pulse"></div>
                        <span className="text-xs text-accent">Processing...</span>
                      </motion.div>
                    )}
                    {status === 'completed' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs text-success font-medium"
                      >
                        Complete
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Security Checks */}
      <AnimatePresence>
        {securityChecks?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <h4 className="text-sm font-medium text-foreground mb-3">Security Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {securityChecks?.map((check, index) => (
                <motion.div
                  key={check?.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border
                    ${getStatusBg(check?.status)} border-success/20
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={14} className={getStatusColor(check?.status)} />
                    <span className="text-sm text-foreground">{check?.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{check?.time}</span>
                    <Icon name="Check" size={12} className="text-success" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Progress Bar */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / processingSteps?.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-accent to-success h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / processingSteps?.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
      {/* Status Message */}
      {!isProcessing && (!selectedAlgorithm || !keyInfo?.validation?.isValid) && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <div>
              <p className="text-sm font-medium text-warning">Configuration Required</p>
              <p className="text-xs text-warning/80">
                Please select an algorithm and provide a valid key to begin decryption.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingWorkspace;