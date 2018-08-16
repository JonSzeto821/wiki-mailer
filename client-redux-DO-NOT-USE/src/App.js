import React, { Component } from 'react';
import Form from './components/form';
import './App.css';

class App extends Component {
  state = {
    users: [],
    emails: [],
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));

    fetch('/emails')
      .then(res => res.json())
      .then(emails => this.setState({ emails }));
  }



  render() {
    return (
      <div className="App">
        <h1>Client with Redux</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <h3>Emails rendered from server</h3>
        {this.state.emails.map(email =>
          <div key={email.id}>{email.email}</div>
        )}
        <Form />

      </div>
    );
  }
}

export default App;
