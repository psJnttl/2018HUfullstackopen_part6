import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { Provider } from 'react-redux';
import Filter from './components/Filter';

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Provider store={this.props.store} >
          <Notification />
        </Provider>
        <Provider store={this.props.store} >
          <Filter  />
        </Provider>

        <AnecdoteList store={this.props.store} />
        <Provider store={this.props.store}>
          <AnecdoteForm />
        </Provider>
      </div>
    );
  }
}

export default App;
