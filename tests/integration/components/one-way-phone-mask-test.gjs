import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWayPhoneMask from '#src/components/one-way-phone-mask';

module('Integration | Component | one way phone mask', function (hooks) {
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
        <OneWayPhoneMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '2345678901234');
    assert.dom('input').hasValue('(234) 567-8901');
    assert.strictEqual(state.unmaskedValue, '2345678901');
  });

  test('extensions work', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
    })();
    const handleUpdate = (unmasked) => {
      state.unmaskedValue = unmasked;
    };
    await render(
      <template>
        <OneWayPhoneMask
          @value={{state.unmaskedValue}}
          @extensions={{true}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '2234567890x1234');
    assert.dom('input').hasValue('(223) 456-7890 x 1234');
    assert.strictEqual(state.unmaskedValue, '22345678901234');
  });
});
