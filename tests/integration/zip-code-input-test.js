import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | zip-code-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{zip-code-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', '12345');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('12345');
    assert.equal(this.unmaskedValue, 12345);
  });

  test('full code works', async function(assert) {
    await render(hbs`{{zip-code-input unmaskedValue=unmaskedValue fullCode=true}}`);
    await fillIn('input', '123451234');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('12345-1234');
    assert.equal(this.unmaskedValue, 123451234);
  });
});
