import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
  aurelia.use
      .standardConfiguration()
      .globalResources('resources/elements/loading-indicator')
      .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
