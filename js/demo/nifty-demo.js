/*! jquery.cookie v1.4.1 | MIT */ ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (b) {}
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g,
        h = a.cookie = function(e, g, i) {
            if (void 0 !== g && !a.isFunction(g)) {
                if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                    var j = i.expires,
                        k = i.expires = new Date;
                    k.setTime(+k + 864e5 * j)
                }
                return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
            }
            for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                var p = m[n].split("="),
                    q = c(p.shift()),
                    r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            return l
        };
    h.defaults = {}, a.removeCookie = function(b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })), !a.cookie(b))
    }
});
$(document).ready(function() {
    function e() {
        var e = navigator.cookieEnabled ? !0 : !1;
        return "undefined" != typeof navigator.cookieEnabled || e || (document.cookie = "testcookie", e = -1 != document.cookie.indexOf("testcookie") ? !0 : !1), e
    } {
        var t = $("#demo-set");
        $("#demo-set-icon"), $("#demo-set-btngo")
    }
    t.length && ($("html").on("click", function(e) {
        t.hasClass("open") && ($(e.target).closest("#demo-set").length || t.removeClass("open"))
    }), $("#demo-set-btn").on("click", function(e) {
        e.stopPropagation(), t.toggleClass("open")
    }), 0 == e() && ($.niftyNoty({
        type: "danger",
        message: "Your browser's <strong>cookie</strong> functionality is turned off. Some settings won't work as expected....",
        container: "#demo-set-alert",
        closeBtn: !1
    }), $("#demo-set").addClass("no-cookie")));
    var n = "easeInQuart easeOutQuart easeInBack easeOutBack easeInOutBack steps jumping rubber",
        i = $("#demo-anim"),
        a = $("#demo-ease");
    i.on("change", function() {
        i.niftyCheck("isChecked") ? (nifty.container.addClass("effect"), a.prop("disabled", !1).selectpicker("refresh"), u("settings-animation", "effect")) : (nifty.container.removeClass("effect " + n), a.prop("disabled", !0).selectpicker("refresh"), u("settings-animation", "none"))
    }), a.selectpicker().on("change", function() {
        var e = ($("option:selected", this), this.value);
        e && (nifty.container.removeClass(n).addClass(e), u("settings-animation", e))
    });
    var s = $("#demo-nav-coll"),
        o = $("#demo-nav-fixed"),
        f = $("#demo-nav-offcanvas");
    s.on("change", function() {
        return $.cookie("settings-nav-offcanvas") ? (u("settings-nav-offcanvas", !1), u("settings-nav-collapsed", !0), t.removeClass("open"), location.reload(!0), !1) : void(s.niftyCheck("isChecked") ? ($.niftyNav("collapse"), u("settings-nav-collapsed", !0)) : ($.niftyNav("expand"), u("settings-nav-collapsed", !1)))
    }), o.on("change", function() {
        o.niftyCheck("isChecked") ? ($.niftyNav("fixedPosition"), u("settings-nav-fixed", !0)) : ($.niftyNav("staticPosition"), u("settings-nav-fixed", !1))
    }), f.selectpicker().on("change", function() {
        u("settings-nav-collapsed", !1), u("settings-nav-offcanvas", this.value), t.removeClass("open"), location.reload(!0)
    }).selectpicker("val", $.cookie("settings-nav-offcanvas"));
    var c = $("#demo-asd-vis"),
        d = $("#demo-asd-fixed"),
        l = $("#demo-asd-align"),
        r = $("#demo-asd-themes");
    c.on("change", function() {
        c.niftyCheck("isChecked") ? ($.niftyAside("show"), u("settings-asd-visibility", !0)) : ($.niftyAside("hide"), u("settings-asd-visibility", !1))
    }), d.on("change", function() {
        d.niftyCheck("isChecked") ? ($.niftyAside("fixedPosition"), u("settings-asd-fixed", !0)) : ($.niftyAside("staticPosition"), u("settings-asd-fixed", !1))
    }), l.on("change", function() {
        l.niftyCheck("isChecked") ? ($.niftyAside("alignLeft"), u("settings-asd-align", "left")) : ($.niftyAside("alignRight"), u("settings-asd-align", "right"))
    }), r.on("change", function() {
        r.niftyCheck("isChecked") ? ($.niftyAside("brightTheme"), u("settings-asd-theme", "bright")) : ($.niftyAside("darkTheme"), u("settings-asd-theme", "dark"))
    });
    var g = $("#demo-navbar-fixed");
    g.on("change", function() {
        g.niftyCheck("isChecked") ? (nifty.container.addClass("navbar-fixed"), u("settings-navbar-fixed", !0)) : (nifty.container.removeClass("navbar-fixed"), u("settings-navbar-fixed", !1)), nifty.mainNav.niftyAffix("update"), nifty.aside.niftyAffix("update")
    });
    var y = $("#demo-footer-fixed");
    y.on("change", function() {
        y.niftyCheck("isChecked") ? (nifty.container.addClass("footer-fixed"), u("settings-footer-fixed", !0)) : (nifty.container.removeClass("footer-fixed"), u("settings-footer-fixed", !1))
    });
    var m = $(".demo-theme"),
        h = function(e, t) {
            var n = $("#theme"),
                i = "css/themes/type-" + t + "/" + e + ".min.css";
            n.length ? n.prop("href", i) : (n = '<link id="theme" href="' + i + '" rel="stylesheet">', $("head").append(n)), u("settings-theme-name", e), u("settings-theme-type", t)
        };
    $("#demo-theme").on("click", ".demo-theme", function(e) {
        e.preventDefault();
        var t = $(this);
        return t.hasClass("disabled") ? !1 : (h(t.attr("data-theme"), t.attr("data-type")), m.removeClass("disabled"), t.addClass("disabled"), !1)
    }), $("#demo-lang-switch").niftyLanguage({
        onChange: function(e) {
            $.niftyNoty({
                type: "info",
                icon: "fa fa-info fa-lg",
                title: "Language changed",
                message: "The language apparently changed, the selected language is : <strong> " + e.id + " " + e.name + "</strong> "
            })
        }
    });
    var v = Array.prototype.slice.call(document.querySelectorAll(".demo-switch"));
    v.forEach(function(e) {
        new Switchery(e)
    });
    var k = [{
        icon: "fa fa-info fa-lg",
        title: "Info",
        type: "info"
    }, {
        icon: "fa fa-star fa-lg",
        title: "Primary",
        type: "primary"
    }, {
        icon: "fa fa-thumbs-up fa-lg",
        title: "Success",
        type: "success"
    }, {
        icon: "fa fa-bolt fa-lg",
        title: "Warning",
        type: "warning"
    }, {
        icon: "fa fa-times fa-lg",
        title: "Danger",
        type: "danger"
    }, {
        icon: "fa fa-leaf fa-lg",
        title: "Mint",
        type: "mint"
    }, {
        icon: "fa fa-shopping-cart fa-lg",
        title: "Purple",
        type: "purple"
    }, {
        icon: "fa fa-heart fa-lg",
        title: "Pink",
        type: "pink"
    }, {
        icon: "fa fa-sun-o fa-lg",
        title: "Dark",
        type: "dark"
    }];
    if ($("#demo-alert").on("click", function(e) {
            e.preventDefault();
            var t = nifty.randomInt(0, 8);
            $.niftyNoty({
                type: k[t].type,
                icon: k[t].icon,
                title: k[t].title,
                message: "Lorem ipsum dolor sit amet.",
                container: "floating",
                timer: 3500
            })
        }), $("#demo-page-alert").on("click", function(e) {
            e.preventDefault();
            var t = nifty.randomInt(0, 8),
                n = function() {
                    return nifty.randomInt(0, 5) < 4 ? 3e3 : 0
                }();
            $.niftyNoty({
                type: k[t].type,
                icon: k[t].icon,
                title: function() {
                    return n > 0 ? "Autoclose Alert" : "Sticky Alert Box"
                }(),
                message: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
                timer: n
            })
        }), $("#demo-toggle-aside").on("click", function(e) {
            e.preventDefault(), nifty.container.hasClass("aside-in") ? ($.niftyAside("hide"), c.niftyCheck("toggleOff")) : ($.niftyAside("show"), c.niftyCheck("toggleOn"))
        }), "undefined" == typeof window.demoLayout) {
        var p = ["settings-animation", "settings-nav-fixed", "settings-nav-collapsed", "settings-nav-offcanvas", "settings-asd-visibility", "settings-asd-fixed", "settings-asd-align", "settings-asd-theme", "settings-navbar-fixed", "settings-footer-fixed", "settings-theme-type", "settings-theme-name"],
            u = function(e, t) {
                0 == t ? $.removeCookie(e, {
                    path: "/"
                }) : $.cookie(e, t === !0 ? "1" : t, {
                    expires: 7,
                    path: "/"
                })
            },
            C = function() {
                for (var e = 0; e < p.length; e++) $.removeCookie(p[e], {
                    path: "/"
                })
            };
        $("#demo-reset-settings").on("click", function() {
            console.log('entrou'),
            i.niftyCheck("toggleOn"), nifty.container.removeClass(n).addClass("effect"), a.selectpicker("val", "effect"), o.niftyCheck("toggleOff"), $.niftyNav("staticPosition"), s.niftyCheck("toggleOff"), $.niftyNav("expand"), nifty.container.removeClass("mainnav-in mainnav-out mainnav-sm"), f.selectpicker("val", "none"), c.niftyCheck("toggleOff"), $.niftyAside("hide"), d.niftyCheck("toggleOff"), $.niftyAside("staticPosition"), l.niftyCheck("toggleOff"), $.niftyAside("alignRight"), r.niftyCheck("toggleOff"), $.niftyAside("darkTheme"), g.niftyCheck("toggleOff"), nifty.container.removeClass("navbar-fixed"), nifty.mainNav.niftyAffix("update"), nifty.aside.niftyAffix("update"), y.niftyCheck("toggleOff"), nifty.container.removeClass("footer-fixed"), $("#theme").remove(), $(".demo-theme").removeClass("disabled").filter('[data-type="mainnav"]').filter('[data-theme="theme-navy"]').addClass("disabled"), C(), $.niftyNoty({
                icon: "fa fa-check fa-lg",
                type: "success",
                message: "All settings has been restored to the factory default values.",
                container: "#demo-set-alert",
                timer: 4e3
            })
        }), $.cookie("settings-animation") && ("none" == $.cookie("settings-animation") ? (nifty.container.removeClass("effect " + n), i.niftyCheck("toggleOff"), a.prop("disabled", !0).selectpicker("refresh")) : (i.niftyCheck("toggleOn"), nifty.container.addClass("effect " + $.cookie("settings-animation")), a.selectpicker("val", $.cookie("settings-animation")))), 1 == $.cookie("settings-nav-fixed") || nifty.container.hasClass("mainnav-fixed") ? (o.niftyCheck("toggleOn"), $.niftyNav("fixedPosition")) : (o.niftyCheck("toggleOff"), $.niftyNav("staticPosition")), 1 == $.cookie("settings-nav-collapsed") ? (s.niftyCheck("toggleOn"), $.niftyNav("collapse"), $(".mainnav-toggle").removeClass("push slide reveal")) : (s.niftyCheck("toggleOff"), $.cookie("settings-nav-offcanvas") && (nifty.container.removeClass("mainnav-in mainnav-sm mainnav-lg"), $.niftyNav($.cookie("settings-nav-offcanvas") + "Out"), $(".mainnav-toggle").removeClass("push slide reveal").addClass($.cookie("settings-nav-offcanvas")))), c.niftyCheck(nifty.container.hasClass("aside-in") ? "toggleOn" : "toggleOff"), d.niftyCheck(nifty.container.hasClass("aside-fixed") ? "toggleOn" : "toggleOff"), l.niftyCheck(nifty.container.hasClass("aside-left") ? "toggleOn" : "toggleOff"), r.niftyCheck(nifty.container.hasClass("aside-left") ? "toggleOn" : "toggleOff"), 1 == $.cookie("settings-navbar-fixed") || nifty.container.hasClass("navbar-fixed") ? (g.niftyCheck("toggleOn"), nifty.container.addClass("navbar-fixed"), nifty.mainNav.niftyAffix("update"), nifty.aside.niftyAffix("update")) : (g.niftyCheck("toggleOff"), nifty.container.removeClass("navbar-fixed"), nifty.mainNav.niftyAffix("update"), nifty.aside.niftyAffix("update")), 1 == $.cookie("settings-footer-fixed") || nifty.container.hasClass("footer-fixed") ? (y.niftyCheck("toggleOn"), nifty.container.addClass("footer-fixed")) : (y.niftyCheck("toggleOff"), nifty.container.removeClass("footer-fixed")), $.cookie("settings-theme-name") && $.cookie("settings-theme-type") ? (h($.cookie("settings-theme-name"), $.cookie("settings-theme-type")), $(".demo-theme").filter("[data-type=" + $.cookie("settings-theme-type") + "]").filter("[data-theme=" + $.cookie("settings-theme-name") + "]").addClass("disabled")) : $(".demo-theme.demo-c-navy").addClass("disabled")
    }
});