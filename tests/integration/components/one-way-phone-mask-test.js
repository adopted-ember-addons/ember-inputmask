import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way phone mask', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function(assert) {
    await render(hbs`{{one-way-phone-mask value=unmaskedValue update=update}}`);
    await fillIn('input', '2345678901234');
    assert.dom('input').hasValue('(234) 567-8901');
    assert.equal(this.unmaskedValue, 2345678901);
  });

  test('extensions work', async function(assert) {
    await render(hbs`{{one-way-phone-mask value=unmaskedValue extensions=true update=update}}`);
    await fillIn('input', '2234567890x1234');
    assert.dom('input').hasValue('(223) 456-7890 x 1234');
    assert.equal(this.unmaskedValue, 22345678901234);
  });
});
