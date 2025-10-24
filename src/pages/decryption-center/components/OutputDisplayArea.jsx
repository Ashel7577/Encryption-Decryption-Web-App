import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const OutputDisplayArea = ({ 
  decryptedContent, 
  isProcessingComplete, 
  contentType,
  onExport,
  onReEncrypt,
  onSaveToStorage 
}) => {
  const [displayMode, setDisplayMode] = useState('preview');
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [exportFormat, setExportFormat] = useState('txt');
  const [showMetadata, setShowMetadata] = useState(false);

  // Mock decrypted content for demonstration
  const mockDecryptedContent = {
    text: `CONFIDENTIAL DOCUMENT\n\nProject Alpha - Phase 2 Implementation\n\nThis document contains sensitive information regarding the development roadmap for Project Alpha. The implementation strategy includes:\n\n1. Infrastructure Setup\n   - Cloud deployment architecture\n   - Security protocols implementation\n   - Database optimization\n\n2. Feature Development\n   - User authentication system\n   - Real-time data processing\n   - Advanced analytics dashboard\n\n3. Testing & Quality Assurance\n   - Automated testing framework\n   - Security penetration testing\n   - Performance optimization\n\nTimeline: Q4 2024 - Q2 2025\nBudget: $2.5M allocated\nTeam Size: 12 developers, 3 QA engineers\n\nFor internal use only. Do not distribute without proper authorization.`,
    metadata: {
      originalSize: '2.4 KB',
      encryptionDate: '2024-10-20 14:30:22',
      algorithm: 'AES-256-GCM',
      keyId: 'key-1',
      integrity: 'Verified',
      digitalSignature: 'Valid'
    }
  };

  useEffect(() => {
    if (isProcessingComplete && decryptedContent) {
      // Simulate content reveal animation
      setTimeout(() => setIsContentVisible(true), 500);
    }
  }, [isProcessingComplete, decryptedContent]);

  const handleExport = (format) => {
    setExportFormat(format);
    onExport && onExport({ content: mockDecryptedContent?.text, format });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(mockDecryptedContent?.text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const exportOptions = [
    { value: 'txt', label: 'Plain Text', icon: 'FileText' },
    { value: 'pdf', label: 'PDF Document', icon: 'FileType' },
    { value: 'docx', label: 'Word Document', icon: 'FileText' },
    { value: 'json', label: 'JSON Format', icon: 'Braces' }
  ];

  if (!isProcessingComplete) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-muted to-muted-foreground rounded-lg flex items-center justify-center">
            <Icon name="FileOutput" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Output Display</h3>
            <p className="text-sm text-muted-foreground">Decrypted content will appear here</p>
          </div>
        </div>

        <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
          <div className="text-center">
            <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Awaiting decryption completion</p>
            <p className="text-xs text-muted-foreground">
              Decrypted content will be displayed securely here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 shadow-elevation-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Icon name="Unlock" size={20} className="text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Decrypted Content</h3>
            <p className="text-sm text-muted-foreground">Content successfully decrypted</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMetadata(!showMetadata)}
            iconName="Info"
            iconPosition="left"
          >
            Metadata
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsContentVisible(!isContentVisible)}
            iconName={isContentVisible ? "EyeOff" : "Eye"}
            iconPosition="left"
          >
            {isContentVisible ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
      {/* Content Display */}
      <AnimatePresence>
        {isContentVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-muted/20 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-foreground" />
                  <span className="text-sm font-medium text-foreground">Decrypted Document</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    iconName="Copy"
                    iconSize={14}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDisplayMode(displayMode === 'preview' ? 'raw' : 'preview')}
                    iconName="Code"
                    iconSize={14}
                  >
                    {displayMode === 'preview' ? 'Raw' : 'Preview'}
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-h-96 overflow-y-auto"
              >
                {displayMode === 'preview' ? (
                  <div className="prose prose-sm max-w-none text-foreground">
                    <pre className="whitespace-pre-wrap text-sm text-foreground bg-background/50 p-4 rounded border">
                      {mockDecryptedContent?.text}
                    </pre>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-muted-foreground bg-background/50 p-4 rounded border">
                    {mockDecryptedContent?.text?.split('')?.map((char, index) => (
                      <span key={index} className={char === '\n' ? 'block' : ''}>
                        {char === '\n' ? '↵' : char === ' ' ? '·' : char}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Metadata Panel */}
      <AnimatePresence>
        {showMetadata && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-muted/10 rounded-lg p-4 border border-border">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Database" size={16} />
                <span>Content Metadata</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mockDecryptedContent?.metadata)?.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                    </span>
                    <span className="text-xs font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Export Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Export Options</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {exportOptions?.map((option) => (
            <motion.button
              key={option?.value}
              onClick={() => handleExport(option?.value)}
              className={`
                flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200
                ${exportFormat === option?.value
                  ? 'border-primary bg-primary/5 shadow-elevation-1'
                  : 'border-border hover:border-muted-foreground hover:bg-muted/20'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon 
                name={option?.icon} 
                size={20} 
                className={exportFormat === option?.value ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className={`text-xs font-medium ${
                exportFormat === option?.value ? 'text-primary' : 'text-foreground'
              }`}>
                {option?.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          onClick={() => handleExport(exportFormat)}
          iconName="Download"
          iconPosition="left"
        >
          Export Content
        </Button>
        
        <Button
          variant="outline"
          onClick={onSaveToStorage}
          iconName="Save"
          iconPosition="left"
        >
          Save to Storage
        </Button>
        
        <Button
          variant="outline"
          onClick={onReEncrypt}
          iconName="Lock"
          iconPosition="left"
        >
          Re-encrypt
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => window.print()}
          iconName="Printer"
          iconPosition="left"
        >
          Print
        </Button>
      </div>
      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-success/10 border border-success/20 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheck" size={16} className="text-success mt-0.5" />
          <div>
            <p className="text-sm font-medium text-success mb-1">Decryption Successful</p>
            <p className="text-xs text-success/80">
              Content has been successfully decrypted and verified. All security checks passed. 
              The decrypted content is displayed securely and will not be stored permanently.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OutputDisplayArea;