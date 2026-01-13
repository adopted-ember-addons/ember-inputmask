import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import OneWayCurrencyMask from '#src/components/one-way-currency-mask';

module('Integration | Component | one way currency mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWayCurrencyMask
          @value={{this.unmaskedValue}}
          @update={{this.update}}
          @options={{hash prefix="$ "}}
        />
      </template>,
    );
    await fillIn('input', '1234567.89');
    assert.dom('input').hasValue('$ 1,234,567.89');
    assert.strictEqual(this.unmaskedValue, '1234567.89');
  });
});
