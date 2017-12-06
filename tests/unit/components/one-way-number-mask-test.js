import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('one-way-number-mask', 'Unit | Component | one way number mask', {
  unit: true
});

test('It can show a trailing decimal', function(assert) {
  let callCount = 0;
  let update = () => callCount++;
  let value = '1234';
  let component = this.subject({ update, value, decimal: true, });
  this.render();
  component._processNewValue('1234.');
  assert.equal(callCount, 0, '');
});
