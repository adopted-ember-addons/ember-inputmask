import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find } from 'ember-native-dom-helpers';

module('Integration | Component | one way currency mask', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function(assert) {
    await render(hbs`{{one-way-currency-mask value=unmaskedValue update=update}}`);
    await fillIn('input', '1234567.89');
    assert.equal(find('input').value, '$ 1,234,567.89');
    assert.equal(this.unmaskedValue, '1234567.89');
  });
});