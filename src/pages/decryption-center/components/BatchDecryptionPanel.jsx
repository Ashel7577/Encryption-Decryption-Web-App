import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BatchDecryptionPanel = ({ onBatchProcess, isProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [batchSettings, setBatchSettings] = useState({
    algorithm: '',
    keySource: 'storage',
    outputFormat: 'original',
    preserveStructure: true
  });
  const [processingQueue, setProcessingQueue] = useState([]);
  const [completedFiles, setCompletedFiles] = useState([]);

  // Mock file data
  const mockFiles = [
    {
      id: 'file-1',
      name: 'confidential_report.enc',
      size: '2.4 MB',
      type: 'AES-256',
      status: 'pending',
      progress: 0,
      estimatedTime: '45s'
    },
    {
      id: 'file-2',
      name: 'financial_data.aes',
      size: '1.8 MB',
      type: 'AES-256',
      status: 'pending',
      progress: 0,
      estimatedTime: '32s'
    },
    {
      id: 'file-3',
      name: 'project_specs.rsa',
      size: '856 KB',
      type: 'RSA-2048',
      status: 'pending',
      progress: 0,
      estimatedTime: '28s'
    }
  ];

  const algorithmOptions = [
    { value: 'auto-detect', label: 'Auto-detect', description: 'Automatically detect encryption method' },
    { value: 'aes-256-gcm', label: 'AES-256-GCM', description: 'Advanced Encryption Standard' },
    { value: 'rsa-2048', label: 'RSA-2048', description: 'RSA with 2048-bit key' },
    { value: 'chacha20', label: 'ChaCha20', description: 'Stream cipher encryption' }
  ];

  const outputFormatOptions = [
    { value: 'original', label: 'Original Format', description: 'Keep original file format' },
    { value: 'txt', label: 'Plain Text', description: 'Convert to text format' },
    { value: 'pdf', label: 'PDF Document', description: 'Export as PDF' },
    { value: 'zip', label: 'ZIP Archive', description: 'Compress into ZIP file' }
  ];

  useEffect(() => {
    if (isProcessing && processingQueue?.length > 0) {
      simulateBatchProcessing();
    }
  }, [isProcessing, processingQueue]);

  const simulateBatchProcessing = () => {
    processingQueue?.forEach((file, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          setSelectedFiles(prev => 
            prev?.map(f => 
              f?.id === file?.id 
                ? { ...f, progress: Math.min(f?.progress + 5, 100), status: 'processing' }
                : f
            )
          );
        }, 200);

        setTimeout(() => {
          clearInterval(interval);
          setSelectedFiles(prev => 
            prev?.map(f => 
              f?.id === file?.id 
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
          setCompletedFiles(prev => [...prev, file]);
        }, 4000);
      }, index * 1000);
    });
  };

  const handleFileSelection = (files) => {
    const fileArray = Array.from(files)?.map((file, index) => ({
      id: `uploaded-${index}`,
      name: file?.name,
      size: `${(file?.size / 1024 / 1024)?.toFixed(1)} MB`,
      type: 'Unknown',
      status: 'pending',
      progress: 0,
      file: file
    }));
    setSelectedFiles([...selectedFiles, ...fileArray]);
  };

  const handleStartBatch = () => {
    const pendingFiles = selectedFiles?.filter(f => f?.status === 'pending');
    setProcessingQueue(pendingFiles);
    onBatchProcess && onBatchProcess({ files: pendingFiles, settings: batchSettings });
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-accent';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader';
      case 'error': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
            animate={{ 
              rotate: isProcessing ? [0, 360] : 0,
              scale: isProcessing ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 2, repeat: isProcessing ? Infinity : 0, ease: "linear" },
              scale: { duration: 1.5, repeat: isProcessing ? Infinity : 0, ease: "easeInOut" }
            }}
          >
            <Icon name="Layers" size={20} className="text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Batch Decryption</h3>
            <p className="text-sm text-muted-foreground">Process multiple files simultaneously</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedFiles(mockFiles)}
          iconName="Plus"
          iconPosition="left"
          disabled={isProcessing}
        >
          Add Sample Files
        </Button>
      </div>
      {/* File Upload Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Select Encrypted Files
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors duration-200">
          <input
            type="file"
            multiple
            onChange={(e) => handleFileSelection(e?.target?.files)}
            className="hidden"
            id="batchFileInput"
            accept=".enc,.aes,.rsa,.txt,.bin"
            disabled={isProcessing}
          />
          <label htmlFor="batchFileInput" className="cursor-pointer">
            <Icon name="Upload" size={32} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports multiple encrypted file formats
            </p>
          </label>
        </div>
      </div>
      {/* Batch Settings */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Algorithm Detection"
          options={algorithmOptions}
          value={batchSettings?.algorithm}
          onChange={(value) => setBatchSettings(prev => ({ ...prev, algorithm: value }))}
          disabled={isProcessing}
        />
        
        <Select
          label="Output Format"
          options={outputFormatOptions}
          value={batchSettings?.outputFormat}
          onChange={(value) => setBatchSettings(prev => ({ ...prev, outputFormat: value }))}
          disabled={isProcessing}
        />
      </div>
      {/* File Queue */}
      {selectedFiles?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Processing Queue</h4>
            <span className="text-xs text-muted-foreground">
              {selectedFiles?.length} files • {completedFiles?.length} completed
            </span>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {selectedFiles?.map((file, index) => (
              <motion.div
                key={file?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 bg-muted/20 rounded-lg border border-border"
              >
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-muted"
                  animate={{ 
                    rotate: file?.status === 'processing' ? 360 : 0 
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: file?.status === 'processing' ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <Icon 
                    name={getStatusIcon(file?.status)} 
                    size={16} 
                    className={getStatusColor(file?.status)}
                  />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {file?.size}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          file?.status === 'completed' ? 'bg-success' :
                          file?.status === 'processing' ? 'bg-accent' :
                          file?.status === 'error' ? 'bg-error' : 'bg-muted-foreground'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${file?.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {file?.progress}%
                    </span>
                  </div>
                </div>
                
                {!isProcessing && file?.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file?.id)}
                    iconName="X"
                    iconSize={14}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Batch Statistics */}
      {selectedFiles?.length > 0 && (
        <div className="mb-6 bg-muted/10 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Batch Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{selectedFiles?.length}</p>
              <p className="text-xs text-muted-foreground">Total Files</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-accent">{processingQueue?.length}</p>
              <p className="text-xs text-muted-foreground">Processing</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-success">{completedFiles?.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-warning">
                {selectedFiles?.filter(f => f?.status === 'error')?.length}
              </p>
              <p className="text-xs text-muted-foreground">Errors</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          onClick={handleStartBatch}
          disabled={selectedFiles?.length === 0 || isProcessing}
          iconName="Play"
          iconPosition="left"
        >
          {isProcessing ? 'Processing...' : 'Start Batch Decryption'}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setSelectedFiles([])}
          disabled={isProcessing}
          iconName="Trash2"
          iconPosition="left"
        >
          Clear Queue
        </Button>
        
        {completedFiles?.length > 0 && (
          <Button
            variant="outline"
            onClick={() => console.log('Download all completed files')}
            iconName="Download"
            iconPosition="left"
          >
            Download All ({completedFiles?.length})
          </Button>
        )}
      </div>
      {/* Processing Notice */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 bg-accent/10 border border-accent/20 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={16} className="text-accent animate-biometric-pulse" />
              <div>
                <p className="text-sm font-medium text-accent">Batch Processing Active</p>
                <p className="text-xs text-accent/80">
                  Files are being processed sequentially. Please wait for completion.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatchDecryptionPanel;