import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, triggerEvent, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import OneWayCreditCardMask from '#src/components/one-way-credit-card-mask';

module('Integration | Component | one way credit card mask', function (hooks) {
  setupRenderingTest(hooks);

  test('Visa formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '4444444444444444');
    assert.dom('input').hasValue('4444-4444-4444-4444');
    assert.strictEqual(state.unmaskedValue, '4444444444444444');
    assert.strictEqual(state.cardType, 'Visa');
  });

  test('MasterCard formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '5444444444444444');
    assert.dom('input').hasValue('5444-4444-4444-4444');
    assert.strictEqual(state.unmaskedValue, '5444444444444444');
    assert.strictEqual(state.cardType, 'MasterCard');
  });

  test('Discover formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '6011444444444444');
    assert.dom('input').hasValue('6011-4444-4444-4444');
    assert.strictEqual(state.unmaskedValue, '6011444444444444');
    assert.strictEqual(state.cardType, 'Discover');
  });

  test('JCB formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '2131444444444444');
    assert.dom('input').hasValue('2131-4444-4444-4444');
    assert.strictEqual(state.unmaskedValue, '2131444444444444');
    assert.strictEqual(state.cardType, 'JCB');
  });

  test('Other formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '9444444444444444');
    assert.dom('input').hasValue('9444-4444-4444-4444');
    assert.strictEqual(state.unmaskedValue, '9444444444444444');
    assert.strictEqual(state.cardType, 'Other');
  });

  test('American Express formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '344444444444444');
    assert.dom('input').hasValue('3444-444444-44444');
    assert.strictEqual(state.unmaskedValue, '344444444444444');
    assert.strictEqual(state.cardType, 'American Express');
  });

  test('Diners Club formatting', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '30544444444444');
    assert.dom('input').hasValue('3054-444444-4444');
    assert.strictEqual(state.unmaskedValue, '30544444444444');
    assert.strictEqual(state.cardType, 'Diners Club');
  });

  test('Card mask switches from one to the other on paste', async function (assert) {
    const state = new (class {
      @tracked unmaskedValue;
      @tracked cardType;
    })();
    const handleUpdate = (unmasked, value, cardType) => {
      state.unmaskedValue = unmasked;
      state.cardType = cardType;
    };
    await render(
      <template>
        <OneWayCreditCardMask
          @value={{state.unmaskedValue}}
          @update={{handleUpdate}}
        />
      </template>,
    );
    await fillIn('input', '30544444444444');
    assert.dom('input').hasValue('3054-444444-4444');
    assert.strictEqual(state.unmaskedValue, '30544444444444');
    assert.strictEqual(state.cardType, 'Diners Club');

    let input = find('input');
    input.setSelectionRange(0, input.value.length);
    await triggerEvent('input', 'paste', {
      clipboardData: {
        getData: () => '2131456745674567',
      },
    });
    await triggerEvent(input, 'input');
    assert.dom('input').hasValue('2131-4567-4567-4567');
    assert.strictEqual(state.unmaskedValue, '2131456745674567');
    assert.strictEqual(state.cardType, 'JCB');
  });
});
