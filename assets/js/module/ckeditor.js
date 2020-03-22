/*
Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
    if (window.CKEDITOR && window.CKEDITOR.dom) return; window.CKEDITOR || (window.CKEDITOR = function () {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, d = {
            timestamp: "JB9C", version: "4.13.1", revision: "411985373e", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
                var b = window.CKEDITOR_BASEPATH || ""; if (!b) for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) { var g = c[d].src.match(a); if (g) { b = g[1]; break } } -1 == b.indexOf(":/") && "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
                    b : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
            }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp); return a }, domReady: function () {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded",
                            a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (c) { }
                } function b() { for (var a; a = c.shift();)a() } var c = []; return function (b) {
                    function d() { try { document.documentElement.doScroll("left") } catch (b) { setTimeout(d, 1); return } a() } c.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange",
                            a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (h) { } document.documentElement.doScroll && b && d()
                    }
                }
            }()
        }, b = window.CKEDITOR_GETURL; if (b) { var c = d.getUrl; d.getUrl = function (a) { return b.call(d, a) || c.call(d, a) } } return d
    }());
    CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var d = CKEDITOR.event.prototype, b; for (b in d) null == a[b] && (a[b] = d[b]) }, CKEDITOR.event.prototype = function () {
        function a(a) { var f = d(this); return f[a] || (f[a] = new b(a)) } var d = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, b = function (a) { this.name = a; this.listeners = [] }; b.prototype = { getListenerIndex: function (a) { for (var b = 0, d = this.listeners; b < d.length; b++)if (d[b].fn == a) return b; return -1 } };
        return {
            define: function (b, d) { var h = a.call(this, b); CKEDITOR.tools.extend(h, d, !0) }, on: function (b, d, h, k, g) { function l(a, x, t, e) { a = { name: b, sender: this, editor: a, data: x, listenerData: k, stop: t, cancel: e, removeListener: u }; return !1 === d.call(h, a) ? !1 : a.data } function u() { x.removeListener(b, d) } var e = a.call(this, b); if (0 > e.getListenerIndex(d)) { e = e.listeners; h || (h = this); isNaN(g) && (g = 10); var x = this; l.fn = d; l.priority = g; for (var t = e.length - 1; 0 <= t; t--)if (e[t].priority <= g) return e.splice(t + 1, 0, l), { removeListener: u }; e.unshift(l) } return { removeListener: u } },
            once: function () { var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                var a = 0, b = function () { a = 1 }, h = 0, k = function () { h = 1 }; return function (g, l, u) {
                    var e = d(this)[g]; g = a; var x = h; a = h = 0; if (e) {
                        var t = e.listeners; if (t.length) for (var t = t.slice(0), z, I = 0; I < t.length; I++) {
                            if (e.errorProof) try {
                                z =
                                t[I].call(this, u, l, b, k)
                            } catch (r) { } else z = t[I].call(this, u, l, b, k); !1 === z ? h = 1 : "undefined" != typeof z && (l = z); if (a || h) break
                        }
                    } l = h ? !1 : "undefined" == typeof l ? !0 : l; a = g; h = x; return l
                }
            }(), fireOnce: function (a, b, h) { b = this.fire(a, b, h); delete d(this)[a]; return b }, removeListener: function (a, b) { var h = d(this)[a]; if (h) { var k = h.getListenerIndex(b); 0 <= k && h.listeners.splice(k, 1) } }, removeAllListeners: function () { var a = d(this), b; for (b in a) delete a[b] }, hasListeners: function (a) { return (a = d(this)[a]) && 0 < a.listeners.length }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function () {
        var a = navigator.userAgent.toLowerCase(), d = a.match(/edge[ \/](\d+.?\d*)/), b = -1 < a.indexOf("trident/"), b = !(!d && !b), b = {
            ie: b, edge: !!d, webkit: !b && -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () {
                if (!this.ie) return !1; var a = document.domain, b = window.location.hostname;
                return a != b && a != "[" + b + "]"
            }, secure: "https:" == location.protocol
        }; b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie; b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0); var c = 0; b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks); b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0)); b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); b.version = c; b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c); b.hidpi = 2 <= window.devicePixelRatio; b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c; b.needsNbspFiller = b.ie && 11 > c; b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown"); b.quirks && (b.cssClass += " cke_browser_quirks"); b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version)); b.air && (b.cssClass += " cke_browser_air");
        b.iOS && (b.cssClass += " cke_browser_ios"); b.hidpi && (b.cssClass += " cke_hidpi"); return b
    }());
    "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () {
            CKEDITOR.domReady(function () {
                var a =
                    CKEDITOR.loadFullCore, d = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : d && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
            })
        })(); CKEDITOR.status = "basic_loaded"
    }(); "use strict"; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: d }) };
    CKEDITOR.error = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: d }) };
    CKEDITOR.on("log", function (a) { if (window.console && window.console.log) { var d = console[a.data.type] ? a.data.type : "log", b = a.data.errorCode; if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a); else console[d]("[CKEDITOR] Error code: " + b + "."); console[d]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" + b) } }, null, null, 999); CKEDITOR.dom = {};
    (function () {
        function a(a, b, e) { this._minInterval = a; this._context = e; this._lastOutput = this._scheduledTimer = 0; this._output = CKEDITOR.tools.bind(b, e || {}); var c = this; this.input = function () { function a() { c._lastOutput = (new Date).getTime(); c._scheduledTimer = 0; c._call() } if (!c._scheduledTimer || !1 !== c._reschedule()) { var x = (new Date).getTime() - c._lastOutput; x < c._minInterval ? c._scheduledTimer = setTimeout(a, c._minInterval - x) : a() } } } function d(x, b, e) {
            a.call(this, x, b, e); this._args = []; var c = this; this.input = CKEDITOR.tools.override(this.input,
                function (a) { return function () { c._args = Array.prototype.slice.call(arguments); a.call(this) } })
        } var b = [], c = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", f = /&/g, h = />/g, k = /</g, g = /"/g, l = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, u = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, e = function (a, b) { return "#" == b[0] ? String.fromCharCode(parseInt(b.slice(1), 10)) : u[b] }; CKEDITOR.on("reset", function () { b = [] }); CKEDITOR.tools = {
            arrayCompare: function (a, b) {
                if (!a && !b) return !0;
                if (!a || !b || a.length != b.length) return !1; for (var e = 0; e < a.length; e++)if (a[e] != b[e]) return !1; return !0
            }, getIndex: function (a, b) { for (var e = 0; e < a.length; ++e)if (b(a[e])) return e; return -1 }, clone: function (a) {
                var b; if (a && a instanceof Array) { b = []; for (var e = 0; e < a.length; e++)b[e] = CKEDITOR.tools.clone(a[e]); return b } if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a; b = new a.constructor; for (e in a) b[e] =
                    CKEDITOR.tools.clone(a[e]); return b
            }, capitalize: function (a, b) { return a.charAt(0).toUpperCase() + (b ? a.slice(1) : a.slice(1).toLowerCase()) }, extend: function (a) { var b = arguments.length, e, c; "boolean" == typeof (e = arguments[b - 1]) ? b-- : "boolean" == typeof (e = arguments[b - 2]) && (c = arguments[b - 1], b -= 2); for (var g = 1; g < b; g++) { var m = arguments[g] || {}; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(m), function (b) { if (!0 === e || null == a[b]) if (!c || b in c) a[b] = m[b] }) } return a }, prototypedCopy: function (a) {
                var b = function () { };
                b.prototype = a; return new b
            }, copy: function (a) { var b = {}, e; for (e in a) b[e] = a[e]; return b }, isArray: function (a) { return "[object Array]" == Object.prototype.toString.call(a) }, isEmpty: function (a) { for (var b in a) if (a.hasOwnProperty(b)) return !1; return !0 }, cssVendorPrefix: function (a, b, e) { if (e) return c + a + ":" + b + ";" + a + ":" + b; e = {}; e[a] = b; e[c + a] = b; return e }, cssStyleToDomStyle: function () {
                var a = document.createElement("div").style, b = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" :
                    "float"; return function (a) { return "float" == a ? b : a.replace(/-./g, function (a) { return a.substr(1).toUpperCase() }) }
            }(), buildStyleHtml: function (a) { a = [].concat(a); for (var b, e = [], c = 0; c < a.length; c++)if (b = a[c]) /@import|[{}]/.test(b) ? e.push("\x3cstyle\x3e" + b + "\x3c/style\x3e") : e.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + b + '"\x3e'); return e.join("") }, htmlEncode: function (a) { return void 0 === a || null === a ? "" : String(a).replace(f, "\x26amp;").replace(h, "\x26gt;").replace(k, "\x26lt;") }, htmlDecode: function (a) {
                return a.replace(l,
                    e)
            }, htmlEncodeAttr: function (a) { return CKEDITOR.tools.htmlEncode(a).replace(g, "\x26quot;") }, htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) }, transformPlainTextToHtml: function (a, b) {
                var e = b == CKEDITOR.ENTER_BR, c = this.htmlEncode(a.replace(/\r\n/g, "\n")), c = c.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), g = b == CKEDITOR.ENTER_P ? "p" : "div"; if (!e) { var m = /\n{2}/g; if (m.test(c)) var d = "\x3c" + g + "\x3e", l = "\x3c/" + g + "\x3e", c = d + c.replace(m, function () { return l + d }) + l } c = c.replace(/\n/g, "\x3cbr\x3e"); e || (c =
                    c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + g + "\x3e)"), function (a) { return CKEDITOR.tools.repeat(a, 2) })); c = c.replace(/^ | $/g, "\x26nbsp;"); return c = c.replace(/(>|\s) /g, function (a, b) { return b + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
            }, getNextNumber: function () { var a = 0; return function () { return ++a } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () { for (var a = "e", b = 0; 8 > b; b++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a }, override: function (a,
                b) { var e = b(a); e.prototype = a.prototype; return e }, setTimeout: function (a, b, e, c, g) { g || (g = window); e || (e = g); return g.setTimeout(function () { c ? a.apply(e, [].concat(c)) : a.apply(e) }, b || 0) }, throttle: function (a, b, e) { return new this.buffers.throttle(a, b, e) }, trim: function () { var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (b) { return b.replace(a, "") } }(), ltrim: function () { var a = /^[ \t\n\r]+/g; return function (b) { return b.replace(a, "") } }(), rtrim: function () {
                    var a = /[ \t\n\r]+$/g; return function (b) {
                        return b.replace(a,
                            "")
                    }
                }(), indexOf: function (a, b) { if ("function" == typeof b) for (var e = 0, c = a.length; e < c; e++) { if (b(a[e])) return e } else { if (a.indexOf) return a.indexOf(b); e = 0; for (c = a.length; e < c; e++)if (a[e] === b) return e } return -1 }, search: function (a, b) { var e = CKEDITOR.tools.indexOf(a, b); return 0 <= e ? a[e] : null }, bind: function (a, b) { var e = Array.prototype.slice.call(arguments, 2); return function () { return a.apply(b, e.concat(Array.prototype.slice.call(arguments))) } }, createClass: function (a) {
                    var b = a.$, e = a.base, c = a.privates || a._, g = a.proto;
                    a = a.statics; !b && (b = function () { e && this.base.apply(this, arguments) }); if (c) var m = b, b = function () { var a = this._ || (this._ = {}), b; for (b in c) { var e = c[b]; a[b] = "function" == typeof e ? CKEDITOR.tools.bind(e, this) : e } m.apply(this, arguments) }; e && (b.prototype = this.prototypedCopy(e.prototype), b.prototype.constructor = b, b.base = e, b.baseProto = e.prototype, b.prototype.base = function y() { this.base = e.prototype.base; e.apply(this, arguments); this.base = y }); g && this.extend(b.prototype, g, !0); a && this.extend(b, a, !0); return b
                }, addFunction: function (a,
                    e) { return b.push(function () { return a.apply(e || this, arguments) }) - 1 }, removeFunction: function (a) { b[a] = null }, callFunction: function (a) { var e = b[a]; return e && e.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () { var a = /^-?\d+\.?\d*px$/, b; return function (e) { b = CKEDITOR.tools.trim(e + "") + "px"; return a.test(b) ? b : e || "" } }(), convertToPx: function () {
                        var a; return function (b) {
                            a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',
                                CKEDITOR.document), CKEDITOR.document.getBody().append(a)); if (!/%$/.test(b)) { var e = 0 > parseFloat(b); e && (b = b.replace("-", "")); a.setStyle("width", b); b = a.$.clientWidth; return e ? -b : b } return b
                        }
                    }(), repeat: function (a, b) { return Array(b + 1).join(a) }, tryThese: function () { for (var a, b = 0, e = arguments.length; b < e; b++) { var c = arguments[b]; try { a = c(); break } catch (g) { } } return a }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (a) {
                        return function () {
                            var b = arguments, e = this; window.setTimeout(function () {
                                a.apply(e,
                                    b)
                            }, 0)
                        }
                    }, normalizeCssText: function (a, b) { var e = [], c, g = CKEDITOR.tools.parseCssText(a, !0, b); for (c in g) e.push(c + ":" + g[c]); e.sort(); return e.length ? e.join(";") + ";" : "" }, convertRgbToHex: function (a) { return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, e, c) { a = [b, e, c]; for (b = 0; 3 > b; b++)a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2); return "#" + a.join("") }) }, normalizeHex: function (a) {
                        return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, b, e, c) {
                            a = b.toLowerCase(); 3 == a.length &&
                                (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join("")); return "#" + a + c
                        })
                    }, parseCssText: function (a, b, e) { var c = {}; e && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || ""); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || ";" == a) return c; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, e, x) { b && (e = e.toLowerCase(), "font-family" == e && (x = x.replace(/\s*,\s*/g, ",")), x = CKEDITOR.tools.trim(x)); c[e] = x }); return c },
            writeCssText: function (a, b) { var e, c = []; for (e in a) c.push(e + ":" + a[e]); b && c.sort(); return c.join("; ") }, objectCompare: function (a, b, e) { var c; if (!a && !b) return !0; if (!a || !b) return !1; for (c in a) if (a[c] != b[c]) return !1; if (!e) for (c in b) if (a[c] != b[c]) return !1; return !0 }, objectKeys: function (a) { return CKEDITOR.tools.object.keys(a) }, convertArrayToObject: function (a, b) { var e = {}; 1 == arguments.length && (b = !0); for (var c = 0, g = a.length; c < g; ++c)e[a[c]] = b; return e }, fixDomain: function () {
                for (var a; ;)try {
                    a = window.parent.document.domain;
                    break
                } catch (b) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break; document.domain = a } return !!a
            }, eventsBuffer: function (a, b, e) { return new this.buffers.event(a, b, e) }, enableHtml5Elements: function (a, b) { for (var e = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), c = e.length, g; c--;)g = a.createElement(e[c]), b && a.appendChild(g) }, checkIfAnyArrayItemMatches: function (a, b) {
                for (var e =
                    0, c = a.length; e < c; ++e)if (a[e].match(b)) return !0; return !1
            }, checkIfAnyObjectPropertyMatches: function (a, b) { for (var e in a) if (e.match(b)) return !0; return !1 }, keystrokeToString: function (a, b) { var e = this.keystrokeToArray(a, b); e.display = e.display.join("+"); e.aria = e.aria.join("+"); return e }, keystrokeToArray: function (a, b) {
                var e = b & 16711680, c = b & 65535, g = CKEDITOR.env.mac, m = [], d = []; e & CKEDITOR.CTRL && (m.push(g ? "⌘" : a[17]), d.push(g ? a[224] : a[17])); e & CKEDITOR.ALT && (m.push(g ? "⌥" : a[18]), d.push(a[18])); e & CKEDITOR.SHIFT && (m.push(g ?
                    "⇧" : a[16]), d.push(a[16])); c && (a[c] ? (m.push(a[c]), d.push(a[c])) : (m.push(String.fromCharCode(c)), d.push(String.fromCharCode(c)))); return { display: m, aria: d }
            }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d", getCookie: function (a) {
                a = a.toLowerCase(); for (var b = document.cookie.split(";"), e, c, g = 0; g < b.length; g++)if (e = b[g].split("\x3d"), c = decodeURIComponent(CKEDITOR.tools.trim(e[0]).toLowerCase()), c === a) return decodeURIComponent(1 < e.length ? e[1] : "");
                return null
            }, setCookie: function (a, b) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b) + ";path\x3d/" }, getCsrfToken: function () {
                var a = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!a || 40 != a.length) {
                    var a = [], b = ""; if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a); else for (var e = 0; 40 > e; e++)a.push(Math.floor(256 * Math.random())); for (e = 0; e < a.length; e++)var c = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[e] % 36), b = b + (.5 < Math.random() ? c.toUpperCase() :
                        c); a = b; CKEDITOR.tools.setCookie("ckCsrfToken", a)
                } return a
            }, escapeCss: function (a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" }, getMouseButton: function (a) { return (a = a && a.data ? a.data.$ : a) ? CKEDITOR.tools.normalizeMouseButton(a.button) : !1 }, normalizeMouseButton: function (a, b) {
                if (!CKEDITOR.env.ie || 9 <= CKEDITOR.env.version && !CKEDITOR.env.ie6Compat) return a; for (var e = [[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE,
                    4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], c = 0; c < e.length; c++) { var g = e[c]; if (g[0] === a && b) return g[1]; if (!b && g[1] === a) return g[0] }
            }, convertHexStringToBytes: function (a) { var b = [], e = a.length / 2, c; for (c = 0; c < e; c++)b.push(parseInt(a.substr(2 * c, 2), 16)); return b }, convertBytesToBase64: function (a) {
                var b = "", e = a.length, c; for (c = 0; c < e; c += 3) {
                    var g = a.slice(c, c + 3), m = g.length, d = [], l; if (3 > m) for (l = m; 3 > l; l++)g[l] = 0; d[0] = (g[0] & 252) >> 2; d[1] = (g[0] & 3) << 4 | g[1] >> 4; d[2] = (g[1] & 15) << 2 | (g[2] & 192) >> 6; d[3] = g[2] & 63; for (l = 0; 4 > l; l++)b = l <= m ?
                        b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d[l]) : b + "\x3d"
                } return b
            }, style: {
                parse: {
                    _colors: {
                        aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C",
                        cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400", darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF",
                        firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2",
                        lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A",
                        mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399",
                        red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", windowtext: "windowtext", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00",
                        yellowgreen: "#9ACD32"
                    }, _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "), _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (a) {
                        var b = {}, e = this._findColor(a); e.length && (b.color = e[0], CKEDITOR.tools.array.forEach(e, function (b) { a = a.replace(b, "") }));
                        if (a = CKEDITOR.tools.trim(a)) b.unprocessed = a; return b
                    }, margin: function (a) { return CKEDITOR.tools.style.parse.sideShorthand(a, function (a) { return a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g) || ["0px"] }) }, sideShorthand: function (a, b) { function e(a) { c.top = g[a[0]]; c.right = g[a[1]]; c.bottom = g[a[2]]; c.left = g[a[3]] } var c = {}, g = b ? b(a) : a.split(/\s+/); switch (g.length) { case 1: e([0, 0, 0, 0]); break; case 2: e([0, 1, 0, 1]); break; case 3: e([0, 1, 2, 1]); break; case 4: e([0, 1, 2, 3]) }return c }, border: function (a) { return CKEDITOR.tools.style.border.fromCssRule(a) },
                    _findColor: function (a) { var b = [], e = CKEDITOR.tools.array, b = b.concat(a.match(this._rgbaRegExp) || []), b = b.concat(a.match(this._hslaRegExp) || []); return b = b.concat(e.filter(a.split(/\s+/), function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors })) }
                }
            }, array: {
                filter: function (a, b, e) { var c = []; this.forEach(a, function (g, m) { b.call(e, g, m, a) && c.push(g) }); return c }, find: function (a, b, e) { for (var c = a.length, g = 0; g < c;) { if (b.call(e, a[g], g, a)) return a[g]; g++ } },
                forEach: function (a, b, e) { var c = a.length, g; for (g = 0; g < c; g++)b.call(e, a[g], g, a) }, map: function (a, b, e) { for (var c = [], g = 0; g < a.length; g++)c.push(b.call(e, a[g], g, a)); return c }, reduce: function (a, b, e, c) { for (var g = 0; g < a.length; g++)e = b.call(c, e, a[g], g, a); return e }, every: function (a, b, e) { if (!a.length) return !0; b = this.filter(a, b, e); return a.length === b.length }, some: function (a, b, e) { for (var c = 0; c < a.length; c++)if (b.call(e, a[c], c, a)) return !0; return !1 }
            }, object: {
                DONT_ENUMS: "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
                entries: function (a) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a), function (b) { return [b, a[b]] }) }, values: function (a) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(a), function (b) { return a[b] }) }, keys: function (a) {
                    var b = Object.prototype.hasOwnProperty, e = [], c = CKEDITOR.tools.object.DONT_ENUMS; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (!a || "object" !== typeof a)) { b = []; if ("string" === typeof a) for (e = 0; e < a.length; e++)b.push(String(e)); return b } for (var g in a) e.push(g); if (CKEDITOR.env.ie &&
                        9 > CKEDITOR.env.version) for (g = 0; g < c.length; g++)b.call(a, c[g]) && e.push(c[g]); return e
                }, findKey: function (a, b) { if ("object" !== typeof a) return null; for (var e in a) if (a[e] === b) return e; return null }, merge: function (a, b) { var e = CKEDITOR.tools, c = e.clone(a), g = e.clone(b); e.array.forEach(e.object.keys(g), function (a) { c[a] = "object" === typeof g[a] && "object" === typeof c[a] ? e.object.merge(c[a], g[a]) : g[a] }); return c }
            }, getAbsoluteRectPosition: function (a, b) {
                function e(a) {
                    if (a) {
                        var b = a.getClientRect(); c.top += b.top; c.left +=
                            b.left; "x" in c && "y" in c && (c.x += b.x, c.y += b.y); e(a.getWindow().getFrame())
                    }
                } var c = CKEDITOR.tools.copy(b); e(a.getFrame()); var g = CKEDITOR.document.getWindow().getScrollPosition(); c.top += g.y; c.left += g.x; "x" in c && "y" in c && (c.y += g.y, c.x += g.x); c.right = c.left + c.width; c.bottom = c.top + c.height; return c
            }
        }; a.prototype = {
            reset: function () { this._lastOutput = 0; this._clearTimer() }, _reschedule: function () { return !1 }, _call: function () { this._output() }, _clearTimer: function () {
            this._scheduledTimer && clearTimeout(this._scheduledTimer);
                this._scheduledTimer = 0
            }
        }; d.prototype = CKEDITOR.tools.prototypedCopy(a.prototype); d.prototype._reschedule = function () { this._scheduledTimer && this._clearTimer() }; d.prototype._call = function () { this._output.apply(this._context, this._args) }; CKEDITOR.tools.buffers = {}; CKEDITOR.tools.buffers.event = a; CKEDITOR.tools.buffers.throttle = d; CKEDITOR.tools.style.border = CKEDITOR.tools.createClass({
            $: function (a) { a = a || {}; this.width = a.width; this.style = a.style; this.color = a.color; this._.normalize() }, _: {
                normalizeMap: {
                    color: [[/windowtext/g,
                        "black"]]
                }, normalize: function () { for (var a in this._.normalizeMap) { var b = this[a]; b && (this[a] = CKEDITOR.tools.array.reduce(this._.normalizeMap[a], function (a, b) { return a.replace(b[0], b[1]) }, b)) } }
            }, proto: { toString: function () { return CKEDITOR.tools.array.filter([this.width, this.style, this.color], function (a) { return !!a }).join(" ") } }, statics: {
                fromCssRule: function (a) {
                    var b = {}, e = a.split(/\s+/g); a = CKEDITOR.tools.style.parse._findColor(a); a.length && (b.color = a[0]); CKEDITOR.tools.array.forEach(e, function (a) {
                    b.style ||
                        -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, a) ? !b.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (b.width = a) : b.style = a
                    }); return new CKEDITOR.tools.style.border(b)
                }, splitCssValues: function (a, b) {
                    b = b || {}; var e = CKEDITOR.tools.array.reduce(["width", "style", "color"], function (e, c) { var g = a["border-" + c] || b[c]; e[c] = g ? CKEDITOR.tools.style.parse.sideShorthand(g) : null; return e }, {}); return CKEDITOR.tools.array.reduce(["top", "right", "bottom", "left"], function (b, c) {
                        var g = {}, d; for (d in e) {
                            var l =
                                a["border-" + c + "-" + d]; g[d] = l ? l : e[d] && e[d][c]
                        } b["border-" + c] = new CKEDITOR.tools.style.border(g); return b
                    }, {})
                }
            }
        }); CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE = 1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
    })();
    CKEDITOR.dtd = function () {
        var a = CKEDITOR.tools.extend, d = function (a, b) { for (var c = CKEDITOR.tools.clone(a), g = 1; g < arguments.length; g++) { b = arguments[g]; for (var d in b) delete c[d] } return c }, b = {}, c = {}, f = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, h = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, k = {}, g = { "#": 1 }, l = { center: 1, dir: 1, noframes: 1 };
        a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, g, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(c, f, b, l); d = {
            a: d(b, { a: 1, button: 1 }), abbr: b, address: c,
            area: k, article: c, aside: c, audio: a({ source: 1, track: 1 }, c), b: b, base: k, bdi: b, bdo: b, blockquote: c, body: c, br: k, button: d(b, { a: 1, button: 1 }), canvas: b, caption: c, cite: b, code: b, col: k, colgroup: { col: 1 }, command: k, datalist: a({ option: 1 }, b), dd: c, del: b, details: a({ summary: 1 }, c), dfn: b, div: c, dl: { dt: 1, dd: 1 }, dt: c, em: b, embed: k, fieldset: a({ legend: 1 }, c), figcaption: c, figure: a({ figcaption: 1 }, c), footer: c, form: c, h1: b, h2: b, h3: b, h4: b, h5: b, h6: b, head: a({ title: 1, base: 1 }, h), header: c, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: k, html: a({
                head: 1,
                body: 1
            }, c, h), i: b, iframe: g, img: k, input: k, ins: b, kbd: b, keygen: k, label: b, legend: b, li: c, link: k, main: c, map: c, mark: b, menu: a({ li: 1 }, c), meta: k, meter: d(b, { meter: 1 }), nav: c, noscript: a({ link: 1, meta: 1, style: 1 }, b), object: a({ param: 1 }, b), ol: { li: 1 }, optgroup: { option: 1 }, option: g, output: b, p: b, param: k, pre: b, progress: d(b, { progress: 1 }), q: b, rp: b, rt: b, ruby: a({ rp: 1, rt: 1 }, b), s: b, samp: b, script: g, section: c, select: { optgroup: 1, option: 1 }, small: b, source: k, span: b, strong: b, style: g, sub: b, summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b),
            sup: b, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: c, textarea: g, tfoot: { tr: 1 }, th: c, thead: { tr: 1 }, time: d(b, { time: 1 }), title: g, tr: { th: 1, td: 1 }, track: k, u: b, ul: { li: 1 }, "var": b, video: a({ source: 1, track: 1 }, c), wbr: k, acronym: b, applet: a({ param: 1 }, c), basefont: k, big: b, center: c, dialog: k, dir: { li: 1 }, font: b, isindex: k, noframes: c, strike: b, tt: b
        }; a(d, {
            $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, f, l), $blockLimit: {
                article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1,
                fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1
            }, $cdata: { script: 1, style: 1 }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: {
                area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1,
                track: 1, wbr: 1
            }, $inline: b, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head), $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: {
                abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1,
                s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1
            }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
        }); return d
    }();
    CKEDITOR.dom.event = function (a) { this.$ = a };
    CKEDITOR.dom.event.prototype = {
        getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () { var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a }, preventDefault: function (a) { var d = this.$; d.preventDefault ? d.preventDefault() : d.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () { var a = this.$; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 }, getTarget: function () {
            var a =
                this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null
        }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
    }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1; CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) };
    CKEDITOR.dom.domObject.prototype = function () {
        var a = function (a, b) { return function (c) { "undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c)) } }; return {
            getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (d) {
                var b = this.getCustomData("_cke_nativeListeners"); b || (b = {}, this.setCustomData("_cke_nativeListeners", b)); b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" +
                    d, b)); return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { var b = this.getCustomData("_cke_nativeListeners"), c = b && b[a]; c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a]) } }, removeAllListeners: function () {
                try {
                    var a = this.getCustomData("_cke_nativeListeners"), b; for (b in a) {
                        var c = a[b]; this.$.detachEvent ? this.$.detachEvent("on" +
                            b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1); delete a[b]
                    }
                } catch (f) { if (!CKEDITOR.env.edge || -2146828218 !== f.number) throw f; } CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }();
    (function (a) {
        var d = {}; CKEDITOR.on("reset", function () { d = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (c) { return !1 } }; a.setCustomData = function (a, c) { var f = this.getUniqueId(); (d[f] || (d[f] = {}))[a] = c; return this }; a.getCustomData = function (a) { var c = this.$["data-cke-expando"]; return (c = c && d[c]) && a in c ? c[a] : null }; a.removeCustomData = function (a) { var c = this.$["data-cke-expando"], c = c && d[c], f, h; c && (f = c[a], h = a in c, delete c[a]); return h ? f : null }; a.clearCustomData = function () {
            this.removeAllListeners(); var a =
                this.getUniqueId(); a && delete d[a]
        }; a.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function (a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject; CKEDITOR.NODE_ELEMENT = 1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (a, d) { a.append(this, d); return a }, clone: function (a, d) {
            function b(c) { c["data-cke-expando"] && (c["data-cke-expando"] = !1); if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) { c = c.childNodes; for (var f = 0; f < c.length; f++)b(c[f]) } } function c(b) {
                if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d =
                            b.getName(); ":" == d[0] && b.renameNode(d.substring(1))
                    } if (a) for (d = 0; d < b.getChildCount(); d++)c(b.getChild(d))
                }
            } var f = this.$.cloneNode(a); b(f); f = new CKEDITOR.dom.node(f); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(f); return f
        }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) {
            a.$.parentNode.insertBefore(this.$,
                a.$); return a
        }, insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a }, getAddress: function (a) { for (var d = [], b = this.getDocument().$.documentElement, c = this; c && c != b;) { var f = c.getParent(); f && d.unshift(this.getIndex.call(c, a)); c = f } return d }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (a) {
            function d(a, b) {
                var c = b ? a.getNext() : a.getPrevious(); return c && c.type == CKEDITOR.NODE_TEXT ? c.isEmpty() ? d(c, b) : c :
                    null
            } var b = this, c = -1, f; if (!this.getParent() || a && b.type == CKEDITOR.NODE_TEXT && b.isEmpty() && !d(b) && !d(b, !0)) return -1; do if (!a || b.equals(this) || b.type != CKEDITOR.NODE_TEXT || !f && !b.isEmpty()) c++, f = b.type == CKEDITOR.NODE_TEXT; while (b = b.getPrevious()); return c
        }, getNextSourceNode: function (a, d, b) {
            if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getFirst && this.getFirst(); var f; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getNext() } for (; !a && (f = (f || this).getParent());) {
                if (b &&
                    !1 === b(f, !0)) return null; a = f.getNext()
            } return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
        }, getPreviousSourceNode: function (a, d, b) {
            if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getLast && this.getLast(); var f; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getPrevious() } for (; !a && (f = (f || this).getParent());) { if (b && !1 === b(f, !0)) return null; a = f.getPrevious() } return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) :
                a
        }, getPrevious: function (a) { var d = this.$, b; do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getNext: function (a) { var d = this.$, b; do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getParent: function (a) { var d = this.$.parentNode; return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(d) : null }, getParents: function (a) {
            var d = this, b = []; do b[a ? "push" : "unshift"](d); while (d = d.getParent());
            return b
        }, getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var d = this.contains ? this : this.getParent(); do if (d.contains(a)) return d; while (d = d.getParent()); return null }, getPosition: function (a) {
            var d = this.$, b = a.$; if (d.compareDocumentPosition) return d.compareDocumentPosition(b); if (d == b) return CKEDITOR.POSITION_IDENTICAL; if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                if (d.contains) {
                    if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS +
                        CKEDITOR.POSITION_PRECEDING; if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                } if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            } d = this.getAddress(); a = a.getAddress(); for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)if (d[c] != a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return d.length < a.length ? CKEDITOR.POSITION_CONTAINS +
                CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (a, d) { var b = this.$, c, f; d || (b = b.parentNode); "function" == typeof a ? (f = !0, c = a) : (f = !1, c = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; b;) { if (c(f ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b); try { b = b.parentNode } catch (h) { b = null } } return null }, hasAscendant: function (a, d) {
            var b = this.$; d || (b = b.parentNode); for (; b;) {
                if (b.nodeName &&
                    b.nodeName.toLowerCase() == a) return !0; b = b.parentNode
            } return !1
        }, move: function (a, d) { a.append(this.remove(), d) }, remove: function (a) { var d = this.$, b = d.parentNode; if (b) { if (a) for (; a = d.firstChild;)b.insertBefore(d.removeChild(a), d); b.removeChild(d) } return this }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
            for (var a; this.getFirst && (a = this.getFirst());) {
                if (a.type == CKEDITOR.NODE_TEXT) {
                    var d = CKEDITOR.tools.ltrim(a.getText()), b = a.getLength(); if (d) d.length <
                        b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue }
                } break
            }
        }, rtrim: function () { for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { var d = CKEDITOR.tools.rtrim(a.getText()), b = a.getLength(); if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break } CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a) }, isReadOnly: function (a) {
            var d =
                this; this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()); CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0); if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable")); for (; d;) { if (d.data("cke-editable")) return !1; if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable"); d = d.getParent() } return !0
        }
    }); CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () { this.$.focus() }, getViewPaneSize: function () { var a = this.$.document, d = "CSS1Compat" == a.compatMode; return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } }, getScrollPosition: function () {
            var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return {
                x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop ||
                    a.body.scrollTop || 0
            }
        }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
    }); CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) { if (this.$.createStyleSheet) this.$.createStyleSheet(a); else { var d = new CKEDITOR.dom.element("link"); d.setAttributes({ rel: "stylesheet", type: "text/css", href: a }); this.getHead().append(d) } }, appendStyleText: function (a) {
            if (this.$.createStyleSheet) { var d = this.$.createStyleSheet(""); d.cssText = a } else { var b = new CKEDITOR.dom.element("style", this); b.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(b) } return d ||
                b.$.sheet
        }, createElement: function (a, d) { var b = new CKEDITOR.dom.element(a, this); d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles)); return b }, createText: function (a) { return new CKEDITOR.dom.text(a, this) }, focus: function () { this.getWindow().focus() }, getActive: function () { var a; try { a = this.$.activeElement } catch (d) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null }, getByAddress: function (a, d) {
            for (var b =
                this.$.documentElement, c = 0; b && c < a.length; c++) { var f = a[c]; if (d) for (var h = -1, k = 0; k < b.childNodes.length; k++) { var g = b.childNodes[k]; if (!0 !== d || 3 != g.nodeType || !g.previousSibling || 3 != g.previousSibling.nodeType) if (h++, h == f) { b = g; break } } else b = b.childNodes[f] } return b ? new CKEDITOR.dom.node(b) : null
        }, getElementsByTag: function (a, d) { CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) }, getHead: function () {
            var a = this.$.getElementsByTagName("head")[0];
            return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) }, write: function (a) {
            this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
                CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close()
        }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null }, _getHtml5ShivFrag: function () { var a = this.getCustomData("html5ShivFrag"); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a }
    }); CKEDITOR.dom.nodeList = function (a) { this.$ = a };
    CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (a) { return new CKEDITOR.dom.node(a) }) } }; CKEDITOR.dom.element = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) };
    CKEDITOR.dom.element.get = function (a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node; CKEDITOR.dom.element.createFromHtml = function (a, d) { var b = new CKEDITOR.dom.element("div", d); b.setHtml(a); return b.getFirst().remove() };
    CKEDITOR.dom.element.setMarker = function (a, d, b, c) { var f = d.getCustomData("list_marker_id") || d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), h = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); a[f] = d; h[b] = 1; return d.setCustomData(b, c) }; CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1) };
    CKEDITOR.dom.element.clearMarkers = function (a, d, b) { var c = d.getCustomData("list_marker_names"), f = d.getCustomData("list_marker_id"), h; for (h in c) d.removeCustomData(h); d.removeCustomData("list_marker_names"); b && (d.removeCustomData("list_marker_id"), delete a[f]) };
    (function () {
        function a(a, b) { return -1 < (" " + a + " ").replace(h, " ").indexOf(" " + b + " ") } function d(a) { var b = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute("id") } } function b(a, b) { var c = CKEDITOR.tools.escapeCss(a.$.id); return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ") } function c(a) { for (var b = 0, c = 0, e = k[a].length; c < e; c++)b += parseFloat(this.getComputedStyle(k[a][c]) || 0, 10) || 0; return b } var f = document.createElement("_").classList, f = "undefined" !== typeof f &&
            null !== String(f.add).match(/\[Native code\]/gi), h = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT, addClass: f ? function (a) { this.$.classList.add(a); return this } : function (b) { var c = this.$.className; c && (a(c, b) || (c += " " + b)); this.$.className = c || b; return this }, removeClass: f ? function (a) { var b = this.$; b.classList.remove(a); b.className || b.removeAttribute("class"); return this } : function (b) {
                    var c = this.getAttribute("class"); c && a(c, b) && ((c = c.replace(new RegExp("(?:^|\\s+)" +
                        b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", c) : this.removeAttribute("class")); return this
                }, hasClass: function (b) { return a(this.$.className, b) }, append: function (a, b) { "string" == typeof a && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) { if (this.$.childNodes.length) { var b = new CKEDITOR.dom.element("div", this.getDocument()); b.setHtml(a); b.moveChildren(this) } else this.setHtml(a) }, appendText: function (a) {
                null !=
                    this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
                }, appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } }, breakParent: function (a, b) {
                    var c = new CKEDITOR.dom.range(this.getDocument()); c.setStartAfter(this); c.setEndAfter(a);
                    var e = c.extractContents(!1, b || !1), d; c.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (c = new CKEDITOR.dom.element("div"); d = e.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d); c.insertAfter(this); c.remove(!0) } else e.insertAfterNode(this)
                }, contains: document.compareDocumentPosition ? function (a) { return !!(this.$.compareDocumentPosition(a.$) & 16) } : function (a) {
                    var b = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) :
                        b != a.$ && b.contains(a.$)
                }, focus: function () { function a() { try { this.$.focus() } catch (b) { } } return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () { if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0)); return a.innerHTML }, getClientRect: function (a) {
                    var b = CKEDITOR.tools.extend({},
                        this.$.getBoundingClientRect()); !b.width && (b.width = b.right - b.left); !b.height && (b.height = b.bottom - b.top); return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), b) : b
                }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                    try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var c = this.getDocument()._getHtml5ShivFrag(); c.appendChild(b); b.innerHTML = a; c.removeChild(b); return a } catch (e) {
                        this.$.innerHTML = ""; b = new CKEDITOR.dom.element("body", this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();)this.append(b.getItem(0));
                        return a
                    }
                } : function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (b) { this.$[a ? "textContent" : "innerText"] = b } }(), getAttribute: function () {
                    var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                        switch (a) {
                            case "class": a = "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a,
                                2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                        }return this.$.getAttribute(a, 2)
                    } : a
                }(), getAttributes: function (a) {
                    var b = {}, c = this.$.attributes, e; a = CKEDITOR.tools.isArray(a) ?
                        a : []; for (e = 0; e < c.length; e++)-1 === CKEDITOR.tools.indexOf(a, c[e].name) && (b[c[e].name] = c[e].value); return b
                }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getClientSize: function () { return { width: this.$.clientWidth, height: this.$.clientHeight } }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) { var b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : "" } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                getDtd: function () { var a = CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () {
                    return this.$.name ||
                        null
                }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) { var b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a)); return b }, getLast: function (a) { var b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var b = 0; b < arguments.length; b++)if (arguments[b] == a) return !0; return !1 }, isEditable: function (a) {
                    var b = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
                        CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                }, isIdentical: function (a) {
                    var b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a =
                        a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var c = this.getParent(); c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml()) } return b == a
                }, isVisible: function () { var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, c; a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible())); return !!a }, isEmptyInlineRemoveable: function () {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                    for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) { var e = a.getItem(b); if (e.type != CKEDITOR.NODE_ELEMENT || !e.data("cke-bookmark")) if (e.type == CKEDITOR.NODE_ELEMENT && !e.isEmptyInlineRemoveable() || e.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(e.getText())) return !1 } return !0
                }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                    for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                        var c = a[b]; switch (c.nodeName) {
                            case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue;
                            default: if (c.specified) return !0
                        }
                    } return !1
                } : function () { var a = this.$.attributes, b = a.length, c = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName]) }, hasAttribute: function () {
                    function a(b) {
                        var c = this.$.attributes.getNamedItem(b); if ("input" == this.getName()) switch (b) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }return c ?
                            c.specified : !1
                    } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, b) { var c = this.$; a = a.$; if (c != a) { var e; if (b) for (; e = c.lastChild;)a.insertBefore(c.removeChild(e), a.firstChild); else for (; e = c.firstChild;)a.appendChild(c.removeChild(e)) } }, mergeSiblings: function () {
                    function a(b, c, e) {
                        if (c && c.type == CKEDITOR.NODE_ELEMENT) {
                            for (var d =
                                []; c.data("cke-bookmark") || c.isEmptyInlineRemoveable();)if (d.push(c), c = e ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(c)) { for (var g = e ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !e); c.moveChildren(b, !e); c.remove(); g && g.type == CKEDITOR.NODE_ELEMENT && g.mergeSiblings() }
                        }
                    } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                }(), show: function () {
                    this.setStyles({
                        display: "",
                        visibility: ""
                    })
                }, setAttribute: function () {
                    var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) { "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
                        if ("src" == b && c.match(/^http:\/\//)) try {
                            a.apply(this,
                                arguments)
                        } catch (e) { } else a.apply(this, arguments); return this
                    } : a
                }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () { var a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a }(), removeAttributes: function (a) {
                    if (CKEDITOR.tools.isArray(a)) for (var b =
                        0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
                }, removeStyle: function (a) {
                    var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else {
                        var c = ["top", "left", "right", "bottom"], e; "border" == a && (e = ["color", "style", "width"]); for (var b = [], d = 0; d < c.length; d++)if (e) for (var t =
                            0; t < e.length; t++)b.push([a, c[d], e[t]].join("-")); else b.push([a, c[d]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                    }
                }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) { for (var b in a) this.setStyle(b, a[b]); return this }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () {
                    this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                        "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, e = b.count(); c < e; c++)a = b.getItem(c), a.setAttribute("unselectable", "on") }
                }, getPositionedAncestor: function () { for (var a = this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null }, getDocumentPosition: function (a) {
                    var b = 0, c = 0, e = this.getDocument(), d = e.getBody(), t = "BackCompat" == e.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                        8 !== CKEDITOR.env.version : 1)) { var f = this.$.getBoundingClientRect(), h = e.$.documentElement, r = h.clientTop || d.$.clientTop || 0, m = h.clientLeft || d.$.clientLeft || 0, k = !0; CKEDITOR.env.ie && (k = e.getDocumentElement().contains(this), e = e.getBody().contains(this), k = t && e || !t && k); k && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || h.scrollLeft, c = d.$.scrollTop || h.scrollTop) : (c = t ? d.$ : h, b = c.scrollLeft, c = c.scrollTop), b = f.left + b - m, c = f.top + c - r) } else for (r = this, m = null; r && "body" != r.getName() &&
                            "html" != r.getName();) { b += r.$.offsetLeft - r.$.scrollLeft; c += r.$.offsetTop - r.$.scrollTop; r.equals(this) || (b += r.$.clientLeft || 0, c += r.$.clientTop || 0); for (; m && !m.equals(r);)b -= m.$.scrollLeft, c -= m.$.scrollTop, m = m.getParent(); m = r; r = (f = r.$.offsetParent) ? new CKEDITOR.dom.element(f) : null } a && (f = this.getWindow(), r = a.getWindow(), !f.equals(r) && f.$.frameElement && (a = (new CKEDITOR.dom.element(f.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                                t || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0); return { x: b, y: c }
                }, scrollIntoView: function (a) { var b = this.getParent(); if (b) { do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var c = b.getWindow(); try { var e = c.$.frameElement; e && (b = new CKEDITOR.dom.element(e)) } catch (d) { } } while (b = b.getParent()) } }, scrollIntoParent: function (a, b, c) {
                    var e, d, t, f; function h(b, c) {
                        /body|html/.test(a.getName()) ?
                        a.getWindow().$.scrollBy(b, c) : (a.$.scrollLeft += b, a.$.scrollTop += c)
                    } function r(a, b) { var c = { x: 0, y: 0 }; if (!a.is(k ? "body" : "html")) { var e = a.$.getBoundingClientRect(); c.x = e.left; c.y = e.top } e = a.getWindow(); e.equals(b) || (e = r(CKEDITOR.dom.element.get(e.$.frameElement), b), c.x += e.x, c.y += e.y); return c } function m(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 } !a && (a = this.getWindow()); t = a.getDocument(); var k = "BackCompat" == t.$.compatMode; a instanceof CKEDITOR.dom.window && (a = k ? t.getBody() : t.getDocumentElement());
                    CKEDITOR.env.webkit && (t = this.getEditor(!1)) && (t._.previousScrollTop = null); t = a.getWindow(); d = r(this, t); var y = r(a, t), J = this.$.offsetHeight; e = this.$.offsetWidth; var E = a.$.clientHeight, p = a.$.clientWidth; t = d.x - m(this, "left") - y.x || 0; f = d.y - m(this, "top") - y.y || 0; e = d.x + e + m(this, "right") - (y.x + p) || 0; d = d.y + J + m(this, "bottom") - (y.y + E) || 0; (0 > f || 0 < d) && h(0, !0 === b ? f : !1 === b ? d : 0 > f ? f : d); c && (0 > t || 0 < e) && h(0 > t ? t : e, 0)
                }, setState: function (a, b, c) {
                    b = b || "cke"; switch (a) {
                        case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b +
                            "_off"); this.removeClass(b + "_disabled"); c && this.setAttribute("aria-pressed", !0); c && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on"); c && this.setAttribute("aria-disabled", !0); c && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                    }
                },
                getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                    var c = this.$.attributes; b = b || {}; for (var e = 0; e < c.length; e++) { var d = c[e], t = d.nodeName.toLowerCase(), f; if (!(t in b)) if ("checked" == t && (f = this.getAttribute(t))) a.setAttribute(t, f); else if (!CKEDITOR.env.ie || this.hasAttribute(t)) f = this.getAttribute(t), null === f && (f = d.nodeValue), a.setAttribute(t, f) } "" !== this.$.style.cssText &&
                        (a.$.style.cssText = this.$.style.cssText)
                }, renameNode: function (a) { if (this.getName() != a) { var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName } }, getChild: function () {
                    function a(b, c) { var e = b.childNodes; if (0 <= c && c < e.length) return e[c] } return function (b) {
                        var c = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && c;)c = a(c,
                            b.shift()); else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null
                    }
                }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () { function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) }, getDirection: function (a) {
                    return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                        "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) { var b = CKEDITOR.instances, c, e, d; a = a || void 0 === a; for (c in b) if (e = b[c], e.element.equals(this) && e.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = e.editable()) && (d.equals(this) || d.contains(this))) return e; return null }, find: function (a) {
                    var c = d(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
                        a))); c(); return a
                }, findOne: function (a) { var c = d(this); a = this.$.querySelector(b(this, a)); c(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, c) { if (!(c || b && this.type != b)) var e = a(this); if (!1 !== e) { c = this.getChildren(); for (var d = 0; d < c.count(); d++)e = c.getItem(d), e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, b) : b && e.type != b || a(e) } }, fireEventHandler: function (a, b) {
                    var c = "on" + a, e = this.$; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) {
                        var d = e.ownerDocument.createEventObject(), f; for (f in b) d[f] = b[f]; e.fireEvent(c,
                            d)
                    } else e[e[a] ? a : c](b)
                }, isDetached: function () { var a = this.getDocument(), b = a.getDocumentElement(); return b.equals(this) || b.contains(this) ? !CKEDITOR.env.ie || 8 < CKEDITOR.env.version && !CKEDITOR.env.quirks ? !a.$.defaultView : !1 : !0 }
            }); var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] }; CKEDITOR.dom.element.prototype.setSize = function (a, b, d) {
            "number" == typeof b && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks ||
                (b -= c.call(this, a)), this.setStyle(a, b + "px"))
            }; CKEDITOR.dom.element.prototype.getSize = function (a, b) { var d = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; b && (d -= c.call(this, a)); return d }
    })(); CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") } }, !0, {
        append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1,
        insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1
    }); CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.document.prototype, !0, { find: 1, findOne: 1 });
    (function () {
        function a(a, b) {
            var c = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (c.collapsed) return this.end(), null; c.optimize() } var e, d = c.startContainer; e = c.endContainer; var f = c.startOffset, x = c.endOffset, h, g = this.guard, p = this.type, D = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                var G = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), B = e.type == CKEDITOR.NODE_ELEMENT ? e.getChild(x) : e.getNext(); this._.guardLTR = function (a, b) {
                    return (!b || !G.equals(a)) && (!B ||
                        !a.equals(B)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            } if (a && !this._.guardRTL) { var k = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), q = d.type == CKEDITOR.NODE_ELEMENT ? f ? d.getChild(f - 1) : null : d.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !k.equals(a)) && (!q || !a.equals(q)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } var C = a ? this._.guardRTL : this._.guardLTR; h = g ? function (a, b) { return !1 === C(a, b) ? !1 : g(a, b) } : C; this.current ? e = this.current[D](!1, p, h) : (a ? e.type == CKEDITOR.NODE_ELEMENT &&
                (e = 0 < x ? e.getChild(x - 1) : !1 === h(e, !0) ? null : e.getPreviousSourceNode(!0, p, h)) : (e = d, e.type == CKEDITOR.NODE_ELEMENT && ((e = e.getChild(f)) || (e = !1 === h(d, !0) ? null : d.getNextSourceNode(!0, p, h)))), e && !1 === h(e) && (e = null)); for (; e && !this._.end;) { this.current = e; if (!this.evaluator || !1 !== this.evaluator(e)) { if (!b) return e } else if (b && this.evaluator) return !1; e = e[D](!1, p, h) } this.end(); return this.current = null
        } function d(b) { for (var c, e = null; c = a.call(this, b);)e = c; return e } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (a) {
            this.range =
                a; this._ = {}
            }, proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return d.call(this) }, lastBackward: function () { return d.call(this, 1) }, reset: function () { delete this.current; this._ = {} } }
        }); var b = {
            block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1,
            "table-column": 1, "table-cell": 1, "table-caption": 1
        }, c = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) };
        CKEDITOR.dom.walker.bookmark = function (a, b) { function c(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") } return function (e) { var d, f; d = e && e.type != CKEDITOR.NODE_ELEMENT && (f = e.getParent()) && c(f); d = a ? d : d || c(e); return !!(b ^ d) } }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { var c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE); return !!(a ^ c) } }; CKEDITOR.dom.walker.invisible =
            function (a) { var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.env.webkit ? 1 : 0; return function (e) { b(e) ? e = 1 : (e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), e = e.$.offsetWidth <= c); return !!(a ^ e) } }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
                function b(a) { return !h(a) && !k(a) } return function (c) {
                    var e = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && f.test(c.getText()); e && (e = c.getParent(), c = c.getNext(b), e = e.isBlockBoundary() &&
                        (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())); return !!(a ^ e)
                }
            }; CKEDITOR.dom.walker.temp = function (a) { return function (b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b) } }; var f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, h = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), g = CKEDITOR.dom.walker.temp(), l = function (a) { return k(a) || h(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) }; CKEDITOR.dom.walker.ignored =
                function (a) { return function (b) { b = h(b) || k(b) || g(b); return !!(a ^ b) } }; var u = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (b) { for (var c = 0, e = b.getChildCount(); c < e; ++c)if (!u(b.getChild(c))) return !!a; return !a } }; var e = CKEDITOR.dom.walker.empty(), x = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var b = {}, c; for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable = function (a) {
                    return function (b) {
                        b =
                        u(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(x) && e(b)) ? !0 : !1; return !!(a ^ b)
                    }
                }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (l(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && f.test(a.getText())) ? a : !1 }
    })();
    CKEDITOR.dom.range = function (a) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = !0; var d = a instanceof CKEDITOR.dom.document; this.document = d ? a : a.getDocument(); this.root = d ? a.getBody() : a };
    (function () {
        function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function d(a, b, c, d, f) {
            function h(a, b, c, e) { var A = c ? a.getPrevious() : a.getNext(); if (e && k) return A; l || e ? b.append(a.clone(!0, f), c) : (a.remove(), u && b.append(a, c)); return A } function m() { var a, b, c, e = Math.min(S.length, n.length); for (a = 0; a < e; a++)if (b = S[a], c = n[a], !b.equals(c)) return a; return a - 1 } function g() {
                var b = O - 1, c = C && w && !p.equals(D); b < H - 1 || b < F - 1 || c ? (c ? a.moveToPosition(D,
                    CKEDITOR.POSITION_BEFORE_START) : F == b + 1 && q ? a.moveToPosition(n[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(n[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = S[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
            } a.optimizeBookmark(); var k = 0 === b, u = 1 == b, l = 2 == b; b = l || u; var p = a.startContainer, D = a.endContainer,
                G = a.startOffset, B = a.endOffset, N, q, C, w, v, Q; if (l && D.type == CKEDITOR.NODE_TEXT && (p.equals(D) || p.type === CKEDITOR.NODE_ELEMENT && p.getFirst().equals(D))) c.append(a.document.createText(D.substring(G, B))); else {
                D.type == CKEDITOR.NODE_TEXT ? l ? Q = !0 : D = D.split(B) : 0 < D.getChildCount() ? B >= D.getChildCount() ? (D = D.getChild(B - 1), q = !0) : D = D.getChild(B) : w = q = !0; p.type == CKEDITOR.NODE_TEXT ? l ? v = !0 : p.split(G) : 0 < p.getChildCount() ? 0 === G ? (p = p.getChild(G), N = !0) : p = p.getChild(G - 1) : C = N = !0; for (var S = p.getParents(), n = D.getParents(), O = m(),
                    H = S.length - 1, F = n.length - 1, K = c, A, ba, L, da = -1, T = O; T <= H; T++) { ba = S[T]; L = ba.getNext(); for (T != H || ba.equals(n[T]) && H < F ? b && (A = K.append(ba.clone(0, f))) : N ? h(ba, K, !1, C) : v && K.append(a.document.createText(ba.substring(G))); L;) { if (L.equals(n[T])) { da = T; break } L = h(L, K) } K = A } K = c; for (T = O; T <= F; T++)if (c = n[T], L = c.getPrevious(), c.equals(S[T])) b && (K = K.getChild(0)); else { T != F || c.equals(S[T]) && F < H ? b && (A = K.append(c.clone(0, f))) : q ? h(c, K, !1, w) : Q && K.append(a.document.createText(c.substring(0, B))); if (T > da) for (; L;)L = h(L, K, !0); K = A } l ||
                        g()
                }
        } function b() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), d = CKEDITOR.dom.walker.bogus(); return function (f) { return c(f) || b(f) ? !0 : d(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(h) ? !1 : !0 } } function c(a) { var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1); return function (d) { return c(d) || b(d) ? !0 : !a && k(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) } }
        function f(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && u(a) && (b = a); return l(a) && !(k(a) && a.equals(b)) }) } } var h = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, k = CKEDITOR.dom.walker.bogus(), g = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.editable(), u = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
            clone: function () {
                var a =
                    new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a
            }, collapse: function (a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset); this.collapsed = !0 }, cloneContents: function (a) {
                var b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed ||
                    d(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b
            }, deleteContents: function (a) { this.collapsed || d(this, 0, null, a) }, extractContents: function (a, b) { var c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b); return c }, equals: function (a) { return this.startOffset === a.startOffset && this.endOffset === a.endOffset && this.startContainer.equals(a.startContainer) && this.endContainer.equals(a.endContainer) }, createBookmark: function (a) {
                function b(a) {
                    return a.getAscendant(function (a) {
                        var b;
                        if (b = a.data && a.data("cke-temp")) b = -1 === CKEDITOR.tools.array.indexOf(["cke_copybin", "cke_pastebin"], a.getAttribute("id")); return b
                    }, !0)
                } var c = this.startContainer, d = this.endContainer, f = this.collapsed, h, m, g, k; h = this.document.createElement("span"); h.data("cke-bookmark", 1); h.setStyle("display", "none"); h.setHtml("\x26nbsp;"); a && (g = "cke_bm_" + CKEDITOR.tools.getNextNumber(), h.setAttribute("id", g + (f ? "C" : "S"))); f || (m = h.clone(), m.setHtml("\x26nbsp;"), a && m.setAttribute("id", g + "E"), k = this.clone(), b(d) && (d = b(d),
                    k.moveToPosition(d, CKEDITOR.POSITION_AFTER_END)), k.collapse(), k.insertNode(m)); k = this.clone(); b(c) && (d = b(c), k.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START)); k.collapse(!0); k.insertNode(h); m ? (this.setStartAfter(h), this.setEndBefore(m)) : this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? g + (f ? "C" : "S") : h, endNode: a ? g + "E" : m, serializable: a, collapsed: f }
            }, createBookmark2: function () {
                function a(b) {
                    var e = b.container, d = b.offset, m; m = e; var f = d; m = m.type != CKEDITOR.NODE_ELEMENT || 0 === f || f == m.getChildCount() ?
                        0 : m.getChild(f - 1).type == CKEDITOR.NODE_TEXT && m.getChild(f).type == CKEDITOR.NODE_TEXT; m && (e = e.getChild(d - 1), d = e.getLength()); if (e.type == CKEDITOR.NODE_ELEMENT && 0 < d) { a: { for (m = e; d--;)if (f = m.getChild(d).getIndex(!0), 0 <= f) { d = f; break a } d = -1 } d += 1 } if (e.type == CKEDITOR.NODE_TEXT) {
                            m = e; for (f = 0; (m = m.getPrevious()) && m.type == CKEDITOR.NODE_TEXT;)f += m.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length; m = f; e.isEmpty() ? (f = e.getPrevious(c), m ? (d = m, e = f ? f.getNext() : e.getParent().getFirst()) : (e = e.getParent(),
                                d = f ? f.getIndex(!0) + 1 : 0)) : d += m
                        } b.container = e; b.offset = d
                } function b(a, c) { var e = c.getCustomData("cke-fillingChar"); if (e) { var d = a.container; e.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent())) } } var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (c) {
                    var d = this.collapsed, f = { container: this.startContainer, offset: this.startOffset }, m = { container: this.endContainer, offset: this.endOffset }; c && (a(f), b(f, this.root),
                        d || (a(m), b(m, this.root))); return { start: f.container.getAddress(c), end: d ? null : m.container.getAddress(c), startOffset: f.offset, endOffset: m.offset, normalized: c, collapsed: d, is2: !0 }
                }
            }(), moveToBookmark: function (a) {
                if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, c); d ? this.setEnd(d, a) : this.collapse(!0) } else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) :
                    a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
            }, getBoundaryNodes: function () {
                var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, f; if (a.type == CKEDITOR.NODE_ELEMENT) if (f = a.getChildCount(), f > c) a = a.getChild(c); else if (1 > f) a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) if (f = b.getChildCount(), f > d) b = b.getChild(d).getPreviousSourceNode(!0);
                else if (1 > f) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
            }, getCommonAncestor: function (a, b) { var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d); return b && !c.is ? c.getParent() : c }, optimize: function () {
                var a = this.startContainer, b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            }, optimizeBookmark: function () { var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) }, trim: function (a,
                b) {
                    var c = this.startContainer, d = this.startOffset, f = this.collapsed; if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) { if (d) if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent(); else { var h = c.split(d), d = c.getIndex() + 1, c = c.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(h, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) } else d = c.getIndex(), c = c.getParent(); this.setStart(c, d); if (f) { this.collapse(!0); return } } c = this.endContainer; d = this.endOffset; b || f || !c || c.type !=
                        CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
            }, enlarge: function (a, b) {
                function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var d = new RegExp(/[^\s\ufeff]/); switch (a) {
                    case CKEDITOR.ENLARGE_INLINE: var f = 1; case CKEDITOR.ENLARGE_ELEMENT: var h = function (a, b) {
                        var c = new CKEDITOR.dom.range(g); c.setStart(a, b); c.setEndAt(g, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c), e; for (c.guard =
                            function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; e = c.next();) { if (e.type != CKEDITOR.NODE_TEXT) return !1; N = e != a ? e.getText() : e.substring(b); if (d.test(N)) return !1 } return !0
                    }; if (this.collapsed) break; var m = this.getCommonAncestor(), g = this.root, k, u, l, p, D, G = !1, B, N; B = this.startContainer; var q = this.startOffset; B.type == CKEDITOR.NODE_TEXT ? (q && (B = !CKEDITOR.tools.trim(B.substring(0, q)).length && B, G = !!B), B && ((p = B.getPrevious()) || (l = B.getParent()))) : (q && (p = B.getChild(q - 1) || B.getLast()), p || (l = B));
                        for (l = c(l); l || p;) {
                            if (l && !p) { !D && l.equals(m) && (D = !0); if (f ? l.isBlockBoundary() : !g.contains(l)) break; G && "inline" == l.getComputedStyle("display") || (G = !1, D ? k = l : this.setStartBefore(l)); p = l.getPrevious() } for (; p;)if (B = !1, p.type == CKEDITOR.NODE_COMMENT) p = p.getPrevious(); else {
                                if (p.type == CKEDITOR.NODE_TEXT) N = p.getText(), d.test(N) && (p = null), B = /[\s\ufeff]$/.test(N); else if ((p.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && p.is("br")) && !p.data("cke-bookmark")) if (G && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                                    N = p.getText();
                                    if (d.test(N)) p = null; else for (var q = p.$.getElementsByTagName("*"), C = 0, w; w = q[C++];)if (!CKEDITOR.dtd.$removeEmpty[w.nodeName.toLowerCase()]) { p = null; break } p && (B = !!N.length)
                                } else p = null; B && (G ? D ? k = l : l && this.setStartBefore(l) : G = !0); if (p) { B = p.getPrevious(); if (!l && !B) { l = p; p = null; break } p = B } else l = null
                            } l && (l = c(l.getParent()))
                        } B = this.endContainer; q = this.endOffset; l = p = null; D = G = !1; B.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(B.substring(q)).length ? G = !0 : (G = !B.getLength(), q == B.getLength() ? (p = B.getNext()) || (l = B.getParent()) :
                            h(B, q) && (l = B.getParent())) : (p = B.getChild(q)) || (l = B); for (; l || p;) {
                                if (l && !p) { !D && l.equals(m) && (D = !0); if (f ? l.isBlockBoundary() : !g.contains(l)) break; G && "inline" == l.getComputedStyle("display") || (G = !1, D ? u = l : l && this.setEndAfter(l)); p = l.getNext() } for (; p;) {
                                    B = !1; if (p.type == CKEDITOR.NODE_TEXT) N = p.getText(), h(p, 0) || (p = null), B = /^[\s\ufeff]/.test(N); else if (p.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((0 < p.$.offsetWidth || b && p.is("br")) && !p.data("cke-bookmark")) if (G && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                                            N = p.getText(); if (d.test(N)) p =
                                                null; else for (q = p.$.getElementsByTagName("*"), C = 0; w = q[C++];)if (!CKEDITOR.dtd.$removeEmpty[w.nodeName.toLowerCase()]) { p = null; break } p && (B = !!N.length)
                                        } else p = null
                                    } else B = 1; B && G && (D ? u = l : this.setEndAfter(l)); if (p) { B = p.getNext(); if (!l && !B) { l = p; p = null; break } p = B } else l = null
                                } l && (l = c(l.getParent()))
                            } k && u && (m = k.contains(u) ? u : k, this.setStartBefore(m), this.setEndAfter(m)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: l = new CKEDITOR.dom.range(this.root); g = this.root; l.setStartAt(g,
                                CKEDITOR.POSITION_AFTER_START); l.setEnd(this.startContainer, this.startOffset); l = new CKEDITOR.dom.walker(l); var v, Q, S = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), n = null, O = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (n) { if (n.equals(a)) { n = null; return } } else n = a; else if (n) return; var b = S(a); b || (v = a); return b }, f = function (a) { var b = O(a); !b && a.is && a.is("br") && (Q = a); return b }; l.guard = O; l = l.lastBackward(); v = v || g; this.setStartAt(v,
                                    !v.is("br") && (!l && this.checkStartOfBlock() || l && v.contains(l)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { l = this.clone(); l = new CKEDITOR.dom.walker(l); var H = CKEDITOR.dom.walker.whitespaces(), F = CKEDITOR.dom.walker.bookmark(); l.evaluator = function (a) { return !H(a) && !F(a) }; if ((l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br")) break } l = this.clone(); l.collapse(); l.setEndAt(g, CKEDITOR.POSITION_BEFORE_END); l = new CKEDITOR.dom.walker(l); l.guard =
                                        a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : O; v = n = Q = null; l = l.lastForward(); v = v || g; this.setEndAt(v, !l && this.checkEndOfBlock() || l && v.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); Q && this.setEndAfter(Q)
                }
            }, shrink: function (a, b, c) {
                var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0, f = c && c.skipBogus; if (!this.collapsed) {
                    a = a || CKEDITOR.SHRINK_TEXT; var h = this.clone(), m = this.startContainer, g = this.endContainer, k = this.startOffset, l = this.endOffset,
                        u = c = 1; m && m.type == CKEDITOR.NODE_TEXT && (k ? k >= m.getLength() ? h.setStartAfter(m) : (h.setStartBefore(m), c = 0) : h.setStartBefore(m)); g && g.type == CKEDITOR.NODE_TEXT && (l ? l >= g.getLength() ? h.setEndAfter(g) : (h.setEndAfter(g), u = 0) : h.setEndBefore(g)); var h = new CKEDITOR.dom.walker(h), p = CKEDITOR.dom.walker.bookmark(), D = CKEDITOR.dom.walker.bogus(); h.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var G; h.guard = function (b, c) {
                            if (f && D(b) || p(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT &&
                                b.type == CKEDITOR.NODE_TEXT || c && b.equals(G) || !1 === d && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; c || b.type != CKEDITOR.NODE_ELEMENT || (G = b); return !0
                        }; c && (m = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(m, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); u && (h.reset(), (h = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(h, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
                    return !(!c && !u)
                }
            }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) {
                this.setStart(a, 0); this.setEnd(a,
                    a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            }, setStart: function (b, c) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = c; this.endContainer || (this._setEndContainer(b), this.endOffset = c); a(this) }, setEnd: function (b, c) {
            b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent()); this._setEndContainer(b); this.endOffset = c; this.startContainer || (this._setStartContainer(b),
                this.startOffset = c); a(this)
            }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b,
                        b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                }a(this)
            }, setEndAt: function (b, c) { switch (c) { case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b) }a(this) }, fixBlock: function (a,
                b) { var c = this.createBookmark(), d = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(d); d.trim(); this.insertNode(d); var f = d.getBogus(); f && f.remove(); d.appendBogus(); this.moveToBookmark(c); return d }, splitBlock: function (a, b) {
                    var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root), d = new CKEDITOR.dom.elementPath(this.endContainer, this.root), f = c.block, h = d.block, m = null; if (!c.blockLimit.equals(d.blockLimit)) return null; "br" !=
                        a && (f || (f = this.fixBlock(!0, a), h = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), h || (h = this.fixBlock(!1, a))); c = f && this.checkStartOfBlock(); d = h && this.checkEndOfBlock(); this.deleteContents(); f && f.equals(h) && (d ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END), h = null) : c ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f = null) : (h = this.splitElement(f, b ||
                            !1), f.is("ul", "ol") || f.appendBogus())); return { previousBlock: f, nextBlock: h, wasStartOfBlock: c, wasEndOfBlock: d, elementPath: m }
                }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var c = this.extractContents(!1, b || !1), d = a.clone(!1, b || !1); c.appendTo(d); d.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return d }, removeEmptyBlocksAtEnd: function () {
                    function a(e) {
                        return function (a) {
                            return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() ||
                                e.is("table") && a.is("caption") ? !1 : !0
                        }
                    } var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, h; f && !f.equals(d.root) && !f.getFirst(a(f));)h = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = h; this.moveToBookmark(c) }
                }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () {
                    return new CKEDITOR.dom.elementPath(this.endContainer,
                        this.root)
                }, checkBoundaryOfElement: function (a, b) { var d = b == CKEDITOR.START, f = this.clone(); f.collapse(d); f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); f = new CKEDITOR.dom.walker(f); f.evaluator = c(d); return f[d ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                    var a = this.startContainer, c = this.startOffset; CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), g.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer,
                        this.root); c = this.clone(); c.collapse(!0); c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkBackward()
                }, checkEndOfBlock: function () {
                    var a = this.endContainer, c = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), g.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); c = this.clone(); c.collapse(!1); c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                    a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkForward()
                }, getPreviousNode: function (a, b, c) { var d = this.clone(); d.collapse(1); d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.previous() }, getNextNode: function (a, b, c) { var d = this.clone(); d.collapse(); d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.next() }, checkReadOnly: function () {
                    function a(b, c) {
                        for (; b;) {
                            if (b.type ==
                                CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                        } return 1
                    } return function () { var b = this.startContainer, c = this.endContainer; return !(a(b, c) && a(c, b)) }
                }(), moveToElementEditablePosition: function (a, b) {
                    if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                        !0; for (var c = 0; a;) {
                            if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && g.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                            else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var d = a, f = c, h = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (h = d[b ? "getLast" : "getFirst"](u)); f || h || (h = d[b ? "getPrevious" : "getNext"](u)); a = h
                        } return !!c
                }, moveToClosestEditablePosition: function (a, b) {
                    var c, d = 0, f, h, m = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, m[b ? 0 : 1])) : c = this.clone(); if (a &&
                        !a.is(CKEDITOR.dtd.$block)) d = 1; else if (f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (h = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && h && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(f, 0), c.collapse()) : c.moveToPosition(f, m[b ? 1 : 0]); d && this.moveToRange(c); return !!d
                }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) },
            moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () { var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return c(a) && b(a) }; var d = a.next(); a.reset(); return d && d.equals(a.previous()) ? d : null }, getTouchedStartNode: function () {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: f(), getPreviousEditableNode: f(1), _getTableElement: function (a) {
                a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.getTouchedStartNode(), c = this.getTouchedEndNode(), d = b.getAscendant("table", !0), c = c.getAscendant("table", !0); return d && !this.root.contains(d) ?
                    null : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && c && (d.equals(c) || d.contains(c) || c.contains(d)) ? b.getAscendant(a, !0) : null
            }, scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, c, d, f = this.clone(); f.optimize(); (d = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = f.startContainer.getText(), b = f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a); a.scrollIntoView(); d && (f.startContainer.setText(c),
                    b.remove()); a.remove()
            }, getClientRects: function () {
                function a(b, c) {
                    var d = CKEDITOR.tools.array.map(b, function (a) { return a }), e = new CKEDITOR.dom.range(c.root), f, h, g; c.startContainer instanceof CKEDITOR.dom.element && (h = 0 === c.startOffset && c.startContainer.hasAttribute("data-widget")); c.endContainer instanceof CKEDITOR.dom.element && (g = (g = c.endOffset === (c.endContainer.getChildCount ? c.endContainer.getChildCount() : c.endContainer.length)) && c.endContainer.hasAttribute("data-widget")); h && e.setStart(c.startContainer.getParent(),
                        c.startContainer.getIndex()); g && e.setEnd(c.endContainer.getParent(), c.endContainer.getIndex() + 1); if (h || g) c = e; e = c.cloneContents().find("[data-cke-widget-id]").toArray(); if (e = CKEDITOR.tools.array.map(e, function (a) { var b = c.root.editor; a = a.getAttribute("data-cke-widget-id"); return b.widgets.instances[a].element })) return e = CKEDITOR.tools.array.map(e, function (a) {
                            var b; b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a; f = this.root.getDocument().$.createRange(); f.setStart(b.getParent().$, b.getIndex());
                            f.setEnd(b.getParent().$, b.getIndex() + 1); b = f.getClientRects(); b.widgetRect = a.getClientRect(); return b
                        }, c), CKEDITOR.tools.array.forEach(e, function (a) { function b(e) { CKEDITOR.tools.array.forEach(d, function (b, f) { var h = CKEDITOR.tools.objectCompare(a[e], b); h || (h = CKEDITOR.tools.objectCompare(a.widgetRect, b)); h && (Array.prototype.splice.call(d, f, a.length - e, a.widgetRect), c = !0) }); c || (e < d.length - 1 ? b(e + 1) : d.push(a.widgetRect)) } var c; b(0) }), d
                } function b(a, c, e) {
                    var f; c.collapsed ? e.startContainer instanceof CKEDITOR.dom.element ?
                        (a = e.checkStartOfBlock(), f = new CKEDITOR.dom.text("​"), a ? e.startContainer.append(f, !0) : 0 === e.startOffset ? f.insertBefore(e.startContainer.getFirst()) : (e = e.startContainer.getChildren().getItem(e.startOffset - 1), f.insertAfter(e)), c.setStart(f.$, 0), c.setEnd(f.$, 0), a = c.getClientRects(), f.remove()) : e.startContainer instanceof CKEDITOR.dom.text && ("" === e.startContainer.getText() ? (e.startContainer.setText("​"), a = c.getClientRects(), e.startContainer.setText("")) : a = [d(e.createBookmark())]) : a = [d(e.createBookmark())];
                    return a
                } function c(a, b, d) { a = CKEDITOR.tools.extend({}, a); b && (a = CKEDITOR.tools.getAbsoluteRectPosition(d.document.getWindow(), a)); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a } function d(a) {
                    var b = a.startNode; a = a.endNode; var c; b.setText("​"); b.removeStyle("display"); a ? (a.setText("​"), a.removeStyle("display"), c = [b.getClientRect(), a.getClientRect()], a.remove()) : c = [b.getClientRect(), b.getClientRect()]; b.remove(); return {
                        right: Math.max(c[0].right, c[1].right), bottom: Math.max(c[0].bottom,
                            c[1].bottom), left: Math.min(c[0].left, c[1].left), top: Math.min(c[0].top, c[1].top), width: Math.abs(c[0].left - c[1].left), height: Math.max(c[0].bottom, c[1].bottom) - Math.min(c[0].top, c[1].top)
                    }
                } return void 0 !== this.document.getSelection ? function (d) {
                    var f = this.root.getDocument().$.createRange(), m; f.setStart(this.startContainer.$, this.startOffset); f.setEnd(this.endContainer.$, this.endOffset); m = f.getClientRects(); m = a(m, this); m.length || (m = b(m, f, this)); return CKEDITOR.tools.array.map(m, function (a) {
                        return c(a,
                            d, this)
                    }, this)
                } : function (a) { return [c(d(this.createBookmark()), a, this)] }
            }(), _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                var c = this.getCommonAncestor(), d = this.getBoundaryNodes(), f = [], h, m, g, k; if (c && c.find) for (m = c.find(a), h = 0; h < m.count(); h++)if (c = m.getItem(h), b || !c.isReadOnly()) g = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), k = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED ||
                    d.endNode.equals(c), g && k && f.push(c); return f
            }
        }; CKEDITOR.dom.range.mergeRanges = function (a) {
            return CKEDITOR.tools.array.reduce(a, function (a, b) {
                var c = a[a.length - 1], d = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) { var e = new CKEDITOR.dom.range(b.root), d = new CKEDITOR.dom.walker(e), f = CKEDITOR.dom.walker.whitespaces(); e.setStart(c.endContainer, c.endOffset); e.setEnd(b.startContainer, b.startOffset); for (e = d.next(); f(e) || b.endContainer.equals(e);)e = d.next(); d = !e } d ? c.setEnd(b.endContainer, b.endOffset) :
                    a.push(b); return a
            }, [])
        }
    })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT = 1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; "use strict";
    (function () {
        function a(a) { 1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) } function d(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function b(a, c, f, h) {
            a: { null == h && (h = d(f)); for (var g; g = h.shift();)if (g.getDtd().p) { h = { element: g, remaining: h }; break a } h = null } if (!h) return 0; if ((g = CKEDITOR.filter.instances[h.element.data("cke-filter")]) && !g.check(c)) return b(a,
                c, f, h.remaining); c = new CKEDITOR.dom.range(h.element); c.selectNodeContents(h.element); c = c.createIterator(); c.enlargeBr = a.enlargeBr; c.enforceRealBlocks = a.enforceRealBlocks; c.activeFilter = c.filter = g; a._.nestedEditable = { element: h.element, container: f, remaining: h.remaining, iterator: c }; return 1
        } function c(a, b, c) { if (!b) return !1; a = a.clone(); a.collapse(!c); return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) } var f = /^[\r\n\t ]+$/, h = CKEDITOR.dom.walker.bookmark(!1, !0), k = CKEDITOR.dom.walker.whitespaces(!0),
            g = function (a) { return h(a) && k(a) }, l = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                getNextParagraph: function (a) {
                    var d, k, t, z, I; a = a || "p"; if (this._.nestedEditable) {
                        if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d; this.activeFilter = this.filter; if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable =
                            null
                    } if (!this.range.root.getDtd()[a]) return null; if (!this._.started) {
                        var r = this.range.clone(); k = r.startPath(); var m = r.endPath(), M = !r.collapsed && c(r, k.block), y = !r.collapsed && c(r, m.block, 1); r.shrink(CKEDITOR.SHRINK_ELEMENT, !0); M && r.setStartAt(k.block, CKEDITOR.POSITION_BEFORE_END); y && r.setEndAt(m.block, CKEDITOR.POSITION_AFTER_START); k = r.endContainer.hasAscendant("pre", !0) || r.startContainer.hasAscendant("pre", !0); r.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        r.collapsed || (k = new CKEDITOR.dom.walker(r.clone()), m = CKEDITOR.dom.walker.bookmark(!0, !0), k.evaluator = m, this._.nextNode = k.next(), k = new CKEDITOR.dom.walker(r.clone()), k.evaluator = m, k = k.previous(), this._.lastNode = k.getNextSourceNode(!0, null, r.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (m = this.range.clone(), m.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), m.checkEndOfBlock() &&
                            (m = new CKEDITOR.dom.elementPath(m.endContainer, m.root), this._.lastNode = (m.block || m.blockLimit).getNextSourceNode(!0))), this._.lastNode && r.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = r.document.createText(""), this._.lastNode.insertAfter(k)), r = null); this._.started = 1; k = r
                    } m = this._.nextNode; r = this._.lastNode; for (this._.nextNode = null; m;) {
                        var M = 0, y = m.hasAscendant("pre"), J = m.type != CKEDITOR.NODE_ELEMENT, E = 0; if (J) m.type == CKEDITOR.NODE_TEXT && f.test(m.getText()) && (J = 0); else {
                            var p = m.getName();
                            if (CKEDITOR.dtd.$block[p] && "false" == m.getAttribute("contenteditable")) { d = m; b(this, a, d); break } else if (m.isBlockBoundary(this.forceBrBreak && !y && { br: 1 })) { if ("br" == p) J = 1; else if (!k && !m.getChildCount() && "hr" != p) { d = m; t = m.equals(r); break } k && (k.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), "br" != p && (this._.nextNode = m)); M = 1 } else { if (m.getFirst()) { k || (k = this.range.clone(), k.setStartAt(m, CKEDITOR.POSITION_BEFORE_START)); m = m.getFirst(); continue } J = 1 }
                        } J && !k && (k = this.range.clone(), k.setStartAt(m, CKEDITOR.POSITION_BEFORE_START));
                        t = (!M || J) && m.equals(r); if (k && !M) for (; !m.getNext(g) && !t;) { p = m.getParent(); if (p.isBlockBoundary(this.forceBrBreak && !y && { br: 1 })) { M = 1; J = 0; t || p.equals(r); k.setEndAt(p, CKEDITOR.POSITION_BEFORE_END); break } m = p; J = 1; t = m.equals(r); E = 1 } J && k.setEndAt(m, CKEDITOR.POSITION_AFTER_END); m = this._getNextSourceNode(m, E, r); if ((t = !m) || M && k) break
                    } if (!d) {
                        if (!k) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; d = new CKEDITOR.dom.elementPath(k.startContainer, k.root); m = d.blockLimit; M = { div: 1, th: 1, td: 1 };
                        d = d.block; !d && m && !this.enforceRealBlocks && M[m.getName()] && k.checkStartOfBlock() && k.checkEndOfBlock() && !m.equals(k.root) ? d = m : !d || this.enforceRealBlocks && d.is(l) ? (d = this.range.document.createElement(a), k.extractContents().appendTo(d), d.trim(), k.insertNode(d), z = I = !0) : "li" != d.getName() ? k.checkStartOfBlock() && k.checkEndOfBlock() || (d = d.clone(!1), k.extractContents().appendTo(d), d.trim(), I = k.splitBlock(), z = !I.wasStartOfBlock, I = !I.wasEndOfBlock, k.insertNode(d)) : t || (this._.nextNode = d.equals(r) ? null : this._getNextSourceNode(k.getBoundaryNodes().endNode,
                            1, r))
                    } z && (z = d.getPrevious()) && z.type == CKEDITOR.NODE_ELEMENT && ("br" == z.getName() ? z.remove() : z.getLast() && "br" == z.getLast().$.nodeName.toLowerCase() && z.getLast().remove()); I && (z = d.getLast()) && z.type == CKEDITOR.NODE_ELEMENT && "br" == z.getName() && (!CKEDITOR.env.needsBrFiller || z.getPrevious(h) || z.getNext(h)) && z.remove(); this._.nextNode || (this._.nextNode = t || d.equals(r) || !r ? null : this._getNextSourceNode(d, 1, r)); return d
                }, _getNextSourceNode: function (a, b, c) {
                    function d(a) { return !(a.equals(c) || a.equals(f)) } var f =
                        this.range.root; for (a = a.getNextSourceNode(b, null, d); !h(a);)a = a.getNextSourceNode(b, null, d); return a
                }
            }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
    })();
    CKEDITOR.command = function (a, d) {
    this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b) }; this.refresh = function (a, b) {
        if (!this.readOnly && a.readOnly) return !0; if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh",
            { editor: a, path: b }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
    }; var b; this.checkAllowed = function (c) { return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b }; CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () {
        this.state == CKEDITOR.TRISTATE_OFF ?
            this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"), extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] };
    (function () {
        function a(a, b, c, d, e) {
            var f, p; a = []; for (f in b) {
                p = b[f]; p = "boolean" == typeof p ? {} : "function" == typeof p ? { match: p } : C(p); "$" != f.charAt(0) && (p.elements = f); c && (p.featureName = c.toLowerCase()); var n = p; n.elements = k(n.elements, /\s+/) || null; n.propertiesOnly = n.propertiesOnly || !0 === n.elements; var w = /\s*,\s*/, q = void 0; for (q in Q) {
                n[q] = k(n[q], w) || null; var h = n, m = S[q], g = k(n[S[q]], w), H = n[q], v = [], D = !0, O = void 0; g ? D = !1 : g = {}; for (O in H) "!" == O.charAt(0) && (O = O.slice(1), v.push(O), g[O] = !0, D = !1); for (; O = v.pop();)H[O] =
                    H["!" + O], delete H["!" + O]; h[m] = (D ? !1 : g) || null
                } n.match = n.match || null; d.push(p); a.push(p)
            } b = e.elements; e = e.generic; var F; c = 0; for (d = a.length; c < d; ++c) {
                f = C(a[c]); p = !0 === f.classes || !0 === f.styles || !0 === f.attributes; n = f; q = m = w = void 0; for (w in Q) n[w] = M(n[w]); h = !0; for (q in S) { w = S[q]; m = n[w]; g = []; H = void 0; for (H in m) -1 < H.indexOf("*") ? g.push(new RegExp("^" + H.replace(/\*/g, ".*") + "$")) : g.push(H); m = g; m.length && (n[w] = m, h = !1) } n.nothingRequired = h; n.noProperties = !(n.attributes || n.classes || n.styles); if (!0 === f.elements ||
                    null === f.elements) e[p ? "unshift" : "push"](f); else for (F in n = f.elements, delete f.elements, n) if (b[F]) b[F][p ? "unshift" : "push"](f); else b[F] = [f]
            }
        } function d(a, c, d, e) {
            if (!a.match || a.match(c)) if (e || g(a, c)) if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
                a = a.classes; c = c.classes; e = d.validClasses; if (a) if (!0 === a) a = !0; else {
                    for (var f = 0, p = c.length, n; f < p; ++f)n = c[f], e[n] ||
                        (e[n] = a(n)); a = !1
                } else a = !1; d.allClasses = a
            }
        } function b(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var d in b) c[d] || (c[d] = a(d)); return !1 } function c(a, b, c) { if (!a.match || a.match(b)) { if (a.noProperties) return !1; c.hadInvalidAttribute = f(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = f(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes; b = b.classes; if (a) { for (var d = !1, e = !0 === a, p = b.length; p--;)if (e || a(b[p])) b.splice(p, 1), d = !0; a = d } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass } } function f(a,
            b) { if (!a) return !1; var c = !1, d = !0 === a, e; for (e in b) if (d || a(e)) delete b[e], c = !0; return c } function h(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function k(a, b) { if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = w(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, d = 0, e; for (e in a) c[e] = a[e], d++; return d ? c : !1 } function g(a, b) {
                if (a.nothingRequired) return !0;
                var c, d, e, f; if (e = a.requiredClasses) for (f = b.classes, c = 0; c < e.length; ++c)if (d = e[c], "string" == typeof d) { if (-1 == CKEDITOR.tools.indexOf(f, d)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(f, d)) return !1; return l(b.styles, a.requiredStyles) && l(b.attributes, a.requiredAttributes)
            } function l(a, b) { if (!b) return !0; for (var c = 0, d; c < b.length; ++c)if (d = b[c], "string" == typeof d) { if (!(d in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1; return !0 } function u(a) {
                if (!a) return {};
                a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b
            } function e(a) { var b, c, d, e, f = {}, p = 1; for (a = w(a); b = a.match(n);)(c = b[2]) ? (d = x(c, "styles"), e = x(c, "attrs"), c = x(c, "classes")) : d = e = c = null, f["$" + p++] = { elements: b[1], classes: c, styles: d, attributes: e }, a = a.slice(b[0].length); return f } function x(a, b) { var c = a.match(O[b]); return c ? w(c[1]) : null } function t(a) {
                var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
                    "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : [])
            } function z(a, b, e, f) {
                var n = 0, w; f.toHtml && (b.name = b.name.replace(H, "$1")); if (f.doCallbacks && a.elementCallbacks) { a: { w = a.elementCallbacks; for (var q = 0, h = w.length, g; q < h; ++q)if (g = w[q](b)) { w = g; break a } w = void 0 } if (w) return w } if (f.doTransform && (w = a._.transformations[b.name])) { t(b); for (q = 0; q < w.length; ++q)p(a, b, w[q]); r(b) } if (f.doFilter) {
                    a: {
                        q = b.name; h = a._; a = h.allowedRules.elements[q]; w = h.allowedRules.generic; q = h.disallowedRules.elements[q]; h = h.disallowedRules.generic;
                        g = f.skipRequired; var k = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, v, C; if (a || w) { t(b); if (q) for (v = 0, C = q.length; v < C; ++v)if (!1 === c(q[v], b, k)) { a = null; break a } if (h) for (v = 0, C = h.length; v < C; ++v)c(h[v], b, k); if (a) for (v = 0, C = a.length; v < C; ++v)d(a[v], b, k, g); if (w) for (v = 0, C = w.length; v < C; ++v)d(w[v], b, k, g); a = k } else a = null
                    } if (!a || !a.valid) return e.push(b), 1; C = a.validAttributes; var O = a.validStyles;
                    w = a.validClasses; var q = b.attributes, D = b.styles, h = b.classes; g = b.classBackup; var B = b.styleBackup, G, l, K = [], k = [], N = /^data-cke-/; v = !1; delete q.style; delete q["class"]; delete b.classBackup; delete b.styleBackup; if (!a.allAttributes) for (G in q) C[G] || (N.test(G) ? G == (l = G.replace(/^data-cke-saved-/, "")) || C[l] || (delete q[G], v = !0) : (delete q[G], v = !0)); if (!a.allStyles || a.hadInvalidStyle) { for (G in D) a.allStyles || O[G] ? K.push(G + ":" + D[G]) : v = !0; K.length && (q.style = K.sort().join("; ")) } else B && (q.style = B); if (!a.allClasses ||
                        a.hadInvalidClass) { for (G = 0; G < h.length; ++G)(a.allClasses || w[h[G]]) && k.push(h[G]); k.length && (q["class"] = k.sort().join(" ")); g && k.length < g.split(/\s+/).length && (v = !0) } else g && (q["class"] = g); v && (n = 1); if (!f.skipFinalValidation && !m(b)) return e.push(b), 1
                } f.toHtml && (b.name = b.name.replace(F, "cke:$1")); return n
            } function I(a) { var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null } function r(a) {
                var b = a.attributes, c; delete b.style; delete b["class"];
                if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" "))
            } function m(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function M(a) { if (!a) return !1; if (!0 === a) return !0; var b = I(a); return function (c) { return c in a || b && c.match(b) } } function y() { return new CKEDITOR.htmlParser.element("br") } function J(a) {
                return a.type == CKEDITOR.NODE_ELEMENT && ("br" ==
                    a.name || q.$block[a.name])
            } function E(a, b, c) {
                var d = a.name; if (q.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(y()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (q.$block[d] || "tr" == d) if ("br" == b) a.previous && !J(a.previous) && (b = y(), b.insertBefore(a)), a.next && !J(a.next) && (b = y(), b.insertAfter(a)), a.replaceWithChildren(); else {
                    var d = a.children, e; b: { e = q[b]; for (var f = 0, p = d.length, n; f < p; ++f)if (n = d[f], n.type == CKEDITOR.NODE_ELEMENT && !e[n.name]) { e = !1; break b } e = !0 } if (e) a.name = b, a.attributes =
                        {}, c.push({ check: "parent-down", el: a }); else { e = a.parent; for (var f = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, w, h, p = d.length; 0 < p;)n = d[--p], f && (n.type == CKEDITOR.NODE_TEXT || n.type == CKEDITOR.NODE_ELEMENT && q.$inline[n.name]) ? (w || (w = new CKEDITOR.htmlParser.element(b), w.insertAfter(a), c.push({ check: "parent-down", el: w })), w.add(n, 0)) : (w = null, h = q[e.name] || q.span, n.insertAfter(a), e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n.type != CKEDITOR.NODE_ELEMENT || h[n.name] || c.push({ check: "el-up", el: n })); a.remove() }
                } else d in
                    { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
            } function p(a, b, c) { var d, e; for (d = 0; d < c.length; ++d)if (e = c[d], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) { e.right(b, K); break } } function D(a, b) {
                var c = b.getDefinition(), d = c.attributes, e = c.styles, f, p, n, w; if (a.name != c.element) return !1; for (f in d) if ("class" == f) for (c = d[f].split(/\s+/), n = a.classes.join("|"); w = c.pop();) { if (-1 == n.indexOf(w)) return !1 } else if (a.attributes[f] != d[f]) return !1; for (p in e) if (a.styles[p] !=
                    e[p]) return !1; return !0
            } function G(a, b) { var c, d; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]); return [{ element: c, left: d, right: function (a, c) { c.transform(a, b) } }] } function B(a) { return function (b) { return D(b, a) } } function N(a) { return function (b, c) { c[a](b) } } var q = CKEDITOR.dtd, C = CKEDITOR.tools.copy, w = CKEDITOR.tools.trim, v = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a, b) {
            this.allowedContent = []; this.disallowedContent = []; this.elementCallbacks = null; this.disabled =
                !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; var c = this.editor = a instanceof CKEDITOR.editor ? a : null; if (c && !b) {
                this.customConfig = !0; var d = c.config.allowedContent; !0 === d ? this.disabled = !0 : (d || (this.customConfig = !1), this.allow(d, "config", 1), this.allow(c.config.extraAllowedContent, "extra", 1), this.allow(v[c.enterMode] +
                    " " + v[c.shiftEnterMode], "default", 1), this.disallow(c.config.disallowedContent))
                } else this.customConfig = !1, this.allow(b || a, "default", 1)
            }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                allow: function (b, c, d) {
                    if (!h(this, b, d)) return !1; var f, p; if ("string" == typeof b) b = e(b); else if (b instanceof CKEDITOR.style) {
                        if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d); f = b.getDefinition(); b = {}; d = f.attributes; b[f.element] = f = { styles: f.styles, requiredStyles: f.styles && CKEDITOR.tools.object.keys(f.styles) };
                        d && (d = C(d), f.classes = d["class"] ? d["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete d["class"], f.attributes = d, f.requiredAttributes = d && CKEDITOR.tools.object.keys(d))
                    } else if (CKEDITOR.tools.isArray(b)) { for (f = 0; f < b.length; ++f)p = this.allow(b[f], c, d); return p } a(this, b, c, this.allowedContent, this._.allowedRules); return !0
                }, applyTo: function (a, b, c, d) {
                    if (this.disabled) return !1; var e = this, f = [], p = this.editor && this.editor.config.protectedSource, n, w = !1, h = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b };
                    a.forEach(function (a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-")) if (n = z(e, a, f, h), n & 1) w = !0; else if (n & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var c; a: {
                                var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var A, q, m; if (p) for (q = 0; q < p.length; ++q)if ((m = d.match(p[q])) && m[0].length == d.length) {
                                    c =
                                    !0; break a
                                } d = CKEDITOR.htmlParser.fragment.fromHtml(d); 1 == d.children.length && (A = d.children[0]).type == CKEDITOR.NODE_ELEMENT && z(e, A, c, h); c = !c.length
                            } c || f.push(a)
                        }
                    }, null, !0); f.length && (w = !0); var g; a = []; d = v[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var k; c = f.pop();)c.type == CKEDITOR.NODE_ELEMENT ? E(c, d, a) : c.remove(); for (; g = a.pop();)if (c = g.el, c.parent) switch (k = q[c.parent.name] || q.span, g.check) {
                        case "it": q.$removeEmpty[c.name] && !c.children.length ? E(c, d, a) : m(c) || E(c, d, a); break; case "el-up": c.parent.type ==
                            CKEDITOR.NODE_DOCUMENT_FRAGMENT || k[c.name] || E(c, d, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || k[c.name] || E(c.parent, d, a)
                    }return w
                }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) { if (!h(this, b, !0)) return !1; "string" == typeof b && (b = e(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0 },
                addContentForms: function (a) { if (!this.disabled && a) { var b, c, d = [], e; for (b = 0; b < a.length && !e; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (e = c); if (e) { for (b = 0; b < a.length; ++b)d.push(G(a[b], e)); this.addTransformations(d) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                    if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations);
                    this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
                }, addTransformations: function (a) {
                    var b, c; if (!this.disabled && a) {
                        var d = this._.transformations, e; for (e = 0; e < a.length; ++e) {
                            b = a[e]; var f = void 0, p = void 0, n = void 0, w = void 0, q = void 0, h = void 0; c = []; for (p = 0; p < b.length; ++p)n = b[p], "string" == typeof n ? (n = n.split(/\s*:\s*/), w = n[0], q = null, h = n[1]) : (w = n.check, q = n.left, h = n.right), f || (f = n, f = f.element ? f.element : w ? w.match(/^([a-z0-9]+)/i)[0] :
                                f.left.getDefinition().element), q instanceof CKEDITOR.style && (q = B(q)), c.push({ check: w == f ? null : w, left: q, right: "string" == typeof h ? N(h) : h }); b = f; d[b] || (d[b] = []); d[b].push(c)
                        }
                    }
                }, check: function (a, b, c) {
                    if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;)if (this.check(a[d], b, c)) return !0; return !1 } var f, n; if ("string" == typeof a) {
                        n = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e"; if (n in this._.cachedChecks) return this._.cachedChecks[n]; f = e(a).$1; var w = f.styles, d = f.classes; f.name = f.elements;
                        f.classes = d = d ? d.split(/\s*,\s*/) : []; f.styles = u(w); f.attributes = u(f.attributes); f.children = []; d.length && (f.attributes["class"] = d.join(" ")); w && (f.attributes.style = CKEDITOR.tools.writeCssText(f.styles))
                    } else f = a.getDefinition(), w = f.styles, d = f.attributes || {}, w && !CKEDITOR.tools.isEmpty(w) ? (w = C(w), d.style = CKEDITOR.tools.writeCssText(w, !0)) : w = {}, f = { name: f.element, attributes: d, classes: d["class"] ? d["class"].split(/\s+/) : [], styles: w, children: [] }; var w = CKEDITOR.tools.clone(f), q = [], h; if (!1 !== b && (h = this._.transformations[f.name])) {
                        for (d =
                            0; d < h.length; ++d)p(this, f, h[d]); r(f)
                    } z(this, w, q, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c }); 0 < q.length ? c = !1 : ((b = f.attributes["class"]) && (f.attributes["class"] = f.attributes["class"].split(" ").sort().join(" ")), c = CKEDITOR.tools.objectCompare(f.attributes, w.attributes, !0), b && (f.attributes["class"] = b)); "string" == typeof a && (this._.cachedChecks[n] = c); return c
                }, getAllowedEnterMode: function () {
                    var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR };
                    return function (c, d) { var f = a.slice(), e; if (this.check(v[c])) return c; for (d || (f = f.reverse()); e = f.pop();)if (this.check(e)) return b[e]; return CKEDITOR.ENTER_BR }
                }(), clone: function () { var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent); a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a }, destroy: function () {
                    delete CKEDITOR.filter.instances[this.id];
                    delete this._; delete this.allowedContent; delete this.disallowedContent
                }
            }; var Q = { styles: 1, attributes: 1, classes: 1 }, S = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, n = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, O = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, H = /^cke:(object|embed|param)$/, F = /^(object|embed|param)$/, K; K = CKEDITOR.filter.transformationsTools = {
                sizeToStyle: function (a) {
                    this.lengthToStyle(a,
                        "width"); this.lengthToStyle(a, "height")
                }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var d = a.attributes[b]; d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d) } delete a.attributes[b] }, lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var d = a.styles[b], f = d && d.match(/^(\d+)(?:\.\d*)?px$/); f ? a.attributes[c] = f[1] : "cke-test" == d && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) {
                    if (!("float" in
                        a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align
                }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] }, splitBorderShorthand: function (a) {
                    if (a.styles.border) {
                        var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width);
                        delete a.styles.border
                    }
                }, listTypeToStyle: function (a) { if (a.attributes.type) switch (a.attributes.type) { case "a": a.styles["list-style-type"] = "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman"; break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type } }, splitMarginShorthand: function (a) {
                    function b(d) {
                    a.styles["margin-top"] =
                        c[d[0]]; a.styles["margin-right"] = c[d[1]]; a.styles["margin-bottom"] = c[d[2]]; a.styles["margin-left"] = c[d[3]]
                    } if (a.styles.margin) { var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"]; switch (c.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }delete a.styles.margin }
                }, matchesStyle: D, transform: function (a, b) {
                    if ("string" == typeof b) a.name = b; else {
                        var c = b.getDefinition(), d = c.styles, f = c.attributes, e, p, n, w; a.name = c.element; for (e in f) if ("class" == e) for (c =
                            a.classes.join("|"), n = f[e].split(/\s+/); w = n.pop();)-1 == c.indexOf(w) && a.classes.push(w); else a.attributes[e] = f[e]; for (p in d) a.styles[p] = d[p]
                    }
                }
            }
    })();
    (function () {
    CKEDITOR.focusManager = function (a) { if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive = null; this._ = { editor: a }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
        focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) }, lock: function () {
            this._.locked =
            1
        }, unlock: function () { delete this._.locked }, blur: function (a) { function d() { if (this.hasFocus) { this.hasFocus = !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur") } } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var b = CKEDITOR.focusManager._.blurDelay; a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; d.call(this) }, b, this) } }, add: function (a, d) {
            var b = a.getCustomData("focusmanager"); if (!b || b != this) {
                b && b.remove(a); var b =
                    "focus", c = "blur"; d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1); var f = { blur: function () { a.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(a) } }; a.on(b, f.focus, this); a.on(c, f.blur, this); d && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers", f)
            }
        }, remove: function (a) {
            a.removeCustomData("focusmanager"); var d = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur", d.blur); a.removeListener("focus",
                d.focus)
        }
    }
    })(); CKEDITOR.keystrokeHandler = function (a) { if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: a }; return this };
    (function () { var a, d = function (b) { b = b.data; var d = b.getKeystroke(), h = this.keystrokes[d], k = this._.editor; a = !1 === k.fire("key", { keyCode: d, domEvent: b }); a || (h && (a = !1 !== k.execCommand(h, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d])); a && b.preventDefault(!0); return !a }, b = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", d, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } } })();
    (function () {
    CKEDITOR.lang = {
        languages: { af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, d, b) {
        a && CKEDITOR.lang.languages[a] ||
            (a = this.detect(d, a)); var c = this; d = function () { c[a].dir = c.rtl[a] ? "rtl" : "ltr"; b(a, c[a]) }; this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this)
        }, detect: function (a, d) { var b = this.languages; d = d || navigator.userLanguage || navigator.language || a; var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), f = c[1], c = c[2]; b[f + "-" + c] ? f = f + "-" + c : b[f] || (f = null); CKEDITOR.lang.detect = f ? function () { return f } : function (a) { return a }; return f || a }
    }
    })();
    CKEDITOR.scriptLoader = function () {
        var a = {}, d = {}; return {
            load: function (b, c, f, h) {
                var k = "string" == typeof b; k && (b = [b]); f || (f = CKEDITOR); var g = b.length, l = [], u = [], e = function (a) { c && (k ? c.call(f, a) : c.call(f, l, u)) }; if (0 === g) e(!0); else {
                    var x = function (a, b) { (b ? l : u).push(a); 0 >= --g && (h && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), e(b)) }, t = function (b, c) { a[b] = 1; var f = d[b]; delete d[b]; for (var e = 0; e < f.length; e++)f[e](b, c) }, z = function (b) {
                        if (a[b]) x(b, !0); else {
                            var f = d[b] || (d[b] = []); f.push(x); if (!(1 < f.length)) {
                                var e =
                                    new CKEDITOR.dom.element("script"); e.setAttributes({ type: "text/javascript", src: b }); c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? e.$.onreadystatechange = function () { if ("loaded" == e.$.readyState || "complete" == e.$.readyState) e.$.onreadystatechange = null, t(b, !0) } : (e.$.onload = function () { setTimeout(function () { e.$.onload = null; e.$.onerror = null; t(b, !0) }, 0) }, e.$.onerror = function () { e.$.onload = null; e.$.onerror = null; t(b, !1) })); e.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    }; h && CKEDITOR.document.getDocumentElement().setStyle("cursor",
                        "wait"); for (var I = 0; I < g; I++)z(b[I])
                }
            }, queue: function () { function a() { var b; (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) } var c = []; return function (d, h) { var k = this; c.push({ scriptUrl: d, callback: function () { h && h.apply(this, arguments); c.shift(); a.call(k) } }); 1 == c.length && a.call(this) } }()
        }
    }(); CKEDITOR.resourceManager = function (a, d) { this.basePath = a; this.fileName = d; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } };
    CKEDITOR.resourceManager.prototype = {
        add: function (a, d) { if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.'); var b = this.registered[a] = d || {}; b.name = a; b.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b); return this.get(a) }, get: function (a) { return this.registered[a] || null }, getPath: function (a) { var d = this.externals[a]; return CKEDITOR.getUrl(d && d.dir || this.basePath + a + "/") }, getFilePath: function (a) {
            var d = this.externals[a];
            return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js"))
        }, addExternal: function (a, d, b) { b || (d = d.replace(/[^\/]+$/, function (a) { b = a; return "" })); b = b || this.fileName + ".js"; a = a.split(","); for (var c = 0; c < a.length; c++)this.externals[a[c]] = { dir: d, file: b } }, load: function (a, d, b) {
            CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var c = this.loaded, f = this.registered, h = [], k = {}, g = {}, l = 0; l < a.length; l++) { var u = a[l]; if (u) if (c[u] || f[u]) g[u] = this.get(u); else { var e = this.getFilePath(u); h.push(e); e in k || (k[e] = []); k[e].push(u) } } CKEDITOR.scriptLoader.load(h,
                function (a, e) { if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[e[0]].join(",") + '" was not found at "' + e[0] + '".'); for (var f = 0; f < a.length; f++)for (var h = k[a[f]], l = 0; l < h.length; l++) { var m = h[l]; g[m] = this.get(m); c[m] = 1 } d.call(b, g) }, this)
        }
    }; CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
        var d = {}; return function (b, c, f) {
            var h = {}, k = function (b) {
                a.call(this, b, function (a) {
                    CKEDITOR.tools.extend(h, a); var b = [], e; for (e in a) {
                        var g = a[e], t = g && g.requires; if (!d[e]) { if (g.icons) for (var z = g.icons.split(","), I = z.length; I--;)CKEDITOR.skin.addIcon(z[I], g.path + "icons/" + (CKEDITOR.env.hidpi && g.hidpi ? "hidpi/" : "") + z[I] + ".png"); g.isSupportedEnvironment = g.isSupportedEnvironment || function () { return !0 }; d[e] = 1 } if (t) for (t.split && (t =
                            t.split(",")), g = 0; g < t.length; g++)h[t[g]] || b.push(t[g])
                    } if (b.length) k.call(this, b); else { for (e in h) g = h[e], g.onLoad && !g.onLoad._called && (!1 === g.onLoad() && delete h[e], g.onLoad._called = 1); c && c.call(f || window, h) }
                }, this)
            }; k.call(this, b)
        }
    }); CKEDITOR.plugins.setLang = function (a, d, b) { var c = this.get(a); a = c.langEntries || (c.langEntries = {}); c = c.lang || (c.lang = []); c.split && (c = c.split(",")); -1 == CKEDITOR.tools.indexOf(c, d) && c.push(d); a[d] = b };
    CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this };
    CKEDITOR.ui.prototype = {
        add: function (a, d, b) { b.name = a.toLowerCase(); var c = this.items[a] = { type: d, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(c, b) }, get: function (a) { return this.instances[a] }, create: function (a) { var d = this.items[a], b = d && this._.handlers[d.type], c = d && d.command && this.editor.getCommand(d.command), b = b && b.create.apply(this, d.args); this.instances[a] = b; c && c.uiItems.push(b); b && !b.type && (b.type = d.type); return b }, addHandler: function (a, d) {
            this._.handlers[a] =
            d
        }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) { return this.editor.id + "_" + a }
    }; CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function () {
        function a(a, e, f) {
            CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (void 0 !== e) {
                if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!f) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!b(e, f)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
                this.element = e; this.elementMode = f; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || d(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly",
                c); this.on("selectionChange", function (a) { h(this, a.data.path) }); this.on("activeFilterChange", function () { h(this, this.elementPath(), !0) }); this.on("mode", c); CKEDITOR.dom.selection.setupEditorOptimization(this); this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated",
                    null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { this.isDestroyed() || this.isDetached() || g(this, a) }, 0, this)
        } function d() { do var a = "editor" + ++I; while (CKEDITOR.instances[a]); return a } function b(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function c() { var a = this.commands, b; for (b in a) f(this, a[b]) } function f(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" :
                b.modes[a.mode] ? "enable" : "disable"]()
        } function h(a, b, c) { if (b) { var d, e, f = a.commands; for (e in f) d = f[e], (c || d.contextSensitive) && d.refresh(a, b) } } function k(a) { var b = a.config.customConfig; if (!b) return !1; var b = CKEDITOR.getUrl(b), c = r[b] || (r[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () { }; k(a) }); return !0 } function g(a, b) {
            a.on("customConfigLoaded",
                function () {
                    if (b) { if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") ||
                        CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); l(a)
                }); b && null != b.customConfig && (a.config.customConfig = b.customConfig);
            k(a) || a.fireOnce("customConfigLoaded")
        } function l(a) { CKEDITOR.skin.loadPart("editor", function () { u(a) }) } function u(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) {
                var d = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded");
                e(a)
            })
        } function e(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); x(a) }) } function x(a) {
            function b(a) { if (!a) return ""; CKEDITOR.tools.isArray(a) && (a = a.join(",")); return a.replace(/\s/g, "") } var c = a.config, d = b(c.plugins), e = b(c.extraPlugins), f = b(c.removePlugins); if (e) var h = new RegExp("(?:^|,)(?:" + e.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), d = d.replace(h, ""), d = d + ("," + e); if (f) var g = new RegExp("(?:^|,)(?:" + f.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), d = d.replace(g,
                ""); CKEDITOR.env.air && (d += ",adobeair"); CKEDITOR.plugins.load(d.split(","), function (b) {
                    var d = [], e = [], f = []; a.plugins = CKEDITOR.tools.extend({}, a.plugins, b); for (var p in b) {
                        var h = b[p], k = h.lang, D = null, n = h.requires, O; CKEDITOR.tools.isArray(n) && (n = n.join(",")); if (n && (O = n.match(g))) for (; n = O.pop();)CKEDITOR.error("editor-plugin-required", { plugin: n.replace(",", ""), requiredBy: p }); k && !a.lang[p] && (k.split && (k = k.split(",")), 0 <= CKEDITOR.tools.indexOf(k, a.langCode) ? D = a.langCode : (D = a.langCode.replace(/-.*/, ""), D =
                            D != a.langCode && 0 <= CKEDITOR.tools.indexOf(k, D) ? D : 0 <= CKEDITOR.tools.indexOf(k, "en") ? "en" : k[0]), h.langEntries && h.langEntries[D] ? (a.lang[p] = h.langEntries[D], D = null) : f.push(CKEDITOR.getUrl(h.path + "lang/" + D + ".js"))); e.push(D); d.push(h)
                    } CKEDITOR.scriptLoader.load(f, function () {
                        if (!a.isDestroyed() && !a.isDetached()) {
                            for (var b = ["beforeInit", "init", "afterInit"], f = 0; f < b.length; f++)for (var p = 0; p < d.length; p++) { var n = d[p]; 0 === f && e[p] && n.lang && n.langEntries && (a.lang[n.name] = n.langEntries[e[p]]); if (n[b[f]]) n[b[f]](a) } a.fireOnce("pluginsLoaded");
                            c.keystrokes && a.setKeystroke(a.config.keystrokes); for (p = 0; p < a.config.blockedKeystrokes.length; p++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[p]] = 1; a.status = "loaded"; a.fireOnce("loaded"); CKEDITOR.fire("instanceLoaded", null, a)
                        }
                    })
                })
        } function t() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0 } return !1 } function z(a, b) {
            function c(a) {
                var b =
                    a.startContainer, d = a.endContainer; return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1
            } function d(a) { var b = a.startContainer; return b.is("tr") ? a.cloneContents() : b.clone(!0) } for (var e = new CKEDITOR.dom.documentFragment, f, h, g, k = 0; k < a.length; k++) {
                var l = a[k], q = l.startContainer.getAscendant("tr", !0); c(l) ? (f || (f = q.getAscendant("table").clone(), f.append(q.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), e.append(f), f = f.findOne("thead, tbody, tfoot")), h && h.equals(q) || (h =
                    q, g = q.clone(), f.append(g)), g.append(d(l))) : e.append(l.cloneContents())
            } return f ? e : b.getHtmlFromRange(a[0])
        } a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var I = 0, r = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            plugins: { detectConflict: function (a, b) { for (var c = 0; c < b.length; c++) { var d = b[c]; if (this[d]) return CKEDITOR.warn("editor-plugin-conflict", { plugin: a, replacedWith: d }), !0 } return !1 } }, addCommand: function (a, b) {
            b.name = a.toLowerCase(); var c = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this,
                b); this.mode && f(this, c); return this.commands[a] = c
            }, _attachToForm: function () {
                function a(b) { c.updateElement(); c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault() } function b(a) { return !!(a && a.call && a.apply) } var c = this, d = c.element, e = new CKEDITOR.dom.element(d.$.form); d.is("textarea") && e && (e.on("submit", a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on("destroy", function () {
                    e.removeListener("submit",
                        a)
                }))
            }, destroy: function (a) { var b = CKEDITOR.filter.instances, c = this; this.fire("beforeDestroy"); !a && t.call(this); this.editable(null); this.filter && delete this.filter; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b), function (a) { a = b[a]; c === a.editor && a.destroy() }); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this) }, elementPath: function (a) {
                if (!a) {
                    a = this.getSelection(); if (!a) return null;
                    a = a.getStartElement()
                } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a, b) { var c = this.getCommand(a), d = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1 }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
            !a &&
                this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue
            }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a,
                b, c) { var d = !0, e = b; b && "object" == typeof b && (c = b.internal, e = b.callback, d = !b.noSnapshot); !c && d && this.fire("saveSnapshot"); if (e || !c) this.once("dataReady", function (a) { !c && d && this.fire("saveSnapshot"); e && e.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a) }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a,
                    b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) { this.fire("insertElement", a) }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = z(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a, b) {
                        var c = this.editable(), d = this.getSelection().getRanges(), e = new CKEDITOR.dom.documentFragment, f; if (!c || 0 === d.length) return null; for (f = 0; f < d.length; f++)e.append(c.extractHtmlFromRange(d[f],
                            b)); b || this.getSelection().selectRanges([d[0]]); return a ? e.getHtml() : e
                    }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () { return "ready" == this.status && this._.previousValue !== this.getSnapshot() }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return t.call(this) }, setKeystroke: function () {
                        for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, d, e = b.length; e--;)c = b[e], d = 0, CKEDITOR.tools.isArray(c) &&
                            (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
                    }, getCommandKeystroke: function (a, b) { var c = "string" === typeof a ? this.getCommand(a) : a, d = []; if (c) { var e = CKEDITOR.tools.object.findKey(this.commands, c), f = this.keystrokeHandler.keystrokes; if (c.fakeKeystroke) d.push(c.fakeKeystroke); else for (var h in f) f[h] === e && d.push(h) } return b ? d : d[0] || null }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) {
                        a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"),
                            a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
                    }, setActiveEnterMode: function (a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }, isDetached: function () {
                        return !!this.container &&
                            this.container.isDetached()
                    }, isDestroyed: function () { return "destroyed" === this.status }
        }); CKEDITOR.editor._getEditorElement = function (a) { if (!CKEDITOR.env.isCompatible) return null; var b = CKEDITOR.dom.element.get(a); return b ? b.getEditor() ? (CKEDITOR.error("editor-element-conflict", { editorName: b.getEditor().name }), null) : b : (CKEDITOR.error("editor-incorrect-element", { element: a }), null) }
    })(); CKEDITOR.ELEMENT_MODE_NONE = 0; CKEDITOR.ELEMENT_MODE_REPLACE = 1; CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
    (function () {
        var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (b) {
                for (var c, f, h = 0, k; c = this._.htmlPartsRegex.exec(b);) {
                    f = c.index; if (f > h) if (h = b.substring(h, f), k) k.push(h); else this.onText(h);
                    h = this._.htmlPartsRegex.lastIndex; if (f = c[1]) if (f = f.toLowerCase(), k && CKEDITOR.dtd.$cdata[f] && (this.onCDATA(k.join("")), k = null), !k) { this.onTagClose(f); continue } if (k) k.push(c[0]); else if (f = c[3]) { if (f = f.toLowerCase(), !/="/.test(f)) { var g = {}, l, u = c[4]; c = !!c[5]; if (u) for (; l = a.exec(u);) { var e = l[1].toLowerCase(); l = l[2] || l[3] || l[4] || ""; g[e] = !l && d[e] ? e : CKEDITOR.tools.htmlDecodeAttr(l) } this.onTagOpen(f, g, c); !k && CKEDITOR.dtd.$cdata[f] && (k = []) } } else if (f = c[2]) this.onComment(f)
                } if (b.length > h) this.onText(b.substring(h,
                    b.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () { this._ = { output: [] } }, proto: {
            openTag: function (a) { this._.output.push("\x3c", a) }, openTagClose: function (a, d) { d ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (a, d) { "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d)); this._.output.push(" ", a, '\x3d"', d, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) {
                this._.output.push("\x3c!--", a,
                    "--\x3e")
            }, write: function (a) { this._.output.push(a) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (a) { var d = this._.output.join(""); a && this.reset(); return d }
        }
    }); "use strict";
    (function () {
        CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
            remove: function () { var a = this.parent.children, d = CKEDITOR.tools.indexOf(a, this), b = this.previous, c = this.next; b && (b.next = c); c && (c.previous = b); a.splice(d, 1); this.parent = null }, replaceWith: function (a) { var d = this.parent.children, b = CKEDITOR.tools.indexOf(d, this), c = a.previous = this.previous, f = a.next = this.next; c && (c.next = a); f && (f.previous = a); d[b] = a; a.parent = this.parent; this.parent = null }, insertAfter: function (a) {
                var d = a.parent.children,
                b = CKEDITOR.tools.indexOf(d, a), c = a.next; d.splice(b + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; c && (c.previous = this); this.parent = a.parent
            }, insertBefore: function (a) { var d = a.parent.children, b = CKEDITOR.tools.indexOf(d, a); d.splice(b, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent }, getAscendant: function (a) {
                var d = "function" == typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) { return b.name in a }, b = this.parent; for (; b &&
                    b.type == CKEDITOR.NODE_ELEMENT;) { if (d(b)) return b; b = b.parent } return null
            }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
        }
    })(); "use strict"; CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (a, d) { var b = this.value; if (!(b = a.onComment(d, b, this))) return this.remove(), !1; if ("string" != typeof b) return this.replaceWith(b), !1; this.value = b; return !0 }, writeHtml: function (a, d) { d && this.filter(d); a.comment(this.value) } }); "use strict";
    (function () { CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a, d) { if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, d) { d && this.filter(d); a.text(this.value) } }) })(); "use strict";
    (function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (a) { a.write(this.value) } }) })(); "use strict"; CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } };
    (function () {
        function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), b = { ol: 1, ul: 1 }, c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }), f = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" }; CKEDITOR.htmlParser.fragment.fromHtml =
            function (h, k, g) {
                function l(a) { var b; if (0 < m.length) for (var c = 0; c < m.length; c++) { var d = m[c], e = d.name, f = CKEDITOR.dtd[e], h = y.name && CKEDITOR.dtd[y.name]; h && !h[e] || a && f && !f[a] && CKEDITOR.dtd[a] ? e == y.name && (x(y, y.parent, 1), c--) : (b || (u(), b = 1), d = d.clone(), d.parent = y, y = d, m.splice(c, 1), c--) } } function u() { for (; M.length;)x(M.shift(), y) } function e(a) {
                    if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                        var b = a.children.length, c = a.children[b - 1], d; c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ?
                            c.value = d : a.children.length = b - 1)
                    }
                } function x(b, c, d) { c = c || y || r; var f = y; void 0 === b.previous && (t(c, b) && (y = c, I.onTagOpen(g, {}), b.returnPoint = c = y), e(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (E = !1), "textarea" == b.name && (J = !1)); b.returnPoint ? (y = b.returnPoint, delete b.returnPoint) : y = d ? c : f } function t(a, b) {
                    if ((a == r || "body" == a.name) && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
                        var c, d; return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
                            !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                } function z(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var I = new CKEDITOR.htmlParser, r = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment, m = [], M = [], y = r, J = "textarea" == r.name, E = "pre" == r.name; I.onTagOpen = function (e, f, h, g) {
                    f = new CKEDITOR.htmlParser.element(e, f); f.isUnknown && h && (f.isEmpty = !0); f.isOptionalClose = g;
                    if (a(f)) m.push(f); else {
                        if ("pre" == e) E = !0; else { if ("br" == e && E) { y.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == e && (J = !0) } if ("br" == e) M.push(f); else {
                            for (; !(g = (h = y.name) ? CKEDITOR.dtd[h] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, f.isUnknown || y.isUnknown || g[e]);)if (y.isOptionalClose) I.onTagClose(h); else if (e in b && h in b) h = y.children, (h = h[h.length - 1]) && "li" == h.name || x(h = new CKEDITOR.htmlParser.element("li"), y), !f.returnPoint && (f.returnPoint = y), y = h; else if (e in CKEDITOR.dtd.$listItem &&
                                !z(e, h)) I.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1); else if (h in d && !z(e, h)) !f.returnPoint && (f.returnPoint = y), y = y.parent; else if (h in CKEDITOR.dtd.$inline && m.unshift(y), y.parent) x(y, y.parent, 1); else { f.isOrphan = 1; break } l(e); u(); f.parent = y; f.isEmpty ? x(f) : y = f
                        }
                    }
                }; I.onTagClose = function (a) {
                    for (var b = m.length - 1; 0 <= b; b--)if (a == m[b].name) { m.splice(b, 1); return } for (var c = [], d = [], e = y; e != r && e.name != a;)e._.isBlockLike || d.unshift(e), c.push(e), e = e.returnPoint || e.parent; if (e != r) {
                        for (b = 0; b < c.length; b++) { var f = c[b]; x(f, f.parent) } y =
                            e; e._.isBlockLike && u(); x(e, e.parent); e == y && (y = y.parent); m = m.concat(d)
                    } "body" == a && (g = !1)
                }; I.onText = function (a) { if (!(y._.hasInlineStarted && !M.length || E || J) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var b = y.name, e = b ? CKEDITOR.dtd[b] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c; if (!J && !e["#"] && b in d) I.onTagOpen(f[b] || ""), I.onText(a); else { u(); l(); E || J || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a = new CKEDITOR.htmlParser.text(a); if (t(y, a)) this.onTagOpen(g, {}, 0, 1); y.add(a) } }; I.onCDATA =
                    function (a) { y.add(new CKEDITOR.htmlParser.cdata(a)) }; I.onComment = function (a) { u(); l(); y.add(new CKEDITOR.htmlParser.comment(a)) }; I.parse(h); for (u(); y != r;)x(y, y.parent, 1); e(r); return r
            }; CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                isNaN(b) && (b = this.children.length); var c = 0 < b ? this.children[b - 1] : null; if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) { this.children.pop(); this.add(a); return } c.next =
                        a
                } a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
                }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, c) {
                    if (this.childrenFilteredBy != a.id) {
                        c = this.getFilterContext(c); if (b && !this.parent) a.onRoot(c, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a,
                            c) && b--
                    }
                }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, c) { var d = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(d, this); b && this.filterChildren(b, !1, d); b = 0; c = this.children; for (d = c.length; b < d; b++)c[b].writeHtml(a) }, forEach: function (a, b, c) { if (!(c || b && this.type != b)) var d = a(this); if (!1 !== d) { c = this.children; for (var f = 0; f < c.length; f++)d = c[f], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d) } }, getFilterContext: function (a) {
                    return a ||
                        {}
                }
            }
    })(); "use strict";
    (function () {
        function a() { this.rules = [] } function d(b, c, d, h) { var k, g; for (k in c) (g = b[k]) || (g = b[k] = new a), g.add(c[k], d, h) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (b) { this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a; this.commentRules = new a; this.rootRules = new a; b && this.addRules(b, 10) }, proto: {
                addRules: function (a, c) {
                    var f; "number" == typeof c ? f = c : c && "priority" in c && (f =
                        c.priority); "number" != typeof f && (f = 10); "object" != typeof c && (c = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, f, c); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, f, c); a.elements && d(this.elementsRules, a.elements, f, c); a.attributes && d(this.attributesRules, a.attributes, f, c); a.text && this.textRules.add(a.text, f, c); a.comment && this.commentRules.add(a.comment, f, c); a.root && this.rootRules.add(a.root, f, c)
                }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, c) {
                    return this.elementNameRules.execOnName(a,
                        c)
                }, onAttributeName: function (a, c) { return this.attributeNameRules.execOnName(a, c) }, onText: function (a, c, d) { return this.textRules.exec(a, c, d) }, onComment: function (a, c, d) { return this.commentRules.exec(a, c, d) }, onRoot: function (a, c) { return this.rootRules.exec(a, c) }, onElement: function (a, c) { for (var d = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], h, k = 0; 3 > k; k++)if (h = d[k]) { h = h.exec(a, c, this); if (!1 === h) return null; if (h && h != c) return this.onNode(a, h); if (c.parent && !c.name) break } return c },
                onNode: function (a, c) { var d = c.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value, c)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value, c)) : null }, onAttribute: function (a, c, d, h) { return (d = this.attributesRules[d]) ? d.exec(a, h, c, this) : h }
            }
        }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype = {
            add: function (a, c, d) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: d }) }, addMany: function (a,
                c, d) { for (var h = [this.findIndex(c), 0], k = 0, g = a.length; k < g; k++)h.push({ value: a[k], priority: c, options: d }); this.rules.splice.apply(this.rules, h) }, findIndex: function (a) { for (var c = this.rules, d = c.length - 1; 0 <= d && a < c[d].priority;)d--; return d + 1 }, exec: function (a, c) {
                    var d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment, h = Array.prototype.slice.call(arguments, 1), k = this.rules, g = k.length, l, u, e, x; for (x = 0; x < g; x++)if (d && (l = c.type, u = c.name), e = k[x], !(a.nonEditable && !e.options.applyToAll ||
                        a.nestedEditable && e.options.excludeNestedEditable)) { e = e.value.apply(null, h); if (!1 === e || d && e && (e.name != u || e.type != l)) return e; null != e && (h[0] = c = e) } return c
                }, execOnName: function (a, c) { for (var d = 0, h = this.rules, k = h.length, g; c && d < k; d++)g = h[d], a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable || (c = c.replace(g.value[0], g.value[1])); return c }
        }
    })();
    (function () {
        function a(a, d) {
            function e(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function n(a, d) {
                return function (f) {
                    if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var n = [], q = b(f), g, A; if (q) for (w(q, 1) && n.push(q); q;)h(q) && (g = c(q)) && w(g) && ((A = c(g)) && !h(A) ? n.push(g) : (e(p).insertAfter(g), g.remove())), q = q.previous; for (q = 0; q < n.length; q++)n[q].remove(); if (n = !a || !1 !== ("function" == typeof d ? d(f) : d)) p || CKEDITOR.env.needsBrFiller ||
                            f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? p || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (n = b(f), n = !n || "form" == f.name && "input" == n.name) : n = !1 : n = !1; n && f.add(e(a))
                    }
                }
            } function w(a, b) {
                if ((!p || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(y)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
                    a.value = c[0]), !CKEDITOR.env.needsBrFiller && p && (!b || a.parent.name in g) || !p && ((c = a.previous) && "br" == c.name || !c || h(c))) ? !0 : !1
            } var q = { elements: {} }, p = "html" == d, g = CKEDITOR.tools.extend({}, D), v; for (v in g) "#" in E[v] || delete g[v]; for (v in g) q.elements[v] = n(p, a.config.fillEmptyBlocks); q.root = n(p, !1); q.elements.br = function (a) {
                return function (b) {
                    if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var d = b.attributes; if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"]; else {
                            for (d = b.next; d && f(d);)d =
                                d.next; var n = c(b); !d && h(b.parent) ? k(b.parent, e(a)) : h(d) && n && !h(n) && e(a).insertBefore(d)
                        }
                    }
                }
            }(p); return q
        } function d(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function b(a) { for (a = a.children[a.children.length - 1]; a && f(a);)a = a.previous; return a } function c(a) { for (a = a.previous; a && f(a);)a = a.previous; return a } function f(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] } function h(a) {
            return a &&
                (a.type == CKEDITOR.NODE_ELEMENT && a.name in D || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        } function k(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function g(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function l(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function u(a) {
            return a.replace(C,
                function (a, b, c) { return "\x3c" + b + c.replace(w, function (a, b) { return v.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
        } function e(a, b) { return a.replace(b, function (a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + r(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function x(a) { return a.replace(n, function (a, b) { return decodeURIComponent(b) }) } function t(a) {
            return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                function (a) { return "\x3c!--" + J + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
        } function z(a) { return CKEDITOR.tools.array.reduce(a.split(""), function (a, b) { var c = b.toLowerCase(), d = b.toUpperCase(), e = I(c); c !== d && (e += "|" + I(d)); return a + ("(" + e + ")") }, "") } function I(a) { var b; b = a.charCodeAt(0); var c = b.toString(16); b = { htmlCode: "\x26#" + b + ";?", hex: "\x26#x0*" + c + ";?", entity: { "\x3c": "\x26lt;", "\x3e": "\x26gt;", ":": "\x26colon;" }[a] }; for (var d in b) b[d] && (a += "|" + b[d]); return a } function r(a) {
            return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,
                function (a, b) { return decodeURIComponent(b) })
        } function m(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" }) } function M(a, b) {
            var c = [], d = b.config.protectedSource, e = b._.dataStore || (b._.dataStore = { id: 1 }), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g,
                function (a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" }); for (var n = 0; n < d.length; n++)a = a.replace(d[n], function (a) { a = a.replace(f, function (a, b, d) { return c[d] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" }); a = a.replace(f, function (a, b, d) { return "\x3c!--" + J + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e" }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) {
                    return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,
                        function (a, b) { e[e.id] = decodeURIComponent(b); return "{cke_protected_" + e.id++ + "}" })
                }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, d, e) { return "\x3c" + c + d + "\x3e" + m(r(e), b) + "\x3c/" + c + "\x3e" })
        } CKEDITOR.htmlDataProcessor = function (b) {
            var c, f, n = this; this.editor = b; this.dataFilter = c = new CKEDITOR.htmlParser.filter; this.htmlFilter = f = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; c.addRules(G); c.addRules(B, { applyToAll: !0 }); c.addRules(a(b, "data"),
                { applyToAll: !0 }); f.addRules(N); f.addRules(q, { applyToAll: !0 }); f.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                    a = a.data; var c = a.dataValue, f, c = c.replace(O, ""), c = M(c, b), c = e(c, S), c = u(c), c = e(c, Q), c = c.replace(H, "$1cke:$2"), c = c.replace(K, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"), c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); f = a.context || b.editable().getName(); var n; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" ==
                        f && (f = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", n = 1); f = b.document.createElement(f); f.setHtml("a" + c); c = f.getHtml().substr(1); c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); n && (c = c.replace(/^<pre>|<\/pre>$/gi, "")); c = c.replace(F, "$1$2"); c = x(c); c = r(c); f = !1 === a.fixForBody ? !1 : d(a.enterMode, b.config.autoParagraph); c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, f); f && (n = c, !n.children.length && CKEDITOR.dtd[n.name][f] && (f = new CKEDITOR.htmlParser.element(f), n.add(f))); a.dataValue = c
                }, null, null,
                    5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(n.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) { a = a.data; var b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = t(b) }, null, null, 15); b.on("toDataFormat", function (a) {
                        var c = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i,
                            "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph))
                    }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(n.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) { a.data.filter.applyTo(a.data.dataValue, !1, !0) }, null, null, 11); b.on("toDataFormat", function (a) { var c = a.data.dataValue, d = n.writer; d.reset(); c.writeChildrenHtml(d); c = d.getHtml(!0); c = r(c); c = m(c, b); a.data.dataValue = c }, null, null, 15)
        }; CKEDITOR.htmlDataProcessor.prototype =
        {
            toHtml: function (a, b, c, d) { var e = this.editor, f, n, q, w; b && "object" == typeof b ? (f = b.context, c = b.fixForBody, d = b.dontFilter, n = b.filter, q = b.enterMode, w = b.protectedWhitespaces) : f = b; f || null === f || (f = e.editable().getName()); return e.fire("toHtml", { dataValue: a, context: f, fixForBody: c, dontFilter: d, filter: n || e.filter, enterMode: q || e.enterMode, protectedWhitespaces: w }).dataValue }, toDataFormat: function (a, b) {
                var c, d, e; b && (c = b.context, d = b.filter, e = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat",
                    { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: e || this.editor.enterMode }).dataValue
            }
        }; var y = /(?:&nbsp;|\xa0)$/, J = "{cke_protected}", E = CKEDITOR.dtd, p = "caption colgroup col thead tfoot tbody".split(" "), D = CKEDITOR.tools.extend({}, E.$blockLimit, E.$block), G = { elements: { input: g, textarea: g } }, B = {
            attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: {
                iframe: function (a) {
                    if (a.attributes && a.attributes.src) {
                        var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi,
                            ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src
                    }
                }
            }
        }, N = { elements: { embed: function (a) { var b = a.parent; if (b && "object" == b.name) { var c = b.attributes.width, b = b.attributes.height; c && (a.attributes.width = c); b && (a.attributes.height = b) } }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 } } }, q = {
            elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/,
                ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                    $: function (a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], d, e = 0; e < c.length; e++)d = "data-cke-saved-" + c[e], d in b && delete b[c[e]] } return a }, table: function (a) {
                        a.children.slice(0).sort(function (a, b) {
                            var c, d; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(p, a.name), d = CKEDITOR.tools.indexOf(p, b.name)); -1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1); return c > d ?
                                1 : -1
                        })
                    }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) {
                        var b = a.children[0]; !b && k(a, b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    }, input: l, textarea: l
                }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
        }; CKEDITOR.env.ie && (q.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var C = /<(a|area|img|input|source)\b([^>]*)>/gi, w = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, v = /^(href|src|name)$/i, Q = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            S = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, n = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, O = new RegExp("(" + z("\x3ccke:encoded\x3e") + "(.*?)" + z("\x3c/cke:encoded\x3e") + ")|(" + z("\x3c") + z("/") + "?" + z("cke:encoded\x3e") + ")", "gi"), H = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi, F = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, K = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })(); "use strict";
    CKEDITOR.htmlParser.element = function (a, d) { this.name = a; this.attributes = d || {}; this.children = []; var b = a || "", c = b.match(/^cke:(.*)/); c && (b = c[1]); b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } };
    CKEDITOR.htmlParser.cssStyle = function (a) {
        var d = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, c, f) { "font-family" == c && (f = f.replace(/["']/g, "")); d[c.toLowerCase()] = f }); return {
            rules: d, populate: function (a) { var c = this.toString(); c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c) }, toString: function () {
                var a = [], c;
                for (c in d) d[c] && a.push(c, ":", d[c], ";"); return a.join("")
            }
        }
    };
    (function () {
        function a(a) { return function (b) { return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a) } } var d = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }, b = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT, add: b.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, b) {
                var d = this, k, g; b = d.getFilterContext(b); if (!d.parent) a.onRoot(b,
                    d); for (; ;) { k = d.name; if (!(g = a.onElementName(b, k))) return this.remove(), !1; d.name = g; if (!(d = a.onElement(b, d))) return this.remove(), !1; if (d !== this) return this.replaceWith(d), !1; if (d.name == k) break; if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1; if (!d.name) return this.replaceWithChildren(), !1 } k = d.attributes; var l, u; for (l in k) { for (g = k[l]; ;)if (u = a.onAttributeName(b, l)) if (u != l) delete k[l], l = u; else break; else { delete k[l]; break } u && (!1 === (g = a.onAttribute(b, d, u, g)) ? delete k[u] : k[u] = g) } d.isEmpty ||
                        this.filterChildren(a, !1, b); return !0
            }, filterChildren: b.filterChildren, writeHtml: function (a, b) { b && this.filter(b); var h = this.name, k = [], g = this.attributes, l, u; a.openTag(h, g); for (l in g) k.push([l, g[l]]); a.sortAttributes && k.sort(d); l = 0; for (u = k.length; l < u; l++)g = k[l], a.attribute(g[0], g[1]); a.openTagClose(h, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(h) }, writeChildrenHtml: b.writeChildrenHtml, replaceWithChildren: function () {
                for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this);
                this.remove()
            }, forEach: b.forEach, getFirst: function (b) { if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b && (b = a(b)); for (var d = 0, h = this.children.length; d < h; ++d)if (b(this.children[d])) return this.children[d]; return null }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var b = 0, d = a.length; b < d; ++b)a[b].parent = this }, getOuterHtml: function () {
                var a =
                    new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml()
            }, split: function (a) { for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), k = 0; k < b.length; ++k)b[k].parent = d; d.children = b; b[0] && (b[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(d, this.getIndex() + 1); return d }, find: function (a, b) {
            void 0 === b && (b = !1); var d = [], k; for (k = 0; k < this.children.length; k++) {
                var g = this.children[k]; "function" == typeof a && a(g) ? d.push(g) : "string" == typeof a && g.name === a && d.push(g);
                b && g.find && (d = d.concat(g.find(a, b)))
            } return d
            }, findOne: function (a, b) { var d = null, k = CKEDITOR.tools.array.find(this.children, function (g) { var k = "function" === typeof a ? a(g) : g.name === a; if (k || !b) return k; g.children && g.findOne && (d = g.findOne(a, !0)); return !!d }); return d || k || null }, addClass: function (a) { if (!this.hasClass(a)) { var b = this.attributes["class"] || ""; this.attributes["class"] = b + (b ? " " : "") + a } }, removeClass: function (a) {
                var b = this.attributes["class"]; b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" +
                    a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
            }, hasClass: function (a) { var b = this.attributes["class"]; return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 }, getFilterContext: function (a) {
                var b = []; a || (a = { nonEditable: !1, nestedEditable: !1 }); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0); if (b.length) {
                    a = CKEDITOR.tools.copy(a);
                    for (var d = 0; d < b.length; d += 2)a[b[d]] = b[d + 1]
                } return a
            }
        }, !0)
    })(); (function () { var a = /{([^}]+)}/g; CKEDITOR.template = function (a) { this.source = "function" === typeof a ? a : String(a) }; CKEDITOR.template.prototype.output = function (d, b) { var c = ("function" === typeof this.source ? this.source(d) : this.source).replace(a, function (a, b) { return void 0 !== d[b] ? d[b] : a }); return b ? b.push(c) : c } })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function (a) { function d() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) } CKEDITOR.instances[a.name] = a; a.on("focus", function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) }); a.on("blur", d); a.on("destroy", d); CKEDITOR.fire("instance", null, a) }; CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] };
    (function () { var a = {}; CKEDITOR.addTemplate = function (d, b) { var c = a[d]; if (c) return c; c = { name: d, source: b }; CKEDITOR.fire("template", c); return a[d] = new CKEDITOR.template(c.source) }; CKEDITOR.getTemplate = function (d) { return a[d] } })(); (function () { var a = []; CKEDITOR.addCss = function (d) { a.push(d) }; CKEDITOR.getCss = function () { return a.join("\n") } })(); CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function () {
    CKEDITOR.inline = function (a, d) {
        a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE), c = a.is("textarea") ? a : null; c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0); b.on("loaded", function () {
            b.fire("uiReady");
            b.editable(a); b.container = a; b.ui.contentsElement = a; b.setData(b.getData(1)); b.resetDirty(); b.fire("contentDom"); b.mode = "wysiwyg"; b.fire("mode"); b.status = "ready"; b.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, b)
        }, null, null, 1E4); b.on("destroy", function () { var a = b.container; c && a && (a.clearCustomData(), a.remove()); c && c.show(); b.element.clearCustomData(); delete b.element }); return b
    }; CKEDITOR.inlineAll = function () {
        var a, d, b; for (b in CKEDITOR.dtd.$editable) for (var c = CKEDITOR.document.getElementsByTag(b),
            f = 0, h = c.count(); f < h; f++)a = c.getItem(f), "true" == a.getAttribute("contenteditable") && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config))
    }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    })(); CKEDITOR.replaceClass = "ckeditor";
    (function () {
        function a(a, f, h, k) {
            a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; var g = new CKEDITOR.editor(f, a, k); k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), g._.required = a.hasAttribute("required"), a.removeAttribute("required")); h && g.setData(h, null, !0); g.on("loaded", function () {
                g.isDestroyed() || g.isDetached() || (b(g), k == CKEDITOR.ELEMENT_MODE_REPLACE && g.config.autoUpdateElement && a.$.form && g._attachToForm(), g.setMode(g.config.startupMode, function () {
                    g.resetDirty(); g.status =
                        "ready"; g.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, g)
                }))
            }); g.on("destroy", d); return g
        } function d() { var a = this.container, b = this.element; a && (a.clearCustomData(), a.remove()); b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element) } function b(a) {
            var b = a.name, d = a.element, k = a.elementMode, g = a.fire("uiSpace", { space: "top", html: "" }).html, l = a.fire("uiSpace", { space: "bottom", html: "" }).html,
            u = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
            b = CKEDITOR.dom.element.createFromHtml(u.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: g ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + g + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: l ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + l + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); k == CKEDITOR.ELEMENT_MODE_REPLACE ?
                (d.hide(), b.insertAfter(d)) : d.append(b); a.container = b; a.ui.contentsElement = a.ui.space("contents"); g && a.ui.space("top").unselectable(); l && a.ui.space("bottom").unselectable(); d = a.config.width; k = a.config.height; d && b.setStyle("width", CKEDITOR.tools.cssLength(d)); k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k)); b.disableContextMenu(); CKEDITOR.env.webkit && b.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
        } CKEDITOR.replace = function (b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
        CKEDITOR.appendTo = function (b, d, h) { return a(b, d, h, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) { var d = null, k = a[b]; if (k.name || k.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](k, d))) continue; this.replace(k, d) } } }; CKEDITOR.editor.prototype.addMode = function (a, b) {
        (this._.modes || (this._.modes =
            {}))[a] = b
        }; CKEDITOR.editor.prototype.setMode = function (a, b) {
            var d = this, k = this._.modes; if (a != d.mode && k && k[a]) {
                d.fire("beforeSetMode", a); if (d.mode) { var g = d.checkDirty(), k = d._.previousModeData, l, u = 0; d.fire("beforeModeUnload"); d.editable(0); d._.previousMode = d.mode; d._.previousModeData = l = d.getData(1); "source" == d.mode && k == l && (d.fire("lockSnapshot", { forceUpdate: !0 }), u = 1); d.ui.space("contents").setHtml(""); d.mode = "" } else d._.previousModeData = d.getData(1); this._.modes[a](function () {
                d.mode = a; void 0 !== g && !g &&
                    d.resetDirty(); u ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot"); setTimeout(function () { d.isDestroyed() || d.isDetached() || (d.fire("mode"), b && b.call(d)) }, 0)
                })
            }
        }; CKEDITOR.editor.prototype.resize = function (a, b, d, k) {
            var g = this.container, l = this.ui.space("contents"), u = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; k = k ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : g; k.setSize("width", a, !0); u && (u.style.width = "1%");
            var e = (k.$.offsetHeight || 0) - (l.$.clientHeight || 0), g = Math.max(b - (d ? 0 : e), 0); b = d ? b + e : b; l.setStyle("height", g + "px"); u && (u.style.width = "100%"); this.fire("resize", { outerHeight: b, contentsHeight: g, outerWidth: a || k.getSize("width") })
        }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    })(); CKEDITOR.config.startupMode = "wysiwyg";
    (function () {
        function a(a) {
            var b = a.editor, e = a.data.path, f = e.blockLimit, g = a.data.selection, q = g.getRanges()[0], h; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (g = d(g, e)) g.appendBogus(), h = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.edge && b._.previousActive; k(b, e.block, f) && q.collapsed && !q.getCommonAncestor().isReadOnly() && (e = q.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(e), f.guard = function (a) { return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() },
                !f.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) && (b = q.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), h = 1, a.cancel()); h && q.select()
        } function d(a, b) { if (a.isFake) return 0; var d = b.block || b.blockLimit, e = d && d.getLast(c); if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d }
        function b(a) { var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault()) } function c(a) { return x(a) && t(a) } function f(a, b) { return function (c) { var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c) } } function h(a) {
            function b(a) {
                return function (b, e) {
                e && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b); if (!(e || !c(b) ||
                    a && I(b))) return !1
                }
            } var d, e = a.getRanges()[0]; a = a.root; var f = { table: 1, ul: 1, ol: 1, dl: 1 }; if (e.startPath().contains(f)) { var q = e.clone(); q.collapse(1); q.setStartAt(a, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(q); a.guard = b(); a.checkBackward(); if (d) return q = e.clone(), q.collapse(), q.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(q), a.guard = b(!0), d = !1, a.checkForward(), d } return null
        } function k(a, b, c) {
            return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) &&
                !b || b && "true" == b.getAttribute("contenteditable"))
        } function g(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function l(a) { a && a.isEmptyInlineRemoveable() && a.remove() } function u(a) { var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") }, 0) } function e(a, b, c) { var d = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var x, t, z, I, r,
            m, M, y, J, E; CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element, $: function (a, b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                    focus: function () {
                        var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
                        try { if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) { var b = this.$.scrollTop; this.$.focus(); this.$.scrollTop = b } else this.$.focus(); else this.$.setActive() } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    }, on: function (a, b) {
                        var c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) &&
                            (a = "focus" == a ? "focusin" : "focusout", b = f(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c)
                    }, attachListener: function (a) { !this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;)a.pop().removeListener() } catch (b) { } }, restoreAttrs: function () {
                        var a = this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c,
                            b) : this.removeAttribute(c))
                    }, attachClass: function (a) { var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) }, changeAttr: function (a, b) { var c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b)) }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) {
                        var b =
                            this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b)
                    }, insertHtml: function (a, b, c) { var d = this.editor; d.focus(); d.fire("saveSnapshot"); c || (c = d.getSelection().getRanges()[0]); m(this, b || "html", a, c); c.select(); u(this); this.editor.fire("afterInsertHtml", {}) }, insertHtmlIntoRange: function (a, b, c) { m(this, c || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, b) {
                        var d =
                            this.editor; d.focus(); d.fire("saveSnapshot"); var e = d.activeEnterMode, d = d.getSelection(), f = a.getName(), f = CKEDITOR.dtd.$block[f]; b || (b = d.getRanges()[0]); this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function (a) { return c(a) && !I(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()["#"] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(f))));
                        d.selectRanges([b]); u(this)
                    }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                        var c = this.editor, d = c.config.enterMode, e = a.getName(), f = CKEDITOR.dtd.$block[e]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? M(b) : b.startContainer.is(CKEDITOR.dtd.$list) && y(b)); var g, w; if (f) for (; (g = b.getCommonAncestor(0, 1)) && (w = CKEDITOR.dtd[g.getName()]) && (!w || !w[e]);)if (g.getName() in
                            CKEDITOR.dtd.span) { var f = b.splitElement(g), h = b.createBookmark(); l(g); l(f); b.moveToBookmark(h) } else b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable()); b.insertNode(a); return !0
                    }, setData: function (a, b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady") }, getData: function (a) {
                        var b = this.getHtml();
                        a || (b = this.editor.dataProcessor.toDataFormat(b)); return b
                    }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () { this.status = "detached"; this.editor.setData(this.editor.getData(), { internal: !0 }); this.clearListeners(); try { this._.cleanCustomData() } catch (a) { if (!CKEDITOR.env.ie || -2146828218 !== a.number) throw a; } this.editor.fire("contentDomUnload"); delete this.editor.document; delete this.editor.window; delete this.editor }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) },
                    fixInitialSelection: function () {
                        function a() { var b = c.getDocument().$, d = b.getSelection(), e; a: if (d.anchorNode && d.anchorNode == c.$) e = !0; else { if (CKEDITOR.env.webkit && (e = c.getDocument().getActive()) && e.equals(c) && !d.anchorNode) { e = !0; break a } e = void 0 } e && (e = new CKEDITOR.dom.range(c), e.moveToElementEditStart(c), b = b.createRange(), b.setStart(e.startContainer.$, e.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b)) } function b() {
                            var a = c.getDocument().$, d = a.selection, e = c.getDocument().getActive(); "None" ==
                                d.type && e.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
                        } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else this.once("focus", function () { a() }, null, null, -999)
                    }, getHtmlFromRange: function (a) {
                        if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
                        a = { doc: this.getDocument(), range: a.clone() }; J.eol.detect(a, this); J.bogus.exclude(a); J.cell.shrink(a); a.fragment = a.range.cloneContents(); J.tree.rebuild(a, this); J.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$)
                    }, extractHtmlFromRange: function (a, b) {
                        var c = E, d = { range: a, doc: a.document }, e = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), e; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.table.detectPurge(d); d.bookmark = a.createBookmark(); delete d.range; var f = this.editor.createRange();
                        f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); d.targetBookmark = f.createBookmark(); c.list.detectMerge(d, this); c.table.detectRanges(d, this); c.block.detectMerge(d, this); d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d))); a.moveToBookmark(d.targetBookmark); a.optimize(); c.fixUneditableRangePosition(a); c.list.merge(d, this); c.table.purge(d, this); c.block.merge(d, this);
                        if (b) { c = a.startPath(); if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var d = c.block.getElementsByTag("span"), f = 0, g; if (d) for (; g = d.getItem(f++);)if (!t(g)) { d = !0; break a } d = !1 } d = !d } d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), z(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings(); return e
                    }, setup: function () {
                        var a = this.editor; this.attachListener(a, "beforeGetData", function () {
                            var b =
                                this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(r, function (a, b) { return b })); a.setData(b, null, 1)
                        }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a, "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() },
                            this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable"); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO ||
                                this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { a._.previousScrollTop = a.editable().$.scrollTop }, null, null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                                    var d = function () {
                                        var b = a.editable();
                                        null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
                                    }; this.on("scroll", d)
                                } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                a.document = this.getDocument(); a.window = this.getWindow(); var f = a.document; this.changeAttr("spellcheck",
                                    !a.config.disableNativeSpellChecker); var g = a.config.contentsLangDirection; this.getDirection(1) != g && this.changeAttr("dir", g); var k = CKEDITOR.getCss(); if (k) { var g = f.getHead(), q = g.getCustomData("stylesheet"); q ? k != q.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? q.$.styleSheet.cssText = k : q.setText(k)) : (k = f.appendStyleText(k), k = new CKEDITOR.dom.element(k.ownerNode || k.owningElement), g.setCustomData("stylesheet", k), k.data("cke-temp", 1)) } g = f.getCustomData("stylesheet_ref") || 0; f.setCustomData("stylesheet_ref",
                                        g + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var C = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var c = b.data.domEvent.getKey(), d; b = a.getSelection(); if (0 !== b.getRanges().length) {
                                                if (c in C) {
                                                    var e, f = b.getRanges()[0], q = f.startPath(), g, k, l, c = 8 == c; CKEDITOR.env.ie &&
                                                        11 > CKEDITOR.env.version && (e = b.getSelectedElement()) || (e = h(b)) ? (a.fire("saveSnapshot"), f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), f.select(), a.fire("saveSnapshot"), d = 1) : f.collapsed && ((g = q.block) && (l = g[c ? "getPrevious" : "getNext"](x)) && l.type == CKEDITOR.NODE_ELEMENT && l.is("table") && f[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), f[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && g.remove(), f["moveToElementEdit" + (c ? "End" : "Start")](l), f.select(), a.fire("saveSnapshot"),
                                                            d = 1) : q.blockLimit && q.blockLimit.is("td") && (k = q.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (l = k[c ? "getPrevious" : "getNext"](x)) ? (a.fire("saveSnapshot"), f["moveToElementEdit" + (c ? "End" : "Start")](l), f.checkStartOfBlock() && f.checkEndOfBlock() ? l.remove() : f.select(), a.fire("saveSnapshot"), d = 1) : (k = q.contains(["td", "th", "caption"])) && f.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
                                                } return !d
                                            }
                                        }); a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller &&
                                            this.attachListener(this, "keyup", function (b) { b.data.getKeystroke() in C && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) }); CKEDITOR.env.ie && this.attachListener(this, "click", b); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) {
                                                var c = b.data.getTarget(); c.is("img", "hr",
                                                    "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
                                            }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && !b.isReadOnly() && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                                                if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getAscendant("table") && !b.getOuterHtml().replace(r, ""))) {
                                                    var c = a.createRange(); c.moveToElementEditStart(b);
                                                    c.select(!0)
                                                }
                                            }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                                if (a.readOnly) return !0; var c = b.data.domEvent.getKey(); if (c in C && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                    var c = 8 == c, d = b.getRanges()[0]; b = d.startPath(); if (d.collapsed) a: {
                                                        var f =
                                                            b.block; if (f && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(f, !c) && d.collapsed) {
                                                                if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) { var n = d.startContainer.getChild(d.startOffset - (c ? 1 : 0)); if (n && n.type == CKEDITOR.NODE_ELEMENT && n.is("hr")) { a.fire("saveSnapshot"); n.remove(); b = !0; break a } } d = d.startPath().block; if (!d || d && d.contains(f)) b = void 0; else {
                                                                    a.fire("saveSnapshot"); var q; (q = (c ? d : f).getBogus()) && q.remove(); q = a.getSelection(); n = q.createBookmarks(); (c ? f : d).moveChildren(c ?
                                                                        d : f, !1); b.lastElement.mergeSiblings(); e(f, d, !c); q.selectBookmarks(n); b = !0
                                                                }
                                                            } else b = !1
                                                    } else c = d, q = b.block, d = c.endPath().block, q && d && !q.equals(d) ? (a.fire("saveSnapshot"), (f = q.getBogus()) && f.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(q, !1), b.lastElement.mergeSiblings(), e(q, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView();
                                                    a.fire("saveSnapshot"); return !1
                                                }
                                            }, this, null, 100)
                                }
                    }, getUniqueId: function () { var a; try { this._.expandoNumber = a = CKEDITOR.dom.domObject.prototype.getUniqueId.call(this) } catch (b) { a = this._ && this._.expandoNumber } return a }
                }, _: {
                    cleanCustomData: function () {
                        this.removeClass("cke_editable"); this.restoreAttrs(); for (var a = this.removeCustomData("classes"); a && a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) {
                            var a = this.getDocument(), b = a.getHead(); if (b.getCustomData("stylesheet")) {
                                var c = a.getCustomData("stylesheet_ref");
                                --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
                            }
                        }
                    }
                }
            }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; if (!arguments.length) return b; a ? b = a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), b = null); return this._.editable = b }; CKEDITOR.on("instanceLoaded", function (b) {
                var c = b.editor; c.on("insertElement", function (a) {
                    a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") ||
                        a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
                }); c.on("selectionChange", function (b) { if (!c.readOnly) { var d = c.getSelection(); d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty()) } })
            }); CKEDITOR.on("instanceCreated", function (a) {
                var b = a.editor; b.on("mode", function () {
                    var a = b.editable(); if (a && a.isInline()) {
                        var c = b.title; a.changeAttr("role",
                            "textbox"); a.changeAttr("aria-multiline", "true"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var d = b.fire("ariaEditorHelpLabel", {}).label; if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) { var e = CKEDITOR.tools.getNextId(), d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e"); c.append(d); a.changeAttr("aria-describedby", e) }
                    }
                })
            }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        x = CKEDITOR.dom.walker.whitespaces(!0); t = CKEDITOR.dom.walker.bookmark(!1, !0); z = CKEDITOR.dom.walker.empty(); I = CKEDITOR.dom.walker.bogus(); r = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; m = function () {
            function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function b(c, d) {
                var e, f, q, g, h = [], k = d.range.startContainer; e = d.range.startPath(); for (var k = w[k.getName()], C = 0, v = c.getChildren(), l = v.count(), m = -1, u = -1, Q = 0, B = e.contains(w.$list); C <
                    l; ++C)e = v.getItem(C), a(e) ? (q = e.getName(), B && q in CKEDITOR.dtd.$list ? h = h.concat(b(e, d)) : (g = !!k[q], "br" != q || !e.data("cke-eol") || C && C != l - 1 || (Q = (f = C ? h[C - 1].node : v.getItem(C + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && w.$block[f.getName()]), -1 != m || g || (m = C), g || (u = C), h.push({ isElement: 1, isLineBreak: Q, isBlock: e.isBlockBoundary(), hasBlockSibling: f, node: e, name: q, allowed: g }), f = Q = 0)) : h.push({ isElement: 0, node: e, allowed: 1 }); -1 < m && (h[m].firstNotAllowed = 1); -1 < u && (h[u].lastNotAllowed = 1); return h
            } function d(b, c) {
                var e = [],
                f = b.getChildren(), q = f.count(), g, h = 0, k = w[c], C = !b.is(w.$inline) || b.is("br"); for (C && e.push(" "); h < q; h++)g = f.getItem(h), a(g) && !g.is(k) ? e = e.concat(d(g, c)) : e.push(g); C && e.push(" "); return e
            } function e(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function f(b) { return b && a(b) && (b.is(w.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) } function q(b, c, d, e) {
                var f = b.clone(), g, h; f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (g = (new CKEDITOR.dom.walker(f)).next()) && a(g) && v[g.getName()] &&
                    (h = g.getPrevious()) && a(h) && !h.getParent().equals(b.startContainer) && d.contains(h) && e.contains(g) && g.isIdentical(h) && (g.moveChildren(h), g.remove(), q(b, c, d, e))
            } function h(b, c) { function d(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var e = c.endContainer.getChild(c.endOffset), f = c.endContainer.getChild(c.endOffset - 1); e && d(e, b[b.length - 1]); f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) } var w = CKEDITOR.dtd, v = {
                p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1,
                h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1
            }, m = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, u = CKEDITOR.tools.extend({}, w.$inline); delete u.br; return function (n, v, H, F) {
                var K = n.editor, A = !1; "unfiltered_html" == v && (v = "html", A = !0); if (!F.checkReadOnly()) {
                    var t = (new CKEDITOR.dom.elementPath(F.startContainer, F.root)).blockLimit || F.root; v = { type: v, dontFilter: A, editable: n, editor: K, range: F, blockLimit: t, mergeCandidates: [], zombies: [] }; var A = v.range, t = v.mergeCandidates, L = "html" === v.type, r, x, z, y, I, U; "text" == v.type &&
                        A.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (x = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", A.document), A.insertNode(x), A.setStartAfter(x)); z = new CKEDITOR.dom.elementPath(A.startContainer); v.endPath = y = new CKEDITOR.dom.elementPath(A.endContainer); if (!A.collapsed) { r = y.block || y.blockLimit; var aa = A.getCommonAncestor(); r && !r.equals(aa) && !r.contains(aa) && A.checkEndOfBlock() && v.zombies.push(r); A.deleteContents() } for (; (I = e(A)) && a(I) && I.isBlockBoundary() && z.contains(I);)A.moveToPosition(I,
                            CKEDITOR.POSITION_BEFORE_END); q(A, v.blockLimit, z, y); x && (A.setEndBefore(x), A.collapse(), x.remove()); x = A.startPath(); if (r = x.contains(f, !1, 1)) U = A.splitElement(r), v.inlineStylesRoot = r, v.inlineStylesPeak = x.lastElement; x = A.createBookmark(); L && (l(r), l(U)); (r = x.startNode.getPrevious(c)) && a(r) && f(r) && t.push(r); (r = x.startNode.getNext(c)) && a(r) && f(r) && t.push(r); for (r = x.startNode; (r = r.getParent()) && f(r);)t.push(r); A.moveToBookmark(x); K.enterMode === CKEDITOR.ENTER_DIV && "" === K.getData(!0) && ((K = n.getFirst()) && K.remove(),
                                F.setStartAt(n, CKEDITOR.POSITION_AFTER_START), F.collapse(!0)); if (n = H) {
                                    n = v.range; if ("text" == v.type && v.inlineStylesRoot) { F = v.inlineStylesPeak; K = F.getDocument().createText("{cke-peak}"); for (U = v.inlineStylesRoot.getParent(); !F.equals(U);)K = K.appendTo(F.clone()), F = F.getParent(); H = K.getOuterHtml().split("{cke-peak}").join(H) } F = v.blockLimit.getName(); if (/^\s+|\s+$/.test(H) && "span" in CKEDITOR.dtd[F]) { var J = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; H = J + H + J } H = v.editor.dataProcessor.toHtml(H,
                                        { context: null, fixForBody: !1, protectedWhitespaces: !!J, dontFilter: v.dontFilter, filter: v.editor.activeFilter, enterMode: v.editor.activeEnterMode }); F = n.document.createElement("body"); F.setHtml(H); J && (F.getFirst().remove(), F.getLast().remove()); if ((J = n.startPath().block) && (1 != J.getChildCount() || !J.getBogus())) a: {
                                            var P; if (1 == F.getChildCount() && a(P = F.getFirst()) && P.is(m) && !P.hasAttribute("contenteditable")) {
                                                J = P.getElementsByTag("*"); n = 0; for (U = J.count(); n < U; n++)if (K = J.getItem(n), !K.is(u)) break a; P.moveChildren(P.getParent(1));
                                                P.remove()
                                            }
                                        } v.dataWrapper = F; n = H
                                } if (n) {
                                    P = v.range; n = P.document; F = v.blockLimit; U = 0; var R, J = [], E, M; H = x = 0; var Y, K = P.startContainer; I = v.endPath.elements[0]; var Z, A = I.getPosition(K), t = !!I.getCommonAncestor(K) && A != CKEDITOR.POSITION_IDENTICAL && !(A & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED), K = b(v.dataWrapper, v); for (h(K, P); U < K.length; U++) {
                                        A = K[U]; if (L = A.isLineBreak) L = P, r = F, y = z = void 0, A.hasBlockSibling ? L = 1 : (z = L.startContainer.getAscendant(w.$block, 1)) && z.is({ div: 1, p: 1 }) ? (y = z.getPosition(r), y ==
                                            CKEDITOR.POSITION_IDENTICAL || y == CKEDITOR.POSITION_CONTAINS ? L = 0 : (r = L.splitElement(z), L.moveToPosition(r, CKEDITOR.POSITION_AFTER_START), L = 1)) : L = 0; if (L) H = 0 < U; else {
                                                L = P.startPath(); !A.isBlock && k(v.editor, L.block, L.blockLimit) && (M = g(v.editor)) && (M = n.createElement(M), M.appendBogus(), P.insertNode(M), CKEDITOR.env.needsBrFiller && (R = M.getBogus()) && R.remove(), P.moveToPosition(M, CKEDITOR.POSITION_BEFORE_END)); if ((L = P.startPath().block) && !L.equals(E)) { if (R = L.getBogus()) R.remove(), J.push(L); E = L } A.firstNotAllowed &&
                                                    (x = 1); if (x && A.isElement) { L = P.startContainer; for (r = null; L && !w[L.getName()][A.name];) { if (L.equals(F)) { L = null; break } r = L; L = L.getParent() } if (L) r && (Y = P.splitElement(r), v.zombies.push(Y), v.zombies.push(r)); else { r = F.getName(); Z = !U; L = U == K.length - 1; r = d(A.node, r); z = []; y = r.length; for (var aa = 0, ca = void 0, W = 0, V = -1; aa < y; aa++)ca = r[aa], " " == ca ? (W || Z && !aa || (z.push(new CKEDITOR.dom.text(" ")), V = z.length), W = 1) : (z.push(ca), W = 0); L && V == z.length && z.pop(); Z = z } } if (Z) { for (; L = Z.pop();)P.insertNode(L); Z = 0 } else P.insertNode(A.node);
                                                A.lastNotAllowed && U < K.length - 1 && ((Y = t ? I : Y) && P.setEndAt(Y, CKEDITOR.POSITION_AFTER_START), x = 0); P.collapse()
                                            }
                                    } 1 != K.length ? R = !1 : (R = K[0], R = R.isElement && "false" == R.node.getAttribute("contenteditable")); R && (H = !0, L = K[0].node, P.setStartAt(L, CKEDITOR.POSITION_BEFORE_START), P.setEndAt(L, CKEDITOR.POSITION_AFTER_END)); v.dontMoveCaret = H; v.bogusNeededBlocks = J
                                } R = v.range; var X; Y = v.bogusNeededBlocks; for (Z = R.createBookmark(); E = v.zombies.pop();)E.getParent() && (M = R.clone(), M.moveToElementEditStart(E), M.removeEmptyBlocksAtEnd());
                    if (Y) for (; E = Y.pop();)CKEDITOR.env.needsBrFiller ? E.appendBogus() : E.append(R.document.createText(" ")); for (; E = v.mergeCandidates.pop();)E.mergeSiblings(); R.moveToBookmark(Z); if (!v.dontMoveCaret) { for (E = e(R); E && a(E) && !E.is(w.$empty);) { if (E.isBlockBoundary()) R.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END); else { if (f(E) && E.getHtml().match(/(\s|&nbsp;)$/g)) { X = null; break } X = R.clone(); X.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END) } E = E.getLast(c) } X && R.moveToRange(X) }
                }
            }
        }(); M = function () {
            function a(b) {
                b = new CKEDITOR.dom.walker(b);
                b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b
            } function b(a, c, d) { c = a.getDocument().createElement(c); a.append(c, d); return c } function c(a) { var b = a.count(), d; for (b; 0 < b--;)d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove()) } return function (d) {
                var e = d.startContainer, f = e.getAscendant("table",
                    1), g = !1; c(f.getElementsByTag("td")); c(f.getElementsByTag("th")); f = d.clone(); f.setStart(e, 0); f = a(f).lastBackward(); f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), g = !0); f || (f = e); f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", g)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", g)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }();
        y = function () {
            function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem) }; return b } return function (b) {
                var c = b.startContainer, d = !1, e; e = b.clone(); e.setStart(c, 0); e = a(e).lastBackward(); e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0); e || (e = c); e.is(CKEDITOR.dtd.$list) ?
                    (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
            }
        }(); J = {
            eol: {
                detect: function (a, b) {
                    var c = a.range, d = c.clone(), e = c.clone(), f = new CKEDITOR.dom.elementPath(c.startContainer, b), g = new CKEDITOR.dom.elementPath(c.endContainer, b); d.collapse(1); e.collapse(); f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1); g.block &&
                        e.checkBoundaryOfElement(g.block, CKEDITOR.START) && (c.setEndBefore(g.block), a.appendEolBr = 1)
                }, fix: function (a, b) { var c = b.getDocument(), d; a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d)); !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c), 1) }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
            }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !I(b) || c && c.equals(b) || a.range.setEndBefore(b) } },
            tree: {
                rebuild: function (a, b) {
                    var c = a.range, d = c.getCommonAncestor(), e = new CKEDITOR.dom.elementPath(d, b), f = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), g; d.type == CKEDITOR.NODE_TEXT && (d = d.getParent()); if (e.blockLimit.is({ tr: 1, table: 1 })) { var h = e.contains("table").getParent(); g = function (a) { return !a.equals(h) } } else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) {
                        var k = e.contains(CKEDITOR.dtd.$list).getParent();
                        g = function (a) { return !a.equals(k) }
                    } g || (g = function (a) { return !a.equals(e.block) && !a.equals(e.blockLimit) }); this.rebuildFragment(a, b, d, g)
                }, rebuildFragment: function (a, b, c, d) { for (var e; c && !c.equals(b) && d(c);)e = c.clone(0, 1), a.fragment.appendTo(e), a.fragment = e, c = c.getParent() }
            }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, c = a.endContainer, d = a.startOffset, e = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT) } }
        }; E = function () {
            function a(b, c) {
                var d =
                    b.getParent(); if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d)
            } function b(c, d, e) { a(d); a(e, 1); for (var f; f = e.getNext();)f.insertAfter(d), d = f; z(c) && c.remove() } function c(a, b) { var d = new CKEDITOR.dom.range(a); d.setStartAfter(b.startNode); d.setEndBefore(b.endNode); return d } return {
                list: {
                    detectMerge: function (a, b) {
                        var d = c(b, a.bookmark), e = d.startPath(), f = d.endPath(), g = e.contains(CKEDITOR.dtd.$list), h = f.contains(CKEDITOR.dtd.$list); a.mergeList = g && h && g.getParent().equals(h.getParent()) && !g.equals(h);
                        a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
                    }, merge: function (a, c) {
                        if (a.mergeListBookmark) {
                            var d = a.mergeListBookmark.startNode, e = a.mergeListBookmark.endNode, f = new CKEDITOR.dom.elementPath(d, c), g = new CKEDITOR.dom.elementPath(e, c); if (a.mergeList) {
                                var h = f.contains(CKEDITOR.dtd.$list), k =
                                    g.contains(CKEDITOR.dtd.$list); h.equals(k) || (k.moveChildren(h), k.remove())
                            } a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), g = g.contains(CKEDITOR.dtd.$listItem), f.equals(g) || b(g, d, e)); d.remove(); e.remove()
                        }
                    }
                }, block: {
                    detectMerge: function (a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } }, merge: function (a, c) {
                        if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                            var d =
                                a.mergeBlockBookmark.startNode, e = a.mergeBlockBookmark.endNode, f = new CKEDITOR.dom.elementPath(d, c), g = new CKEDITOR.dom.elementPath(e, c), f = f.block, g = g.block; f && g && !f.equals(g) && b(g, d, e); d.remove(); e.remove()
                        }
                    }
                }, table: function () {
                    function a(c) {
                        var e = [], f, g = new CKEDITOR.dom.walker(c), h = c.startPath().contains(d), n = c.endPath().contains(d), k = {}; g.guard = function (a, g) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) { var l = "visited_" + (g ? "out" : "in"); if (a.getCustomData(l)) return; CKEDITOR.dom.element.setMarker(k, a, l, 1) } if (g &&
                                h && a.equals(h)) f = c.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), e.push(f); else if (!g && n && a.equals(n)) f = c.clone(), f.setStartAt(n, CKEDITOR.POSITION_AFTER_START), e.push(f); else { if (l = !g) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!n || b(a, n)); if (!l && (l = g)) if (a.is(d)) var l = h && h.getAscendant("table", !0), m = n && n.getAscendant("table", !0), p = a.getAscendant("table", !0), l = l && l.contains(p) || m && m.contains(p); else l = void 0; l && (f = c.clone(), f.selectNodeContents(a), e.push(f)) }
                        }; g.lastForward(); CKEDITOR.dom.element.clearAllMarkers(k);
                        return e
                    } function b(a, c) { var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, e = a.getPosition(c); return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d) } var d = { td: 1, th: 1, caption: 1 }; return {
                        detectPurge: function (a) {
                            var b = a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), e = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e }; c.checkForward(); if (1 < e) {
                                var c = b.startPath().contains("table"), f = b.endPath().contains("table"); c && f && b.checkBoundaryOfElement(c,
                                    CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark())
                            }
                        }, detectRanges: function (e, f) {
                            var g = c(f, e.bookmark), h = g.clone(), k, n, l = g.getCommonAncestor(); l.is(CKEDITOR.dtd.$tableContent) && !l.is(d) && (l = l.getAscendant("table", !0)); n = l; l = new CKEDITOR.dom.elementPath(g.startContainer, n); n = new CKEDITOR.dom.elementPath(g.endContainer, n); l = l.contains("table"); n = n.contains("table"); if (l || n) l && n && b(l, n) ? (e.tableSurroundingRange =
                                h, h.setStartAt(l, CKEDITOR.POSITION_AFTER_END), h.setEndAt(n, CKEDITOR.POSITION_BEFORE_START), h = g.clone(), h.setEndAt(l, CKEDITOR.POSITION_AFTER_END), k = g.clone(), k.setStartAt(n, CKEDITOR.POSITION_BEFORE_START), k = a(h).concat(a(k))) : l ? n || (e.tableSurroundingRange = h, h.setStartAt(l, CKEDITOR.POSITION_AFTER_END), g.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange = h, h.setEndAt(n, CKEDITOR.POSITION_BEFORE_START), g.setStartAt(n, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = k ? k : a(g)
                        }, deleteRanges: function (a) {
                            for (var b; b =
                                a.tableContentsRanges.pop();)b.extractContents(), z(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                        }, purge: function (a) { if (a.purgeTableBookmark) { var b = a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark); c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START) } }
                    }
                }(), detectExtractMerge: function (a) {
                    return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) &&
                        a.range.endPath().contains(CKEDITOR.dtd.$listItem))
                }, fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) { var c = b.startPath(), d; k(a, c.block, c.blockLimit) && (d = g(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START)) }
            }
        }()
    })();
    (function () {
        function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function d(b, c) {
            if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var d, e; if ((d = !c && 1 === b.length) && !(d = b[0].collapsed)) { var f = b[0]; d = f.startContainer.getAscendant({ td: 1, th: 1 }, !0); var g = f.endContainer.getAscendant({ td: 1, th: 1 }, !0); e = CKEDITOR.tools.trim; d && d.equals(g) && !d.findOne("td, th, tr, tbody, table") ? (f = f.cloneContents(), d = f.getFirst() ? e(f.getFirst().getText()) !== e(d.getText()) : !0) : d = !1 } if (d) return !1;
            for (e = 0; e < b.length; e++)if (d = b[e]._getTableElement(), !d) return !1; return !0
        } function b(a) { function b(a) { a = a.find("td, th"); var c = [], d; for (d = 0; d < a.count(); d++)c.push(a.getItem(d)); return c } var c = [], d, e; for (e = 0; e < a.length; e++)d = a[e]._getTableElement(), d.is && d.is({ td: 1, th: 1 }) ? c.push(d) : c = c.concat(b(d)); return c } function c(a) {
            a = b(a); var c = "", d = [], e, f; for (f = 0; f < a.length; f++)e && !e.equals(a[f].getAscendant("tr")) ? (c += d.join("\t") + "\n", e = a[f].getAscendant("tr"), d = []) : 0 === f && (e = a[f].getAscendant("tr")), d.push(a[f].getText());
            return c += d.join("\t")
        } function f(a) { var b = this.root.editor, d = b.getSelection(1); this.reset(); E = !0; d.root.once("selectionchange", function (a) { a.cancel() }, null, null, 0); d.selectRanges([a[0]]); d = this._.cache; d.ranges = new CKEDITOR.dom.rangeList(a); d.type = CKEDITOR.SELECTION_TEXT; d.selectedElement = a[0]._getTableElement(); d.selectedText = c(a); d.nativeSel = null; this.isFake = 1; this.rev = M++; b._.fakeSelection = this; E = !1; this.root.fire("selectionchange") } function h() {
            var b = this._.fakeSelection, c; if (b) {
                c = this.getSelection(1);
                var e; if (!(e = !c) && (e = !c.isHidden())) {
                    e = b; var f = c.getRanges(), g = e.getRanges(), h = f.length && f[0]._getTableElement() && f[0]._getTableElement().getAscendant("table", !0), n = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0), k = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table"), H = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"); if (a(e.getSelectedElement())) e = !1; else {
                        var l = 1 === f.length && f[0].collapsed, g = d(f, !!CKEDITOR.env.webkit) &&
                            d(g); h = h && n ? h.equals(n) || n.contains(h) : !1; h && (l || g) ? (k && !H && e.selectRanges(f), e = !0) : e = !1
                    } e = !e
                } e && (b.reset(), b = 0)
            } if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", b); c = this.elementPath(); c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || e || (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath =
                c, this.fire("selectionChange", { selection: b, path: c }))
        } function k() { D = !0; p || (g.call(this), p = CKEDITOR.tools.setTimeout(g, 200, this)) } function g() { p = null; D && (CKEDITOR.tools.setTimeout(h, 0, this), D = !1) } function l(a) { return G(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function u(a) {
            function b(c, d) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, d = a.getPreviousNode(l,
                null, c), e = a.getNextNode(l, null, c); return b(d) || b(e, 1) || !(d || e || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
        } function e(a) { x(a, !1); var b = a.getDocument().createText(y); a.setCustomData("cke-fillingChar", b); return b } function x(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                if (!1 !== b) {
                    var d = a.getDocument().getSelection().getNative(), e = d && "None" != d.type && d.getRangeAt(0), f = y.length; if (c.getLength() > f && e && e.intersectsNode(c.$)) {
                        var g = [{ node: d.anchorNode, offset: d.anchorOffset },
                        { node: d.focusNode, offset: d.focusOffset }]; d.anchorNode == c.$ && d.anchorOffset > f && (g[0].offset -= f); d.focusNode == c.$ && d.focusOffset > f && (g[1].offset -= f)
                    }
                } c.setText(t(c.getText(), 1)); g && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(g[0].node, g[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(g[1].node, g[1].offset))
            }
        } function t(a, b) { return b ? a.replace(J, function (a, b) { return b ? " " : "" }) : a.replace(y, "") } function z(a, b) {
            var c = b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;",
            c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") + '"\x3e' + c + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var d = a.getSelection(1), e = a.createRange(), f = d.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); e.setStartAt(c, CKEDITOR.POSITION_AFTER_START); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
            d.selectRanges([e]); f.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
        } function I(a) { var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) { var d = c.data.getKeystroke(); if (b[d]) { var e = a.getSelection().getRanges(), f = e[0]; 1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel()) } } } function r(a) {
            for (var b = 0; b < a.length; b++) {
                var c =
                    a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                        if (c.startContainer.isReadOnly()) for (var d = c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());)e && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent(); d = c.startContainer; e = c.endContainer; var f = c.startOffset, g = c.endOffset, h = c.clone(); d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d)); e && e.type == CKEDITOR.NODE_TEXT && (g ? h.setEndAfter(e) :
                            h.setEndBefore(e)); d = new CKEDITOR.dom.walker(h); d.evaluator = function (d) { if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) { var e = c.clone(); c.setEndBefore(d); c.collapsed && a.splice(b--, 1); d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e)); return !0 } return !1 }; d.next()
                    }
            } return a
        } var m = "function" != typeof window.getSelection, M = 1, y = CKEDITOR.tools.repeat("​", 7), J = new RegExp(y + "( )?", "g"), E, p, D, G = CKEDITOR.dom.walker.invisible(1), B = function () {
            function a(b) {
                return function (a) {
                    var c =
                        a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]); return !1
                }
            } function b(a) {
                return function (b) {
                    var c = b.editor, d = c.createRange(), e; if (!c.readOnly) return (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a)), e && c.getSelection().selectRanges([d]), c.fire("saveSnapshot"), b.selected.remove(), e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d])), c.fire("saveSnapshot"),
                        !1
                }
            } var c = a(), d = a(1); return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
        }(); CKEDITOR.on("instanceCreated", function (a) {
            function b() { var a = c.getSelection(); a && a.removeAllRanges() } var c = a.editor; c.on("contentDom", function () {
                function a() { p = new CKEDITOR.dom.selection(c.getSelection()); p.lock() } function b() { f.removeListener("mouseup", b); l.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() && c.parentElement().ownerDocument == e.$ && c.select() } function d(a) {
                    a =
                    a.getRanges()[0]; return a ? (a = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") }, !0)) && "false" === a.getAttribute("contenteditable") ? a : null : null
                } var e = c.document, f = CKEDITOR.document, g = c.editable(), q = e.getBody(), l = e.getDocumentElement(), A = g.isInline(), C, p; CKEDITOR.env.gecko && g.attachListener(g, "focus", function (a) {
                    a.removeListener(); 0 !== C && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = c.createRange(), a.moveToElementEditStart(g),
                        a.select())
                }, null, null, -2); g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { if (C && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { C = c._.previousActive && c._.previousActive.equals(e.getActive()); var a = null != c._.previousScrollTop && c._.previousScrollTop != g.$.scrollTop; CKEDITOR.env.webkit && C && a && (g.$.scrollTop = c._.previousScrollTop) } c.unlockSelection(C); C = 0 }, null, null, -1); g.attachListener(g, "mousedown", function () { C = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.gecko || A) m ? g.attachListener(g,
                    "beforedeactivate", a, null, null, -1) : g.attachListener(c, "selectionCheck", a, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusout" : "blur", function () { var a = p && (p.isFake || 2 > p.getRanges().length); CKEDITOR.env.gecko && !A && a || (c.lockSelection(p), C = 1) }, null, null, -1), g.attachListener(g, "mousedown", function () { C = 0 }); if (CKEDITOR.env.ie && !A) {
                        var u; g.attachListener(g, "mousedown", function (a) { 2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (u = c.window.getScrollPosition())) });
                        g.attachListener(g, "mouseup", function (a) { 2 == a.data.$.button && u && (c.document.$.documentElement.scrollLeft = u.x, c.document.$.documentElement.scrollTop = u.y); u = null }); if ("BackCompat" != e.$.compatMode) {
                            if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                                var r, t; l.on("mousedown", function (a) {
                                    function b(a) { a = a.data.$; if (r) { var c = q.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (d) { } r.setEndPoint(0 > t.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); r.select() } } function c() {
                                        l.removeListener("mousemove",
                                            b); f.removeListener("mouseup", c); l.removeListener("mouseup", c); r.select()
                                    } a = a.data; if (a.getTarget().is("html") && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) { r = q.$.createTextRange(); try { r.moveToPoint(a.$.clientX, a.$.clientY) } catch (d) { } t = r.duplicate(); l.on("mousemove", b); f.on("mouseup", c); l.on("mouseup", c) }
                                })
                            } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) l.on("mousedown", function (a) { a.data.getTarget().is("html") && (f.on("mouseup", b), l.on("mouseup", b)) })
                        }
                    } g.attachListener(g, "selectionchange", h,
                        c); g.attachListener(g, "keyup", k, c); g.attachListener(g, "touchstart", k, c); g.attachListener(g, "touchend", k, c); CKEDITOR.env.ie && g.attachListener(g, "keydown", function (a) { var b = this.getSelection(1), c = d(b); c && !c.equals(g) && (b.selectElement(c), a.data.preventDefault()) }, c); g.attachListener(g, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (A && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                            var z; g.attachListener(g, "mousedown", function () {
                                z =
                                1
                            }); g.attachListener(e.getDocumentElement(), "mouseup", function () { z && k.call(c); z = 0 })
                        } else g.attachListener(CKEDITOR.env.ie ? g : e.getDocumentElement(), "mouseup", k, c); CKEDITOR.env.webkit && g.attachListener(e, "keydown", function (a) { switch (a.data.getKey()) { case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: g.hasFocus && x(g) } }, null, null, -1); g.attachListener(g, "keydown", I(c), null, null, -1)
            }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload",
                function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () { var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove()) }, null, null,
                    100); c.on("key", function (a) { if ("wysiwyg" == c.mode) { var b = c.getSelection(); if (b.isFake) { var d = B[a.data.keyCode]; if (d) return d({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
        }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor; b.on("selectionChange", function () { var a = b.editable(), c = a.getCustomData("cke-fillingChar"); c && (c.getCustomData("ready") ? (x(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1)) }, null, null, -1); b.on("beforeSetMode", function () { x(b.editable()) },
                null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = t(a.data)) }, b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = t(a.data.dataValue) }, null, null, 0)
        }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? h : k).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) { return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection }; CKEDITOR.editor.prototype.lockSelection =
            function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select =
                function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
                    if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : M++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = c ? a : this.document.getBody(); this.isLocked =
                        0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var d, e; if (a) if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer); else { try { e = a.createRange() } catch (f) { } d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) } if (!d || d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE,
                            this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
                }; var N = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: t, _createFillingCharSequenceNode: e, FILLING_CHAR_SEQUENCE: y }); CKEDITOR.dom.selection.prototype = {
                    getNative: function () {
                        return void 0 !==
                            this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = m ? this.document.$.selection : this.document.getWindow().$.getSelection()
                    }, getType: m ? function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try { var c = this.getNative(), d = c.type; "Text" == d && (b = CKEDITOR.SELECTION_TEXT); "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT) } catch (e) { } return a.type = b } : function () {
                        var a = this._.cache; if (a.type) return a.type; var b =
                            CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) { var c = c.getRangeAt(0), d = c.startContainer; d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && N[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b
                    }, getRanges: function () {
                        var a = m ? function () {
                            function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                                b = b.duplicate(); b.collapse(c); var d = b.parentElement(); if (!d.hasChildNodes()) return {
                                    container: d,
                                    offset: 0
                                }; for (var e = d.children, f, g, h = b.duplicate(), k = 0, l = e.length - 1, q = -1, m, p; k <= l;)if (q = Math.floor((k + l) / 2), f = e[q], h.moveToElementText(f), m = h.compareEndPoints("StartToStart", b), 0 < m) l = q - 1; else if (0 > m) k = q + 1; else return { container: d, offset: a(f) }; if (-1 == q || q == e.length - 1 && 0 > m) {
                                    h.moveToElementText(d); h.setEndPoint("StartToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; e = d.childNodes; if (!h) return f = e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: f, offset: f.nodeValue.length };
                                    for (d = e.length; 0 < h && 0 < d;)g = e[--d], g.nodeType == CKEDITOR.NODE_TEXT && (p = g, h -= g.nodeValue.length); return { container: p, offset: -h }
                                } h.collapse(0 < m ? !0 : !1); h.setEndPoint(0 < m ? "StartToStart" : "EndToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; if (!h) return { container: d, offset: a(f) + (0 < m ? 0 : 1) }; for (; 0 < h;)try { g = f[0 < m ? "previousSibling" : "nextSibling"], g.nodeType == CKEDITOR.NODE_TEXT && (h -= g.nodeValue.length, p = g), f = g } catch (u) { return { container: d, offset: a(f) } } return { container: p, offset: 0 < m ? -h : p.nodeValue.length + h }
                            };
                            return function () {
                                var a = this.getNative(), c = a && a.createRange(), d = this.getType(); if (!a) return []; if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a]; if (d == CKEDITOR.SELECTION_ELEMENT) {
                                    for (var d = [], e = 0; e < c.length; e++) {
                                        for (var f =
                                            c.item(e), g = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < g.childNodes.length && g.childNodes[h] != f; h++); a.setStart(new CKEDITOR.dom.node(g), h); a.setEnd(new CKEDITOR.dom.node(g), h + 1); d.push(a)
                                    } return d
                                } return []
                            }
                        }() : function () { var a = [], b, c = this.getNative(); if (!c) return a; for (var d = 0; d < c.rangeCount; d++) { var e = c.getRangeAt(d); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset); b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset); a.push(b) } return a };
                        return function (b) { var c = this._.cache, d = c.ranges; d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this))); return b ? r(new CKEDITOR.dom.rangeList(d.slice())) : d }
                    }(), getStartElement: function () {
                        var a = this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                            case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                                if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                    for (c.optimize(); b =
                                        c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                                } b = b.$
                            }
                        }return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                    }, getSelectedElement: function () {
                        var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement;
                        var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && N[c.getName()] && (d = c)); e--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return d && d.$ }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                    }, getSelectedText: function () {
                        var a = this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = m ? "Control" == b.type ? "" : b.createRange().text :
                            b.toString(); return a.selectedText = b
                    }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                        if (this.isLocked) {
                            if (a) var b = this.getSelectedElement(), c = this.getRanges(), e = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (this.root.editor.plugins.tableselection && d(c) ? f.call(this, c) : e ? this.fake(b) : b && 2 > c.length ? this.selectElement(b) :
                                this.selectRanges(c))
                        }
                    }, reset: function () { this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { var c = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset"); this.rev = M++ }, selectElement: function (a) {
                        var b = new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a);
                        this.selectRanges([b])
                    }, selectRanges: function (a) {
                        var b = this.root.editor, c = b && b._.hiddenSelectionContainer; this.reset(); if (c) for (var c = this.root, g, h = 0; h < a.length; ++h)g = a[h], g.endContainer.equals(c) && (g.endOffset = Math.min(g.endOffset, c.getChildCount())); if (a.length) if (this.isLocked) { var k = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); k && !k.equals(this.root) && k.focus() } else {
                            var n; a: {
                                var l, H; if (1 == a.length && !(H = a[0]).collapsed && (n = H.getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT &&
                                    (H = H.clone(), H.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (l = H.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (n = l), "false" == n.getAttribute("contenteditable"))) break a; n = void 0
                            } if (n) this.fake(n); else if (b && b.plugins.tableselection && b.plugins.tableselection.isSupportedEnvironment() && d(a) && !E && !a[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) f.call(this, a); else {
                                if (m) {
                                    l = CKEDITOR.dom.walker.whitespaces(!0); n = /\ufeff|\u00a0/; H = { table: 1, tbody: 1, tr: 1 }; 1 < a.length && (b = a[a.length -
                                        1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var F, p, A; if ((c = b.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in N && (!c.is("a") || !c.getText())) try { A = c.$.createControlRange(); A.addElement(c.$); A.select(); return } catch (r) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in H || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in H) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; A = b.createBookmark(); H = A.startNode; a || (k = A.endNode);
                                    A = b.document.$.body.createTextRange(); A.moveToElementText(H.$); A.moveStart("character", 1); k ? (n = b.document.$.body.createTextRange(), n.moveToElementText(k.$), A.setEndPoint("EndToEnd", n), A.moveEnd("character", -1)) : (F = H.getNext(l), p = H.hasAscendant("pre"), F = !(F && F.getText && F.getText().match(n)) && (p || !H.hasPrevious() || H.getPrevious().is && H.getPrevious().is("br")), p = b.document.createElement("span"), p.setHtml("\x26#65279;"), p.insertBefore(H), F && b.document.createText("﻿").insertBefore(H)); b.setStartBefore(H);
                                    H.remove(); a ? (F ? (A.moveStart("character", -1), A.select(), b.document.$.selection.clear()) : A.select(), b.moveToPosition(p, CKEDITOR.POSITION_BEFORE_START), p.remove()) : (b.setEndBefore(k), k.remove(), A.select())
                                } else {
                                    k = this.getNative(); if (!k) return; this.removeAllRanges(); for (A = 0; A < a.length; A++) {
                                        if (A < a.length - 1 && (F = a[A], p = a[A + 1], n = F.clone(), n.setStart(F.endContainer, F.endOffset), n.setEnd(p.startContainer, p.startOffset), !n.collapsed && (n.shrink(CKEDITOR.NODE_ELEMENT, !0), b = n.getCommonAncestor(), n = n.getEnclosedNode(),
                                            b.isReadOnly() || n && n.isReadOnly()))) { p.setStart(F.startContainer, F.startOffset); a.splice(A--, 1); continue } b = a[A]; p = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && u(b) && (n = e(this.root), b.insertNode(n), (F = n.getNext()) && !n.getPrevious() && F.type == CKEDITOR.NODE_ELEMENT && "br" == F.getName() ? (x(this.root), b.moveToPosition(F, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(n, CKEDITOR.POSITION_AFTER_END)); p.setStart(b.startContainer.$, b.startOffset); try { p.setEnd(b.endContainer.$, b.endOffset) } catch (t) {
                                                if (0 <=
                                                    t.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), p.setEnd(b.endContainer.$, b.endOffset); else throw t;
                                            } k.addRange(p)
                                    }
                                } this.reset(); this.root.fire("selectionchange")
                            }
                        }
                    }, fake: function (a, b) {
                        var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); z(c, b); var d = this._.cache, e = new CKEDITOR.dom.range(this.root); e.setStartBefore(a); e.setEndAfter(a); d.ranges = new CKEDITOR.dom.rangeList(e); d.selectedElement = d.startElement = a; d.type = CKEDITOR.SELECTION_ELEMENT;
                        d.selectedText = d.nativeSel = null; this.isFake = 1; this.rev = M++; c._.fakeSelection = this; this.root.fire("selectionchange")
                    }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) { return d(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a }, createBookmarks2: function (a) {
                        a =
                        this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a
                    }, selectBookmarks: function (a) { for (var b = [], c, e = 0; e < a.length; e++) { var f = new CKEDITOR.dom.range(this.root); f.moveToBookmark(a[e]); b.push(f) } a.isFake && (c = d(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !d(b) ? this.fake(c) : this.selectRanges(b); return this }, getCommonAncestor: function () {
                        var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length -
                            1].endContainer) : null
                    }, scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[m ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
                }
    })(); "use strict"; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3;
    (function () {
        function a(a, b) { for (var c, d; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!d) { var e = a.getAttribute("contentEditable"); "false" == e ? c = a : "true" == e && (d = 1) } return c } function d(a, b, c, d) { return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a)) } function b(c) {
            var e = c.document; if (c.collapsed) e = M(this, e), c.insertNode(e), c.moveToPosition(e, CKEDITOR.POSITION_BEFORE_END); else {
                var g = this.element, h = this._.definition, k, l = h.ignoreReadonly, m = l || h.includeReadonly; null ==
                    m && (m = c.root.getCustomData("cke_includeReadonly")); var p = CKEDITOR.dtd[g]; p || (k = !0, p = CKEDITOR.dtd.span); c.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.trim(); var q = c.createBookmark(), u = q.startNode, r = q.endNode, t = u, x; if (!l) { var v = c.getCommonAncestor(), l = a(u, v), v = a(r, v); l && (t = l.getNextSourceNode(!0)); v && (r = v) } for (t.getPosition(r) == CKEDITOR.POSITION_FOLLOWING && (t = 0); t;) {
                        l = !1; if (t.equals(r)) t = null, l = !0; else {
                            var z = t.type == CKEDITOR.NODE_ELEMENT ? t.getName() : null, v = z && "false" == t.getAttribute("contentEditable"), y = z &&
                                t.getAttribute("data-nostyle"); if (z && t.data("cke-bookmark") || t.type === CKEDITOR.NODE_COMMENT) { t = t.getNextSourceNode(!0); continue } if (v && m && CKEDITOR.dtd.$block[z]) for (var D = t, B = f(D), C = void 0, E = B.length, G = 0, D = E && new CKEDITOR.dom.range(D.getDocument()); G < E; ++G) { var C = B[G], J = CKEDITOR.filter.instances[C.data("cke-filter")]; if (J ? J.check(this) : 1) D.selectNodeContents(C), b.call(this, D) } B = z ? !p[z] || y ? 0 : v && !m ? 0 : d(t, r, h, Q) : 1; if (B) if (C = t.getParent(), B = h, E = g, G = k, !C || !(C.getDtd() || CKEDITOR.dtd.span)[E] && !G || B.parentRule &&
                                    !B.parentRule(C)) l = !0; else { if (x || z && CKEDITOR.dtd.$removeEmpty[z] && (t.getPosition(r) | Q) != Q || (x = c.clone(), x.setStartBefore(t)), z = t.type, z == CKEDITOR.NODE_TEXT || v || z == CKEDITOR.NODE_ELEMENT && !t.getChildCount()) { for (var z = t, N; (l = !z.getNext(w)) && (N = z.getParent(), p[N.getName()]) && d(N, u, h, S);)z = N; x.setEndAfter(z) } } else l = !0; t = t.getNextSourceNode(y || v)
                        } if (l && x && !x.collapsed) {
                            for (var l = M(this, e), v = l.hasAttributes(), y = x.getCommonAncestor(), z = {}, B = {}, C = {}, E = {}, W, V, X; l && y;) {
                                if (y.getName() == g) {
                                    for (W in h.attributes) !E[W] &&
                                        (X = y.getAttribute(V)) && (l.getAttribute(W) == X ? B[W] = 1 : E[W] = 1); for (V in h.styles) !C[V] && (X = y.getStyle(V)) && (l.getStyle(V) == X ? z[V] = 1 : C[V] = 1)
                                } y = y.getParent()
                            } for (W in B) l.removeAttribute(W); for (V in z) l.removeStyle(V); v && !l.hasAttributes() && (l = null); l ? (x.extractContents().appendTo(l), x.insertNode(l), I.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), x.extractContents().appendTo(l), x.insertNode(l), I.call(this, l), l.remove(!0)); x = null
                        }
                    } c.moveToBookmark(q);
                c.shrink(CKEDITOR.SHRINK_TEXT); c.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        } function c(a) {
            function b() { for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(m.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) { var h = a.elements[g]; if (h == a.block || h == a.blockLimit) break; p.checkElementRemovable(h, !0) && (e = h) } for (g = 0; g < c.elements.length; g++) { h = c.elements[g]; if (h == c.block || h == c.blockLimit) break; p.checkElementRemovable(h, !0) && (f = h) } f && m.breakParent(f); e && d.breakParent(e) } a.enlarge(CKEDITOR.ENLARGE_INLINE,
                1); var c = a.createBookmark(), d = c.startNode, e = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                    for (var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, h = 0, k; h < f.elements.length && (k = f.elements[h]) && k != f.block && k != f.blockLimit; h++)if (this.checkElementRemovable(k)) { var l; !e && a.collapsed && (a.checkBoundaryOfElement(k, CKEDITOR.END) || (l = a.checkBoundaryOfElement(k, CKEDITOR.START))) ? (g = k, g.match = l ? "start" : "end") : (k.mergeSiblings(), k.is(this.element) ? z.call(this, k) : r(k, E(this)[k.getName()])) } if (g) {
                        e =
                        d; for (h = 0; ; h++) { k = f.elements[h]; if (k.equals(g)) break; else if (k.match) continue; else k = k.clone(); k.append(e); e = k } e["start" == g.match ? "insertBefore" : "insertAfter"](g)
                    }
                } else { var m = c.endNode, p = this; b(); for (f = d; !f.equals(m);)g = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? z.call(this, f) : r(f, E(this)[f.getName()]), g.type == CKEDITOR.NODE_ELEMENT && g.contains(d) && (b(), g = d.getNext())), f = g } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
        } function f(a) {
            var b =
                []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b
        } function h(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && y(a, this) } function k(a) {
            var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition, c = b.attributes; if (c) for (var d in c) a.removeAttribute(d, c[d]); if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) &&
                    a.removeStyle(e)
            }
        } function g(a) { var b = a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var d, e = a.document, f; d = c.getNextParagraph();)!d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = M(this, e, d), u(d, f)); a.moveToBookmark(b) } function l(a) {
            var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var d, e; d = c.getNextParagraph();)this.checkElementRemovable(d) &&
                (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), u(d, e)) : z.call(this, d)); a.moveToBookmark(b)
        } function u(a, b) {
            var c = !b; c && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var d = b && b.is("pre"), f = a.is("pre"), g = !d && f; if (d && !f) {
                f = b; (g = a.getBogus()) && g.remove(); g = a.getHtml(); g = x(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
                    " "); g = g.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var h = a.getDocument().createElement("div"); h.append(f); f.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e"; f.copyAttributes(h.getFirst()); f = h.getFirst().remove() } else f.setHtml(g); b = f
            } else g ? b = t(c ? [a.getHtml()] : e(a), b) : a.moveChildren(b); b.replace(a); if (d) {
                var c = b, k; (k = c.getPrevious(v)) && k.type == CKEDITOR.NODE_ELEMENT && k.is("pre") && (d = x(k.getHtml(), /\n$/, "") + "\n\n" + x(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" :
                    c.setHtml(d), k.remove())
            } else c && m(b)
        } function e(a) { var b = []; x(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function x(a, b, c) { var d = "", e = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (d = b); c && (e = c); return "" }); return d + a.replace(b, c) + e } function t(a, b) {
            var c;
            1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var d = 0; d < a.length; d++) {
                var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = x(e, /^[ \t]*\n/, ""), e = x(e, /\n$/, ""), e = x(e, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), e = e.replace(/\n/g, "\x3cbr\x3e"), e = e.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (c) {
                    var f = b.clone(); f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            } return c || b
        } function z(a, b) {
            var c = this._.definition, d = c.attributes, c = c.styles, e = E(this)[a.getName()], f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c), g; for (g in d) if ("class" != g && !this._.definition.fullMatch || a.getAttribute(g) == p(g, d[g])) b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), a.removeAttribute(g)); for (var h in c) this._.definition.fullMatch && a.getStyle(h) != p(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h)); r(a, e, B[a.getName()]); f && (this._.definition.alwaysRemoveElement ?
                m(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? m(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        } function I(a) { for (var b = E(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;)d = c.getItem(e), d.isReadOnly() || z.call(this, d, !0); for (var f in b) if (f != this.element) for (c = a.getElementsByTag(f), e = c.count() - 1; 0 <= e; e--)d = c.getItem(e), d.isReadOnly() || r(d, b[f]) } function r(a, b, c) {
            if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
                var e = b[d][0],
                f; if (f = a.getAttribute(e)) { var g = b[d][1]; (null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e) }
            } c || m(a)
        } function m(a, b) {
            if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(v), d = a.getNext(v); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        } function M(a, b, c) { var d; d = a.element; "*" == d && (d = "span"); d = new CKEDITOR.dom.element(d, b); c && c.copyAttributes(d); d = y(d, a); b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return d } function y(a, b) {
            var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c); if (d) for (var e in d) a.setAttribute(e, d[e]); c && a.setAttribute("style", c); a.getDocument().removeCustomData("doc_processing_style");
            return a
        } function J(a, b) { for (var c in a) a[c] = a[c].replace(C, function (a, c) { return b[c] }) } function E(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var d = 0; d < c.length; d++) { var e = c[d], f, g; "string" == typeof e ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes); e = b[f] || (b[f] = {}); if (g) { var e = e.attributes = e.attributes || [], h; for (h in g) e.push([h.toLowerCase(), g[h]]) } } } return b } function p(a,
            b, c) { var d = new CKEDITOR.dom.element("span"); d[c ? "setStyle" : "setAttribute"](a, b); return d[c ? "getStyle" : "getAttribute"](a) } function D(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var d in a) if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1; return !0 } function G(a, b, c) {
                var d = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange;
                for (var e, f = d.createIterator(); e = f.getNextRange();)b.call(this, e, c); a.selectRanges(d)
            } var B = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, N = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, q = /\s*(?:;\s*|$)/, C = /#\((.+?)\)/g, w = CKEDITOR.dom.walker.bookmark(0,
                1), v = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                    if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), J(a.attributes, b), J(a.styles, b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (B[c] ? CKEDITOR.STYLE_BLOCK : N[c] ? CKEDITOR.STYLE_OBJECT :
                        CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                }; CKEDITOR.style.prototype = {
                    apply: function (a) { if (a instanceof CKEDITOR.dom.document) return G.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); G.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                        if (a instanceof CKEDITOR.dom.document) return G.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
                            a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); G.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                    }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? h : null; return this.applyToRange(a) }, removeFromRange: function (a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? k : null; return this.removeFromRange(a) }, applyToObject: function (a) {
                        y(a,
                            this)
                    }, checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, d = 0, e; d < c.length; d++)if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { var f = e.getName(); if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue } if (this.checkElementRemovable(e, !0, b)) return !0 } }return !1 }, checkApplicable: function (a,
                        b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                            var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var d = a.getName(); if ("string" == typeof this.element ? d == this.element : d in this.element) {
                                if (!b && !a.hasAttributes()) return !0; if (d = c._AC) c = d; else {
                                    var d = {}, e = 0, f = c.attributes;
                                    if (f) for (var g in f) e++, d[g] = f[g]; if (g = CKEDITOR.style.getStyleText(c)) d.style || e++, d.style = g; d._length = e; c = c._AC = d
                                } if (c._length) { for (var h in c) if ("_length" != h) if (d = a.getAttribute(h) || "", "style" == h ? D(c[h], d) : c[h] == d) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
                            } return !1
                        }, checkElementRemovable: function (a, b, c) {
                            if (this.checkElementMatch(a, b, c)) return !0; if (b = E(this)[a.getName()]) {
                                var d; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (d = b[c][0], d = a.getAttribute(d)) {
                                    var e = b[c][1];
                                    if (null === e) return !0; if ("string" == typeof e) { if (d == e) return !0 } else if (e.test(d)) return !0
                                }
                            } return !1
                        }, buildPreview: function (a) { var b = this._.definition, c = [], d = b.element; "bdo" == d && (d = "span"); var c = ["\x3c", d], e = b.attributes; if (e) for (var f in e) c.push(" ", f, '\x3d"', e[f], '"'); (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"'); c.push("\x3e", a || b.name, "\x3c/", d, "\x3e"); return c.join("") }, getDefinition: function () { return this._.definition }
                }; CKEDITOR.style.getStyleText = function (a) {
                    var b = a._ST; if (b) return b;
                    var b = a.styles, c = a.attributes && a.attributes.style || "", d = ""; c.length && (c = c.replace(q, ";")); for (var e in b) { var f = b[e], g = (e + ":" + f).replace(q, ";"); "inherit" == f ? d += g : c += g } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + d
                }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.addCustomHandler = function (a) {
                    var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT },
                        a, !0); return this.customHandlers[a.type] = b
                }; var Q = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, S = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    })(); CKEDITOR.styleCommand = function (a, d) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, d, !0) };
    CKEDITOR.styleCommand.prototype.exec = function (a) { a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (a, d, b) { CKEDITOR.stylesSet.addExternal(a, d, ""); CKEDITOR.stylesSet.load(a, b) };
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function (a, d) { var b = this._.styleStateChangeCallbacks; b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (a) { for (var d = 0; d < b.length; d++) { var h = b[d], k = h.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; h.fn.call(this, k) } })); b.push({ style: a, fn: d }) }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
            if (this._.stylesDefinitions) a(this._.stylesDefinitions);
            else { var d = this, b = d.config.stylesCombo_stylesSet || d.config.stylesSet; if (!1 === b) a(null); else if (b instanceof Array) d._.stylesDefinitions = b, a(b); else { b || (b = "default"); var b = b.split(":"), c = b[0]; CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(c, function (b) { d._.stylesDefinitions = b[c]; a(d._.stylesDefinitions) }) } }
        }
    });
    (function () { if (window.Promise) CKEDITOR.tools.promise = Promise; else { var a = CKEDITOR.getUrl("vendor/promise.js"); if ("function" === typeof window.define && window.define.amd && "function" === typeof window.require) return window.require([a], function (a) { CKEDITOR.tools.promise = a }); CKEDITOR.scriptLoader.load(a, function (d) { if (!d) return CKEDITOR.error("no-vendor-lib", { path: a }); if ("undefined" !== typeof window.ES6Promise) return CKEDITOR.tools.promise = ES6Promise }) } })();
    (function () {
        function a(a, f, h) { a.once("selectionCheck", function (a) { if (!d) { var c = a.data.getRanges()[0]; h.equals(c) ? a.cancel() : f.equals(c) && (b = !0) } }, null, null, -1) } var d = !0, b = !1; CKEDITOR.dom.selection.setupEditorOptimization = function (a) {
            a.on("selectionCheck", function (a) { a.data && !b && a.data.optimizeInElementEnds(); b = !1 }); a.on("contentDom", function () {
                var b = a.editable(); b && (b.attachListener(b, "keydown", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this), b.attachListener(b, "keyup", function (a) {
                    this._.shiftPressed =
                    a.data.$.shiftKey
                }, this))
            })
        }; CKEDITOR.dom.selection.prototype.optimizeInElementEnds = function () {
            var b = this.getRanges()[0], f = this.root.editor, h; if (this.root.editor._.shiftPressed || this.isFake || b.isCollapsed || b.startContainer.equals(b.endContainer)) h = !1; else if (0 === b.endOffset) h = !0; else { h = b.startContainer.type === CKEDITOR.NODE_TEXT; var k = b.endContainer.type === CKEDITOR.NODE_TEXT, g = h ? b.startContainer.getLength() : b.startContainer.getChildCount(); h = b.startOffset === g || h ^ k } h && (h = b.clone(), b.shrink(CKEDITOR.SHRINK_TEXT,
                !1, { skipBogus: !0 }), d = !1, a(f, b, h), b.select(), d = !0)
        }
    })(); CKEDITOR.dom.comment = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }); "use strict";
    (function () {
        var a = {}, d = {}, b; for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1); for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1); CKEDITOR.dom.elementPath = function (b, f) {
            var h = null, k = null, g = [], l = b, u; f = f || b.getDocument().getBody(); l || (l = f); do if (l.type == CKEDITOR.NODE_ELEMENT) {
                g.push(l); if (!this.lastElement && (this.lastElement = l, l.is(CKEDITOR.dtd.$object) || "false" == l.getAttribute("contenteditable"))) continue; if (l.equals(f)) break; if (!k && (u = l.getName(),
                    "true" == l.getAttribute("contenteditable") ? k = l : !h && d[u] && (h = l), a[u])) { if (u = !h && "div" == u) { a: { u = l.getChildren(); for (var e = 0, x = u.count(); e < x; e++) { var t = u.getItem(e); if (t.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[t.getName()]) { u = !0; break a } } u = !1 } u = !u } u ? h = l : k = l }
            } while (l = l.getParent()); k || (k = f); this.block = h; this.blockLimit = k; this.root = f; this.elements = g
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function (a) { var d = this.elements; a = a && a.elements; if (!a || d.length != a.length) return !1; for (var b = 0; b < d.length; b++)if (!d[b].equals(a[b])) return !1; return !0 }, contains: function (a, d, b) {
            var c = 0, f; "string" == typeof a && (f = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ? f = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? f = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? f = a : "object" == typeof a && (f = function (b) {
                return b.getName() in
                    a
            }); var h = this.elements, k = h.length; d && (b ? c += 1 : --k); b && (h = Array.prototype.slice.call(h, 0), h.reverse()); for (; c < k; c++)if (f(h[c])) return h[c]; return null
        }, isContextFor: function (a) { var d; return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
    };
    CKEDITOR.dom.text = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a)); this.$ = a }; CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, isEmpty: function (a) { var d = this.getText(); a && (d = CKEDITOR.tools.trim(d)); return !d || d === CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }, split: function (a) {
            var d = this.$.parentNode, b = d.childNodes.length, c = this.getLength(), f = this.getDocument(), h = new CKEDITOR.dom.text(this.$.splitText(a), f); d.childNodes.length ==
                b && (a >= c ? (h = f.createText(""), h.insertAfter(this)) : (a = f.createText(""), a.insertAfter(h), a.remove())); return h
        }, substring: function (a, d) { return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
    });
    (function () {
        function a(a, c, d) { var h = a.serializable, k = c[d ? "endContainer" : "startContainer"], g = d ? "endOffset" : "startOffset", l = h ? c.document.getById(a.startNode) : a.startNode; a = h ? c.document.getById(a.endNode) : a.endNode; k.equals(l.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(), k = a.getNext()); k.equals(l.getParent()) && c[g]++; k.equals(a.getParent()) && c[g]++; c[d ? "endContainer" : "startContainer"] = k; return c }
        CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, d) }; var d = {
            createIterator: function () {
                var a = this, c = CKEDITOR.dom.walker.bookmark(), d = [], h; return {
                    getNextRange: function (k) {
                        h = void 0 === h ? 0 : h + 1; var g = a[h]; if (g && 1 < a.length) {
                            if (!h) for (var l = a.length - 1; 0 <= l; l--)d.unshift(a[l].createBookmark(!0)); if (k) for (var u = 0; a[h + u + 1];) {
                                var e = g.document; k = 0; l = e.getById(d[u].endNode); for (e = e.getById(d[u + 1].startNode); ;) {
                                    l =
                                    l.getNextSourceNode(!1); if (e.equals(l)) k = 1; else if (c(l) || l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) continue; break
                                } if (!k) break; u++
                            } for (g.moveToBookmark(d.shift()); u--;)l = a[++h], l.moveToBookmark(d.shift()), g.setEnd(l.endContainer, l.endOffset)
                        } return g
                    }
                }
            }, createBookmarks: function (b) { for (var c = [], d, h = 0; h < this.length; h++) { c.push(d = this[h].createBookmark(b, !0)); for (var k = h + 1; k < this.length; k++)this[k] = a(d, this[k]), this[k] = a(d, this[k], !0) } return c }, createBookmarks2: function (a) {
                for (var c = [], d = 0; d <
                    this.length; d++)c.push(this[d].createBookmark2(a)); return c
            }, moveToBookmarks: function (a) { for (var c = 0; c < this.length; c++)this[c].moveToBookmark(a[c]) }
        }
    })();
    (function () {
        function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function d(b) { var c = CKEDITOR.skin["ua_" + b], d = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), f = 0, g; f < c.length; f++)if (g = c[f], d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == g) && (g = "ie"), d[g]) { b += "_" + c[f]; break } return CKEDITOR.getUrl(a() + b + ".css") } function b(a, b) { h[a] || (CKEDITOR.document.appendStyleSheet(d(a)), h[a] = 1); b && b() } function c(a) {
            var b =
                a.getById(k); b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css")); return b
        } function f(a, b, c) {
            var d, f, g; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++)b[f] = b[f].split("{"); for (var h = 0; h < a.length; h++)if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { g = b[f][1]; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); a[h].$.sheet.addRule(b[f][0], g) } else {
                g = b; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ?
                    a[h].$.styleSheet.cssText += g : a[h].$.innerHTML += g
            }
        } var h = {}; CKEDITOR.skin = {
            path: a, loadPart: function (c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { b(c, d) }) : b(c, d) }, getPath: function (a) { return CKEDITOR.getUrl(d(a)) }, icons: {}, addIcon: function (a, b, c, d) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" }) }, getIconStyle: function (a, b, c, d, f) {
                var g; a && (a = a.toLowerCase(), b && (g = this.icons[a + "-rtl"]),
                    g || (g = this.icons[a])); a = c || g && g.path || ""; d = d || g && g.offset; f = f || g && g.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + f + ";"
            }
        }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () { return this.uiColor }, setUiColor: function (a) {
                var b = c(CKEDITOR.document); return (this.setUiColor = function (a) {
                this.uiColor = a; var c = CKEDITOR.skin.chameleon, d = "", h = ""; "function" == typeof c && (d = c(this, "editor"), h =
                    c(this, "panel")); a = [[l, a]]; f([b], d, a); f(g, h, a)
                }).call(this, a)
            }
        }); var k = "cke_ui_color", g = [], l = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor; a = function (a) {
                    a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!a.getById("cke_ui_color")) {
                        var d = c(a); g.push(d); b.on("destroy", function () { g = CKEDITOR.tools.array.filter(g, function (a) { return d !== a }) }); (a = b.getUiColor()) && f([d], CKEDITOR.skin.chameleon(b, "panel"),
                            [[l, a]])
                    }
                }; b.on("panelShow", a); b.on("menuShow", a); b.config.uiColor && b.setUiColor(b.config.uiColor)
            }
        })
    })();
    (function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else { var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead()); try { var d = a.getComputedStyle("border-top-color"), b = a.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!d || d != b) } catch (c) { CKEDITOR.env.hc = !1 } a.remove() } CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, d = 0; d < a.length; d++)CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
    })();/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
    CKEDITOR.skin.name = "moono-lisa"; CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko"; CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8";
    CKEDITOR.skin.chameleon = function () {
        var b = function () { return function (b, d) { for (var a = b.match(/[^#]./g), e = 0; 3 > e; e++) { var f = e, c; c = parseInt(a[e], 16); c = ("0" + (0 > d ? 0 | c * (1 + d) : 0 | c + (255 - c) * d).toString(16)).slice(-2); a[f] = c } return "#" + a.join("") } }(), f = { editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "), panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ") };
        return function (g, d) { var a = b(g.uiColor, .4), a = { id: "." + g.id, defaultBorder: b(a, -.2), toolbarElementsBorder: b(a, -.25), defaultBackground: a, lightBackground: b(a, .8), darkBackground: b(a, -.15), ckeButtonOn: b(a, .4), ckeResizer: b(a, -.4), ckeColorauto: b(a, .8), dialogBody: b(a, .7), dialogTab: b(a, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: b(a, -.6), menubuttonHover: b(a, .1), menubuttonIcon: b(a, .5), menubuttonIconHover: b(a, .3) }; return f[d].output(a).replace(/\[/g, "{").replace(/\]/g, "}") }
    }(); CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var h = function (b) { this._ || (this._ = {}); this._["default"] = this._.initValue = b["default"] || ""; this._.required = b.required || !1; for (var a = [this._], d = 1; d < arguments.length; d++)a.push(arguments[d]); a.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, a); return this._ }, r = { build: function (b, a, d) { return new CKEDITOR.ui.dialog.textInput(b, a, d) } }, n = { build: function (b, a, d) { return new CKEDITOR.ui.dialog[a.type](b, a, d) } }, q = {
                isChanged: function () {
                    return this.getValue() !=
                        this.getInitValue()
                }, reset: function (b) { this.setValue(this.getInitValue(), b) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
            }, v = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (b, a) {
                    this._.domOnChangeRegistered || (b.on("load", function () {
                        this.getInputElement().on("change", function () { b.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                            this)
                    }, this), this._.domOnChangeRegistered = !0); this.on("change", a)
                }
            }, !0), x = /^on([A-Z]\w+)/, t = function (b) { for (var a in b) (x.test(a) || "title" == a || "type" == a) && delete b[a]; return b }, w = function (b) { b = b.data.getKeystroke(); b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (b, a, d, f) {
                    if (!(4 > arguments.length)) {
                        var c = h.call(this, a); c.labelId = CKEDITOR.tools.getNextId() +
                            "_label"; this._.children = []; var e = { role: a.role || "presentation" }; a.includeLabel && (e["aria-labelledby"] = c.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, e, function () {
                                var e = [], g = a.required ? " cke_required" : ""; "horizontal" != a.labelLayout ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : "", (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", a.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                    a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, a), "\x3c/div\x3e") : (g = {
                                        type: "hbox", widths: a.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(a.label) + "\x3c/label\x3e" }, {
                                            type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style\x3d"' + a.controlStyle +
                                                '"' : "") + "\x3e" + f.call(this, b, a) + "\x3c/span\x3e"
                                        }]
                                    }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e)); return e.join("")
                            })
                    }
                }, textInput: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", c = { "class": "cke_dialog_ui_input_" + a.type, id: f, type: a.type }; a.validate && (this.validate = a.validate); a.maxLength && (c.maxlength = a.maxLength); a.size && (c.size = a.size); a.inputStyle && (c.style = a.inputStyle); var e = this, m = !1; b.on("load", function () {
                            e.getInputElement().on("keydown",
                                function (a) { 13 == a.data.getKeystroke() && (m = !0) }); e.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && m && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), m = !1); e.bidi && w.call(e, a) }, null, null, 1E3)
                        }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"']; a.width && b.push('style\x3d"width:' + a.width + '" '); b.push("\x3e\x3cinput "); c["aria-labelledby"] = this._.labelId; this._.required &&
                                (c["aria-required"] = this._.required); for (var e in c) b.push(e + '\x3d"' + c[e] + '" '); b.push(" /\x3e\x3c/div\x3e"); return b.join("")
                        })
                    }
                }, textarea: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); var f = this, c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", e = {}; a.validate && (this.validate = a.validate); e.rows = a.rows || 5; e.cols = a.cols || 20; e["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || ""); "undefined" != typeof a.inputStyle && (e.style = a.inputStyle); a.dir && (e.dir = a.dir); if (f.bidi) b.on("load",
                            function () { f.getInputElement().on("keyup", w) }, f); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () { e["aria-labelledby"] = this._.labelId; this._.required && (e["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" '], b; for (b in e) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e"); return a.join("") })
                    }
                }, checkbox: function (b,
                    a, d) {
                        if (!(3 > arguments.length)) {
                            var f = h.call(this, a, { "default": !!a["default"] }); a.validate && (this.validate = a.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function () {
                                var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), e = [], d = CKEDITOR.tools.getNextId() + "_label", g = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": d }; t(c); a["default"] && (g.checked = "checked"); "undefined" != typeof c.inputStyle && (c.style = c.inputStyle);
                                f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, "input", null, g); e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(a.label), "\x3c/label\x3e"); return e.join("")
                            })
                        }
                }, radio: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a); this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]); a.validate && (this.validate = a.validate); var f = [], c = this; a.role = "radiogroup"; a.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
                            b, a, d, function () {
                                for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + "_radio", k = 0; k < a.items.length; k++) {
                                    var l = a.items[k], h = void 0 !== l[2] ? l[2] : l[0], n = void 0 !== l[1] ? l[1] : l[0], p = CKEDITOR.tools.getNextId() + "_radio_input", q = p + "_label", p = CKEDITOR.tools.extend({}, a, { id: p, title: null, type: null }, !0), h = CKEDITOR.tools.extend({}, p, { title: h }, !0), r = { type: "radio", "class": "cke_dialog_ui_radio_input", name: g, value: n, "aria-labelledby": q }, u = []; c._["default"] == n && (r.checked = "checked"); t(p); t(h); "undefined" != typeof p.inputStyle &&
                                        (p.style = p.inputStyle); p.keyboardFocusable = !0; f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, "input", null, r)); u.push(" "); new CKEDITOR.ui.dialog.uiElement(b, h, u, "label", null, { id: q, "for": r.id }, l[0]); e.push(u.join(""))
                                } new CKEDITOR.ui.dialog.hbox(b, f, e, d); return d.join("")
                            }); this._.children = f
                    }
                }, button: function (b, a, d) {
                    if (arguments.length) {
                    "function" == typeof a && (a = a(b.getParentEditor())); h.call(this, a, { disabled: a.disabled || !1 }); CKEDITOR.event.implementOn(this); var f = this; b.on("load", function () {
                        var a = this.getElement();
                        (function () { a.on("click", function (a) { f.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })(); a.unselectable()
                    }, this); var c = CKEDITOR.tools.extend({}, a); delete c.style; var e = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, { style: a.style, href: "javascript:void(0)", title: a.label, hidefocus: "true", "class": a["class"], role: "button", "aria-labelledby": e }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
                        CKEDITOR.tools.htmlEncode(a.label) + "\x3c/span\x3e")
                    }
                }, select: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        var f = h.call(this, a); a.validate && (this.validate = a.validate); f.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), e = [], d = [], g = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                a.type, '" role\x3d"presentation"'); a.width && e.push('style\x3d"width:' + a.width + '" '); e.push("\x3e"); void 0 !== a.size && (g.size = a.size); void 0 !== a.multiple && (g.multiple = a.multiple); t(c); for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++)d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0])); "undefined" != typeof c.inputStyle && (c.style = c.inputStyle); f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, "select", null,
                                    g, d.join("")); e.push("\x3c/div\x3e"); return e.join("")
                        })
                    }
                }, file: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                    void 0 === a["default"] && (a["default"] = ""); var f = CKEDITOR.tools.extend(h.call(this, a), { definition: a, buttons: [] }); a.validate && (this.validate = a.validate); b.on("load", function () { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                    f.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                        f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void(']; b.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); b.push(')"\x3e\x3c/iframe\x3e'); return b.join("")
                    })
                    }
                }, fileButton: function (b, a, d) {
                    var f = this; if (!(3 > arguments.length)) {
                        h.call(this, a); a.validate && (this.validate = a.validate); var c = CKEDITOR.tools.extend({}, a), e = c.onClick; c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button"; c.onClick = function (c) {
                            var d =
                                a["for"]; c = e ? e.call(this, c) : !1; !1 !== c && ("xhr" !== c && b.getContentElement(d[0], d[1]).submit(), this.disable())
                        }; b.on("load", function () { b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(f) }); CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                }, html: function () {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/, a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, d = /\/$/; return function (f, c, e) {
                        if (!(3 > arguments.length)) {
                            var m = [], g = c.html; "\x3c" != g.charAt(0) && (g = "\x3cspan\x3e" + g + "\x3c/span\x3e"); var k = c.focus; if (k) {
                                var l = this.focus;
                                this.focus = function () { ("function" == typeof k ? k : l).call(this); this.fire("focus") }; c.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
                            } CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, "span", null, null, ""); m = m.join("").match(b); g = g.match(a) || ["", "", ""]; d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]); e.push([g[1], " ", m[1] || "", g[2]].join(""))
                        }
                    }
                }(), fieldset: function (b, a, d, f, c) {
                    var e = c.label; this._ = { children: a }; CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, "fieldset", null, null, function () {
                        var a =
                            []; e && a.push("\x3clegend" + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + e + "\x3c/legend\x3e"); for (var b = 0; b < d.length; b++)a.push(d[b]); return a.join("")
                    })
                }
            }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (b) {
                    var a = CKEDITOR.document.getById(this._.labelId); 1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue =
                        b; return this
                }, getLabel: function () { var b = CKEDITOR.document.getById(this._.labelId); return !b || 1 > b.getChildCount() ? "" : b.getChild(0).getText() }, eventProcessors: v
            }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) }, enable: function () { this._.disabled = !1; var b = this.getElement(); b && b.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") },
                isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (b, a) { this.on("click", function () { a.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
            }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                focus: function () { var b = this.selectParentTab(); setTimeout(function () { var a = b.getInputElement(); a && a.$.focus() }, 0) }, select: function () { var b = this.selectParentTab(); setTimeout(function () { var a = b.getInputElement(); a && (a.$.focus(), a.$.select()) }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (b) { if (this.bidi) { var a = b && b.charAt(0); (a = "‪" == a ? "ltr" : "‫" == a ? "rtl" : null) && (b = b.slice(1)); this.setDirectionMarker(a) } b || (b = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                getValue: function () { var b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && b) { var a = this.getDirectionMarker(); a && (b = ("ltr" == a ? "‪" : "‫") + b) } return b }, setDirectionMarker: function (b) { var a = this.getInputElement(); b ? a.setAttributes({ dir: b, "data-cke-dir-marker": b }) : this.getDirectionMarker() && a.removeAttributes(["dir", "data-cke-dir-marker"]) }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
            }, q, !0); CKEDITOR.ui.dialog.textarea.prototype =
                new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function () { return this._.select.getElement() }, add: function (b, a, d) { var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), c = this.getInputElement().$; f.$.text = b; f.$.value = void 0 === a || null === a ? b : a; void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d); return this }, remove: function (b) {
                        this.getInputElement().$.remove(b);
                        return this
                    }, clear: function () { for (var b = this.getInputElement().$; 0 < b.length;)b.remove(0); return this }, keyboardFocusable: !0
                }, q, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (b, a) { this.getInputElement().$.checked = b; !a && this.fire("change", { value: b }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                        onChange: function (b,
                            a) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return v.onChange.apply(this, arguments); b.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", a); return null }
                    }, keyboardFocusable: !0
                }, q, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setValue: function (b, a) {
                        for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++)f.getElement().$.checked =
                            f.getValue() == b; !a && this.fire("change", { value: b })
                    }, getValue: function () { for (var b = this._.children, a = 0; a < b.length; a++)if (b[a].getElement().$.checked) return b[a].getValue(); return null }, accessKeyUp: function () { var b = this._.children, a; for (a = 0; a < b.length; a++)if (b[a].getElement().$.checked) { b[a].getElement().focus(); return } b[0].getElement().focus() }, eventProcessors: {
                        onChange: function (b, a) {
                            if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return v.onChange.apply(this, arguments); b.on("load", function () {
                                for (var a =
                                    this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                            }, this); this.on("change", a); return null
                        }
                    }
                }, q, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, q, {
                    getInputElement: function () {
                        var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) :
                            this.getElement()
                    }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (b) { var a = /^on([A-Z]\w+)/, d, f = function (a, b, c, d) { a.on("formLoaded", function () { a.getInputElement().on(c, d, a) }) }, c; for (c in b) if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]); return this }, reset: function () {
                        function b() {
                            d.$.open();
                            var b = ""; f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0)); var h = a.frameId + "_input"; d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                                '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + m + ")}", "\x3c/script\x3e"].join(""));
                            d.$.close(); for (b = 0; b < c.length; b++)c[b].enable()
                        } var a = this._, d = CKEDITOR.document.getById(a.frameId).getFrameDocument(), f = a.definition, c = a.buttons, e = this.formLoadedNumber, m = this.formUnloadNumber, g = a.dialog._.editor.lang.dir, k = a.dialog._.editor.langCode; e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () {
                            CKEDITOR.tools.removeFunction(e);
                            CKEDITOR.tools.removeFunction(m)
                        })); CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                    }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: { onChange: function (b, a) { this._.domOnChangeRegistered || (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", a) } }, keyboardFocusable: !0
                }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
                    new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", r); CKEDITOR.dialog.addUIElement("password", r); CKEDITOR.dialog.addUIElement("tel", r); CKEDITOR.dialog.addUIElement("textarea", n); CKEDITOR.dialog.addUIElement("checkbox", n); CKEDITOR.dialog.addUIElement("radio", n); CKEDITOR.dialog.addUIElement("button", n); CKEDITOR.dialog.addUIElement("select", n); CKEDITOR.dialog.addUIElement("file", n); CKEDITOR.dialog.addUIElement("fileButton",
                        n); CKEDITOR.dialog.addUIElement("html", n); CKEDITOR.dialog.addUIElement("fieldset", { build: function (b, a, d) { for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) { var k = []; e.push(k); h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k)) } return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a) } })
        }
    }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2;
    (function () {
        function z(a) { a._.tabBarMode = !0; a._.tabs[a._.currentTabId][0].focus(); a._.currentFocusIndex = -1 } function A() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function V() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c %
                a]; return null
        } function K(a, b) { for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) { var f = new CKEDITOR.dom.element(c[d]); "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", ""))) } } function W(a, b) {
            var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() :
                this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b })
        } function X() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function Y(a) {
            var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", Z).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), d = c.getChild(0),
            e = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c); !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); d.unselectable(); e.unselectable(); return {
                element: b,
                parts: { dialog: b.getChild(0), title: d, close: e, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) }
            }
        } function L(a, b, c) { this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") }) }
        function aa(a) { function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) }) } function M(a, b) { this.dialog = a; for (var c = b.contents, d = 0, e; e = c[d]; d++)c[d] = e && new N(a, e); CKEDITOR.tools.extend(this, b) } function N(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function ba(a) {
            function b(b) {
                var c = a.getSize(), k = a.parts.dialog.getParent().getClientSize(), q = b.data.$.screenX, l = b.data.$.screenY, r = q - d.x, n = l - d.y; d = { x: q, y: l }; e.x += r; e.y += n; q =
                    e.x + h[3] < g ? -h[3] : e.x - h[1] > k.width - c.width - g ? k.width - c.width + ("rtl" == f.lang.dir ? 0 : h[1]) : e.x; c = e.y + h[0] < g ? -h[0] : e.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : e.y; q = Math.floor(q); c = Math.floor(c); a.move(q, c, 1); b.data.preventDefault()
            } function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = u.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var d = null, e = null, f = a.getParentEditor(),
                g = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof g && (g = 20); a.parts.title.on("mousedown", function (g) { if (!a._.moved) { var f = a._.element; f.getFirst().setStyle("position", "absolute"); f.removeStyle("display"); a._.moved = !0; a.layout() } d = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); e = a.getPosition(); CKEDITOR.env.ie6Compat && (f = u.getChild(0).getFrameDocument(), f.on("mousemove", b), f.on("mouseup", c)); g.data.preventDefault() },
                    a)
        } function ca(a) {
            function b(b) {
                var c = "rtl" == f.lang.dir, q = k.width, l = k.height, w = q + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2), C = l + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2), E = a._.element.getFirst(), E = c && parseInt(E.getComputedStyle("right"), 10), v = a.getPosition(); v.x = v.x || 0; v.y = v.y || 0; v.y + C > p.height && (C = p.height - v.y); (c ? E : v.x) + w > p.width && (w = p.width - (c ? E : v.x)); C = Math.floor(C); w = Math.floor(w); if (e == CKEDITOR.DIALOG_RESIZE_WIDTH || e == CKEDITOR.DIALOG_RESIZE_BOTH) q = Math.max(d.minWidth || 0, w - g); if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT ||
                    e == CKEDITOR.DIALOG_RESIZE_BOTH) l = Math.max(d.minHeight || 0, C - h); a.resize(q, l); a._.moved && O(a, a._.position.x, a._.position.y); a._.moved || a.layout(); b.data.preventDefault()
            } function c() { CKEDITOR.document.removeListener("mouseup", c); CKEDITOR.document.removeListener("mousemove", b); q && (q.remove(), q = null); if (CKEDITOR.env.ie6Compat) { var a = u.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) } } var d = a.definition, e = d.resizable; if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f =
                    a.getParentEditor(), g, h, p, m, k, q, l = CKEDITOR.tools.addFunction(function (e) {
                        function d(a) { return a.isVisible() } k = a.getSize(); var f = a.parts.contents, l = f.$.getElementsByTagName("iframe").length, w = !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks); l && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%; left:0; top:0;"\x3e\x3c/div\x3e'), f.append(q)); h = k.height - a.parts.contents.getFirst(d).getSize("height", w);
                        g = k.width - a.parts.contents.getFirst(d).getSize("width", 1); m = { x: e.screenX, y: e.screenY }; p = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat && (f = u.getChild(0).getFrameDocument(), f.on("mousemove", b), f.on("mouseup", c)); e.preventDefault && e.preventDefault()
                    }); a.on("load", function () {
                        var b = ""; e == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
                            b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + l + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                    }); f.on("destroy", function () { CKEDITOR.tools.removeFunction(l) })
            }
        } function O(a, b, c) {
            var d = a.parts.dialog.getParent().getClientSize(), e = a.getSize(), f = a._.viewportRatio, g = Math.max(d.width - e.width, 0), d = Math.max(d.height - e.height, 0); f.width = g ? b / g : f.width; f.height = d ? c / d : f.height;
            a._.viewportRatio = f
        } function J(a) { a.data.preventDefault(1) } function P(a) {
            var b = a.config, c = CKEDITOR.skinName || a.config.skin, d = b.dialog_backgroundCoverColor || ("moono-lisa" == c ? "black" : "white"), c = b.dialog_backgroundCoverOpacity, e = b.baseFloatZIndex, b = CKEDITOR.tools.genKey(d, c, e), f = D[b]; CKEDITOR.document.getBody().addClass("cke_dialog_open"); f ? f.show() : (e = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", e, "; top: 0px; left: 0px; ", "; width: 100%; height: 100%;",
                CKEDITOR.env.ie6Compat ? "" : "background-color: " + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", e.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), e.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), e.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),
                e.push("\x3c/div\x3e"), f = CKEDITOR.dom.element.createFromHtml(e.join("")), f.setOpacity(void 0 !== c ? c : .5), f.on("keydown", J), f.on("keypress", J), f.on("keyup", J), f.appendTo(CKEDITOR.document.getBody()), D[b] = f); a.focusManager.add(f); u = f; CKEDITOR.env.mac && CKEDITOR.env.webkit || f.focus()
        } function Q(a) { CKEDITOR.document.getBody().removeClass("cke_dialog_open"); u && (a.focusManager.remove(u), u.hide()) } function R(a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            (b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
        } function S(a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode); (b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())) } function T(a, b, c, d, e) {
            (x[c] || (x[c] = [])).push({
                uiElement: a,
                dialog: b, key: c, keyup: e || a.accessKeyUp, keydown: d || a.accessKeyDown
            })
        } function da(a) { for (var b in x) { for (var c = x[b], d = c.length - 1; 0 <= d; d--)c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1); 0 === c.length && delete x[b] } } function ea(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) } function fa() { } var y = CKEDITOR.tools.cssLength, U, u, F = !CKEDITOR.env.ie || CKEDITOR.env.edge, Z = '\x3cdiv class\x3d"cke_reset_all cke_dialog_container {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" style\x3d"' + (F ?
            "display:flex" : "") + '" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"' + (F ? "margin:auto" : "position:absolute") + '" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
        CKEDITOR.dialog = function (a, b) {
            function c() { var a = n._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function d(a) {
                var b = n._.focusList; a = a || 0; if (!(1 > b.length)) {
                    var c = n._.currentFocusIndex; n._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (e) { } var d = c, g = 1 < n._.pageCount; do {
                        d += a; if (g && !n._.tabBarMode && (d == b.length || -1 == d)) {
                            n._.tabBarMode = !0; n._.tabs[n._.currentTabId][0].focus();
                            n._.currentFocusIndex = -1; return
                        } d = (d + b.length) % b.length; if (d == c) break
                    } while (a && !b[d].isFocusable()); b[d].focus(); "text" == b[d].type && b[d].select()
                }
            } function e(b) {
                if (n == CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(), e = "rtl" == a.lang.dir, g = [37, 38, 39, 40]; q = l = 0; if (9 == c || c == CKEDITOR.SHIFT + 9) d(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1; else if (c == CKEDITOR.ALT + 121 && !n._.tabBarMode && 1 < n.getPageCount()) z(n), q = 1; else if (-1 != CKEDITOR.tools.indexOf(g, c) && n._.tabBarMode) c = -1 != CKEDITOR.tools.indexOf([e ? 39 : 37, 38], c) ?
                        A.call(n) : V.call(n), n.selectPage(c), n._.tabs[c][0].focus(), q = 1; else if (13 != c && 32 != c || !n._.tabBarMode) if (13 == c) c = b.data.getTarget(), c.is("a", "button", "select", "textarea") || c.is("input") && "button" == c.$.type || ((c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), l = 1; else if (27 == c) (c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), l = 1; else return; else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex =
                            -1, d(1), q = 1; f(b)
                }
            } function f(a) { q ? a.data.preventDefault(1) : l && a.data.stopPropagation() } var g = CKEDITOR.dialog._.dialogDefinitions[b], h = CKEDITOR.tools.clone(U), p = a.config.dialog_buttonsOrder || "OS", m = a.lang.dir, k = {}, q, l; ("OS" == p && CKEDITOR.env.mac || "rtl" == p && "ltr" == m || "ltr" == p && "rtl" == m) && h.buttons.reverse(); g = CKEDITOR.tools.extend(g(a), h); g = CKEDITOR.tools.clone(g); g = new M(this, g); h = Y(a); this._ = {
                editor: a, element: h.element, name: b, model: null, contentSize: { width: 0, height: 0 }, size: { width: 0, height: 0 }, contents: {},
                buttons: {}, accessKeyMap: {}, viewportRatio: { width: .5, height: .5 }, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
            }; this.parts = h.parts; CKEDITOR.tools.setTimeout(function () { a.fire("ariaWidget", this.parts.contents) }, 0, this); h = { top: 0, visibility: "hidden" }; CKEDITOR.env.ie6Compat && (h.position = "absolute"); h["rtl" == m ? "right" : "left"] = 0; this.parts.dialog.setStyles(h); CKEDITOR.event.call(this); this.definition = g = CKEDITOR.fire("dialogDefinition",
                { name: b, definition: g, dialog: this }, a).definition; if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) { h = a.config.removeDialogTabs.split(";"); for (m = 0; m < h.length; m++)if (p = h[m].split(":"), 2 == p.length) { var r = p[0]; k[r] || (k[r] = []); k[r].push(p[1]) } a._.removeDialogTabs = k } if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b])) for (m = 0; m < k.length; m++)g.removeContents(k[m]); if (g.onLoad) this.on("load", g.onLoad); if (g.onShow) this.on("show", g.onShow); if (g.onHide) this.on("hide", g.onHide); if (g.onOk) this.on("ok",
                    function (b) { a.fire("saveSnapshot"); setTimeout(function () { a.fire("saveSnapshot") }, 0); !1 === g.onOk.call(this, b) && (b.data.hide = !1) }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (g.onCancel) this.on("cancel", function (a) { !1 === g.onCancel.call(this, a) && (a.data.hide = !1) }); var n = this, t = function (a) { var b = n._.contents, c = !1, d; for (d in b) for (var e in b[d]) if (c = a.call(this, b[d][e])) return }; this.on("ok", function (a) {
                        t(function (b) {
                            if (b.validate) {
                                var c = b.validate(this), d = "string" == typeof c || !1 === c; d && (a.data.hide = !1, a.stop());
                                W.call(b, !d, "string" == typeof c ? c : void 0); return d
                            }
                        })
                    }, this, null, 0); this.on("cancel", function (b) { t(function (c) { if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = d; var B = this._.element; a.focusManager.add(B, 1); this.on("show", function () {
                        B.on("keydown", e, this); if (CKEDITOR.env.gecko) B.on("keypress",
                            f, this)
                    }); this.on("hide", function () { B.removeListener("keydown", e); CKEDITOR.env.gecko && B.removeListener("keypress", f); t(function (a) { X.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", e, this, null, 0) }); this.on("show", function () {
                        c(); var b = 1 < n._.pageCount; a.config.dialog_startupFocusTab && b ? (n._.tabBarMode = !0, n._.tabs[n._.currentTabId][0].focus(), n._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length -
                            1, g.onFocus ? (b = g.onFocus.call(this)) && b.focus() : d(1))
                    }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); ba(this); ca(this); (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title); for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k); this.parts.tabs.on("click", function (a) {
                        var b = a.data.getTarget(); b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                            z(this), a.data.preventDefault())
                    }, this); m = []; k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: g.buttons }, m).getChild(); this.parts.footer.setHtml(m.join("")); for (m = 0; m < k.length; m++)this._.buttons[k[m].id] = k[m]
        }; CKEDITOR.dialog.prototype = {
            destroy: function () { this.hide(); this._.element.remove() }, resize: function (a, b) {
                if (!this._.contentSize || this._.contentSize.width != a || this._.contentSize.height != b) {
                    CKEDITOR.dialog.fire("resize",
                        { dialog: this, width: a, height: b }, this._.editor); this.fire("resize", { width: a, height: b }, this._.editor); this.parts.contents.setStyles({ width: a + "px", height: b + "px" }); if ("rtl" == this._.editor.lang.dir && this._.position) { var c = this.parts.dialog.getParent().getClientSize().width; this._.position.x = c - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10) } this._.contentSize = { width: a, height: b }
                }
            }, getSize: function () {
                var a = this._.element.getFirst(); return {
                    width: a.$.offsetWidth || 0, height: a.$.offsetHeight ||
                        0
                }
            }, move: function (a, b, c) {
                var d = this._.element.getFirst(), e = "rtl" == this._.editor.lang.dir; CKEDITOR.env.ie && d.setStyle("zoom", "100%"); var f = this.parts.dialog.getParent().getClientSize(), g = this.getSize(), h = this._.viewportRatio, p = Math.max(f.width - g.width, 0), f = Math.max(f.height - g.height, 0); this._.position && this._.position.x == a && this._.position.y == b ? (a = Math.floor(p * h.width), b = Math.floor(f * h.height)) : O(this, a, b); this._.position = { x: a, y: b }; e && (a = p - a); b = { top: (0 < b ? b : 0) + "px" }; b[e ? "right" : "left"] = (0 < a ? a : 0) + "px";
                d.setStyles(b); c && (this._.moved = 1)
            }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                var a = this._.element, b = this.definition, c = CKEDITOR.document.getBody(), d = this._.editor.config.baseFloatZIndex; a.getParent() && a.getParent().equals(c) ? a.setStyle("display", F ? "flex" : "block") : a.appendTo(c); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null === this._.currentTabId &&
                    this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = d); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); this.getElement().setStyle("z-index", CKEDITOR.dialog._.currentZIndex); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, P(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, c = this._.parentDialog.getElement().getFirst(), c.$.style.zIndex -=
                        Math.floor(d / 2), this._.parentDialog.getElement().setStyle("z-index", c.$.style.zIndex), CKEDITOR.dialog._.currentTop = this); a.on("keydown", R); a.on("keyup", S); this._.hasFocus = !1; for (var e in b.contents) if (b.contents[e]) {
                            var a = b.contents[e], d = this._.tabs[a.id], c = a.requiredContent, f = 0; if (d) {
                                for (var g in this._.contents[a.id]) {
                                    var h = this._.contents[a.id][g]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(),
                                        f++))
                                } !f || c && !this._.editor.activeFilter.check(c) ? d[0].addClass("cke_dialog_tab_disabled") : d[0].removeClass("cke_dialog_tab_disabled")
                            }
                        } CKEDITOR.tools.setTimeout(function () { this.layout(); aa(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
            }, layout: function () {
                var a =
                    this.parts.dialog; if (this._.moved || !F) { var b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d; this._.moved && this._.position ? (d = this._.position.x, b = this._.position.y) : (d = (c.width - b.width) / 2, b = (c.height - b.height) / 2); CKEDITOR.env.ie6Compat || (a.setStyle("position", "absolute"), a.removeStyle("margin")); d = Math.floor(d); b = Math.floor(b); this.move(d, b) }
            }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () {
                var a =
                    function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this }
            }(), setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]);
                    var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility", "hidden"); for (da(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); this._.parentDialog.getElement().removeStyle("z-index"); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else Q(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -=
                        10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", R); a.removeListener("keyup", S); var c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) +
                        '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), e = this._.contents[a.id] = {}, f = d.getChild(), g = 0; d = f.shift();)d.notAllowed || "hbox" == d.type || "vbox" == d.type || g++, e[d.id] = d, "function" == typeof d.getChild && f.push.apply(f, d.getChild()); g || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); b.setStyle("min-height",
                            "100%"); d = CKEDITOR.env; e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', e, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", e); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++;
                    this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey && (T(this, this, "CTRL+" + a.accessKey, fa, ea), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                    for (var b in this._.tabs) {
                        var c = this._.tabs[b][0], d = this._.tabs[b][1]; b != a && (c.removeClass("cke_dialog_tab_selected"),
                            d.hide()); d.setAttribute("aria-hidden", b != a)
                    } var e = this._.tabs[a]; e[0].addClass("cke_dialog_tab_selected"); CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (K(e[1]), e[1].show(), setTimeout(function () { K(e[1], 1) }, 0)) : e[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) {
                var b = this._.tabs[a] && this._.tabs[a][0]; b && 1 != this._.pageCount &&
                    b.isVisible() && (a == this._.currentTabId && this.selectPage(A.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
            }, showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() }, setValueOf: function (a, b, c) {
                return this.getContentElement(a,
                    b).setValue(c)
            }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() }, enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length,
                    this._.focusList.push(new L(this, a, b)); else { this._.focusList.splice(b, 0, new L(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ }
            }, setState: function (a) {
                if (this.state != a) {
                this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                    if (!this.parts.spinner) {
                        var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px"; this.parts.spinner = CKEDITOR.document.createElement("div",
                            c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1)
                    } this.parts.spinner.show(); this.getButton("ok").disable()
                } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable()); this.fire("state", a)
                }
            }, getModel: function (a) { return this._.model ? this._.model : this.definition.getModel ? this.definition.getModel(a) : null }, setModel: function (a) { this._.model = a }, getMode: function (a) {
                if (this.definition.getMode) return this.definition.getMode(a);
                a = this.getModel(a); return !a || a instanceof CKEDITOR.dom.element && !a.getParent() ? CKEDITOR.dialog.CREATION_MODE : CKEDITOR.dialog.EDITING_MODE
            }
        }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
            CREATION_MODE: 0, EDITING_MODE: 1, add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, c) {
                a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" +
                    b + ":" + c + "(?:$|;)", "i")))
            }, okButton: function () { var a = function (a, c) { c = c || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, c, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                var a = function (a, c) {
                    c = c || {}; return CKEDITOR.tools.extend({
                        id: "cancel", type: "button",
                        label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() }
                    }, c, !0)
                }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
            }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
        }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        U = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }; var G = function (a, b, c) { for (var d = 0, e; e = a[d]; d++)if (e.id == b || c && e[c] && (e = G(e[c], b, c))) return e; return null }, H = function (a, b, c, d, e) { if (c) { for (var f = 0, g; g = a[f]; f++) { if (g.id == c) return a.splice(f, 0, b), b; if (d && g[d] && (g = H(g[d], b, c, d, !0))) return g } if (e) return null } a.push(b); return b }, I = function (a, b, c) {
            for (var d = 0, e; e = a[d]; d++) {
                if (e.id == b) return a.splice(d, 1); if (c && e[c] && (e = I(e[c],
                    b, c))) return e
            } return null
        }; M.prototype = { getContents: function (a) { return G(this.contents, a) }, getButton: function (a) { return G(this.buttons, a) }, addContents: function (a, b) { return H(this.contents, a, b) }, addButton: function (a, b) { return H(this.buttons, a, b) }, removeContents: function (a) { I(this.contents, a) }, removeButton: function (a) { I(this.buttons, a) } }; N.prototype = {
            get: function (a) { return G(this.elements, a, "children") }, add: function (a, b) { return H(this.elements, a, b, "children") }, remove: function (a) {
                I(this.elements, a,
                    "children")
            }
        }; var D = {}, x = {}; (function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (a, b, c, d, e, f, g) {
                    if (!(4 > arguments.length)) {
                        var h = (d.call ? d(b) : d) || "div", p = ["\x3c", h, " "], m = (e && e.call ? e(b) : e) || {}, k = (f && f.call ? f(b) : f) || {}, q = (g && g.call ? g.call(this, a, b) : g) || "", l = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0); k.id = l; var r = {}; b.type && (r["cke_dialog_ui_" + b.type] = 1); b.className && (r[b.className] =
                            1); b.disabled && (r.cke_disabled = 1); for (var n = k["class"] && k["class"].split ? k["class"].split(" ") : [], l = 0; l < n.length; l++)n[l] && (r[n[l]] = 1); n = []; for (l in r) n.push(l); k["class"] = n.join(" "); b.title && (k.title = b.title); r = (b.style || "").split(";"); b.align && (n = b.align, m["margin-left"] = "left" == n ? 0 : "auto", m["margin-right"] = "right" == n ? 0 : "auto"); for (l in m) r.push(l + ":" + m[l]); b.hidden && r.push("display:none"); for (l = r.length - 1; 0 <= l; l--)"" === r[l] && r.splice(l, 1); 0 < r.length && (k.style = (k.style ? k.style + "; " : "") + r.join("; "));
                        for (l in k) p.push(l + '\x3d"' + CKEDITOR.tools.htmlEncode(k[l]) + '" '); p.push("\x3e", q, "\x3c/", h, "\x3e"); c.push(p.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } })); "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue,
                            function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && T(this, a, "CTRL+" + b.accessKey); var t = this; a.on("load", function () {
                                var b = t.getInputElement(); if (b) {
                                    var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus", function () { a._.tabBarMode = !1; a._.hasFocus = !0; t.fire("focus"); c && this.addClass(c) }); b.on("blur", function () {
                                        t.fire("blur");
                                        c && this.removeClass(c)
                                    })
                                }
                            }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = t.focusIndex }))
                    }
                }, hbox: function (a, b, c, d, e) {
                    if (!(4 > arguments.length)) {
                    this._ || (this._ = {}); var f = this._.children = b, g = e && e.widths || null, h = e && e.height || null, p, m = { role: "presentation" }; e && e.align && (m.align = e.align); CKEDITOR.ui.dialog.uiElement.call(this, a, e || { type: "hbox" }, d, "table", {}, m, function () {
                        var a =
                            ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (p = 0; p < c.length; p++) {
                                var b = "cke_dialog_ui_hbox_child", d = []; 0 === p && (b = "cke_dialog_ui_hbox_first"); p == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); g ? g[p] && d.push("width:" + y(g[p])) : d.push("width:" + Math.floor(100 / c.length) + "%"); h && d.push("height:" + y(h)); e && void 0 !== e.padding && d.push("padding:" + y(e.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[p].align && d.push("text-align:" + f[p].align);
                                0 < d.length && a.push('style\x3d"' + d.join("; ") + '" '); a.push("\x3e", c[p], "\x3c/td\x3e")
                            } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                    })
                    }
                }, vbox: function (a, b, c, d, e) {
                    if (!(3 > arguments.length)) {
                    this._ || (this._ = {}); var f = this._.children = b, g = e && e.width || null, h = e && e.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, e || { type: "vbox" }, d, "div", null, { role: "presentation" }, function () {
                        var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" ']; b.push('style\x3d"'); e && e.expand && b.push("height:100%;");
                        b.push("width:" + y(g || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var d = 0; d < c.length; d++) {
                            var k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); g && k.push("width:" + y(g || "100%")); h ? k.push("height:" + y(h[d])) : e && e.expand && k.push("height:" + Math.floor(100 / c.length) + "%"); e && void 0 !== e.padding && k.push("padding:" + y(e.padding)); CKEDITOR.env.ie &&
                                CKEDITOR.env.quirks && f[d].align && k.push("text-align:" + f[d].align); 0 < k.length && b.push('style\x3d"', k.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[d], "\x3c/td\x3e\x3c/tr\x3e")
                        } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                    })
                    }
                }
            }
        })(); CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog }, setValue: function (a, b) {
                this.getInputElement().setValue(a);
                !b && this.fire("change", { value: a }); return this
            }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () { this.selectParentTab().getInputElement().focus(); return this }, registerEvents: function (a) {
                var b =
                    /^on([A-Z]\w+)/, c, d = function (a, b, c, d) { b.on("load", function () { a.getInputElement().on(c, d, a) }) }, e; for (e in a) if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]); return this
            }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { }, disable: function () {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled")
            }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
        }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
            { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                var a = {
                    build: function (a, c, d) {
                        for (var e = c.children, f, g = [], h = [], p = 0; p < e.length && (f = e[p]); p++) { var m = []; g.push(m); h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m)) } return new CKEDITOR.ui.dialog[c.type](a,
                            h, g, d, c)
                    }
                }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
            })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) }, canUndo: !1, editorFocus: 1 }; (function () {
                var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                    functions: function () {
                        var a = arguments; return function () {
                            var b = this && this.getValue ? this.getValue() : a[0], c, d = CKEDITOR.VALIDATE_AND, e = [], f; for (f = 0; f < a.length; f++)if ("function" == typeof a[f]) e.push(a[f]); else break; f < a.length && "string" == typeof a[f] && (c = a[f], f++); f < a.length && "number" == typeof a[f] && (d = a[f]); var l = d == CKEDITOR.VALIDATE_AND ? !0 : !1; for (f = 0; f < e.length; f++)l = d == CKEDITOR.VALIDATE_AND ? l &&
                                e[f](b) : l || e[f](b); return l ? !0 : c
                        }
                    }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                        return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) },
                            a)
                    }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in D) D[c].remove(); D = {} } a = a.editor._.storedDialogs; for (var d in a) a[d].destroy() })
            })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                openDialog: function (a, b, c) {
                    var d = null, e = CKEDITOR.dialog._.dialogDefinitions[a];
                    null === CKEDITOR.dialog._.currentTop && P(this); if ("function" == typeof e) e = this._.storedDialogs || (this._.storedDialogs = {}), d = e[a] || (e[a] = new CKEDITOR.dialog(this, a)), d.setModel(c), b && b.call(d, d), d.show(); else {
                        if ("failed" == e) throw Q(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function () {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                            this.openDialog(a, b, c)
                        }, this, 0, 1)
                    } CKEDITOR.skin.loadPart("dialog"); if (d) d.once("hide", function () { d.setModel(null) }, null, null, 999); return d
                }
            })
    })(); var stylesLoaded = !1; CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (z) { stylesLoaded || (CKEDITOR.document.appendStyleSheet(this.path + "styles/dialog.css"), stylesLoaded = !0); z.on("doubleclick", function (A) { A.data.dialog && z.openDialog(A.data.dialog) }, null, null, 999) } }); CKEDITOR.plugins.add("about", { requires: "dialog", init: function (a) { var b = a.addCommand("about", new CKEDITOR.dialogCommand("about")); b.modes = { wysiwyg: 1, source: 1 }; b.canUndo = !1; b.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }); (function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog", availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }, init: function (b) {
                var c = this; b.addCommand("a11yHelp", {
                    exec: function () {
                        var a =
                            b.langCode, a = c.availableLangs[a] ? a : c.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + a + ".js"), function () { b.lang.a11yhelp = c.langEntries[a]; b.openDialog("a11yHelp") })
                    }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: !1
                }); b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); b.on("ariaEditorHelpLabel", function (a) { a.data.label = b.lang.common.editorHelp })
            }
        })
    })(); CKEDITOR.plugins.add("basicstyles", {
        init: function (c) {
            var e = 0, d = function (g, d, b, a) { if (a) { a = new CKEDITOR.style(a); var f = h[b]; f.unshift(a); c.attachStyleStateChange(a, function (a) { !c.readOnly && c.getCommand(b).setState(a) }); c.addCommand(b, new CKEDITOR.styleCommand(a, { contentForms: f })); c.ui.addButton && c.ui.addButton(g, { label: d, command: b, toolbar: "basicstyles," + (e += 10) }) } }, h = {
                bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]], italic: ["em", "i", ["span", function (a) {
                    return "italic" ==
                        a.styles["font-style"]
                }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"]
            }, b = c.config, a = c.lang.basicstyles; d("Bold", a.bold, "bold", b.coreStyles_bold); d("Italic", a.italic, "italic", b.coreStyles_italic); d("Underline", a.underline, "underline", b.coreStyles_underline); d("Strike", a.strike, "strike", b.coreStyles_strike); d("Subscript", a.subscript,
                "subscript", b.coreStyles_subscript); d("Superscript", a.superscript, "superscript", b.coreStyles_superscript); c.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }); CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }; CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }; CKEDITOR.config.coreStyles_underline = { element: "u" }; CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }; CKEDITOR.config.coreStyles_subscript = { element: "sub" };
    CKEDITOR.config.coreStyles_superscript = { element: "sup" }; (function () {
        var m = {
            exec: function (g) {
                var a = g.getCommand("blockquote").state, k = g.getSelection(), c = k && k.getRanges()[0]; if (c) {
                    var h = k.createBookmarks(); if (CKEDITOR.env.ie) { var e = h[0].startNode, b = h[0].endNode, d; if (e && "blockquote" == e.getParent().getName()) for (d = e; d = d.getNext();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { e.move(d, !0); break } if (b && "blockquote" == b.getParent().getName()) for (d = b; d = d.getPrevious();)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { b.move(d); break } } var f = c.createIterator();
                    f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR; if (a == CKEDITOR.TRISTATE_OFF) {
                        for (e = []; a = f.getNextParagraph();)e.push(a); 1 > e.length && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text("﻿", g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b)); d = e[0].getParent(); c = []; for (b = 0; b < e.length; b++)a = e[b], d = d.getCommonAncestor(a.getParent()); for (a = {
                            table: 1, tbody: 1,
                            tr: 1, ol: 1, ul: 1
                        }; a[d.getName()];)d = d.getParent(); for (b = null; 0 < e.length;) { for (a = e.shift(); !a.getParent().equals(d);)a = a.getParent(); a.equals(b) || c.push(a); b = a } for (; 0 < c.length;)if (a = c.shift(), "blockquote" == a.getName()) { for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();)b.append(a.getFirst().remove()), e.push(b.getLast()); b.replace(a) } else e.push(a); c = g.document.createElement("blockquote"); for (c.insertBefore(e[0]); 0 < e.length;)a = e.shift(), c.append(a)
                    } else if (a == CKEDITOR.TRISTATE_ON) {
                        b = [];
                        for (d = {}; a = f.getNextParagraph();) { for (e = c = null; a.getParent();) { if ("blockquote" == a.getParent().getName()) { c = a.getParent(); e = a; break } a = a.getParent() } c && e && !e.getCustomData("blockquote_moveout") && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, "blockquote_moveout", !0)) } CKEDITOR.dom.element.clearAllMarkers(d); a = []; e = []; for (d = {}; 0 < b.length;)f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData("blockquote_processed") ||
                            (e.push(c), CKEDITOR.dom.element.setMarker(d, c, "blockquote_processed", !0)), a.push(f); CKEDITOR.dom.element.clearAllMarkers(d); for (b = e.length - 1; 0 <= b; b--) { c = e[b]; a: { d = c; for (var f = 0, m = d.getChildCount(), l = void 0; f < m && (l = d.getChild(f)); f++)if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) { d = !1; break a } d = !0 } d && c.remove() } if (g.config.enterMode == CKEDITOR.ENTER_BR) for (c = !0; a.length;)if (f = a.shift(), "div" == f.getName()) {
                                b = new CKEDITOR.dom.documentFragment(g.document); !c || !f.getPrevious() || f.getPrevious().type ==
                                    CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary() || b.append(g.document.createElement("br")); for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();)f.getFirst().remove().appendTo(b); c && b.append(g.document.createElement("br")); b.replace(f); c = !1
                            }
                    } k.selectBookmarks(h); g.focus()
                }
            }, refresh: function (g, a) { this.setState(g.elementPath(a.block || a.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }, context: "blockquote", allowedContent: "blockquote",
            requiredContent: "blockquote"
        }; CKEDITOR.plugins.add("blockquote", { init: function (g) { g.blockless || (g.addCommand("blockquote", m), g.ui.addButton && g.ui.addButton("Blockquote", { label: g.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
    })(); (function () {
        function q(b, a) { CKEDITOR.tools.extend(this, a, { editor: b, id: "cke-" + CKEDITOR.tools.getUniqueId(), area: b._.notificationArea }); a.type || (this.type = "info"); this.element = this._createElement(); b.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element) } function r(b) {
            var a = this; this.editor = b; this.notifications = []; this.element = this._createElement(); this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout,
                this); b.on("destroy", function () { a._removeListeners(); a.element.remove() })
        } CKEDITOR.plugins.add("notification", {
            init: function (b) {
                function a(b) { var a = new CKEDITOR.dom.element("div"); a.setStyles({ position: "fixed", "margin-left": "-9999px" }); a.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); a.setText(b); CKEDITOR.document.getBody().append(a); setTimeout(function () { a.remove() }, 100) } b._.notificationArea = new r(b); b.showNotification = function (a, d, e) {
                    var f, l; "progress" == d ? f = e : l = e; a = new CKEDITOR.plugins.notification(b,
                        { message: a, type: d, progress: f, duration: l }); a.show(); return a
                }; b.on("key", function (c) { if (27 == c.data.keyCode) { var d = b._.notificationArea.notifications; d.length && (a(b.lang.notification.closed), d[d.length - 1].hide(), c.cancel()) } })
            }
        }); q.prototype = {
            show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) }, update: function (b) {
                var a = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: b }) && (a = !1); var c = this.element, d = c.findOne(".cke_notification_message"),
                    e = c.findOne(".cke_notification_progress"), f = b.type; c.removeAttribute("role"); b.progress && "progress" != this.type && (f = "progress"); f && (c.removeClass(this._getClass()), c.removeAttribute("aria-label"), this.type = f, c.addClass(this._getClass()), c.setAttribute("aria-label", this.type), "progress" != this.type || e ? "progress" != this.type && e && e.remove() : (e = this._createProgressElement(), e.insertBefore(d))); void 0 !== b.message && (this.message = b.message, d.setHtml(this.message)); void 0 !== b.progress && (this.progress = b.progress,
                        e && e.setStyle("width", this._getPercentageProgress())); a && b.important && (c.setAttribute("role", "alert"), this.isVisible() || this.area.add(this)); this.duration = b.duration; this._hideAfterTimeout()
            }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) }, _createElement: function () {
                var b = this, a, c, d = this.editor.lang.common.close; a = new CKEDITOR.dom.element("div"); a.addClass("cke_notification");
                a.addClass(this._getClass()); a.setAttributes({ id: this.id, role: "alert", "aria-label": this.type }); "progress" == this.type && a.append(this._createProgressElement()); c = new CKEDITOR.dom.element("p"); c.addClass("cke_notification_message"); c.setHtml(this.message); a.append(c); c = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + d + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); a.append(c); c.on("click",
                    function () { b.editor.focus(); b.hide() }); return a
            }, _getClass: function () { return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type }, _createProgressElement: function () { var b = new CKEDITOR.dom.element("span"); b.addClass("cke_notification_progress"); b.setStyle("width", this._getPercentageProgress()); return b }, _getPercentageProgress: function () { return Math.round(100 * (this.progress || 0)) + "%" }, _hideAfterTimeout: function () {
                var b = this, a; this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
                if ("number" == typeof this.duration) a = this.duration; else if ("info" == this.type || "success" == this.type) a = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; a && (b._hideTimeoutId = setTimeout(function () { b.hide() }, a))
            }
        }; r.prototype = {
            add: function (b) { this.notifications.push(b); this.element.append(b.element); 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout() }, remove: function (b) {
                var a = CKEDITOR.tools.indexOf(this.notifications,
                    b); 0 > a || (this.notifications.splice(a, 1), b.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
            }, _createElement: function () { var b = this.editor, a = b.config, c = new CKEDITOR.dom.element("div"); c.addClass("cke_notifications_area"); c.setAttribute("id", "cke_notifications_area_" + b.name); c.setStyle("z-index", a.baseFloatZIndex - 2); return c }, _attachListeners: function () {
                var b = CKEDITOR.document.getWindow(), a = this.editor; b.on("scroll", this._uiBuffer.input); b.on("resize", this._uiBuffer.input);
                a.on("change", this._changeBuffer.input); a.on("floatingSpaceLayout", this._layout, this, null, 20); a.on("blur", this._layout, this, null, 20)
            }, _removeListeners: function () { var b = CKEDITOR.document.getWindow(), a = this.editor; b.removeListener("scroll", this._uiBuffer.input); b.removeListener("resize", this._uiBuffer.input); a.removeListener("change", this._changeBuffer.input); a.removeListener("floatingSpaceLayout", this._layout); a.removeListener("blur", this._layout) }, _layout: function () {
                function b() {
                    a.setStyle("left",
                        k(n + d.width - g - h))
                } var a = this.element, c = this.editor, d = c.ui.contentsElement.getClientRect(), e = c.ui.contentsElement.getDocumentPosition(), f, l, u = a.getClientRect(), m, g = this._notificationWidth, h = this._notificationMargin; m = CKEDITOR.document.getWindow(); var p = m.getScrollPosition(), t = m.getViewPaneSize(), q = CKEDITOR.document.getBody(), r = q.getDocumentPosition(), k = CKEDITOR.tools.cssLength; g && h || (m = this.element.getChild(0), g = this._notificationWidth = m.getClientRect().width, h = this._notificationMargin = parseInt(m.getComputedStyle("margin-left"),
                    10) + parseInt(m.getComputedStyle("margin-right"), 10)); c.toolbar && (f = c.ui.space("top"), l = f.getClientRect()); f && f.isVisible() && l.bottom > d.top && l.bottom < d.bottom - u.height ? a.setStyles({ position: "fixed", top: k(l.bottom) }) : 0 < d.top ? a.setStyles({ position: "absolute", top: k(e.y) }) : e.y + d.height - u.height > p.y ? a.setStyles({ position: "fixed", top: 0 }) : a.setStyles({ position: "absolute", top: k(e.y + d.height - u.height) }); var n = "fixed" == a.getStyle("position") ? d.left : "static" != q.getComputedStyle("position") ? e.x - r.x : e.x; d.width <
                        g + h ? e.x + g + h > p.x + t.width ? b() : a.setStyle("left", k(n)) : e.x + g + h > p.x + t.width ? a.setStyle("left", k(n)) : e.x + d.width / 2 + g / 2 + h > p.x + t.width ? a.setStyle("left", k(n - e.x + p.x + t.width - g - h)) : 0 > d.left + d.width - g - h ? b() : 0 > d.left + d.width / 2 - g / 2 ? a.setStyle("left", k(n - e.x + p.x)) : a.setStyle("left", k(n + d.width / 2 - g / 2 - h / 2))
            }
        }; CKEDITOR.plugins.notification = q
    })(); (function () {
        var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c +=
            ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var k = ""; CKEDITOR.env.ie && (k = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + k + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"') +
                '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', v = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), w = CKEDITOR.addTemplate("button", c); CKEDITOR.plugins.add("button", {
                    beforeInit: function (a) {
                        a.ui.addHandler(CKEDITOR.UI_BUTTON,
                            CKEDITOR.ui.button.handler)
                    }
                }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
                    render: function (a, b) {
                        function c() {
                            var f = a.mode; f && (f = this.modes[f] ? void 0 !== p[f] ? p[f] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, f = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED :
                                f, this.setState(f), this.refresh && this.refresh())
                        } var p = null, q = CKEDITOR.env, r = this._.id = CKEDITOR.tools.getNextId(), g = "", d = this.command, k, l, m; this._.editor = a; var e = { id: r, button: this, editor: a, focus: function () { CKEDITOR.document.getById(r).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }, x = CKEDITOR.tools.addFunction(function (a) { if (e.onkey) return a = new CKEDITOR.dom.event(a), !1 !== e.onkey(e, a.getKeystroke()) }), y = CKEDITOR.tools.addFunction(function (a) {
                            var b; e.onfocus &&
                                (b = !1 !== e.onfocus(e, new CKEDITOR.dom.event(a))); return b
                        }), u = 0; e.clickFn = k = CKEDITOR.tools.addFunction(function () { u && (a.unlockSelection(1), u = 0); e.execute(); q.iOS && a.focus() }); this.modes ? (p = {}, a.on("beforeModeUnload", function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (p[a.mode] = this._.state) }, this), a.on("activeFilterChange", c, this), a.on("mode", c, this), !this.readOnly && a.on("readOnly", c, this)) : d && (d = a.getCommand(d)) && (d.on("state", function () { this.setState(d.state) }, this), g += d.state == CKEDITOR.TRISTATE_ON ?
                            "on" : d.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var n; if (this.directional) a.on("contentDirChanged", function (b) { var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(); b = b.data; b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"); d.setAttribute("style", CKEDITOR.skin.getIconStyle(n, "rtl" == b, this.icon, this.iconOffset)) }, this); d ? (l = a.getCommandKeystroke(d)) && (m = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, l)) : g += "off"; l = this.name || this.command; var h =
                                null, t = this.icon; n = l; this.icon && !/\./.test(this.icon) ? (n = this.icon, t = null) : (this.icon && (h = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (h = this.iconHiDpi)); h ? (CKEDITOR.skin.addIcon(h, h), t = null) : h = n; g = {
                                    id: r, name: l, iconName: n, label: this.label, cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className || ""), state: g, ariaDisabled: "disabled" == g ? "true" : "false", title: this.title + (m ? " (" + m.display + ")" : ""), ariaShortcut: m ? a.lang.common.keyboardShortcut + " " + m.aria : "", titleJs: q.gecko && !q.hc ? "" : (this.title ||
                                        "").replace("'", ""), hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"), keydownFn: x, focusFn: y, clickFn: k, style: CKEDITOR.skin.getIconStyle(h, "rtl" == a.lang.dir, t, this.iconOffset), arrowHtml: this.hasArrow ? v.output() : ""
                                }; w.output(g, b); if (this.onRender) this.onRender(); return e
                    }, setState: function (a) {
                        if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"), b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED),
                            this.hasArrow ? b.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON) : a === CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
                    }, getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b }
                }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    })(); (function () {
        function D(a) {
            function d() { for (var b = f(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || v(a), n = 0; n < e.length; n++) { var g = e[n]; if ("/" != g) { "string" == typeof g && (g = e[n] = { name: g }); var l, d = g.groups; if (d) for (var h = 0; h < d.length; h++)l = d[h], (l = b[l]) && c(g, l); (l = b[g.name]) && c(g, l) } } return e } function f() {
                var b = {}, c, e, g; for (c in a.ui.items) e = a.ui.items[c], g = e.toolbar || "others", g = g.split(","), e = g[0], g = parseInt(g[1] || -1, 10), b[e] || (b[e] = []), b[e].push({ name: c, order: g }); for (e in b) b[e] = b[e].sort(function (b,
                    a) { return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1 }); return b
            } function c(c, e) { if (e.length) { c.items ? c.items.push(a.ui.create("-")) : c.items = []; for (var d; d = e.shift();)d = "string" == typeof d ? d : d.name, b && -1 != CKEDITOR.tools.indexOf(b, d) || (d = a.ui.create(d)) && a.addFeature(d) && c.items.push(d) } } function h(b) {
                var a = [], e, d, h; for (e = 0; e < b.length; ++e)d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
                    h.name = d.name, a.push(h)); return a
            } var b = a.config.removeButtons, b = b && b.split(","), e = a.config.toolbar; "string" == typeof e && (e = a.config["toolbar_" + e]); return a.toolbar = e ? h(e) : d()
        } function v(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, {
                name: "paragraph", groups: ["list",
                    "indent", "blocks", "align", "bidi"]
            }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        } var z = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; z.prototype.focus = function () { for (var a = 0, d; d = this.toolbars[a++];)for (var f = 0, c; c = d.items[f++];)if (c.focus) { c.focus(); return } }; var E = {
            modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
            a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () { a.toolbox.focus() },
                100) : a.toolbox.focus())
            }
        }; CKEDITOR.plugins.add("toolbar", {
            requires: "button", init: function (a) {
                var d, f = function (c, h) {
                    var b, e = "rtl" == a.lang.dir, k = a.config.toolbarGroupCycling, q = e ? 37 : 39, e = e ? 39 : 37, k = void 0 === k || k; switch (h) {
                        case 9: case CKEDITOR.SHIFT + 9: for (; !b || !b.items.length;)if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length) for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) ||
                            (b = 0); c && c.focus(); return !1; case q: b = c; do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus); b ? b.focus() : f(c, 9); return !1; case 40: return c.button && c.button.hasArrow ? c.execute() : f(c, 40 == h ? q : e), !1; case e: case 38: b = c; do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus); b ? b.focus() : (d = 1, f(c, CKEDITOR.SHIFT + 9), d = 0); return !1; case 27: return a.focus(), !1; case 13: case 32: return c.execute(), !1
                    }return !0
                }; a.on("uiSpace", function (c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new z; var d = CKEDITOR.tools.getNextId(), b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + a.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e'], d = !1 !== a.config.toolbarStartupExpanded, e, k; a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? "\x3e" : ' style\x3d"display:none"\x3e'));
                        for (var q = a.toolbox.toolbars, n = D(a), g = n.length, l = 0; l < g; l++) {
                            var r, m = 0, w, p = n[l], v = "/" !== p && ("/" === n[l + 1] || l == g - 1), x; if (p) if (e && (b.push("\x3c/span\x3e"), k = e = 0), "/" === p) b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                x = p.items || p; for (var y = 0; y < x.length; y++) {
                                    var t = x[y], A; if (t) {
                                        var B = function (c) { c = c.render(a, b); u = m.items.push(c) - 1; 0 < u && (c.previous = m.items[u - 1], c.previous.next = c); c.toolbar = m; c.onkey = f; c.onfocus = function () { a.toolbox.focusCommandExecuted || a.focus() } }; if (t.type == CKEDITOR.UI_SEPARATOR) k =
                                            e && t; else {
                                                A = !1 !== t.canGroup; if (!m) {
                                                    r = CKEDITOR.tools.getNextId(); m = { id: r, items: [] }; w = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name); b.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e'); w && b.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, "\x3c/span\x3e"); b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var u = q.push(m) - 1; 0 < u && (m.previous = q[u - 1], m.previous.next =
                                                        m)
                                                } A ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push("\x3c/span\x3e"), e = 0); k && (B(k), k = 0); B(t)
                                        }
                                    }
                                } e && (b.push("\x3c/span\x3e"), k = e = 0); m && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                            }
                        } a.config.toolbarCanCollapse && b.push("\x3c/span\x3e"); if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var C = CKEDITOR.tools.addFunction(function () { a.execCommand("toolbarCollapse") }); a.on("destroy", function () { CKEDITOR.tools.removeFunction(C) });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (b) {
                                    var a = b.ui.space("toolbar_collapser"), c = a.getPrevious(), d = b.ui.space("contents"), e = c.getParent(), h = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, f = a.hasClass("cke_toolbox_collapser_min"); f ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand)); a.getFirst().setText(f ? "▲" : "◀"); d.setStyle("height",
                                        h - (e.$.offsetHeight - g) + "px"); b.fire("resize", { outerHeight: b.container.$.offsetHeight, contentsHeight: d.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                                }, modes: { wysiwyg: 1, source: 1 }
                            }); a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser'); d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + C + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                        } b.push("\x3c/span\x3e"); c.data.html += b.join("")
                    }
                }); a.on("destroy", function () { if (this.toolbox) { var a, d = 0, b, e, f; for (a = this.toolbox.toolbars; d < a.length; d++)for (e = a[d].items, b = 0; b < e.length; b++)f = e[b], f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn), f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn) } }); a.on("uiReady", function () {
                    var c = a.ui.space("toolbox"); c && a.focusManager.add(c,
                        1)
                }); a.addCommand("toolbarFocus", E); a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); a.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); a.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, d) { d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
            }
        }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, d, f) {
            var c = v(this.editor), h = 0 === d, b = { name: a }; if (f) {
                if (f = CKEDITOR.tools.search(c, function (a) { return a.name == f })) {
                !f.groups && (f.groups = []); if (d &&
                    (d = CKEDITOR.tools.indexOf(f.groups, d), 0 <= d)) { f.groups.splice(d + 1, 0, a); return } h ? f.groups.splice(0, 0, a) : f.groups.push(a); return
                } d = null
            } d && (d = CKEDITOR.tools.indexOf(c, function (a) { return a.name == d })); h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })(); CKEDITOR.UI_SEPARATOR = "separator"; CKEDITOR.config.toolbarLocation = "top"; (function () {
        function r(a, b, c) { b.type || (b.type = "auto"); if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1; b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste", b) } function x(a) {
            function b() {
                var b = a.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var c = function (b) {
                        a.getSelection().isCollapsed() || (a.readOnly && "cut" == b.name || p.initPasteDataTransfer(b,
                            a), b.data.preventDefault())
                    }; b.on("copy", c); b.on("cut", c); b.on("cut", function () { a.readOnly || a.extractSelectedHtml() }, null, null, 999)
                } b.on(p.mainPasteEvent, function (a) { "beforepaste" == p.mainPasteEvent && n || k(a) }); "beforepaste" == p.mainPasteEvent && (b.on("paste", function (a) { v || (f(), a.data.preventDefault(), k(a), e("paste")) }), b.on("contextmenu", h, null, null, 0), b.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h() }, null, null, 0)); b.on("beforecut", function () { !n && g(a) }); var d; b.attachListener(CKEDITOR.env.ie ?
                    b : a.document.getDocumentElement(), "mouseup", function () { d = setTimeout(u, 0) }); a.on("destroy", function () { clearTimeout(d) }); b.on("keyup", u)
            } function c(b) { return { type: b, canUndo: "cut" == b, startDisabled: !0, fakeKeystroke: "cut" == b ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && g(); var b; var c = this.type; if (CKEDITOR.env.ie) b = e(c); else try { b = a.document.$.execCommand(c, !1, null) } catch (d) { b = !1 } b || a.showNotification(a.lang.clipboard[this.type + "Error"]); return b } } } function d() {
                return {
                    canUndo: !1,
                    async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (a, b) {
                        function c(b, g) { g = "undefined" !== typeof g ? g : !0; b ? (b.method = "paste", b.dataTransfer || (b.dataTransfer = p.initPasteDataTransfer()), r(a, b, g)) : e && !a._.forcePasteDialog && a.showNotification(f, "info", a.config.clipboard_notificationDuration); a._.forcePasteDialog = !1; a.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!b }) } b = "undefined" !== typeof b && null !== b ? b : {}; var d = this, e = "undefined" !== typeof b.notification ? b.notification : !0, g = b.type, m = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,
                            a.getCommandKeystroke(this)), f = "string" === typeof e ? e : a.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + m.aria + '"\x3e' + m.display + "\x3c/kbd\x3e"), m = "string" === typeof b ? b : b.dataValue; g && !0 !== a.config.forcePasteAsPlainText && "allow-word" !== a.config.forcePasteAsPlainText ? a._.nextPasteType = g : delete a._.nextPasteType; "string" === typeof m ? c({ dataValue: m }) : a.getClipboardData(c)
                    }
                }
            } function f() { v = 1; setTimeout(function () { v = 0 }, 100) } function h() { n = 1; setTimeout(function () { n = 0 }, 10) } function e(b) {
                var c =
                    a.document, d = c.getBody(), e = !1, g = function () { e = !0 }; d.on(b, g); 7 < CKEDITOR.env.version ? c.$.execCommand(b) : c.$.selection.createRange().execCommand(b); d.removeListener(b, g); return e
            } function g() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var b = a.getSelection(), c, d, e; b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement()) && (d = b.getRanges()[0], e = a.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), b.selectRanges([d]), setTimeout(function () { c.getParent() && (e.remove(), b.selectElement(c)) },
                        0))
                }
            } function l(b, c) {
                var d = a.document, e = a.editable(), g = function (a) { a.cancel() }, m; if (!d.getById("cke_pastebin")) {
                    var f = a.getSelection(), l = f.createBookmarks(); CKEDITOR.env.ie && f.root.fire("selectionchange"); var k = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d); k.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var h = 0, d = d.getWindow(); CKEDITOR.env.webkit ? (e.append(k), k.addClass("cke_editable"), e.is("body") || (h = "static" != e.getComputedStyle("position") ?
                        e : CKEDITOR.dom.element.get(e.$.offsetParent), h = h.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(k); k.setStyles({ position: "absolute", top: d.getScrollPosition().y - h + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 }); CKEDITOR.env.safari && k.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (h = k.getParent().isReadOnly()) ? (k.setOpacity(0), k.setAttribute("contenteditable", !0)) : k.setStyle("ltr" == a.config.contentsLangDirection ?
                            "left" : "right", "-10000px"); a.on("selectionChange", g, null, null, 0); if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) m = e.once("blur", g, null, null, -100); h && k.focus(); h = new CKEDITOR.dom.range(k); h.selectNodeContents(k); var u = h.select(); CKEDITOR.env.ie && (m = e.once("blur", function () { a.lockSelection(u) })); var q = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
                                CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = q); m && m.removeListener(); CKEDITOR.env.ie && e.focus(); f.selectBookmarks(l);
                                k.remove(); var b; CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span") && (k = b); a.removeListener("selectionChange", g); c(k.getHtml())
                            }, 0)
                }
            } function t() { if ("paste" == p.mainPasteEvent) return a.fire("beforePaste", { type: "auto", method: "paste" }), !1; a.focus(); f(); var b = a.focusManager; b.lock(); if (a.editable().fire(p.mainPasteEvent) && !e("paste")) return b.unlock(), !1; b.unlock(); return !0 } function m(b) {
                if ("wysiwyg" == a.mode) switch (b.data.keyCode) {
                    case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: b =
                        a.editable(); f(); "paste" == p.mainPasteEvent && b.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT + 46: a.fire("saveSnapshot"), setTimeout(function () { a.fire("saveSnapshot") }, 50)
                }
            } function k(b) {
                var c = { type: "auto", method: "paste", dataTransfer: p.initPasteDataTransfer(b) }; c.dataTransfer.cacheData(); var e = !1 !== a.fire("beforePaste", c); e && p.canClipboardApiBeTrusted(c.dataTransfer, a) ? (b.data.preventDefault(), setTimeout(function () { r(a, c) }, 0)) : l(b, function (b) {
                c.dataValue = b.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,
                    ""); e && r(a, c)
                })
            } function u() { if ("wysiwyg" == a.mode) { var b = q("paste"); a.getCommand("cut").setState(q("cut")); a.getCommand("copy").setState(q("copy")); a.getCommand("paste").setState(b); a.fire("pasteState", b) } } function q(b) {
                var c = a.getSelection(), c = c && c.getRanges()[0]; if ((a.readOnly || c && c.checkReadOnly()) && b in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == b) return CKEDITOR.TRISTATE_OFF; b = a.getSelection(); c = b.getRanges(); return b.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ?
                    CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            } var p = CKEDITOR.plugins.clipboard, n = 0, v = 0; (function () {
                a.on("key", m); a.on("contentDom", b); a.on("selectionChange", u); if (a.contextMenu) { a.contextMenu.addListener(function () { return { cut: q("cut"), copy: q("copy"), paste: q("paste") } }); var c = null; a.on("menuShow", function () { c && (c.removeListener(), c = null); var b = a.contextMenu.findItemByCommandName("paste"); b && b.element && (c = b.element.on("touchend", function () { a._.forcePasteDialog = !0 })) }) } if (a.ui.addButton) a.once("instanceReady",
                    function () { a._.pasteButtons && CKEDITOR.tools.array.forEach(a._.pasteButtons, function (b) { if (b = a.ui.get(b)) if (b = CKEDITOR.document.getById(b._.id)) b.on("touchend", function () { a._.forcePasteDialog = !0 }) }) })
            })(); (function () {
                function b(c, e, d, g, m) { var k = a.lang.clipboard[e]; a.addCommand(e, d); a.ui.addButton && a.ui.addButton(c, { label: k, command: e, toolbar: "clipboard," + g }); a.addMenuItems && a.addMenuItem(e, { label: k, command: e, group: "clipboard", order: m }) } b("Cut", "cut", c("cut"), 10, 1); b("Copy", "copy", c("copy"), 20, 4); b("Paste",
                    "paste", d(), 30, 8); a._.pasteButtons || (a._.pasteButtons = []); a._.pasteButtons.push("Paste")
            })(); a.getClipboardData = function (b, c) {
                function e(a) { a.removeListener(); a.cancel(); c(a.data) } function d(a) { a.removeListener(); a.cancel(); c({ type: m, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) } var g = !1, m = "auto"; c || (c = b, b = null); a.on("beforePaste", function (a) { a.removeListener(); g = !0; m = a.data.type }, null, null, 1E3); a.on("paste", e, null, null, 0); !1 === t() && (a.removeListener("paste", e), a._.forcePasteDialog &&
                    g && a.fire("pasteDialog") ? (a.on("pasteDialogCommit", d), a.on("dialogHide", function (a) { a.removeListener(); a.data.removeListener("pasteDialogCommit", d); a.data._.committed || c(null) })) : c(null))
            }
        } function y(a) {
            if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html";
            return "htmlifiedtext"
        } function z(a, b) {
            function c(a) { return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "") } b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"),
                b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) { return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + "\x3c/p\x3e")); return A(a, b)
        } function B(a) {
            function b() {
                var a =
                    {}, b; for (b in CKEDITOR.dtd) "$" != b.charAt(0) && "div" != b && "span" != b && (a[b] = 1); return a
            } var c = {}; return { get: function (d) { return "plain-text" == d ? c.plainText || (c.plainText = new CKEDITOR.filter(a, "br")) : "semantic-content" == d ? ((d = c.semanticContent) || (d = new CKEDITOR.filter(a, {}), d.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), d = c.semanticContent = d), d) : d ? new CKEDITOR.filter(a, d) : null } }
        } function w(a, b, c) {
            b = CKEDITOR.htmlParser.fragment.fromHtml(b); var d = new CKEDITOR.htmlParser.basicWriter; c.applyTo(b,
                !0, !1, a.activeEnterMode); b.writeHtml(d); return d.getHtml()
        } function A(a, b) { a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b } function C(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function D(a) {
            var b = CKEDITOR.plugins.clipboard; a.on("contentDom", function () {
                function c(b, c, e) {
                    c.select(); r(a, {
                        dataTransfer: e,
                        method: "drop"
                    }, 1); e.sourceEditor.fire("saveSnapshot"); e.sourceEditor.editable().extractHtmlFromRange(b); e.sourceEditor.getSelection().selectRanges([b]); e.sourceEditor.fire("saveSnapshot")
                } function d(c, e) { c.select(); r(a, { dataTransfer: e, method: "drop" }, 1); b.resetDragDataTransfer() } function f(b, c, e) { var d = { $: b.data.$, target: b.data.getTarget() }; c && (d.dragRange = c); e && (d.dropRange = e); !1 === a.fire(b.name, d) && b.data.preventDefault() } function h(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() }
                var e = a.editable(), g = CKEDITOR.plugins.clipboard.getDropTarget(a), l = a.ui.space("top"), t = a.ui.space("bottom"); b.preventDefaultDropOnElement(l); b.preventDefaultDropOnElement(t); e.attachListener(g, "dragstart", f); e.attachListener(a, "dragstart", b.resetDragDataTransfer, b, null, 1); e.attachListener(a, "dragstart", function (c) { b.initDragDataTransfer(c, a) }, null, null, 2); e.attachListener(a, "dragstart", function () {
                    var c = b.dragRange = a.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (b.dragStartContainerChildCount =
                        c ? h(c.startContainer) : null, b.dragEndContainerChildCount = c ? h(c.endContainer) : null)
                }, null, null, 100); e.attachListener(g, "dragend", f); e.attachListener(a, "dragend", b.initDragDataTransfer, b, null, 1); e.attachListener(a, "dragend", b.resetDragDataTransfer, b, null, 100); e.attachListener(g, "dragover", function (a) {
                    if (CKEDITOR.env.edge) a.data.preventDefault(); else {
                        var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") &&
                            a.data.preventDefault()
                    }
                }); e.attachListener(g, "drop", function (c) { if (!c.data.$.defaultPrevented && (c.data.preventDefault(), !a.readOnly)) { var e = c.data.getTarget(); if (!e.isReadOnly() || e.type == CKEDITOR.NODE_ELEMENT && e.is("html")) { var e = b.getRangeAtDropPosition(c, a), d = b.dragRange; e && f(c, d, e) } } }, null, null, 9999); e.attachListener(a, "drop", b.initDragDataTransfer, b, null, 1); e.attachListener(a, "drop", function (e) {
                    if (e = e.data) {
                        var g = e.dropRange, f = e.dragRange, l = e.dataTransfer; l.getTransferType(a) == CKEDITOR.DATA_TRANSFER_INTERNAL ?
                            setTimeout(function () { b.internalDrop(f, g, l, a) }, 0) : l.getTransferType(a) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(f, g, l) : d(g, l)
                    }
                }, null, null, 9999)
            })
        } var n; CKEDITOR.plugins.add("clipboard", {
            requires: "dialog,notification,toolbar", init: function (a) {
                function b(a) { if (!a || h === a.id) return !1; var b = a.getTypes(), b = 1 === b.length && "Files" === b[0]; a = 1 === a.getFilesCount(); return b && a } var c, d = B(a); a.config.forcePasteAsPlainText ? c = "plain-text" : a.config.pasteFilter ? c = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in
                    a.config || (c = "semantic-content"); a.pasteFilter = d.get(c); x(a); D(a); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); if (CKEDITOR.env.gecko) {
                        var f = ["image/png", "image/jpeg", "image/gif"], h; a.on("paste", function (c) {
                            var d = c.data, l = d.dataTransfer; if (!d.dataValue && "paste" == d.method && b(l) && (l = l.getFile(0), -1 != CKEDITOR.tools.indexOf(f, l.type))) {
                                var t = new FileReader; t.addEventListener("load", function () { c.data.dataValue = '\x3cimg src\x3d"' + t.result + '" /\x3e'; a.fire("paste", c.data) }, !1);
                                t.addEventListener("abort", function () { a.fire("paste", c.data) }, !1); t.addEventListener("error", function () { a.fire("paste", c.data) }, !1); t.readAsDataURL(l); h = d.dataTransfer.id; c.stop()
                            }
                        }, null, null, 1)
                    } a.on("paste", function (b) {
                        b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) {
                            var c = b.data.dataTransfer, d = c.getData("text/html"); if (d) b.data.dataValue = d, b.data.type = "html"; else if (d = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d),
                                b.data.type = "text"
                        }
                    }, null, null, 1); a.on("paste", function (a) {
                        var b = a.data.dataValue, c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/,
                            "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var d, f, h = new CKEDITOR.dom.element("div"); for (h.setHtml(b); 1 == h.getChildCount() && (d = h.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));)h = f = d; f && (b = f.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) { return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/,
                                function (b, d) { return d in c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                    }, null, null, 3); a.on("paste", function (b) {
                        b = b.data; var c = a._.nextPasteType || b.type, f = b.dataValue, h, m = a.config.clipboard_defaultContentType || "html", k = b.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_EXTERNAL, n = !0 === a.config.forcePasteAsPlainText; h = "html" == c || "html" == b.preSniffing ? "html" : y(f); delete a._.nextPasteType; "htmlifiedtext" == h && (f = z(a.config, f));
                        if ("text" == c && "html" == h) f = w(a, f, d.get("plain-text")); else if (k && a.pasteFilter && !b.dontFilter || n) f = w(a, f, a.pasteFilter); b.startsWithEOL && (f = '\x3cbr data-cke-eol\x3d"1"\x3e' + f); b.endsWithEOL && (f += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == c && (c = "html" == h || "html" == m ? "html" : "text"); b.type = c; b.dataValue = f; delete b.preSniffing; delete b.startsWithEOL; delete b.endsWithEOL
                    }, null, null, 6); a.on("paste", function (b) {
                        b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") },
                            0))
                    }, null, null, 1E3); a.on("pasteDialog", function (b) { setTimeout(function () { a.openDialog("paste", b.data) }, 0) })
            }
        }); CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: CKEDITOR.env.ie && 16 > CKEDITOR.env.version || CKEDITOR.env.iOS && 605 > CKEDITOR.env.version ? !1 : !0, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste", addPasteButton: function (a, b, c) {
                a.ui.addButton &&
                (a.ui.addButton(b, c), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b))
            }, canClipboardApiBeTrusted: function (a, b) { return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.iOS && 605 <= CKEDITOR.env.version || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1 }, getDropTarget: function (a) {
                var b = a.editable(); return CKEDITOR.env.ie &&
                    9 > CKEDITOR.env.version || b.isInline() ? b : a.document
            }, fixSplitNodesAfterDrop: function (a, b, c, d) {
                function f(a, c, d) { var f = a; f.type == CKEDITOR.NODE_TEXT && (f = a.getParent()); if (f.equals(c) && d != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0 } var h = b.startContainer; "number" == typeof d && "number" ==
                    typeof c && h.type == CKEDITOR.NODE_ELEMENT && (f(a.startContainer, h, c) || f(a.endContainer, h, d))
            }, isDropRangeAffectedByDragRange: function (a, b) { var c = b.startContainer, d = b.endOffset; return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1 }, internalDrop: function (a, b, c, d) {
                var f = CKEDITOR.plugins.clipboard, h = d.editable(), e, g; d.fire("saveSnapshot"); d.fire("lockSnapshot", { dontUpdate: 1 });
                CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(a, b, f.dragStartContainerChildCount, f.dragEndContainerChildCount); (g = this.isDropRangeAffectedByDragRange(a, b)) || (e = a.createBookmark(!1)); f = b.clone().createBookmark(!1); g && (e = a.createBookmark(!1)); a = e.startNode; b = e.endNode; g = f.startNode; b && a.getPosition(g) & CKEDITOR.POSITION_PRECEDING && b.getPosition(g) & CKEDITOR.POSITION_FOLLOWING && g.insertBefore(a); a = d.createRange(); a.moveToBookmark(e); h.extractHtmlFromRange(a, 1); b = d.createRange();
                f.startNode.getCommonAncestor(h) || (f = d.getSelection().createBookmarks()[0]); b.moveToBookmark(f); r(d, { dataTransfer: c, method: "drop", range: b }, 1); d.fire("unlockSnapshot")
            }, getRangeAtDropPosition: function (a, b) {
                var c = a.data.$, d = c.clientX, f = c.clientY, h = b.getSelection(!0).getRanges()[0], e = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, f)) c = b.document.$.caretRangeFromPoint(d, f), e.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset),
                    e.collapse(!0); else if (c.rangeParent) e.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), e.collapse(!0); else {
                        if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && h && b.editable().hasFocus) return h; if (document.body.createTextRange) {
                            b.focus(); c = b.document.getBody().$.createTextRange(); try {
                                for (var g = !1, l = 0; 20 > l && !g; l++) { if (!g) try { c.moveToPoint(d, f - l), g = !0 } catch (n) { } if (!g) try { c.moveToPoint(d, f + l), g = !0 } catch (m) { } } if (g) {
                                    var k = "cke-temp-" + (new Date).getTime(); c.pasteHTML('\x3cspan id\x3d"' + k + '"\x3e​\x3c/span\x3e');
                                    var u = b.document.getById(k); e.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START); u.remove()
                                } else { var q = b.document.$.elementFromPoint(d, f), p = new CKEDITOR.dom.element(q), r; if (p.equals(b.editable()) || "html" == p.getName()) return h && h.startContainer && !h.startContainer.equals(b.editable()) ? h : null; r = p.getClientRect(); d < r.left ? e.setStartAt(p, CKEDITOR.POSITION_AFTER_START) : e.setStartAt(p, CKEDITOR.POSITION_BEFORE_END); e.collapse(!0) }
                            } catch (v) { return null }
                        } else return null
                    } return e
            }, initDragDataTransfer: function (a,
                b) { var c = a.data.$ ? a.data.$.dataTransfer : null, d = new this.dataTransfer(c, b); "dragstart" === a.name && d.storeId(); c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d; a.data.dataTransfer = d }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) {
                    if (this.isCustomCopyCutSupported) {
                        if (a && a.data && a.data.$) {
                            var c = a.data.$.clipboardData, d = new this.dataTransfer(c, b); "copy" !== a.name && "cut" !== a.name || d.storeId(); this.copyCutData &&
                                d.id == this.copyCutData.id ? (d = this.copyCutData, d.$ = c) : this.copyCutData = d; return d
                        } return new this.dataTransfer(null, b)
                    } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
                }, preventDefaultDropOnElement: function (a) { a && a.on("dragover", C) }
        }; n = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
            a && (this.$ = a); this._ = {
                metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\s*\x3c!--StartFragment--\x3e|\x3c!--EndFragment--\x3e\s*/g,
                data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a }
            }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this); this.id = this.getData(n); this.id || (this.id = "Text" == n ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == n || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
        }; CKEDITOR.DATA_TRANSFER_INTERNAL =
            1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function (a, b) {
                    a = this._.normalizeType(a); var c = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a]; if (void 0 === c || null === c || "" === c) { if (this._.fallbackDataTransfer.isRequired()) c = this._.fallbackDataTransfer.getData(a, b); else try { c = this.$.getData(a) || "" } catch (d) { c = "" } "text/html" != a || b || (c = this._stripHtml(c)) } "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" ==
                        c.substring(0, 7) && (c = ""); if ("string" === typeof c) var f = c.indexOf("\x3c/html\x3e"), c = -1 !== f ? c.substring(0, f + 7) : c; return c
                }, setData: function (a, b) { a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == n && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try { this.$.setData(a, b) } catch (c) { } }, storeId: function () {
                "Text" !==
                    n && this.setData(n, this.id)
                }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL }, cacheData: function () {
                    function a(a) { a = b._.normalizeType(a); var c = b.getData(a); "text/html" == a && (b._.nativeHtmlCache = b.getData(a, !0), c = b._stripHtml(c)); c && (b._.data[a] = c) } if (this.$) {
                        var b = this, c, d; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (c = 0; c < this.$.types.length; c++)a(this.$.types[c]) } else a("Text"),
                            a("URL"); d = this._getImageFromClipboard(); if (this.$ && this.$.files || d) { this._.files = []; if (this.$.files && this.$.files.length) for (c = 0; c < this.$.files.length; c++)this._.files.push(this.$.files[c]); 0 === this._.files.length && d && this._.files.push(d) }
                    }
                }, getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) {
                    return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ?
                        this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0
                }, isEmpty: function () { var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (var c = 0; c < this.$.types.length; c++)a[this.$.types[c]] = 1 } else a.Text = 1, a.URL = 1; "Text" != n && (a[n] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0 }, getTypes: function () {
                    return this.$ && this.$.types ?
                        [].slice.call(this.$.types) : []
                }, _getImageFromClipboard: function () { var a; try { if (this.$ && this.$.items && this.$.items[0] && (a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) { if (a && a.length) { a = a.replace(this._.metaRegExp, ""); var b = this._.bodyRegExp.exec(a); b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, "")) } return a }
            }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported =
                null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                    isRequired: function () {
                        var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null === a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (c) { } } else return !1;
                        return !a._isCustomMimeTypeSupported
                    }, getData: function (a, b) { var c = this._getData(this._customDataFallbackType, !0); if (b) return c; var c = this._extractDataComment(c), d = null, d = a === this._customDataFallbackType ? c.content : c.data && c.data[a] ? c.data[a] : this._getData(a, !0); return null !== d ? d : "" }, setData: function (a, b) {
                        var c = a === this._customDataFallbackType; c && (b = this._applyDataComment(b, this._getFallbackTypeData())); var d = b, f = this._dataTransfer.$; try { f.setData(a, d), c && (this._dataTransfer._.nativeHtmlCache = d) } catch (h) {
                            if (this._isUnsupportedMimeTypeError(h)) {
                                c =
                                CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(c._customTypes, a) && c._customTypes.push(a); var c = this._getFallbackTypeContent(), e = this._getFallbackTypeData(); e[a] = d; try { d = this._applyDataComment(c, e), f.setData(this._customDataFallbackType, d), this._dataTransfer._.nativeHtmlCache = d } catch (g) { d = "" }
                            }
                        } return d
                    }, _getData: function (a, b) { var c = this._dataTransfer._.data; if (!b && c[a]) return c[a]; try { return this._dataTransfer.$.getData(a) } catch (d) { return null } }, _getFallbackTypeContent: function () {
                        var a =
                            this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a
                    }, _getFallbackTypeData: function () { var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, c = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== c[a] ? b[a] = c[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b }, _isUnsupportedMimeTypeError: function (a) {
                        return a.message &&
                            -1 !== a.message.search(/element not found/gi)
                    }, _extractDataComment: function (a) { var b = { data: null, content: a || "" }; if (a && 16 < a.length) { var c; (c = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && c[1] && (b.data = JSON.parse(decodeURIComponent(c[1])), b.content = a.replace(c[0], "")) } return b }, _applyDataComment: function (a, b) { var c = ""; b && CKEDITOR.tools.object.keys(b).length && (c = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return c + (a && a.length ? a : "") }
                }
    })();
    CKEDITOR.config.clipboard_notificationDuration = 1E4; (function () {
        CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, b) { b && CKEDITOR.tools.extend(this, b); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} } }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var g = CKEDITOR.addTemplate("panel",
            '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), h = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), k = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
        CKEDITOR.ui.panel.prototype = {
            render: function (a, b) {
                var e = { editorId: a.id, id: this.id, langCode: a.langCode, dir: a.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": a.config.baseFloatZIndex + 1 }; this.getHolderElement = function () {
                    var a = this._.holder; if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
                            this.isLoaded =
                                !0; if (this.onLoad) this.onLoad()
                            }, this)); a.write(k.output(CKEDITOR.tools.extend({ css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");" }, e))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) {
                                var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir"); if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() :
                                    (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                            }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                        } else a = this.document.getById(this.id); this._.holder = a
                    } return a
                }; if (this.isFramed) {
                    var d = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; e.frame = h.output({
                        id: this.id + "_frame",
                        src: d
                    })
                } d = g.output(e); b && b.push(d); return d
            }, addBlock: function (a, b) { b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b); this._.currentBlock || this.showBlock(a); return b }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) {
                a = this._.blocks[a]; var b = this._.currentBlock, e = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", e); a._.focusIndex =
                    -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a
            }, destroy: function () { this.element && this.element.remove() }
        }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function (a, b) {
            this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({
                role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title ||
                    this.attributes["aria-label"]
            }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu()
            }, _: {
                markItem: function (a) { -1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a)) }, markFirstDisplayed: function (a) {
                    for (var b = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, e = this._.getItems(), d, c, f = e.count() - 1; 0 <= f; f--)if (d = e.getItem(f), d.getAscendant(b) || (c = d, this._.focusIndex =
                        f), "true" == d.getAttribute("aria-selected")) { c = d; this._.focusIndex = f; break } c && (a && a(), CKEDITOR.env.webkit && c.getDocument().getWindow().focus(), c.focus(), this.onMark && this.onMark(c))
                }, getItems: function () { return this.element.find("a,input") }
            }, proto: {
                show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, b) {
                    var e = this.keys[a]; switch (e) {
                        case "next": for (var d = this._.focusIndex, e = this._.getItems(),
                            c; c = e.getItem(++d);)if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = d; c.focus(!0); break } return c || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case "prev": d = this._.focusIndex; for (e = this._.getItems(); 0 < d && (c = e.getItem(--d));) { if (c.getAttribute("_cke_focus") && c.$.offsetWidth) { this._.focusIndex = d; c.focus(!0); break } c = null } return c || b ? !1 : (this._.focusIndex = e.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return d = this._.focusIndex, (c = 0 <= d && this._.getItems().getItem(d)) &&
                                c.fireEventHandler(e, { button: CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0) }), !1
                    }return !0
                }
            }
        })
    })(); CKEDITOR.plugins.add("floatpanel", { requires: "panel" });
    (function () {
        function v(a, b, c, m, h) { h = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || "", m.css || "", h || ""); var g = f[h]; g || (g = f[h] = new CKEDITOR.ui.panel(b, m), g.element = c.append(CKEDITOR.dom.element.createFromHtml(g.render(a), b)), g.element.setStyles({ display: "none", position: "absolute" })); return g } var f = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (a, b, c, m) {
                function h() { e.hide() } c.forceIFrame = 1; c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
                    (b = CKEDITOR.document.getById("cke_" + a.name)); var g = b.getDocument(); m = v(a, g, b, c, m || 0); var n = m.element, l = n.getFirst(), e = this; n.disableContextMenu(); this.element = n; this._ = { editor: a, panel: m, parentElement: b, definition: c, document: g, iframe: l, children: [], dir: a.lang.dir, showBlockParams: null, markFirst: void 0 !== c.markFirst ? c.markFirst : !0 }; a.on("mode", h); a.on("resize", h); g.getWindow().on("resize", function () { this.reposition() }, this)
            }, proto: {
                addBlock: function (a, b) { return this._.panel.addBlock(a, b) }, addListBlock: function (a,
                    b) { return this._.panel.addListBlock(a, b) }, getBlock: function (a) { return this._.panel.getBlock(a) }, showBlock: function (a, b, c, m, h, g) {
                        var n = this._.panel, l = n.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var e = this._.editor.editable(); this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var k = this.element, e = this._.iframe, e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow), f = k.getDocument(),
                            r = this._.parentElement.getPositionedAncestor(), t = b.getDocumentPosition(f), f = r ? r.getDocumentPosition(f) : { x: 0, y: 0 }, q = "rtl" == this._.dir, d = t.x + (m || 0) - f.x, p = t.y + (h || 0) - f.y; !q || 1 != c && 4 != c ? q || 2 != c && 3 != c || (d += b.$.offsetWidth - 1) : d += b.$.offsetWidth; if (3 == c || 4 == c) p += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); k.setStyles({ top: p + "px", left: 0, display: "" }); k.setOpacity(0); k.getFirst().removeStyle("width"); this._.editor.focusManager.add(e); this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur",
                                function (a) { function u() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(u, 0, this)) : u.call(this)) }, this), e.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (e.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), e.on("touchend", function () {
                                    this._.hideTimeout =
                                    0; this.focus()
                                }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); n.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this); CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.tools.bind(function () {
                                        var a = k; a.removeStyle("width"); if (l.autoSize) {
                                            var b = l.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? l.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width",
                                                b + 10 + "px"); b = l.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3); a.setStyle("height", b + "px"); n._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                        } else a.removeStyle("height"); q && (d -= k.$.offsetWidth); k.setStyle("left", d + "px"); var b = n.element.getWindow(), a = k.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, e = a.height || a.bottom - a.top, m = q ? a.right : b.width - a.left, h = q ? b.width - a.right : a.left;
                                        q ? m < c && (d = h > c ? d + c : b.width > c ? d - a.left : d - a.right + b.width) : m < c && (d = h > c ? d - c : b.width > c ? d - a.right + b.width : d - a.left); c = a.top; b.height - a.top < e && (p = c > e ? p - e : b.height > e ? p - a.bottom + b.height : p - a.top); CKEDITOR.env.ie && !CKEDITOR.env.edge && ((b = a = k.$.offsetParent && new CKEDITOR.dom.element(k.$.offsetParent)) && "html" == b.getName() && (b = b.getDocument().getBody()), b && "rtl" == b.getComputedStyle("direction") && (d = CKEDITOR.env.ie8Compat ? d - 2 * k.getDocument().getDocumentElement().$.scrollLeft : d - (a.$.scrollWidth - a.$.clientWidth)));
                                        var a = k.getFirst(), f; (f = a.getCustomData("activePanel")) && f.onHide && f.onHide.call(this, 1); a.setCustomData("activePanel", this); k.setStyles({ top: p + "px", left: d + "px" }); k.setOpacity(1); g && g()
                                    }, this); n.isLoaded ? a() : n.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                        var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); l.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); this._.markFirst && (CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () {
                                            l.markFirstDisplayed ?
                                            l.markFirstDisplayed() : l._.markFirstDisplayed()
                                        }, 0) : l.markFirstDisplayed ? l.markFirstDisplayed() : l._.markFirstDisplayed()); this._.editor.fire("panelShow", this)
                                    }, 0, this)
                                }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                    }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () {
                        if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() } (this._.lastFocused ||
                            this._.iframe.getFrameDocument().getWindow()).focus()
                    }, blur: function () { var a = this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused = a) }, hide: function (a) {
                        if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                            this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(),
                                a.focus(); delete this._.lastFocused; this._.showBlockParams = null; this._.editor.fire("panelHide", this)
                        }
                    }, allowBlur: function (a) { var b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur }, showAsChild: function (a, b, c, f, h, g) {
                        if (this._.activeChild != a || a._.panel._.offsetParentId != c.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, f, h, g), this.blur(),
                            (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { a.element.getChild(0).$.style.cssText += "" }, 100)
                    }, hideChild: function (a) { var b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
            }
        }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b; for (b in f) { var c = f[b]; a ? c.destroy() : c.element.hide() } a && (f = {}) })
    })(); CKEDITOR.plugins.add("menu", { requires: "floatpanel", beforeInit: function (m) { for (var k = m.config.menu_groups.split(","), n = m._.menuGroups = {}, r = m._.menuItems = {}, p = 0; p < k.length; p++)n[k[p]] = p + 1; m.addMenuGroup = function (c, a) { n[c] = a || 100 }; m.addMenuItem = function (c, a) { n[a.group] && (r[c] = new CKEDITOR.menuItem(this, c, a)) }; m.addMenuItems = function (c) { for (var a in c) this.addMenuItem(a, c[a]) }; m.getMenuItem = function (c) { return r[c] }; m.removeMenuItem = function (c) { delete r[c] } } });
    (function () {
        function m(a) { a.sort(function (a, f) { return a.group < f.group ? -1 : a.group > f.group ? 1 : a.order < f.order ? -1 : a.order > f.order ? 1 : 0 }) } var k = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{attrLabel}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"',
            n = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (k += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (k += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); CKEDITOR.env.ie && (n = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var k = k + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"' + n + 'CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e') +
                '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', r = CKEDITOR.addTemplate("menuItem", k), p = CKEDITOR.addTemplate("menuArrow",
                    '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), c = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                        $: function (a, b) {
                            b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var f = CKEDITOR.tools.extend({}, b.panel, {
                                css: [CKEDITOR.skin.getPath("editor")], level: this._.level -
                                    1, block: {}
                            }), c = f.block.attributes = f.attributes || {}; !c.role && (c.role = "menu"); this._.panelDefinition = f
                        }, _: {
                            onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), f = this.editor.elementPath(), c = this._.listeners; this.removeAll(); for (var h = 0; h < c.length; h++) { var l = c[h](b, a, f); if (l) for (var g in l) { var e = this.editor.getMenuItem(g); !e || e.command && !this.editor.getCommand(e.command).state || (e.state = l[g], this.add(e)) } } }, onClick: function (a) {
                                this.hide(); if (a.onClick) a.onClick(); else a.command &&
                                    this.editor.execCommand(a.command)
                            }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                                var b = this._.subMenu, f = this.items[a]; if (f = f.getItems && f.getItems()) {
                                    b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var c in f) {
                                        var h = this.editor.getMenuItem(c);
                                        h && (h.state = f[c], b.add(h))
                                    } var l = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(l, 2) }, 0)
                                } else this._.panel.hideChild(1)
                            }
                        }, proto: {
                            add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (a, b, f, c) {
                                if (!this.parent && (this._.onShow(), !this.items.length)) return; b = b || ("rtl" == this.editor.lang.dir ? 2 : 1); var h = this.items, l = this.editor, g = this._.panel, e = this._.element; if (!g) {
                                    g = this._.panel =
                                    new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); g.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); g.onShow = function () { g._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; g.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); e = g.addBlock(this.id, this._.panelDefinition.block); e.autoSize = !0; var d = e.keys; d[40] = "next"; d[9] = "next"; d[38] = "prev"; d[CKEDITOR.SHIFT +
                                        9] = "prev"; d["rtl" == l.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; d[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (d[13] = "mouseup"); e = this._.element = e.element; d = e.getDocument(); d.getBody().setStyle("overflow", "hidden"); d.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, l.config.menu_subMenuDelay || 400, this, [a]) },
                                            this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                                } m(h); for (var d = l.elementPath(), d = ['\x3cdiv class\x3d"cke_menu' + (d && d.direction() != l.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], k = h.length, n = k && h[0].group, p = 0; p < k; p++) {
                                    var q =
                                        h[p]; n != q.group && (d.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), n = q.group); q.render(this, p, d)
                                } d.push("\x3c/div\x3e"); e.setHtml(d.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(g, this.id, a, b, f, c) : g.showBlock(this.id, a, b, f, c); l.fire("menuShow", [g])
                            }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                                var b = CKEDITOR.tools.array.filter(this.items,
                                    function (b) { return a === b.command }); return b.length ? (b = b[0], { item: b, element: this._.element.findOne("." + b.className) }) : null
                            }
                        }
                    }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                        $: function (a, b, c) { CKEDITOR.tools.extend(this, c, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                            render: function (a, b, f) {
                                var k = a.id + String(b), h = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, l = "", g = this.editor, e, d, m = h == CKEDITOR.TRISTATE_ON ? "on" : h == CKEDITOR.TRISTATE_DISABLED ?
                                    "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (l = ' aria-checked\x3d"' + (h == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var n = this.getItems, t = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", q = this.name; this.icon && !/\./.test(this.icon) && (q = this.icon); this.command && (e = g.getCommand(this.command), (e = g.getCommandKeystroke(e)) && (d = CKEDITOR.tools.keystrokeToString(g.lang.common.keyboard, e))); e = CKEDITOR.tools.htmlEncodeAttr(this.label); a = {
                                        id: k, name: this.name, iconName: q, label: this.label,
                                        attrLabel: e, cls: this.className || "", state: m, hasPopup: n ? "true" : "false", disabled: h == CKEDITOR.TRISTATE_DISABLED, title: e + (d ? " (" + d.display + ")" : ""), ariaShortcut: d ? g.lang.common.keyboardShortcut + " " + d.aria : "", href: "javascript:void('" + (e || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: b, iconStyle: CKEDITOR.skin.getIconStyle(q, "rtl" == this.editor.lang.dir, q == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: d ? c.output({ shortcut: d.display }) : "", arrowHtml: n ?
                                            p.output({ label: t }) : "", role: this.role ? this.role : "menuitem", ariaChecked: l
                                    }; r.output(a, f)
                            }
                        }
                    })
    })(); CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div"; CKEDITOR.plugins.add("contextmenu", {
        requires: "menu", onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (a) { this.base.call(this, a, { panel: { css: a.config.contextmenu_contentsCss, className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options } } }) }, proto: {
                    addTarget: function (a, f) {
                        function c() { e = !1 } var d, e; a.on("contextmenu", function (a) {
                            a = a.data; var b = CKEDITOR.env.webkit ? d : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!f || !b) if (a.preventDefault(),
                                !e) {
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) { var b = this.editor, c = (new CKEDITOR.dom.elementPath(a.getTarget(), b.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); c && "false" == c.getAttribute("contenteditable") && b.getSelection().fake(c) } var c = a.getTarget().getDocument(), g = a.getTarget().getDocument().getDocumentElement(), b = !c.equals(CKEDITOR.document), c = c.getWindow().getScrollPosition(), h = b ? a.$.clientX : a.$.pageX || c.x + a.$.clientX, k = b ? a.$.clientY : a.$.pageY || c.y + a.$.clientY;
                                CKEDITOR.tools.setTimeout(function () { this.open(g, null, h, k) }, CKEDITOR.env.ie ? 200 : 0, this)
                            }
                        }, this); if (CKEDITOR.env.webkit) { var b = function () { d = 0 }; a.on("keydown", function (a) { d = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", b); a.on("contextmenu", b) } CKEDITOR.env.gecko && !CKEDITOR.env.mac && (a.on("keydown", function (a) { a.data.$.shiftKey && 121 === a.data.$.keyCode && (e = !0) }, null, null, 0), a.on("keyup", c), a.on("contextmenu", c))
                    }, open: function (a, f, c, d) {
                    !1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !==
                        CKEDITOR.SELECTION_NONE && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, f, c, d))
                    }
                }
            })
        }, beforeInit: function (a) {
            var f = a.contextMenu = new CKEDITOR.plugins.contextMenu(a); a.on("contentDom", function () { f.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl) }); a.addCommand("contextMenu", {
                exec: function (a) {
                    var d = 0, e = 0, b = a.getSelection().getRanges(), b = b[b.length - 1].getClientRects(a.editable().isInline()); if (b = b[b.length - 1]) d = b["rtl" === a.lang.dir ?
                        "left" : "right"], e = b.bottom; a.contextMenu.open(a.document.getBody().getParent(), null, d, e)
                }
            }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    }); CKEDITOR.plugins.add("resize", {
        init: function (b) {
            function f(d) { var e = c.width, m = c.height, f = e + (d.data.$.screenX - n.x) * ("rtl" == g ? -1 : 1); d = m + (d.data.$.screenY - n.y); h && (e = Math.max(a.resize_minWidth, Math.min(f, a.resize_maxWidth))); p && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight))); b.resize(h ? e : null, m) } function k() {
                CKEDITOR.document.removeListener("mousemove", f); CKEDITOR.document.removeListener("mouseup", k); b.document && (b.document.removeListener("mousemove", f), b.document.removeListener("mouseup",
                    k))
            } var a = b.config, r = b.ui.spaceId("resizer"), g = b.element ? b.element.getDirection(1) : "ltr"; !a.resize_dir && (a.resize_dir = "vertical"); void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3); void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3); void 0 === a.resize_minWidth && (a.resize_minWidth = 750); void 0 === a.resize_minHeight && (a.resize_minHeight = 250); if (!1 !== a.resize_enabled) {
                var l = null, n, c, h = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth, p = ("both" == a.resize_dir || "vertical" ==
                    a.resize_dir) && a.resize_minHeight != a.resize_maxHeight, q = CKEDITOR.tools.addFunction(function (d) { l || (l = b.getResizable()); c = { width: l.$.offsetWidth || 0, height: l.$.offsetHeight || 0 }; n = { x: d.screenX, y: d.screenY }; a.resize_minWidth > c.width && (a.resize_minWidth = c.width); a.resize_minHeight > c.height && (a.resize_minHeight = c.height); CKEDITOR.document.on("mousemove", f); CKEDITOR.document.on("mouseup", k); b.document && (b.document.on("mousemove", f), b.document.on("mouseup", k)); d.preventDefault && d.preventDefault() }); b.on("destroy",
                        function () { CKEDITOR.tools.removeFunction(q) }); b.on("uiSpace", function (a) { if ("bottom" == a.data.space) { var e = ""; h && !p && (e = " cke_resizer_horizontal"); !h && p && (e = " cke_resizer_vertical"); var c = '\x3cspan id\x3d"' + r + '" class\x3d"cke_resizer' + e + " cke_resizer_" + g + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event)"\x3e' + ("ltr" == g ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == g && "ltr" == e ? a.data.html += c : a.data.html = c + a.data.html } }, b, null, 100); b.on("maximize",
                            function (a) { b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
            }
        }
    }); (function () {
        function q(a, c) {
            function k(b) { b = h.list[b]; var e; b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (e = a.createRange(), e.selectNodeContents(b), e = e.select()) : (e = a.getSelection(), e.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange", { selection: e, path: new CKEDITOR.dom.elementPath(b) }); a.focus() } function l() { m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete h.list } var n = a.ui.spaceId("path"), m, h = a._.elementsPath, q = h.idBase; c.html += '\x3cspan id\x3d"' +
                n + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + n + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + n + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); h.onClick = k; var v = CKEDITOR.tools.addFunction(k), w = CKEDITOR.tools.addFunction(function (b, e) {
                    var g = h.idBase, d; e = new CKEDITOR.dom.event(e); d = "rtl" == a.lang.dir; switch (e.getKeystroke()) {
                        case d ?
                            39 : 37: case 9: return (d = CKEDITOR.document.getById(g + (b + 1))) || (d = CKEDITOR.document.getById(g + "0")), d.focus(), !1; case d ? 37 : 39: case CKEDITOR.SHIFT + 9: return (d = CKEDITOR.document.getById(g + (b - 1))) || (d = CKEDITOR.document.getById(g + (h.list.length - 1))), d.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return k(b), !1
                    }return !0
                }); a.on("selectionChange", function (b) {
                    for (var e = [], g = h.list = [], d = [], c = h.filters, p = !0, k = b.data.path.elements, u = k.length; u--;) {
                        var f = k[u], r = 0; b = f.data("cke-display-name") ? f.data("cke-display-name") :
                            f.data("cke-real-element-type") ? f.data("cke-real-element-type") : f.getName(); (p = f.hasAttribute("contenteditable") ? "true" == f.getAttribute("contenteditable") : p) || f.hasAttribute("contenteditable") || (r = 1); for (var t = 0; t < c.length; t++) { var l = c[t](f, b); if (!1 === l) { r = 1; break } b = l || b } r || (g.unshift(f), d.unshift(b))
                    } g = g.length; for (c = 0; c < g; c++)b = d[c], p = a.lang.elementspath.eleTitle.replace(/%1/, b), b = x.output({ id: q + c, label: p, text: b, jsTitle: "javascript:void('" + b + "')", index: c, keyDownFn: w, clickFn: v }), e.unshift(b); m ||
                        (m = CKEDITOR.document.getById(n)); d = m; d.setHtml(e.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); a.fire("elementsPathUpdate", { space: d })
                }); a.on("readOnly", l); a.on("contentDomUnload", l); a.addCommand("elementsPathFocus", y.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        } var y = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, c = ""; CKEDITOR.env.gecko &&
            CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var x = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + c + ' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
        CKEDITOR.plugins.add("elementspath", { init: function (a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; a.on("uiSpace", function (c) { "bottom" == c.data.space && q(a, c.data) }) } })
    })(); (function () {
        function x(a, e, b) { b = a.config.forceEnterMode || b; if ("wysiwyg" == a.mode) { e || (e = a.activeEnterMode); var l = a.elementPath(); l && !l.isContextFor("p") && (e = CKEDITOR.ENTER_BR, b = 1); a.fire("saveSnapshot"); e == CKEDITOR.ENTER_BR ? u(a, e, null, b) : r(a, e, null, b); a.fire("saveSnapshot") } } function y(a) { a = a.getSelection().getRanges(!0); for (var e = a.length - 1; 0 < e; e--)a[e].deleteContents(); return a[0] } function z(a) {
            var e = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") },
                !0); if (a.root.equals(e)) return a; e = new CKEDITOR.dom.range(e); e.moveToRange(a); return e
        } CKEDITOR.plugins.add("enterkey", { init: function (a) { a.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (a) { x(a) } }); a.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (a) { x(a, a.activeShiftEnterMode, 1) } }); a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var A = CKEDITOR.dom.walker.whitespaces(), B = CKEDITOR.dom.walker.bookmark(), v, u, r, w; CKEDITOR.plugins.enterkey =
        {
            enterBlock: function (a, e, b, l) {
                function n(a) { var b; if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], p.lastElement.getName()) || 1 !== p.lastElement.getChildCount()) return !1; a = p.lastElement.getChild(0).clone(!0); (b = a.getBogus()) && b.remove(); return a.getText().length ? !1 : !0 } if (b = b || y(a)) {
                    b = z(b); var g = b.document, f = b.checkStartOfBlock(), k = b.checkEndOfBlock(), p = a.elementPath(b.startContainer), c = p.block, m = e == CKEDITOR.ENTER_DIV ? "div" : "p", d; if (c && f && k) {
                        f = c.getParent(); if (f.is("li") && 1 < f.getChildCount()) {
                            g =
                            new CKEDITOR.dom.element("li"); d = a.createRange(); g.insertAfter(f); c.remove(); d.setStart(g, 0); a.getSelection().selectRanges([d]); return
                        } if (c.is("li") || c.getParent().is("li")) {
                            c.is("li") || (c = c.getParent(), f = c.getParent()); d = f.getParent(); b = !c.hasPrevious(); var h = !c.hasNext(); l = a.getSelection(); var m = l.createBookmarks(), t = c.getDirection(1), k = c.getAttribute("class"), q = c.getAttribute("style"), r = d.getDirection(1) != t; a = a.enterMode != CKEDITOR.ENTER_BR || r || q || k; if (d.is("li")) b || h ? (b && h && f.remove(), c[h ? "insertAfter" :
                                "insertBefore"](d)) : c.breakParent(d); else { if (a) if (p.block.is("li") ? (d = g.createElement(e == CKEDITOR.ENTER_P ? "p" : "div"), r && d.setAttribute("dir", t), q && d.setAttribute("style", q), k && d.setAttribute("class", k), c.moveChildren(d)) : d = p.block, b || h) d[b ? "insertBefore" : "insertAfter"](f); else c.breakParent(f), d.insertAfter(f); else if (c.appendBogus(!0), b || h) for (; g = c[b ? "getFirst" : "getLast"]();)g[b ? "insertBefore" : "insertAfter"](f); else for (c.breakParent(f); g = c.getLast();)g.insertAfter(f); c.remove() } l.selectBookmarks(m);
                            return
                        } if (c && c.getParent().is("blockquote")) { c.breakParent(c.getParent()); c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove(); c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove(); b.moveToElementEditStart(c); b.select(); return }
                    } else if (c && c.is("pre") && !k) { u(a, e, b, l); return } if (q = b.splitBlock(m)) {
                        a = q.previousBlock; c = q.nextBlock; f = q.wasStartOfBlock; k = q.wasEndOfBlock; c ? (h = c.getParent(), h.is("li") && (c.breakParent(h), c.move(c.getNext(), 1))) : a && (h = a.getParent()) &&
                            h.is("li") && (a.breakParent(h), h = a.getNext(), b.moveToElementEditStart(h), a.move(a.getPrevious())); if (f || k) if (n(e)) b.moveToElementEditStart(b.getTouchedStartNode()); else {
                                if (a) { if (a.is("li") || !w.test(a.getName()) && !a.is("pre")) d = a.clone() } else c && (d = c.clone()); d ? l && !d.is("li") && d.renameNode(m) : h && h.is("li") ? d = h : (d = g.createElement(m), a && (t = a.getDirection()) && d.setAttribute("dir", t)); if (g = q.elementPath) for (e = 0, l = g.elements.length; e < l; e++) {
                                    m = g.elements[e]; if (m.equals(g.block) || m.equals(g.blockLimit)) break;
                                    CKEDITOR.dtd.$removeEmpty[m.getName()] && (m = m.clone(), d.moveChildren(m), d.append(m))
                                } d.appendBogus(); d.getParent() || b.insertNode(d); d.is("li") && d.removeAttribute("value"); !CKEDITOR.env.ie || !f || k && a.getChildCount() || (b.moveToElementEditStart(k ? a : d), b.select()); b.moveToElementEditStart(f && !k ? c : d)
                            } else c.is("li") && (d = b.clone(), d.selectNodeContents(c), d = new CKEDITOR.dom.walker(d), d.evaluator = function (a) {
                                return !(B(a) || A(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in
                                    CKEDITOR.dtd.$empty))
                            }, (h = d.next()) && h.type == CKEDITOR.NODE_ELEMENT && h.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? g.createElement("br") : g.createText(" ")).insertBefore(h)), c && b.moveToElementEditStart(c); b.select(); b.scrollIntoView()
                    }
                }
            }, enterBr: function (a, e, b, l) {
                if (b = b || y(a)) {
                    var n = b.document, g = b.checkEndOfBlock(), f = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), k = f.block, p = k && f.block.getName(); l || "li" != p ? (!l && g && w.test(p) ? (g = k.getDirection()) ? (n = n.createElement("div"), n.setAttribute("dir",
                        g), n.insertAfter(k), b.setStart(n, 0)) : (n.createElement("br").insertAfter(k), CKEDITOR.env.gecko && n.createText("").insertAfter(k), b.setStartAt(k.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == p && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? n.createText("\r") : n.createElement("br"), b.deleteContents(), b.insertNode(a), CKEDITOR.env.needsBrFiller ? (n.createText("﻿").insertAfter(a), g && (k || f.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", b.setStartAt(a.getNext(),
                            CKEDITOR.POSITION_AFTER_START)) : b.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), b.collapse(!0), b.select(), b.scrollIntoView()) : r(a, e, b, l)
                }
            }
        }; v = CKEDITOR.plugins.enterkey; u = v.enterBr; r = v.enterBlock; w = /^h[1-6]$/
    })(); (function () {
        function k(a, f) { var g = {}, c = [], e = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, b) { var d = f ? "\x26" + b + ";" : e[b]; g[d] = f ? e[b] : "\x26" + b + ";"; c.push(d); return "" }); a = a.replace(/,$/, ""); if (!f && a) { a = a.split(","); var b = document.createElement("div"), d; b.innerHTML = "\x26" + a.join(";\x26") + ";"; d = b.innerHTML; b = null; for (b = 0; b < d.length; b++) { var h = d.charAt(b); g[h] = "\x26" + a[b] + ";"; c.push(h) } } g.regex = c.join(f ? "|" : ""); return g }
        CKEDITOR.plugins.add("entities", {
            afterInit: function (a) {
                function f(b) { return h[b] } function g(a) { return "force" != c.entities_processNumerical && b[a] ? b[a] : "\x26#" + a.charCodeAt(0) + ";" } var c = a.config; if (a = (a = a.dataProcessor) && a.htmlFilter) {
                    var e = []; !1 !== c.basicEntities && e.push("nbsp,gt,lt,amp"); c.entities && (e.length && e.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                        c.entities_latin && e.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), c.entities_greek && e.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                        c.entities_additional && e.push(c.entities_additional)); var b = k(e.join(",")), d = b.regex ? "[" + b.regex + "]" : "a^"; delete b.regex; c.entities && c.entities_processNumerical && (d = "[^ -~]|" + d); var d = new RegExp(d, "g"), h = k("nbsp,gt,lt,amp,shy", !0), l = new RegExp(h.regex, "g"); a.addRules({ text: function (a) { return a.replace(l, f).replace(d, g) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                }
            }
        })
    })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39"; CKEDITOR.plugins.add("popup");
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (e, a, b, d) {
            a = a || "80%"; b = b || "70%"; "string" == typeof a && 1 < a.length && "%" == a.substr(a.length - 1, 1) && (a = parseInt(window.screen.width * parseInt(a, 10) / 100, 10)); "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10)); 640 > a && (a = 640); 420 > b && (b = 420); var f = parseInt((window.screen.height - b) / 2, 10), g = parseInt((window.screen.width - a) / 2, 10); d = (d || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" +
                a + ",height\x3d" + b + ",top\x3d" + f + ",left\x3d" + g; var c = window.open("", null, d, !0); if (!c) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (c.moveTo(g, f), c.resizeTo(a, b)), c.focus(), c.location.href = e } catch (h) { window.open(e, null, d, !0) } return !0
        }
    }); (function () {
        function k(a) { this.editor = a; this.loaders = [] } function l(a, c, b) {
            var d = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof c ? (this.data = c, this.file = n(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = c, this.total = this.file.size, this.loaded = 0); b ? this.fileName = b : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), d && (a[0] = d), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status =
                "created"; this.abort = function () { this.changeStatus("abort") }
        } function n(a) { var c = a.match(m)[1]; a = a.replace(m, ""); a = atob(a); var b = [], d, f, g, e; for (d = 0; d < a.length; d += 512) { f = a.slice(d, d + 512); g = Array(f.length); for (e = 0; e < f.length; e++)g[e] = f.charCodeAt(e); f = new Uint8Array(g); b.push(f) } return new Blob(b, { type: c }) } CKEDITOR.plugins.add("filetools", {
            beforeInit: function (a) {
            a.uploadRepository = new k(a); a.on("fileUploadRequest", function (a) {
                var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload =
                    { file: b.file, name: b.fileName }
            }, null, null, 5); a.on("fileUploadRequest", function (c) { var b = c.data.fileLoader, d = new FormData; c = c.data.requestData; var f = a.config.fileTools_requestHeaders, g, e; for (e in c) { var h = c[e]; "object" === typeof h && h.file ? d.append(e, h.file, h.name) : d.append(e, h) } d.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); if (f) for (g in f) b.xhr.setRequestHeader(g, f[g]); b.xhr.send(d) }, null, null, 999); a.on("fileUploadResponse", function (a) {
                var b = a.data.fileLoader, d = b.xhr, f = a.data; try {
                    var g = JSON.parse(d.responseText);
                    g.error && g.error.message && (f.message = g.error.message); if (g.uploaded) for (var e in g) f[e] = g[e]; else a.cancel()
                } catch (h) { f.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: d.responseText }), a.cancel() }
            }, null, null, 999)
            }
        }); k.prototype = {
            create: function (a, c, b) { b = b || l; var d = this.loaders.length; a = new b(this.editor, a, c); a.id = d; this.loaders[d] = a; this.fire("instanceCreated", a); return a }, isFinished: function () {
                for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1;
                return !0
            }
        }; l.prototype = {
            loadAndUpload: function (a, c) { var b = this; this.once("loaded", function (d) { d.cancel(); b.once("update", function (a) { a.cancel() }, null, null, 0); b.upload(a, c) }, null, null, 0); this.load() }, load: function () {
                var a = this, c = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; c.onabort = function () { a.changeStatus("abort") }; c.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; c.onprogress = function (b) { a.loaded = b.loaded; a.update() };
                c.onload = function () { a.loaded = a.total; a.data = c.result; a.changeStatus("loaded") }; c.readAsDataURL(this.file)
            }, upload: function (a, c) { var b = c || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: b }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                function a() {
                "error" != b.status && (b.message = b.lang.filetools.networkError,
                    b.changeStatus("error"))
                } function c() { "abort" != b.status && b.changeStatus("abort") } var b = this, d = this.xhr; b.abort = function () { d.abort(); c() }; d.onerror = a; d.onabort = c; d.upload ? (d.upload.onprogress = function (a) { a.lengthComputable && (b.uploadTotal || (b.uploadTotal = a.total), b.uploaded = a.loaded, b.update()) }, d.upload.onerror = a, d.upload.onabort = c) : (b.uploadTotal = b.total, b.update()); d.onload = function () {
                    b.update(); if ("abort" != b.status) if (b.uploaded = b.uploadTotal, 200 > d.status || 299 < d.status) b.message = b.lang.filetools["httpError" +
                        d.status], b.message || (b.message = b.lang.filetools.httpError.replace("%1", d.status)), b.changeStatus("error"); else { for (var a = { fileLoader: b }, c = ["message", "fileName", "url"], e = b.editor.fire("fileUploadResponse", a), h = 0; h < c.length; h++) { var k = c[h]; "string" === typeof a[k] && (b[k] = a[k]) } b.responseData = a; delete b.responseData.fileLoader; !1 === e ? b.changeStatus("error") : b.changeStatus("uploaded") }
                }
            }, changeStatus: function (a) {
            this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { };
                this.fire(a); this.update()
            }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
        }; CKEDITOR.event.implementOn(k.prototype); CKEDITOR.event.implementOn(l.prototype); var m = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            uploadRepository: k, fileLoader: l, getUploadUrl: function (a, c) {
                var b = CKEDITOR.tools.capitalize; return c && a[c + "UploadUrl"] ? a[c + "UploadUrl"] : a.uploadUrl ? a.uploadUrl :
                    c && a["filebrowser" + b(c, 1) + "UploadUrl"] ? a["filebrowser" + b(c, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl + "\x26responseType\x3djson" : null
            }, isTypeSupported: function (a, c) { return !!a.type.match(c) }, isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
        })
    })(); (function () {
        function g(a, b) { var d = []; if (b) for (var c in b) d.push(c + "\x3d" + encodeURIComponent(b[c])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + d.join("\x26") } function p(a) { return !a.match(/command=QuickUpload/) || a.match(/(\?|&)responseType=json/) ? a : g(a, { responseType: "json" }) } function k(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function q() {
            var a = this.getDialog(), b = a.getParentEditor(); b._.filebrowserSe = this; var d = b.config["filebrowser" + k(a.getName()) + "WindowWidth"] || b.config.filebrowserWindowWidth ||
                "80%", a = b.config["filebrowser" + k(a.getName()) + "WindowHeight"] || b.config.filebrowserWindowHeight || "70%", c = this.filebrowser.params || {}; c.CKEditor = b.name; c.CKEditorFuncNum = b._.filebrowserFn; c.langCode || (c.langCode = b.langCode); c = g(this.filebrowser.url, c); b.popup(c, d, a, b.config.filebrowserWindowFeatures || b.config.fileBrowserWindowFeatures)
        } function r(a) {
            var b = new CKEDITOR.dom.element(a.$.form); b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({
                name: "ckCsrfToken",
                type: "hidden"
            }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken()))
        } function t() { var a = this.getDialog(); a.getParentEditor()._.filebrowserSe = this; return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1 } function u(a, b, d) { var c = d.params || {}; c.CKEditor = a.name; c.CKEditorFuncNum = a._.filebrowserFn; c.langCode || (c.langCode = a.langCode); b.action = g(d.url, c); b.filebrowser = d } function l(a, b, d, c) {
            if (c &&
                c.length) for (var e, g = c.length; g--;)if (e = c[g], "hbox" != e.type && "vbox" != e.type && "fieldset" != e.type || l(a, b, d, e.children), e.filebrowser) if ("string" == typeof e.filebrowser && (e.filebrowser = { action: "fileButton" == e.type ? "QuickUpload" : "Browse", target: e.filebrowser }), "Browse" == e.filebrowser.action) { var f = e.filebrowser.url; void 0 === f && (f = a.config["filebrowser" + k(b) + "BrowseUrl"], void 0 === f && (f = a.config.filebrowserBrowseUrl)); f && (e.onClick = q, e.filebrowser.url = f, e.hidden = !1) } else if ("QuickUpload" == e.filebrowser.action &&
                    e["for"] && (f = e.filebrowser.url, void 0 === f && (f = a.config["filebrowser" + k(b) + "UploadUrl"], void 0 === f && (f = a.config.filebrowserUploadUrl)), f)) {
                        var h = e.onClick; e.onClick = function (b) {
                            var c = b.sender, d = c.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement(), e = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported; if (h && !1 === h.call(c, b)) return !1; if (t.call(c, b)) {
                                if ("form" !== a.config.filebrowserUploadMethod && e) return b = a.uploadRepository.create(d.$.files[0]), b.on("uploaded", function (a) {
                                    var b =
                                        a.sender.responseData; m.call(a.sender.editor, b.url, b.message)
                                }), b.on("error", n.bind(this)), b.on("abort", n.bind(this)), b.loadAndUpload(p(f)), "xhr"; r(d); return !0
                            } return !1
                        }; e.filebrowser.url = f; e.hidden = !1; u(a, d.getContents(e["for"][0]).get(e["for"][1]), e.filebrowser)
                }
        } function n(a) { var b = {}; try { b = JSON.parse(a.sender.xhr.response) || {} } catch (d) { } this.enable(); alert(b.error ? b.error.message : a.sender.message) } function h(a, b, d) {
            if (-1 !== d.indexOf(";")) {
                d = d.split(";"); for (var c = 0; c < d.length; c++)if (h(a, b, d[c])) return !0;
                return !1
            } return (a = a.getContents(b).get(d).filebrowser) && a.url
        } function m(a, b) {
            var d = this._.filebrowserSe.getDialog(), c = this._.filebrowserSe["for"], e = this._.filebrowserSe.filebrowser.onSelect; c && d.getContentElement(c[0], c[1]).reset(); if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe)) if (!e || !1 !== e.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (c = this._.filebrowserSe, d = c.getDialog(), c = c.filebrowser.target || null)) if (c = c.split(":"), e = d.getContentElement(c[0], c[1])) e.setValue(a),
                d.selectPage(c[0])
        } CKEDITOR.plugins.add("filebrowser", { requires: "popup,filetools", init: function (a) { a._.filebrowserFn = CKEDITOR.tools.addFunction(m, a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) }) } }); CKEDITOR.on("dialogDefinition", function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, d, c = 0; c < b.contents.length; ++c)if (d = b.contents[c]) l(a.editor, a.data.name, b, d.elements), d.hidden && d.filebrowser && (d.hidden = !h(b, d.id, d.filebrowser)) })
    })(); (function () {
        function k(a) {
            var l = a.config, p = a.fire("uiSpace", { space: "top", html: "" }).html, t = function () {
                function f(a, c, e) { b.setStyle(c, w(e)); b.setStyle("position", a) } function e(a) { var b = k.getDocumentPosition(); switch (a) { case "top": f("absolute", "top", b.y - q - r); break; case "pin": f("fixed", "top", x); break; case "bottom": f("absolute", "top", b.y + (c.height || c.bottom - c.top) + r) }m = a } var m, k, n, c, h, q, v, p = l.floatSpaceDockedOffsetX || 0, r = l.floatSpaceDockedOffsetY || 0, u = l.floatSpacePinnedOffsetX || 0, x = l.floatSpacePinnedOffsetY ||
                    0; return function (d) {
                        if (k = a.editable()) {
                            var f = d && "focus" == d.name; f && b.show(); a.fire("floatingSpaceLayout", { show: f }); b.removeStyle("left"); b.removeStyle("right"); n = b.getClientRect(); c = k.getClientRect(); h = g.getViewPaneSize(); q = n.height; v = "pageXOffset" in g.$ ? g.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; m ? (q + r <= c.top ? e("top") : q + r > h.height - c.bottom ? e("pin") : e("bottom"), d = h.width / 2, d = l.floatSpacePreferRight ? "right" : 0 < c.left && c.right < h.width && c.width > n.width ? "rtl" == l.contentsLangDirection ?
                                "right" : "left" : d - c.left > c.right - d ? "left" : "right", n.width > h.width ? (d = "left", f = 0) : (f = "left" == d ? 0 < c.left ? c.left : 0 : c.right < h.width ? h.width - c.right : 0, f + n.width > h.width && (d = "left" == d ? "right" : "left", f = 0)), b.setStyle(d, w(("pin" == m ? u : p) + f + ("pin" == m ? 0 : "left" == d ? v : -v)))) : (m = "pin", e("pin"), t(d))
                        }
                    }
            }(); if (p) {
                var k = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ?
                    " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), b = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(k.output({
                        content: p, id: a.id, langDir: a.lang.dir,
                        langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (l.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title
                    }))), u = CKEDITOR.tools.eventsBuffer(500, t), e = CKEDITOR.tools.eventsBuffer(100, t); b.unselectable(); b.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (b) { t(b); a.on("change", u.input); g.on("scroll", e.input); g.on("resize", e.input) }); a.on("blur", function () {
                        b.hide(); a.removeListener("change", u.input); g.removeListener("scroll",
                            e.input); g.removeListener("resize", e.input)
                    }); a.on("destroy", function () { g.removeListener("scroll", e.input); g.removeListener("resize", e.input); b.clearCustomData(); b.remove() }); a.focusManager.hasFocus && b.show(); a.focusManager.add(b, 1)
            }
        } var g = CKEDITOR.document.getWindow(), w = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (a) { a.on("loaded", function () { k(this) }, null, null, 20) } })
    })(); CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var f = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), g = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
            h = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), k = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (a, b) {
                    b = b || {}; var c = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) &&
                        (c["aria-multiselectable"] = !0); !c.role && (c.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", c.role); c = this.keys; c[40] = "next"; c[9] = "next"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (c[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                }, _: {
                    close: function () {
                        if (this._.started) {
                            var a = f.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(a);
                            delete this._.started
                        }
                    }, getClick: function () { this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click }
                }, proto: {
                    add: function (a, b, c) {
                        var d = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = d; var e; e = CKEDITOR.tools.htmlEncodeAttr(a).replace(k, "\\'"); a = {
                            id: d, val: e, onclick: CKEDITOR.env.ie ? 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26' :
                                "", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(c || a), text: b || a
                        }; this._.pendingList.push(g.output(a))
                    }, startGroup: function (a) { this._.close(); var b = CKEDITOR.tools.getNextId(); this._.groups[a] = b; this._.pendingHtml.push(h.output({ id: b, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) {
                        var b = (a =
                            this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                    }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () {
                        var a = this._.items, b = this._.groups, c = this.element.getDocument(), d; for (d in a) c.getById(a[d]).setStyle("display", ""); for (var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display",
                            "")
                    }, mark: function (a) { this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a); b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b) }, markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) {
                        var b = this.element.getDocument(); a = this._.items[a]; var c = b.getById(a); c.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c)
                    }, unmarkAll: function () { var a = this._.items, b = this.element.getDocument(), c; for (c in a) { var d = a[c]; b.getById(d).removeClass("cke_selected"); b.getById(d + "_option").removeAttribute("aria-selected") } this.onUnmark && this.onUnmark() }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) {
                        this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), c, d = -1; if (a) for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a =
                            b.getItem(++d);) { if (a.equals(c)) { this._.focusIndex = d; break } } else this.element.focus(); c && setTimeout(function () { c.focus() }, 0)
                    }
                }
            })
        }
    }); CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function (c) { c.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } });
    (function () {
        var c = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"', h = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"');
        CKEDITOR.env.gecko && (c += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); CKEDITOR.env.ie && (h = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + h + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
            (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), n = CKEDITOR.addTemplate("combo", c); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                $: function (a) {
                    CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel";
                    a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {}, listeners: [] }
                }, proto: {
                    renderHtml: function (a) { var b = []; this.render(a, b); return b.join("") }, render: function (a, b) {
                        function f() { if (this.getState() != CKEDITOR.TRISTATE_ON) { var b = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (b = CKEDITOR.TRISTATE_DISABLED); this.setState(b); this.setValue(""); b != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } }
                        var c = CKEDITOR.env, k = "cke_" + this.id, e = CKEDITOR.tools.addFunction(function (b) { l && (a.unlockSelection(1), l = 0); g.execute(b) }, this), d = this, g = { id: k, combo: this, focus: function () { CKEDITOR.document.getById(k).getChild(1).focus() }, execute: function (b) { var c = d._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (d.createPanel(a), c.on) c.panel.hide(); else { d.commit(); var f = d.getValue(); f ? c.list.mark(f) : c.list.unmarkAll(); c.panel.showBlock(d.id, new CKEDITOR.dom.element(b), 4) } }, clickFn: e }; this._.listeners.push(a.on("activeFilterChange",
                            f, this)); this._.listeners.push(a.on("mode", f, this)); this._.listeners.push(a.on("selectionChange", f, this)); !this.readOnly && this._.listeners.push(a.on("readOnly", f, this)); var m = CKEDITOR.tools.addFunction(function (a, b) { a = new CKEDITOR.dom.event(a); var d = a.getKeystroke(); switch (d) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(e, b); break; default: g.onkey(g, d) }a.preventDefault() }), h = CKEDITOR.tools.addFunction(function () { g.onfocus && g.onfocus() }), l = 0; g.keyDownFn = m; c = {
                                id: k, name: this.name || this.command,
                                label: this.label, title: this.title, cls: this.className || "", titleJs: c.gecko && !c.hc ? "" : (this.title || "").replace("'", ""), keydownFn: m, focusFn: h, clickFn: e
                            }; n.output(c, b); if (this.onRender) this.onRender(); return g
                    }, createPanel: function (a) {
                        if (!this._.panel) {
                            var b = this._.panelDefinition, c = this._.panelDefinition.block, h = b.parent || CKEDITOR.document.getBody(), k = "cke_combopanel__" + this.name, e = new CKEDITOR.ui.floatPanel(a, h, b), b = e.addListBlock(this.id, c), d = this; e.onShow = function () {
                                this.element.addClass(k); d.setState(CKEDITOR.TRISTATE_ON);
                                d._.on = 1; d.editorFocus && !a.focusManager.hasFocus && a.focus(); if (d.onOpen) d.onOpen()
                            }; e.onHide = function (b) { this.element.removeClass(k); d.setState(d.modes && d.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); d._.on = 0; if (!b && d.onClose) d.onClose() }; e.onEscape = function () { e.hide(1) }; b.onClick = function (a, b) { d.onClick && d.onClick.call(d, a, b); e.hide() }; this._.panel = e; this._.list = b; e.getBlock(this.id).onHide = function () { d._.on = 0; d.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                        }
                    }, setValue: function (a,
                        b) { this._.value = a; var c = this.document.getById("cke_" + this.id + "_text"); c && (a || b ? c.removeClass("cke_combo_inlinelabel") : (b = this.label, c.addClass("cke_combo_inlinelabel")), c.setText("undefined" != typeof b ? b : a)) }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) }, hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, b, c) {
                            this._.items[a] =
                            c || a; this._.list.add(a, b, c)
                        }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) { if (this._.state != a) { var b = this.document.getById("cke_" + this.id); b.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"); this._.state = a } }, getState: function () { return this._.state }, enable: function () {
                            this._.state ==
                            CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                        }, disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }, destroy: function () { CKEDITOR.tools.array.forEach(this._.listeners, function (a) { a.removeListener() }); this._.listeners = [] }
                }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
            }); CKEDITOR.ui.prototype.addRichCombo = function (a, b) { this.add(a, CKEDITOR.UI_RICHCOMBO, b) }
    })(); CKEDITOR.plugins.add("format", {
        requires: "richcombo", init: function (a) {
            if (!a.blockless) {
                for (var f = a.config, c = a.lang.format, l = f.format_tags.split(";"), d = {}, m = 0, n = [], g = 0; g < l.length; g++) { var h = l[g], k = new CKEDITOR.style(f["format_" + h]); if (!a.filter.customConfig || a.filter.check(k)) m++, d[h] = k, d[h]._.enterMode = a.config.enterMode, n.push(k) } 0 !== m && a.ui.addRichCombo("Format", {
                    label: c.label, title: c.panelTitle, toolbar: "styles,20", allowedContent: n, panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
                        multiSelect: !1, attributes: { "aria-label": c.panelTitle }
                    }, init: function () { this.startGroup(c.panelTitle); for (var a in d) { var e = c["tag_" + a]; this.add(a, d[a].buildPreview(e), e) } }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = d[b]; var e = a.elementPath(); b.checkActive(e, a) || a.applyStyle(b); setTimeout(function () { a.fire("saveSnapshot") }, 0) }, onRender: function () {
                        a.on("selectionChange", function (b) {
                            var e = this.getValue(); b = b.data.path; this.refresh(); for (var c in d) if (d[c].checkActive(b, a)) {
                            c != e && this.setValue(c,
                                a.lang.format["tag_" + c]); return
                            } this.setValue("")
                        }, this)
                    }, onOpen: function () { this.showAll(); for (var b in d) a.activeFilter.check(d[b]) || this.hideItem(b) }, refresh: function () { var b = a.elementPath(); if (b) { if (b.isContextFor("p")) for (var c in d) if (a.activeFilter.check(d[c])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                })
            }
        }
    }); CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div"; CKEDITOR.config.format_p = { element: "p" }; CKEDITOR.config.format_div = { element: "div" }; CKEDITOR.config.format_pre = { element: "pre" };
    CKEDITOR.config.format_address = { element: "address" }; CKEDITOR.config.format_h1 = { element: "h1" }; CKEDITOR.config.format_h2 = { element: "h2" }; CKEDITOR.config.format_h3 = { element: "h3" }; CKEDITOR.config.format_h4 = { element: "h4" }; CKEDITOR.config.format_h5 = { element: "h5" }; CKEDITOR.config.format_h6 = { element: "h6" }; (function () { var b = { canUndo: !1, exec: function (a) { var b = a.document.createElement("hr"); a.insertElement(b) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", { init: function (a) { a.blockless || (a.addCommand("horizontalrule", b), a.ui.addButton && a.ui.addButton("HorizontalRule", { label: a.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } }) })(); CKEDITOR.plugins.add("htmlwriter", { init: function (b) { var a = new CKEDITOR.htmlWriter; a.forceSimpleAmpersand = b.config.forceSimpleAmpersand; a.indentationChars = b.config.dataIndentationChars || "\t"; b.dataProcessor.writer = a } });
    CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var b = CKEDITOR.dtd, a; for (a in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) this.setRules(a, {
                indent: !b[a]["#"], breakBeforeOpen: 1, breakBeforeClose: !b[a]["#"], breakAfterClose: 1, needsSpace: a in
                    b.$block && !(a in { li: 1, dt: 1, dd: 1 })
            }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
        }, proto: {
            openTag: function (b) { var a = this._.rules[b]; this._.afterCloser && a && a.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ? this.indentation() : a && a.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", b); this._.afterCloser = 0 },
            openTagClose: function (b, a) { var c = this._.rules[b]; a ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push("\x3e"), c && c.indent && (this._.indentation += this.indentationChars)); c && c.breakAfterOpen && this.lineBreak(); "pre" == b && (this._.inPre = 1) }, attribute: function (b, a) { "string" == typeof a && (a = CKEDITOR.tools.htmlEncodeAttr(a), this.forceSimpleAmpersand && (a = a.replace(/&amp;/g, "\x26"))); this._.output.push(" ", b, '\x3d"', a, '"') }, closeTag: function (b) {
                var a =
                    this._.rules[b]; a && a.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : a && a.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", b, "\x3e"); "pre" == b && (this._.inPre = 0); a && a.breakAfterClose && (this.lineBreak(), this._.needsSpace = a.needsSpace); this._.afterCloser = 1
            }, text: function (b) { this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b))); this._.output.push(b) }, comment: function (b) {
                this._.indent &&
                this.indentation(); this._.output.push("\x3c!--", b, "--\x3e")
            }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser = 0; this._.inPre = 0; this._.needsSpace = 0 }, setRules: function (b, a) {
                var c = this._.rules[b]; c ? CKEDITOR.tools.extend(c, a, !0) : this._.rules[b] =
                    a
            }
        }
    }); (function () {
        function m(a) {
            function e(a) { var b = !1; g.attachListener(g, "keydown", function () { var d = c.getBody().getElementsByTag(a); if (!b) { for (var f = 0; f < d.count(); f++)d.getItem(f).setCustomData("retain", !0); b = !0 } }, null, null, 1); g.attachListener(g, "keyup", function () { var d = c.getElementsByTag(a); b && (1 == d.count() && !d.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(d.getItem(0).getAttributes()) && d.getItem(0).remove(1), b = !1) }) } var b = this.editor; if (b && !b.isDetached()) {
                var c = a.document, d = c.body, f = c.getElementById("cke_actscrpt");
                f && f.parentNode.removeChild(f); (f = c.getElementById("cke_shimscrpt")) && f.parentNode.removeChild(f); (f = c.getElementById("cke_basetagscrpt")) && f.parentNode.removeChild(f); d.contentEditable = !0; CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = d; c = new CKEDITOR.dom.document(c); this.setup(); this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && c.getDocumentElement().addClass(c.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge &&
                    b.enterMode != CKEDITOR.ENTER_P ? e("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && b.enterMode != CKEDITOR.ENTER_DIV && e("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) c.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { b.editable().focus() }) }); n(b); try { b.document.$.execCommand("2D-position", !1, !0) } catch (h) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                        var c =
                            a.data.getKeystroke(); if (33 == c || 34 == c) if (CKEDITOR.env.ie) setTimeout(function () { b.getSelection().scrollIntoView() }, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) { var d = b.createRange(); d[33 == c ? "moveToElementEditStart" : "moveToElementEditEnd"](this); d.select(); a.data.preventDefault() }
                    }); CKEDITOR.env.ie && this.attachListener(c, "blur", function () { try { c.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(c, "touchend", function () { a.focus() }); d = b.document.getElementsByTag("title").getItem(0);
                d.data("cke-title", d.getText()); CKEDITOR.env.ie && (b.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () { "unloaded" == this.status && (this.status = "ready"); b.fire("contentDom"); this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1); setTimeout(function () { b.fire("dataReady") }, 0) }, 0, this)
            }
        } function n(a) {
            function e() {
                var c; a.editable().attachListener(a, "selectionChange", function () {
                    var d = a.getSelection().getSelectedElement(); d && (c && (c.detachEvent("onresizestart", b), c = null), d.$.attachEvent("onresizestart",
                        b), c = d.$)
                })
            } function b(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try { var c = a.document.$; c.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing); c.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles) } catch (d) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && e(a)
        } function p() {
            var a = []; if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var e = [], b; for (b in CKEDITOR.dtd.$removeEmpty) e.push("html.CSS1Compat " +
                    b + "[contenteditable\x3dfalse]"); a.push(e.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
        } var l; CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }); a.addMode("wysiwyg", function (e) {
                    function b(b) { b && b.removeListener(); a.isDestroyed() || a.isDetached() || (a.editable(new l(a, d.$.contentWindow.document.body)), a.setData(a.getData(1), e)) } var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(c) + "}())" : "", d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' +
                        c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); d.setStyles({ width: "100%", height: "100%" }); d.addClass("cke_wysiwyg_frame").addClass("cke_reset"); c = a.ui.space("contents"); c.append(d); var f = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (f) d.on("load", b); var g = a.title, h = a.fire("ariaEditorHelpLabel", {}).label; g && (CKEDITOR.env.ie && h && (g += ", " + h), d.setAttribute("title", g)); if (h) {
                            var g = CKEDITOR.tools.getNextId(), k = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' +
                                h + "\x3c/span\x3e"); c.append(k, 1); d.setAttribute("aria-describedby", g)
                        } a.on("beforeModeUnload", function (a) { a.removeListener(); k && k.remove() }); d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !f && b(); a.fire("ariaWidget", d)
                })
            }
        }); CKEDITOR.editor.prototype.addContentsCss = function (a) { var e = this.config, b = e.contentsCss; CKEDITOR.tools.isArray(b) || (e.contentsCss = b ? [b] : []); e.contentsCss.push(a) }; l = CKEDITOR.tools.createClass({
            $: function () {
                this.base.apply(this, arguments); this._.frameLoadedHandler =
                    CKEDITOR.tools.addFunction(function (a) { CKEDITOR.tools.setTimeout(m, 0, this, a) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (a, e) {
                    var b = this.editor; if (e) this.setHtml(a), this.fixInitialSelection(), b.fire("dataReady"); else {
                        this._.isLoadingData = !0; b._.dataStore = { id: 1 }; var c = b.config, d = c.fullPage, f = c.docType, g = CKEDITOR.tools.buildStyleHtml(p()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); d || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss));
                        var h = c.baseHref ? '\x3cbase href\x3d"' + c.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { b.docType = f = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { b.xmlDeclaration = a; return "" })); a = b.dataProcessor.toHtml(a); d ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
                            h && (a = a.replace(/<head[^>]*?>/, "$\x26" + h)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = f + a) : a = c.docType + '\x3chtml dir\x3d"' + c.contentsLangDirection + '" lang\x3d"' + (c.contentsLanguage || b.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + h + g + "\x3c/head\x3e\x3cbody" + (c.bodyId ? ' id\x3d"' + c.bodyId + '"' : "") + (c.bodyClass ? ' class\x3d"' + c.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version &&
                                (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); c = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                        h && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, c); this.clearCustomData(); this.clearListeners(); b.fire("contentDomUnload"); var k = this.getDocument(); try { k.write(a) } catch (l) { setTimeout(function () { k.write(a) }, 0) }
                    }
                }, getData: function (a) {
                    if (a) return this.getHtml(); a = this.editor; var e = a.config, b = e.fullPage, c = b && a.docType, d = b && a.xmlDeclaration,
                        f = this.getDocument(), b = b ? f.getDocumentElement().getOuterHtml() : f.getBody().getHtml(); CKEDITOR.env.gecko && e.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); b = a.dataProcessor.toDataFormat(b); d && (b = d + "\n" + b); c && (b = c + "\n" + b); return b
                }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : l.baseProto.focus.call(this) }, detach: function () {
                    var a = this.editor, e = a.document, a = a.container.findOne("iframe.cke_wysiwyg_frame"); l.baseProto.detach.call(this); this.clearCustomData(this._.expandoNumber);
                    e.getDocumentElement().clearCustomData(); CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); a && (a.clearCustomData(), (e = a.removeCustomData("onResize")) && e.removeListener(), a.isDetached() || a.remove())
                }
            }
        })
    })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; (function () {
        function e(b, a) { a || (a = b.getSelection().getSelectedElement()); if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a } function f(b) { var a = b.getStyle("float"); if ("inherit" == a || "none" == a) a = 0; a || (a = b.getAttribute("align")); return a } CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (b) {
                if (!b.plugins.detectConflict("image", ["easyimage", "image2"])) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); b.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); b.ui.addButton && b.ui.addButton("Image", { label: b.lang.common.image, command: "image", toolbar: "insert,10" }); b.on("doubleclick", function (b) {
                        var a =
                            b.data.element; !a.is("img") || a.data("cke-realelement") || a.isReadOnly() || (b.data.dialog = "image")
                    }); b.addMenuItems && b.addMenuItems({ image: { label: b.lang.image.menu, command: "image", group: "image" } }); b.contextMenu && b.contextMenu.addListener(function (a) { if (e(b, a)) return { image: CKEDITOR.TRISTATE_OFF } })
                }
            }, afterInit: function (b) {
                function a(a) {
                    var d = b.getCommand("justify" + a); if (d) {
                        if ("left" == a || "right" == a) d.on("exec", function (d) {
                            var c = e(b), g; c && (g = f(c), g == a ? (c.removeStyle("float"), a == f(c) && c.removeAttribute("align")) :
                                c.setStyle("float", a), d.cancel())
                        }); d.on("refresh", function (d) { var c = e(b); c && (c = f(c), this.setState(c == a ? CKEDITOR.TRISTATE_ON : "right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), d.cancel()) })
                    }
                } b.plugins.image2 || (a("left"), a("right"), a("center"), a("block"))
            }
        })
    })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
        function m(a, b) { var e, f; b.on("refresh", function (a) { var b = [k], c; for (c in a.data.states) b.push(a.data.states[c]); this.setState(CKEDITOR.tools.search(b, p) ? p : k) }, b, null, 100); b.on("exec", function (b) { e = a.getSelection(); f = e.createBookmarks(1); b.data || (b.data = {}); b.data.done = !1 }, b, null, 0); b.on("exec", function () { a.forceNextSelectionCheck(); e.selectBookmarks(f) }, b, null, 100) } var k = CKEDITOR.TRISTATE_DISABLED, p = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
            init: function (a) {
                var b = CKEDITOR.plugins.indent.genericDefinition;
                m(a, a.addCommand("indent", new b(!0))); m(a, a.addCommand("outdent", new b)); a.ui.addButton && (a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); a.on("dirChanged", function (b) {
                    var f = a.createRange(), l = b.data.node; f.setStartBefore(l); f.setEndAfter(l); for (var n = new CKEDITOR.dom.walker(f), c; c = n.next();)if (c.type == CKEDITOR.NODE_ELEMENT) if (!c.equals(l) &&
                        c.getDirection()) f.setStartAfter(c), n = new CKEDITOR.dom.walker(f); else { var d = a.config.indentClasses; if (d) for (var g = "ltr" == b.data.dir ? ["_rtl", ""] : ["", "_rtl"], h = 0; h < d.length; h++)c.hasClass(d[h] + g[0]) && (c.removeClass(d[h] + g[0]), c.addClass(d[h] + g[1])); d = c.getStyle("margin-right"); g = c.getStyle("margin-left"); d ? c.setStyle("margin-left", d) : c.removeStyle("margin-left"); g ? c.setStyle("margin-right", g) : c.removeStyle("margin-right") }
                })
            }
        }); CKEDITOR.plugins.indent = {
            genericDefinition: function (a) {
            this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            }, specificDefinition: function (a, b, e) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!e; this.relatedGlobal = e ? "indent" : "outdent"; this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a, b) {
                a.on("pluginsLoaded", function () {
                    for (var a in b) (function (a, b) {
                        var e = a.getCommand(b.relatedGlobal), c; for (c in b.jobs) e.on("exec", function (d) {
                            d.data.done || (a.fire("lockSnapshot"), b.execJob(a, c) && (d.data.done =
                                !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
                        }, this, null, c), e.on("refresh", function (d) { d.data.states || (d.data.states = {}); d.data.states[b.name + "@" + c] = b.refreshJob(a, c, d.data.path) }, this, null, c); a.addFeature(b)
                    })(this, b[a])
                })
            }
        }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function (a, b) { var e = this.jobs[b]; if (e.state != k) return e.exec.call(this, a) }, refreshJob: function (a,
                b, e) { b = this.jobs[b]; a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, e) : b.state = k; return b.state }, getContext: function (a) { return a.contains(this.context) }
        }
    })(); (function () {
        function w(f) {
            function g(b) {
                for (var e = c.startContainer, a = c.endContainer; e && !e.getParent().equals(b);)e = e.getParent(); for (; a && !a.getParent().equals(b);)a = a.getParent(); if (!e || !a) return !1; for (var d = [], h = !1; !h;)e.equals(a) && (h = !0), d.push(e), e = e.getNext(); if (1 > d.length) return !1; e = b.getParents(!0); for (a = 0; a < e.length; a++)if (e[a].getName && p[e[a].getName()]) { b = e[a]; break } for (var e = k.isIndent ? 1 : -1, a = d[0], d = d[d.length - 1], h = CKEDITOR.plugins.list.listToArray(b, q), m = h[d.getCustomData("listarray_index")].indent,
                    a = a.getCustomData("listarray_index"); a <= d.getCustomData("listarray_index"); a++)if (h[a].indent += e, 0 < e) { for (var g = h[a].parent, n = a - 1; 0 <= n; n--)if (h[n].indent === e) { g = h[n].parent; break } h[a].parent = new CKEDITOR.dom.element(g.getName(), g.getDocument()) } for (a = d.getCustomData("listarray_index") + 1; a < h.length && h[a].indent > m; a++)h[a].indent += e; e = CKEDITOR.plugins.list.arrayToList(h, q, null, f.config.enterMode, b.getDirection()); if (!k.isIndent) {
                        var t; if ((t = b.getParent()) && t.is("li")) for (var d = e.listNode.getChildren(),
                            r = [], l, a = d.count() - 1; 0 <= a; a--)(l = d.getItem(a)) && l.is && l.is("li") && r.push(l)
                    } e && e.listNode.replace(b); if (r && r.length) for (a = 0; a < r.length; a++) { for (l = b = r[a]; (l = l.getNext()) && l.is && l.getName() in p;)CKEDITOR.env.needsNbspFiller && !b.getFirst(x) && b.append(c.document.createText(" ")), b.append(l); b.insertAfter(t) } e && f.fire("contentDomInvalidated"); return !0
            } for (var k = this, q = this.database, p = this.context, c, m = f.getSelection(), m = (m && m.getRanges()).createIterator(); c = m.getNextRange();) {
                for (var b = c.getCommonAncestor(); b &&
                    (b.type != CKEDITOR.NODE_ELEMENT || !p[b.getName()]);) { if (f.editable().equals(b)) { b = !1; break } b = b.getParent() } b || (b = c.startPath().contains(p)) && c.setEndAt(b, CKEDITOR.POSITION_BEFORE_END); if (!b) { var d = c.getEnclosedNode(); d && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in p && (c.setStartAt(d, CKEDITOR.POSITION_AFTER_START), c.setEndAt(d, CKEDITOR.POSITION_BEFORE_END), b = d) } b && c.startContainer.type == CKEDITOR.NODE_ELEMENT && c.startContainer.getName() in p && (d = new CKEDITOR.dom.walker(c), d.evaluator = n, c.startContainer =
                        d.next()); b && c.endContainer.type == CKEDITOR.NODE_ELEMENT && c.endContainer.getName() in p && (d = new CKEDITOR.dom.walker(c), d.evaluator = n, c.endContainer = d.previous()); if (b) return g(b)
            } return 0
        } function n(f) { return f.type == CKEDITOR.NODE_ELEMENT && f.is("li") } function x(f) { return y(f) && z(f) } var y = CKEDITOR.dom.walker.whitespaces(!0), z = CKEDITOR.dom.walker.bookmark(!1, !0), u = CKEDITOR.TRISTATE_DISABLED, v = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (f) {
                function g(f) {
                    k.specificDefinition.apply(this,
                        arguments); this.requiredContent = ["ul", "ol"]; f.on("key", function (g) { var c = f.elementPath(); if ("wysiwyg" == f.mode && g.data.keyCode == this.indentKey && c) { var m = this.getContext(c); !m || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, m) || (f.execCommand(this.relatedGlobal), g.cancel()) } }, this); this.jobs[this.isIndent ? 10 : 30] = {
                            refresh: this.isIndent ? function (f, c) { var g = this.getContext(c), b = CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, g); return g && this.isIndent && !b ? v : u } : function (f,
                                c) { return !this.getContext(c) || this.isIndent ? u : v }, exec: CKEDITOR.tools.bind(w, this)
                        }
                } var k = CKEDITOR.plugins.indent; k.registerCommands(f, { indentlist: new g(f, "indentlist", !0), outdentlist: new g(f, "outdentlist") }); CKEDITOR.tools.extend(g.prototype, k.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
            }
        }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (f, g, k) { var q = g.contains(n); k || (k = g.contains(f)); return k && q && q.equals(k.getFirst(n)) }
    })(); (function () {
        function g(a, b) { var c = l.exec(a), d = l.exec(b); if (c) { if (!c[2] && "px" == d[2]) return d[1]; if ("px" == c[2] && !d[2]) return d[1] + "px" } return b } var k = CKEDITOR.htmlParser.cssStyle, h = CKEDITOR.tools.cssLength, l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, m = {
            elements: {
                $: function (a) {
                    var b = a.attributes; if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                        var c = (new k(a)).rules; a = b.attributes; var d = c.width,
                            c = c.height; d && (a.width = g(a.width, d)); c && (a.height = g(a.height, c))
                    } return b
                }
            }
        }; CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(m, { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects, e = e[c] || e.unknown; b = {
                "class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type,
                alt: e, title: e, align: a.getAttribute("align") || ""
            }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b["data-cke-real-element-type"] = c); d && (b["data-cke-resizable"] = d, c = new k, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b)); return this.document.createElement("img", { attributes: b })
        }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects, e = e[c] || e.unknown, f; f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f); f = f.getHtml(); b = { "class": b, "data-cke-realelement": encodeURIComponent(f), "data-cke-real-node-type": a.type, alt: e, title: e, align: a.attributes.align || "" }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b["data-cke-real-element-type"] = c); d && (b["data-cke-resizable"] = d, d = a.attributes, a = new k, c = d.width, d = d.height, void 0 !== c && (a.rules.width = h(c)), void 0 !== d && (a.rules.height = h(d)), a.populate(b)); return new CKEDITOR.htmlParser.element("img", b)
        }; CKEDITOR.editor.prototype.restoreRealElement =
            function (a) { if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document); if (a.data("cke-resizable")) { var c = a.getStyle("width"); a = a.getStyle("height"); c && b.setAttribute("width", g(b.getAttribute("width"), c)); a && b.setAttribute("height", g(b.getAttribute("height"), a)) } return b }
    })(); (function () {
        function p(c) { return c.replace(/'/g, "\\$\x26") } function q(c) { for (var b = c.length, a = [], e, f = 0; f < b; f++)e = c.charCodeAt(f), a.push(e); return "String.fromCharCode(" + a.join(",") + ")" } function r(c, b) { for (var a = c.plugins.link, e = a.compiledProtectionFunction.params, a = [a.compiledProtectionFunction.name, "("], f, d, g = 0; g < e.length; g++)f = e[g].toLowerCase(), d = b[f], 0 < g && a.push(","), a.push("'", d ? p(encodeURIComponent(b[f])) : "", "'"); a.push(")"); return a.join("") } function n(c) {
            c = c.config.emailProtection || ""; var b;
            c && "encode" != c && (b = {}, c.replace(/^([^(]+)\(([^)]+)\)$/, function (a, c, f) { b.name = c; b.params = []; f.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b
        } CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects", onLoad: function () {
                function c(b) { return a.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) } var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                    a = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(c("ltr") + c("rtl"))
            }, init: function (c) {
                var b = "a[!href]"; CKEDITOR.dialog.isTabEnabled(c, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")); CKEDITOR.dialog.isTabEnabled(c, "link", "target") &&
                    (b = b.replace("]", ",target,onclick]")); c.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: b, requiredContent: "a[href]" })); c.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); c.addCommand("unlink", new CKEDITOR.unlinkCommand); c.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); c.setKeystroke(CKEDITOR.CTRL + 76, "link"); c.setKeystroke(CKEDITOR.CTRL + 75, "link"); c.ui.addButton && (c.ui.addButton("Link", {
                        label: c.lang.link.toolbar,
                        command: "link", toolbar: "links,10"
                    }), c.ui.addButton("Unlink", { label: c.lang.link.unlink, command: "unlink", toolbar: "links,20" }), c.ui.addButton("Anchor", { label: c.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); c.on("doubleclick", function (a) {
                        var b = a.data.element.getAscendant({ a: 1, img: 1 }, !0); b && !b.isReadOnly() && (b.is("a") ? (a.data.dialog = !b.getAttribute("name") || b.getAttribute("href") &&
                            b.getChildCount() ? "link" : "anchor", a.data.link = b) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, b) && (a.data.dialog = "anchor"))
                    }, null, null, 0); c.on("doubleclick", function (a) { a.data.dialog in { link: 1, anchor: 1 } && a.data.link && c.getSelection().selectElement(a.data.link) }, null, null, 20); c.addMenuItems && c.addMenuItems({
                        anchor: { label: c.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 }, removeAnchor: { label: c.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: {
                            label: c.lang.link.menu,
                            command: "link", group: "link", order: 1
                        }, unlink: { label: c.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                    }); c.contextMenu && c.contextMenu.addListener(function (a) {
                        if (!a || a.isReadOnly()) return null; a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a); if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(c))) return null; var b = {}; a.getAttribute("href") && a.getChildCount() && (b = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); a && a.hasAttribute("name") && (b.anchor = b.removeAnchor = CKEDITOR.TRISTATE_OFF);
                        return b
                    }); this.compiledProtectionFunction = n(c)
            }, afterInit: function (c) { c.dataProcessor.dataFilter.addRules({ elements: { a: function (a) { return a.attributes.name ? a.children.length ? null : c.createFakeParserElement(a, "cke_anchor", "anchor") : null } } }); var b = c._.elementsPath && c._.elementsPath.filters; b && b.push(function (a, b) { if ("a" == b && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()))) return "anchor" }) }
        }); var t = /^javascript:/, u = /^(?:mailto)(?:(?!\?(subject|body)=).)+/i,
            v = /subject=([^;?:@&=$,\/]*)/i, w = /body=([^;?:@&=$,\/]*)/i, x = /^#(.*)$/, y = /^((?:http|https|ftp|news):\/\/)?(.*)$/, z = /^(_(?:self|top|parent|blank))$/, A = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, B = /^javascript:([^(]+)\(([^)]+)\)$/, C = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, D = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, E = /^tel:(.*)$/, m = {
                id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName",
                lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel"
            }; CKEDITOR.plugins.link = {
                getSelectedLink: function (c, b) {
                    var a = c.getSelection(), e = a.getSelectedElement(), f = a.getRanges(), d = [], g; if (!b && e && e.is("a")) return e; for (e = 0; e < f.length; e++)if (g = a.getRanges()[e], g.shrink(CKEDITOR.SHRINK_ELEMENT, !0, { skipBogus: !0 }), (g = c.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) d.push(g); else if (g) return g; return b ?
                        d : null
                }, getEditorAnchors: function (c) { for (var b = c.editable(), a = b.isInline() && !c.plugins.divarea ? c.document : b, b = a.getElementsByTag("a"), a = a.getElementsByTag("img"), e = [], f = 0, d; d = b.getItem(f++);)(d.data("cke-saved-name") || d.hasAttribute("name")) && e.push({ name: d.data("cke-saved-name") || d.getAttribute("name"), id: d.getAttribute("id") }); for (f = 0; d = a.getItem(f++);)(d = this.tryRestoreFakeAnchor(c, d)) && e.push({ name: d.getAttribute("name"), id: d.getAttribute("id") }); return e }, fakeAnchor: !0, tryRestoreFakeAnchor: function (c,
                    b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var a = c.restoreRealElement(b); if (a.data("cke-saved-name")) return a } }, parseLinkAttributes: function (c, b) {
                        var a = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", e = c.plugins.link.compiledProtectionFunction, f = c.config.emailProtection, d = {}, g; a.match(t) && ("encode" == f ? a = a.replace(A, function (a, b, c) { c = c || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'") }) : f && a.replace(B, function (a,
                            b, c) { if (b == e.name) { d.type = "email"; a = d.email = {}; b = /(^')|('$)/g; c = c.match(/[^,\s]+/g); for (var f = c.length, g, h, k = 0; k < f; k++)g = decodeURIComponent, h = c[k].replace(b, "").replace(/\\'/g, "'"), h = g(h), g = e.params[k].toLowerCase(), a[g] = h; a.address = [a.name, a.domain].join("@") } })); if (!d.type) if (f = a.match(x)) d.type = "anchor", d.anchor = {}, d.anchor.name = d.anchor.id = f[1]; else if (f = a.match(E)) d.type = "tel", d.tel = f[1]; else if (f = a.match(u)) {
                                g = a.match(v); var a = a.match(w), k = d.email = {}; d.type = "email"; k.address = f[0].replace("mailto:",
                                    ""); g && (k.subject = decodeURIComponent(g[1])); a && (k.body = decodeURIComponent(a[1]))
                            } else a && (g = a.match(y)) && (d.type = "url", d.url = {}, d.url.protocol = g[1], d.url.url = g[2]); if (b) {
                                if (a = b.getAttribute("target")) d.target = { type: a.match(z) ? a : "frame", name: a }; else if (a = (a = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && a.match(C)) for (d.target = { type: "popup", name: a[1] }; f = D.exec(a[2]);)"yes" != f[2] && "1" != f[2] || f[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(f[2]) && (d.target[f[1]] = f[2]) : d.target[f[1]] = !0; null !==
                                    b.getAttribute("download") && (d.download = !0); var a = {}, h; for (h in m) (f = b.getAttribute(h)) && (a[m[h]] = f); if (h = b.data("cke-saved-name") || a.advName) a.advName = h; CKEDITOR.tools.isEmpty(a) || (d.advanced = a)
                            } return d
                    }, getLinkAttributes: function (c, b) {
                        var a = c.config.emailProtection || "", e = {}; switch (b.type) {
                            case "url": var a = b.url && void 0 !== b.url.protocol ? b.url.protocol : "http://", f = b.url && CKEDITOR.tools.trim(b.url.url) || ""; e["data-cke-saved-href"] = 0 === f.indexOf("/") ? f : a + f; break; case "anchor": a = b.anchor && b.anchor.id;
                                e["data-cke-saved-href"] = "#" + (b.anchor && b.anchor.name || a || ""); break; case "email": var d = b.email, f = d.address; switch (a) {
                                    case "": case "encode": var g = encodeURIComponent(d.subject || ""), k = encodeURIComponent(d.body || ""), d = []; g && d.push("subject\x3d" + g); k && d.push("body\x3d" + k); d = d.length ? "?" + d.join("\x26") : ""; "encode" == a ? (a = ["javascript:void(location.href\x3d'mailto:'+", q(f)], d && a.push("+'", p(d), "'"), a.push(")")) : a = ["mailto:", f, d]; break; default: a = f.split("@", 2), d.name = a[0], d.domain = a[1], a = ["javascript:", r(c,
                                        d)]
                                }e["data-cke-saved-href"] = a.join(""); break; case "tel": e["data-cke-saved-href"] = "tel:" + b.tel
                        }if (b.target) if ("popup" == b.target.type) {
                            for (var a = ["window.open(this.href, '", b.target.name || "", "', '"], h = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), f = h.length, g = function (a) { b.target[a] && h.push(a + "\x3d" + b.target[a]) }, d = 0; d < f; d++)h[d] += b.target[h[d]] ? "\x3dyes" : "\x3dno"; g("width"); g("left"); g("height"); g("top"); a.push(h.join(","), "'); return false;"); e["data-cke-pa-onclick"] =
                                a.join("")
                        } else "notSet" != b.target.type && b.target.name && (e.target = b.target.name); b.download && (e.download = ""); if (b.advanced) { for (var l in m) (a = b.advanced[m[l]]) && (e[l] = a); e.name && (e["data-cke-saved-name"] = e.name) } e["data-cke-saved-href"] && (e.href = e["data-cke-saved-href"]); l = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 }; b.advanced && CKEDITOR.tools.extend(l, m); for (var n in e) delete l[n]; return { set: e, removed: CKEDITOR.tools.object.keys(l) }
                    }, showDisplayTextForElement: function (c,
                        b) { var a = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, e = b.getSelection(); return b.widgets && b.widgets.focused || e && 1 < e.getRanges().length ? !1 : !c || !c.getName || !c.is(a) }
            }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                exec: function (c) {
                    if (CKEDITOR.env.ie) {
                        var b = c.getSelection().getRanges()[0], a = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) || b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0), e; b.collapsed && a &&
                            (e = b.createBookmark(), b.selectNodeContents(a), b.select())
                    } a = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); c.removeStyle(a); e && (b.moveToBookmark(e), b.select())
                }, refresh: function (c, b) { var a = b.lastElement && b.lastElement.getAscendant("a", !0); a && "a" == a.getName() && a.getAttribute("href") && a.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
            }; CKEDITOR.removeAnchorCommand =
                function () { }; CKEDITOR.removeAnchorCommand.prototype = { exec: function (c) { var b = c.getSelection(), a = b.createBookmarks(), e; if (b && (e = b.getSelectedElement()) && (e.getChildCount() ? e.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, e))) e.remove(1); else if (e = CKEDITOR.plugins.link.getSelectedLink(c)) e.hasAttribute("href") ? (e.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), e.removeClass("cke_anchor")) : e.remove(1); b.selectBookmarks(a) }, requiredContent: "a[name]" }; CKEDITOR.tools.extend(CKEDITOR.config, {
                    linkShowAdvancedTab: !0,
                    linkShowTargetTab: !0, linkDefaultProtocol: "http://"
                })
    })(); (function () {
        function K(a, l, d, f) {
            for (var e = CKEDITOR.plugins.list.listToArray(l.root, d), g = [], b = 0; b < l.contents.length; b++) { var h = l.contents[b]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(d, h, "list_item_processed", !0)) } for (var h = l.root.getDocument(), k, c, b = 0; b < g.length; b++) {
                var p = g[b].getCustomData("listarray_index"); k = e[p].parent; k.is(this.type) || (c = h.createElement(this.type), k.copyAttributes(c, { start: 1, type: 1 }), c.removeStyle("list-style-type"),
                    e[p].parent = c)
            } d = CKEDITOR.plugins.list.arrayToList(e, d, null, a.config.enterMode); for (var m, e = d.listNode.getChildCount(), b = 0; b < e && (m = d.listNode.getChild(b)); b++)m.getName() == this.type && f.push(m); d.listNode.replace(l.root); a.fire("contentDomInvalidated")
        } function L(a, l, d) {
            var f = l.contents, e = l.root.getDocument(), g = []; if (1 == f.length && f[0].equals(l.root)) { var b = e.createElement("div"); f[0].moveChildren && f[0].moveChildren(b); f[0].append(b); f[0] = b } l = l.contents[0].getParent(); for (b = 0; b < f.length; b++)l = l.getCommonAncestor(f[b].getParent());
            a = a.config.useComputedState; var h, k; a = void 0 === a || a; for (b = 0; b < f.length; b++)for (var c = f[b], p; p = c.getParent();) { if (p.equals(l)) { g.push(c); !k && c.getDirection() && (k = 1); c = c.getDirection(a); null !== h && (h = h && h != c ? null : c); break } c = p } if (!(1 > g.length)) {
                f = g[g.length - 1].getNext(); b = e.createElement(this.type); for (d.push(b); g.length;)d = g.shift(), a = e.createElement("li"), c = d, c.is("pre") || M.test(c.getName()) || "false" == c.getAttribute("contenteditable") ? d.appendTo(a) : (d.copyAttributes(a), h && d.getDirection() && (a.removeStyle("direction"),
                    a.removeAttribute("dir")), d.moveChildren(a), d.remove()), a.appendTo(b); h && k && b.setAttribute("dir", h); f ? b.insertBefore(f) : b.appendTo(l)
            }
        } function N(a, l, d) {
            function f(b) { if (!(!(c = k[b ? "getFirst" : "getLast"]()) || c.is && c.isBlockBoundary() || !(p = l.root[b ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || p.is && p.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[b ? "insertBefore" : "insertAfter"](c) } for (var e = CKEDITOR.plugins.list.listToArray(l.root, d), g = [], b = 0; b < l.contents.length; b++) {
                var h =
                    l.contents[b]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(d, h, "list_item_processed", !0))
            } h = null; for (b = 0; b < g.length; b++)h = g[b].getCustomData("listarray_index"), e[h].indent = -1; for (b = h + 1; b < e.length; b++)if (e[b].indent > e[b - 1].indent + 1) { g = e[b - 1].indent + 1 - e[b].indent; for (h = e[b].indent; e[b] && e[b].indent >= h;)e[b].indent += g, b++; b-- } var k = CKEDITOR.plugins.list.arrayToList(e, d, null, a.config.enterMode, l.root.getAttribute("dir")).listNode, c, p;
            f(!0); f(); k.replace(l.root); a.fire("contentDomInvalidated")
        } function C(a, l) { this.name = a; this.context = this.type = l; this.allowedContent = l + " li"; this.requiredContent = l } function F(a, l, d, f) { for (var e, g; e = a[f ? "getLast" : "getFirst"](O);)(g = e.getDirection(1)) !== l.getDirection(1) && e.setAttribute("dir", g), e.remove(), d ? e[f ? "insertBefore" : "insertAfter"](d) : l.append(e, f), d = e } function G(a) {
            function l(d) {
                var f = a[d ? "getPrevious" : "getNext"](t); f && f.type == CKEDITOR.NODE_ELEMENT && f.is(a.getName()) && (F(a, f, null, !d), a.remove(),
                    a = f)
            } l(); l(1)
        } function H(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function D(a, l, d) {
            a.fire("saveSnapshot"); d.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var f = d.extractContents(); l.trim(!1, !0); var e = l.createBookmark(), g = new CKEDITOR.dom.elementPath(l.startContainer), b = g.block, g = g.lastElement.getAscendant("li", 1) || b, h = new CKEDITOR.dom.elementPath(d.startContainer), k = h.contains(CKEDITOR.dtd.$listItem),
                h = h.contains(CKEDITOR.dtd.$list); b ? (b = b.getBogus()) && b.remove() : h && (b = h.getPrevious(t)) && z(b) && b.remove(); (b = f.getLast()) && b.type == CKEDITOR.NODE_ELEMENT && b.is("br") && b.remove(); (b = l.startContainer.getChild(l.startOffset)) ? f.insertBefore(b) : l.startContainer.append(f); k && (f = A(k)) && (g.contains(k) ? (F(f, k.getParent(), k), f.remove()) : g.append(f)); for (; d.checkStartOfBlock() && d.checkEndOfBlock();) {
                    h = d.startPath(); f = h.block; if (!f) break; f.is("li") && (g = f.getParent(), f.equals(g.getLast(t)) && f.equals(g.getFirst(t)) &&
                        (f = g)); d.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); f.remove()
                } d = d.clone(); f = a.editable(); d.setEndAt(f, CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = function (a) { return t(a) && !z(a) }; (d = d.next()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in CKEDITOR.dtd.$list && G(d); l.moveToBookmark(e); l.select(); a.fire("saveSnapshot")
        } function A(a) { return (a = a.getLast(t)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in u ? a : null } var u = { ol: 1, ul: 1 }, P = CKEDITOR.dom.walker.whitespaces(), I = CKEDITOR.dom.walker.bookmark(),
            t = function (a) { return !(P(a) || I(a)) }, z = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                listToArray: function (a, l, d, f, e) {
                    if (!u[a.getName()]) return []; f || (f = 0); d || (d = []); for (var g = 0, b = a.getChildCount(); g < b; g++) {
                        var h = a.getChild(g); h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, l, d, f + 1); if ("li" == h.$.nodeName.toLowerCase()) {
                            var k = { parent: a, indent: f, element: h, contents: [] }; e ? k.grandparent = e : (k.grandparent = a.getParent(), k.grandparent && "li" == k.grandparent.$.nodeName.toLowerCase() &&
                                (k.grandparent = k.grandparent.getParent())); l && CKEDITOR.dom.element.setMarker(l, h, "listarray_index", d.length); d.push(k); for (var c = 0, p = h.getChildCount(), m; c < p; c++)m = h.getChild(c), m.type == CKEDITOR.NODE_ELEMENT && u[m.getName()] ? CKEDITOR.plugins.list.listToArray(m, l, d, f + 1, k.grandparent) : k.contents.push(m)
                        }
                    } return d
                }, arrayToList: function (a, l, d, f, e) {
                    d || (d = 0); if (!a || a.length < d + 1) return null; for (var g, b = a[d].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(b), k = null, c = d, p = Math.max(a[d].indent, 0), m =
                        null, n, r, y = f == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                            var q = a[c]; g = q.grandparent; n = q.element.getDirection(1); if (q.indent == p) { k && a[c].parent.getName() == k.getName() || (k = a[c].parent.clone(!1, 1), e && k.setAttribute("dir", e), h.append(k)); m = k.append(q.element.clone(0, 1)); n != k.getDirection(1) && m.setAttribute("dir", n); for (g = 0; g < q.contents.length; g++)m.append(q.contents[g].clone(1, 1)); c++ } else if (q.indent == Math.max(p, 0) + 1) q = a[c - 1].element.getDirection(1), c = CKEDITOR.plugins.list.arrayToList(a, null, c, f, q != n ? n : null), !m.getChildCount() &&
                                CKEDITOR.env.needsNbspFiller && 7 >= b.$.documentMode && m.append(b.createText(" ")), m.append(c.listNode), c = c.nextIndex; else if (-1 == q.indent && !d && g) {
                                    u[g.getName()] ? (m = q.element.clone(!1, !0), n != g.getDirection(1) && m.setAttribute("dir", n)) : m = new CKEDITOR.dom.documentFragment(b); var k = g.getDirection(1) != n, w = q.element, B = w.getAttribute("class"), E = w.getAttribute("style"), J = m.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (f != CKEDITOR.ENTER_BR || k || E || B), v, z = q.contents.length, x; for (g = 0; g < z; g++)if (v = q.contents[g], I(v) &&
                                        1 < z) J ? x = v.clone(1, 1) : m.append(v.clone(1, 1)); else if (v.type == CKEDITOR.NODE_ELEMENT && v.isBlockBoundary()) { k && !v.getDirection() && v.setAttribute("dir", n); r = v; var A = w.getAttribute("style"); A && r.setAttribute("style", A.replace(/([^;])$/, "$1;") + (r.getAttribute("style") || "")); B && v.addClass(B); r = null; x && (m.append(x), x = null); m.append(v.clone(1, 1)) } else J ? (r || (r = b.createElement(y), m.append(r), k && r.setAttribute("dir", n)), E && r.setAttribute("style", E), B && r.setAttribute("class", B), x && (r.append(x), x = null), r.append(v.clone(1,
                                            1))) : m.append(v.clone(1, 1)); x && ((r || m).append(x), x = null); m.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && c != a.length - 1 && (CKEDITOR.env.needsBrFiller && (n = m.getLast()) && n.type == CKEDITOR.NODE_ELEMENT && n.is("br") && n.remove(), (n = m.getLast(t)) && n.type == CKEDITOR.NODE_ELEMENT && n.is(CKEDITOR.dtd.$block) || m.append(b.createElement("br"))); n = m.$.nodeName.toLowerCase(); "div" != n && "p" != n || m.appendBogus(); h.append(m); k = null; c++
                                } else return null; r = null; if (a.length <= c || Math.max(a[c].indent, 0) < p) break
                    } if (l) for (a = h.getFirst(); a;) {
                        if (a.type ==
                            CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(l, a), a.getName() in CKEDITOR.dtd.$listItem && (d = a, b = e = f = void 0, f = d.getDirection()))) { for (e = d.getParent(); e && !(b = e.getDirection());)e = e.getParent(); f == b && d.removeAttribute("dir") } a = a.getNextSourceNode()
                    } return { listNode: h, nextIndex: c }
                }
            }; var M = /^h[1-6]$/, O = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); C.prototype = {
                exec: function (a) {
                    function l(a) { return u[a.root.getName()] && !d(a.root, [CKEDITOR.NODE_COMMENT]) } function d(a, b) {
                        return CKEDITOR.tools.array.filter(a.getChildren().toArray(),
                            function (a) { return -1 === CKEDITOR.tools.array.indexOf(b, a.type) }).length
                    } function f(a) { var b = !0; if (0 === a.getChildCount()) return !1; a.forEach(function (a) { if (a.type !== CKEDITOR.NODE_COMMENT) return b = !1 }, null, !0); return b } this.refresh(a, a.elementPath()); var e = a.config, g = a.getSelection(), b = g && g.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) {
                        var h = a.editable(); if (h.getFirst(t)) { var k = 1 == b.length && b[0]; (e = k && k.getEnclosedNode()) && e.is && this.type == e.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else e.enterMode ==
                            CKEDITOR.ENTER_BR ? h.appendBogus() : b[0].fixBlock(1, e.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), g.selectRanges(b)
                    } for (var e = g.createBookmarks(!0), h = [], c = {}, b = b.createIterator(), p = 0; (k = b.getNextRange()) && ++p;) {
                        var m = k.getBoundaryNodes(), n = m.startNode, r = m.endNode; n.type == CKEDITOR.NODE_ELEMENT && "td" == n.getName() && k.setStartAt(m.startNode, CKEDITOR.POSITION_AFTER_START); r.type == CKEDITOR.NODE_ELEMENT && "td" == r.getName() && k.setEndAt(m.endNode, CKEDITOR.POSITION_BEFORE_END); k = k.createIterator(); for (k.forceBrBreak =
                            this.state == CKEDITOR.TRISTATE_OFF; m = k.getNextParagraph();)if (!m.getCustomData("list_block") && !f(m)) {
                                CKEDITOR.dom.element.setMarker(c, m, "list_block", 1); for (var y = a.elementPath(m), n = y.elements, r = 0, y = y.blockLimit, q, w = n.length - 1; 0 <= w && (q = n[w]); w--)if (u[q.getName()] && y.contains(q)) { y.removeCustomData("list_group_object_" + p); (n = q.getCustomData("list_group_object")) ? n.contents.push(m) : (n = { root: q, contents: [m] }, h.push(n), CKEDITOR.dom.element.setMarker(c, q, "list_group_object", n)); r = 1; break } r || (r = y, r.getCustomData("list_group_object_" +
                                    p) ? r.getCustomData("list_group_object_" + p).contents.push(m) : (n = { root: r, contents: [m] }, CKEDITOR.dom.element.setMarker(c, r, "list_group_object_" + p, n), h.push(n)))
                            }
                    } for (q = []; 0 < h.length;)n = h.shift(), this.state == CKEDITOR.TRISTATE_OFF ? l(n) || (u[n.root.getName()] ? K.call(this, a, n, c, q) : L.call(this, a, n, q)) : this.state == CKEDITOR.TRISTATE_ON && u[n.root.getName()] && !l(n) && N.call(this, a, n, c); for (w = 0; w < q.length; w++)G(q[w]); CKEDITOR.dom.element.clearAllMarkers(c); g.selectBookmarks(e); a.focus()
                }, refresh: function (a, l) {
                    var d =
                        l.contains(u, 1), f = l.blockLimit || l.root; d && f.contains(d) ? this.setState(d.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
                }
            }; CKEDITOR.plugins.add("list", {
                requires: "indentlist", init: function (a) {
                a.blockless || (a.addCommand("numberedlist", new C("numberedlist", "ol")), a.addCommand("bulletedlist", new C("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), a.ui.addButton("BulletedList",
                    { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), a.on("key", function (l) {
                        var d = l.data.domEvent.getKey(), f; if ("wysiwyg" == a.mode && d in { 8: 1, 46: 1 }) {
                            var e = a.getSelection().getRanges()[0], g = e && e.startPath(); if (e && e.collapsed) {
                                var b = 8 == d, h = a.editable(), k = new CKEDITOR.dom.walker(e.clone()); k.evaluator = function (a) { return t(a) && !z(a) }; k.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; d = e.clone(); if (b) {
                                    var c; (c = g.contains(u)) && e.checkBoundaryOfElement(c,
                                        CKEDITOR.START) && (c = c.getParent()) && c.is("li") && (c = A(c)) ? (f = c, c = c.getPrevious(t), d.moveToPosition(c && z(c) ? c : f, CKEDITOR.POSITION_BEFORE_START)) : (k.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START), k.range.setEnd(e.startContainer, e.startOffset), (c = k.previous()) && c.type == CKEDITOR.NODE_ELEMENT && (c.getName() in u || c.is("li")) && (c.is("li") || (k.range.selectNodeContents(c), k.reset(), k.evaluator = H, c = k.previous()), f = c, d.moveToElementEditEnd(f), d.moveToPosition(d.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
                                    if (f) D(a, d, e), l.cancel(); else { var p = g.contains(u); p && e.checkBoundaryOfElement(p, CKEDITOR.START) && (f = p.getFirst(t), e.checkBoundaryOfElement(f, CKEDITOR.START) && (c = p.getPrevious(t), A(f) ? c && (e.moveToElementEditEnd(c), e.select()) : a.execCommand("outdent"), l.cancel())) }
                                } else if (f = g.contains("li")) {
                                    if (k.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), b = (h = f.getLast(t)) && H(h) ? h : f, g = 0, (c = k.next()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in u && c.equals(h) ? (g = 1, c = k.next()) : e.checkBoundaryOfElement(b, CKEDITOR.END) &&
                                        (g = 2), g && c) { e = e.clone(); e.moveToElementEditStart(c); if (1 == g && (d.optimize(), !d.startContainer.equals(f))) { for (f = d.startContainer; f.is(CKEDITOR.dtd.$inline);)p = f, f = f.getParent(); p && d.moveToPosition(p, CKEDITOR.POSITION_AFTER_END) } 2 == g && (d.moveToPosition(d.endPath().block, CKEDITOR.POSITION_BEFORE_END), e.endPath().block && e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_AFTER_START)); D(a, d, e); l.cancel() }
                                } else k.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (c = k.next()) && c.type == CKEDITOR.NODE_ELEMENT &&
                                    c.is(u) && (c = c.getFirst(t), g.block && e.checkStartOfBlock() && e.checkEndOfBlock() ? (g.block.remove(), e.moveToElementEditStart(c), e.select()) : A(c) ? (e.moveToElementEditStart(c), e.select()) : (e = e.clone(), e.moveToElementEditStart(c), D(a, d, e)), l.cancel()); setTimeout(function () { a.selectionChange(1) })
                            }
                        }
                    }))
                }
            })
    })(); (function () {
        function V(a, c, d) { return n(c) && n(d) && d.equals(c.getNext(function (a) { return !(E(a) || F(a) || u(a)) })) } function z(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function O(a) { var c = a.element; if (c && n(c) && (c = c.getAscendant(a.triggers, !0)) && a.editable.contains(c)) { var d = P(c); if ("true" == d.getAttribute("contenteditable")) return c; if (d.is(a.triggers)) return d } return null } function ka(a, c, d) { r(a, c); r(a, d); a = c.size.bottom; d = d.size.top; return a && d ? 0 | (a + d) / 2 : a || d } function w(a, c, d) {
            return c =
                c[d ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !E(b) || n(b) && !u(b) && !A(a, b) })
        } function q(a, c, d) { return a > c && a < d } function P(a, c) { if (a.data("cke-editable")) return null; for (c || (a = a.getParent()); a && !a.data("cke-editable");) { if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null } function la(a) {
            var c = a.doc, d = G('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e',
                c), b = CKEDITOR.getUrl(this.path + "images/" + (t.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); v(d, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this }, lineChildren: [v(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', c), {
                        base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + b + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (t.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" :
                            "") + (t.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
                    }), v(G(W, c), { base: X + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), v(G(W, c), {
                        base: X + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px",
                            "border-width:0 8px 8px 0;top:0px"]
                    })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () { r(a, this); var b = a.holdDistance, c = this.size; return c && q(a.mouse.y, c.top - b, c.bottom + b) && q(a.mouse.x, c.left - b, c.right + b) ? !0 : !1 }, place: function () {
                        var b = a.view, c = a.editable, d = a.trigger, h = d.upper, g = d.lower, l = h || g, p = l.getParent(), m = {}; this.trigger = d; h && r(a, h, !0); g && r(a, g, !0); r(a, p, !0); a.inInlineMode && H(a, !0); p.equals(c) ? (m.left = b.scroll.x, m.right = -b.scroll.x, m.width = "") : (m.left =
                            l.size.left - l.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), m.width = l.size.outerWidth + l.size.margin.left + l.size.margin.right + b.scroll.x, m.right = ""); h && g ? m.top = h.size.margin.bottom === g.size.margin.top ? 0 | h.size.bottom + h.size.margin.bottom / 2 : h.size.margin.bottom < g.size.margin.top ? h.size.bottom + h.size.margin.bottom : h.size.bottom + h.size.margin.bottom - g.size.margin.top : h ? g || (m.top = h.size.bottom + h.size.margin.bottom) : m.top = g.size.top - g.size.margin.top; d.is(C) || q(m.top,
                                b.scroll.y - 15, b.scroll.y + 5) ? (m.top = a.inInlineMode ? 0 : b.scroll.y, this.look(C)) : d.is(D) || q(m.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (m.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(D)) : (a.inInlineMode && (m.top -= b.editable.top + b.editable.border.top), this.look(x)); a.inInlineMode && (m.top--, m.top += b.editable.scroll.top, m.left += b.editable.scroll.left); for (var n in m) m[n] = CKEDITOR.tools.cssLength(m[n]); this.setStyles(m)
                    }, look: function (a) {
                        if (this.oldLook !=
                            a) { for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]); this.oldLook = a }
                    }, wrap: new R("span", a.doc)
                }); for (c = d.lineChildren.length; c--;)d.lineChildren[c].appendTo(d); d.look(x); d.appendTo(d.wrap); d.unselectable(); d.lineChildren[0].on("mouseup", function (b) {
                    d.detach(); S(a, function (b) { var c = a.line.trigger; b[c.is(I) ? "insertBefore" : "insertAfter"](c.is(I) ? c.lower : c.upper) }, !0); a.editor.focus(); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
                    b.data.preventDefault(!0)
                }); d.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = d
        } function S(a, c, d) { var b = new CKEDITOR.dom.range(a.doc), e = a.editor, f; t.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(J) : (f = (f = P(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new R(K[f], a.doc), f.is("br") || a.doc.createText(J).appendTo(f)); d && e.fire("saveSnapshot"); c(f); b.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); e.getSelection().selectRanges([b]); a.hotNode = f; d && e.fire("saveSnapshot") }
        function Y(a, c) {
            return {
                canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                    function d(b) { var d = t.ie && 9 > t.version ? " " : J, f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c; S(a, function (d) { f && a.hotNode && a.hotNode.remove(); d[c ? "insertAfter" : "insertBefore"](b); d.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c }); a.lastCmdDirection = !!c }); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach() } return function (b) {
                        b = b.getSelection().getStartElement();
                        var e; b = b.getAscendant(Z, 1); if (!aa(a, b) && b && !b.equals(a.editable) && !b.contains(a.editable)) { (e = P(b)) && "false" == e.getAttribute("contenteditable") && (b = e); a.element = b; e = w(a, b, !c); var f; n(e) && e.is(a.triggers) && e.is(ma) && (!w(a, e, !c) || (f = w(a, e, !c)) && n(f) && f.is(a.triggers)) ? d(e) : (f = O(a, b), n(f) && (w(a, f, !c) ? (b = w(a, f, !c)) && n(b) && b.is(a.triggers) && d(f) : d(f))) }
                    }
                }()
            }
        } function A(a, c) { if (!c || c.type != CKEDITOR.NODE_ELEMENT || !c.$) return !1; var d = a.line; return d.wrap.equals(c) || d.wrap.contains(c) } function n(a) {
            return a &&
                a.type == CKEDITOR.NODE_ELEMENT && a.$
        } function u(a) { if (!n(a)) return !1; var c; (c = ba(a)) || (n(a) ? (c = { left: 1, right: 1, center: 1 }, c = !(!c[a.getComputedStyle("float")] && !c[a.getAttribute("align")])) : c = !1); return c } function ba(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] } function L(a, c) { return n(c) ? c.is(a.triggers) : null } function aa(a, c) { if (!c) return !1; for (var d = c.getParents(1), b = d.length; b--;)for (var e = a.tabuList.length; e--;)if (d[b].hasAttribute(a.tabuList[e])) return !0; return !1 } function na(a,
            c, d) { c = c[d ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(oa) }); if (!c) return !1; r(a, c); return d ? c.size.top > a.mouse.y : c.size.bottom < a.mouse.y } function ca(a) {
                var c = a.editable, d = a.mouse, b = a.view, e = a.triggerOffset; H(a); var f = d.y > (a.inInlineMode ? b.editable.top + b.editable.height / 2 : Math.min(b.editable.height, b.pane.height) / 2), c = c[f ? "getLast" : "getFirst"](function (a) { return !(E(a) || F(a)) }); if (!c) return null; A(a, c) && (c = a.line.wrap[f ? "getPrevious" : "getNext"](function (a) { return !(E(a) || F(a)) }));
                if (!n(c) || u(c) || !L(a, c)) return null; r(a, c); return !f && 0 <= c.size.top && q(d.y, 0, c.size.top + e) ? (a = a.inInlineMode || 0 === b.scroll.y ? C : x, new z([null, c, I, M, a])) : f && c.size.bottom <= b.pane.height && q(d.y, c.size.bottom - e, b.pane.height) ? (a = a.inInlineMode || q(c.size.bottom, b.pane.height - e, b.pane.height) ? D : x, new z([c, null, da, M, a])) : null
            } function ea(a) {
                var c = a.mouse, d = a.view, b = a.triggerOffset, e = O(a); if (!e) return null; r(a, e); var b = Math.min(b, 0 | e.size.outerHeight / 2), f = [], k, h; if (q(c.y, e.size.top - 1, e.size.top + b)) h = !1; else if (q(c.y,
                    e.size.bottom - b, e.size.bottom + 1)) h = !0; else return null; if (u(e) || na(a, e, h) || e.getParent().is(fa)) return null; var g = w(a, e, !h); if (g) { if (g && g.type == CKEDITOR.NODE_TEXT) return null; if (n(g)) { if (u(g) || !L(a, g) || g.getParent().is(fa)) return null; f = [g, e][h ? "reverse" : "concat"]().concat([T, M]) } } else e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? (H(a), h && q(c.y, e.size.bottom - b, d.pane.height) && q(e.size.bottom, d.pane.height - b, d.pane.height) ? k = D : q(c.y, 0, e.size.top + b) && (k = C)) : k = x, f = [null, e][h ? "reverse" :
                        "concat"]().concat([h ? da : I, M, k, e.equals(a.editable[h ? "getLast" : "getFirst"](a.isRelevant)) ? h ? D : C : x]); return 0 in f ? new z(f) : null
            } function U(a, c, d, b) {
                for (var e = c.getDocumentPosition(), f = {}, k = {}, h = {}, g = {}, l = y.length; l--;)f[y[l]] = parseInt(c.getComputedStyle.call(c, "border-" + y[l] + "-width"), 10) || 0, h[y[l]] = parseInt(c.getComputedStyle.call(c, "padding-" + y[l]), 10) || 0, k[y[l]] = parseInt(c.getComputedStyle.call(c, "margin-" + y[l]), 10) || 0; d && !b || N(a, b); g.top = e.y - (d ? 0 : a.view.scroll.y); g.left = e.x - (d ? 0 : a.view.scroll.x);
                g.outerWidth = c.$.offsetWidth; g.outerHeight = c.$.offsetHeight; g.height = g.outerHeight - (h.top + h.bottom + f.top + f.bottom); g.width = g.outerWidth - (h.left + h.right + f.left + f.right); g.bottom = g.top + g.outerHeight; g.right = g.left + g.outerWidth; a.inInlineMode && (g.scroll = { top: c.$.scrollTop, left: c.$.scrollLeft }); return v({ border: f, padding: h, margin: k, ignoreScroll: d }, g, !0)
            } function r(a, c, d) {
                if (!n(c)) return c.size = null; if (!c.size) c.size = {}; else if (c.size.ignoreScroll == d && c.size.date > new Date - ga) return null; return v(c.size,
                    U(a, c, d), { date: +new Date }, !0)
            } function H(a, c) { a.view.editable = U(a, a.editable, c, !0) } function N(a, c) { a.view || (a.view = {}); var d = a.view; if (!(!c && d && d.date > new Date - ga)) { var b = a.win, d = b.getScrollPosition(), b = b.getViewPaneSize(); v(a.view, { scroll: { x: d.x, y: d.y, width: a.doc.$.documentElement.scrollWidth - b.width, height: a.doc.$.documentElement.scrollHeight - b.height }, pane: { width: b.width, height: b.height, bottom: b.height + d.y }, date: +new Date }, !0) } } function pa(a, c, d, b) {
                for (var e = b, f = b, k = 0, h = !1, g = !1, l = a.view.pane.height,
                    p = a.mouse; p.y + k < l && 0 < p.y - k;) { h || (h = c(e, b)); g || (g = c(f, b)); !h && 0 < p.y - k && (e = d(a, { x: p.x, y: p.y - k })); !g && p.y + k < l && (f = d(a, { x: p.x, y: p.y + k })); if (h && g) break; k += 2 } return new z([e, f, null, null])
            } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var c = a.config, d = c.magicline_triggerOffset || 30, b = {
                        editor: a, enterMode: c.enterMode, triggerOffset: d, holdDistance: 0 | d * (c.magicline_holdDistance || .5), boxColor: c.magicline_color || "#ff0000", rtl: "rtl" == c.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList ||
                            []), triggers: c.magicline_everywhere ? Z : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, e, f, k; b.isRelevant = function (a) { return n(a) && !A(b, a) && !u(a) }; a.on("contentDom", function () {
                        var d = a.editable(), g = a.document, l = a.window; v(b, { editable: d, inInlineMode: d.isInline(), doc: g, win: l, hotNode: null }, !0); b.boundary = b.inInlineMode ? b.editable : b.doc.getDocumentElement(); d.is(B.$inline) || (b.inInlineMode && !ba(d) && d.setStyles({ position: "relative", top: null, left: null }), la.call(this, b), N(b), d.attachListener(a, "beforeUndoImage",
                            function () { b.line.detach() }), d.attachListener(a, "beforeGetData", function () { b.line.wrap.getParent() && (b.line.detach(), a.once("getData", function () { b.line.attach() }, null, null, 1E3)) }, null, null, 0), d.attachListener(b.inInlineMode ? g : g.getWindow().getFrame(), "mouseout", function (c) {
                                if ("wysiwyg" == a.mode) if (b.inInlineMode) { var d = c.data.$.clientX; c = c.data.$.clientY; N(b); H(b, !0); var e = b.view.editable, f = b.view.scroll; d > e.left - f.x && d < e.right - f.x && c > e.top - f.y && c < e.bottom - f.y || (clearTimeout(k), k = null, b.line.detach()) } else clearTimeout(k),
                                    k = null, b.line.detach()
                            }), d.attachListener(d, "keyup", function () { b.hiddenMode = 0 }), d.attachListener(d, "keydown", function (c) { if ("wysiwyg" == a.mode) switch (c.data.getKeystroke()) { case 2228240: case 16: b.hiddenMode = 1, b.line.detach() } }), d.attachListener(b.inInlineMode ? d : g, "mousemove", function (c) {
                                f = !0; if ("wysiwyg" == a.mode && !a.readOnly && !k) {
                                    var d = { x: c.data.$.clientX, y: c.data.$.clientY }; k = setTimeout(function () {
                                    b.mouse = d; k = b.trigger = null; N(b); f && !b.hiddenMode && a.focusManager.hasFocus && !b.line.mouseNear() && (b.element =
                                        ha(b, !0)) && ((b.trigger = ca(b) || ea(b) || ia(b)) && !aa(b, b.trigger.upper || b.trigger.lower) ? b.line.attach().place() : (b.trigger = null, b.line.detach()), f = !1)
                                    }, 30)
                                }
                            }), d.attachListener(l, "scroll", function () { "wysiwyg" == a.mode && (b.line.detach(), t.webkit && (b.hiddenMode = 1, clearTimeout(e), e = setTimeout(function () { b.mouseDown || (b.hiddenMode = 0) }, 50))) }), d.attachListener(ja ? g : l, "mousedown", function () { "wysiwyg" == a.mode && (b.line.detach(), b.hiddenMode = 1, b.mouseDown = 1) }), d.attachListener(ja ? g : l, "mouseup", function () {
                            b.hiddenMode =
                                0; b.mouseDown = 0
                            }), a.addCommand("accessPreviousSpace", Y(b)), a.addCommand("accessNextSpace", Y(b, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, "accessPreviousSpace"], [c.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () { var c, d, e, f; for (f in { p: 1, br: 1, div: 1 }) for (c = a.document.getElementsByTag(f), e = c.count(); e--;)if ((d = c.getItem(e)).data("cke-magicline-hot")) { b.hotNode = d; b.lastCmdDirection = "true" === d.data("cke-magicline-dir") ? !0 : !1; return } }), a._.magiclineBackdoor = {
                                accessFocusSpace: S,
                                boxTrigger: z, isLine: A, getAscendantTrigger: O, getNonEmptyNeighbour: w, getSize: U, that: b, triggerEdge: ea, triggerEditable: ca, triggerExpand: ia
                            })
                    }, this)
                }
            }); var v = CKEDITOR.tools.extend, R = CKEDITOR.dom.element, G = R.createFromHtml, t = CKEDITOR.env, ja = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, B = CKEDITOR.dtd, K = {}, I = 128, da = 64, T = 32, M = 16, C = 4, D = 2, x = 1, J = " ", fa = B.$listItem, oa = B.$tableContent, ma = v({}, B.$nonEditable, B.$empty), Z = B.$block, ga = 100, Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
                X = Q + "border-color:transparent;display:block;border-style:solid;", W = "\x3cspan\x3e" + J + "\x3c/span\x3e"; K[CKEDITOR.ENTER_BR] = "br"; K[CKEDITOR.ENTER_P] = "p"; K[CKEDITOR.ENTER_DIV] = "div"; z.prototype = { set: function (a, c, d) { this.properties = a + c + (d || x); return this }, is: function (a) { return (this.properties & a) == a } }; var ha = function () {
                    function a(a, d) { var b = a.$.elementFromPoint(d.x, d.y); return b && b.nodeType ? new CKEDITOR.dom.element(b) : null } return function (c, d, b) {
                        if (!c.mouse) return null; var e = c.doc, f = c.line.wrap; b = b || c.mouse;
                        var k = a(e, b); d && A(c, k) && (f.hide(), k = a(e, b), f.show()); return !k || k.type != CKEDITOR.NODE_ELEMENT || !k.$ || t.ie && 9 > t.version && !c.boundary.equals(k) && !c.boundary.contains(k) ? null : k
                    }
                }(), E = CKEDITOR.dom.walker.whitespaces(), F = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), ia = function () {
                    function a(a) {
                        var b = a.element, e, f, k; if (!n(b) || b.contains(a.editable) || b.isReadOnly()) return null; k = pa(a, function (a, b) { return !b.equals(a) }, function (a, b) { return ha(a, !0, b) }, b); e = k.upper; f = k.lower; if (V(a, e, f)) return k.set(T,
                            8); if (e && b.contains(e)) for (; !e.getParent().equals(b);)e = e.getParent(); else e = b.getFirst(function (b) { return c(a, b) }); if (f && b.contains(f)) for (; !f.getParent().equals(b);)f = f.getParent(); else f = b.getLast(function (b) { return c(a, b) }); if (!e || !f) return null; r(a, e); r(a, f); if (!q(a.mouse.y, e.size.top, f.size.bottom)) return null; for (var b = Number.MAX_VALUE, h, g, l, p; f && !f.equals(e) && (g = e.getNext(a.isRelevant));)h = Math.abs(ka(a, e, g) - a.mouse.y), h < b && (b = h, l = e, p = g), e = g, r(a, e); if (!l || !p || !q(a.mouse.y, l.size.top, p.size.bottom)) return null;
                        k.upper = l; k.lower = p; return k.set(T, 8)
                    } function c(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || F(b) || u(b) || A(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (c) { var b = a(c), e; if (e = b) { e = b.upper; var f = b.lower; e = !e || !f || u(f) || u(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : L(c, e) && L(c, f) && V(c, e, f) ? !0 : !1 } return e ? b : null }
                }(), y = ["top", "left", "right", "bottom"]
    })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51;
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
        function n(a) { if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var e = [], f = ["style", "className"], b = 0; b < f.length; b++) { var c = a.$.elements.namedItem(f[b]); c && (c = new CKEDITOR.dom.element(c), e.push([c, c.nextSibling]), c.remove()) } return e } function t(a, e) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < e.length) for (var f = e.length - 1; 0 <= f; f--) { var b = e[f][0], c = e[f][1]; c ? b.insertBefore(c) : b.appendTo(a) } } function r(a, e) {
            var f = n(a), b = {}, c = a.$; e || (b["class"] = c.className ||
                "", c.className = ""); b.inline = c.style.cssText || ""; e || (c.style.cssText = "position: static; overflow: visible"); t(f); return b
        } function u(a, e) { var f = n(a), b = a.$; "class" in e && (b.className = e["class"]); "inline" in e && (b.style.cssText = e.inline); t(f) } function v(a) {
            if (!a.editable().isInline()) {
                var e = CKEDITOR.instances, f; for (f in e) { var b = e[f]; "wysiwyg" != b.mode || b.readOnly || (b = b.document.getBody(), b.setAttribute("contentEditable", !1), b.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(),
                    a.focus())
            }
        } CKEDITOR.plugins.add("maximize", {
            init: function (a) {
                function e() { var b = c.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = a.lang, b = CKEDITOR.document, c = b.getWindow(), l, m, p, n = CKEDITOR.TRISTATE_OFF; a.addCommand("maximize", {
                        modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                            var h = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), g = a.ui.space("contents");
                            if ("wysiwyg" == a.mode) { var d = a.getSelection(); l = d && d.getRanges(); m = c.getScrollPosition() } else { var k = a.editable().$; l = !CKEDITOR.env.ie && [k.selectionStart, k.selectionEnd]; m = [k.scrollLeft, k.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                c.on("resize", e); p = c.getScrollPosition(); for (d = a.container; d = d.getParent();)d.setCustomData("maximize_saved_styles", r(d)), d.setStyle("z-index", a.config.baseFloatZIndex - 5); g.setCustomData("maximize_saved_styles", r(g, !0)); h.setCustomData("maximize_saved_styles", r(h, !0));
                                g = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; b.getDocumentElement().setStyles(g); !CKEDITOR.env.gecko && b.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || b.getBody().setStyles(g); CKEDITOR.env.ie ? setTimeout(function () { c.$.scrollTo(0, 0) }, 0) : c.$.scrollTo(0, 0); h.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); h.$.offsetLeft; h.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); h.addClass("cke_maximized");
                                e(); g = h.getDocumentPosition(); h.setStyles({ left: -1 * g.x + "px", top: -1 * g.y + "px" }); CKEDITOR.env.gecko && v(a)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                c.removeListener("resize", e); for (var d = [g, h], q = 0; q < d.length; q++)u(d[q], d[q].getCustomData("maximize_saved_styles")), d[q].removeCustomData("maximize_saved_styles"); for (d = a.container; d = d.getParent();)u(d, d.getCustomData("maximize_saved_styles")), d.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { c.$.scrollTo(p.x, p.y) }, 0) : c.$.scrollTo(p.x,
                                    p.y); h.removeClass("cke_maximized"); CKEDITOR.env.webkit && (h.setStyle("display", "inline"), setTimeout(function () { h.setStyle("display", "block") }, 0)); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: g.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                            } this.toggleState(); if (d = this.uiItems[0]) g = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, d = CKEDITOR.document.getById(d._.id), d.getChild(1).setHtml(g), d.setAttribute("title", g), d.setAttribute("href", 'javascript:void("' +
                                g + '");'); "wysiwyg" == a.mode ? l ? (CKEDITOR.env.gecko && v(a), a.getSelection().selectRanges(l), (k = a.getSelection().getStartElement()) && k.scrollIntoView(!0)) : c.$.scrollTo(m.x, m.y) : (l && (k.selectionStart = l[0], k.selectionEnd = l[1]), k.scrollLeft = m[0], k.scrollTop = m[1]); l = m = null; n = this.state; a.fire("maximize", this.state)
                        }, canUndo: !1
                    }); a.ui.addButton && a.ui.addButton("Maximize", { label: f.maximize.maximize, command: "maximize", toolbar: "tools,10" }); a.on("mode", function () {
                        var b = a.getCommand("maximize"); b.setState(b.state ==
                            CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : n)
                    }, null, null, 100)
                }
            }
        })
    })(); (function () {
        var f = { canUndo: !1, async: !0, exec: function (a, b) { var c = a.lang, e = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), d = b && "undefined" !== typeof b.notification ? b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie, c = d && "string" === typeof d ? d : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + e.aria + '"\x3e' + e.display + "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: d ? c : !1 }) } }; CKEDITOR.plugins.add("pastetext",
            { requires: "clipboard", init: function (a) { var b = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; a.addCommand("pastetext", f); a.setKeystroke(b, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(a, "PasteText", { label: a.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (a.config.forcePasteAsPlainText) a.on("beforePaste", function (a) { "html" != a.data.type && (a.data.type = "text") }); a.on("pasteState", function (b) { a.getCommand("pastetext").setState(b.data) }) } })
    })(); (function () {
        function n(a, b) { return CKEDITOR.tools.array.filter(a, function (a) { return a.canHandle(b) }).sort(function (a, c) { return a.priority === c.priority ? 0 : a.priority - c.priority }) } function k(a, b) { var d = a.shift(); d && d.handle(b, function () { k(a, b) }) } function p(a) { var b = CKEDITOR.tools.array.reduce(a, function (a, c) { return CKEDITOR.tools.array.isArray(c.filters) ? a.concat(c.filters) : a }, []); return CKEDITOR.tools.array.filter(b, function (a, c) { return CKEDITOR.tools.array.indexOf(b, a) === c }) } function l(a, b) {
            var d =
                0, c, e; if (!CKEDITOR.tools.array.isArray(a) || 0 === a.length) return !0; c = CKEDITOR.tools.array.filter(a, function (a) { return -1 === CKEDITOR.tools.array.indexOf(m, a) }); if (0 < c.length) for (e = 0; e < c.length; e++)(function (a) { CKEDITOR.scriptLoader.queue(a, function (e) { e && m.push(a); ++d === c.length && b() }) })(c[e]); return 0 === c.length
        } var m = [], q = CKEDITOR.tools.createClass({
            $: function () { this.handlers = [] }, proto: {
                register: function (a) { "number" !== typeof a.priority && (a.priority = 10); this.handlers.push(a) }, addPasteListener: function (a) {
                    a.on("paste",
                        function (b) { var d = n(this.handlers, b), c; if (0 !== d.length) { c = p(d); c = l(c, function () { return a.fire("paste", b.data) }); if (!c) return b.cancel(); k(d, b) } }, this, null, 3)
                }
            }
        }); CKEDITOR.plugins.add("pastetools", { requires: "clipboard", beforeInit: function (a) { a.pasteTools = new q; a.pasteTools.addPasteListener(a) } }); CKEDITOR.plugins.pastetools = {
            filters: {}, loadFilters: l, createFilter: function (a) {
                var b = CKEDITOR.tools.array.isArray(a.rules) ? a.rules : [a.rules], d = a.additionalTransforms; return function (a, e) {
                    var f = new CKEDITOR.htmlParser.basicWriter,
                    g = new CKEDITOR.htmlParser.filter, h; d && (a = d(a, e)); CKEDITOR.tools.array.forEach(b, function (b) { g.addRules(b(a, e, g)) }); h = CKEDITOR.htmlParser.fragment.fromHtml(a); g.applyTo(h); h.writeHtml(f); return f.getHtml()
                }
            }, getClipboardData: function (a, b) { var d; return CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "text/html" === b ? (d = a.dataTransfer.getData(b, !0)) || "text/html" !== b ? d : a.dataValue : null }, getConfigValue: function (a, b) {
                if (a && a.config) {
                    var d = CKEDITOR.tools, c = a.config, e = d.object.keys(c), f = ["pasteTools_" +
                        b, "pasteFromWord_" + b, "pasteFromWord" + d.capitalize(b, !0)], f = d.array.find(f, function (a) { return -1 !== d.array.indexOf(e, a) }); return c[f]
                }
            }
        }; CKEDITOR.pasteFilters = {}
    })(); (function () {
        CKEDITOR.plugins.add("pastefromgdocs", {
            requires: "pastetools", init: function (a) {
                var c = CKEDITOR.plugins.getPath("pastetools"), d = this.path; a.pasteTools.register({
                    filters: [CKEDITOR.getUrl(c + "filter/common.js"), CKEDITOR.getUrl(d + "filter/default.js")], canHandle: function (a) { return /id=(\"|\')?docs\-internal\-guid\-/.test(a.data.dataValue) }, handle: function (c, d) {
                        var b = c.data, e = CKEDITOR.plugins.pastetools.getClipboardData(b, "text/html"); b.dontFilter = !0; b.dataValue = CKEDITOR.pasteFilters.gdocs(e, a);
                        !0 === a.config.forcePasteAsPlainText && (b.type = "text"); d()
                    }
                })
            }
        })
    })(); (function () {
        CKEDITOR.plugins.add("pastefromword", {
            requires: "pastetools", init: function (a) {
                function g(a) {
                    var b = CKEDITOR.plugins.pastefromword && CKEDITOR.plugins.pastefromword.images, c, d = []; if (b && a.editor.filter.check("img[src]") && (c = b.extractTagsFromHtml(a.data.dataValue), 0 !== c.length && (b = b.extractFromRtf(a.data.dataTransfer["text/rtf"]), 0 !== b.length && (CKEDITOR.tools.array.forEach(b, function (b) {
                        d.push(b.type ? "data:" + b.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(b.hex)) :
                            null)
                    }, this), c.length === d.length)))) for (b = 0; b < c.length; b++)0 === c[b].indexOf("file://") && d[b] && (a.data.dataValue = a.data.dataValue.replace(c[b], d[b]))
                } var e = 0, f = CKEDITOR.plugins.getPath("pastetools"), h = this.path, k = void 0 === a.config.pasteFromWord_inlineImages ? !0 : a.config.pasteFromWord_inlineImages, f = [CKEDITOR.getUrl(f + "filter/common.js"), CKEDITOR.getUrl(h + "filter/default.js")]; a.addCommand("pastefromword", {
                    canUndo: !1, async: !0, exec: function (a, b) {
                        e = 1; a.execCommand("paste", {
                            type: "html", notification: b &&
                                "undefined" !== typeof b.notification ? b.notification : !0
                        })
                    }
                }); CKEDITOR.plugins.clipboard.addPasteButton(a, "PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" }); a.pasteTools.register({
                    filters: a.config.pasteFromWordCleanupFile ? [a.config.pasteFromWordCleanupFile] : f, canHandle: function (a) {
                        a = CKEDITOR.plugins.pastetools.getClipboardData(a.data, "text/html"); var b = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, b = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(a) ||
                            b.test(a); return a && (e || b)
                    }, handle: function (f, b) {
                        var c = f.data, d = CKEDITOR.plugins.pastetools.getClipboardData(c, "text/html"), g = CKEDITOR.plugins.pastetools.getClipboardData(c, "text/rtf"), d = { dataValue: d, dataTransfer: { "text/rtf": g } }; if (!1 !== a.fire("pasteFromWord", d) || e) {
                        c.dontFilter = !0; if (e || !a.config.pasteFromWordPromptCleanup || confirm(a.lang.pastefromword.confirmCleanup)) d.dataValue = CKEDITOR.cleanWord(d.dataValue, a), a.fire("afterPasteFromWord", d), c.dataValue = d.dataValue, !0 === a.config.forcePasteAsPlainText ?
                            c.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported || "allow-word" !== a.config.forcePasteAsPlainText || (c.type = "html"); e = 0; b()
                        }
                    }
                }); if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && k) a.on("afterPasteFromWord", g)
            }
        })
    })(); CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } });
    CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (a) {
                    for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), d = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), f = CKEDITOR.plugins.removeformat.filter, p = a.getSelection().getRanges().createIterator(), q = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, n = [], c; c = p.getNextRange();) {
                        var k = c.createBookmark(); c = a.createRange();
                        c.setStartBefore(k.startNode); k.endNode && c.setEndAfter(k.endNode); c.collapsed || c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var e = c.createBookmark(), b = e.startNode, l = e.endNode, m = function (b) { for (var c = a.elementPath(b), e = c.elements, d = 1, g; (g = e[d]) && !g.equals(c.block) && !g.equals(c.blockLimit); d++)h.test(g.getName()) && f(a, g) && b.breakParent(g) }; m(b); if (l) for (m(l), b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); b && !b.equals(l);)if (b.isReadOnly()) { if (b.getPosition(l) & CKEDITOR.POSITION_CONTAINS) break; b = b.getNext(q) } else m =
                            b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == b.getName() && b.data("cke-realelement") || b.hasAttribute("data-cke-bookmark") || !f(a, b) || (h.test(b.getName()) ? b.remove(1) : (b.removeAttributes(d), a.fire("removeFormatCleanup", b))), b = m; e.startNode.remove(); e.endNode && e.endNode.remove(); c.moveToBookmark(k); n.push(c)
                    } a.forceNextSelectionCheck(); a.getSelection().selectRanges(n)
                }
            }
        }, filter: function (a, h) { for (var d = a._.removeFormatFilters || [], f = 0; f < d.length; f++)if (!1 === d[f](h)) return !1; return !0 }
    };
    CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }; CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var"; CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign"; (function () {
        var f = { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[b]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
            modes: { wysiwyg: 1 }, onLoad: function () {
                var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
            }, init: function (a) {
                var b = a.addCommand("showborders", f); b.canUndo = !1; !1 !== a.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON); a.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }, null, null, 100); a.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }); a.on("removeFormatCleanup", function (d) {
                    d = d.data; a.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && d.is("table") && (!d.hasAttribute("border") ||
                        0 >= parseInt(d.getAttribute("border"), 10)) && d.addClass("cke_show_border")
                })
            }, afterInit: function (a) {
                var b = a.dataProcessor; a = b && b.dataFilter; b = b && b.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var b = a["class"], c = parseInt(a.border, 10); c && !(0 >= c) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border") } } }); b && b.addRules({
                    elements: {
                        table: function (a) {
                            a = a.attributes; var b = a["class"]; b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        }); CKEDITOR.on("dialogDefinition", function (a) {
            var b = a.data.name; if ("table" == b || "tableProperties" == b) if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) { return function (b, c) { a.apply(this, arguments); var e = parseInt(this.getValue(), 10); c[!e || 0 >= e ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                return function () {
                    a.apply(this,
                        arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                }
            }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (b, c) { a.apply(this, arguments); parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border") } })
        })
    })(); (function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (a) {
                function d() { var a = e && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = CKEDITOR.plugins.sourcearea; a.addMode("source", function (e) {
                        var b = a.ui.space("contents").getDocument().createElement("textarea"); b.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ?
                                "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", a.config.sourceAreaTabSize || 4))); b.setAttribute("dir", "ltr"); b.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); a.ui.space("contents").append(b); b = a.editable(new c(a, b)); b.setData(a.getData(1)); CKEDITOR.env.ie && (b.attachListener(a, "resize", d, b), b.attachListener(CKEDITOR.document.getWindow(), "resize", d, b), CKEDITOR.tools.setTimeout(d, 0, b)); a.fire("ariaWidget",
                            this); e()
                    }); a.addCommand("source", f.commands.source); a.ui.addButton && a.ui.addButton("Source", { label: a.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); a.on("mode", function () { a.getCommand("source").setState("source" == a.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var e = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
                }
            }
        }); var c = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() },
                insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { c.baseProto.detach.call(this); this.clearCustomData(); this.remove() }
            }
        })
    })();
    CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (c) { "wysiwyg" == c.mode && c.fire("saveSnapshot"); c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); c.setMode("source" == c.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }; CKEDITOR.plugins.add("specialchar", {
        availableLangs: { af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }, requires: "dialog", init: function (a) {
            var c = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
            a.addCommand("specialchar", { exec: function () { var b = a.langCode, b = c.availableLangs[b] ? b : c.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + "dialogs/lang/" + b + ".js"), function () { CKEDITOR.tools.extend(a.lang.specialchar, c.langEntries[b]); a.openDialog("specialchar") }) }, modes: { wysiwyg: 1 }, canUndo: !1 }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
        }
    });
    CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "); CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var d = function (c) {
                var a = this._, b = a.menu; a.state !== CKEDITOR.TRISTATE_DISABLED && (a.on && b ? b.hide() : (a.previousState = a.state, b || (b = a.menu = new CKEDITOR.menu(c, { panel: { className: "cke_menu_panel", attributes: { "aria-label": c.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function () { var b = this.command ? c.getCommand(this.command).modes : this.modes; this.setState(!b || b[c.mode] ? a.previousState : CKEDITOR.TRISTATE_DISABLED); a.on = 0 }, this),
                    this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), a.on = 1, setTimeout(function () { b.show(CKEDITOR.document.getById(a.id), 4) }, 0)))
            }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (c) { delete c.panel; this.base(c); this.hasArrow = "menu"; this.click = d }, statics: { handler: { create: function (c) { return new CKEDITOR.ui.menuButton(c) } } } })
        }, beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
    });
    CKEDITOR.UI_MENUBUTTON = "menubutton"; CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) { "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css")); CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "dialogs/dialog.css")) }, init: function (a) {
            var c = this, d = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName,
                CKEDITOR.getUrl(this.path + "dialogs/options.js")); this.addMenuItems(a); var b = a.lang.scayt, e = CKEDITOR.env; a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                    label: b.text_title, title: a.plugins.wsc ? a.lang.wsc.title : b.text_title, modes: { wysiwyg: !(e.ie && (8 > e.version || e.quirks)) }, toolbar: "spellchecker,20", refresh: function () { var b = a.ui.instances.Scayt.getState(); a.scayt && (b = d.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire("scaytButtonState", b) }, onRender: function () {
                        var b = this; a.on("scaytButtonState",
                            function (a) { void 0 !== typeof a.data && b.setState(a.data) })
                    }, onMenu: function () {
                        var b = a.scayt; a.getMenuItem("scaytToggle").label = a.lang.scayt[b && d.state.scayt[a.name] ? "btn_disable" : "btn_enable"]; var c = {
                            scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED
                        }; a.config.scayt_uiTabs[0] || delete c.scaytOptions; a.config.scayt_uiTabs[1] || delete c.scaytLangs; a.config.scayt_uiTabs[2] || delete c.scaytDict; b && !CKEDITOR.plugins.scayt.isNewUdSupported(b) && (delete c.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return c
                    }
                }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, d) {
                    var e = a.scayt, l, m; e && (m = e.getSelectionNode()) && (l = c.menuGenerator(a, m), e.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
                    return l
                }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) { return function () { var d = a.scayt; d && d.hideBanner(); return b.apply(this) } }))
        }, addMenuItems: function (a) {
            var c = this, d = CKEDITOR.plugins.scayt; a.addMenuGroup("scaytButton"); for (var b = a.config.scayt_contextMenuItemsOrder.split("|"), e = 0; e < b.length; e++)b[e] = "scayt_" + b[e]; if ((b = ["grayt_description", "grayt_suggest", "grayt_control"].concat(b)) && b.length) for (e = 0; e < b.length; e++)a.addMenuGroup(b[e], e - 10); a.addCommand("scaytToggle",
                { exec: function (a) { var b = a.scayt; d.state.scayt[a.name] = !d.state.scayt[a.name]; !0 === d.state.scayt[a.name] ? b || d.createScayt(a) : b && d.destroy(a) } }); a.addCommand("scaytAbout", { exec: function (a) { a.scayt.tabToOpen = "about"; d.openDialog(c.dialogName, a) } }); a.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; d.openDialog(c.dialogName, a) } }); a.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; d.openDialog(c.dialogName, a) } }); a.addCommand("scaytDict", {
                    exec: function (a) {
                        a.scayt.tabToOpen =
                        "dictionaries"; d.openDialog(c.dialogName, a)
                    }
                }); b = { scaytToggle: { label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle" }, scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" }, scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: { label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" } }; a.plugins.wsc && (b.WSC =
                    { label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () { var b = CKEDITOR.plugins.scayt, d = a.scayt, c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (c = c.replace(/\s/g, "")) ? (d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!") } }); a.addMenuItems(b)
        }, bindEvents: function (a) {
            var c = CKEDITOR.plugins.scayt, d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, b = function () { c.destroy(a) },
            e = function () { !c.state.scayt[a.name] || a.readOnly || a.scayt || c.createScayt(a) }, f = function () {
                var b = a.editable(); b.attachListener(b, "focus", function (b) {
                    CKEDITOR.plugins.scayt && !a.scayt && setTimeout(e, 0); b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; var c, k; if ((d || b) && a._.savedSelection) {
                        b = a._.savedSelection.getSelectedElement(); b = !b && a._.savedSelection.getRanges(); for (var h = 0; h < b.length; h++)k = b[h], "string" === typeof k.startContainer.$.nodeValue && (c = k.startContainer.getText().length,
                            (c < k.startOffset || c < k.endOffset) && a.unlockSelection(!1))
                    }
                }, this, null, -10)
            }, g = function () { d ? a.config.scayt_inlineModeImmediateMarkup ? e() : (a.on("blur", function () { setTimeout(b, 0) }), a.on("focus", e), a.focusManager.hasFocus && e()) : e(); f(); var c = a.editable(); c.attachListener(c, "mousedown", function (b) { b = b.data.getTarget(); var d = a.widgets && a.widgets.getByElement(b); d && (d.wrapper = b.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10) }; a.on("contentDom", g); a.on("beforeCommandExec",
                function (b) {
                    var d = a.scayt, e = !1, f = !1, h = !0; b.data.name in c.options.disablingCommandExec && "wysiwyg" == a.mode ? d && (c.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !d || ("cut" === b.data.name && (h = !1, f = !0), "language" === b.data.name && (f = e = !0), a.fire("reloadMarkupScayt",
                        { removeOptions: { removeInside: h, forceBookmark: f, language: e }, timeout: 0 }))
                }); a.on("beforeSetMode", function (b) { if ("source" == b.data) { if (b = a.scayt) c.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute("_jquid") } }); a.on("afterCommandExec", function (b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () { c.reloadMarkup(a.scayt) }, 250) }); a.on("readOnly", function (b) {
                    var d; b && (d = a.scayt, !0 === b.editor.readOnly ? d && d.fire("removeMarkupInDocument",
                        {}) : d ? c.reloadMarkup(d) : "wysiwyg" == b.editor.mode && !0 === c.state.scayt[b.editor.name] && (c.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
                }); a.on("beforeDestroy", b); a.on("setData", function () { b(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && g() }, this, null, 50); a.on("reloadMarkupScayt", function (b) {
                    var d = b.data && b.data.removeOptions, e = b.data && b.data.timeout, f = b.data && b.data.language, h = a.scayt; h && setTimeout(function () {
                        f && (d.selectionNode = a.plugins.language.getCurrentLangElement(a),
                            d.selectionNode = d.selectionNode && d.selectionNode.$ || null); h.removeMarkupInSelectionNode(d); c.reloadMarkup(h)
                    }, e || 0)
                }); a.on("insertElement", function () { a.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } }) }, this, null, 50); a.on("insertHtml", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("insertText", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("scaytDialogShown", function (b) { b.data.selectPage(a.scayt.tabToOpen) })
        },
        parseConfig: function (a) {
            var c = CKEDITOR.plugins.scayt; c.replaceOldOptionsNames(a.config); "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1); c.state.scayt[a.name] = a.config.scayt_autoStartup; "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1); "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1); c.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands =
                "ignoreall|add"); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"); a.config.scayt_sLang || (a.config.scayt_sLang = "en_US"); if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 3; if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 3; if (void 0 === a.config.scayt_customDictionaryIds ||
                    "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = ""; if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null; if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                        var d = [], b = []; a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) {
                        1 === Number(a) || 0 === Number(a) ? (b.push(!0), d.push(Number(a))) :
                            b.push(!1)
                        }); null === CKEDITOR.tools.search(b, !1) ? a.config.scayt_uiTabs = d : a.config.scayt_uiTabs = [1, 1, 1]
                    } else a.config.scayt_uiTabs = [1, 1, 1]; "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null); "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null); "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null); "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions =
                        "on"); "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"); "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-"); "string" !== typeof a.config.scayt_srcUrl && (c = document.location.protocol, c = -1 != c.search(/https?:/) ? c : "http:", a.config.scayt_srcUrl = c + "//svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js"); "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty =
                            !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; "boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1); "object" !== typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {}); a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords =
                                !1); a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
                                    var c = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ?
                                        a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0, e = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), f = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], g = CKEDITOR.tools.search, k = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = function (a) {
                                            for (var b = [], d = 0; d <
                                                a.length; d++) { var c = a[d], p = !!g(a, "options"); if (!g(e, c) || p && g(f, function (a) { if ("lang" === a) return !1 })) return; g(f, c) && f.splice(k(f, c), 1); if ("all" === c || p && g(a, "lang")) return []; "options" === c && (f = ["lang"]) } return b = b.concat(f)
                                        }(c)
                                } a.config.scayt_disableCache && "boolean" !== typeof a.config.scayt_disableCache && (a.config.scayt_disableCache = !1); if (void 0 === a.config.scayt_cacheSize || "number" != typeof a.config.scayt_cacheSize || 1 > a.config.scayt_cacheSize) a.config.scayt_cacheSize = 4E3
        }, addRule: function (a) {
            var c = CKEDITOR.plugins.scayt,
            d = a.dataProcessor, b = d && d.htmlFilter, e = a._.elementsPath && a._.elementsPath.filters, d = d && d.dataFilter, f = a.addRemoveFormatFilter, g = function (b) { if (a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute))) return !1 }, k = function (b) { var d = !0; a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute)) && (d = !1); return d }; e && e.push(g); d && d.addRules({
                elements: {
                    span: function (a) {
                        var b = a.hasClass(c.options.misspelled_word_class) &&
                            a.attributes[c.options.data_attribute_name], d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute]; c && (b || d) && delete a.name; return a
                    }
                }
            }); b && b.addRules({ elements: { span: function (a) { var b = a.hasClass(c.options.misspelled_word_class) && a.attributes[c.options.data_attribute_name], d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute]; c && (b || d) && delete a.name; return a } } }); f && f.call(a, k)
        }, scaytMenuDefinition: function (a) {
            var c =
                this, d = CKEDITOR.plugins.scayt; a = a.scayt; return {
                    scayt: {
                        scayt_ignore: { label: a.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function (a) { a.scayt.ignoreWord() } }, scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } }, scayt_add: { label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (a) { var d = a.scayt; setTimeout(function () { d.addWordToUserDictionary() }, 10) } }, scayt_option: {
                            label: a.getLocal("btn_options"),
                            group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; d.openDialog(c.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 }
                        }, scayt_language: { label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) { a.scayt.tabToOpen = "langs"; d.openDialog(c.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[1] ? !0 : !1 } }, scayt_dictionary: {
                            label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) {
                                a.scayt.tabToOpen =
                                "dictionaries"; d.openDialog(c.dialogName, a)
                            }, verification: function (a) { return 1 == a.config.scayt_uiTabs[2] ? !0 : !1 }
                        }, scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; d.openDialog(c.dialogName, a) } }
                    }, grayt: {
                        grayt_problemdescription: { label: "Grammar problem description", group: "grayt_description", order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { } }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } },
                        grayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() } }
                    }
                }
        }, buildSuggestionMenuItems: function (a, c, d) {
            var b = {}, e = {}, f = d ? "word" : "phrase", g = d ? "startGrammarCheck" : "startSpellCheck", k = a.scayt; if (0 < c.length && "no_any_suggestions" !== c[0]) if (d) for (d = 0; d < c.length; d++) {
                var l = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ", "_"); a.addCommand(l, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g)); d < a.config.scayt_maxSuggestions ?
                    (a.addMenuItem(l, { label: c[d], command: l, group: "scayt_suggest", order: d + 1 }), b[l] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(l, { label: c[d], command: l, group: "scayt_moresuggest", order: d + 1 }), e[l] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", { label: k.getLocal("btn_moreSuggestions"), group: "scayt_moresuggest", order: 10, getItems: function () { return e } }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
            } else for (d = 0; d < c.length; d++)l = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[d].replace(" ",
                "_"), a.addCommand(l, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g)), a.addMenuItem(l, { label: c[d], command: l, group: "grayt_suggest", order: d + 1 }), b[l] = CKEDITOR.TRISTATE_OFF; else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function () { } }), a.addMenuItem("no_scayt_suggest", { label: k.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return b
        }, menuGenerator: function (a, c) {
            var d = a.scayt, b = this.scaytMenuDefinition(a),
            e = {}, f = a.config.scayt_contextCommands.split("|"), g = c.getAttribute(d.getLangAttribute()) || d.getLang(), k, l, m, n; l = d.isScaytNode(c); m = d.isGraytNode(c); l ? (b = b.scayt, k = c.getAttribute(d.getScaytNodeAttributeName()), d.fire("getSuggestionsList", { lang: g, word: k }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, l)) : m && (b = b.grayt, e = c.getAttribute(d.getGraytNodeAttributeName()), d.getGraytNodeRuleAttributeName ? (k = c.getAttribute(d.getGraytNodeRuleAttributeName()), d.getProblemDescriptionText(e,
                k, g)) : d.getProblemDescriptionText(e, g), n = d.getProblemDescriptionText(e, k, g), b.grayt_problemdescription && n && (n = n.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), b.grayt_problemdescription.label = n), d.fire("getGrammarSuggestionsList", { lang: g, phrase: e, rule: k }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, l)); if (l && "off" == a.config.scayt_contextCommands) return e; for (var h in b) l && -1 == CKEDITOR.tools.indexOf(f, h.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || m && "grayt_problemdescription" !==
                    h && -1 == CKEDITOR.tools.indexOf(f, h.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands || (e[h] = "undefined" != typeof b[h].state ? b[h].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof b[h].verification || b[h].verification(a) || delete e[h], a.addCommand(h, { exec: b[h].exec }), a.addMenuItem(h, { label: a.lang.scayt[b[h].label] || b[h].label, command: h, group: b[h].group, order: b[h].order })); return e
        }, createCommand: function (a, c, d) {
            return {
                exec: function (b) {
                    b = b.scayt; var e = {}; e[c] = a; b.replaceSelectionNode(e); "startGrammarCheck" ===
                        d && b.removeMarkupInSelectionNode({ grammarOnly: !0 }); b.fire(d)
                }
            }
        }
    });
    CKEDITOR.plugins.scayt = {
        charsToObserve: [{ charName: "cke-fillingChar", charCode: function () { var a = CKEDITOR.version.match(/^\d(\.\d*)*/), a = a && a[0], c; if (a) { c = "4.5.7"; var d, a = a.replace(/\./g, ""); c = c.replace(/\./g, ""); d = a.length - c.length; d = 0 <= d ? d : 0; c = parseInt(a) >= parseInt(c) * Math.pow(10, d) } return c ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203) }() }], state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: {
            disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word",
            misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem"
        }, backCompatibilityMap: { scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath", scayt_customerid: "scayt_customerId" }, openDialog: function (a, c) { var d = c.scayt; d.isAllModulesReady && !1 === d.isAllModulesReady() || (c.lockSelection(), c.openDialog(a)) }, alarmCompatibilityMessage: function () {
        5 >
            this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."), this.warningCounter += 1)
        }, isNewUdSupported: function (a) { return a.getUserDictionary ? !0 : !1 }, reloadMarkup: function (a) {
            var c; a && (c = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(),
                c && c.ltr && c.rtl && a.fire("startSpellCheck, startGrammarCheck")))
        }, replaceOldOptionsNames: function (a) { for (var c in a) c in this.backCompatibilityMap && (a[this.backCompatibilityMap[c]] = a[c], delete a[c]) }, createScayt: function (a) {
            var c = this, d = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
                function e(a) { return new SCAYT.CKSCAYT(a, function () { }, function () { }) } var f; a.window && (f = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable()); if (f) {
                    f = {
                        lang: a.config.scayt_sLang, container: f.$, customDictionary: a.config.scayt_customDictionaryIds,
                        userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: c.options.data_attribute_name, misspelled_word_class: c.options.misspelled_word_class, problem_grammar_data_attribute: c.options.problem_grammar_data_attribute, problem_grammar_class: c.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus,
                        ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, multiLanguageMode: a.config.scayt_multiLanguageMode, multiLanguageStyles: a.config.scayt_multiLanguageStyles, graytAutoStartup: a.config.grayt_autoStartup, disableCache: a.config.scayt_disableCache, cacheSize: a.config.scayt_cacheSize, charsToObserve: d.charsToObserve
                    }; a.config.scayt_serviceProtocol && (f.service_protocol = a.config.scayt_serviceProtocol); a.config.scayt_serviceHost &&
                        (f.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (f.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (f.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (f["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords); "boolean" === typeof a.config.scayt_ignoreDomainNames && (f["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (f["ignore-words-with-mixed-cases"] =
                            a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (f["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var g; try { g = e(f) } catch (k) { c.alarmCompatibilityMessage(), delete f.charsToObserve, g = e(f) } g.subscribe("suggestionListSend", function (a) {
                                for (var b = {}, d = [], c = 0; c < a.suggestionList.length; c++)b["word_" + a.suggestionList[c]] || (b["word_" + a.suggestionList[c]] = a.suggestionList[c], d.push(a.suggestionList[c])); CKEDITOR.plugins.scayt.suggestions =
                                    d
                            }); g.subscribe("selectionIsChanged", function (d) { a.getSelection().isLocked && "restoreSelection" !== d.action && a.lockSelection(); "restoreSelection" === d.action && a.selectionChange(!0) }); g.subscribe("graytStateChanged", function (c) { d.state.grayt[a.name] = c.state }); g.addMarkupHandler && g.addMarkupHandler(function (d) { var c = a.editable(), e = c.getCustomData(d.charName); e && (e.$ = d.node, c.setCustomData(d.charName, e)) }); a.scayt = g; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                } else d.state.scayt[a.name] =
                    !1
            })
        }, destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (a, c) { var d, b = function () { CKEDITOR.fireOnce("scaytReady"); a.scayt || "function" === typeof c && c(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (d = a.config.scayt_srcUrl, CKEDITOR.scriptLoader.load(d, function (a) { a && b() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && b() }
    };
    CKEDITOR.on("dialogDefinition", function (a) {
        var c = a.data.name; a = a.data.definition.dialog; "scaytDialog" !== c && "checkspell" !== c && (a.on("show", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, c = a.scayt; c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0) }), a.on("hide", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, c = a.scayt; c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!1) })); if ("scaytDialog" === c) a.on("cancel",
            function (a) { return !1 }, this, null, -1); if ("checkspell" === c) a.on("cancel", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, c = a.scayt; c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if ("link" === c) a.on("ok", function (a) { var b = a.sender && a.sender.getParentEditor(); b && setTimeout(function () { b.fire("reloadMarkupScayt", { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 }) }, 0) }); if ("replace" === c) a.on("hide", function (a) {
                a =
                a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, c = a.scayt; a && setTimeout(function () { c && (c.fire("removeMarkupInDocument", {}), b.reloadMarkup(c)) }, 0)
            })
    });
    CKEDITOR.on("scaytReady", function () {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
            var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) { return function () { var b = null, c = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) { if (b = "ready" == this.status) var f = c.removeMarkupFromString(this.getSnapshot()), c = c.removeMarkupFromString(this._.previousValue), b = b && c !== f } else b = a.call(this); return b } }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty,
                function (a) { return function () { var b = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
        } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var a = CKEDITOR.plugins.undo.Image.prototype, c = "function" == typeof a.equalsContent ? "equalsContent" : "equals"; a[c] = CKEDITOR.tools.override(a[c], function (a) {
                return function (b) {
                    var c = b.editor.scayt, f = this.contents, g = b.contents, k = null; CKEDITOR.plugins.scayt &&
                        CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = c.removeMarkupFromString(f) || "", b.contents = c.removeMarkupFromString(g) || ""); k = a.apply(this, arguments); this.contents = f; b.contents = g; return k
                }
            })
        }
    }); (function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo", init: function (c) {
                var l = c.config, g = c.lang.stylescombo, f = {}, k = [], m = []; c.on("stylesSet", function (a) {
                    if (a = a.data.styles) {
                        for (var b, h, d, e = 0, n = a.length; e < n; e++)(b = a[e], c.blockless && b.element in CKEDITOR.dtd.$block || "string" == typeof b.type && !CKEDITOR.style.customHandlers[b.type] || (h = b.name, b = new CKEDITOR.style(b), c.filter.customConfig && !c.filter.check(b))) || (b._name = h, b._.enterMode = l.enterMode, b._.type = d = b.assignedTo || b.type, b._.weight =
                            e + 1E3 * (d == CKEDITOR.STYLE_OBJECT ? 1 : d == CKEDITOR.STYLE_BLOCK ? 2 : 3), f[h] = b, k.push(b), m.push(b)); k.sort(function (a, b) { return a._.weight - b._.weight })
                    }
                }); c.ui.addRichCombo("Styles", {
                    label: g.label, title: g.panelTitle, toolbar: "styles,10", allowedContent: m, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(l.contentsCss), multiSelect: !0, attributes: { "aria-label": g.panelTitle } }, init: function () {
                        var a, b, c, d, e, f; e = 0; for (f = k.length; e < f; e++)a = k[e], b = a._name, d = a._.type, d != c && (this.startGroup(g["panelTitle" + String(d)]),
                            c = d), this.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b); this.commit()
                    }, onClick: function (a) { c.focus(); c.fire("saveSnapshot"); a = f[a]; var b = c.elementPath(); if (a.group && a.removeStylesFromSameGroup(c)) c.applyStyle(a); else c[a.checkActive(b, c) ? "removeStyle" : "applyStyle"](a); c.fire("saveSnapshot") }, onRender: function () {
                        c.on("selectionChange", function (a) {
                            var b = this.getValue(); a = a.data.path.elements; for (var h = 0, d = a.length, e; h < d; h++) {
                                e = a[h]; for (var g in f) if (f[g].checkElementRemovable(e, !0, c)) {
                                g !=
                                    b && this.setValue(g); return
                                }
                            } this.setValue("")
                        }, this)
                    }, onOpen: function () {
                        var a = c.getSelection(), a = a.getSelectedElement() || a.getStartElement() || c.editable(), a = c.elementPath(a), b = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var h in f) { var d = f[h], e = d._.type; d.checkApplicable(a, c, c.activeFilter) ? b[e]++ : this.hideItem(h); d.checkActive(a, c) && this.mark(h) } b[CKEDITOR.STYLE_BLOCK] || this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]); b[CKEDITOR.STYLE_INLINE] || this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
                        b[CKEDITOR.STYLE_OBJECT] || this.hideGroup(g["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                    }, refresh: function () { var a = c.elementPath(); if (a) { for (var b in f) if (f[b].checkApplicable(a, c, c.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { f = {}; k = [] }
                })
            }
        })
    })(); (function () {
        function k(c) {
            return {
                editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (d) {
                    if (d.editable().hasFocus) {
                        var e = d.getSelection(), b; if (b = (new CKEDITOR.dom.elementPath(e.getCommonAncestor(), e.root)).contains({ td: 1, th: 1 }, 1)) {
                            var e = d.createRange(), a = CKEDITOR.tools.tryThese(function () { var a = b.getParent().$.cells[b.$.cellIndex + (c ? -1 : 1)]; a.parentNode.parentNode; return a }, function () {
                                var a = b.getParent(), a = a.getAscendant("table").$.rows[a.$.rowIndex + (c ? -1 : 1)]; return a.cells[c ? a.cells.length - 1 :
                                    0]
                            }); if (a || c) if (a) a = new CKEDITOR.dom.element(a), e.moveToElementEditStart(a), e.checkStartOfBlock() && e.checkEndOfBlock() || e.selectNodeContents(a); else return !0; else { for (var f = b.getAscendant("table").$, a = b.getParent().$.cells, f = new CKEDITOR.dom.element(f.insertRow(-1), d.document), g = 0, h = a.length; g < h; g++)f.append((new CKEDITOR.dom.element(a[g], d.document)).clone(!1, !1)).appendBogus(); e.moveToElementEditStart(f) } e.select(!0); return !0
                        }
                    } return !1
                }
            }
        } var h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, g = {
            exec: function (c) {
                c.container.focusNext(!0,
                    c.tabIndex)
            }
        }, f = { exec: function (c) { c.container.focusPrevious(!0, c.tabIndex) } }; CKEDITOR.plugins.add("tab", {
            init: function (c) {
                for (var d = !1 !== c.config.enableTabKeyTools, e = c.config.tabSpaces || 0, b = ""; e--;)b += " "; if (b) c.on("key", function (a) { 9 == a.data.keyCode && (c.insertText(b), a.cancel()) }); if (d) c.on("key", function (a) { (9 == a.data.keyCode && c.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand("selectPreviousCell")) && a.cancel() }); c.addCommand("blur", CKEDITOR.tools.extend(g, h)); c.addCommand("blurBack",
                    CKEDITOR.tools.extend(f, h)); c.addCommand("selectNextCell", k()); c.addCommand("selectPreviousCell", k(!0))
            }
        })
    })();
    CKEDITOR.dom.element.prototype.focusNext = function (k, h) {
        var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e, b, a; if (0 >= g) for (b = this.getNextSourceNode(k, CKEDITOR.NODE_ELEMENT); b;) { if (b.isVisible() && 0 === b.getTabIndex()) { d = b; break } b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (b = this.getDocument().getBody().getFirst(); b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!f) if (!c && b.equals(this)) { if (c = !0, k) { if (!(b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else c && !this.contains(b) &&
                (f = 1); if (b.isVisible() && !(0 > (a = b.getTabIndex()))) { if (f && a == g) { d = b; break } a > g && (!d || !e || a < e) ? (d = b, e = a) : d || 0 !== a || (d = b, e = a) }
        } d && d.focus()
    };
    CKEDITOR.dom.element.prototype.focusPrevious = function (k, h) { for (var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e = 0, b, a = this.getDocument().getBody().getLast(); a = a.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) { if (!f) if (!c && a.equals(this)) { if (c = !0, k) { if (!(a = a.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else c && !this.contains(a) && (f = 1); if (a.isVisible() && !(0 > (b = a.getTabIndex()))) if (0 >= g) { if (f && 0 === b) { d = a; break } b > e && (d = a, e = b) } else { if (f && b == g) { d = a; break } b < g && (!d || b > e) && (d = a, e = b) } } d && d.focus() }; CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (a) {
            function f(c) { return CKEDITOR.tools.extend(c || {}, { contextSensitive: 1, refresh: function (c, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                var e = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table", allowedContent: "table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];" +
                        (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                            element: "table", right: function (c) {
                                if (c.styles) {
                                    var a; if (c.styles.border) a = CKEDITOR.tools.style.parse.border(c.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                        var b = c.styles; b["border-left"] && b["border-left"] === b["border-right"] && b["border-right"] === b["border-top"] &&
                                            b["border-top"] === b["border-bottom"] && (a = CKEDITOR.tools.style.parse.border(b["border-top"]))
                                    } a && a.style && "solid" === a.style && a.width && 0 !== parseFloat(a.width) && (c.attributes.border = 1); "collapse" == c.styles["border-collapse"] && (c.attributes.cellspacing = 0)
                                }
                            }
                        }]]
                })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", f())); a.addCommand("tableDelete", f({
                    exec: function (a) {
                        var d = a.elementPath().contains("table", 1); if (d) {
                            var b = d.getParent(), e = a.editable(); 1 != b.getChildCount() || b.is("td",
                                "th") || b.equals(e) || (d = b); a = a.createRange(); a.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); d.remove(); a.select()
                        }
                    }
                })); a.ui.addButton && a.ui.addButton("Table", { label: e.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({
                    table: { label: e.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                        label: e.deleteTable, command: "tableDelete", group: "table",
                        order: 1
                    }
                }); a.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
            }
        }
    }); (function () {
        function q(d, f) {
            function b(a) { return f ? f.contains(a) && a.getAscendant("table", !0).equals(f) : !0 } function c(a) { var b = /^(?:td|th)$/; 0 < e.length || a.type != CKEDITOR.NODE_ELEMENT || !b.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(h, a, "selected_cell", !0), e.push(a)) } var e = [], h = {}; if (!d) return e; for (var a = d.getRanges(), k = 0; k < a.length; k++) {
                var g = a[k]; if (g.collapsed) (g = g.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && b(g) && e.push(g); else {
                    var g = new CKEDITOR.dom.walker(g),
                    m; for (g.guard = c; m = g.next();)m.type == CKEDITOR.NODE_ELEMENT && m.is(CKEDITOR.dtd.table) || (m = m.getAscendant({ td: 1, th: 1 }, !0)) && !m.getCustomData("selected_cell") && b(m) && (CKEDITOR.dom.element.setMarker(h, m, "selected_cell", !0), e.push(m))
                }
            } CKEDITOR.dom.element.clearAllMarkers(h); return e
        } function r(d, f) {
            for (var b = D(d) ? d : q(d), c = b[0], e = c.getAscendant("table"), c = c.getDocument(), h = b[0].getParent(), a = h.$.rowIndex, b = b[b.length - 1], k = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = new CKEDITOR.dom.element(e.$.rows[k]), a =
                f ? a : k, h = f ? h : b, b = CKEDITOR.tools.buildTableMap(e), e = b[a], a = f ? b[a - 1] : b[a + 1], b = b[0].length, c = c.createElement("tr"), k = 0; e[k] && k < b; k++) { var g; 1 < e[k].rowSpan && a && e[k] == a[k] ? (g = e[k], g.rowSpan += 1) : (g = (new CKEDITOR.dom.element(e[k])).clone(), g.removeAttribute("rowSpan"), g.appendBogus(), c.append(g), g = g.$); k += g.colSpan - 1 } f ? c.insertBefore(h) : c.insertAfter(h); return c
        } function B(d) {
            if (d instanceof CKEDITOR.dom.selection) {
                var f = d.getRanges(), b = q(d), c = b[0].getAscendant("table"), e = CKEDITOR.tools.buildTableMap(c),
                h = b[0].getParent().$.rowIndex, b = b[b.length - 1], a = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = []; d.reset(); for (d = h; d <= a; d++) { for (var k = e[d], g = new CKEDITOR.dom.element(c.$.rows[d]), m = 0; m < k.length; m++) { var l = new CKEDITOR.dom.element(k[m]), n = l.getParent().$.rowIndex; 1 == l.$.rowSpan ? l.remove() : (--l.$.rowSpan, n == d && (n = e[d + 1], n[m - 1] ? l.insertAfter(new CKEDITOR.dom.element(n[m - 1])) : (new CKEDITOR.dom.element(c.$.rows[d + 1])).append(l, 1))); m += l.$.colSpan - 1 } b.push(g) } e = c.$.rows; f[0].moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);
                h = new CKEDITOR.dom.element(e[a + 1] || (0 < h ? e[h - 1] : null) || c.$.parentNode); for (d = b.length; 0 <= d; d--)B(b[d]); return c.$.parentNode ? h : (f[0].select(), null)
            } d instanceof CKEDITOR.dom.element && (c = d.getAscendant("table"), 1 == c.$.rows.length ? c.remove() : d.remove()); return null
        } function v(d) { for (var f = d.getParent().$.cells, b = 0, c = 0; c < f.length; c++) { var e = f[c], b = b + e.colSpan; if (e == d.$) break } return b - 1 } function w(d, f) { for (var b = f ? Infinity : 0, c = 0; c < d.length; c++) { var e = v(d[c]); if (f ? e < b : e > b) b = e } return b } function u(d, f) {
            for (var b =
                D(d) ? d : q(d), c = b[0].getAscendant("table"), e = w(b, 1), b = w(b), h = f ? e : b, a = CKEDITOR.tools.buildTableMap(c), c = [], e = [], b = [], k = a.length, g = 0; g < k; g++) { var m = f ? a[g][h - 1] : a[g][h + 1]; c.push(a[g][h]); e.push(m) } for (g = 0; g < k; g++)c[g] && (1 < c[g].colSpan && e[g] == c[g] ? (a = c[g], a.colSpan += 1) : (h = new CKEDITOR.dom.element(c[g]), a = h.clone(), a.removeAttribute("colSpan"), a.appendBogus(), a[f ? "insertBefore" : "insertAfter"].call(a, h), b.push(a), a = a.$), g += a.rowSpan - 1); return b
        } function y(d) {
            function f(a) {
                var b = a.getRanges(), c, d; if (1 !== b.length) return a;
                b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; c = b.endContainer; d = c.getName().toLowerCase(); if ("td" !== d && "th" !== d) return a; for ((d = c.getPrevious()) || (d = c.getParent().getPrevious().getLast()); d.type !== CKEDITOR.NODE_TEXT && "br" !== d.getName().toLowerCase();)if (d = d.getLast(), !d) return a; b.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); return b.select()
            } CKEDITOR.env.webkit && !d.isFake && (d = f(d)); var b = d.getRanges(), c = q(d), e = c[0], h = c[c.length - 1], c = e.getAscendant("table"), a = CKEDITOR.tools.buildTableMap(c), k, g, m =
                []; d.reset(); var l = 0; for (d = a.length; l < d; l++)for (var n = 0, p = a[l].length; n < p; n++)void 0 === k && a[l][n] == e.$ && (k = n), a[l][n] == h.$ && (g = n); for (l = k; l <= g; l++)for (n = 0; n < a.length; n++)h = a[n], e = new CKEDITOR.dom.element(c.$.rows[n]), h = new CKEDITOR.dom.element(h[l]), h.$ && (1 == h.$.colSpan ? h.remove() : --h.$.colSpan, n += h.$.rowSpan - 1, e.$.cells.length || m.push(e)); k = a[0].length - 1 > g ? new CKEDITOR.dom.element(a[0][g + 1]) : k && -1 !== a[0][k - 1].cellIndex ? new CKEDITOR.dom.element(a[0][k - 1]) : new CKEDITOR.dom.element(c.$.parentNode);
            m.length == d && (b[0].moveToPosition(c, CKEDITOR.POSITION_AFTER_END), b[0].select(), c.remove()); return k
        } function t(d, f) { var b = d.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (b) { var c = b.clone(); c.appendBogus(); f ? c.insertBefore(b) : c.insertAfter(b) } } function z(d) {
            if (d instanceof CKEDITOR.dom.selection) {
                var f = d.getRanges(), b = q(d), c = b[0] && b[0].getAscendant("table"), e; a: {
                    var h = 0; e = b.length - 1; for (var a = {}, k, g; k = b[h++];)CKEDITOR.dom.element.setMarker(a, k, "delete_cell", !0); for (h = 0; k = b[h++];)if ((g = k.getPrevious()) &&
                        !g.getCustomData("delete_cell") || (g = k.getNext()) && !g.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(a); e = g; break a } CKEDITOR.dom.element.clearAllMarkers(a); h = b[0].getParent(); (h = h.getPrevious()) ? e = h.getLast() : (h = b[e].getParent(), e = (h = h.getNext()) ? h.getChild(0) : null)
                } d.reset(); for (d = b.length - 1; 0 <= d; d--)z(b[d]); e ? p(e, !0) : c && (f[0].moveToPosition(c, CKEDITOR.POSITION_BEFORE_START), f[0].select(), c.remove())
            } else d instanceof CKEDITOR.dom.element && (f = d.getParent(), 1 == f.getChildCount() ?
                f.remove() : d.remove())
        } function p(d, f) { var b = d.getDocument(), c = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (c.focus(), b.focus()); b = new CKEDITOR.dom.range(b); b["moveToElementEdit" + (f ? "End" : "Start")](d) || (b.selectNodeContents(d), b.collapse(f ? !1 : !0)); b.select(!0) } function A(d, f, b) { d = d[f]; if ("undefined" == typeof b) return d; for (f = 0; d && f < d.length; f++) { if (b.is && d[f] == b.$) return f; if (f == b) return new CKEDITOR.dom.element(d[f]) } return b.is ? -1 : null } function x(d, f, b) {
            var c = q(d), e; if ((f ? 1 != c.length :
                2 > c.length) || (e = d.getCommonAncestor()) && e.type == CKEDITOR.NODE_ELEMENT && e.is("table")) return !1; d = c[0]; e = d.getAscendant("table"); var h = CKEDITOR.tools.buildTableMap(e), a = h.length, k = h[0].length, g = d.getParent().$.rowIndex, m = A(h, g, d), l; if (f) { var n; try { var p = parseInt(d.getAttribute("rowspan"), 10) || 1; l = parseInt(d.getAttribute("colspan"), 10) || 1; n = h["up" == f ? g - p : "down" == f ? g + p : g]["left" == f ? m - l : "right" == f ? m + l : m] } catch (x) { return !1 } if (!n || d.$ == n) return !1; c["up" == f || "left" == f ? "unshift" : "push"](new CKEDITOR.dom.element(n)) } f =
                    d.getDocument(); var r = g, p = n = 0, u = !b && new CKEDITOR.dom.documentFragment(f), w = 0; for (f = 0; f < c.length; f++) {
                        l = c[f]; var t = l.getParent(), y = l.getFirst(), v = l.$.colSpan, z = l.$.rowSpan, t = t.$.rowIndex, B = A(h, t, l), w = w + v * z, p = Math.max(p, B - m + v); n = Math.max(n, t - g + z); b || (v = l, (z = v.getBogus()) && z.remove(), v.trim(), l.getChildren().count() && (t == r || !y || y.isBlockBoundary && y.isBlockBoundary({ br: 1 }) || (r = u.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !r || r.is && r.is("br") || u.append("br")), l.moveChildren(u)), f ? l.remove() : l.setHtml(""));
                        r = t
                    } if (b) return n * p == w; u.moveChildren(d); d.appendBogus(); p >= k ? d.removeAttribute("rowSpan") : d.$.rowSpan = n; n >= a ? d.removeAttribute("colSpan") : d.$.colSpan = p; b = new CKEDITOR.dom.nodeList(e.$.rows); c = b.count(); for (f = c - 1; 0 <= f; f--)e = b.getItem(f), e.$.cells.length || (e.remove(), c++); return d
        } function C(d, f) {
            var b = q(d); if (1 < b.length) return !1; if (f) return !0; var b = b[0], c = b.getParent(), e = c.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(e), a = c.$.rowIndex, k = A(h, a, b), g = b.$.rowSpan, m; if (1 < g) {
                m = Math.ceil(g / 2); for (var g =
                    Math.floor(g / 2), c = a + m, e = new CKEDITOR.dom.element(e.$.rows[c]), h = A(h, c), l, c = b.clone(), a = 0; a < h.length; a++)if (l = h[a], l.parentNode == e.$ && a > k) { c.insertBefore(new CKEDITOR.dom.element(l)); break } else l = null; l || e.append(c)
            } else for (g = m = 1, e = c.clone(), e.insertAfter(c), e.append(c = b.clone()), l = A(h, a), k = 0; k < l.length; k++)l[k].rowSpan++; c.appendBogus(); b.$.rowSpan = m; c.$.rowSpan = g; 1 == m && b.removeAttribute("rowSpan"); 1 == g && c.removeAttribute("rowSpan"); return c
        } function E(d, f) {
            var b = q(d); if (1 < b.length) return !1; if (f) return !0;
            var b = b[0], c = b.getParent(), e = c.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(e), h = A(e, c.$.rowIndex, b), a = b.$.colSpan; if (1 < a) c = Math.ceil(a / 2), a = Math.floor(a / 2); else { for (var a = c = 1, k = [], g = 0; g < e.length; g++) { var m = e[g]; k.push(m[h]); 1 < m[h].rowSpan && (g += m[h].rowSpan - 1) } for (e = 0; e < k.length; e++)k[e].colSpan++ } e = b.clone(); e.insertAfter(b); e.appendBogus(); b.$.colSpan = c; e.$.colSpan = a; 1 == c && b.removeAttribute("colSpan"); 1 == a && e.removeAttribute("colSpan"); return e
        } var D = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools =
        {
            requires: "table,dialog,contextmenu", init: function (d) {
                function f(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function b(a, b) { var c = d.addCommand(a, b); d.addFeature(c) } var c = d.lang.table, e = CKEDITOR.tools.style.parse, h = "td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" "); b("cellProperties",
                    new CKEDITOR.dialogCommand("cellProperties", f({
                        allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: h, contentTransformations: [[{ element: "td", left: function (a) { return a.styles.background && e.background(a.styles.background).color }, right: function (a) { a.styles["background-color"] = e.background(a.styles.background).color } }, {
                            element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign },
                            right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign }
                        }], [{ element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) { CKEDITOR.tools.array.forEach(a.children, function (b) { b.name in { td: 1, th: 1 } && (b.attributes["cke-row-height"] = a.styles.height) }); delete a.styles.height } }], [{
                            element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) {
                                a.styles.height = a.attributes["cke-row-height"];
                                delete a.attributes["cke-row-height"]
                            }
                        }]]
                    }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); b("rowDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = B(a)) && p(a) } })); b("rowInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); r(a, !0) } })); b("rowInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); r(a) } })); b("columnDelete", f({
                        requiredContent: "table", exec: function (a) {
                            a = a.getSelection(); (a = y(a)) &&
                                p(a, !0)
                        }
                    })); b("columnInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); u(a, !0) } })); b("columnInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); a = q(a); u(a) } })); b("cellDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); z(a) } })); b("cellMerge", f({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = x(a.getSelection()); p(b.cell, !0) } })); b("cellMergeRight", f({
                        allowedContent: "td[colspan]",
                        requiredContent: "td[colspan]", exec: function (a, b) { b.cell = x(a.getSelection(), "right"); p(b.cell, !0) }
                    })); b("cellMergeDown", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = x(a.getSelection(), "down"); p(b.cell, !0) } })); b("cellVerticalSplit", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { p(E(a.getSelection())) } })); b("cellHorizontalSplit", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { p(C(a.getSelection())) } }));
                b("cellInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); t(a, !0) } })); b("cellInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); t(a) } })); d.addMenuItems && d.addMenuItems({
                    tablecell: {
                        label: c.cell.menu, group: "tablecell", order: 1, getItems: function () {
                            var a = d.getSelection(), b = q(a), a = {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: x(a, null, !0) ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: x(a, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: x(a, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: E(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: C(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }; d.filter.check(h) && (a.tablecell_properties = 0 < b.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); return a
                        }
                    }, tablecell_insertBefore: {
                        label: c.cell.insertBefore,
                        group: "tablecell", command: "cellInsertBefore", order: 5
                    }, tablecell_insertAfter: { label: c.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: c.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: { label: c.cell.merge, group: "tablecell", command: "cellMerge", order: 16 }, tablecell_merge_right: { label: c.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: {
                        label: c.cell.mergeDown, group: "tablecell", command: "cellMergeDown",
                        order: 18
                    }, tablecell_split_horizontal: { label: c.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: c.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: { label: c.cell.title, group: "tablecellproperties", command: "cellProperties", order: 21 }, tablerow: {
                        label: c.row.menu, group: "tablerow", order: 1, getItems: function () {
                            return {
                                tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablerow_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    }, tablerow_insertBefore: { label: c.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: c.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: c.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 }, tablecolumn: {
                        label: c.column.menu, group: "tablecolumn", order: 1, getItems: function () {
                            return {
                                tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    }, tablecolumn_insertBefore: { label: c.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: c.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: { label: c.column.deleteColumn, group: "tablecolumn", command: "columnDelete", order: 15 }
                }); d.contextMenu && d.contextMenu.addListener(function (a, b, c) {
                    return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? {
                        tablecell: CKEDITOR.TRISTATE_OFF,
                        tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF
                    } : null
                })
            }, getCellColIndex: v, insertRow: r, insertColumn: u, getSelectedCells: q
        }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    })();
    CKEDITOR.tools.buildTableMap = function (q, r, B, v, w) { q = q.$.rows; B = B || 0; v = "number" === typeof v ? v : q.length - 1; w = "number" === typeof w ? w : -1; var u = -1, y = []; for (r = r || 0; r <= v; r++) { u++; !y[u] && (y[u] = []); for (var t = -1, z = B; z <= (-1 === w ? q[r].cells.length - 1 : w); z++) { var p = q[r].cells[z]; if (!p) break; for (t++; y[u][t];)t++; for (var A = isNaN(p.colSpan) ? 1 : p.colSpan, p = isNaN(p.rowSpan) ? 1 : p.rowSpan, x = 0; x < p && !(r + x > v); x++) { y[u + x] || (y[u + x] = []); for (var C = 0; C < A; C++)y[u + x][t + C] = q[r].cells[z] } t += A - 1; if (-1 !== w && t >= w) break } } return y }; (function () {
        function D(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function z(a, b) {
            var c = a.getAscendant("table"), d = b.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(c), g = r(a), k = r(b), h = [], f = {}, l, p; c.contains(d) && (b = b.getAscendant({ td: 1, th: 1 }), k = r(b)); g > k && (c = g, g = k, k = c, c = a, a = b, b = c); for (c = 0; c < e[g].length; c++)if (a.$ === e[g][c]) { l = c; break } for (c = 0; c < e[k].length; c++)if (b.$ === e[k][c]) { p = c; break } l > p && (c = l, l = p, p = c); for (c = g; c <= k; c++)for (g = l; g <= p; g++)d = new CKEDITOR.dom.element(e[c][g]),
                d.$ && !d.getCustomData("selected_cell") && (h.push(d), CKEDITOR.dom.element.setMarker(f, d, "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(f); return h
        } function I(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function A(a, b) {
            var c = a.editable().find(".cke_table-faked-selection"), d = a.editable().findOne("[data-cke-table-faked-selection-table]"), e; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor"); for (e = 0; e < c.count(); e++)c.getItem(e).removeClass("cke_table-faked-selection");
            d && d.data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (m = { active: !1 }, a.getSelection().isInTable() && a.getSelection().reset())
        } function t(a, b) { var c = [], d, e; for (e = 0; e < b.length; e++)d = a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d); a.getSelection().selectRanges(c) } function J(a) { var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = z(b.getItem(0), b.getItem(b.count() - 1)), t(a, b)) } function K(a, b, c) {
            var d = v(a.getSelection(!0)); b = b.is("table") ? null :
                b; var e; (e = m.active && !m.first) && !(e = b) && (e = a.getSelection().getRanges(), e = 1 < d.length || e[0] && !e[0].collapsed ? !0 : !1); if (e) m.first = b || d[0], m.dirty = b ? !1 : 1 !== d.length; else if (m.active && b && m.first.getAscendant("table").equals(b.getAscendant("table"))) { d = z(m.first, b); if (!m.dirty && 1 === d.length && !D(c.data.getTarget())) return A(a, "mouseup" === c.name); m.dirty = !0; m.last = b; t(a, d) }
        } function L(a) {
            var b = (a = a.editor || a.sender.editor) && a.getSelection(), c = b && b.getRanges() || [], d = c && c[0].getEnclosedNode(), d = d && d.type ==
                CKEDITOR.NODE_ELEMENT && d.is("img"), e; if (b && (A(a), b.isInTable() && b.isFake)) if (d) a.getSelection().reset(); else if (!c[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) {
                1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (e = c[0]._getTableElement()); e = v(b, e); a.fire("lockSnapshot"); for (b = 0; b < e.length; b++)e[b].addClass("cke_table-faked-selection"); 0 < e.length && (a.editable().addClass("cke_table-faked-selection-editor"), e[0].getAscendant("table").data("cke-table-faked-selection-table",
                    "")); a.fire("unlockSnapshot")
                }
        } function r(a) { return a.getAscendant("tr", !0).$.rowIndex } function w(a) {
            function b(a, b) { return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(l) : !1 } function c(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(e.document) } function d(a, b, d, e) {
                if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !e)) return !0; if (b = a.name === (CKEDITOR.env.gecko ? "mousedown" : "mouseup") && !c(a.data.getTarget())) a = a.data.getTarget().getAscendant({
                    td: 1,
                    th: 1
                }, !0), b = !(a && a.hasClass("cke_table-faked-selection")); return b
            } if (a.data.getTarget().getName && ("mouseup" === a.name || !D(a.data.getTarget()))) {
                var e = a.editor || a.listenerData.editor, g = e.getSelection(1), k = I(e), h = a.data.getTarget(), f = h && h.getAscendant({ td: 1, th: 1 }, !0), h = h && h.getAscendant("table", !0), l = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; h && h.hasAttribute("data-cke-tableselection-ignored") || (d(a, g, k, h) && A(e, !0), !m.active && "mousedown" === a.name && CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT &&
                    h && (m = { active: !0 }, CKEDITOR.document.on("mouseup", w, null, { editor: e })), (f || h) && K(e, f || h, a), "mouseup" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT && (c(a.data.getTarget()) || b(k, h)) && J(e), m = { active: !1 }, CKEDITOR.document.removeListener("mouseup", w)))
            }
        } function M(a) { var b = a.data.getTarget().getAscendant("table", !0); b && b.hasAttribute("data-cke-tableselection-ignored") || (b = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0)) && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault()) }
        function N(a, b) {
            function c(a) { a.cancel() } var d = a.getSelection(), e = d.createBookmarks(), g = a.document, k = a.createRange(), h = g.getDocumentElement().$, f = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", p, x, n, m; g.getById("cke_table_copybin") || (p = g.createElement(l), x = g.createElement(l), x.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), p.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), p.setStyle("ltr" == a.config.contentsLangDirection ?
                "left" : "right", "-5000px"), p.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), x.append(p), a.editable().append(x), m = a.on("selectionChange", c, null, null, 0), f && (n = h.scrollTop), k.selectNodeContents(p), k.select(), f && (h.scrollTop = n), setTimeout(function () { x.remove(); d.selectBookmarks(e); m.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
        } function E(a) {
            var b = a.editor || a.sender.editor, c = b.getSelection(); c.isInTable() && (c.getRanges()[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored") ||
                N(b, "cut" === a.name))
        } function q(a) { this._reset(); a && this.setSelectedCells(a) } function B(a, b, c) { a.on("beforeCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && (d.data.selectedCells = v(a.getSelection())) }); a.on("afterCommandExec", function (d) { -1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data) }) } var m = { active: !1 }, y, v, C, F, G; q.prototype = {}; q.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; q.prototype.setSelectedCells =
            function (a) { this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first = a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr") }; q.prototype.getTableMap = function () {
                var a = C(this.cells.first), b; a: { b = this.cells.last; var c = b.getAscendant("table"), d = r(b), c = CKEDITOR.tools.buildTableMap(c), e; for (e = 0; e < c[d].length; e++)if ((new CKEDITOR.dom.element(c[d][e])).equals(b)) { b = e; break a } b = void 0 } return CKEDITOR.tools.buildTableMap(this._getTable(),
                    r(this.rows.first), a, r(this.rows.last), b)
            }; q.prototype._getTable = function () { return this.rows.first.getAscendant("table") }; q.prototype.insertRow = function (a, b, c) { if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var d = this.cells.first.$.cellIndex, e = this.cells.last.$.cellIndex, g = c ? [] : this.cells.all, k, h = 0; h < a; h++)k = F(c ? this.cells.all : g, b), k = CKEDITOR.tools.array.filter(k.find("td, th").toArray(), function (a) { return c ? !0 : a.$.cellIndex >= d && a.$.cellIndex <= e }), g = b ? k.concat(g) : g.concat(k); this.setSelectedCells(g) };
        q.prototype.insertColumn = function (a) { function b(a) { a = r(a); return a >= e && a <= g } if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells, d = c.all, e = r(c.first), g = r(c.last), c = 0; c < a; c++)d = d.concat(CKEDITOR.tools.array.filter(G(d), b)); this.setSelectedCells(d) }; q.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; q.prototype._arraySortByDOMOrder = function (a) { a.sort(function (a, c) { return a.getPosition(c) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var H = {
            onPaste: function (a) {
                function b(a) {
                    var b =
                        d.createRange(); b.selectNodeContents(a); b.select()
                } function c(a) { return Math.max.apply(null, CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0)) } var d = a.editor, e = d.getSelection(), g = v(e), k = e.isInTable(!0) && this.isBoundarySelection(e), h = this.findTableInPastedContent(d, a.data.dataValue), f, l; (function (a, b, d, c) {
                    a = a.getRanges(); var e = a.length && a[0]._getTableElement({ table: 1 }); if (!b.length || e && e.hasAttribute("data-cke-tableselection-ignored") || c && !d) return !1; if (b = !c) (b = a[0]) ? (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT),
                        b = (b = b.getEnclosedNode()) && b.is && b.is(CKEDITOR.dtd.$tableContent)) : b = void 0, b = !b; return b ? !1 : !0
                })(e, g, h, k) && (g = g[0].getAscendant("table"), f = new q(v(e, g)), d.once("afterPaste", function () { var a; if (l) { a = new CKEDITOR.dom.element(l[0][0]); var b = l[l.length - 1]; a = z(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = f.cells.all; t(d, a) }), h ? (a.stop(), k ? (f.insertRow(1, 1 === k, !0), e.selectElement(f.rows.first)) : (f.emptyCells(), t(d, f.cells.all)), a = f.getTableMap(), l = CKEDITOR.tools.buildTableMap(h), f.insertRow(l.length -
                    a.length), f.insertColumn(c(l) - c(a)), a = f.getTableMap(), this.pasteTable(f, a, l), d.fire("saveSnapshot"), setTimeout(function () { d.fire("afterPaste") }, 0)) : (b(f.cells.first), d.once("afterPaste", function () { d.fire("lockSnapshot"); f.emptyCells(f.cells.all.slice(1)); t(d, f.cells.all); d.fire("unlockSnapshot") })))
            }, isBoundarySelection: function (a) { a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) { if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2 } return 0 },
            findTableInPastedContent: function (a, b) { var c = a.dataProcessor, d = new CKEDITOR.dom.element("body"); c || (c = new CKEDITOR.htmlDataProcessor(a)); d.setHtml(c.toHtml(b), { fixForBody: !1 }); return 1 < d.getChildCount() ? null : d.findOne("table") }, pasteTable: function (a, b, c) {
                var d, e = C(a.cells.first), g = a._getTable(), k = {}, h, f, l, p; for (l = 0; l < c.length; l++)for (h = new CKEDITOR.dom.element(g.$.rows[a.rows.first.$.rowIndex + l]), p = 0; p < c[l].length; p++)if (f = new CKEDITOR.dom.element(c[l][p]), d = b[l] && b[l][p] ? new CKEDITOR.dom.element(b[l][p]) :
                    null, f && !f.getCustomData("processed")) { if (d && d.getParent()) f.replace(d); else if (0 === p || c[l][p - 1]) (d = 0 !== p ? new CKEDITOR.dom.element(c[l][p - 1]) : null) && h.equals(d.getParent()) ? f.insertAfter(d) : 0 < e ? h.$.cells[e] ? f.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])) : h.append(f) : h.append(f, !0); CKEDITOR.dom.element.setMarker(k, f, "processed", !0) } else f.getCustomData("processed") && d && d.remove(); CKEDITOR.dom.element.clearAllMarkers(k)
            }
        }; CKEDITOR.plugins.tableselection = {
            getCellsBetween: z, keyboardIntegration: function (a) {
                function b(a) {
                    var b =
                        a.getEnclosedNode(); b && "function" === typeof b.is && b.is({ td: 1, th: 1 }) ? b.setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() })
                } var c = a.editable(); c.attachListener(c, "keydown", function (a) {
                    function c(b, e) {
                        if (!e.length) return null; var l = a.createRange(), g = CKEDITOR.dom.range.mergeRanges(e); CKEDITOR.tools.array.forEach(g, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var m = g[0].getBoundaryNodes(), n = m.startNode, m = m.endNode; if (n && n.is && n.is(k)) {
                            for (var q = n.getAscendant("table",
                                !0), u = n.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, q), r = !1, t = function (a) { return !n.contains(a) && a.is && a.is("td", "th") }; u && !t(u);)u = u.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, q); !u && m && m.is && !m.is("table") && m.getNext() && (u = m.getNext().findOne("td, th"), r = !0); if (u) l["moveToElementEdit" + (r ? "Start" : "End")](u); else l.setStartBefore(n.getAscendant("table", !0)), l.collapse(!0); g[0].deleteContents(); return [l]
                        } if (n) return l.moveToElementEditablePosition(n), [l]
                    } var g = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1, 13: 1 },
                        k = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete k.td; delete k.th; return function (h) {
                            var f = h.data.getKey(), l = h.data.getKeystroke(), k, m = 37 === f || 38 == f, n, q, r; if (g[f] && !a.readOnly && (k = a.getSelection()) && k.isInTable() && k.isFake) {
                                n = k.getRanges(); q = n[0]._getTableElement(); r = n[n.length - 1]._getTableElement(); if (13 !== f || a.plugins.enterkey) h.data.preventDefault(), h.cancel(); if (36 < f && 41 > f) n[0].moveToElementEditablePosition(m ? q : r, !m), k.selectRanges([n[0]]); else if (13 !== f || 13 === l || l === CKEDITOR.SHIFT +
                                    13) { for (h = 0; h < n.length; h++)b(n[h]); (h = c(q, n)) ? n = h : n[0].moveToElementEditablePosition(q); k.selectRanges(n); 13 === f && a.plugins.enterkey ? (a.fire("lockSnapshot"), 13 === l ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== f && a.fire("saveSnapshot") }
                            }
                        }
                }(a), null, null, -1); c.attachListener(c, "keypress", function (c) {
                    var e = a.getSelection(), g = c.data.$.charCode || 13 === c.data.getKey(), k; if (!a.readOnly && e && e.isInTable() && e.isFake && g && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
                        c =
                        e.getRanges(); g = c[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (k = 0; k < c.length; k++)b(c[k]); g && (c[0].moveToElementEditablePosition(g), e.selectRanges([c[0]]))
                    }
                }, null, null, -1)
            }
        }; CKEDITOR.plugins.add("tableselection", {
            requires: "clipboard,tabletools", isSupportedEnvironment: function () { return !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version) }, onLoad: function () {
                y = CKEDITOR.plugins.tabletools; v = y.getSelectedCells; C = y.getCellColIndex; F = y.insertRow; G = y.insertColumn; CKEDITOR.document.appendStyleSheet(this.path +
                    "styles/tableselection.css")
            }, init: function (a) {
                this.isSupportedEnvironment() && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                    var b = a.editable(), c = b.isInline() ? b : a.document, d = { editor: a }; b.attachListener(c, "mousedown", w, null, d); b.attachListener(c, "mousemove", w, null, d); b.attachListener(c, "mouseup", w, null, d); b.attachListener(b, "dragstart", M); b.attachListener(a, "selectionCheck", L); CKEDITOR.plugins.tableselection.keyboardIntegration(a); CKEDITOR.plugins.clipboard &&
                        !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", E), b.attachListener(b, "copy", E))
                }), a.on("paste", H.onPaste, H), B(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, c) { t(a, c.selectedCells) }), B(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, c) { t(a, [c.commandData.cell]) }), B(a, ["cellDelete"], function (a) { A(a, !0) }))
            }
        })
    })(); (function () {
        function n(a, b) { return CKEDITOR.tools.array.reduce(b, function (a, b) { return b(a) }, a) } var g = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], p = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
            init: function (a) {
                function b(a) { d.enabled && !1 !== a.data.command.canUndo && d.save() } function c() { d.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode; d.onChange() } var d = a.undoManager = new e(a), l = d.editingHandler = new k(d), f = a.addCommand("undo", {
                    exec: function () { d.undo() && (a.selectionChange(), this.fire("afterUndo")) },
                    startDisabled: !0, canUndo: !1
                }), h = a.addCommand("redo", { exec: function () { d.redo() && (a.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); a.setKeystroke([[g[0], "undo"], [g[1], "redo"], [g[2], "redo"]]); d.onChange = function () { f.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); h.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; a.on("beforeCommandExec", b); a.on("afterCommandExec", b); a.on("saveSnapshot", function (a) { d.save(a.data && a.data.contentOnly) });
                a.on("contentDom", l.attachListeners, l); a.on("instanceReady", function () { a.fire("saveSnapshot") }); a.on("beforeModeUnload", function () { "wysiwyg" == a.mode && d.save(!0) }); a.on("mode", c); a.on("readOnly", c); a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })); a.resetUndo = function () { d.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { d.currentImage && d.update() }); a.on("lockSnapshot",
                    function (a) { a = a.data; d.lock(a && a.dontUpdate, a && a.forceUpdate) }); a.on("unlockSnapshot", d.unlock, d)
            }
        }); CKEDITOR.plugins.undo = {}; var e = CKEDITOR.plugins.undo.UndoManager = function (a) { this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit = 25; this._filterRules = []; this.editor = a; this.reset(); CKEDITOR.env.ie && this.addFilterRule(function (a) { return a.replace(/\s+data-cke-expando=".*?"/g, "") }) }; e.prototype = {
            type: function (a, b) {
                var c = e.getKeyGroup(a),
                d = this.strokesRecorded[c] + 1; b = b || d >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); b ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[c] = d; this.previousKeyGroup = c
            }, keyGroupChanged: function (a) { return e.getKeyGroup(a) != this.previousKeyGroup }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () {
            this.strokesRecorded =
                [0, 0]; this.typing = !1; this.previousKeyGroup = -1
            }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, c) {
                var d = this.editor; if (this.locked || "ready" != d.status || "wysiwyg" != d.mode) return !1; var e = d.editable(); if (!e || "ready" != e.status) return !1; e = this.snapshots; b || (b = new f(d)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !==
                    c && d.fire("change"); e.splice(this.index + 1, e.length - this.index - 1); e.length == this.limit && e.shift(); this.index = e.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
            }, restoreImage: function (a) {
                var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents); a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index;
                this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire("change")
            }, getNextImage: function (a) { var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) { if (a = b[d], !c.equalsContent(a)) return a.index = d, a } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index = d, a; return null }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () {
                if (this.undoable()) {
                    this.save(!0);
                    var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0
                } return !1
            }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) { if (!this.locked) { a || (a = new f(this.editor)); for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b - 1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a } }, updateSelection: function (a) {
                if (!this.snapshots.length) return !1; var b = this.snapshots,
                    c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
            }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var c = null; if (b) c = !0; else { var d = new f(this.editor, !0); this.currentImage && this.currentImage.equalsContent(d) && (c = d) } this.locked = { update: c, level: 1 } } }, unlock: function () {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) {
                        var b = new f(this.editor,
                            !0); a.equalsContent(b) || this.update()
                    }
                }
            }, addFilterRule: function (a) { this._filterRules.push(a) }
        }; e.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; e.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; e.isNavigationKey = function (a) { return !!e.navigationKeyCodes[a] }; e.getKeyGroup = function (a) { var b = e.keyGroups; return p[a] ? b.FUNCTIONAL : b.PRINTABLE }; e.getOppositeKeyGroup = function (a) { var b = e.keyGroups; return a == b.FUNCTIONAL ? b.PRINTABLE : b.FUNCTIONAL }; e.ieFunctionalKeysBug = function (a) {
            return CKEDITOR.env.ie &&
                e.getKeyGroup(a) == e.keyGroups.FUNCTIONAL
        }; var f = CKEDITOR.plugins.undo.Image = function (a, b) { this.editor = a; a.fire("beforeUndoImage"); var c = a.getSnapshot(); c && (this.contents = n(c, a.undoManager._filterRules)); b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)); a.fire("afterUndoImage") }, h = /\b(?:href|src|name)="[^"]*?"/gi; f.prototype = {
            equalsContent: function (a) {
                var b = this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ""), a = a.replace(h,
                    "")); return b != a ? !1 : !0
            }, equalsSelection: function (a) { var b = this.bookmarks; a = a.bookmarks; if (b || a) { if (!b || !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var d = b[c], e = a[c]; if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end)) return !1 } } return !0 }
        }; var k = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) {
        this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new m; this.lastKeydownImage =
            null
        }; k.prototype = {
            onKeydown: function (a) { var b = a.data.getKey(); if (229 !== b) if (-1 < CKEDITOR.tools.indexOf(g, a.data.getKeystroke())) a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(b) || this.keyEventsStack.push(b), this.lastKeydownImage = new f(a.editor), e.isNavigationKey(b) || this.undoManager.keyGroupChanged(b)) if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1, this.lastKeydownImage, !1), a.resetType() }, onInput: function () {
                if (this.ignoreInputEvent) this.ignoreInputEvent =
                    !1; else { var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) }
            }, onKeyup: function (a) {
                var b = this.undoManager; a = a.data.getKey(); var c = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a); if (!(e.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(b.editor,
                    !0)))) if (0 < c) b.type(a); else if (e.isNavigationKey(a)) this.onNavigationKey(!0)
            }, onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                var a = this.undoManager.editor, b = a.editable(), c = this; b.attachListener(b, "keydown", function (a) { c.onKeydown(a); if (e.ieFunctionalKeysBug(a.data.getKey())) c.onInput() },
                    null, null, 999); b.attachListener(b, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999); b.attachListener(b, "keyup", c.onKeyup, c, null, 999); b.attachListener(b, "paste", c.ignoreInputEventListener, c, null, 999); b.attachListener(b, "drop", c.ignoreInputEventListener, c, null, 999); a.on("afterPaste", c.activateInputEventListener, c, null, 999); b.attachListener(b.isInline() ? b : a.document.getDocumentElement(), "click", function () { c.onNavigationKey() }, null, null, 999); b.attachListener(this.undoManager.editor, "blur", function () { c.keyEventsStack.remove(9) },
                        null, null, 999)
            }
        }; var m = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; m.prototype = {
            push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) { a = this.getLastIndex(a); return -1 != a ? this.stack[a] : null }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) {
                a = this.getLastIndex(a); -1 !=
                    a && this.stack.splice(a, 1)
            }, resetInputs: function (a) { if ("number" == typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0 }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
        }
    })(); (function () {
        function m(a, d) { CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, d, !0); this.inline = this.editable.isInline(); this.inline || (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"] } function n(a, d) { CKEDITOR.tools.extend(this, d, { editor: a }, !0) } function p(a, d) {
            var b = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: b, inline: b.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() },
                d, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var c = CKEDITOR.tools.bind(this.queryViewport, this), e = CKEDITOR.tools.bind(this.hideVisible, this), g = CKEDITOR.tools.bind(this.removeAll, this); b.attachListener(this.winTop, "resize", c); b.attachListener(this.winTop, "scroll", c); b.attachListener(this.winTop, "resize", e); b.attachListener(this.win, "scroll", e); b.attachListener(this.inline ? b : this.frame, "mouseout", function (a) {
                    var b = a.data.$.clientX; a = a.data.$.clientY;
                    this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                }, this); b.attachListener(a, "resize", c); b.attachListener(a, "mode", g); a.on("destroy", g); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                    lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                        t, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, q, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, q, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                })
        } function l(a) {
            var d; if (d = a && a.type == CKEDITOR.NODE_ELEMENT) d = !(r[a.getComputedStyle("float")] || r[a.getAttribute("align")]); return d &&
                !u[a.getComputedStyle("position")]
        } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE = 1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; m.prototype = {
            start: function (a) {
                var d = this, b = this.editor, c = this.doc, e, g, f, h, k = CKEDITOR.tools.eventsBuffer(50, function () { b.readOnly || "wysiwyg" != b.mode || (d.relations = {}, (g = c.$.elementFromPoint(f, h)) && g.nodeType && (e = new CKEDITOR.dom.element(g), d.traverseSearch(e), isNaN(f + h) || d.pixelSearch(e, f, h), a && a(d.relations, f, h))) }); this.listener = this.editable.attachListener(this.target,
                    "mousemove", function (a) { f = a.data.$.clientX; h = a.data.$.clientY; k.input() }); this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { k.reset() })
            }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () {
                var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (d) {
                    var b = this.editor.createRange(); b.moveToPosition(this.relations[d.uid].element,
                        a[d.type]); return b
                }
            }(), store: function () { function a(a, b, c) { var e = a.getUniqueId(); e in c ? c[e].type |= b : c[e] = { element: a, type: b } } return function (d, b) { var c; b & CKEDITOR.LINEUTILS_AFTER && l(c = d.getNext()) && c.isVisible() && (a(c, CKEDITOR.LINEUTILS_BEFORE, this.relations), b ^= CKEDITOR.LINEUTILS_AFTER); b & CKEDITOR.LINEUTILS_INSIDE && l(c = d.getFirst()) && c.isVisible() && (a(c, CKEDITOR.LINEUTILS_BEFORE, this.relations), b ^= CKEDITOR.LINEUTILS_INSIDE); a(d, b, this.relations) } }(), traverseSearch: function (a) {
                var d, b, c; do if (c = a.$["data-cke-expando"],
                    !(c && c in this.relations)) { if (a.equals(this.editable)) break; if (l(a)) for (d in this.lookups) (b = this.lookups[d](a)) && this.store(a, b) } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
            }, pixelSearch: function () {
                function a(a, c, e, g, f) { for (var h = 0, k; f(e);) { e += g; if (25 == ++h) break; if (k = this.doc.$.elementFromPoint(c, e)) if (k == a) h = 0; else if (d(a, k) && (h = 0, l(k = new CKEDITOR.dom.element(k)))) return k } } var d = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, c) { return a.contains(c) } :
                    function (a, c) { return !!(a.compareDocumentPosition(c) & 16) }; return function (b, c, d) { var g = this.win.getViewPaneSize().height, f = a.call(this, b.$, c, d, -1, function (a) { return 0 < a }); c = a.call(this, b.$, c, d, 1, function (a) { return a < g }); if (f) for (this.traverseSearch(f); !f.getParent().equals(b);)f = f.getParent(); if (c) for (this.traverseSearch(c); !c.getParent().equals(b);)c = c.getParent(); for (; f || c;) { f && (f = f.getNext(l)); if (!f || f.equals(c)) break; this.traverseSearch(f); c && (c = c.getPrevious(l)); if (!c || c.equals(f)) break; this.traverseSearch(c) } }
            }(),
            greedySearch: function () { this.relations = {}; for (var a = this.editable.getElementsByTag("*"), d = 0, b, c, e; b = a.getItem(d++);)if (!b.equals(this.editable) && b.type == CKEDITOR.NODE_ELEMENT && (b.hasAttribute("contenteditable") || !b.isReadOnly()) && l(b) && b.isVisible()) for (e in this.lookups) (c = this.lookups[e](b)) && this.store(b, c); return this.relations }
        }; n.prototype = {
            locate: function () {
                function a(a, b) {
                    var c = a.element[b === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return c && l(c) ? (a.siblingRect = c.getClientRect(),
                        b == CKEDITOR.LINEUTILS_BEFORE ? (a.siblingRect.bottom + a.elementRect.top) / 2 : (a.elementRect.bottom + a.siblingRect.top) / 2) : b == CKEDITOR.LINEUTILS_BEFORE ? a.elementRect.top : a.elementRect.bottom
                } return function (d) {
                    var b; this.locations = {}; for (var c in d) b = d[c], b.elementRect = b.element.getClientRect(), b.type & CKEDITOR.LINEUTILS_BEFORE && this.store(c, CKEDITOR.LINEUTILS_BEFORE, a(b, CKEDITOR.LINEUTILS_BEFORE)), b.type & CKEDITOR.LINEUTILS_AFTER && this.store(c, CKEDITOR.LINEUTILS_AFTER, a(b, CKEDITOR.LINEUTILS_AFTER)), b.type &
                        CKEDITOR.LINEUTILS_INSIDE && this.store(c, CKEDITOR.LINEUTILS_INSIDE, (b.elementRect.top + b.elementRect.bottom) / 2); return this.locations
                }
            }(), sort: function () { var a, d, b, c; return function (e, g) { a = this.locations; d = []; for (var f in a) for (var h in a[f]) if (b = Math.abs(e - a[f][h]), d.length) { for (c = 0; c < d.length; c++)if (b < d[c].dist) { d.splice(c, 0, { uid: +f, type: h, dist: b }); break } c == d.length && d.push({ uid: +f, type: h, dist: b }) } else d.push({ uid: +f, type: h, dist: b }); return "undefined" != typeof g ? d.slice(0, g) : d } }(), store: function (a,
                d, b) { this.locations[a] || (this.locations[a] = {}); this.locations[a][d] = b }
        }; var q = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, t = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; p.prototype = {
            removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) {
                var d = a.getUniqueId();
                a.hide(); this.hidden[d] = a; delete this.visible[d]
            }, showLine: function (a) { var d = a.getUniqueId(); a.show(); this.visible[d] = a; delete this.hidden[d] }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, d) {
                var b, c, e; if (b = this.getStyle(a.uid, a.type)) {
                    for (e in this.visible) if (this.visible[e].getCustomData("hash") !== this.hash) { c = this.visible[e]; break } if (!c) for (e in this.hidden) if (this.hidden[e].getCustomData("hash") !== this.hash) {
                        this.showLine(c = this.hidden[e]);
                        break
                    } c || this.showLine(c = this.addLine()); c.setCustomData("hash", this.hash); this.visible[c.getUniqueId()] = c; c.setStyles(b); d && d(c)
                }
            }, getStyle: function (a, d) {
                var b = this.relations[a], c = this.locations[a][d], e = {}; e.width = b.siblingRect ? Math.max(b.siblingRect.width, b.elementRect.width) : b.elementRect.width; e.top = this.inline ? c + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + c; if (e.top - this.winTopScroll.y < this.rect.top || e.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ?
                    e.left = b.elementRect.left - this.rect.relativeX : (0 < b.elementRect.left ? e.left = this.rect.left + b.elementRect.left : (e.width += b.elementRect.left, e.left = this.rect.left), 0 < (b = e.left + e.width - (this.rect.left + this.winPane.width)) && (e.width -= b)); e.left += this.winTopScroll.x; for (var g in e) e[g] = CKEDITOR.tools.cssLength(e[g]); return e
            }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, d) { this.relations = a; this.locations = d; this.hash = Math.random() },
            cleanup: function () { var a, d; for (d in this.visible) a = this.visible[d], a.getCustomData("hash") !== this.hash && this.hideLine(a) }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                a = a.getClientRect(); var d = this.container.getDocumentPosition(), b = this.container.getComputedStyle("position"); a.relativeX = a.relativeY =
                    0; "static" != b && (a.relativeY = d.y, a.relativeX = d.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
            }
        }; var r = { left: 1, right: 1, center: 1 }, u = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: m, locator: n, liner: p }
    })(); (function () {
        function e(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
            init: function (a) {
                if (CKEDITOR.env.webkit) {
                    var b = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                        a = a.editor; var c = a.editable(); c.attachListener(c, "keydown", function (a) { a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { b.addFillers(c) || b.removeFillers(c) }, 0) }, null, null, -1); a.on("selectionCheck", function (a) { b.removeFillers(a.editor.editable()) });
                        a.on("paste", function (a) { a.data.dataValue = b.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && b.addSelectAllIntegration(a)
                    })
                }
            }
        }); CKEDITOR.plugins.widgetselection = {
            startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit", fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (a) {
                var b = a.editor; if (!this.isWholeContentSelected(a) && 0 < a.getChildCount()) {
                    var d = a.getFirst(e), c = a.getLast(e); d && d.type == CKEDITOR.NODE_ELEMENT && !d.isEditable() && (this.startFiller = this.createFiller(),
                        a.append(this.startFiller, 1)); c && c.type == CKEDITOR.NODE_ELEMENT && !c.isEditable() && (this.endFiller = this.createFiller(!0), a.append(this.endFiller, 0)); if (this.hasFiller(a)) return b = b.createRange(), b.selectNodeContents(a), b.select(), !0
                } return !1
            }, removeFillers: function (a) {
                if (this.hasFiller(a) && !this.isWholeContentSelected(a)) {
                    var b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), d = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && b && this.startFiller.equals(b) ?
                        this.removeFiller(this.startFiller, a) : this.startFiller = b; this.endFiller && d && this.endFiller.equals(d) ? this.removeFiller(this.endFiller, a) : this.endFiller = d
                }
            }, cleanPasteData: function (a) { a && a.length && (a = a.replace(this.createFillerRegex(), "").replace(this.createFillerRegex(!0), "")); return a }, isWholeContentSelected: function (a) {
                var b = a.editor.getSelection().getRanges()[0]; return !b || b && b.collapsed ? !1 : (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(b && a && b.startContainer && b.endContainer && 0 === b.startOffset &&
                    b.endOffset === a.getChildCount() && b.startContainer.equals(a) && b.endContainer.equals(a)))
            }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                var b = new CKEDITOR.dom.element(this.fillerTagName); b.setHtml(this.fillerContent); b.setAttribute(this.fillerAttribute, a ? "end" : "start"); b.setAttribute("data-cke-temp", 1); b.setStyles({
                    display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0,
                    overflow: "hidden"
                }); return b
            }, removeFiller: function (a, b) {
                if (a) {
                    var d = b.editor, c = b.editor.getSelection().getRanges()[0].startPath(), f = d.createRange(), g, e; c.contains(a) && (g = a.getHtml(), e = !0); c = "start" == a.getAttribute(this.fillerAttribute); a.remove(); g && 0 < g.length && g != this.fillerContent ? (b.insertHtmlIntoRange(g, d.getSelection().getRanges()[0]), f.setStartAt(b.getChild(b.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), d.getSelection().selectRanges([f])) : e && (c ? f.setStartAt(b.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) :
                        f.setEndAt(b.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), b.editor.getSelection().selectRanges([f]))
                }
            }, createFillerRegex: function (a) { var b = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi, "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + b + (a ? "$" : "")) }, addSelectAllIntegration: function (a) { var b = this; a.editable().attachListener(a, "beforeCommandExec", function (d) { var c = a.editable(); "selectAll" == d.data.name && c && b.addFillers(c) }, null, null, 9999) }
        }
    })(); (function () {
        function q(a) { this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; N(this); O(this); this.on("checkWidgets", P); this.editor.on("contentDomInvalidated", this.checkWidgets, this); Q(this); R(this); S(this); T(this); U(this) } function h(a, b, c, d, e) {
            var f = a.editor; CKEDITOR.tools.extend(this, d, {
                editor: f, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({},
                    "function" == typeof d.defaults ? d.defaults() : d.defaults), dataReady: !1, inited: !1, ready: !1, edit: h.prototype.edit, focusedEditable: null, definition: d, repository: a, draggable: !1 !== d.draggable, _: { downcastFn: d.downcast && "string" == typeof d.downcast ? d.downcasts[d.downcast] : d.downcast }
            }, !0); a.fire("instanceCreated", this); V(this, d); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); e && this.setData(e); this.data.classes || this.setData("classes",
                this.getClasses()); this.dataReady = !0; v(this); this.fire("data", this.data); this.isInited() && f.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
        } function t(a, b, c) { CKEDITOR.dom.element.call(this, b.$); this.editor = a; this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR } function W(a,
            b) {
                a.addCommand(b.name, {
                    exec: function (a, d) {
                        function e() { a.widgets.finalizeCreation(k) } var f = a.widgets.focused; if (f && f.name == b.name) f.edit(); else if (b.insert) b.insert({ editor: a, commandData: d }); else if (b.template) {
                            var f = "function" == typeof b.defaults ? b.defaults() : b.defaults, f = CKEDITOR.dom.element.createFromHtml(b.template.output(f), a.document), g, l = a.widgets.wrapElement(f, b.name), k = new CKEDITOR.dom.documentFragment(l.getDocument()); k.append(l); (g = a.widgets.initOn(f, b, d && d.startupData)) ? (f = g.once("edit",
                                function (b) { if (b.data.dialog) g.once("dialog", function (b) { b = b.data; var d, f; d = b.once("ok", e, null, null, 20); f = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(g, !0) }); b.once("hide", function () { d.removeListener(); f.removeListener() }) }); else e() }, null, null, 999), g.edit(), f.removeListener()) : e()
                        }
                    }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
                })
        } function X(a, b) {
            function c(a, c) {
                var d = b.upcast.split(","),
                e, f; for (f = 0; f < d.length; f++)if (e = d[f], e === a.name) return b.upcasts[e].call(this, a, c); return !1
            } function d(b, c, d) { var e = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > d }); 0 > e && (e = a._.upcasts.length); a._.upcasts.splice(e, 0, [CKEDITOR.tools.bind(b, c), c.name, d]) } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c, b, f) : d(e, b, f))
        } function x(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } }
        function P(a) {
            a = a.data; if ("wysiwyg" == this.editor.mode) {
                var b = this.editor.editable(), c = this.instances, d, e, f, g; if (b) {
                    for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll(); else { var l = b.find(".cke_widget_wrapper"), c = []; d = 0; for (e = l.count(); d < e; d++) { f = l.getItem(d); if (g = !this.getByElement(f, !0)) { a: { g = Y; for (var k = f; k = k.getParent();)if (g(k)) { g = !0; break a } g = !1 } g = !g } g && b.contains(f) && (f.addClass("cke_widget_new"), c.push(this.initOn(f.getFirst(h.isDomWidgetElement)))) } } a &&
                        a.focusInited && 1 == c.length && c[0].focus()
                }
            }
        } function y(a) { if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) { var b = z(a), c = A(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] = 1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1) } } function z(a) {
            return a.find(function (a) {
                return 3 ===
                    a.type
            }, !0).shift()
        } function A(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function B(a, b, c) { if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d = {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a } function Z(a) {
            var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                toBeWrapped: b, iterator: function (a) {
                    var f, g, l, k, n; if ("data-cke-widget-wrapper" in
                        a.attributes) return (a = a.getFirst(h.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (n = c.length) { if (a.attributes["data-cke-widget-upcasted"]) return !1; k = 0; for (f = d.length; k < f; ++k)if (!1 === d[k](a)) return; for (k = 0; k < n; ++k)if (f = c[k], l = {}, g = f[0](a, l)) return g instanceof CKEDITOR.htmlParser.element && (a = g), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(l)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, f[1]]), !1 }
                }
            }
        } function C(a, b) {
            return {
                tabindex: -1,
                contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "")
            }
        } function D(a, b, c) { if (a.type == CKEDITOR.NODE_ELEMENT) { var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return D(e, b, c) } } a.add(c, b) } function E(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function Y(a) { return a.hasAttribute("data-cke-temp") }
        function p(a, b, c, d) { var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable = b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot") }
        function aa(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function ba(a, b) { return CKEDITOR.tools.trim(b) } function T(a) {
            var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var e = c.data.target; h.isDomDragHandler(e) && (e = a.getByElement(e), c.data.dataTransfer.setData("cke/widget-id", e.id), b.focus(), e.focus()) }); b.on("drop", function (c) {
                var e = c.data.dataTransfer, f = e.getData("cke/widget-id"), g = e.getTransferType(b),
                e = b.createRange(); "" !== f && g === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c.cancel() : "" !== f && g == CKEDITOR.DATA_TRANSFER_INTERNAL && (f = a.instances[f]) && (e.setStartBefore(f.wrapper), e.setEndAfter(f.wrapper), c.data.dragRange = e, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData("text/html", f.getClipboardHtml()), b.widgets.destroy(f, !0))
            }); b.on("contentDom", function () {
                var d = b.editable(); CKEDITOR.tools.extend(a, {
                    finder: new c.finder(b,
                        { lookups: { "default": function (b) { if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !h.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) { var c = h.getNestedEditable(d, b); if (c) { b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent; if (c && b && !c.check(b)) return } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER } } } }), locator: new c.locator(b), liner: new c.liner(b, {
                            lineStyle: { cursor: "move !important", "border-top-color": "#666" },
                            tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" }
                        })
                }, !0)
            })
        } function R(a) {
            var b = a.editor; b.on("contentDom", function () {
                var c = b.editable(), d = c.isInline() ? c : b.document, e, f; c.attachListener(d, "mousedown", function (c) {
                    var d = c.data.getTarget(); e = d instanceof CKEDITOR.dom.element ? a.getByElement(d) : null; f = 0; e && (e.inline && d.type == CKEDITOR.NODE_ELEMENT && d.hasAttribute("data-cke-widget-drag-handler") ? (f = 1, a.focused != e && b.getSelection().removeAllRanges()) : h.getNestedEditable(e.wrapper,
                        d) ? e = null : (c.data.preventDefault(), CKEDITOR.env.ie || e.focus()))
                }); c.attachListener(d, "mouseup", function () { f && e && e.wrapper && (f = 0, e.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { e && e.wrapper && c.contains(e.wrapper) && (e.focus(), e = null) }) })
            }); b.on("doubleclick", function (b) { var d = a.getByElement(b.data.element); if (d && !h.getNestedEditable(d.wrapper, b.data.element)) return d.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
        } function S(a) {
            a.editor.on("key",
                function (b) { var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 == c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e }, null, null, 1)
        } function U(a) {
            function b(b) {
            1 >
                a.selected.length || F(c, "cut" === b.name)
            } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) })
        } function Q(a) {
            function b() { a.fire("checkSelection") } var c = a.editor; c.on("selectionCheck", b); c.on("contentDom", function () { c.editable().attachListener(c, "key", function () { setTimeout(b, 10) }) }); a.on("checkSelection", a.checkSelection, a); c.on("selectionChange", function (b) {
                var e = (b = h.getNestedEditable(c.editable(), b.data.selection.getStartElement())) &&
                    a.getByElement(b), f = a.widgetHoldingFocusedEditable; f ? f === e && f.focusedEditable.equals(b) || (p(a, f, null), e && b && p(a, e, b)) : e && b && p(a, e, b)
            }); c.on("dataReady", function () { G(a).commit() }); c.on("blur", function () { var b; (b = a.focused) && x(a, b); (b = a.widgetHoldingFocusedEditable) && p(a, b, null) })
        } function O(a) {
            var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                var e = CKEDITOR.tools.getNextNumber(), f = []; b.data.downcastingSessionId = e; c[e] = f; b.data.dataValue.forEach(function (b) {
                    var c = b.attributes, e; if ("data-cke-widget-white-space" in
                        c) { e = z(b); var d = A(b); e.parent.attributes["data-cke-white-space-first"] && (e.value = e.value.replace(/^&nbsp;/g, " ")); d.parent.attributes["data-cke-white-space-last"] && (d.value = d.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) e = b.getFirst(h.isParserWidgetElement), f.push({ wrapper: b, element: e, widget: c, editables: {} }), "1" != e.attributes["data-cke-widget-keep-attr"] && delete e.attributes["data-widget"] } else if ("data-cke-widget-editable" in c) return 0 < f.length &&
                            (f[f.length - 1].editables[c["data-cke-widget-editable"]] = b), !1
                }, CKEDITOR.NODE_ELEMENT, !0)
            }, null, null, 8); b.on("toDataFormat", function (a) {
                if (a.data.downcastingSessionId) for (var b = c[a.data.downcastingSessionId], f, g, l, k, h, m; f = b.shift();) {
                    g = f.widget; l = f.element; k = g._.downcastFn && g._.downcastFn.call(g, l); a.data.widgetsCopy && g.getClipboardHtml && (k = CKEDITOR.htmlParser.fragment.fromHtml(g.getClipboardHtml()), k = k.children[0]); for (m in f.editables) h = f.editables[m], delete h.attributes.contenteditable, h.setHtml(g.editables[m].getData());
                    k || (k = l); f.wrapper.replaceWith(k)
                }
            }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
        } function N(a) {
            var b = a.editor, c, d; b.on("toHtml", function (b) {
                var d = Z(a), g; for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); g = d.toBeWrapped.pop();) { var l = g[0], k = l.parent; k.type == CKEDITOR.NODE_ELEMENT && k.attributes["data-cke-widget-wrapper"] && k.replaceWith(l); a.wrapElement(g[0], g[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length && h.isParserWidgetWrapper(b.data.dataValue.children[1]) :
                    1 == b.data.dataValue.children.length && h.isParserWidgetWrapper(b.data.dataValue.children[0])
            }, null, null, 8); b.on("dataReady", function () { if (d) for (var c = b.editable().find(".cke_widget_wrapper"), f, g, l = 0, k = c.count(); l < k; ++l)f = c.getItem(l), g = f.getFirst(h.isDomWidgetElement), g.type == CKEDITOR.NODE_ELEMENT && g.data("widget") ? (g.replace(f), a.wrapElement(g)) : f.remove(); d = 0; a.destroyAll(!0); a.initOnAll() }); b.on("loadSnapshot", function (b) { /data-cke-widget/.test(b.data) && (d = 1); a.destroyAll(!0) }, null, null, 9); b.on("paste",
                function (a) { a = a.data; a.dataValue = a.dataValue.replace(ca, ba); a.range && (a = h.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a) }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
        } function G(a) {
            var b = a.selected, c = [], d = b.slice(0), e = null; return {
                select: function (a) {
                0 > CKEDITOR.tools.indexOf(b, a) &&
                    c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this
                }, focus: function (a) { e = a; return this }, commit: function () {
                    var f = a.focused !== e, g, l; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && x(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (l = g.editor.checkDirty(), g.setSelected(!1), !l && g.editor.resetDirty()); f && e && (l = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !l && a.editor.resetDirty()); for (; g = c.pop();)b.push(g), g.setSelected(!0);
                    a.editor.fire("unlockSnapshot")
                }
            }
        } function da(a) { a && a.addFilterRule(function (a) { return a.replace(/\s*cke_widget_selected/g, "").replace(/\s*cke_widget_focused/g, "").replace(/<span[^>]*cke_widget_drag_handler_container[^>]*.*?<\/span>/gmi, "") }) } function H(a, b, c) { var d = 0; b = I(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function J(a) { a.cancel() } function F(a, b) {
            function c() {
                var b = a.getSelectedHtml(!0);
                if (a.widgets.focused) return a.widgets.focused.getClipboardHtml(); a.once("toDataFormat", function (a) { a.data.widgetsCopy = !0 }, null, null, -1); return a.dataProcessor.toDataFormat(b)
            } var d = a.widgets.focused, e, f, g; u.hasCopyBin(a) || (f = new u(a, { beforeDestroy: function () { !b && d && d.focus(); g && a.getSelection().selectBookmarks(g); e && CKEDITOR.plugins.widgetselection.addFillers(a.editable()) }, afterDestroy: function () { b && !a.readOnly && (d ? a.widgets.del(d) : a.extractSelectedHtml(), a.fire("saveSnapshot")) } }), d || (e = CKEDITOR.env.webkit &&
                CKEDITOR.plugins.widgetselection.isWholeContentSelected(a.editable()), g = a.getSelection().createBookmarks(!0)), f.handle(c()))
        } function I(a) { return (a = (a = a.getDefinition().attributes) && a["class"]) ? a.split(/\s+/) : null } function K() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function L() {
            CKEDITOR.env.gecko && this.editor.unlockSelection(); CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(),
                this.editor.selectionChange(1))
        } function V(a, b) {
            ea(a); fa(a); ga(a); ha(a); ia(a); ja(a); ka(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) { var d = b.data.getTarget(); h.getNestedEditable(a, d) || a.inline && h.isDomDragHandler(d) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new"); a.element.addClass("cke_widget_element"); a.on("key", function (b) {
                b = b.data.keyCode; if (13 == b) a.edit(); else {
                    if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) {
                        F(a.editor, b == CKEDITOR.CTRL + 88);
                        return
                    } if (b in M || CKEDITOR.CTRL & b || CKEDITOR.ALT & b) return
                } return !1
            }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
        } function ea(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function fa(a) { if (a.parts) { var b = {}, c, d; for (d in a.parts) c = a.wrapper.findOne(a.parts[d]), b[d] = c; a.parts = b } } function ga(a) {
            var b = a.editables, c, d; a.editables = {}; if (a.editables) for (c in b) d = b[c], a.initEditable(c, "string" ==
                typeof d ? { selector: d } : d)
        } function ha(a) {
            if (!0 === a.mask) la(a); else if (a.mask) {
                var b = new CKEDITOR.tools.buffers.throttle(250, ma, a), c = CKEDITOR.env.gecko ? 300 : 0, d, e; a.on("focus", function () { b.input(); d = a.editor.on("change", b.input); e = a.on("blur", function () { d.removeListener(); e.removeListener() }) }); a.editor.on("instanceReady", function () { setTimeout(function () { b.input() }, c) }); a.editor.on("mode", function () { setTimeout(function () { b.input() }, c) }); if (CKEDITOR.env.gecko) {
                    var f = a.element.find("img"); CKEDITOR.tools.array.forEach(f.toArray(),
                        function (a) { a.on("load", function () { b.input() }) })
                } for (var g in a.editables) a.editables[g].on("focus", function () { a.editor.on("change", b.input); e && e.removeListener() }), a.editables[g].on("blur", function () { a.editor.removeListener("change", b.input) }); b.input()
            }
        } function la(a) { var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img", a.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_mask" }), a.wrapper.append(b)); a.mask = b } function ma() {
            if (this.wrapper) {
            this.maskPart =
                this.maskPart || this.mask; var a = this.parts[this.maskPart], b; if (a) {
                    b = this.wrapper.findOne(".cke_widget_partial_mask"); b || (b = new CKEDITOR.dom.element("img", this.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_partial_mask" }), this.wrapper.append(b)); this.mask = b; var c = b.$, d = a.$, e = !(c.offsetTop == d.offsetTop && c.offsetLeft == d.offsetLeft); if (c.offsetWidth != d.offsetWidth || c.offsetHeight != d.offsetHeight || e) c = a.getParent(), d = CKEDITOR.plugins.widget.isDomWidget(c),
                        b.setStyles({ top: a.$.offsetTop + (d ? 0 : c.$.offsetTop) + "px", left: a.$.offsetLeft + (d ? 0 : c.$.offsetLeft) + "px", width: a.$.offsetWidth + "px", height: a.$.offsetHeight + "px" })
                }
            }
        } function ia(a) {
            if (a.draggable) {
                var b = a.editor, c = a.wrapper.getLast(h.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({ "class": "cke_reset cke_widget_drag_handler_container", style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png);display:none;" }),
                    d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() }); a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () {
                        a.on("data", a.updateDragHandlerPosition,
                            a)
                    }, 50); if (!a.inline && (d.on("mousedown", na, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
            }
        } function na(a) {
            function b() {
                var b; for (r.reset(); b = h.pop();)b.removeListener(); var c = k; b = a.sender; var d = this.repository.finder, e = this.repository.liner, f = this.editor, g = this.editor.editable(); CKEDITOR.tools.isEmpty(e.visible) || (c = d.getRange(c[0]), this.focus(), f.fire("drop", { dropRange: c, target: c.startContainer })); g.removeClass("cke_widget_dragging");
                e.hideVisible(); f.fire("dragend", { target: b })
            } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], n, m; this.repository._.draggedWidget = this; var w = c.greedySearch(), r = CKEDITOR.tools.eventsBuffer(50, function () { n = d.locate(w); k = d.sort(m, 1); k.length && (e.prepare(w, n), e.placeLine(k[0]), e.cleanup()) }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) {
                    m = a.data.$.clientY;
                    r.input()
                })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
            }
        } function ja(a) { var b = null; a.on("data", function () { var a = this.data.classes, d; if (b != a) { for (d in b) a && a[d] || this.removeClass(d); for (d in a) this.addClass(d); b = a } }) } function ka(a) {
            a.on("data", function () {
                if (a.wrapper) {
                    var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role",
                        "region"); a.wrapper.setAttribute("aria-label", b)
                }
            }, null, null, 9999)
        } function v(a) { a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data))) } function oa() {
            function a() { } function b(a, b, c) { return c && this.checkElement(a) ? (a = c.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } function c(a) {
                function b(a, c, d) { for (var e = a.length, f = 0; f < e;) { if (c.call(d, a[f], f, a)) return a[f]; f++ } } function c(a) {
                    function b(a, c) {
                        var d = CKEDITOR.tools.object.keys(a), e = CKEDITOR.tools.object.keys(c); if (d.length !==
                            e.length) return !1; for (var f in a) if (("object" !== typeof a[f] || "object" !== typeof c[f] || !b(a[f], c[f])) && a[f] !== c[f]) return !1; return !0
                    } return function (c) { return b(a.getDefinition(), c.getDefinition()) }
                } var h = a.widget, k; d[h] || (d[h] = {}); for (var n = 0, m = a.group.length; n < m; n++)k = a.group[n], d[h][k] || (d[h][k] = []), k = d[h][k], b(k, c(a)) || k.push(a)
            } var d = {}; CKEDITOR.style.addCustomHandler({
                type: "widget", setup: function (a) { this.widget = a.widget; (this.group = "string" == typeof a.group ? [a.group] : a.group) && c(this) }, apply: function (a) {
                    var b;
                    a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this))
                }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                    var b = !1, c, h; if (!(a instanceof CKEDITOR.editor)) return !1; h = a.elementPath(); if (this.checkApplicable(h, a)) for (var k = 0, n = this.group.length; k < n; k++) {
                        c = d[this.widget][this.group[k]];
                        for (var m = 0; m < c.length; m++)c[m] !== this && c[m].checkActive(h, a) && (a.widgets.focused.removeStyle(c[m]), b = !0)
                    } return b
                }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) { return h.isDomWidgetWrapper(a) ? (a = a.getFirst(h.isDomWidgetElement)) && a.data("widget") == this.widget : !1 }, buildPreview: function (a) {
                    return a ||
                        this._.definition.name
                }, toAllowedContentRules: function (a) { if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null }, getClassesArray: function () { var a = this._.definition.attributes && this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null }, applyToRange: a,
                removeFromRange: a, applyToObject: a
            })
        } CKEDITOR.plugins.add("widget", {
            requires: "lineutils,clipboard,widgetselection", onLoad: function () {
            void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_widget_partial_mask{position:absolute;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
                oa())
            }, beforeInit: function (a) { void 0 !== CKEDITOR.document.$.querySelectorAll && (a.widgets = new q(a)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); aa(a); da(a.undoManager) } }
        }); q.prototype = {
            MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, b) {
                var c = this.editor; b = CKEDITOR.tools.prototypedCopy(b); b.name =
                    a; b._ = b._ || {}; c.fire("widgetDefinition", b); b.template && (b.template = new CKEDITOR.template(b.template)); W(c, b); X(this, b); this.registered[a] = b; if (b.dialog && c.plugins.dialog) var d = CKEDITOR.on("dialogDefinition", function (a) { a = a.data.definition; var f = a.dialog; a.getMode || f.getName() !== b.dialog || (a.getMode = function () { var a = f.getModel(c); return a && a instanceof CKEDITOR.plugins.widget && a.ready ? CKEDITOR.dialog.EDITING_MODE : CKEDITOR.dialog.CREATION_MODE }); d.removeListener() }); return b
            }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) },
            checkSelection: function () { var a = this.editor.getSelection(), b = a.getSelectedElement(), c = G(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = h.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b)); c.commit() }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) {
                if (this.focused === a) {
                    var b = a.editor, c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper,
                        !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c])
                } a.wrapper.remove(); this.destroy(a, !0)
            }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && p(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a, b) {
                var c, d, e = this.instances; if (b && !a) { d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f), !0)) && this.destroy(c) } else for (d in e) c = e[d], this.destroy(c,
                    a)
            }, finalizeCreation: function (a) { (a = a.getFirst()) && h.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () { function a(a) { return a.is(b) && a.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, d) { if (!b) return null; var e = a(b); if (!d && !e) { var f = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(f) && !(e = a(b))) } return this.instances[e] || null } }(), initOn: function (a, b, c) {
                b ? "string" == typeof b && (b = this.registered[b]) :
                    b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new h(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null
            }, initOnAll: function (a) { a = (a || this.editor.editable()).find(".cke_widget_new"); for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(h.isDomWidgetElement))) && b.push(c); return b }, onWidget: function (a) {
                var b = Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) {
                    var d =
                        this.instances[c]; d.name == a && d.on.apply(d, b)
                } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) })
            }, parseElementClasses: function (a) { if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ? c : null }, wrapElement: function (a, b) {
                var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                    b = b || a.data("widget"); d = this.registered[b]; if (!d) return null; if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c;
                    a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = E(d, a.getName())) && y(a); c = new CKEDITOR.dom.element(e ? "span" : "div", a.getDocument()); c.setAttributes(C(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName()); a.getParent(!0) && c.replace(a); a.appendTo(c)
                } else if (a instanceof CKEDITOR.htmlParser.element) {
                    b = b || a.attributes["data-widget"]; d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT &&
                        c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = E(d, a.name)) && y(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", C(e, b)); c.attributes["data-cke-display-name"] = d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && D(d, f, c)
                } return c
            }, _tests_createEditableFilter: B
        }; CKEDITOR.event.implementOn(q.prototype); h.prototype =
        {
            addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(h.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { H(this, a, 1) }, checkStyleActive: function (a) { a = I(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b, a); a || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data",
                    "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
            }, destroyEditable: function (a, b) {
                var c = this.editables[a], d = !0; c.removeListener("focus", L); c.removeListener("blur", K); this.editor.focusManager.remove(c); if (c.filter) {
                    for (var e in this.repository.instances) { var f = this.repository.instances[e]; f.editables && (f = f.editables[a]) && f !== c && c.filter === f.filter && (d = !1) } d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) &&
                        delete d[a])
                } b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
            }, edit: function () {
                var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                    var d, e; !1 !== b.fire("dialog", a) && (d = a.on("show", function () { a.setupContent(b) }), e = a.on("ok", function () {
                        var d, e = b.on("data",
                            function (a) { d = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b); e.removeListener(); d && (b.fire("data", b.data), b.editor.fire("saveSnapshot"))
                    }), a.once("hide", function () { d.removeListener(); e.removeListener() }))
                }, b); return !0
            }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, getClipboardHtml: function () { var a = this.editor.createRange(); a.setStartBefore(this.wrapper); a.setEndAfter(this.wrapper); return this.editor.editable().getHtmlFromRange(a).getHtml() },
            hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                var c = this._findOneNotNested(b.selector); return c && c.is(CKEDITOR.dtd.$editable) ? (c = new t(this.editor, c, { filter: B.call(this.repository, this.name, a, b) }), this.editables[a] = c, c.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": c.enterMode }), c.filter && c.data("cke-filter", c.filter.id), c.addClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), b.pathName && c.data("cke-display-name",
                    b.pathName), this.editor.focusManager.add(c), c.on("focus", L, this), CKEDITOR.env.ie && c.on("blur", K, this), c._.initialSetData = !0, c.setData(c.getHtml()), !0) : !1
            }, _findOneNotNested: function (a) { a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b = a.getItem(d), c = b.getAscendant(h.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null }, isInited: function () { return !(!this.wrapper || !this.inited) }, isReady: function () { return this.isInited() && this.ready }, focus: function () {
                var a = this.editor.getSelection();
                if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus()
            }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(h.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) { H(this, a, 0) }, setData: function (a, b) { var c = this.data, d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (v(this), this.fire("data", c)); return this }, setFocused: function (a) {
            this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused");
                this.fire(a ? "focus" : "blur"); return this
            }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                var a = this.editor, b = this.element.$, c = this._.dragHandlerOffset, b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px" }), this.dragHandlerContainer.removeStyle("display"), a.fire("unlockSnapshot"),
                    !c && a.resetDirty(), this._.dragHandlerOffset = b)
            }
        }; CKEDITOR.event.implementOn(h.prototype); h.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : h.isDomNestedEditable(b) ? b : h.getNestedEditable(a, b.getParent()) }; h.isDomDragHandler = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler") }; h.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; h.isDomNestedEditable = function (a) {
            return a.type ==
                CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable")
        }; h.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; h.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") }; h.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; h.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; h.isParserWidgetWrapper =
            function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; h.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; t.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
                setData: function (a) { this._.initialSetData || this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this) },
                getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
            }); var ca = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i, M = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; M[CKEDITOR.SHIFT + 121] =
                1; var u = CKEDITOR.tools.createClass({
                    $: function (a, b) { this._.createCopyBin(a, b); this._.createListeners(b) }, _: {
                        createCopyBin: function (a) {
                            var b = a.document, c = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version, d = !a.blockless && !CKEDITOR.env.ie || c ? "div" : "span", c = b.createElement(d), b = b.createElement(d); b.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); c.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); c.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"); this.editor =
                                a; this.copyBin = c; this.container = b
                        }, createListeners: function (a) { a && (a.beforeDestroy && (this.beforeDestroy = a.beforeDestroy), a.afterDestroy && (this.afterDestroy = a.afterDestroy)) }
                    }, proto: {
                        handle: function (a) {
                            var b = this.copyBin, c = this.editor, d = this.container, e = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, f = c.document.getDocumentElement().$, g = c.createRange(), h = this, k = CKEDITOR.env.mac && CKEDITOR.env.webkit, n = k ? 100 : 0, m = window.requestAnimationFrame && !k ? requestAnimationFrame : setTimeout, p, r, q; b.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' +
                                a + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e'); c.fire("lockSnapshot"); d.append(b); c.editable().append(d); p = c.on("selectionChange", J, null, null, 0); r = c.widgets.on("checkSelection", J, null, null, 0); e && (q = f.scrollTop); g.selectNodeContents(b); g.select(); e && (f.scrollTop = q); return new CKEDITOR.tools.promise(function (a) { m(function () { h.beforeDestroy && h.beforeDestroy(); d.remove(); p.removeListener(); r.removeListener(); c.fire("unlockSnapshot"); h.afterDestroy && h.afterDestroy(); a() }, n) })
                        }
                    }, statics: {
                        hasCopyBin: function (a) { return !!u.getCopyBin(a) },
                        getCopyBin: function (a) { return a.document.getById("cke_copybin") }
                    }
                }); CKEDITOR.plugins.widget = h; h.repository = q; h.nestedEditable = t
    })(); (function () {
        function e(a, b, c) { this.editor = a; this.notification = null; this._message = new CKEDITOR.template(b); this._singularMessage = c ? new CKEDITOR.template(c) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0 } function d(a) { this._weight = a || 1; this._doneWeight = 0; this._isCanceled = !1 } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); e.prototype = {
            createTask: function (a) {
                a = a || {}; var b = !this.notification, c; b && (this.notification = this._createNotification()); c = this._addTask(a);
                c.on("updated", this._onTaskUpdate, this); c.on("done", this._onTaskDone, this); c.on("canceled", function () { this._removeTask(c) }, this); this.update(); b && this.notification.show(); return c
            }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") }, getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() }, getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks },
            _updateNotification: function () { this.notification.update({ message: this._getNotificationMessage(), progress: this.getPercentage() }) }, _getNotificationMessage: function () { var a = this.getTaskCount(), b = { current: this.getDoneTaskCount(), max: a, percentage: Math.round(100 * this.getPercentage()) }; return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(b) }, _createNotification: function () { return new CKEDITOR.plugins.notification(this.editor, { type: "progress" }) }, _addTask: function (a) {
                a = new d(a.weight);
                this._tasks.push(a); this._totalWeights += a._weight; return a
            }, _removeTask: function (a) { var b = CKEDITOR.tools.indexOf(this._tasks, a); -1 !== b && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(b, 1), this.update()) }, _onTaskUpdate: function (a) { this._doneWeights += a.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
        }; CKEDITOR.event.implementOn(e.prototype); d.prototype = {
            done: function () { this.update(this._weight) }, update: function (a) {
                if (!this.isDone() &&
                    !this.isCanceled()) { a = Math.min(this._weight, a); var b = a - this._doneWeight; this._doneWeight = a; this.fire("updated", b); this.isDone() && this.fire("done") }
            }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) }, isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
        }; CKEDITOR.event.implementOn(d.prototype); CKEDITOR.plugins.notificationAggregator = e; CKEDITOR.plugins.notificationAggregator.task = d
    })(); (function () {
        CKEDITOR.plugins.add("uploadwidget", { requires: "widget,clipboard,filetools,notificationaggregator", init: function (a) { a.filter.allow("*[!data-widget,!data-cke-upload-id]") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported } }); CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            addUploadWidget: function (a, c, f) {
                var h = CKEDITOR.fileTools, b = a.uploadRepository, m = f.supportedTypes ? 10 : 20; if (f.fileToElement) a.on("paste", function (d) {
                    d =
                    d.data; var l = a.widgets.registered[c], k = d.dataTransfer, f = k.getFilesCount(), g = l.loadMethod || "loadAndUpload", e, n; if (!d.dataValue && f) for (n = 0; n < f; n++)if (e = k.getFile(n), !l.supportedTypes || h.isTypeSupported(e, l.supportedTypes)) { var m = l.fileToElement(e); e = b.create(e, void 0, l.loaderType); m && (e[g](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(m, c, e.id), "loadAndUpload" != g && "upload" != g || l.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, e), d.dataValue += m.getOuterHtml()) }
                },
                    null, null, m); CKEDITOR.tools.extend(f, {
                        downcast: function () { return new CKEDITOR.htmlParser.text("") }, init: function () {
                            var d = this, c = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"), k = b.loaders[c], f = CKEDITOR.tools.capitalize, g, e; k.on("update", function (b) {
                                if ("abort" === k.status && "function" === typeof d.onAbort) d.onAbort(k); if (d.wrapper && d.wrapper.getParent()) {
                                    a.fire("lockSnapshot"); b = "on" + f(k.status); if ("abort" === k.status || "function" !== typeof d[b] || !1 !== d[b](k)) e = "cke_upload_" + k.status, d.wrapper &&
                                        e != g && (g && d.wrapper.removeClass(g), d.wrapper.addClass(e), g = e), "error" != k.status && "abort" != k.status || a.widgets.del(d); a.fire("unlockSnapshot")
                                } else CKEDITOR.instances[a.name] && a.editable().find('[data-cke-upload-id\x3d"' + c + '"]').count() || k.abort(), b.removeListener()
                            }); k.update()
                        }, replaceWith: function (d, c) {
                            if ("" === d.trim()) a.widgets.del(this); else {
                                var b = this == a.widgets.focused, f = a.editable(), g = a.createRange(), e, h; b || (h = a.getSelection().createBookmarks()); g.setStartBefore(this.wrapper); g.setEndAfter(this.wrapper);
                                b && (e = g.createBookmark()); f.insertHtmlIntoRange(d, g, c); a.widgets.checkWidgets({ initOnlyNew: !0 }); a.widgets.destroy(this, !0); b ? (g.moveToBookmark(e), g.select()) : a.getSelection().selectBookmarks(h)
                            }
                        }, _getLoader: function () { var a = this.wrapper.findOne("[data-cke-upload-id]"); return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null }
                    }); a.widgets.add(c, f)
            }, markElement: function (a, c, f) { a.setAttributes({ "data-cke-upload-id": f, "data-widget": c }) }, bindNotifications: function (a, c) {
                function f() {
                    h =
                    a._.uploadWidgetNotificaionAggregator; if (!h || h.isFinished()) h = a._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(a, a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), h.once("finished", function () { var b = h.getTaskCount(); 0 === b ? h.notification.hide() : h.notification.update({ message: 1 == b ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", b), type: "success", important: 1 }) })
                } var h, b = null; c.on("update", function () {
                !b && c.uploadTotal && (f(), b = h.createTask({ weight: c.uploadTotal }));
                    b && "uploading" == c.status && b.update(c.uploaded)
                }); c.on("uploaded", function () { b && b.done() }); c.on("error", function () { b && b.cancel(); a.showNotification(c.message, "warning") }); c.on("abort", function () { b && b.cancel(); CKEDITOR.instances[a.name] && a.showNotification(a.lang.uploadwidget.abort, "info") })
            }
        })
    })(); (function () {
        function l(c) { 9 >= c && (c = "0" + c); return String(c) } function n(c) { var a = new Date, a = [a.getFullYear(), a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()]; e += 1; return "image-" + CKEDITOR.tools.array.map(a, l).join("") + "-" + e + "." + c } var e = 0; CKEDITOR.plugins.add("uploadimage", {
            requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") }, isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }, init: function (c) {
                if (this.isSupportedEnvironment()) {
                    var a =
                        CKEDITOR.fileTools, e = a.getUploadUrl(c.config, "image"); e && (a.addUploadWidget(c, "uploadimage", {
                            supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: e, fileToElement: function () { var b = new CKEDITOR.dom.element("img"); b.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d"); return b }, parts: { img: "img" }, onUploading: function (b) { this.parts.img.setAttribute("src", b.data) }, onUploaded: function (b) {
                                var a = this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' +
                                    b.url + '" width\x3d"' + (b.responseData.width || a.naturalWidth) + '" height\x3d"' + (b.responseData.height || a.naturalHeight) + '"\x3e')
                            }
                        }), c.on("paste", function (b) {
                            if (b.data.dataValue.match(/<img[\s\S]+data:/i)) {
                                b = b.data; var f = document.implementation.createHTMLDocument(""), f = new CKEDITOR.dom.element(f.body), m, g, k; f.data("cke-editable", 1); f.appendHtml(b.dataValue); m = f.find("img"); for (k = 0; k < m.count(); k++) {
                                    g = m.getItem(k); var d = g.getAttribute("src"), h = d && "data:" == d.substring(0, 5), l = null === g.data("cke-realelement");
                                    h && l && !g.data("cke-upload-id") && !g.isReadOnly(1) && (h = (h = d.match(/image\/([a-z]+?);/i)) && h[1] || "jpg", d = c.uploadRepository.create(d, n(h)), d.upload(e), a.markElement(g, "uploadimage", d.id), a.bindNotifications(c, d))
                                } b.dataValue = f.getHtml()
                            }
                        }))
                }
            }
        })
    })(); CKEDITOR.plugins.add("wsc", {
        requires: "dialog", parseApi: function (a) { a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function () { }; a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function () { } }, parseConfig: function (a) {
            a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk"; a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds ||
                CKEDITOR.config.wsc_customDictionaryIds || ""; a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || ""; a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript; a.config.wsc_interfaceLang = a.config.wsc_interfaceLang; CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell"; CKEDITOR.config.wsc_version = "v4.3.0-master-d769233"; CKEDITOR.config.wsc_removeGlobalVariable = !0
        }, onLoad: function (a) {
        "moono-lisa" ==
            (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css"))
        }, init: function (a) {
            var b = CKEDITOR.env; this.parseConfig(a); this.parseApi(a); a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(b.ie && (8 > b.version || b.quirks)) }; "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
                label: a.lang.wsc.toolbar,
                click: function (a) { var b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (b = b.replace(/\s/g, "")) ? a.execCommand("checkspell") : alert("Nothing to check!") }, toolbar: "spellchecker,10"
            }); CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    }); CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,wysiwygarea,image,indent,indentlist,fakeobjects,link,list,magicline,maximize,pastetext,pastetools,pastefromgdocs,pastefromword,removeformat,showborders,sourcearea,specialchar,menubutton,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc'; CKEDITOR.config.skin = 'moono-lisa'; (function () { var setIcons = function (icons, strip) { var path = CKEDITOR.getUrl('plugins/' + strip); icons = icons.split(','); for (var i = 0; i < icons.length; i++)CKEDITOR.skin.icons[icons[i]] = { path: path, offset: -icons[++i], bgsize: icons[++i] }; }; if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,blockquote,168,,copy-rtl,192,,copy,216,,cut-rtl,240,,cut,264,,paste-rtl,288,,paste,312,,horizontalrule,336,,image,360,,indent-rtl,384,,indent,408,,outdent-rtl,432,,outdent,456,,anchor-rtl,480,,anchor,504,,link,528,,unlink,552,,bulletedlist-rtl,576,,bulletedlist,600,,numberedlist-rtl,624,,numberedlist,648,,maximize,672,,pastetext-rtl,696,,pastetext,720,,pastefromword-rtl,744,,pastefromword,768,,removeformat,792,,source-rtl,816,,source,840,,specialchar,864,,scayt,888,,table,912,,redo-rtl,936,,redo,960,,undo-rtl,984,,undo,1008,,spellchecker,1032,', 'icons_hidpi.png'); else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,blockquote,168,auto,copy-rtl,192,auto,copy,216,auto,cut-rtl,240,auto,cut,264,auto,paste-rtl,288,auto,paste,312,auto,horizontalrule,336,auto,image,360,auto,indent-rtl,384,auto,indent,408,auto,outdent-rtl,432,auto,outdent,456,auto,anchor-rtl,480,auto,anchor,504,auto,link,528,auto,unlink,552,auto,bulletedlist-rtl,576,auto,bulletedlist,600,auto,numberedlist-rtl,624,auto,numberedlist,648,auto,maximize,672,auto,pastetext-rtl,696,auto,pastetext,720,auto,pastefromword-rtl,744,auto,pastefromword,768,auto,removeformat,792,auto,source-rtl,816,auto,source,840,auto,specialchar,864,auto,scayt,888,auto,table,912,auto,redo-rtl,936,auto,redo,960,auto,undo-rtl,984,auto,undo,1008,auto,spellchecker,1032,auto', 'icons.png'); })(); CKEDITOR.lang.languages = { "af": 1, "sq": 1, "ar": 1, "az": 1, "eu": 1, "bn": 1, "bs": 1, "bg": 1, "ca": 1, "zh-cn": 1, "zh": 1, "hr": 1, "cs": 1, "da": 1, "nl": 1, "en": 1, "en-au": 1, "en-ca": 1, "en-gb": 1, "eo": 1, "et": 1, "fo": 1, "fi": 1, "fr": 1, "fr-ca": 1, "gl": 1, "ka": 1, "de": 1, "de-ch": 1, "el": 1, "gu": 1, "he": 1, "hi": 1, "hu": 1, "is": 1, "id": 1, "it": 1, "ja": 1, "km": 1, "ko": 1, "ku": 1, "lv": 1, "lt": 1, "mk": 1, "ms": 1, "mn": 1, "no": 1, "nb": 1, "oc": 1, "fa": 1, "pl": 1, "pt-br": 1, "pt": 1, "ro": 1, "ru": 1, "sr": 1, "sr-latn": 1, "si": 1, "sk": 1, "sl": 1, "es": 1, "es-mx": 1, "sv": 1, "tt": 1, "th": 1, "tr": 1, "ug": 1, "uk": 1, "vi": 1, "cy": 1 };
}());