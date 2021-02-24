import hello from './hello.js'

test('hello', () => {
    expect(hello('something')).toBe('hello something !');
});