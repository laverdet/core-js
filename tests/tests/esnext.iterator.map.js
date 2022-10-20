import { createIterator } from '../helpers/helpers';
import { STRICT_THIS } from '../helpers/constants';

QUnit.test('Iterator#map', assert => {
  const { map } = Iterator.prototype;

  assert.isFunction(map);
  assert.arity(map, 1);
  assert.name(map, 'map');
  assert.looksNative(map);
  assert.nonEnumerable(Iterator.prototype, 'map');

  assert.arrayEqual(map.call(createIterator([1, 2, 3]), it => it ** 2).toArray(), [1, 4, 9], 'basic functionality');
  map.call(createIterator([1]), function (arg, counter) {
    assert.same(this, STRICT_THIS, 'this');
    assert.same(arguments.length, 2, 'arguments length');
    assert.same(arg, 1, 'argument');
    assert.same(counter, 0, 'counter');
  }).toArray();

  assert.throws(() => map.call(undefined, () => { /* empty */ }), TypeError);
  assert.throws(() => map.call(null, () => { /* empty */ }), TypeError);
  assert.throws(() => map.call({}, () => { /* empty */ }), TypeError);
  assert.throws(() => map.call([], () => { /* empty */ }), TypeError);
  assert.throws(() => map.call(createIterator([1]), undefined), TypeError);
  assert.throws(() => map.call(createIterator([1]), null), TypeError);
  assert.throws(() => map.call(createIterator([1]), {}), TypeError);
});
