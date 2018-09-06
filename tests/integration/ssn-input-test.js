import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ssn-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{ssn-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', '123456789');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('123-45-6789');
    assert.equal(this.unmaskedValue, 123456789);
  });
});
