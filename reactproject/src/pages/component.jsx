const Component = ({ component, index, handleChange, handleRemoveComponent }) => {
  return (
    <div key={index}>
      <label>
        Name:
        <input
          type="text"
          name={`components[${index}].name`}
          value={component.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name={`components[${index}].description`}
          value={component.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Optional:
        <input
          type="checkbox"
          name={`components[${index}].optional`}
          checked={component.optional}
          onChange={handleChange}
        />
      </label>
      <button onClick={() => handleRemoveComponent(index)}>Remove Component</button>
    </div>
  )
}

export default Component