import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWayEmailMask from '#src/components/one-way-email-mask';

module('Integration | Component | one way email mask', function (hooks) {
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
        <OneWayEmailMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', 'test@test.test');
    assert.dom('input').hasValue('test@test.test');
    assert.strictEqual(state.unmaskedValue, 'test@test.test');
  });
});
