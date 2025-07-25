// src/api/supervisorAPI.js
import axiosInstance from './axiosInstance';

/**
 * Supervisor API calls
 * Comprehensive system administration and monitoring
 */

// ===== SUPERVISOR DASHBOARD =====

export const getSupervisorDashboard = async () => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/dashboard');
    return response.data;
  } catch (error) {
    console.error('❌ Get supervisor dashboard error:', error.response?.data || error.message);
    throw error;
  }
};

export const getSystemHealth = async () => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/system-health');
    return response.data;
  } catch (error) {
    console.error('❌ Get system health error:', error.response?.data || error.message);
    throw error;
  }
};

export const getSystemConfig = async () => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/system-config');
    return response.data;
  } catch (error) {
    console.error('❌ Get system config error:', error.response?.data || error.message);
    throw error;
  }
};

export const getDatabaseStats = async () => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/database-stats');
    return response.data;
  } catch (error) {
    console.error('❌ Get database stats error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== USER MANAGEMENT =====

export const getAllUsersForSupervisor = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/users', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get all users for supervisor error:', error.response?.data || error.message);
    throw error;
  }
};

export const createStaffUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/staff/supervisor/staff', userData);
    return response.data;
  } catch (error) {
    console.error('❌ Create staff user error:', error.response?.data || error.message);
    throw error;
  }
};

export const forceUpdateUserRole = async (userId, newRole) => {
  try {
    const response = await axiosInstance.put(`/staff/supervisor/users/${userId}/role`, {
      new_role: newRole
    });
    return response.data;
  } catch (error) {
    console.error('❌ Force update user role error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== SYSTEM ANALYTICS =====

export const getSystemAnalytics = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/analytics', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get system analytics error:', error.response?.data || error.message);
    throw error;
  }
};

export const getBusinessAnalytics = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/admin/analytics/business', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get business analytics error:', error.response?.data || error.message);
    throw error;
  }
};



// ===== AUDIT TRAIL =====

export const getSupervisorAuditLogs = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/staff/supervisor/audit-logs', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get supervisor audit logs error:', error.response?.data || error.message);
    throw error;
  }
};

// Admin audit logs function (comprehensive access)
export const getAuditLogs = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/admin/audit-logs', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get audit logs error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== SYSTEM SETTINGS =====

export const getAllSystemSettings = async () => {
  try {
    const response = await axiosInstance.get('/admin/settings');
    return response.data;
  } catch (error) {
    console.error('❌ Get all system settings error:', error.response?.data || error.message);
    throw error;
  }
};

export const getSystemSetting = async (key) => {
  try {
    const response = await axiosInstance.get(`/admin/settings/${key}`);
    return response.data;
  } catch (error) {
    console.error('❌ Get system setting error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateSystemSetting = async (key, value, description = null, isPublic = false) => {
  try {
    const response = await axiosInstance.put(`/admin/settings/${key}`, {
      value,
      description,
      is_public: isPublic
    });
    return response.data;
  } catch (error) {
    console.error('❌ Update system setting error:', error.response?.data || error.message);
    throw error;
  }
};

export const createSystemSetting = async (key, value, description = null, isPublic = false) => {
  try {
    const response = await axiosInstance.post('/admin/settings', {
      key,
      value,
      description,
      is_public: isPublic
    });
    return response.data;
  } catch (error) {
    console.error('❌ Create system setting error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteSystemSetting = async (key) => {
  try {
    const response = await axiosInstance.delete(`/admin/settings/${key}`);
    return response.data;
  } catch (error) {
    console.error('❌ Delete system setting error:', error.response?.data || error.message);
    throw error;
  }
};

export const resetSettingToDefault = async (key) => {
  try {
    const response = await axiosInstance.post(`/admin/settings/${key}/reset`);
    return response.data;
  } catch (error) {
    console.error('❌ Reset setting to default error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== SYSTEM MAINTENANCE =====

export const triggerSystemMaintenance = async (maintenanceData) => {
  try {
    const response = await axiosInstance.post('/staff/supervisor/system-maintenance', maintenanceData);
    return response.data;
  } catch (error) {
    console.error('❌ Trigger system maintenance error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== ROLE MANAGEMENT =====

export const getRoleManagementDashboard = async () => {
  try {
    const response = await axiosInstance.get('/admin/role-management/dashboard');
    return response.data;
  } catch (error) {
    console.error('❌ Get role management dashboard error:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllUsersForRoleManagement = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get all users for role management error:', error.response?.data || error.message);
    throw error;
  }
};

export const changeUserRoleDirect = async (userId, newRole, reason = '') => {
  try {
    const response = await axiosInstance.put('/admin/role-management/change-role', {
      user_id: userId,
      new_role: newRole,
      reason: reason,
      bypass_approval: true
    });
    return response.data;
  } catch (error) {
    console.error('❌ Change user role direct error:', error.response?.data || error.message);
    throw error;
  }
};



// ===== ADDITIONAL AUDIT FUNCTIONS =====

export const getAuditLogStatistics = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/admin/audit-logs/statistics', { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get audit log statistics error:', error.response?.data || error.message);
    throw error;
  }
};

export const getAuditLogDetail = async (logId) => {
  try {
    const response = await axiosInstance.get(`/admin/audit-logs/${logId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Get audit log detail error:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserActivityLogs = async (userId, params = {}) => {
  try {
    const response = await axiosInstance.get(`/admin/audit-logs/user/${userId}`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get user activity logs error:', error.response?.data || error.message);
    throw error;
  }
};

export const getTableActivityLogs = async (tableName, params = {}) => {
  try {
    const response = await axiosInstance.get(`/admin/audit-logs/table/${tableName}`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Get table activity logs error:', error.response?.data || error.message);
    throw error;
  }
};

export const exportAuditLogs = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/admin/audit-logs/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('❌ Export audit logs error:', error.response?.data || error.message);
    throw error;
  }
};

export const cleanOldAuditLogs = async (daysToKeep = 90) => {
  try {
    const response = await axiosInstance.delete('/admin/audit-logs/cleanup', {
      data: { days_to_keep: daysToKeep }
    });
    return response.data;
  } catch (error) {
    console.error('❌ Clean old audit logs error:', error.response?.data || error.message);
    throw error;
  }
};

// ===== SYSTEM UTILITIES =====

export const formatSystemUptime = (seconds) => {
  if (!seconds || typeof seconds !== 'number' || isNaN(seconds)) {
    return 'N/A';
  }

  const totalSeconds = Math.floor(seconds);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export const formatMemoryUsage = (bytes) => {
  if (!bytes || typeof bytes !== 'number' || isNaN(bytes)) {
    return 'N/A';
  }

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const getSystemHealthStatus = (systemHealth, serverInfo) => {
  if (!systemHealth || !serverInfo) return 'unknown';

  // Check if system health has health_level from backend
  if (systemHealth.health_level) {
    return systemHealth.health_level;
  }

  const memoryUsage = serverInfo.memory_usage;
  const uptime = serverInfo.uptime;
  const responseTime = systemHealth.response_time_ms || 0;

  // Calculate memory usage percentage
  const memoryPercent = memoryUsage ? (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100 : 0;

  // Determine health status based on multiple factors
  if (systemHealth.status === 'healthy') {
    if (responseTime < 100 && memoryPercent < 70 && uptime > 3600) {
      return 'excellent';
    } else if (responseTime < 500 && memoryPercent < 85) {
      return 'good';
    } else if (responseTime < 1000 && memoryPercent < 95) {
      return 'warning';
    } else {
      return 'critical';
    }
  } else {
    return 'critical';
  }
};
