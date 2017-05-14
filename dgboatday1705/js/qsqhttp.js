/**
 * 2015-1-4
 *  汪超
 *  qsqhttp ajax 服务
 *
 * */
// 测试用户id 14257


angular.module("qsqApp").factory("qsqhttp", ["$http", function($http) {
  var user_token;
  var appId = "h5_3.0.4"; //版本号
  var h5_v = "h5_3.0.8";

  var originHost = location.origin;
  var devHost = 'http://shop.qsq.com';
  if (originHost.indexOf("localhost") > 0 || originHost == devHost) {
    var host = devHost;
  } else {
    var host = originHost;
  }

  function getToken() {
    try {
      var _token, obj = {};
      if (jsbridge.isAPP()) obj = JSON.parse(qsqapi.sysPlatform());

      // console.log('getToken.token: '+getToken.token);
      if (getToken.token) return getToken.token;

      if (!_token && (_token = obj.userToken)) {
        // console.log('1: '+_token);
        qsqtool.setCookie("user_token", _token, "/")
      }
      _token = qsqtool.getCookie("user_token");
      // console.log('2: '+_token);
      getToken.token = _token;
      return getToken.token;
    } catch (er) {
      qsqtool.alert('当前页面繁忙，请至"微信公众号"钱牛牛平台进行相应操作。');
    }
  }

  qsqtool.clearToken = function() {
    getToken.token = "";
    // qsqtool.delCookie("user_token","/");
  };

  function getUa() {
    if (getUa.ua) {
      return getUa.ua;
    }
    var qsq_ua = qsqtool.getCookie("qsq_ua"),
      random, nowTime;
    if (!qsq_ua) {
      random = parseInt(Math.random() * 1e16);
      nowTime = (new Date()).getTime();
      qsq_ua = h5_v.replace(/\W/g, "") + random.toString(32) + nowTime.toString(32);
      qsqtool.setCookie("qsq_ua", qsq_ua, "/", 311040000);
    }
    getUa.ua = qsq_ua;
    return qsq_ua;
  }

  function HTTPP(option) {
    var ua = getUa();
    var _token = getToken();
    var config = jQuery.extend(true, {
      method: 'GET',
      headers: {
        "X-Udid": ua,
        "X-App-ID": appId,
        "X-User-Token": _token
        // "X-User-Token": 'Zxtp5Mq06gUE2mqUscbo-UzV0wVW1lEBcqZ3Mu4_'
      },
      cache: false,
      timeout: 30000
    }, option);

    return $http(config).error(function(errors) {
      console.log(errors);
      if (errors.code == 401) {
        if (!jsbridge.isAPP()) {
            if (location.href.indexOf("mobile") > 0) {
                var url = location.origin + "/mobile/" + "#/login/";
            } else {
                var url = location.origin + "#/login/";
            }
            location.href = url;
        } else {
            jsbridge.showLogin();
        }
        return;
      }
      qsqtool.ajaxError();
    });
  }

  return {
    getAjax: function(url) {
      return HTTPP({
        url: url
      });
    },
    postAjax: function(url, params, loading) {
      loading = loading || 0;
      return HTTPP({
        url: url,
        method: "POST",
        data: params,
        loading: loading
      });
    },

    // 调用新版接口调用  shop.qsq.com/
    getShopAjax: function(url) {
      return HTTPP({
        url:  host + url,
        method: "GET"
      });
    },
    postShopAjax: function(url, params, loading) {
      loading = loading || 0;
      return HTTPP({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url:  host + url,
        method: "POST",
        data: params,
        loading: loading
      });
    },
    putShopAjax: function(url, params, loading) {
      return HTTPP({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url:  host + url,
        method: "PUT",
        data: params,
        loading: loading
      });
    },
    delShopAjax: function(url, params, loading) {
      loading = loading || 0;
      return HTTPP({
        url: host + url,
        method: "DELETE",
        data: params,
        loading: loading
      });
    },
    getStaticAjax: function(url) {
      return HTTPP({
        url: location.origin + location.pathname + url
      });
    }
  }
}]);
