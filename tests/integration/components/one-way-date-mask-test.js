import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-date-mask', 'Integration | Component | one way date mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-date-mask value=unmaskedValue update=update}}`);
  await fillIn('input', '14914');
  assert.equal(find('input').value, '14/09/2014');
  assert.equal(this.unmaskedValue, '14092014');
});
