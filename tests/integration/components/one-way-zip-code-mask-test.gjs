import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWayZipCodeMask from '#src/components/one-way-zip-code-mask';

module('Integration | Component | one way zip code mask', function (hooks) {
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
        <OneWayZipCodeMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '12345');
    assert.dom('input').hasValue('12345');
    assert.strictEqual(state.unmaskedValue, '12345');
  });

  test('full code works', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
    })();
    const handleUpdate = (unmasked) => {
      state.unmaskedValue = unmasked;
    };
    await render(
      <template>
        <OneWayZipCodeMask
          @value={{state.unmaskedValue}}
          @fullCode={{true}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '123451234');
    assert.dom('input').hasValue('12345-1234');
    assert.strictEqual(state.unmaskedValue, '123451234');
  });
});
