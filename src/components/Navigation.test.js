import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders navigation component with correct title', () => {
  render(
    <BrowserRouter>
      <Navigation userRole="farmer" />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Ulimi Smart Farming/i)).toBeInTheDocument();
});

test('renders dashboard button', () => {
  render(
    <BrowserRouter>
      <Navigation userRole="farmer" />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

test('renders logout button', () => {
  render(
    <BrowserRouter>
      <Navigation userRole="farmer" />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});