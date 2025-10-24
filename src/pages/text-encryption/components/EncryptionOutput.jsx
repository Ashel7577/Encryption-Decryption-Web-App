import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EncryptionOutput = ({ 
  encryptedText, 
  isProcessing, 
  algorithm, 
  onClear, 
  onExport 
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(encryptedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadAsFile = () => {
    const blob = new Blob([encryptedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encrypted-text-${Date.now()}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
    onExport?.();
  };

  const truncatedText = encryptedText?.length > 200 ? 
    encryptedText?.substring(0, 200) + '...' : encryptedText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="bg-card border border-border rounded-xl p-6 shadow-elevation-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center"
          >
            <Icon name="Shield" size={20} className="text-success-foreground" />
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Encrypted Output</h2>
            <p className="text-sm text-muted-foreground">Your secure encrypted data</p>
          </div>
        </div>

        {encryptedText && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>
      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mb-4"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-center"
            >
              <p className="text-lg font-medium text-foreground mb-2">Encrypting Data</p>
              <p className="text-sm text-muted-foreground">Applying {algorithm} algorithm...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Output Display */}
      <AnimatePresence>
        {encryptedText && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Encrypted Text Display */}
            <div className="mb-6">
              <motion.div
                initial={{ borderColor: 'var(--color-border)' }}
                animate={{ borderColor: 'var(--color-success)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative border rounded-lg p-4 bg-input font-mono text-sm"
              >
                <div className="text-foreground break-all leading-relaxed">
                  {showFullText ? encryptedText : truncatedText}
                </div>
                
                {encryptedText?.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullText(!showFullText)}
                    className="mt-2 text-accent hover:text-accent/80"
                  >
                    {showFullText ? 'Show Less' : 'Show More'}
                  </Button>
                )}

                {/* Success Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-success rounded-full flex items-center justify-center"
                >
                  <Icon name="Check" size={14} className="text-success-foreground" />
                </motion.div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
                className={copied ? "border-success text-success" : ""}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
              
              <Button
                variant="outline"
                onClick={downloadAsFile}
                iconName="Download"
                iconPosition="left"
              >
                Download File
              </Button>
            </div>

            {/* Encryption Details */}
            <div className="bg-surface rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Encryption Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Algorithm:</span>
                  <span className="ml-2 text-foreground font-medium">{algorithm?.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Output Size:</span>
                  <span className="ml-2 text-foreground font-medium">{encryptedText?.length?.toLocaleString()} chars</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="ml-2 text-foreground font-medium">{new Date()?.toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 text-success font-medium flex items-center">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Encrypted
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Empty State */}
      {!encryptedText && !isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4"
          >
            <Icon name="Lock" size={24} className="text-muted-foreground" />
          </motion.div>
          <p className="text-lg font-medium text-muted-foreground mb-2">No Encrypted Data</p>
          <p className="text-sm text-muted-foreground max-w-md">
            Enter text in the input section and click encrypt to see your secure encrypted output here.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EncryptionOutput;