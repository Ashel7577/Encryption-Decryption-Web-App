import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FileUploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e?.dataTransfer?.items && e?.dataTransfer?.items?.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter === 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFilesSelected(files);
    }
    e.target.value = '';
  }, [onFilesSelected]);

  const supportedFormats = [
    { ext: 'PDF', icon: 'FileText', color: 'text-red-400' },
    { ext: 'DOC', icon: 'FileText', color: 'text-blue-400' },
    { ext: 'IMG', icon: 'Image', color: 'text-green-400' },
    { ext: 'ZIP', icon: 'Archive', color: 'text-yellow-400' },
    { ext: 'TXT', icon: 'FileText', color: 'text-gray-400' },
    { ext: 'XLS', icon: 'FileSpreadsheet', color: 'text-emerald-400' }
  ];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-accent bg-accent/10 scale-105 shadow-elevation-2' 
            : 'border-border hover:border-accent/50 hover:bg-accent/5'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
        />

        <AnimatePresence mode="wait">
          {isDragOver ? (
            <motion.div
              key="drag-active"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={32} className="text-accent animate-biometric-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accent mb-2">Drop files here</h3>
                <p className="text-muted-foreground">Release to start encryption process</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="drag-inactive"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="relative">
                <motion.div 
                  className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-elevation-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name="FolderLock" size={32} className="text-primary-foreground" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-biometric-pulse">
                  <Icon name="Plus" size={14} className="text-success-foreground" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-foreground">
                  Drag & Drop Files
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Securely encrypt your files with military-grade encryption. 
                  Drop files here or click to browse.
                </p>
              </div>

              <motion.button
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon name="Upload" size={18} />
                <span>Browse Files</span>
              </motion.button>

              <div className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">Supported formats:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {supportedFormats?.map((format, index) => (
                    <motion.div
                      key={format?.ext}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-surface rounded-lg border border-border"
                    >
                      <Icon name={format?.icon} size={16} className={format?.color} />
                      <span className="text-sm text-muted-foreground">{format?.ext}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className={`
            absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent
            transform -translate-x-full transition-transform duration-1000
            ${isDragOver ? 'translate-x-full' : ''}
          `} />
        </div>
      </div>
      {/* Security indicator */}
      <motion.div
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-full shadow-elevation-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="w-2 h-2 bg-success rounded-full animate-biometric-pulse" />
        <span className="text-xs text-muted-foreground">256-bit AES Encryption</span>
        <Icon name="Shield" size={14} className="text-success" />
      </motion.div>
    </motion.div>
  );
};

export default FileUploadZone;