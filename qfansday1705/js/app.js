/***
 * 2015-3-28
 * 钱牛牛
 * 路由 重构
 * */

 angular.module("qsqApp", ['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.otherwise("/index"); //默认

     $stateProvider
         .state('index', {
             url: "/index",
             templateUrl: "tpl/index.html",
             controller: "indexController"
         })
 }]).config(["$httpProvider", function ($httpProvider) {



 }]);
