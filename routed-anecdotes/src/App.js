import React from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import { Container, Grid, Image, Table } from 'semantic-ui-react';

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled selectable >
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={'/anecdotes/' + anecdote.id}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div>
        <h3>{anecdote.content} by {anecdote.author}</h3>
        has {anecdote.votes} votes<br/>
        for more information see: <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

const About = () => (
  <Grid  columns={2} padded='vertically'>
    <Grid.Row>
      <Grid.Column width={10}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is &quot;a story with a point.&quot;</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={5} verticalAlign='middle'>
        <Image size='small' title='Frederick P. Brooks, Jr.' src='http://sysrun.haifa.il.ibm.com/ibm/history/exhibits/builders/images/5406FXB.jpg' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      author: '',
      info: ''
    };
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
    this.props.history.push('/');
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    );

  }
}

const notificationStyle = {
  color: '#228822',
  border: '2px solid #228822',
  borderRadius: 6,
  padding: 6,
  margin: '8px 4px 4px 4px'
};

const Notification = ({ note }) => {
  if (note) {
    return (
      <div style={notificationStyle}>{note}</div>
    );
  }
  else return null;
};

const activeNavStyle = {
  fontWeight: 'bold',
  background: '#d2d2d2',
  textDecoration: 'none',
  borderRadius: 6
};

const navStyle = {
  background: '#e8e8e8',
  textDecoration: 'none',
  padding: 4,
  borderRadius: 6
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    };
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'New anecdote \'' + anecdote.content + '\' created.'
    });
    setTimeout( () => { this.setState({ notification: '' }); }, 10000 );
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id);

  vote = (id) => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a);

    this.setState({ anecdotes });
  }

  render() {
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <BrowserRouter>
          <div>
            <div style={navStyle}>
              <NavLink exact to='/' activeStyle={activeNavStyle} style={navStyle}>anecdotes</NavLink> &nbsp;
              <NavLink exact to='/create' activeStyle={activeNavStyle} style={navStyle}>create new</NavLink> &nbsp;
              <NavLink exact to='/about' activeStyle={activeNavStyle} style={navStyle}>about</NavLink>
            </div>
            <Notification note={this.state.notification}/>
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
            <Route path='/create' render={({ history }) => <CreateNew addNew={this.addNew} history={history} /> } />
            <Route
              exact path='/anecdotes/:id'
              render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Route path='/about' render={() => <About />} />
          </div>
        </BrowserRouter>
        <Footer />
      </Container>
    );
  }
}

export default App;
