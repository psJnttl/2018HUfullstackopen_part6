import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, removeNotification } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.store.dispatch(createAnecdote(content));
    e.target.anecdote.value = '';
    const notification = 'You added: \'' + content + '\'';
    this.props.store.dispatch(showNotification(notification));
    setTimeout( () => { this.props.store.dispatch(removeNotification()); }, 5000 );
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

export default AnecdoteForm;
