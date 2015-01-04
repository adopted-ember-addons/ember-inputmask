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
  }
});

test('values are correct', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  // testing filled in value
  fillIn('input', '12345678901234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '(123) 456-7890');
    equal(component.get('unmaskedValue'), 1234567890);
  });
});

test('extensions work', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('extensions', true);
  });

  // testing filled in value
  fillIn('input', '1234567890x1234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '(123) 456-7890 x 1234');
    equal(component.get('unmaskedValue'), 12345678901234);
  });
});