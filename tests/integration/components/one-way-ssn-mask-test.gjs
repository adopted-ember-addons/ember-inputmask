import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWaySsnMask from '#src/components/one-way-ssn-mask';

module('Integration | Component | one way ssn mask', function (hooks) {
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
        <OneWaySsnMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '123456789');
    assert.dom('input').hasValue('123-45-6789');
    assert.strictEqual(state.unmaskedValue, '123456789');
  });
});
