import axios from 'axios';
import React, { Component } from 'react'
import EditProject from './EditProject';

export default class ProjectDetails extends Component {

  state = {
    project: null,
    title: '',
    description: '',
    error: null,
    editForm: false,
    // this is the flag
    // dataRequested: false
  }

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm
    }))
  }

  getData = () => {
    // // sets a flag - the data is requested but is not there yet
    // this.setState({
    //   dataRequested: true
    // })
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          // this unsets the flag when the data is available
          // dataRequested: false
        })
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
      })
  }

  deleteProject = () => {
    axios.delete(`/api/projects/${this.state.project._id}`)
      .then(() => {
        // we want to redirect to the projects list
        this.props.history.push('/projects');
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const { title, description } = this.state;
    e.preventDefault();
    axios.put(`/api/projects/${this.state.project._id}`, {
      title,
      description
    })
      .then(response => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false
        })
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.error) return <h2>{this.state.error}</h2>
    if (!this.state.project) return <></>
    return (
      <>
        <h1>Title: {this.state.project.title}</h1>
        <p>Description: {this.state.project.description}</p>
        <button onClick={this.deleteProject}>Delete this Project ❌</button>
        <button onClick={this.toggleEditForm}>Show Edit Form 📝</button>
        {this.state.editForm && (
          <EditProject
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </>
    )
  }
}
