import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlgorithmDetectionPanel = ({ detectedContent, onAlgorithmSelected, isAnalyzing }) => {
  const [detectedAlgorithms, setDetectedAlgorithms] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [manualOverride, setManualOverride] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const algorithmOptions = [
    { value: 'aes-256-gcm', label: 'AES-256-GCM', description: 'Advanced Encryption Standard with Galois/Counter Mode' },
    { value: 'aes-256-cbc', label: 'AES-256-CBC', description: 'Advanced Encryption Standard with Cipher Block Chaining' },
    { value: 'rsa-2048', label: 'RSA-2048', description: 'Rivest-Shamir-Adleman 2048-bit key' },
    { value: 'rsa-4096', label: 'RSA-4096', description: 'Rivest-Shamir-Adleman 4096-bit key' },
    { value: 'chacha20-poly1305', label: 'ChaCha20-Poly1305', description: 'Stream cipher with Poly1305 authenticator' },
    { value: 'blowfish', label: 'Blowfish', description: 'Symmetric-key block cipher' },
    { value: 'twofish', label: 'Twofish', description: 'Symmetric key block cipher' },
    { value: 'des-3', label: '3DES', description: 'Triple Data Encryption Standard' }
  ];

  useEffect(() => {
    if (isAnalyzing && detectedContent) {
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate algorithm detection
            const mockDetected = [
              {
                algorithm: 'aes-256-gcm',
                confidence: 95,
                indicators: ['GCM authentication tag', 'AES block size', 'Key derivation pattern']
              },
              {
                algorithm: 'rsa-2048',
                confidence: 78,
                indicators: ['RSA signature format', 'Public key structure']
              }
            ];
            setDetectedAlgorithms(mockDetected);
            setSelectedAlgorithm(mockDetected?.[0]?.algorithm);
            onAlgorithmSelected(mockDetected?.[0]);
            return 100;
          }
          return prev + 3;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, detectedContent, onAlgorithmSelected]);

  const handleAlgorithmSelect = (algorithmValue) => {
    setSelectedAlgorithm(algorithmValue);
    const selected = detectedAlgorithms?.find(alg => alg?.algorithm === algorithmValue) || {
      algorithm: algorithmValue,
      confidence: manualOverride ? 100 : 0,
      indicators: manualOverride ? ['Manual selection'] : []
    };
    onAlgorithmSelected(selected);
  };

  const handleManualOverride = () => {
    setManualOverride(true);
    setDetectedAlgorithms([]);
    setSelectedAlgorithm('');
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 90) return 'bg-success/10 border-success/20';
    if (confidence >= 70) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
            animate={{ 
              scale: isAnalyzing ? [1, 1.1, 1] : 1,
              rotate: isAnalyzing ? [0, 180, 360] : 0
            }}
            transition={{ 
              duration: 2, 
              repeat: isAnalyzing ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <Icon name="Cpu" size={20} className="text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Algorithm Detection</h3>
            <p className="text-sm text-muted-foreground">Identifying encryption methods</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualOverride}
          iconName="Settings"
          iconPosition="left"
          disabled={isAnalyzing}
        >
          Manual Override
        </Button>
      </div>
      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Brain" size={16} className="text-accent animate-biometric-pulse" />
              <span className="text-sm font-medium text-foreground">Analyzing Encryption Patterns...</span>
              <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <motion.div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {['Signature Analysis', 'Pattern Recognition', 'Key Structure']?.map((step, index) => (
                <motion.div
                  key={step}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-xs
                    ${analysisProgress > (index + 1) * 33 
                      ? 'bg-success/10 text-success' :'bg-muted/50 text-muted-foreground'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Icon 
                    name={analysisProgress > (index + 1) * 33 ? "CheckCircle" : "Clock"} 
                    size={12} 
                  />
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Detected Algorithms */}
      <AnimatePresence>
        {detectedAlgorithms?.length > 0 && !manualOverride && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <h4 className="text-sm font-medium text-foreground mb-3">Detected Algorithms</h4>
            <div className="space-y-3">
              {detectedAlgorithms?.map((algorithm, index) => (
                <motion.div
                  key={algorithm?.algorithm}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-all duration-200
                    ${selectedAlgorithm === algorithm?.algorithm
                      ? 'border-primary bg-primary/5 shadow-elevation-1'
                      : 'border-border hover:border-muted-foreground hover:bg-muted/20'
                    }
                  `}
                  onClick={() => handleAlgorithmSelect(algorithm?.algorithm)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${selectedAlgorithm === algorithm?.algorithm
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        <Icon name="Shield" size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {algorithmOptions?.find(opt => opt?.value === algorithm?.algorithm)?.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {algorithmOptions?.find(opt => opt?.value === algorithm?.algorithm)?.description}
                        </p>
                      </div>
                    </div>
                    <div className={`
                      px-3 py-1 rounded-full text-xs font-medium border
                      ${getConfidenceBg(algorithm?.confidence)} ${getConfidenceColor(algorithm?.confidence)}
                    `}>
                      {algorithm?.confidence}% confidence
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {algorithm?.indicators?.map((indicator, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Manual Algorithm Selection */}
      {(manualOverride || detectedAlgorithms?.length === 0) && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Select
            label="Select Encryption Algorithm"
            description="Choose the algorithm used for encryption"
            options={algorithmOptions}
            value={selectedAlgorithm}
            onChange={handleAlgorithmSelect}
            searchable
            placeholder="Choose algorithm..."
            className="mb-4"
          />
          
          {manualOverride && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <p className="text-sm text-warning">
                  Manual override active. Automatic detection bypassed.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {/* Algorithm Info */}
      {selectedAlgorithm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/20 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <Icon name="Info" size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Selected Algorithm</p>
              <p className="text-xs text-muted-foreground">
                {algorithmOptions?.find(opt => opt?.value === selectedAlgorithm)?.label} - Ready for decryption
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AlgorithmDetectionPanel;
