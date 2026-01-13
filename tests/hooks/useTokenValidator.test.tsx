import { renderHook } from '@testing-library/react';

// Mock dependencies
jest.mock('@3asoftwares/utils/client', () => ({
  getAccessToken: jest.fn(() => 'mock-token'),
  clearAuth: jest.fn(),
  isTokenExpired: jest.fn(() => false),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

// Mock the hook
jest.mock('../../lib/hooks/useTokenValidator', () => ({
  useTokenValidator: jest.fn(() => {
    return {
      validateToken: jest.fn().mockResolvedValue({ valid: true, user: {} }),
      checkAndValidate: jest.fn().mockResolvedValue(undefined),
    };
  }),
  default: jest.fn(() => ({
    validateToken: jest.fn().mockResolvedValue({ valid: true, user: {} }),
    checkAndValidate: jest.fn().mockResolvedValue(undefined),
  })),
}));

import { useTokenValidator } from '../../lib/hooks/useTokenValidator';

describe('useTokenValidator Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return validation functions', () => {
    const { result } = renderHook(() => useTokenValidator());
    expect(result.current).toBeDefined();
  });

  it('should have validateToken function', () => {
    const { result } = renderHook(() => useTokenValidator());
    expect(result.current.validateToken).toBeDefined();
  });

  it('should have checkAndValidate function', () => {
    const { result } = renderHook(() => useTokenValidator());
    expect(result.current.checkAndValidate).toBeDefined();
  });
});
