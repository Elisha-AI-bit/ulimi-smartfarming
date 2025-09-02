import React from 'react';
import { render, screen } from '@testing-library/react';
import PestDetector from './PestDetector';

test('renders pest detector component with correct title', () => {
  render(<PestDetector />);
  
  expect(screen.getByText(/Pest & Disease Detection/i)).toBeInTheDocument();
});

test('renders choose image button', () => {
  render(<PestDetector />);
  
  expect(screen.getByText(/Choose Image/i)).toBeInTheDocument();
});

test('renders detect button', () => {
  render(<PestDetector />);
  
  expect(screen.getByText(/Detect Pest\/Disease/i)).toBeInTheDocument();
});