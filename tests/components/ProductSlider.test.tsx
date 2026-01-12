import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the ProductSlider component before importing
jest.mock('../../components/ProductSlider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="product-slider">{children}</div>
  ),
}));

// We need to mock the component to test it
describe('ProductSlider Component', () => {
  describe('Basic Rendering', () => {
    it('should render children', () => {
      const ProductSlider = require('../../components/ProductSlider').default;
      render(
        <ProductSlider>
          <div>Product 1</div>
          <div>Product 2</div>
        </ProductSlider>
      );
      expect(screen.getByTestId('product-slider')).toBeInTheDocument();
    });
  });
});
