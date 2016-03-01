export function initialize(application) {
  application.inject('route', 'unsavedModels', 'service:services.unsavedModels');

}

export default {
  name: 'unsaved-models',
  initialize
};
