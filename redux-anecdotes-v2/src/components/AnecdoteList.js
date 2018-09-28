import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, removeNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.store.dispatch(voteAnecdote(anecdote.id));
    const notification = 'You voted for: \'' + anecdote.content + '\'';
    this.props.store.dispatch(showNotification(notification));
    setTimeout(() => { this.props.store.dispatch(removeNotification()); }, 5000);
  }
  render() {
    const { anecdotes, filter } = this.props.store.getState();
    const filteredAnecdotes = anecdotes.filter( (a) => {
      let index = a.content.toLowerCase().indexOf(filter.toLowerCase());
      return -1 === index ? false : true;
    });
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AnecdoteList;
