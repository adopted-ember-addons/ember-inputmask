import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import OneWayCurrencyMask from '#src/components/one-way-currency-mask';

module('Integration | Component | one way currency mask', function (hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
    })();
    const handleUpdate = (unmasked) => {
      state.unmaskedValue = unmasked;
    };
    await render(
      <template>
        <OneWayCurrencyMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
          @options={{hash prefix="$ "}}
        />
      </template>,
    );
    await fillIn('input', '1234567.89');
    assert.dom('input').hasValue('$ 1,234,567.89');
    assert.strictEqual(state.unmaskedValue, '1234567.89');
  });
});
