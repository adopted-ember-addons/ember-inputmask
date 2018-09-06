import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{email-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', 'test@test.test');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('test@test.test');
    assert.equal(this.unmaskedValue, 'test@test.test');
  });
});
