import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/widgetdetail.css';

function WidgetDetail() {
  const { id } = useParams();
  const [widget, setWidget] = useState({});
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    count: 0,
    components: [],
  });

  useEffect(() => {
    const fetchWidget = async () => {
      try {
        const res = await fetch(`https://magni-careers.azurewebsites.net/api/widgets/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setWidget(data);
        setRequestCount(requestCount + 1);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchWidget();
  }, []);

  useEffect(() => {
    if (widget.id) {
      setFormData({
        name: widget.name,
        description: widget.description,
        count: widget.count,
        components: widget.components,
      });
    }
  }, [widget]);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = event => {


    event.preventDefault();
    axios
      .put('https://magni-careers.azurewebsites.net/api/widgets/${id}, formData')
      .then(res => setWidget(res.data))
      .catch(err => console.error(err));
    setEditing(false);
  };

  return (
    <div>
      <h1>Widgets List</h1>
      <p>Request Count: {requestCount}</p>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Count:
            <input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
            />
          </label>
          <br />
          <h2>Components</h2>
          <ul>
            {formData.components.map((component, index) => (
              <li key={component.id}>
                <label>
                  Name:
                  <input
                    type="text"
                    name={`components.${index}.name`}
                    value={component.name}
                    onChange={handleChange} /> </label>
                <br />
                <label> Description:
                  <input type="text" name={`components.${index}.description`}
                    value={component.description}
                    onChange={handleChange} />
                </label> <br />
                <label> Optional:
                  <input type="checkbox"
                    name={`components.${index}.optional`}
                    checked={component.optional}
                    onChange={handleChange}
                  />
                </label>

              </li>
            ))}
          </ul>
          <button type="submit" onSubmit={handleSubmit}>Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h1>{widget.name}</h1>
          <p>{widget.description}</p>
          <p>Count: {widget.count}</p>
          <h2>Components</h2>
          <ul>
            {widget.components &&
              widget.components.map(component => (
                <li key={component.id}>
                  <p>{component.name}</p>
                  <p>{component.description}</p>
                  <p>Optional: {component.optional ? 'Yes' : 'No'}</p>
                </li>
              ))}
          </ul>
          <button type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
export default WidgetDetail;