import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Spinner, InputGroup } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import { getMainRate } from 'shared/services/rateApi';

const ExchangeForm = () => {
  const [valueFirst, setValueFirst] = useState('');
  const [valueSecond, setValueSecond] = useState('');
  const [rate, setRate] = useState({
    items: {},
    loading: false,
    error: null,
  });
  const [firstSelect, setFirstSelect] = useState(null);
  const [secondSelect, setSecondSelect] = useState(null);

  const handlerValueFirst = target => {
    const fixedValue = target.value * Object.values(items);
    setValueSecond(fixedValue.toFixed(2));
  };

  const handlerValueSecond = target => {
    const fixedValue = target.value / Object.values(items);

    setValueFirst(fixedValue.toFixed(2));
  };

  const debouncedOnChangeFirst = debounce(handlerValueFirst, 500);
  const debouncedOnChangeSecond = debounce(handlerValueSecond, 500);

  const clearValues = () => {
    setValueFirst('');
    setValueSecond('');
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      if (!firstSelect || !secondSelect) return;
      setRate({
        ...rate,
        loading: true,
        error: null,
      });
      try {
        const { rates } = await getMainRate(firstSelect, secondSelect);
        setRate(prevState => ({
          ...prevState,
          items: rates,
          loading: false,
        }));
      } catch (error) {
        setRate({
          ...rate,
          loading: false,
          error: error.message,
        });
      }
    };
    fetchCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSelect, secondSelect]);
  const { items, loading, error } = rate;

  return (
    <Container className="pt-5 d-flex justify-content-center gap-2">
      {loading && (
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className=" position-absolute bottom-50 end-50"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && <div>Sorry...Problem with server... Try again later...</div>}
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>Value</InputGroup.Text>
          <Form.Control
            disabled={!firstSelect || !secondSelect || loading}
            aria-label="Dollar amount (with dot and two decimal places)"
            onChange={({ target }) => {
              debouncedOnChangeFirst(target);
              setValueFirst(target.value);
            }}
            value={valueFirst}
          />
        </InputGroup>
        <Form.Select
          aria-label="Default select example"
          onChange={e => {
            setFirstSelect(e.target.value);
            clearValues();
          }}
        >
          <option>...</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </Form.Select>
      </div>
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>Value</InputGroup.Text>
          <Form.Control
            disabled={!firstSelect || !secondSelect || loading}
            aria-label="Dollar amount (with dot and two decimal places)"
            onChange={({ target }) => {
              debouncedOnChangeSecond(target);
              setValueSecond(target.value);
            }}
            value={valueSecond}
          />
        </InputGroup>
        <Form.Select
          aria-label="Default select example"
          onChange={e => {
            setSecondSelect(e.target.value);
            clearValues();
          }}
        >
          <option>...</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </Form.Select>
      </div>
    </Container>
  );
};
export default ExchangeForm;
