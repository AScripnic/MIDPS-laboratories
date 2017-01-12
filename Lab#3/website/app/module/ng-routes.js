import moduleName from '../name';

let states = [
  {
    name: 'home',
    url: '',
    template: `
        <div>
            <h1>Welcome on the first page</h1>
        </div>
    `
  }
];

angular
  .module(moduleName)
  .config(function($stateProvider) {
    angular.forEach(states, (state) => {
      $stateProvider.state(state);
      console.log(state);
    });
  });