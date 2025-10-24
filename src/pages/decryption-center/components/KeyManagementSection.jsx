import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const KeyManagementSection = ({ selectedAlgorithm, onKeyProvided, isProcessing }) => {
  const [keySource, setKeySource] = useState('storage');
  const [manualKey, setManualKey] = useState('');
  const [selectedStoredKey, setSelectedStoredKey] = useState('');
  const [keyFile, setKeyFile] = useState(null);
  const [keyValidation, setKeyValidation] = useState(null);
  const [showKeyPreview, setShowKeyPreview] = useState(false);

  // Mock stored keys
  const storedKeys = [
    { 
      value: 'key-1', 
      label: 'Personal Documents Key', 
      description: 'AES-256 key for personal files',
      algorithm: 'aes-256-gcm',
      created: '2024-10-20'
    },
    { 
      value: 'key-2', 
      label: 'Work Project Alpha', 
      description: 'RSA-2048 key for project files',
      algorithm: 'rsa-2048',
      created: '2024-10-18'
    },
    { 
      value: 'key-3', 
      label: 'Backup Archive Key', 
      description: 'ChaCha20 key for backup encryption',
      algorithm: 'chacha20-poly1305',
      created: '2024-10-15'
    }
  ];

  const keySourceOptions = [
    { value: 'storage', label: 'Secure Storage', description: 'Use previously saved keys' },
    { value: 'manual', label: 'Manual Entry', description: 'Enter key manually' },
    { value: 'file', label: 'Key File', description: 'Upload key from file' },
    { value: 'derive', label: 'Password Derivation', description: 'Derive key from password' }
  ];

  useEffect(() => {
    validateCurrentKey();
  }, [manualKey, selectedStoredKey, keyFile, selectedAlgorithm]);

  const validateCurrentKey = () => {
    let isValid = false;
    let message = '';
    let strength = 0;

    if (keySource === 'storage' && selectedStoredKey) {
      const key = storedKeys?.find(k => k?.value === selectedStoredKey);
      isValid = key && key?.algorithm === selectedAlgorithm;
      message = isValid ? 'Key compatible with selected algorithm' : 'Key algorithm mismatch';
      strength = isValid ? 100 : 0;
    } else if (keySource === 'manual' && manualKey) {
      // Basic key validation
      const keyLength = manualKey?.length;
      if (selectedAlgorithm?.includes('aes-256')) {
        isValid = keyLength === 64; // 32 bytes in hex
        strength = Math.min((keyLength / 64) * 100, 100);
        message = isValid ? 'Valid AES-256 key format' : `Expected 64 characters, got ${keyLength}`;
      } else if (selectedAlgorithm?.includes('rsa')) {
        isValid = manualKey?.includes('-----BEGIN') && manualKey?.includes('-----END');
        strength = isValid ? 100 : 50;
        message = isValid ? 'Valid RSA key format' : 'Invalid RSA key format';
      } else {
        isValid = keyLength > 16;
        strength = Math.min((keyLength / 32) * 100, 100);
        message = isValid ? 'Key format appears valid' : 'Key too short';
      }
    } else if (keySource === 'file' && keyFile) {
      isValid = keyFile?.size > 0 && keyFile?.size < 10000;
      strength = isValid ? 90 : 0;
      message = isValid ? 'Key file loaded successfully' : 'Invalid key file';
    }

    setKeyValidation({ isValid, message, strength });
    
    if (isValid) {
      onKeyProvided({
        source: keySource,
        key: keySource === 'storage' ? selectedStoredKey : 
             keySource === 'manual' ? manualKey :
             keySource === 'file' ? keyFile : null,
        validation: { isValid, message, strength }
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    setKeyFile(file);
  };

  const getStrengthColor = (strength) => {
    if (strength >= 90) return 'text-success';
    if (strength >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStrengthBg = (strength) => {
    if (strength >= 90) return 'bg-success';
    if (strength >= 70) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-warning to-error rounded-lg flex items-center justify-center"
          animate={{ 
            boxShadow: isProcessing 
              ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)']
              : '0 0 0 0 rgba(239, 68, 68, 0)'
          }}
          transition={{ duration: 1.5, repeat: isProcessing ? Infinity : 0 }}
        >
          <Icon name="Key" size={20} className="text-primary-foreground" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Key Management</h3>
          <p className="text-sm text-muted-foreground">Secure key retrieval and validation</p>
        </div>
      </div>
      {/* Key Source Selection */}
      <div className="mb-6">
        <Select
          label="Key Source"
          description="Choose how to provide the decryption key"
          options={keySourceOptions}
          value={keySource}
          onChange={setKeySource}
          className="mb-4"
        />
      </div>
      {/* Storage Key Selection */}
      <AnimatePresence mode="wait">
        {keySource === 'storage' && (
          <motion.div
            key="storage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-6"
          >
            <Select
              label="Stored Keys"
              description="Select from your securely stored keys"
              options={storedKeys}
              value={selectedStoredKey}
              onChange={setSelectedStoredKey}
              searchable
              placeholder="Choose a stored key..."
            />
            
            {selectedStoredKey && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-muted/20 rounded-lg p-4"
              >
                {(() => {
                  const key = storedKeys?.find(k => k?.value === selectedStoredKey);
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <Icon name="Shield" size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{key?.label}</p>
                          <p className="text-xs text-muted-foreground">
                            Created: {key?.created} • Algorithm: {key?.algorithm}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowKeyPreview(!showKeyPreview)}
                        iconName={showKeyPreview ? "EyeOff" : "Eye"}
                      >
                        {showKeyPreview ? 'Hide' : 'Preview'}
                      </Button>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </motion.div>
        )}

        {keySource === 'manual' && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-6"
          >
            <Input
              label="Decryption Key"
              description="Enter your encryption key or passphrase"
              type="password"
              value={manualKey}
              onChange={(e) => setManualKey(e?.target?.value)}
              placeholder="Enter decryption key..."
              className="mb-4"
            />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Key Format:</span>
              <div className="flex items-center space-x-2">
                <span className="text-foreground">
                  {selectedAlgorithm?.includes('aes') ? 'Hexadecimal (64 chars)' :
                   selectedAlgorithm?.includes('rsa') ? 'PEM Format' :
                   'Base64 or Hexadecimal'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKeyPreview(!showKeyPreview)}
                  iconName={showKeyPreview ? "EyeOff" : "Eye"}
                  iconSize={14}
                >
                  {showKeyPreview ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {keySource === 'file' && (
          <motion.div
            key="file"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-foreground mb-3">
              Key File Upload
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors duration-200">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="keyFileInput"
                accept=".key,.pem,.txt"
              />
              <label htmlFor="keyFileInput" className="cursor-pointer">
                <Icon name="FileKey" size={32} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">
                  {keyFile ? keyFile?.name : 'Choose key file'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .key, .pem, .txt files
                </p>
              </label>
            </div>
          </motion.div>
        )}

        {keySource === 'derive' && (
          <motion.div
            key="derive"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-6 space-y-4"
          >
            <Input
              label="Password"
              description="Password to derive encryption key from"
              type="password"
              placeholder="Enter password..."
            />
            <Input
              label="Salt (Optional)"
              description="Salt value for key derivation"
              type="text"
              placeholder="Enter salt value..."
            />
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Key Derivation Settings</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Using PBKDF2 with 100,000 iterations and SHA-256 hash function
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Key Validation Status */}
      <AnimatePresence>
        {keyValidation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              border rounded-lg p-4 mb-4
              ${keyValidation?.isValid 
                ? 'bg-success/10 border-success/20' :'bg-error/10 border-error/20'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={keyValidation?.isValid ? "CheckCircle" : "XCircle"} 
                  size={16} 
                  className={keyValidation?.isValid ? "text-success" : "text-error"} 
                />
                <span className={`text-sm font-medium ${keyValidation?.isValid ? "text-success" : "text-error"}`}>
                  {keyValidation?.message}
                </span>
              </div>
              <span className={`text-xs ${getStrengthColor(keyValidation?.strength)}`}>
                {keyValidation?.strength}%
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${getStrengthBg(keyValidation?.strength)}`}
                initial={{ width: 0 }}
                animate={{ width: `${keyValidation?.strength}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Security Notice */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning mb-1">Security Notice</p>
            <p className="text-xs text-warning/80">
              Keys are processed locally and never transmitted to external servers. 
              Ensure you're using the correct key for your encrypted content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyManagementSection;