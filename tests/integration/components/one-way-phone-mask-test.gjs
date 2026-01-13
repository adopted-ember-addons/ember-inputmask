import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import OneWayPhoneMask from '#src/components/one-way-phone-mask';

module('Integration | Component | one way phone mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWayPhoneMask
          @value={{this.unmaskedValue}}
          @update={{this.update}}
        />
      </template>,
    );
    await fillIn('input', '2345678901234');
    assert.dom('input').hasValue('(234) 567-8901');
    assert.strictEqual(this.unmaskedValue, '2345678901');
  });

  test('extensions work', async function (assert) {
    await render(
      <template>
        <OneWayPhoneMask
          @value={{this.unmaskedValue}}
          @extensions={{true}}
          @update={{this.update}}
        />
      </template>,
    );
    await fillIn('input', '2234567890x1234');
    assert.dom('input').hasValue('(223) 456-7890 x 1234');
    assert.strictEqual(this.unmaskedValue, '22345678901234');
  });
});
