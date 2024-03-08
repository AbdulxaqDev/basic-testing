// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const firstAccount = getBankAccount(initialBalance);
  const secondAccound = getBankAccount(initialBalance);
  const firstBalance = firstAccount.getBalance();

  test('should create account with initial balance', () => {
    expect(firstAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstAccount.withdraw(firstBalance + 5)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      firstAccount.transfer(firstBalance + 5, secondAccound),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      firstAccount.transfer(firstBalance, firstAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositMoney = 77;
    const oldBalance = firstAccount.getBalance();
    firstAccount.deposit(depositMoney);

    expect(firstAccount.getBalance()).toEqual(oldBalance + depositMoney);
  });

  test('should withdraw money', () => {
    const withdrawMoney = 77;
    const oldBalance = firstAccount.getBalance();
    const withdrawAccount = firstAccount.withdraw(withdrawMoney);

    expect(withdrawAccount.getBalance()).toEqual(oldBalance - withdrawMoney);
  });

  test('should transfer money', () => {
    const transferMoney = 30;
    const senderBalance = firstAccount.getBalance();
    const receiverBalance = secondAccound.getBalance();

    // Checking the sender account balance after transfer
    expect(
      firstAccount.transfer(transferMoney, secondAccound).getBalance(),
    ).toEqual(senderBalance - transferMoney);

    // Checking the receiver account balance after receiving transfer money
    expect(secondAccound.getBalance()).toEqual(receiverBalance + transferMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 77;

    jest.spyOn(firstAccount, 'fetchBalance').mockResolvedValue(mockBalance);

    const fetchedBalance = await firstAccount.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toEqual(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 77;
    const mockAccount = getBankAccount(80);

    jest.spyOn(mockAccount, 'fetchBalance').mockResolvedValue(mockBalance);

    await mockAccount.synchronizeBalance();

    expect(mockAccount.getBalance()).toEqual(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockBalance = null;
    const mockAccount = getBankAccount(80);

    jest.spyOn(mockAccount, 'fetchBalance').mockResolvedValue(mockBalance);

    await expect(mockAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
