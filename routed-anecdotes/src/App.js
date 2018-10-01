import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button, Container, Form, Grid, Image, Menu, Message, Table } from 'semantic-ui-react';

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
    <Grid container divided='vertically' padded='vertically'>
      <Grid.Row>
        <h3>{anecdote.content} by {anecdote.author}</h3>
      </Grid.Row>
      <Grid.Row>
        has {anecdote.votes} votes
      </Grid.Row>
      <Grid.Row>
        for more information see: <a href={anecdote.info}>{anecdote.info}</a>
      </Grid.Row>
    </Grid>
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
    <hr />
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button positive>create</Button>
        </Form>
      </div>
    );

  }
}

const Notification = ({ note }) => {
  if (note) {
    return (
      <Message success >{note}</Message>
    );
  }
  else return null;
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
      notifon: '',
      activeNavi: 'anecdotes'
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
            <Menu >
              <Menu.Item link>
                <Link to='/' >anecdotes</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to='/create' >create new</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to='/about' >about</Link>
              </Menu.Item>
            </Menu>
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
