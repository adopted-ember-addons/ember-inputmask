import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | currency-input', function(hooks) {
  setupRenderingTest(hooks);

  skip('default value', async function(assert) {
    this.render(hbs`{{currency-input unmaskedValue=unmaskedValue}}`);
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('$ 0.00');
    assert.equal(this.unmaskedValue, '0.00');
  });

  test('filled-in value', async function(assert) {
    await render(hbs`{{currency-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', '1234567.89');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('$ 1,234,567.89');
    assert.equal(this.unmaskedValue, '1234567.89');
  });
});
