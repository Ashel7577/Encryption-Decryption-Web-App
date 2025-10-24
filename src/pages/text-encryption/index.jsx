import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EncryptionInput from './components/EncryptionInput';
import EncryptionOutput from './components/EncryptionOutput';
import AdvancedOptions from './components/AdvancedOptions';
import EncryptionHistory from './components/EncryptionHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TextEncryption = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [algorithm, setAlgorithm] = useState('aes-256');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState({
    strength: 'standard',
    format: 'base64',
    includeMetadata: false,
    compress: false,
    autoSalt: true,
    batchMode: false
  });

  // Mock user data
  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@cryptovault.com"
  };

  useEffect(() => {
    // Auto-generate key if not set
    if (!encryptionKey && advancedOptions?.autoSalt) {
      generateRandomKey();
    }
  }, [advancedOptions?.autoSalt]);

  const generateRandomKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    const keyLength = advancedOptions?.strength === 'maximum' ? 64 : 
                     advancedOptions?.strength === 'high' ? 48 : 32;
    
    for (let i = 0; i < keyLength; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    setEncryptionKey(result);
  };

  const simulateEncryption = (text, algo, key) => {
    // Mock encryption simulation
    const baseEncrypted = btoa(text + key + algo);
    let result = '';
    
    switch (advancedOptions?.format) {
      case 'hex':
        result = Array.from(baseEncrypted)?.map(char => char?.charCodeAt(0)?.toString(16)?.padStart(2, '0'))?.join('');
        break;
      case 'binary':
        result = Array.from(baseEncrypted)?.map(char => char?.charCodeAt(0)?.toString(2)?.padStart(8, '0'))?.join(' ');
        break;
      default: // base64
        result = baseEncrypted + '==';
    }

    if (advancedOptions?.includeMetadata) {
      const metadata = {
        algorithm: algo,
        timestamp: new Date()?.toISOString(),
        strength: advancedOptions?.strength,
        format: advancedOptions?.format
      };
      result = `${JSON.stringify(metadata)}\n---\n${result}`;
    }

    return result;
  };

  const handleEncrypt = async () => {
    if (!inputText?.trim() || !encryptionKey?.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing time based on strength
    const processingTime = advancedOptions?.strength === 'maximum' ? 3000 :
                          advancedOptions?.strength === 'high' ? 2000 : 1000;

    setTimeout(() => {
      const encrypted = simulateEncryption(inputText, algorithm, encryptionKey);
      setEncryptedText(encrypted);
      setIsProcessing(false);
    }, processingTime);
  };

  const handleClearOutput = () => {
    setEncryptedText('');
  };

  const handleExport = () => {
    console.log('Exporting encrypted data...');
  };

  const handleBatchProcess = () => {
    console.log('Opening batch processing...');
  };

  const handleHistoryRestore = (item) => {
    console.log('Restoring from history:', item);
  };

  const handleHistoryClear = () => {
    console.log('Clearing encryption history...');
  };

  const handleLogout = () => {
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onLogout={handleLogout} />
      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-background via-surface to-background border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 shadow-elevation-2"
              >
                <Icon name="FileText" size={32} className="text-primary-foreground" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
              >
                Text Encryption
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Secure your sensitive text data with military-grade encryption algorithms and advanced security features.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">256-bit</div>
                  <div className="text-sm text-muted-foreground">Encryption Strength</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">Algorithms</div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                variant="outline"
                onClick={() => navigate('/file-encryption')}
                iconName="FolderLock"
                iconPosition="left"
              >
                File Encryption
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/decryption-center')}
                iconName="Unlock"
                iconPosition="left"
              >
                Decryption Center
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/main-dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
              >
                Dashboard
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Input Section */}
            <EncryptionInput
              inputText={inputText}
              onInputChange={setInputText}
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              encryptionKey={encryptionKey}
              onKeyChange={setEncryptionKey}
              onEncrypt={handleEncrypt}
              isProcessing={isProcessing}
            />

            {/* Output Section */}
            <EncryptionOutput
              encryptedText={encryptedText}
              isProcessing={isProcessing}
              algorithm={algorithm}
              onClear={handleClearOutput}
              onExport={handleExport}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Advanced Options */}
            <AdvancedOptions
              options={advancedOptions}
              onOptionsChange={setAdvancedOptions}
              onBatchProcess={handleBatchProcess}
            />

            {/* Encryption History */}
            <EncryptionHistory
              history={[]} // Add this prop
              onRestore={handleHistoryRestore}
              onClear={handleHistoryClear}
            />
          </div>
        </section>

        {/* Security Notice */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-surface border-t border-border"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center space-x-4 text-center">
              <Icon name="Shield" size={20} className="text-success" />
              <p className="text-sm text-muted-foreground">
                All encryption is performed locally in your browser. Your data never leaves your device.
              </p>
              <Icon name="Lock" size={20} className="text-success" />
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default TextEncryption;
