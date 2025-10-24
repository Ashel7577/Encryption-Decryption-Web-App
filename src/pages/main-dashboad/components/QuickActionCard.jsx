import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  iconColor, 
  bgGradient, 
  onClick, 
  stats 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl ${bgGradient} p-6 cursor-pointer group animate-morphic`}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/20"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/20"></div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${iconColor} flex items-center justify-center shadow-elevation-1 group-hover:scale-110 transition-transform duration-300`}>
            <Icon name={icon} size={24} className="text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <div className="text-2xl font-bold text-white">{stats}</div>
            <div className="text-xs text-white/70">Operations</div>
          </motion.div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 border-white/30 hover:border-white/50"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Get Started
        </Button>
      </div>
      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

export default QuickActionCard;