import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, removeNotification } from '../reducers/notificationReducer';
import Filter from './Filter';
import { connect } from 'react-redux';

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.voteAnecdote(anecdote.id);
    const notification = 'You voted for: \'' + anecdote.content + '\'';
    this.props.showNotification(notification);
    setTimeout(() => { this.props.removeNotification(); }, 5000);
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter  />
        {this.props.anecdotesToShow.map(anecdote =>
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

const filterAndSortAnecdotes = (anecdotes, filter) => {
  const filteredAnecdotes = anecdotes.filter( (a) => {
    let index = a.content.toLowerCase().indexOf(filter.toLowerCase());
    return -1 === index ? false : true;
  });
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  return sortedAnecdotes;
};

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filterAndSortAnecdotes(state.anecdotes, state.filter)
  };
};
const mapDispatchToProps = {
  voteAnecdote: voteAnecdote,
  showNotification: showNotification,
  removeNotification: removeNotification
};
const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default connectedAnecdoteList;
