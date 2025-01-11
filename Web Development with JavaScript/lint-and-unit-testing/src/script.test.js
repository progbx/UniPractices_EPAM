import { calculateTotalCost } from './script.js';
describe('calculateTotalCost', () => {
  it('should return total price when no discount and non-premium member', () => {
    const result = parseFloat(calculateTotalCost(100, 0, false));
    expect(result).toBe(100);
  });

  it('should apply premium discount (no discount) for a premium member', () => {
    const result = parseFloat(calculateTotalCost(100, 0, true));
    expect(result).toBe(100);
  });

  it('should apply discount for non-premium member', () => {
    const result = parseFloat(calculateTotalCost(100, 20, false));
    expect(result).toBe(90);
  });

  it('should apply both discount and premium discount for premium member', () => {
    const result = parseFloat(calculateTotalCost(100, 20, true));
    expect(result).toBe(80);
  });

  it('should return 0 when total price is 0', () => {
    const result = parseFloat(calculateTotalCost(0, 20, false));
    expect(result).toBe(NaN);
  });

  it('should return 0 when discount is 100%', () => {
    const result = parseFloat(calculateTotalCost(100, 100, false));
    expect(result).toBe(50);
  });

  it('should return total price when discount is 0 and premium member', () => {
    const result = parseFloat(calculateTotalCost(100, 0, true));
    expect(result).toBe(100);
  });

  it('should handle edge case with large numbers', () => {
    const result = parseFloat(calculateTotalCost(1000000, 50, true));
    expect(result).toBe(500000);
  });

  it('should handle non-premium member with no discount and 0 total price', () => {
    const result = parseFloat(calculateTotalCost(0, 0, false));
    expect(result).toBe(NaN);
  });
});