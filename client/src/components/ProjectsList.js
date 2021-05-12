import React from 'react'
import { Link } from 'react-router-dom';

export default function ProjectsList(props) {
  return (
    <div>
      {props.projects.map(project => {
        return (
          <h3 key={project._id}>
            <Link to={`/projects/${project._id}`}>{project.title}</Link>
          </h3>
        )
      })}
    </div>
  )
}
