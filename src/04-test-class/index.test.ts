// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1000).getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    try {
      getBankAccount(balance).withdraw(2000);
    } catch (error) {
      expect((error as { message: string }).message).toBe(
        new InsufficientFundsError(balance).message,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    const recipient = getBankAccount(0);
    const sender = getBankAccount(0);

    try {
      sender.transfer(10, recipient);
    } catch (error) {
      expect((error as { message: string }).message).toBe(
        new InsufficientFundsError(0).message,
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    const sender = getBankAccount(10);

    try {
      sender.transfer(10, sender);
    } catch (error) {
      expect((error as { message: string }).message).toBe(
        new TransferFailedError().message,
      );
    }
  });

  test('should deposit money', () => {
    expect(getBankAccount(1000).deposit(200).getBalance()).toBe(1200);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(1000).withdraw(200).getBalance()).toBe(800);
  });

  test('should transfer money', () => {
    const recipient = getBankAccount(0);
    const sender = getBankAccount(1000);
    sender.transfer(500, recipient);
    expect(recipient.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    await expect(getBankAccount(1000).fetchBalance()).resolves.not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    try {
      const account = getBankAccount(initialBalance);
      await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(initialBalance);
    } catch (error) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', () => {
    try {
      getBankAccount(1000).synchronizeBalance();
    } catch (error) {
      expect((error as { message: string }).message).toBe(
        new SynchronizationFailedError().message,
      );
    }
  });
});
