import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, triggerEvent, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | phone-number-input', function(hooks) {
  setupRenderingTest(hooks);

  test('filled-in value', async function(assert) {
    await render(hbs`{{phone-number-input unmaskedValue=unmaskedValue}}`);
    await fillIn('input', '12345678901234');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('(234) 567-8901');
    assert.equal(this.unmaskedValue, 2345678901);
  });

  test('extensions work', async function(assert) {
    await render(hbs`{{phone-number-input unmaskedValue=unmaskedValue extensions=true}}`);
    await fillIn('input', '2234567890x1234');
    await triggerEvent('input', 'blur');
    assert.dom('input').hasValue('(223) 456-7890 x 1234');
    assert.equal(this.unmaskedValue, 22345678901234);
  });
});
