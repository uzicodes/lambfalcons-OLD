// Session timeout configuration
export const SESSION_CONFIG = {
  // Timeout settings (in minutes)
  TIMEOUT_MINUTES: 60,        // Total time before auto logout
  WARNING_MINUTES: 10,        // Time before logout to show warning
  
  // Activity events to monitor
  ACTIVITY_EVENTS: [
    'mousedown',
    'mousemove', 
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'keydown'
  ] as const,
  
  // Warning message settings
  WARNING_MESSAGE: {
    TITLE: '⚠️ Session Timeout Warning',
    DESCRIPTION: 'Your session will expire due to inactivity.',
    EXTEND_BUTTON: 'Stay Logged In',
    LOGOUT_BUTTON: 'Logout Now'
  }
} as const;

// Recommended timeout values for different use cases:
export const TIMEOUT_RECOMMENDATIONS = {
  HIGH_SECURITY: {
    name: 'High Security (Banking, Healthcare)',
    timeoutMinutes: 15,
    warningMinutes: 3
  },
  STANDARD_BUSINESS: {
    name: 'Standard Business Applications',
    timeoutMinutes: 30,
    warningMinutes: 5
  },
  GENERAL_WEB: {
    name: 'General Web Applications',
    timeoutMinutes: 60,
    warningMinutes: 10
  },
  CASUAL_APPS: {
    name: 'Casual Applications',
    timeoutMinutes: 120,
    warningMinutes: 15
  }
} as const; 