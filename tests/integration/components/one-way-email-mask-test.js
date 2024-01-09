import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | one way email mask', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('update', (unmaskedValue) => {
      this.set('unmaskedValue', unmaskedValue);
    });
  });

  test('filled-in value', async function (assert) {
    await render(hbs`{{one-way-email-mask value=unmaskedValue update=update}}`);
    await fillIn('input', 'test@test.test');
    assert.dom('input').hasValue('test@test.test');
    assert.equal(this.unmaskedValue, 'test@test.test');
  });
});
