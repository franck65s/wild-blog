/*
Create Angular config in app.config module
*/
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'use strict'
    // Define prefix
    $locationProvider.hashPrefix('!');
    // For each url not found redirection to '/'
    $urlRouterProvider.otherwise('/posts/');
    /*
      Define a state with name 'app' this state is abstract and url is empty (root of application)
      template is ui-view it's used to display nested views
    */
    $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<navbar /><div class="container"><ui-view></ui-view></div>'
        })
        .state('algo1', {
            url: '/algo1',
            template: "Ce sont mes amis : {{friends}}",
            controller: ['$scope', function($scope) {
                function friend(friends){
                  let myfriends = [];
                  friends.forEach((friend) => {
                    if(friend.length === 4) {
                      myfriends.push(friend);
                    }
                  })
                  return myfriends;
                }
                console.log(friend(["Ryan", "Kieran", "Mark"]))
                $scope.friends = friend(["Ryan", "Kieran", "Mark"]);
            }]
        })

        .state('callback', {
            url: '/auth/callback/:token',
            template: '',
            controller: ['UsersService', '$stateParams', '$state', function (UsersService, $stateParams, $state) {
                if ($stateParams.token) {
                    UsersService.setToken($stateParams.token).then((user) => {
                        let toastContent = `Welcome ${user.name} !`
                        Materialize.toast(toastContent, 4000, 'toast-success')
                        $state.go('blog.list')
                        $stateProvider
                    })

                } else {
                    $state.go('blog.list')
                }
            }]
        })
}]