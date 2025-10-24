import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityTable = ({ activities }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/20 text-success';
      case 'processing': return 'bg-warning/20 text-warning';
      case 'failed': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return 'FileText';
      case 'file': return 'FolderLock';
      case 'decrypt': return 'Unlock';
      default: return 'Shield';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest encryption operations</p>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Operation</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Timestamp</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity, index) => (
              <motion.tr
                key={activity?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border hover:bg-muted/20 transition-colors animate-micro"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(activity?.type)} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{activity?.name}</div>
                      <div className="text-xs text-muted-foreground">{activity?.size}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
                    {activity?.algorithm}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {activity?.timestamp}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                    {activity?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Download" iconSize={14} />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={14} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentActivityTable;