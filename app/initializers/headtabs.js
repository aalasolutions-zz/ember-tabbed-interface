export function initialize(application) {
  application.inject('route', 'headtabs', 'service:services.headtabs');
  application.inject('service', 'router', 'router:main');
}

export default {
  name: 'headtabs',
  initialize
};
