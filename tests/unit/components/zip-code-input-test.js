import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('zip-code-input', 'zip-code-input component', {
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
  fillIn('input', '12345');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '12345');
    equal(component.get('unmaskedValue'), 12345);
  });
});

test('full code works', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('fullCode', true);
  });

  // testing filled in value
  fillIn('input', '123451234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '12345-1234');
    equal(component.get('unmaskedValue'), 123451234);
  });
});