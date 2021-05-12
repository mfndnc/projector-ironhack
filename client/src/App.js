import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Projects from './components/Projects';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectDetails from './components/ProjectDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({ user });
  }

  render() {
    return (
      <div className="App" >
        <Navbar user={this.state.user} setUser={this.setUser} />
        {/* <Route exact path="/projects" component={Projects} /> */}
        {/* The route to '/projects' should now be protected -> if there is no logged in user
        in the state then we want to redirect to '/login' - otherwise render the Projects 
        component */}
        {/* <Route
          exact path='/projects'
          render={props => {
            if (this.state.user) {
              return <Projects {...props} />
              // this is the Redirect component from react router
            } else return <Redirect to='/login' />
          }}
        /> */}

        <ProtectedRoute
          path='/projects'
          user={this.state.user}
          component={Projects}
          redirectPath='/login'
        />

        <Route exact path="/projects/:id" component={ProjectDetails} />

        <Route
          exact path="/signup"
          // component={Signup}
          // we need to use the render prop to be able to pass props to the Signup component
          // and for this we need to be able to reference the component like this: <Signup />
          // https://reactjs.org/docs/render-props.html
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        {/* if you don't want to use the render prop but still need to pass props to the 
         component referenced in the route*/}
        {/* <Route exact path="/login">
          <Login setUser={this.setUser} {...this.props} />
        </Route> */}
        <Route
          exact path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
