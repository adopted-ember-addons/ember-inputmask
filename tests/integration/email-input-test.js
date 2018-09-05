import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

module('Integration | Component | email-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{email-input unmaskedValue=unmaskedValue}}`);
    fillIn('input', 'test@test.test');
    triggerEvent('input', 'blur');
    assert.equal(find('input').value, 'test@test.test');
    assert.equal(this.unmaskedValue, 'test@test.test');
  });
});