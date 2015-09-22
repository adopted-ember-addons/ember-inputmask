import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('phone-number-input', 'phone-number-input component', {
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
  fillIn('input', '12345678901234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), '(123) 456-7890');
    assert.equal(component.get('unmaskedValue'), 1234567890);
  });
});

test('extensions work', function(assert) {
  assert.expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('extensions', true);
  });

  // testing filled in value
  fillIn('input', '1234567890x1234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), '(123) 456-7890 x 1234');
    assert.equal(component.get('unmaskedValue'), 12345678901234);
  });
});
