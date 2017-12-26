import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-ssn-mask', 'Integration | Component | one way ssn mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-ssn-mask value=unmaskedValue update=update}}`);
  await fillIn('input', '123456789');
  assert.equal(find('input').value, '123-45-6789');
  assert.equal(this.unmaskedValue, 123456789);
});
