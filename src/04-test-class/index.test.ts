// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const firstAccount = getBankAccount(initialBalance)
  const secondAccound = getBankAccount(initialBalance)
  const firstBalance = firstAccount.getBalance()

  test('should create account with initial balance', () => {
    expect(firstAccount.getBalance()).toBe(initialBalance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstAccount.withdraw(firstBalance + 5)).toThrow(`Insufficient funds: cannot withdraw more than ${firstBalance}`)
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => firstAccount.transfer(firstBalance + 5, secondAccound)).toThrow(`Insufficient funds: cannot withdraw more than ${firstBalance}`)
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => firstAccount.transfer(firstBalance, firstAccount)).toThrow(`Transfer failed`)
  });

  test('should deposit money', () => {
    const depositMoney = 77;
    const oldBalance = firstAccount.getBalance();
    firstAccount.deposit(depositMoney)
    expect(firstAccount.getBalance()).toBe(oldBalance + depositMoney)
  });

  test('should withdraw money', () => {
    const withdrawMoney = 77;
    const oldBalance = firstAccount.getBalance();
    const withdrawAccount = firstAccount.withdraw(withdrawMoney)
    expect(withdrawAccount.getBalance()).toBe(oldBalance - withdrawMoney)
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
