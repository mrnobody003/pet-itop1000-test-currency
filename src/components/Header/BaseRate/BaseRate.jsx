import { ListGroup, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { getBaseRate } from 'shared/services/rateApi';

const BaseRate = () => {
  const [values, setValues] = useState({
    items: {},
    loading: false,
    error: null,
  });
  useEffect(() => {
    const fetchQuestions = async () => {
      setValues({
        ...values,
        loading: true,
        error: null,
      });
      try {
        const { rates } = await getBaseRate();
        setValues(prevState => ({
          ...prevState,
          items: rates,
          loading: false,
        }));
      } catch (error) {
        setValues({
          ...values,
          loading: false,
          error: error.message,
        });
      }
    };
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { items, loading, error } = values;
  const { EUR, USD } = items;
  return (
    <>
      {loading && (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && <div>Sorry...Problem with server... Try again later...</div>}
      <div>
        {Boolean(Object.values(items).length) && (
          <ListGroup variant="flush" className="flex-row gap-2" as="ul">
            <ListGroup.Item as="li">
              USD - {(USD * 1000).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Euro - {(EUR * 1000).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>
    </>
  );
};
export default BaseRate;
