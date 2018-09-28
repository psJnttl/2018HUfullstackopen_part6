const initialMessage = 'Watch this space for notifications';

const notificationReducer = (state=initialMessage, action) => {
  if (action.type === 'REMOVE_NOTIFICATION') {
    return ' ';
  }
  else if (action.type === 'SHOW_NOTIFICATION') {
    return action.notification;
  }
  return state;
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification: notification
  };
};

export default notificationReducer;
