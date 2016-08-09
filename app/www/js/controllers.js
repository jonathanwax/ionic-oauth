angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $cordovaOauth, $http) {

    $scope.googleLogin = function () {


      // https://github.com/nraboy/ng-cordova-oauth
      // $cordovaOauth.windowsLive(string clientId, array appScope, object options)

      $cordovaOauth.google("1076974280517-cl2s1abplmr3dhn9o85t50vuiaad5piq.apps.googleusercontent.com", ["email", "profile"]).then(function (result) {
        $scope.showProfile = false;
        $http.get("https://www.googleapis.com/plus/v1/people/me", { params: { access_token: result.access_token } })
          .then(function (res) {

            $scope.showProfile = true;
            $scope.details = res.data;

          }, function (error) {
            alert("Error: " + error);
          });

      }, function (error) {
        // error
        $scope.details = 'got error';
      });
    }

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
