import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('one-way-credit-card-mask', 'Integration | Component | one way credit card mask', {
  integration: true,

  beforeEach() {
    this.set('update', (unmaskedValue, value, cardType) => {
      this.set('cardType', cardType);
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('Visa formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '4444444444444444');
  assert.equal(find('input').value, '4444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '4444444444444444');
  assert.equal(this.cardType, 'Visa');
});

test('Visa formatting unbound', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask update=update}}`);
  await fillIn('input', '4444444444444444');
  assert.equal(find('input').value, '4444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '4444444444444444');
  assert.equal(this.cardType, 'Visa');
});

test('MasterCard formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '5444444444444444');
  assert.equal(find('input').value, '5444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '5444444444444444');
  assert.equal(this.cardType, 'MasterCard');
});

test('Discover formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '6011444444444444');
  assert.equal(find('input').value, '6011-4444-4444-4444');
  assert.equal(this.unmaskedValue, '6011444444444444');
  assert.equal(this.cardType, 'Discover');
});

test('JCB formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '2131444444444444');
  assert.equal(find('input').value, '2131-4444-4444-4444');
  assert.equal(this.unmaskedValue, '2131444444444444');
  assert.equal(this.cardType, 'JCB');
});

test('Other formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '9444444444444444');
  assert.equal(find('input').value, '9444-4444-4444-4444');
  assert.equal(this.unmaskedValue, '9444444444444444');
  assert.equal(this.cardType, 'Other');
});

test('American Express formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '344444444444444');
  assert.equal(find('input').value, '3444-444444-44444');
  assert.equal(this.unmaskedValue, '344444444444444');
  assert.equal(this.cardType, 'American Express');
});

test('Diners Club formatting', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '30544444444444');
  assert.equal(find('input').value, '3054-444444-4444');
  assert.equal(this.unmaskedValue, '30544444444444');
  assert.equal(this.cardType, 'Diners Club');
});

test('Card mask switches from one to the other on paste', async function(assert) {
  this.render(hbs`{{one-way-credit-card-mask unmaskedValue update=update}}`);
  await fillIn('input', '30544444444444');
  assert.equal(find('input').value, '3054-444444-4444');
  assert.equal(this.unmaskedValue, '30544444444444');
  assert.equal(this.cardType, 'Diners Club');

  let input = find('input');
  input.setSelectionRange(0, input.value.length);
  await triggerEvent('input', 'paste', {
    clipboardData: {
      getData: () => '2131456745674567',
    },
  });
  await triggerEvent(input, 'input');
  assert.equal(find('input').value, '2131-4567-4567-4567');
  assert.equal(this.unmaskedValue, '2131456745674567');
  assert.equal(this.cardType, 'JCB');
});
