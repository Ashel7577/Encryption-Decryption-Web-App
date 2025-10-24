import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedOptions = ({ 
  options, 
  onOptionsChange, 
  onBatchProcess 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const strengthOptions = [
    { value: 'standard', label: 'Standard', description: 'Balanced security and performance' },
    { value: 'high', label: 'High', description: 'Enhanced security with longer keys' },
    { value: 'maximum', label: 'Maximum', description: 'Military-grade encryption' }
  ];

  const formatOptions = [
    { value: 'base64', label: 'Base64', description: 'Standard encoding format' },
    { value: 'hex', label: 'Hexadecimal', description: 'Hexadecimal representation' },
    { value: 'binary', label: 'Binary', description: 'Raw binary output' }
  ];

  const updateOption = (key, value) => {
    onOptionsChange({
      ...options,
      [key]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="bg-card border border-border rounded-xl shadow-elevation-2 overflow-hidden"
    >
      {/* Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors duration-200"
        whileHover={{ backgroundColor: 'rgba(100, 116, 139, 0.1)' }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-warning to-accent rounded-lg flex items-center justify-center"
          >
            <Icon name="Settings" size={20} className="text-warning-foreground" />
          </motion.div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-foreground">Advanced Options</h2>
            <p className="text-sm text-muted-foreground">Customize encryption parameters</p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.button>
      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-border"
          >
            <div className="p-6 space-y-6">
              {/* Encryption Strength */}
              <div>
                <Select
                  label="Encryption Strength"
                  description="Higher strength provides better security but slower processing"
                  options={strengthOptions}
                  value={options?.strength}
                  onChange={(value) => updateOption('strength', value)}
                />
              </div>

              {/* Output Format */}
              <div>
                <Select
                  label="Output Format"
                  description="Choose how the encrypted data should be encoded"
                  options={formatOptions}
                  value={options?.format}
                  onChange={(value) => updateOption('format', value)}
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Additional Settings</h3>
                
                <Checkbox
                  label="Include metadata"
                  description="Add encryption details to output"
                  checked={options?.includeMetadata}
                  onChange={(e) => updateOption('includeMetadata', e?.target?.checked)}
                />

                <Checkbox
                  label="Compress before encryption"
                  description="Reduce data size before encrypting"
                  checked={options?.compress}
                  onChange={(e) => updateOption('compress', e?.target?.checked)}
                />

                <Checkbox
                  label="Generate salt automatically"
                  description="Add random salt for enhanced security"
                  checked={options?.autoSalt}
                  onChange={(e) => updateOption('autoSalt', e?.target?.checked)}
                />

                <Checkbox
                  label="Enable batch processing"
                  description="Process multiple texts simultaneously"
                  checked={options?.batchMode}
                  onChange={(e) => updateOption('batchMode', e?.target?.checked)}
                />
              </div>

              {/* Batch Processing Section */}
              <AnimatePresence>
                {options?.batchMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon name="Layers" size={18} className="text-accent" />
                      <h4 className="text-sm font-medium text-foreground">Batch Processing</h4>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      Process multiple text inputs with the same encryption settings.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onBatchProcess}
                        iconName="Upload"
                        iconPosition="left"
                      >
                        Upload Files
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Add Text
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Security Level Indicator */}
              <div className="bg-surface rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Security Level</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      options?.strength === 'maximum' ?'bg-success/20 text-success' 
                        : options?.strength === 'high' ?'bg-warning/20 text-warning' :'bg-primary/20 text-primary'
                    }`}
                  >
                    {options?.strength?.toUpperCase() || 'STANDARD'}
                  </motion.div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: options?.strength === 'maximum' ? '100%' : 
                             options?.strength === 'high' ? '75%' : '50%'
                    }}
                    transition={{ duration: 0.5 }}
                    className={`h-2 rounded-full ${
                      options?.strength === 'maximum' ?'bg-success' 
                        : options?.strength === 'high' ?'bg-warning' :'bg-primary'
                    }`}
                  />
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOptionsChange({
                    strength: 'standard',
                    format: 'base64',
                    includeMetadata: false,
                    compress: false,
                    autoSalt: true,
                    batchMode: false
                  })}
                  iconName="RotateCcw"
                  iconPosition="left"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvancedOptions;
