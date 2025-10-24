import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AdvancedSettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const compressionOptions = [
    { value: 'none', label: 'No Compression' },
    { value: 'low', label: 'Low Compression' },
    { value: 'medium', label: 'Medium Compression' },
    { value: 'high', label: 'High Compression' },
    { value: 'maximum', label: 'Maximum Compression' }
  ];

  const outputFormatOptions = [
    { value: 'encrypted', label: 'Encrypted File (.enc)' },
    { value: 'archive', label: 'Encrypted Archive (.zip.enc)' },
    { value: 'container', label: 'Secure Container (.vault)' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings2" size={20} className="text-accent" />
          <span>Advanced Settings</span>
        </h3>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-muted/50"
        >
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="ChevronDown" size={16} />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              {/* Password Protection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Key" size={18} className="text-warning" />
                  <h4 className="font-medium text-foreground">Password Protection</h4>
                </div>
                
                <div className="space-y-4">
                  <Checkbox
                    label="Enable password protection"
                    description="Add an additional layer of security with a custom password"
                    checked={settings?.passwordProtection}
                    onChange={(e) => handleSettingChange('passwordProtection', e?.target?.checked)}
                  />
                  
                  {settings?.passwordProtection && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <Input
                        type="password"
                        label="Encryption Password"
                        placeholder="Enter a strong password"
                        value={settings?.password || ''}
                        onChange={(e) => handleSettingChange('password', e?.target?.value)}
                        description="Minimum 8 characters with mixed case, numbers, and symbols"
                      />
                      
                      <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={settings?.confirmPassword || ''}
                        onChange={(e) => handleSettingChange('confirmPassword', e?.target?.value)}
                      />
                      
                      {/* Password Strength Indicator */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password Strength</span>
                          <span className="text-success font-medium">Strong</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="w-4/5 bg-gradient-to-r from-warning to-success h-2 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Compression Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Archive" size={18} className="text-blue-400" />
                  <h4 className="font-medium text-foreground">Compression Options</h4>
                </div>
                
                <div className="space-y-4">
                  <Checkbox
                    label="Enable compression"
                    description="Reduce file size before encryption (may increase processing time)"
                    checked={settings?.compression}
                    onChange={(e) => handleSettingChange('compression', e?.target?.checked)}
                  />
                  
                  {settings?.compression && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Select
                        label="Compression Level"
                        description="Higher compression reduces file size but increases processing time"
                        options={compressionOptions}
                        value={settings?.compressionLevel || 'medium'}
                        onChange={(value) => handleSettingChange('compressionLevel', value)}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Output Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="FolderOutput" size={18} className="text-green-400" />
                  <h4 className="font-medium text-foreground">Output Configuration</h4>
                </div>
                
                <div className="space-y-4">
                  <Select
                    label="Output Format"
                    description="Choose how encrypted files should be packaged"
                    options={outputFormatOptions}
                    value={settings?.outputFormat || 'encrypted'}
                    onChange={(value) => handleSettingChange('outputFormat', value)}
                  />
                  
                  <Input
                    type="text"
                    label="Output Directory"
                    placeholder="/path/to/output/directory"
                    value={settings?.outputDirectory || ''}
                    onChange={(e) => handleSettingChange('outputDirectory', e?.target?.value)}
                    description="Leave empty to use default downloads folder"
                  />
                  
                  <div className="space-y-3">
                    <Checkbox
                      label="Preserve original file structure"
                      description="Maintain folder hierarchy in encrypted archives"
                      checked={settings?.preserveStructure}
                      onChange={(e) => handleSettingChange('preserveStructure', e?.target?.checked)}
                    />
                    
                    <Checkbox
                      label="Delete original files after encryption"
                      description="Automatically remove source files once encryption is complete"
                      checked={settings?.deleteOriginals}
                      onChange={(e) => handleSettingChange('deleteOriginals', e?.target?.checked)}
                    />
                    
                    <Checkbox
                      label="Generate encryption report"
                      description="Create a detailed report of the encryption process"
                      checked={settings?.generateReport}
                      onChange={(e) => handleSettingChange('generateReport', e?.target?.checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Security Audit */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="ShieldCheck" size={18} className="text-purple-400" />
                  <h4 className="font-medium text-foreground">Security Audit</h4>
                </div>
                
                <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Encryption Standard</span>
                    <span className="text-sm font-medium text-success">AES-256-GCM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Key Derivation</span>
                    <span className="text-sm font-medium text-success">PBKDF2-SHA256</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Salt Generation</span>
                    <span className="text-sm font-medium text-success">Cryptographically Secure</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing Location</span>
                    <span className="text-sm font-medium text-success">Local Device Only</span>
                  </div>
                </div>
              </div>

              {/* Batch Processing */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Layers" size={18} className="text-orange-400" />
                  <h4 className="font-medium text-foreground">Batch Processing</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Parallel Processing</div>
                      <div className="text-xs text-muted-foreground">Process multiple files simultaneously</div>
                    </div>
                    <Checkbox
                      checked={settings?.parallelProcessing}
                      onChange={(e) => handleSettingChange('parallelProcessing', e?.target?.checked)}
                    />
                  </div>
                  
                  {settings?.parallelProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Input
                        type="number"
                        label="Max Concurrent Files"
                        placeholder="4"
                        min="1"
                        max="8"
                        value={settings?.maxConcurrent || 4}
                        onChange={(e) => handleSettingChange('maxConcurrent', parseInt(e?.target?.value))}
                        description="Number of files to process simultaneously (1-8)"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Summary */}
            <motion.div
              className="bg-surface border border-border rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Current Configuration</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-muted-foreground">Password</div>
                  <div className="font-medium text-foreground">
                    {settings?.passwordProtection ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Compression</div>
                  <div className="font-medium text-foreground">
                    {settings?.compression ? settings?.compressionLevel || 'Medium' : 'None'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Format</div>
                  <div className="font-medium text-foreground">
                    {outputFormatOptions?.find(opt => opt?.value === settings?.outputFormat)?.label?.split(' ')?.[0] || 'Encrypted'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Parallel</div>
                  <div className="font-medium text-foreground">
                    {settings?.parallelProcessing ? `${settings?.maxConcurrent || 4} Files` : 'Sequential'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvancedSettings;
