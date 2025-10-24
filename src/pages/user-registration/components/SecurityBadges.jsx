import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const badges = [
    {
      id: 'ssl',
      name: 'SSL Secured',
      description: '256-bit encryption',
      icon: 'Lock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'aes',
      name: 'AES-256',
      description: 'Military grade encryption',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliant',
      description: 'Privacy protected',
      icon: 'UserCheck',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'iso',
      name: 'ISO 27001',
      description: 'Security certified',
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Enterprise Security</h3>
          <p className="text-sm text-muted-foreground">
            Your data is protected by industry-leading security standards
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {badges?.map((badge, index) => (
            <motion.div
              key={badge?.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className={`
                p-4 rounded-lg border border-border hover:border-muted-foreground
                transition-all duration-200 cursor-pointer ${badge?.bgColor}
              `}
            >
              <div className="text-center space-y-2">
                <div className={`w-8 h-8 ${badge?.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                  <Icon name={badge?.icon} size={16} className={badge?.color} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${badge?.color}`}>{badge?.name}</p>
                  <p className="text-xs text-muted-foreground">{badge?.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="text-success" />
            <span>All data encrypted end-to-end</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityBadges;