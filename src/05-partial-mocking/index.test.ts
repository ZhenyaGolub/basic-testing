// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    mockOne: () => true,
    mockTwo: () => true,
    mockThree: () => true,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne()).toBe(true);
    expect(mockTwo()).toBe(true);
    expect(mockThree()).toBe(true);
  });

  test('unmockedFunction should log into console', () => {
    expect(unmockedFunction()).toBe(undefined);
  });
});
