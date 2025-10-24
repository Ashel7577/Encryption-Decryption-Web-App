import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const InputDetectionPanel = ({ onContentDetected, detectedType, isScanning }) => {
  const [textInput, setTextInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanningProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setScanningProgress(0);
    }
  }, [isScanning]);

  const handleTextChange = (e) => {
    const value = e?.target?.value;
    setTextInput(value);
    
    if (value?.trim()) {
      onContentDetected({
        type: 'text',
        content: value,
        format: detectTextFormat(value)
      });
    }
  };

  const detectTextFormat = (text) => {
    if (text?.includes('-----BEGIN') && text?.includes('-----END')) return 'PEM';
    if (text?.match(/^[A-Za-z0-9+/]+=*$/)) return 'Base64';
    if (text?.match(/^[0-9a-fA-F]+$/)) return 'Hexadecimal';
    return 'Unknown';
  };

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = [...e?.dataTransfer?.files];
    if (files?.length > 0) {
      const file = files?.[0];
      onContentDetected({
        type: 'file',
        content: file,
        format: file?.name?.split('.')?.pop()?.toUpperCase()
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onContentDetected({
        type: 'file',
        content: file,
        format: file?.name?.split('.')?.pop()?.toUpperCase()
      });
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center"
          animate={{ rotate: isScanning ? 360 : 0 }}
          transition={{ duration: 2, repeat: isScanning ? Infinity : 0, ease: "linear" }}
        >
          <Icon name="Search" size={20} className="text-primary-foreground" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Content Detection</h3>
          <p className="text-sm text-muted-foreground">Automatically identifies encrypted content type</p>
        </div>
      </div>
      {/* Scanning Progress */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Zap" size={16} className="text-accent animate-biometric-pulse" />
              <span className="text-sm font-medium text-foreground">Scanning Content...</span>
              <span className="text-sm text-muted-foreground">{scanningProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scanningProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Text Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Encrypted Text Input
        </label>
        <div className="relative">
          <textarea
            value={textInput}
            onChange={handleTextChange}
            placeholder="Paste your encrypted text here..."
            className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          />
          <motion.div
            className="absolute top-2 right-2"
            animate={{ scale: textInput ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} className="text-success-foreground" />
            </div>
          </motion.div>
        </div>
      </div>
      {/* File Drop Zone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Encrypted File Upload
        </label>
        <motion.div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
            ${dragActive 
              ? 'border-accent bg-accent/10 scale-105' :'border-border hover:border-muted-foreground hover:bg-muted/20'
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".enc,.aes,.rsa,.txt,.bin"
          />
          
          <motion.div
            animate={{ y: dragActive ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon 
              name="Upload" 
              size={32} 
              className={`mx-auto mb-3 ${dragActive ? 'text-accent' : 'text-muted-foreground'}`} 
            />
            <p className={`text-sm font-medium mb-1 ${dragActive ? 'text-accent' : 'text-foreground'}`}>
              {dragActive ? 'Drop file here' : 'Drag & drop encrypted file'}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .enc, .aes, .rsa, .txt, .bin files
            </p>
          </motion.div>

          {dragActive && (
            <motion.div
              className="absolute inset-0 bg-accent/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>
      </div>
      {/* Detection Status */}
      <AnimatePresence>
        {detectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-success/10 border border-success/20 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-success">Content Detected</p>
                <p className="text-xs text-success/80">
                  Type: {detectedType?.type} • Format: {detectedType?.format}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputDetectionPanel;