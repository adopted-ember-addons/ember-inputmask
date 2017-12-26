import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-phone-mask', 'Integration | Component | one way phone mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-phone-mask value=unmaskedValue update=update}}`);
  await fillIn('input', '2345678901234');
  assert.equal(find('input').value, '(234) 567-8901');
  assert.equal(this.unmaskedValue, 2345678901);
});

test('extensions work', async function(assert) {
  this.render(hbs`{{one-way-phone-mask value=unmaskedValue extensions=true update=update}}`);
  await fillIn('input', '2234567890x1234');
  assert.equal(find('input').value, '(223) 456-7890 x 1234');
  assert.equal(this.unmaskedValue, 22345678901234);
});
