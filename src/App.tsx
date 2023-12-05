// App.tsx
import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetailsForm from './Components/UserDetailsForm';
import SecondPage from './Components/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDetailsForm />} />
        <Route path="/second-page" element={<ProtectedRoute component={SecondPage} />} />
      </Routes>
    </Router>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component, ...rest }) => {
  const hasUserDetails = localStorage.getItem('userDetails');

  return hasUserDetails ? <Component {...rest} /> : <div>You must enter your details before accessing this page.</div>;
};

export default App;
