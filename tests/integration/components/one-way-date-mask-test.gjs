import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import OneWayDateMask from '#src/components/one-way-date-mask';

module('Integration | Component | one way date mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWayDateMask @value={{this.unmaskedValue}} @update={{this.update}} />
      </template>,
    );
    await fillIn('input', '1492014');
    assert.dom('input').hasValue('14/09/2014');
    assert.strictEqual(this.unmaskedValue, '14092014');
  });
});
