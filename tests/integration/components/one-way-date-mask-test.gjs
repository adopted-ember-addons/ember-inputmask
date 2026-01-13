import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWayDateMask from '#src/components/one-way-date-mask';

module('Integration | Component | one way date mask', function (hooks) {
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
        <OneWayDateMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '1492014');
    assert.dom('input').hasValue('14/09/2014');
    assert.strictEqual(state.unmaskedValue, '14092014');
  });
});
