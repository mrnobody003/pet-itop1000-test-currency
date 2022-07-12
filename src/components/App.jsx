import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

import Header from './Header';

const HomePage = lazy(() => import('../Pages/HomePage'));
const ExchangePage = lazy(() => import('../Pages/ExchangePage'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/rate" element={<ExchangePage />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
