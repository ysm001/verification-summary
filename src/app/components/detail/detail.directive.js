export function DetailDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/detail/detail.html',
    scope: {
        creationDate: '='
    },
    controller: DetailController,
    controllerAs: 'detail',
    bindToController: true,
    link: postLink
  };

  function postLink(scope, element, attrs, controller) {
    controller.setCategory(attrs.category);
  }

  return directive;
}

class DetailController {
  constructor ($scope, $log, $timeout, $attrs, kernbenchTableJSON, fioTableJSON, lmbenchTableJSON) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.kernbenchTableJSON = kernbenchTableJSON;
    this.lmbenchTableJSON = lmbenchTableJSON;
    this.fioTableJSON = fioTableJSON;
    this.tables = null;
    this.$timeout = $timeout;

    this.activate();
  }

  activate() {
    this.$log.info('Activated detail View');
  }

  loadDataSource(category) {
    this.getJSONService(category).getTableJSONs().then((tables) => {
      this.$log.info('Activated detail View');
      this.tables = [tables[0]];
    });
  }

  getJSONService(category) {
    if (category == 'io') {
      return this.fioTableJSON;
    } else if (category == 'memory') {
      return this.kernbenchTableJSON;
    } else if (category == 'task') {
      return this.lmbenchTableJSON;
    } else {
      return this.kernbenchTableJSON;
    }
  }

  setCategory(category) {
    this.category = category;

    this.$timeout(()=> {
      this.loadDataSource(this.category);
    }, 500);
  }
}
