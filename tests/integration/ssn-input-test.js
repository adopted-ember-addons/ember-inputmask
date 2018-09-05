import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

module('Integration | Component | ssn-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{ssn-input unmaskedValue=unmaskedValue}}`);
    fillIn('input', '123456789');
    triggerEvent('input', 'blur');
    assert.equal(find('input').value, '123-45-6789');
    assert.equal(this.unmaskedValue, 123456789);
  });
});