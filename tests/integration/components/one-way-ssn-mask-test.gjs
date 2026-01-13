import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import OneWaySsnMask from '#src/components/one-way-ssn-mask';

module('Integration | Component | one way ssn mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWaySsnMask @value={{this.unmaskedValue}} @update={{this.update}} />
      </template>,
    );
    await fillIn('input', '123456789');
    assert.dom('input').hasValue('123-45-6789');
    assert.strictEqual(this.unmaskedValue, '123456789');
  });
});
