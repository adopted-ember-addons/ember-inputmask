import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  fillIn,
  find,
  triggerKeyEvent,
  render,
  settled,
} from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import OneWayInputMask from '#src/components/one-way-input-mask';

module('Integration | Component | one-way-input-mask', function (hooks) {
  setupRenderingTest(hooks);

  test('It masks a passed in value', async function (assert) {
    const value = 123;
    await render(
      <template><OneWayInputMask @value={{value}} @mask="9-9+9" /></template>,
    );
    assert.dom('input').hasValue('1-2+3');
  });

  test('The mask updates if the passed value is mutated in the parent', async function (assert) {
    const state = new (class {
      @tracked value = 123;
    })();
    await render(
      <template>
        <OneWayInputMask @value={{state.value}} @mask="9-9+9" />
      </template>,
    );
    assert.dom('input').hasValue('1-2+3');
    state.value = 456;
    await settled();
    assert.dom('input').hasValue('4-5+6');
  });

  test('The parent can receive the updated value via the `update` action', async function (assert) {
    const state = new (class {
      @tracked value = 123;
    })();
    const handleUpdate = (unmasked) => {
      state.value = unmasked;
    };
    await render(
      <template>
        <OneWayInputMask
          @value={{state.value}}
          @mask="9-9+9"
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '456');
    assert.strictEqual(state.value, '456');
  });

  test('Update action works when `value` begins as undefined', async function (assert) {
    const state = new (class {
      @tracked value;
    })();
    const handleUpdate = (unmasked) => {
      state.value = unmasked;
    };
    await render(
      <template>
        <OneWayInputMask
          @value={{state.value}}
          @mask="9-9+9"
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '456');
    assert.strictEqual(state.value, '456');
  });

  test('The parent can receive the masked value via the `update` action', async function (assert) {
    const state = new (class {
      @tracked masked = '';
    })();
    const handleUpdate = (unmasked, maskedValue) => {
      state.masked = maskedValue;
    };
    await render(
      <template>
        <OneWayInputMask @mask="9-9+9" @update={{handleUpdate}} />
      </template>,
    );
    await fillIn('input', '456');
    assert.strictEqual(state.masked, '4-5+6');
  });

  test('It can accept options', async function (assert) {
    const value = 1;
    const options = { placeholder: '*' };
    await render(
      <template>
        <OneWayInputMask @value={{value}} @mask="9-9+9" @options={{options}} />
      </template>,
    );
    assert.dom('input').hasValue('1-*+*');
  });

  test('mask and options are not bound attributes', async function (assert) {
    const options = { placeholder: '*' };
    await render(
      <template>
        <OneWayInputMask @mask="9-9+9" @options={{options}} />
      </template>,
    );
    assert.notOk(find('input').getAttribute('mask'), 'mask is not bound');
    assert.notOk(find('input').getAttribute('options'), 'options is not bound');
  });

  test('mask can dynamically be changed', async function (assert) {
    const state = new (class {
      @tracked mask = '9-9+9';
    })();
    const value = 123;
    await render(
      <template>
        <OneWayInputMask @value={{value}} @mask={{state.mask}} />
      </template>,
    );
    assert.dom('input').hasValue('1-2+3');

    state.mask = '9_9_9';
    await settled();
    assert.dom('input').hasValue('1_2_3');
  });

  test('options can dynamically be changed', async function (assert) {
    const value = 1;
    const state = new (class {
      @tracked options = { placeholder: '*' };
    })();
    await render(
      <template>
        <OneWayInputMask
          @value={{value}}
          @mask="9-9+9"
          @options={{state.options}}
        />
      </template>,
    );
    assert.dom('input').hasValue('1-*+*');

    state.options = { placeholder: '_' };
    await settled();
    assert.dom('input').hasValue('1-_+_');
  });

  test('It can have classes', async function (assert) {
    const value = 123;
    await render(
      <template>
        <OneWayInputMask @value={{value}} @mask="9-9+9" class="foo" />
      </template>,
    );
    assert.dom('.foo').hasValue('1-2+3');
  });

  test('It does not throw errors if key event methods are not passed in', async function (assert) {
    const value = 123;
    await render(
      <template><OneWayInputMask @value={{value}} @mask="9-9+9" /></template>,
    );
    await triggerKeyEvent('input', 'keyup', 13);
    await triggerKeyEvent('input', 'keyup', 27);
    assert.dom('input').hasValue('1-2+3', 'no errors thrown');
  });

  test('Shows the correct value in input if modified in `update` action', async function (assert) {
    const state = new (class {
      @tracked num = 15;
    })();
    const handleUpdate = (unmaskedValue) => {
      let number = parseInt(unmaskedValue, 10);
      if (number > 15) {
        state.num = '15';
      } else {
        state.num = number;
      }
    };
    await render(
      <template>
        <OneWayInputMask
          @value={{state.num}}
          @mask="999999"
          @update={{handleUpdate}}
          @options={{hash
            showMaskOnFocus=false
            showMaskOnHover=false
            jitMasking=true
          }}
        />
      </template>,
    );
    assert.dom('input').hasValue('15');

    await fillIn('input', '155');
    assert.dom('input').hasValue('15');
  });
});
