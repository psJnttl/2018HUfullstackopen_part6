import React from 'react';
import { connect } from 'react-redux';

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    };
    const { notification } = this.props;
    return (
      <div style={style}>
        {notification}
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return { notification: state.notification };
};
const ConnectedNotification = connect(mapDispatchToProps)(Notification);
export default ConnectedNotification;
