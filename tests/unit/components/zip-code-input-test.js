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
  },
  unit: true
});

test('values are correct', function(assert) {
  assert.expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  // testing filled in value
  fillIn('input', '12345');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), '12345');
    assert.equal(component.get('unmaskedValue'), 12345);
  });
});

test('full code works', function(assert) {
  assert.expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('fullCode', true);
  });

  // testing filled in value
  fillIn('input', '123451234');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), '12345-1234');
    assert.equal(component.get('unmaskedValue'), 123451234);
  });
});
