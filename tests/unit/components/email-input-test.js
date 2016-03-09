import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('email-input', 'email-input component', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  },
  unit: true
});

test('values are correct', function(assert) {
  assert.expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  // testing filled in value
  fillIn('input', 'test@test.test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), 'test@test.test');
    assert.equal(component.get('unmaskedValue'), 'test@test.test');
  });
});
