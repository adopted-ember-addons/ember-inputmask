import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, triggerEvent } from 'ember-native-dom-helpers';

module('Integration | Component | date-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{date-input unmaskedValue=unmaskedValue}}`);
    fillIn('input', '1492014');
    triggerEvent('input', 'blur');
    assert.dom('input').hasValue('14/09/2014');
    assert.equal(this.unmaskedValue, '14092014');
  });
});