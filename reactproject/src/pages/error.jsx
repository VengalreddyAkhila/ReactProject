import { useState,useEffect } from 'react';

const ErrorPage = (props) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(props.location.state.error);
  }, [props.location.state]);

  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
      <button onClick={() => props.history.goBack()}>Go Back</button>
    </div>
  );
};

export default ErrorPage;