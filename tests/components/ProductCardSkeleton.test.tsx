import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

describe('ProductCardSkeleton Component', () => {
  describe('Default Rendering', () => {
    it('should render 6 skeletons by default', () => {
      const { container } = render(<ProductCardSkeleton />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(6);
    });

    it('should render with animate-pulse class', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('should render skeleton with proper structure', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      // Should have image skeleton
      expect(container.querySelector('.h-56')).toBeInTheDocument();
      // Should have content skeleton
      expect(container.querySelector('.p-5')).toBeInTheDocument();
    });
  });

  describe('Custom Count', () => {
    it('should render specified number of skeletons', () => {
      const { container } = render(<ProductCardSkeleton count={3} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(3);
    });

    it('should render 1 skeleton when count is 1', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(1);
    });

    it('should render 12 skeletons when count is 12', () => {
      const { container } = render(<ProductCardSkeleton count={12} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(12);
    });
  });

  describe('Skeleton Structure', () => {
    it('should have category badge skeleton', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.h-5.w-20')).toBeInTheDocument();
    });

    it('should have title skeleton', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.h-6.w-3\\/4')).toBeInTheDocument();
    });

    it('should have rating stars skeleton', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      const stars = container.querySelectorAll('.h-4.w-4');
      expect(stars.length).toBeGreaterThanOrEqual(5);
    });

    it('should have price skeleton', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.h-7.w-24')).toBeInTheDocument();
    });

    it('should have button skeletons', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.h-10.flex-1')).toBeInTheDocument();
      expect(container.querySelector('.h-10.w-10')).toBeInTheDocument();
    });
  });

  describe('Grid Layout', () => {
    it('should have proper grid classes', () => {
      const { container } = render(<ProductCardSkeleton />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('gap-8');
    });

    it('should have responsive grid columns', () => {
      const { container } = render(<ProductCardSkeleton />);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('sm:grid-cols-2');
      expect(grid).toHaveClass('xl:grid-cols-3');
    });
  });

  describe('Styling', () => {
    it('should have rounded corners on cards', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.rounded-2xl')).toBeInTheDocument();
    });

    it('should have shadow on cards', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.shadow-lg')).toBeInTheDocument();
    });

    it('should have gray background for skeleton elements', () => {
      const { container } = render(<ProductCardSkeleton count={1} />);
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
    });
  });
});
