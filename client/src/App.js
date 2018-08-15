import React, { Component } from 'react';
import './App.css';
import UserForm from './components/form';

class App extends Component {
  state = {users: [] }

  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>WikiMailer</h1>
      {/*confirms data coming from server side*/}
        {/*(<ul>
                  {this.state.users.map(user => 
                    <li key={user.id}>{user.username}</li>
                  )}
                </ul>*/}
        <UserForm />
      </div>
    );
  }
}

export default App;
