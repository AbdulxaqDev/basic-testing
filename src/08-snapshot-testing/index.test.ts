// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const ones = [1, 1, 1, 1, 1];
  const twos = [2, 2, 2, 2, 2];
  const onesLinkList = generateLinkedList(ones);

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(ones)).toStrictEqual(onesLinkList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(twos)).toMatchSnapshot();
  });
});
