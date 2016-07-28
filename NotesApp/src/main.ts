import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
  aurelia.use
      .standardConfiguration()
      .globalResources(['resources/elements/loading-indicator', 'resources/value-converters/truncate'])
      .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
