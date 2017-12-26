import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

moduleForComponent('one-way-zip-code-mask', 'Integration | Component | one way zip code mask', {
  integration: true,

  beforeEach() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  },
});

test('filled-in value', async function(assert) {
  this.render(hbs`{{one-way-zip-code-mask value=unmaskedValue update=update}}`);
  await fillIn('input', '12345');
  assert.equal(find('input').value, '12345');
  assert.equal(this.unmaskedValue, 12345);
});

test('full code works', async function(assert) {
  this.render(hbs`{{one-way-zip-code-mask value=unmaskedValue fullCode=true update=update}}`);
  await fillIn('input', '123451234');
  assert.equal(find('input').value, '12345-1234');
  assert.equal(this.unmaskedValue, 123451234);
});
