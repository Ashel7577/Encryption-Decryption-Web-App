import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityTrustBadges = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Secured',
      description: '256-bit encryption',
      color: 'text-success'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'GDPR compliant',
      color: 'text-accent'
    },
    {
      id: 3,
      icon: 'Award',
      title: 'ISO 27001',
      description: 'Security certified',
      color: 'text-warning'
    },
    {
      id: 4,
      icon: 'CheckCircle',
      title: 'WebAuthn',
      description: 'Biometric ready',
      color: 'text-primary'
    }
  ];

  const securityFeatures = [
    {
      icon: 'Fingerprint',
      text: 'Biometric Authentication'
    },
    {
      icon: 'Key',
      text: 'End-to-End Encryption'
    },
    {
      icon: 'Eye',
      text: 'Zero-Knowledge Architecture'
    },
    {
      icon: 'Clock',
      text: 'Session Timeout Protection'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {trustBadges?.map((badge, index) => (
          <motion.div
            key={badge?.id}
            className="flex flex-col items-center p-4 bg-surface border border-border rounded-lg hover:border-accent/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-full bg-current/10 flex items-center justify-center mb-2 ${badge?.color}`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            >
              <Icon name={badge?.icon} size={16} className={badge?.color} />
            </motion.div>
            <h4 className="text-xs font-medium text-foreground text-center">{badge?.title}</h4>
            <p className="text-xs text-muted-foreground text-center">{badge?.description}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* Security Features List */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
          Advanced Security Features
        </h3>
        
        {securityFeatures?.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface/50 transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <motion.div
              className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              <Icon name={feature?.icon} size={12} className="text-accent" />
            </motion.div>
            <span className="text-xs text-muted-foreground">{feature?.text}</span>
          </motion.div>
        ))}
      </motion.div>
      {/* Compliance Badges */}
      <motion.div
        className="flex items-center justify-center space-x-6 pt-4 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {['SOC2', 'HIPAA', 'PCI DSS']?.map((compliance, index) => (
          <motion.div
            key={compliance}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-8 h-8 bg-muted/20 rounded border border-muted flex items-center justify-center mb-1">
              <Icon name="Award" size={12} className="text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{compliance}</span>
          </motion.div>
        ))}
      </motion.div>
      {/* Security Notice */}
      <motion.div
        className="bg-accent/5 border border-accent/20 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
          </motion.div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Secure Session</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your connection is encrypted and protected. We never store your biometric data on our servers.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityTrustBadges;