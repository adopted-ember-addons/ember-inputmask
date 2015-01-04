import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('number-input', 'number-input component', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('number mask is correct', function() {
  expect(4);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  fillIn('input', 'test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '');
    equal(component.get('unmaskedValue'), undefined);
  });

  fillIn('input', '123456789');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '123456789');
    equal(component.get('unmaskedValue'), 123456789);
  });
});


test('decimal mask is correct', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('decimal', true);
  });

  fillIn('input', '1234567.89');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '1234567.89');
    equal(component.get('unmaskedValue'), 1234567.89);
  });
});

test('extra options work', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('decimal', 4);
    component.set('group', true);
    component.set('groupSize', 4);
    component.set('radix', ',');
    component.set('separator', '.');
  });

  fillIn('input', '12345.6789');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '1.2345,6789');
    equal(component.get('unmaskedValue'), '12345,6789');
  });
});

