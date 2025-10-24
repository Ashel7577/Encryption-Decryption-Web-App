import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import FileQueue from './components/FileQueue';
import AlgorithmSelector from './components/AlgorithmSelector';
import ProcessingWorkspace from './components/ProcessingWorkspace';
import AdvancedSettings from './components/AdvancedSettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FileEncryption = () => {
  const [files, setFiles] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState([]);
  const [completedFiles, setCompletedFiles] = useState([]);
  const [settings, setSettings] = useState({
    passwordProtection: false,
    password: '',
    confirmPassword: '',
    compression: false,
    compressionLevel: 'medium',
    outputFormat: 'encrypted',
    outputDirectory: '',
    preserveStructure: true,
    deleteOriginals: false,
    generateReport: true,
    parallelProcessing: true,
    maxConcurrent: 4
  });

  // Mock user data
  const user = {
    name: "Alex Chen",
    email: "alex.chen@cryptovault.com"
  };

  // Initialize with default algorithm
  useEffect(() => {
    setSelectedAlgorithm({
      id: 'aes-256',
      name: 'AES-256',
      description: 'Advanced Encryption Standard with 256-bit key',
      strength: 'Military Grade',
      speed: 'Fast',
      compatibility: 'Universal',
      icon: 'Shield',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      recommended: true,
      details: {
        keySize: '256-bit',
        blockSize: '128-bit',
        rounds: '14',
        performance: 'Excellent',
        security: 'Maximum'
      }
    });
  }, []);

  const handleFilesSelected = (newFiles) => {
    const filesWithIds = newFiles?.map(file => ({
      ...file,
      id: `file_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`
    }));
    setFiles(prev => [...prev, ...filesWithIds]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  const handleStartProcessing = () => {
    if (files?.length === 0) return;
    
    setIsProcessing(true);
    setProcessingFiles(files?.map(f => f?.id));
    
    // Simulate processing
    files?.forEach((file, index) => {
      setTimeout(() => {
        setProcessingFiles(prev => prev?.filter(id => id !== file?.id));
        setCompletedFiles(prev => [...prev, file?.id]);
        
        // Check if all files are completed
        if (index === files?.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
          }, 1000);
        }
      }, (index + 1) * 3000 + Math.random() * 2000);
    });
  };

  const handlePauseProcessing = () => {
    setIsProcessing(false);
  };

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setProcessingFiles([]);
    setCompletedFiles([]);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleClearAll = () => {
    setFiles([]);
    setProcessingFiles([]);
    setCompletedFiles([]);
  };

  const handleDownloadAll = () => {
    console.log('Downloading all encrypted files');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">File Encryption</h1>
                <p className="text-muted-foreground">
                  Secure your files with military-grade encryption algorithms
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {files?.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleClearAll}
                      iconName="Trash2"
                      iconSize={16}
                    >
                      Clear All
                    </Button>
                    
                    {completedFiles?.length > 0 && (
                      <Button
                        variant="default"
                        onClick={handleDownloadAll}
                        iconName="Download"
                        iconSize={16}
                      >
                        Download All
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Security Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-biometric-pulse" />
                <span className="text-success">Secure Session Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-accent" />
                <span className="text-muted-foreground">Local Processing Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} className="text-warning" />
                <span className="text-muted-foreground">End-to-End Encryption</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Upload & Queue */}
            <div className="xl:col-span-2 space-y-8">
              {/* File Upload Zone */}
              <FileUploadZone 
                onFilesSelected={handleFilesSelected}
                isProcessing={isProcessing}
              />
              
              {/* File Queue */}
              <FileQueue
                files={files}
                onRemoveFile={handleRemoveFile}
                processingFiles={processingFiles}
                completedFiles={completedFiles}
              />
              
              {/* Processing Workspace */}
              <ProcessingWorkspace
                isProcessing={isProcessing}
                processingFiles={processingFiles}
                completedFiles={completedFiles}
                totalFiles={files?.length}
                onStartProcessing={handleStartProcessing}
                onPauseProcessing={handlePauseProcessing}
                onCancelProcessing={handleCancelProcessing}
                selectedAlgorithm={selectedAlgorithm}
              />
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-8">
              {/* Algorithm Selection */}
              <AlgorithmSelector
                selectedAlgorithm={selectedAlgorithm}
                onAlgorithmChange={setSelectedAlgorithm}
              />
              
              {/* Advanced Settings */}
              <AdvancedSettings
                settings={settings}
                onSettingsChange={setSettings}
              />
              
              {/* Quick Stats */}
              <motion.div
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} className="text-accent" />
                  <span>Session Statistics</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Files Processed Today</span>
                    <span className="text-sm font-medium text-foreground">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Data Encrypted</span>
                    <span className="text-sm font-medium text-foreground">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Processing Speed</span>
                    <span className="text-sm font-medium text-foreground">45.2 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Security Level</span>
                    <span className="text-sm font-medium text-success">Maximum</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileEncryption;
