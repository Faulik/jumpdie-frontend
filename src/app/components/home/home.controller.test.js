import home from './home';

describe('Controller: Home', function(){
  let $controller;

  beforeEach(angular.mock.module(home));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('name is initalized', function() {
    let ctrl = $controller('HomeController');
    expect(ctrl.title).toBe('Jumpdie');
  });
});