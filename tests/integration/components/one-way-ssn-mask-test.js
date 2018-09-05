import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way ssn mask', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('update', unmaskedValue => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function(assert) {
    await render(hbs`{{one-way-ssn-mask value=unmaskedValue update=update}}`);
    await fillIn('input', '123456789');
    assert.dom('input').hasValue('123-45-6789');
    assert.equal(this.unmaskedValue, 123456789);
  });
});
