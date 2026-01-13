import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import OneWayNumberMask from '#src/components/one-way-number-mask';

module('Integration | Component | one way number mask', function (hooks) {
  setupRenderingTest(hooks);

  test('It defaults to an integer mask', async function (assert) {
    const value = 1234.44;
    await render(<template><OneWayNumberMask @value={{value}} /></template>);

    assert.dom('input').hasValue('1,234');
  });

  test('It can be a decimal mask with 2 digits with one argument', async function (assert) {
    const value = 1234.567;
    await render(
      <template>
        <OneWayNumberMask @value={{value}} @decimal={{true}} />
      </template>,
    );

    assert.dom('input').hasValue('1,234.57');
    assert
      .dom('input')
      .doesNotHaveAttribute('decimal', 'decimal is not a bound attribute');
  });

  test('Can change default digits with options', async function (assert) {
    const value = 1234.567;
    await render(
      <template>
        <OneWayNumberMask
          @value={{value}}
          @decimal={{true}}
          @options={{hash digits=3}}
        />
      </template>,
    );

    assert.dom('input').hasValue('1,234.567');
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
        <OneWayNumberMask @value={{state.value}} @update={{handleUpdate}} />
      </template>,
    );
    await fillIn('input', 456);
    assert.strictEqual(state.value, '456');
  });

  test('It disallows decimal via the `update` action', async function (assert) {
    const state = new (class {
      @tracked value = 123;
    })();
    const handleUpdate = (unmasked) => {
      state.value = unmasked;
    };
    await render(
      <template>
        <OneWayNumberMask @value={{state.value}} @update={{handleUpdate}} />
      </template>,
    );
    await fillIn('input', '.');
    assert.strictEqual(state.value, '');
    assert.dom('input').hasValue('');
  });

  test('Internal options are not clobbered by external ones', async function (assert) {
    const state = new (class {
      @tracked value = 123;
    })();
    const handleUpdate = (unmasked) => {
      state.value = unmasked;
    };
    await render(
      <template>
        <OneWayNumberMask
          @value={{state.value}}
          @update={{handleUpdate}}
          @options={{hash prefix="$"}}
          @decimal={{true}}
        />
      </template>,
    );
    await fillIn('input', 1);
    await fillIn('input', 456.78901);
    assert.dom('input').hasValue('$456.79');
  });

  test('It can show a trailing decimal', async function (assert) {
    let callCount = 0;
    const handleUpdate = () => callCount++;
    const value = '1234';
    await render(
      <template>
        <OneWayNumberMask
          @value={{value}}
          @update={{handleUpdate}}
          @options={{hash prefix="$"}}
          @decimal={{true}}
        />
      </template>,
    );
    await fillIn('input', '1234.');
    assert.strictEqual(callCount, 0, '');
  });
});
