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
  }
});

test('masked values are correct', function() {
  expect(1);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  // testing filled in value
  fillIn('input', 'test@test.test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), 'test@test.test');
  });
});

test('unmasked values are correct', function() {
  expect(1);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  // testing default value
  fillIn('input', 'test@test.test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(component.get('unmaskedValue'), 'testtesttest');
  });
});