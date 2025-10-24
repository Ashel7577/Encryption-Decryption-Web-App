import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import InputDetectionPanel from './components/InputDetectionPanel';
import AlgorithmDetectionPanel from './components/AlgorithmDetectionPanel';
import KeyManagementSection from './components/KeyManagementSection';
import ProcessingWorkspace from './components/ProcessingWorkspace';
import OutputDisplayArea from './components/OutputDisplayArea';
import BatchDecryptionPanel from './components/BatchDecryptionPanel';

const DecryptionCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('single');
  const [detectedContent, setDetectedContent] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [keyInfo, setKeyInfo] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState(null);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Chen",
    email: "alex.chen@cryptovault.com"
  };

  const tabs = [
    { id: 'single', label: 'Single Decryption', icon: 'FileText', description: 'Decrypt individual files or text' },
    { id: 'batch', label: 'Batch Processing', icon: 'Layers', description: 'Process multiple files at once' }
  ];

  useEffect(() => {
    // Simulate page load animation
    document.title = 'Decryption Center - CryptoVault';
  }, []);

  const handleContentDetected = (content) => {
    setDetectedContent(content);
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setIsAnalyzing(true);
    }, 2000);
  };

  const handleAlgorithmSelected = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsAnalyzing(false);
  };

  const handleKeyProvided = (key) => {
    setKeyInfo(key);
  };

  const handleStartDecryption = () => {
    setIsProcessing(true);
    
    // Simulate decryption process
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessingComplete(true);
      setDecryptedContent({
        type: detectedContent?.type || 'text',
        content: 'Decrypted content would appear here'
      });
    }, 12000); // 12 seconds to show all processing steps
  };

  const handlePauseDecryption = () => {
    setIsProcessing(false);
  };

  const handleCancelDecryption = () => {
    setIsProcessing(false);
    setIsProcessingComplete(false);
    setDecryptedContent(null);
  };

  const handleExport = (exportData) => {
    console.log('Exporting content:', exportData);
    // Implement export functionality
  };

  const handleReEncrypt = () => {
    navigate('/text-encryption');
  };

  const handleSaveToStorage = () => {
    console.log('Saving to secure storage');
    // Implement save functionality
  };

  const handleBatchProcess = (batchData) => {
    setIsBatchProcessing(true);
    
    // Simulate batch processing
    setTimeout(() => {
      setIsBatchProcessing(false);
    }, 15000);
  };

  const handleLogout = () => {
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-background via-surface to-background border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elevation-2"
              >
                <Icon name="Unlock" size={32} className="text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Decryption Center
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              >
                Unified platform for decrypting text and files with advanced algorithm detection, 
                secure key management, and sophisticated visual feedback
              </motion.p>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center"
              >
                <div className="bg-card rounded-xl p-2 border border-border shadow-elevation-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                        flex items-center space-x-3 animate-micro
                        ${activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground shadow-elevation-1'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          activeTab === tab?.id ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="text-left">
                        <div>{tab?.label}</div>
                        <div className="text-xs opacity-70">{tab?.description}</div>
                      </div>
                      {activeTab === tab?.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              {activeTab === 'single' && (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Input Detection */}
                  <InputDetectionPanel
                    onContentDetected={handleContentDetected}
                    detectedType={detectedContent}
                    isScanning={isScanning}
                  />

                  {/* Algorithm Detection */}
                  {(detectedContent || isAnalyzing) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlgorithmDetectionPanel
                        detectedContent={detectedContent}
                        onAlgorithmSelected={handleAlgorithmSelected}
                        isAnalyzing={isAnalyzing}
                      />
                    </motion.div>
                  )}

                  {/* Key Management */}
                  {selectedAlgorithm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <KeyManagementSection
                        selectedAlgorithm={selectedAlgorithm?.algorithm}
                        onKeyProvided={handleKeyProvided}
                        isProcessing={isProcessing}
                      />
                    </motion.div>
                  )}

                  {/* Processing Workspace */}
                  {(selectedAlgorithm || keyInfo) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ProcessingWorkspace
                        isProcessing={isProcessing}
                        processingStage={isProcessing ? 'decrypting' : 'ready'}
                        progress={isProcessing ? 50 : 0}
                        onStartDecryption={handleStartDecryption}
                        onPauseDecryption={handlePauseDecryption}
                        onCancelDecryption={handleCancelDecryption}
                        selectedAlgorithm={selectedAlgorithm}
                        keyInfo={keyInfo}
                        contentInfo={detectedContent}
                      />
                    </motion.div>
                  )}

                  {/* Output Display */}
                  <OutputDisplayArea
                    decryptedContent={decryptedContent}
                    isProcessingComplete={isProcessingComplete}
                    contentType={detectedContent?.type}
                    onExport={handleExport}
                    onReEncrypt={handleReEncrypt}
                    onSaveToStorage={handleSaveToStorage}
                  />
                </motion.div>
              )}

              {activeTab === 'batch' && (
                <motion.div
                  key="batch"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <BatchDecryptionPanel
                    onBatchProcess={handleBatchProcess}
                    isProcessing={isBatchProcessing}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="py-12 bg-surface/50 border-t border-border"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
              <p className="text-muted-foreground">
                Access frequently used decryption tools and utilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Text Encryption',
                  description: 'Encrypt new text content',
                  icon: 'FileText',
                  action: () => navigate('/text-encryption'),
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'File Encryption',
                  description: 'Secure file encryption',
                  icon: 'FolderLock',
                  action: () => navigate('/file-encryption'),
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Dashboard',
                  description: 'View encryption activity',
                  icon: 'LayoutDashboard',
                  action: () => navigate('/main-dashboard'),
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Security Audit',
                  description: 'Review security logs',
                  icon: 'Shield',
                  action: () => console.log('Security audit'),
                  color: 'from-orange-500 to-red-500'
                }
              ]?.map((action, index) => (
                <motion.div
                  key={action?.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-elevation-2 transition-all duration-300 cursor-pointer group"
                  onClick={action?.action}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action?.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={action?.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} CryptoVault. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors duration-200">Privacy Policy</button>
              <button className="hover:text-foreground transition-colors duration-200">Terms of Service</button>
              <button className="hover:text-foreground transition-colors duration-200">Security</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DecryptionCenter;
