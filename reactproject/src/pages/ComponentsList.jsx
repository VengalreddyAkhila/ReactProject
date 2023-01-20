import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/componentlist.css'

const ComponentsList = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const result = await axios.get('https://magni-careers.azurewebsites.net/api/components');
      setComponents(result.data);
    }
    fetchComponents();
  }, []);

  return (
    <div>
      <h1>Components List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map(component => (
            <tr key={component.id}>
              <td>{component.name}</td>
              <td>{component.description}</td>
              <td>
              <Link to={`/components/${component.id}`}>View</Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComponentsList;
