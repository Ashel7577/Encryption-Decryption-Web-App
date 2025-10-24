import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EncryptionInput = ({ 
  inputText, 
  onInputChange, 
  algorithm, 
  onAlgorithmChange, 
  encryptionKey, 
  onKeyChange, 
  onEncrypt,
  isProcessing 
}) => {
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const algorithmOptions = [
    { value: 'aes-256', label: 'AES-256', description: 'Advanced Encryption Standard (256-bit)' },
    { value: 'rsa-2048', label: 'RSA-2048', description: 'Rivest-Shamir-Adleman (2048-bit)' },
    { value: 'chacha20', label: 'ChaCha20', description: 'High-speed stream cipher' },
    { value: 'blowfish', label: 'Blowfish', description: 'Symmetric block cipher' },
    { value: 'twofish', label: 'Twofish', description: 'Advanced symmetric encryption' }
  ];

  useEffect(() => {
    setCharCount(inputText?.length);
  }, [inputText]);

  const generateRandomKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    onKeyChange(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl p-6 shadow-elevation-2"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
        >
          <Icon name="FileText" size={20} className="text-primary-foreground" />
        </motion.div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Text Input</h2>
          <p className="text-sm text-muted-foreground">Enter your sensitive text data</p>
        </div>
      </div>
      {/* Text Input Area */}
      <div className="mb-6">
        <motion.div
          animate={{
            borderColor: isFocused ? 'var(--color-accent)' : 'var(--color-border)',
            boxShadow: isFocused ? '0 0 0 3px rgba(6, 182, 212, 0.1)' : 'none'
          }}
          transition={{ duration: 0.2 }}
          className="relative border rounded-lg overflow-hidden"
        >
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your text to encrypt..."
            className="w-full h-48 p-4 bg-input text-foreground placeholder-muted-foreground resize-none focus:outline-none"
            maxLength={10000}
          />
          
          {/* Character Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused || charCount > 0 ? 1 : 0 }}
            className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground"
          >
            {charCount?.toLocaleString()}/10,000
          </motion.div>

          {/* Animated Focus Border */}
          <motion.div
            className="absolute inset-0 border-2 border-accent rounded-lg pointer-events-none"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 1.02
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>
      {/* Algorithm Selection */}
      <div className="mb-6">
        <Select
          label="Encryption Algorithm"
          description="Choose your preferred encryption standard"
          options={algorithmOptions}
          value={algorithm}
          onChange={onAlgorithmChange}
          searchable
          className="mb-4"
        />
      </div>
      {/* Encryption Key Management */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Encryption Key
        </label>
        <div className="flex space-x-3">
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="flex-1"
          >
            <input
              type="password"
              value={encryptionKey}
              onChange={(e) => onKeyChange(e?.target?.value)}
              placeholder="Enter custom key or generate one"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
            />
          </motion.div>
          <Button
            variant="outline"
            onClick={generateRandomKey}
            iconName="Shuffle"
            iconPosition="left"
            className="px-4"
          >
            Generate
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Key strength: {encryptionKey?.length > 0 ? `${encryptionKey?.length} characters` : 'No key set'}
        </p>
      </div>
      {/* Encrypt Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          disabled={!inputText?.trim() || !encryptionKey?.trim()}
          onClick={onEncrypt}
          iconName="Lock"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          {isProcessing ? 'Encrypting...' : 'Encrypt Text'}
        </Button>
      </motion.div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{charCount?.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Characters</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{inputText?.split(/\s+/)?.filter(word => word?.length > 0)?.length}</div>
          <div className="text-xs text-muted-foreground">Words</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{algorithm ? algorithmOptions?.find(opt => opt?.value === algorithm)?.label : 'None'}</div>
          <div className="text-xs text-muted-foreground">Algorithm</div>
        </div>
      </div>
    </motion.div>
  );
};

export default EncryptionInput;