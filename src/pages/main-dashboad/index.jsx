import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import QuickActionCard from './components/QuickActionCard';
import SecurityMetricsCard from './components/SecurityMetricsCard';
import RecentActivityTable from './components/RecentActivityTable';
import SecurityStatusPanel from './components/SecurityStatusPanel';
import ThemeToggle from './components/ThemeToggle';
import NotificationPanel from './components/NotificationPanel';
import AnimatedBackground from './components/AnimatedBackground';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@cryptovault.com"
  });

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      name: "Financial_Report_Q4.pdf",
      type: "file",
      algorithm: "AES-256",
      size: "2.4 MB",
      timestamp: "2 minutes ago",
      status: "completed"
    },
    {
      id: 2,
      name: "Personal_Notes.txt",
      type: "text",
      algorithm: "RSA-2048",
      size: "156 KB",
      timestamp: "15 minutes ago",
      status: "processing"
    },
    {
      id: 3,
      name: "Contract_Document.docx",
      type: "file",
      algorithm: "AES-256",
      size: "890 KB",
      timestamp: "1 hour ago",
      status: "completed"
    },
    {
      id: 4,
      name: "Database_Backup.sql",
      type: "decrypt",
      algorithm: "ChaCha20",
      size: "45.2 MB",
      timestamp: "3 hours ago",
      status: "failed"
    },
    {
      id: 5,
      name: "API_Keys.json",
      type: "text",
      algorithm: "AES-256",
      size: "12 KB",
      timestamp: "5 hours ago",
      status: "completed"
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Encryption Complete",
      message: "Financial_Report_Q4.pdf has been successfully encrypted",
      timestamp: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      title: "Security Alert",
      message: "Unusual login attempt detected from new device",
      timestamp: "1 hour ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "System Update",
      message: "New encryption algorithms available",
      timestamp: "3 hours ago",
      read: true
    }
  ];

  // Security metrics data
  const securityMetrics = [
    {
      title: "Total Encryptions",
      value: "1,247",
      change: "+12%",
      icon: "Lock",
      trend: "up",
      color: "bg-primary"
    },
    {
      title: "Active Sessions",
      value: "3",
      change: "+1",
      icon: "Users",
      trend: "up",
      color: "bg-success"
    },
    {
      title: "Security Score",
      value: "98%",
      change: "+2%",
      icon: "Shield",
      trend: "up",
      color: "bg-accent"
    },
    {
      title: "Data Processed",
      value: "2.4 GB",
      change: "+8%",
      icon: "Database",
      trend: "up",
      color: "bg-warning"
    }
  ];

  const quickActions = [
    {
      title: "Text Encryption",
      description: "Encrypt sensitive text messages and documents with advanced algorithms for maximum security.",
      icon: "FileText",
      iconColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      bgGradient: "bg-gradient-to-br from-blue-600 to-blue-700",
      stats: "847",
      onClick: () => navigate('/text-encryption')
    },
    {
      title: "File Encryption",
      description: "Secure your files with military-grade encryption. Support for multiple file formats and batch processing.",
      icon: "FolderLock",
      iconColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      bgGradient: "bg-gradient-to-br from-emerald-600 to-emerald-700",
      stats: "324",
      onClick: () => navigate('/file-encryption')
    },
    {
      title: "Decryption Center",
      description: "Unified decryption hub for all your encrypted data. Fast and secure decryption with biometric verification.",
      icon: "Unlock",
      iconColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      bgGradient: "bg-gradient-to-br from-purple-600 to-purple-700",
      stats: "76",
      onClick: () => navigate('/decryption-center')
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen relative">
      {/* Advanced Animated Background */}
      <AnimatedBackground />
      {/* Main Content with backdrop blur for better readability */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-background/20">
        <Header user={user} onLogout={handleLogout} />
        <main className="pt-16">
          {/* Hero Section with Glass Morphism */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-8"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="mb-6 lg:mb-0">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl lg:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                  >
                    Welcome back, {user?.name?.split(' ')?.[0]}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                  >
                    Your secure encryption dashboard is ready. All systems operational.
                  </motion.p>
                </div>

                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <NotificationPanel notifications={notifications} />
                  <Button
                    variant="outline"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="backdrop-blur-md bg-surface/30 border-accent/20 hover:bg-surface/50"
                  >
                    Settings
                  </Button>
                </div>
              </div>

              {/* Enhanced Security Status Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden bg-gradient-to-r from-success/20 via-accent/15 to-primary/20 border border-success/30 rounded-xl p-6 mb-8 backdrop-blur-md"
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(16, 185, 129, 0.3)',
                          '0 0 40px rgba(16, 185, 129, 0.5)',
                          '0 0 20px rgba(16, 185, 129, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon name="ShieldCheck" size={24} className="text-success" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">System Secure</h3>
                      <p className="text-sm text-muted-foreground">Biometric authentication active • End-to-end encryption enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-success rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm text-success font-medium">Online</span>
                    <div className="h-6 w-px bg-border mx-2" />
                    <span className="text-xs text-muted-foreground">Last scan: 2 min ago</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Main Content with Glass Cards */}
          <section className="px-6 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - Quick Actions & Activity */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Quick Actions with enhanced styling */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2"
                    >
                      <Icon name="Zap" size={24} className="text-accent" />
                      <span>Quick Actions</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {quickActions?.map((action, index) => (
                        <motion.div
                          key={action?.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          <div className="relative">
                            <QuickActionCard 
                              {...action} 
                              className="backdrop-blur-md bg-surface/30 border-accent/10 hover:bg-surface/50 hover:border-accent/30 transition-all duration-300"
                            />
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Security Metrics with glass effect */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2"
                    >
                      <Icon name="BarChart3" size={24} className="text-success" />
                      <span>Security Overview</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {securityMetrics?.map((metric, index) => (
                        <motion.div
                          key={metric?.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="backdrop-blur-md bg-surface/30 rounded-xl border border-accent/10 hover:border-accent/30 transition-all duration-300"
                        >
                          <SecurityMetricsCard {...metric} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity with enhanced table */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2"
                    >
                      <Icon name="Activity" size={24} className="text-warning" />
                      <span>Recent Activity</span>
                    </motion.h2>
                    <div className="backdrop-blur-md bg-surface/30 rounded-xl border border-accent/10 overflow-hidden">
                      <RecentActivityTable activities={recentActivities} />
                    </div>
                  </div>
                </div>

                {/* Right Column - Security Status with glass effect */}
                <div className="lg:col-span-1">
                  <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2"
                  >
                    <Icon name="Shield" size={24} className="text-primary" />
                    <span>Security Center</span>
                  </motion.h2>
                  <div className="backdrop-blur-md bg-surface/30 rounded-xl border border-accent/10">
                    <SecurityStatusPanel securityStatus={{
                      overallScore: 98,
                      threats: 0,
                      vulnerabilities: 2,
                      lastScan: "2 hours ago",
                      status: "secure"
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Footer with creator credit */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-8 backdrop-blur-md bg-surface/20 border-t border-accent/20"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="Zap" size={16} className="text-accent" />
                  </motion.div>
                  <span className="text-sm text-muted-foreground">
                    Powered by military-grade encryption • {new Date()?.getFullYear()} CryptoVault
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" iconName="HelpCircle" iconSize={16}>
                    Help
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MessageSquare" iconSize={16}>
                    Support
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download" iconSize={16}>
                    Export Data
                  </Button>
                </div>
              </div>
              
              {/* Creator Credit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 pt-4 border-t border-accent/10 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  Created by{' '}
                  <motion.span
                    className="text-accent font-medium bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    KW Nehemiya Ashel
                  </motion.span>
                </p>
              </motion.div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
