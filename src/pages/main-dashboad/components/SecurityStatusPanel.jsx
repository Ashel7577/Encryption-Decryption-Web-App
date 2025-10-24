import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityStatusPanel = ({ securityStatus }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-xl p-6 shadow-elevation-1"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Status</h3>
          <p className="text-sm text-muted-foreground">System security overview</p>
        </div>
        <div className="w-3 h-3 bg-success rounded-full animate-biometric-pulse"></div>
      </div>
      {/* Biometric Status */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="Fingerprint" size={20} className="text-success" />
            </div>
            <div>
              <div className="font-medium text-foreground">Biometric Active</div>
              <div className="text-xs text-muted-foreground">Fingerprint verified</div>
            </div>
          </div>
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground">Session Secure</div>
              <div className="text-xs text-muted-foreground">End-to-end encrypted</div>
            </div>
          </div>
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>
      </div>
      {/* Security Metrics */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Encryption Strength</span>
          <span className="text-sm font-medium text-foreground">AES-256</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-2 bg-gradient-to-r from-success to-primary rounded-full"
          />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Activity"
          iconPosition="left"
          iconSize={16}
        >
          View Security Logs
        </Button>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
        >
          Security Settings
        </Button>
      </div>
    </motion.div>
  );
};

export default SecurityStatusPanel;