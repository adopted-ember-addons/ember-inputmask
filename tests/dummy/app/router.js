import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('one-way-input-mask');
    this.route('one-way-number-mask');
    this.route('one-way-currency-mask');
    this.route('one-way-date-mask');
    this.route('one-way-phone-mask');
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
