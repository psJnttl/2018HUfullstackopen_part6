import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { connect } from 'react-redux';
import { loadAllAnecdotes } from './reducers/anecdoteReducer';

class App extends React.Component {
  componentDidMount = async () => {
    this.props.loadAllAnecdotes();
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadAllAnecdotes: loadAllAnecdotes
};
const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default ConnectedApp;
