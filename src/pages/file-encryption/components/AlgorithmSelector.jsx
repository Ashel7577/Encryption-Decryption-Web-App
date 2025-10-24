import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }) => {
  const [showComparison, setShowComparison] = useState(false);

  const algorithms = [
    {
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
    },
    {
      id: 'rsa-2048',
      name: 'RSA-2048',
      description: 'Rivest-Shamir-Adleman with 2048-bit key',
      strength: 'High Security',
      speed: 'Moderate',
      compatibility: 'Standard',
      icon: 'Key',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      recommended: false,
      details: {
        keySize: '2048-bit',
        blockSize: 'Variable',
        rounds: 'N/A',
        performance: 'Good',
        security: 'High'
      }
    },
    {
      id: 'chacha20',
      name: 'ChaCha20',
      description: 'Modern stream cipher with Poly1305 authentication',
      strength: 'High Security',
      speed: 'Very Fast',
      compatibility: 'Modern',
      icon: 'Zap',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30',
      recommended: false,
      details: {
        keySize: '256-bit',
        blockSize: '64-byte',
        rounds: '20',
        performance: 'Excellent',
        security: 'High'
      }
    }
  ];

  const handleAlgorithmSelect = (algorithm) => {
    onAlgorithmChange(algorithm);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-accent" />
          <span>Encryption Algorithm</span>
        </h3>
        
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-muted/50"
        >
          <Icon name="BarChart3" size={16} />
          <span>Compare</span>
        </button>
      </div>
      <div className="grid gap-4">
        {algorithms?.map((algorithm, index) => (
          <motion.div
            key={algorithm?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${selectedAlgorithm?.id === algorithm?.id
                ? `${algorithm?.borderColor} ${algorithm?.bgColor} shadow-elevation-2`
                : 'border-border hover:border-accent/30 hover:bg-accent/5'
              }
            `}
            onClick={() => handleAlgorithmSelect(algorithm)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center border
                ${selectedAlgorithm?.id === algorithm?.id
                  ? `${algorithm?.bgColor} ${algorithm?.borderColor}`
                  : 'bg-surface border-border'
                }
              `}>
                <Icon 
                  name={algorithm?.icon} 
                  size={20} 
                  className={selectedAlgorithm?.id === algorithm?.id ? algorithm?.color : 'text-muted-foreground'} 
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">{algorithm?.name}</h4>
                  {algorithm?.recommended && (
                    <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full border border-accent/30">
                      Recommended
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {algorithm?.description}
                </p>

                <div className="flex items-center space-x-6 text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} className="text-success" />
                    <span className="text-muted-foreground">Strength:</span>
                    <span className="text-foreground font-medium">{algorithm?.strength}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={12} className="text-warning" />
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="text-foreground font-medium">{algorithm?.speed}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Globe" size={12} className="text-accent" />
                    <span className="text-muted-foreground">Support:</span>
                    <span className="text-foreground font-medium">{algorithm?.compatibility}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedAlgorithm?.id === algorithm?.id
                    ? `${algorithm?.borderColor} ${algorithm?.bgColor}`
                    : 'border-border'
                  }
                `}>
                  {selectedAlgorithm?.id === algorithm?.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-2 h-2 rounded-full ${algorithm?.color?.replace('text-', 'bg-')}`}
                    />
                  )}
                </div>
              </div>
            </div>

            {selectedAlgorithm?.id === algorithm?.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-border/50"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
                  {Object.entries(algorithm?.details)?.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-muted-foreground capitalize mb-1">{key?.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="font-medium text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Algorithm Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-modal"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Algorithm Comparison</h3>
                <button
                  onClick={() => setShowComparison(false)}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} className="text-muted-foreground" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Feature</th>
                      {algorithms?.map((alg) => (
                        <th key={alg?.id} className="text-center py-3 px-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${alg?.bgColor} ${alg?.borderColor} border`}>
                              <Icon name={alg?.icon} size={16} className={alg?.color} />
                            </div>
                            <span className="text-sm font-medium text-foreground">{alg?.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(algorithms?.[0]?.details)?.map((feature) => (
                      <tr key={feature} className="border-b border-border/50">
                        <td className="py-3 px-4 text-sm text-muted-foreground capitalize">
                          {feature?.replace(/([A-Z])/g, ' $1')}
                        </td>
                        {algorithms?.map((alg) => (
                          <td key={alg?.id} className="py-3 px-4 text-center text-sm text-foreground">
                            {alg?.details?.[feature]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Selected Algorithm Summary */}
      {selectedAlgorithm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedAlgorithm?.bgColor} ${selectedAlgorithm?.borderColor} border`}>
              <Icon name={selectedAlgorithm?.icon} size={16} className={selectedAlgorithm?.color} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Selected: {selectedAlgorithm?.name}</span>
                <div className="w-2 h-2 bg-success rounded-full animate-biometric-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">{selectedAlgorithm?.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AlgorithmSelector;