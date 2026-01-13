import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import OneWayEmailMask from '#src/components/one-way-email-mask';

module('Integration | Component | one way email mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWayEmailMask
          @value={{this.unmaskedValue}}
          @update={{this.update}}
        />
      </template>,
    );
    await fillIn('input', 'test@test.test');
    assert.dom('input').hasValue('test@test.test');
    assert.strictEqual(this.unmaskedValue, 'test@test.test');
  });
});
