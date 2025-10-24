import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityMetricsCard = ({ title, value, change, icon, trend, color }) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-xl p-6 shadow-elevation-1 animate-morphic"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon name={icon} size={20} className="text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
          isPositive ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
        }`}>
          <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
          <span>{change}</span>
        </div>
      </div>
      <div className="space-y-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-2xl font-bold text-foreground"
        >
          {value}
        </motion.div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Progress Bar */}
      <div className="mt-4 w-full bg-muted rounded-full h-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.random() * 100}%` }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`h-1 rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
};

export default SecurityMetricsCard;