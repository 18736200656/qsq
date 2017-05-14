/***
 *2017-04
 *积分商城接口
 *曲绰、范志杰
 * */
angular.module("qsqApp").factory('serviceApi', ["qsqhttp", function(qsqhttp) {

  var postAjax = qsqhttp.postAjax,
    getAjax = qsqhttp.getAjax;

  // 调用新版接口  shop.qsq.com/
  var postShopAjax = qsqhttp.postShopAjax,
    getShopAjax = qsqhttp.getShopAjax,
    putShopAjax = qsqhttp.putShopAjax,
    delShopAjax = qsqhttp.delShopAjax,
    getStaticAjax = qsqhttp.getStaticAjax;

  return {
    //获取用户user接口
    getShopUser: function() {
      return getShopAjax("/user");
    },
    // 新版接口
    getShopHome: function() {
      return getShopAjax("/home");
    },
    // 获取地址
    getShopAddress: function(address_id) {
      return getShopAjax("/address/" + (address_id ? address_id : ''));
    },
    // 新增地址
    postShopAddress: function(params) {
      return postShopAjax("/address", params);
    },
    // 更新地址
    putShopAddress: function(address_id, params) {
      return putShopAjax("/address/" + (address_id ? address_id : ''), params);
    },
    // 删除地址
    delShopAddress: function(address_id) {
      return delShopAjax("/address/" + (address_id ? address_id : ''));
    },
    // 地址数据
    getStaticAddress: function() {
      return getStaticAjax('/static/city-id-name.json');
    },

    getShopProduct: function(product_id) {
      return getShopAjax("/product/" + (product_id ? product_id : ''));
    },
    //获取商品详情
    getProductDetail: function() {
      return getShopAjax("/product");
    },
    //获取积分记录
    getShopCredit: function(current_page) {
      return getShopAjax("/credit/detail?page="+ current_page)
    },
    // 获取账户积分
    getShopAccount: function() {
      return getShopAjax("/credit")
    },
    postProductOrder: function(product_id, params) {
      // return postShopAjax("/user/logout", params);
      return postShopAjax("/product/" + product_id + "/order", params);
    },
    //获取兑换记录
    getShopHistory: function (current_page) {
      return getShopAjax("/order?page="+ current_page);
    }
  }
}]);
