import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingProductGrid, ProductSkeletonGrid } from '../../components/LoadingProductGrid';

describe('LoadingProductGrid Component', () => {
  describe('Default Rendering', () => {
    it('should render skeletons by default', () => {
      const { container } = render(<LoadingProductGrid />);
      const cards = container.querySelectorAll('.rounded-lg.overflow-hidden');
      expect(cards.length).toBe(8);
    });

    it('should render with animate-pulse class', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('Custom Count', () => {
    it('should render specified number of skeletons', () => {
      const { container } = render(<LoadingProductGrid count={4} />);
      const cards = container.querySelectorAll('.rounded-lg.overflow-hidden');
      expect(cards.length).toBe(4);
    });

    it('should render 1 skeleton when count is 1', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      const cards = container.querySelectorAll('.rounded-lg.overflow-hidden');
      expect(cards.length).toBe(1);
    });

    it('should render 16 skeletons when count is 16', () => {
      const { container } = render(<LoadingProductGrid count={16} />);
      const cards = container.querySelectorAll('.rounded-lg.overflow-hidden');
      expect(cards.length).toBe(16);
    });
  });

  describe('Default Variant', () => {
    it('should have default grid layout', () => {
      const { container } = render(<LoadingProductGrid />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('sm:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-4');
      expect(grid).toHaveClass('gap-6');
    });

    it('should have default image height', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.h-48')).toBeInTheDocument();
    });

    it('should have button skeleton in default variant', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.h-10')).toBeInTheDocument();
    });

    it('should have price skeleton in default variant', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.h-5')).toBeInTheDocument();
    });
  });

  describe('Compact Variant', () => {
    it('should have compact grid layout', () => {
      const { container } = render(<LoadingProductGrid variant="compact" />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-2');
      expect(grid).toHaveClass('sm:grid-cols-3');
      expect(grid).toHaveClass('lg:grid-cols-6');
      expect(grid).toHaveClass('gap-4');
    });

    it('should have compact image height', () => {
      const { container } = render(<LoadingProductGrid variant="compact" count={1} />);
      expect(container.querySelector('.h-32')).toBeInTheDocument();
    });

    it('should not have button skeleton in compact variant', () => {
      const { container } = render(<LoadingProductGrid variant="compact" count={1} />);
      expect(container.querySelector('.h-10')).not.toBeInTheDocument();
    });
  });

  describe('Skeleton Structure', () => {
    it('should have title skeleton', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.h-4')).toBeInTheDocument();
    });

    it('should have secondary text skeleton', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.h-3')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have rounded corners on cards', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
    });

    it('should have shadow on cards', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.shadow-md')).toBeInTheDocument();
    });

    it('should have gradient background for skeleton elements', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.bg-gradient-to-r')).toBeInTheDocument();
    });

    it('should have white background on cards', () => {
      const { container } = render(<LoadingProductGrid count={1} />);
      expect(container.querySelector('.bg-white')).toBeInTheDocument();
    });
  });

  describe('ProductSkeletonGrid Alias', () => {
    it('should be the same component as LoadingProductGrid', () => {
      expect(ProductSkeletonGrid).toBe(LoadingProductGrid);
    });

    it('should render correctly when used', () => {
      const { container } = render(<ProductSkeletonGrid count={4} />);
      const cards = container.querySelectorAll('.rounded-lg.overflow-hidden');
      expect(cards.length).toBe(4);
    });
  });
});
