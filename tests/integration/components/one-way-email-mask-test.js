import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-email-mask', 'Integration | Component | one way email mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-email-mask value=unmaskedValue update=update}}`);
  await fillIn('input', 'test@test.test');
  assert.equal(find('input').value, 'test@test.test');
  assert.equal(this.unmaskedValue, 'test@test.test');
});
