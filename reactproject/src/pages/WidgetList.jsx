import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../css/widgetlist.css';

const  WidgetsList = () =>{
  const [widgets, setWidgets] = useState([]);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const res = await fetch('https://magni-careers.azurewebsites.net/api/widgets');
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setWidgets(data);
        setRequestCount(requestCount + 1);
        console.log('ji')
      } catch (err) {
        this.props.history.push({
          pathname: '/error',
          state: { error: err.message }
        })
      }
    };
    fetchWidgets();
  }, []);

  const handleDeleteWidget = async (id) => {
    try {
      const res = await fetch(`https://magni-careers.azurewebsites.net/api/widgets/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      setWidgets(widgets.filter(widget => widget.id !== id));
      setRequestCount(requestCount + 1);
    } catch (err) {
      this.props.history.push({
        pathname: '/error',
        state: { error: err.message }
      })
    }
  }


  return (
    <div>
      <h1>Widgets List</h1>
      <p>Request Count: {requestCount}</p>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Components</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {widgets.map(widget => (
            <tr key={widget.id}>
              <td>{widget.name}</td>
              <td>{widget.description}</td>
              <td>{widget.components ? widget.components.length : 0}</td>
             
              <td>
              
                <Link to={`/widgets/${widget.id}`}>View</Link> 
                <br/>
                <Link to="/widgets/edit">Add Widget</Link>
                <br/>

                <Link to="/components">Components</Link>

                <button onClick={() => handleDeleteWidget(widget.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WidgetsList;
