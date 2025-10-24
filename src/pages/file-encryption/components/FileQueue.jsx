import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileQueue = ({ files, onRemoveFile, processingFiles, completedFiles }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      pdf: { icon: 'FileText', color: 'text-red-400' },
      doc: { icon: 'FileText', color: 'text-blue-400' },
      docx: { icon: 'FileText', color: 'text-blue-400' },
      txt: { icon: 'FileText', color: 'text-gray-400' },
      jpg: { icon: 'Image', color: 'text-green-400' },
      jpeg: { icon: 'Image', color: 'text-green-400' },
      png: { icon: 'Image', color: 'text-green-400' },
      gif: { icon: 'Image', color: 'text-green-400' },
      zip: { icon: 'Archive', color: 'text-yellow-400' },
      rar: { icon: 'Archive', color: 'text-yellow-400' },
      xlsx: { icon: 'FileSpreadsheet', color: 'text-emerald-400' },
      xls: { icon: 'FileSpreadsheet', color: 'text-emerald-400' },
      ppt: { icon: 'Presentation', color: 'text-orange-400' },
      pptx: { icon: 'Presentation', color: 'text-orange-400' }
    };
    return iconMap?.[extension] || { icon: 'File', color: 'text-muted-foreground' };
  };

  const getFileStatus = (fileId) => {
    if (completedFiles?.includes(fileId)) {
      return { status: 'completed', progress: 100 };
    }
    if (processingFiles?.includes(fileId)) {
      return { status: 'processing', progress: Math.random() * 80 + 10 };
    }
    return { status: 'pending', progress: 0 };
  };

  if (files?.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Files" size={20} className="text-accent" />
          <span>File Queue ({files?.length})</span>
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-biometric-pulse" />
          <span>Ready for encryption</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {files?.map((file, index) => {
            const fileIcon = getFileIcon(file?.name);
            const fileStatus = getFileStatus(file?.id);
            
            return (
              <motion.div
                key={file?.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-elevation-1 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  {/* File Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center border border-border">
                      <Icon name={fileIcon?.icon} size={20} className={fileIcon?.color} />
                    </div>
                    {fileStatus?.status === 'completed' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-success-foreground" />
                      </div>
                    )}
                    {fileStatus?.status === 'processing' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center animate-spin">
                        <Icon name="Loader2" size={12} className="text-warning-foreground" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground truncate pr-2">
                        {file?.name}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatFileSize(file?.size)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            fileStatus?.status === 'completed' 
                              ? 'bg-success' 
                              : fileStatus?.status === 'processing' ?'bg-warning' :'bg-muted-foreground/30'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${fileStatus?.progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className={`
                          ${fileStatus?.status === 'completed' 
                            ? 'text-success' 
                            : fileStatus?.status === 'processing' ?'text-warning' :'text-muted-foreground'
                          }
                        `}>
                          {fileStatus?.status === 'completed' 
                            ? 'Encrypted successfully' 
                            : fileStatus?.status === 'processing' ?'Encrypting...' :'Pending encryption'
                          }
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round(fileStatus?.progress)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {fileStatus?.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={16}
                        className="text-success hover:text-success/80"
                      >
                        Download
                      </Button>
                    )}
                    
                    {fileStatus?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        iconSize={16}
                        onClick={() => onRemoveFile(file?.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                {/* File metadata */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Type: {file?.name?.split('.')?.pop()?.toUpperCase()}</span>
                      <span>Modified: {new Date(file.lastModified)?.toLocaleDateString()}</span>
                    </div>
                    {fileStatus?.status === 'completed' && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span className="text-success">AES-256 Encrypted</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {/* Queue Summary */}
      <motion.div
        className="bg-surface border border-border rounded-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
              <span className="text-muted-foreground">
                Pending: {files?.filter(f => !processingFiles?.includes(f?.id) && !completedFiles?.includes(f?.id))?.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-biometric-pulse" />
              <span className="text-warning">Processing: {processingFiles?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-success">Completed: {completedFiles?.length}</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Total size: {formatFileSize(files?.reduce((acc, file) => acc + file?.size, 0))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileQueue;