import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { connect } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';
import { showNotification } from './reducers/notificationReducer';


class App extends React.Component {
  componentDidMount = async () => {
    try {
      const response = await anecdoteService.getAll();
      this.props.initAnecdotes(response);
    } catch (error) {
      if (error.message === 'Network Error') {
        this.props.showNotification('Please check that your server is on.');
      }
    }
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
  initAnecdotes: initAnecdotes,
  showNotification: showNotification
};
const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default ConnectedApp;
