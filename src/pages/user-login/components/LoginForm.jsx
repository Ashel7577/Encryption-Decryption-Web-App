import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldFocus, setFieldFocus] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  const handleFocus = (field) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  };

  // Quick demo login function
  const handleDemoLogin = () => {
    const demoCredentials = {
      email: 'admin@cryptovault.com',
      password: 'SecurePass123!',
      rememberMe: false
    };
    setFormData(demoCredentials);
    onSubmit(demoCredentials);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Demo Login Notice */}
      <motion.div
        className="bg-accent/10 border border-accent/20 rounded-lg p-4 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-accent mb-1">Demo Access Available</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Use demo credentials or register to access the full CryptoVault experience
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoLogin}
              className="text-accent border-accent/30 hover:bg-accent/10"
              iconName="Play"
              iconSize={14}
            >
              Use Demo Login
            </Button>
          </div>
        </div>
      </motion.div>
      {/* Email Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            required
            className="pl-12 backdrop-blur-sm bg-surface/30 border-accent/20 focus:border-accent/50"
          />
          <motion.div
            className="absolute left-3 top-9 pointer-events-none"
            animate={{
              scale: fieldFocus?.email ? 1.1 : 1,
              color: fieldFocus?.email ? 'var(--color-accent)' : 'var(--color-muted-foreground)'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="Mail" size={18} />
          </motion.div>
        </div>
      </motion.div>
      {/* Password Field */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            required
            className="pl-12 pr-12 backdrop-blur-sm bg-surface/30 border-accent/20 focus:border-accent/50"
          />
          <motion.div
            className="absolute left-3 top-9 pointer-events-none"
            animate={{
              scale: fieldFocus?.password ? 1.1 : 1,
              color: fieldFocus?.password ? 'var(--color-accent)' : 'var(--color-muted-foreground)'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="Lock" size={18} />
          </motion.div>
          <motion.button
            type="button"
            className="absolute right-3 top-9 text-muted-foreground hover:text-accent transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </motion.button>
        </div>
      </motion.div>
      {/* Error Message */}
      {error && (
        <motion.div
          className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="AlertCircle" size={16} className="text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </motion.div>
      )}
      {/* Remember Me & Forgot Password */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          className="text-sm"
        />
        
        <motion.button
          type="button"
          className="text-sm text-accent hover:text-accent/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Forgot password?
        </motion.button>
      </motion.div>
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 backdrop-blur-sm shadow-lg"
        >
          {isLoading ? 'Signing In...' : 'Sign In Securely'}
        </Button>
      </motion.div>
      {/* Divider */}
      <motion.div
        className="relative flex items-center justify-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-accent/20"></div>
        </div>
        <div className="relative bg-background/80 backdrop-blur-sm px-4">
          <span className="text-sm text-muted-foreground">or continue with</span>
        </div>
      </motion.div>
      {/* Registration Link */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-sm text-muted-foreground">
          New to CryptoVault?{' '}
          <motion.a
            href="/user-registration"
            className="text-accent hover:text-accent/80 font-medium transition-colors bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create your secure account
          </motion.a>
        </p>
        
        <motion.div
          className="mt-3 text-xs text-muted-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>✨ Demo Credentials: admin@cryptovault.com / SecurePass123!</p>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;