import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/editwidget.css'
import Component from './component';


const WidgetEditPage = (props) =>{
  const { id } = useParams();
  const [widget, setWidget] = useState({ components: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`https://magni-careers.azurewebsites.net/api/widgets/${id}`)
        .then(res => {
          setWidget(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (id) {
        await axios.put(`https://magni-careers.azurewebsites.net/api/widgets/${id}`, widget);
      } else {
        await axios.post(`https://magni-careers.azurewebsites.net/api/widgets`, widget);
      }
      props.history.push('/widgets');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const pattern = /components\[(\d+)\]/;
    let match;
    if ((match = pattern.exec(name)) !== null) {
      const index = match[1];
      setWidget({
        ...widget,
        components: widget.components.map((c, i) => {
          if (i !== +index) {
            return c;
          }
          return { ...c, [name.split(".")[1]]: value };
        })
      });
    } else {
      setWidget({ ...widget, [name]: value });
    }
  };


  const handleAddComponent = e => {
    e.preventDefault();
    setWidget({
      ...widget,
      components: [...widget.components, { id: "", name: "", description: "", optional: false }]
    });
  };
  const handleRemoveComponent = index => {
    setWidget({
      ...widget,
      components: widget.components.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={widget.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={widget.description

              }
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Count:
            <input
              type="number"
              name="count"
              value={widget.count}
              onChange={handleChange}
            />
          </label>
          <br />
          <h2>Components</h2>
          {widget.components &&
  widget.components.map((component, index) => (
    <Component
    key={component.id}
      component={component}
      index={index}
      handleChange={handleChange}
      handleRemoveComponent={handleRemoveComponent}
    />
  ))}
            
          <button onClick={handleAddComponent}>Add Component</button>
          <br />
          <button type="submit" disabled={isSaving}>Save</button>
        </form>
      )}
    </div>
  );
}

export default WidgetEditPage;