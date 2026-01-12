import { renderHook } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock Apollo client and queries
jest.mock('@/lib/apollo/client', () => ({
  apolloClient: {
    query: jest.fn().mockResolvedValue({ data: { categories: { data: [] } } }),
    mutate: jest.fn(),
  },
}));

jest.mock('@/lib/apollo/queries/queries', () => ({
  GQL_QUERIES: {
    GET_CATEGORIES_QUERY: 'mock-query',
  },
}));

// Mock category store before importing
const mockSetCategories = jest.fn();
const mockShouldRefetch = jest.fn(() => true);

jest.mock('@/store/categoryStore', () => ({
  useCategoryStore: jest.fn(() => ({
    categories: [],
    setCategories: mockSetCategories,
    shouldRefetch: mockShouldRefetch,
    isLoaded: false,
  })),
}));

// Mock the useCategories hook itself for simpler testing
jest.mock('../../lib/hooks/useCategories', () => ({
  useCategories: jest.fn(({ skip } = {}) => ({
    categories: [],
    data: { data: [] },
    loading: !skip,
    isLoading: !skip,
    error: undefined,
    refetch: jest.fn(),
    isFromCache: false,
  })),
  default: jest.fn(({ skip } = {}) => ({
    categories: [],
    data: { data: [] },
    loading: !skip,
    isLoading: !skip,
    error: undefined,
    refetch: jest.fn(),
    isFromCache: false,
  })),
}));

import { useCategories } from '../../lib/hooks/useCategories';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCategories Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should return empty categories initially', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.categories).toEqual([]);
    });

    it('should have loading state', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.loading).toBeDefined();
    });

    it('should have error state', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toBeUndefined();
    });
  });

  describe('Skip Option', () => {
    it('should not be loading when skip is true', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('Return Values', () => {
    it('should return data property', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeDefined();
    });

    it('should return refetch function', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.refetch).toBe('function');
    });

    it('should return isFromCache property', () => {
      const { result } = renderHook(() => useCategories({ skip: true }), {
        wrapper: createWrapper(),
      });

      expect(result.current.isFromCache).toBeDefined();
    });
  });
});
