import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import OneWayZipCodeMask from '#src/components/one-way-zip-code-mask';

module('Integration | Component | one way zip code mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(
      <template>
        <OneWayZipCodeMask
          @value={{this.unmaskedValue}}
          @update={{this.update}}
        />
      </template>,
    );
    await fillIn('input', '12345');
    assert.dom('input').hasValue('12345');
    assert.strictEqual(this.unmaskedValue, '12345');
  });

  test('full code works', async function (assert) {
    await render(
      <template>
        <OneWayZipCodeMask
          @value={{this.unmaskedValue}}
          @fullCode={{true}}
          @update={{this.update}}
        />
      </template>,
    );
    await fillIn('input', '123451234');
    assert.dom('input').hasValue('12345-1234');
    assert.strictEqual(this.unmaskedValue, '123451234');
  });
});
