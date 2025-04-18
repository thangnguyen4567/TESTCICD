import { add, subtract, multiply, divide } from '../math';

describe('Math utilities', () => {
  describe('add function', () => {
    test('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(add(-1, 5)).toBe(4);
      expect(add(-1, -3)).toBe(-4);
    });
  });

  describe('subtract function', () => {
    test('should subtract numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply function', () => {
    test('should multiply numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });

  describe('divide function', () => {
    test('should divide numbers correctly', () => {
      expect(divide(6, 3)).toBe(2);
      expect(divide(7, 2)).toBe(3.5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });
}); 