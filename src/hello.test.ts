import { hello } from './hello';

describe('hello', () => {
  it('should return hello with name', () => {
    expect(hello('Foo')).toEqual('Hello, Foo!');
  });
});
