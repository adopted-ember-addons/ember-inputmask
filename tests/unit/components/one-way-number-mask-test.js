import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | one way number mask', function(hooks) {
  setupTest(hooks);

  test('It can show a trailing decimal', function(assert) {
    let callCount = 0;
    let update = () => callCount++;
    let value = '1234';
    let component = this.owner.factoryFor('component:one-way-number-mask').create({ update, value, decimal: true, });
    this.render();
    component._processNewValue('1234.');
    assert.equal(callCount, 0, '');
  });
});