/***
 * 2015-3-28
 * 钱牛牛
 * 指令与服务
 * */

var app = angular.module("qsqApp")

/**
 * 2015-2-2
 * 汪超
 * 后退指令
 * 调用：  <div go-back><div>
 *
 * */
app.directive("goBack", [function () {
    return {
        restrict: "A",
        link: function ($scope, tElement) {
            var $el = $(tElement);
            if (jsbridge.isWeiXin) {
                $el.parent(".topBar").hide();
                $(".contentWrap").css("padding-top", 0);
            }
            if (jsbridge.isAPP()) {
                $el.parent(".topBar").hide();
                $(".contentWrap").css("padding-top", '0');
            }
            $el.on("click", function () {
                history.back();
            });
        }
    }
}]);
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]).filter('trustHtml', ['$sce', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}])
app.directive('scrollNews', [function () {
    /**
     * 2016-02-25
     * 胡桂华
     * 上下滚动新闻
     * 调用：<div scroll-news> </div>
     *
     **/
    return {
        restrict: "A",
        scope: {},
        link: function ($scope, iElement, iAttrs) {

            var top = '0.24rem';
            var current = 0;
            var $items = undefined;
            var scroll_time = 600;
            var animate_time = 2400;

            var scroll = function () {
                window.setInterval(function () {
                    $items.eq(current).animate({
                        'top': '-' + top
                    }, scroll_time).hide(function () {
                        $(this).css('top', top);
                    });
                    $items.eq(++current).show().animate({
                        'top': '0'
                    }, scroll_time);

                    current = current < $items.length - 1 ? current : -1;
                }, animate_time);
            };

            var timeout = window.setInterval(function () {
                if ($items != undefined && $items.length > 0) {
                    window.clearInterval(timeout);
                    scroll();
                } else {
                    $items = $(iElement).find('li');
                }
            }, 200);

        }
    }
}])
/**
 * 2015-2-2
 * 汪超
 * 不同端显示topbar
 * 调用：  <div top-bar><div>
 *
 * */
app.directive("topBar", [function () {
    return {
        restrict: "A",
        link: function ($scope, tElement) {
            var $el = $(tElement);
            //微信 + 苹果app 不显示
            if (jsbridge.isWeiXin || (jsbridge.isIOS && jsbridge.isAPP()) || (jsbridge.isAndroid && jsbridge.isAPP())) {
                $el.hide();
                $(".contentWrap").css("padding-top", 0);
            }
        }
    }
}]);

app.directive("stopTouchmove", [function () {
    return {
        restrict: "A",
        link: function ($scope, iElement) {
            $(iElement).on('touchmove', function (event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
        }
    }
}])

/**
 * 2016-6-28
 * 范志杰
 * 下载条
 * 调用：  <div download-bar></div>
 * */
app.directive('downloadBar', function () {
    var tpl = ['<div class="down-bar">',
        '<div class="logo-info fl">',
        '<div class="logo fl"><images src="//static.qianshengqian.com/asset/mobile/image/download-logo.png"></div>',
        '<div class="info fl">',
        '<p>钱牛牛</p>',
        '<span>注册立得888元理财金</span>',
        '</div>',
        '</div>',
        '<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.qianshengqian" class="btn fr">立即下载</a>',
        '</div>'
    ].join('');

    return {
        restrict: "A",
        template: tpl,
        link: function ($scope, iElement) {
            $("html, body").css({
                'height': 'initial',
                'padding-bottom': '0.52rem'
            });
            if (jsbridge.isAPP()) {
                iElement.hide();
                $("html, body").css({
                    'height': 'initial',
                    'padding-bottom': '0'
                });
            }
        }
    }
});

/**
 * 2016-6-28
 * 范志杰
 * 与苹果公司无关
 * 调用：  <div ios-tip="#ccc"></div>
 * #ccc 为字体颜色
 * */
app.directive('iosTip', function () {
    return {
        restrict: "A",
        template: '<div>本活动与苹果公司无关</div>',
        link: function ($scope, iElement, iAttrs) {
            if (!jsbridge.isIOS) {
                iElement.remove();
                return;
            }
            iElement.css({
                'padding': '0.10rem 0',
                'text-align': 'center',
                'color': iAttrs.iosTip
            });
        }
    }
});

/**
 * 2015-2-2
 * 汪超
 * 下拉底部加载指令
 * 调用：  <div infinite-scroll><div>
 *
 * */
app.directive('infiniteScroll', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
    /**
     * 2015-2-2
     * 汪超
     * 下拉底部加载指令
     * 调用：  <div infinite-scroll><div>
     *
     * */
    return {
        link: function (scope, elem, attrs) {
            var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
            $window = $($window);
            elem = $(elem);
            scrollDistance = 0;
            if (attrs.infiniteScrollDistance != null) {
                scope.$watch(attrs.infiniteScrollDistance, function (value) {
                    return scrollDistance = parseInt(value, 10);
                });
            }
            scrollEnabled = true;
            checkWhenEnabled = false;
            if (attrs.infiniteScrollDisabled != null) {
                scope.$watch(attrs.infiniteScrollDisabled, function (value) {
                    scrollEnabled = !value;
                    if (scrollEnabled && checkWhenEnabled) {
                        checkWhenEnabled = false;
                        return handler();
                    }
                });
            }

            handler = function () {
                var elementBottom, remaining, shouldScroll, windowBottom;
                var elemHeight = elem.height() < elem.outerHeight() ? elem.outerHeight() : elem.height();
                windowBottom = $window.height() + $window.scrollTop();
                elementBottom = elem.offset().top + elemHeight;
                remaining = parseInt(elementBottom - windowBottom, 10);
                shouldScroll = (remaining <= $window.height() * scrollDistance);
                if (shouldScroll && scrollEnabled) {
                    if ($rootScope.$$phase) {
                        return scope.$eval(attrs.infiniteScroll);
                    } else {
                        return scope.$apply(attrs.infiniteScroll);
                    }
                } else if (shouldScroll) {

                    return checkWhenEnabled = true;
                }
            };
            $window.on('scroll', handler);
            scope.$on('$destroy', function () {
                return $window.off('scroll', handler);
            });
            return $timeout((function () {
                if (attrs.infiniteScrollImmediateCheck) {
                    if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                        return handler();
                    }
                } else {
                    return handler();
                }
            }), 0);
        }

    }
}]);
