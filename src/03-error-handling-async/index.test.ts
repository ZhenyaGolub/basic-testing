// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from './index';

const myAwesomeErrorMessage = new MyAwesomeError().message;

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(2);
    expect(data).toBe(2);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Custom error');
    } catch (error) {
      expect((error as { message: string }).message).toBe('Custom error');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      expect((error as { message: string }).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error) {
      expect((error as { message: string }).message).toBe(
        myAwesomeErrorMessage,
      );
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    rejectCustomError().catch((error) => {
      expect(error.message).toBe(myAwesomeErrorMessage);
    });
  });
});
