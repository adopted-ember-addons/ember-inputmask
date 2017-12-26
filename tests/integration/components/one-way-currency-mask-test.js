import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-currency-mask', 'Integration | Component | one way currency mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-currency-mask value=value update=update}}`);
  await fillIn('input', '1234567.89');
  assert.equal(find('input').value, '$ 1,234,567.89');
  assert.equal(this.unmaskedValue, '1234567.89');
});
