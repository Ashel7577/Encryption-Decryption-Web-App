import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingWorkspace = ({ 
  isProcessing, 
  processingFiles, 
  completedFiles, 
  totalFiles, 
  onStartProcessing, 
  onPauseProcessing, 
  onCancelProcessing,
  selectedAlgorithm 
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [processingSpeed, setProcessingSpeed] = useState(0);

  useEffect(() => {
    if (isProcessing && processingFiles?.length > 0) {
      const interval = setInterval(() => {
        setCurrentFileIndex(prev => (prev + 1) % processingFiles?.length);
        setOverallProgress(prev => Math.min(prev + Math.random() * 2, 95));
        setProcessingSpeed(Math.random() * 50 + 25); // MB/s
        setEstimatedTime(prev => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, processingFiles]);

  useEffect(() => {
    if (completedFiles?.length === totalFiles && totalFiles > 0) {
      setOverallProgress(100);
      setEstimatedTime(0);
    }
  }, [completedFiles?.length, totalFiles]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProcessingStats = () => {
    return {
      completed: completedFiles?.length,
      processing: processingFiles?.length,
      pending: totalFiles - completedFiles?.length - processingFiles?.length,
      total: totalFiles
    };
  };

  const stats = getProcessingStats();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Cpu" size={20} className="text-accent" />
          <span>Processing Workspace</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          {!isProcessing && totalFiles > 0 && (
            <Button
              variant="default"
              onClick={onStartProcessing}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
            >
              Start Encryption
            </Button>
          )}
          
          {isProcessing && (
            <>
              <Button
                variant="outline"
                onClick={onPauseProcessing}
                iconName="Pause"
                iconSize={16}
              >
                Pause
              </Button>
              <Button
                variant="destructive"
                onClick={onCancelProcessing}
                iconName="Square"
                iconSize={16}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Main Processing Display */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <AnimatePresence mode="wait">
          {!isProcessing && totalFiles === 0 ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-4">
                <Icon name="Cpu" size={32} className="text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">Ready to Process</h4>
              <p className="text-muted-foreground">Add files to begin encryption</p>
            </motion.div>
          ) : (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Overall Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-foreground">
                    {isProcessing ? 'Encrypting Files...' : 'Encryption Complete'}
                  </h4>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</div>
                    <div className="text-xs text-muted-foreground">Overall Progress</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                  
                  {isProcessing && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              </div>

              {/* Processing Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success">{stats?.completed}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{stats?.processing}</div>
                  <div className="text-xs text-muted-foreground">Processing</div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{stats?.pending}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
                  <div className="text-xs text-muted-foreground">Total Files</div>
                </div>
              </div>

              {/* Current Processing Info */}
              {isProcessing && processingFiles?.length > 0 && (
                <motion.div
                  className="bg-surface border border-border rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                        <Icon name="Loader2" size={16} className="text-warning animate-spin" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Currently Processing</div>
                        <div className="text-xs text-muted-foreground">
                          File {currentFileIndex + 1} of {processingFiles?.length}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{processingSpeed?.toFixed(1)} MB/s</div>
                      <div className="text-xs text-muted-foreground">Processing Speed</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Estimated time remaining: {formatTime(estimatedTime)}</span>
                    <span>Algorithm: {selectedAlgorithm?.name || 'AES-256'}</span>
                  </div>
                </motion.div>
              )}

              {/* Security Information */}
              <motion.div
                className="bg-success/10 border border-success/30 rounded-lg p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} className="text-success" />
                  <div>
                    <div className="text-sm font-medium text-success">Secure Processing</div>
                    <div className="text-xs text-success/80">
                      All encryption is performed locally. Your files never leave your device.
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Processing Animation */}
      {isProcessing && (
        <motion.div
          className="fixed bottom-6 right-6 bg-card border border-border rounded-full p-4 shadow-modal"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="relative">
            <Icon name="Lock" size={24} className="text-accent" />
            <motion.div
              className="absolute inset-0 border-2 border-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProcessingWorkspace;