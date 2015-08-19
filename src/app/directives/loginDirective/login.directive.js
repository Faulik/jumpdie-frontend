var moduleName = 'bookShelf.directives';

const Q = new WeakMap();

class loginDirective {
  constructor($q) {
    this.require = 'ngModel';
    this.restrict = 'A';
    this.template = '<div></div>';

    Q.set(this, $q);
  }

  link(scope, elem, attrs) {

  }

  static loginFactory($q) {
    loginDirective.instance = new loginDirective($q);
    return loginDirective.instance;
  }
}

export default angular.module('app.login-directive', [])
  .directive('loginDirective', loginDirective.loginFactory)
  .name;