"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l2 = Symbol.for("react.element");
      var n2 = Symbol.for("react.portal");
      var p2 = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r2 = Symbol.for("react.profiler");
      var t2 = Symbol.for("react.provider");
      var u2 = Symbol.for("react.context");
      var v2 = Symbol.for("react.forward_ref");
      var w2 = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y2 = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a2) {
        if (null === a2 || "object" !== typeof a2)
          return null;
        a2 = z && a2[z] || a2["@@iterator"];
        return "function" === typeof a2 ? a2 : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E2(a2, b2, e2) {
        this.props = a2;
        this.context = b2;
        this.refs = D;
        this.updater = e2 || B;
      }
      E2.prototype.isReactComponent = {};
      E2.prototype.setState = function(a2, b2) {
        if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2)
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a2, b2, "setState");
      };
      E2.prototype.forceUpdate = function(a2) {
        this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
      };
      function F2() {
      }
      F2.prototype = E2.prototype;
      function G(a2, b2, e2) {
        this.props = a2;
        this.context = b2;
        this.refs = D;
        this.updater = e2 || B;
      }
      var H = G.prototype = new F2();
      H.constructor = G;
      C(H, E2.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L2 = { key: true, ref: true, __self: true, __source: true };
      function M(a2, b2, e2) {
        var d2, c2 = {}, k = null, h2 = null;
        if (null != b2)
          for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k = "" + b2.key), b2)
            J.call(b2, d2) && !L2.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
        var g2 = arguments.length - 2;
        if (1 === g2)
          c2.children = e2;
        else if (1 < g2) {
          for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
            f2[m2] = arguments[m2 + 2];
          c2.children = f2;
        }
        if (a2 && a2.defaultProps)
          for (d2 in g2 = a2.defaultProps, g2)
            void 0 === c2[d2] && (c2[d2] = g2[d2]);
        return { $$typeof: l2, type: a2, key: k, ref: h2, props: c2, _owner: K.current };
      }
      function N(a2, b2) {
        return { $$typeof: l2, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
      }
      function O(a2) {
        return "object" === typeof a2 && null !== a2 && a2.$$typeof === l2;
      }
      function escape(a2) {
        var b2 = { "=": "=0", ":": "=2" };
        return "$" + a2.replace(/[=:]/g, function(a3) {
          return b2[a3];
        });
      }
      var P2 = /\/+/g;
      function Q(a2, b2) {
        return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
      }
      function R(a2, b2, e2, d2, c2) {
        var k = typeof a2;
        if ("undefined" === k || "boolean" === k)
          a2 = null;
        var h2 = false;
        if (null === a2)
          h2 = true;
        else
          switch (k) {
            case "string":
            case "number":
              h2 = true;
              break;
            case "object":
              switch (a2.$$typeof) {
                case l2:
                case n2:
                  h2 = true;
              }
          }
        if (h2)
          return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q(h2, 0) : d2, I(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P2, "$&/") + "/"), R(c2, b2, e2, "", function(a3) {
            return a3;
          })) : null != c2 && (O(c2) && (c2 = N(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P2, "$&/") + "/") + a2)), b2.push(c2)), 1;
        h2 = 0;
        d2 = "" === d2 ? "." : d2 + ":";
        if (I(a2))
          for (var g2 = 0; g2 < a2.length; g2++) {
            k = a2[g2];
            var f2 = d2 + Q(k, g2);
            h2 += R(k, b2, e2, f2, c2);
          }
        else if (f2 = A(a2), "function" === typeof f2)
          for (a2 = f2.call(a2), g2 = 0; !(k = a2.next()).done; )
            k = k.value, f2 = d2 + Q(k, g2++), h2 += R(k, b2, e2, f2, c2);
        else if ("object" === k)
          throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
        return h2;
      }
      function S2(a2, b2, e2) {
        if (null == a2)
          return a2;
        var d2 = [], c2 = 0;
        R(a2, d2, "", "", function(a3) {
          return b2.call(e2, a3, c2++);
        });
        return d2;
      }
      function T2(a2) {
        if (-1 === a2._status) {
          var b2 = a2._result;
          b2 = b2();
          b2.then(function(b3) {
            if (0 === a2._status || -1 === a2._status)
              a2._status = 1, a2._result = b3;
          }, function(b3) {
            if (0 === a2._status || -1 === a2._status)
              a2._status = 2, a2._result = b3;
          });
          -1 === a2._status && (a2._status = 0, a2._result = b2);
        }
        if (1 === a2._status)
          return a2._result.default;
        throw a2._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      exports.Children = { map: S2, forEach: function(a2, b2, e2) {
        S2(a2, function() {
          b2.apply(this, arguments);
        }, e2);
      }, count: function(a2) {
        var b2 = 0;
        S2(a2, function() {
          b2++;
        });
        return b2;
      }, toArray: function(a2) {
        return S2(a2, function(a3) {
          return a3;
        }) || [];
      }, only: function(a2) {
        if (!O(a2))
          throw Error("React.Children.only expected to receive a single React element child.");
        return a2;
      } };
      exports.Component = E2;
      exports.Fragment = p2;
      exports.Profiler = r2;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w2;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.cloneElement = function(a2, b2, e2) {
        if (null === a2 || void 0 === a2)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
        var d2 = C({}, a2.props), c2 = a2.key, k = a2.ref, h2 = a2._owner;
        if (null != b2) {
          void 0 !== b2.ref && (k = b2.ref, h2 = K.current);
          void 0 !== b2.key && (c2 = "" + b2.key);
          if (a2.type && a2.type.defaultProps)
            var g2 = a2.type.defaultProps;
          for (f2 in b2)
            J.call(b2, f2) && !L2.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
        }
        var f2 = arguments.length - 2;
        if (1 === f2)
          d2.children = e2;
        else if (1 < f2) {
          g2 = Array(f2);
          for (var m2 = 0; m2 < f2; m2++)
            g2[m2] = arguments[m2 + 2];
          d2.children = g2;
        }
        return { $$typeof: l2, type: a2.type, key: c2, ref: k, props: d2, _owner: h2 };
      };
      exports.createContext = function(a2) {
        a2 = { $$typeof: u2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a2.Provider = { $$typeof: t2, _context: a2 };
        return a2.Consumer = a2;
      };
      exports.createElement = M;
      exports.createFactory = function(a2) {
        var b2 = M.bind(null, a2);
        b2.type = a2;
        return b2;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a2) {
        return { $$typeof: v2, render: a2 };
      };
      exports.isValidElement = O;
      exports.lazy = function(a2) {
        return { $$typeof: y2, _payload: { _status: -1, _result: a2 }, _init: T2 };
      };
      exports.memo = function(a2, b2) {
        return { $$typeof: x, type: a2, compare: void 0 === b2 ? null : b2 };
      };
      exports.startTransition = function(a2) {
        var b2 = V.transition;
        V.transition = {};
        try {
          a2();
        } finally {
          V.transition = b2;
        }
      };
      exports.unstable_act = function() {
        throw Error("act(...) is not supported in production builds of React.");
      };
      exports.useCallback = function(a2, b2) {
        return U.current.useCallback(a2, b2);
      };
      exports.useContext = function(a2) {
        return U.current.useContext(a2);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a2) {
        return U.current.useDeferredValue(a2);
      };
      exports.useEffect = function(a2, b2) {
        return U.current.useEffect(a2, b2);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a2, b2, e2) {
        return U.current.useImperativeHandle(a2, b2, e2);
      };
      exports.useInsertionEffect = function(a2, b2) {
        return U.current.useInsertionEffect(a2, b2);
      };
      exports.useLayoutEffect = function(a2, b2) {
        return U.current.useLayoutEffect(a2, b2);
      };
      exports.useMemo = function(a2, b2) {
        return U.current.useMemo(a2, b2);
      };
      exports.useReducer = function(a2, b2, e2) {
        return U.current.useReducer(a2, b2, e2);
      };
      exports.useRef = function(a2) {
        return U.current.useRef(a2);
      };
      exports.useState = function(a2) {
        return U.current.useState(a2);
      };
      exports.useSyncExternalStore = function(a2, b2, e2) {
        return U.current.useSyncExternalStore(a2, b2, e2);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.1.0";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f2(a2, b2) {
        var c2 = a2.length;
        a2.push(b2);
        a:
          for (; 0 < c2; ) {
            var d2 = c2 - 1 >>> 1, e2 = a2[d2];
            if (0 < g2(e2, b2))
              a2[d2] = b2, a2[c2] = e2, c2 = d2;
            else
              break a;
          }
      }
      function h2(a2) {
        return 0 === a2.length ? null : a2[0];
      }
      function k(a2) {
        if (0 === a2.length)
          return null;
        var b2 = a2[0], c2 = a2.pop();
        if (c2 !== b2) {
          a2[0] = c2;
          a:
            for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
              var m2 = 2 * (d2 + 1) - 1, C = a2[m2], n2 = m2 + 1, x = a2[n2];
              if (0 > g2(C, c2))
                n2 < e2 && 0 > g2(x, C) ? (a2[d2] = x, a2[n2] = c2, d2 = n2) : (a2[d2] = C, a2[m2] = c2, d2 = m2);
              else if (n2 < e2 && 0 > g2(x, c2))
                a2[d2] = x, a2[n2] = c2, d2 = n2;
              else
                break a;
            }
        }
        return b2;
      }
      function g2(a2, b2) {
        var c2 = a2.sortIndex - b2.sortIndex;
        return 0 !== c2 ? c2 : a2.id - b2.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l2 = performance;
        exports.unstable_now = function() {
          return l2.now();
        };
      } else {
        p2 = Date, q = p2.now();
        exports.unstable_now = function() {
          return p2.now() - q;
        };
      }
      var l2;
      var p2;
      var q;
      var r2 = [];
      var t2 = [];
      var u2 = 1;
      var v2 = null;
      var y2 = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E2 = "function" === typeof clearTimeout ? clearTimeout : null;
      var F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a2) {
        for (var b2 = h2(t2); null !== b2; ) {
          if (null === b2.callback)
            k(t2);
          else if (b2.startTime <= a2)
            k(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
          else
            break;
          b2 = h2(t2);
        }
      }
      function H(a2) {
        B = false;
        G(a2);
        if (!A)
          if (null !== h2(r2))
            A = true, I(J);
          else {
            var b2 = h2(t2);
            null !== b2 && K(H, b2.startTime - a2);
          }
      }
      function J(a2, b2) {
        A = false;
        B && (B = false, E2(L2), L2 = -1);
        z = true;
        var c2 = y2;
        try {
          G(b2);
          for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M()); ) {
            var d2 = v2.callback;
            if ("function" === typeof d2) {
              v2.callback = null;
              y2 = v2.priorityLevel;
              var e2 = d2(v2.expirationTime <= b2);
              b2 = exports.unstable_now();
              "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k(r2);
              G(b2);
            } else
              k(r2);
            v2 = h2(r2);
          }
          if (null !== v2)
            var w2 = true;
          else {
            var m2 = h2(t2);
            null !== m2 && K(H, m2.startTime - b2);
            w2 = false;
          }
          return w2;
        } finally {
          v2 = null, y2 = c2, z = false;
        }
      }
      var N = false;
      var O = null;
      var L2 = -1;
      var P2 = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P2 ? false : true;
      }
      function R() {
        if (null !== O) {
          var a2 = exports.unstable_now();
          Q = a2;
          var b2 = true;
          try {
            b2 = O(true, a2);
          } finally {
            b2 ? S2() : (N = false, O = null);
          }
        } else
          N = false;
      }
      var S2;
      if ("function" === typeof F2)
        S2 = function() {
          F2(R);
        };
      else if ("undefined" !== typeof MessageChannel) {
        T2 = new MessageChannel(), U = T2.port2;
        T2.port1.onmessage = R;
        S2 = function() {
          U.postMessage(null);
        };
      } else
        S2 = function() {
          D(R, 0);
        };
      var T2;
      var U;
      function I(a2) {
        O = a2;
        N || (N = true, S2());
      }
      function K(a2, b2) {
        L2 = D(function() {
          a2(exports.unstable_now());
        }, b2);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a2) {
        a2.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a2) {
        0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y2;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h2(r2);
      };
      exports.unstable_next = function(a2) {
        switch (y2) {
          case 1:
          case 2:
          case 3:
            var b2 = 3;
            break;
          default:
            b2 = y2;
        }
        var c2 = y2;
        y2 = b2;
        try {
          return a2();
        } finally {
          y2 = c2;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a2, b2) {
        switch (a2) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a2 = 3;
        }
        var c2 = y2;
        y2 = a2;
        try {
          return b2();
        } finally {
          y2 = c2;
        }
      };
      exports.unstable_scheduleCallback = function(a2, b2, c2) {
        var d2 = exports.unstable_now();
        "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
        switch (a2) {
          case 1:
            var e2 = -1;
            break;
          case 2:
            e2 = 250;
            break;
          case 5:
            e2 = 1073741823;
            break;
          case 4:
            e2 = 1e4;
            break;
          default:
            e2 = 5e3;
        }
        e2 = c2 + e2;
        a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
        c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B ? (E2(L2), L2 = -1) : B = true, K(H, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A || z || (A = true, I(J)));
        return a2;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a2) {
        var b2 = y2;
        return function() {
          var c2 = y2;
          y2 = b2;
          try {
            return a2.apply(this, arguments);
          } finally {
            y2 = c2;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ba = require_scheduler();
      function p2(a2) {
        for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
          b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
        return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a2, b2) {
        ha(a2, b2);
        ha(a2 + "Capture", b2);
      }
      function ha(a2, b2) {
        ea[a2] = b2;
        for (a2 = 0; a2 < b2.length; a2++)
          da.add(b2[a2]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function na(a2) {
        if (ja.call(ma, a2))
          return true;
        if (ja.call(la, a2))
          return false;
        if (ka.test(a2))
          return ma[a2] = true;
        la[a2] = true;
        return false;
      }
      function oa(a2, b2, c2, d2) {
        if (null !== c2 && 0 === c2.type)
          return false;
        switch (typeof b2) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d2)
              return false;
            if (null !== c2)
              return !c2.acceptsBooleans;
            a2 = a2.toLowerCase().slice(0, 5);
            return "data-" !== a2 && "aria-" !== a2;
          default:
            return false;
        }
      }
      function pa(a2, b2, c2, d2) {
        if (null === b2 || "undefined" === typeof b2 || oa(a2, b2, c2, d2))
          return true;
        if (d2)
          return false;
        if (null !== c2)
          switch (c2.type) {
            case 3:
              return !b2;
            case 4:
              return false === b2;
            case 5:
              return isNaN(b2);
            case 6:
              return isNaN(b2) || 1 > b2;
          }
        return false;
      }
      function t2(a2, b2, c2, d2, e2, f2, g2) {
        this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
        this.attributeName = d2;
        this.attributeNamespace = e2;
        this.mustUseProperty = c2;
        this.propertyName = a2;
        this.type = b2;
        this.sanitizeURL = f2;
        this.removeEmptyString = g2;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
        z[a2] = new t2(a2, 0, false, a2, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
        var b2 = a2[0];
        z[b2] = new t2(b2, 1, false, a2[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
        z[a2] = new t2(a2, 2, false, a2.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
        z[a2] = new t2(a2, 2, false, a2, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
        z[a2] = new t2(a2, 3, false, a2.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
        z[a2] = new t2(a2, 3, true, a2, null, false, false);
      });
      ["capture", "download"].forEach(function(a2) {
        z[a2] = new t2(a2, 4, false, a2, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a2) {
        z[a2] = new t2(a2, 6, false, a2, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a2) {
        z[a2] = new t2(a2, 5, false, a2.toLowerCase(), null, false, false);
      });
      var qa = /[\-:]([a-z])/g;
      function ra(a2) {
        return a2[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
        var b2 = a2.replace(
          qa,
          ra
        );
        z[b2] = new t2(b2, 1, false, a2, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
        var b2 = a2.replace(qa, ra);
        z[b2] = new t2(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
        var b2 = a2.replace(qa, ra);
        z[b2] = new t2(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a2) {
        z[a2] = new t2(a2, 1, false, a2.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new t2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a2) {
        z[a2] = new t2(a2, 1, false, a2.toLowerCase(), null, true, true);
      });
      function sa(a2, b2, c2, d2) {
        var e2 = z.hasOwnProperty(b2) ? z[b2] : null;
        if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
          pa(b2, c2, e2, d2) && (c2 = null), d2 || null === e2 ? na(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
      }
      var ta = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var ua = Symbol.for("react.element");
      var va = Symbol.for("react.portal");
      var wa = Symbol.for("react.fragment");
      var xa = Symbol.for("react.strict_mode");
      var za = Symbol.for("react.profiler");
      var Aa = Symbol.for("react.provider");
      var Ba = Symbol.for("react.context");
      var Ca = Symbol.for("react.forward_ref");
      var Da = Symbol.for("react.suspense");
      var Ea = Symbol.for("react.suspense_list");
      var Fa = Symbol.for("react.memo");
      var Ga = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ha = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ia = Symbol.iterator;
      function Ja(a2) {
        if (null === a2 || "object" !== typeof a2)
          return null;
        a2 = Ia && a2[Ia] || a2["@@iterator"];
        return "function" === typeof a2 ? a2 : null;
      }
      var A = Object.assign;
      var Ka;
      function La(a2) {
        if (void 0 === Ka)
          try {
            throw Error();
          } catch (c2) {
            var b2 = c2.stack.trim().match(/\n( *(at )?)/);
            Ka = b2 && b2[1] || "";
          }
        return "\n" + Ka + a2;
      }
      var Ma = false;
      function Na(a2, b2) {
        if (!a2 || Ma)
          return "";
        Ma = true;
        var c2 = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b2)
            if (b2 = function() {
              throw Error();
            }, Object.defineProperty(b2.prototype, "props", { set: function() {
              throw Error();
            } }), "object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(b2, []);
              } catch (l2) {
                var d2 = l2;
              }
              Reflect.construct(a2, [], b2);
            } else {
              try {
                b2.call();
              } catch (l2) {
                d2 = l2;
              }
              a2.call(b2.prototype);
            }
          else {
            try {
              throw Error();
            } catch (l2) {
              d2 = l2;
            }
            a2();
          }
        } catch (l2) {
          if (l2 && d2 && "string" === typeof l2.stack) {
            for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; )
              h2--;
            for (; 1 <= g2 && 0 <= h2; g2--, h2--)
              if (e2[g2] !== f2[h2]) {
                if (1 !== g2 || 1 !== h2) {
                  do
                    if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
                      var k = "\n" + e2[g2].replace(" at new ", " at ");
                      a2.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a2.displayName));
                      return k;
                    }
                  while (1 <= g2 && 0 <= h2);
                }
                break;
              }
          }
        } finally {
          Ma = false, Error.prepareStackTrace = c2;
        }
        return (a2 = a2 ? a2.displayName || a2.name : "") ? La(a2) : "";
      }
      function Oa(a2) {
        switch (a2.tag) {
          case 5:
            return La(a2.type);
          case 16:
            return La("Lazy");
          case 13:
            return La("Suspense");
          case 19:
            return La("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a2 = Na(a2.type, false), a2;
          case 11:
            return a2 = Na(a2.type.render, false), a2;
          case 1:
            return a2 = Na(a2.type, true), a2;
          default:
            return "";
        }
      }
      function Pa(a2) {
        if (null == a2)
          return null;
        if ("function" === typeof a2)
          return a2.displayName || a2.name || null;
        if ("string" === typeof a2)
          return a2;
        switch (a2) {
          case wa:
            return "Fragment";
          case va:
            return "Portal";
          case za:
            return "Profiler";
          case xa:
            return "StrictMode";
          case Da:
            return "Suspense";
          case Ea:
            return "SuspenseList";
        }
        if ("object" === typeof a2)
          switch (a2.$$typeof) {
            case Ba:
              return (a2.displayName || "Context") + ".Consumer";
            case Aa:
              return (a2._context.displayName || "Context") + ".Provider";
            case Ca:
              var b2 = a2.render;
              a2 = a2.displayName;
              a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
              return a2;
            case Fa:
              return b2 = a2.displayName || null, null !== b2 ? b2 : Pa(a2.type) || "Memo";
            case Ga:
              b2 = a2._payload;
              a2 = a2._init;
              try {
                return Pa(a2(b2));
              } catch (c2) {
              }
          }
        return null;
      }
      function Qa(a2) {
        var b2 = a2.type;
        switch (a2.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b2.displayName || "Context") + ".Consumer";
          case 10:
            return (b2._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b2;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Pa(b2);
          case 8:
            return b2 === xa ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b2)
              return b2.displayName || b2.name || null;
            if ("string" === typeof b2)
              return b2;
        }
        return null;
      }
      function Ra(a2) {
        switch (typeof a2) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a2;
          case "object":
            return a2;
          default:
            return "";
        }
      }
      function Sa(a2) {
        var b2 = a2.type;
        return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
      }
      function Ta(a2) {
        var b2 = Sa(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
        if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
          var e2 = c2.get, f2 = c2.set;
          Object.defineProperty(a2, b2, { configurable: true, get: function() {
            return e2.call(this);
          }, set: function(a3) {
            d2 = "" + a3;
            f2.call(this, a3);
          } });
          Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
          return { getValue: function() {
            return d2;
          }, setValue: function(a3) {
            d2 = "" + a3;
          }, stopTracking: function() {
            a2._valueTracker = null;
            delete a2[b2];
          } };
        }
      }
      function Ua(a2) {
        a2._valueTracker || (a2._valueTracker = Ta(a2));
      }
      function Va(a2) {
        if (!a2)
          return false;
        var b2 = a2._valueTracker;
        if (!b2)
          return true;
        var c2 = b2.getValue();
        var d2 = "";
        a2 && (d2 = Sa(a2) ? a2.checked ? "true" : "false" : a2.value);
        a2 = d2;
        return a2 !== c2 ? (b2.setValue(a2), true) : false;
      }
      function Wa(a2) {
        a2 = a2 || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a2)
          return null;
        try {
          return a2.activeElement || a2.body;
        } catch (b2) {
          return a2.body;
        }
      }
      function Xa(a2, b2) {
        var c2 = b2.checked;
        return A({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
      }
      function Ya(a2, b2) {
        var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
        c2 = Ra(null != b2.value ? b2.value : c2);
        a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
      }
      function Za(a2, b2) {
        b2 = b2.checked;
        null != b2 && sa(a2, "checked", b2, false);
      }
      function $a(a2, b2) {
        Za(a2, b2);
        var c2 = Ra(b2.value), d2 = b2.type;
        if (null != c2)
          if ("number" === d2) {
            if (0 === c2 && "" === a2.value || a2.value != c2)
              a2.value = "" + c2;
          } else
            a2.value !== "" + c2 && (a2.value = "" + c2);
        else if ("submit" === d2 || "reset" === d2) {
          a2.removeAttribute("value");
          return;
        }
        b2.hasOwnProperty("value") ? bb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && bb(a2, b2.type, Ra(b2.defaultValue));
        null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
      }
      function cb(a2, b2, c2) {
        if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
          var d2 = b2.type;
          if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value))
            return;
          b2 = "" + a2._wrapperState.initialValue;
          c2 || b2 === a2.value || (a2.value = b2);
          a2.defaultValue = b2;
        }
        c2 = a2.name;
        "" !== c2 && (a2.name = "");
        a2.defaultChecked = !!a2._wrapperState.initialChecked;
        "" !== c2 && (a2.name = c2);
      }
      function bb(a2, b2, c2) {
        if ("number" !== b2 || Wa(a2.ownerDocument) !== a2)
          null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
      }
      var db = Array.isArray;
      function eb(a2, b2, c2, d2) {
        a2 = a2.options;
        if (b2) {
          b2 = {};
          for (var e2 = 0; e2 < c2.length; e2++)
            b2["$" + c2[e2]] = true;
          for (c2 = 0; c2 < a2.length; c2++)
            e2 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
        } else {
          c2 = "" + Ra(c2);
          b2 = null;
          for (e2 = 0; e2 < a2.length; e2++) {
            if (a2[e2].value === c2) {
              a2[e2].selected = true;
              d2 && (a2[e2].defaultSelected = true);
              return;
            }
            null !== b2 || a2[e2].disabled || (b2 = a2[e2]);
          }
          null !== b2 && (b2.selected = true);
        }
      }
      function fb(a2, b2) {
        if (null != b2.dangerouslySetInnerHTML)
          throw Error(p2(91));
        return A({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
      }
      function gb(a2, b2) {
        var c2 = b2.value;
        if (null == c2) {
          c2 = b2.children;
          b2 = b2.defaultValue;
          if (null != c2) {
            if (null != b2)
              throw Error(p2(92));
            if (db(c2)) {
              if (1 < c2.length)
                throw Error(p2(93));
              c2 = c2[0];
            }
            b2 = c2;
          }
          null == b2 && (b2 = "");
          c2 = b2;
        }
        a2._wrapperState = { initialValue: Ra(c2) };
      }
      function hb(a2, b2) {
        var c2 = Ra(b2.value), d2 = Ra(b2.defaultValue);
        null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
        null != d2 && (a2.defaultValue = "" + d2);
      }
      function ib(a2) {
        var b2 = a2.textContent;
        b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
      }
      function jb(a2) {
        switch (a2) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function kb(a2, b2) {
        return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? jb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
      }
      var lb;
      var mb = function(a2) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
          MSApp.execUnsafeLocalFunction(function() {
            return a2(b2, c2, d2, e2);
          });
        } : a2;
      }(function(a2, b2) {
        if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2)
          a2.innerHTML = b2;
        else {
          lb = lb || document.createElement("div");
          lb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
          for (b2 = lb.firstChild; a2.firstChild; )
            a2.removeChild(a2.firstChild);
          for (; b2.firstChild; )
            a2.appendChild(b2.firstChild);
        }
      });
      function nb(a2, b2) {
        if (b2) {
          var c2 = a2.firstChild;
          if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
            c2.nodeValue = b2;
            return;
          }
        }
        a2.textContent = b2;
      }
      var ob = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var pb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(ob).forEach(function(a2) {
        pb.forEach(function(b2) {
          b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
          ob[b2] = ob[a2];
        });
      });
      function qb(a2, b2, c2) {
        return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || ob.hasOwnProperty(a2) && ob[a2] ? ("" + b2).trim() : b2 + "px";
      }
      function rb(a2, b2) {
        a2 = a2.style;
        for (var c2 in b2)
          if (b2.hasOwnProperty(c2)) {
            var d2 = 0 === c2.indexOf("--"), e2 = qb(c2, b2[c2], d2);
            "float" === c2 && (c2 = "cssFloat");
            d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
          }
      }
      var sb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function tb(a2, b2) {
        if (b2) {
          if (sb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
            throw Error(p2(137, a2));
          if (null != b2.dangerouslySetInnerHTML) {
            if (null != b2.children)
              throw Error(p2(60));
            if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
              throw Error(p2(61));
          }
          if (null != b2.style && "object" !== typeof b2.style)
            throw Error(p2(62));
        }
      }
      function ub(a2, b2) {
        if (-1 === a2.indexOf("-"))
          return "string" === typeof b2.is;
        switch (a2) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var vb = null;
      function wb(a2) {
        a2 = a2.target || a2.srcElement || window;
        a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
        return 3 === a2.nodeType ? a2.parentNode : a2;
      }
      var xb = null;
      var yb = null;
      var zb = null;
      function Ab(a2) {
        if (a2 = Bb(a2)) {
          if ("function" !== typeof xb)
            throw Error(p2(280));
          var b2 = a2.stateNode;
          b2 && (b2 = Cb(b2), xb(a2.stateNode, a2.type, b2));
        }
      }
      function Db(a2) {
        yb ? zb ? zb.push(a2) : zb = [a2] : yb = a2;
      }
      function Eb() {
        if (yb) {
          var a2 = yb, b2 = zb;
          zb = yb = null;
          Ab(a2);
          if (b2)
            for (a2 = 0; a2 < b2.length; a2++)
              Ab(b2[a2]);
        }
      }
      function Fb(a2, b2) {
        return a2(b2);
      }
      function Gb() {
      }
      var Hb = false;
      function Ib(a2, b2, c2) {
        if (Hb)
          return a2(b2, c2);
        Hb = true;
        try {
          return Fb(a2, b2, c2);
        } finally {
          if (Hb = false, null !== yb || null !== zb)
            Gb(), Eb();
        }
      }
      function Jb(a2, b2) {
        var c2 = a2.stateNode;
        if (null === c2)
          return null;
        var d2 = Cb(c2);
        if (null === d2)
          return null;
        c2 = d2[b2];
        a:
          switch (b2) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
              a2 = !d2;
              break a;
            default:
              a2 = false;
          }
        if (a2)
          return null;
        if (c2 && "function" !== typeof c2)
          throw Error(p2(231, b2, typeof c2));
        return c2;
      }
      var Kb = false;
      if (ia)
        try {
          Lb = {};
          Object.defineProperty(Lb, "passive", { get: function() {
            Kb = true;
          } });
          window.addEventListener("test", Lb, Lb);
          window.removeEventListener("test", Lb, Lb);
        } catch (a2) {
          Kb = false;
        }
      var Lb;
      function Mb(a2, b2, c2, d2, e2, f2, g2, h2, k) {
        var l2 = Array.prototype.slice.call(arguments, 3);
        try {
          b2.apply(c2, l2);
        } catch (n2) {
          this.onError(n2);
        }
      }
      var Nb = false;
      var Ob = null;
      var Pb = false;
      var Qb = null;
      var Rb = { onError: function(a2) {
        Nb = true;
        Ob = a2;
      } };
      function Sb(a2, b2, c2, d2, e2, f2, g2, h2, k) {
        Nb = false;
        Ob = null;
        Mb.apply(Rb, arguments);
      }
      function Tb(a2, b2, c2, d2, e2, f2, g2, h2, k) {
        Sb.apply(this, arguments);
        if (Nb) {
          if (Nb) {
            var l2 = Ob;
            Nb = false;
            Ob = null;
          } else
            throw Error(p2(198));
          Pb || (Pb = true, Qb = l2);
        }
      }
      function Ub(a2) {
        var b2 = a2, c2 = a2;
        if (a2.alternate)
          for (; b2.return; )
            b2 = b2.return;
        else {
          a2 = b2;
          do
            b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
          while (a2);
        }
        return 3 === b2.tag ? c2 : null;
      }
      function Vb(a2) {
        if (13 === a2.tag) {
          var b2 = a2.memoizedState;
          null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
          if (null !== b2)
            return b2.dehydrated;
        }
        return null;
      }
      function Wb(a2) {
        if (Ub(a2) !== a2)
          throw Error(p2(188));
      }
      function Xb(a2) {
        var b2 = a2.alternate;
        if (!b2) {
          b2 = Ub(a2);
          if (null === b2)
            throw Error(p2(188));
          return b2 !== a2 ? null : a2;
        }
        for (var c2 = a2, d2 = b2; ; ) {
          var e2 = c2.return;
          if (null === e2)
            break;
          var f2 = e2.alternate;
          if (null === f2) {
            d2 = e2.return;
            if (null !== d2) {
              c2 = d2;
              continue;
            }
            break;
          }
          if (e2.child === f2.child) {
            for (f2 = e2.child; f2; ) {
              if (f2 === c2)
                return Wb(e2), a2;
              if (f2 === d2)
                return Wb(e2), b2;
              f2 = f2.sibling;
            }
            throw Error(p2(188));
          }
          if (c2.return !== d2.return)
            c2 = e2, d2 = f2;
          else {
            for (var g2 = false, h2 = e2.child; h2; ) {
              if (h2 === c2) {
                g2 = true;
                c2 = e2;
                d2 = f2;
                break;
              }
              if (h2 === d2) {
                g2 = true;
                d2 = e2;
                c2 = f2;
                break;
              }
              h2 = h2.sibling;
            }
            if (!g2) {
              for (h2 = f2.child; h2; ) {
                if (h2 === c2) {
                  g2 = true;
                  c2 = f2;
                  d2 = e2;
                  break;
                }
                if (h2 === d2) {
                  g2 = true;
                  d2 = f2;
                  c2 = e2;
                  break;
                }
                h2 = h2.sibling;
              }
              if (!g2)
                throw Error(p2(189));
            }
          }
          if (c2.alternate !== d2)
            throw Error(p2(190));
        }
        if (3 !== c2.tag)
          throw Error(p2(188));
        return c2.stateNode.current === c2 ? a2 : b2;
      }
      function Yb(a2) {
        a2 = Xb(a2);
        return null !== a2 ? Zb(a2) : null;
      }
      function Zb(a2) {
        if (5 === a2.tag || 6 === a2.tag)
          return a2;
        for (a2 = a2.child; null !== a2; ) {
          var b2 = Zb(a2);
          if (null !== b2)
            return b2;
          a2 = a2.sibling;
        }
        return null;
      }
      var $b = ba.unstable_scheduleCallback;
      var ac = ba.unstable_cancelCallback;
      var bc = ba.unstable_shouldYield;
      var cc = ba.unstable_requestPaint;
      var B = ba.unstable_now;
      var dc = ba.unstable_getCurrentPriorityLevel;
      var ec = ba.unstable_ImmediatePriority;
      var fc = ba.unstable_UserBlockingPriority;
      var gc = ba.unstable_NormalPriority;
      var hc = ba.unstable_LowPriority;
      var ic = ba.unstable_IdlePriority;
      var jc = null;
      var kc = null;
      function lc(a2) {
        if (kc && "function" === typeof kc.onCommitFiberRoot)
          try {
            kc.onCommitFiberRoot(jc, a2, void 0, 128 === (a2.current.flags & 128));
          } catch (b2) {
          }
      }
      var nc = Math.clz32 ? Math.clz32 : mc;
      var oc = Math.log;
      var pc = Math.LN2;
      function mc(a2) {
        a2 >>>= 0;
        return 0 === a2 ? 32 : 31 - (oc(a2) / pc | 0) | 0;
      }
      var qc = 64;
      var rc = 4194304;
      function sc(a2) {
        switch (a2 & -a2) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a2 & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a2 & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a2;
        }
      }
      function tc(a2, b2) {
        var c2 = a2.pendingLanes;
        if (0 === c2)
          return 0;
        var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
        if (0 !== g2) {
          var h2 = g2 & ~e2;
          0 !== h2 ? d2 = sc(h2) : (f2 &= g2, 0 !== f2 && (d2 = sc(f2)));
        } else
          g2 = c2 & ~e2, 0 !== g2 ? d2 = sc(g2) : 0 !== f2 && (d2 = sc(f2));
        if (0 === d2)
          return 0;
        if (0 !== b2 && b2 !== d2 && 0 === (b2 & e2) && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240)))
          return b2;
        0 !== (d2 & 4) && (d2 |= c2 & 16);
        b2 = a2.entangledLanes;
        if (0 !== b2)
          for (a2 = a2.entanglements, b2 &= d2; 0 < b2; )
            c2 = 31 - nc(b2), e2 = 1 << c2, d2 |= a2[c2], b2 &= ~e2;
        return d2;
      }
      function uc(a2, b2) {
        switch (a2) {
          case 1:
          case 2:
          case 4:
            return b2 + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b2 + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function vc(a2, b2) {
        for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
          var g2 = 31 - nc(f2), h2 = 1 << g2, k = e2[g2];
          if (-1 === k) {
            if (0 === (h2 & c2) || 0 !== (h2 & d2))
              e2[g2] = uc(h2, b2);
          } else
            k <= b2 && (a2.expiredLanes |= h2);
          f2 &= ~h2;
        }
      }
      function wc(a2) {
        a2 = a2.pendingLanes & -1073741825;
        return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
      }
      function xc() {
        var a2 = qc;
        qc <<= 1;
        0 === (qc & 4194240) && (qc = 64);
        return a2;
      }
      function yc(a2) {
        for (var b2 = [], c2 = 0; 31 > c2; c2++)
          b2.push(a2);
        return b2;
      }
      function zc(a2, b2, c2) {
        a2.pendingLanes |= b2;
        536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
        a2 = a2.eventTimes;
        b2 = 31 - nc(b2);
        a2[b2] = c2;
      }
      function Ac(a2, b2) {
        var c2 = a2.pendingLanes & ~b2;
        a2.pendingLanes = b2;
        a2.suspendedLanes = 0;
        a2.pingedLanes = 0;
        a2.expiredLanes &= b2;
        a2.mutableReadLanes &= b2;
        a2.entangledLanes &= b2;
        b2 = a2.entanglements;
        var d2 = a2.eventTimes;
        for (a2 = a2.expirationTimes; 0 < c2; ) {
          var e2 = 31 - nc(c2), f2 = 1 << e2;
          b2[e2] = 0;
          d2[e2] = -1;
          a2[e2] = -1;
          c2 &= ~f2;
        }
      }
      function Bc(a2, b2) {
        var c2 = a2.entangledLanes |= b2;
        for (a2 = a2.entanglements; c2; ) {
          var d2 = 31 - nc(c2), e2 = 1 << d2;
          e2 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
          c2 &= ~e2;
        }
      }
      var C = 0;
      function Cc(a2) {
        a2 &= -a2;
        return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Dc;
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic = false;
      var Jc = [];
      var Kc = null;
      var Lc = null;
      var Mc = null;
      var Nc = /* @__PURE__ */ new Map();
      var Oc = /* @__PURE__ */ new Map();
      var Pc = [];
      var Qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Rc(a2, b2) {
        switch (a2) {
          case "focusin":
          case "focusout":
            Kc = null;
            break;
          case "dragenter":
          case "dragleave":
            Lc = null;
            break;
          case "mouseover":
          case "mouseout":
            Mc = null;
            break;
          case "pointerover":
          case "pointerout":
            Nc.delete(b2.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Oc.delete(b2.pointerId);
        }
      }
      function Sc(a2, b2, c2, d2, e2, f2) {
        if (null === a2 || a2.nativeEvent !== f2)
          return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b2 && (b2 = Bb(b2), null !== b2 && Ec(b2)), a2;
        a2.eventSystemFlags |= d2;
        b2 = a2.targetContainers;
        null !== e2 && -1 === b2.indexOf(e2) && b2.push(e2);
        return a2;
      }
      function Tc(a2, b2, c2, d2, e2) {
        switch (b2) {
          case "focusin":
            return Kc = Sc(Kc, a2, b2, c2, d2, e2), true;
          case "dragenter":
            return Lc = Sc(Lc, a2, b2, c2, d2, e2), true;
          case "mouseover":
            return Mc = Sc(Mc, a2, b2, c2, d2, e2), true;
          case "pointerover":
            var f2 = e2.pointerId;
            Nc.set(f2, Sc(Nc.get(f2) || null, a2, b2, c2, d2, e2));
            return true;
          case "gotpointercapture":
            return f2 = e2.pointerId, Oc.set(f2, Sc(Oc.get(f2) || null, a2, b2, c2, d2, e2)), true;
        }
        return false;
      }
      function Uc(a2) {
        var b2 = Vc(a2.target);
        if (null !== b2) {
          var c2 = Ub(b2);
          if (null !== c2) {
            if (b2 = c2.tag, 13 === b2) {
              if (b2 = Vb(c2), null !== b2) {
                a2.blockedOn = b2;
                Hc(a2.priority, function() {
                  Fc(c2);
                });
                return;
              }
            } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
              a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a2.blockedOn = null;
      }
      function Wc(a2) {
        if (null !== a2.blockedOn)
          return false;
        for (var b2 = a2.targetContainers; 0 < b2.length; ) {
          var c2 = Xc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
          if (null === c2) {
            c2 = a2.nativeEvent;
            var d2 = new c2.constructor(c2.type, c2);
            vb = d2;
            c2.target.dispatchEvent(d2);
            vb = null;
          } else
            return b2 = Bb(c2), null !== b2 && Ec(b2), a2.blockedOn = c2, false;
          b2.shift();
        }
        return true;
      }
      function Yc(a2, b2, c2) {
        Wc(a2) && c2.delete(b2);
      }
      function Zc() {
        Ic = false;
        null !== Kc && Wc(Kc) && (Kc = null);
        null !== Lc && Wc(Lc) && (Lc = null);
        null !== Mc && Wc(Mc) && (Mc = null);
        Nc.forEach(Yc);
        Oc.forEach(Yc);
      }
      function $c(a2, b2) {
        a2.blockedOn === b2 && (a2.blockedOn = null, Ic || (Ic = true, ba.unstable_scheduleCallback(ba.unstable_NormalPriority, Zc)));
      }
      function ad(a2) {
        function b2(b3) {
          return $c(b3, a2);
        }
        if (0 < Jc.length) {
          $c(Jc[0], a2);
          for (var c2 = 1; c2 < Jc.length; c2++) {
            var d2 = Jc[c2];
            d2.blockedOn === a2 && (d2.blockedOn = null);
          }
        }
        null !== Kc && $c(Kc, a2);
        null !== Lc && $c(Lc, a2);
        null !== Mc && $c(Mc, a2);
        Nc.forEach(b2);
        Oc.forEach(b2);
        for (c2 = 0; c2 < Pc.length; c2++)
          d2 = Pc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
        for (; 0 < Pc.length && (c2 = Pc[0], null === c2.blockedOn); )
          Uc(c2), null === c2.blockedOn && Pc.shift();
      }
      var bd = ta.ReactCurrentBatchConfig;
      var cd = true;
      function dd(a2, b2, c2, d2) {
        var e2 = C, f2 = bd.transition;
        bd.transition = null;
        try {
          C = 1, ed(a2, b2, c2, d2);
        } finally {
          C = e2, bd.transition = f2;
        }
      }
      function fd(a2, b2, c2, d2) {
        var e2 = C, f2 = bd.transition;
        bd.transition = null;
        try {
          C = 4, ed(a2, b2, c2, d2);
        } finally {
          C = e2, bd.transition = f2;
        }
      }
      function ed(a2, b2, c2, d2) {
        if (cd) {
          var e2 = Xc(a2, b2, c2, d2);
          if (null === e2)
            gd(a2, b2, d2, hd, c2), Rc(a2, d2);
          else if (Tc(e2, a2, b2, c2, d2))
            d2.stopPropagation();
          else if (Rc(a2, d2), b2 & 4 && -1 < Qc.indexOf(a2)) {
            for (; null !== e2; ) {
              var f2 = Bb(e2);
              null !== f2 && Dc(f2);
              f2 = Xc(a2, b2, c2, d2);
              null === f2 && gd(a2, b2, d2, hd, c2);
              if (f2 === e2)
                break;
              e2 = f2;
            }
            null !== e2 && d2.stopPropagation();
          } else
            gd(a2, b2, d2, null, c2);
        }
      }
      var hd = null;
      function Xc(a2, b2, c2, d2) {
        hd = null;
        a2 = wb(d2);
        a2 = Vc(a2);
        if (null !== a2)
          if (b2 = Ub(a2), null === b2)
            a2 = null;
          else if (c2 = b2.tag, 13 === c2) {
            a2 = Vb(b2);
            if (null !== a2)
              return a2;
            a2 = null;
          } else if (3 === c2) {
            if (b2.stateNode.current.memoizedState.isDehydrated)
              return 3 === b2.tag ? b2.stateNode.containerInfo : null;
            a2 = null;
          } else
            b2 !== a2 && (a2 = null);
        hd = a2;
        return null;
      }
      function id(a2) {
        switch (a2) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (dc()) {
              case ec:
                return 1;
              case fc:
                return 4;
              case gc:
              case hc:
                return 16;
              case ic:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var jd = null;
      var kd = null;
      var ld = null;
      function md() {
        if (ld)
          return ld;
        var a2, b2 = kd, c2 = b2.length, d2, e2 = "value" in jd ? jd.value : jd.textContent, f2 = e2.length;
        for (a2 = 0; a2 < c2 && b2[a2] === e2[a2]; a2++)
          ;
        var g2 = c2 - a2;
        for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++)
          ;
        return ld = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
      }
      function nd(a2) {
        var b2 = a2.keyCode;
        "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
        10 === a2 && (a2 = 13);
        return 32 <= a2 || 13 === a2 ? a2 : 0;
      }
      function od() {
        return true;
      }
      function pd() {
        return false;
      }
      function qd(a2) {
        function b2(b3, d2, e2, f2, g2) {
          this._reactName = b3;
          this._targetInst = e2;
          this.type = d2;
          this.nativeEvent = f2;
          this.target = g2;
          this.currentTarget = null;
          for (var c2 in a2)
            a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
          this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? od : pd;
          this.isPropagationStopped = pd;
          return this;
        }
        A(b2.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a3 = this.nativeEvent;
          a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = od);
        }, stopPropagation: function() {
          var a3 = this.nativeEvent;
          a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = od);
        }, persist: function() {
        }, isPersistent: od });
        return b2;
      }
      var rd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
        return a2.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var sd = qd(rd);
      var td = A({}, rd, { view: 0, detail: 0 });
      var ud = qd(td);
      var vd;
      var wd;
      var xd;
      var zd = A({}, td, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: yd, button: 0, buttons: 0, relatedTarget: function(a2) {
        return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
      }, movementX: function(a2) {
        if ("movementX" in a2)
          return a2.movementX;
        a2 !== xd && (xd && "mousemove" === a2.type ? (vd = a2.screenX - xd.screenX, wd = a2.screenY - xd.screenY) : wd = vd = 0, xd = a2);
        return vd;
      }, movementY: function(a2) {
        return "movementY" in a2 ? a2.movementY : wd;
      } });
      var Ad = qd(zd);
      var Bd = A({}, zd, { dataTransfer: 0 });
      var Cd = qd(Bd);
      var Dd = A({}, td, { relatedTarget: 0 });
      var Ed = qd(Dd);
      var Fd = A({}, rd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Gd = qd(Fd);
      var Hd = A({}, rd, { clipboardData: function(a2) {
        return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
      } });
      var Id = qd(Hd);
      var Jd = A({}, rd, { data: 0 });
      var Kd = qd(Jd);
      var Ld = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Md = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Nd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Od(a2) {
        var b2 = this.nativeEvent;
        return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Nd[a2]) ? !!b2[a2] : false;
      }
      function yd() {
        return Od;
      }
      var Pd = A({}, td, { key: function(a2) {
        if (a2.key) {
          var b2 = Ld[a2.key] || a2.key;
          if ("Unidentified" !== b2)
            return b2;
        }
        return "keypress" === a2.type ? (a2 = nd(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Md[a2.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: yd, charCode: function(a2) {
        return "keypress" === a2.type ? nd(a2) : 0;
      }, keyCode: function(a2) {
        return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
      }, which: function(a2) {
        return "keypress" === a2.type ? nd(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
      } });
      var Qd = qd(Pd);
      var Rd = A({}, zd, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Sd = qd(Rd);
      var Td = A({}, td, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: yd });
      var Ud = qd(Td);
      var Vd = A({}, rd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Wd = qd(Vd);
      var Xd = A({}, zd, {
        deltaX: function(a2) {
          return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
        },
        deltaY: function(a2) {
          return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Yd = qd(Xd);
      var Zd = [9, 13, 27, 32];
      var $d = ia && "CompositionEvent" in window;
      var ae = null;
      ia && "documentMode" in document && (ae = document.documentMode);
      var be = ia && "TextEvent" in window && !ae;
      var ce = ia && (!$d || ae && 8 < ae && 11 >= ae);
      var de = String.fromCharCode(32);
      var ee = false;
      function fe(a2, b2) {
        switch (a2) {
          case "keyup":
            return -1 !== Zd.indexOf(b2.keyCode);
          case "keydown":
            return 229 !== b2.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function ge(a2) {
        a2 = a2.detail;
        return "object" === typeof a2 && "data" in a2 ? a2.data : null;
      }
      var he = false;
      function ie(a2, b2) {
        switch (a2) {
          case "compositionend":
            return ge(b2);
          case "keypress":
            if (32 !== b2.which)
              return null;
            ee = true;
            return de;
          case "textInput":
            return a2 = b2.data, a2 === de && ee ? null : a2;
          default:
            return null;
        }
      }
      function je(a2, b2) {
        if (he)
          return "compositionend" === a2 || !$d && fe(a2, b2) ? (a2 = md(), ld = kd = jd = null, he = false, a2) : null;
        switch (a2) {
          case "paste":
            return null;
          case "keypress":
            if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
              if (b2.char && 1 < b2.char.length)
                return b2.char;
              if (b2.which)
                return String.fromCharCode(b2.which);
            }
            return null;
          case "compositionend":
            return ce && "ko" !== b2.locale ? null : b2.data;
          default:
            return null;
        }
      }
      var ke = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function le(a2) {
        var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
        return "input" === b2 ? !!ke[a2.type] : "textarea" === b2 ? true : false;
      }
      function me(a2, b2, c2, d2) {
        Db(d2);
        b2 = ne(b2, "onChange");
        0 < b2.length && (c2 = new sd("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
      }
      var oe = null;
      var pe = null;
      function qe(a2) {
        re(a2, 0);
      }
      function se(a2) {
        var b2 = te(a2);
        if (Va(b2))
          return a2;
      }
      function ue(a2, b2) {
        if ("change" === a2)
          return b2;
      }
      var ve = false;
      if (ia) {
        if (ia) {
          xe = "oninput" in document;
          if (!xe) {
            ye = document.createElement("div");
            ye.setAttribute("oninput", "return;");
            xe = "function" === typeof ye.oninput;
          }
          we = xe;
        } else
          we = false;
        ve = we && (!document.documentMode || 9 < document.documentMode);
      }
      var we;
      var xe;
      var ye;
      function ze() {
        oe && (oe.detachEvent("onpropertychange", Ae), pe = oe = null);
      }
      function Ae(a2) {
        if ("value" === a2.propertyName && se(pe)) {
          var b2 = [];
          me(b2, pe, a2, wb(a2));
          Ib(qe, b2);
        }
      }
      function Be(a2, b2, c2) {
        "focusin" === a2 ? (ze(), oe = b2, pe = c2, oe.attachEvent("onpropertychange", Ae)) : "focusout" === a2 && ze();
      }
      function Ce(a2) {
        if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2)
          return se(pe);
      }
      function De(a2, b2) {
        if ("click" === a2)
          return se(b2);
      }
      function Ee(a2, b2) {
        if ("input" === a2 || "change" === a2)
          return se(b2);
      }
      function Fe(a2, b2) {
        return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
      }
      var Ge = "function" === typeof Object.is ? Object.is : Fe;
      function He(a2, b2) {
        if (Ge(a2, b2))
          return true;
        if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2)
          return false;
        var c2 = Object.keys(a2), d2 = Object.keys(b2);
        if (c2.length !== d2.length)
          return false;
        for (d2 = 0; d2 < c2.length; d2++) {
          var e2 = c2[d2];
          if (!ja.call(b2, e2) || !Ge(a2[e2], b2[e2]))
            return false;
        }
        return true;
      }
      function Ie(a2) {
        for (; a2 && a2.firstChild; )
          a2 = a2.firstChild;
        return a2;
      }
      function Je(a2, b2) {
        var c2 = Ie(a2);
        a2 = 0;
        for (var d2; c2; ) {
          if (3 === c2.nodeType) {
            d2 = a2 + c2.textContent.length;
            if (a2 <= b2 && d2 >= b2)
              return { node: c2, offset: b2 - a2 };
            a2 = d2;
          }
          a: {
            for (; c2; ) {
              if (c2.nextSibling) {
                c2 = c2.nextSibling;
                break a;
              }
              c2 = c2.parentNode;
            }
            c2 = void 0;
          }
          c2 = Ie(c2);
        }
      }
      function Ke(a2, b2) {
        return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Ke(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
      }
      function Le() {
        for (var a2 = window, b2 = Wa(); b2 instanceof a2.HTMLIFrameElement; ) {
          try {
            var c2 = "string" === typeof b2.contentWindow.location.href;
          } catch (d2) {
            c2 = false;
          }
          if (c2)
            a2 = b2.contentWindow;
          else
            break;
          b2 = Wa(a2.document);
        }
        return b2;
      }
      function Me(a2) {
        var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
        return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
      }
      function Ne(a2) {
        var b2 = Le(), c2 = a2.focusedElem, d2 = a2.selectionRange;
        if (b2 !== c2 && c2 && c2.ownerDocument && Ke(c2.ownerDocument.documentElement, c2)) {
          if (null !== d2 && Me(c2)) {
            if (b2 = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2)
              c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
            else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
              a2 = a2.getSelection();
              var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
              d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
              !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
              e2 = Je(c2, f2);
              var g2 = Je(
                c2,
                d2
              );
              e2 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
            }
          }
          b2 = [];
          for (a2 = c2; a2 = a2.parentNode; )
            1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
          "function" === typeof c2.focus && c2.focus();
          for (c2 = 0; c2 < b2.length; c2++)
            a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
        }
      }
      var Oe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Pe = null;
      var Qe = null;
      var Re = null;
      var Se = false;
      function Te(a2, b2, c2) {
        var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
        Se || null == Pe || Pe !== Wa(d2) || (d2 = Pe, "selectionStart" in d2 && Me(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Re && He(Re, d2) || (Re = d2, d2 = ne(Qe, "onSelect"), 0 < d2.length && (b2 = new sd("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Pe)));
      }
      function Ue(a2, b2) {
        var c2 = {};
        c2[a2.toLowerCase()] = b2.toLowerCase();
        c2["Webkit" + a2] = "webkit" + b2;
        c2["Moz" + a2] = "moz" + b2;
        return c2;
      }
      var Ve = { animationend: Ue("Animation", "AnimationEnd"), animationiteration: Ue("Animation", "AnimationIteration"), animationstart: Ue("Animation", "AnimationStart"), transitionend: Ue("Transition", "TransitionEnd") };
      var We = {};
      var Xe = {};
      ia && (Xe = document.createElement("div").style, "AnimationEvent" in window || (delete Ve.animationend.animation, delete Ve.animationiteration.animation, delete Ve.animationstart.animation), "TransitionEvent" in window || delete Ve.transitionend.transition);
      function Ye(a2) {
        if (We[a2])
          return We[a2];
        if (!Ve[a2])
          return a2;
        var b2 = Ve[a2], c2;
        for (c2 in b2)
          if (b2.hasOwnProperty(c2) && c2 in Xe)
            return We[a2] = b2[c2];
        return a2;
      }
      var Ze = Ye("animationend");
      var $e = Ye("animationiteration");
      var af = Ye("animationstart");
      var bf = Ye("transitionend");
      var cf = /* @__PURE__ */ new Map();
      var df = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ef(a2, b2) {
        cf.set(a2, b2);
        fa(b2, [a2]);
      }
      for (ff = 0; ff < df.length; ff++) {
        gf = df[ff], hf = gf.toLowerCase(), jf = gf[0].toUpperCase() + gf.slice(1);
        ef(hf, "on" + jf);
      }
      var gf;
      var hf;
      var jf;
      var ff;
      ef(Ze, "onAnimationEnd");
      ef($e, "onAnimationIteration");
      ef(af, "onAnimationStart");
      ef("dblclick", "onDoubleClick");
      ef("focusin", "onFocus");
      ef("focusout", "onBlur");
      ef(bf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var kf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var lf = new Set("cancel close invalid load scroll toggle".split(" ").concat(kf));
      function mf(a2, b2, c2) {
        var d2 = a2.type || "unknown-event";
        a2.currentTarget = c2;
        Tb(d2, b2, void 0, a2);
        a2.currentTarget = null;
      }
      function re(a2, b2) {
        b2 = 0 !== (b2 & 4);
        for (var c2 = 0; c2 < a2.length; c2++) {
          var d2 = a2[c2], e2 = d2.event;
          d2 = d2.listeners;
          a: {
            var f2 = void 0;
            if (b2)
              for (var g2 = d2.length - 1; 0 <= g2; g2--) {
                var h2 = d2[g2], k = h2.instance, l2 = h2.currentTarget;
                h2 = h2.listener;
                if (k !== f2 && e2.isPropagationStopped())
                  break a;
                mf(e2, h2, l2);
                f2 = k;
              }
            else
              for (g2 = 0; g2 < d2.length; g2++) {
                h2 = d2[g2];
                k = h2.instance;
                l2 = h2.currentTarget;
                h2 = h2.listener;
                if (k !== f2 && e2.isPropagationStopped())
                  break a;
                mf(e2, h2, l2);
                f2 = k;
              }
          }
        }
        if (Pb)
          throw a2 = Qb, Pb = false, Qb = null, a2;
      }
      function D(a2, b2) {
        var c2 = b2[nf];
        void 0 === c2 && (c2 = b2[nf] = /* @__PURE__ */ new Set());
        var d2 = a2 + "__bubble";
        c2.has(d2) || (of(b2, a2, 2, false), c2.add(d2));
      }
      function pf(a2, b2, c2) {
        var d2 = 0;
        b2 && (d2 |= 4);
        of(c2, a2, d2, b2);
      }
      var qf = "_reactListening" + Math.random().toString(36).slice(2);
      function rf(a2) {
        if (!a2[qf]) {
          a2[qf] = true;
          da.forEach(function(b3) {
            "selectionchange" !== b3 && (lf.has(b3) || pf(b3, false, a2), pf(b3, true, a2));
          });
          var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
          null === b2 || b2[qf] || (b2[qf] = true, pf("selectionchange", false, b2));
        }
      }
      function of(a2, b2, c2, d2) {
        switch (id(b2)) {
          case 1:
            var e2 = dd;
            break;
          case 4:
            e2 = fd;
            break;
          default:
            e2 = ed;
        }
        c2 = e2.bind(null, b2, c2, a2);
        e2 = void 0;
        !Kb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e2 = true);
        d2 ? void 0 !== e2 ? a2.addEventListener(b2, c2, { capture: true, passive: e2 }) : a2.addEventListener(b2, c2, true) : void 0 !== e2 ? a2.addEventListener(b2, c2, { passive: e2 }) : a2.addEventListener(b2, c2, false);
      }
      function gd(a2, b2, c2, d2, e2) {
        var f2 = d2;
        if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2)
          a:
            for (; ; ) {
              if (null === d2)
                return;
              var g2 = d2.tag;
              if (3 === g2 || 4 === g2) {
                var h2 = d2.stateNode.containerInfo;
                if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2)
                  break;
                if (4 === g2)
                  for (g2 = d2.return; null !== g2; ) {
                    var k = g2.tag;
                    if (3 === k || 4 === k) {
                      if (k = g2.stateNode.containerInfo, k === e2 || 8 === k.nodeType && k.parentNode === e2)
                        return;
                    }
                    g2 = g2.return;
                  }
                for (; null !== h2; ) {
                  g2 = Vc(h2);
                  if (null === g2)
                    return;
                  k = g2.tag;
                  if (5 === k || 6 === k) {
                    d2 = f2 = g2;
                    continue a;
                  }
                  h2 = h2.parentNode;
                }
              }
              d2 = d2.return;
            }
        Ib(function() {
          var d3 = f2, e3 = wb(c2), g3 = [];
          a: {
            var h3 = cf.get(a2);
            if (void 0 !== h3) {
              var k2 = sd, m2 = a2;
              switch (a2) {
                case "keypress":
                  if (0 === nd(c2))
                    break a;
                case "keydown":
                case "keyup":
                  k2 = Qd;
                  break;
                case "focusin":
                  m2 = "focus";
                  k2 = Ed;
                  break;
                case "focusout":
                  m2 = "blur";
                  k2 = Ed;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Ed;
                  break;
                case "click":
                  if (2 === c2.button)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Ad;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Cd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Ud;
                  break;
                case Ze:
                case $e:
                case af:
                  k2 = Gd;
                  break;
                case bf:
                  k2 = Wd;
                  break;
                case "scroll":
                  k2 = ud;
                  break;
                case "wheel":
                  k2 = Yd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Id;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Sd;
              }
              var w2 = 0 !== (b2 & 4), J = !w2 && "scroll" === a2, v2 = w2 ? null !== h3 ? h3 + "Capture" : null : h3;
              w2 = [];
              for (var x = d3, r2; null !== x; ) {
                r2 = x;
                var F2 = r2.stateNode;
                5 === r2.tag && null !== F2 && (r2 = F2, null !== v2 && (F2 = Jb(x, v2), null != F2 && w2.push(sf(x, F2, r2))));
                if (J)
                  break;
                x = x.return;
              }
              0 < w2.length && (h3 = new k2(h3, m2, null, c2, e3), g3.push({ event: h3, listeners: w2 }));
            }
          }
          if (0 === (b2 & 7)) {
            a: {
              h3 = "mouseover" === a2 || "pointerover" === a2;
              k2 = "mouseout" === a2 || "pointerout" === a2;
              if (h3 && c2 !== vb && (m2 = c2.relatedTarget || c2.fromElement) && (Vc(m2) || m2[tf]))
                break a;
              if (k2 || h3) {
                h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
                if (k2) {
                  if (m2 = c2.relatedTarget || c2.toElement, k2 = d3, m2 = m2 ? Vc(m2) : null, null !== m2 && (J = Ub(m2), m2 !== J || 5 !== m2.tag && 6 !== m2.tag))
                    m2 = null;
                } else
                  k2 = null, m2 = d3;
                if (k2 !== m2) {
                  w2 = Ad;
                  F2 = "onMouseLeave";
                  v2 = "onMouseEnter";
                  x = "mouse";
                  if ("pointerout" === a2 || "pointerover" === a2)
                    w2 = Sd, F2 = "onPointerLeave", v2 = "onPointerEnter", x = "pointer";
                  J = null == k2 ? h3 : te(k2);
                  r2 = null == m2 ? h3 : te(m2);
                  h3 = new w2(F2, x + "leave", k2, c2, e3);
                  h3.target = J;
                  h3.relatedTarget = r2;
                  F2 = null;
                  Vc(e3) === d3 && (w2 = new w2(v2, x + "enter", m2, c2, e3), w2.target = r2, w2.relatedTarget = J, F2 = w2);
                  J = F2;
                  if (k2 && m2)
                    b: {
                      w2 = k2;
                      v2 = m2;
                      x = 0;
                      for (r2 = w2; r2; r2 = uf(r2))
                        x++;
                      r2 = 0;
                      for (F2 = v2; F2; F2 = uf(F2))
                        r2++;
                      for (; 0 < x - r2; )
                        w2 = uf(w2), x--;
                      for (; 0 < r2 - x; )
                        v2 = uf(v2), r2--;
                      for (; x--; ) {
                        if (w2 === v2 || null !== v2 && w2 === v2.alternate)
                          break b;
                        w2 = uf(w2);
                        v2 = uf(v2);
                      }
                      w2 = null;
                    }
                  else
                    w2 = null;
                  null !== k2 && vf(g3, h3, k2, w2, false);
                  null !== m2 && null !== J && vf(g3, J, m2, w2, true);
                }
              }
            }
            a: {
              h3 = d3 ? te(d3) : window;
              k2 = h3.nodeName && h3.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h3.type)
                var Z = ue;
              else if (le(h3))
                if (ve)
                  Z = Ee;
                else {
                  Z = Ce;
                  var ya = Be;
                }
              else
                (k2 = h3.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (Z = De);
              if (Z && (Z = Z(a2, d3))) {
                me(g3, Z, c2, e3);
                break a;
              }
              ya && ya(a2, h3, d3);
              "focusout" === a2 && (ya = h3._wrapperState) && ya.controlled && "number" === h3.type && bb(h3, "number", h3.value);
            }
            ya = d3 ? te(d3) : window;
            switch (a2) {
              case "focusin":
                if (le(ya) || "true" === ya.contentEditable)
                  Pe = ya, Qe = d3, Re = null;
                break;
              case "focusout":
                Re = Qe = Pe = null;
                break;
              case "mousedown":
                Se = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Se = false;
                Te(g3, c2, e3);
                break;
              case "selectionchange":
                if (Oe)
                  break;
              case "keydown":
              case "keyup":
                Te(g3, c2, e3);
            }
            var ab;
            if ($d)
              b: {
                switch (a2) {
                  case "compositionstart":
                    var ca = "onCompositionStart";
                    break b;
                  case "compositionend":
                    ca = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    ca = "onCompositionUpdate";
                    break b;
                }
                ca = void 0;
              }
            else
              he ? fe(a2, c2) && (ca = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ca = "onCompositionStart");
            ca && (ce && "ko" !== c2.locale && (he || "onCompositionStart" !== ca ? "onCompositionEnd" === ca && he && (ab = md()) : (jd = e3, kd = "value" in jd ? jd.value : jd.textContent, he = true)), ya = ne(d3, ca), 0 < ya.length && (ca = new Kd(ca, a2, null, c2, e3), g3.push({ event: ca, listeners: ya }), ab ? ca.data = ab : (ab = ge(c2), null !== ab && (ca.data = ab))));
            if (ab = be ? ie(a2, c2) : je(a2, c2))
              d3 = ne(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Kd("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = ab);
          }
          re(g3, b2);
        });
      }
      function sf(a2, b2, c2) {
        return { instance: a2, listener: b2, currentTarget: c2 };
      }
      function ne(a2, b2) {
        for (var c2 = b2 + "Capture", d2 = []; null !== a2; ) {
          var e2 = a2, f2 = e2.stateNode;
          5 === e2.tag && null !== f2 && (e2 = f2, f2 = Jb(a2, c2), null != f2 && d2.unshift(sf(a2, f2, e2)), f2 = Jb(a2, b2), null != f2 && d2.push(sf(a2, f2, e2)));
          a2 = a2.return;
        }
        return d2;
      }
      function uf(a2) {
        if (null === a2)
          return null;
        do
          a2 = a2.return;
        while (a2 && 5 !== a2.tag);
        return a2 ? a2 : null;
      }
      function vf(a2, b2, c2, d2, e2) {
        for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
          var h2 = c2, k = h2.alternate, l2 = h2.stateNode;
          if (null !== k && k === d2)
            break;
          5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k = Jb(c2, f2), null != k && g2.unshift(sf(c2, k, h2))) : e2 || (k = Jb(c2, f2), null != k && g2.push(sf(c2, k, h2))));
          c2 = c2.return;
        }
        0 !== g2.length && a2.push({ event: b2, listeners: g2 });
      }
      var wf = /\r\n?/g;
      var xf = /\u0000|\uFFFD/g;
      function yf(a2) {
        return ("string" === typeof a2 ? a2 : "" + a2).replace(wf, "\n").replace(xf, "");
      }
      function zf(a2, b2, c2) {
        b2 = yf(b2);
        if (yf(a2) !== b2 && c2)
          throw Error(p2(425));
      }
      function Af() {
      }
      var Bf = null;
      var Cf = null;
      function Df(a2, b2) {
        return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
      }
      var Ef = "function" === typeof setTimeout ? setTimeout : void 0;
      var Ff = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Gf = "function" === typeof Promise ? Promise : void 0;
      var If = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Gf ? function(a2) {
        return Gf.resolve(null).then(a2).catch(Hf);
      } : Ef;
      function Hf(a2) {
        setTimeout(function() {
          throw a2;
        });
      }
      function Jf(a2, b2) {
        var c2 = b2, d2 = 0;
        do {
          var e2 = c2.nextSibling;
          a2.removeChild(c2);
          if (e2 && 8 === e2.nodeType)
            if (c2 = e2.data, "/$" === c2) {
              if (0 === d2) {
                a2.removeChild(e2);
                ad(b2);
                return;
              }
              d2--;
            } else
              "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
          c2 = e2;
        } while (c2);
        ad(b2);
      }
      function Kf(a2) {
        for (; null != a2; a2 = a2.nextSibling) {
          var b2 = a2.nodeType;
          if (1 === b2 || 3 === b2)
            break;
          if (8 === b2) {
            b2 = a2.data;
            if ("$" === b2 || "$!" === b2 || "$?" === b2)
              break;
            if ("/$" === b2)
              return null;
          }
        }
        return a2;
      }
      function Lf(a2) {
        a2 = a2.previousSibling;
        for (var b2 = 0; a2; ) {
          if (8 === a2.nodeType) {
            var c2 = a2.data;
            if ("$" === c2 || "$!" === c2 || "$?" === c2) {
              if (0 === b2)
                return a2;
              b2--;
            } else
              "/$" === c2 && b2++;
          }
          a2 = a2.previousSibling;
        }
        return null;
      }
      var Mf = Math.random().toString(36).slice(2);
      var Nf = "__reactFiber$" + Mf;
      var Of = "__reactProps$" + Mf;
      var tf = "__reactContainer$" + Mf;
      var nf = "__reactEvents$" + Mf;
      var Pf = "__reactListeners$" + Mf;
      var Qf = "__reactHandles$" + Mf;
      function Vc(a2) {
        var b2 = a2[Nf];
        if (b2)
          return b2;
        for (var c2 = a2.parentNode; c2; ) {
          if (b2 = c2[tf] || c2[Nf]) {
            c2 = b2.alternate;
            if (null !== b2.child || null !== c2 && null !== c2.child)
              for (a2 = Lf(a2); null !== a2; ) {
                if (c2 = a2[Nf])
                  return c2;
                a2 = Lf(a2);
              }
            return b2;
          }
          a2 = c2;
          c2 = a2.parentNode;
        }
        return null;
      }
      function Bb(a2) {
        a2 = a2[Nf] || a2[tf];
        return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
      }
      function te(a2) {
        if (5 === a2.tag || 6 === a2.tag)
          return a2.stateNode;
        throw Error(p2(33));
      }
      function Cb(a2) {
        return a2[Of] || null;
      }
      var Rf = [];
      var Sf = -1;
      function Tf(a2) {
        return { current: a2 };
      }
      function E2(a2) {
        0 > Sf || (a2.current = Rf[Sf], Rf[Sf] = null, Sf--);
      }
      function G(a2, b2) {
        Sf++;
        Rf[Sf] = a2.current;
        a2.current = b2;
      }
      var Uf = {};
      var H = Tf(Uf);
      var Vf = Tf(false);
      var Wf = Uf;
      function Xf(a2, b2) {
        var c2 = a2.type.contextTypes;
        if (!c2)
          return Uf;
        var d2 = a2.stateNode;
        if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2)
          return d2.__reactInternalMemoizedMaskedChildContext;
        var e2 = {}, f2;
        for (f2 in c2)
          e2[f2] = b2[f2];
        d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e2);
        return e2;
      }
      function Yf(a2) {
        a2 = a2.childContextTypes;
        return null !== a2 && void 0 !== a2;
      }
      function Zf() {
        E2(Vf);
        E2(H);
      }
      function $f(a2, b2, c2) {
        if (H.current !== Uf)
          throw Error(p2(168));
        G(H, b2);
        G(Vf, c2);
      }
      function ag(a2, b2, c2) {
        var d2 = a2.stateNode;
        b2 = b2.childContextTypes;
        if ("function" !== typeof d2.getChildContext)
          return c2;
        d2 = d2.getChildContext();
        for (var e2 in d2)
          if (!(e2 in b2))
            throw Error(p2(108, Qa(a2) || "Unknown", e2));
        return A({}, c2, d2);
      }
      function bg(a2) {
        a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Uf;
        Wf = H.current;
        G(H, a2);
        G(Vf, Vf.current);
        return true;
      }
      function cg(a2, b2, c2) {
        var d2 = a2.stateNode;
        if (!d2)
          throw Error(p2(169));
        c2 ? (a2 = ag(a2, b2, Wf), d2.__reactInternalMemoizedMergedChildContext = a2, E2(Vf), E2(H), G(H, a2)) : E2(Vf);
        G(Vf, c2);
      }
      var dg = null;
      var eg = false;
      var fg = false;
      function gg(a2) {
        null === dg ? dg = [a2] : dg.push(a2);
      }
      function hg(a2) {
        eg = true;
        gg(a2);
      }
      function ig() {
        if (!fg && null !== dg) {
          fg = true;
          var a2 = 0, b2 = C;
          try {
            var c2 = dg;
            for (C = 1; a2 < c2.length; a2++) {
              var d2 = c2[a2];
              do
                d2 = d2(true);
              while (null !== d2);
            }
            dg = null;
            eg = false;
          } catch (e2) {
            throw null !== dg && (dg = dg.slice(a2 + 1)), $b(ec, ig), e2;
          } finally {
            C = b2, fg = false;
          }
        }
        return null;
      }
      var jg = ta.ReactCurrentBatchConfig;
      function kg(a2, b2) {
        if (a2 && a2.defaultProps) {
          b2 = A({}, b2);
          a2 = a2.defaultProps;
          for (var c2 in a2)
            void 0 === b2[c2] && (b2[c2] = a2[c2]);
          return b2;
        }
        return b2;
      }
      var lg = Tf(null);
      var mg = null;
      var ng = null;
      var og = null;
      function pg() {
        og = ng = mg = null;
      }
      function qg(a2) {
        var b2 = lg.current;
        E2(lg);
        a2._currentValue = b2;
      }
      function rg(a2, b2, c2) {
        for (; null !== a2; ) {
          var d2 = a2.alternate;
          (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
          if (a2 === c2)
            break;
          a2 = a2.return;
        }
      }
      function sg(a2, b2) {
        mg = a2;
        og = ng = null;
        a2 = a2.dependencies;
        null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (tg = true), a2.firstContext = null);
      }
      function ug(a2) {
        var b2 = a2._currentValue;
        if (og !== a2)
          if (a2 = { context: a2, memoizedValue: b2, next: null }, null === ng) {
            if (null === mg)
              throw Error(p2(308));
            ng = a2;
            mg.dependencies = { lanes: 0, firstContext: a2 };
          } else
            ng = ng.next = a2;
        return b2;
      }
      var vg = null;
      var wg = false;
      function xg(a2) {
        a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function yg(a2, b2) {
        a2 = a2.updateQueue;
        b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
      }
      function zg(a2, b2) {
        return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
      }
      function Ag(a2, b2) {
        var c2 = a2.updateQueue;
        null !== c2 && (c2 = c2.shared, Bg(a2) ? (a2 = c2.interleaved, null === a2 ? (b2.next = b2, null === vg ? vg = [c2] : vg.push(c2)) : (b2.next = a2.next, a2.next = b2), c2.interleaved = b2) : (a2 = c2.pending, null === a2 ? b2.next = b2 : (b2.next = a2.next, a2.next = b2), c2.pending = b2));
      }
      function Cg(a2, b2, c2) {
        b2 = b2.updateQueue;
        if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
          var d2 = b2.lanes;
          d2 &= a2.pendingLanes;
          c2 |= d2;
          b2.lanes = c2;
          Bc(a2, c2);
        }
      }
      function Dg(a2, b2) {
        var c2 = a2.updateQueue, d2 = a2.alternate;
        if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
          var e2 = null, f2 = null;
          c2 = c2.firstBaseUpdate;
          if (null !== c2) {
            do {
              var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
              null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
              c2 = c2.next;
            } while (null !== c2);
            null === f2 ? e2 = f2 = b2 : f2 = f2.next = b2;
          } else
            e2 = f2 = b2;
          c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
          a2.updateQueue = c2;
          return;
        }
        a2 = c2.lastBaseUpdate;
        null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
        c2.lastBaseUpdate = b2;
      }
      function Eg(a2, b2, c2, d2) {
        var e2 = a2.updateQueue;
        wg = false;
        var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
        if (null !== h2) {
          e2.shared.pending = null;
          var k = h2, l2 = k.next;
          k.next = null;
          null === g2 ? f2 = l2 : g2.next = l2;
          g2 = k;
          var n2 = a2.alternate;
          null !== n2 && (n2 = n2.updateQueue, h2 = n2.lastBaseUpdate, h2 !== g2 && (null === h2 ? n2.firstBaseUpdate = l2 : h2.next = l2, n2.lastBaseUpdate = k));
        }
        if (null !== f2) {
          var u2 = e2.baseState;
          g2 = 0;
          n2 = l2 = k = null;
          h2 = f2;
          do {
            var q = h2.lane, y2 = h2.eventTime;
            if ((d2 & q) === q) {
              null !== n2 && (n2 = n2.next = {
                eventTime: y2,
                lane: 0,
                tag: h2.tag,
                payload: h2.payload,
                callback: h2.callback,
                next: null
              });
              a: {
                var m2 = a2, w2 = h2;
                q = b2;
                y2 = c2;
                switch (w2.tag) {
                  case 1:
                    m2 = w2.payload;
                    if ("function" === typeof m2) {
                      u2 = m2.call(y2, u2, q);
                      break a;
                    }
                    u2 = m2;
                    break a;
                  case 3:
                    m2.flags = m2.flags & -65537 | 128;
                  case 0:
                    m2 = w2.payload;
                    q = "function" === typeof m2 ? m2.call(y2, u2, q) : m2;
                    if (null === q || void 0 === q)
                      break a;
                    u2 = A({}, u2, q);
                    break a;
                  case 2:
                    wg = true;
                }
              }
              null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, q = e2.effects, null === q ? e2.effects = [h2] : q.push(h2));
            } else
              y2 = { eventTime: y2, lane: q, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === n2 ? (l2 = n2 = y2, k = u2) : n2 = n2.next = y2, g2 |= q;
            h2 = h2.next;
            if (null === h2)
              if (h2 = e2.shared.pending, null === h2)
                break;
              else
                q = h2, h2 = q.next, q.next = null, e2.lastBaseUpdate = q, e2.shared.pending = null;
          } while (1);
          null === n2 && (k = u2);
          e2.baseState = k;
          e2.firstBaseUpdate = l2;
          e2.lastBaseUpdate = n2;
          b2 = e2.shared.interleaved;
          if (null !== b2) {
            e2 = b2;
            do
              g2 |= e2.lane, e2 = e2.next;
            while (e2 !== b2);
          } else
            null === f2 && (e2.shared.lanes = 0);
          Fg |= g2;
          a2.lanes = g2;
          a2.memoizedState = u2;
        }
      }
      function Gg(a2, b2, c2) {
        a2 = b2.effects;
        b2.effects = null;
        if (null !== a2)
          for (b2 = 0; b2 < a2.length; b2++) {
            var d2 = a2[b2], e2 = d2.callback;
            if (null !== e2) {
              d2.callback = null;
              d2 = c2;
              if ("function" !== typeof e2)
                throw Error(p2(191, e2));
              e2.call(d2);
            }
          }
      }
      var Hg = new aa.Component().refs;
      function Ig(a2, b2, c2, d2) {
        b2 = a2.memoizedState;
        c2 = c2(d2, b2);
        c2 = null === c2 || void 0 === c2 ? b2 : A({}, b2, c2);
        a2.memoizedState = c2;
        0 === a2.lanes && (a2.updateQueue.baseState = c2);
      }
      var Mg = { isMounted: function(a2) {
        return (a2 = a2._reactInternals) ? Ub(a2) === a2 : false;
      }, enqueueSetState: function(a2, b2, c2) {
        a2 = a2._reactInternals;
        var d2 = Jg(), e2 = Kg(a2), f2 = zg(d2, e2);
        f2.payload = b2;
        void 0 !== c2 && null !== c2 && (f2.callback = c2);
        Ag(a2, f2);
        b2 = Lg(a2, e2, d2);
        null !== b2 && Cg(b2, a2, e2);
      }, enqueueReplaceState: function(a2, b2, c2) {
        a2 = a2._reactInternals;
        var d2 = Jg(), e2 = Kg(a2), f2 = zg(d2, e2);
        f2.tag = 1;
        f2.payload = b2;
        void 0 !== c2 && null !== c2 && (f2.callback = c2);
        Ag(a2, f2);
        b2 = Lg(a2, e2, d2);
        null !== b2 && Cg(b2, a2, e2);
      }, enqueueForceUpdate: function(a2, b2) {
        a2 = a2._reactInternals;
        var c2 = Jg(), d2 = Kg(a2), e2 = zg(
          c2,
          d2
        );
        e2.tag = 2;
        void 0 !== b2 && null !== b2 && (e2.callback = b2);
        Ag(a2, e2);
        b2 = Lg(a2, d2, c2);
        null !== b2 && Cg(b2, a2, d2);
      } };
      function Ng(a2, b2, c2, d2, e2, f2, g2) {
        a2 = a2.stateNode;
        return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !He(c2, d2) || !He(e2, f2) : true;
      }
      function Og(a2, b2, c2) {
        var d2 = false, e2 = Uf;
        var f2 = b2.contextType;
        "object" === typeof f2 && null !== f2 ? f2 = ug(f2) : (e2 = Yf(b2) ? Wf : H.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Xf(a2, e2) : Uf);
        b2 = new b2(c2, f2);
        a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
        b2.updater = Mg;
        a2.stateNode = b2;
        b2._reactInternals = a2;
        d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
        return b2;
      }
      function Pg(a2, b2, c2, d2) {
        a2 = b2.state;
        "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
        "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
        b2.state !== a2 && Mg.enqueueReplaceState(b2, b2.state, null);
      }
      function Qg(a2, b2, c2, d2) {
        var e2 = a2.stateNode;
        e2.props = c2;
        e2.state = a2.memoizedState;
        e2.refs = Hg;
        xg(a2);
        var f2 = b2.contextType;
        "object" === typeof f2 && null !== f2 ? e2.context = ug(f2) : (f2 = Yf(b2) ? Wf : H.current, e2.context = Xf(a2, f2));
        e2.state = a2.memoizedState;
        f2 = b2.getDerivedStateFromProps;
        "function" === typeof f2 && (Ig(a2, b2, f2, c2), e2.state = a2.memoizedState);
        "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b2 = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b2 !== e2.state && Mg.enqueueReplaceState(e2, e2.state, null), Eg(a2, c2, e2, d2), e2.state = a2.memoizedState);
        "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
      }
      var Rg = [];
      var Sg = 0;
      var Tg = null;
      var Ug = 0;
      var Vg = [];
      var Wg = 0;
      var Xg = null;
      var Yg = 1;
      var Zg = "";
      function $g(a2, b2) {
        Rg[Sg++] = Ug;
        Rg[Sg++] = Tg;
        Tg = a2;
        Ug = b2;
      }
      function ah(a2, b2, c2) {
        Vg[Wg++] = Yg;
        Vg[Wg++] = Zg;
        Vg[Wg++] = Xg;
        Xg = a2;
        var d2 = Yg;
        a2 = Zg;
        var e2 = 32 - nc(d2) - 1;
        d2 &= ~(1 << e2);
        c2 += 1;
        var f2 = 32 - nc(b2) + e2;
        if (30 < f2) {
          var g2 = e2 - e2 % 5;
          f2 = (d2 & (1 << g2) - 1).toString(32);
          d2 >>= g2;
          e2 -= g2;
          Yg = 1 << 32 - nc(b2) + e2 | c2 << e2 | d2;
          Zg = f2 + a2;
        } else
          Yg = 1 << f2 | c2 << e2 | d2, Zg = a2;
      }
      function bh(a2) {
        null !== a2.return && ($g(a2, 1), ah(a2, 1, 0));
      }
      function ch(a2) {
        for (; a2 === Tg; )
          Tg = Rg[--Sg], Rg[Sg] = null, Ug = Rg[--Sg], Rg[Sg] = null;
        for (; a2 === Xg; )
          Xg = Vg[--Wg], Vg[Wg] = null, Zg = Vg[--Wg], Vg[Wg] = null, Yg = Vg[--Wg], Vg[Wg] = null;
      }
      var dh = null;
      var eh = null;
      var I = false;
      var fh = null;
      function gh(a2, b2) {
        var c2 = hh(5, null, null, 0);
        c2.elementType = "DELETED";
        c2.stateNode = b2;
        c2.return = a2;
        b2 = a2.deletions;
        null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
      }
      function ih(a2, b2) {
        switch (a2.tag) {
          case 5:
            var c2 = a2.type;
            b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
            return null !== b2 ? (a2.stateNode = b2, dh = a2, eh = Kf(b2.firstChild), true) : false;
          case 6:
            return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, dh = a2, eh = null, true) : false;
          case 13:
            return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== Xg ? { id: Yg, overflow: Zg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = hh(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, dh = a2, eh = null, true) : false;
          default:
            return false;
        }
      }
      function jh(a2) {
        return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
      }
      function kh(a2) {
        if (I) {
          var b2 = eh;
          if (b2) {
            var c2 = b2;
            if (!ih(a2, b2)) {
              if (jh(a2))
                throw Error(p2(418));
              b2 = Kf(c2.nextSibling);
              var d2 = dh;
              b2 && ih(a2, b2) ? gh(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, dh = a2);
            }
          } else {
            if (jh(a2))
              throw Error(p2(418));
            a2.flags = a2.flags & -4097 | 2;
            I = false;
            dh = a2;
          }
        }
      }
      function lh(a2) {
        for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; )
          a2 = a2.return;
        dh = a2;
      }
      function mh(a2) {
        if (a2 !== dh)
          return false;
        if (!I)
          return lh(a2), I = true, false;
        var b2;
        (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Df(a2.type, a2.memoizedProps));
        if (b2 && (b2 = eh)) {
          if (jh(a2)) {
            for (a2 = eh; a2; )
              a2 = Kf(a2.nextSibling);
            throw Error(p2(418));
          }
          for (; b2; )
            gh(a2, b2), b2 = Kf(b2.nextSibling);
        }
        lh(a2);
        if (13 === a2.tag) {
          a2 = a2.memoizedState;
          a2 = null !== a2 ? a2.dehydrated : null;
          if (!a2)
            throw Error(p2(317));
          a: {
            a2 = a2.nextSibling;
            for (b2 = 0; a2; ) {
              if (8 === a2.nodeType) {
                var c2 = a2.data;
                if ("/$" === c2) {
                  if (0 === b2) {
                    eh = Kf(a2.nextSibling);
                    break a;
                  }
                  b2--;
                } else
                  "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
              }
              a2 = a2.nextSibling;
            }
            eh = null;
          }
        } else
          eh = dh ? Kf(a2.stateNode.nextSibling) : null;
        return true;
      }
      function nh() {
        eh = dh = null;
        I = false;
      }
      function oh(a2) {
        null === fh ? fh = [a2] : fh.push(a2);
      }
      function ph(a2, b2, c2) {
        a2 = c2.ref;
        if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
          if (c2._owner) {
            c2 = c2._owner;
            if (c2) {
              if (1 !== c2.tag)
                throw Error(p2(309));
              var d2 = c2.stateNode;
            }
            if (!d2)
              throw Error(p2(147, a2));
            var e2 = d2, f2 = "" + a2;
            if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2)
              return b2.ref;
            b2 = function(a3) {
              var b3 = e2.refs;
              b3 === Hg && (b3 = e2.refs = {});
              null === a3 ? delete b3[f2] : b3[f2] = a3;
            };
            b2._stringRef = f2;
            return b2;
          }
          if ("string" !== typeof a2)
            throw Error(p2(284));
          if (!c2._owner)
            throw Error(p2(290, a2));
        }
        return a2;
      }
      function qh(a2, b2) {
        a2 = Object.prototype.toString.call(b2);
        throw Error(p2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
      }
      function rh(a2) {
        var b2 = a2._init;
        return b2(a2._payload);
      }
      function sh(a2) {
        function b2(b3, c3) {
          if (a2) {
            var d3 = b3.deletions;
            null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
          }
        }
        function c2(c3, d3) {
          if (!a2)
            return null;
          for (; null !== d3; )
            b2(c3, d3), d3 = d3.sibling;
          return null;
        }
        function d2(a3, b3) {
          for (a3 = /* @__PURE__ */ new Map(); null !== b3; )
            null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
          return a3;
        }
        function e2(a3, b3) {
          a3 = th(a3, b3);
          a3.index = 0;
          a3.sibling = null;
          return a3;
        }
        function f2(b3, c3, d3) {
          b3.index = d3;
          if (!a2)
            return b3.flags |= 1048576, c3;
          d3 = b3.alternate;
          if (null !== d3)
            return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
          b3.flags |= 2;
          return c3;
        }
        function g2(b3) {
          a2 && null === b3.alternate && (b3.flags |= 2);
          return b3;
        }
        function h2(a3, b3, c3, d3) {
          if (null === b3 || 6 !== b3.tag)
            return b3 = uh(c3, a3.mode, d3), b3.return = a3, b3;
          b3 = e2(b3, c3);
          b3.return = a3;
          return b3;
        }
        function k(a3, b3, c3, d3) {
          var f3 = c3.type;
          if (f3 === wa)
            return n2(a3, b3, c3.props.children, d3, c3.key);
          if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ga && rh(f3) === b3.type))
            return d3 = e2(b3, c3.props), d3.ref = ph(a3, b3, c3), d3.return = a3, d3;
          d3 = vh(c3.type, c3.key, c3.props, null, a3.mode, d3);
          d3.ref = ph(a3, b3, c3);
          d3.return = a3;
          return d3;
        }
        function l2(a3, b3, c3, d3) {
          if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
            return b3 = wh(c3, a3.mode, d3), b3.return = a3, b3;
          b3 = e2(b3, c3.children || []);
          b3.return = a3;
          return b3;
        }
        function n2(a3, b3, c3, d3, f3) {
          if (null === b3 || 7 !== b3.tag)
            return b3 = xh(c3, a3.mode, d3, f3), b3.return = a3, b3;
          b3 = e2(b3, c3);
          b3.return = a3;
          return b3;
        }
        function u2(a3, b3, c3) {
          if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
            return b3 = uh("" + b3, a3.mode, c3), b3.return = a3, b3;
          if ("object" === typeof b3 && null !== b3) {
            switch (b3.$$typeof) {
              case ua:
                return c3 = vh(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = ph(a3, null, b3), c3.return = a3, c3;
              case va:
                return b3 = wh(b3, a3.mode, c3), b3.return = a3, b3;
              case Ga:
                var d3 = b3._init;
                return u2(a3, d3(b3._payload), c3);
            }
            if (db(b3) || Ja(b3))
              return b3 = xh(b3, a3.mode, c3, null), b3.return = a3, b3;
            qh(a3, b3);
          }
          return null;
        }
        function q(a3, b3, c3, d3) {
          var e3 = null !== b3 ? b3.key : null;
          if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
            return null !== e3 ? null : h2(a3, b3, "" + c3, d3);
          if ("object" === typeof c3 && null !== c3) {
            switch (c3.$$typeof) {
              case ua:
                return c3.key === e3 ? k(a3, b3, c3, d3) : null;
              case va:
                return c3.key === e3 ? l2(a3, b3, c3, d3) : null;
              case Ga:
                return e3 = c3._init, q(
                  a3,
                  b3,
                  e3(c3._payload),
                  d3
                );
            }
            if (db(c3) || Ja(c3))
              return null !== e3 ? null : n2(a3, b3, c3, d3, null);
            qh(a3, c3);
          }
          return null;
        }
        function y2(a3, b3, c3, d3, e3) {
          if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3)
            return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e3);
          if ("object" === typeof d3 && null !== d3) {
            switch (d3.$$typeof) {
              case ua:
                return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k(b3, a3, d3, e3);
              case va:
                return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a3, d3, e3);
              case Ga:
                var f3 = d3._init;
                return y2(a3, b3, c3, f3(d3._payload), e3);
            }
            if (db(d3) || Ja(d3))
              return a3 = a3.get(c3) || null, n2(b3, a3, d3, e3, null);
            qh(b3, d3);
          }
          return null;
        }
        function m2(e3, g3, h3, k2) {
          for (var l3 = null, n3 = null, r2 = g3, m3 = g3 = 0, x = null; null !== r2 && m3 < h3.length; m3++) {
            r2.index > m3 ? (x = r2, r2 = null) : x = r2.sibling;
            var v2 = q(e3, r2, h3[m3], k2);
            if (null === v2) {
              null === r2 && (r2 = x);
              break;
            }
            a2 && r2 && null === v2.alternate && b2(e3, r2);
            g3 = f2(v2, g3, m3);
            null === n3 ? l3 = v2 : n3.sibling = v2;
            n3 = v2;
            r2 = x;
          }
          if (m3 === h3.length)
            return c2(e3, r2), I && $g(e3, m3), l3;
          if (null === r2) {
            for (; m3 < h3.length; m3++)
              r2 = u2(e3, h3[m3], k2), null !== r2 && (g3 = f2(r2, g3, m3), null === n3 ? l3 = r2 : n3.sibling = r2, n3 = r2);
            I && $g(e3, m3);
            return l3;
          }
          for (r2 = d2(e3, r2); m3 < h3.length; m3++)
            x = y2(r2, e3, m3, h3[m3], k2), null !== x && (a2 && null !== x.alternate && r2.delete(null === x.key ? m3 : x.key), g3 = f2(x, g3, m3), null === n3 ? l3 = x : n3.sibling = x, n3 = x);
          a2 && r2.forEach(function(a3) {
            return b2(e3, a3);
          });
          I && $g(e3, m3);
          return l3;
        }
        function w2(e3, g3, h3, k2) {
          var l3 = Ja(h3);
          if ("function" !== typeof l3)
            throw Error(p2(150));
          h3 = l3.call(h3);
          if (null == h3)
            throw Error(p2(151));
          for (var n3 = l3 = null, m3 = g3, r2 = g3 = 0, x = null, v2 = h3.next(); null !== m3 && !v2.done; r2++, v2 = h3.next()) {
            m3.index > r2 ? (x = m3, m3 = null) : x = m3.sibling;
            var w3 = q(e3, m3, v2.value, k2);
            if (null === w3) {
              null === m3 && (m3 = x);
              break;
            }
            a2 && m3 && null === w3.alternate && b2(e3, m3);
            g3 = f2(w3, g3, r2);
            null === n3 ? l3 = w3 : n3.sibling = w3;
            n3 = w3;
            m3 = x;
          }
          if (v2.done)
            return c2(
              e3,
              m3
            ), I && $g(e3, r2), l3;
          if (null === m3) {
            for (; !v2.done; r2++, v2 = h3.next())
              v2 = u2(e3, v2.value, k2), null !== v2 && (g3 = f2(v2, g3, r2), null === n3 ? l3 = v2 : n3.sibling = v2, n3 = v2);
            I && $g(e3, r2);
            return l3;
          }
          for (m3 = d2(e3, m3); !v2.done; r2++, v2 = h3.next())
            v2 = y2(m3, e3, r2, v2.value, k2), null !== v2 && (a2 && null !== v2.alternate && m3.delete(null === v2.key ? r2 : v2.key), g3 = f2(v2, g3, r2), null === n3 ? l3 = v2 : n3.sibling = v2, n3 = v2);
          a2 && m3.forEach(function(a3) {
            return b2(e3, a3);
          });
          I && $g(e3, r2);
          return l3;
        }
        function J(a3, d3, f3, h3) {
          "object" === typeof f3 && null !== f3 && f3.type === wa && null === f3.key && (f3 = f3.props.children);
          if ("object" === typeof f3 && null !== f3) {
            switch (f3.$$typeof) {
              case ua:
                a: {
                  for (var k2 = f3.key, l3 = d3; null !== l3; ) {
                    if (l3.key === k2) {
                      k2 = f3.type;
                      if (k2 === wa) {
                        if (7 === l3.tag) {
                          c2(a3, l3.sibling);
                          d3 = e2(l3, f3.props.children);
                          d3.return = a3;
                          a3 = d3;
                          break a;
                        }
                      } else if (l3.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ga && rh(k2) === l3.type) {
                        c2(a3, l3.sibling);
                        d3 = e2(l3, f3.props);
                        d3.ref = ph(a3, l3, f3);
                        d3.return = a3;
                        a3 = d3;
                        break a;
                      }
                      c2(a3, l3);
                      break;
                    } else
                      b2(a3, l3);
                    l3 = l3.sibling;
                  }
                  f3.type === wa ? (d3 = xh(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = vh(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = ph(a3, d3, f3), h3.return = a3, a3 = h3);
                }
                return g2(a3);
              case va:
                a: {
                  for (l3 = f3.key; null !== d3; ) {
                    if (d3.key === l3)
                      if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                        c2(a3, d3.sibling);
                        d3 = e2(d3, f3.children || []);
                        d3.return = a3;
                        a3 = d3;
                        break a;
                      } else {
                        c2(a3, d3);
                        break;
                      }
                    else
                      b2(a3, d3);
                    d3 = d3.sibling;
                  }
                  d3 = wh(f3, a3.mode, h3);
                  d3.return = a3;
                  a3 = d3;
                }
                return g2(a3);
              case Ga:
                return l3 = f3._init, J(a3, d3, l3(f3._payload), h3);
            }
            if (db(f3))
              return m2(a3, d3, f3, h3);
            if (Ja(f3))
              return w2(a3, d3, f3, h3);
            qh(a3, f3);
          }
          return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = uh(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
        }
        return J;
      }
      var yh = sh(true);
      var zh = sh(false);
      var Ah = {};
      var Bh = Tf(Ah);
      var Ch = Tf(Ah);
      var Dh = Tf(Ah);
      function Eh(a2) {
        if (a2 === Ah)
          throw Error(p2(174));
        return a2;
      }
      function Fh(a2, b2) {
        G(Dh, b2);
        G(Ch, a2);
        G(Bh, Ah);
        a2 = b2.nodeType;
        switch (a2) {
          case 9:
          case 11:
            b2 = (b2 = b2.documentElement) ? b2.namespaceURI : kb(null, "");
            break;
          default:
            a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = kb(b2, a2);
        }
        E2(Bh);
        G(Bh, b2);
      }
      function Gh() {
        E2(Bh);
        E2(Ch);
        E2(Dh);
      }
      function Hh(a2) {
        Eh(Dh.current);
        var b2 = Eh(Bh.current);
        var c2 = kb(b2, a2.type);
        b2 !== c2 && (G(Ch, a2), G(Bh, c2));
      }
      function Ih(a2) {
        Ch.current === a2 && (E2(Bh), E2(Ch));
      }
      var K = Tf(0);
      function Jh(a2) {
        for (var b2 = a2; null !== b2; ) {
          if (13 === b2.tag) {
            var c2 = b2.memoizedState;
            if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
              return b2;
          } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
            if (0 !== (b2.flags & 128))
              return b2;
          } else if (null !== b2.child) {
            b2.child.return = b2;
            b2 = b2.child;
            continue;
          }
          if (b2 === a2)
            break;
          for (; null === b2.sibling; ) {
            if (null === b2.return || b2.return === a2)
              return null;
            b2 = b2.return;
          }
          b2.sibling.return = b2.return;
          b2 = b2.sibling;
        }
        return null;
      }
      var Kh = [];
      function Lh() {
        for (var a2 = 0; a2 < Kh.length; a2++)
          Kh[a2]._workInProgressVersionPrimary = null;
        Kh.length = 0;
      }
      var Mh = ta.ReactCurrentDispatcher;
      var Nh = ta.ReactCurrentBatchConfig;
      var Oh = 0;
      var L2 = null;
      var M = null;
      var N = null;
      var Ph = false;
      var Qh = false;
      var Rh = 0;
      var Sh = 0;
      function O() {
        throw Error(p2(321));
      }
      function Th(a2, b2) {
        if (null === b2)
          return false;
        for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
          if (!Ge(a2[c2], b2[c2]))
            return false;
        return true;
      }
      function Uh(a2, b2, c2, d2, e2, f2) {
        Oh = f2;
        L2 = b2;
        b2.memoizedState = null;
        b2.updateQueue = null;
        b2.lanes = 0;
        Mh.current = null === a2 || null === a2.memoizedState ? Vh : Wh;
        a2 = c2(d2, e2);
        if (Qh) {
          f2 = 0;
          do {
            Qh = false;
            Rh = 0;
            if (25 <= f2)
              throw Error(p2(301));
            f2 += 1;
            N = M = null;
            b2.updateQueue = null;
            Mh.current = Xh;
            a2 = c2(d2, e2);
          } while (Qh);
        }
        Mh.current = Yh;
        b2 = null !== M && null !== M.next;
        Oh = 0;
        N = M = L2 = null;
        Ph = false;
        if (b2)
          throw Error(p2(300));
        return a2;
      }
      function Zh() {
        var a2 = 0 !== Rh;
        Rh = 0;
        return a2;
      }
      function $h() {
        var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === N ? L2.memoizedState = N = a2 : N = N.next = a2;
        return N;
      }
      function ai() {
        if (null === M) {
          var a2 = L2.alternate;
          a2 = null !== a2 ? a2.memoizedState : null;
        } else
          a2 = M.next;
        var b2 = null === N ? L2.memoizedState : N.next;
        if (null !== b2)
          N = b2, M = a2;
        else {
          if (null === a2)
            throw Error(p2(310));
          M = a2;
          a2 = { memoizedState: M.memoizedState, baseState: M.baseState, baseQueue: M.baseQueue, queue: M.queue, next: null };
          null === N ? L2.memoizedState = N = a2 : N = N.next = a2;
        }
        return N;
      }
      function bi(a2, b2) {
        return "function" === typeof b2 ? b2(a2) : b2;
      }
      function ci(a2) {
        var b2 = ai(), c2 = b2.queue;
        if (null === c2)
          throw Error(p2(311));
        c2.lastRenderedReducer = a2;
        var d2 = M, e2 = d2.baseQueue, f2 = c2.pending;
        if (null !== f2) {
          if (null !== e2) {
            var g2 = e2.next;
            e2.next = f2.next;
            f2.next = g2;
          }
          d2.baseQueue = e2 = f2;
          c2.pending = null;
        }
        if (null !== e2) {
          f2 = e2.next;
          d2 = d2.baseState;
          var h2 = g2 = null, k = null, l2 = f2;
          do {
            var n2 = l2.lane;
            if ((Oh & n2) === n2)
              null !== k && (k = k.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
            else {
              var u2 = {
                lane: n2,
                action: l2.action,
                hasEagerState: l2.hasEagerState,
                eagerState: l2.eagerState,
                next: null
              };
              null === k ? (h2 = k = u2, g2 = d2) : k = k.next = u2;
              L2.lanes |= n2;
              Fg |= n2;
            }
            l2 = l2.next;
          } while (null !== l2 && l2 !== f2);
          null === k ? g2 = d2 : k.next = h2;
          Ge(d2, b2.memoizedState) || (tg = true);
          b2.memoizedState = d2;
          b2.baseState = g2;
          b2.baseQueue = k;
          c2.lastRenderedState = d2;
        }
        a2 = c2.interleaved;
        if (null !== a2) {
          e2 = a2;
          do
            f2 = e2.lane, L2.lanes |= f2, Fg |= f2, e2 = e2.next;
          while (e2 !== a2);
        } else
          null === e2 && (c2.lanes = 0);
        return [b2.memoizedState, c2.dispatch];
      }
      function di(a2) {
        var b2 = ai(), c2 = b2.queue;
        if (null === c2)
          throw Error(p2(311));
        c2.lastRenderedReducer = a2;
        var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
        if (null !== e2) {
          c2.pending = null;
          var g2 = e2 = e2.next;
          do
            f2 = a2(f2, g2.action), g2 = g2.next;
          while (g2 !== e2);
          Ge(f2, b2.memoizedState) || (tg = true);
          b2.memoizedState = f2;
          null === b2.baseQueue && (b2.baseState = f2);
          c2.lastRenderedState = f2;
        }
        return [f2, d2];
      }
      function ei() {
      }
      function fi(a2, b2) {
        var c2 = L2, d2 = ai(), e2 = b2(), f2 = !Ge(d2.memoizedState, e2);
        f2 && (d2.memoizedState = e2, tg = true);
        d2 = d2.queue;
        gi(hi.bind(null, c2, d2, a2), [a2]);
        if (d2.getSnapshot !== b2 || f2 || null !== N && N.memoizedState.tag & 1) {
          c2.flags |= 2048;
          ii(9, ji.bind(null, c2, d2, e2, b2), void 0, null);
          if (null === P2)
            throw Error(p2(349));
          0 !== (Oh & 30) || ki(c2, b2, e2);
        }
        return e2;
      }
      function ki(a2, b2, c2) {
        a2.flags |= 16384;
        a2 = { getSnapshot: b2, value: c2 };
        b2 = L2.updateQueue;
        null === b2 ? (b2 = { lastEffect: null, stores: null }, L2.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
      }
      function ji(a2, b2, c2, d2) {
        b2.value = c2;
        b2.getSnapshot = d2;
        li(b2) && Lg(a2, 1, -1);
      }
      function hi(a2, b2, c2) {
        return c2(function() {
          li(b2) && Lg(a2, 1, -1);
        });
      }
      function li(a2) {
        var b2 = a2.getSnapshot;
        a2 = a2.value;
        try {
          var c2 = b2();
          return !Ge(a2, c2);
        } catch (d2) {
          return true;
        }
      }
      function mi(a2) {
        var b2 = $h();
        "function" === typeof a2 && (a2 = a2());
        b2.memoizedState = b2.baseState = a2;
        a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: bi, lastRenderedState: a2 };
        b2.queue = a2;
        a2 = a2.dispatch = ni.bind(null, L2, a2);
        return [b2.memoizedState, a2];
      }
      function ii(a2, b2, c2, d2) {
        a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
        b2 = L2.updateQueue;
        null === b2 ? (b2 = { lastEffect: null, stores: null }, L2.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
        return a2;
      }
      function oi() {
        return ai().memoizedState;
      }
      function pi(a2, b2, c2, d2) {
        var e2 = $h();
        L2.flags |= a2;
        e2.memoizedState = ii(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
      }
      function qi(a2, b2, c2, d2) {
        var e2 = ai();
        d2 = void 0 === d2 ? null : d2;
        var f2 = void 0;
        if (null !== M) {
          var g2 = M.memoizedState;
          f2 = g2.destroy;
          if (null !== d2 && Th(d2, g2.deps)) {
            e2.memoizedState = ii(b2, c2, f2, d2);
            return;
          }
        }
        L2.flags |= a2;
        e2.memoizedState = ii(1 | b2, c2, f2, d2);
      }
      function ri(a2, b2) {
        return pi(8390656, 8, a2, b2);
      }
      function gi(a2, b2) {
        return qi(2048, 8, a2, b2);
      }
      function si(a2, b2) {
        return qi(4, 2, a2, b2);
      }
      function ti(a2, b2) {
        return qi(4, 4, a2, b2);
      }
      function ui(a2, b2) {
        if ("function" === typeof b2)
          return a2 = a2(), b2(a2), function() {
            b2(null);
          };
        if (null !== b2 && void 0 !== b2)
          return a2 = a2(), b2.current = a2, function() {
            b2.current = null;
          };
      }
      function vi(a2, b2, c2) {
        c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
        return qi(4, 4, ui.bind(null, b2, a2), c2);
      }
      function wi() {
      }
      function xi(a2, b2) {
        var c2 = ai();
        b2 = void 0 === b2 ? null : b2;
        var d2 = c2.memoizedState;
        if (null !== d2 && null !== b2 && Th(b2, d2[1]))
          return d2[0];
        c2.memoizedState = [a2, b2];
        return a2;
      }
      function yi(a2, b2) {
        var c2 = ai();
        b2 = void 0 === b2 ? null : b2;
        var d2 = c2.memoizedState;
        if (null !== d2 && null !== b2 && Th(b2, d2[1]))
          return d2[0];
        a2 = a2();
        c2.memoizedState = [a2, b2];
        return a2;
      }
      function zi(a2, b2, c2) {
        if (0 === (Oh & 21))
          return a2.baseState && (a2.baseState = false, tg = true), a2.memoizedState = c2;
        Ge(c2, b2) || (c2 = xc(), L2.lanes |= c2, Fg |= c2, a2.baseState = true);
        return b2;
      }
      function Ai(a2, b2) {
        var c2 = C;
        C = 0 !== c2 && 4 > c2 ? c2 : 4;
        a2(true);
        var d2 = Nh.transition;
        Nh.transition = {};
        try {
          a2(false), b2();
        } finally {
          C = c2, Nh.transition = d2;
        }
      }
      function Bi() {
        return ai().memoizedState;
      }
      function Ci(a2, b2, c2) {
        var d2 = Kg(a2);
        c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
        Di(a2) ? Ei(b2, c2) : (Fi(a2, b2, c2), c2 = Jg(), a2 = Lg(a2, d2, c2), null !== a2 && Gi(a2, b2, d2));
      }
      function ni(a2, b2, c2) {
        var d2 = Kg(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
        if (Di(a2))
          Ei(b2, e2);
        else {
          Fi(a2, b2, e2);
          var f2 = a2.alternate;
          if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2))
            try {
              var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
              e2.hasEagerState = true;
              e2.eagerState = h2;
              if (Ge(h2, g2))
                return;
            } catch (k) {
            } finally {
            }
          c2 = Jg();
          a2 = Lg(a2, d2, c2);
          null !== a2 && Gi(a2, b2, d2);
        }
      }
      function Di(a2) {
        var b2 = a2.alternate;
        return a2 === L2 || null !== b2 && b2 === L2;
      }
      function Ei(a2, b2) {
        Qh = Ph = true;
        var c2 = a2.pending;
        null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
        a2.pending = b2;
      }
      function Fi(a2, b2, c2) {
        Bg(a2) ? (a2 = b2.interleaved, null === a2 ? (c2.next = c2, null === vg ? vg = [b2] : vg.push(b2)) : (c2.next = a2.next, a2.next = c2), b2.interleaved = c2) : (a2 = b2.pending, null === a2 ? c2.next = c2 : (c2.next = a2.next, a2.next = c2), b2.pending = c2);
      }
      function Gi(a2, b2, c2) {
        if (0 !== (c2 & 4194240)) {
          var d2 = b2.lanes;
          d2 &= a2.pendingLanes;
          c2 |= d2;
          b2.lanes = c2;
          Bc(a2, c2);
        }
      }
      var Yh = { readContext: ug, useCallback: O, useContext: O, useEffect: O, useImperativeHandle: O, useInsertionEffect: O, useLayoutEffect: O, useMemo: O, useReducer: O, useRef: O, useState: O, useDebugValue: O, useDeferredValue: O, useTransition: O, useMutableSource: O, useSyncExternalStore: O, useId: O, unstable_isNewReconciler: false };
      var Vh = { readContext: ug, useCallback: function(a2, b2) {
        $h().memoizedState = [a2, void 0 === b2 ? null : b2];
        return a2;
      }, useContext: ug, useEffect: ri, useImperativeHandle: function(a2, b2, c2) {
        c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
        return pi(
          4194308,
          4,
          ui.bind(null, b2, a2),
          c2
        );
      }, useLayoutEffect: function(a2, b2) {
        return pi(4194308, 4, a2, b2);
      }, useInsertionEffect: function(a2, b2) {
        return pi(4, 2, a2, b2);
      }, useMemo: function(a2, b2) {
        var c2 = $h();
        b2 = void 0 === b2 ? null : b2;
        a2 = a2();
        c2.memoizedState = [a2, b2];
        return a2;
      }, useReducer: function(a2, b2, c2) {
        var d2 = $h();
        b2 = void 0 !== c2 ? c2(b2) : b2;
        d2.memoizedState = d2.baseState = b2;
        a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
        d2.queue = a2;
        a2 = a2.dispatch = Ci.bind(null, L2, a2);
        return [d2.memoizedState, a2];
      }, useRef: function(a2) {
        var b2 = $h();
        a2 = { current: a2 };
        return b2.memoizedState = a2;
      }, useState: mi, useDebugValue: wi, useDeferredValue: function(a2) {
        return $h().memoizedState = a2;
      }, useTransition: function() {
        var a2 = mi(false), b2 = a2[0];
        a2 = Ai.bind(null, a2[1]);
        $h().memoizedState = a2;
        return [b2, a2];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a2, b2, c2) {
        var d2 = L2, e2 = $h();
        if (I) {
          if (void 0 === c2)
            throw Error(p2(407));
          c2 = c2();
        } else {
          c2 = b2();
          if (null === P2)
            throw Error(p2(349));
          0 !== (Oh & 30) || ki(d2, b2, c2);
        }
        e2.memoizedState = c2;
        var f2 = { value: c2, getSnapshot: b2 };
        e2.queue = f2;
        ri(hi.bind(
          null,
          d2,
          f2,
          a2
        ), [a2]);
        d2.flags |= 2048;
        ii(9, ji.bind(null, d2, f2, c2, b2), void 0, null);
        return c2;
      }, useId: function() {
        var a2 = $h(), b2 = P2.identifierPrefix;
        if (I) {
          var c2 = Zg;
          var d2 = Yg;
          c2 = (d2 & ~(1 << 32 - nc(d2) - 1)).toString(32) + c2;
          b2 = ":" + b2 + "R" + c2;
          c2 = Rh++;
          0 < c2 && (b2 += "H" + c2.toString(32));
          b2 += ":";
        } else
          c2 = Sh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
        return a2.memoizedState = b2;
      }, unstable_isNewReconciler: false };
      var Wh = {
        readContext: ug,
        useCallback: xi,
        useContext: ug,
        useEffect: gi,
        useImperativeHandle: vi,
        useInsertionEffect: si,
        useLayoutEffect: ti,
        useMemo: yi,
        useReducer: ci,
        useRef: oi,
        useState: function() {
          return ci(bi);
        },
        useDebugValue: wi,
        useDeferredValue: function(a2) {
          var b2 = ai();
          return zi(b2, M.memoizedState, a2);
        },
        useTransition: function() {
          var a2 = ci(bi)[0], b2 = ai().memoizedState;
          return [a2, b2];
        },
        useMutableSource: ei,
        useSyncExternalStore: fi,
        useId: Bi,
        unstable_isNewReconciler: false
      };
      var Xh = { readContext: ug, useCallback: xi, useContext: ug, useEffect: gi, useImperativeHandle: vi, useInsertionEffect: si, useLayoutEffect: ti, useMemo: yi, useReducer: di, useRef: oi, useState: function() {
        return di(bi);
      }, useDebugValue: wi, useDeferredValue: function(a2) {
        var b2 = ai();
        return null === M ? b2.memoizedState = a2 : zi(b2, M.memoizedState, a2);
      }, useTransition: function() {
        var a2 = di(bi)[0], b2 = ai().memoizedState;
        return [a2, b2];
      }, useMutableSource: ei, useSyncExternalStore: fi, useId: Bi, unstable_isNewReconciler: false };
      function Hi(a2, b2) {
        try {
          var c2 = "", d2 = b2;
          do
            c2 += Oa(d2), d2 = d2.return;
          while (d2);
          var e2 = c2;
        } catch (f2) {
          e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
        }
        return { value: a2, source: b2, stack: e2 };
      }
      function Ii(a2, b2) {
        try {
          console.error(b2.value);
        } catch (c2) {
          setTimeout(function() {
            throw c2;
          });
        }
      }
      var Ji = "function" === typeof WeakMap ? WeakMap : Map;
      function Ki(a2, b2, c2) {
        c2 = zg(-1, c2);
        c2.tag = 3;
        c2.payload = { element: null };
        var d2 = b2.value;
        c2.callback = function() {
          Li || (Li = true, Mi = d2);
          Ii(a2, b2);
        };
        return c2;
      }
      function Ni(a2, b2, c2) {
        c2 = zg(-1, c2);
        c2.tag = 3;
        var d2 = a2.type.getDerivedStateFromError;
        if ("function" === typeof d2) {
          var e2 = b2.value;
          c2.payload = function() {
            return d2(e2);
          };
          c2.callback = function() {
            Ii(a2, b2);
          };
        }
        var f2 = a2.stateNode;
        null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
          Ii(a2, b2);
          "function" !== typeof d2 && (null === Oi ? Oi = /* @__PURE__ */ new Set([this]) : Oi.add(this));
          var c3 = b2.stack;
          this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
        });
        return c2;
      }
      function Pi(a2, b2, c2) {
        var d2 = a2.pingCache;
        if (null === d2) {
          d2 = a2.pingCache = new Ji();
          var e2 = /* @__PURE__ */ new Set();
          d2.set(b2, e2);
        } else
          e2 = d2.get(b2), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
        e2.has(c2) || (e2.add(c2), a2 = Qi.bind(null, a2, b2, c2), b2.then(a2, a2));
      }
      function Ri(a2) {
        do {
          var b2;
          if (b2 = 13 === a2.tag)
            b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
          if (b2)
            return a2;
          a2 = a2.return;
        } while (null !== a2);
        return null;
      }
      function Si(a2, b2, c2, d2, e2) {
        if (0 === (a2.mode & 1))
          return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = zg(-1, 1), b2.tag = 2, Ag(c2, b2))), c2.lanes |= 1), a2;
        a2.flags |= 65536;
        a2.lanes = e2;
        return a2;
      }
      var Ti;
      var Ui;
      var Vi;
      var Wi;
      Ti = function(a2, b2) {
        for (var c2 = b2.child; null !== c2; ) {
          if (5 === c2.tag || 6 === c2.tag)
            a2.appendChild(c2.stateNode);
          else if (4 !== c2.tag && null !== c2.child) {
            c2.child.return = c2;
            c2 = c2.child;
            continue;
          }
          if (c2 === b2)
            break;
          for (; null === c2.sibling; ) {
            if (null === c2.return || c2.return === b2)
              return;
            c2 = c2.return;
          }
          c2.sibling.return = c2.return;
          c2 = c2.sibling;
        }
      };
      Ui = function() {
      };
      Vi = function(a2, b2, c2, d2) {
        var e2 = a2.memoizedProps;
        if (e2 !== d2) {
          a2 = b2.stateNode;
          Eh(Bh.current);
          var f2 = null;
          switch (c2) {
            case "input":
              e2 = Xa(a2, e2);
              d2 = Xa(a2, d2);
              f2 = [];
              break;
            case "select":
              e2 = A({}, e2, { value: void 0 });
              d2 = A({}, d2, { value: void 0 });
              f2 = [];
              break;
            case "textarea":
              e2 = fb(a2, e2);
              d2 = fb(a2, d2);
              f2 = [];
              break;
            default:
              "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a2.onclick = Af);
          }
          tb(c2, d2);
          var g2;
          c2 = null;
          for (l2 in e2)
            if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2])
              if ("style" === l2) {
                var h2 = e2[l2];
                for (g2 in h2)
                  h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
              } else
                "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
          for (l2 in d2) {
            var k = d2[l2];
            h2 = null != e2 ? e2[l2] : void 0;
            if (d2.hasOwnProperty(l2) && k !== h2 && (null != k || null != h2))
              if ("style" === l2)
                if (h2) {
                  for (g2 in h2)
                    !h2.hasOwnProperty(g2) || k && k.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
                  for (g2 in k)
                    k.hasOwnProperty(g2) && h2[g2] !== k[g2] && (c2 || (c2 = {}), c2[g2] = k[g2]);
                } else
                  c2 || (f2 || (f2 = []), f2.push(
                    l2,
                    c2
                  )), c2 = k;
              else
                "dangerouslySetInnerHTML" === l2 ? (k = k ? k.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k && h2 !== k && (f2 = f2 || []).push(l2, k)) : "children" === l2 ? "string" !== typeof k && "number" !== typeof k || (f2 = f2 || []).push(l2, "" + k) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k && "onScroll" === l2 && D("scroll", a2), f2 || h2 === k || (f2 = [])) : (f2 = f2 || []).push(l2, k));
          }
          c2 && (f2 = f2 || []).push("style", c2);
          var l2 = f2;
          if (b2.updateQueue = l2)
            b2.flags |= 4;
        }
      };
      Wi = function(a2, b2, c2, d2) {
        c2 !== d2 && (b2.flags |= 4);
      };
      function Xi(a2, b2) {
        if (!I)
          switch (a2.tailMode) {
            case "hidden":
              b2 = a2.tail;
              for (var c2 = null; null !== b2; )
                null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
              null === c2 ? a2.tail = null : c2.sibling = null;
              break;
            case "collapsed":
              c2 = a2.tail;
              for (var d2 = null; null !== c2; )
                null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
              null === d2 ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
          }
      }
      function Q(a2) {
        var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
        if (b2)
          for (var e2 = a2.child; null !== e2; )
            c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
        else
          for (e2 = a2.child; null !== e2; )
            c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
        a2.subtreeFlags |= d2;
        a2.childLanes = c2;
        return b2;
      }
      function Yi(a2, b2, c2) {
        var d2 = b2.pendingProps;
        ch(b2);
        switch (b2.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return Q(b2), null;
          case 1:
            return Yf(b2.type) && Zf(), Q(b2), null;
          case 3:
            d2 = b2.stateNode;
            Gh();
            E2(Vf);
            E2(H);
            Lh();
            d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
            if (null === a2 || null === a2.child)
              mh(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== fh && (Zi(fh), fh = null));
            Ui(a2, b2);
            Q(b2);
            return null;
          case 5:
            Ih(b2);
            var e2 = Eh(Dh.current);
            c2 = b2.type;
            if (null !== a2 && null != b2.stateNode)
              Vi(a2, b2, c2, d2, e2), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
            else {
              if (!d2) {
                if (null === b2.stateNode)
                  throw Error(p2(166));
                Q(b2);
                return null;
              }
              a2 = Eh(Bh.current);
              if (mh(b2)) {
                d2 = b2.stateNode;
                c2 = b2.type;
                var f2 = b2.memoizedProps;
                d2[Nf] = b2;
                d2[Of] = f2;
                a2 = 0 !== (b2.mode & 1);
                switch (c2) {
                  case "dialog":
                    D("cancel", d2);
                    D("close", d2);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d2);
                    break;
                  case "video":
                  case "audio":
                    for (e2 = 0; e2 < kf.length; e2++)
                      D(kf[e2], d2);
                    break;
                  case "source":
                    D("error", d2);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d2
                    );
                    D("load", d2);
                    break;
                  case "details":
                    D("toggle", d2);
                    break;
                  case "input":
                    Ya(d2, f2);
                    D("invalid", d2);
                    break;
                  case "select":
                    d2._wrapperState = { wasMultiple: !!f2.multiple };
                    D("invalid", d2);
                    break;
                  case "textarea":
                    gb(d2, f2), D("invalid", d2);
                }
                tb(c2, f2);
                e2 = null;
                for (var g2 in f2)
                  if (f2.hasOwnProperty(g2)) {
                    var h2 = f2[g2];
                    "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && zf(d2.textContent, h2, a2), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && zf(
                      d2.textContent,
                      h2,
                      a2
                    ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D("scroll", d2);
                  }
                switch (c2) {
                  case "input":
                    Ua(d2);
                    cb(d2, f2, true);
                    break;
                  case "textarea":
                    Ua(d2);
                    ib(d2);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f2.onClick && (d2.onclick = Af);
                }
                d2 = e2;
                b2.updateQueue = d2;
                null !== d2 && (b2.flags |= 4);
              } else {
                g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a2 && (a2 = jb(c2));
                "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
                a2[Nf] = b2;
                a2[Of] = d2;
                Ti(a2, b2, false, false);
                b2.stateNode = a2;
                a: {
                  g2 = ub(c2, d2);
                  switch (c2) {
                    case "dialog":
                      D("cancel", a2);
                      D("close", a2);
                      e2 = d2;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a2);
                      e2 = d2;
                      break;
                    case "video":
                    case "audio":
                      for (e2 = 0; e2 < kf.length; e2++)
                        D(kf[e2], a2);
                      e2 = d2;
                      break;
                    case "source":
                      D("error", a2);
                      e2 = d2;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a2
                      );
                      D("load", a2);
                      e2 = d2;
                      break;
                    case "details":
                      D("toggle", a2);
                      e2 = d2;
                      break;
                    case "input":
                      Ya(a2, d2);
                      e2 = Xa(a2, d2);
                      D("invalid", a2);
                      break;
                    case "option":
                      e2 = d2;
                      break;
                    case "select":
                      a2._wrapperState = { wasMultiple: !!d2.multiple };
                      e2 = A({}, d2, { value: void 0 });
                      D("invalid", a2);
                      break;
                    case "textarea":
                      gb(a2, d2);
                      e2 = fb(a2, d2);
                      D("invalid", a2);
                      break;
                    default:
                      e2 = d2;
                  }
                  tb(c2, e2);
                  h2 = e2;
                  for (f2 in h2)
                    if (h2.hasOwnProperty(f2)) {
                      var k = h2[f2];
                      "style" === f2 ? rb(a2, k) : "dangerouslySetInnerHTML" === f2 ? (k = k ? k.__html : void 0, null != k && mb(a2, k)) : "children" === f2 ? "string" === typeof k ? ("textarea" !== c2 || "" !== k) && nb(a2, k) : "number" === typeof k && nb(a2, "" + k) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k && "onScroll" === f2 && D("scroll", a2) : null != k && sa(a2, f2, k, g2));
                    }
                  switch (c2) {
                    case "input":
                      Ua(a2);
                      cb(a2, d2, false);
                      break;
                    case "textarea":
                      Ua(a2);
                      ib(a2);
                      break;
                    case "option":
                      null != d2.value && a2.setAttribute("value", "" + Ra(d2.value));
                      break;
                    case "select":
                      a2.multiple = !!d2.multiple;
                      f2 = d2.value;
                      null != f2 ? eb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && eb(
                        a2,
                        !!d2.multiple,
                        d2.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e2.onClick && (a2.onclick = Af);
                  }
                  switch (c2) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d2 = !!d2.autoFocus;
                      break a;
                    case "img":
                      d2 = true;
                      break a;
                    default:
                      d2 = false;
                  }
                }
                d2 && (b2.flags |= 4);
              }
              null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
            }
            Q(b2);
            return null;
          case 6:
            if (a2 && null != b2.stateNode)
              Wi(a2, b2, a2.memoizedProps, d2);
            else {
              if ("string" !== typeof d2 && null === b2.stateNode)
                throw Error(p2(166));
              c2 = Eh(Dh.current);
              Eh(Bh.current);
              if (mh(b2)) {
                d2 = b2.stateNode;
                c2 = b2.memoizedProps;
                d2[Nf] = b2;
                if (f2 = d2.nodeValue !== c2) {
                  if (a2 = dh, null !== a2)
                    switch (a2.tag) {
                      case 3:
                        zf(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                        break;
                      case 5:
                        true !== a2.memoizedProps.suppressHydrationWarning && zf(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                    }
                }
                f2 && (b2.flags |= 4);
              } else
                d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Nf] = b2, b2.stateNode = d2;
            }
            Q(b2);
            return null;
          case 13:
            E2(K);
            d2 = b2.memoizedState;
            if (I && null !== eh && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128)) {
              for (d2 = eh; d2; )
                d2 = Kf(d2.nextSibling);
              nh();
              b2.flags |= 98560;
              return b2;
            }
            if (null !== d2 && null !== d2.dehydrated) {
              d2 = mh(b2);
              if (null === a2) {
                if (!d2)
                  throw Error(p2(318));
                d2 = b2.memoizedState;
                d2 = null !== d2 ? d2.dehydrated : null;
                if (!d2)
                  throw Error(p2(317));
                d2[Nf] = b2;
              } else
                nh(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
              Q(b2);
              return null;
            }
            null !== fh && (Zi(fh), fh = null);
            if (0 !== (b2.flags & 128))
              return b2.lanes = c2, b2;
            d2 = null !== d2;
            c2 = false;
            null === a2 ? mh(b2) : c2 = null !== a2.memoizedState;
            d2 !== c2 && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (K.current & 1) ? 0 === R && (R = 3) : $i()));
            null !== b2.updateQueue && (b2.flags |= 4);
            Q(b2);
            return null;
          case 4:
            return Gh(), Ui(a2, b2), null === a2 && rf(b2.stateNode.containerInfo), Q(b2), null;
          case 10:
            return qg(b2.type._context), Q(b2), null;
          case 17:
            return Yf(b2.type) && Zf(), Q(b2), null;
          case 19:
            E2(K);
            f2 = b2.memoizedState;
            if (null === f2)
              return Q(b2), null;
            d2 = 0 !== (b2.flags & 128);
            g2 = f2.rendering;
            if (null === g2)
              if (d2)
                Xi(f2, false);
              else {
                if (0 !== R || null !== a2 && 0 !== (a2.flags & 128))
                  for (a2 = b2.child; null !== a2; ) {
                    g2 = Jh(a2);
                    if (null !== g2) {
                      b2.flags |= 128;
                      Xi(f2, false);
                      d2 = g2.updateQueue;
                      null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
                      b2.subtreeFlags = 0;
                      d2 = c2;
                      for (c2 = b2.child; null !== c2; )
                        f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                      G(K, K.current & 1 | 2);
                      return b2.child;
                    }
                    a2 = a2.sibling;
                  }
                null !== f2.tail && B() > aj && (b2.flags |= 128, d2 = true, Xi(f2, false), b2.lanes = 4194304);
              }
            else {
              if (!d2)
                if (a2 = Jh(g2), null !== a2) {
                  if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Xi(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I)
                    return Q(b2), null;
                } else
                  2 * B() - f2.renderingStartTime > aj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Xi(f2, false), b2.lanes = 4194304);
              f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
            }
            if (null !== f2.tail)
              return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B(), b2.sibling = null, c2 = K.current, G(K, d2 ? c2 & 1 | 2 : c2 & 1), b2;
            Q(b2);
            return null;
          case 22:
          case 23:
            return bj(), d2 = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (cj & 1073741824) && (Q(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : Q(b2), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p2(156, b2.tag));
      }
      var dj = ta.ReactCurrentOwner;
      var tg = false;
      function ej(a2, b2, c2, d2) {
        b2.child = null === a2 ? zh(b2, null, c2, d2) : yh(b2, a2.child, c2, d2);
      }
      function fj(a2, b2, c2, d2, e2) {
        c2 = c2.render;
        var f2 = b2.ref;
        sg(b2, e2);
        d2 = Uh(a2, b2, c2, d2, f2, e2);
        c2 = Zh();
        if (null !== a2 && !tg)
          return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, gj(a2, b2, e2);
        I && c2 && bh(b2);
        b2.flags |= 1;
        ej(a2, b2, d2, e2);
        return b2.child;
      }
      function hj(a2, b2, c2, d2, e2) {
        if (null === a2) {
          var f2 = c2.type;
          if ("function" === typeof f2 && !ij(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
            return b2.tag = 15, b2.type = f2, jj(a2, b2, f2, d2, e2);
          a2 = vh(c2.type, null, d2, b2, b2.mode, e2);
          a2.ref = b2.ref;
          a2.return = b2;
          return b2.child = a2;
        }
        f2 = a2.child;
        if (0 === (a2.lanes & e2)) {
          var g2 = f2.memoizedProps;
          c2 = c2.compare;
          c2 = null !== c2 ? c2 : He;
          if (c2(g2, d2) && a2.ref === b2.ref)
            return gj(a2, b2, e2);
        }
        b2.flags |= 1;
        a2 = th(f2, d2);
        a2.ref = b2.ref;
        a2.return = b2;
        return b2.child = a2;
      }
      function jj(a2, b2, c2, d2, e2) {
        if (null !== a2) {
          var f2 = a2.memoizedProps;
          if (He(f2, d2) && a2.ref === b2.ref)
            if (tg = false, b2.pendingProps = d2 = f2, 0 !== (a2.lanes & e2))
              0 !== (a2.flags & 131072) && (tg = true);
            else
              return b2.lanes = a2.lanes, gj(a2, b2, e2);
        }
        return kj(a2, b2, c2, d2, e2);
      }
      function lj(a2, b2, c2) {
        var d2 = b2.pendingProps, e2 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
        if ("hidden" === d2.mode)
          if (0 === (b2.mode & 1))
            b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(mj, cj), cj |= c2;
          else if (0 !== (c2 & 1073741824))
            b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, d2 = null !== f2 ? f2.baseLanes : c2, G(mj, cj), cj |= d2;
          else
            return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G(mj, cj), cj |= a2, null;
        else
          null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G(mj, cj), cj |= d2;
        ej(a2, b2, e2, c2);
        return b2.child;
      }
      function nj(a2, b2) {
        var c2 = b2.ref;
        if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2)
          b2.flags |= 512, b2.flags |= 2097152;
      }
      function kj(a2, b2, c2, d2, e2) {
        var f2 = Yf(c2) ? Wf : H.current;
        f2 = Xf(b2, f2);
        sg(b2, e2);
        c2 = Uh(a2, b2, c2, d2, f2, e2);
        d2 = Zh();
        if (null !== a2 && !tg)
          return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, gj(a2, b2, e2);
        I && d2 && bh(b2);
        b2.flags |= 1;
        ej(a2, b2, c2, e2);
        return b2.child;
      }
      function oj(a2, b2, c2, d2, e2) {
        if (Yf(c2)) {
          var f2 = true;
          bg(b2);
        } else
          f2 = false;
        sg(b2, e2);
        if (null === b2.stateNode)
          null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), Og(b2, c2, d2), Qg(b2, c2, d2, e2), d2 = true;
        else if (null === a2) {
          var g2 = b2.stateNode, h2 = b2.memoizedProps;
          g2.props = h2;
          var k = g2.context, l2 = c2.contextType;
          "object" === typeof l2 && null !== l2 ? l2 = ug(l2) : (l2 = Yf(c2) ? Wf : H.current, l2 = Xf(b2, l2));
          var n2 = c2.getDerivedStateFromProps, u2 = "function" === typeof n2 || "function" === typeof g2.getSnapshotBeforeUpdate;
          u2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k !== l2) && Pg(b2, g2, d2, l2);
          wg = false;
          var q = b2.memoizedState;
          g2.state = q;
          Eg(b2, d2, g2, e2);
          k = b2.memoizedState;
          h2 !== d2 || q !== k || Vf.current || wg ? ("function" === typeof n2 && (Ig(b2, c2, n2, d2), k = b2.memoizedState), (h2 = wg || Ng(b2, c2, h2, d2, q, k, l2)) ? (u2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k), g2.props = d2, g2.state = k, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
        } else {
          g2 = b2.stateNode;
          yg(a2, b2);
          h2 = b2.memoizedProps;
          l2 = b2.type === b2.elementType ? h2 : kg(b2.type, h2);
          g2.props = l2;
          u2 = b2.pendingProps;
          q = g2.context;
          k = c2.contextType;
          "object" === typeof k && null !== k ? k = ug(k) : (k = Yf(c2) ? Wf : H.current, k = Xf(b2, k));
          var y2 = c2.getDerivedStateFromProps;
          (n2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== u2 || q !== k) && Pg(b2, g2, d2, k);
          wg = false;
          q = b2.memoizedState;
          g2.state = q;
          Eg(b2, d2, g2, e2);
          var m2 = b2.memoizedState;
          h2 !== u2 || q !== m2 || Vf.current || wg ? ("function" === typeof y2 && (Ig(b2, c2, y2, d2), m2 = b2.memoizedState), (l2 = wg || Ng(b2, c2, l2, d2, q, m2, k) || false) ? (n2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, m2, k), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, m2, k)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && q === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && q === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = m2), g2.props = d2, g2.state = m2, g2.context = k, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && q === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && q === a2.memoizedState || (b2.flags |= 1024), d2 = false);
        }
        return pj(a2, b2, c2, d2, f2, e2);
      }
      function pj(a2, b2, c2, d2, e2, f2) {
        nj(a2, b2);
        var g2 = 0 !== (b2.flags & 128);
        if (!d2 && !g2)
          return e2 && cg(b2, c2, false), gj(a2, b2, f2);
        d2 = b2.stateNode;
        dj.current = b2;
        var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
        b2.flags |= 1;
        null !== a2 && g2 ? (b2.child = yh(b2, a2.child, null, f2), b2.child = yh(b2, null, h2, f2)) : ej(a2, b2, h2, f2);
        b2.memoizedState = d2.state;
        e2 && cg(b2, c2, true);
        return b2.child;
      }
      function qj(a2) {
        var b2 = a2.stateNode;
        b2.pendingContext ? $f(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && $f(a2, b2.context, false);
        Fh(a2, b2.containerInfo);
      }
      function rj(a2, b2, c2, d2, e2) {
        nh();
        oh(e2);
        b2.flags |= 256;
        ej(a2, b2, c2, d2);
        return b2.child;
      }
      var sj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function tj(a2) {
        return { baseLanes: a2, cachePool: null, transitions: null };
      }
      function uj(a2, b2) {
        return { baseLanes: a2.baseLanes | b2, cachePool: null, transitions: a2.transitions };
      }
      function vj(a2, b2, c2) {
        var d2 = b2.pendingProps, e2 = K.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
        (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
        if (h2)
          f2 = true, b2.flags &= -129;
        else if (null === a2 || null !== a2.memoizedState)
          e2 |= 1;
        G(K, e2 & 1);
        if (null === a2) {
          kh(b2);
          a2 = b2.memoizedState;
          if (null !== a2 && (a2 = a2.dehydrated, null !== a2))
            return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
          e2 = d2.children;
          a2 = d2.fallback;
          return f2 ? (d2 = b2.mode, f2 = b2.child, e2 = { mode: "hidden", children: e2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = e2) : f2 = wj(e2, d2, 0, null), a2 = xh(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = tj(c2), b2.memoizedState = sj, a2) : xj(b2, e2);
        }
        e2 = a2.memoizedState;
        if (null !== e2) {
          h2 = e2.dehydrated;
          if (null !== h2) {
            if (g2) {
              if (b2.flags & 256)
                return b2.flags &= -257, yj(a2, b2, c2, Error(p2(422)));
              if (null !== b2.memoizedState)
                return b2.child = a2.child, b2.flags |= 128, null;
              f2 = d2.fallback;
              e2 = b2.mode;
              d2 = wj({ mode: "visible", children: d2.children }, e2, 0, null);
              f2 = xh(f2, e2, c2, null);
              f2.flags |= 2;
              d2.return = b2;
              f2.return = b2;
              d2.sibling = f2;
              b2.child = d2;
              0 !== (b2.mode & 1) && yh(
                b2,
                a2.child,
                null,
                c2
              );
              b2.child.memoizedState = tj(c2);
              b2.memoizedState = sj;
              return f2;
            }
            if (0 === (b2.mode & 1))
              b2 = yj(a2, b2, c2, null);
            else if ("$!" === h2.data)
              b2 = yj(a2, b2, c2, Error(p2(419)));
            else if (d2 = 0 !== (c2 & a2.childLanes), tg || d2) {
              d2 = P2;
              if (null !== d2) {
                switch (c2 & -c2) {
                  case 4:
                    f2 = 2;
                    break;
                  case 16:
                    f2 = 8;
                    break;
                  case 64:
                  case 128:
                  case 256:
                  case 512:
                  case 1024:
                  case 2048:
                  case 4096:
                  case 8192:
                  case 16384:
                  case 32768:
                  case 65536:
                  case 131072:
                  case 262144:
                  case 524288:
                  case 1048576:
                  case 2097152:
                  case 4194304:
                  case 8388608:
                  case 16777216:
                  case 33554432:
                  case 67108864:
                    f2 = 32;
                    break;
                  case 536870912:
                    f2 = 268435456;
                    break;
                  default:
                    f2 = 0;
                }
                d2 = 0 !== (f2 & (d2.suspendedLanes | c2)) ? 0 : f2;
                0 !== d2 && d2 !== e2.retryLane && (e2.retryLane = d2, Lg(a2, d2, -1));
              }
              $i();
              b2 = yj(a2, b2, c2, Error(p2(421)));
            } else
              "$?" === h2.data ? (b2.flags |= 128, b2.child = a2.child, b2 = zj.bind(null, a2), h2._reactRetry = b2, b2 = null) : (c2 = e2.treeContext, eh = Kf(h2.nextSibling), dh = b2, I = true, fh = null, null !== c2 && (Vg[Wg++] = Yg, Vg[Wg++] = Zg, Vg[Wg++] = Xg, Yg = c2.id, Zg = c2.overflow, Xg = b2), b2 = xj(b2, b2.pendingProps.children), b2.flags |= 4096);
            return b2;
          }
          if (f2)
            return d2 = Aj(a2, b2, d2.children, d2.fallback, c2), f2 = b2.child, e2 = a2.child.memoizedState, f2.memoizedState = null === e2 ? tj(c2) : uj(e2, c2), f2.childLanes = a2.childLanes & ~c2, b2.memoizedState = sj, d2;
          c2 = Bj(a2, b2, d2.children, c2);
          b2.memoizedState = null;
          return c2;
        }
        if (f2)
          return d2 = Aj(a2, b2, d2.children, d2.fallback, c2), f2 = b2.child, e2 = a2.child.memoizedState, f2.memoizedState = null === e2 ? tj(c2) : uj(e2, c2), f2.childLanes = a2.childLanes & ~c2, b2.memoizedState = sj, d2;
        c2 = Bj(a2, b2, d2.children, c2);
        b2.memoizedState = null;
        return c2;
      }
      function xj(a2, b2) {
        b2 = wj({ mode: "visible", children: b2 }, a2.mode, 0, null);
        b2.return = a2;
        return a2.child = b2;
      }
      function Bj(a2, b2, c2, d2) {
        var e2 = a2.child;
        a2 = e2.sibling;
        c2 = th(e2, { mode: "visible", children: c2 });
        0 === (b2.mode & 1) && (c2.lanes = d2);
        c2.return = b2;
        c2.sibling = null;
        null !== a2 && (d2 = b2.deletions, null === d2 ? (b2.deletions = [a2], b2.flags |= 16) : d2.push(a2));
        return b2.child = c2;
      }
      function Aj(a2, b2, c2, d2, e2) {
        var f2 = b2.mode;
        a2 = a2.child;
        var g2 = a2.sibling, h2 = { mode: "hidden", children: c2 };
        0 === (f2 & 1) && b2.child !== a2 ? (c2 = b2.child, c2.childLanes = 0, c2.pendingProps = h2, b2.deletions = null) : (c2 = th(a2, h2), c2.subtreeFlags = a2.subtreeFlags & 14680064);
        null !== g2 ? d2 = th(g2, d2) : (d2 = xh(d2, f2, e2, null), d2.flags |= 2);
        d2.return = b2;
        c2.return = b2;
        c2.sibling = d2;
        b2.child = c2;
        return d2;
      }
      function yj(a2, b2, c2, d2) {
        null !== d2 && oh(d2);
        yh(b2, a2.child, null, c2);
        a2 = xj(b2, b2.pendingProps.children);
        a2.flags |= 2;
        b2.memoizedState = null;
        return a2;
      }
      function Cj(a2, b2, c2) {
        a2.lanes |= b2;
        var d2 = a2.alternate;
        null !== d2 && (d2.lanes |= b2);
        rg(a2.return, b2, c2);
      }
      function Dj(a2, b2, c2, d2, e2) {
        var f2 = a2.memoizedState;
        null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
      }
      function Ej(a2, b2, c2) {
        var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
        ej(a2, b2, d2.children, c2);
        d2 = K.current;
        if (0 !== (d2 & 2))
          d2 = d2 & 1 | 2, b2.flags |= 128;
        else {
          if (null !== a2 && 0 !== (a2.flags & 128))
            a:
              for (a2 = b2.child; null !== a2; ) {
                if (13 === a2.tag)
                  null !== a2.memoizedState && Cj(a2, c2, b2);
                else if (19 === a2.tag)
                  Cj(a2, c2, b2);
                else if (null !== a2.child) {
                  a2.child.return = a2;
                  a2 = a2.child;
                  continue;
                }
                if (a2 === b2)
                  break a;
                for (; null === a2.sibling; ) {
                  if (null === a2.return || a2.return === b2)
                    break a;
                  a2 = a2.return;
                }
                a2.sibling.return = a2.return;
                a2 = a2.sibling;
              }
          d2 &= 1;
        }
        G(K, d2);
        if (0 === (b2.mode & 1))
          b2.memoizedState = null;
        else
          switch (e2) {
            case "forwards":
              c2 = b2.child;
              for (e2 = null; null !== c2; )
                a2 = c2.alternate, null !== a2 && null === Jh(a2) && (e2 = c2), c2 = c2.sibling;
              c2 = e2;
              null === c2 ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
              Dj(b2, false, e2, c2, f2);
              break;
            case "backwards":
              c2 = null;
              e2 = b2.child;
              for (b2.child = null; null !== e2; ) {
                a2 = e2.alternate;
                if (null !== a2 && null === Jh(a2)) {
                  b2.child = e2;
                  break;
                }
                a2 = e2.sibling;
                e2.sibling = c2;
                c2 = e2;
                e2 = a2;
              }
              Dj(b2, true, c2, null, f2);
              break;
            case "together":
              Dj(b2, false, null, null, void 0);
              break;
            default:
              b2.memoizedState = null;
          }
        return b2.child;
      }
      function gj(a2, b2, c2) {
        null !== a2 && (b2.dependencies = a2.dependencies);
        Fg |= b2.lanes;
        if (0 === (c2 & b2.childLanes))
          return null;
        if (null !== a2 && b2.child !== a2.child)
          throw Error(p2(153));
        if (null !== b2.child) {
          a2 = b2.child;
          c2 = th(a2, a2.pendingProps);
          b2.child = c2;
          for (c2.return = b2; null !== a2.sibling; )
            a2 = a2.sibling, c2 = c2.sibling = th(a2, a2.pendingProps), c2.return = b2;
          c2.sibling = null;
        }
        return b2.child;
      }
      function Fj(a2, b2, c2) {
        switch (b2.tag) {
          case 3:
            qj(b2);
            nh();
            break;
          case 5:
            Hh(b2);
            break;
          case 1:
            Yf(b2.type) && bg(b2);
            break;
          case 4:
            Fh(b2, b2.stateNode.containerInfo);
            break;
          case 10:
            var d2 = b2.type._context, e2 = b2.memoizedProps.value;
            G(lg, d2._currentValue);
            d2._currentValue = e2;
            break;
          case 13:
            d2 = b2.memoizedState;
            if (null !== d2) {
              if (null !== d2.dehydrated)
                return G(K, K.current & 1), b2.flags |= 128, null;
              if (0 !== (c2 & b2.child.childLanes))
                return vj(a2, b2, c2);
              G(K, K.current & 1);
              a2 = gj(a2, b2, c2);
              return null !== a2 ? a2.sibling : null;
            }
            G(K, K.current & 1);
            break;
          case 19:
            d2 = 0 !== (c2 & b2.childLanes);
            if (0 !== (a2.flags & 128)) {
              if (d2)
                return Ej(a2, b2, c2);
              b2.flags |= 128;
            }
            e2 = b2.memoizedState;
            null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
            G(K, K.current);
            if (d2)
              break;
            else
              return null;
          case 22:
          case 23:
            return b2.lanes = 0, lj(a2, b2, c2);
        }
        return gj(a2, b2, c2);
      }
      function Gj(a2, b2) {
        ch(b2);
        switch (b2.tag) {
          case 1:
            return Yf(b2.type) && Zf(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 3:
            return Gh(), E2(Vf), E2(H), Lh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 5:
            return Ih(b2), null;
          case 13:
            E2(K);
            a2 = b2.memoizedState;
            if (null !== a2 && null !== a2.dehydrated) {
              if (null === b2.alternate)
                throw Error(p2(340));
              nh();
            }
            a2 = b2.flags;
            return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 19:
            return E2(K), null;
          case 4:
            return Gh(), null;
          case 10:
            return qg(b2.type._context), null;
          case 22:
          case 23:
            return bj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Hj = false;
      var S2 = false;
      var Ij = "function" === typeof WeakSet ? WeakSet : Set;
      var T2 = null;
      function Jj(a2, b2) {
        var c2 = a2.ref;
        if (null !== c2)
          if ("function" === typeof c2)
            try {
              c2(null);
            } catch (d2) {
              U(a2, b2, d2);
            }
          else
            c2.current = null;
      }
      function Kj(a2, b2, c2) {
        try {
          c2();
        } catch (d2) {
          U(a2, b2, d2);
        }
      }
      var Lj = false;
      function Mj(a2, b2) {
        Bf = cd;
        a2 = Le();
        if (Me(a2)) {
          if ("selectionStart" in a2)
            var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
          else
            a: {
              c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
              var d2 = c2.getSelection && c2.getSelection();
              if (d2 && 0 !== d2.rangeCount) {
                c2 = d2.anchorNode;
                var e2 = d2.anchorOffset, f2 = d2.focusNode;
                d2 = d2.focusOffset;
                try {
                  c2.nodeType, f2.nodeType;
                } catch (Z) {
                  c2 = null;
                  break a;
                }
                var g2 = 0, h2 = -1, k = -1, l2 = 0, n2 = 0, u2 = a2, q = null;
                b:
                  for (; ; ) {
                    for (var y2; ; ) {
                      u2 !== c2 || 0 !== e2 && 3 !== u2.nodeType || (h2 = g2 + e2);
                      u2 !== f2 || 0 !== d2 && 3 !== u2.nodeType || (k = g2 + d2);
                      3 === u2.nodeType && (g2 += u2.nodeValue.length);
                      if (null === (y2 = u2.firstChild))
                        break;
                      q = u2;
                      u2 = y2;
                    }
                    for (; ; ) {
                      if (u2 === a2)
                        break b;
                      q === c2 && ++l2 === e2 && (h2 = g2);
                      q === f2 && ++n2 === d2 && (k = g2);
                      if (null !== (y2 = u2.nextSibling))
                        break;
                      u2 = q;
                      q = u2.parentNode;
                    }
                    u2 = y2;
                  }
                c2 = -1 === h2 || -1 === k ? null : { start: h2, end: k };
              } else
                c2 = null;
            }
          c2 = c2 || { start: 0, end: 0 };
        } else
          c2 = null;
        Cf = { focusedElem: a2, selectionRange: c2 };
        cd = false;
        for (T2 = b2; null !== T2; )
          if (b2 = T2, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2)
            a2.return = b2, T2 = a2;
          else
            for (; null !== T2; ) {
              b2 = T2;
              try {
                var m2 = b2.alternate;
                if (0 !== (b2.flags & 1024))
                  switch (b2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      break;
                    case 1:
                      if (null !== m2) {
                        var w2 = m2.memoizedProps, J = m2.memoizedState, v2 = b2.stateNode, x = v2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? w2 : kg(b2.type, w2), J);
                        v2.__reactInternalSnapshotBeforeUpdate = x;
                      }
                      break;
                    case 3:
                      var r2 = b2.stateNode.containerInfo;
                      if (1 === r2.nodeType)
                        r2.textContent = "";
                      else if (9 === r2.nodeType) {
                        var F2 = r2.body;
                        null != F2 && (F2.textContent = "");
                      }
                      break;
                    case 5:
                    case 6:
                    case 4:
                    case 17:
                      break;
                    default:
                      throw Error(p2(163));
                  }
              } catch (Z) {
                U(b2, b2.return, Z);
              }
              a2 = b2.sibling;
              if (null !== a2) {
                a2.return = b2.return;
                T2 = a2;
                break;
              }
              T2 = b2.return;
            }
        m2 = Lj;
        Lj = false;
        return m2;
      }
      function Nj(a2, b2, c2) {
        var d2 = b2.updateQueue;
        d2 = null !== d2 ? d2.lastEffect : null;
        if (null !== d2) {
          var e2 = d2 = d2.next;
          do {
            if ((e2.tag & a2) === a2) {
              var f2 = e2.destroy;
              e2.destroy = void 0;
              void 0 !== f2 && Kj(b2, c2, f2);
            }
            e2 = e2.next;
          } while (e2 !== d2);
        }
      }
      function Oj(a2, b2) {
        b2 = b2.updateQueue;
        b2 = null !== b2 ? b2.lastEffect : null;
        if (null !== b2) {
          var c2 = b2 = b2.next;
          do {
            if ((c2.tag & a2) === a2) {
              var d2 = c2.create;
              c2.destroy = d2();
            }
            c2 = c2.next;
          } while (c2 !== b2);
        }
      }
      function Pj(a2) {
        var b2 = a2.ref;
        if (null !== b2) {
          var c2 = a2.stateNode;
          switch (a2.tag) {
            case 5:
              a2 = c2;
              break;
            default:
              a2 = c2;
          }
          "function" === typeof b2 ? b2(a2) : b2.current = a2;
        }
      }
      function Qj(a2) {
        var b2 = a2.alternate;
        null !== b2 && (a2.alternate = null, Qj(b2));
        a2.child = null;
        a2.deletions = null;
        a2.sibling = null;
        5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Nf], delete b2[Of], delete b2[nf], delete b2[Pf], delete b2[Qf]));
        a2.stateNode = null;
        a2.return = null;
        a2.dependencies = null;
        a2.memoizedProps = null;
        a2.memoizedState = null;
        a2.pendingProps = null;
        a2.stateNode = null;
        a2.updateQueue = null;
      }
      function Rj(a2) {
        return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
      }
      function Sj(a2) {
        a:
          for (; ; ) {
            for (; null === a2.sibling; ) {
              if (null === a2.return || Rj(a2.return))
                return null;
              a2 = a2.return;
            }
            a2.sibling.return = a2.return;
            for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
              if (a2.flags & 2)
                continue a;
              if (null === a2.child || 4 === a2.tag)
                continue a;
              else
                a2.child.return = a2, a2 = a2.child;
            }
            if (!(a2.flags & 2))
              return a2.stateNode;
          }
      }
      function Tj(a2, b2, c2) {
        var d2 = a2.tag;
        if (5 === d2 || 6 === d2)
          a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Af));
        else if (4 !== d2 && (a2 = a2.child, null !== a2))
          for (Tj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
            Tj(a2, b2, c2), a2 = a2.sibling;
      }
      function Uj(a2, b2, c2) {
        var d2 = a2.tag;
        if (5 === d2 || 6 === d2)
          a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
        else if (4 !== d2 && (a2 = a2.child, null !== a2))
          for (Uj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
            Uj(a2, b2, c2), a2 = a2.sibling;
      }
      var V = null;
      var Vj = false;
      function Wj(a2, b2, c2) {
        for (c2 = c2.child; null !== c2; )
          Xj(a2, b2, c2), c2 = c2.sibling;
      }
      function Xj(a2, b2, c2) {
        if (kc && "function" === typeof kc.onCommitFiberUnmount)
          try {
            kc.onCommitFiberUnmount(jc, c2);
          } catch (h2) {
          }
        switch (c2.tag) {
          case 5:
            S2 || Jj(c2, b2);
          case 6:
            var d2 = V, e2 = Vj;
            V = null;
            Wj(a2, b2, c2);
            V = d2;
            Vj = e2;
            null !== V && (Vj ? (a2 = V, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : V.removeChild(c2.stateNode));
            break;
          case 18:
            null !== V && (Vj ? (a2 = V, c2 = c2.stateNode, 8 === a2.nodeType ? Jf(a2.parentNode, c2) : 1 === a2.nodeType && Jf(a2, c2), ad(a2)) : Jf(V, c2.stateNode));
            break;
          case 4:
            d2 = V;
            e2 = Vj;
            V = c2.stateNode.containerInfo;
            Vj = true;
            Wj(a2, b2, c2);
            V = d2;
            Vj = e2;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!S2 && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
              e2 = d2 = d2.next;
              do {
                var f2 = e2, g2 = f2.destroy;
                f2 = f2.tag;
                void 0 !== g2 && (0 !== (f2 & 2) ? Kj(c2, b2, g2) : 0 !== (f2 & 4) && Kj(c2, b2, g2));
                e2 = e2.next;
              } while (e2 !== d2);
            }
            Wj(a2, b2, c2);
            break;
          case 1:
            if (!S2 && (Jj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount))
              try {
                d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
              } catch (h2) {
                U(c2, b2, h2);
              }
            Wj(a2, b2, c2);
            break;
          case 21:
            Wj(a2, b2, c2);
            break;
          case 22:
            c2.mode & 1 ? (S2 = (d2 = S2) || null !== c2.memoizedState, Wj(a2, b2, c2), S2 = d2) : Wj(a2, b2, c2);
            break;
          default:
            Wj(a2, b2, c2);
        }
      }
      function Yj(a2) {
        var b2 = a2.updateQueue;
        if (null !== b2) {
          a2.updateQueue = null;
          var c2 = a2.stateNode;
          null === c2 && (c2 = a2.stateNode = new Ij());
          b2.forEach(function(b3) {
            var d2 = Zj.bind(null, a2, b3);
            c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
          });
        }
      }
      function ak(a2, b2) {
        var c2 = b2.deletions;
        if (null !== c2)
          for (var d2 = 0; d2 < c2.length; d2++) {
            var e2 = c2[d2];
            try {
              var f2 = a2, g2 = b2, h2 = g2;
              a:
                for (; null !== h2; ) {
                  switch (h2.tag) {
                    case 5:
                      V = h2.stateNode;
                      Vj = false;
                      break a;
                    case 3:
                      V = h2.stateNode.containerInfo;
                      Vj = true;
                      break a;
                    case 4:
                      V = h2.stateNode.containerInfo;
                      Vj = true;
                      break a;
                  }
                  h2 = h2.return;
                }
              if (null === V)
                throw Error(p2(160));
              Xj(f2, g2, e2);
              V = null;
              Vj = false;
              var k = e2.alternate;
              null !== k && (k.return = null);
              e2.return = null;
            } catch (l2) {
              U(e2, b2, l2);
            }
          }
        if (b2.subtreeFlags & 12854)
          for (b2 = b2.child; null !== b2; )
            bk(b2, a2), b2 = b2.sibling;
      }
      function bk(a2, b2) {
        var c2 = a2.alternate, d2 = a2.flags;
        switch (a2.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ak(b2, a2);
            ck(a2);
            if (d2 & 4) {
              try {
                Nj(3, a2, a2.return), Oj(3, a2);
              } catch (m2) {
                U(a2, a2.return, m2);
              }
              try {
                Nj(5, a2, a2.return);
              } catch (m2) {
                U(a2, a2.return, m2);
              }
            }
            break;
          case 1:
            ak(b2, a2);
            ck(a2);
            d2 & 512 && null !== c2 && Jj(c2, c2.return);
            break;
          case 5:
            ak(b2, a2);
            ck(a2);
            d2 & 512 && null !== c2 && Jj(c2, c2.return);
            if (a2.flags & 32) {
              var e2 = a2.stateNode;
              try {
                nb(e2, "");
              } catch (m2) {
                U(a2, a2.return, m2);
              }
            }
            if (d2 & 4 && (e2 = a2.stateNode, null != e2)) {
              var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k = a2.updateQueue;
              a2.updateQueue = null;
              if (null !== k)
                try {
                  "input" === h2 && "radio" === f2.type && null != f2.name && Za(e2, f2);
                  ub(h2, g2);
                  var l2 = ub(h2, f2);
                  for (g2 = 0; g2 < k.length; g2 += 2) {
                    var n2 = k[g2], u2 = k[g2 + 1];
                    "style" === n2 ? rb(e2, u2) : "dangerouslySetInnerHTML" === n2 ? mb(e2, u2) : "children" === n2 ? nb(e2, u2) : sa(e2, n2, u2, l2);
                  }
                  switch (h2) {
                    case "input":
                      $a(e2, f2);
                      break;
                    case "textarea":
                      hb(e2, f2);
                      break;
                    case "select":
                      var q = e2._wrapperState.wasMultiple;
                      e2._wrapperState.wasMultiple = !!f2.multiple;
                      var y2 = f2.value;
                      null != y2 ? eb(e2, !!f2.multiple, y2, false) : q !== !!f2.multiple && (null != f2.defaultValue ? eb(
                        e2,
                        !!f2.multiple,
                        f2.defaultValue,
                        true
                      ) : eb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
                  }
                  e2[Of] = f2;
                } catch (m2) {
                  U(a2, a2.return, m2);
                }
            }
            break;
          case 6:
            ak(b2, a2);
            ck(a2);
            if (d2 & 4) {
              if (null === a2.stateNode)
                throw Error(p2(162));
              l2 = a2.stateNode;
              n2 = a2.memoizedProps;
              try {
                l2.nodeValue = n2;
              } catch (m2) {
                U(a2, a2.return, m2);
              }
            }
            break;
          case 3:
            ak(b2, a2);
            ck(a2);
            if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated)
              try {
                ad(b2.containerInfo);
              } catch (m2) {
                U(a2, a2.return, m2);
              }
            break;
          case 4:
            ak(b2, a2);
            ck(a2);
            break;
          case 13:
            ak(b2, a2);
            ck(a2);
            l2 = a2.child;
            l2.flags & 8192 && null !== l2.memoizedState && (null === l2.alternate || null === l2.alternate.memoizedState) && (dk = B());
            d2 & 4 && Yj(a2);
            break;
          case 22:
            l2 = null !== c2 && null !== c2.memoizedState;
            a2.mode & 1 ? (S2 = (n2 = S2) || l2, ak(b2, a2), S2 = n2) : ak(b2, a2);
            ck(a2);
            if (d2 & 8192) {
              n2 = null !== a2.memoizedState;
              a:
                for (u2 = null, q = a2; ; ) {
                  if (5 === q.tag) {
                    if (null === u2) {
                      u2 = q;
                      try {
                        e2 = q.stateNode, n2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q.stateNode, k = q.memoizedProps.style, g2 = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h2.style.display = qb("display", g2));
                      } catch (m2) {
                        U(a2, a2.return, m2);
                      }
                    }
                  } else if (6 === q.tag) {
                    if (null === u2)
                      try {
                        q.stateNode.nodeValue = n2 ? "" : q.memoizedProps;
                      } catch (m2) {
                        U(a2, a2.return, m2);
                      }
                  } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a2) && null !== q.child) {
                    q.child.return = q;
                    q = q.child;
                    continue;
                  }
                  if (q === a2)
                    break a;
                  for (; null === q.sibling; ) {
                    if (null === q.return || q.return === a2)
                      break a;
                    u2 === q && (u2 = null);
                    q = q.return;
                  }
                  u2 === q && (u2 = null);
                  q.sibling.return = q.return;
                  q = q.sibling;
                }
              if (n2 && !l2 && 0 !== (a2.mode & 1))
                for (T2 = a2, a2 = a2.child; null !== a2; ) {
                  for (l2 = T2 = a2; null !== T2; ) {
                    n2 = T2;
                    u2 = n2.child;
                    switch (n2.tag) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        Nj(
                          4,
                          n2,
                          n2.return
                        );
                        break;
                      case 1:
                        Jj(n2, n2.return);
                        f2 = n2.stateNode;
                        if ("function" === typeof f2.componentWillUnmount) {
                          q = n2;
                          y2 = n2.return;
                          try {
                            e2 = q, f2.props = e2.memoizedProps, f2.state = e2.memoizedState, f2.componentWillUnmount();
                          } catch (m2) {
                            U(q, y2, m2);
                          }
                        }
                        break;
                      case 5:
                        Jj(n2, n2.return);
                        break;
                      case 22:
                        if (null !== n2.memoizedState) {
                          ek(l2);
                          continue;
                        }
                    }
                    null !== u2 ? (u2.return = n2, T2 = u2) : ek(l2);
                  }
                  a2 = a2.sibling;
                }
            }
            break;
          case 19:
            ak(b2, a2);
            ck(a2);
            d2 & 4 && Yj(a2);
            break;
          case 21:
            break;
          default:
            ak(b2, a2), ck(a2);
        }
      }
      function ck(a2) {
        var b2 = a2.flags;
        if (b2 & 2) {
          try {
            a: {
              for (var c2 = a2.return; null !== c2; ) {
                if (Rj(c2)) {
                  var d2 = c2;
                  break a;
                }
                c2 = c2.return;
              }
              throw Error(p2(160));
            }
            switch (d2.tag) {
              case 5:
                var e2 = d2.stateNode;
                d2.flags & 32 && (nb(e2, ""), d2.flags &= -33);
                var f2 = Sj(a2);
                Uj(a2, f2, e2);
                break;
              case 3:
              case 4:
                var g2 = d2.stateNode.containerInfo, h2 = Sj(a2);
                Tj(a2, h2, g2);
                break;
              default:
                throw Error(p2(161));
            }
          } catch (k) {
            U(a2, a2.return, k);
          }
          a2.flags &= -3;
        }
        b2 & 4096 && (a2.flags &= -4097);
      }
      function fk(a2, b2, c2) {
        T2 = a2;
        gk(a2, b2, c2);
      }
      function gk(a2, b2, c2) {
        for (var d2 = 0 !== (a2.mode & 1); null !== T2; ) {
          var e2 = T2, f2 = e2.child;
          if (22 === e2.tag && d2) {
            var g2 = null !== e2.memoizedState || Hj;
            if (!g2) {
              var h2 = e2.alternate, k = null !== h2 && null !== h2.memoizedState || S2;
              h2 = Hj;
              var l2 = S2;
              Hj = g2;
              if ((S2 = k) && !l2)
                for (T2 = e2; null !== T2; )
                  g2 = T2, k = g2.child, 22 === g2.tag && null !== g2.memoizedState ? hk(e2) : null !== k ? (k.return = g2, T2 = k) : hk(e2);
              for (; null !== f2; )
                T2 = f2, gk(f2, b2, c2), f2 = f2.sibling;
              T2 = e2;
              Hj = h2;
              S2 = l2;
            }
            ik(a2, b2, c2);
          } else
            0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, T2 = f2) : ik(a2, b2, c2);
        }
      }
      function ik(a2) {
        for (; null !== T2; ) {
          var b2 = T2;
          if (0 !== (b2.flags & 8772)) {
            var c2 = b2.alternate;
            try {
              if (0 !== (b2.flags & 8772))
                switch (b2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    S2 || Oj(5, b2);
                    break;
                  case 1:
                    var d2 = b2.stateNode;
                    if (b2.flags & 4 && !S2)
                      if (null === c2)
                        d2.componentDidMount();
                      else {
                        var e2 = b2.elementType === b2.type ? c2.memoizedProps : kg(b2.type, c2.memoizedProps);
                        d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                      }
                    var f2 = b2.updateQueue;
                    null !== f2 && Gg(b2, f2, d2);
                    break;
                  case 3:
                    var g2 = b2.updateQueue;
                    if (null !== g2) {
                      c2 = null;
                      if (null !== b2.child)
                        switch (b2.child.tag) {
                          case 5:
                            c2 = b2.child.stateNode;
                            break;
                          case 1:
                            c2 = b2.child.stateNode;
                        }
                      Gg(b2, g2, c2);
                    }
                    break;
                  case 5:
                    var h2 = b2.stateNode;
                    if (null === c2 && b2.flags & 4) {
                      c2 = h2;
                      var k = b2.memoizedProps;
                      switch (b2.type) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                          k.autoFocus && c2.focus();
                          break;
                        case "img":
                          k.src && (c2.src = k.src);
                      }
                    }
                    break;
                  case 6:
                    break;
                  case 4:
                    break;
                  case 12:
                    break;
                  case 13:
                    if (null === b2.memoizedState) {
                      var l2 = b2.alternate;
                      if (null !== l2) {
                        var n2 = l2.memoizedState;
                        if (null !== n2) {
                          var u2 = n2.dehydrated;
                          null !== u2 && ad(u2);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                    break;
                  default:
                    throw Error(p2(163));
                }
              S2 || b2.flags & 512 && Pj(b2);
            } catch (q) {
              U(b2, b2.return, q);
            }
          }
          if (b2 === a2) {
            T2 = null;
            break;
          }
          c2 = b2.sibling;
          if (null !== c2) {
            c2.return = b2.return;
            T2 = c2;
            break;
          }
          T2 = b2.return;
        }
      }
      function ek(a2) {
        for (; null !== T2; ) {
          var b2 = T2;
          if (b2 === a2) {
            T2 = null;
            break;
          }
          var c2 = b2.sibling;
          if (null !== c2) {
            c2.return = b2.return;
            T2 = c2;
            break;
          }
          T2 = b2.return;
        }
      }
      function hk(a2) {
        for (; null !== T2; ) {
          var b2 = T2;
          try {
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                var c2 = b2.return;
                try {
                  Oj(4, b2);
                } catch (k) {
                  U(b2, c2, k);
                }
                break;
              case 1:
                var d2 = b2.stateNode;
                if ("function" === typeof d2.componentDidMount) {
                  var e2 = b2.return;
                  try {
                    d2.componentDidMount();
                  } catch (k) {
                    U(b2, e2, k);
                  }
                }
                var f2 = b2.return;
                try {
                  Pj(b2);
                } catch (k) {
                  U(b2, f2, k);
                }
                break;
              case 5:
                var g2 = b2.return;
                try {
                  Pj(b2);
                } catch (k) {
                  U(b2, g2, k);
                }
            }
          } catch (k) {
            U(b2, b2.return, k);
          }
          if (b2 === a2) {
            T2 = null;
            break;
          }
          var h2 = b2.sibling;
          if (null !== h2) {
            h2.return = b2.return;
            T2 = h2;
            break;
          }
          T2 = b2.return;
        }
      }
      var jk = Math.ceil;
      var kk = ta.ReactCurrentDispatcher;
      var lk = ta.ReactCurrentOwner;
      var mk = ta.ReactCurrentBatchConfig;
      var W = 0;
      var P2 = null;
      var X = null;
      var Y = 0;
      var cj = 0;
      var mj = Tf(0);
      var R = 0;
      var nk = null;
      var Fg = 0;
      var ok = 0;
      var pk = 0;
      var qk = null;
      var rk = null;
      var dk = 0;
      var aj = Infinity;
      var sk = null;
      var Li = false;
      var Mi = null;
      var Oi = null;
      var tk = false;
      var uk = null;
      var vk = 0;
      var wk = 0;
      var xk = null;
      var yk = -1;
      var zk = 0;
      function Jg() {
        return 0 !== (W & 6) ? B() : -1 !== yk ? yk : yk = B();
      }
      function Kg(a2) {
        if (0 === (a2.mode & 1))
          return 1;
        if (0 !== (W & 2) && 0 !== Y)
          return Y & -Y;
        if (null !== jg.transition)
          return 0 === zk && (zk = xc()), zk;
        a2 = C;
        if (0 !== a2)
          return a2;
        a2 = window.event;
        a2 = void 0 === a2 ? 16 : id(a2.type);
        return a2;
      }
      function Lg(a2, b2, c2) {
        if (50 < wk)
          throw wk = 0, xk = null, Error(p2(185));
        var d2 = Ak(a2, b2);
        if (null === d2)
          return null;
        zc(d2, b2, c2);
        if (0 === (W & 2) || d2 !== P2)
          d2 === P2 && (0 === (W & 2) && (ok |= b2), 4 === R && Bk(d2, Y)), Ck(d2, c2), 1 === b2 && 0 === W && 0 === (a2.mode & 1) && (aj = B() + 500, eg && ig());
        return d2;
      }
      function Ak(a2, b2) {
        a2.lanes |= b2;
        var c2 = a2.alternate;
        null !== c2 && (c2.lanes |= b2);
        c2 = a2;
        for (a2 = a2.return; null !== a2; )
          a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
        return 3 === c2.tag ? c2.stateNode : null;
      }
      function Bg(a2) {
        return (null !== P2 || null !== vg) && 0 !== (a2.mode & 1) && 0 === (W & 2);
      }
      function Ck(a2, b2) {
        var c2 = a2.callbackNode;
        vc(a2, b2);
        var d2 = tc(a2, a2 === P2 ? Y : 0);
        if (0 === d2)
          null !== c2 && ac(c2), a2.callbackNode = null, a2.callbackPriority = 0;
        else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
          null != c2 && ac(c2);
          if (1 === b2)
            0 === a2.tag ? hg(Dk.bind(null, a2)) : gg(Dk.bind(null, a2)), If(function() {
              0 === W && ig();
            }), c2 = null;
          else {
            switch (Cc(d2)) {
              case 1:
                c2 = ec;
                break;
              case 4:
                c2 = fc;
                break;
              case 16:
                c2 = gc;
                break;
              case 536870912:
                c2 = ic;
                break;
              default:
                c2 = gc;
            }
            c2 = Ek(c2, Fk.bind(null, a2));
          }
          a2.callbackPriority = b2;
          a2.callbackNode = c2;
        }
      }
      function Fk(a2, b2) {
        yk = -1;
        zk = 0;
        if (0 !== (W & 6))
          throw Error(p2(327));
        var c2 = a2.callbackNode;
        if (Gk() && a2.callbackNode !== c2)
          return null;
        var d2 = tc(a2, a2 === P2 ? Y : 0);
        if (0 === d2)
          return null;
        if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b2)
          b2 = Hk(a2, d2);
        else {
          b2 = d2;
          var e2 = W;
          W |= 2;
          var f2 = Ik();
          if (P2 !== a2 || Y !== b2)
            sk = null, aj = B() + 500, Jk(a2, b2);
          do
            try {
              Kk();
              break;
            } catch (h2) {
              Lk(a2, h2);
            }
          while (1);
          pg();
          kk.current = f2;
          W = e2;
          null !== X ? b2 = 0 : (P2 = null, Y = 0, b2 = R);
        }
        if (0 !== b2) {
          2 === b2 && (e2 = wc(a2), 0 !== e2 && (d2 = e2, b2 = Mk(a2, e2)));
          if (1 === b2)
            throw c2 = nk, Jk(a2, 0), Bk(a2, d2), Ck(a2, B()), c2;
          if (6 === b2)
            Bk(a2, d2);
          else {
            e2 = a2.current.alternate;
            if (0 === (d2 & 30) && !Nk(e2) && (b2 = Hk(a2, d2), 2 === b2 && (f2 = wc(a2), 0 !== f2 && (d2 = f2, b2 = Mk(a2, f2))), 1 === b2))
              throw c2 = nk, Jk(a2, 0), Bk(a2, d2), Ck(a2, B()), c2;
            a2.finishedWork = e2;
            a2.finishedLanes = d2;
            switch (b2) {
              case 0:
              case 1:
                throw Error(p2(345));
              case 2:
                Ok(a2, rk, sk);
                break;
              case 3:
                Bk(a2, d2);
                if ((d2 & 130023424) === d2 && (b2 = dk + 500 - B(), 10 < b2)) {
                  if (0 !== tc(a2, 0))
                    break;
                  e2 = a2.suspendedLanes;
                  if ((e2 & d2) !== d2) {
                    Jg();
                    a2.pingedLanes |= a2.suspendedLanes & e2;
                    break;
                  }
                  a2.timeoutHandle = Ef(Ok.bind(null, a2, rk, sk), b2);
                  break;
                }
                Ok(a2, rk, sk);
                break;
              case 4:
                Bk(a2, d2);
                if ((d2 & 4194240) === d2)
                  break;
                b2 = a2.eventTimes;
                for (e2 = -1; 0 < d2; ) {
                  var g2 = 31 - nc(d2);
                  f2 = 1 << g2;
                  g2 = b2[g2];
                  g2 > e2 && (e2 = g2);
                  d2 &= ~f2;
                }
                d2 = e2;
                d2 = B() - d2;
                d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * jk(d2 / 1960)) - d2;
                if (10 < d2) {
                  a2.timeoutHandle = Ef(Ok.bind(null, a2, rk, sk), d2);
                  break;
                }
                Ok(a2, rk, sk);
                break;
              case 5:
                Ok(a2, rk, sk);
                break;
              default:
                throw Error(p2(329));
            }
          }
        }
        Ck(a2, B());
        return a2.callbackNode === c2 ? Fk.bind(null, a2) : null;
      }
      function Mk(a2, b2) {
        var c2 = qk;
        a2.current.memoizedState.isDehydrated && (Jk(a2, b2).flags |= 256);
        a2 = Hk(a2, b2);
        2 !== a2 && (b2 = rk, rk = c2, null !== b2 && Zi(b2));
        return a2;
      }
      function Zi(a2) {
        null === rk ? rk = a2 : rk.push.apply(rk, a2);
      }
      function Nk(a2) {
        for (var b2 = a2; ; ) {
          if (b2.flags & 16384) {
            var c2 = b2.updateQueue;
            if (null !== c2 && (c2 = c2.stores, null !== c2))
              for (var d2 = 0; d2 < c2.length; d2++) {
                var e2 = c2[d2], f2 = e2.getSnapshot;
                e2 = e2.value;
                try {
                  if (!Ge(f2(), e2))
                    return false;
                } catch (g2) {
                  return false;
                }
              }
          }
          c2 = b2.child;
          if (b2.subtreeFlags & 16384 && null !== c2)
            c2.return = b2, b2 = c2;
          else {
            if (b2 === a2)
              break;
            for (; null === b2.sibling; ) {
              if (null === b2.return || b2.return === a2)
                return true;
              b2 = b2.return;
            }
            b2.sibling.return = b2.return;
            b2 = b2.sibling;
          }
        }
        return true;
      }
      function Bk(a2, b2) {
        b2 &= ~pk;
        b2 &= ~ok;
        a2.suspendedLanes |= b2;
        a2.pingedLanes &= ~b2;
        for (a2 = a2.expirationTimes; 0 < b2; ) {
          var c2 = 31 - nc(b2), d2 = 1 << c2;
          a2[c2] = -1;
          b2 &= ~d2;
        }
      }
      function Dk(a2) {
        if (0 !== (W & 6))
          throw Error(p2(327));
        Gk();
        var b2 = tc(a2, 0);
        if (0 === (b2 & 1))
          return Ck(a2, B()), null;
        var c2 = Hk(a2, b2);
        if (0 !== a2.tag && 2 === c2) {
          var d2 = wc(a2);
          0 !== d2 && (b2 = d2, c2 = Mk(a2, d2));
        }
        if (1 === c2)
          throw c2 = nk, Jk(a2, 0), Bk(a2, b2), Ck(a2, B()), c2;
        if (6 === c2)
          throw Error(p2(345));
        a2.finishedWork = a2.current.alternate;
        a2.finishedLanes = b2;
        Ok(a2, rk, sk);
        Ck(a2, B());
        return null;
      }
      function Pk(a2, b2) {
        var c2 = W;
        W |= 1;
        try {
          return a2(b2);
        } finally {
          W = c2, 0 === W && (aj = B() + 500, eg && ig());
        }
      }
      function Qk(a2) {
        null !== uk && 0 === uk.tag && 0 === (W & 6) && Gk();
        var b2 = W;
        W |= 1;
        var c2 = mk.transition, d2 = C;
        try {
          if (mk.transition = null, C = 1, a2)
            return a2();
        } finally {
          C = d2, mk.transition = c2, W = b2, 0 === (W & 6) && ig();
        }
      }
      function bj() {
        cj = mj.current;
        E2(mj);
      }
      function Jk(a2, b2) {
        a2.finishedWork = null;
        a2.finishedLanes = 0;
        var c2 = a2.timeoutHandle;
        -1 !== c2 && (a2.timeoutHandle = -1, Ff(c2));
        if (null !== X)
          for (c2 = X.return; null !== c2; ) {
            var d2 = c2;
            ch(d2);
            switch (d2.tag) {
              case 1:
                d2 = d2.type.childContextTypes;
                null !== d2 && void 0 !== d2 && Zf();
                break;
              case 3:
                Gh();
                E2(Vf);
                E2(H);
                Lh();
                break;
              case 5:
                Ih(d2);
                break;
              case 4:
                Gh();
                break;
              case 13:
                E2(K);
                break;
              case 19:
                E2(K);
                break;
              case 10:
                qg(d2.type._context);
                break;
              case 22:
              case 23:
                bj();
            }
            c2 = c2.return;
          }
        P2 = a2;
        X = a2 = th(a2.current, null);
        Y = cj = b2;
        R = 0;
        nk = null;
        pk = ok = Fg = 0;
        rk = qk = null;
        if (null !== vg) {
          for (b2 = 0; b2 < vg.length; b2++)
            if (c2 = vg[b2], d2 = c2.interleaved, null !== d2) {
              c2.interleaved = null;
              var e2 = d2.next, f2 = c2.pending;
              if (null !== f2) {
                var g2 = f2.next;
                f2.next = e2;
                d2.next = g2;
              }
              c2.pending = d2;
            }
          vg = null;
        }
        return a2;
      }
      function Lk(a2, b2) {
        do {
          var c2 = X;
          try {
            pg();
            Mh.current = Yh;
            if (Ph) {
              for (var d2 = L2.memoizedState; null !== d2; ) {
                var e2 = d2.queue;
                null !== e2 && (e2.pending = null);
                d2 = d2.next;
              }
              Ph = false;
            }
            Oh = 0;
            N = M = L2 = null;
            Qh = false;
            Rh = 0;
            lk.current = null;
            if (null === c2 || null === c2.return) {
              R = 1;
              nk = b2;
              X = null;
              break;
            }
            a: {
              var f2 = a2, g2 = c2.return, h2 = c2, k = b2;
              b2 = Y;
              h2.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l2 = k, n2 = h2, u2 = n2.tag;
                if (0 === (n2.mode & 1) && (0 === u2 || 11 === u2 || 15 === u2)) {
                  var q = n2.alternate;
                  q ? (n2.updateQueue = q.updateQueue, n2.memoizedState = q.memoizedState, n2.lanes = q.lanes) : (n2.updateQueue = null, n2.memoizedState = null);
                }
                var y2 = Ri(g2);
                if (null !== y2) {
                  y2.flags &= -257;
                  Si(y2, g2, h2, f2, b2);
                  y2.mode & 1 && Pi(f2, l2, b2);
                  b2 = y2;
                  k = l2;
                  var m2 = b2.updateQueue;
                  if (null === m2) {
                    var w2 = /* @__PURE__ */ new Set();
                    w2.add(k);
                    b2.updateQueue = w2;
                  } else
                    m2.add(k);
                  break a;
                } else {
                  if (0 === (b2 & 1)) {
                    Pi(f2, l2, b2);
                    $i();
                    break a;
                  }
                  k = Error(p2(426));
                }
              } else if (I && h2.mode & 1) {
                var J = Ri(g2);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Si(J, g2, h2, f2, b2);
                  oh(k);
                  break a;
                }
              }
              f2 = k;
              4 !== R && (R = 2);
              null === qk ? qk = [f2] : qk.push(f2);
              k = Hi(k, h2);
              h2 = g2;
              do {
                switch (h2.tag) {
                  case 3:
                    h2.flags |= 65536;
                    b2 &= -b2;
                    h2.lanes |= b2;
                    var v2 = Ki(h2, k, b2);
                    Dg(h2, v2);
                    break a;
                  case 1:
                    f2 = k;
                    var x = h2.type, r2 = h2.stateNode;
                    if (0 === (h2.flags & 128) && ("function" === typeof x.getDerivedStateFromError || null !== r2 && "function" === typeof r2.componentDidCatch && (null === Oi || !Oi.has(r2)))) {
                      h2.flags |= 65536;
                      b2 &= -b2;
                      h2.lanes |= b2;
                      var F2 = Ni(h2, f2, b2);
                      Dg(h2, F2);
                      break a;
                    }
                }
                h2 = h2.return;
              } while (null !== h2);
            }
            Rk(c2);
          } catch (Z) {
            b2 = Z;
            X === c2 && null !== c2 && (X = c2 = c2.return);
            continue;
          }
          break;
        } while (1);
      }
      function Ik() {
        var a2 = kk.current;
        kk.current = Yh;
        return null === a2 ? Yh : a2;
      }
      function $i() {
        if (0 === R || 3 === R || 2 === R)
          R = 4;
        null === P2 || 0 === (Fg & 268435455) && 0 === (ok & 268435455) || Bk(P2, Y);
      }
      function Hk(a2, b2) {
        var c2 = W;
        W |= 2;
        var d2 = Ik();
        if (P2 !== a2 || Y !== b2)
          sk = null, Jk(a2, b2);
        do
          try {
            Sk();
            break;
          } catch (e2) {
            Lk(a2, e2);
          }
        while (1);
        pg();
        W = c2;
        kk.current = d2;
        if (null !== X)
          throw Error(p2(261));
        P2 = null;
        Y = 0;
        return R;
      }
      function Sk() {
        for (; null !== X; )
          Tk(X);
      }
      function Kk() {
        for (; null !== X && !bc(); )
          Tk(X);
      }
      function Tk(a2) {
        var b2 = Uk(a2.alternate, a2, cj);
        a2.memoizedProps = a2.pendingProps;
        null === b2 ? Rk(a2) : X = b2;
        lk.current = null;
      }
      function Rk(a2) {
        var b2 = a2;
        do {
          var c2 = b2.alternate;
          a2 = b2.return;
          if (0 === (b2.flags & 32768)) {
            if (c2 = Yi(c2, b2, cj), null !== c2) {
              X = c2;
              return;
            }
          } else {
            c2 = Gj(c2, b2);
            if (null !== c2) {
              c2.flags &= 32767;
              X = c2;
              return;
            }
            if (null !== a2)
              a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
            else {
              R = 6;
              X = null;
              return;
            }
          }
          b2 = b2.sibling;
          if (null !== b2) {
            X = b2;
            return;
          }
          X = b2 = a2;
        } while (null !== b2);
        0 === R && (R = 5);
      }
      function Ok(a2, b2, c2) {
        var d2 = C, e2 = mk.transition;
        try {
          mk.transition = null, C = 1, Vk(a2, b2, c2, d2);
        } finally {
          mk.transition = e2, C = d2;
        }
        return null;
      }
      function Vk(a2, b2, c2, d2) {
        do
          Gk();
        while (null !== uk);
        if (0 !== (W & 6))
          throw Error(p2(327));
        c2 = a2.finishedWork;
        var e2 = a2.finishedLanes;
        if (null === c2)
          return null;
        a2.finishedWork = null;
        a2.finishedLanes = 0;
        if (c2 === a2.current)
          throw Error(p2(177));
        a2.callbackNode = null;
        a2.callbackPriority = 0;
        var f2 = c2.lanes | c2.childLanes;
        Ac(a2, f2);
        a2 === P2 && (X = P2 = null, Y = 0);
        0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || tk || (tk = true, Ek(gc, function() {
          Gk();
          return null;
        }));
        f2 = 0 !== (c2.flags & 15990);
        if (0 !== (c2.subtreeFlags & 15990) || f2) {
          f2 = mk.transition;
          mk.transition = null;
          var g2 = C;
          C = 1;
          var h2 = W;
          W |= 4;
          lk.current = null;
          Mj(a2, c2);
          bk(c2, a2);
          Ne(Cf);
          cd = !!Bf;
          Cf = Bf = null;
          a2.current = c2;
          fk(c2, a2, e2);
          cc();
          W = h2;
          C = g2;
          mk.transition = f2;
        } else
          a2.current = c2;
        tk && (tk = false, uk = a2, vk = e2);
        f2 = a2.pendingLanes;
        0 === f2 && (Oi = null);
        lc(c2.stateNode, d2);
        Ck(a2, B());
        if (null !== b2)
          for (d2 = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
            d2(b2[c2]);
        if (Li)
          throw Li = false, a2 = Mi, Mi = null, a2;
        0 !== (vk & 1) && 0 !== a2.tag && Gk();
        f2 = a2.pendingLanes;
        0 !== (f2 & 1) ? a2 === xk ? wk++ : (wk = 0, xk = a2) : wk = 0;
        ig();
        return null;
      }
      function Gk() {
        if (null !== uk) {
          var a2 = Cc(vk), b2 = mk.transition, c2 = C;
          try {
            mk.transition = null;
            C = 16 > a2 ? 16 : a2;
            if (null === uk)
              var d2 = false;
            else {
              a2 = uk;
              uk = null;
              vk = 0;
              if (0 !== (W & 6))
                throw Error(p2(331));
              var e2 = W;
              W |= 4;
              for (T2 = a2.current; null !== T2; ) {
                var f2 = T2, g2 = f2.child;
                if (0 !== (T2.flags & 16)) {
                  var h2 = f2.deletions;
                  if (null !== h2) {
                    for (var k = 0; k < h2.length; k++) {
                      var l2 = h2[k];
                      for (T2 = l2; null !== T2; ) {
                        var n2 = T2;
                        switch (n2.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Nj(8, n2, f2);
                        }
                        var u2 = n2.child;
                        if (null !== u2)
                          u2.return = n2, T2 = u2;
                        else
                          for (; null !== T2; ) {
                            n2 = T2;
                            var q = n2.sibling, y2 = n2.return;
                            Qj(n2);
                            if (n2 === l2) {
                              T2 = null;
                              break;
                            }
                            if (null !== q) {
                              q.return = y2;
                              T2 = q;
                              break;
                            }
                            T2 = y2;
                          }
                      }
                    }
                    var m2 = f2.alternate;
                    if (null !== m2) {
                      var w2 = m2.child;
                      if (null !== w2) {
                        m2.child = null;
                        do {
                          var J = w2.sibling;
                          w2.sibling = null;
                          w2 = J;
                        } while (null !== w2);
                      }
                    }
                    T2 = f2;
                  }
                }
                if (0 !== (f2.subtreeFlags & 2064) && null !== g2)
                  g2.return = f2, T2 = g2;
                else
                  b:
                    for (; null !== T2; ) {
                      f2 = T2;
                      if (0 !== (f2.flags & 2048))
                        switch (f2.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Nj(9, f2, f2.return);
                        }
                      var v2 = f2.sibling;
                      if (null !== v2) {
                        v2.return = f2.return;
                        T2 = v2;
                        break b;
                      }
                      T2 = f2.return;
                    }
              }
              var x = a2.current;
              for (T2 = x; null !== T2; ) {
                g2 = T2;
                var r2 = g2.child;
                if (0 !== (g2.subtreeFlags & 2064) && null !== r2)
                  r2.return = g2, T2 = r2;
                else
                  b:
                    for (g2 = x; null !== T2; ) {
                      h2 = T2;
                      if (0 !== (h2.flags & 2048))
                        try {
                          switch (h2.tag) {
                            case 0:
                            case 11:
                            case 15:
                              Oj(9, h2);
                          }
                        } catch (Z) {
                          U(h2, h2.return, Z);
                        }
                      if (h2 === g2) {
                        T2 = null;
                        break b;
                      }
                      var F2 = h2.sibling;
                      if (null !== F2) {
                        F2.return = h2.return;
                        T2 = F2;
                        break b;
                      }
                      T2 = h2.return;
                    }
              }
              W = e2;
              ig();
              if (kc && "function" === typeof kc.onPostCommitFiberRoot)
                try {
                  kc.onPostCommitFiberRoot(jc, a2);
                } catch (Z) {
                }
              d2 = true;
            }
            return d2;
          } finally {
            C = c2, mk.transition = b2;
          }
        }
        return false;
      }
      function Wk(a2, b2, c2) {
        b2 = Hi(c2, b2);
        b2 = Ki(a2, b2, 1);
        Ag(a2, b2);
        b2 = Jg();
        a2 = Ak(a2, 1);
        null !== a2 && (zc(a2, 1, b2), Ck(a2, b2));
      }
      function U(a2, b2, c2) {
        if (3 === a2.tag)
          Wk(a2, a2, c2);
        else
          for (; null !== b2; ) {
            if (3 === b2.tag) {
              Wk(b2, a2, c2);
              break;
            } else if (1 === b2.tag) {
              var d2 = b2.stateNode;
              if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Oi || !Oi.has(d2))) {
                a2 = Hi(c2, a2);
                a2 = Ni(b2, a2, 1);
                Ag(b2, a2);
                a2 = Jg();
                b2 = Ak(b2, 1);
                null !== b2 && (zc(b2, 1, a2), Ck(b2, a2));
                break;
              }
            }
            b2 = b2.return;
          }
      }
      function Qi(a2, b2, c2) {
        var d2 = a2.pingCache;
        null !== d2 && d2.delete(b2);
        b2 = Jg();
        a2.pingedLanes |= a2.suspendedLanes & c2;
        P2 === a2 && (Y & c2) === c2 && (4 === R || 3 === R && (Y & 130023424) === Y && 500 > B() - dk ? Jk(a2, 0) : pk |= c2);
        Ck(a2, b2);
      }
      function Xk(a2, b2) {
        0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = rc, rc <<= 1, 0 === (rc & 130023424) && (rc = 4194304)));
        var c2 = Jg();
        a2 = Ak(a2, b2);
        null !== a2 && (zc(a2, b2, c2), Ck(a2, c2));
      }
      function zj(a2) {
        var b2 = a2.memoizedState, c2 = 0;
        null !== b2 && (c2 = b2.retryLane);
        Xk(a2, c2);
      }
      function Zj(a2, b2) {
        var c2 = 0;
        switch (a2.tag) {
          case 13:
            var d2 = a2.stateNode;
            var e2 = a2.memoizedState;
            null !== e2 && (c2 = e2.retryLane);
            break;
          case 19:
            d2 = a2.stateNode;
            break;
          default:
            throw Error(p2(314));
        }
        null !== d2 && d2.delete(b2);
        Xk(a2, c2);
      }
      var Uk;
      Uk = function(a2, b2, c2) {
        if (null !== a2)
          if (a2.memoizedProps !== b2.pendingProps || Vf.current)
            tg = true;
          else {
            if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128))
              return tg = false, Fj(a2, b2, c2);
            tg = 0 !== (a2.flags & 131072) ? true : false;
          }
        else
          tg = false, I && 0 !== (b2.flags & 1048576) && ah(b2, Ug, b2.index);
        b2.lanes = 0;
        switch (b2.tag) {
          case 2:
            var d2 = b2.type;
            null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
            a2 = b2.pendingProps;
            var e2 = Xf(b2, H.current);
            sg(b2, c2);
            e2 = Uh(null, b2, d2, a2, e2, c2);
            var f2 = Zh();
            b2.flags |= 1;
            "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Yf(d2) ? (f2 = true, bg(b2)) : f2 = false, b2.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, xg(b2), e2.updater = Mg, b2.stateNode = e2, e2._reactInternals = b2, Qg(b2, d2, a2, c2), b2 = pj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I && f2 && bh(b2), ej(null, b2, e2, c2), b2 = b2.child);
            return b2;
          case 16:
            d2 = b2.elementType;
            a: {
              null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
              a2 = b2.pendingProps;
              e2 = d2._init;
              d2 = e2(d2._payload);
              b2.type = d2;
              e2 = b2.tag = Yk(d2);
              a2 = kg(d2, a2);
              switch (e2) {
                case 0:
                  b2 = kj(null, b2, d2, a2, c2);
                  break a;
                case 1:
                  b2 = oj(
                    null,
                    b2,
                    d2,
                    a2,
                    c2
                  );
                  break a;
                case 11:
                  b2 = fj(null, b2, d2, a2, c2);
                  break a;
                case 14:
                  b2 = hj(null, b2, d2, kg(d2.type, a2), c2);
                  break a;
              }
              throw Error(p2(306, d2, ""));
            }
            return b2;
          case 0:
            return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : kg(d2, e2), kj(a2, b2, d2, e2, c2);
          case 1:
            return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : kg(d2, e2), oj(a2, b2, d2, e2, c2);
          case 3:
            a: {
              qj(b2);
              if (null === a2)
                throw Error(p2(387));
              d2 = b2.pendingProps;
              f2 = b2.memoizedState;
              e2 = f2.element;
              yg(a2, b2);
              Eg(b2, d2, null, c2);
              var g2 = b2.memoizedState;
              d2 = g2.element;
              if (f2.isDehydrated)
                if (f2 = {
                  element: d2,
                  isDehydrated: false,
                  cache: g2.cache,
                  pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries,
                  transitions: g2.transitions
                }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
                  e2 = Error(p2(423));
                  b2 = rj(a2, b2, d2, c2, e2);
                  break a;
                } else if (d2 !== e2) {
                  e2 = Error(p2(424));
                  b2 = rj(a2, b2, d2, c2, e2);
                  break a;
                } else
                  for (eh = Kf(b2.stateNode.containerInfo.firstChild), dh = b2, I = true, fh = null, c2 = zh(b2, null, d2, c2), b2.child = c2; c2; )
                    c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
              else {
                nh();
                if (d2 === e2) {
                  b2 = gj(a2, b2, c2);
                  break a;
                }
                ej(a2, b2, d2, c2);
              }
              b2 = b2.child;
            }
            return b2;
          case 5:
            return Hh(b2), null === a2 && kh(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e2.children, Df(d2, e2) ? g2 = null : null !== f2 && Df(d2, f2) && (b2.flags |= 32), nj(a2, b2), ej(a2, b2, g2, c2), b2.child;
          case 6:
            return null === a2 && kh(b2), null;
          case 13:
            return vj(a2, b2, c2);
          case 4:
            return Fh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a2 ? b2.child = yh(b2, null, d2, c2) : ej(a2, b2, d2, c2), b2.child;
          case 11:
            return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : kg(d2, e2), fj(a2, b2, d2, e2, c2);
          case 7:
            return ej(a2, b2, b2.pendingProps, c2), b2.child;
          case 8:
            return ej(a2, b2, b2.pendingProps.children, c2), b2.child;
          case 12:
            return ej(
              a2,
              b2,
              b2.pendingProps.children,
              c2
            ), b2.child;
          case 10:
            a: {
              d2 = b2.type._context;
              e2 = b2.pendingProps;
              f2 = b2.memoizedProps;
              g2 = e2.value;
              G(lg, d2._currentValue);
              d2._currentValue = g2;
              if (null !== f2)
                if (Ge(f2.value, g2)) {
                  if (f2.children === e2.children && !Vf.current) {
                    b2 = gj(a2, b2, c2);
                    break a;
                  }
                } else
                  for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
                    var h2 = f2.dependencies;
                    if (null !== h2) {
                      g2 = f2.child;
                      for (var k = h2.firstContext; null !== k; ) {
                        if (k.context === d2) {
                          if (1 === f2.tag) {
                            k = zg(-1, c2 & -c2);
                            k.tag = 2;
                            var l2 = f2.updateQueue;
                            if (null !== l2) {
                              l2 = l2.shared;
                              var n2 = l2.pending;
                              null === n2 ? k.next = k : (k.next = n2.next, n2.next = k);
                              l2.pending = k;
                            }
                          }
                          f2.lanes |= c2;
                          k = f2.alternate;
                          null !== k && (k.lanes |= c2);
                          rg(f2.return, c2, b2);
                          h2.lanes |= c2;
                          break;
                        }
                        k = k.next;
                      }
                    } else if (10 === f2.tag)
                      g2 = f2.type === b2.type ? null : f2.child;
                    else if (18 === f2.tag) {
                      g2 = f2.return;
                      if (null === g2)
                        throw Error(p2(341));
                      g2.lanes |= c2;
                      h2 = g2.alternate;
                      null !== h2 && (h2.lanes |= c2);
                      rg(g2, c2, b2);
                      g2 = f2.sibling;
                    } else
                      g2 = f2.child;
                    if (null !== g2)
                      g2.return = f2;
                    else
                      for (g2 = f2; null !== g2; ) {
                        if (g2 === b2) {
                          g2 = null;
                          break;
                        }
                        f2 = g2.sibling;
                        if (null !== f2) {
                          f2.return = g2.return;
                          g2 = f2;
                          break;
                        }
                        g2 = g2.return;
                      }
                    f2 = g2;
                  }
              ej(a2, b2, e2.children, c2);
              b2 = b2.child;
            }
            return b2;
          case 9:
            return e2 = b2.type, d2 = b2.pendingProps.children, sg(b2, c2), e2 = ug(e2), d2 = d2(e2), b2.flags |= 1, ej(a2, b2, d2, c2), b2.child;
          case 14:
            return d2 = b2.type, e2 = kg(d2, b2.pendingProps), e2 = kg(d2.type, e2), hj(a2, b2, d2, e2, c2);
          case 15:
            return jj(a2, b2, b2.type, b2.pendingProps, c2);
          case 17:
            return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : kg(d2, e2), null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), b2.tag = 1, Yf(d2) ? (a2 = true, bg(b2)) : a2 = false, sg(b2, c2), Og(b2, d2, e2), Qg(b2, d2, e2, c2), pj(null, b2, d2, true, a2, c2);
          case 19:
            return Ej(a2, b2, c2);
          case 22:
            return lj(a2, b2, c2);
        }
        throw Error(p2(
          156,
          b2.tag
        ));
      };
      function Ek(a2, b2) {
        return $b(a2, b2);
      }
      function Zk(a2, b2, c2, d2) {
        this.tag = a2;
        this.key = c2;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b2;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d2;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function hh(a2, b2, c2, d2) {
        return new Zk(a2, b2, c2, d2);
      }
      function ij(a2) {
        a2 = a2.prototype;
        return !(!a2 || !a2.isReactComponent);
      }
      function Yk(a2) {
        if ("function" === typeof a2)
          return ij(a2) ? 1 : 0;
        if (void 0 !== a2 && null !== a2) {
          a2 = a2.$$typeof;
          if (a2 === Ca)
            return 11;
          if (a2 === Fa)
            return 14;
        }
        return 2;
      }
      function th(a2, b2) {
        var c2 = a2.alternate;
        null === c2 ? (c2 = hh(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
        c2.flags = a2.flags & 14680064;
        c2.childLanes = a2.childLanes;
        c2.lanes = a2.lanes;
        c2.child = a2.child;
        c2.memoizedProps = a2.memoizedProps;
        c2.memoizedState = a2.memoizedState;
        c2.updateQueue = a2.updateQueue;
        b2 = a2.dependencies;
        c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
        c2.sibling = a2.sibling;
        c2.index = a2.index;
        c2.ref = a2.ref;
        return c2;
      }
      function vh(a2, b2, c2, d2, e2, f2) {
        var g2 = 2;
        d2 = a2;
        if ("function" === typeof a2)
          ij(a2) && (g2 = 1);
        else if ("string" === typeof a2)
          g2 = 5;
        else
          a:
            switch (a2) {
              case wa:
                return xh(c2.children, e2, f2, b2);
              case xa:
                g2 = 8;
                e2 |= 8;
                break;
              case za:
                return a2 = hh(12, c2, b2, e2 | 2), a2.elementType = za, a2.lanes = f2, a2;
              case Da:
                return a2 = hh(13, c2, b2, e2), a2.elementType = Da, a2.lanes = f2, a2;
              case Ea:
                return a2 = hh(19, c2, b2, e2), a2.elementType = Ea, a2.lanes = f2, a2;
              case Ha:
                return wj(c2, e2, f2, b2);
              default:
                if ("object" === typeof a2 && null !== a2)
                  switch (a2.$$typeof) {
                    case Aa:
                      g2 = 10;
                      break a;
                    case Ba:
                      g2 = 9;
                      break a;
                    case Ca:
                      g2 = 11;
                      break a;
                    case Fa:
                      g2 = 14;
                      break a;
                    case Ga:
                      g2 = 16;
                      d2 = null;
                      break a;
                  }
                throw Error(p2(130, null == a2 ? a2 : typeof a2, ""));
            }
        b2 = hh(g2, c2, b2, e2);
        b2.elementType = a2;
        b2.type = d2;
        b2.lanes = f2;
        return b2;
      }
      function xh(a2, b2, c2, d2) {
        a2 = hh(7, a2, d2, b2);
        a2.lanes = c2;
        return a2;
      }
      function wj(a2, b2, c2, d2) {
        a2 = hh(22, a2, d2, b2);
        a2.elementType = Ha;
        a2.lanes = c2;
        a2.stateNode = {};
        return a2;
      }
      function uh(a2, b2, c2) {
        a2 = hh(6, a2, null, b2);
        a2.lanes = c2;
        return a2;
      }
      function wh(a2, b2, c2) {
        b2 = hh(4, null !== a2.children ? a2.children : [], a2.key, b2);
        b2.lanes = c2;
        b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
        return b2;
      }
      function $k(a2, b2, c2, d2, e2) {
        this.tag = b2;
        this.containerInfo = a2;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = yc(0);
        this.expirationTimes = yc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = yc(0);
        this.identifierPrefix = d2;
        this.onRecoverableError = e2;
        this.mutableSourceEagerHydrationData = null;
      }
      function al(a2, b2, c2, d2, e2, f2, g2, h2, k) {
        a2 = new $k(a2, b2, c2, h2, k);
        1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
        f2 = hh(3, null, null, b2);
        a2.current = f2;
        f2.stateNode = a2;
        f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        xg(f2);
        return a2;
      }
      function bl(a2, b2, c2) {
        var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: va, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
      }
      function cl(a2) {
        if (!a2)
          return Uf;
        a2 = a2._reactInternals;
        a: {
          if (Ub(a2) !== a2 || 1 !== a2.tag)
            throw Error(p2(170));
          var b2 = a2;
          do {
            switch (b2.tag) {
              case 3:
                b2 = b2.stateNode.context;
                break a;
              case 1:
                if (Yf(b2.type)) {
                  b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b2 = b2.return;
          } while (null !== b2);
          throw Error(p2(171));
        }
        if (1 === a2.tag) {
          var c2 = a2.type;
          if (Yf(c2))
            return ag(a2, c2, b2);
        }
        return b2;
      }
      function dl(a2, b2, c2, d2, e2, f2, g2, h2, k) {
        a2 = al(c2, d2, true, a2, e2, f2, g2, h2, k);
        a2.context = cl(null);
        c2 = a2.current;
        d2 = Jg();
        e2 = Kg(c2);
        f2 = zg(d2, e2);
        f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
        Ag(c2, f2);
        a2.current.lanes = e2;
        zc(a2, e2, d2);
        Ck(a2, d2);
        return a2;
      }
      function el(a2, b2, c2, d2) {
        var e2 = b2.current, f2 = Jg(), g2 = Kg(e2);
        c2 = cl(c2);
        null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
        b2 = zg(f2, g2);
        b2.payload = { element: a2 };
        d2 = void 0 === d2 ? null : d2;
        null !== d2 && (b2.callback = d2);
        Ag(e2, b2);
        a2 = Lg(e2, g2, f2);
        null !== a2 && Cg(a2, e2, g2);
        return g2;
      }
      function fl(a2) {
        a2 = a2.current;
        if (!a2.child)
          return null;
        switch (a2.child.tag) {
          case 5:
            return a2.child.stateNode;
          default:
            return a2.child.stateNode;
        }
      }
      function gl(a2, b2) {
        a2 = a2.memoizedState;
        if (null !== a2 && null !== a2.dehydrated) {
          var c2 = a2.retryLane;
          a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
        }
      }
      function hl(a2, b2) {
        gl(a2, b2);
        (a2 = a2.alternate) && gl(a2, b2);
      }
      function il() {
        return null;
      }
      var jl = "function" === typeof reportError ? reportError : function(a2) {
        console.error(a2);
      };
      function kl(a2) {
        this._internalRoot = a2;
      }
      ll.prototype.render = kl.prototype.render = function(a2) {
        var b2 = this._internalRoot;
        if (null === b2)
          throw Error(p2(409));
        el(a2, b2, null, null);
      };
      ll.prototype.unmount = kl.prototype.unmount = function() {
        var a2 = this._internalRoot;
        if (null !== a2) {
          this._internalRoot = null;
          var b2 = a2.containerInfo;
          Qk(function() {
            el(null, a2, null, null);
          });
          b2[tf] = null;
        }
      };
      function ll(a2) {
        this._internalRoot = a2;
      }
      ll.prototype.unstable_scheduleHydration = function(a2) {
        if (a2) {
          var b2 = Gc();
          a2 = { blockedOn: null, target: a2, priority: b2 };
          for (var c2 = 0; c2 < Pc.length && 0 !== b2 && b2 < Pc[c2].priority; c2++)
            ;
          Pc.splice(c2, 0, a2);
          0 === c2 && Uc(a2);
        }
      };
      function ml(a2) {
        return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
      }
      function nl(a2) {
        return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
      }
      function ol() {
      }
      function pl(a2, b2, c2, d2, e2) {
        if (e2) {
          if ("function" === typeof d2) {
            var f2 = d2;
            d2 = function() {
              var a3 = fl(g2);
              f2.call(a3);
            };
          }
          var g2 = dl(b2, d2, a2, 0, null, false, false, "", ol);
          a2._reactRootContainer = g2;
          a2[tf] = g2.current;
          rf(8 === a2.nodeType ? a2.parentNode : a2);
          Qk();
          return g2;
        }
        for (; e2 = a2.lastChild; )
          a2.removeChild(e2);
        if ("function" === typeof d2) {
          var h2 = d2;
          d2 = function() {
            var a3 = fl(k);
            h2.call(a3);
          };
        }
        var k = al(a2, 0, false, null, null, false, false, "", ol);
        a2._reactRootContainer = k;
        a2[tf] = k.current;
        rf(8 === a2.nodeType ? a2.parentNode : a2);
        Qk(function() {
          el(b2, k, c2, d2);
        });
        return k;
      }
      function ql(a2, b2, c2, d2, e2) {
        var f2 = c2._reactRootContainer;
        if (f2) {
          var g2 = f2;
          if ("function" === typeof e2) {
            var h2 = e2;
            e2 = function() {
              var a3 = fl(g2);
              h2.call(a3);
            };
          }
          el(b2, g2, a2, e2);
        } else
          g2 = pl(c2, b2, a2, e2, d2);
        return fl(g2);
      }
      Dc = function(a2) {
        switch (a2.tag) {
          case 3:
            var b2 = a2.stateNode;
            if (b2.current.memoizedState.isDehydrated) {
              var c2 = sc(b2.pendingLanes);
              0 !== c2 && (Bc(b2, c2 | 1), Ck(b2, B()), 0 === (W & 6) && (aj = B() + 500, ig()));
            }
            break;
          case 13:
            var d2 = Jg();
            Qk(function() {
              return Lg(a2, 1, d2);
            });
            hl(a2, 1);
        }
      };
      Ec = function(a2) {
        if (13 === a2.tag) {
          var b2 = Jg();
          Lg(a2, 134217728, b2);
          hl(a2, 134217728);
        }
      };
      Fc = function(a2) {
        if (13 === a2.tag) {
          var b2 = Jg(), c2 = Kg(a2);
          Lg(a2, c2, b2);
          hl(a2, c2);
        }
      };
      Gc = function() {
        return C;
      };
      Hc = function(a2, b2) {
        var c2 = C;
        try {
          return C = a2, b2();
        } finally {
          C = c2;
        }
      };
      xb = function(a2, b2, c2) {
        switch (b2) {
          case "input":
            $a(a2, c2);
            b2 = c2.name;
            if ("radio" === c2.type && null != b2) {
              for (c2 = a2; c2.parentNode; )
                c2 = c2.parentNode;
              c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
              for (b2 = 0; b2 < c2.length; b2++) {
                var d2 = c2[b2];
                if (d2 !== a2 && d2.form === a2.form) {
                  var e2 = Cb(d2);
                  if (!e2)
                    throw Error(p2(90));
                  Va(d2);
                  $a(d2, e2);
                }
              }
            }
            break;
          case "textarea":
            hb(a2, c2);
            break;
          case "select":
            b2 = c2.value, null != b2 && eb(a2, !!c2.multiple, b2, false);
        }
      };
      Fb = Pk;
      Gb = Qk;
      var rl = { usingClientEntryPoint: false, Events: [Bb, te, Cb, Db, Eb, Pk] };
      var sl = { findFiberByHostInstance: Vc, bundleType: 0, version: "18.1.0", rendererPackageName: "react-dom" };
      var tl = { bundleType: sl.bundleType, version: sl.version, rendererPackageName: sl.rendererPackageName, rendererConfig: sl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ta.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
        a2 = Yb(a2);
        return null === a2 ? null : a2.stateNode;
      }, findFiberByHostInstance: sl.findFiberByHostInstance || il, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.1.0-next-22edb9f77-20220426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        ul = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!ul.isDisabled && ul.supportsFiber)
          try {
            jc = ul.inject(tl), kc = ul;
          } catch (a2) {
          }
      }
      var ul;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rl;
      exports.createPortal = function(a2, b2) {
        var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!ml(b2))
          throw Error(p2(200));
        return bl(a2, b2, null, c2);
      };
      exports.createRoot = function(a2, b2) {
        if (!ml(a2))
          throw Error(p2(299));
        var c2 = false, d2 = "", e2 = jl;
        null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e2 = b2.onRecoverableError));
        b2 = al(a2, 1, false, null, null, c2, false, d2, e2);
        a2[tf] = b2.current;
        rf(8 === a2.nodeType ? a2.parentNode : a2);
        return new kl(b2);
      };
      exports.findDOMNode = function(a2) {
        if (null == a2)
          return null;
        if (1 === a2.nodeType)
          return a2;
        var b2 = a2._reactInternals;
        if (void 0 === b2) {
          if ("function" === typeof a2.render)
            throw Error(p2(188));
          a2 = Object.keys(a2).join(",");
          throw Error(p2(268, a2));
        }
        a2 = Yb(b2);
        a2 = null === a2 ? null : a2.stateNode;
        return a2;
      };
      exports.flushSync = function(a2) {
        return Qk(a2);
      };
      exports.hydrate = function(a2, b2, c2) {
        if (!nl(b2))
          throw Error(p2(200));
        return ql(null, a2, b2, true, c2);
      };
      exports.hydrateRoot = function(a2, b2, c2) {
        if (!ml(a2))
          throw Error(p2(405));
        var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = jl;
        null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
        b2 = dl(b2, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g2);
        a2[tf] = b2.current;
        rf(a2);
        if (d2)
          for (a2 = 0; a2 < d2.length; a2++)
            c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(
              c2,
              e2
            );
        return new ll(b2);
      };
      exports.render = function(a2, b2, c2) {
        if (!nl(b2))
          throw Error(p2(200));
        return ql(null, a2, b2, false, c2);
      };
      exports.unmountComponentAtNode = function(a2) {
        if (!nl(a2))
          throw Error(p2(40));
        return a2._reactRootContainer ? (Qk(function() {
          ql(null, null, a2, false, function() {
            a2._reactRootContainer = null;
            a2[tf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Pk;
      exports.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
        if (!nl(c2))
          throw Error(p2(200));
        if (null == a2 || void 0 === a2._reactInternals)
          throw Error(p2(38));
        return ql(a2, b2, c2, false, d2);
      };
      exports.version = "18.1.0-next-22edb9f77-20220426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m2 = require_react_dom();
      if (true) {
        exports.createRoot = m2.createRoot;
        exports.hydrateRoot = m2.hydrateRoot;
      } else {
        i2 = m2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c2, o2) {
          i2.usingClientEntryPoint = true;
          try {
            return m2.createRoot(c2, o2);
          } finally {
            i2.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c2, h2, o2) {
          i2.usingClientEntryPoint = true;
          try {
            return m2.hydrateRoot(c2, h2, o2);
          } finally {
            i2.usingClientEntryPoint = false;
          }
        };
      }
      var i2;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f2 = require_react();
      var k = Symbol.for("react.element");
      var l2 = Symbol.for("react.fragment");
      var m2 = Object.prototype.hasOwnProperty;
      var n2 = f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p2 = { key: true, ref: true, __self: true, __source: true };
      function q(c2, a2, g2) {
        var b2, d2 = {}, e2 = null, h2 = null;
        void 0 !== g2 && (e2 = "" + g2);
        void 0 !== a2.key && (e2 = "" + a2.key);
        void 0 !== a2.ref && (h2 = a2.ref);
        for (b2 in a2)
          m2.call(a2, b2) && !p2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
        if (c2 && c2.defaultProps)
          for (b2 in a2 = c2.defaultProps, a2)
            void 0 === d2[b2] && (d2[b2] = a2[b2]);
        return { $$typeof: k, type: c2, key: e2, ref: h2, props: d2, _owner: n2.current };
      }
      exports.Fragment = l2;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/web-vitals/dist/web-vitals.js
  var web_vitals_exports = {};
  __export(web_vitals_exports, {
    getCLS: () => h,
    getFCP: () => d,
    getFID: () => L,
    getLCP: () => F,
    getTTFB: () => P
  });
  var e, t, n, i, r, a, o, u, c, f, s, m, v, d, p, l, h, T, y, g, E, S, w, L, b, F, P;
  var init_web_vitals = __esm({
    "node_modules/web-vitals/dist/web-vitals.js"() {
      r = function(e2, t2) {
        return { name: e2, value: void 0 === t2 ? -1 : t2, delta: 0, entries: [], id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12) };
      };
      a = function(e2, t2) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e2)) {
            if ("first-input" === e2 && !("PerformanceEventTiming" in self))
              return;
            var n2 = new PerformanceObserver(function(e3) {
              return e3.getEntries().map(t2);
            });
            return n2.observe({ type: e2, buffered: true }), n2;
          }
        } catch (e3) {
        }
      };
      o = function(e2, t2) {
        var n2 = function n3(i2) {
          "pagehide" !== i2.type && "hidden" !== document.visibilityState || (e2(i2), t2 && (removeEventListener("visibilitychange", n3, true), removeEventListener("pagehide", n3, true)));
        };
        addEventListener("visibilitychange", n2, true), addEventListener("pagehide", n2, true);
      };
      u = function(e2) {
        addEventListener("pageshow", function(t2) {
          t2.persisted && e2(t2);
        }, true);
      };
      c = function(e2, t2, n2) {
        var i2;
        return function(r2) {
          t2.value >= 0 && (r2 || n2) && (t2.delta = t2.value - (i2 || 0), (t2.delta || void 0 === i2) && (i2 = t2.value, e2(t2)));
        };
      };
      f = -1;
      s = function() {
        return "hidden" === document.visibilityState ? 0 : 1 / 0;
      };
      m = function() {
        o(function(e2) {
          var t2 = e2.timeStamp;
          f = t2;
        }, true);
      };
      v = function() {
        return f < 0 && (f = s(), m(), u(function() {
          setTimeout(function() {
            f = s(), m();
          }, 0);
        })), { get firstHiddenTime() {
          return f;
        } };
      };
      d = function(e2, t2) {
        var n2, i2 = v(), o2 = r("FCP"), f2 = function(e3) {
          "first-contentful-paint" === e3.name && (m2 && m2.disconnect(), e3.startTime < i2.firstHiddenTime && (o2.value = e3.startTime, o2.entries.push(e3), n2(true)));
        }, s2 = window.performance && performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0], m2 = s2 ? null : a("paint", f2);
        (s2 || m2) && (n2 = c(e2, o2, t2), s2 && f2(s2), u(function(i3) {
          o2 = r("FCP"), n2 = c(e2, o2, t2), requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              o2.value = performance.now() - i3.timeStamp, n2(true);
            });
          });
        }));
      };
      p = false;
      l = -1;
      h = function(e2, t2) {
        p || (d(function(e3) {
          l = e3.value;
        }), p = true);
        var n2, i2 = function(t3) {
          l > -1 && e2(t3);
        }, f2 = r("CLS", 0), s2 = 0, m2 = [], v2 = function(e3) {
          if (!e3.hadRecentInput) {
            var t3 = m2[0], i3 = m2[m2.length - 1];
            s2 && e3.startTime - i3.startTime < 1e3 && e3.startTime - t3.startTime < 5e3 ? (s2 += e3.value, m2.push(e3)) : (s2 = e3.value, m2 = [e3]), s2 > f2.value && (f2.value = s2, f2.entries = m2, n2());
          }
        }, h2 = a("layout-shift", v2);
        h2 && (n2 = c(i2, f2, t2), o(function() {
          h2.takeRecords().map(v2), n2(true);
        }), u(function() {
          s2 = 0, l = -1, f2 = r("CLS", 0), n2 = c(i2, f2, t2);
        }));
      };
      T = { passive: true, capture: true };
      y = new Date();
      g = function(i2, r2) {
        e || (e = r2, t = i2, n = new Date(), w(removeEventListener), E());
      };
      E = function() {
        if (t >= 0 && t < n - y) {
          var r2 = { entryType: "first-input", name: e.type, target: e.target, cancelable: e.cancelable, startTime: e.timeStamp, processingStart: e.timeStamp + t };
          i.forEach(function(e2) {
            e2(r2);
          }), i = [];
        }
      };
      S = function(e2) {
        if (e2.cancelable) {
          var t2 = (e2.timeStamp > 1e12 ? new Date() : performance.now()) - e2.timeStamp;
          "pointerdown" == e2.type ? function(e3, t3) {
            var n2 = function() {
              g(e3, t3), r2();
            }, i2 = function() {
              r2();
            }, r2 = function() {
              removeEventListener("pointerup", n2, T), removeEventListener("pointercancel", i2, T);
            };
            addEventListener("pointerup", n2, T), addEventListener("pointercancel", i2, T);
          }(t2, e2) : g(t2, e2);
        }
      };
      w = function(e2) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(t2) {
          return e2(t2, S, T);
        });
      };
      L = function(n2, f2) {
        var s2, m2 = v(), d2 = r("FID"), p2 = function(e2) {
          e2.startTime < m2.firstHiddenTime && (d2.value = e2.processingStart - e2.startTime, d2.entries.push(e2), s2(true));
        }, l2 = a("first-input", p2);
        s2 = c(n2, d2, f2), l2 && o(function() {
          l2.takeRecords().map(p2), l2.disconnect();
        }, true), l2 && u(function() {
          var a2;
          d2 = r("FID"), s2 = c(n2, d2, f2), i = [], t = -1, e = null, w(addEventListener), a2 = p2, i.push(a2), E();
        });
      };
      b = {};
      F = function(e2, t2) {
        var n2, i2 = v(), f2 = r("LCP"), s2 = function(e3) {
          var t3 = e3.startTime;
          t3 < i2.firstHiddenTime && (f2.value = t3, f2.entries.push(e3), n2());
        }, m2 = a("largest-contentful-paint", s2);
        if (m2) {
          n2 = c(e2, f2, t2);
          var d2 = function() {
            b[f2.id] || (m2.takeRecords().map(s2), m2.disconnect(), b[f2.id] = true, n2(true));
          };
          ["keydown", "click"].forEach(function(e3) {
            addEventListener(e3, d2, { once: true, capture: true });
          }), o(d2, true), u(function(i3) {
            f2 = r("LCP"), n2 = c(e2, f2, t2), requestAnimationFrame(function() {
              requestAnimationFrame(function() {
                f2.value = performance.now() - i3.timeStamp, b[f2.id] = true, n2(true);
              });
            });
          });
        }
      };
      P = function(e2) {
        var t2, n2 = r("TTFB");
        t2 = function() {
          try {
            var t3 = performance.getEntriesByType("navigation")[0] || function() {
              var e3 = performance.timing, t4 = { entryType: "navigation", startTime: 0 };
              for (var n3 in e3)
                "navigationStart" !== n3 && "toJSON" !== n3 && (t4[n3] = Math.max(e3[n3] - e3.navigationStart, 0));
              return t4;
            }();
            if (n2.value = n2.delta = t3.responseStart, n2.value < 0 || n2.value > performance.now())
              return;
            n2.entries = [t3], e2(n2);
          } catch (e3) {
          }
        }, "complete" === document.readyState ? setTimeout(t2, 0) : addEventListener("load", function() {
          return setTimeout(t2, 0);
        });
      };
    }
  });

  // src/index.tsx
  var import_react28 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // src/components/Header.tsx
  var import_react4 = __toESM(require_react());

  // src/icon/console.svg
  var React = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var SvgConsole = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    role: "img",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
        d: "M26,5H6a5,5,0,0,0-5,5V22a5,5,0,0,0,5,5H26a5,5,0,0,0,5-5V10A5,5,0,0,0,26,5ZM20,7V25H12V7ZM3,22V10A3,3,0,0,1,6,7h4V25H6A3,3,0,0,1,3,22Zm26,0a3,3,0,0,1-3,3H22V7h4a3,3,0,0,1,3,3Z"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
        d: "M8.5 15h-1V14a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V17h1a1 1 0 0 0 0-2zM27.62 13.88a1 1 0 0 0-1.41 0l-.71.71-.71-.71a1 1 0 0 0-1.41 1.41l.71.71-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41L26.91 16l.71-.71A1 1 0 0 0 27.62 13.88z"
      })
    ]
  });

  // node_modules/immutable/dist/immutable.es.js
  var DELETE = "delete";
  var SHIFT = 5;
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;
  var NOT_SET = {};
  function MakeRef() {
    return { value: false };
  }
  function SetRef(ref) {
    if (ref) {
      ref.value = true;
    }
  }
  function OwnerID() {
  }
  function ensureSize(iter) {
    if (iter.size === void 0) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }
  function wrapIndex(iter, index2) {
    if (typeof index2 !== "number") {
      var uint32Index = index2 >>> 0;
      if ("" + uint32Index !== index2 || uint32Index === 4294967295) {
        return NaN;
      }
      index2 = uint32Index;
    }
    return index2 < 0 ? ensureSize(iter) + index2 : index2;
  }
  function returnTrue() {
    return true;
  }
  function wholeSlice(begin, end, size) {
    return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
  }
  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }
  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }
  function resolveIndex(index2, size, defaultIndex) {
    return index2 === void 0 ? defaultIndex : isNeg(index2) ? size === Infinity ? size : Math.max(0, size + index2) | 0 : size === void 0 || size === index2 ? index2 : Math.min(size, index2) | 0;
  }
  function isNeg(value) {
    return value < 0 || value === 0 && 1 / value === -Infinity;
  }
  var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
  function isCollection(maybeCollection) {
    return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
  }
  var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
  function isKeyed(maybeKeyed) {
    return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
  }
  var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
  function isIndexed(maybeIndexed) {
    return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
  }
  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }
  var Collection = function Collection2(value) {
    return isCollection(value) ? value : Seq(value);
  };
  var KeyedCollection = /* @__PURE__ */ function(Collection3) {
    function KeyedCollection2(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }
    if (Collection3)
      KeyedCollection2.__proto__ = Collection3;
    KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
    KeyedCollection2.prototype.constructor = KeyedCollection2;
    return KeyedCollection2;
  }(Collection);
  var IndexedCollection = /* @__PURE__ */ function(Collection3) {
    function IndexedCollection2(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }
    if (Collection3)
      IndexedCollection2.__proto__ = Collection3;
    IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
    IndexedCollection2.prototype.constructor = IndexedCollection2;
    return IndexedCollection2;
  }(Collection);
  var SetCollection = /* @__PURE__ */ function(Collection3) {
    function SetCollection2(value) {
      return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
    }
    if (Collection3)
      SetCollection2.__proto__ = Collection3;
    SetCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
    SetCollection2.prototype.constructor = SetCollection2;
    return SetCollection2;
  }(Collection);
  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;
  var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
  function isSeq(maybeSeq) {
    return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
  }
  var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
  function isRecord(maybeRecord) {
    return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
  }
  function isImmutable(maybeImmutable) {
    return isCollection(maybeImmutable) || isRecord(maybeImmutable);
  }
  var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
  function isOrdered(maybeOrdered) {
    return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
  }
  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;
  var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";
  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
  var Iterator = function Iterator2(next) {
    this.next = next;
  };
  Iterator.prototype.toString = function toString() {
    return "[Iterator]";
  };
  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;
  Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function() {
    return this;
  };
  function iteratorValue(type, k, v2, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v2 : [k, v2];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value,
      done: false
    };
    return iteratorResult;
  }
  function iteratorDone() {
    return { value: void 0, done: true };
  }
  function hasIterator(maybeIterable) {
    if (Array.isArray(maybeIterable)) {
      return true;
    }
    return !!getIteratorFn(maybeIterable);
  }
  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === "function";
  }
  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }
  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === "function") {
      return iteratorFn;
    }
  }
  function isEntriesIterable(maybeIterable) {
    var iteratorFn = getIteratorFn(maybeIterable);
    return iteratorFn && iteratorFn === maybeIterable.entries;
  }
  function isKeysIterable(maybeIterable) {
    var iteratorFn = getIteratorFn(maybeIterable);
    return iteratorFn && iteratorFn === maybeIterable.keys;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function isArrayLike(value) {
    if (Array.isArray(value) || typeof value === "string") {
      return true;
    }
    return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? Object.keys(value).length === 1 : value.hasOwnProperty(value.length - 1));
  }
  var Seq = /* @__PURE__ */ function(Collection3) {
    function Seq2(value) {
      return value === null || value === void 0 ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
    }
    if (Collection3)
      Seq2.__proto__ = Collection3;
    Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
    Seq2.prototype.constructor = Seq2;
    Seq2.prototype.toSeq = function toSeq3() {
      return this;
    };
    Seq2.prototype.toString = function toString5() {
      return this.__toString("Seq {", "}");
    };
    Seq2.prototype.cacheResult = function cacheResult() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };
    Seq2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i2 = 0;
        while (i2 !== size) {
          var entry = cache[reverse3 ? size - ++i2 : i2++];
          if (fn(entry[1], entry[0], this) === false) {
            break;
          }
        }
        return i2;
      }
      return this.__iterateUncached(fn, reverse3);
    };
    Seq2.prototype.__iterator = function __iterator2(type, reverse3) {
      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i2 = 0;
        return new Iterator(function() {
          if (i2 === size) {
            return iteratorDone();
          }
          var entry = cache[reverse3 ? size - ++i2 : i2++];
          return iteratorValue(type, entry[0], entry[1]);
        });
      }
      return this.__iteratorUncached(type, reverse3);
    };
    return Seq2;
  }(Collection);
  var KeyedSeq = /* @__PURE__ */ function(Seq2) {
    function KeyedSeq2(value) {
      return value === null || value === void 0 ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
    }
    if (Seq2)
      KeyedSeq2.__proto__ = Seq2;
    KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    KeyedSeq2.prototype.constructor = KeyedSeq2;
    KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq3() {
      return this;
    };
    return KeyedSeq2;
  }(Seq);
  var IndexedSeq = /* @__PURE__ */ function(Seq2) {
    function IndexedSeq2(value) {
      return value === null || value === void 0 ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
    }
    if (Seq2)
      IndexedSeq2.__proto__ = Seq2;
    IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    IndexedSeq2.prototype.constructor = IndexedSeq2;
    IndexedSeq2.of = function of() {
      return IndexedSeq2(arguments);
    };
    IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq2() {
      return this;
    };
    IndexedSeq2.prototype.toString = function toString5() {
      return this.__toString("Seq [", "]");
    };
    return IndexedSeq2;
  }(Seq);
  var SetSeq = /* @__PURE__ */ function(Seq2) {
    function SetSeq2(value) {
      return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
    }
    if (Seq2)
      SetSeq2.__proto__ = Seq2;
    SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    SetSeq2.prototype.constructor = SetSeq2;
    SetSeq2.of = function of() {
      return SetSeq2(arguments);
    };
    SetSeq2.prototype.toSetSeq = function toSetSeq2() {
      return this;
    };
    return SetSeq2;
  }(Seq);
  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;
  Seq.prototype[IS_SEQ_SYMBOL] = true;
  var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
    function ArraySeq2(array) {
      this._array = array;
      this.size = array.length;
    }
    if (IndexedSeq2)
      ArraySeq2.__proto__ = IndexedSeq2;
    ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    ArraySeq2.prototype.constructor = ArraySeq2;
    ArraySeq2.prototype.get = function get11(index2, notSetValue) {
      return this.has(index2) ? this._array[wrapIndex(this, index2)] : notSetValue;
    };
    ArraySeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var array = this._array;
      var size = array.length;
      var i2 = 0;
      while (i2 !== size) {
        var ii = reverse3 ? size - ++i2 : i2++;
        if (fn(array[ii], ii, this) === false) {
          break;
        }
      }
      return i2;
    };
    ArraySeq2.prototype.__iterator = function __iterator2(type, reverse3) {
      var array = this._array;
      var size = array.length;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var ii = reverse3 ? size - ++i2 : i2++;
        return iteratorValue(type, ii, array[ii]);
      });
    };
    return ArraySeq2;
  }(IndexedSeq);
  var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
    function ObjectSeq2(object) {
      var keys2 = Object.keys(object);
      this._object = object;
      this._keys = keys2;
      this.size = keys2.length;
    }
    if (KeyedSeq2)
      ObjectSeq2.__proto__ = KeyedSeq2;
    ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    ObjectSeq2.prototype.constructor = ObjectSeq2;
    ObjectSeq2.prototype.get = function get11(key, notSetValue) {
      if (notSetValue !== void 0 && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };
    ObjectSeq2.prototype.has = function has5(key) {
      return hasOwnProperty.call(this._object, key);
    };
    ObjectSeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var object = this._object;
      var keys2 = this._keys;
      var size = keys2.length;
      var i2 = 0;
      while (i2 !== size) {
        var key = keys2[reverse3 ? size - ++i2 : i2++];
        if (fn(object[key], key, this) === false) {
          break;
        }
      }
      return i2;
    };
    ObjectSeq2.prototype.__iterator = function __iterator2(type, reverse3) {
      var object = this._object;
      var keys2 = this._keys;
      var size = keys2.length;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var key = keys2[reverse3 ? size - ++i2 : i2++];
        return iteratorValue(type, key, object[key]);
      });
    };
    return ObjectSeq2;
  }(KeyedSeq);
  ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
  var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
    function CollectionSeq2(collection) {
      this._collection = collection;
      this.size = collection.length || collection.size;
    }
    if (IndexedSeq2)
      CollectionSeq2.__proto__ = IndexedSeq2;
    CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    CollectionSeq2.prototype.constructor = CollectionSeq2;
    CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse3) {
      if (reverse3) {
        return this.cacheResult().__iterate(fn, reverse3);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };
    CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse3) {
      if (reverse3) {
        return this.cacheResult().__iterator(type, reverse3);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };
    return CollectionSeq2;
  }(IndexedSeq);
  var EMPTY_SEQ;
  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }
  function keyedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq.fromEntrySeq();
    }
    if (typeof value === "object") {
      return new ObjectSeq(value);
    }
    throw new TypeError(
      "Expected Array or collection object of [k, v] entries, or keyed object: " + value
    );
  }
  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq;
    }
    throw new TypeError(
      "Expected Array or collection object of values: " + value
    );
  }
  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
    }
    if (typeof value === "object") {
      return new ObjectSeq(value);
    }
    throw new TypeError(
      "Expected Array or collection object of values, or keyed object: " + value
    );
  }
  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
  }
  var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
  function isMap(maybeMap) {
    return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
  }
  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }
  function isValueObject(maybeValue) {
    return Boolean(
      maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
    );
  }
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
  }
  var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a2, b2) {
    a2 |= 0;
    b2 |= 0;
    var c2 = a2 & 65535;
    var d2 = b2 & 65535;
    return c2 * d2 + ((a2 >>> 16) * d2 + c2 * (b2 >>> 16) << 16 >>> 0) | 0;
  };
  function smi(i32) {
    return i32 >>> 1 & 1073741824 | i32 & 3221225471;
  }
  var defaultValueOf = Object.prototype.valueOf;
  function hash(o2) {
    if (o2 == null) {
      return hashNullish(o2);
    }
    if (typeof o2.hashCode === "function") {
      return smi(o2.hashCode(o2));
    }
    var v2 = valueOf(o2);
    if (v2 == null) {
      return hashNullish(v2);
    }
    switch (typeof v2) {
      case "boolean":
        return v2 ? 1108378657 : 1108378656;
      case "number":
        return hashNumber(v2);
      case "string":
        return v2.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v2) : hashString(v2);
      case "object":
      case "function":
        return hashJSObj(v2);
      case "symbol":
        return hashSymbol(v2);
      default:
        if (typeof v2.toString === "function") {
          return hashString(v2.toString());
        }
        throw new Error("Value type " + typeof v2 + " cannot be hashed.");
    }
  }
  function hashNullish(nullish) {
    return nullish === null ? 1108378658 : 1108378659;
  }
  function hashNumber(n2) {
    if (n2 !== n2 || n2 === Infinity) {
      return 0;
    }
    var hash2 = n2 | 0;
    if (hash2 !== n2) {
      hash2 ^= n2 * 4294967295;
    }
    while (n2 > 4294967295) {
      n2 /= 4294967295;
      hash2 ^= n2;
    }
    return smi(hash2);
  }
  function cachedHashString(string) {
    var hashed = stringHashCache[string];
    if (hashed === void 0) {
      hashed = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hashed;
    }
    return hashed;
  }
  function hashString(string) {
    var hashed = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hashed = 31 * hashed + string.charCodeAt(ii) | 0;
    }
    return smi(hashed);
  }
  function hashSymbol(sym) {
    var hashed = symbolMap[sym];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = nextHash();
    symbolMap[sym] = hashed;
    return hashed;
  }
  function hashJSObj(obj) {
    var hashed;
    if (usingWeakMap) {
      hashed = weakMap.get(obj);
      if (hashed !== void 0) {
        return hashed;
      }
    }
    hashed = obj[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    if (!canDefineProperty) {
      hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hashed !== void 0) {
        return hashed;
      }
      hashed = getIENodeHash(obj);
      if (hashed !== void 0) {
        return hashed;
      }
    }
    hashed = nextHash();
    if (usingWeakMap) {
      weakMap.set(obj, hashed);
    } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
      throw new Error("Non-extensible objects are not allowed as keys.");
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: hashed
      });
    } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(
          this,
          arguments
        );
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
    } else if (obj.nodeType !== void 0) {
      obj[UID_HASH_KEY] = hashed;
    } else {
      throw new Error("Unable to set a non-enumerable property on object.");
    }
    return hashed;
  }
  var isExtensible = Object.isExtensible;
  var canDefineProperty = function() {
    try {
      Object.defineProperty({}, "@", {});
      return true;
    } catch (e2) {
      return false;
    }
  }();
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          return node.uniqueID;
        case 9:
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }
  function valueOf(obj) {
    return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
  }
  function nextHash() {
    var nextHash2 = ++_objHashUID;
    if (_objHashUID & 1073741824) {
      _objHashUID = 0;
    }
    return nextHash2;
  }
  var usingWeakMap = typeof WeakMap === "function";
  var weakMap;
  if (usingWeakMap) {
    weakMap = /* @__PURE__ */ new WeakMap();
  }
  var symbolMap = /* @__PURE__ */ Object.create(null);
  var _objHashUID = 0;
  var UID_HASH_KEY = "__immutablehash__";
  if (typeof Symbol === "function") {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }
  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};
  var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
    function ToKeyedSequence2(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }
    if (KeyedSeq2)
      ToKeyedSequence2.__proto__ = KeyedSeq2;
    ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
    ToKeyedSequence2.prototype.get = function get11(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };
    ToKeyedSequence2.prototype.has = function has5(key) {
      return this._iter.has(key);
    };
    ToKeyedSequence2.prototype.valueSeq = function valueSeq2() {
      return this._iter.valueSeq();
    };
    ToKeyedSequence2.prototype.reverse = function reverse3() {
      var this$1$1 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function() {
          return this$1$1._iter.toSeq().reverse();
        };
      }
      return reversedSequence;
    };
    ToKeyedSequence2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function() {
          return this$1$1._iter.toSeq().map(mapper, context);
        };
      }
      return mappedSequence;
    };
    ToKeyedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      return this._iter.__iterate(function(v2, k) {
        return fn(v2, k, this$1$1);
      }, reverse3);
    };
    ToKeyedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
      return this._iter.__iterator(type, reverse3);
    };
    return ToKeyedSequence2;
  }(KeyedSeq);
  ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
  var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
    function ToIndexedSequence2(iter) {
      this._iter = iter;
      this.size = iter.size;
    }
    if (IndexedSeq2)
      ToIndexedSequence2.__proto__ = IndexedSeq2;
    ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
    ToIndexedSequence2.prototype.includes = function includes3(value) {
      return this._iter.includes(value);
    };
    ToIndexedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      var i2 = 0;
      reverse3 && ensureSize(this);
      return this._iter.__iterate(
        function(v2) {
          return fn(v2, reverse3 ? this$1$1.size - ++i2 : i2++, this$1$1);
        },
        reverse3
      );
    };
    ToIndexedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
      var this$1$1 = this;
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
      var i2 = 0;
      reverse3 && ensureSize(this);
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(
          type,
          reverse3 ? this$1$1.size - ++i2 : i2++,
          step.value,
          step
        );
      });
    };
    return ToIndexedSequence2;
  }(IndexedSeq);
  var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
    function ToSetSequence2(iter) {
      this._iter = iter;
      this.size = iter.size;
    }
    if (SetSeq2)
      ToSetSequence2.__proto__ = SetSeq2;
    ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
    ToSetSequence2.prototype.constructor = ToSetSequence2;
    ToSetSequence2.prototype.has = function has5(key) {
      return this._iter.includes(key);
    };
    ToSetSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      return this._iter.__iterate(function(v2) {
        return fn(v2, v2, this$1$1);
      }, reverse3);
    };
    ToSetSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, step.value, step.value, step);
      });
    };
    return ToSetSequence2;
  }(SetSeq);
  var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
    function FromEntriesSequence2(entries3) {
      this._iter = entries3;
      this.size = entries3.size;
    }
    if (KeyedSeq2)
      FromEntriesSequence2.__proto__ = KeyedSeq2;
    FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
    FromEntriesSequence2.prototype.entrySeq = function entrySeq2() {
      return this._iter.toSeq();
    };
    FromEntriesSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      return this._iter.__iterate(function(entry) {
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return fn(
            indexedCollection ? entry.get(1) : entry[1],
            indexedCollection ? entry.get(0) : entry[0],
            this$1$1
          );
        }
      }, reverse3);
    };
    FromEntriesSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
      return new Iterator(function() {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          if (entry) {
            validateEntry(entry);
            var indexedCollection = isCollection(entry);
            return iteratorValue(
              type,
              indexedCollection ? entry.get(0) : entry[0],
              indexedCollection ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };
    return FromEntriesSequence2;
  }(KeyedSeq);
  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
  function flipFactory(collection) {
    var flipSequence = makeSequence(collection);
    flipSequence._iter = collection;
    flipSequence.size = collection.size;
    flipSequence.flip = function() {
      return collection;
    };
    flipSequence.reverse = function() {
      var reversedSequence = collection.reverse.apply(this);
      reversedSequence.flip = function() {
        return collection.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function(key) {
      return collection.includes(key);
    };
    flipSequence.includes = function(key) {
      return collection.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      return collection.__iterate(function(v2, k) {
        return fn(k, v2, this$1$1) !== false;
      }, reverse3);
    };
    flipSequence.__iteratorUncached = function(type, reverse3) {
      if (type === ITERATE_ENTRIES) {
        var iterator = collection.__iterator(type, reverse3);
        return new Iterator(function() {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return collection.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse3
      );
    };
    return flipSequence;
  }
  function mapFactory(collection, mapper, context) {
    var mappedSequence = makeSequence(collection);
    mappedSequence.size = collection.size;
    mappedSequence.has = function(key) {
      return collection.has(key);
    };
    mappedSequence.get = function(key, notSetValue) {
      var v2 = collection.get(key, NOT_SET);
      return v2 === NOT_SET ? notSetValue : mapper.call(context, v2, key, collection);
    };
    mappedSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      return collection.__iterate(
        function(v2, k, c2) {
          return fn(mapper.call(context, v2, k, c2), k, this$1$1) !== false;
        },
        reverse3
      );
    };
    mappedSequence.__iteratorUncached = function(type, reverse3) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, collection),
          step
        );
      });
    };
    return mappedSequence;
  }
  function reverseFactory(collection, useKeys) {
    var this$1$1 = this;
    var reversedSequence = makeSequence(collection);
    reversedSequence._iter = collection;
    reversedSequence.size = collection.size;
    reversedSequence.reverse = function() {
      return collection;
    };
    if (collection.flip) {
      reversedSequence.flip = function() {
        var flipSequence = flipFactory(collection);
        flipSequence.reverse = function() {
          return collection.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) {
      return collection.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function(key) {
      return collection.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function(value) {
      return collection.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function(fn, reverse3) {
      var this$1$12 = this;
      var i2 = 0;
      reverse3 && ensureSize(collection);
      return collection.__iterate(
        function(v2, k) {
          return fn(v2, useKeys ? k : reverse3 ? this$1$12.size - ++i2 : i2++, this$1$12);
        },
        !reverse3
      );
    };
    reversedSequence.__iterator = function(type, reverse3) {
      var i2 = 0;
      reverse3 && ensureSize(collection);
      var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        return iteratorValue(
          type,
          useKeys ? entry[0] : reverse3 ? this$1$1.size - ++i2 : i2++,
          entry[1],
          step
        );
      });
    };
    return reversedSequence;
  }
  function filterFactory(collection, predicate, context, useKeys) {
    var filterSequence = makeSequence(collection);
    if (useKeys) {
      filterSequence.has = function(key) {
        var v2 = collection.get(key, NOT_SET);
        return v2 !== NOT_SET && !!predicate.call(context, v2, key, collection);
      };
      filterSequence.get = function(key, notSetValue) {
        var v2 = collection.get(key, NOT_SET);
        return v2 !== NOT_SET && predicate.call(context, v2, key, collection) ? v2 : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      var iterations = 0;
      collection.__iterate(function(v2, k, c2) {
        if (predicate.call(context, v2, k, c2)) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1);
        }
      }, reverse3);
      return iterations;
    };
    filterSequence.__iteratorUncached = function(type, reverse3) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
      var iterations = 0;
      return new Iterator(function() {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, collection)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }
  function countByFactory(collection, grouper, context) {
    var groups = Map2().asMutable();
    collection.__iterate(function(v2, k) {
      groups.update(grouper.call(context, v2, k, collection), 0, function(a2) {
        return a2 + 1;
      });
    });
    return groups.asImmutable();
  }
  function groupByFactory(collection, grouper, context) {
    var isKeyedIter = isKeyed(collection);
    var groups = (isOrdered(collection) ? OrderedMap() : Map2()).asMutable();
    collection.__iterate(function(v2, k) {
      groups.update(
        grouper.call(context, v2, k, collection),
        function(a2) {
          return a2 = a2 || [], a2.push(isKeyedIter ? [k, v2] : v2), a2;
        }
      );
    });
    var coerce = collectionClass(collection);
    return groups.map(function(arr) {
      return reify(collection, coerce(arr));
    }).asImmutable();
  }
  function sliceFactory(collection, begin, end, useKeys) {
    var originalSize = collection.size;
    if (wholeSlice(begin, end, originalSize)) {
      return collection;
    }
    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
    }
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }
    var sliceSeq = makeSequence(collection);
    sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
    if (!useKeys && isSeq(collection) && sliceSize >= 0) {
      sliceSeq.get = function(index2, notSetValue) {
        index2 = wrapIndex(this, index2);
        return index2 >= 0 && index2 < sliceSize ? collection.get(index2 + resolvedBegin, notSetValue) : notSetValue;
      };
    }
    sliceSeq.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse3) {
        return this.cacheResult().__iterate(fn, reverse3);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function(v2, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };
    sliceSeq.__iteratorUncached = function(type, reverse3) {
      if (sliceSize !== 0 && reverse3) {
        return this.cacheResult().__iterator(type, reverse3);
      }
      if (sliceSize === 0) {
        return new Iterator(iteratorDone);
      }
      var iterator = collection.__iterator(type, reverse3);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function() {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES || step.done) {
          return step;
        }
        if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, void 0, step);
        }
        return iteratorValue(type, iterations - 1, step.value[1], step);
      });
    };
    return sliceSeq;
  }
  function takeWhileFactory(collection, predicate, context) {
    var takeSequence = makeSequence(collection);
    takeSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      if (reverse3) {
        return this.cacheResult().__iterate(fn, reverse3);
      }
      var iterations = 0;
      collection.__iterate(
        function(v2, k, c2) {
          return predicate.call(context, v2, k, c2) && ++iterations && fn(v2, k, this$1$1);
        }
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse3) {
      var this$1$1 = this;
      if (reverse3) {
        return this.cacheResult().__iterator(type, reverse3);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
      var iterating = true;
      return new Iterator(function() {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v2 = entry[1];
        if (!predicate.call(context, v2, k, this$1$1)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v2, step);
      });
    };
    return takeSequence;
  }
  function skipWhileFactory(collection, predicate, context, useKeys) {
    var skipSequence = makeSequence(collection);
    skipSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      if (reverse3) {
        return this.cacheResult().__iterate(fn, reverse3);
      }
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function(v2, k, c2) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v2, k, c2)))) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse3) {
      var this$1$1 = this;
      if (reverse3) {
        return this.cacheResult().__iterator(type, reverse3);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function() {
        var step;
        var k;
        var v2;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            }
            if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, void 0, step);
            }
            return iteratorValue(type, iterations++, step.value[1], step);
          }
          var entry = step.value;
          k = entry[0];
          v2 = entry[1];
          skipping && (skipping = predicate.call(context, v2, k, this$1$1));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v2, step);
      });
    };
    return skipSequence;
  }
  function concatFactory(collection, values2) {
    var isKeyedCollection = isKeyed(collection);
    var iters = [collection].concat(values2).map(function(v2) {
      if (!isCollection(v2)) {
        v2 = isKeyedCollection ? keyedSeqFromValue(v2) : indexedSeqFromValue(Array.isArray(v2) ? v2 : [v2]);
      } else if (isKeyedCollection) {
        v2 = KeyedCollection(v2);
      }
      return v2;
    }).filter(function(v2) {
      return v2.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
        return singleton;
      }
    }
    var concatSeq = new ArraySeq(iters);
    if (isKeyedCollection) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(collection)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function(sum, seq) {
      if (sum !== void 0) {
        var size = seq.size;
        if (size !== void 0) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }
  function flattenFactory(collection, depth, useKeys) {
    var flatSequence = makeSequence(collection);
    flatSequence.__iterateUncached = function(fn, reverse3) {
      if (reverse3) {
        return this.cacheResult().__iterate(fn, reverse3);
      }
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        iter.__iterate(function(v2, k) {
          if ((!depth || currentDepth < depth) && isCollection(v2)) {
            flatDeep(v2, currentDepth + 1);
          } else {
            iterations++;
            if (fn(v2, useKeys ? k : iterations - 1, flatSequence) === false) {
              stopped = true;
            }
          }
          return !stopped;
        }, reverse3);
      }
      flatDeep(collection, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse3) {
      if (reverse3) {
        return this.cacheResult().__iterator(type, reverse3);
      }
      var iterator = collection.__iterator(type, reverse3);
      var stack = [];
      var iterations = 0;
      return new Iterator(function() {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v2 = step.value;
          if (type === ITERATE_ENTRIES) {
            v2 = v2[1];
          }
          if ((!depth || stack.length < depth) && isCollection(v2)) {
            stack.push(iterator);
            iterator = v2.__iterator(type, reverse3);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v2, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }
  function flatMapFactory(collection, mapper, context) {
    var coerce = collectionClass(collection);
    return collection.toSeq().map(function(v2, k) {
      return coerce(mapper.call(context, v2, k, collection));
    }).flatten(true);
  }
  function interposeFactory(collection, separator) {
    var interposedSequence = makeSequence(collection);
    interposedSequence.size = collection.size && collection.size * 2 - 1;
    interposedSequence.__iterateUncached = function(fn, reverse3) {
      var this$1$1 = this;
      var iterations = 0;
      collection.__iterate(
        function(v2) {
          return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v2, iterations++, this$1$1) !== false;
        },
        reverse3
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse3) {
      var iterator = collection.__iterator(ITERATE_VALUES, reverse3);
      var iterations = 0;
      var step;
      return new Iterator(function() {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }
  function sortFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedCollection = isKeyed(collection);
    var index2 = 0;
    var entries3 = collection.toSeq().map(function(v2, k) {
      return [k, v2, index2++, mapper ? mapper(v2, k, collection) : v2];
    }).valueSeq().toArray();
    entries3.sort(function(a2, b2) {
      return comparator(a2[3], b2[3]) || a2[2] - b2[2];
    }).forEach(
      isKeyedCollection ? function(v2, i2) {
        entries3[i2].length = 2;
      } : function(v2, i2) {
        entries3[i2] = v2[1];
      }
    );
    return isKeyedCollection ? KeyedSeq(entries3) : isIndexed(collection) ? IndexedSeq(entries3) : SetSeq(entries3);
  }
  function maxFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = collection.toSeq().map(function(v2, k) {
        return [v2, mapper(v2, k, collection)];
      }).reduce(function(a2, b2) {
        return maxCompare(comparator, a2[1], b2[1]) ? b2 : a2;
      });
      return entry && entry[0];
    }
    return collection.reduce(function(a2, b2) {
      return maxCompare(comparator, a2, b2) ? b2 : a2;
    });
  }
  function maxCompare(comparator, a2, b2) {
    var comp = comparator(b2, a2);
    return comp === 0 && b2 !== a2 && (b2 === void 0 || b2 === null || b2 !== b2) || comp > 0;
  }
  function zipWithFactory(keyIter, zipper, iters, zipAll2) {
    var zipSequence = makeSequence(keyIter);
    var sizes = new ArraySeq(iters).map(function(i2) {
      return i2.size;
    });
    zipSequence.size = zipAll2 ? sizes.max() : sizes.min();
    zipSequence.__iterate = function(fn, reverse3) {
      var iterator = this.__iterator(ITERATE_VALUES, reverse3);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse3) {
      var iterators = iters.map(
        function(i2) {
          return i2 = Collection(i2), getIterator(reverse3 ? i2.reverse() : i2);
        }
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function() {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i2) {
            return i2.next();
          });
          isDone = zipAll2 ? steps.every(function(s2) {
            return s2.done;
          }) : steps.some(function(s2) {
            return s2.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(
            null,
            steps.map(function(s2) {
              return s2.value;
            })
          )
        );
      });
    };
    return zipSequence;
  }
  function reify(iter, seq) {
    return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
  }
  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError("Expected [K, V] tuple: " + entry);
    }
  }
  function collectionClass(collection) {
    return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
  }
  function makeSequence(collection) {
    return Object.create(
      (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
    );
  }
  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    }
    return Seq.prototype.cacheResult.call(this);
  }
  function defaultComparator(a2, b2) {
    if (a2 === void 0 && b2 === void 0) {
      return 0;
    }
    if (a2 === void 0) {
      return 1;
    }
    if (b2 === void 0) {
      return -1;
    }
    return a2 > b2 ? 1 : a2 < b2 ? -1 : 0;
  }
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }
  function invariant(condition, error) {
    if (!condition) {
      throw new Error(error);
    }
  }
  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      "Cannot perform this action with an infinite size."
    );
  }
  function coerceKeyPath(keyPath) {
    if (isArrayLike(keyPath) && typeof keyPath !== "string") {
      return keyPath;
    }
    if (isOrdered(keyPath)) {
      return keyPath.toArray();
    }
    throw new TypeError(
      "Invalid keyPath: expected Ordered Collection or Array: " + keyPath
    );
  }
  var toString2 = Object.prototype.toString;
  function isPlainObject(value) {
    if (!value || typeof value !== "object" || toString2.call(value) !== "[object Object]") {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var parentProto = proto;
    var nextProto = Object.getPrototypeOf(proto);
    while (nextProto !== null) {
      parentProto = nextProto;
      nextProto = Object.getPrototypeOf(parentProto);
    }
    return parentProto === proto;
  }
  function isDataStructure(value) {
    return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
  }
  function quoteString(value) {
    try {
      return typeof value === "string" ? JSON.stringify(value) : String(value);
    } catch (_ignoreError) {
      return JSON.stringify(value);
    }
  }
  function has(collection, key) {
    return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
  }
  function get(collection, key, notSetValue) {
    return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
  }
  function shallowCopy(from) {
    if (Array.isArray(from)) {
      return arrCopy(from);
    }
    var to = {};
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    return to;
  }
  function remove(collection, key) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        "Cannot update non-data-structure value: " + collection
      );
    }
    if (isImmutable(collection)) {
      if (!collection.remove) {
        throw new TypeError(
          "Cannot update immutable value without .remove() method: " + collection
        );
      }
      return collection.remove(key);
    }
    if (!hasOwnProperty.call(collection, key)) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    if (Array.isArray(collectionCopy)) {
      collectionCopy.splice(key, 1);
    } else {
      delete collectionCopy[key];
    }
    return collectionCopy;
  }
  function set(collection, key, value) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        "Cannot update non-data-structure value: " + collection
      );
    }
    if (isImmutable(collection)) {
      if (!collection.set) {
        throw new TypeError(
          "Cannot update immutable value without .set() method: " + collection
        );
      }
      return collection.set(key, value);
    }
    if (hasOwnProperty.call(collection, key) && value === collection[key]) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    collectionCopy[key] = value;
    return collectionCopy;
  }
  function updateIn$1(collection, keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = void 0;
    }
    var updatedValue = updateInDeeply(
      isImmutable(collection),
      collection,
      coerceKeyPath(keyPath),
      0,
      notSetValue,
      updater
    );
    return updatedValue === NOT_SET ? notSetValue : updatedValue;
  }
  function updateInDeeply(inImmutable, existing, keyPath, i2, notSetValue, updater) {
    var wasNotSet = existing === NOT_SET;
    if (i2 === keyPath.length) {
      var existingValue = wasNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    if (!wasNotSet && !isDataStructure(existing)) {
      throw new TypeError(
        "Cannot update within non-data-structure value in path [" + keyPath.slice(0, i2).map(quoteString) + "]: " + existing
      );
    }
    var key = keyPath[i2];
    var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
    var nextUpdated = updateInDeeply(
      nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
      nextExisting,
      keyPath,
      i2 + 1,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(
      wasNotSet ? inImmutable ? emptyMap() : {} : existing,
      key,
      nextUpdated
    );
  }
  function setIn$1(collection, keyPath, value) {
    return updateIn$1(collection, keyPath, NOT_SET, function() {
      return value;
    });
  }
  function setIn(keyPath, v2) {
    return setIn$1(this, keyPath, v2);
  }
  function removeIn(collection, keyPath) {
    return updateIn$1(collection, keyPath, function() {
      return NOT_SET;
    });
  }
  function deleteIn(keyPath) {
    return removeIn(this, keyPath);
  }
  function update$1(collection, key, notSetValue, updater) {
    return updateIn$1(collection, [key], notSetValue, updater);
  }
  function update(key, notSetValue, updater) {
    return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
  }
  function updateIn(keyPath, notSetValue, updater) {
    return updateIn$1(this, keyPath, notSetValue, updater);
  }
  function merge$1() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    return mergeIntoKeyedWith(this, iters);
  }
  function mergeWith$1(merger) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    if (typeof merger !== "function") {
      throw new TypeError("Invalid merger function: " + merger);
    }
    return mergeIntoKeyedWith(this, iters, merger);
  }
  function mergeIntoKeyedWith(collection, collections, merger) {
    var iters = [];
    for (var ii = 0; ii < collections.length; ii++) {
      var collection$1 = KeyedCollection(collections[ii]);
      if (collection$1.size !== 0) {
        iters.push(collection$1);
      }
    }
    if (iters.length === 0) {
      return collection;
    }
    if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection2) {
      var mergeIntoCollection = merger ? function(value, key) {
        update$1(
          collection2,
          key,
          NOT_SET,
          function(oldVal) {
            return oldVal === NOT_SET ? value : merger(oldVal, value, key);
          }
        );
      } : function(value, key) {
        collection2.set(key, value);
      };
      for (var ii2 = 0; ii2 < iters.length; ii2++) {
        iters[ii2].forEach(mergeIntoCollection);
      }
    });
  }
  function mergeDeepWithSources(collection, sources, merger) {
    return mergeWithSources(collection, sources, deepMergerWith(merger));
  }
  function mergeWithSources(collection, sources, merger) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        "Cannot merge into non-data-structure value: " + collection
      );
    }
    if (isImmutable(collection)) {
      return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
    }
    var isArray = Array.isArray(collection);
    var merged = collection;
    var Collection3 = isArray ? IndexedCollection : KeyedCollection;
    var mergeItem = isArray ? function(value) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged.push(value);
    } : function(value, key) {
      var hasVal = hasOwnProperty.call(merged, key);
      var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
      if (!hasVal || nextVal !== merged[key]) {
        if (merged === collection) {
          merged = shallowCopy(merged);
        }
        merged[key] = nextVal;
      }
    };
    for (var i2 = 0; i2 < sources.length; i2++) {
      Collection3(sources[i2]).forEach(mergeItem);
    }
    return merged;
  }
  function deepMergerWith(merger) {
    function deepMerger(oldValue, newValue, key) {
      return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
    }
    return deepMerger;
  }
  function areMergeable(oldDataStructure, newDataStructure) {
    var oldSeq = Seq(oldDataStructure);
    var newSeq = Seq(newDataStructure);
    return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
  }
  function mergeDeep() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    return mergeDeepWithSources(this, iters);
  }
  function mergeDeepWith(merger) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return mergeDeepWithSources(this, iters, merger);
  }
  function mergeIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return updateIn$1(this, keyPath, emptyMap(), function(m2) {
      return mergeWithSources(m2, iters);
    });
  }
  function mergeDeepIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return updateIn$1(
      this,
      keyPath,
      emptyMap(),
      function(m2) {
        return mergeDeepWithSources(m2, iters);
      }
    );
  }
  function withMutations(fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  }
  function asMutable() {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  }
  function asImmutable() {
    return this.__ensureOwner();
  }
  function wasAltered() {
    return this.__altered;
  }
  var Map2 = /* @__PURE__ */ function(KeyedCollection2) {
    function Map3(value) {
      return value === null || value === void 0 ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
        var iter = KeyedCollection2(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2, k) {
          return map2.set(k, v2);
        });
      });
    }
    if (KeyedCollection2)
      Map3.__proto__ = KeyedCollection2;
    Map3.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
    Map3.prototype.constructor = Map3;
    Map3.of = function of() {
      var keyValues = [], len = arguments.length;
      while (len--)
        keyValues[len] = arguments[len];
      return emptyMap().withMutations(function(map2) {
        for (var i2 = 0; i2 < keyValues.length; i2 += 2) {
          if (i2 + 1 >= keyValues.length) {
            throw new Error("Missing value for key: " + keyValues[i2]);
          }
          map2.set(keyValues[i2], keyValues[i2 + 1]);
        }
      });
    };
    Map3.prototype.toString = function toString5() {
      return this.__toString("Map {", "}");
    };
    Map3.prototype.get = function get11(k, notSetValue) {
      return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
    };
    Map3.prototype.set = function set3(k, v2) {
      return updateMap(this, k, v2);
    };
    Map3.prototype.remove = function remove3(k) {
      return updateMap(this, k, NOT_SET);
    };
    Map3.prototype.deleteAll = function deleteAll(keys2) {
      var collection = Collection(keys2);
      if (collection.size === 0) {
        return this;
      }
      return this.withMutations(function(map2) {
        collection.forEach(function(key) {
          return map2.remove(key);
        });
      });
    };
    Map3.prototype.clear = function clear2() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };
    Map3.prototype.sort = function sort3(comparator) {
      return OrderedMap(sortFactory(this, comparator));
    };
    Map3.prototype.sortBy = function sortBy2(mapper, comparator) {
      return OrderedMap(sortFactory(this, comparator, mapper));
    };
    Map3.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      return this.withMutations(function(map3) {
        map3.forEach(function(value, key) {
          map3.set(key, mapper.call(context, value, key, this$1$1));
        });
      });
    };
    Map3.prototype.__iterator = function __iterator2(type, reverse3) {
      return new MapIterator(this, type, reverse3);
    };
    Map3.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry) {
        iterations++;
        return fn(entry[1], entry[0], this$1$1);
      }, reverse3);
      return iterations;
    };
    Map3.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyMap();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };
    return Map3;
  }(KeyedCollection);
  Map2.isMap = isMap;
  var MapPrototype = Map2.prototype;
  MapPrototype[IS_MAP_SYMBOL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeAll = MapPrototype.deleteAll;
  MapPrototype.setIn = setIn;
  MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
  MapPrototype.update = update;
  MapPrototype.updateIn = updateIn;
  MapPrototype.merge = MapPrototype.concat = merge$1;
  MapPrototype.mergeWith = mergeWith$1;
  MapPrototype.mergeDeep = mergeDeep;
  MapPrototype.mergeDeepWith = mergeDeepWith;
  MapPrototype.mergeIn = mergeIn;
  MapPrototype.mergeDeepIn = mergeDeepIn;
  MapPrototype.withMutations = withMutations;
  MapPrototype.wasAltered = wasAltered;
  MapPrototype.asImmutable = asImmutable;
  MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
  MapPrototype["@@transducer/step"] = function(result, arr) {
    return result.set(arr[0], arr[1]);
  };
  MapPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  var ArrayMapNode = function ArrayMapNode2(ownerID, entries3) {
    this.ownerID = ownerID;
    this.entries = entries3;
  };
  ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    var entries3 = this.entries;
    for (var ii = 0, len = entries3.length; ii < len; ii++) {
      if (is(key, entries3[ii][0])) {
        return entries3[ii][1];
      }
    }
    return notSetValue;
  };
  ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var entries3 = this.entries;
    var idx = 0;
    var len = entries3.length;
    for (; idx < len; idx++) {
      if (is(key, entries3[idx][0])) {
        break;
      }
    }
    var exists = idx < len;
    if (exists ? entries3[idx][1] === value : removed) {
      return this;
    }
    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);
    if (removed && entries3.length === 1) {
      return;
    }
    if (!exists && !removed && entries3.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries3, key, value);
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries3 : arrCopy(entries3);
    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }
    if (isEditable) {
      this.entries = newEntries;
      return this;
    }
    return new ArrayMapNode(ownerID, newEntries);
  };
  var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  };
  BitmapIndexedNode.prototype.get = function get3(shift, keyHash, key, notSetValue) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(
      shift + SHIFT,
      keyHash,
      key,
      notSetValue
    );
  };
  BitmapIndexedNode.prototype.update = function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;
    if (!exists && value === NOT_SET) {
      return this;
    }
    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : void 0;
    var newNode = updateNode(
      node,
      ownerID,
      shift + SHIFT,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );
    if (newNode === node) {
      return this;
    }
    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }
    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }
    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }
    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };
  var HashArrayMapNode = function HashArrayMapNode2(ownerID, count2, nodes) {
    this.ownerID = ownerID;
    this.count = count2;
    this.nodes = nodes;
  };
  HashArrayMapNode.prototype.get = function get4(shift, keyHash, key, notSetValue) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };
  HashArrayMapNode.prototype.update = function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];
    if (removed && !node) {
      return this;
    }
    var newNode = updateNode(
      node,
      ownerID,
      shift + SHIFT,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );
    if (newNode === node) {
      return this;
    }
    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setAt(nodes, idx, newNode, isEditable);
    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }
    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };
  var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries3) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries3;
  };
  HashCollisionNode.prototype.get = function get5(shift, keyHash, key, notSetValue) {
    var entries3 = this.entries;
    for (var ii = 0, len = entries3.length; ii < len; ii++) {
      if (is(key, entries3[ii][0])) {
        return entries3[ii][1];
      }
    }
    return notSetValue;
  };
  HashCollisionNode.prototype.update = function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var removed = value === NOT_SET;
    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }
    var entries3 = this.entries;
    var idx = 0;
    var len = entries3.length;
    for (; idx < len; idx++) {
      if (is(key, entries3[idx][0])) {
        break;
      }
    }
    var exists = idx < len;
    if (exists ? entries3[idx][1] === value : removed) {
      return this;
    }
    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);
    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries3[idx ^ 1]);
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries3 : arrCopy(entries3);
    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }
    if (isEditable) {
      this.entries = newEntries;
      return this;
    }
    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };
  var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  };
  ValueNode.prototype.get = function get6(shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };
  ValueNode.prototype.update = function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }
    SetRef(didAlter);
    if (removed) {
      SetRef(didChangeSize);
      return;
    }
    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };
  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse3) {
    var entries3 = this.entries;
    for (var ii = 0, maxIndex = entries3.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries3[reverse3 ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };
  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse3) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse3 ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse3) === false) {
        return false;
      }
    }
  };
  ValueNode.prototype.iterate = function(fn, reverse3) {
    return fn(this.entry);
  };
  var MapIterator = /* @__PURE__ */ function(Iterator3) {
    function MapIterator2(map2, type, reverse3) {
      this._type = type;
      this._reverse = reverse3;
      this._stack = map2._root && mapIteratorFrame(map2._root);
    }
    if (Iterator3)
      MapIterator2.__proto__ = Iterator3;
    MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
    MapIterator2.prototype.constructor = MapIterator2;
    MapIterator2.prototype.next = function next() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index2 = stack.index++;
        var maxIndex = void 0;
        if (node.entry) {
          if (index2 === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index2 <= maxIndex) {
            return mapIteratorValue(
              type,
              node.entries[this._reverse ? maxIndex - index2 : index2]
            );
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index2 <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index2 : index2];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };
    return MapIterator2;
  }(Iterator);
  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }
  function mapIteratorFrame(node, prev) {
    return {
      node,
      index: 0,
      __prev: prev
    };
  }
  function makeMap(size, root2, ownerID, hash2) {
    var map2 = Object.create(MapPrototype);
    map2.size = size;
    map2._root = root2;
    map2.__ownerID = ownerID;
    map2.__hash = hash2;
    map2.__altered = false;
    return map2;
  }
  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }
  function updateMap(map2, k, v2) {
    var newRoot;
    var newSize;
    if (!map2._root) {
      if (v2 === NOT_SET) {
        return map2;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map2.__ownerID, [[k, v2]]);
    } else {
      var didChangeSize = MakeRef();
      var didAlter = MakeRef();
      newRoot = updateNode(
        map2._root,
        map2.__ownerID,
        0,
        void 0,
        k,
        v2,
        didChangeSize,
        didAlter
      );
      if (!didAlter.value) {
        return map2;
      }
      newSize = map2.size + (didChangeSize.value ? v2 === NOT_SET ? -1 : 1 : 0);
    }
    if (map2.__ownerID) {
      map2.size = newSize;
      map2._root = newRoot;
      map2.__hash = void 0;
      map2.__altered = true;
      return map2;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }
  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(
      ownerID,
      shift,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );
  }
  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }
  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }
    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }
  function createNodes(ownerID, entries3, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries3.length; ii++) {
      var entry = entries3[ii];
      node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
    }
    return node;
  }
  function packNodes(ownerID, nodes, count2, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count2);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== void 0 && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }
  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count2 = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
  }
  function popCount(x) {
    x -= x >> 1 & 1431655765;
    x = (x & 858993459) + (x >> 2 & 858993459);
    x = x + (x >> 4) & 252645135;
    x += x >> 8;
    x += x >> 16;
    return x & 127;
  }
  function setAt(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }
  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }
  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }
  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
  var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
  function isList(maybeList) {
    return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
  }
  var List = /* @__PURE__ */ function(IndexedCollection2) {
    function List2(value) {
      var empty = emptyList();
      if (value === null || value === void 0) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedCollection2(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list) {
        list.setSize(size);
        iter.forEach(function(v2, i2) {
          return list.set(i2, v2);
        });
      });
    }
    if (IndexedCollection2)
      List2.__proto__ = IndexedCollection2;
    List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
    List2.prototype.constructor = List2;
    List2.of = function of() {
      return this(arguments);
    };
    List2.prototype.toString = function toString5() {
      return this.__toString("List [", "]");
    };
    List2.prototype.get = function get11(index2, notSetValue) {
      index2 = wrapIndex(this, index2);
      if (index2 >= 0 && index2 < this.size) {
        index2 += this._origin;
        var node = listNodeFor(this, index2);
        return node && node.array[index2 & MASK];
      }
      return notSetValue;
    };
    List2.prototype.set = function set3(index2, value) {
      return updateList(this, index2, value);
    };
    List2.prototype.remove = function remove3(index2) {
      return !this.has(index2) ? this : index2 === 0 ? this.shift() : index2 === this.size - 1 ? this.pop() : this.splice(index2, 1);
    };
    List2.prototype.insert = function insert(index2, value) {
      return this.splice(index2, 0, value);
    };
    List2.prototype.clear = function clear2() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };
    List2.prototype.push = function push() {
      var values2 = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list) {
        setListBounds(list, 0, oldSize + values2.length);
        for (var ii = 0; ii < values2.length; ii++) {
          list.set(oldSize + ii, values2[ii]);
        }
      });
    };
    List2.prototype.pop = function pop() {
      return setListBounds(this, 0, -1);
    };
    List2.prototype.unshift = function unshift() {
      var values2 = arguments;
      return this.withMutations(function(list) {
        setListBounds(list, -values2.length);
        for (var ii = 0; ii < values2.length; ii++) {
          list.set(ii, values2[ii]);
        }
      });
    };
    List2.prototype.shift = function shift() {
      return setListBounds(this, 1);
    };
    List2.prototype.concat = function concat2() {
      var arguments$1 = arguments;
      var seqs = [];
      for (var i2 = 0; i2 < arguments.length; i2++) {
        var argument = arguments$1[i2];
        var seq = IndexedCollection2(
          typeof argument !== "string" && hasIterator(argument) ? argument : [argument]
        );
        if (seq.size !== 0) {
          seqs.push(seq);
        }
      }
      if (seqs.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
        return this.constructor(seqs[0]);
      }
      return this.withMutations(function(list) {
        seqs.forEach(function(seq2) {
          return seq2.forEach(function(value) {
            return list.push(value);
          });
        });
      });
    };
    List2.prototype.setSize = function setSize(size) {
      return setListBounds(this, 0, size);
    };
    List2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      return this.withMutations(function(list) {
        for (var i2 = 0; i2 < this$1$1.size; i2++) {
          list.set(i2, mapper.call(context, list.get(i2), i2, this$1$1));
        }
      });
    };
    List2.prototype.slice = function slice3(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };
    List2.prototype.__iterator = function __iterator2(type, reverse3) {
      var index2 = reverse3 ? this.size : 0;
      var values2 = iterateList(this, reverse3);
      return new Iterator(function() {
        var value = values2();
        return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index2 : index2++, value);
      });
    };
    List2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var index2 = reverse3 ? this.size : 0;
      var values2 = iterateList(this, reverse3);
      var value;
      while ((value = values2()) !== DONE) {
        if (fn(value, reverse3 ? --index2 : index2++, this) === false) {
          break;
        }
      }
      return index2;
    };
    List2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyList();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeList(
        this._origin,
        this._capacity,
        this._level,
        this._root,
        this._tail,
        ownerID,
        this.__hash
      );
    };
    return List2;
  }(IndexedCollection);
  List.isList = isList;
  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SYMBOL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.merge = ListPrototype.concat;
  ListPrototype.setIn = setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
  ListPrototype.update = update;
  ListPrototype.updateIn = updateIn;
  ListPrototype.mergeIn = mergeIn;
  ListPrototype.mergeDeepIn = mergeDeepIn;
  ListPrototype.withMutations = withMutations;
  ListPrototype.wasAltered = wasAltered;
  ListPrototype.asImmutable = asImmutable;
  ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
  ListPrototype["@@transducer/step"] = function(result, arr) {
    return result.push(arr);
  };
  ListPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  var VNode = function VNode2(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  };
  VNode.prototype.removeBefore = function removeBefore(ownerID, level, index2) {
    if (index2 === level ? 1 << level : this.array.length === 0) {
      return this;
    }
    var originIndex = index2 >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index2);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = void 0;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };
  VNode.prototype.removeAfter = function removeAfter(ownerID, level, index2) {
    if (index2 === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index2 - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }
    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index2);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }
    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };
  var DONE = {};
  function iterateList(list, reverse3) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;
    return iterateNodeOrLeaf(list._root, list._level, 0);
    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }
    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function() {
        if (from === to) {
          return DONE;
        }
        var idx = reverse3 ? --to : from++;
        return array && array[idx];
      };
    }
    function iterateNode(node, level, offset) {
      var values2;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function() {
        while (true) {
          if (values2) {
            var value = values2();
            if (value !== DONE) {
              return value;
            }
            values2 = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse3 ? --to : from++;
          values2 = iterateNodeOrLeaf(
            array && array[idx],
            level - SHIFT,
            offset + (idx << level)
          );
        }
      };
    }
  }
  function makeList(origin, capacity, level, root2, tail, ownerID, hash2) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root2;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash2;
    list.__altered = false;
    return list;
  }
  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }
  function updateList(list, index2, value) {
    index2 = wrapIndex(list, index2);
    if (index2 !== index2) {
      return list;
    }
    if (index2 >= list.size || index2 < 0) {
      return list.withMutations(function(list2) {
        index2 < 0 ? setListBounds(list2, index2).set(0, value) : setListBounds(list2, 0, index2 + 1).set(index2, value);
      });
    }
    index2 += list._origin;
    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef();
    if (index2 >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index2, value, didAlter);
    } else {
      newRoot = updateVNode(
        newRoot,
        list.__ownerID,
        list._level,
        index2,
        value,
        didAlter
      );
    }
    if (!didAlter.value) {
      return list;
    }
    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = void 0;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }
  function updateVNode(node, ownerID, level, index2, value, didAlter) {
    var idx = index2 >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === void 0) {
      return node;
    }
    var newNode;
    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(
        lowerNode,
        ownerID,
        level - SHIFT,
        index2,
        value,
        didAlter
      );
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }
    if (nodeHas && node.array[idx] === value) {
      return node;
    }
    if (didAlter) {
      SetRef(didAlter);
    }
    newNode = editableVNode(node, ownerID);
    if (value === void 0 && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }
  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }
  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }
  function setListBounds(list, begin, end) {
    if (begin !== void 0) {
      begin |= 0;
    }
    if (end !== void 0) {
      end |= 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }
    if (newOrigin >= newCapacity) {
      return list.clear();
    }
    var newLevel = list._level;
    var newRoot = list._root;
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(
        newRoot && newRoot.array.length ? [void 0, newRoot] : [],
        owner
      );
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }
    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(
        newRoot && newRoot.array.length ? [newRoot] : [],
        owner
      );
      newLevel += SHIFT;
    }
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(
          owner,
          newLevel,
          newTailOffset - offsetShift
        );
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }
    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = void 0;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }
  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }
  var OrderedMap = /* @__PURE__ */ function(Map3) {
    function OrderedMap2(value) {
      return value === null || value === void 0 ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
        var iter = KeyedCollection(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2, k) {
          return map2.set(k, v2);
        });
      });
    }
    if (Map3)
      OrderedMap2.__proto__ = Map3;
    OrderedMap2.prototype = Object.create(Map3 && Map3.prototype);
    OrderedMap2.prototype.constructor = OrderedMap2;
    OrderedMap2.of = function of() {
      return this(arguments);
    };
    OrderedMap2.prototype.toString = function toString5() {
      return this.__toString("OrderedMap {", "}");
    };
    OrderedMap2.prototype.get = function get11(k, notSetValue) {
      var index2 = this._map.get(k);
      return index2 !== void 0 ? this._list.get(index2)[1] : notSetValue;
    };
    OrderedMap2.prototype.clear = function clear2() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        this.__altered = true;
        return this;
      }
      return emptyOrderedMap();
    };
    OrderedMap2.prototype.set = function set3(k, v2) {
      return updateOrderedMap(this, k, v2);
    };
    OrderedMap2.prototype.remove = function remove3(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };
    OrderedMap2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      return this._list.__iterate(
        function(entry) {
          return entry && fn(entry[1], entry[0], this$1$1);
        },
        reverse3
      );
    };
    OrderedMap2.prototype.__iterator = function __iterator2(type, reverse3) {
      return this._list.fromEntrySeq().__iterator(type, reverse3);
    };
    OrderedMap2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return emptyOrderedMap();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };
    return OrderedMap2;
  }(Map2);
  OrderedMap.isOrderedMap = isOrderedMap;
  OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
  function makeOrderedMap(map2, list, ownerID, hash2) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map2 ? map2.size : 0;
    omap._map = map2;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash2;
    omap.__altered = false;
    return omap;
  }
  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }
  function updateOrderedMap(omap, k, v2) {
    var map2 = omap._map;
    var list = omap._list;
    var i2 = map2.get(k);
    var has5 = i2 !== void 0;
    var newMap;
    var newList;
    if (v2 === NOT_SET) {
      if (!has5) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map2.size * 2) {
        newList = list.filter(function(entry, idx) {
          return entry !== void 0 && i2 !== idx;
        });
        newMap = newList.toKeyedSeq().map(function(entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map2.remove(k);
        newList = i2 === list.size - 1 ? list.pop() : list.set(i2, void 0);
      }
    } else if (has5) {
      if (v2 === list.get(i2)[1]) {
        return omap;
      }
      newMap = map2;
      newList = list.set(i2, [k, v2]);
    } else {
      newMap = map2.set(k, list.size);
      newList = list.set(list.size, [k, v2]);
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = void 0;
      omap.__altered = true;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }
  var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
  function isStack(maybeStack) {
    return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
  }
  var Stack = /* @__PURE__ */ function(IndexedCollection2) {
    function Stack2(value) {
      return value === null || value === void 0 ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
    }
    if (IndexedCollection2)
      Stack2.__proto__ = IndexedCollection2;
    Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
    Stack2.prototype.constructor = Stack2;
    Stack2.of = function of() {
      return this(arguments);
    };
    Stack2.prototype.toString = function toString5() {
      return this.__toString("Stack [", "]");
    };
    Stack2.prototype.get = function get11(index2, notSetValue) {
      var head = this._head;
      index2 = wrapIndex(this, index2);
      while (head && index2--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };
    Stack2.prototype.peek = function peek() {
      return this._head && this._head.value;
    };
    Stack2.prototype.push = function push() {
      var arguments$1 = arguments;
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments$1[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.pushAll = function pushAll(iter) {
      iter = IndexedCollection2(iter);
      if (iter.size === 0) {
        return this;
      }
      if (this.size === 0 && isStack(iter)) {
        return iter;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.__iterate(function(value) {
        newSize++;
        head = {
          value,
          next: head
        };
      }, true);
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.pop = function pop() {
      return this.slice(1);
    };
    Stack2.prototype.clear = function clear2() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = void 0;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };
    Stack2.prototype.slice = function slice3(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        return IndexedCollection2.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyStack();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };
    Stack2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      if (reverse3) {
        return new ArraySeq(this.toArray()).__iterate(
          function(v2, k) {
            return fn(v2, k, this$1$1);
          },
          reverse3
        );
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };
    Stack2.prototype.__iterator = function __iterator2(type, reverse3) {
      if (reverse3) {
        return new ArraySeq(this.toArray()).__iterator(type, reverse3);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function() {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };
    return Stack2;
  }(IndexedCollection);
  Stack.isStack = isStack;
  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SYMBOL] = true;
  StackPrototype.shift = StackPrototype.pop;
  StackPrototype.unshift = StackPrototype.push;
  StackPrototype.unshiftAll = StackPrototype.pushAll;
  StackPrototype.withMutations = withMutations;
  StackPrototype.wasAltered = wasAltered;
  StackPrototype.asImmutable = asImmutable;
  StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
  StackPrototype["@@transducer/step"] = function(result, arr) {
    return result.unshift(arr);
  };
  StackPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  function makeStack(size, head, ownerID, hash2) {
    var map2 = Object.create(StackPrototype);
    map2.size = size;
    map2._head = head;
    map2.__ownerID = ownerID;
    map2.__hash = hash2;
    map2.__altered = false;
    return map2;
  }
  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }
  var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
  function isSet(maybeSet) {
    return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
  }
  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }
  function deepEqual(a2, b2) {
    if (a2 === b2) {
      return true;
    }
    if (!isCollection(b2) || a2.size !== void 0 && b2.size !== void 0 && a2.size !== b2.size || a2.__hash !== void 0 && b2.__hash !== void 0 && a2.__hash !== b2.__hash || isKeyed(a2) !== isKeyed(b2) || isIndexed(a2) !== isIndexed(b2) || isOrdered(a2) !== isOrdered(b2)) {
      return false;
    }
    if (a2.size === 0 && b2.size === 0) {
      return true;
    }
    var notAssociative = !isAssociative(a2);
    if (isOrdered(a2)) {
      var entries3 = a2.entries();
      return b2.every(function(v2, k) {
        var entry = entries3.next().value;
        return entry && is(entry[1], v2) && (notAssociative || is(entry[0], k));
      }) && entries3.next().done;
    }
    var flipped = false;
    if (a2.size === void 0) {
      if (b2.size === void 0) {
        if (typeof a2.cacheResult === "function") {
          a2.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a2;
        a2 = b2;
        b2 = _;
      }
    }
    var allEqual = true;
    var bSize = b2.__iterate(function(v2, k) {
      if (notAssociative ? !a2.has(v2) : flipped ? !is(v2, a2.get(k, NOT_SET)) : !is(a2.get(k, NOT_SET), v2)) {
        allEqual = false;
        return false;
      }
    });
    return allEqual && a2.size === bSize;
  }
  function mixin(ctor, methods) {
    var keyCopier = function(key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }
  function toJS(value) {
    if (!value || typeof value !== "object") {
      return value;
    }
    if (!isCollection(value)) {
      if (!isDataStructure(value)) {
        return value;
      }
      value = Seq(value);
    }
    if (isKeyed(value)) {
      var result$1 = {};
      value.__iterate(function(v2, k) {
        result$1[k] = toJS(v2);
      });
      return result$1;
    }
    var result = [];
    value.__iterate(function(v2) {
      result.push(toJS(v2));
    });
    return result;
  }
  var Set2 = /* @__PURE__ */ function(SetCollection2) {
    function Set3(value) {
      return value === null || value === void 0 ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
        var iter = SetCollection2(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2) {
          return set3.add(v2);
        });
      });
    }
    if (SetCollection2)
      Set3.__proto__ = SetCollection2;
    Set3.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
    Set3.prototype.constructor = Set3;
    Set3.of = function of() {
      return this(arguments);
    };
    Set3.fromKeys = function fromKeys(value) {
      return this(KeyedCollection(value).keySeq());
    };
    Set3.intersect = function intersect(sets) {
      sets = Collection(sets).toArray();
      return sets.length ? SetPrototype.intersect.apply(Set3(sets.pop()), sets) : emptySet();
    };
    Set3.union = function union(sets) {
      sets = Collection(sets).toArray();
      return sets.length ? SetPrototype.union.apply(Set3(sets.pop()), sets) : emptySet();
    };
    Set3.prototype.toString = function toString5() {
      return this.__toString("Set {", "}");
    };
    Set3.prototype.has = function has5(value) {
      return this._map.has(value);
    };
    Set3.prototype.add = function add(value) {
      return updateSet(this, this._map.set(value, value));
    };
    Set3.prototype.remove = function remove3(value) {
      return updateSet(this, this._map.remove(value));
    };
    Set3.prototype.clear = function clear2() {
      return updateSet(this, this._map.clear());
    };
    Set3.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      var didChanges = false;
      var newMap = updateSet(
        this,
        this._map.mapEntries(function(ref) {
          var v2 = ref[1];
          var mapped = mapper.call(context, v2, v2, this$1$1);
          if (mapped !== v2) {
            didChanges = true;
          }
          return [mapped, mapped];
        }, context)
      );
      return didChanges ? newMap : this;
    };
    Set3.prototype.union = function union() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      iters = iters.filter(function(x) {
        return x.size !== 0;
      });
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set3) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetCollection2(iters[ii]).forEach(function(value) {
            return set3.add(value);
          });
        }
      });
    };
    Set3.prototype.intersect = function intersect() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter) {
        return SetCollection2(iter);
      });
      var toRemove = [];
      this.forEach(function(value) {
        if (!iters.every(function(iter) {
          return iter.includes(value);
        })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function(set3) {
        toRemove.forEach(function(value) {
          set3.remove(value);
        });
      });
    };
    Set3.prototype.subtract = function subtract() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter) {
        return SetCollection2(iter);
      });
      var toRemove = [];
      this.forEach(function(value) {
        if (iters.some(function(iter) {
          return iter.includes(value);
        })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function(set3) {
        toRemove.forEach(function(value) {
          set3.remove(value);
        });
      });
    };
    Set3.prototype.sort = function sort3(comparator) {
      return OrderedSet(sortFactory(this, comparator));
    };
    Set3.prototype.sortBy = function sortBy2(mapper, comparator) {
      return OrderedSet(sortFactory(this, comparator, mapper));
    };
    Set3.prototype.wasAltered = function wasAltered3() {
      return this._map.wasAltered();
    };
    Set3.prototype.__iterate = function __iterate2(fn, reverse3) {
      var this$1$1 = this;
      return this._map.__iterate(function(k) {
        return fn(k, k, this$1$1);
      }, reverse3);
    };
    Set3.prototype.__iterator = function __iterator2(type, reverse3) {
      return this._map.__iterator(type, reverse3);
    };
    Set3.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return this.__empty();
        }
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };
    return Set3;
  }(SetCollection);
  Set2.isSet = isSet;
  var SetPrototype = Set2.prototype;
  SetPrototype[IS_SET_SYMBOL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
  SetPrototype.withMutations = withMutations;
  SetPrototype.asImmutable = asImmutable;
  SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
  SetPrototype["@@transducer/step"] = function(result, arr) {
    return result.add(arr);
  };
  SetPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;
  function updateSet(set3, newMap) {
    if (set3.__ownerID) {
      set3.size = newMap.size;
      set3._map = newMap;
      return set3;
    }
    return newMap === set3._map ? set3 : newMap.size === 0 ? set3.__empty() : set3.__make(newMap);
  }
  function makeSet(map2, ownerID) {
    var set3 = Object.create(SetPrototype);
    set3.size = map2 ? map2.size : 0;
    set3._map = map2;
    set3.__ownerID = ownerID;
    return set3;
  }
  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }
  var Range = /* @__PURE__ */ function(IndexedSeq2) {
    function Range2(start, end, step) {
      if (!(this instanceof Range2)) {
        return new Range2(start, end, step);
      }
      invariant(step !== 0, "Cannot step a Range by 0");
      start = start || 0;
      if (end === void 0) {
        end = Infinity;
      }
      step = step === void 0 ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }
    if (IndexedSeq2)
      Range2.__proto__ = IndexedSeq2;
    Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    Range2.prototype.constructor = Range2;
    Range2.prototype.toString = function toString5() {
      if (this.size === 0) {
        return "Range []";
      }
      return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
    };
    Range2.prototype.get = function get11(index2, notSetValue) {
      return this.has(index2) ? this._start + wrapIndex(this, index2) * this._step : notSetValue;
    };
    Range2.prototype.includes = function includes3(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
    };
    Range2.prototype.slice = function slice3(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range2(0, 0);
      }
      return new Range2(
        this.get(begin, this._end),
        this.get(end, this._end),
        this._step
      );
    };
    Range2.prototype.indexOf = function indexOf2(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index2 = offsetValue / this._step;
        if (index2 >= 0 && index2 < this.size) {
          return index2;
        }
      }
      return -1;
    };
    Range2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
      return this.indexOf(searchValue);
    };
    Range2.prototype.__iterate = function __iterate2(fn, reverse3) {
      var size = this.size;
      var step = this._step;
      var value = reverse3 ? this._start + (size - 1) * step : this._start;
      var i2 = 0;
      while (i2 !== size) {
        if (fn(value, reverse3 ? size - ++i2 : i2++, this) === false) {
          break;
        }
        value += reverse3 ? -step : step;
      }
      return i2;
    };
    Range2.prototype.__iterator = function __iterator2(type, reverse3) {
      var size = this.size;
      var step = this._step;
      var value = reverse3 ? this._start + (size - 1) * step : this._start;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var v2 = value;
        value += reverse3 ? -step : step;
        return iteratorValue(type, reverse3 ? size - ++i2 : i2++, v2);
      });
    };
    Range2.prototype.equals = function equals3(other) {
      return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
    };
    return Range2;
  }(IndexedSeq);
  var EMPTY_RANGE;
  function getIn$1(collection, searchKeyPath, notSetValue) {
    var keyPath = coerceKeyPath(searchKeyPath);
    var i2 = 0;
    while (i2 !== keyPath.length) {
      collection = get(collection, keyPath[i2++], NOT_SET);
      if (collection === NOT_SET) {
        return notSetValue;
      }
    }
    return collection;
  }
  function getIn(searchKeyPath, notSetValue) {
    return getIn$1(this, searchKeyPath, notSetValue);
  }
  function hasIn$1(collection, keyPath) {
    return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
  }
  function hasIn(searchKeyPath) {
    return hasIn$1(this, searchKeyPath);
  }
  function toObject() {
    assertNotInfinite(this.size);
    var object = {};
    this.__iterate(function(v2, k) {
      object[k] = v2;
    });
    return object;
  }
  Collection.isIterable = isCollection;
  Collection.isKeyed = isKeyed;
  Collection.isIndexed = isIndexed;
  Collection.isAssociative = isAssociative;
  Collection.isOrdered = isOrdered;
  Collection.Iterator = Iterator;
  mixin(Collection, {
    toArray: function toArray() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      var useTuples = isKeyed(this);
      var i2 = 0;
      this.__iterate(function(v2, k) {
        array[i2++] = useTuples ? [k, v2] : v2;
      });
      return array;
    },
    toIndexedSeq: function toIndexedSeq() {
      return new ToIndexedSequence(this);
    },
    toJS: function toJS$1() {
      return toJS(this);
    },
    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, true);
    },
    toMap: function toMap() {
      return Map2(this.toKeyedSeq());
    },
    toObject,
    toOrderedMap: function toOrderedMap() {
      return OrderedMap(this.toKeyedSeq());
    },
    toOrderedSet: function toOrderedSet() {
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },
    toSet: function toSet() {
      return Set2(isKeyed(this) ? this.valueSeq() : this);
    },
    toSetSeq: function toSetSeq() {
      return new ToSetSequence(this);
    },
    toSeq: function toSeq() {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },
    toStack: function toStack() {
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },
    toList: function toList() {
      return List(isKeyed(this) ? this.valueSeq() : this);
    },
    toString: function toString3() {
      return "[Collection]";
    },
    __toString: function __toString(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
    },
    concat: function concat() {
      var values2 = [], len = arguments.length;
      while (len--)
        values2[len] = arguments[len];
      return reify(this, concatFactory(this, values2));
    },
    includes: function includes(searchValue) {
      return this.some(function(value) {
        return is(value, searchValue);
      });
    },
    entries: function entries() {
      return this.__iterator(ITERATE_ENTRIES);
    },
    every: function every(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v2, k, c2) {
        if (!predicate.call(context, v2, k, c2)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },
    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },
    find: function find(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },
    forEach: function forEach(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },
    join: function join(separator) {
      assertNotInfinite(this.size);
      separator = separator !== void 0 ? "" + separator : ",";
      var joined = "";
      var isFirst = true;
      this.__iterate(function(v2) {
        isFirst ? isFirst = false : joined += separator;
        joined += v2 !== null && v2 !== void 0 ? v2.toString() : "";
      });
      return joined;
    },
    keys: function keys() {
      return this.__iterator(ITERATE_KEYS);
    },
    map: function map(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },
    reduce: function reduce$1(reducer, initialReduction, context) {
      return reduce(
        this,
        reducer,
        initialReduction,
        context,
        arguments.length < 2,
        false
      );
    },
    reduceRight: function reduceRight(reducer, initialReduction, context) {
      return reduce(
        this,
        reducer,
        initialReduction,
        context,
        arguments.length < 2,
        true
      );
    },
    reverse: function reverse() {
      return reify(this, reverseFactory(this, true));
    },
    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },
    some: function some(predicate, context) {
      return !this.every(not(predicate), context);
    },
    sort: function sort(comparator) {
      return reify(this, sortFactory(this, comparator));
    },
    values: function values() {
      return this.__iterator(ITERATE_VALUES);
    },
    butLast: function butLast() {
      return this.slice(0, -1);
    },
    isEmpty: function isEmpty() {
      return this.size !== void 0 ? this.size === 0 : !this.some(function() {
        return true;
      });
    },
    count: function count(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },
    countBy: function countBy(grouper, context) {
      return countByFactory(this, grouper, context);
    },
    equals: function equals(other) {
      return deepEqual(this, other);
    },
    entrySeq: function entrySeq() {
      var collection = this;
      if (collection._cache) {
        return new ArraySeq(collection._cache);
      }
      var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function() {
        return collection.toSeq();
      };
      return entriesSequence;
    },
    filterNot: function filterNot(predicate, context) {
      return this.filter(not(predicate), context);
    },
    findEntry: function findEntry(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v2, k, c2) {
        if (predicate.call(context, v2, k, c2)) {
          found = [k, v2];
          return false;
        }
      });
      return found;
    },
    findKey: function findKey(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },
    findLast: function findLast(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },
    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },
    findLastKey: function findLastKey(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },
    first: function first(notSetValue) {
      return this.find(returnTrue, null, notSetValue);
    },
    flatMap: function flatMap(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },
    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },
    fromEntrySeq: function fromEntrySeq() {
      return new FromEntriesSequence(this);
    },
    get: function get7(searchKey, notSetValue) {
      return this.find(function(_, key) {
        return is(key, searchKey);
      }, void 0, notSetValue);
    },
    getIn,
    groupBy: function groupBy(grouper, context) {
      return groupByFactory(this, grouper, context);
    },
    has: function has2(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },
    hasIn,
    isSubset: function isSubset(iter) {
      iter = typeof iter.includes === "function" ? iter : Collection(iter);
      return this.every(function(value) {
        return iter.includes(value);
      });
    },
    isSuperset: function isSuperset(iter) {
      iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
      return iter.isSubset(this);
    },
    keyOf: function keyOf(searchValue) {
      return this.findKey(function(value) {
        return is(value, searchValue);
      });
    },
    keySeq: function keySeq() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },
    last: function last(notSetValue) {
      return this.toSeq().reverse().first(notSetValue);
    },
    lastKeyOf: function lastKeyOf(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },
    max: function max(comparator) {
      return maxFactory(this, comparator);
    },
    maxBy: function maxBy(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },
    min: function min(comparator) {
      return maxFactory(
        this,
        comparator ? neg(comparator) : defaultNegComparator
      );
    },
    minBy: function minBy(mapper, comparator) {
      return maxFactory(
        this,
        comparator ? neg(comparator) : defaultNegComparator,
        mapper
      );
    },
    rest: function rest() {
      return this.slice(1);
    },
    skip: function skip(amount) {
      return amount === 0 ? this : this.slice(Math.max(0, amount));
    },
    skipLast: function skipLast(amount) {
      return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
    },
    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },
    skipUntil: function skipUntil(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },
    sortBy: function sortBy(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },
    take: function take(amount) {
      return this.slice(0, Math.max(0, amount));
    },
    takeLast: function takeLast(amount) {
      return this.slice(-Math.max(0, amount));
    },
    takeWhile: function takeWhile(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },
    takeUntil: function takeUntil(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },
    update: function update7(fn) {
      return fn(this);
    },
    valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    },
    hashCode: function hashCode() {
      return this.__hash || (this.__hash = hashCollection(this));
    }
  });
  var CollectionPrototype = Collection.prototype;
  CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
  CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
  CollectionPrototype.toJSON = CollectionPrototype.toArray;
  CollectionPrototype.__toStringMapper = quoteString;
  CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
    return this.toString();
  };
  CollectionPrototype.chain = CollectionPrototype.flatMap;
  CollectionPrototype.contains = CollectionPrototype.includes;
  mixin(KeyedCollection, {
    flip: function flip() {
      return reify(this, flipFactory(this));
    },
    mapEntries: function mapEntries(mapper, context) {
      var this$1$1 = this;
      var iterations = 0;
      return reify(
        this,
        this.toSeq().map(function(v2, k) {
          return mapper.call(context, [k, v2], iterations++, this$1$1);
        }).fromEntrySeq()
      );
    },
    mapKeys: function mapKeys(mapper, context) {
      var this$1$1 = this;
      return reify(
        this,
        this.toSeq().flip().map(function(k, v2) {
          return mapper.call(context, k, v2, this$1$1);
        }).flip()
      );
    }
  });
  var KeyedCollectionPrototype = KeyedCollection.prototype;
  KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
  KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
  KeyedCollectionPrototype.toJSON = toObject;
  KeyedCollectionPrototype.__toStringMapper = function(v2, k) {
    return quoteString(k) + ": " + quoteString(v2);
  };
  mixin(IndexedCollection, {
    toKeyedSeq: function toKeyedSeq2() {
      return new ToKeyedSequence(this, false);
    },
    filter: function filter2(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },
    findIndex: function findIndex(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },
    indexOf: function indexOf(searchValue) {
      var key = this.keyOf(searchValue);
      return key === void 0 ? -1 : key;
    },
    lastIndexOf: function lastIndexOf(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === void 0 ? -1 : key;
    },
    reverse: function reverse2() {
      return reify(this, reverseFactory(this, false));
    },
    slice: function slice2(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },
    splice: function splice(index2, removeNum) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum || 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      index2 = resolveBegin(index2, index2 < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index2);
      return reify(
        this,
        numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index2 + removeNum))
      );
    },
    findLastIndex: function findLastIndex(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },
    first: function first2(notSetValue) {
      return this.get(0, notSetValue);
    },
    flatten: function flatten2(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },
    get: function get8(index2, notSetValue) {
      index2 = wrapIndex(this, index2);
      return index2 < 0 || this.size === Infinity || this.size !== void 0 && index2 > this.size ? notSetValue : this.find(function(_, key) {
        return key === index2;
      }, void 0, notSetValue);
    },
    has: function has3(index2) {
      index2 = wrapIndex(this, index2);
      return index2 >= 0 && (this.size !== void 0 ? this.size === Infinity || index2 < this.size : this.indexOf(index2) !== -1);
    },
    interpose: function interpose(separator) {
      return reify(this, interposeFactory(this, separator));
    },
    interleave: function interleave() {
      var collections = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * collections.length;
      }
      return reify(this, interleaved);
    },
    keySeq: function keySeq2() {
      return Range(0, this.size);
    },
    last: function last2(notSetValue) {
      return this.get(-1, notSetValue);
    },
    skipWhile: function skipWhile2(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },
    zip: function zip() {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections));
    },
    zipAll: function zipAll() {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections, true));
    },
    zipWith: function zipWith(zipper) {
      var collections = arrCopy(arguments);
      collections[0] = this;
      return reify(this, zipWithFactory(this, zipper, collections));
    }
  });
  var IndexedCollectionPrototype = IndexedCollection.prototype;
  IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
  IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
  mixin(SetCollection, {
    get: function get9(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },
    includes: function includes2(value) {
      return this.has(value);
    },
    keySeq: function keySeq3() {
      return this.valueSeq();
    }
  });
  var SetCollectionPrototype = SetCollection.prototype;
  SetCollectionPrototype.has = CollectionPrototype.includes;
  SetCollectionPrototype.contains = SetCollectionPrototype.includes;
  SetCollectionPrototype.keys = SetCollectionPrototype.values;
  mixin(KeyedSeq, KeyedCollectionPrototype);
  mixin(IndexedSeq, IndexedCollectionPrototype);
  mixin(SetSeq, SetCollectionPrototype);
  function reduce(collection, reducer, reduction, context, useFirst, reverse3) {
    assertNotInfinite(collection.size);
    collection.__iterate(function(v2, k, c2) {
      if (useFirst) {
        useFirst = false;
        reduction = v2;
      } else {
        reduction = reducer.call(context, reduction, v2, k, c2);
      }
    }, reverse3);
    return reduction;
  }
  function keyMapper(v2, k) {
    return k;
  }
  function entryMapper(v2, k) {
    return [k, v2];
  }
  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }
  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    };
  }
  function defaultZipper() {
    return arrCopy(arguments);
  }
  function defaultNegComparator(a2, b2) {
    return a2 < b2 ? 1 : a2 > b2 ? -1 : 0;
  }
  function hashCollection(collection) {
    if (collection.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(collection);
    var keyed = isKeyed(collection);
    var h2 = ordered ? 1 : 0;
    var size = collection.__iterate(
      keyed ? ordered ? function(v2, k) {
        h2 = 31 * h2 + hashMerge(hash(v2), hash(k)) | 0;
      } : function(v2, k) {
        h2 = h2 + hashMerge(hash(v2), hash(k)) | 0;
      } : ordered ? function(v2) {
        h2 = 31 * h2 + hash(v2) | 0;
      } : function(v2) {
        h2 = h2 + hash(v2) | 0;
      }
    );
    return murmurHashOfSize(size, h2);
  }
  function murmurHashOfSize(size, h2) {
    h2 = imul(h2, 3432918353);
    h2 = imul(h2 << 15 | h2 >>> -15, 461845907);
    h2 = imul(h2 << 13 | h2 >>> -13, 5);
    h2 = (h2 + 3864292196 | 0) ^ size;
    h2 = imul(h2 ^ h2 >>> 16, 2246822507);
    h2 = imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = smi(h2 ^ h2 >>> 16);
    return h2;
  }
  function hashMerge(a2, b2) {
    return a2 ^ b2 + 2654435769 + (a2 << 6) + (a2 >> 2) | 0;
  }
  var OrderedSet = /* @__PURE__ */ function(Set3) {
    function OrderedSet2(value) {
      return value === null || value === void 0 ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
        var iter = SetCollection(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2) {
          return set3.add(v2);
        });
      });
    }
    if (Set3)
      OrderedSet2.__proto__ = Set3;
    OrderedSet2.prototype = Object.create(Set3 && Set3.prototype);
    OrderedSet2.prototype.constructor = OrderedSet2;
    OrderedSet2.of = function of() {
      return this(arguments);
    };
    OrderedSet2.fromKeys = function fromKeys(value) {
      return this(KeyedCollection(value).keySeq());
    };
    OrderedSet2.prototype.toString = function toString5() {
      return this.__toString("OrderedSet {", "}");
    };
    return OrderedSet2;
  }(Set2);
  OrderedSet.isOrderedSet = isOrderedSet;
  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
  OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
  OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
  OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;
  function makeOrderedSet(map2, ownerID) {
    var set3 = Object.create(OrderedSetPrototype);
    set3.size = map2 ? map2.size : 0;
    set3._map = map2;
    set3.__ownerID = ownerID;
    return set3;
  }
  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }
  function throwOnInvalidDefaultValues(defaultValues) {
    if (isRecord(defaultValues)) {
      throw new Error(
        "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
      );
    }
    if (isImmutable(defaultValues)) {
      throw new Error(
        "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
      );
    }
    if (defaultValues === null || typeof defaultValues !== "object") {
      throw new Error(
        "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
      );
    }
  }
  var Record = function Record2(defaultValues, name) {
    var hasInitialized;
    throwOnInvalidDefaultValues(defaultValues);
    var RecordType = function Record3(values2) {
      var this$1$1 = this;
      if (values2 instanceof RecordType) {
        return values2;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values2);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys2 = Object.keys(defaultValues);
        var indices = RecordTypePrototype._indices = {};
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys2;
        RecordTypePrototype._defaultValues = defaultValues;
        for (var i2 = 0; i2 < keys2.length; i2++) {
          var propName = keys2[i2];
          indices[propName] = i2;
          if (RecordTypePrototype[propName]) {
            typeof console === "object" && console.warn && console.warn(
              "Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.'
            );
          } else {
            setProp(RecordTypePrototype, propName);
          }
        }
      }
      this.__ownerID = void 0;
      this._values = List().withMutations(function(l2) {
        l2.setSize(this$1$1._keys.length);
        KeyedCollection(values2).forEach(function(v2, k) {
          l2.set(this$1$1._indices[k], v2 === this$1$1._defaultValues[k] ? void 0 : v2);
        });
      });
      return this;
    };
    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;
    if (name) {
      RecordType.displayName = name;
    }
    return RecordType;
  };
  Record.prototype.toString = function toString4() {
    var str = recordName(this) + " { ";
    var keys2 = this._keys;
    var k;
    for (var i2 = 0, l2 = keys2.length; i2 !== l2; i2++) {
      k = keys2[i2];
      str += (i2 ? ", " : "") + k + ": " + quoteString(this.get(k));
    }
    return str + " }";
  };
  Record.prototype.equals = function equals2(other) {
    return this === other || other && recordSeq(this).equals(recordSeq(other));
  };
  Record.prototype.hashCode = function hashCode2() {
    return recordSeq(this).hashCode();
  };
  Record.prototype.has = function has4(k) {
    return this._indices.hasOwnProperty(k);
  };
  Record.prototype.get = function get10(k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var index2 = this._indices[k];
    var value = this._values.get(index2);
    return value === void 0 ? this._defaultValues[k] : value;
  };
  Record.prototype.set = function set2(k, v2) {
    if (this.has(k)) {
      var newValues = this._values.set(
        this._indices[k],
        v2 === this._defaultValues[k] ? void 0 : v2
      );
      if (newValues !== this._values && !this.__ownerID) {
        return makeRecord(this, newValues);
      }
    }
    return this;
  };
  Record.prototype.remove = function remove2(k) {
    return this.set(k);
  };
  Record.prototype.clear = function clear() {
    var newValues = this._values.clear().setSize(this._keys.length);
    return this.__ownerID ? this : makeRecord(this, newValues);
  };
  Record.prototype.wasAltered = function wasAltered2() {
    return this._values.wasAltered();
  };
  Record.prototype.toSeq = function toSeq2() {
    return recordSeq(this);
  };
  Record.prototype.toJS = function toJS$12() {
    return toJS(this);
  };
  Record.prototype.entries = function entries2() {
    return this.__iterator(ITERATE_ENTRIES);
  };
  Record.prototype.__iterator = function __iterator(type, reverse3) {
    return recordSeq(this).__iterator(type, reverse3);
  };
  Record.prototype.__iterate = function __iterate(fn, reverse3) {
    return recordSeq(this).__iterate(fn, reverse3);
  };
  Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newValues = this._values.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._values = newValues;
      return this;
    }
    return makeRecord(this, newValues, ownerID);
  };
  Record.isRecord = isRecord;
  Record.getDescriptiveName = recordName;
  var RecordPrototype = Record.prototype;
  RecordPrototype[IS_RECORD_SYMBOL] = true;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
  RecordPrototype.getIn = getIn;
  RecordPrototype.hasIn = CollectionPrototype.hasIn;
  RecordPrototype.merge = merge$1;
  RecordPrototype.mergeWith = mergeWith$1;
  RecordPrototype.mergeIn = mergeIn;
  RecordPrototype.mergeDeep = mergeDeep;
  RecordPrototype.mergeDeepWith = mergeDeepWith;
  RecordPrototype.mergeDeepIn = mergeDeepIn;
  RecordPrototype.setIn = setIn;
  RecordPrototype.update = update;
  RecordPrototype.updateIn = updateIn;
  RecordPrototype.withMutations = withMutations;
  RecordPrototype.asMutable = asMutable;
  RecordPrototype.asImmutable = asImmutable;
  RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
  RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
  RecordPrototype.inspect = RecordPrototype.toSource = function() {
    return this.toString();
  };
  function makeRecord(likeRecord, values2, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._values = values2;
    record.__ownerID = ownerID;
    return record;
  }
  function recordName(record) {
    return record.constructor.displayName || record.constructor.name || "Record";
  }
  function recordSeq(record) {
    return keyedSeqFromValue(record._keys.map(function(k) {
      return [k, record.get(k)];
    }));
  }
  function setProp(prototype, name) {
    try {
      Object.defineProperty(prototype, name, {
        get: function() {
          return this.get(name);
        },
        set: function(value) {
          invariant(this.__ownerID, "Cannot set on an immutable record.");
          this.set(name, value);
        }
      });
    } catch (error) {
    }
  }
  function fromJS(value, converter) {
    return fromJSWith(
      [],
      converter || defaultConverter,
      value,
      "",
      converter && converter.length > 2 ? [] : void 0,
      { "": value }
    );
  }
  function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
    if (typeof value !== "string" && !isImmutable(value) && (isArrayLike(value) || hasIterator(value) || isPlainObject(value))) {
      if (~stack.indexOf(value)) {
        throw new TypeError("Cannot convert circular structure to Immutable");
      }
      stack.push(value);
      keyPath && key !== "" && keyPath.push(key);
      var converted = converter.call(
        parentValue,
        key,
        Seq(value).map(
          function(v2, k) {
            return fromJSWith(stack, converter, v2, k, keyPath, value);
          }
        ),
        keyPath && keyPath.slice()
      );
      stack.pop();
      keyPath && keyPath.pop();
      return converted;
    }
    return value;
  }
  function defaultConverter(k, v2) {
    return isIndexed(v2) ? v2.toList() : isKeyed(v2) ? v2.toMap() : v2.toSet();
  }

  // src/types/constant.ts
  var fs = window.require("fs");
  var allConfig = JSON.parse(
    fs.readFileSync(
      "D:\\webDemo\\desktop-reader\\src\\config\\config.json",
      "utf-8"
    )
  );
  var galleryConfig = allConfig.gallery;
  var translation = JSON.parse(
    fs.readFileSync(
      "D:\\webDemo\\desktop-reader\\src\\config\\translation.json",
      "utf-8"
    )
  );
  var {
    imageCountOfSinglePage,
    packCountOfSinglePage,
    downloadPath,
    otherPath,
    r18: galleryR18,
    proxyEnabled,
    proxy,
    domainOf24fa
  } = galleryConfig;
  var defaultCover = "D:\\webDemo\\desktop-reader\\public\\blank.jpg";
  var getBookmarkThumb = (bookmark) => {
    return `bookmark-thumb-${new Date(bookmark.timeStamp).getTime()}.jpg`;
  };
  var constant_default = galleryConfig;
  var readerConfig = allConfig.reader;
  var lineHeight = 30;
  var {
    deltaLine,
    contentRange,
    overflowNum,
    distanceToUpdate,
    r18: readerR18
  } = readerConfig;
  var DELTA_HEIGHT = lineHeight * deltaLine;
  var SPACE_CODE = decodeURIComponent("%E3%80%80");

  // src/utils/functions.ts
  var fs2 = window.require("fs");
  var path = window.require("path");
  var Buffer2 = window.require("buffer").Buffer;
  function formatDate(time, format = "YY-MM-DD hh:mm:ss") {
    let date = new Date(time);
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours(), min2 = date.getMinutes(), sec = date.getSeconds();
    let preArr = Array.apply(null, Array(10)).map(function(elem, index2) {
      return "0" + index2;
    });
    let newTime = format.replace(/YY/g, year.toString()).replace(/MM/g, preArr[month] || month.toString()).replace(/DD/g, preArr[day] || day.toString()).replace(/hh/g, preArr[hour] || hour.toString()).replace(/mm/g, preArr[min2] || min2.toString()).replace(/ss/g, preArr[sec] || sec.toString());
    return newTime;
  }
  var notMoreThanOne = (...arr) => {
    let count2 = 0;
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (arr[i2]) {
        count2++;
      }
    }
    return count2 <= 1;
  };
  var isImageBookmark = (data) => {
    return Boolean(data.url) && data.cover;
  };
  var isBookmarkOfBook = (data) => {
    return Boolean(data.url) && !data.cover;
  };
  var isImageDir = (data) => {
    return !data.url && !!data.timeStamp && !!data.cover;
  };
  var isBookDir = (data) => {
    return !data.url && !!data.timeStamp && !data.cover;
  };
  var parseUrlQuery = (url) => {
    const query = decodeURIComponent(url.split("?")[1]);
    if (query) {
      const queryObj = {};
      const queryArr = query.split("&");
      queryArr.forEach((item) => {
        const [key, value] = item.split("=");
        if (typeof value === "string") {
          queryObj[key] = value;
        }
      });
      return queryObj;
    }
    return {};
  };
  var convertJsRegToMysqlReg = (reg) => {
    let newReg = "";
    newReg = String.raw`${reg}`.replace("\\d", "[0-9]").replace("\\w", "[a-zA-Z]").replace(/\[.*(\[0-9\]).*\]/, (match, p1) => {
      return match.replace(p1, "0-9");
    }).replace(/\[.*(\[a-zA-Z\]).*\]/, (match, p1) => {
      return match.replace(p1, "a-zA-Z");
    });
    return String.raw`${newReg}`;
  };
  var endsWith = (str, ...args) => {
    for (let i2 = 0; i2 < args.length; i2++) {
      if (str.endsWith(args[i2])) {
        return true;
      }
    }
    return false;
  };
  var process2 = window.require("child_process");
  var cmdOrder = {
    getAllDrive: () => "wmic logicaldisk where drivetype=3 get deviceid",
    getOneDriveName: (drive) => `wmic logicaldisk where name="${drive}:" get volumename`
  };
  async function getAllDrive() {
    let result = [];
    let promise = new Promise((resolve) => {
      process2.exec(cmdOrder.getAllDrive(), (error, stdout) => {
        if (error !== null) {
          console.error(error);
          return;
        }
        let stdoutArr = [...stdout];
        let res = [];
        stdoutArr.forEach((v2, i2) => {
          if (v2 === ":") {
            res.push(stdoutArr[i2 - 1]);
          }
        });
        let resList = [];
        let promiseArr = [];
        res.forEach((v2) => {
          promiseArr.push(
            new Promise((resolve2) => {
              process2.exec(
                cmdOrder.getOneDriveName(v2),
                (error2, stdout2) => {
                  if (error2 !== null) {
                    console.error(error2);
                    return;
                  }
                  let stdoutArr2 = [...stdout2];
                  let res2 = [];
                  stdoutArr2.forEach((v3) => {
                    if (v3 !== " " && v3 !== "\n" && v3 !== "\r") {
                      res2.push(v3);
                    }
                  });
                  res2.splice(0, 10);
                  resList.push({
                    drive: v2,
                    name: res2.join("")
                  });
                  resolve2(true);
                }
              );
            })
          );
        });
        Promise.all(promiseArr).then(() => {
          resolve(resList);
        });
      });
    });
    await promise.then((res) => {
      result = res;
    });
    return result;
  }
  var setSearchParams = (head, params) => {
    let search = "";
    for (let key in params) {
      if (params[key]) {
        search += `${key}=${params[key]}&`;
      }
    }
    return `${head}?${search}`;
  };
  var canvas = document.createElement("canvas");
  async function imageToCanvas(src, fn, quality, thumbName) {
    return new Promise((resolve) => {
      let ctx = canvas.getContext("2d");
      let img = new Image();
      let dest = src.replaceAll("\\", "/").split("/").slice(0, -1).join("/");
      let imgSrc = src.replaceAll("\\", "/").replaceAll(/\s/g, encodeURIComponent(" ")).replaceAll(/#/g, encodeURIComponent("#"));
      img.src = imgSrc;
      img.onload = function() {
        img.onload = null;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        fn(canvas, dest, quality, thumbName).then((res) => resolve(res));
      };
      img.onerror = function() {
        img.onerror = null;
        console.log(decodeURI(img.src));
      };
    });
  }
  async function canvasToDataURL(canvas2, dest, quality, thumbName) {
    let data = canvas2.toDataURL("image/jpeg", quality || 0.5).replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer2.from(data, "base64");
    if (thumbName.includes("bookmark-thumb")) {
      const files = fs2.readdirSync(dest);
      files.forEach((file) => {
        if (file.includes("bookmark-thumb")) {
          fs2.unlinkSync(`${dest}/${file}`);
        }
      });
    }
    await fs2.writeFile(path.join(dest, thumbName), dataBuffer, (err) => {
      if (err) {
        console.log("\u5199\u5165\u56FE\u7247\u9519\u8BEF", err);
      }
    });
    return true;
  }
  var checkImageSize = (path4) => {
    const size = fs2.statSync(path4).size;
    return size;
  };
  var compress = async (src, thumbName = "thumb.jpg") => {
    let size = 0;
    let imgSrc = decodeURIComponent(src);
    try {
      size = checkImageSize(imgSrc);
    } catch (e2) {
      if (!fs2.existsSync(imgSrc)) {
        console.log("\u6587\u4EF6\u4E0D\u5B58\u5728", imgSrc);
        throw new Error("\u6587\u4EF6\u4E0D\u5B58\u5728");
      }
    }
    let n2 = 1;
    if (size >= 1024 * 1024 * 6) {
      n2 = 0.15;
    } else if (size >= 1024 * 1024 * 4) {
      n2 = 0.2;
    } else if (size >= 1024 * 1024 * 2) {
      n2 = 0.4;
    } else if (size >= 1024 * 1024 * 1) {
      n2 = 0.5;
    } else if (size >= 1024 * 1024 * 0.5) {
      n2 = 0.7;
    }
    return await imageToCanvas(imgSrc, canvasToDataURL, n2, thumbName);
  };
  var openInExplorer = (path4) => {
    window.require("child_process").exec(`start "" "${path4}"`);
  };
  var hasCover = (data) => {
    return data.cover !== void 0;
  };
  var deleteUselessWords = (str, ...useless) => {
    useless.forEach((v2) => {
      str = str.replace(v2, "");
    });
    return str;
  };
  var gotoHash = (hash2) => {
    window.location.hash = hash2;
  };
  var rmDir = async (dirPath) => {
    let files = [];
    try {
      files = fs2.readdirSync(dirPath);
    } catch (e2) {
      return false;
    }
    if (files.length > 0)
      for (let i2 = 0; i2 < files.length; i2++) {
        let filePath = dirPath + "/" + files[i2];
        if (fs2.statSync(filePath).isFile())
          fs2.unlinkSync(filePath);
        else
          rmDir(filePath);
      }
    await fs2.rmdir(dirPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return true;
  };

  // src/utils/mysqlOperator.ts
  var mysql = window.require("mysql");
  var _MysqlOperator = class {
    id = null;
    _pool;
    _config;
    _searchRes = { param: "", result: [] };
    hasExternalDriver = false;
    loaded = false;
    init = false;
    database = "GALLERY";
    mainTableName = "pack_list";
    count = 0;
    constructor() {
      this.checkExternalDriver();
      this._config = {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "GALLERY",
        port: 3306,
        connectionLimit: 10
      };
      this._pool = mysql.createPool(this._config);
    }
    static getInstance() {
      if (!_MysqlOperator._instance) {
        _MysqlOperator._instance = new _MysqlOperator();
      }
      return _MysqlOperator._instance;
    }
    async checkExternalDriver() {
      if (this.loaded) {
        return this.hasExternalDriver;
      }
      const res = await getAllDrive();
      this.hasExternalDriver = !!res.find(
        (e2) => e2.name === "BigHouse" && e2.drive === "E"
      );
      this.loaded = true;
      return this.hasExternalDriver;
    }
    getPackById(id) {
      const sql = `select * from ${this.mainTableName} where id = ?`;
      return new Promise((resolve, reject) => {
        if (this.count !== 0) {
          resolve(this.count);
        }
        this._pool.getConnection((err, connection) => {
          connection?.query(sql, [id], (err2, result) => {
            connection.release();
            if (err2) {
              reject(err2);
            } else {
              if (result.length !== 1) {
                reject("\u67E5\u8BE2\u7ED3\u679C\u4E0D\u4E3A1");
              }
              const v2 = result[0];
              resolve({
                id: v2.id ?? v2.dir_id,
                title: v2.title ?? v2.dir_title,
                path: v2.path ?? "",
                cover: v2.cover ?? v2.dir_cover,
                stared: Boolean(v2.stared ?? v2.dir_stared),
                parent: v2.parent,
                reg: v2.reg
              });
            }
          });
        });
      });
    }
    switchDatabase(database, tableName) {
      if (database === this.database) {
        return false;
      }
      this.database = database;
      this.mainTableName = tableName;
      if (this._pool) {
        this._pool.end();
      }
      this._config = {
        host: "localhost",
        user: "root",
        password: "123456",
        database: this.database,
        port: 3306,
        connectionLimit: 10
      };
      this._pool = mysql.createPool(this._config);
      return true;
    }
    async select(sqlParam, mode2) {
      if (mode2 === "Normal" /* Normal */ && sqlParam.length !== 2) {
        throw new Error("sqlParam is not correct");
      }
      let sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent is null order by id desc limit ? ,?`;
      let dirId = "";
      switch (mode2) {
        case "Normal" /* Normal */:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent is null order by id desc limit ? ,?`;
          break;
        case "Stared" /* Stared */:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} stared = 1 order by id desc`;
          break;
        case "InDir" /* DirContent */:
          dirId = window.location.href.match(/directory=([0-9]+)/)[1];
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent = ${dirId} order by id desc`;
          break;
        case "ShowDirs" /* ShowDirs */:
          sql = `select * from directory order by update_time desc`;
          if (this.mainTableName === "pack_list") {
            sql = `select * from directory,pack_list where cover_id = id order by update_time desc`;
          }
          break;
        case "Bookmark" /* Bookmark */:
          sql = `select id, title,path, b_cover as cover, b_url as url,
				 b_timeStamp as timeStamp, stared from bookmark, ${this.mainTableName} 
				 where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} bookmark.b_id = ${this.mainTableName}.id order by b_timeStamp desc`;
          if (this.database === "book") {
            sql = `select id, title,path, b_url as url, reg,
				 b_timeStamp as timeStamp, stared from bookmark, ${this.mainTableName} 
				 where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} bookmark.b_id = ${this.mainTableName}.id order by b_timeStamp desc`;
          }
          break;
        default:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent is not null order by id desc limit ? ,?`;
      }
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, sqlParam, (err2, result) => {
            connection.release();
            if (err2) {
              reject(err2);
            } else {
              if (mode2 === "Bookmark" /* Bookmark */) {
                resolve(
                  result.map((v2) => {
                    return {
                      id: v2.id,
                      title: v2.title,
                      path: v2.path,
                      cover: v2.cover,
                      url: v2.url,
                      timeStamp: formatDate(
                        new Date(v2.timeStamp).toString()
                      ),
                      stared: Boolean(v2.stared),
                      reg: v2.reg
                    };
                  })
                );
                return;
              } else if (mode2 === "ShowDirs" /* ShowDirs */) {
                resolve(
                  result.map((v2) => {
                    return {
                      id: v2.dir_id,
                      title: v2.dir_title,
                      cover: v2.path + v2.cover,
                      timeStamp: formatDate(
                        new Date(
                          v2.update_time
                        ).toString()
                      ) ?? ""
                    };
                  })
                );
                return;
              }
              resolve(
                result.map((v2) => {
                  return {
                    id: v2.id ?? v2.dir_id,
                    title: v2.title ?? v2.dir_title,
                    path: v2.path ?? "",
                    cover: v2.cover ?? v2.dir_cover,
                    stared: Boolean(v2.stared ?? v2.dir_stared),
                    parent: v2.parent,
                    reg: v2.reg
                  };
                })
              );
            }
          });
        });
      });
    }
    getCount() {
      let sql = `select count(*) as count from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent is null`;
      return new Promise((resolve, reject) => {
        if (this.count !== 0) {
          resolve(this.count);
        }
        this._pool.getConnection((err, connection) => {
          connection?.query(sql, (err2, result) => {
            connection.release();
            if (err2) {
              reject(err2);
            } else {
              resolve(result[0].count);
            }
          });
        });
      });
    }
    end() {
      this._pool.end();
    }
    async search(sqlParam, mode2, reg) {
      let sql = "";
      let dirId = "";
      let key = reg ? `regexp '${sqlParam}' ` : `like '%${sqlParam}%'`;
      switch (mode2) {
        case "Normal" /* Normal */:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} title ${key} order by id desc`;
          break;
        case "Stared" /* Stared */:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} stared = 1 and title ${key} order by id desc`;
          break;
        case "InDir" /* DirContent */:
          dirId = window.location.href.match(/directory=([0-9]+)/)[1];
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} parent = ${dirId} and title ${key} order by id desc`;
          break;
        case "ShowDirs" /* ShowDirs */:
          if (this.mainTableName === "pack_list") {
            sql = `select * from directory, pack_list where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} dir_title ${key} and directory.cover_id = pack_list.id order by update_time desc`;
          } else {
            sql = `select * from directory where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} dir_title ${key} order by update_time desc`;
          }
          break;
        case "Bookmark" /* Bookmark */:
          sql = `select * from bookmark, ${this.mainTableName} where b_id = id and ${this.hasExternalDriver ? "" : "path not like 'E%' and"} title ${key} order by b_timeStamp desc`;
          break;
        default:
          sql = `select * from ${this.mainTableName} where ${this.hasExternalDriver ? "" : "path not like 'E%' and"} title ${key} order by id desc`;
      }
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, sqlParam, (err2, result) => {
            connection.release();
            if (err2) {
              reject(err2);
            } else {
              resolve(
                result.map((v2) => {
                  return {
                    id: v2.dir_id ?? v2.id,
                    title: v2.dir_title ?? v2.title,
                    path: mode2 === "ShowDirs" /* ShowDirs */ ? "" : v2.path,
                    cover: mode2 === "ShowDirs" /* ShowDirs */ ? v2.path + v2.cover : v2.cover,
                    stared: Boolean(v2.stared ?? v2.dir_stared),
                    parent: v2.parent,
                    reg: v2.reg,
                    timeStamp: v2.update_time
                  };
                })
              );
            }
          });
        });
      });
    }
    async updateStar(data) {
      let sql = `update ${this.mainTableName} set stared = ? where id = ?`;
      let sqlParam = [data.stared ? 1 : 0, data.id];
      return new Promise((resolve, reject) => {
        this._pool.getConnection(async (err, connection) => {
          connection.query(sql, sqlParam, (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    async updateDir(dirId, packId, status, cover) {
      let sql = `update ${this.mainTableName} set  parent = ? where id = ?`;
      let sqlParam = [status ? dirId : null, packId];
      if (cover) {
        if (status) {
          this._pool.getConnection((err, connection) => {
            connection.query(
              "update directory set cover_id = ? where  dir_id = ?",
              [packId, dirId],
              (err2) => {
                connection.release();
                if (err2) {
                  console.error(err2);
                }
              }
            );
          });
        } else {
          this._pool.getConnection((err, connection) => {
            connection.query(
              `update directory, (select id, title, parent from pack_list where id in 
							(select max(id) from pack_list where parent > 0 group by parent having id != ?)) as t
							set cover_id = t.id where  dir_id = ? and t.parent = dir_id`,
              [packId, dirId],
              (err2) => {
                connection.release();
                if (err2) {
                  console.error(err2);
                }
              }
            );
          });
        }
      }
      return new Promise((resolve, reject) => {
        this._pool.getConnection(async (err, connection) => {
          connection.query(sql, sqlParam, (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    mapDir() {
      let sql = `select dir_id as id, dir_title as title , count(parent) as count from directory left outer join ${this.mainTableName} on(dir_id = parent )
			  group by dir_id ;`;
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, (err2, result) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            let map2 = /* @__PURE__ */ new Map();
            result.forEach((v2) => {
              map2.set(v2.id.toString(), {
                count: v2.count,
                title: v2.title
              });
            });
            resolve(map2);
          });
        });
      });
    }
    insertDir(newDir) {
      let sql = "insert into directory set ?";
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, newDir, (err2, res) => {
            connection.release();
            if (err2) {
              console.error(err2);
              reject(null);
            }
            resolve(res.insertId);
          });
        });
      });
    }
    insertPack(newPack, duplicate = false) {
      let sql = `insert into ${this.mainTableName} set ?`;
      return new Promise((resolve) => {
        this._pool.getConnection((err, connection) => {
          if (!newPack.cover) {
            delete newPack.cover;
          }
          connection.query(sql, newPack, (err2, res) => {
            connection.release();
            if (err2 && !duplicate) {
              resolve(null);
              return;
            }
            resolve(res);
          });
        });
      });
    }
    updateGalleryBookmark(bookmark, marked, mode2) {
      let sql = marked ? mode2 === "insert" ? "insert into bookmark set ? " : "update bookmark set ? where b_id = ?" : "delete from bookmark where b_id = ?";
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(
            sql,
            marked ? mode2 === "insert" ? {
              b_url: bookmark.url,
              b_cover: bookmark.cover,
              b_timeStamp: bookmark.timeStamp,
              b_id: bookmark.id
            } : [
              {
                b_url: bookmark.url,
                b_cover: bookmark.cover,
                b_timeStamp: bookmark.timeStamp
              },
              bookmark.id
            ] : [bookmark.id],
            (err2, res) => {
              connection.release();
              if (err2) {
                reject(err2);
              }
              resolve(res);
            }
          );
        });
      });
    }
    updateBookmarkOfBook(bookmark, marked, mode2) {
      let sql = marked ? mode2 === "insert" ? "insert into bookmark set ? " : "update bookmark set ? where b_id = ?" : "delete from bookmark where b_id = ?";
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(
            sql,
            marked ? mode2 === "insert" ? {
              b_url: bookmark.url,
              b_timeStamp: bookmark.timeStamp,
              b_id: bookmark.id
            } : [
              {
                b_url: bookmark.url,
                b_timeStamp: bookmark.timeStamp
              },
              bookmark.id
            ] : [bookmark.id],
            (err2, res) => {
              connection.release();
              if (err2) {
                reject(err2);
              }
              resolve(res);
            }
          );
        });
      });
    }
    updateReg(id, reg) {
      let sql = `update ${this.mainTableName} set reg = ? where id = ?`;
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, [reg, id], (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    renamePack(packID, title) {
      let sql = `update ${this.mainTableName} set title = ? where id = ?`;
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, [title, packID], (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    renameDir(dirID, title) {
      let sql = "update directory set dir_title = ? where dir_id = ?";
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, [title, dirID], (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    changePackCover(packID, cover) {
      let sql = `update ${this.mainTableName} set cover = ? where id = ?`;
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, [cover, packID], (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
    delete(packID) {
      let sql = `delete from ${this.mainTableName} where id = ?`;
      return new Promise((resolve, reject) => {
        this._pool.getConnection((err, connection) => {
          connection.query(sql, [packID], (err2, res) => {
            connection.release();
            if (err2) {
              reject(err2);
            }
            resolve(res);
          });
        });
      });
    }
  };
  var MysqlOperator = _MysqlOperator;
  __publicField(MysqlOperator, "_instance");
  var mysqlOperator = MysqlOperator.getInstance();

  // src/utils/models.ts
  var createStarModel = () => {
    return {
      dirty: false,
      data: [],
      dataToUpdate: [],
      async update(newStar) {
        this.dirty = true;
        if (newStar) {
          await mysqlOperator.updateStar(newStar);
        }
        this.data = await mysqlOperator.select([], "Stared" /* Stared */);
      },
      remove(id) {
        this.data = this.data.filter((item) => item.id !== id);
      }
    };
  };
  var createBookmarkModel = () => {
    return {
      dirty: false,
      data: [],
      dataToUpdate: [],
      remove(id) {
        this.data = this.data.filter((item) => item.id !== id);
      },
      async update(newData, marked = true) {
        if (isImageBookmark(newData)) {
          if (this.data.find((item) => item.id === newData.id)) {
            await mysqlOperator.updateGalleryBookmark(
              newData,
              marked,
              "update"
            );
          } else {
            await mysqlOperator.updateGalleryBookmark(
              newData,
              marked,
              "insert"
            );
          }
        } else if (isBookmarkOfBook(newData)) {
          if (this.data.find((item) => item.id === newData.id)) {
            await mysqlOperator.updateBookmarkOfBook(
              newData,
              marked,
              "update"
            );
          } else {
            await mysqlOperator.updateBookmarkOfBook(
              newData,
              marked,
              "insert"
            );
          }
        }
        this.data = await mysqlOperator.select([], "Bookmark" /* Bookmark */);
      }
    };
  };
  var selectionModel = {
    selected: /* @__PURE__ */ new Set(),
    update(index2, selected) {
      if (selected) {
        this.selected.add(index2);
      } else if (this.selected.has(index2)) {
        this.selected.delete(index2);
      }
    },
    submit() {
    }
  };

  // node_modules/syill/lib/Store.js
  var handler = {
    set() {
      console.warn(
        "Don't change store of a model directly. Use setModelValue instead."
      );
      return true;
    }
  };
  var toDeepProxy = (obj, handler2) => {
    const f2 = (value, handler3) => {
      for (let key in value) {
        if (value[key] instanceof Object) {
          toDeepProxy(value[key], handler3);
          value[key] = new Proxy(value[key], handler3);
        }
      }
    };
    f2(obj, handler2);
    return new Proxy(obj, handler2);
  };
  var Store = class {
    constructor(value) {
      this.stateControllers = [];
      this.value = value;
    }
    createController() {
      const controller = (value) => {
        if (value.call) {
          this.value = value(this.value);
        } else {
          this.value = value;
        }
        this.stateControllers.forEach((c2) => c2((v2) => !v2));
      };
      return controller;
    }
    createModel(strict = false) {
      if (typeof this.value === "object" && strict) {
        toDeepProxy(this.value, handler);
        return new Proxy(this.value, handler);
      }
      return this.value;
    }
    addStateController(controller) {
      this.stateControllers.push(controller);
    }
    model() {
      return this.value;
    }
  };

  // node_modules/syill/lib/useController.js
  var import_react2 = __toESM(require_react());

  // node_modules/syill/lib/useModel.js
  var import_react = __toESM(require_react());
  var useModel = (store, strict = false) => {
    const [_, set_] = (0, import_react.useState)(false);
    const init = (0, import_react.useRef)(false);
    (0, import_react.useEffect)(() => {
      if (init.current) {
        return;
      }
      init.current = true;
      store.addStateController(set_);
    }, [store]);
    return (0, import_react.useMemo)(() => store.createModel(strict), [store, _]);
  };

  // node_modules/syill/lib/useController.js
  var useController = (store) => {
    const controller = (0, import_react2.useMemo)(() => store.createController(), [store]);
    const model = (0, import_react2.useCallback)(() => {
      return store.model();
    }, [store]);
    return [model, controller];
  };
  var useData = (store) => {
    const data = useModel(store);
    const controller = (0, import_react2.useMemo)(() => store.createController(), [store]);
    return [data, controller];
  };

  // src/utils/store.ts
  var fileDropVisibleStore = new Store(false);
  var dirMapVisibleStore = new Store(false);
  var renameVisibleStore = new Store(false);
  var configVisibleStore = new Store(false);
  var catalogVisibleStore = new Store(false);
  var dialogActive = {
    active: false,
    setActive: (active) => {
      dialogActive.active = active;
    },
    reverse: () => {
      dialogActive.active = !dialogActive.active;
    }
  };
  var imageStateStore = { current: "" };
  var currentOperator = {
    op: null
  };
  var findStore = new Store(false);
  var cursorStore = new Store(
    []
  );

  // src/utils/fileOperator.ts
  var fs3 = window.require("fs");
  var FileOperator = class {
    constructor(databaseConfig) {
      this.databaseConfig = databaseConfig;
      mysqlOperator.getCount().then((res) => {
        this.total = res;
      });
      mysqlOperator.select([], "Stared" /* Stared */).then((res) => {
        this.starModel.data = res;
      });
      mysqlOperator.select([], "Bookmark" /* Bookmark */).then((res) => {
        this.bookmarkModel.data = res;
      });
      mysqlOperator.select([], "ShowDirs" /* ShowDirs */).then((res) => {
        this.directories = res;
      });
      mysqlOperator.mapDir().then((res) => {
        this.dirMap = Map2(res);
      });
    }
    external = false;
    directories = [];
    fileCache = {
      startPage: 0,
      data: []
    };
    prevPage = "";
    refreshFn = (v2) => {
    };
    setTitleFn = (v2) => {
    };
    mode = "INIT" /* Init */;
    total = 0;
    currentPacks = [];
    dirMap = fromJS({});
    starModel = createStarModel();
    bookmarkModel = createBookmarkModel();
    selection = selectionModel;
    nextTitle = "";
    searchCache = {
      key: "",
      mode: "Normal" /* Normal */,
      res: [],
      total: 0,
      reg: false,
      valid: false
    };
    async getPacksNormally(page) {
      let res = this.fileCache.data;
      if (this.switchMode("Normal" /* Normal */) || page < this.fileCache.startPage || page >= this.fileCache.startPage + 10 || this.fileCache.startPage === 0) {
        res = await mysqlOperator.select(
          [
            (page - 1) * packCountOfSinglePage,
            10 * packCountOfSinglePage
          ],
          "Normal" /* Normal */
        );
        this.fileCache.data = res;
        this.fileCache.startPage = page;
      }
      this.currentPacks = this.fileCache.data;
      return this.currentPacks.slice(
        (page - this.fileCache.startPage) * packCountOfSinglePage,
        (page - this.fileCache.startPage + 1) * packCountOfSinglePage
      );
    }
    async searchPacks(key, page) {
      if (this.searchCache.key === key && this.searchCache.valid) {
        return this.searchCache.res.slice(
          (page - 1) * packCountOfSinglePage,
          page * packCountOfSinglePage
        );
      }
      this.searchCache.valid = true;
      this.searchCache.key = key;
      this.searchCache.res = [];
      this.titleWillUpdate("Search=" + this.searchCache.key);
      let result = [];
      if (this.mode === "InDir" /* DirContent */) {
        result = this.currentPacks.filter((v2) => v2.title.includes(key));
      } else {
        result = await mysqlOperator.search(
          this.searchCache.reg ? convertJsRegToMysqlReg(key) : key,
          this.mode,
          this.searchCache.reg
        );
      }
      this.searchCache.res = result;
      this.searchCache.total = result.length;
      this.currentPacks = result;
      return this.currentPacks.slice(
        (page - 1) * packCountOfSinglePage,
        page * packCountOfSinglePage
      );
    }
    getStared(page) {
      this.switchMode("Stared" /* Stared */);
      this.currentPacks = this.starModel.data;
      return this.currentPacks.slice(
        (page - 1) * packCountOfSinglePage,
        page * packCountOfSinglePage
      );
    }
    getBookmarks(page) {
      this.switchMode("Bookmark" /* Bookmark */);
      this.currentPacks = this.bookmarkModel.data;
      return [
        this.currentPacks.slice(
          (page - 1) * packCountOfSinglePage,
          page * packCountOfSinglePage
        ),
        this.bookmarks.length
      ];
    }
    switchMode(mode2) {
      if (mode2 !== "Detail" /* Detail */) {
        this.titleWillUpdate(this.modeType(mode2));
      }
      if (mode2 === this.mode) {
        return false;
      }
      this.searchCache.valid = false;
      this.mode = mode2;
      return true;
    }
    async getDirContent(index2, page) {
      if (this.switchMode("InDir" /* DirContent */)) {
        this.currentPacks = await mysqlOperator.select([], "InDir" /* DirContent */);
      }
      return [
        this.currentPacks.slice(
          (page - 1) * packCountOfSinglePage,
          page * packCountOfSinglePage
        ),
        this.currentPacks.length
      ];
    }
    get bookmarks() {
      return this.bookmarkModel.data;
    }
    register(fn, flag = false) {
      if (!flag) {
        this.refreshFn = fn;
      } else {
        this.setTitleFn = fn;
      }
    }
    staredUpdate(newStar) {
      newStar.stared = !newStar.stared;
      this.starModel.update(newStar);
    }
    async showDir(page) {
      this.switchMode("ShowDirs" /* ShowDirs */);
      let res = await mysqlOperator.select([], "ShowDirs" /* ShowDirs */);
      this.currentPacks = res;
      return [
        res.slice(
          (page - 1) * packCountOfSinglePage,
          page * packCountOfSinglePage
        ),
        res.length
      ];
    }
    async getPacks(page, url) {
      this.external = !!await mysqlOperator.checkExternalDriver();
      let query = parseUrlQuery(url);
      if (!notMoreThanOne(
        query.stared,
        query.bookmark,
        query.directory,
        query.show_dir
      )) {
        throw new Error("can't more than one mode");
      }
      if (query.search) {
        return [
          await this.searchPacks(query.search, page),
          this.searchCache.total
        ];
      } else if (query.directory) {
        return await this.getDirContent(parseInt(query.directory), page);
      } else if (query.stared) {
        return [this.getStared(page), this.starModel.data.length];
      } else if (query.bookmark) {
        return this.getBookmarks(page);
      } else if (query.show_dir) {
        return await this.showDir(page);
      }
      return [
        await this.getPacksNormally(page),
        this.total || await this.getTotal()
      ];
    }
    titleWillUpdate(title) {
      this.nextTitle = title;
    }
    titleUpdate() {
      this.setTitleFn(this.nextTitle);
    }
    refresh() {
      this.switchMode("INIT" /* Init */);
      this.refreshFn((v2) => !v2);
    }
    savePrevPage(url) {
      this.prevPage = url;
    }
    loadPrevPage() {
      let url = this.prevPage;
      return url;
    }
    async bookmarksUpdate(newBookmark, marked = true) {
      if (hasCover(newBookmark)) {
        await compress(
          newBookmark.path + newBookmark.cover,
          getBookmarkThumb(newBookmark)
        );
      }
      this.bookmarkModel.update(newBookmark, marked);
    }
    selectionUpdate(newSelection, selected) {
      this.selection.update(newSelection, selected);
    }
    addFileToDir(dirIndex) {
      if (this.selection.selected.size === 0) {
        return;
      }
      let cover = "";
      let count2 = 0;
      this.currentPacks.forEach((e2, i2) => {
        if (this.selection.selected.has(e2.id)) {
          if (hasCover(e2)) {
            if (count2 === 0) {
              cover = e2.path + e2.cover;
            }
          }
          ++count2;
          e2.parent = dirIndex;
          mysqlOperator.updateDir(dirIndex, e2.id, 1, count2 === 1 ? cover : "").then(() => {
            if (count2 === this.selection.selected.size) {
              this.dirMap.get(dirIndex.toString()).count += this.selection.selected.size;
              this.selection.selected.clear();
              if (this.mode === "Normal" /* Normal */) {
                this.refresh();
              }
              this.switchMode("INIT" /* Init */);
            }
          });
        }
      });
    }
    removeFileFromDir(packId, dirId) {
      let e2 = this.currentPacks.find((e3) => e3.id !== packId);
      if (hasCover(e2)) {
        mysqlOperator.updateDir(
          dirId,
          packId,
          0,
          e2 ? e2.path + e2.cover : defaultCover
        ).then((e3) => {
          this.dirMap.get(dirId.toString()).count--;
          this.currentPacks = this.currentPacks.filter(
            (v2) => v2.id !== packId
          );
          this.refresh();
        });
      }
      this.switchMode("INIT" /* Init */);
    }
    modeType(mode2) {
      switch (mode2) {
        case "INIT" /* Init */:
          return "Integration";
        case "Detail" /* Detail */:
          return "Detail";
        case "Bookmark" /* Bookmark */:
          return "Bookmark";
        case "ShowDirs" /* ShowDirs */:
          return "Directories";
        case "Stared" /* Stared */:
          return "Stared";
        case "InDir" /* DirContent */:
          return this.dirMap.get(
            window.location.href.match(/directory=([0-9]+)/)[1]
          )?.title ?? "Directories";
        default:
          return "Integration";
      }
    }
    renameTarget = { id: -1, oldTitle: "" };
    async renamePack(title) {
      try {
        await mysqlOperator.renamePack(this.renameTarget.id, title);
        let target = this.currentPacks.find(
          (e2) => e2.id === this.renameTarget.id
        );
        target.title = title;
        if (target.stared) {
          this.starModel.update();
        }
        this.refresh();
        return true;
      } catch {
        return false;
      }
    }
    set packToBeRenamed(data) {
      if (data) {
        this.renameTarget = data;
      } else {
        this.renameTarget = { id: -1, oldTitle: "" };
      }
    }
    get oldTitle() {
      return this.renameTarget.oldTitle;
    }
    async renameDir(title) {
      try {
        await mysqlOperator.renameDir(this.renameTarget.id, title);
        this.dirMap.get(this.renameTarget.id.toString()).title = title;
        let target = this.currentPacks.find(
          (e2) => e2.id === this.renameTarget.id
        );
        target.title = title;
        this.refresh();
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    rename(newTitle) {
      if (this.mode === "ShowDirs" /* ShowDirs */) {
        return this.renameDir(newTitle);
      }
      return this.renamePack(newTitle);
    }
    async getTotal() {
      return mysqlOperator.getCount();
    }
    deletePack(packId) {
      mysqlOperator.delete(packId);
    }
    get modeOfSearch() {
      return this.searchCache.mode;
    }
    get inDir() {
      return this.mode === "InDir" /* DirContent */;
    }
    searchParentName(parentID) {
      if (!parentID) {
        return "Directories";
      }
      return this.dirMap?.get(parentID.toString())?.title ?? "Directories";
    }
    set reg(v2) {
      this.searchCache.reg = v2;
    }
    getMode() {
      return this.mode;
    }
    async load() {
      let promises = [];
      promises.push(mysqlOperator.mapDir());
      promises.push(mysqlOperator.getCount());
      promises.push(mysqlOperator.select([], "Stared" /* Stared */));
      promises.push(mysqlOperator.select([], "Bookmark" /* Bookmark */));
      promises.push(mysqlOperator.select([], "ShowDirs" /* ShowDirs */));
      let [dirMap, total, stared, bookmark, showDir] = await Promise.all(
        promises
      );
      this.dirMap = Map2(dirMap);
      this.total = total;
      this.starModel.data = stared;
      this.bookmarkModel.data = bookmark;
      this.directories = showDir;
      return true;
    }
    async switchMainTable(name) {
      currentOperator.op = this;
      if (mysqlOperator.switchDatabase(
        this.databaseConfig.database,
        this.databaseConfig.tableName
      )) {
        await this.load();
      }
    }
  };

  // src/utils/ImgWaterFallCache.ts
  var _ImgWaterfallCache = class {
    temp = [
      [],
      [],
      [],
      []
    ];
    static getInstance() {
      if (!_ImgWaterfallCache.instance) {
        _ImgWaterfallCache.instance = new _ImgWaterfallCache();
      }
      return _ImgWaterfallCache.instance;
    }
    data = [
      [],
      [],
      [],
      []
    ];
    cacheNeeded = false;
    saveTemp(data) {
      this.temp = data;
    }
    save() {
      this.data = this.temp;
      this.temp = [[], [], [], []];
      this.cacheNeeded = true;
    }
    load() {
      this.cacheNeeded = false;
      let data = this.data;
      this.data = [[], [], [], []];
      return data;
    }
    isNeeded(sample) {
      if (isImageBookmark(sample[0])) {
        this.cacheNeeded = false;
      } else if (this.count !== sample.length) {
        this.cacheNeeded = false;
      } else if (this.data.flat().map((e2) => e2.data.id).sort().join(",") !== sample.map((e2) => e2.id).sort().join(",")) {
        return false;
      }
      return this.cacheNeeded;
    }
    get count() {
      return this.data.reduce((a2, b2) => a2 + b2.length, 0);
    }
    updateCover(data) {
      this.data.forEach((e2) => {
        let index2 = e2.findIndex((e3) => e3.data.id === data.id);
        if (index2 !== -1) {
          e2[index2].data.cover = data.cover;
          e2[index2].img.src = (data.path ?? "") + data.cover;
        }
      });
    }
  };
  var ImgWaterfallCache = _ImgWaterfallCache;
  __publicField(ImgWaterfallCache, "instance");

  // src/utils/BookDetail.ts
  var BookDetail = class {
    book;
    contentSize = { start: 0, end: 0 };
    content = [];
    catalog = [];
    currentChapter = 0;
    regExp;
    constructor(book) {
      this.book = book;
      this.regExp = new RegExp(String.raw`${book.reg}`, "g");
    }
    addChapter(chapter) {
      this.catalog.push(chapter);
    }
    getContent(start, end) {
      this.contentSize = { start, end };
      return this.content.slice(start, end).map((line) => {
        return `<p ${line.className.length > 0 ? 'class="' + line.className.join(" ") + '"' : ""}>${line.content} </p>`;
      });
    }
    addContent(content) {
      if (Array.isArray(content)) {
        for (let i2 = 0; i2 < content.length; i2++) {
          this.parseCatalog(content[i2]);
          this.content.push(content[i2]);
        }
      } else {
        this.parseCatalog(content);
        this.content.push(content);
      }
    }
    parseCatalog(line) {
      let title = line.content.match(this.regExp)?.[0];
      if (title) {
        if (!line.className.includes("chapter-title")) {
          line.className.push("chapter-title");
        }
        this.addChapter({
          title,
          index: line.index
        });
      } else {
        line.className = line.className.filter(
          (className) => className !== "chapter-title"
        );
      }
    }
    updateCurrentChapter(lineIndex, method = "scroll", direction = "down") {
      let chapter = this.currentChapter;
      if (this.currentChapter >= this.catalog.length) {
        return -1;
      }
      if (method === "drag") {
        let num = this.getChapter(chapter).index < lineIndex ? this.currentChapter : 0;
        for (let i2 = num; i2 < this.catalog.length; i2++) {
          if (this.catalog[i2].index > lineIndex) {
            break;
          }
          chapter = i2;
        }
      } else if (direction === "down") {
        if (this.currentChapter < this.catalog.length - 1) {
          if (this.getChapter(this.currentChapter + 1).index <= lineIndex) {
            chapter = this.currentChapter + 1;
          }
        }
      } else if (direction === "up") {
        if (this.currentChapter > 0) {
          if (this.getChapter(this.currentChapter).index > lineIndex) {
            chapter = this.currentChapter - 1;
          }
        }
      }
      return chapter;
    }
    reParseCatalog(reg) {
      this.book.reg = reg;
      this.regExp = new RegExp(String.raw`${reg}`, "g");
      this.catalog = [];
      for (let i2 = 0; i2 < this.content.length; i2++) {
        this.parseCatalog(this.content[i2]);
      }
      mysqlOperator.updateReg(this.book.id, reg);
    }
    getCatalog() {
      return this.catalog;
    }
    find(key) {
      let result = [];
      let offsetInKey = 0;
      let tempRes = [];
      for (let i2 = 0; i2 < this.content.length; i2++) {
        let content = this.content[i2].content;
        const res = { index: i2, offset: -1, length: 0 };
        for (let j = 0; j < content.length; ++j) {
          if (content[j] === key[offsetInKey]) {
            ++offsetInKey;
            res.length++;
            if (res.offset === -1) {
              res.offset = j;
            }
            if (j === content.length - 1 || offsetInKey === key.length) {
              tempRes.push({ ...res });
              res.length = 0;
              res.offset = -1;
              if (offsetInKey === key.length) {
                offsetInKey = 0;
                result.push(tempRes);
                tempRes = [];
              }
            }
          } else {
            tempRes = [];
            offsetInKey = 0;
            res.offset = -1;
          }
        }
      }
      return result;
    }
    get start() {
      return this.contentSize.start;
    }
    get length() {
      return this.content.length;
    }
    get reg() {
      return this.book.reg;
    }
    get path() {
      return this.book.path;
    }
    contain(lineIndex) {
      return lineIndex >= this.contentSize.start && lineIndex < this.contentSize.end;
    }
    getChapter(index2) {
      return this.catalog[index2];
    }
  };

  // src/utils/readerOperator.ts
  var fs4 = window.require("fs/promises");
  var iconv = window.require("iconv-lite");
  var path2 = window.require("path");
  iconv.skipDecodeWarning = true;
  var splitWords = (str, len) => {
    let strLen = str.length;
    let result = [];
    for (let i2 = 0; i2 < strLen; i2 += len) {
      result.push(str.slice(i2, i2 + len));
    }
    return result;
  };
  var isText = (file) => file.endsWith(".txt");
  var DOUBLE_SPACE = SPACE_CODE + SPACE_CODE;
  var _ReaderOperator = class extends FileOperator {
    currentBook = null;
    constructor() {
      super({ database: "book", tableName: "book_list" });
    }
    static getInstance() {
      if (!_ReaderOperator.instance) {
        _ReaderOperator.instance = new _ReaderOperator();
      }
      return _ReaderOperator.instance;
    }
    lettersOfEachLine = 55;
    formatContent(content) {
      let result = content.replace(/\n/g, "<br/>");
      return result;
    }
    async loadText() {
      if (!this.currentBook) {
        this.currentBook = JSON.parse(
          window.sessionStorage.getItem("currentBook")
        );
      }
      let text = await fs4.readFile(this.currentBook.path, "utf-8");
      if (this.isNotUtf8(text)) {
        text = this.gbkToUtf8(
          await fs4.readFile(this.currentBook.path, "binary")
        );
      }
      return this.parseBook(text);
    }
    parseBook(text) {
      const book = new BookDetail(this.currentBook);
      const lines = text.split("\n");
      let lineNum = 0;
      let paragraphIndex = 0;
      let continuousBlankLine = 0;
      for (let i2 = 0; i2 < lines.length; i2++) {
        const line = lines[i2].replace(/^\s+/g, DOUBLE_SPACE);
        let len = line.length;
        if (len && line !== DOUBLE_SPACE) {
          continuousBlankLine = 0;
          const words = [];
          const arr = splitWords(line, this.lettersOfEachLine);
          for (let i3 = 0; i3 < arr.length; i3++) {
            const item = arr[i3];
            words.push({
              index: lineNum++,
              content: `${item}`,
              className: ["text-line"],
              paragraphIndex: item.length < this.lettersOfEachLine ? paragraphIndex : paragraphIndex++
            });
          }
          book.addContent(words);
        }
        ++continuousBlankLine;
        if (continuousBlankLine === 2) {
          continue;
        }
        book.addContent({
          index: lineNum++,
          content: "",
          className: ["text-br"],
          paragraphIndex: -1
        });
      }
      return book;
    }
    isNotUtf8(str) {
      if (str.includes("\uFFFD")) {
        return true;
      }
      return false;
    }
    gbkToUtf8(str) {
      return iconv.decode(str, "gbk");
    }
    async addNewPack(data, duplicate) {
      if (!Array.isArray(data)) {
        if (!data.path || !data.title || !isText(data.path)) {
          return;
        }
        let newPack = {
          path: data.path,
          title: data.title,
          stared: 0
        };
        await mysqlOperator.insertPack(newPack, duplicate);
        this.switchMode("INIT" /* Init */);
        this.refresh();
        return true;
      }
      let result = [];
      let successCount = 0;
      let success = [];
      data.forEach((e2, i2) => {
        if (!e2.path || !e2.title || !isText(e2.path)) {
          return;
        }
        const novelPath = path2.resolve("D:/\u5C0F\u8BF4", path2.basename(e2.path));
        if (path2.dirname(e2.path).replaceAll("\\", "/") !== "D:/\u5C0F\u8BF4") {
          fs4.rename(e2.path, novelPath, (err) => {
            if (err) {
              console.error(err);
            }
          });
          e2.path = novelPath;
        }
        let newPack = {
          path: e2.path,
          title: deleteUselessWords(
            e2.title,
            "soushu2022.com@",
            "[\u641C\u4E66\u5427]",
            "-soushu2022.com-[\u641C\u4E66\u5427\u7F51\u5740]",
            "-soushu555.org-[\u641C\u4E66\u5427\u7F51\u5740]",
            ".txt"
          ),
          stared: 0
        };
        success.push(
          mysqlOperator.insertPack(newPack).then((res) => {
            if (!res) {
              result.push(`${e2.title}:::\u91CD\u590D`);
            } else {
              successCount++;
            }
            if (i2 === data.length - 1 && successCount) {
              this.switchMode("INIT" /* Init */);
            }
          })
        );
      });
      return Promise.all(success).then(() => {
        if (successCount) {
          result.unshift(`${successCount}\u4E2A\u6587\u4EF6:::\u6210\u529F`);
        }
        this.refresh();
        return result;
      });
    }
    async addNewDir(dirName) {
      if (this.dirMap.valueSeq().find((v2) => v2.title === dirName)) {
        return -1;
      }
      let newDirectory = {
        dir_title: dirName
      };
      let res = await mysqlOperator.insertDir(newDirectory);
      if (res) {
        this.dirMap = Map2(await mysqlOperator.mapDir());
        this.switchMode("INIT" /* Init */);
        return res;
      }
      return -1;
    }
    packWillOpen() {
      return this.currentBook;
    }
    mountBook(book) {
      window.sessionStorage.setItem("currentBook", JSON.stringify(book));
      this.titleWillUpdate(book.title);
      this.currentBook = book;
    }
  };
  var ReaderOperator = _ReaderOperator;
  __publicField(ReaderOperator, "instance");

  // src/utils/galleryOperator.ts
  var fs5 = window.require("fs");
  var isImage = (v2) => endsWith(v2.toLocaleLowerCase(), ".jpg", "png", "jpeg", "webp");
  var _GalleryOperator = class extends FileOperator {
    static getInstance() {
      if (!_GalleryOperator.instance) {
        _GalleryOperator.instance = new _GalleryOperator();
      }
      return _GalleryOperator.instance;
    }
    constructor() {
      super({ database: "GALLERY", tableName: "pack_list" });
    }
    async changePackCover(packId, cover, fullPath) {
      compress(fullPath);
      let e2 = this.currentPacks.find((e3) => e3.id === parseInt(packId));
      await mysqlOperator.changePackCover(e2?.id, cover);
      e2.cover = cover;
      if (e2.stared) {
        this.starModel.update();
      }
      ImgWaterfallCache.getInstance().updateCover(e2);
    }
    async addNewPack(data, duplicate = false) {
      if (!Array.isArray(data)) {
        if (!data.path || !data.title) {
          return;
        }
        let cover = data.cover;
        if (!cover || !isImage(cover)) {
          cover = fs5.readdirSync(data.path).find((v2) => isImage(v2));
        }
        if (!cover) {
          console.warn(data.title, "no image found");
          return;
        }
        let newPack = {
          path: data.path,
          cover: cover.startsWith("/") ? cover : "/" + cover,
          title: data.title,
          stared: 0
        };
        await mysqlOperator.insertPack(newPack, duplicate);
        const img = newPack.path + newPack.cover;
        await compress(img);
        this.switchMode("INIT" /* Init */);
        this.refresh();
        return true;
      }
      let result = [];
      let successCount = 0;
      let success = [];
      data.forEach((e2, i2) => {
        if (!e2.path || !e2.title) {
          return;
        }
        let cover = e2.cover || fs5.readdirSync(e2.path).find((v2) => isImage(v2));
        if (!cover) {
          console.warn(e2.title, "no image found");
          result.push(`${e2.title}:::\u672A\u627E\u5230\u56FE\u7247`);
          return;
        }
        let newPack = {
          path: e2.path,
          cover: cover.startsWith("/") ? cover : "/" + cover,
          title: e2.title,
          stared: 0
        };
        const img = newPack.path + newPack.cover;
        success.push(
          mysqlOperator.insertPack(newPack).then((res) => {
            if (!res) {
              result.push(`${e2.title}:::\u91CD\u590D`);
            } else {
              successCount++;
            }
            compress(img).then(() => {
              if (i2 === data.length - 1 && successCount) {
                this.switchMode("INIT" /* Init */);
                this.refresh();
              }
            });
          })
        );
      });
      return Promise.all(success).then(() => {
        if (successCount) {
          result.unshift(`${successCount}\u4E2A\u56FE\u5305:::\u6210\u529F`);
        }
        return result;
      });
    }
    async addNewDir(dirName) {
      for (let key of this.dirMap.keys()) {
        if (this.dirMap.get(key).title === dirName) {
          return -Number(key);
        }
      }
      let newDirectory = {
        dir_title: dirName
      };
      let res = await mysqlOperator.insertDir(newDirectory);
      if (res) {
        this.dirMap = Map2(await mysqlOperator.mapDir());
        this.switchMode("INIT" /* Init */);
        return res;
      }
      return -1;
    }
    packWillOpen(packId, change = true) {
      this.switchMode("Detail" /* Detail */);
      let res = null;
      if (this.mode === "Bookmark" /* Bookmark */) {
        res = this.bookmarks.find(
          (v2) => v2.id === packId
        );
      } else {
        res = this.currentPacks.find((v2) => v2.id === packId);
      }
      if (res) {
        window.sessionStorage.setItem("current", JSON.stringify(res));
      } else {
        res = JSON.parse(window.sessionStorage.getItem("current"));
      }
      if (change) {
        this.titleWillUpdate(res.title);
      }
      return res;
    }
    removePack(pack, shouldDelete = false) {
      if (pack.parent) {
        this.removeFileFromDir(pack.id, pack.parent);
      }
      this.deletePack(pack.id);
      this.currentPacks = this.currentPacks.filter((e2) => e2.id !== pack.id);
      this.starModel.remove(pack.id);
      this.bookmarkModel.remove(pack.id);
      this.searchCache.res = this.searchCache.res.filter(
        (e2) => e2.id !== pack.id
      );
      if (shouldDelete) {
        rmDir(pack.path).then(() => {
          this.refresh();
        });
      } else {
        this.refresh();
      }
    }
  };
  var GalleryOperator = _GalleryOperator;
  __publicField(GalleryOperator, "instance");
  var galleryOperator = GalleryOperator.getInstance();
  var readerOperator = ReaderOperator.getInstance();

  // src/components/Search.tsx
  var import_react3 = __toESM(require_react());

  // src/icon/regexp.svg
  var React2 = __toESM(require_react());
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var SvgRegexp = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", {
    t: 1652714597599,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 1503,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", {
      d: "M136 836.928c0-32.896 25.088-60.608 58.112-60.608 34.304 0 59.392 27.776 59.392 60.608 0 35.712-25.088 59.456-59.392 59.456-36.992-1.344-58.112-26.432-58.112-59.456zM903.808 398.336l-214.912 42.112 150.336 188.032-92.928 64-120.64-207.744L503.68 692.48l-92.992-64 149.568-188.032-216.32-42.112 37.76-104.576 204.8 78.464-19.648-237.44h116.928l-20.352 237.44 204.8-78.464 35.584 104.576z",
      "p-id": 1504
    })
  });

  // src/icon/search.svg
  var React3 = __toESM(require_react());
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var SvgSearch = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", {
    t: 1647587332490,
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2195,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", {
      d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6c3.2 3.2 8.4 3.2 11.6 0l43.6-43.5c3.2-3.2 3.2-8.4 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z",
      "p-id": 2196
    })
  });

  // esbuild-scss-modules-plugin:./style/header.module.scss
  var classes = { "header": "_header_5i291_2", "header__span--regexp": "_header__span--regexp_5i291_13", "header__spanRegexp": "_header__span--regexp_5i291_13", "header__label--regexp": "_header__label--regexp_5i291_16", "header__labelRegexp": "_header__label--regexp_5i291_16", "header-btn": "_header-btn_5i291_24", "headerBtn": "_header-btn_5i291_24", "console": "_console_5i291_88", "close": "_close_5i291_1", "maximize": "_maximize_5i291_1", "minimize": "_minimize_5i291_1", "search": "_search_5i291_68", "app-title": "_app-title_5i291_100", "appTitle": "_app-title_5i291_100", "text-neon": "_text-neon_5i291_1", "textNeon": "_text-neon_5i291_1", "pack-title": "_pack-title_5i291_113", "packTitle": "_pack-title_5i291_113", "header__input--search": "_header__input--search_5i291_126", "header__inputSearch": "_header__input--search_5i291_126", "hidden": "_hidden_5i291_135", "header__input--regexp": "_header__input--regexp_5i291_138", "header__inputRegexp": "_header__input--regexp_5i291_138" };
  var header_module_default = classes;

  // src/components/Search.tsx
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var GallerySearch = () => {
    const [reg, setReg] = (0, import_react3.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
      className: header_module_default["search"],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", {
          className: header_module_default["header__span--search"],
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SvgSearch, {})
        }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", {
          className: header_module_default["header__input--search"],
          onKeyDown: (e2) => {
            if (e2.key === "Enter") {
              if (!currentOperator.op) {
                return false;
              }
              currentOperator.op.reg = reg;
              window.location.href = setSearchParams(
                window.location.href.includes("#/reader") ? "#/reader" : "#/gallery",
                {
                  search: e2.target.value,
                  regexp: reg ? "true" : "",
                  mode: currentOperator.op.getMode()
                }
              );
              e2.target.value = "";
            }
          }
        }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", {
          className: header_module_default["header__input--regexp"],
          id: "regexp",
          type: "checkbox"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", {
          className: header_module_default["header__label--regexp"],
          htmlFor: "regexp",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", {
            className: header_module_default["header__span--regexp"],
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SvgRegexp, {
              onClick: () => {
                reg ? setReg(false) : setReg(true);
              }
            })
          })
        })
      ]
    });
  };

  // src/components/Header.tsx
  var import_jsx_runtime5 = __toESM(require_jsx_runtime());
  var { ipcRenderer } = window.require("electron");
  var WindowButtons = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, {
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
        className: header_module_default["header-btn"],
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", {
            id: header_module_default["console"],
            onClick: () => {
              ipcRenderer.send("console");
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SvgConsole, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", {
            id: header_module_default["minimize"],
            onClick: () => {
              ipcRenderer.send("min");
            }
          }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", {
            id: header_module_default["maximize"],
            onClick: () => {
              ipcRenderer.send("hide");
            }
          }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", {
            id: header_module_default["close"],
            onClick: () => {
              ipcRenderer.send("close");
              mysqlOperator.end();
            }
          })
        ]
      })
    });
  };
  var Header = () => {
    const [title, setTitle] = (0, import_react4.useState)("Integration");
    const galleryOperator2 = (0, import_react4.useRef)(GalleryOperator.getInstance()).current;
    const readerOperator2 = (0, import_react4.useRef)(ReaderOperator.getInstance()).current;
    const handleKeyDown = (0, import_react4.useCallback)((e2) => {
      if (e2.ctrlKey) {
        let page = Number(
          /page=([0-9]+)/.exec(window.location.href)?.[1] ?? "1"
        );
        if (e2.key === "e") {
          window.location.href = window.location.href.replace(
            /page=\d+/,
            "page=" + (page + 1)
          );
        } else if (e2.key === "q") {
          if (page > 1) {
            window.location.href = window.location.href.replace(
              /page=\d+/,
              "page=" + (page - 1)
            );
          }
        } else if (e2.key === "a") {
          document.querySelectorAll("input.img__checkbox").forEach((e3) => e3.click());
        }
      }
    }, []);
    (0, import_react4.useEffect)(() => {
      galleryOperator2.register(setTitle, true);
      readerOperator2.register(setTitle, true);
    }, [galleryOperator2]);
    (0, import_react4.useEffect)(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleKeyDown]);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("header", {
      className: header_module_default["header"],
      id: "header",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(WindowButtons, {}),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {
          className: header_module_default["app-title"],
          title,
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(GallerySearch, {})
      ]
    });
  };

  // src/reportWebVitals.ts
  var reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      Promise.resolve().then(() => (init_web_vitals(), web_vitals_exports)).then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };
  var reportWebVitals_default = reportWebVitals;

  // src/Router.tsx
  var import_react27 = __toESM(require_react());

  // node_modules/react-router-dom/index.js
  var import_react6 = __toESM(require_react());

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  // node_modules/history/index.js
  var Action;
  (function(Action2) {
    Action2["Pop"] = "POP";
    Action2["Push"] = "PUSH";
    Action2["Replace"] = "REPLACE";
  })(Action || (Action = {}));
  var readOnly = false ? function(obj) {
    return Object.freeze(obj);
  } : function(obj) {
    return obj;
  };
  var BeforeUnloadEventType = "beforeunload";
  var HashChangeEventType = "hashchange";
  var PopStateEventType = "popstate";
  function createHashHistory(options) {
    if (options === void 0) {
      options = {};
    }
    var _options2 = options, _options2$window = _options2.window, window2 = _options2$window === void 0 ? document.defaultView : _options2$window;
    var globalHistory = window2.history;
    function getIndexAndLocation() {
      var _parsePath = parsePath(window2.location.hash.substr(1)), _parsePath$pathname = _parsePath.pathname, pathname = _parsePath$pathname === void 0 ? "/" : _parsePath$pathname, _parsePath$search = _parsePath.search, search = _parsePath$search === void 0 ? "" : _parsePath$search, _parsePath$hash = _parsePath.hash, hash2 = _parsePath$hash === void 0 ? "" : _parsePath$hash;
      var state = globalHistory.state || {};
      return [state.idx, readOnly({
        pathname,
        search,
        hash: hash2,
        state: state.usr || null,
        key: state.key || "default"
      })];
    }
    var blockedPopTx = null;
    function handlePop() {
      if (blockedPopTx) {
        blockers.call(blockedPopTx);
        blockedPopTx = null;
      } else {
        var nextAction = Action.Pop;
        var _getIndexAndLocation4 = getIndexAndLocation(), nextIndex = _getIndexAndLocation4[0], nextLocation = _getIndexAndLocation4[1];
        if (blockers.length) {
          if (nextIndex != null) {
            var delta = index2 - nextIndex;
            if (delta) {
              blockedPopTx = {
                action: nextAction,
                location: nextLocation,
                retry: function retry() {
                  go(delta * -1);
                }
              };
              go(delta);
            }
          } else {
            false ? warning(
              false,
              "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation."
            ) : void 0;
          }
        } else {
          applyTx(nextAction);
        }
      }
    }
    window2.addEventListener(PopStateEventType, handlePop);
    window2.addEventListener(HashChangeEventType, function() {
      var _getIndexAndLocation5 = getIndexAndLocation(), nextLocation = _getIndexAndLocation5[1];
      if (createPath(nextLocation) !== createPath(location)) {
        handlePop();
      }
    });
    var action = Action.Pop;
    var _getIndexAndLocation6 = getIndexAndLocation(), index2 = _getIndexAndLocation6[0], location = _getIndexAndLocation6[1];
    var listeners = createEvents();
    var blockers = createEvents();
    if (index2 == null) {
      index2 = 0;
      globalHistory.replaceState(_extends({}, globalHistory.state, {
        idx: index2
      }), "");
    }
    function getBaseHref() {
      var base = document.querySelector("base");
      var href = "";
      if (base && base.getAttribute("href")) {
        var url = window2.location.href;
        var hashIndex = url.indexOf("#");
        href = hashIndex === -1 ? url : url.slice(0, hashIndex);
      }
      return href;
    }
    function createHref(to) {
      return getBaseHref() + "#" + (typeof to === "string" ? to : createPath(to));
    }
    function getNextLocation(to, state) {
      if (state === void 0) {
        state = null;
      }
      return readOnly(_extends({
        pathname: location.pathname,
        hash: "",
        search: ""
      }, typeof to === "string" ? parsePath(to) : to, {
        state,
        key: createKey()
      }));
    }
    function getHistoryStateAndUrl(nextLocation, index3) {
      return [{
        usr: nextLocation.state,
        key: nextLocation.key,
        idx: index3
      }, createHref(nextLocation)];
    }
    function allowTx(action2, location2, retry) {
      return !blockers.length || (blockers.call({
        action: action2,
        location: location2,
        retry
      }), false);
    }
    function applyTx(nextAction) {
      action = nextAction;
      var _getIndexAndLocation7 = getIndexAndLocation();
      index2 = _getIndexAndLocation7[0];
      location = _getIndexAndLocation7[1];
      listeners.call({
        action,
        location
      });
    }
    function push(to, state) {
      var nextAction = Action.Push;
      var nextLocation = getNextLocation(to, state);
      function retry() {
        push(to, state);
      }
      false ? warning(nextLocation.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")") : void 0;
      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr3 = getHistoryStateAndUrl(nextLocation, index2 + 1), historyState = _getHistoryStateAndUr3[0], url = _getHistoryStateAndUr3[1];
        try {
          globalHistory.pushState(historyState, "", url);
        } catch (error) {
          window2.location.assign(url);
        }
        applyTx(nextAction);
      }
    }
    function replace(to, state) {
      var nextAction = Action.Replace;
      var nextLocation = getNextLocation(to, state);
      function retry() {
        replace(to, state);
      }
      false ? warning(nextLocation.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(to) + ")") : void 0;
      if (allowTx(nextAction, nextLocation, retry)) {
        var _getHistoryStateAndUr4 = getHistoryStateAndUrl(nextLocation, index2), historyState = _getHistoryStateAndUr4[0], url = _getHistoryStateAndUr4[1];
        globalHistory.replaceState(historyState, "", url);
        applyTx(nextAction);
      }
    }
    function go(delta) {
      globalHistory.go(delta);
    }
    var history = {
      get action() {
        return action;
      },
      get location() {
        return location;
      },
      createHref,
      push,
      replace,
      go,
      back: function back() {
        go(-1);
      },
      forward: function forward() {
        go(1);
      },
      listen: function listen(listener) {
        return listeners.push(listener);
      },
      block: function block(blocker) {
        var unblock = blockers.push(blocker);
        if (blockers.length === 1) {
          window2.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
        return function() {
          unblock();
          if (!blockers.length) {
            window2.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
          }
        };
      }
    };
    return history;
  }
  function promptBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = "";
  }
  function createEvents() {
    var handlers = [];
    return {
      get length() {
        return handlers.length;
      },
      push: function push(fn) {
        handlers.push(fn);
        return function() {
          handlers = handlers.filter(function(handler2) {
            return handler2 !== fn;
          });
        };
      },
      call: function call(arg) {
        handlers.forEach(function(fn) {
          return fn && fn(arg);
        });
      }
    };
  }
  function createKey() {
    return Math.random().toString(36).substr(2, 8);
  }
  function createPath(_ref) {
    var _ref$pathname = _ref.pathname, pathname = _ref$pathname === void 0 ? "/" : _ref$pathname, _ref$search = _ref.search, search = _ref$search === void 0 ? "" : _ref$search, _ref$hash = _ref.hash, hash2 = _ref$hash === void 0 ? "" : _ref$hash;
    if (search && search !== "?")
      pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash2 && hash2 !== "#")
      pathname += hash2.charAt(0) === "#" ? hash2 : "#" + hash2;
    return pathname;
  }
  function parsePath(path4) {
    var parsedPath = {};
    if (path4) {
      var hashIndex = path4.indexOf("#");
      if (hashIndex >= 0) {
        parsedPath.hash = path4.substr(hashIndex);
        path4 = path4.substr(0, hashIndex);
      }
      var searchIndex = path4.indexOf("?");
      if (searchIndex >= 0) {
        parsedPath.search = path4.substr(searchIndex);
        path4 = path4.substr(0, searchIndex);
      }
      if (path4) {
        parsedPath.pathname = path4;
      }
    }
    return parsedPath;
  }

  // node_modules/react-router/index.js
  var import_react5 = __toESM(require_react());
  function invariant2(cond, message) {
    if (!cond)
      throw new Error(message);
  }
  var NavigationContext = /* @__PURE__ */ (0, import_react5.createContext)(null);
  if (false) {
    NavigationContext.displayName = "Navigation";
  }
  var LocationContext = /* @__PURE__ */ (0, import_react5.createContext)(null);
  if (false) {
    LocationContext.displayName = "Location";
  }
  var RouteContext = /* @__PURE__ */ (0, import_react5.createContext)({
    outlet: null,
    matches: []
  });
  if (false) {
    RouteContext.displayName = "Route";
  }
  function Route(_props) {
    false ? invariant2(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : invariant2(false);
  }
  function Router(_ref3) {
    let {
      basename: basenameProp = "/",
      children = null,
      location: locationProp,
      navigationType = Action.Pop,
      navigator: navigator2,
      static: staticProp = false
    } = _ref3;
    !!useInRouterContext() ? false ? invariant2(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant2(false) : void 0;
    let basename = normalizePathname(basenameProp);
    let navigationContext = (0, import_react5.useMemo)(() => ({
      basename,
      navigator: navigator2,
      static: staticProp
    }), [basename, navigator2, staticProp]);
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
    let {
      pathname = "/",
      search = "",
      hash: hash2 = "",
      state = null,
      key = "default"
    } = locationProp;
    let location = (0, import_react5.useMemo)(() => {
      let trailingPathname = stripBasename(pathname, basename);
      if (trailingPathname == null) {
        return null;
      }
      return {
        pathname: trailingPathname,
        search,
        hash: hash2,
        state,
        key
      };
    }, [basename, pathname, search, hash2, state, key]);
    false ? warning(location != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash2 + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
    if (location == null) {
      return null;
    }
    return /* @__PURE__ */ (0, import_react5.createElement)(NavigationContext.Provider, {
      value: navigationContext
    }, /* @__PURE__ */ (0, import_react5.createElement)(LocationContext.Provider, {
      children,
      value: {
        location,
        navigationType
      }
    }));
  }
  function Routes(_ref4) {
    let {
      children,
      location
    } = _ref4;
    return useRoutes(createRoutesFromChildren(children), location);
  }
  function useInRouterContext() {
    return (0, import_react5.useContext)(LocationContext) != null;
  }
  function useLocation() {
    !useInRouterContext() ? false ? invariant2(
      false,
      "useLocation() may be used only in the context of a <Router> component."
    ) : invariant2(false) : void 0;
    return (0, import_react5.useContext)(LocationContext).location;
  }
  function useNavigate() {
    !useInRouterContext() ? false ? invariant2(
      false,
      "useNavigate() may be used only in the context of a <Router> component."
    ) : invariant2(false) : void 0;
    let {
      basename,
      navigator: navigator2
    } = (0, import_react5.useContext)(NavigationContext);
    let {
      matches
    } = (0, import_react5.useContext)(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
    let activeRef = (0, import_react5.useRef)(false);
    (0, import_react5.useEffect)(() => {
      activeRef.current = true;
    });
    let navigate = (0, import_react5.useCallback)(function(to, options) {
      if (options === void 0) {
        options = {};
      }
      false ? warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered.") : void 0;
      if (!activeRef.current)
        return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path4 = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
      if (basename !== "/") {
        path4.pathname = joinPaths([basename, path4.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(path4, options.state);
    }, [basename, navigator2, routePathnamesJson, locationPathname]);
    return navigate;
  }
  function useParams() {
    let {
      matches
    } = (0, import_react5.useContext)(RouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
  }
  function useRoutes(routes, locationArg) {
    !useInRouterContext() ? false ? invariant2(
      false,
      "useRoutes() may be used only in the context of a <Router> component."
    ) : invariant2(false) : void 0;
    let {
      matches: parentMatches
    } = (0, import_react5.useContext)(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;
    if (false) {
      let parentPath = parentRoute && parentRoute.path || "";
      warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
    }
    let locationFromContext = useLocation();
    let location;
    if (locationArg) {
      var _parsedLocationArg$pa;
      let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? false ? invariant2(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : invariant2(false) : void 0;
      location = parsedLocationArg;
    } else {
      location = locationFromContext;
    }
    let pathname = location.pathname || "/";
    let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
    let matches = matchRoutes(routes, {
      pathname: remainingPathname
    });
    if (false) {
      false ? warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ') : void 0;
      false ? warning(matches == null || matches[matches.length - 1].route.element !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.') : void 0;
    }
    return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: joinPaths([parentPathnameBase, match.pathname]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
    })), parentMatches);
  }
  function createRoutesFromChildren(children) {
    let routes = [];
    import_react5.Children.forEach(children, (element) => {
      if (!/* @__PURE__ */ (0, import_react5.isValidElement)(element)) {
        return;
      }
      if (element.type === import_react5.Fragment) {
        routes.push.apply(routes, createRoutesFromChildren(element.props.children));
        return;
      }
      !(element.type === Route) ? false ? invariant2(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : invariant2(false) : void 0;
      let route = {
        caseSensitive: element.props.caseSensitive,
        element: element.props.element,
        index: element.props.index,
        path: element.props.path
      };
      if (element.props.children) {
        route.children = createRoutesFromChildren(element.props.children);
      }
      routes.push(route);
    });
    return routes;
  }
  function matchRoutes(routes, locationArg, basename) {
    if (basename === void 0) {
      basename = "/";
    }
    let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);
    if (pathname == null) {
      return null;
    }
    let branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    let matches = null;
    for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
      matches = matchRouteBranch(branches[i2], pathname);
    }
    return matches;
  }
  function flattenRoutes(routes, branches, parentsMeta, parentPath) {
    if (branches === void 0) {
      branches = [];
    }
    if (parentsMeta === void 0) {
      parentsMeta = [];
    }
    if (parentPath === void 0) {
      parentPath = "";
    }
    routes.forEach((route, index2) => {
      let meta = {
        relativePath: route.path || "",
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index2,
        route
      };
      if (meta.relativePath.startsWith("/")) {
        !meta.relativePath.startsWith(parentPath) ? false ? invariant2(false, 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.") : invariant2(false) : void 0;
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }
      let path4 = joinPaths([parentPath, meta.relativePath]);
      let routesMeta = parentsMeta.concat(meta);
      if (route.children && route.children.length > 0) {
        !(route.index !== true) ? false ? invariant2(false, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path4 + '".')) : invariant2(false) : void 0;
        flattenRoutes(route.children, branches, routesMeta, path4);
      }
      if (route.path == null && !route.index) {
        return;
      }
      branches.push({
        path: path4,
        score: computeScore(path4, route.index),
        routesMeta
      });
    });
    return branches;
  }
  function rankRouteBranches(branches) {
    branches.sort((a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
  }
  var paramRe = /^:\w+$/;
  var dynamicSegmentValue = 3;
  var indexRouteValue = 2;
  var emptySegmentValue = 1;
  var staticSegmentValue = 10;
  var splatPenalty = -2;
  var isSplat = (s2) => s2 === "*";
  function computeScore(path4, index2) {
    let segments = path4.split("/");
    let initialScore = segments.length;
    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }
    if (index2) {
      initialScore += indexRouteValue;
    }
    return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
  }
  function compareIndexes(a2, b2) {
    let siblings = a2.length === b2.length && a2.slice(0, -1).every((n2, i2) => n2 === b2[i2]);
    return siblings ? a2[a2.length - 1] - b2[b2.length - 1] : 0;
  }
  function matchRouteBranch(branch, pathname) {
    let {
      routesMeta
    } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];
    for (let i2 = 0; i2 < routesMeta.length; ++i2) {
      let meta = routesMeta[i2];
      let end = i2 === routesMeta.length - 1;
      let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end
      }, remainingPathname);
      if (!match)
        return null;
      Object.assign(matchedParams, match.params);
      let route = meta.route;
      matches.push({
        params: matchedParams,
        pathname: joinPaths([matchedPathname, match.pathname]),
        pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
        route
      });
      if (match.pathnameBase !== "/") {
        matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
      }
    }
    return matches;
  }
  function _renderMatches(matches, parentMatches) {
    if (parentMatches === void 0) {
      parentMatches = [];
    }
    if (matches == null)
      return null;
    return matches.reduceRight((outlet, match, index2) => {
      return /* @__PURE__ */ (0, import_react5.createElement)(RouteContext.Provider, {
        children: match.route.element !== void 0 ? match.route.element : outlet,
        value: {
          outlet,
          matches: parentMatches.concat(matches.slice(0, index2 + 1))
        }
      });
    }, null);
  }
  function matchPath(pattern, pathname) {
    if (typeof pattern === "string") {
      pattern = {
        path: pattern,
        caseSensitive: false,
        end: true
      };
    }
    let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
    let match = pathname.match(matcher);
    if (!match)
      return null;
    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params = paramNames.reduce((memo, paramName, index2) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index2] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      memo[paramName] = safelyDecodeURIComponent(captureGroups[index2] || "", paramName);
      return memo;
    }, {});
    return {
      params,
      pathname: matchedPathname,
      pathnameBase,
      pattern
    };
  }
  function compilePath(path4, caseSensitive, end) {
    if (caseSensitive === void 0) {
      caseSensitive = false;
    }
    if (end === void 0) {
      end = true;
    }
    false ? warning(path4 === "*" || !path4.endsWith("*") || path4.endsWith("/*"), 'Route path "' + path4 + '" will be treated as if it were ' + ('"' + path4.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path4.replace(/\*$/, "/*") + '".')) : void 0;
    let paramNames = [];
    let regexpSource = "^" + path4.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^\\/]+)";
    });
    if (path4.endsWith("*")) {
      paramNames.push("*");
      regexpSource += path4 === "*" || path4 === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
    } else {
      regexpSource += end ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
    }
    let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
    return [matcher, paramNames];
  }
  function safelyDecodeURIComponent(value, paramName) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      false ? warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")) : void 0;
      return value;
    }
  }
  function resolvePath(to, fromPathname) {
    if (fromPathname === void 0) {
      fromPathname = "/";
    }
    let {
      pathname: toPathname,
      search = "",
      hash: hash2 = ""
    } = typeof to === "string" ? parsePath(to) : to;
    let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash2)
    };
  }
  function resolvePathname(relativePath, fromPathname) {
    let segments = fromPathname.replace(/\/+$/, "").split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach((segment) => {
      if (segment === "..") {
        if (segments.length > 1)
          segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }
  function resolveTo(toArg, routePathnames, locationPathname) {
    let to = typeof toArg === "string" ? parsePath(toArg) : toArg;
    let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
    let from;
    if (toPathname == null) {
      from = locationPathname;
    } else {
      let routePathnameIndex = routePathnames.length - 1;
      if (toPathname.startsWith("..")) {
        let toSegments = toPathname.split("/");
        while (toSegments[0] === "..") {
          toSegments.shift();
          routePathnameIndex -= 1;
        }
        to.pathname = toSegments.join("/");
      }
      from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
    }
    let path4 = resolvePath(to, from);
    if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path4.pathname.endsWith("/")) {
      path4.pathname += "/";
    }
    return path4;
  }
  function stripBasename(pathname, basename) {
    if (basename === "/")
      return pathname;
    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }
    let nextChar = pathname.charAt(basename.length);
    if (nextChar && nextChar !== "/") {
      return null;
    }
    return pathname.slice(basename.length) || "/";
  }
  var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
  var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
  var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  var normalizeHash = (hash2) => !hash2 || hash2 === "#" ? "" : hash2.startsWith("#") ? hash2 : "#" + hash2;

  // node_modules/react-router-dom/index.js
  function HashRouter(_ref2) {
    let {
      basename,
      children,
      window: window2
    } = _ref2;
    let historyRef = (0, import_react6.useRef)();
    if (historyRef.current == null) {
      historyRef.current = createHashHistory({
        window: window2
      });
    }
    let history = historyRef.current;
    let [state, setState] = (0, import_react6.useState)({
      action: history.action,
      location: history.location
    });
    (0, import_react6.useLayoutEffect)(() => history.listen(setState), [history]);
    return /* @__PURE__ */ (0, import_react6.createElement)(Router, {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }
  if (false) {
    HistoryRouter.displayName = "unstable_HistoryRouter";
  }
  if (false) {
    Link.displayName = "Link";
  }
  if (false) {
    NavLink.displayName = "NavLink";
  }
  function useSearchParams(defaultInit) {
    false ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.") : void 0;
    let defaultSearchParamsRef = (0, import_react6.useRef)(createSearchParams(defaultInit));
    let location = useLocation();
    let searchParams = (0, import_react6.useMemo)(() => {
      let searchParams2 = createSearchParams(location.search);
      for (let key of defaultSearchParamsRef.current.keys()) {
        if (!searchParams2.has(key)) {
          defaultSearchParamsRef.current.getAll(key).forEach((value) => {
            searchParams2.append(key, value);
          });
        }
      }
      return searchParams2;
    }, [location.search]);
    let navigate = useNavigate();
    let setSearchParams2 = (0, import_react6.useCallback)((nextInit, navigateOptions) => {
      navigate("?" + createSearchParams(nextInit), navigateOptions);
    }, [navigate]);
    return [searchParams, setSearchParams2];
  }
  function createSearchParams(init) {
    if (init === void 0) {
      init = "";
    }
    return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
      let value = init[key];
      return memo.concat(Array.isArray(value) ? value.map((v2) => [key, v2]) : [[key, value]]);
    }, []));
  }

  // src/components/Gallery/detail/PackDetail.tsx
  var import_react13 = __toESM(require_react());

  // src/icon/back.svg
  var React4 = __toESM(require_react());
  var import_jsx_runtime6 = __toESM(require_jsx_runtime());
  var SvgBack = (props) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", {
      d: "M11.44,2A10,10,0,0,0,4.56,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.06a1,1,0,0,0,0-2H5.66A8,8,0,1,1,11.44,20a1,1,0,1,0,0,2,10,10,0,1,0,0-20Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2h-1V9A1,1,0,0,0,11.44,8Z"
    })
  });

  // src/icon/home.svg
  var React5 = __toESM(require_react());
  var import_jsx_runtime7 = __toESM(require_jsx_runtime());
  var SvgHome = (props) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", {
      d: "M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z"
    })
  });

  // src/components/Menu.tsx
  var import_react8 = __toESM(require_react());

  // src/components/Gallery/Buttons.tsx
  var import_react7 = __toESM(require_react());

  // src/crawler/stream/req.ts
  var request = window.require("request");
  var _Req = class {
    constructor() {
    }
    static get(targetURL, options) {
      let netOptions = options ?? _Req.options;
      return new Promise((resolve, reject) => {
        let { url, ...data } = typeof targetURL === "string" ? { url: targetURL } : targetURL;
        if (url.length === 0) {
          resolve("");
          return;
        }
        request.get(
          { url, ...netOptions },
          (err, res, body) => {
            if (res?.statusCode !== 200) {
              console.log(url);
            }
            if (err) {
              reject(err);
            } else {
              resolve({ body, ...data });
            }
          }
        );
      });
    }
  };
  var Req = _Req;
  __publicField(Req, "options", null);

  // src/crawler/types/StreamEntry.ts
  var StreamEntry = class {
    pool = [];
    parser = null;
    connection;
  };

  // src/crawler/stream/exit.ts
  var Exit = class extends StreamEntry {
    endProcessor;
    closeFunction = null;
    awaitedQueue = [];
    destroyFlag = false;
    id = null;
    constructor(endProcessor, options) {
      super();
      this.endProcessor = endProcessor;
      if (options?.interval) {
        this.id = setInterval(() => {
          if (this.awaitedQueue.length === 0 && this.destroyFlag) {
            clearInterval(this.id);
            this.connection = null;
            this.closeFunction?.();
            return;
          }
          if (this.awaitedQueue.length === 0)
            return;
          let data = this.awaitedQueue.shift();
          if (!data)
            return;
          this.endProcessor(data);
        }, options.interval);
      }
    }
    extract() {
      if (!this.connection) {
        return;
      }
      let { value, done } = this.connection?.next() || { value: null, done: true };
      if (done) {
        this.destroy();
        if (!this.id) {
          this.closeFunction?.();
        }
        return;
      }
      if (this.id) {
        this.awaitedQueue.push(value);
      } else {
        this.endProcessor(value);
      }
    }
    destroy() {
      this.destroyFlag = true;
      this.connection = null;
    }
    close(closeFunction) {
      this.closeFunction = closeFunction;
    }
  };

  // src/crawler/stream/stream.ts
  var isString = (v2) => {
    return typeof v2 === "string";
  };
  var Stream = class extends StreamEntry {
    pool = [];
    name = "";
    id = null;
    awaitedQueue = [];
    pendingQueue = [];
    option = null;
    netOptions = null;
    prevPipeClosed = false;
    status = {
      open: true,
      name: () => {
        return this.name;
      },
      queue: this.awaitedQueue,
      clear: () => {
        if (this.id) {
          clearInterval(this.id);
        }
      },
      get len() {
        return this.queue.length;
      }
    };
    pipe = function* (pool, status) {
      while (true) {
        if (!status.open && pool.length === 0 && status.len === 0) {
          console.log(status.name() + " is empty");
          return;
        }
        let el = pool.shift();
        yield el;
      }
    }(this.pool, this.status);
    preprocessor = null;
    constructor(parser, options, inType) {
      super();
      this.parser = parser ?? null;
      this.connection = null;
      this.pipe.target = null;
      this.option = options;
      if (options?.interval) {
        this.id = setInterval(() => {
          if (this.prevPipeClosed && this.awaitedQueue.length === 0) {
            this.readyToClose();
            return;
          }
          if (this.awaitedQueue.length === 0) {
            return;
          }
          let data = this.awaitedQueue.shift();
          if (!data) {
            return;
          }
          this.get(data);
        }, options.interval);
      }
    }
    setParser(parser) {
      this.parser = parser;
    }
    setPreprocessor(preprocessor) {
      this.preprocessor = preprocessor;
    }
    setNetOptions(options) {
      this.netOptions = options;
      return this;
    }
    setOption(option) {
      this.option = option;
    }
    next(nextStream, option) {
      if (!(nextStream instanceof Stream)) {
        let n2 = new Stream(nextStream, option);
        this.pipe.target = n2;
        n2.connection = this.pipe;
        return n2;
      }
      this.pipe.target = nextStream;
      nextStream.connection = this.pipe;
      return nextStream;
    }
    extract() {
      let { value, done } = this.connection?.next() || { value: null, done: true };
      if (done) {
        this.connection = null;
        this.prevPipeClosed = true;
        if (!this.id) {
          this.readyToClose();
        }
        return;
      }
      if (typeof value === "never" && !this.preprocessor) {
        throw new Error("preprocessor is not defined");
      }
      let v2 = this.preprocessor ? this.preprocessor(value) : value;
      if (this.id) {
        this.awaitedQueue.push(v2);
      } else if (v2) {
        this.get(v2);
      }
    }
    get(url) {
      if (url instanceof Array) {
        url.forEach((url2) => {
          if (isString(url2)) {
            this.pending(Req.get({ url: url2 }, this.netOptions));
          } else {
            this.pending(Req.get(url2, this.netOptions));
          }
        });
      } else if (typeof url === "string") {
        this.pending(Req.get({ url }, this.netOptions));
      } else {
        this.pending(Req.get(url, this.netOptions));
      }
    }
    exec(url) {
      if (this.id) {
        if (Array.isArray(url)) {
          this.awaitedQueue.push(...url);
        } else {
          this.awaitedQueue.push(url);
        }
      } else {
        this.get(url);
        this.readyToClose();
      }
      return this;
    }
    inject(res) {
      let { body, ...data } = res;
      if (!this.parser) {
        throw Error("parser is not defined");
      }
      let result = this.parser(body, data);
      let count2 = 1;
      if (Array.isArray(result)) {
        this.push(...result);
        count2 = result.length;
        if (count2 === 0) {
          return;
        }
      } else {
        this.push(result);
      }
      for (let i2 = 0; i2 < count2; i2++) {
        this.pipe.target?.extract();
      }
    }
    pending(req) {
      let res = req.then((res2) => {
        if (res2.length === 0) {
          return;
        }
        this.inject(res2);
      }).catch((e2) => {
        console.log(e2);
      });
      this.pendingQueue.push(req);
    }
    async readyToClose() {
      Promise.allSettled(this.pendingQueue).then(() => {
        this.status.open = false;
        this.status.clear();
        this.pipe.target?.extract();
      }).catch((e2) => {
        console.log(this.name, e2.message);
      });
    }
    push(...data) {
      this.pool.push(...data);
    }
    async break() {
      if (this.pendingQueue.length === 0) {
        return [];
      }
      await this.readyToClose();
      return this.pool;
    }
    static create(parser, options, inType) {
      if (inType) {
        return new Stream(parser, options, inType);
      }
      return new Stream(parser, options);
    }
    output(endParser, options) {
      let exit = new Exit(endParser, options);
      this.pipe.target = exit;
      exit.connection = this.pipe;
      return exit;
    }
  };

  // src/crawler/stream/Circuit.ts
  var Circuit = class extends Stream {
    urlPool = [];
    urlParser;
    max = 0;
    count = 0;
    closed = false;
    constructor(urlParser, parser, options) {
      super(parser, options);
      this.max = options?.["max"] ?? 0;
      this.urlParser = urlParser;
    }
    collect(url) {
      this.pending(Req.get(url, this.netOptions));
      return this;
    }
    getNewUrl(body) {
      if (this.closed) {
        return;
      }
      if (this.max > 0 && this.count >= this.max) {
        this.readyToClose();
        this.closed = true;
        return;
      }
      ++this.count;
      let url = this.urlParser(body);
      if (!url || url.length === 0) {
        this.readyToClose();
        this.closed = true;
        return;
      }
      if (Array.isArray(url)) {
        this.urlPool.push(...url);
      } else {
        this.urlPool.push(url);
      }
      this.collect(this.urlPool.shift());
    }
    inject(res) {
      let { body, ...data } = res;
      if (!this.parser) {
        throw Error("parser is not defined");
      }
      let result = this.parser(body, data);
      let count2 = 1;
      if (Array.isArray(result)) {
        if (result.length === 0) {
          return;
        }
        count2 = result.length;
        this.push(...result);
      } else {
        this.push(result);
      }
      for (let i2 = 0; i2 < count2; i2++) {
        this.pipe.target?.extract();
      }
    }
    pending(req) {
      this.pendingQueue.push(req);
      req.then((res) => {
        this.inject(res);
        this.getNewUrl(res.body);
      });
    }
  };

  // src/crawler/utils/getImg.ts
  var fs6 = window.require("fs");
  var request2 = window.require("request");
  function getImg(img, deep = 0) {
    let filePath = "";
    if (img.path) {
      filePath = img.path;
    } else {
      filePath = downloadPath;
    }
    if (!fs6.existsSync(filePath + `\\${img.title}`)) {
      fs6.mkdirSync(filePath + `\\${img.title}`);
    }
    const proxy2 = proxyEnabled ? constant_default.proxy : void 0;
    try {
      request2({
        url: img.src,
        proxy: proxy2,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.36"
        },
        timeout: 10 * 1e3
      }).on("error", (err) => {
        if (deep >= 2) {
          console.error(err);
          console.log(img.title);
        } else {
          getImg(img, deep + 1);
        }
      }).pipe(
        fs6.createWriteStream(
          filePath + `\\${img.title}\\${img.id}.jpg`,
          {
            autoClose: true
          }
        ).on("error", (err) => {
          console.error(err);
          console.log(img.src);
        }).on("close", (err) => {
          if (err) {
            console.log("\u5199\u5165\u5931\u8D25", err);
          }
        })
      );
    } catch (error) {
      console.error(error);
      console.log(img + " download Error");
    }
  }

  // src/crawler/fa24.ts
  var mysql2 = window.require("mysql");
  var fs7 = window.require("fs");
  var cheerio = window.require("cheerio");
  var headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62"
  };
  var domain = domainOf24fa;
  var mode = "new";
  var missing = mode === "new" ? [] : JSON.parse(
    fs7.readFileSync(
      String.raw`D:\webDemo\desktop-reader\missingon`,
      "utf-8"
    )
  );
  var getNewPacks;
  var getImgFrom24fa = async () => {
    let connection = mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "GALLERY"
    });
    connection.connect();
    let catalog = await new Promise((resolve) => {
      connection.query(
        "select * from pack_list order by id desc limit 3000",
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let result = res.map(
              (item) => item
            );
            resolve(result);
          }
        }
      );
    });
    connection.end();
    let recentCatalog = catalog.map((e2) => e2.title);
    let newPacks = [];
    getNewPacks = new Circuit(
      (body) => {
        let $ = cheerio.load(body);
        let images = $('a[title^="\u540E\u9875"]');
        let result = [];
        images.each((i2, ele) => {
          let url = $(ele).attr("href");
          if (!url) {
            return;
          }
          result.push(domain + url);
        });
        return result;
      },
      (body) => {
        let $ = cheerio.load(body);
        let links = $("#dlNews a");
        let titles2 = $("#dlNews a img");
        let result = [];
        links.each((i2, ele) => {
          let title = $(titles2[i2]).attr("alt");
          if (!title) {
            return;
          }
          if (title.endsWith(".")) {
            title = title.substring(0, title.length - 1);
          }
          title = title.replace(/[\\/:*?"<>|]/g, "_");
          if (mode !== "new") {
            if (!missing.includes(title)) {
              return;
            }
          } else {
            if (recentCatalog.includes(title)) {
              return;
            }
            newPacks.push({
              title,
              stared: 0,
              path: downloadPath + "/" + title,
              cover: "/1.jpg"
            });
            console.log(title);
          }
          try {
            fs7.mkdirSync(downloadPath + "/" + title);
          } catch (e2) {
          }
          let href = $(ele).attr("href");
          if (!href) {
            return;
          }
          result.push({
            url: domain + href,
            title,
            current: domain + href
          });
        });
        return result;
      },
      { max: 1 }
    );
    Req.options = {
      proxy: proxyEnabled ? constant_default.proxy : void 0,
      headers
    };
    const pages = Stream.create(
      (body, data) => {
        let $ = cheerio.load(body);
        let res = $("div.pager a").slice(0, -1).map((i2, ele) => {
          let url = $(ele).attr("href");
          if (!url) {
            return;
          }
          return {
            url: domain + url,
            title: data.title,
            page: i2 + 2
          };
        }).toArray();
        return [{ url: data.current, page: 1, title: data.title }, ...res];
      },
      { interval: 1500 }
    );
    const imgs = Stream.create(
      (body, data) => {
        if (data.page === 1) {
          console.log(data.title + " has got");
        }
        let id = (data.page - 1) * 4 + 1;
        let $ = cheerio.load(body);
        let images = $("#content img");
        let result = [];
        images.each((i2, ele) => {
          let src = $(ele).attr("src");
          if (!src) {
            return;
          }
          src = domain + src;
          result.push({ src, id: id++, title: data.title });
        });
        return result;
      },
      { interval: 800 }
    );
    getNewPacks.name = "getNewPacks";
    pages.name = "pages";
    imgs.name = "img";
    return new Promise((resolve, reject) => {
      try {
        getNewPacks.collect(domain + "c49.aspx").next(pages).next(imgs).output(
          (img) => {
            getImg(img);
          },
          { interval: 200 }
        ).close(() => {
          console.log("end");
          if (mode === "new") {
            GalleryOperator.getInstance().addNewPack(newPacks).then(() => {
              resolve(true);
            });
          }
        });
      } catch (e2) {
        reject(false);
      }
    });
  };

  // src/icon/add.svg
  var React6 = __toESM(require_react());
  var import_jsx_runtime8 = __toESM(require_jsx_runtime());
  var SvgAdd = (props) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", {
      d: "M20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Zm-4-5H13V13a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0V16h1a1,1,0,0,0,0-2Z"
    })
  });

  // src/icon/bookmark.svg
  var React7 = __toESM(require_react());
  var import_jsx_runtime9 = __toESM(require_jsx_runtime());
  var SvgBookmark = (props) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", {
      d: "M18,2H6C5.4,2,5,2.4,5,3v18c0,0.2,0.1,0.5,0.2,0.6c0.4,0.4,1,0.5,1.4,0.1l5.3-4.5l5.3,4.4c0.2,0.2,0.4,0.3,0.7,0.3c0.6,0,1-0.4,1-1V3C19,2.4,18.6,2,18,2z"
    })
  });

  // src/icon/books.svg
  var React8 = __toESM(require_react());
  var import_jsx_runtime10 = __toESM(require_jsx_runtime());
  var SvgBooks = (props) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", {
      d: "M22.47,18.82l-1-3.86h0L18.32,3.37a1,1,0,0,0-1.22-.71l-3.87,1a1,1,0,0,0-.73-.33H2.5a1,1,0,0,0-1,1v16a1,1,0,0,0,1,1h10a1,1,0,0,0,1-1v-8l2.2,8.22a1,1,0,0,0,1,.74,1.15,1.15,0,0,0,.26,0l4.83-1.29a1,1,0,0,0,.61-.47A1.05,1.05,0,0,0,22.47,18.82Zm-16,.55h-3v-2h3Zm0-4h-3v-6h3Zm0-8h-3v-2h3Zm5,12h-3v-2h3Zm0-4h-3v-6h3Zm0-8h-3v-2h3Zm2.25-1.74,2.9-.78.52,1.93-2.9.78Zm2.59,9.66-1.55-5.8,2.9-.78,1.55,5.8Zm1,3.86-.52-1.93,2.9-.78.52,1.93Z"
    })
  });

  // src/icon/crawler.svg
  var React9 = __toESM(require_react());
  var import_jsx_runtime11 = __toESM(require_jsx_runtime());
  var SvgCrawler = (props) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "data-name": "Layer 1",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", {
      d: "M19,14h2a1,1,0,0,0,0-2H19V11a5.15,5.15,0,0,0-.21-1.36A5,5,0,0,0,22,5a1,1,0,0,0-2,0,3,3,0,0,1-2.14,2.87A5,5,0,0,0,16,6.4,2.58,2.58,0,0,0,16,6,4,4,0,0,0,8,6a2.58,2.58,0,0,0,0,.4,5,5,0,0,0-1.9,1.47A3,3,0,0,1,4,5,1,1,0,0,0,2,5,5,5,0,0,0,5.21,9.64,5.15,5.15,0,0,0,5,11v1H3a1,1,0,0,0,0,2H5v1a7,7,0,0,0,.14,1.38A5,5,0,0,0,2,21a1,1,0,0,0,2,0,3,3,0,0,1,1.81-2.74,7,7,0,0,0,12.38,0A3,3,0,0,1,20,21a1,1,0,0,0,2,0,5,5,0,0,0-3.14-4.62A7,7,0,0,0,19,15Zm-8,5.9A5,5,0,0,1,7,15V11a3,3,0,0,1,3-3h1ZM10,6a2,2,0,0,1,4,0Zm7,9a5,5,0,0,1-4,4.9V8h1a3,3,0,0,1,3,3Z"
    })
  });

  // src/icon/directory.svg
  var React10 = __toESM(require_react());
  var import_jsx_runtime12 = __toESM(require_jsx_runtime());
  var SvgDirectory = (props) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", {
      d: "M19,6h-6.3l-0.3-0.9C12,3.8,10.9,3,9.6,3H5C3.3,3,2,4.3,2,6v13c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V9C22,7.3,20.7,6,19,6z"
    })
  });

  // src/icon/folder-open.svg
  var React11 = __toESM(require_react());
  var import_jsx_runtime13 = __toESM(require_jsx_runtime());
  var SvgFolderOpen = (props) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "data-name": "Layer 1",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
      d: "M22.78,10.37A1,1,0,0,0,22,10H20V9a3,3,0,0,0-3-3H10.72l-.32-1A3,3,0,0,0,7.56,3H4A3,3,0,0,0,1,6V18a3,3,0,0,0,3,3H18.4a3,3,0,0,0,2.92-2.35L23,11.22A1,1,0,0,0,22.78,10.37ZM5.37,18.22a1,1,0,0,1-1,.78H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H7.56a1,1,0,0,1,1,.68l.54,1.64A1,1,0,0,0,10,8h7a1,1,0,0,1,1,1v1H8a1,1,0,0,0-1,.78Zm14,0a1,1,0,0,1-1,.78H7.21a1.42,1.42,0,0,0,.11-.35L8.8,12h12Z"
    })
  });

  // src/icon/homepage.svg
  var React12 = __toESM(require_react());
  var import_jsx_runtime14 = __toESM(require_jsx_runtime());
  var SvgHomepage = (props) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", {
      d: "M21.7,10l-9-8c-0.4-0.3-0.9-0.3-1.3,0l-9,8c-0.4,0.4-0.5,1-0.1,1.4c0.2,0.2,0.5,0.3,0.7,0.3h1v9c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-9h1c0.6,0,1-0.4,1-1C22,10.4,21.9,10.2,21.7,10z M15,19.7H9v-3c0-1.7,1.3-3,3-3s3,1.3,3,3V19.7z"
    })
  });

  // src/icon/refresh.svg
  var React13 = __toESM(require_react());
  var import_jsx_runtime15 = __toESM(require_jsx_runtime());
  var SvgRefresh = (props) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", {
      d: "M19.91,15.51H15.38a1,1,0,0,0,0,2h2.4A8,8,0,0,1,4,12a1,1,0,0,0-2,0,10,10,0,0,0,16.88,7.23V21a1,1,0,0,0,2,0V16.5A1,1,0,0,0,19.91,15.51ZM15,12a3,3,0,1,0-3,3A3,3,0,0,0,15,12Zm-4,0a1,1,0,1,1,1,1A1,1,0,0,1,11,12ZM12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1h4.5a1,1,0,0,0,0-2H6.22A8,8,0,0,1,20,12a1,1,0,0,0,2,0A10,10,0,0,0,12,2Z"
    })
  });

  // src/icon/rename.svg
  var React14 = __toESM(require_react());
  var import_jsx_runtime16 = __toESM(require_jsx_runtime());
  var SvgRename = (props) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("svg", {
    t: 1652714140620,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 1717,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("path", {
        d: "M290.27 614.65l-12.19 122.39c-0.81 8.04 5.06 15.21 13.09 16.02 0.51 0.05 1.02 0.08 1.54 0.07l121.91-12.68a13.16 13.16 0 0 0 9.26-3.9L834.95 324.5S706.22 193.33 706.21 193.33L294.66 605.87c-2.4 2.36-3.94 5.45-4.39 8.78zM949.52 159.18l-0.46-0.46-78.02-78.51a36.582 36.582 0 0 0-26.82-10.73 36.039 36.039 0 0 0-25.84 10.73l-71.68 74.61 130.68 130.2 71.68-74.12c14.41-14.16 14.61-37.31 0.46-51.72z",
        "p-id": 1718
      }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("path", {
        d: "M875.43 488.36c-26.93 0-48.76 21.83-48.76 48.76V857H161.54V232.35h335.98c26.93 0 48.76-21.83 48.76-48.76s-21.83-48.77-48.76-48.77H156.18c-0.49 0-0.98 0-1.47 0.01-50.9 0.81-91.5 42.72-90.69 93.61v633.92c0 50.9 41.26 92.16 92.16 92.16h676.34c50.52-0.27 91.41-41.16 91.68-91.67V537.12c-0.01-26.93-21.84-48.76-48.77-48.76z",
        "p-id": 1719
      })
    ]
  });

  // src/icon/select.svg
  var React15 = __toESM(require_react());
  var import_jsx_runtime17 = __toESM(require_jsx_runtime());
  var SvgSelect = (props) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", {
      d: "M14,12.5H13v-1a1,1,0,0,0-2,0v1H10a1,1,0,0,0,0,2h1v1a1,1,0,0,0,2,0v-1h1a1,1,0,0,0,0-2Zm5-7H12.72l-.32-1a3,3,0,0,0-2.84-2H5a3,3,0,0,0-3,3v13a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V8.5A3,3,0,0,0,19,5.5Zm1,13a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5.5a1,1,0,0,1,1-1H9.56a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,12,7.5h7a1,1,0,0,1,1,1Z"
    })
  });

  // src/icon/setting.svg
  var React16 = __toESM(require_react());
  var import_jsx_runtime18 = __toESM(require_jsx_runtime());
  var SvgSetting = (props) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", {
      d: "M7,6H6V3A1,1,0,0,0,4,3V6H3A1,1,0,0,0,3,8H7A1,1,0,0,0,7,6ZM5,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,5,10Zm7,8a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm9-8H20V3a1,1,0,0,0-2,0v7H17a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-2,4a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V15A1,1,0,0,0,19,14Zm-5,0H13V3a1,1,0,0,0-2,0V14H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"
    })
  });

  // src/icon/stared.svg
  var React17 = __toESM(require_react());
  var import_jsx_runtime19 = __toESM(require_jsx_runtime());
  var SvgStared = (props) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", {
      d: "M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"
    })
  });

  // src/icon/trash.svg
  var React18 = __toESM(require_react());
  var import_jsx_runtime20 = __toESM(require_jsx_runtime());
  var SvgTrash = (props) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", {
      d: "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
    })
  });

  // src/components/Gallery/Buttons.tsx
  var import_jsx_runtime21 = __toESM(require_jsx_runtime());
  var HomePage = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-homepage icon" + (props.activeMode === props.currentMode ? " activeMode" : ""),
      onClick: () => {
        window.location.href = "#/" + props.type;
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgHomepage, {})
    });
  };
  var Back = (props) => {
    const navigate = useNavigate();
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-back icon",
      onClick: () => {
        if (props.inSelect) {
          props.setInSelect(0);
          return;
        }
        navigate(-1);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgBack, {})
    });
  };
  var Stared = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-stared icon" + (props.activeMode === props.currentMode ? " activeMode" : ""),
      onClick: () => {
        window.location.href = "#/" + props.type + "?stared=true&page=1";
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgStared, {})
    });
  };
  var Add = (props) => {
    const [visible, setVisible] = useController(fileDropVisibleStore);
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_jsx_runtime21.Fragment, {
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
        className: "btn-add icon",
        onClick: () => {
          setVisible((v2) => !v2);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgAdd, {})
      })
    });
  };
  var BookmarkBtn = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-bookmark icon" + (props.activeMode === props.currentMode ? " activeMode" : ""),
      onClick: () => {
        window.location.href = "#/" + props.type + "?bookmark=true&page=1";
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgBookmark, {})
    });
  };
  var Refresh = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-refresh icon",
      onClick: () => {
        props.util.refresh();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgRefresh, {})
    });
  };
  var SelectPacks = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-newDir icon",
      onClick: props.handleClick,
      style: { display: props.inSelect ? "initial" : "none" },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgSelect, {})
    });
  };
  var ShowDir = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-showDir icon" + (props.activeMode === props.currentMode ? " activeMode" : ""),
      onClick: () => {
        window.location.href = "#/" + props.type + "?show_dir=true&page=1";
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgDirectory, {})
    });
  };
  var CrawlerBtn = (props) => {
    const [active, setActive] = (0, import_react7.useState)(false);
    const [err, setErr] = (0, import_react7.useState)(false);
    (0, import_react7.useEffect)(() => {
      if (active) {
        getImgFrom24fa().then((res) => {
          setActive(false);
          setErr(false);
        }).catch((err2) => {
          setActive(false);
          setErr(true);
          setTimeout(() => {
            setErr(false);
          }, 3e3);
        });
      }
    }, [active]);
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-crawler icon",
      disabled: !constant_default.r18,
      onClick: () => {
        if (active) {
          return;
        }
        setActive(true);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgCrawler, {
        className: `${active ? "crawler--active" : ""} ${err ? "crawler--error" : ""}`
      })
    });
  };
  var ConfigBtn = () => {
    const [visible, setVisible] = useController(configVisibleStore);
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-setting icon",
      onClick: (e2) => {
        setVisible(true);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgSetting, {
        fill: "black"
      })
    });
  };
  var OpenInExplorerBtn = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-open-folder icon",
      onClick: () => {
        props.handleClick();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgFolderOpen, {})
    });
  };
  var GotoReaderBtn = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("button", {
      className: "btn-goto-reader icon goto-btn",
      onClick: () => {
        window.location.href = "#/reader";
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SvgBooks, {})
    });
  };

  // src/components/Menu.tsx
  var import_jsx_runtime22 = __toESM(require_jsx_runtime());
  var Sidebar = (props) => {
    const pos = (0, import_react8.useMemo)(
      () => ({
        "top": "top",
        "bottom": "bottom",
        "middle": "middle"
      }),
      []
    );
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("ul", {
      className: pos[props.menuPosition] + "-menu",
      children: Array.isArray(props.children) ? props.children.map((child, index2) => {
        return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("li", {
          children: child
        }, index2);
      }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("li", {
        children: props.children
      })
    });
  };
  var SidebarContainer = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", {
      className: "sidebar-container",
      children: props.children
    });
  };
  var Menu = (props) => {
    const [mode2, setMode] = (0, import_react8.useState)("Normal" /* Normal */);
    (0, import_react8.useEffect)(() => {
      let { directory, stared, bookmark, show_dir, search } = parseUrlQuery(
        window.location.href
      );
      if (directory) {
        setMode("InDir" /* DirContent */);
      } else if (stared) {
        setMode("Stared" /* Stared */);
      } else if (bookmark) {
        setMode("Bookmark" /* Bookmark */);
      } else if (show_dir) {
        setMode("ShowDirs" /* ShowDirs */);
      } else if (search) {
      } else {
        setMode("Normal" /* Normal */);
      }
    }, [window.location.href]);
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Sidebar, {
      menuPosition: "middle",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(HomePage, {
          activeMode: "Normal" /* Normal */,
          currentMode: mode2,
          type: props.type
        }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Stared, {
          activeMode: "Stared" /* Stared */,
          currentMode: mode2,
          type: props.type
        }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(BookmarkBtn, {
          activeMode: "Bookmark" /* Bookmark */,
          currentMode: mode2,
          type: props.type
        }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ShowDir, {
          activeMode: "ShowDirs" /* ShowDirs */,
          currentMode: mode2,
          type: props.type
        })
      ]
    });
  };

  // esbuild-scss-modules-plugin:./style/loading.module.scss
  var classes2 = { "loading": "_loading_vbdwb_1", "spinner": "_spinner_vbdwb_8", "spin": "_spin_vbdwb_8" };
  var loading_module_default = classes2;

  // src/components/Gallery/Loading.tsx
  var import_jsx_runtime23 = __toESM(require_jsx_runtime());
  var Loading = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", {
      className: loading_module_default["loading"],
      children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Spin, {
        size: "large"
      })
    });
  };
  var Spin = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", {
      className: loading_module_default[`spin-${props.size}`] + " " + loading_module_default["spinner"]
    });
  };

  // src/components/Gallery/PageNav.tsx
  var import_react9 = __toESM(require_react());

  // src/icon/leftArrow.svg
  var React19 = __toESM(require_react());
  var import_jsx_runtime24 = __toESM(require_jsx_runtime());
  var SvgLeftArrow = (props) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", {
    t: 1647581456603,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2270,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", {
      d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z",
      "p-id": 2271
    })
  });

  // src/icon/leftDoubleArrow.svg
  var React20 = __toESM(require_react());
  var import_jsx_runtime25 = __toESM(require_jsx_runtime());
  var SvgLeftDoubleArrow = (props) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("svg", {
    t: 1647582526476,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 8685,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", {
        d: "M272.9 512l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3c-9.1 11.6-9.1 27.9 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512z",
        "p-id": 8686
      }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", {
        d: "M576.9 512l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3c-9.1 11.6-9.1 27.9 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z",
        "p-id": 8687
      })
    ]
  });

  // src/icon/rightArrow.svg
  var React21 = __toESM(require_react());
  var import_jsx_runtime26 = __toESM(require_jsx_runtime());
  var SvgRightArrow = (props) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("svg", {
    t: 1647581633471,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 3060,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", {
      d: "M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z",
      "p-id": 3061
    })
  });

  // src/icon/rightDoubleArrow.svg
  var React22 = __toESM(require_react());
  var import_jsx_runtime27 = __toESM(require_jsx_runtime());
  var SvgRightDoubleArrow = (props) => /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("svg", {
    t: 1647582547607,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 9037,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("path", {
        d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z",
        "p-id": 9038
      }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("path", {
        d: "M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z",
        "p-id": 9039
      })
    ]
  });

  // src/components/Gallery/PageNav.tsx
  var import_jsx_runtime28 = __toESM(require_jsx_runtime());
  var range = (start, end) => {
    if (start === end) {
      return [start];
    }
    let arr = [];
    for (let i2 = start; i2 <= end; i2++) {
      arr.push(i2);
    }
    return arr;
  };
  var generateNewPageUrl = (page) => {
    let href = window.location.href;
    let path4 = window.location.hash.split("?")[0] + "?";
    const urlObj = parseUrlQuery(href);
    urlObj["page"] = page.toString();
    for (const key in urlObj) {
      if (typeof urlObj[key] === "undefined" || key.length <= 0 || urlObj[key].length <= 0) {
        continue;
      }
      if (key === "scroll") {
        continue;
      }
      path4 += key + "=" + urlObj[key].toString() + "&";
    }
    return path4.startsWith("#") ? path4 : "#" + path4;
  };
  var PageSpan = (props) => {
    let url = parseUrlQuery(window.location.href);
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("li", {
      className: "page-span" + (props.special ? " " + props.special : ""),
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("a", {
        className: (props.currentPage === props.page ? "active" : "") + " page-link" + (props.disable ? " disable" : ""),
        href: generateNewPageUrl(props.page),
        onClick: (e2) => {
          if (props.disable) {
            e2.preventDefault();
          }
        },
        children: props.icon ? props.icon : props.page
      })
    });
  };
  var PageNav = (props) => {
    let pages = (0, import_react9.useMemo)(
      () => props.current <= 3 ? range(1, props.total < 5 ? props.total : 5) : props.current >= props.total - 2 ? range(props.total - 4 || 1, props.total) : range(props.current - 2 || 1, props.current + 2),
      [props]
    );
    const [searchParam, setSearch] = useSearchParams();
    let search = searchParam.get("search");
    let stared = searchParam.get("stared");
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("nav", {
      className: "nav-container",
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("ul", {
        className: "page-nav",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
            currentPage: props.current,
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SvgLeftDoubleArrow, {}),
            page: 1,
            params: { search, stared, pack: props.pack },
            special: "first"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
            currentPage: props.current,
            disable: props.current === 1,
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SvgLeftArrow, {}),
            page: props.current - 1,
            params: { search, stared, pack: props.pack },
            special: "prev"
          }),
          pages.map((v2, i2) => {
            return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
              currentPage: props.current,
              page: v2,
              params: { search, stared, pack: props.pack }
            }, i2);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", {
            children: "..."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
            currentPage: props.current,
            page: props.total,
            params: { search, stared, pack: props.pack },
            special: "total"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
            currentPage: props.current,
            disable: props.current === props.total,
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SvgRightArrow, {}),
            page: props.current + 1,
            params: { search, stared, pack: props.pack },
            special: "next"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(PageSpan, {
            currentPage: props.current,
            icon: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SvgRightDoubleArrow, {}),
            page: props.total,
            params: { search, stared, pack: props.pack },
            special: "last"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("li", {
            className: "page-span jump",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", {
                children: "\u8DF3\u8F6C\u81F3\u7B2C"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("input", {
                className: "jump-input",
                onKeyDown: (e2) => {
                  if (e2.key === "Enter") {
                    let value = e2.target.value;
                    if (parseInt(value) > props.total) {
                      value = props.total.toString();
                    } else if (value < "1") {
                      value = "1";
                    }
                    if (search) {
                      e2.target.value = "";
                      document.activeElement.blur();
                      setSearch({
                        search,
                        page: value
                      });
                      return;
                    } else if (stared) {
                      e2.target.value = "";
                      document.activeElement.blur();
                      setSearch({
                        stared: "true",
                        page: value
                      });
                      return;
                    }
                    const urlObj = new URLSearchParams(
                      parseUrlQuery(window.location.href)
                    );
                    urlObj.set("page", value);
                    window.location.href = (window.location.hash || "#").split(
                      "?"
                    )[0] + "?" + urlObj.toString();
                    e2.target.value = "";
                    document.activeElement.blur();
                  }
                }
              }),
              /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", {
                children: "\u9875"
              })
            ]
          })
        ]
      })
    });
  };

  // src/components/Gallery/PageOfTotal.tsx
  var import_jsx_runtime29 = __toESM(require_jsx_runtime());
  var PageOfTotal = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", {
      className: "page-total",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", {
          className: "page-number",
          children: props.current
        }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", {
          className: "page-of-total",
          children: "of"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", {
          className: "total-number",
          children: props.total
        })
      ]
    });
  };

  // src/components/Gallery/Toast.tsx
  var import_react10 = __toESM(require_react());

  // esbuild-scss-modules-plugin:./style/toast.module.scss
  var classes3 = { "toast": "_toast_1kfvj_2", "toast-content": "_toast-content_1kfvj_14", "toastContent": "_toast-content_1kfvj_14", "visible": "_visible_1kfvj_29" };
  var toast_module_default = classes3;

  // src/components/Gallery/Toast.tsx
  var import_jsx_runtime30 = __toESM(require_jsx_runtime());
  var Toast = (props) => {
    const [visible, setVisible] = (0, import_react10.useState)(false);
    (0, import_react10.useEffect)(() => {
      props.handler.current = setVisible;
    }, [props]);
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", {
      className: toast_module_default["toast"] + (visible ? " " + toast_module_default["visible"] : ""),
      children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", {
        className: toast_module_default["toast-content"],
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", {
          className: toast_module_default["toast-message"],
          children: props.message
        })
      })
    });
  };

  // src/components/Gallery/detail/AddBookmark.tsx
  var import_react11 = __toESM(require_react());

  // src/icon/addBookmark.svg
  var React25 = __toESM(require_react());
  var import_jsx_runtime31 = __toESM(require_jsx_runtime());
  var SvgAddBookmark = (props) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("path", {
      d: "M7.5,10h1a1,1,0,0,0,0-2h-1a1,1,0,0,0,0,2Zm4,6h-4a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm0-4h-4a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm6.92-2.62a1,1,0,0,0-.21-1.09l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0L11.56,2H5.5a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3h6a1,1,0,0,0,0-2h-6a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h5V7a3,3,0,0,0,3,3h4A1,1,0,0,0,18.42,9.38ZM13.5,8a1,1,0,0,1-1-1V5.41L15.09,8Zm7,4h-5a1,1,0,0,0-1,1v8a1,1,0,0,0,.53.88,1,1,0,0,0,1-.05L18,20.53,20,21.83A1,1,0,0,0,21.5,21V13A1,1,0,0,0,20.5,12Zm-1,7.12-.94-.63a1,1,0,0,0-1.12,0l-.94.63V14h3Z"
    })
  });

  // src/components/Gallery/detail/AddBookmark.tsx
  var import_jsx_runtime32 = __toESM(require_jsx_runtime());
  function AddBookmark(props) {
    const { fileOperator, pack, bookmarkToast } = props;
    const zoom = (0, import_react11.useRef)(imageStateStore).current;
    const handleClick = (0, import_react11.useCallback)(
      (e2) => {
        let top = Math.round(
          document.getElementsByClassName("pack-detail-list")[0].scrollTop
        );
        let imgSrc = "";
        if (zoom.current.length > 0) {
          imgSrc = "/" + zoom.current.split("/").pop();
        } else {
          let elements = Array.from(
            document.getElementsByClassName("pack-detail")
          );
          let imgIndex = 0;
          for (let i2 = 0; i2 < elements.length - 1; i2++) {
            if (elements[i2].offsetTop > top && top < elements[i2 + 1].offsetTop) {
              if (elements[i2].offsetTop - top < elements[i2 + 1].offsetTop - top) {
                imgIndex = i2;
              } else {
                imgIndex = i2 + 1;
              }
              break;
            }
          }
          if (imgIndex < 0) {
            imgIndex = 0;
          }
          imgSrc = "/" + elements[imgIndex].src.split("/").pop();
        }
        let data = fileOperator.packWillOpen(
          parseInt(pack),
          false
        );
        let href = window.location.href;
        let url = window.location.hash.split("?")[0] + "?";
        const urlObj = parseUrlQuery(href);
        for (const key in urlObj) {
          if (typeof urlObj[key] === "undefined" && key.length <= 0) {
            continue;
          }
          if (key !== "scroll") {
            url += `${key}=${urlObj[key]}&`;
          }
        }
        if (!urlObj.page) {
          url += "page=1&";
        }
        url += `scroll=${top + 1}&`;
        fileOperator.bookmarksUpdate({
          ...data,
          cover: imgSrc,
          url,
          timeStamp: formatDate(new Date())
        });
        bookmarkToast.current(true);
        e2.target.disabled = true;
        setTimeout(() => {
          e2.target.disabled = false;
          bookmarkToast.current(false);
        }, 1e3);
      },
      [fileOperator, pack, bookmarkToast]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("button", {
      className: "add-bookmark detail-icon",
      disabled: !constant_default.r18,
      onClick: handleClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(SvgAddBookmark, {})
    });
  }

  // src/components/Gallery/detail/DetailContainer.tsx
  var import_react12 = __toESM(require_react());

  // src/icon/cover.svg
  var React26 = __toESM(require_react());
  var import_jsx_runtime33 = __toESM(require_jsx_runtime());
  var SvgCover = (props) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("svg", {
    t: 1652676768856,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 1929,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", {
      d: "M1022.935551 817.496881c0 21.288981-14.902287 40.449064-34.06237 48.964657l0 57.480249c19.160083 6.386694 34.06237 25.546778 34.06237 48.964657 0 27.675676-23.417879 51.093555-51.093555 51.093555-21.288981 0-40.449064-14.902287-48.964657-34.06237l-57.480249 0c-6.386694 19.160083-25.546778 34.06237-48.964657 34.06237-21.288981 0-40.449064-14.902287-48.964657-34.06237l-57.480249 0c-6.386694 19.160083-25.546778 34.06237-48.964657 34.06237-21.288981 0-40.449064-14.902287-48.964657-34.06237l-57.480249 0C552.449064 1006.968815 533.288981 1021.871102 512 1021.871102c-21.288981 0-40.449064-14.902287-48.964657-34.06237l-57.480249 0c-6.386694 19.160083-25.546778 34.06237-48.964657 34.06237-21.288981 0-40.449064-14.902287-48.964657-34.06237l-57.480249 0c-6.386694 19.160083-25.546778 34.06237-48.964657 34.06237-21.288981 0-40.449064-14.902287-48.964657-34.06237L101.122661 987.808732C92.607069 1006.968815 73.446985 1021.871102 52.158004 1021.871102 24.482328 1021.871102 1.064449 998.453222 1.064449 970.777547c0-21.288981 14.902287-40.449064 34.06237-48.964657l0-57.480249C15.966736 857.945946 1.064449 838.785863 1.064449 817.496881c0-21.288981 14.902287-40.449064 34.06237-48.964657l0-57.480249C15.966736 704.665281 1.064449 685.505198 1.064449 664.216216c0-21.288981 14.902287-40.449064 34.06237-48.964657l0-57.480249C15.966736 551.384615 1.064449 532.224532 1.064449 510.935551c0-21.288981 14.902287-40.449064 34.06237-48.964657l0-57.480249C15.966736 398.10395 1.064449 378.943867 1.064449 357.654886c0-21.288981 14.902287-40.449064 34.06237-48.964657l0-57.480249C15.966736 244.823285 1.064449 225.663202 1.064449 204.37422s14.902287-40.449064 34.06237-48.964657L35.126819 100.058212C15.966736 91.54262 1.064449 72.382536 1.064449 51.093555 1.064449 23.417879 24.482328 0 52.158004 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C164.989605 14.902287 184.149688 0 205.438669 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C318.27027 14.902287 337.430353 0 358.719335 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C471.550936 14.902287 490.711019 0 512 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C624.831601 14.902287 643.991684 0 665.280665 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C778.112266 14.902287 797.272349 0 818.561331 0c21.288981 0 40.449064 14.902287 48.964657 34.06237l57.480249 0C931.392931 14.902287 950.553015 0 971.841996 0 999.517672 0 1022.935551 23.417879 1022.935551 51.093555c0 21.288981-14.902287 40.449064-34.06237 48.964657l0 57.480249C1008.033264 163.925156 1022.935551 183.085239 1022.935551 204.37422s-14.902287 40.449064-34.06237 48.964657l0 57.480249c19.160083 6.386694 34.06237 25.546778 34.06237 48.964657 0 21.288981-14.902287 40.449064-34.06237 48.964657l0 57.480249C1008.033264 470.486486 1022.935551 489.64657 1022.935551 510.935551c0 21.288981-14.902287 40.449064-34.06237 48.964657l0 57.480249c19.160083 6.386694 34.06237 25.546778 34.06237 48.964657 0 21.288981-14.902287 40.449064-34.06237 48.964657l0 57.480249C1008.033264 777.047817 1022.935551 796.2079 1022.935551 817.496881zM886.686071 136.24948 137.313929 136.24948l0 749.372141 749.372141 0L886.686071 136.24948zM443.87526 681.247401 682.31185 391.717256l153.280665 238.43659 0 204.37422L188.407484 834.528067l204.37422-204.37422L443.87526 681.247401zM341.68815 442.810811c-57.480249 0-102.18711-44.706861-102.18711-102.18711 0-57.480249 44.706861-102.18711 102.18711-102.18711s102.18711 44.706861 102.18711 102.18711C443.87526 398.10395 399.168399 442.810811 341.68815 442.810811z",
      "p-id": 1930,
      fill: "#707070"
    })
  });

  // src/icon/lastPage.svg
  var React27 = __toESM(require_react());
  var import_jsx_runtime34 = __toESM(require_jsx_runtime());
  var SvgLastPage = (props) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("svg", {
    t: 1648545838925,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2937,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("path", {
      d: "M243.2 551.424l453.632 453.632c22.528 22.528 59.904 22.528 82.432 0 22.528-22.528 22.528-59.904 0-82.432L366.592 510.464l412.672-412.672c22.528-22.528 22.528-59.904 0-82.432-22.528-22.528-59.904-22.528-82.432 0L243.2 468.992c-23.04 23.04-23.04 59.904 0 82.432z m0 0",
      "p-id": 2938
    })
  });

  // src/icon/nextPage.svg
  var React28 = __toESM(require_react());
  var import_jsx_runtime35 = __toESM(require_jsx_runtime());
  var SvgNextPage = (props) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("svg", {
    t: 1648546020806,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 3884,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("path", {
      d: "M779.264 468.992L325.632 15.36c-22.528-22.528-59.904-22.528-82.432 0-22.528 22.528-22.528 59.904 0 82.432L655.36 510.464l-412.672 412.672c-22.528 22.528-22.528 59.904 0 82.432 22.528 22.528 59.904 22.528 82.432 0l453.632-453.632c23.552-23.04 23.04-59.904 0.512-82.944z m0 0",
      "p-id": 3885
    })
  });

  // src/components/Gallery/detail/ZoomIn.tsx
  var import_jsx_runtime36 = __toESM(require_jsx_runtime());
  var ImageZoomIn = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", {
      id: "zoom-in",
      style: { display: props.src?.length > 0 ? "flex" : "none" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("button", {
          className: "zoom-prev zoom-page",
          onClick: props.prev,
          children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(SvgLastPage, {})
        }),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("img", {
          alt: "",
          onClick: () => {
            props.setCurrent(-1);
          },
          onWheel: (e2) => {
            if (e2.deltaY > 0) {
              props.next();
            } else {
              props.prev();
            }
          },
          src: props.src
        }),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("button", {
          className: "zoom-next zoom-page",
          onClick: props.next,
          children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(SvgNextPage, {})
        })
      ]
    });
  };

  // src/components/Gallery/detail/DetailContainer.tsx
  var import_jsx_runtime37 = __toESM(require_jsx_runtime());
  var ImgDetail = (props) => {
    let clickHandler = (0, import_react12.useCallback)(() => {
      props.setCurrent(props.index);
    }, [props]);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", {
      className: "pack-detail-wrapper",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("img", {
          alt: "",
          className: "pack-detail",
          onClick: clickHandler,
          src: props.src
        }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SvgCover, {
          className: "set-cover",
          onClick: () => {
            GalleryOperator.getInstance().changePackCover(
              window.location.href.split("?")[0].split("/").pop(),
              "\\" + props.src.split("/").pop(),
              decodeURIComponent(
                props.src.replace("file:///", "")
              )
            ).then(() => {
              props.renameToastHandler.current(true);
              setTimeout(() => {
                props.renameToastHandler.current(false);
              }, 1e3);
            });
          }
        })
      ]
    });
  };
  var zoomStore = { current: -1 };
  var DetailContainer = (props) => {
    const [current, setCurrent] = (0, import_react12.useState)(zoomStore.current);
    const currentZoom = (0, import_react12.useRef)(imageStateStore);
    let [searchParams, setParams] = useSearchParams();
    let page = Number(searchParams.get("page") || "1");
    let scroll = Number(searchParams.get("scroll") || "0");
    const scrollingElement = (0, import_react12.useRef)(null);
    const renameToast = (0, import_react12.useRef)((_arg) => {
    });
    const prev = (0, import_react12.useCallback)(() => {
      if (current <= 0) {
        if (page > 1) {
          setParams({ "page": (page - 1).toString() });
        }
        return;
      }
      setCurrent((v2) => v2 - 1);
      currentZoom.current.current = props.images[current - 1]?.src;
    }, [current, page, setParams]);
    const next = (0, import_react12.useCallback)(() => {
      if (current >= props.images.length - 1) {
        if (page < props.total) {
          setParams({ "page": (page + 1).toString() });
        }
        return;
      }
      setCurrent((v2) => v2 + 1);
      currentZoom.current.current = props.images[current + 1].src;
    }, [current, props.images.length, props.total, page, setParams]);
    (0, import_react12.useEffect)(() => {
      return () => {
        zoomStore.current = -1;
      };
    }, []);
    (0, import_react12.useEffect)(() => {
      if (current > 0) {
        setCurrent(0);
      } else if (current === 0) {
        setCurrent(imageCountOfSinglePage - 1);
      }
    }, [page]);
    (0, import_react12.useLayoutEffect)(() => {
      zoomStore.current = current;
      if (current < 0) {
        currentZoom.current.current = "";
        return;
      }
      const e2 = document.querySelector(
        'img[src="' + props.images[current]?.src + '"]'
      );
      e2?.scrollIntoView();
    }, [current]);
    (0, import_react12.useEffect)(() => {
      if (props.images.length && scroll) {
        scrollingElement.current.scrollTop = scroll;
      }
    }, [props.images.length, scroll]);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_jsx_runtime37.Fragment, {
      children: !!props.images.length && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(import_jsx_runtime37.Fragment, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Toast, {
            handler: renameToast,
            message: "\u66F4\u6539\u5C01\u9762\u6210\u529F\uFF01"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("main", {
            className: "pack-detail-list",
            ref: scrollingElement,
            children: props.images.map((v2, i2) => {
              return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(ImgDetail, {
                index: i2,
                renameToastHandler: renameToast,
                setCurrent,
                src: v2.src
              }, i2 + v2.src.slice(0, 5) + i2);
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(ImageZoomIn, {
            next,
            prev,
            setCurrent,
            src: current >= 0 ? props.images[current]?.src : ""
          })
        ]
      })
    });
  };

  // src/components/Gallery/detail/PackDetail.tsx
  var import_jsx_runtime38 = __toESM(require_jsx_runtime());
  var fs8 = window.require("fs");
  var path3 = window.require("path");
  var parseToInt = (str) => {
    return Number(/[0-9]+/.exec(str)?.[0]) ?? NaN;
  };
  var endsWith2 = (str, ...arg) => {
    for (let i2 of arg) {
      if (str.endsWith(i2)) {
        return true;
      }
    }
    return false;
  };
  var PackDetail = () => {
    const { pack } = useParams();
    const fileOperator = (0, import_react13.useRef)(GalleryOperator.getInstance()).current;
    const currentPath = (0, import_react13.useRef)(
      fileOperator.packWillOpen(parseInt(pack))?.path
    );
    let [searchParams] = useSearchParams();
    let page = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 1;
    const [images, setImages] = (0, import_react13.useState)([]);
    const imgList = (0, import_react13.useRef)([]);
    const length = (0, import_react13.useRef)({ value: 0 }).current;
    const [total, setTotal] = (0, import_react13.useState)(0);
    const bookmarkToast = (0, import_react13.useRef)((arg) => {
    });
    const handleOpenFolder = (0, import_react13.useCallback)(() => {
      if (!pack)
        return;
      openInExplorer(currentPath.current);
    }, [pack]);
    (0, import_react13.useEffect)(() => {
      fileOperator.titleUpdate();
      document.scrollingElement.scrollTop = 0;
    }, [images]);
    (0, import_react13.useEffect)(() => {
      if (!pack) {
        imgList.current = [];
        return;
      }
      let filePath = currentPath.current;
      if (!filePath) {
        return;
      }
      const fileList = fs8.readdirSync(filePath);
      if (!constant_default.r18) {
        imgList.current = fileList.map((v2, i2) => ({
          src: defaultCover,
          index: i2
        }));
      } else {
        imgList.current = fileList.filter((e2) => !e2.includes("thumb")).map((v2, i2) => {
          return {
            src: path3.join(filePath, v2),
            index: parseToInt(v2)
          };
        }).sort(
          (a2, b2) => {
            let formatA = a2.src.split(".").at(-1), formatB = b2.src.split(".").at(-1);
            if (formatA !== formatB) {
              return formatA > formatB ? 1 : -1;
            }
            return a2.index - b2.index;
          }
        );
      }
      if (!total) {
        setTotal(imgList.current.length);
      }
      return () => {
        length.value = 0;
      };
    }, []);
    (0, import_react13.useEffect)(() => {
      let currentList = imgList.current.slice(
        imageCountOfSinglePage * (page - 1),
        imageCountOfSinglePage * page
      );
      length.value = currentList.length;
      let cache = [];
      currentList.forEach((v2, i2) => {
        let src = v2.src.toLocaleLowerCase();
        if (!endsWith2(
          src.toLocaleLowerCase(),
          "jpg",
          "jpeg",
          "png",
          "gif",
          "bmp",
          "webp"
        )) {
          --length.value;
          return;
        }
        let img = new Image();
        img.src = v2.src;
        img.onload = () => {
          cache.push({ img, index: v2.index });
          if (cache.length >= length.value) {
            setImages(
              cache.sort((a2, b2) => {
                return a2.index - b2.index;
              }).map((e2) => e2.img)
            );
          }
          img.onload = null;
        };
        img.onerror = () => {
          img.onerror = null;
          console.log(decodeURIComponent(img.src));
          --length.value;
          if (cache.length >= length.value) {
            setImages(
              cache.sort((a2, b2) => {
                return a2.index - b2.index;
              }).map((e2) => e2.img)
            );
          }
        };
      });
      return () => {
        setImages([]);
      };
    }, [page]);
    const totalPage = (0, import_react13.useMemo)(
      () => Math.ceil(total / imageCountOfSinglePage),
      [total]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", {
      className: "pack-detail-container",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(PageOfTotal, {
          current: page,
          total: totalPage
        }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SidebarContainer, {
          children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Sidebar, {
            menuPosition: "middle",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("button", {
                className: "btn-homepage detail-icon",
                onClick: () => {
                  window.location.href = fileOperator.loadPrevPage();
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SvgHome, {})
              }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("button", {
                className: "back detail-icon",
                onClick: () => {
                  window.history.back();
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SvgBack, {})
              }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(AddBookmark, {
                bookmarkToast,
                fileOperator,
                pack
              }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(OpenInExplorerBtn, {
                handleClick: handleOpenFolder
              })
            ]
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Toast, {
          handler: bookmarkToast,
          message: "\u6DFB\u52A0\u4E66\u7B7E\u6210\u529F\uFF01"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(DetailContainer, {
          images,
          total: Math.ceil(total / imageCountOfSinglePage)
        }),
        images.length ? /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(import_jsx_runtime38.Fragment, {
          children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(PageNav, {
            current: page,
            pack,
            total: Math.ceil(total / imageCountOfSinglePage)
          })
        }) : /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Loading, {})
      ]
    });
  };

  // src/components/Gallery/index/Gallery.tsx
  var import_react19 = __toESM(require_react());

  // src/components/Gallery/FileDrop.tsx
  var import_react14 = __toESM(require_react());

  // esbuild-scss-modules-plugin:./style/fileDrop.module.scss
  var classes4 = { "file-drop": "_file-drop_1en0l_1", "fileDrop": "_file-drop_1en0l_1", "file-drop__content": "_file-drop__content_1en0l_15", "fileDrop__content": "_file-drop__content_1en0l_15", "file-drop__span": "_file-drop__span_1en0l_26", "fileDrop__span": "_file-drop__span_1en0l_26", "cover": "_cover_1en0l_31", "visible": "_visible_1en0l_41", "error-info": "_error-info_1en0l_45", "errorInfo": "_error-info_1en0l_45", "error-info--title": "_error-info--title_1en0l_49", "errorInfoTitle": "_error-info--title_1en0l_49", "error-info__type--error": "_error-info__type--error_1en0l_55", "errorInfo__typeError": "_error-info__type--error_1en0l_55", "error-info__type--success": "_error-info__type--success_1en0l_58", "errorInfo__typeSuccess": "_error-info__type--success_1en0l_58" };
  var fileDrop_module_default = classes4;

  // src/components/Gallery/FileDrop.tsx
  var import_jsx_runtime39 = __toESM(require_jsx_runtime());
  var FileDrop = (props) => {
    const visible = useModel(fileDropVisibleStore);
    const [result, setResult] = (0, import_react14.useState)([]);
    (0, import_react14.useEffect)(() => {
      if (!visible) {
        setResult([]);
      }
    }, [visible]);
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", {
      className: fileDrop_module_default["cover"] + " " + (visible ? fileDrop_module_default["visible"] : ""),
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", {
        className: fileDrop_module_default["file-drop"],
        children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", {
          className: fileDrop_module_default["file-drop__content"],
          onDragEnter: (e2) => {
            e2.preventDefault();
            e2.stopPropagation();
          },
          onDragLeave: (e2) => {
            e2.preventDefault();
            e2.stopPropagation();
          },
          onDragOver: (e2) => {
            e2.preventDefault();
            e2.stopPropagation();
          },
          onDrop: (e2) => {
            e2.preventDefault();
            e2.stopPropagation();
            const files = Array.from(e2.dataTransfer.files);
            if (files.length > 0) {
              props.operator.addNewPack(
                files.map((e3) => {
                  return {
                    title: e3.name,
                    path: e3.path.replace(/\\/g, "/")
                  };
                }),
                false
              ).then((res) => {
                if (Array.isArray(res)) {
                  setResult([...res]);
                }
              });
            }
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", {
            className: fileDrop_module_default["file-drop__span"],
            children: result.length > 0 ? result.map((e2, i2) => {
              let s2 = e2.split(":::");
              return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("p", {
                className: fileDrop_module_default["error-info"],
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", {
                    className: fileDrop_module_default["error-info--title"],
                    children: s2[0]
                  }),
                  "\xA0",
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", {
                    className: fileDrop_module_default["error-info__type--" + (s2[1] === "\u6210\u529F" ? "success" : "error")],
                    children: s2[1]
                  })
                ]
              }, i2);
            }) : "Drop files here"
          })
        })
      })
    });
  };

  // src/components/Gallery/index/ImgContainer.tsx
  var import_react18 = __toESM(require_react());

  // src/components/Dialog.tsx
  var import_react15 = __toESM(require_react());

  // esbuild-scss-modules-plugin:./style/dialog.module.scss
  var classes5 = { "dialog": "_dialog_hc5ur_1", "dialog-button": "_dialog-button_hc5ur_15", "dialogButton": "_dialog-button_hc5ur_15", "dialog-button-contain": "_dialog-button-contain_hc5ur_24", "dialogButtonContain": "_dialog-button-contain_hc5ur_24", "dialog-button__confirm": "_dialog-button__confirm_hc5ur_28", "dialogButton__confirm": "_dialog-button__confirm_hc5ur_28", "dialog-button__back": "_dialog-button__back_hc5ur_36", "dialogButton__back": "_dialog-button__back_hc5ur_36", "dialog-cover": "_dialog-cover_hc5ur_43", "dialogCover": "_dialog-cover_hc5ur_43", "dir-map-list": "_dir-map-list_hc5ur_54", "dirMapList": "_dir-map-list_hc5ur_54", "dir-map-item": "_dir-map-item_hc5ur_74", "dirMapItem": "_dir-map-item_hc5ur_74", "dir-map-item-content": "_dir-map-item-content_hc5ur_80", "dirMapItemContent": "_dir-map-item-content_hc5ur_80", "dir-map-item-count": "_dir-map-item-count_hc5ur_105", "dirMapItemCount": "_dir-map-item-count_hc5ur_105", "dir-map-checkbox": "_dir-map-checkbox_hc5ur_117", "dirMapCheckbox": "_dir-map-checkbox_hc5ur_117", "dir-map-input": "_dir-map-input_hc5ur_123", "dirMapInput": "_dir-map-input_hc5ur_123", "dir-map-input--error": "_dir-map-input--error_hc5ur_131", "dirMapInputError": "_dir-map-input--error_hc5ur_131", "rename-contain": "_rename-contain_hc5ur_135", "renameContain": "_rename-contain_hc5ur_135", "rename-input": "_rename-input_hc5ur_144", "renameInput": "_rename-input_hc5ur_144", "config-container": "_config-container_hc5ur_153", "configContainer": "_config-container_hc5ur_153", "config-list": "_config-list_hc5ur_156", "configList": "_config-list_hc5ur_156", "config-item": "_config-item_hc5ur_161", "configItem": "_config-item_hc5ur_161", "config-file-label": "_config-file-label_hc5ur_172", "configFileLabel": "_config-file-label_hc5ur_172", "hidden": "_hidden_hc5ur_195", "catalog-list": "_catalog-list_hc5ur_199", "catalogList": "_catalog-list_hc5ur_199", "catalog-list-item": "_catalog-list-item_hc5ur_211", "catalogListItem": "_catalog-list-item_hc5ur_211", "catalog-container": "_catalog-container_hc5ur_241", "catalogContainer": "_catalog-container_hc5ur_241", "catalog-reg-input": "_catalog-reg-input_hc5ur_247", "catalogRegInput": "_catalog-reg-input_hc5ur_247", "current-chapter": "_current-chapter_hc5ur_257", "currentChapter": "_current-chapter_hc5ur_257" };
  var dialog_module_default = classes5;

  // src/components/Dialog.tsx
  var import_jsx_runtime40 = __toESM(require_jsx_runtime());
  var fs9 = window.require("fs");
  var { dialog } = window.require("@electron/remote");
  var { ipcRenderer: ipcRenderer2 } = window.require("electron");
  function createDialog(Component, store) {
    return (props) => {
      const [visible, setVisible] = useData(store);
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", {
        className: dialog_module_default["dialog-cover"] + (visible ? "" : " " + dialog_module_default["hidden"]),
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", {
          className: dialog_module_default["dialog"],
          children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Component, {
            ...props,
            setVisible,
            visible
          })
        })
      });
    };
  }
  var sort2 = (x, y2, index2) => {
    let a2 = x[index2];
    let b2 = y2[index2];
    if (!a2 && b2) {
      return -1;
    } else if (a2 && !b2) {
      return 1;
    } else if (a2 === b2) {
      return sort2(x, y2, index2 + 1);
    }
    let cReg = /^[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
    if (!cReg.test(a2) || !cReg.test(b2)) {
      if (!cReg.test(a2) && !cReg.test(b2)) {
        return a2.localeCompare(b2);
      }
      return -a2.localeCompare(b2);
    }
    return a2.localeCompare(b2, "zh");
  };
  var sortCNAndEN = (x, y2) => {
    return sort2(
      x[1].title.toLocaleLowerCase(),
      y2[1].title.toLocaleLowerCase(),
      0
    );
  };
  var DirMapContent = (props) => {
    const [checked, setChecked] = (0, import_react15.useState)("");
    const [err, setErr] = (0, import_react15.useState)(false);
    const ul = (0, import_react15.useRef)(null);
    const open = (0, import_react15.useRef)(false);
    const [destination, setDestination] = (0, import_react15.useState)("");
    const [dirs, setDirs] = (0, import_react15.useState)(
      []
    );
    (0, import_react15.useEffect)(() => {
      if (!props.util.dirMap) {
        return;
      }
      setDirs(props.util.dirMap.entrySeq().sort(sortCNAndEN));
    }, [props.util.dirMap]);
    (0, import_react15.useEffect)(() => {
      if (!props.visible) {
        open.current = false;
      } else if (!checked) {
        open.current = true;
      }
      if (props.visible && checked && !open.current) {
        open.current = true;
        let e2 = document.querySelector(`#checkbox-${checked} + label`);
        if (e2) {
          ul.current.scrollTop = e2.offsetTop;
        }
      }
    }, [checked, props.visible]);
    const dirList = (0, import_react15.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("ul", {
        className: dialog_module_default["dir-map-list"],
        ref: ul,
        children: dirs.map((dir, v2) => {
          const dirIndex = dir[0];
          return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("li", {
            className: dialog_module_default["dir-map-item"],
            id: "input-" + dirIndex,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
                checked: checked === dirIndex,
                className: dialog_module_default["dir-map-checkbox"],
                disabled: !constant_default.r18,
                id: "checkbox-" + dirIndex,
                onClick: () => {
                  if (checked === dirIndex) {
                    setChecked("");
                    setDestination("");
                    return;
                  }
                  setChecked(dirIndex);
                  setDestination(dirIndex);
                },
                readOnly: true,
                type: "checkbox"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("label", {
                htmlFor: "checkbox-" + dirIndex,
                children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
                  className: dialog_module_default["dir-map-item-content"],
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
                      children: constant_default.r18 ? dir[1].title : `\u6587\u4EF6\u5939${v2}`
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
                      className: dialog_module_default["dir-map-item-count"],
                      children: dir[1].count
                    })
                  ]
                })
              })
            ]
          }, dirIndex);
        })
      });
    }, [dirs, checked]);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, {
      children: [
        dirList,
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
          className: `${dialog_module_default["dir-map-input"]} ${err ? dialog_module_default["dir-map-input--error"] : ""}`,
          disabled: !constant_default.r18,
          onChange: (e2) => {
            if (err) {
              setErr(false);
            }
          },
          onKeyDown: (e2) => {
            if (e2.key === "Enter") {
              props.util.addNewDir(e2.target.value).then((dirIndex) => {
                if (dirIndex > -1) {
                  e2.target.value = "";
                  setChecked(dirIndex.toString());
                  setDestination(dirIndex.toString());
                } else {
                  setErr(true);
                  document.querySelector(`#input-${-dirIndex}`).scrollIntoView();
                  setChecked(dirIndex);
                  setDestination(dirIndex);
                }
              });
            }
          },
          type: "text"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
          className: dialog_module_default["dialog-button-contain"],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__back"],
              onClick: () => {
                dialogActive.setActive(false);
                props.setVisible(false);
              },
              children: "\u8FD4\u56DE"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__confirm"],
              onClick: () => {
                if (destination.length === 0 || !constant_default.r18) {
                  return;
                } else if (isNaN(parseInt(destination))) {
                  throw new Error("Wrong destination directory");
                }
                props.util.addFileToDir(parseInt(destination));
                dialogActive.setActive(false);
                props.setVisible(false);
                props.setInSelect((v2) => v2 + 1);
              },
              children: "\u786E\u8BA4"
            })
          ]
        })
      ]
    });
  };
  var RenameContent = (props) => {
    const [newTitle, setNewTitle] = (0, import_react15.useState)("");
    (0, import_react15.useEffect)(() => {
      setNewTitle(props.util.oldTitle);
    }, [props.util.oldTitle]);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
      className: dialog_module_default["rename-contain"],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
          className: dialog_module_default["rename-input"],
          onChange: (e2) => {
            setNewTitle(e2.target.value);
          },
          value: newTitle
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
          className: dialog_module_default["dialog-button-contain"],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__back"],
              onClick: () => {
                dialogActive.setActive(false);
                props.setVisible(false);
                props.util.packToBeRenamed = { id: -1, oldTitle: "" };
              },
              children: "\u8FD4\u56DE"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__confirm"],
              onClick: () => {
                if (!constant_default.r18) {
                  dialogActive.setActive(false);
                  props.setVisible(false);
                  return;
                }
                props.util.rename(newTitle).then((res) => {
                  if (res) {
                    dialogActive.setActive(false);
                    props.setVisible(false);
                  } else {
                    console.log("rename fail");
                  }
                });
              },
              children: "\u786E\u8BA4"
            })
          ]
        })
      ]
    });
  };
  var configContent = (props) => {
    const { oldConfig: globalConfig } = props;
    const newConfig = (0, import_react15.useRef)({ ...globalConfig });
    const [confirmed, setConfirmed] = (0, import_react15.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
      className: dialog_module_default["config-container"],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("ul", {
          className: dialog_module_default["config-list"],
          children: Object.keys(globalConfig).map((e2) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ConfigItem, {
            confirmed,
            itemKey: e2,
            newConfig: newConfig.current,
            value: globalConfig[e2]
          }, e2))
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
          className: dialog_module_default["dialog-button-contain"],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__back"],
              onClick: () => {
                dialogActive.setActive(false);
                newConfig.current = { ...globalConfig };
                props.setVisible(false);
                setConfirmed((v2) => !v2);
              },
              children: "\u8FD4\u56DE"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__confirm"],
              onClick: () => {
                let obj = {
                  gallery: constant_default,
                  reader: readerConfig
                };
                obj[props.type] = newConfig.current;
                fs9.writeFileSync(
                  "D:\\webDemo\\desktop-reader\\src\\config\\config.json",
                  JSON.stringify(obj)
                );
                ipcRenderer2.send("relaunch");
              },
              children: "\u786E\u8BA4"
            })
          ]
        })
      ]
    });
  };
  var ConfigItem = (props) => {
    const [value, setValue] = (0, import_react15.useState)(props.value);
    (0, import_react15.useEffect)(() => {
      setValue(props.value);
    }, [props.confirmed]);
    const item = () => {
      switch (typeof value) {
        case "number":
          return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
            onChange: (e2) => {
              setValue(parseInt(e2.target.value));
              props.newConfig[props.itemKey] = parseInt(e2.target.value) || 20;
            },
            type: "number",
            value
          });
        case "string":
          if (value.startsWith("http")) {
            return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", {
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
                id: "input" + props.itemKey,
                onChange: (e2) => {
                  props.newConfig[props.itemKey] = e2.target.value;
                  setValue(e2.target.value.toString());
                },
                type: "text",
                value
              })
            });
          } else {
            const otherAtt = { directory: "", webkitdirectory: "" };
            return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", {
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
                className: dialog_module_default["config-file-label"],
                onClick: () => {
                  dialog.showOpenDialog({
                    title: "\u9009\u62E9\u8DEF\u5F84",
                    defaultPath: props.value,
                    properties: ["openDirectory"]
                  }).then((result) => {
                    let newPath = result.filePaths[0].replaceAll(
                      "\\",
                      "/"
                    );
                    setValue(newPath);
                    props.newConfig[props.itemKey] = newPath;
                  }).catch((err) => {
                    console.log(err);
                  });
                },
                title: value,
                children: value
              })
            });
          }
        case "boolean":
          return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("input", {
            checked: value,
            onClick: (e2) => {
              setValue(!Boolean(value));
              props.newConfig[props.itemKey] = !value;
            },
            readOnly: true,
            type: "checkbox"
          });
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("li", {
      className: dialog_module_default["config-item"],
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
          children: translation[props.itemKey]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", {
          children: item()
        })
      ]
    });
  };
  var CatalogItem = (props) => {
    const item = (0, import_react15.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("li", {
        className: dialog_module_default["catalog-list-item"] + (props.current ? " " + dialog_module_default["current-chapter"] : ""),
        onClick: () => {
          document.querySelector("#reader-scroll-ele").scrollTop = props.chapter.index * lineHeight;
        },
        title: props.chapter.title,
        children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
          children: props.chapter.title
        })
      });
    }, [props.chapter, props.current]);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_jsx_runtime40.Fragment, {
      children: item
    });
  };
  var CatalogContent = (props) => {
    const [reg, setReg] = (0, import_react15.useState)(props.book?.reg || "");
    const [catalog, setCatalog] = (0, import_react15.useState)(props.book?.getCatalog() || []);
    (0, import_react15.useEffect)(() => {
      setReg(props.book?.reg || "");
    }, [props.book?.reg]);
    (0, import_react15.useEffect)(() => {
      setCatalog(props.book?.getCatalog() || []);
    }, [props.book]);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("ul", {
          className: dialog_module_default["catalog-list"],
          children: catalog.map((e2, i2) => {
            return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(CatalogItem, {
              chapter: e2,
              current: i2 === props.currentChapter
            }, e2.index);
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("textarea", {
          className: dialog_module_default["catalog-reg-input"],
          onChange: (e2) => {
            setReg(e2.target.value);
          },
          value: reg.toString()
        }),
        /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", {
          className: dialog_module_default["dialog-button-contain"],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__back"],
              onClick: () => {
                dialogActive.setActive(false);
                props.setVisible(false);
              },
              children: "\u8FD4\u56DE"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("button", {
              className: dialog_module_default["dialog-button"] + " " + dialog_module_default["dialog-button__confirm"],
              onClick: () => {
                props.book.reParseCatalog(reg);
                setCatalog(props.book.getCatalog());
              },
              children: "\u786E\u8BA4"
            })
          ]
        })
      ]
    });
  };
  var DirMap = createDialog(DirMapContent, dirMapVisibleStore);
  var Rename = createDialog(RenameContent, renameVisibleStore);
  var Config = createDialog(configContent, configVisibleStore);
  var Catalog = createDialog(CatalogContent, catalogVisibleStore);

  // src/components/Gallery/ImgComponent/Bookmarks.tsx
  var import_react16 = __toESM(require_react());

  // src/icon/mark.svg
  var React32 = __toESM(require_react());
  var import_jsx_runtime41 = __toESM(require_jsx_runtime());
  var SvgMark = (props) => /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("svg", {
    t: 1648814843660,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2254,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("path", {
      d: "M832 64v960L530.3 812.8c-11-7.7-25.7-7.7-36.7 0L192 1024V64c0-35.4 28.7-64 64-64h512c35.3 0 64 28.6 64 64z",
      "p-id": 2255
    })
  });

  // esbuild-scss-modules-plugin:../style/img.module.scss
  var classes6 = { "img": "_img_1a3z4_1", "img-pack": "_img-pack_1a3z4_14", "imgPack": "_img-pack_1a3z4_14", "img-main-content": "_img-main-content_1a3z4_21", "imgMainContent": "_img-main-content_1a3z4_21", "img-wrapper": "_img-wrapper_1a3z4_32", "imgWrapper": "_img-wrapper_1a3z4_32", "in-select": "_in-select_1a3z4_41", "inSelect": "_in-select_1a3z4_41", "border-light": "_border-light_1a3z4_1", "borderLight": "_border-light_1a3z4_1", "directory": "_directory_1a3z4_52", "pack-title": "_pack-title_1a3z4_64", "packTitle": "_pack-title_1a3z4_64", "pack-title-timestamp": "_pack-title-timestamp_1a3z4_87", "packTitleTimestamp": "_pack-title-timestamp_1a3z4_87", "pack-title-name": "_pack-title-name_1a3z4_90", "packTitleName": "_pack-title-name_1a3z4_90", "icon-span": "_icon-span_1a3z4_97", "iconSpan": "_icon-span_1a3z4_97", "bookmark-span": "_bookmark-span_1a3z4_98", "bookmarkSpan": "_bookmark-span_1a3z4_98", "marked": "_marked_1a3z4_112", "stared--true": "_stared--true_1a3z4_116", "staredTrue": "_stared--true_1a3z4_116", "icon--stared": "_icon--stared_1a3z4_120", "iconStared": "_icon--stared_1a3z4_120", "icon--rename": "_icon--rename_1a3z4_127", "iconRename": "_icon--rename_1a3z4_127", "icon--trash": "_icon--trash_1a3z4_135", "iconTrash": "_icon--trash_1a3z4_135", "icon--trash--confirmed": "_icon--trash--confirmed_1a3z4_143", "iconTrashConfirmed": "_icon--trash--confirmed_1a3z4_143", "cross": "_cross_1a3z4_147", "check-box": "_check-box_1a3z4_151", "checkBox": "_check-box_1a3z4_151", "blank": "_blank_1a3z4_159", "loading": "_loading_1a3z4_166" };
  var img_module_default = classes6;

  // src/components/Gallery/ImgComponent/Bookmarks.tsx
  var import_jsx_runtime42 = __toESM(require_jsx_runtime());
  var BookmarkItem = (props) => {
    const [marked, setMarked] = (0, import_react16.useState)(true);
    const [changed, setChanged] = (0, import_react16.useState)(false);
    (0, import_react16.useEffect)(() => {
      if (changed) {
        props.util.bookmarksUpdate(props.data, marked);
      }
    }, [changed, marked, props.data, props.util]);
    const clickHandler = (0, import_react16.useCallback)(() => {
      setMarked((v2) => !v2);
      setChanged(true);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", {
      className: img_module_default.img,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", {
          className: img_module_default["img-wrapper"],
          children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("a", {
            href: props.data.url,
            children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("img", {
              alt: "",
              src: props.src
            })
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("a", {
          className: img_module_default["pack-title"],
          href: props.data.url,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", {
              className: img_module_default["pack-title-name"],
              title: props.data.title,
              children: props.data.title
            }),
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", {
              className: img_module_default["pack-title-timestamp"],
              title: props.data.title,
              children: props.data.timeStamp
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", {
          className: img_module_default["bookmark-span"] + (marked ? " " + img_module_default["marked"] : ""),
          onClick: clickHandler,
          children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SvgMark, {})
        })
      ]
    });
  };
  var Bookmarks_default = BookmarkItem;

  // src/components/Gallery/ImgComponent/Directory.tsx
  var import_jsx_runtime43 = __toESM(require_jsx_runtime());
  var ImageDir = (props) => {
    const [, setVis] = useController(renameVisibleStore);
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", {
      className: img_module_default.img,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", {
          className: img_module_default["img-wrapper"],
          children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("a", {
            href: `#/gallery?directory=${props.data.id}&page=1`,
            children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", {
              className: img_module_default["directory"],
              children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("img", {
                alt: "",
                src: props.src
              })
            })
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("a", {
          className: img_module_default["pack-title"],
          href: `#/gallery?directory=${props.data.id}&page=1`,
          children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", {
            className: img_module_default["pack-title-name"],
            title: props.data.title,
            children: props.data.title
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("span", {
          className: img_module_default["icon-span"],
          children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(SvgRename, {
            onClick: () => {
              setVis(true);
              props.util.packToBeRenamed = {
                id: props.data.id,
                oldTitle: props.data.title
              };
            }
          })
        })
      ]
    });
  };

  // src/components/Gallery/ImgComponent/NormalImg.tsx
  var import_react17 = __toESM(require_react());

  // src/icon/cross.svg
  var React33 = __toESM(require_react());
  var import_jsx_runtime44 = __toESM(require_jsx_runtime());
  var SvgCross = (props) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("svg", {
    t: 1649319635685,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2263,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("path", {
      d: "M86.016 0l-83.968 70.656c149.504 111.616 288.768 239.616 411.136 367.616-187.392 188.928-334.336 374.784-411.648 449.536l159.744 133.632c56.832-117.248 180.224-294.912 345.6-481.28 165.376 187.392 289.28 366.08 346.112 483.84 0 0 155.648-165.376 169.472-139.776C962.56 816.64 816.128 620.032 619.52 418.816c112.64-115.712 239.104-230.4 374.272-331.264l-36.864-68.608c-153.088 76.288-299.008 189.44-430.08 309.76-132.096-125.44-281.6-244.736-440.832-328.704z",
      "p-id": 2264
    })
  });

  // src/icon/star.svg
  var React34 = __toESM(require_react());
  var import_jsx_runtime45 = __toESM(require_jsx_runtime());
  var SvgStar = (props) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("svg", {
    t: 1647775913639,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 3020,
    width: 200,
    height: 200,
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("path", {
      d: "M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z",
      "p-id": 3021
    })
  });

  // src/components/Gallery/ImgComponent/NormalImg.tsx
  var import_jsx_runtime46 = __toESM(require_jsx_runtime());
  var minIndex = (arr) => {
    let min2 = 0;
    for (let i2 = 1; i2 < arr.length; i2++) {
      if (arr[i2] < arr[min2]) {
        min2 = i2;
      }
    }
    return min2;
  };
  var NormalImg = (props) => {
    const [stared, setStared] = (0, import_react17.useState)(props.data.stared);
    const [, setVis] = useController(renameVisibleStore);
    const [confirmed, setConfirmed] = (0, import_react17.useState)(0);
    const flag = (0, import_react17.useRef)({ id: null, isDown: false, holding: false });
    const up = (0, import_react17.useCallback)(
      (e2) => {
        flag.current.isDown = false;
        clearTimeout(flag.current.id);
        if (!flag.current.holding && !props.inSelect && e2.button === 0) {
          window.location.href = "#/gallery/pack/" + props.data.id + "?page=1";
        }
      },
      [props.data.id, props.inSelect]
    );
    const down = (0, import_react17.useCallback)(() => {
      if (props.util.getMode() === "InDir" /* DirContent */) {
        return;
      }
      flag.current.isDown = true;
      flag.current.holding = false;
      flag.current.id = setTimeout(() => {
        if (flag.current.isDown && !props.inSelect) {
          props.setInSelect(1);
          flag.current.holding = true;
        }
      }, 700);
    }, [props]);
    const staredClick = (0, import_react17.useCallback)(() => {
      setStared((v2) => !v2);
      props.util.staredUpdate(props.data);
    }, [props.data, props.util, stared]);
    const removePack = (0, import_react17.useCallback)(() => {
      props.util.removeFileFromDir(
        props.data.id,
        parseInt(/directory=(\d+)/.exec(window.location.hash)[1])
      );
      return;
    }, [props.data.id, props.util]);
    const selectHandler = (0, import_react17.useCallback)(
      (e2) => {
        props.util.selectionUpdate(props.data.id, e2.target.checked);
      },
      [props.data.id, props.util]
    );
    const image = (0, import_react17.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", {
        className: img_module_default["img-wrapper"] + (props.inSelect ? " " + img_module_default["in-select"] : ""),
        onMouseDown: down,
        onMouseUp: up,
        children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("label", {
          htmlFor: props.data.id.toString(),
          children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("img", {
            alt: "",
            src: props.src
          })
        })
      });
    }, [props.data.id, props.inSelect, props.src, down, up]);
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", {
      className: img_module_default.img,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("input", {
          className: img_module_default["check-box"] + " img__checkbox",
          disabled: Boolean(props.data.parent) || !props.inSelect,
          id: props.data.id.toString(),
          onChange: selectHandler,
          style: {
            display: props.inSelect ? "initial" : "none"
          },
          title: Boolean(props.data.parent) || !props.inSelect ? props.util.searchParentName(props.data.parent) : void 0,
          type: "checkbox"
        }),
        image,
        /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("a", {
          className: img_module_default["pack-title"],
          href: "#/gallery/pack/" + props.data.id + "?page=1",
          children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", {
            className: img_module_default["pack-title-name"],
            title: props.data.title,
            children: props.data.title
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("span", {
          className: img_module_default["icon-span"],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SvgStar, {
              className: (stared ? img_module_default["stared--true"] + " " : "") + img_module_default["icon--stared"],
              onClick: () => {
                staredClick();
              }
            }),
            /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SvgTrash, {
              className: img_module_default["icon--trash"] + " " + (confirmed ? img_module_default["icon--trash--confirmed"] : ""),
              onClick: () => {
                if (confirmed === 1) {
                  galleryOperator.removePack(props.data, true);
                } else {
                  setConfirmed((v2) => v2 + 1);
                  setTimeout(() => {
                    setConfirmed(0);
                  }, 2e3);
                }
              }
            }),
            /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SvgRename, {
              className: img_module_default["icon--rename"],
              onClick: () => {
                if (dialogActive.active) {
                  return;
                }
                dialogActive.setActive(true);
                setVis(true);
                props.util.packToBeRenamed = {
                  id: props.data.id,
                  oldTitle: props.data.title
                };
              }
            }),
            props.util.inDir || props.util.modeOfSearch === "InDir" /* DirContent */ ? /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SvgCross, {
              className: img_module_default["cross"],
              onClick: removePack
            }) : null
          ]
        })
      ]
    });
  };
  var NormalImg_default = NormalImg;

  // src/components/Gallery/index/ImgContainer.tsx
  var import_jsx_runtime47 = __toESM(require_jsx_runtime());
  var index = 0;
  var ImgContainer = (props) => {
    const [images, setImages] = (0, import_react18.useState)([[], [], [], []]);
    const length = (0, import_react18.useRef)({ value: 0, loaded: 0 }).current;
    const waterfallCache = (0, import_react18.useRef)(ImgWaterfallCache.getInstance()).current;
    const [inSelect, setInSelect] = (0, import_react18.useState)(0);
    const [dirMapVis, setDirMapVis] = useController(dirMapVisibleStore);
    const [ready, setReady] = (0, import_react18.useState)(false);
    const topMenu = (0, import_react18.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(Sidebar, {
        menuPosition: "top",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Back, {
            inSelect,
            setInSelect
          }),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Refresh, {
            util: props.util
          }),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Add, {
            util: props.util
          }),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(CrawlerBtn, {}),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ConfigBtn, {}),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(GotoReaderBtn, {}),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(SelectPacks, {
            handleClick: () => {
              if (dialogActive.active) {
                return;
              }
              dialogActive.setActive(true);
              setDirMapVis(true);
            },
            inSelect
          })
        ]
      });
    }, [inSelect, props]);
    (0, import_react18.useEffect)(() => {
      return () => {
        waterfallCache.save();
      };
    }, []);
    const dirMap = (0, import_react18.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(DirMap, {
        setInSelect,
        util: props.util
      });
    }, [props.util]);
    (0, import_react18.useEffect)(() => {
      if (props.packs.length === 0) {
        setReady(true);
        return;
      }
      length.loaded = 0;
      if (waterfallCache.isNeeded(props.packs)) {
        setImages(waterfallCache.load());
      } else {
        length.value = props.packs.length;
        let waterfall = [
          [],
          [],
          [],
          []
        ];
        let heights = [0, 0, 0, 0];
        const buffer = [];
        props.packs.forEach(async (v2) => {
          let img = new Image();
          let hasExternalDriver = props.util.external;
          let imgPath = !hasExternalDriver && v2.cover.startsWith("E") || !constant_default.r18 ? defaultCover : ((v2.path ?? "") + v2.cover).replace(/\\/g, "/");
          let coverPath = imgPath;
          if (isImageBookmark(v2)) {
            coverPath = imgPath.split("/").slice(0, -1).join("/") + "/" + getBookmarkThumb(v2);
          } else if (!imgPath.endsWith("blank.jpg")) {
            coverPath = imgPath.split("/").slice(0, -1).join("/") + "/thumb.jpg";
          }
          img.src = String.raw`${coverPath.replace(/\\/g, "/")}`.replaceAll(/\s/g, encodeURIComponent(" ")).replaceAll(/#/g, encodeURIComponent("#"));
          img.onload = () => {
            img.onload = null;
            buffer.push({ img, data: v2 });
            length.loaded++;
            if (length.loaded >= length.value) {
              buffer.sort((a2, b2) => {
                if (isImageBookmark(a2.data) && isImageBookmark(b2.data) || isImageDir(a2.data) && isImageDir(b2.data)) {
                  return b2.data.timeStamp > a2.data.timeStamp ? 1 : -1;
                }
                return b2.data.id > a2.data.id ? 1 : -1;
              }).forEach((v3, i2) => {
                let min2 = minIndex(heights);
                if (isImageDir(v3.data)) {
                  min2 = i2 % 4;
                }
                let height = isImageDir(v3) ? 100 : Math.ceil(
                  180 * (v3.img.naturalHeight / v3.img.naturalWidth)
                );
                heights[min2] += height + waterfall[min2].push({
                  img: v3.img,
                  data: v3.data
                });
              });
              setImages([...waterfall]);
              setReady(true);
            }
          };
          img.onerror = () => {
            --length.value;
            img.onerror = null;
            if (length.loaded >= length.value) {
              setImages([...waterfall]);
              setReady(true);
            }
            let err = new Error(
              `${v2.title} with index ${v2.id} get wrong`
            );
            console.error(err);
            console.log(decodeURIComponent(img.src));
            if (isImageBookmark(v2)) {
              compress(
                decodeURIComponent(v2.path + v2.cover),
                getBookmarkThumb(v2)
              );
            } else {
              compress(decodeURIComponent(v2.path + v2.cover)).catch(
                (err2) => {
                  console.log("compress failed");
                  props.util.removePack(v2);
                }
              );
            }
          };
        });
      }
      return () => {
        setImages([[], [], [], []]);
        setReady(false);
        length.loaded = 0;
      };
    }, [props.packs]);
    (0, import_react18.useEffect)(() => {
      if (props.util.getMode() === "ShowDirs" /* ShowDirs */ || props.util.getMode() === "InDir" /* DirContent */) {
        setInSelect(0);
      }
      document.scrollingElement.scrollTop = 0;
      if (images[0].length === 0) {
        return;
      }
      waterfallCache.saveTemp([...images]);
    }, [images, props.util, waterfallCache]);
    const totalPage = (0, import_react18.useMemo)(
      () => Math.ceil(props.total / imageCountOfSinglePage),
      [props.total]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_jsx_runtime47.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(SidebarContainer, {
          children: [
            topMenu,
            /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Menu, {
              type: "gallery"
            })
          ]
        }),
        dirMap,
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Config, {
          oldConfig: constant_default,
          type: "gallery"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Rename, {
          util: props.util
        }),
        ready ? /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(import_jsx_runtime47.Fragment, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(PageOfTotal, {
              current: totalPage > 0 ? props.page : 0,
              total: totalPage
            }),
            /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("main", {
              className: img_module_default["img-main-content"],
              children: images.map((v2) => {
                return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", {
                  className: img_module_default["img-pack"],
                  children: v2.map((ele) => {
                    if (!constant_default.r18) {
                      ele.data.title = "\u56FE\u5305" + ele.data.id.toString();
                    }
                    let Component;
                    if (isImageBookmark(ele.data)) {
                      Component = Bookmarks_default;
                    } else if (isImageDir(ele.data)) {
                      Component = ImageDir;
                    } else {
                      Component = NormalImg_default;
                    }
                    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Component, {
                      data: ele.data,
                      inSelect,
                      setInSelect,
                      src: ele.img.src,
                      util: props.util
                    }, index++);
                  })
                }, index++);
              })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(PageNav, {
              current: props.page,
              total: Math.ceil(props.total / 20)
            })
          ]
        }) : /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(Loading, {})
      ]
    });
  };

  // src/components/Gallery/index/Gallery.tsx
  var import_jsx_runtime48 = __toESM(require_jsx_runtime());
  var Gallery = () => {
    const galleryOperator2 = (0, import_react19.useRef)(GalleryOperator.getInstance()).current;
    const [searchParam] = useSearchParams();
    const [total, setTotal] = (0, import_react19.useState)(0);
    const [packs, setPacks] = (0, import_react19.useState)([]);
    const [refresh, setRefresh] = (0, import_react19.useState)(false);
    const page = parseInt(
      searchParam.get("page") ? searchParam.get("page") : "1",
      10
    );
    (0, import_react19.useEffect)(() => {
      galleryOperator2.switchMainTable("pack_list").then(() => {
        galleryOperator2.register(setRefresh);
      });
    }, []);
    (0, import_react19.useEffect)(() => {
      galleryOperator2.savePrevPage(window.location.href);
      galleryOperator2.getPacks(page, window.location.href).then((res) => {
        galleryOperator2.titleUpdate();
        setPacks(res[0]);
        setTotal(res[1]);
      });
    }, [window.location.href, refresh]);
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", {
      className: "main-content",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(FileDrop, {
          itemType: "folder",
          operator: galleryOperator2
        }),
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(ImgContainer, {
          inDir: window.location.href.includes("/directory/"),
          packs,
          page,
          refresh: setRefresh,
          total,
          util: galleryOperator2
        })
      ]
    });
  };

  // src/components/Reader/BookContent/Reader.tsx
  var import_react23 = __toESM(require_react());

  // src/components/Reader/Buttons.tsx
  var import_react20 = __toESM(require_react());

  // src/icon/catalog.svg
  var React35 = __toESM(require_react());
  var import_jsx_runtime49 = __toESM(require_jsx_runtime());
  var SvgCatalog = (props) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("path", {
      d: "M3.71,16.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21,1,1,0,0,0-.21.33,1,1,0,0,0,.21,1.09,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1,1,0,0,0,3.71,16.29ZM7,8H21a1,1,0,0,0,0-2H7A1,1,0,0,0,7,8ZM3.71,11.29a1,1,0,0,0-1.09-.21,1.15,1.15,0,0,0-.33.21,1,1,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,1.15,1.15,0,0,0,.33-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1,1,0,0,0,3.71,11.29ZM21,11H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2ZM3.71,6.29a1,1,0,0,0-.33-.21,1,1,0,0,0-1.09.21,1.15,1.15,0,0,0-.21.33.94.94,0,0,0,0,.76,1.15,1.15,0,0,0,.21.33,1.15,1.15,0,0,0,.33.21,1,1,0,0,0,1.09-.21,1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76A1.15,1.15,0,0,0,3.71,6.29ZM21,16H7a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
    })
  });

  // src/icon/find.svg
  var React36 = __toESM(require_react());
  var import_jsx_runtime50 = __toESM(require_jsx_runtime());
  var SvgFind = (props) => /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "data-name": "Layer 1",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("path", {
      d: "M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z"
    })
  });

  // src/icon/images.svg
  var React37 = __toESM(require_react());
  var import_jsx_runtime51 = __toESM(require_jsx_runtime());
  var SvgImages = (props) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    role: "img",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("path", {
      d: "M18,15V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H15A3,3,0,0,0,18,15ZM4,5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V9.36L14.92,8.27a2.56,2.56,0,0,0-1.81-.75h0a2.58,2.58,0,0,0-1.81.75l-.91.91-.81-.81a2.93,2.93,0,0,0-4.11,0L4,9.85Zm.12,10.45A.94.94,0,0,1,4,15V12.67L6.88,9.79a.91.91,0,0,1,1.29,0L9,10.6Zm8.6-5.76a.52.52,0,0,1,.39-.17h0a.52.52,0,0,1,.39.17L16,12.18V15a1,1,0,0,1-1,1H6.4ZM21,6a1,1,0,0,0-1,1V17a3,3,0,0,1-3,3H7a1,1,0,0,0,0,2H17a5,5,0,0,0,5-5V7A1,1,0,0,0,21,6Z"
    })
  });

  // src/components/Reader/Buttons.tsx
  var import_jsx_runtime52 = __toESM(require_jsx_runtime());
  var CatalogBtn = () => {
    const [, setVis] = useController(catalogVisibleStore);
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("button", {
      className: "btn-catalog icon",
      onClick: () => {
        setVis(true);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SvgCatalog, {})
    });
  };
  var GotoGalleryBtn = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("button", {
      className: "btn-goto-gallery icon goto-btn",
      onClick: () => {
        window.location.href = "#/gallery";
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SvgImages, {})
    });
  };
  var Back2 = () => {
    const navigate = useNavigate();
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("button", {
      className: "btn-back icon",
      onClick: () => {
        navigate(-1);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SvgBack, {})
    });
  };
  var AddBookmark2 = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("button", {
      className: "add-bookmark detail-icon",
      onClick: (e2) => {
        const ele = document.querySelector("#reader-scroll-ele");
        let urlObj = parseUrlQuery(window.location.href);
        delete urlObj["undefined"];
        urlObj["scroll"] = ele.scrollTop;
        const id = readerOperator.packWillOpen().id;
        let url = `#/reader/book/${id}?` + new URLSearchParams(urlObj).toString();
        readerOperator.bookmarksUpdate({
          ...readerOperator.packWillOpen(),
          url,
          timeStamp: formatDate(new Date())
        });
        props.bookmarkToast.current(true);
        e2.target.disabled = true;
        setTimeout(() => {
          e2.target.disabled = false;
          props.bookmarkToast.current(false);
        }, 1e3);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SvgAddBookmark, {})
    });
  };
  var Find = () => {
    const [, setVis] = useController(findStore);
    const [, setCursorStore] = useController(cursorStore);
    (0, import_react20.useEffect)(() => {
      const handleKeyDown = (e2) => {
        if (e2.ctrlKey) {
          if (e2.key === "f") {
            setVis((v2) => !v2);
            setCursorStore([]);
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("button", {
      className: "btn-find icon",
      onClick: () => {
        setVis((v2) => !v2);
        setCursorStore([]);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SvgFind, {})
    });
  };

  // esbuild-scss-modules-plugin:../style/reader.module.scss
  var classes7 = { "reader": "_reader_qhd9r_1", "reader-content": "_reader-content_qhd9r_9", "readerContent": "_reader-content_qhd9r_9", "reader-content-title": "_reader-content-title_qhd9r_19", "readerContentTitle": "_reader-content-title_qhd9r_19", "reader-content-text": "_reader-content-text_qhd9r_24", "readerContentText": "_reader-content-text_qhd9r_24", "space": "_space_qhd9r_30", "scroll-content": "_scroll-content_qhd9r_35", "scrollContent": "_scroll-content_qhd9r_35", "find-dialog": "_find-dialog_qhd9r_42", "findDialog": "_find-dialog_qhd9r_42", "find-mask": "_find-mask_qhd9r_79", "findMask": "_find-mask_qhd9r_79" };
  var reader_module_default = classes7;

  // src/components/Reader/BookContent/Content.tsx
  var import_react22 = __toESM(require_react());

  // src/components/Reader/BookContent/FindDialog.tsx
  var import_react21 = __toESM(require_react());
  var import_jsx_runtime53 = __toESM(require_jsx_runtime());
  var FindMask = (props) => {
    const { storeInfo } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", {
      className: reader_module_default["find-mask"],
      style: {
        top: storeInfo.top,
        left: storeInfo.offset,
        width: storeInfo.width
      }
    });
  };
  var FindMaskContainer = () => {
    const [storeInfo] = useData(cursorStore);
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_jsx_runtime53.Fragment, {
      children: storeInfo.map((e2) => /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(FindMask, {
        storeInfo: e2
      }, `${e2.top}-${e2.offset}`))
    });
  };
  var FindDialog = (props) => {
    const [vis] = useData(findStore);
    const [searchKey, setSearchKey] = (0, import_react21.useState)("");
    const result = (0, import_react21.useRef)(
      []
    );
    const [cursor, setCursor] = (0, import_react21.useState)(-1);
    const [cursorInfo, setCursorStore] = useController(cursorStore);
    const next = (0, import_react21.useCallback)(() => {
      if (result.current.length === 0) {
        result.current = props.book.find(searchKey);
        const value = result.current;
        if (value.length > 0) {
          for (let i2 = 0; i2 < value.length; i2++) {
            if (props.book.contain(value[i2][0].index)) {
              setCursor(i2);
              break;
            }
          }
        }
      } else {
        if (cursor === result.current.length - 1) {
          return;
        }
        setCursor(cursor + 1);
      }
    }, [cursor, props.book, searchKey]);
    (0, import_react21.useEffect)(() => {
      const nextResult = (e2) => {
        if (e2.key === "Enter") {
          next();
        }
      };
      document.addEventListener("keydown", nextResult);
      return () => {
        document.removeEventListener("keydown", nextResult);
      };
    }, [next]);
    (0, import_react21.useEffect)(() => {
      if (result.current.length === 0)
        return;
      props.scrollToLine(result.current[cursor][0].index);
      let arr = [];
      for (let i2 = 0; i2 < result.current[cursor].length; i2++) {
        let value = result.current[cursor][i2];
        arr.push({
          top: value.index * lineHeight - 3,
          offset: 70 + value.offset * 16,
          width: 16 * value.length
        });
      }
      setCursorStore([...arr]);
    }, [cursor]);
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_jsx_runtime53.Fragment, {
      children: /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", {
        className: reader_module_default["find-dialog"],
        style: { display: vis ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("button", {
            onClick: () => {
              if (result.current.length === 0) {
                result.current = props.book.find(searchKey);
                const value = result.current;
                if (value.length > 0) {
                  for (let i2 = 0; i2 < value.length; i2++) {
                    if (props.book.contain(value[i2][0].index)) {
                      setCursor(i2);
                      break;
                    }
                  }
                }
              } else {
                if (cursor === 0) {
                  return;
                }
                setCursor(cursor - 1);
              }
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(SvgLeftArrow, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("input", {
            onChange: (e2) => {
              setSearchKey(e2.target.value);
              result.current = [];
            },
            value: searchKey
          }),
          /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("button", {
            onClick: next,
            children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(SvgRightArrow, {})
          })
        ]
      })
    });
  };

  // src/components/Reader/BookContent/Placeholder.tsx
  var import_jsx_runtime54 = __toESM(require_jsx_runtime());
  var Placeholder = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", {
      className: reader_module_default["space"],
      style: { height: props.height }
    });
  };

  // src/components/Reader/BookContent/Content.tsx
  var import_jsx_runtime55 = __toESM(require_jsx_runtime());
  var BookContent = (props) => {
    const article = (0, import_react22.useRef)(null);
    let [searchParams] = useSearchParams();
    const scrollTop = (0, import_react22.useRef)(0);
    let scroll = Number(searchParams.get("scroll") || "0");
    const [top, setTop] = (0, import_react22.useState)(0);
    const [bottom, setBottom] = (0, import_react22.useState)(0);
    const [start, setStart] = (0, import_react22.useState)(0);
    const [book, setBook] = (0, import_react22.useState)(null);
    const [content, setContent] = (0, import_react22.useState)([]);
    const [chapter, setChapter] = (0, import_react22.useState)(0);
    const scrollEle = (0, import_react22.useRef)(null);
    const initBottom = (0, import_react22.useMemo)(
      () => book ? (book.length - contentRange) * lineHeight : 0,
      [book]
    );
    const updateWhenDrag = (0, import_react22.useCallback)(
      (eleScrollTop) => {
        if (!book)
          return;
        let lineIndex = Math.ceil(eleScrollTop / lineHeight);
        let startLine = lineIndex - deltaLine - overflowNum > 0 ? lineIndex - deltaLine - overflowNum : 0;
        setChapter(book.updateCurrentChapter(lineIndex, "drag"));
        if (startLine + contentRange >= book.length)
          startLine = book.length - contentRange;
        let bottom2 = 0, top2 = 0;
        if (startLine > 0 && lineIndex - deltaLine - overflowNum + contentRange <= book.length) {
          bottom2 = initBottom - (eleScrollTop - (deltaLine + overflowNum) * lineHeight);
          top2 = eleScrollTop - (deltaLine + overflowNum) * lineHeight;
        } else if (startLine === 0) {
          bottom2 = initBottom;
          top2 = 0;
        } else {
          bottom2 = 0;
          top2 = initBottom;
        }
        setContent(book.getContent(startLine, startLine + contentRange));
        setStart(startLine);
        setTop(top2);
        setBottom(bottom2);
      },
      [book]
    );
    const scrollToLineNum = (0, import_react22.useCallback)(
      (lineNum) => {
        const eleScrollTop = lineNum * lineHeight;
        if (Math.abs(eleScrollTop - scrollEle.current.scrollTop) < 800)
          return;
        scrollEle.current.scrollTop = eleScrollTop;
        scrollTop.current = eleScrollTop;
        updateWhenDrag(eleScrollTop);
        scrollEle.current.scrollTop -= 400;
      },
      [updateWhenDrag]
    );
    const beforeScrollTop = (0, import_react22.useRef)(0);
    const handleOpenInExplorer = (0, import_react22.useCallback)(() => {
      if (book)
        openInExplorer(book.path);
    }, [book]);
    const handleScroll = (0, import_react22.useMemo)(() => {
      let timer;
      return (e2) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = window.setTimeout(() => {
          if (scrollEle.current && article.current) {
            e2.stopPropagation();
            let { scrollTop: eleScrollTop } = scrollEle.current;
            let direction = eleScrollTop - beforeScrollTop.current > 0 ? 1 : -1;
            beforeScrollTop.current = eleScrollTop;
            scrollTop.current = eleScrollTop;
            if (direction === 1) {
              let distance = article.current.getBoundingClientRect().bottom;
              if (start + contentRange >= book.length) {
                return;
              }
              if (distance >= 0) {
                setChapter(
                  book.updateCurrentChapter(
                    Math.ceil(eleScrollTop / lineHeight),
                    "scroll",
                    "down"
                  )
                );
              }
              if (distance < 0) {
                updateWhenDrag(eleScrollTop);
              } else if (distance < distanceToUpdate) {
                setContent(
                  book.getContent(
                    start + deltaLine,
                    start + deltaLine + contentRange
                  )
                );
                let v2 = Math.min(top + DELTA_HEIGHT, initBottom);
                setStart(start + deltaLine);
                setTop(v2);
                setBottom(initBottom - v2);
              }
            } else {
              let distance = article.current.getBoundingClientRect().top;
              if (start <= 0) {
                return;
              }
              if (distance <= 0) {
                setChapter(
                  book.updateCurrentChapter(
                    Math.ceil(eleScrollTop / lineHeight),
                    "scroll",
                    "up"
                  )
                );
              }
              if (distance > 0) {
                updateWhenDrag(eleScrollTop);
              } else if (distance > -distanceToUpdate) {
                setContent(
                  book.getContent(
                    start - deltaLine,
                    start - deltaLine + contentRange
                  )
                );
                let v2 = Math.max(top - DELTA_HEIGHT, 0);
                setStart(start - deltaLine);
                setTop(v2);
                setBottom(initBottom - v2);
              }
            }
          }
        }, 200);
      };
    }, [start, top, bottom]);
    (0, import_react22.useEffect)(() => {
      readerOperator.loadText().then((res) => {
        setBook(res);
        setContent(res.getContent(start, start + contentRange));
        setBottom((res.length - contentRange) * lineHeight);
      });
    }, []);
    (0, import_react22.useEffect)(() => {
      if (scroll) {
        scrollEle.current.scrollTop = scroll;
        scrollTop.current = scroll;
        updateWhenDrag(scrollTop.current);
      }
    }, [book]);
    (0, import_react22.useEffect)(() => {
      if (top >= 0) {
        scrollEle.current.scrollTop = scrollTop.current;
      }
    }, [top, bottom]);
    const mainContent = (0, import_react22.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Placeholder, {
            height: top
          }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("article", {
            className: reader_module_default["reader-content"],
            dangerouslySetInnerHTML: {
              __html: content.join("")
            },
            ref: article
          }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Placeholder, {
            height: bottom
          })
        ]
      });
    }, [content, top, bottom]);
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Catalog, {
          book,
          currentChapter: chapter
        }),
        props.renderMenu(handleOpenInExplorer),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", {
          className: reader_module_default["scroll-content"],
          id: "reader-scroll-ele",
          onScroll: handleScroll,
          ref: scrollEle,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(FindMaskContainer, {}),
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", {
              className: reader_module_default["find-mask"]
            }),
            mainContent
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(FindDialog, {
          book,
          scrollToLine: scrollToLineNum
        })
      ]
    });
  };

  // src/components/Reader/BookContent/Reader.tsx
  var import_jsx_runtime56 = __toESM(require_jsx_runtime());
  var Reader = () => {
    const bookmarkToast = (0, import_react23.useRef)((arg) => {
    });
    const menu = (0, import_react23.useCallback)((fn) => {
      return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(SidebarContainer, {
        children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Sidebar, {
          menuPosition: "middle",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Back2, {}),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(CatalogBtn, {}),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AddBookmark2, {
              bookmarkToast
            }),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Find, {}),
            /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(OpenInExplorerBtn, {
              handleClick: fn
            })
          ]
        })
      });
    }, []);
    (0, import_react23.useEffect)(() => {
      readerOperator.titleUpdate();
    }, [readerOperator.packWillOpen()]);
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("main", {
      className: reader_module_default["reader"] + " main-content",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Toast, {
          handler: bookmarkToast,
          message: "\u6DFB\u52A0\u4E66\u7B7E\u6210\u529F\uFF01"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(BookContent, {
          renderMenu: (fn) => menu(fn)
        })
      ]
    });
  };

  // src/components/Reader/index/Bookshelf.tsx
  var import_react26 = __toESM(require_react());

  // esbuild-scss-modules-plugin:../style/bookshelf.module.scss
  var classes8 = { "bookshelf": "_bookshelf_1tkzv_1", "bookshelf-container": "_bookshelf-container_1tkzv_4", "bookshelfContainer": "_bookshelf-container_1tkzv_4", "bookshelf-grid": "_bookshelf-grid_1tkzv_9", "bookshelfGrid": "_bookshelf-grid_1tkzv_9", "bookshelf-row": "_bookshelf-row_1tkzv_17", "bookshelfRow": "_bookshelf-row_1tkzv_17", "bookshelf-row-item": "_bookshelf-row-item_1tkzv_26", "bookshelfRowItem": "_bookshelf-row-item_1tkzv_26", "bookshelf-row-cover": "_bookshelf-row-cover_1tkzv_32", "bookshelfRowCover": "_bookshelf-row-cover_1tkzv_32", "bookshelf-row-bar": "_bookshelf-row-bar_1tkzv_45", "bookshelfRowBar": "_bookshelf-row-bar_1tkzv_45", "bookshelf-row-folder": "_bookshelf-row-folder_1tkzv_54", "bookshelfRowFolder": "_bookshelf-row-folder_1tkzv_54", "bookshelf-star-button": "_bookshelf-star-button_1tkzv_61", "bookshelfStarButton": "_bookshelf-star-button_1tkzv_61", "bookshelf-folder-button": "_bookshelf-folder-button_1tkzv_70", "bookshelfFolderButton": "_bookshelf-folder-button_1tkzv_70", "bookshelf-stared": "_bookshelf-stared_1tkzv_76", "bookshelfStared": "_bookshelf-stared_1tkzv_76", "bookshelf-bookmark": "_bookshelf-bookmark_1tkzv_79", "bookshelfBookmark": "_bookshelf-bookmark_1tkzv_79", "bookshelf-bookmark-button": "_bookshelf-bookmark-button_1tkzv_82", "bookshelfBookmarkButton": "_bookshelf-bookmark-button_1tkzv_82", "book-item-title": "_book-item-title_1tkzv_92", "bookItemTitle": "_book-item-title_1tkzv_92", "line-1": "_line-1_1tkzv_101", "line1": "_line-1_1tkzv_101", "line-2": "_line-2_1tkzv_104", "line2": "_line-2_1tkzv_104", "line-3": "_line-3_1tkzv_107", "line3": "_line-3_1tkzv_107", "check-box": "_check-box_1tkzv_111", "checkBox": "_check-box_1tkzv_111" };
  var bookshelf_module_default = classes8;

  // src/components/Reader/index/ShelfRow.tsx
  var import_react24 = __toESM(require_react());
  var import_jsx_runtime57 = __toESM(require_jsx_runtime());
  var ShelfBookTitle = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", {
      className: bookshelf_module_default["book-item-title"] + " " + bookshelf_module_default[`line-${props.index}`],
      children: props.title
    });
  };
  var ShelfItem = (props) => {
    const [stared, setStared] = (0, import_react24.useState)(props.bookItem.stared);
    const flag = (0, import_react24.useRef)({ id: null, isDown: false, holding: false });
    const up = (0, import_react24.useCallback)(
      (e2) => {
        flag.current.isDown = false;
        clearTimeout(flag.current.id);
        if (!flag.current.holding && !props.inSelect && e2.button === 0) {
          readerOperator.mountBook(props.bookItem);
          if (isBookmarkOfBook(props.bookItem)) {
            gotoHash(props.bookItem.url);
            return;
          }
          gotoHash(`#/reader/book/${props.bookItem.id}`);
        }
      },
      [props.bookItem.id, props.inSelect]
    );
    const down = (0, import_react24.useCallback)(() => {
      if (readerOperator.getMode() === "InDir" /* DirContent */) {
        return;
      }
      flag.current.isDown = true;
      flag.current.holding = false;
      flag.current.id = setTimeout(() => {
        if (flag.current.isDown && !props.inSelect) {
          props.setInSelect(1);
          flag.current.holding = true;
        }
      }, 700);
    }, [props]);
    (0, import_react24.useEffect)(() => {
      if (props.bookItem)
        setStared(props.bookItem.stared);
    }, [props.bookItem?.stared]);
    const selectHandler = (0, import_react24.useCallback)(
      (e2) => {
        readerOperator.selectionUpdate(props.bookItem.id, e2.target.checked);
      },
      [props.bookItem.id]
    );
    if (!props.bookItem) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", {
      className: bookshelf_module_default["bookshelf-row-item"],
      title: props.bookItem.title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)("div", {
          className: bookshelf_module_default["bookshelf-row-cover"] + (stared ? " " + bookshelf_module_default["bookshelf-stared"] : ""),
          onMouseDown: down,
          onMouseUp: up,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ShelfBookTitle, {
              index: 1,
              title: props.bookItem?.title.slice(0, 8)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ShelfBookTitle, {
              index: 2,
              title: props.bookItem?.title.slice(8, 16)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ShelfBookTitle, {
              index: 3,
              title: props.bookItem?.title.slice(16)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("input", {
              className: bookshelf_module_default["check-box"] + " img__checkbox",
              disabled: Boolean(props.bookItem.parent) || !props.inSelect,
              id: props.bookItem.id.toString(),
              onChange: selectHandler,
              style: {
                display: props.inSelect ? "initial" : "none"
              },
              title: Boolean(props.bookItem.parent) || !props.inSelect ? readerOperator.searchParentName(
                props.bookItem.parent
              ) : void 0,
              type: "checkbox"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("div", {
          className: bookshelf_module_default["bookshelf-row-bar"]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("button", {
          className: bookshelf_module_default["bookshelf-star-button"],
          onClick: () => {
            setStared(!stared);
            readerOperator.staredUpdate(props.bookItem);
          }
        })
      ]
    });
  };

  // src/components/Reader/index/BookFolder.tsx
  var import_jsx_runtime58 = __toESM(require_jsx_runtime());
  var ShelfBookFolder = (props) => {
    return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", {
      className: bookshelf_module_default["bookshelf-row-item"],
      title: props.bookItem.title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", {
          className: bookshelf_module_default["bookshelf-row-cover"] + " " + bookshelf_module_default["bookshelf-row-folder"],
          onClick: () => {
            window.location.href = `#/reader?directory=${props.bookItem.id}&page=1`;
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ShelfBookTitle, {
              index: 1,
              title: props.bookItem?.title.slice(0, 8)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ShelfBookTitle, {
              index: 2,
              title: props.bookItem?.title.slice(8, 16)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(ShelfBookTitle, {
              index: 3,
              title: props.bookItem?.title.slice(16)
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", {
          className: bookshelf_module_default["bookshelf-row-bar"]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("button", {
          className: bookshelf_module_default["bookshelf-folder-button"]
        })
      ]
    });
  };

  // src/components/Reader/index/BookmarkOfBook.tsx
  var import_react25 = __toESM(require_react());
  var import_jsx_runtime59 = __toESM(require_jsx_runtime());
  var ShelfBookmark = (props) => {
    const [marked, setMarked] = (0, import_react25.useState)(true);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", {
      className: bookshelf_module_default["bookshelf-row-item"],
      title: props.bookItem.title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", {
          className: bookshelf_module_default["bookshelf-row-cover"] + (marked ? " " + bookshelf_module_default["bookshelf-bookmark"] : ""),
          onClick: () => {
            readerOperator.mountBook(props.bookItem);
            gotoHash(props.bookItem.url);
            return;
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ShelfBookTitle, {
              index: 1,
              title: props.bookItem?.title.slice(0, 8)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ShelfBookTitle, {
              index: 2,
              title: props.bookItem?.title.slice(8, 16)
            }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(ShelfBookTitle, {
              index: 3,
              title: props.bookItem?.title.slice(16)
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", {
          className: bookshelf_module_default["bookshelf-row-bar"]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("button", {
          className: bookshelf_module_default["bookshelf-bookmark-button"],
          onClick: () => {
            setMarked(!marked);
            readerOperator.bookmarksUpdate(props.bookItem, !marked);
          }
        })
      ]
    });
  };

  // src/components/Reader/index/Bookshelf.tsx
  var import_jsx_runtime60 = __toESM(require_jsx_runtime());
  var Bookshelf = () => {
    const [books, setBooks] = (0, import_react26.useState)([]);
    const [total, setTotal] = (0, import_react26.useState)(0);
    const readerOperator2 = (0, import_react26.useRef)(readerOperator).current;
    const [searchParam] = useSearchParams();
    const [refresh, setRefresh] = (0, import_react26.useState)(false);
    const [inSelect, setInSelect] = (0, import_react26.useState)(0);
    const [, setDirMapVis] = useController(dirMapVisibleStore);
    const page = parseInt(
      searchParam.get("page") ? searchParam.get("page") : "1",
      10
    );
    (0, import_react26.useEffect)(() => {
      readerOperator2.switchMainTable("book_list").then(() => {
        readerOperator2.register(setRefresh);
      });
    }, []);
    (0, import_react26.useEffect)(() => {
      document.querySelector("main").scrollTop = 0;
      readerOperator2.savePrevPage(window.location.href);
      readerOperator2.getPacks(page, window.location.href).then((res) => {
        readerOperator2.titleUpdate();
        setBooks([...res[0]]);
        setTotal(res[1]);
      });
    }, [window.location.href, refresh]);
    const topMenu = (0, import_react26.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(Sidebar, {
        menuPosition: "top",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Refresh, {
            util: readerOperator2
          }),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Add, {
            util: readerOperator2
          }),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ConfigBtn, {}),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Back, {
            inSelect,
            setInSelect
          }),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(GotoGalleryBtn, {}),
          /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(SelectPacks, {
            handleClick: () => {
              if (dialogActive.active) {
                return;
              }
              dialogActive.setActive(true);
              setDirMapVis(true);
            },
            inSelect
          })
        ]
      });
    }, [inSelect]);
    const dirMap = (0, import_react26.useMemo)(() => {
      return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(DirMap, {
        setInSelect,
        util: readerOperator2
      });
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)("div", {
      className: bookshelf_module_default["bookshelf"] + " main-content",
      children: [
        dirMap,
        /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Config, {
          oldConfig: readerConfig,
          type: "reader"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(SidebarContainer, {
          children: [
            topMenu,
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(Menu, {
              type: "reader"
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(FileDrop, {
          itemType: "file",
          operator: readerOperator2
        }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("main", {
          className: bookshelf_module_default["bookshelf-container"],
          children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("div", {
            className: bookshelf_module_default["bookshelf-grid"],
            children: books.map((e2, i2) => {
              if (isBookmarkOfBook(e2)) {
                return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ShelfBookmark, {
                  bookItem: e2
                }, i2);
              } else if (isBookDir(e2)) {
                return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ShelfBookFolder, {
                  bookItem: e2
                }, i2);
              }
              return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ShelfItem, {
                bookItem: e2,
                inSelect,
                setInSelect
              }, i2);
            })
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(PageNav, {
          current: page,
          total: Math.ceil(total / 20)
        })
      ]
    });
  };

  // src/server/imgServer.ts
  var fs10 = window.require("fs");
  var http = window.require("http");
  var titles = /* @__PURE__ */ new Set();
  var replaceInvalidDirName = (str) => {
    return str.replace(/[\\/:*?"<>|]/g, "_");
  };
  var _ImgServer = class {
    server;
    isActive = false;
    taskQueue = [];
    hasTask = false;
    constructor() {
      this.server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "PUT,POST,GET,DELETE,OPTIONS"
        );
      });
    }
    static getInstance() {
      if (!this.instance) {
        this.instance = new _ImgServer();
      }
      return _ImgServer.instance;
    }
    on() {
      if (this.isActive) {
        return;
      }
      this.isActive = true;
      this.server.listen("8081", () => console.log("http://localhost:8081/"));
      this.server.on("request", (req, res) => {
        let data = this.parseRoute(req.url);
        if (data) {
          res.end(JSON.stringify(data));
        } else {
          res.end("404");
        }
        req.on("data", (postData) => {
          let { imgList, title, target } = JSON.parse(
            postData.toString()
          );
          title = replaceInvalidDirName(title);
          if (titles.has(title)) {
            console.log(`${title} \u5DF2\u83B7\u53D6`);
            return;
          }
          titles.add(title);
          this.taskQueue.push({ imgList, title, target });
          console.log(title, imgList.length, target ?? "", "\u52A0\u5165\u961F\u5217");
          if (this.taskQueue.length === 1 && !this.hasTask) {
            this.nextTask();
          }
        });
        res.end();
      });
    }
    off() {
      if (!this.isActive) {
        return;
      }
      this.isActive = false;
      console.log("close");
      this.server.close();
    }
    async getImgList(imgList, title, target) {
      console.log(title, imgList.length, target ?? "", "\u5F00\u59CB\u4E0B\u8F7D");
      this.hasTask = true;
      let dirTitle = target || title;
      let srcList = imgList;
      let index2 = 0;
      let i2 = 1;
      let path4 = downloadPath + "/" + dirTitle;
      let interval = 0;
      let o2 = {
        title: dirTitle,
        stared: 0,
        path: path4,
        cover: "/1.jpg"
      };
      try {
        if (target) {
          i2 = (fs10.readdirSync(otherPath + "/" + target)?.length ?? 0) + 1;
          o2.path = otherPath + "/" + target;
        }
      } catch (e2) {
        i2 = 1;
      }
      let id = setInterval(() => {
        if (interval >= 15) {
          interval = 0;
        } else if (interval >= 10) {
          ++interval;
          return;
        }
        ++interval;
        getImg({
          src: srcList[index2++],
          title: dirTitle,
          id: i2++,
          path: target ? otherPath : downloadPath
        });
        if (index2 >= srcList.length) {
          clearInterval(id);
          try {
            GalleryOperator.getInstance().addNewPack(o2, true);
          } catch (e2) {
            if (!target) {
              console.log(e2);
            }
          }
          console.log(title, "\u5B8C\u6210");
          this.hasTask = false;
          this.nextTask();
        }
      }, 500);
    }
    nextTask() {
      if (this.taskQueue.length === 0 || this.hasTask) {
        return;
      }
      let task = this.taskQueue.shift();
      if (!task) {
        return;
      }
      this.getImgList(task.imgList, task.title, task.target);
    }
    parseRoute(url) {
      let [uri] = url.split("?");
      const query = parseUrlQuery(url);
      switch (uri) {
        case "/length":
          return { length: this.getLength(query.path) };
        default:
          return;
      }
    }
    getLength(path4) {
      return fs10.readdirSync(path4).filter((e2) => isImgFile(e2)).length;
    }
  };
  var ImgServer = _ImgServer;
  __publicField(ImgServer, "instance");
  var isImgFile = (file) => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".gif") || file.endsWith(".jpeg");

  // src/Router.tsx
  var import_jsx_runtime61 = __toESM(require_jsx_runtime());
  var MainRouter = () => {
    (0, import_react27.useEffect)(() => {
      ImgServer.getInstance().on();
      return () => {
        ImgServer.getInstance().off();
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(HashRouter, {
      children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(Routes, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Route, {
            element: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Gallery, {}),
            path: "gallery"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Route, {
            element: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Bookshelf, {}),
            path: "reader"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Route, {
            element: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Reader, {}),
            path: "reader/book/:bookID"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Route, {
            element: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(PackDetail, {}),
            path: "gallery/pack/:pack"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Route, {
            element: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(Gallery, {}),
            index: true
          })
        ]
      })
    });
  };

  // src/index.tsx
  var import_jsx_runtime62 = __toESM(require_jsx_runtime());
  var root = (0, import_client.createRoot)(document.getElementById("root"));
  root.render(
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react28.default.StrictMode, {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Header, {}),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(MainRouter, {})
      ]
    })
  );
  reportWebVitals_default();
})();
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * React Router DOM v6.2.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router v6.2.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
