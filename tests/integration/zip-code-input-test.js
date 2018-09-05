import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

module('Integration | Component | zip-code-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{zip-code-input unmaskedValue=unmaskedValue}}`);
    fillIn('input', '12345');
    triggerEvent('input', 'blur');
    assert.dom('input').hasValue('12345');
    assert.equal(this.unmaskedValue, 12345);
  });

  test('full code works', async function(assert) {
    await render(hbs`{{zip-code-input unmaskedValue=unmaskedValue fullCode=true}}`);
    fillIn('input', '123451234');
    triggerEvent('input', 'blur');
    assert.dom('input').hasValue('12345-1234');
    assert.equal(this.unmaskedValue, 123451234);
  });
});