/**
 * html 字体设置
 * */
(function () {
    var docEl = document.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var _size = docEl.clientWidth / 375;
            // console.log(_size);
            // _size = _size > 1.2 ? 1.2 : _size;
            _size = _size > 2 ? 2 : _size;
            docEl.style.fontSize = parseInt(100 * _size) + "px";
            // docEl.style.fontSize = (90 * _size) + "px";
        };
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener("DOMContentLoaded", recalc, false);
    if (document.readyState === "complete" || document.readyState === "loaded") {
        recalc();
    }
})();
