import React from 'react';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    const content = e.target.anecdote.value;
    e.preventDefault();
    e.target.anecdote.value = '';
    this.props.createNewAnecdote(content);
    const notification = 'You added: \'' + content + '\'';
    this.props.displayNotification(notification, 5000);
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createNewAnecdote: createNewAnecdote,
  displayNotification: displayNotification
};
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
