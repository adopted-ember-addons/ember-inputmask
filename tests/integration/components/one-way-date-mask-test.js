import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way date mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(hbs`{{one-way-date-mask value=unmaskedValue update=update}}`);
    await fillIn('input', '1492014');
    assert.dom('input').hasValue('14/09/2014');
    assert.equal(this.unmaskedValue, '14092014');
  });
});
