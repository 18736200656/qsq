/**
 * Created by gaojunnan on 2017/5/8.
 */
angular.module('qsqApp')
    .controller('indexController',['$scope','serviceApi',function ($scope,serviceApi) {
         qsqtool.setTitle("钱粉福利日");
        var userAgent = window.navigator.userAgent.toLowerCase();
         $scope.iostips = !(userAgent.indexOf("android") > -1 || userAgent.indexOf("linux") > -1) ? true : false;
    }]);
