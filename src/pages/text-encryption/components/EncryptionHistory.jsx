import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EncryptionHistory = ({ history, onRestore, onClear }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const mockHistory = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000),
      algorithm: 'AES-256',
      inputLength: 245,
      outputLength: 344,
      preview: 'U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIipRkwB0K1Y96Qsv2Lm+31cmzaAILwyt...',
      status: 'success'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 7200000),
      algorithm: 'RSA-2048',
      inputLength: 156,
      outputLength: 512,
      preview: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7ssARL...',
      status: 'success'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 10800000),
      algorithm: 'ChaCha20',
      inputLength: 89,
      outputLength: 128,
      preview: 'ChaCha20Poly1305:nonce:aGVsbG93b3JsZA==:ciphertext:dGVzdA==...',
      status: 'success'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  const getAlgorithmColor = (algorithm) => {
    switch (algorithm) {
      case 'AES-256': return 'text-primary';
      case 'RSA-2048': return 'text-success';
      case 'ChaCha20': return 'text-warning';
      default: return 'text-accent';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="bg-card border border-border rounded-xl p-6 shadow-elevation-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center"
          >
            <Icon name="History" size={20} className="text-secondary-foreground" />
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Encryption History</h2>
            <p className="text-sm text-muted-foreground">Recent encryption operations</p>
          </div>
        </div>

        {mockHistory?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            iconName="Trash2"
            iconPosition="left"
            className="text-muted-foreground hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* History List */}
      <div className="space-y-3">
        <AnimatePresence>
          {mockHistory?.map((item, index) => (
            <motion.div
              key={item?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all duration-200
                ${selectedItem === item?.id 
                  ? 'border-accent bg-accent/5' :'border-border hover:border-muted hover:bg-muted/20'
                }
              `}
              onClick={() => setSelectedItem(selectedItem === item?.id ? null : item?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item?.status === 'success' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getAlgorithmColor(item?.algorithm)}`}>
                        {item?.algorithm}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(item?.timestamp)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item?.inputLength} → {item?.outputLength} chars
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onRestore?.(item);
                    }}
                    iconName="RotateCcw"
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <motion.div
                    animate={{ rotate: selectedItem === item?.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedItem === item?.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">
                          Encrypted Output Preview
                        </label>
                        <div className="mt-1 p-3 bg-surface rounded border font-mono text-xs text-foreground break-all">
                          {item?.preview}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span className="ml-2 text-foreground">
                            {item?.timestamp?.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className={`ml-2 font-medium ${
                            item?.status === 'success' ? 'text-success' : 'text-destructive'
                          }`}>
                            {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRestore?.(item)}
                          iconName="Download"
                          iconPosition="left"
                        >
                          Restore
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard?.writeText(item?.preview)}
                          iconName="Copy"
                          iconPosition="left"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Empty State */}
      {mockHistory?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mb-4"
          >
            <Icon name="History" size={20} className="text-muted-foreground" />
          </motion.div>
          <p className="text-sm font-medium text-muted-foreground mb-1">No History Available</p>
          <p className="text-xs text-muted-foreground">
            Your encryption operations will appear here
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EncryptionHistory;