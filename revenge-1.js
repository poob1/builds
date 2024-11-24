"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/@swc/helpers/esm/_async_to_generator.js
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
  }
  function _async_to_generator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  var init_async_to_generator = __esm({
    "node_modules/@swc/helpers/esm/_async_to_generator.js"() {
    }
  });

  // libraries/utils/src/functions.ts
  function noop() {
  }
  function noopPromise() {
    return _noopPromise.apply(this, arguments);
  }
  function _noopPromise() {
    _noopPromise = _async_to_generator(function* () {
    });
    return _noopPromise.apply(this, arguments);
  }
  var objectSeal;
  var init_functions = __esm({
    "libraries/utils/src/functions.ts"() {
      "use strict";
      init_async_to_generator();
      objectSeal = Object.seal;
    }
  });

  // libraries/utils/src/library.ts
  function createLogger(name) {
    var tag = `[revenge.${name}]`;
    return {
      log: (message) => console.log(`${tag} ${message}`),
      warn: (message) => console.warn(`${tag} ${message}`),
      error: (message) => console.error(`${tag} ${message}`)
    };
  }
  var init_library = __esm({
    "libraries/utils/src/library.ts"() {
      "use strict";
    }
  });

  // libraries/debug/src/index.ts
  function timeOf(time) {
    return timestampOf(time) - PerformanceTimes.Native_RequiredIndex;
  }
  function timestampOf(time) {
    var timestamp = PerformanceTimes[time];
    if (timestamp === -1) return Number.NaN;
    return timestamp;
  }
  function recordTimestamp(time) {
    return PerformanceTimes[time] = nativePerformanceNow();
  }
  var PerformanceTimes;
  var init_src = __esm({
    "libraries/debug/src/index.ts"() {
      "use strict";
      PerformanceTimes = {
        Native_RequiredIndex: -1,
        Init_Initialize: -1,
        Modules_TriedRestoreCache: -1,
        Modules_HookedFactories: -1,
        Modules_IndexRequired: -1,
        Init_PromiseResolved: -1,
        Modules_RequiredAssets: -1,
        Plugins_CoreImported: -1,
        Storage_Initialized: -1,
        Plugins_CoreStarted: -1,
        App_RunApplicationCalled: -1,
        App_CreateElementCalled: -1,
        App_AfterRunCallbacks: -1
      };
    }
  });

  // libraries/utils/src/enums.ts
  function createBitFlagEnum(...flags) {
    var _enum = {};
    for (var i = 0; i < flags.length; i++) {
      var flag = flags[i];
      _enum[flag] = 1 << i;
    }
    return _enum;
  }
  var init_enums = __esm({
    "libraries/utils/src/enums.ts"() {
      "use strict";
    }
  });

  // libraries/modules/src/constants.ts
  var constants_exports = {};
  __export(constants_exports, {
    IndexMetroModuleId: () => IndexMetroModuleId,
    MetroCacheKey: () => MetroCacheKey,
    MetroCacheVersion: () => MetroCacheVersion,
    MetroModuleFilePathKey: () => MetroModuleFilePathKey,
    MetroModuleFlags: () => MetroModuleFlags,
    MetroModuleLookupFlags: () => MetroModuleLookupFlags,
    SafeModuleHookAmountBeforeDefer: () => SafeModuleHookAmountBeforeDefer
  });
  var MetroModuleFlags, MetroModuleLookupFlags, IndexMetroModuleId, SafeModuleHookAmountBeforeDefer, MetroCacheVersion, MetroCacheKey, MetroModuleFilePathKey;
  var init_constants = __esm({
    "libraries/modules/src/constants.ts"() {
      "use strict";
      init_enums();
      MetroModuleFlags = createBitFlagEnum("Blacklisted");
      MetroModuleLookupFlags = createBitFlagEnum("NotFound", "FullLookup");
      IndexMetroModuleId = 0;
      SafeModuleHookAmountBeforeDefer = 1500;
      MetroCacheVersion = 1;
      MetroCacheKey = "RevengeMetroCache";
      MetroModuleFilePathKey = "__moduleFilePath";
    }
  });

  // libraries/utils/src/lazy.ts
  function lazyValue(factory, opts = {}) {
    var cache2;
    var HintMap = {
      object: {},
      // biome-ignore lint/complexity/useArrowFunction: When hint is a function, we need to hint it as a function WHICH CAN HAVE A CONSTRUCTOR
      function: function _function() {
      },
      number: 0
    };
    var dummy = HintMap[opts.hint ?? "function"];
    var proxyFactory = () => cache2 ??= factory();
    var proxy = new Proxy(dummy, lazyHandler);
    factories.set(proxy, proxyFactory);
    proxyContextHolder.set(dummy, {
      factory,
      options: opts
    });
    return proxy;
  }
  function lazyDestructure(factory, opts = {}) {
    var proxiedObject = lazyValue(factory);
    return new Proxy({}, {
      get(_2, property) {
        if (property === Symbol.iterator) {
          return function* () {
            yield proxiedObject;
            yield new Proxy({}, {
              get: (_3, p) => lazyValue(() => proxiedObject[p], opts)
            });
            throw new Error("This is not a real iterator, this is likely used incorrectly");
          };
        }
        return lazyValue(() => proxiedObject[property], opts);
      }
    });
  }
  function getProxyFactory(obj) {
    return factories.get(obj);
  }
  var unconfigurable, isUnconfigurable, factories, proxyContextHolder, lazyHandler;
  var init_lazy = __esm({
    "libraries/utils/src/lazy.ts"() {
      "use strict";
      unconfigurable = /* @__PURE__ */ new Set([
        "arguments",
        "caller",
        "prototype"
      ]);
      isUnconfigurable = (key) => typeof key === "string" && unconfigurable.has(key);
      factories = /* @__PURE__ */ new WeakMap();
      proxyContextHolder = /* @__PURE__ */ new WeakMap();
      lazyHandler = {
        ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map((fnName) => {
          return [
            fnName,
            (target, ...args) => {
              var contextHolder = proxyContextHolder.get(target);
              var resolved = contextHolder?.factory();
              if (!resolved) throw new Error(`Cannot run Reflect.${fnName} on ${typeof resolved}`);
              return Reflect[fnName](resolved, ...args);
            }
          ];
        })),
        has(target, p) {
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries && p in isolatedEntries) return true;
          }
          var resolved = contextHolder?.factory();
          if (!resolved) throw new Error(`Cannot read keys of ${typeof resolved}`);
          return Reflect.has(resolved, p);
        },
        get(target, p, receiver) {
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries?.[p]) return isolatedEntries[p];
          }
          var resolved = contextHolder?.factory();
          if (!resolved) throw new Error(`Cannot read properties of ${typeof resolved} (reading '${String(p)}')`);
          return Reflect.get(resolved, p, receiver);
        },
        ownKeys: (target) => {
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved) throw new Error(`Cannot get keys of ${typeof resolved}`);
          var cacheKeys = Reflect.ownKeys(resolved);
          for (var key of unconfigurable) {
            if (!cacheKeys.includes(key)) cacheKeys.push(key);
          }
          return cacheKeys;
        },
        getOwnPropertyDescriptor: (target, p) => {
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved) throw new Error(`Trying to getOwnPropertyDescriptor of ${typeof resolved}`);
          if (isUnconfigurable(p)) return Reflect.getOwnPropertyDescriptor(target, p);
          var descriptor = Reflect.getOwnPropertyDescriptor(resolved, p);
          if (descriptor) Object.defineProperty(target, p, descriptor);
          return descriptor;
        }
      };
    }
  });

  // libraries/modules/src/native/modules.ts
  var nmp, CacheModule, FileModule, ClientInfoModule, DeviceModule, BundleUpdaterManager, ThemeModule;
  var init_modules = __esm({
    "libraries/modules/src/native/modules.ts"() {
      "use strict";
      init_lazy();
      nmp = nativeModuleProxy;
      CacheModule = lazyValue(() => nmp.NativeCacheModule ?? nmp.MMKVManager);
      FileModule = lazyValue(() => nmp.NativeFileModule ?? nmp.RTNFileManager ?? nmp.DCDFileManager);
      ClientInfoModule = lazyValue(() => nmp.NativeClientInfoModule ?? nmp.RTNClientInfoManager ?? nmp.InfoDictionaryManager);
      DeviceModule = lazyValue(() => nmp.NativeDeviceModule ?? nmp.RTNDeviceManager ?? nmp.DCDDeviceManager);
      BundleUpdaterManager = lazyValue(() => nmp.BundleUpdaterManager);
      ThemeModule = lazyValue(() => nmp.NativeThemeModule ?? nmp.RTNThemeManager ?? nmp.DCDThemeManager);
    }
  });

  // libraries/modules/src/native/index.ts
  var native_exports = {};
  __export(native_exports, {
    BundleUpdaterManager: () => BundleUpdaterManager,
    CacheModule: () => CacheModule,
    ClientInfoModule: () => ClientInfoModule,
    DeviceModule: () => DeviceModule,
    FileModule: () => FileModule,
    ThemeModule: () => ThemeModule
  });
  var init_native = __esm({
    "libraries/modules/src/native/index.ts"() {
      "use strict";
      init_modules();
    }
  });

  // libraries/utils/src/errors.ts
  function getErrorStack(e) {
    return e?.stack || String(e);
  }
  var init_errors = __esm({
    "libraries/utils/src/errors.ts"() {
      "use strict";
    }
  });

  // node_modules/@marshift/strawberry/dist/index.mjs
  function unpatch(patchedFunction, hookId, type) {
    var patch = patchedFunctions.get(patchedFunction);
    if (!patch || !patch[type].delete(hookId)) return false;
    return true;
  }
  var hook_default, getPatchFunc, patchedFunctions, unpatchAll, before, instead, after;
  var init_dist = __esm({
    "node_modules/@marshift/strawberry/dist/index.mjs"() {
      hook_default = (patchedFunc, origFunc, funcArgs, ctx, isConstruct) => {
        var patch = patchedFunctions.get(patchedFunc);
        if (!patch) {
          return isConstruct ? Reflect.construct(origFunc, funcArgs, ctx) : origFunc.apply(ctx, funcArgs);
        }
        for (var hook of patch.b.values()) {
          var maybefuncArgs = hook.call(ctx, funcArgs);
          if (Array.isArray(maybefuncArgs)) funcArgs = maybefuncArgs;
        }
        var workingRetVal = [
          ...patch.i.values()
        ].reduce(
          (prev, current) => (...args) => current.call(ctx, args, prev),
          // This calls the original function
          (...args) => isConstruct ? Reflect.construct(origFunc, args, ctx) : origFunc.apply(ctx, args)
        )(...funcArgs);
        for (var hook1 of patch.a.values()) {
          workingRetVal = hook1.call(ctx, funcArgs, workingRetVal) ?? workingRetVal;
        }
        for (var cleanup of patch.c) cleanup();
        patch.c = [];
        return workingRetVal;
      };
      getPatchFunc = (patchType) => (funcParent, funcName, callback, oneTime = false) => {
        var origFunc = funcParent[funcName];
        if (typeof origFunc !== "function") {
          throw new Error(`${String(funcName)} is not a function in ${funcParent.constructor.name}`);
        }
        var funcPatch = patchedFunctions.get(origFunc);
        if (!funcPatch) {
          funcPatch = {
            b: /* @__PURE__ */ new Map(),
            i: /* @__PURE__ */ new Map(),
            a: /* @__PURE__ */ new Map(),
            c: []
          };
          var replaceProxy = new Proxy(origFunc, {
            apply: (_2, ctx, args) => runHook(ctx, args, false),
            construct: (_2, args) => runHook(origFunc, args, true),
            get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
          });
          var runHook = (ctx, args, construct) => hook_default(replaceProxy, origFunc, args, ctx, construct);
          patchedFunctions.set(replaceProxy, funcPatch);
          if (!Reflect.defineProperty(funcParent, funcName, {
            value: replaceProxy,
            configurable: true,
            writable: true
          })) {
            funcParent[funcName] = replaceProxy;
          }
        }
        var hookId = Symbol();
        var patchedFunc = funcParent[funcName];
        var unpatchThisPatch = () => unpatch(patchedFunc, hookId, patchType);
        if (oneTime) funcPatch.c.push(unpatchThisPatch);
        funcPatch[patchType].set(hookId, callback);
        return unpatchThisPatch;
      };
      unpatchAll = () => patchedFunctions = /* @__PURE__ */ new WeakMap();
      unpatchAll();
      before = getPatchFunc("b");
      instead = getPatchFunc("i");
      after = getPatchFunc("a");
    }
  });

  // libraries/patcher/src/utils.ts
  function createExtendedPatchFunction(fn) {
    function patchFn(...args) {
      if (patcherLazyModuleSymbol in args[0]) {
        var onceModuleLoaded = args[0][patcherLazyModuleSymbol];
        var cancel = false;
        var unpatch2 = () => cancel = true;
        onceModuleLoaded((target) => {
          if (cancel) return;
          args[0] = target;
          unpatch2 = fn.apply(this, args);
        });
        return unpatch2;
      }
      return fn.apply(this, args);
    }
    function promisePatchFn(...args) {
      var thenable = args[0];
      if (!thenable || !("then" in thenable)) throw new Error("Cannot await a non-thenable object");
      var cancel = false;
      var unpatch2 = () => cancel = true;
      thenable.then((target) => {
        if (cancel) return;
        args[0] = target;
        unpatch2 = patchFn.apply(this, args);
      });
      return unpatch2;
    }
    return Object.assign(patchFn, {
      await: promisePatchFn
    });
  }
  function trapFunctionCallsRecursive(func, onBeforeCall, onReturn) {
    return new Proxy(func, {
      apply(target, thisArg, args) {
        var ret = target.apply(thisArg, onBeforeCall(args));
        return onReturn(ret);
      },
      get(target, prop) {
        var maybeFunc = Reflect.get(target, prop);
        if (typeof maybeFunc !== "function") return maybeFunc;
        return trapFunctionCallsRecursive(maybeFunc, onBeforeCall, onReturn);
      }
    });
  }
  var init_utils = __esm({
    "libraries/patcher/src/utils.ts"() {
      "use strict";
      init_src2();
    }
  });

  // libraries/patcher/src/index.ts
  function createPatcherInstance(name) {
    if (patcherInstances.has(name)) throw new Error(`Patcher instance with the name "${name}" already exists`);
    var unpatches = /* @__PURE__ */ new Set();
    var cleanups = /* @__PURE__ */ new WeakMap();
    patcherInstances.set(name, unpatches);
    var onBeforeCall = (_args) => {
      var args = _args;
      var debugKey = args[3] ?? "[NO_DEBUG_KEY]";
      var callback = args[2];
      args[2] = function patchedCallback(patchArgs, origOrRval) {
        if (__DEV__) console.debug(`Patch ${name}:${debugKey} is intercepting`);
        try {
          return callback.apply(this, [
            patchArgs,
            origOrRval
          ]);
        } catch (e) {
          console.error(`Patch ${name}:${debugKey} threw an error: ${e}`);
          throw new Error(`Patch ${name}:${debugKey} threw an error: ${e}`, {
            cause: e
          });
        }
      };
      args[3] = void 0;
      Object.defineProperty(args[2], "name", {
        value: `revenge.patcher.patch:${name}:${debugKey}`,
        writable: false
      });
      return args;
    };
    var onReturn = (ret) => {
      unpatches.add(ret);
      return () => {
        ret();
        unpatches.delete(ret);
      };
    };
    return {
      after: trapFunctionCallsRecursive(_after, onBeforeCall, onReturn),
      before: trapFunctionCallsRecursive(_before, onBeforeCall, onReturn),
      instead: trapFunctionCallsRecursive(_instead, onBeforeCall, onReturn),
      /**
       * Unpatches all patches created by this instance
       */
      unpatchAll() {
        for (var unpatch2 of unpatches) {
          unpatch2();
          var clups = cleanups.get(unpatch2);
          if (clups) for (var cleanup of clups) cleanup();
        }
      },
      /**
       * Destroys this instance, and unreserves the name
       */
      destroy() {
        this.unpatchAll();
        if (!patcherInstances.delete(name)) console.warn(`Patcher instance with the name "${name}" was not found, and cannot be deleted`);
      },
      /**
       * Whether this instance has been destroyed
       */
      get destroyed() {
        return !patcherInstances.has(name);
      },
      /**
       * The total number of patches created by this instance
       */
      get totalPatches() {
        return unpatches.size;
      }
    };
  }
  var patcherLazyModuleSymbol, patcherInstances, _after, _before, _instead;
  var init_src2 = __esm({
    "libraries/patcher/src/index.ts"() {
      "use strict";
      init_dist();
      init_utils();
      patcherLazyModuleSymbol = Symbol.for("revenge.patcher.lazyModule");
      patcherInstances = /* @__PURE__ */ new Map();
      _after = createExtendedPatchFunction(after);
      _before = createExtendedPatchFunction(before);
      _instead = createExtendedPatchFunction(instead);
    }
  });

  // libraries/modules/src/shared.ts
  var patcher, logger;
  var init_shared = __esm({
    "libraries/modules/src/shared.ts"() {
      "use strict";
      init_src2();
      init_library();
      patcher = createPatcherInstance("revenge.library.modules");
      logger = createLogger("modules");
    }
  });

  // libraries/modules/src/utils/lazy.ts
  function subscribeModuleLazy(proxy, callback) {
    var info = getLazyContext(proxy);
    if (!info) throw new Error("No lazy module attached to this proxy");
    var moduleId = info?.getModuleId();
    if (!moduleId) throw new Error(`Lazy module has no module ID attached, check if your filter matches any modules: ${info.filter.key}`);
    return subscribeModule(moduleId, () => callback(find.eager(info.filter)));
  }
  function getLazyContext(proxy) {
    return lazyContexts.get(proxy);
  }
  function createLazyModule(filter) {
    var moduleIds = indexedModuleIdsForLookup(filter.key);
    var moduleId;
    var cachedValue;
    var context = {
      filter,
      getModuleId: () => moduleId,
      getExports(cb) {
        for (var id of moduleIds) {
          moduleId = id;
          if (getMetroModules()[moduleId]?.isInitialized) {
            if (!cachedValue && !this.forceLoad()) {
              delete cache.lookupFlags[filter.key]?.[moduleId];
              continue;
            }
            cb(cachedValue);
            return noop;
          }
          return this.subscribe(cb);
        }
        if (cachedValue || this.forceLoad()) {
          cb(cachedValue);
          return noop;
        }
        moduleId = void 0;
        return noop;
      },
      subscribe(cb) {
        return subscribeModuleLazy(proxy, cb);
      },
      get cache() {
        return cachedValue;
      },
      forceLoad() {
        cachedValue ??= find.eager(filter);
        return cachedValue;
      }
    };
    var proxy = lazyValue(() => context.forceLoad(), {
      exemptedEntries: {
        [lazyContextSymbol]: context,
        [patcherLazyModuleSymbol]: (cb) => context.getExports(cb)
      }
    });
    lazyContexts.set(proxy, context);
    return proxy;
  }
  var lazyContextSymbol, lazyContexts;
  var init_lazy2 = __esm({
    "libraries/modules/src/utils/lazy.ts"() {
      "use strict";
      init_src2();
      init_functions();
      init_lazy();
      init_finders();
      init_metro();
      init_caches();
      lazyContextSymbol = Symbol.for("revenge.modules.lazyContext");
      lazyContexts = /* @__PURE__ */ new WeakMap();
    }
  });

  // libraries/modules/src/finders.ts
  var finders_exports = {};
  __export(finders_exports, {
    find: () => find,
    findByDisplayName: () => findByDisplayName,
    findByFilePath: () => findByFilePath,
    findByName: () => findByName,
    findByProps: () => findByProps,
    findByQuery: () => findByQuery,
    findBySingleProp: () => findBySingleProp,
    findByStoreName: () => findByStoreName,
    findByTypeName: () => findByTypeName,
    findId: () => findId,
    findProp: () => findProp
  });
  function filterExports(moduleExports, moduleId, filter) {
    if (moduleExports.default && moduleExports.__esModule && filter(moduleExports.default, moduleId, true)) {
      return {
        exports: filter.raw ? moduleExports : moduleExports.default,
        isDefaultExport: !filter.raw
      };
    }
    if (!filter.raw && filter(moduleExports, moduleId, false)) {
      return {
        exports: moduleExports,
        isDefaultExport: false
      };
    }
    return {};
  }
  var findId, find, findByProps, findByName, findByDisplayName, findByTypeName, findByStoreName, findByFilePath, findProp, findBySingleProp, findByQuery;
  var init_finders = __esm({
    "libraries/modules/src/finders.ts"() {
      "use strict";
      init_lazy();
      init_filters2();
      init_metro();
      init_lazy2();
      findId = Object.assign(function findModuleId(filter) {
        var { cache: cache2, finish } = cacherFor(filter.key);
        for (var [id, moduleExports] of modulesForFinder(filter.key)) {
          var { exports, isDefaultExport } = filterExports(moduleExports, id, filter);
          if (typeof exports !== "undefined") {
            cache2(id, exports);
            finish(false);
            return [
              id,
              isDefaultExport
            ];
          }
        }
        finish(true);
        return [];
      }, {
        /**
             * Yields all modules where filter returns a truthy value.
             * @param filter The filter to match
             * @returns A generator that yields an array containing the module ID and whether the export is the default export
             */
        all: function* findModuleIdAll(filter) {
          var { cache: cache2, finish } = cacherFor(filter.key);
          var found = false;
          for (var [id, moduleExports] of modulesForFinder(filter.key, true)) {
            var { exports, isDefaultExport } = filterExports(moduleExports, id, filter);
            if (typeof exports !== "undefined") {
              cache2(id, exports);
              found = true;
              yield [
                id,
                isDefaultExport
              ];
            }
          }
          finish(found, true);
        }
      });
      find = Object.assign(function findModule(filter) {
        return createLazyModule(filter);
      }, {
        /**
             * Returns all exports where filter returns a truthy value.
             * @param filter The filter to match
             * @returns An array of exports
             */
        all: function* findModuleAll(filter) {
          for (var [id, isDefaultExport] of findId.all(filter)) {
            if (typeof id === "number") yield isDefaultExport ? requireModule(id).default : requireModule(id);
          }
        },
        eager: function findModuleEager(filter) {
          var [id, defaultExport] = findId(filter);
          if (typeof id === "number") return defaultExport ? requireModule(id).default : requireModule(id);
        }
      });
      findByProps = Object.assign(function findByPropsLazy(prop, ...props) {
        return find(byProps(prop, ...props));
      }, {
        async: function findByPropsAsync(prop, ...propsAndOrTimeout) {
          var cloned = [
            ...propsAndOrTimeout
          ];
          var timeout = typeof cloned[cloned.length - 1] === "number" ? cloned.pop() : 1e3;
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByProps(prop, ...cloned)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByPropsEager(prop, ...props) {
          return find.eager(byProps(prop, ...props));
        },
        /**
             * Yield all exports with specified properties
             *
             * - Filter: `m[prop] && props.every(p => m[p])`
             * - Returns: `m`
             *
             * @param prop The property to search for
             * @param props Additional properties to search for
             * @returns The module exports
             */
        all: function findByPropsAll(prop, ...props) {
          return find.all(byProps(prop, ...props));
        }
      });
      findByName = Object.assign(function findByNameLazy(name, returnDefaultExport = true) {
        return find(returnDefaultExport ? byName(name) : byName.raw(name));
      }, {
        async: function findByNameAsync(name, returnDefaultExport = true, timeout = 1e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByName(name, returnDefaultExport)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByNameEager(name, returnDefaultExport = true) {
          return find.eager(returnDefaultExport ? byName(name) : byName.raw(name));
        },
        /**
             * Yields all exports with matching name
             *
             * - Filter: `m.name === name`
             * - Yields: `m`, or `{ default: m }` if `returnDefaultExport` is `false`
             *
             * @param name The name to search for
             * @param returnDefaultExport Whether to return the default export instead of the whole module
             * @returns The module exports
             */
        all: function findByNameAll(name, returnDefaultExport = true) {
          return find.all(returnDefaultExport ? byName(name) : byName.raw(name));
        }
      });
      findByDisplayName = Object.assign(function findByDisplayNameLazy(name, returnDefaultExport = true) {
        return find(returnDefaultExport ? byDisplayName(name) : byDisplayName.raw(name));
      }, {
        async: function findByDisplayNameAsync(name, returnDefaultExport = true, timeout = 1e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByDisplayName(name, returnDefaultExport)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByDisplayNameEager(name, returnDefaultExport = true) {
          return find.eager(returnDefaultExport ? byDisplayName(name) : byDisplayName.raw(name));
        },
        /**
             * Yields all exports with matching display name
             *
             * - Filter: `m.displayName === name`
             * - Yields: `m`, or `{ default: m }` if `returnDefaultExport` is `false`
             *
             * @param name The display name to search for
             * @param returnDefaultExport Whether to return the default export instead of the whole module
             * @returns The module exports
             */
        all: function findByDisplayNameAll(name, returnDefaultExport = true) {
          return find.all(returnDefaultExport ? byDisplayName(name) : byDisplayName.raw(name));
        }
      });
      findByTypeName = Object.assign(function findByTypeNameLazy(name, returnDefaultExport = true) {
        return find(returnDefaultExport ? byTypeName(name) : byTypeName.raw(name));
      }, {
        async: function findByTypeNameAsync(name, returnDefaultExport = true, timeout = 1e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByTypeName(name, returnDefaultExport)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByTypeNameEager(name, returnDefaultExport = true) {
          return find.eager(returnDefaultExport ? byTypeName(name) : byTypeName.raw(name));
        },
        /**
             * Yields all exports by its type name (`x.type.name`)
             *
             * - Filter: `m.type.name === name`
             * - Returns: `m`, or `{ default: m }` if `returnDefaultExport` is `false`
             *
             * @param name The type name to search for
             * @param returnDefaultExport Whether to return the default export instead of the whole module
             * @returns The module exports
             */
        all: function findByTypeNameAll(name, returnDefaultExport = true) {
          return find.all(returnDefaultExport ? byTypeName(name) : byTypeName.raw(name));
        }
      });
      findByStoreName = Object.assign(function findByStoreNameLazy(name) {
        return find(byStoreName(name));
      }, {
        async: function findByStoreNameAsync(name, timeout = 5e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByStoreName(name)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByStoreNameEager(name) {
          return find.eager(byStoreName(name));
        }
      });
      findByFilePath = Object.assign(function findByFilePathLazy(path, returnDefaultExport = true) {
        return find(byFilePath(path, returnDefaultExport));
      }, {
        async: function findByFilePathAsync(path, returnDefaultExport = true, timeout = 1e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findByFilePath(path, returnDefaultExport)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findByFilePathEager(path, returnDefaultExport = true) {
          return find.eager(byFilePath(path, returnDefaultExport));
        }
      });
      findProp = Object.assign(function findPropLazy(prop, ...filterProps) {
        return lazyValue(() => findByProps(prop, ...filterProps)?.[prop]);
      }, {
        async: function findPropAsync(prop, ...filterPropsAndOrTimeout) {
          return findByProps.async(prop, ...filterPropsAndOrTimeout).then((exports) => exports?.[prop]);
        },
        eager: function findPropEager(prop, ...filterProps) {
          return findByProps.eager(prop, ...filterProps)?.[prop];
        }
      });
      findBySingleProp = Object.assign(function findBySinglePropLazy(name, returnDefaultExport = true) {
        return find(returnDefaultExport ? bySingleProp(name) : bySingleProp.raw(name));
      }, {
        async: function findBySinglePropAsync(name, returnDefaultExport = true, timeout = 1e3) {
          return new Promise((resolve) => {
            var id = setTimeout(() => resolve(void 0), timeout);
            findBySingleProp(name, returnDefaultExport)[lazyContextSymbol].getExports((exp) => {
              clearTimeout(id);
              resolve(exp);
            });
          });
        },
        eager: function findBySinglePropEager(name, returnDefaultExport = true) {
          return find.eager(returnDefaultExport ? bySingleProp(name) : bySingleProp.raw(name));
        }
      });
      findByQuery = Object.assign(function findByQueryLazy() {
        throw new Error("Lazy finding for byQuery(...) is not supported, use findByQuery.eager(...) instead");
      }, {
        eager: function findByQueryEager(query, caseSensitive = false) {
          return find(byQuery(query, caseSensitive));
        },
        /**
             * Yields all exports that match a query string **(very expensive, only use for debugging)**
             * @param query The query string to search for
             * @param caseSensitive Whether the search should be case-sensitive
             * @returns All module exports
             */
        all: function findByQueryAll(query, caseSensitive = false) {
          return find.all(byQuery(query, caseSensitive));
        }
      });
    }
  });

  // libraries/modules/src/metro/caches.ts
  function restoreCache() {
    return _restoreCache.apply(this, arguments);
  }
  function _restoreCache() {
    _restoreCache = _async_to_generator(function* () {
      logger.log("Attempting to restore cache...");
      resolveModuleDependencies(getMetroModules(), IndexMetroModuleId);
      var savedCache = yield CacheModule.getItem(MetroCacheKey);
      if (!savedCache) return false;
      var storedCache = JSON.parse(savedCache);
      logger.log(`Cache found, validating... (compare: ${storedCache.v} === ${MetroCacheVersion}, ${storedCache.b} === ${ClientInfoModule.Build}, ${storedCache.t} === ${dependencies.size})`);
      if (storedCache.v !== MetroCacheVersion || storedCache.b !== ClientInfoModule.Build || storedCache.t !== dependencies.size) return false;
      logger.log(`Restoring cache of ${dependencies.size} modules`);
      cache.totalModules = storedCache.t;
      cache.exportsFlags = storedCache.e;
      cache.lookupFlags = storedCache.l;
      cache.assetModules = storedCache.a;
      return true;
    });
    return _restoreCache.apply(this, arguments);
  }
  function requireAssetModules() {
    var [assetsRegistryModuleId] = findId(byProps("registerAsset"));
    if (!assetsRegistryModuleId) return void logger.warn("Unable to create asset cache, cannot find assets-registry module ID, some assets may not load");
    var assetsRegistryExporterModuleId = 0;
    for (var id of dependencies) {
      var module = modules[id];
      if (!module?.dependencyMap) continue;
      if (module.dependencyMap.length === 1 && module.dependencyMap[0] === assetsRegistryModuleId) {
        assetsRegistryExporterModuleId = id;
        break;
      }
    }
    if (!assetsRegistryExporterModuleId) return void logger.warn("Unable to create asset cache, cannot find assets-registry exporter module ID, some assets may not load");
    logger.log("Importing all assets modules...");
    for (var id1 of dependencies) {
      var module1 = modules[id1];
      if (!module1?.dependencyMap) continue;
      if (module1.dependencyMap.length === 1 && module1.dependencyMap[0] === assetsRegistryExporterModuleId) requireModule(id1);
    }
  }
  function saveCache() {
    if (saveCacheDebounceTimeoutId) clearTimeout(saveCacheDebounceTimeoutId);
    saveCacheDebounceTimeoutId = setTimeout(() => {
      CacheModule.setItem(MetroCacheKey, JSON.stringify({
        v: MetroCacheVersion,
        b: ClientInfoModule.Build,
        t: cache.totalModules,
        e: cache.exportsFlags,
        l: cache.lookupFlags,
        a: cache.assetModules,
        p: cache.patchableModules
      }));
      logger.log(`Cache saved (${cache.totalModules} modules)`);
    }, 1e3);
  }
  function invalidateCache() {
    CacheModule.removeItem(MetroCacheKey);
    logger.warn("Cache invalidated");
  }
  function cacherFor(key) {
    var registry = cache.lookupFlags[key] ??= {};
    var invalidated = false;
    return {
      cache: (id, exports) => {
        registry[id] ??= (invalidated = true, 0);
        if (isModuleExportsBad(exports)) {
          blacklistModule(id);
          invalidated = true;
          if (id in registry) delete registry[id];
        }
      },
      finish: (notFound, fullLookup = false) => {
        registry.flags ??= 0;
        if (notFound) registry.flags |= MetroModuleLookupFlags.NotFound;
        if (fullLookup) registry.flags |= MetroModuleLookupFlags.FullLookup;
        if (invalidated) saveCache();
      }
    };
  }
  function cacheModuleAsBlacklisted(id) {
    cache.exportsFlags[id] |= MetroModuleFlags.Blacklisted;
  }
  function cacheAsset(name, index, moduleId) {
    cache.assets[name] = index;
    cache.assetModules[name] = moduleId;
    saveCache();
  }
  function* indexedModuleIdsForLookup(key) {
    var modulesMap = cache.lookupFlags[key];
    if (!modulesMap) return void 0;
    for (var k in modulesMap) {
      if (k !== "flags") yield Number(k);
    }
  }
  var cache, saveCacheDebounceTimeoutId;
  var init_caches = __esm({
    "libraries/modules/src/metro/caches.ts"() {
      "use strict";
      init_async_to_generator();
      init_constants();
      init_filters2();
      init_finders();
      init_native();
      init_shared();
      init_metro();
      cache = {
        /**
         * Flags for each module's exports
         * @see {@link MetroModuleFlags}
         */
        exportsFlags: {},
        /**
         * Lookup registry for each filters, the key being the filter key, and the value being the registry
         * @see {@link MetroLookupCacheRegistry}
         * @see {@link MetroModuleLookupFlags}
         */
        lookupFlags: {},
        /**
         * Registry for assets, the key being the name, and the value being the asset index
         * #### This is in-memory.
         */
        assets: {},
        /**
         * Registry for assets modules, the key being the name, and the value being the module ID of the module that registers the asset
         */
        assetModules: {},
        /**
         * Registry for patchable modules, the key being the patch, and the value being the module ID of the module to patch
         *
         * - `f`: File path tracking
         * - `r`: Fix native component registry duplicate register
         * - `b`: Blacklist freezing module
         * - `d`: Block Discord analytics
         * - `s`: Block Sentry initialization
         */
        patchableModules: {},
        /**
         * The total modules count
         */
        totalModules: 0
      };
    }
  });

  // libraries/modules/src/metro/patches.ts
  function initializeModulePatches(patcher5, logger3, metroModules) {
    subscribePatchableModule("f", (exports) => exports.fileFinishedImporting, (exports) => {
      patcher5.before(exports, "fileFinishedImporting", ([filePath]) => {
        var importingModuleId2 = getImportingModuleId();
        if (importingModuleId2 === -1 || !filePath) return;
        metroModules[importingModuleId2][MetroModuleFilePathKey] = filePath;
      }, "trackFilePath");
    });
    subscribePatchableModule("r", (exports) => [
      "customBubblingEventTypes",
      "customDirectEventTypes",
      "register",
      "get"
    ].every((x2) => exports[x2]), (exports) => {
      patcher5.instead(exports, "register", (args, origFunc) => {
        try {
          return origFunc(...args);
        } catch (e) {
        }
      }, "fixNativeComponentRegistryDuplicateRegister");
    });
    subscribePatchableModule("b", (exports, id) => {
      return exports.default?.reactProfilingEnabled && !metroModules[id + 1]?.publicModule.exports.default;
    }, (_2, id) => {
      if (!isModuleBlacklisted(id + 1)) {
        blacklistModule(id + 1);
        logger3.log(`Blacklisted module ${id + 1} as it causes freeze when initialized`);
      }
    });
    subscribePatchableModule("s", (m2) => m2.initSentry, (m2) => m2.initSentry = noop);
    subscribePatchableModule("d", (m2) => m2.default?.track && m2.default.trackMaker, (m2) => m2.default.track = () => noopPromise);
  }
  function subscribePatchableModule(patchId, filter, patch) {
    var cachedId = cache.patchableModules[patchId];
    var unsub = cachedId ? subscribeModule(cachedId, (exports) => {
      unsub();
      patch(exports, cachedId);
    }) : subscribeModule.all((id, exports) => {
      if (!filter(exports, id)) return;
      unsub();
      cache.patchableModules[patchId] = id;
      patch(exports, id);
    });
  }
  var init_patches = __esm({
    "libraries/modules/src/metro/patches.ts"() {
      "use strict";
      init_constants();
      init_metro();
      init_functions();
    }
  });

  // libraries/modules/src/metro/index.ts
  var metro_exports = {};
  __export(metro_exports, {
    blacklistModule: () => blacklistModule,
    cache: () => cache,
    cacheAsset: () => cacheAsset,
    cacheModuleAsBlacklisted: () => cacheModuleAsBlacklisted,
    cacherFor: () => cacherFor,
    dependencies: () => dependencies,
    getImportingModuleId: () => getImportingModuleId,
    getMetroModules: () => getMetroModules,
    indexedModuleIdsForLookup: () => indexedModuleIdsForLookup,
    initializeModules: () => initializeModules,
    invalidateCache: () => invalidateCache,
    isModuleBlacklisted: () => isModuleBlacklisted,
    isModuleExportsBad: () => isModuleExportsBad,
    modulesForFinder: () => modulesForFinder,
    requireModule: () => requireModule,
    resolveModuleDependencies: () => resolveModuleDependencies,
    subscribeModule: () => subscribeModule
  });
  function getMetroModules() {
    return globalThis.modules;
  }
  function getImportingModuleId() {
    return importingModuleId;
  }
  function resolveModuleDependencies(modules2, id) {
    var metroModule = modules2[id];
    if (!metroModule) return void metroDependencies.delete(id);
    if (!metroModule.dependencyMap || resolvedModules.has(id)) return;
    resolvedModules.add(id);
    for (var depId of metroModule.dependencyMap) {
      metroDependencies.add(depId);
      resolveModuleDependencies(modules2, depId);
    }
  }
  function tryHookModule(id, metroModule) {
    if (isModuleBlacklisted(id)) return;
    if (metroModule.factory) {
      var unpatch2 = patcher.instead(metroModule, "factory", (args, origFunc) => {
        var originalImportingId = importingModuleId;
        importingModuleId = id;
        var { 1: metroRequire, 4: moduleObject } = args;
        args[2] = (id2) => {
          var exps = metroRequire(id2);
          return exps?.__esModule ? exps.default : exps;
        };
        args[3] = (id2) => {
          var exps = metroRequire(id2);
          if (exps?.__esModule) return exps;
          return {
            default: exps,
            ...exps
          };
        };
        try {
          origFunc(...args);
        } catch (error) {
          logger.log(`Blacklisted module ${id} because it could not be initialized: ${error}`);
          unpatch2();
          blacklistModule(id);
        }
        if (isModuleExportsBad(moduleObject.exports)) blacklistModule(id);
        else {
          var subs = subscriptions.get(id);
          if (subs) for (var sub of subs) sub(id, moduleObject.exports);
          for (var sub1 of allSubscriptionSet) sub1(id, moduleObject.exports);
        }
        importingModuleId = originalImportingId;
      }, "moduleFactory");
    }
  }
  function initializeModules() {
    return _initializeModules.apply(this, arguments);
  }
  function _initializeModules() {
    _initializeModules = _async_to_generator(function* () {
      var metroModules = getMetroModules();
      if (metroModules[IndexMetroModuleId]?.isInitialized) throw new Error("Metro modules has already been initialized");
      var cacheRestoredPromise = restoreCache().then((result) => {
        recordTimestamp("Modules_TriedRestoreCache");
        return result;
      });
      initializeModulePatches(patcher, logger, metroModules);
      var moduleIds = [
        ...metroDependencies
      ];
      var lastHookedIndex = 0;
      for (; lastHookedIndex < Math.min(moduleIds.length, SafeModuleHookAmountBeforeDefer); lastHookedIndex++) {
        var id = moduleIds[lastHookedIndex];
        var metroModule = metroModules[id];
        tryHookModule(id, metroModule);
      }
      logger.log("Importing index module...");
      __r(IndexMetroModuleId);
      recordTimestamp("Modules_IndexRequired");
      setImmediate(() => {
        for (; lastHookedIndex < moduleIds.length; lastHookedIndex++) {
          var id2 = moduleIds[lastHookedIndex];
          var metroModule2 = metroModules[id2];
          tryHookModule(id2, metroModule2);
        }
        recordTimestamp("Modules_HookedFactories");
      });
      if (!(yield cacheRestoredPromise)) {
        var unpatch2 = patcher.before(ReactNative.AppRegistry, "runApplication", () => {
          unpatch2();
          requireAssetModules();
          recordTimestamp("Modules_RequiredAssets");
        }, "createAssetCache");
      }
      cache.totalModules = metroDependencies.size;
      saveCache();
    });
    return _initializeModules.apply(this, arguments);
  }
  function blacklistModule(id) {
    Object.defineProperty(getMetroModules(), id, {
      enumerable: false
    });
    cacheModuleAsBlacklisted(id);
    saveCache();
  }
  function requireModule(id) {
    var metroModules = getMetroModules();
    if (isModuleBlacklisted(id)) return;
    var metroModule = metroModules[id];
    if (metroModule?.isInitialized && !metroModule.hasError) return __r(id);
    var ogHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler((err, isFatal) => {
      logger.error(`Blacklisting module ${id} because it could not be imported (fatal = ${isFatal}): ${err} `);
      blacklistModule(id);
    });
    var originalImportingId = id;
    var moduleExports;
    try {
      importingModuleId = id;
      moduleExports = __r(id);
    } catch (error) {
      logger.error(`Blacklisting module ${id} because it could not be imported: ${error}`);
      blacklistModule(id);
    } finally {
      importingModuleId = originalImportingId;
      ErrorUtils.setGlobalHandler(ogHandler);
    }
    return moduleExports;
  }
  function isModuleBlacklisted(id) {
    if (!(id in cache.exportsFlags)) return 0;
    return cache.exportsFlags[id] & MetroModuleFlags.Blacklisted;
  }
  function* modulesForFinder(key, fullLookup = false) {
    var lookupCache = cache.lookupFlags[key];
    if (lookupCache?.flags && // Check if any modules were found
    !(lookupCache.flags & MetroModuleLookupFlags.NotFound) && // Pass immediately if it's not a full lookup, otherwise check if it's a full lookup
    (!fullLookup || lookupCache.flags & MetroModuleLookupFlags.FullLookup)) for (var id in indexedModuleIdsForLookup(key)) {
      if (isModuleBlacklisted(id)) continue;
      yield [
        id,
        requireModule(Number(id))
      ];
    }
    else {
      for (var id1 of metroDependencies) {
        var mid = Number(id1);
        if (isModuleBlacklisted(mid)) continue;
        var exports = requireModule(mid);
        if (isModuleExportsBad(exports)) {
          blacklistModule(id1);
          continue;
        }
        yield [
          mid,
          exports
        ];
      }
    }
  }
  function isModuleExportsBad(exports) {
    return !exports || exports === globalThis || exports[""] === null || exports.__proto__ === Object.prototype && Reflect.ownKeys(exports).length === 0;
  }
  var importingModuleId, subscriptions, allSubscriptionSet, metroDependencies, dependencies, resolvedModules, subscribeModule;
  var init_metro = __esm({
    "libraries/modules/src/metro/index.ts"() {
      "use strict";
      init_async_to_generator();
      init_src();
      init_constants();
      init_shared();
      init_caches();
      init_patches();
      init_caches();
      importingModuleId = -1;
      subscriptions = /* @__PURE__ */ new Map();
      allSubscriptionSet = /* @__PURE__ */ new Set();
      subscriptions.set("all", allSubscriptionSet);
      metroDependencies = /* @__PURE__ */ new Set();
      dependencies = metroDependencies;
      resolvedModules = /* @__PURE__ */ new Set();
      subscribeModule = Object.assign(function subscribeModule2(id, callback) {
        if (!subscriptions.has(id)) subscriptions.set(id, /* @__PURE__ */ new Set());
        var set = subscriptions.get(id);
        set.add(callback);
        return () => set.delete(callback);
      }, {
        /**
             * Subscribes to a module once, calling the callback when the module is required
             * @param id The module ID
             * @param callback The callback to call when the module is required
             * @returns A function to unsubscribe
             */
        once: function subscribeModuleOnce(id, callback) {
          var unsub = subscribeModule(id, (...args) => {
            unsub();
            callback(...args);
          });
          return unsub;
        }
      }, {
        /**
             * Subscribes to all modules, calling the callback when any modules are required
             * @param callback The callback to call when any modules are required
             * @returns A function to unsubscribe
             */
        all: function subscribeModuleAll(callback) {
          allSubscriptionSet.add(callback);
          return () => allSubscriptionSet.delete(callback);
        }
      });
    }
  });

  // libraries/modules/src/utils/filters.ts
  function createFilter(predicate, keyFor) {
    var createHolder = (func, args, raw) => {
      return Object.assign(func, {
        filter: predicate,
        raw,
        key: `${raw ? "raw:" : ""}${keyFor(args)}`
      });
    };
    var curry = (raw) => (...args) => {
      return createHolder((m2, id, raw2) => predicate(args, m2, id, raw2), args, raw);
    };
    return Object.assign(curry(false), {
      raw: curry(true),
      keyFor
    });
  }
  function createSimpleFilter(predicate, key) {
    return createFilter((_2, m2) => predicate(m2), () => `dyn:${key}`)();
  }
  var init_filters = __esm({
    "libraries/modules/src/utils/filters.ts"() {
      "use strict";
    }
  });

  // libraries/modules/src/filters.ts
  var filters_exports = {};
  __export(filters_exports, {
    byDisplayName: () => byDisplayName,
    byFilePath: () => byFilePath,
    byMutableProp: () => byMutableProp,
    byName: () => byName,
    byProps: () => byProps,
    byQuery: () => byQuery,
    bySingleProp: () => bySingleProp,
    byStoreName: () => byStoreName,
    byTypeName: () => byTypeName,
    createFilter: () => createFilter,
    createSimpleFilter: () => createSimpleFilter
  });
  var byProps, byMutableProp, byName, byDisplayName, byTypeName, byStoreName, byFilePath, bySingleProp, byQuery;
  var init_filters2 = __esm({
    "libraries/modules/src/filters.ts"() {
      "use strict";
      init_constants();
      init_metro();
      init_filters();
      init_filters();
      byProps = createFilter((props, m2) => props.length === 0 ? m2[props[0]] : props.every((p) => m2[p]), (props) => `revenge.props(${props.join(",")})`);
      byMutableProp = createFilter(([prop], m2) => m2?.[prop] && !Object.getOwnPropertyDescriptor(m2, prop)?.get, (prop) => `revenge.mutableProp(${prop})`);
      byName = createFilter(([name], m2) => m2.name === name, (name) => `revenge.name(${name})`);
      byDisplayName = createFilter(([displayName], m2) => m2.displayName === displayName, (name) => `revenge.displayName(${name})`);
      byTypeName = createFilter(([typeName], m2) => m2.type?.name === typeName, (name) => `revenge.typeName(${name})`);
      byStoreName = createFilter(([name], m2) => m2.getName?.length === 0 && m2.getName() === name, (name) => `revenge.storeName(${name})`);
      byFilePath = createFilter(([path, returnDefaultExport], _2, id, isDefaultExport) => {
        return returnDefaultExport === isDefaultExport && getMetroModules()[id]?.[MetroModuleFilePathKey] === path;
      }, ([path, returnDefaultExport]) => `revenge.filePath(${path},${returnDefaultExport})`);
      bySingleProp = createFilter(([prop], m2) => m2[prop] && Object.keys(m2).length === 1, (prop) => `revenge.singleProp(${prop})`);
      byQuery = createFilter(([query, caseSensitive], m2) => {
        var applyStringTransformation = (str) => caseSensitive ? str : str.toLowerCase();
        var transformedQuery = applyStringTransformation(query);
        try {
          return m2.name?.toLowerCase()?.includes(transformedQuery) || m2.displayName?.toLowerCase()?.includes(transformedQuery) || m2.type?.name?.toLowerCase()?.includes(transformedQuery) || m2.getName?.length === 0 && m2.getName?.()?.toLowerCase()?.includes(transformedQuery) || getMetroModules()[m2.id]?.[MetroModuleFilePathKey]?.toLowerCase()?.includes(transformedQuery) || Object.keys(m2).some((k) => k.toLowerCase().includes(transformedQuery)) || Object.values(m2).some((v2) => String(v2).toLowerCase().includes(transformedQuery));
        } catch (e) {
          return false;
        }
      }, ([query, caseSensitive]) => `revenge.query(${caseSensitive ? query : query.toLowerCase()})`);
    }
  });

  // shims/react.ts
  var React2, react_default;
  var init_react = __esm({
    "shims/react.ts"() {
      "use strict";
      init_finders();
      React2 = findByProps("useEffect");
      react_default = React2;
    }
  });

  // shims/react-native.ts
  var ReactNative2, react_native_default;
  var init_react_native = __esm({
    "shims/react-native.ts"() {
      "use strict";
      init_finders();
      ReactNative2 = findByProps("AppRegistry");
      react_native_default = ReactNative2;
    }
  });

  // libraries/modules/src/common/components.ts
  var components_exports = {};
  __export(components_exports, {
    AlertActionButton: () => AlertActionButton,
    AlertModal: () => AlertModal,
    Button: () => Button,
    Card: () => Card,
    FlashList: () => FlashList,
    FloatingActionButton: () => FloatingActionButton,
    FormCheckbox: () => FormCheckbox,
    FormRadio: () => FormRadio,
    FormSwitch: () => FormSwitch,
    GhostInput: () => GhostInput,
    IconButton: () => IconButton,
    ImageButton: () => ImageButton,
    PressableScale: () => PressableScale,
    RowButton: () => RowButton,
    SafeAreaProvider: () => SafeAreaProvider,
    SafeAreaView: () => SafeAreaView,
    Slider: () => Slider,
    Stack: () => Stack,
    TableCheckbox: () => TableCheckbox,
    TableCheckboxRow: () => TableCheckboxRow,
    TableRadio: () => TableRadio,
    TableRadioGroup: () => TableRadioGroup,
    TableRadioRow: () => TableRadioRow,
    TableRow: () => TableRow,
    TableRowGroup: () => TableRowGroup,
    TableRowIcon: () => TableRowIcon,
    TableRowTrailingText: () => TableRowTrailingText,
    TableSwitch: () => TableSwitch,
    TableSwitchRow: () => TableSwitchRow,
    Text: () => Text,
    TextArea: () => TextArea,
    TextInput: () => TextInput,
    TwinButtons: () => TwinButtons,
    dismissAlerts: () => dismissAlerts,
    openAlert: () => openAlert
  });
  var SafeAreaProvider, SafeAreaView, TwinButtons, Button, IconButton, ImageButton, FloatingActionButton, RowButton, TableRow, TableSwitchRow, TableRowGroup, TableRowIcon, TableRadioGroup, TableCheckboxRow, TableRadioRow, AlertModal, AlertActionButton, dismissAlerts, openAlert, TextInput, TextArea, GhostInput, Card, Stack, Slider, Text, PressableScale, TableRowTrailingText, TableSwitch, TableRadio, TableCheckbox, FormSwitch, FormRadio, FormCheckbox, FlashList;
  var init_components = __esm({
    "libraries/modules/src/common/components.ts"() {
      "use strict";
      init_lazy();
      init_finders();
      ({ SafeAreaProvider, SafeAreaView } = lazyDestructure(() => findByProps.eager("useSafeAreaInsets")));
      TwinButtons = findProp("TwinButtons");
      ({
        Button: (
          // Buttons
          Button
        ),
        IconButton,
        ImageButton,
        FloatingActionButton,
        RowButton,
        TableRow: (
          // Tables
          TableRow
        ),
        TableSwitchRow,
        TableRowGroup,
        TableRowIcon,
        TableRadioGroup,
        TableCheckboxRow,
        TableRadioRow,
        AlertModal: (
          // Alerts
          AlertModal
        ),
        AlertActionButton,
        dismissAlerts,
        openAlert,
        TextInput: (
          // Inputs
          TextInput
        ),
        TextArea,
        GhostInput,
        Card: (
          // Containers
          Card
        ),
        Stack,
        Slider: (
          // Other
          Slider
        ),
        Text: (
          // Text
          Text
        )
      } = lazyDestructure(() => findByProps.eager("TextInput", "ContextMenu")));
      PressableScale = findProp("PressableScale");
      TableRowTrailingText = findProp("TableRowTrailingText");
      TableSwitch = findBySingleProp("FormSwitch");
      TableRadio = findBySingleProp("FormRadio");
      TableCheckbox = findBySingleProp("FormCheckbox");
      FormSwitch = findBySingleProp("FormSwitch");
      FormRadio = findBySingleProp("FormRadio");
      FormCheckbox = findBySingleProp("FormCheckbox");
      FlashList = findProp("FlashList");
    }
  });

  // libraries/modules/src/common/stores.ts
  var stores_exports = {};
  __export(stores_exports, {
    ThemeStore: () => ThemeStore
  });
  var ThemeStore;
  var init_stores = __esm({
    "libraries/modules/src/common/stores.ts"() {
      "use strict";
      init_finders();
      ThemeStore = findByStoreName("ThemeStore");
    }
  });

  // shims/events.ts
  var EventEmitter;
  var init_events = __esm({
    "shims/events.ts"() {
      "use strict";
      init_finders();
      EventEmitter = findProp("EventEmitter");
    }
  });

  // libraries/modules/src/common/index.ts
  var common_exports = {};
  __export(common_exports, {
    EventEmitter: () => EventEmitter,
    Flux: () => Flux,
    FluxDispatcher: () => FluxDispatcher,
    Logger: () => Logger,
    NavigationNative: () => NavigationNative,
    NavigationStack: () => NavigationStack,
    React: () => React3,
    ReactNative: () => ReactNative3,
    TextStyleSheet: () => TextStyleSheet,
    alerts: () => alerts,
    assetsRegistry: () => assetsRegistry,
    channels: () => channels,
    clipboard: () => clipboard,
    commands: () => commands,
    components: () => components_exports,
    constants: () => constants,
    createStyles: () => createStyles,
    intl: () => intl,
    intlModule: () => intlModule,
    invites: () => invites,
    legacy_alerts: () => legacy_alerts,
    links: () => links,
    messages: () => messages,
    nobleHashesUtils: () => nobleHashesUtils,
    semver: () => semver,
    stores: () => stores_exports,
    toasts: () => toasts,
    tokens: () => tokens,
    xxhash64: () => xxhash64
  });
  var constants, tokens, intl, intlModule, Logger, legacy_alerts, alerts, channels, links, clipboard, invites, commands, toasts, messages, NavigationStack, NavigationNative, TextStyleSheet, createStyles, Flux, FluxDispatcher, assetsRegistry, React3, ReactNative3, semver, xxhash64, nobleHashesUtils;
  var init_common = __esm({
    "libraries/modules/src/common/index.ts"() {
      "use strict";
      init_lazy();
      init_finders();
      init_react();
      init_react_native();
      init_components();
      init_stores();
      init_events();
      constants = findByProps("Fonts");
      tokens = findByProps("internal", "colors");
      intl = findByProps("intl");
      intlModule = findByProps("runtimeHashMessageKey");
      Logger = findByName("Logger");
      legacy_alerts = findByProps("openLazy", "close");
      alerts = findByProps("openAlert", "dismissAlert");
      channels = findByProps("getVoiceChannelId");
      links = findByProps("openDeepLink");
      clipboard = findByProps("getImagePNG");
      invites = findByProps("createInvite");
      commands = findByProps("getBuiltInCommands");
      toasts = findByFilePath("modules/toast/native/ToastActionCreators.tsx", true);
      messages = findByProps("sendBotMessage");
      NavigationStack = findByProps("createStackNavigator");
      NavigationNative = findByProps("NavigationContainer");
      ({ TextStyleSheet, createStyles } = lazyDestructure(() => findByProps.eager("createStyles", "TextStyleSheet")));
      Flux = findByProps("connectStores");
      FluxDispatcher = findByProps("_interceptors");
      assetsRegistry = findByProps("registerAsset");
      React3 = globalThis.React = react_default;
      ReactNative3 = globalThis.ReactNative = react_native_default;
      semver = findByProps("SEMVER_SPEC_VERSION");
      xxhash64 = findByProps("XXH64");
      nobleHashesUtils = findByProps("randomBytes");
    }
  });

  // libraries/modules/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    constants: () => constants_exports,
    createModulesLibrary: () => createModulesLibrary
  });
  function createModulesLibrary() {
    return _createModulesLibrary.apply(this, arguments);
  }
  function _createModulesLibrary() {
    _createModulesLibrary = _async_to_generator(function* () {
      yield initializeModules();
      var common = yield Promise.resolve().then(() => (init_common(), common_exports));
      var native = yield Promise.resolve().then(() => (init_native(), native_exports));
      return {
        constants: constants_exports,
        common,
        filters: filters_exports,
        native,
        metro: metro_exports,
        ...finders_exports
      };
    });
    return _createModulesLibrary.apply(this, arguments);
  }
  var init_src3 = __esm({
    "libraries/modules/src/index.ts"() {
      "use strict";
      init_async_to_generator();
      init_constants();
      init_filters2();
      init_finders();
      init_metro();
    }
  });

  // libraries/ui/src/colors.ts
  var colors_exports = {};
  __export(colors_exports, {
    RawColor: () => RawColor,
    SemanticColor: () => SemanticColor,
    isSemanticColor: () => isSemanticColor,
    resolveSemanticColor: () => resolveSemanticColor
  });
  function isSemanticColor(key) {
    return tokens.internal.isSemanticColor(key);
  }
  function resolveSemanticColor(key, theme = ThemeStore.theme) {
    return tokens.internal.resolveSemanticColor(theme, key);
  }
  var SemanticColor, RawColor;
  var init_colors = __esm({
    "libraries/ui/src/colors.ts"() {
      "use strict";
      init_common();
      init_stores();
      init_lazy();
      SemanticColor = lazyValue(() => tokens.colors);
      RawColor = lazyValue(() => tokens.unsafe_rawColors);
    }
  });

  // libraries/ui/src/settings.ts
  var settings_exports = {};
  __export(settings_exports, {
    SettingsUILibrary: () => SettingsUILibrary,
    customData: () => customData
  });
  function createSettingsSection(section) {
    if (section.name in customData.sections) throw new Error(`The settings section with the name "${section.name}" already exists`);
    customData.sections[section.name] = section;
    return () => delete customData.sections[section.name];
  }
  function createSettingsRoute(key, route) {
    customData.rows[key] = route;
    return () => delete customData.rows[key];
  }
  function addSettingsRowsToSection(name, rows2) {
    if (!(name in customData.sections)) throw new Error(`No setting section exists with the name "${name}"`);
    var section = customData.sections[name];
    Object.assign(section.settings, rows2);
    return () => {
      for (var key in rows2) delete section.settings[key];
    };
  }
  var customData, SettingsUILibrary;
  var init_settings = __esm({
    "libraries/ui/src/settings.ts"() {
      "use strict";
      customData = {
        sections: {},
        rows: {}
      };
      SettingsUILibrary = {
        addRowsToSection: addSettingsRowsToSection,
        createSection: createSettingsSection,
        createRoute: createSettingsRoute
      };
    }
  });

  // shims/react~jsx-runtime.ts
  function unproxyFirstArg(args) {
    if (!args[0]) {
      throw new Error("The passed component is falsy. Ensure that you are passing a valid component.");
    }
    var factory = getProxyFactory(args[0]);
    if (factory) args[0] = factory();
    return args;
  }
  var jsxRuntime, Fragment, jsx, jsxs;
  var init_react_jsx_runtime = __esm({
    "shims/react~jsx-runtime.ts"() {
      "use strict";
      init_src3();
      init_finders();
      init_lazy();
      jsxRuntime = findByProps("jsx", "jsxs", "Fragment");
      Fragment = Symbol.for("react.fragment");
      jsx = (...args) => jsxRuntime.jsx(...unproxyFirstArg(args));
      jsxs = (...args) => jsxRuntime.jsxs(...unproxyFirstArg(args));
    }
  });

  // node_modules/@swc/helpers/esm/_get_prototype_of.js
  function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _get_prototype_of(o);
  }
  var init_get_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_get_prototype_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_is_native_reflect_construct.js
  function _is_native_reflect_construct() {
    try {
      var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (_2) {
    }
    return (_is_native_reflect_construct = function _is_native_reflect_construct2() {
      return !!result;
    })();
  }
  var init_is_native_reflect_construct = __esm({
    "node_modules/@swc/helpers/esm/_is_native_reflect_construct.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_assert_this_initialized.js
  function _assert_this_initialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
  }
  var init_assert_this_initialized = __esm({
    "node_modules/@swc/helpers/esm/_assert_this_initialized.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_type_of.js
  function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }
  var init_type_of = __esm({
    "node_modules/@swc/helpers/esm/_type_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_possible_constructor_return.js
  function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) return call;
    return _assert_this_initialized(self);
  }
  var init_possible_constructor_return = __esm({
    "node_modules/@swc/helpers/esm/_possible_constructor_return.js"() {
      init_assert_this_initialized();
      init_type_of();
    }
  });

  // node_modules/@swc/helpers/esm/_call_super.js
  function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
  }
  var init_call_super = __esm({
    "node_modules/@swc/helpers/esm/_call_super.js"() {
      init_get_prototype_of();
      init_is_native_reflect_construct();
      init_possible_constructor_return();
    }
  });

  // node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/@swc/helpers/esm/_class_call_check.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_create_class.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var init_create_class = __esm({
    "node_modules/@swc/helpers/esm/_create_class.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_set_prototype_of.js
  function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _set_prototype_of(o, p);
  }
  var init_set_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_set_prototype_of.js"() {
    }
  });

  // node_modules/@swc/helpers/esm/_inherits.js
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
  }
  var init_inherits = __esm({
    "node_modules/@swc/helpers/esm/_inherits.js"() {
      init_set_prototype_of();
    }
  });

  // node_modules/@gullerya/object-observer/dist/object-observer.min.js
  var m, x, E, T, K, c, $, N, Y, I, B, D, R, z, y, g, q, H, G, J, F, P, L, C, Q, X, Z, _, b, S, V, U, W, v;
  var init_object_observer_min = __esm({
    "node_modules/@gullerya/object-observer/dist/object-observer.min.js"() {
      init_call_super();
      init_class_call_check();
      init_create_class();
      init_inherits();
      m = "insert";
      x = "update";
      E = "delete";
      T = "reverse";
      K = "shuffle";
      c = Symbol.for("object-observer-meta-key-0");
      $ = {
        async: 1
      };
      N = (o) => {
        if (!o || typeof o != "object") return null;
        var t = {}, e = [];
        for (var [r, n] of Object.entries(o)) if (r === "path") {
          if (typeof n != "string" || n === "") throw new Error('"path" option, if/when provided, MUST be a non-empty string');
          t[r] = n;
        } else if (r === "pathsOf") {
          if (o.path) throw new Error('"pathsOf" option MAY NOT be specified together with "path" option');
          if (typeof n != "string") throw new Error('"pathsOf" option, if/when provided, MUST be a string (MAY be empty)');
          t[r] = o.pathsOf.split(".").filter(Boolean);
        } else if (r === "pathsFrom") {
          if (o.path || o.pathsOf) throw new Error('"pathsFrom" option MAY NOT be specified together with "path"/"pathsOf" option/s');
          if (typeof n != "string" || n === "") throw new Error('"pathsFrom" option, if/when provided, MUST be a non-empty string');
          t[r] = n;
        } else e.push(r);
        if (e.length) throw new Error(`'${e.join(", ")}' is/are not a valid observer option/s`);
        return t;
      };
      Y = (o, t, e) => {
        var r = {};
        r[c] = t;
        for (var n in o) r[n] = g(o[n], n, t, e);
        return r;
      };
      I = (o, t, e) => {
        var r = o.length;
        var n = new Array(r);
        n[c] = t;
        for (var i = 0; i < r; i++) n[i] = g(o[i], i, t, e);
        return n;
      };
      B = (o, t) => (o[c] = t, o);
      D = (o, t) => {
        if (o === null) return t;
        var e = t;
        if (o.path) {
          var r = o.path;
          e = t.filter((n2) => n2.path.join(".") === r);
        } else if (o.pathsOf) {
          var r1 = o.pathsOf, n = r1.join(".");
          e = t.filter((i) => (i.path.length === r1.length + 1 || i.path.length === r1.length && (i.type === T || i.type === K)) && i.path.join(".").startsWith(n));
        } else if (o.pathsFrom) {
          var r2 = o.pathsFrom;
          e = t.filter((n2) => n2.path.join(".").startsWith(r2));
        }
        return e;
      };
      R = (o, t) => {
        try {
          o(t);
        } catch (e) {
          console.error(`failed to notify listener ${o} with ${t}`, e);
        }
      };
      z = function z2() {
        var t = this.batches;
        this.batches = [];
        for (var [e, r] of t) R(e, r);
      };
      y = (o, t) => {
        var e = o, r, n, i, l, h, s;
        var u = t.length;
        do {
          for (r = e.options.async, n = e.observers, s = n.length; s--; ) if ([i, l] = n[s], h = D(l, t), h.length) if (r) {
            e.batches.length === 0 && queueMicrotask(z.bind(e));
            var a = void 0;
            for (var p of e.batches) if (p[0] === i) {
              a = p;
              break;
            }
            a || (a = [
              i,
              []
            ], e.batches.push(a)), Array.prototype.push.apply(a[1], h);
          } else R(i, h);
          var f = e.parent;
          if (f) {
            for (var a1 = 0; a1 < u; a1++) {
              var p1 = t[a1];
              t[a1] = new b(p1.type, [
                e.ownKey,
                ...p1.path
              ], p1.value, p1.oldValue, p1.object);
            }
            e = f;
          } else e = null;
        } while (e);
      };
      g = (o, t, e, r) => r !== void 0 && r.has(o) ? null : typeof o != "object" || o === null ? o : Array.isArray(o) ? new U({
        target: o,
        ownKey: t,
        parent: e,
        visited: r
      }).proxy : ArrayBuffer.isView(o) ? new W({
        target: o,
        ownKey: t,
        parent: e
      }).proxy : o instanceof Date ? o : new V({
        target: o,
        ownKey: t,
        parent: e,
        visited: r
      }).proxy;
      q = function q2() {
        var t = this[c], e = t.target, r = e.length - 1;
        var n = e.pop();
        if (n && typeof n == "object") {
          var l = n[c];
          l && (n = l.detach());
        }
        var i = [
          new b(E, [
            r
          ], void 0, n, this)
        ];
        return y(t, i), n;
      };
      H = function H2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r), i = e.length;
        for (var s = 0; s < r; s++) n[s] = g(arguments[s], i + s, t);
        var l = Reflect.apply(e.push, e, n), h = [];
        for (var s1 = i, u = e.length; s1 < u; s1++) h[s1 - i] = new b(m, [
          s1
        ], e[s1], void 0, this);
        return y(t, h), l;
      };
      G = function G2() {
        var t = this[c], e = t.target;
        var r, n, i, l, h;
        for (r = e.shift(), r && typeof r == "object" && (h = r[c], h && (r = h.detach())), n = 0, i = e.length; n < i; n++) l = e[n], l && typeof l == "object" && (h = l[c], h && (h.ownKey = n));
        var s = [
          new b(E, [
            0
          ], void 0, r, this)
        ];
        return y(t, s), r;
      };
      J = function J2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r);
        for (var s = 0; s < r; s++) n[s] = g(arguments[s], s, t);
        var i = Reflect.apply(e.unshift, e, n);
        for (var s1 = 0, u = e.length, f; s1 < u; s1++) if (f = e[s1], f && typeof f == "object") {
          var a = f[c];
          a && (a.ownKey = s1);
        }
        var l = n.length, h = new Array(l);
        for (var s2 = 0; s2 < l; s2++) h[s2] = new b(m, [
          s2
        ], e[s2], void 0, this);
        return y(t, h), i;
      };
      F = function F2() {
        var t = this[c], e = t.target;
        var r, n, i;
        for (e.reverse(), r = 0, n = e.length; r < n; r++) if (i = e[r], i && typeof i == "object") {
          var h = i[c];
          h && (h.ownKey = r);
        }
        var l = [
          new b(T, [], void 0, void 0, this)
        ];
        return y(t, l), this;
      };
      P = function P2(t) {
        var e = this[c], r = e.target;
        var n, i, l;
        for (r.sort(t), n = 0, i = r.length; n < i; n++) if (l = r[n], l && typeof l == "object") {
          var s = l[c];
          s && (s.ownKey = n);
        }
        var h = [
          new b(K, [], void 0, void 0, this)
        ];
        return y(e, h), this;
      };
      L = function L2(t, e, r) {
        var n = this[c], i = n.target, l = [], h = i.length, s = i.slice(0);
        if (e = e === void 0 ? 0 : e < 0 ? Math.max(h + e, 0) : Math.min(e, h), r = r === void 0 ? h : r < 0 ? Math.max(h + r, 0) : Math.min(r, h), e < h && r > e) {
          i.fill(t, e, r);
          var u;
          for (var f = e, a, p; f < r; f++) a = i[f], i[f] = g(a, f, n), f in s ? (p = s[f], p && typeof p == "object" && (u = p[c], u && (p = u.detach())), l.push(new b(x, [
            f
          ], i[f], p, this))) : l.push(new b(m, [
            f
          ], i[f], void 0, this));
          y(n, l);
        }
        return this;
      };
      C = function C2(t, e, r) {
        var n = this[c], i = n.target, l = i.length;
        t = t < 0 ? Math.max(l + t, 0) : t, e = e === void 0 ? 0 : e < 0 ? Math.max(l + e, 0) : Math.min(e, l), r = r === void 0 ? l : r < 0 ? Math.max(l + r, 0) : Math.min(r, l);
        var h = Math.min(r - e, l - t);
        if (t < l && t !== e && h > 0) {
          var s = i.slice(0), u = [];
          i.copyWithin(t, e, r);
          for (var f = t, a, p, O; f < t + h; f++) a = i[f], a && typeof a == "object" && (a = g(a, f, n), i[f] = a), p = s[f], p && typeof p == "object" && (O = p[c], O && (p = O.detach())), !(typeof a != "object" && a === p) && u.push(new b(x, [
            f
          ], a, p, this));
          y(n, u);
        }
        return this;
      };
      Q = function Q2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r), i = e.length;
        for (var w = 0; w < r; w++) n[w] = g(arguments[w], w, t);
        var l = r === 0 ? 0 : n[0] < 0 ? i + n[0] : n[0], h = r < 2 ? i - l : n[1], s = Math.max(r - 2, 0), u = Reflect.apply(e.splice, e, n), f = e.length;
        var a;
        for (var w1 = 0, A; w1 < f; w1++) A = e[w1], A && typeof A == "object" && (a = A[c], a && (a.ownKey = w1));
        var p, O, j;
        for (p = 0, O = u.length; p < O; p++) j = u[p], j && typeof j == "object" && (a = j[c], a && (u[p] = a.detach()));
        var M = [];
        var d;
        for (d = 0; d < h; d++) d < s ? M.push(new b(x, [
          l + d
        ], e[l + d], u[d], this)) : M.push(new b(E, [
          l + d
        ], void 0, u[d], this));
        for (; d < s; d++) M.push(new b(m, [
          l + d
        ], e[l + d], void 0, this));
        return y(t, M), u;
      };
      X = function X2(t, e) {
        var r = this[c], n = r.target, i = t.length, l = n.slice(0);
        e = e || 0, n.set(t, e);
        var h = new Array(i);
        for (var s = e; s < i + e; s++) h[s - e] = new b(x, [
          s
        ], n[s], l[s], this);
        y(r, h);
      };
      Z = {
        pop: q,
        push: H,
        shift: G,
        unshift: J,
        reverse: F,
        sort: P,
        fill: L,
        copyWithin: C,
        splice: Q
      };
      _ = {
        reverse: F,
        sort: P,
        fill: L,
        copyWithin: C,
        set: X
      };
      b = function b2(t, e, r, n, i) {
        "use strict";
        _class_call_check(this, b2);
        this.type = t, this.path = e, this.value = r, this.oldValue = n, this.object = i;
      };
      S = /* @__PURE__ */ function() {
        "use strict";
        function S2(t, e) {
          _class_call_check(this, S2);
          var { target: r, parent: n, ownKey: i, visited: l = /* @__PURE__ */ new Set() } = t;
          n && i !== void 0 ? (this.parent = n, this.ownKey = i) : (this.parent = null, this.ownKey = null), l.add(r);
          var h = e(r, this, l);
          l.delete(r), this.observers = [], this.revocable = Proxy.revocable(h, this), this.proxy = this.revocable.proxy, this.target = h, this.options = this.processOptions(t.options), this.options.async && (this.batches = []);
        }
        _create_class(S2, [
          {
            key: "processOptions",
            value: function processOptions(t) {
              if (t) {
                if (typeof t != "object") throw new Error(`Observable options if/when provided, MAY only be an object, got '${t}'`);
                var e = Object.keys(t).filter((r) => !(r in $));
                if (e.length) throw new Error(`'${e.join(", ")}' is/are not a valid Observable option/s`);
                return Object.assign({}, t);
              } else return {};
            }
          },
          {
            key: "detach",
            value: function detach() {
              return this.parent = null, this.target;
            }
          },
          {
            key: "set",
            value: function set(t, e, r) {
              var n = t[e];
              if (r !== n) {
                var i = g(r, e, this);
                if (t[e] = i, n && typeof n == "object") {
                  var h = n[c];
                  h && (n = h.detach());
                }
                var l = n === void 0 ? [
                  new b(m, [
                    e
                  ], i, void 0, this.proxy)
                ] : [
                  new b(x, [
                    e
                  ], i, n, this.proxy)
                ];
                y(this, l);
              }
              return true;
            }
          },
          {
            key: "deleteProperty",
            value: function deleteProperty(t, e) {
              var r = t[e];
              if (delete t[e], r && typeof r == "object") {
                var i = r[c];
                i && (r = i.detach());
              }
              var n = [
                new b(E, [
                  e
                ], void 0, r, this.proxy)
              ];
              return y(this, n), true;
            }
          }
        ]);
        return S2;
      }();
      V = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(V2, S2);
        function V2(t) {
          _class_call_check(this, V2);
          return _call_super(this, V2, [
            t,
            Y
          ]);
        }
        return V2;
      }(S);
      U = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(U2, S2);
        function U2(t) {
          _class_call_check(this, U2);
          return _call_super(this, U2, [
            t,
            I
          ]);
        }
        _create_class(U2, [
          {
            key: "get",
            value: function get(t, e) {
              return Z[e] || t[e];
            }
          }
        ]);
        return U2;
      }(S);
      W = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(W2, S2);
        function W2(t) {
          _class_call_check(this, W2);
          return _call_super(this, W2, [
            t,
            B
          ]);
        }
        _create_class(W2, [
          {
            key: "get",
            value: function get(t, e) {
              return _[e] || t[e];
            }
          }
        ]);
        return W2;
      }(S);
      v = Object.freeze({
        from: (o, t) => {
          if (!o || typeof o != "object") throw new Error("observable MAY ONLY be created from a non-null object");
          if (o[c]) return o;
          if (Array.isArray(o)) return new U({
            target: o,
            ownKey: null,
            parent: null,
            options: t
          }).proxy;
          if (ArrayBuffer.isView(o)) return new W({
            target: o,
            ownKey: null,
            parent: null,
            options: t
          }).proxy;
          if (o instanceof Date) throw new Error(`${o} found to be one of a non-observable types`);
          return new V({
            target: o,
            ownKey: null,
            parent: null,
            options: t
          }).proxy;
        },
        isObservable: (o) => !!(o && o[c]),
        observe: (o, t, e) => {
          if (!v.isObservable(o)) throw new Error("invalid observable parameter");
          if (typeof t != "function") throw new Error(`observer MUST be a function, got '${t}'`);
          var r = o[c].observers;
          r.some((n) => n[0] === t) ? console.warn("observer may be bound to an observable only once; will NOT rebind") : r.push([
            t,
            N(e)
          ]);
        },
        unobserve: (o, ...t) => {
          if (!v.isObservable(o)) throw new Error("invalid observable parameter");
          var e = o[c].observers;
          var r = e.length;
          if (r) {
            if (!t.length) {
              e.splice(0);
              return;
            }
            for (; r; ) t.indexOf(e[--r][0]) >= 0 && e.splice(r, 1);
          }
        }
      });
    }
  });

  // libraries/storage/src/index.ts
  var src_exports2 = {};
  __export(src_exports2, {
    awaitStorage: () => awaitStorage,
    createStorage: () => createStorage,
    getPreloadedStorage: () => getPreloadedStorage,
    loadStorage: () => loadStorage,
    removeStorage: () => removeStorage,
    saveStorage: () => saveStorage,
    storageContextSymbol: () => storageContextSymbol,
    useObservable: () => useObservable
  });
  function createJSONFile(path) {
    var actualPath = `${FileModule.getConstants().DocumentsDirPath}/${path}`;
    var file = {
      read: /* @__PURE__ */ _async_to_generator(function* () {
        try {
          return JSON.parse(yield FileModule.readFile(actualPath, "utf8"));
        } catch (e) {
          throw new Error(`Failed to parse storage from: ${actualPath}`, {
            cause: e
          });
        }
      }),
      write: (data) => {
        if (!data || typeof data !== "object") {
          throw new Error("Data to write needs to be an object");
        }
        return FileModule.writeFile("documents", path, JSON.stringify(data), "utf8");
      },
      exists: () => FileModule.fileExists(actualPath)
    };
    return file;
  }
  function useObservable(observables, opts) {
    if (observables.some((o) => o?.[storageContextSymbol]?.error)) throw new Error("An error occured while initializing the storage");
    if (observables.some((o) => !v.isObservable(o))) {
      throw new Error("Argument passed isn't an Observable");
    }
    var [, forceUpdate] = React.useReducer((n) => ~n, 0);
    React.useEffect(() => {
      var listener = () => forceUpdate();
      for (var o of observables) v.observe(o, listener, opts);
      return () => {
        for (var o2 of observables) v.unobserve(o2, listener);
      };
    }, []);
  }
  function saveStorage(path, value) {
    return _saveStorage.apply(this, arguments);
  }
  function _saveStorage() {
    _saveStorage = _async_to_generator(function* (path, value) {
      loadedStorages[path] = value;
      createJSONFile(path).write(value);
    });
    return _saveStorage.apply(this, arguments);
  }
  function createStorage(path, { initial = {} } = {}) {
    var readyPromise = new Promise((r) => resolve = r);
    var resolve;
    var proxy;
    var context = {
      emitter: new EventEmitter(),
      ready: false,
      readyPromise
    };
    var callback = (data) => {
      var observable = v.from(data);
      v.observe(observable, (changes) => {
        for (var change of changes) {
          context.emitter.emit(change.type !== "delete" ? "set" : "delete", {
            path: change.path,
            value: change.value
          });
        }
        backend.write(observable);
      });
      var _proxy = new Proxy(observable, {
        get(target, prop, receiver) {
          if (prop === storageContextSymbol) return context;
          return Reflect.get(target, prop, receiver);
        }
      });
      context.ready = true;
      resolve();
      return proxy = _proxy;
    };
    var backend = createJSONFile(path);
    if (loadedStorages[path]) {
      callback(loadedStorages[path]);
    } else {
      backend.exists().then(/* @__PURE__ */ function() {
        var _ref = _async_to_generator(function* (exists) {
          if (!exists) {
            loadedStorages[path] = initial;
            yield backend.write(initial);
            callback(initial);
          } else {
            callback(loadedStorages[path] = yield backend.read());
          }
        });
        return function(exists) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    var check = () => {
      if (proxy) return true;
      throw new Error(`Storage has not been initialized: ${path}`);
    };
    return new Proxy({}, {
      ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map((k) => [
        k,
        (_2, ...args) => {
          return check() && Reflect[k](proxy, ...args);
        }
      ])),
      get(_2, prop, recv) {
        if (prop === storageContextSymbol) return context;
        return check() && Reflect.get(proxy, prop, recv);
      }
    });
  }
  function loadStorage(path) {
    return _loadStorage.apply(this, arguments);
  }
  function _loadStorage() {
    _loadStorage = _async_to_generator(function* (path) {
      if (loadedStorages[path]) return true;
      var backend = createJSONFile(path);
      if (yield backend.exists()) {
        loadedStorages[path] = yield backend.read();
        return false;
      }
      return true;
    });
    return _loadStorage.apply(this, arguments);
  }
  function removeStorage(path) {
    return _removeStorage.apply(this, arguments);
  }
  function _removeStorage() {
    _removeStorage = _async_to_generator(function* (path) {
      yield FileModule.removeFile("documents", path);
      delete loadedStorages[path];
    });
    return _removeStorage.apply(this, arguments);
  }
  function awaitStorage(...storages) {
    return Promise.all(storages.map((proxy) => proxy[storageContextSymbol].readyPromise));
  }
  function getPreloadedStorage(path) {
    return loadedStorages[path];
  }
  var storageContextSymbol, loadedStorages;
  var init_src4 = __esm({
    "libraries/storage/src/index.ts"() {
      "use strict";
      init_async_to_generator();
      init_object_observer_min();
      init_common();
      init_native();
      storageContextSymbol = Symbol.for("revenge.storage.context");
      loadedStorages = {};
    }
  });

  // libraries/preferences/src/index.ts
  var src_exports3 = {};
  __export(src_exports3, {
    settings: () => settings
  });
  var settings;
  var init_src5 = __esm({
    "libraries/preferences/src/index.ts"() {
      "use strict";
      init_src4();
      settings = createStorage("revenge/settings.json", {
        initial: {
          safeMode: {
            enabled: false,
            enabledNextLaunch: false
          },
          developer: {
            settingsPageShown: false,
            patchErrorBoundary: true
          }
        }
      });
    }
  });

  // libraries/app/src/components/ErrorBoundaryScreen.tsx
  var ErrorBoundaryScreen_exports = {};
  __export(ErrorBoundaryScreen_exports, {
    LabeledCard: () => LabeledCard,
    default: () => ErrorBoundaryScreen
  });
  function ErrorBoundaryScreen(props) {
    var errorBoundaryStyles = useErrorBoundaryStyles();
    var error = props.error;
    return /* @__PURE__ */ jsxs(SafeAreaView, {
      style: errorBoundaryStyles.view,
      children: [
        /* @__PURE__ */ jsxs(ReactNative.View, {
          style: {
            gap: 4
          },
          children: [
            /* @__PURE__ */ jsx(Text, {
              variant: "display-lg",
              children: "Error!"
            }),
            /* @__PURE__ */ jsxs(Text, {
              variant: "text-md/normal",
              children: [
                "An error was thrown while rendering components. This could be caused by plugins, Revenge or Discord.",
                " ",
                Math.floor(Number(ClientInfoModule.Build) % 1e3 / 100) > 0 ? /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/normal",
                  color: "text-danger",
                  children: "You are not on a stable version of Discord which may explain why you are experiencing this issue."
                }) : null
              ]
            }),
            /* @__PURE__ */ jsxs(Text, {
              variant: "text-sm/normal",
              color: "text-muted",
              children: [
                ClientInfoModule.Version,
                " (",
                ClientInfoModule.Build,
                ") \u2022 Revenge ",
                "local"
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsxs(LabeledCard, {
          label: "Error",
          rawContent: getErrorStack(error),
          children: [
            /* @__PURE__ */ jsx(Text, {
              variant: "text-md/medium",
              children: String(error)
            }),
            error instanceof Error && error.stack && /* @__PURE__ */ jsxs(Fragment, {
              children: [
                /* @__PURE__ */ jsx(Text, {
                  variant: "heading-xl/semibold",
                  children: "Call Stack"
                }),
                /* @__PURE__ */ jsx(ReactNative.ScrollView, {
                  style: styles.nestedView,
                  fadingEdgeLength: 64,
                  children: parseStackTrace(error.stack?.slice(String(error).length + 1)).map(({ at, file, line, column }) => (
                    // biome-ignore lint/correctness/useJsxKeyInIterable: This never gets rerendered
                    /* @__PURE__ */ jsxs(Text, {
                      variant: "heading-md/extrabold",
                      style: {
                        fontFamily: "monospace",
                        fontWeight: "bold"
                      },
                      children: [
                        at,
                        "\n",
                        /* @__PURE__ */ jsxs(Text, {
                          variant: "text-sm/medium",
                          style: {
                            fontFamily: "monospace"
                          },
                          color: "text-muted",
                          children: [
                            file,
                            typeof line === "number" && typeof column === "number" && /* @__PURE__ */ jsxs(Fragment, {
                              children: [
                                ":",
                                line,
                                ":",
                                column
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ))
                })
              ]
            })
          ]
        }),
        error instanceof Error && "componentStack" in error && /* @__PURE__ */ jsx(LabeledCard, {
          scrollable: true,
          label: "Component Stack",
          style: {
            flex: 1
          },
          rawContent: error.componentStack,
          children: /* @__PURE__ */ jsx(Text, {
            selectable: true,
            variant: "text-md/medium",
            children: [
              ...error.componentStack.slice(1).split("\n").map((line) => [
                "<",
                /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/bold",
                  children: line.slice(7)
                }),
                "/>\n"
              ])
            ]
          })
        }),
        /* @__PURE__ */ jsxs(Card, {
          style: {
            gap: 16,
            flexDirection: "row"
          },
          children: [
            /* @__PURE__ */ jsx(Button, {
              style: {
                flex: 1
              },
              variant: "destructive",
              text: "Reload Discord",
              onPress: props.reload
            }),
            /* @__PURE__ */ jsx(Button, {
              style: {
                flex: 1
              },
              text: "Retry Render",
              onPress: props.rerender
            })
          ]
        })
      ]
    });
  }
  function LabeledCard(props) {
    var ViewComponent = props.scrollable ? ReactNative.ScrollView : ReactNative.View;
    return /* @__PURE__ */ jsxs(Card, {
      ...props,
      style: [
        styles.nestedView,
        ...Array.isArray(props.style) ? props.style : [
          props.style
        ]
      ],
      children: [
        /* @__PURE__ */ jsxs(ReactNative.View, {
          style: {
            flexDirection: "row",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsx(Text, {
              variant: "heading-xl/semibold",
              style: styles.headerText,
              children: props.label
            }),
            props.rawContent && /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              size: "sm",
              text: "Copy",
              onPress: () => clipboard.setString(props.rawContent)
            })
          ]
        }),
        /* @__PURE__ */ jsx(ViewComponent, {
          style: styles.nestedView,
          fadingEdgeLength: 32,
          children: props.children
        })
      ]
    });
  }
  function parseStackTrace(stackTrace) {
    var frames = [];
    var lines = stackTrace.split("\n");
    for (var line of lines) {
      var match = StackFrameRegex.exec(line.trim());
      if (match) {
        var at = void 0;
        var path = void 0;
        var ln = null;
        var col = null;
        if (match[3] && match[4]) {
          at = match[1];
          path = match[2];
          ln = Number(match[3]);
          col = Number(match[4]);
        } else {
          at = match[5];
          path = match[6];
        }
        if (path === IndexBundleFilePath) path = "(Discord)";
        frames.push({
          at,
          file: path,
          line: ln,
          column: col
        });
      } else {
        frames.push({
          at: "UNABLE TO PARSE LINE",
          file: line,
          line: null,
          column: null
        });
      }
    }
    return frames;
  }
  var useErrorBoundaryStyles, styles, IndexBundleFilePath, StackFrameRegex;
  var init_ErrorBoundaryScreen = __esm({
    "libraries/app/src/components/ErrorBoundaryScreen.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_common();
      init_components();
      init_native();
      init_colors();
      init_errors();
      useErrorBoundaryStyles = createStyles({
        view: {
          backgroundColor: SemanticColor.BG_BASE_SECONDARY,
          paddingHorizontal: 16,
          paddingVertical: 24,
          flex: 1,
          gap: 16
        }
      });
      styles = ReactNative.StyleSheet.create({
        nestedView: {
          gap: 8,
          flex: 1
        },
        headerText: {
          flexGrow: 1
        }
      });
      IndexBundleFilePath = HermesInternal.getFunctionLocation(__r).fileName;
      StackFrameRegex = /at (.+) \(([^:]+):(\d+):(\d+)\)|at (.+)? \(([^)]+)\)/;
    }
  });

  // libraries/app/src/index.tsx
  var src_exports4 = {};
  __export(src_exports4, {
    AppLibrary: () => AppLibrary,
    afterAppInitialized: () => afterAppInitialized,
    afterAppRendered: () => afterAppRendered,
    isAppInitialized: () => isAppInitialized,
    isAppRendered: () => isAppRendered
  });
  function afterAppInitialized(callback) {
    if (isAppInitialized) throw new Error("Cannot attach a callback after the app has already been initialized");
    initializeCallbacks.add(callback);
  }
  function afterAppRendered(callback) {
    if (isAppRendered) throw new Error("Cannot attach a callback after the App component has been rendered");
    renderCallbacks.add(callback);
  }
  var patcher2, initializeCallbacks, renderCallbacks, isAppInitialized, isAppRendered, unpatchRunApplication, unpatchCreateElement, AppLibrary;
  var init_src6 = __esm({
    "libraries/app/src/index.tsx"() {
      "use strict";
      init_async_to_generator();
      init_react_jsx_runtime();
      init_src();
      init_finders();
      init_native();
      init_src2();
      init_src4();
      patcher2 = createPatcherInstance("revenge.library.app");
      initializeCallbacks = /* @__PURE__ */ new Set();
      renderCallbacks = /* @__PURE__ */ new Set();
      isAppInitialized = false;
      isAppRendered = false;
      afterAppInitialized(() => isAppInitialized = true);
      afterAppRendered(() => isAppRendered = true);
      unpatchRunApplication = patcher2.after(ReactNative.AppRegistry, "runApplication", () => {
        unpatchRunApplication();
        recordTimestamp("App_RunApplicationCalled");
        for (var callback of initializeCallbacks) callback();
        recordTimestamp("App_AfterRunCallbacks");
      }, "runInitializeCallbacks");
      unpatchCreateElement = patcher2.after(React, "createElement", () => {
        unpatchCreateElement();
        recordTimestamp("App_CreateElementCalled");
        for (var callback of renderCallbacks) callback();
      }, "runRenderCallbacks");
      afterAppInitialized(/* @__PURE__ */ function() {
        var _patchErrorBoundary = _async_to_generator(function* () {
          var { settings: settings2 } = yield Promise.resolve().then(() => (init_src5(), src_exports3));
          yield awaitStorage(settings2);
          if (!settings2.developer.patchErrorBoundary) return;
          var { default: Screen } = yield Promise.resolve().then(() => (init_ErrorBoundaryScreen(), ErrorBoundaryScreen_exports));
          setImmediate(() => {
            patcher2.after.await(findByName.async("ErrorBoundary").then((it) => it.prototype), "render", function() {
              if (this.state.error) return /* @__PURE__ */ jsx(Screen, {
                error: this.state.error,
                rerender: () => this.setState({
                  error: null,
                  info: null
                }),
                reload: this.handleReload
              });
            }, "patchErrorBoundary");
          });
        });
        function patchErrorBoundary() {
          return _patchErrorBoundary.apply(this, arguments);
        }
        return patchErrorBoundary;
      }());
      AppLibrary = {
        /**
         * Whether the app has finished initializing
         */
        get initialized() {
          return isAppInitialized;
        },
        /**
         * Whether the App component has been rendered
         */
        get rendered() {
          return isAppRendered;
        },
        /**
         * Attaches a callback to be called when the app has been rendered
         * @param callback The callback to be called
         */
        afterRendered: afterAppRendered,
        /**
         * Attaches a callback to be called when the app has been initialized
         * @param callback The callback to be called
         */
        afterInitialized: afterAppInitialized,
        /**
         * Reloads the app
         */
        reload: () => BundleUpdaterManager.reload()
      };
    }
  });

  // libraries/assets/src/index.ts
  var src_exports5 = {};
  __export(src_exports5, {
    AssetsLibrary: () => AssetsLibrary
  });
  function getAssetByName(name) {
    return getAssetByIndex(cache.assets[name]);
  }
  function getAssetByIndex(index) {
    return assets[index];
  }
  function getAssetIndexByName(name) {
    var cachedId = cache.assets[name];
    if (cachedId) return cachedId;
    var moduleId = cache.assetModules[name];
    if (!moduleId) return;
    return cache.assets[name] = requireModule(moduleId);
  }
  var patcher3, assets, AssetsLibrary;
  var init_src7 = __esm({
    "libraries/assets/src/index.ts"() {
      "use strict";
      init_common();
      init_metro();
      init_src2();
      patcher3 = createPatcherInstance("revenge.library.assets");
      patcher3.after(assetsRegistry, "registerAsset", ([asset], index) => {
        var moduleId = getImportingModuleId();
        cacheAsset(asset.name, index, moduleId);
      }, "patchRegisterAsset");
      assets = new Proxy(Object.fromEntries(Object.entries(cache.assets).map(([key, index]) => [
        key,
        assetsRegistry.getAssetByID(index)
      ])), {
        get(cache2, prop) {
          if (cache2[prop]) return cache2[prop];
          return assetsRegistry.getAssetByID(Number(prop));
        }
      });
      AssetsLibrary = {
        assets,
        getByName: getAssetByName,
        getIndexByName: getAssetIndexByName,
        getByIndex: getAssetByIndex
      };
    }
  });

  // libraries/plugins/src/constants.ts
  var PluginIdRegex, PluginStatus;
  var init_constants2 = __esm({
    "libraries/plugins/src/constants.ts"() {
      "use strict";
      PluginIdRegex = /^[a-z0-9-_\.]{1,128}$/;
      PluginStatus = {
        Stopped: 1,
        Fetching: 2,
        Starting: 3,
        Started: 4
      };
    }
  });

  // libraries/plugins/src/internals.ts
  function registerPlugin(definition, core = false, predicate) {
    var cleanups = /* @__PURE__ */ new Set();
    if (plugins.has(definition.id)) throw new Error(`Plugin "${definition.id}" already exists`);
    if (!PluginIdRegex.test(definition.id)) throw new Error(`Cannot register plugin "${definition.id}", invalid ID format`);
    var prepareStorageAndPatcher = () => {
      instance.patcher ||= createPatcherInstance(`revenge.plugins.plugin#${definition.id}`);
      instance.storage ||= createStorage(`revenge/plugins/${definition.id}/storage.json`, {
        initial: definition.initializeStorage?.() ?? {}
      });
    };
    var internalPlugin = objectSeal({
      ...definition,
      // Enabled by default if it is a core plugin, otherwise its enabled state will be modified after core plugins have started
      enabled: predicate?.() ?? core,
      core,
      status: PluginStatus.Stopped,
      SettingsComponent: definition.settings,
      errors: [],
      get stopped() {
        return this.status === PluginStatus.Stopped;
      },
      disable() {
        if (this.core) throw new Error(`Cannot disable core plugin "${this.id}"`);
        if (!this.stopped) this.stop();
        this.enabled = false;
      },
      enable() {
        this.enabled = true;
        return !!this.beforeAppRender;
      },
      startMetroModuleSubscriptions() {
        if (this.onMetroModuleLoad) {
          prepareStorageAndPatcher();
          var unsub = subscribeModule.all((id, exports) => this.onMetroModuleLoad(instance, id, exports, unsub));
        }
      },
      start() {
        return _async_to_generator(function* () {
          if (!this.enabled) throw new Error(`Plugin "${this.id}" must be enabled before starting`);
          if (!this.stopped) throw new Error(`Plugin "${this.id}" is already started`);
          prepareStorageAndPatcher();
          this.status = PluginStatus.Starting;
          var handleError = (e, stage) => {
            this.errors.push(e);
            this.stop();
            throw new Error(`Plugin "${this.id}" failed to start at "${stage}":
${String(e)}`, {
              cause: e
            });
          };
          if (isAppRendered && this.beforeAppRender) handleError(new Error(`Plugin "${this.id}" requires running before app is initialized`), "beforeAppRender");
          try {
            instance.context.beforeAppRender = yield this.beforeAppRender?.(instance);
          } catch (e) {
            handleError(e, "onAppLaunched");
          }
          var _this = this;
          if (this.afterAppRender) appRenderedCallbacks.add(/* @__PURE__ */ _async_to_generator(function* () {
            try {
              yield awaitStorage(instance.storage);
              instance.context.afterAppRender = yield _this.afterAppRender(instance);
              _this.status = PluginStatus.Started;
            } catch (e) {
              handleError(e, "onAppInitialized");
            }
          }));
          else this.status = PluginStatus.Started;
        }).apply(this);
      },
      stop() {
        if (this.stopped) return;
        try {
          this.beforeStop?.(instance);
        } catch (e) {
          this.errors.push(new Error(`Plugin "${this.id}" failed to stop`, {
            cause: e
          }));
        } finally {
          for (var cleanup of cleanups) cleanup();
          if (!instance.patcher.destroyed) instance.patcher.destroy();
        }
      }
    });
    var proxy = new Proxy(internalPlugin, {
      get(target, prop) {
        if (WhitelistedPluginObjectKeys.includes(prop)) return target[prop];
        return void 0;
      },
      has(target, p) {
        return WhitelistedPluginObjectKeys.includes(p) && p in target;
      },
      defineProperty() {
        throw new Error("Cannot define plugin instance properties");
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => WhitelistedPluginObjectKeys.includes(key));
      },
      set() {
        throw new Error("Cannot set plugin instance properties");
      }
    });
    var instance = {
      context: {
        beforeAppRender: null,
        afterAppRender: null
      },
      plugin: proxy,
      patcher: null,
      storage: null,
      revenge: lazyValue(() => revenge),
      cleanup: (...funcs) => {
        for (var cleanup of funcs) cleanups.add(cleanup);
      }
    };
    if (internalPlugin.core) corePluginIds.add(internalPlugin.id);
    plugins.set(internalPlugin.id, internalPlugin);
    if (internalPlugin.beforeAppRender) highPriorityPluginIds.add(internalPlugin.id);
    return proxy;
  }
  var appRenderedCallbacks, corePluginIds, plugins, highPriorityPluginIds;
  var init_internals = __esm({
    "libraries/plugins/src/internals.ts"() {
      "use strict";
      init_async_to_generator();
      init_src6();
      init_metro();
      init_src2();
      init_src4();
      init_functions();
      init_lazy();
      init_constants2();
      appRenderedCallbacks = /* @__PURE__ */ new Set();
      corePluginIds = /* @__PURE__ */ new Set();
      plugins = /* @__PURE__ */ new Map();
      highPriorityPluginIds = /* @__PURE__ */ new Set();
    }
  });

  // libraries/plugins/src/index.ts
  var src_exports6 = {};
  __export(src_exports6, {
    PluginsLibrary: () => PluginsLibrary,
    definePlugin: () => definePlugin,
    startCorePlugins: () => startCorePlugins,
    startCorePluginsMetroModuleSubscriptions: () => startCorePluginsMetroModuleSubscriptions
  });
  function definePlugin(definition) {
    return registerPlugin(definition);
  }
  function startCorePlugins() {
    return _startCorePlugins.apply(this, arguments);
  }
  function _startCorePlugins() {
    _startCorePlugins = _async_to_generator(function* () {
      var promises = [];
      for (var id of corePluginIds) {
        try {
          var plugin = plugins.get(id);
          if (plugin.enabled) promises.push(plugin.start());
        } catch (e) {
          throw new Error(`Core plugin "${id}" had an error while starting`, {
            cause: e
          });
        }
      }
      return void (yield Promise.all(promises));
    });
    return _startCorePlugins.apply(this, arguments);
  }
  function startCorePluginsMetroModuleSubscriptions() {
    for (var plugin of plugins.values()) plugin.startMetroModuleSubscriptions();
  }
  var PluginsLibrary;
  var init_src8 = __esm({
    "libraries/plugins/src/index.ts"() {
      "use strict";
      init_async_to_generator();
      init_src6();
      init_internals();
      afterAppRendered(() => {
        for (var cb of appRenderedCallbacks) cb();
      });
      PluginsLibrary = {
        /**
         * Defines a plugin
         * @param definition The plugin definition
         * @returns The plugin object
         */
        definePlugin
      };
    }
  });

  // src/plugins/warnings/index.ts
  var MinimumSupportedBuildNumber;
  var init_warnings = __esm({
    "src/plugins/warnings/index.ts"() {
      "use strict";
      init_common();
      init_native();
      init_internals();
      MinimumSupportedBuildNumber = ReactNative3.Platform.select({
        android: 254e3,
        ios: 65235
      });
      registerPlugin(
        {
          name: "Warnings",
          author: "The Revenge Team",
          description: "Startup warnings for users that are not using the recommended defaults for Revenge",
          id: "revenge.warnings",
          version: "1.0.0",
          icon: "WarningIcon",
          afterAppRender({ revenge: { assets: assets3, modules: modules2 }, storage }) {
            var { legacy_alerts: legacy_alerts2, toasts: toasts2 } = modules2.common;
            if ((storage.supportWarningDismissedAt ?? Date.now()) + 6048e5 > Date.now()) {
              legacy_alerts2.show({
                title: "Support Warning",
                body: (
                  // biome-ignore lint/style/useTemplate: I can't see the whole message when not doing concatenation
                  `Revenge does not officially support this build of Discord. Please update to a newer version as some features may not work as expected.

Supported Builds: 250.0 (${MinimumSupportedBuildNumber}) or after
Your Build: ${ClientInfoModule.Version} (${ClientInfoModule.Build})`
                ),
                confirmText: "Remind me in 7 days",
                onConfirm: () => {
                  storage.supportWarningDismissedAt = Date.now();
                  toasts2.open({
                    key: "revenge.toasts.warnings.support-warning.dismissed",
                    content: "You will see this warning again in 7 days",
                    icon: assets3.getIndexByName("ic_warning_24px")
                  });
                }
              });
            }
          }
        },
        true,
        // We do !> instead of < in case the value of the left is NaN
        () => !(Number(ClientInfoModule.Build) > MinimumSupportedBuildNumber)
      );
    }
  });

  // libraries/utils/src/trees.ts
  function treeSearch(tree, filter, opts, depth) {
    if (depth > opts.maxDepth || !tree) return;
    if (filter(tree)) return tree;
    var isArray = Array.isArray(tree);
    var keys = isArray ? tree : Object.keys(tree);
    for (var key of keys) {
      var item = isArray ? key : tree[key];
      if (typeof item !== "object" || item === null) continue;
      if (!isArray && opts.walkable.length && !opts.walkable.includes(key)) continue;
      if (!isArray && opts.ignore.includes(key)) continue;
      var found = treeSearch(item, filter, opts, depth + 1);
      if (found) return found;
    }
  }
  function findInTree(tree, filter, { walkable = [], ignore = [], maxDepth = 100 } = {}) {
    return treeSearch(tree, filter, {
      walkable,
      ignore,
      maxDepth
    }, 0);
  }
  var init_trees = __esm({
    "libraries/utils/src/trees.ts"() {
      "use strict";
    }
  });

  // libraries/utils/src/react.ts
  function findInReactTree(tree, filter) {
    return findInTree(tree, filter, {
      walkable: [
        "props",
        "children",
        "child",
        "sibling"
      ]
    });
  }
  var init_react2 = __esm({
    "libraries/utils/src/react.ts"() {
      "use strict";
      init_trees();
    }
  });

  // src/assets/revenge.webp
  var revenge_default;
  var init_revenge = __esm({
    "src/assets/revenge.webp"() {
      revenge_default = "data:image/webp;base64,UklGRkgGAABXRUJQVlA4WAoAAAAQAAAAXwAAXgAAQUxQSMoFAAAB8ERtu2nbtm19Of+5tmHbtm3btm3btm3btm3bZjdaG73V/Of/CxS2WktozkhETAD+X9Q5H0IQ10wuBEGhSAN5AJCpltp6n51WnQIQ1zQeE+x63qOfDWN26H3LA9IsDuN/wlyNaiRvGAvSKAHXc0zUZMxaTPxoMvgGCdiAyvL9fE/gGsNjoj+YKrCfF0IGyjmREHwnCG5hZFWjzQtfm/MSgke+HzDXg02YWD3yIoQanJcgDrl+2qW2O+Ps2SD1OS9BHDDx37UkfilwVXxA7tizrLznBY9/OZwkh82JUM15CUGQP/4Cr1FZo3HMrPDlnABjzbvuwVe/8GMvc03jGH43AXwJ5yWIR/4UC29+7C1v/EYm1pq4JqSUB+a+5LvE3KRRk5Fkm88AHs55CeKQ2zPdcjueef/Hg5ifWG/kQQhlPHB6Ipli1GQs2+blcIL88eZYY79Ln/56FPM1Rk3G2q6FlPAY+3kyJmONyiMBTLrQxkfd+NovbeaaRk3GgVW+Al/kgGfZb6zXyDfue3+QMTfFqMnYicZBk8AVCE5mP2u3xKzGqMnYwcozIHkes/bT6iM1JjN2vLE9O3xOwDmMbN7IkxFy4L5gaiDlM/B5s42hNVDi5x4uZ3EaG9g4dKqCmXppjcRF4XN6fmBqICo3g2Q8nqM2UeTRCJmAKxmb6Yaig6hNpHwZLiNYh6mJEn8cGw6Ax1yR1kDGvpnhAThM+DtTA9G4AgQAHN6i1mEpqnWKqZpVU+6MkBHcylhHrsZkA2UajVmrFHlGXsDxdSjvWua8t3pJMmqqzVJMJPnnI/ut8AetivJeSEawBbWSkQsCmGnra780khbVqqWoJDni5ZNWmhDAyYzV3gMcAI9FWV35LkJwAGSBfe77lSRVyylJtj+6dONpAUB6sDBpFYx/TZTjMMVgWpXIqxEALwIA4y9/3PNDSSthJH+4bZe5AMAFcXAY71emSjoPfI77hKnayRkAzgcBgKnXuotWYBx9zGJjA0AQh6yD+6gSE9eBAIDgIWq1UwuyToIHVmQqSPwZgASPYgf/cbXIAxAyAecwVrsJUiLbwr6MBcbeWeFR2mHCP2nVLoXk7UKtkviZR8WAW0owcUNIOcEyNFZVPgmfEaxIq0LjCpBSDpMNohUp70Qo18LFjJUSvwxwADxm6KVVUT4FcWV6cAoji41cBKGMYKZeWiXjsKlzHMb6lqkKlfuh5QpcD5YyWgkqPwBCUQCepbLOxeEBwOM5aiUjtwWCOOd8cFhwMBNLRz4GBPHOeQnAbVTWqNwSkgm4grESE3n2uCjcrY/KisoPF0Ph3C9TWWfksQh5B9VBM/5y0tJTTzD5gvt9QCorR/LeTWadaKKZ1rslMrKmmyAZwTpMNZCR5NA/BhmpxhqVZN9ff40mqaxX+SpcxmPuSKuDKRpJxsR6TZUkUzTWnPjzeHAAHCb4oyaSZmYcQDMz1m/smwUeuW9S6+pu48qQjOA2xiZS7oaQCTi+mSLPzhNsSm0i5QOQjMeMo2kNlPgh8j0epzaQ8d9J8gRrNlSaLw8e97PdPDQuVmKyP9huHOOY2QogmGcI29YwiV/4IgTM+iEZNVluM7R5EkIRAvxxg1jSksZcVdWULNtpkb9PBFcCAky250PfDu/t+69fWa8ltQ5SckUISrsAoGeqGWeebc4Fll5lva12P/i4sy676b6nX33v8x//HNanzFrHKLk2Aqq6IKg3jDPhlDPNs+gK665xMVOHKLkuWqjTOZ8VkZAv3qHsB52i5HpooWNd1nvfg4sY2ZGJ3BAtdLzDVMNpHZHIjdBC5wvWY2InJnJTtNAVm3ZGIjdDC93osQg7MZFbooWudHCfUQcskdughS4N2IntgUrktgjoWocH2T8widwRAd3r0fMyVa02a5M7IaCbPeR6khrrVTJuhYDu9sDqz0fWrQ/PDUG3OwHm2vbQw2o89LCd5gYCGlA86vcezehD3R7/iw1WUDggWAAAAPAGAJ0BKmAAXwA//f7/f7+7NrIuKAPwP4lpAABtkf3xmcYIEERHlib342OFAOaBJke9Cv7QJQApzTcmzxGs0vAA/ua1avUACK+DwABBcZhHeKGCV8ggAAA=";
    }
  });

  // src/assets/hermes.webp
  var hermes_default;
  var init_hermes = __esm({
    "src/assets/hermes.webp"() {
      hermes_default = "data:image/webp;base64,UklGRiYIAABXRUJQVlA4WAoAAAAQAAAAXwAAXwAAQUxQSOgFAAABoEXbtilJOu/el2gbZbvSbdu2bdtluyoVKtu2bdu2XZnxsMd4kRH33Bef/RMRDiRJCppd8OLdxkIiyJEf0P9elMLQoZCmaQrDz5swpUhEU/rYXJ8cwmC15OuFc+fxOXf6yNA/bzRMjzmkDzCJHus2eeaMmWU4Y+a0wvu9D/CDe4Z9XI5ISP1aax6U7GXQcdh6tCwbHs8Nuo9I8zKSci/BslRtxiCaD0f/4HgNBKbmEuk4Dbr6IEqhomvhrZawfQm6lgN0McjU8bVhVHj6BXfAN1ou1lalFL5N3c36AVycooWe8YtRnMtjF0FZYPI8vQULPpaSHG7QpPd43eNgA9EqHw0snCpPgomuvO6x0VfSvXBdPz8uIIN5Mhc2D9+QSY0QhZ/lNzJ5Vz0CZufcEbvnAX66XJwvR4Jjc3nVxYFrKNbPg+H4adpxjEmfcCOzyk4pacfhwvXNHLyCDAYCPFjoTGXLnJjLdfxx2HiZJMO9CDYP78TddnO4p44DiEm1v2ohRKa6XneC2+0ZcY9FHnCm54SNJ6IAoNuDDlZx5uy74LJ/wriyAFjcoTDYd/ikBRsPlwBwXY3AyRuUAZO+5ipnkIi78Zdg2wMD4UBRQX5+ce/xa84ALh9uXRJK9OAq25MZb2YCh4pDkXA4EgkHCvPDU49Bw9xOUuleDod3eDMRatvA1oJgJBRjOBIqCCzTwF0qGHTTGbis9qE+iQRd+y5s7IwURMKhMoyEu8zjB7NIqJQP8KyD3WlkUILyt1fOjM4vCntfCscE+Tu5T2NJFRVM+pGrnJC4fyU1ggVsHlKUX1gcCHofi8bz4GDfFSRFQqZSX66yZeIBKui6C3BcuAcWjxvUp0coECiMXGIVG3NIzTVwfJlg5Mb4ycUuOX/i6JGDu0qZytNPVqlftywbZGRkZNb6ivv4WTVIKH6+XsCIARf9mFkRdeKot5rCNjN+/CcY3Fhd/bE/h67ad+pCiQvm0OZNKcxZzMYY9fBJ2wP8Wr1+rYw7Hnrqudc+/aqHxtyRgHrzbyPl/GvSX8Du22+/87bc7MyMBg3L/QwbSaSNZxjTS/peYEiNO2/Lu+22226/q07QR2gMT6V5EVG0rXbHbXke76g9PqlwsFmw3q/dUIoONXPujJXc7XCSCAtDSXLWNzTGK6PvqZV7x52Zz0fhJhV/sBZQgmiUFzzc6M6aDar/6tmknjxGknilHTzu7/31HQOSrLxQgQQ3OXx0I2I8fQnJtWv5GZBJxherkXRa6KeRBEnPf3eLGYeSjZ/IJB2nxz9hJffkQdJLdGUajUyy8uwtZGjBoNRdcJJql2tWEtQw2ZGeZOruAnwIK7n4Rh/h5MLF3Z5Sk6uYEdtS0WHXE9eToRmpeJG56OK0hPtOW6yrlPQsbF5d2G/I4MH9+pZl7x6BJcxiIagfacmK2FjGaOAeODx8qgtBM2AzF/rpUkoznikifTcPLvIST9r+5dE23lJ1h6BMrvLoNQq3X4mWC7eeekX9Lne7YB7HMlbi7IW+L9sdFrrqRiQNYSrHkeRsd/DwviYMklvhsJrblEy/tjuyNE8E1XGYymeVC326jZ0PX6mpNOkd2D4lTJ9xE6bp+spCpnIjqZVBnXxY072UOaoHMxbKS7jXektbeetZuCz8olbeeEojH9a86hPcPPchtfIebuK5J01b2RgWqzvO3KyOfMdVTiKpO6lOgs1eKqjQm6tspR254iAzEmE0d5VGPqwZyYMLFr5UK8udZyrtmmqlP7tILm5TKx/hPn47UrRfCv2YyiPXqJW/wuLnw5ruBbCZ2xGCVCjiKpvov5NnsRBFazKV6MA9PKx7MKkToqy9gvqMw+uIsuwa0l/yZsJ1lLUEHdW9YVDKTkQZNW520RQ2AqKJ/yCKAmM4vSHpYSBqKQh8Wrbqiv+BiqXNiQSrAx49ABU3Pe5VH2BQ7RZjp0yO45RBP1cqU1nl8g9DgxKwf/tnyKt+kLUzz31UJKslPlGYUkgpPHo6aQqdFNGUiWhKg/5vIwFWUDggGAIAAHATAJ0BKmAAYAA/HYS4Vi0oP6Oh2A5b8COJZizAA32RUQAeXH0ROeF00mnZi3Cs34GHeFMPKVzGYcunK+QUT/C3NINLqvx79scX8ZMM7nOMDHyzSHWtGsvMgTH7nb0+pIN6uZQBvFRXKtc6LLi9ZQKhZpYr8rT0UB1kEjG/CKiGYURHo/GSlciC95/OLqBxBVWF+EQXIuk2N2BdeHYlyj7za59gAP7vgj/+vssoBn+g2iClDvdcp/UtniO+2jSbvjLQJxMg+nshgrmEVmN5CP6WuBcxLLvg24IZX8A5YrLtP8an7/Nkd7QLEI9z46atnISBbVv//+ZHCBt/l34WG4y4SHlW7MycwvHYrwidZNaeubFL6mpQ+pUihICneYd/qB8BdKG9awX0x2uOOKkKGQPK9x7fSPuQZNW+Lmu2Y+jUeZwN1yrkwbehnXsMqt/NLjq0HiFO3YWnXcIRYgINP0JEdn0mOP6J8W/OWcBIXtXOXrLg5PxJ/sY/8xlftuZq1JTekn9p/weYF8plztTMvyJMCH7HPkLYJGxKH8LZxEvVCkZtiibWOHorFyg6N/gAWb3s/RTaJN9KxgaQfmFrEC/k86QuhQ7BT2Ub4KeT6VuvrrqOAN0/rl6JEd1/9VX5gcRVP1B8p+b3VlLEgEDMiUGD19rJh5c1Jd7Slyrx+xMMSdIypKOQZRgInALFaymeFI5w/pgEQfAA";
    }
  });

  // src/assets/react.webp
  var react_default2;
  var init_react3 = __esm({
    "src/assets/react.webp"() {
      react_default2 = "data:image/webp;base64,UklGRmQCAABXRUJQVlA4WAoAAAAQAAAAKwAAKwAAQUxQSBQCAAABoFVte9VMeyTEwbwS6qA4+HBAHFAH1EHGQcYBEl4JSHglvBLuA0I382+OI2IC9N9Yyjv2heqALxdl9YRj+dATSCCW0yOBBJ4fqeRaVKpDmDn4UqSaPD4RLBrWIJK4a1jJD0yELi0gii6D6b2NdvUEeF411vc6y8UDtg2Wi0r/wg02aYPpL7Cgm5n9Ie07VtuevBjeZvvMxhEMM4aMI9jeKc8Ecm9gupxg3xOIxV56JJB3Kdj04kZIN4B4XJmD35NfehJ6tQSbjLw7hA0siLvUWS35GZidNJGlsks1CDsFR5FU8U6XpDkgZklyNmeRZAdRpEoUSSoJmKSJ4STJSCiSVIJNOvjR0KFLko9ckjp0DSdCAo1nsBOXpwnuowJSUkYVplOO8lRhHRkpOdvoAD+1UT8F+OiJSxN5OxmRzJIsTmGSKpH8Ot1gkdTIRdJKr0SRZM2PrUhSsDQ2SXPSdG7QTc6PDja9/CQ047IOXeMN6FA0kfaKwY8KdMhV19aB7FPp+CtOL1MD6KaXzTkHtHmabjZN9Tck573o3UZvzvvpW6fp7c4i6fazQ/gRfkBfbpIq/VOSnKNIJTg0/E4JjlIOwr7QWEey4DgI03ilvbfSL2QBYbrcWd4zslzMCbFcWGLvyWkDc/Adug1+4/rgLfF5Xh1ylR4Jvk7VSfuE5uCcrUiSdYZ512et7t7Xokurzfta9H8TVlA4ICoAAAAwAwCdASosACwAP/3+/3+/uzayI4gD8D+JaQAAG4G9Pg4AAP7mtQAAAAA=";
    }
  });

  // src/plugins/settings/pages/About.tsx
  function AboutSettingsPage() {
    var runtimeProps = HermesInternal.getRuntimeProperties();
    return /* @__PURE__ */ jsxs(Stack, {
      style: {
        paddingHorizontal: 16,
        paddingVertical: 24
      },
      spacing: 16,
      direction: "vertical",
      children: [
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "App",
          children: [
            {
              label: "Revenge",
              icon: {
                uri: revenge_default
              },
              trailing: "local"
            },
            {
              label: "Discord",
              icon: assets2.getIndexByName("Discord"),
              trailing: `${ClientInfoModule.Version} (${ClientInfoModule.Build})`
            }
          ].map((props) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: This page never gets updated
            /* @__PURE__ */ jsx(VersionRow, {
              ...props
            })
          ))
        }),
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "React",
          children: [
            {
              label: "React",
              icon: {
                uri: react_default2
              },
              trailing: React.version
            },
            {
              label: "React Native",
              icon: {
                uri: react_default2
              },
              trailing: runtimeProps["OSS Release Version"].slice(7)
            },
            {
              label: "Hermes Bytecode",
              icon: {
                uri: hermes_default
              },
              trailing: `${runtimeProps["Bytecode Version"]} (${runtimeProps.Build})`
            }
          ].map((props) => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: This page never gets updated
            /* @__PURE__ */ jsx(VersionRow, {
              ...props
            })
          ))
        })
      ]
    });
  }
  function VersionRow(props) {
    return /* @__PURE__ */ jsx(TableRow, {
      label: props.label,
      icon: /* @__PURE__ */ jsx(TableRowIcon, {
        source: props.icon
      }),
      trailing: /* @__PURE__ */ jsx(TableRowTrailingText, {
        text: props.trailing
      }),
      onPress: () => {
        clipboard.setString(`${props.label} - ${props.trailing}`);
        toasts.open({
          key: `revenge.toasts.settings.about.copied:${props.label}`,
          content: "Copied to clipboard",
          icon: assets2.getIndexByName("CopyIcon")
        });
      }
    });
  }
  var assets2;
  var init_About = __esm({
    "src/plugins/settings/pages/About.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_common();
      init_components();
      init_native();
      init_hermes();
      init_react3();
      init_revenge();
      ({ assets: assets2 } = revenge);
    }
  });

  // src/plugins/settings/pages/CustomPageRenderer.tsx
  function CustomPageRenderer() {
    var navigation = NavigationNative.useNavigation();
    var route = NavigationNative.useRoute();
    var { render: PageComponent, ...args } = route.params;
    React.useEffect(() => void navigation.setOptions({
      ...args
    }), []);
    return /* @__PURE__ */ jsx(PageComponent, {});
  }
  var init_CustomPageRenderer = __esm({
    "src/plugins/settings/pages/CustomPageRenderer.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_common();
    }
  });

  // src/plugins/settings/pages/DebugPerformanceTimes.tsx
  function DebugPerformanceTimesSettingsPage() {
    var previousTimestamp;
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [
        /* @__PURE__ */ jsx(Text, {
          color: "text-danger",
          children: "Some delta times may be inaccurate as some steps run concurrently to each other. Only look at delta times when necessary. Steps that are marked in red were skipped/not recorded."
        }),
        PerformanceTimesKeys.map((key) => {
          var timeNumber = timeOf(key);
          previousTimestamp ??= timestampOf(key);
          var time = timeNumber.toFixed(4);
          var delta = (timestampOf(key) - previousTimestamp).toFixed(4);
          if (!Number.isNaN(timeNumber)) previousTimestamp = timestampOf(key);
          return (
            // biome-ignore lint/correctness/useJsxKeyInIterable: This never gets rerendered
            /* @__PURE__ */ jsx(TableRow, {
              variant: Number.isNaN(timeNumber) ? "danger" : "default",
              label: key,
              subLabel: `${time}ms (\u0394: ${delta}ms)`
            })
          );
        })
      ]
    });
  }
  var PerformanceTimesKeys;
  var init_DebugPerformanceTimes = __esm({
    "src/plugins/settings/pages/DebugPerformanceTimes.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_src();
      init_components();
      PerformanceTimesKeys = Object.keys(PerformanceTimes).sort((a, b3) => timeOf(a) - timeOf(b3));
    }
  });

  // src/plugins/settings/pages/Developer.tsx
  function DeveloperSettingsPage() {
    var { assets: assets3, modules: modules2 } = revenge;
    var navigation = NavigationNative.useNavigation();
    var evalCodeRef = React.useRef("");
    useObservable([
      settings
    ]);
    return /* @__PURE__ */ jsxs(Stack, {
      style: {
        paddingHorizontal: 16,
        paddingVertical: 24
      },
      spacing: 16,
      direction: "vertical",
      children: [
        /* @__PURE__ */ jsxs(TableRowGroup, {
          children: [
            /* @__PURE__ */ jsx(TableSwitchRow, {
              label: "Patch ErrorBoundary",
              subLabel: "Allows you to see a more detailed error screen, but may slow down the app during startup.",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                source: assets3.getIndexByName("ScreenXIcon")
              }),
              value: settings.developer.patchErrorBoundary,
              onValueChange: (v2) => settings.developer.patchErrorBoundary = v2
            }),
            /* @__PURE__ */ jsx(TableRow, {
              label: "Evaluate JavaScript",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                source: assets3.getIndexByName("PaperIcon")
              }),
              onPress: () => {
                alerts.openAlert("revenge.plugins.settings.developer.evaluate", /* @__PURE__ */ jsx(AlertModal, {
                  title: "Evaluate JavaScript",
                  extraContent: /* @__PURE__ */ jsx(TextArea, {
                    autoFocus: true,
                    label: "Code",
                    size: "md",
                    placeholder: "ReactNative.NativeModules.BundleUpdaterManager.reload()",
                    onChange: (v2) => evalCodeRef.current = v2
                  }),
                  actions: /* @__PURE__ */ jsxs(Stack, {
                    children: [
                      /* @__PURE__ */ jsx(AlertActionButton, {
                        text: "Evaluate",
                        variant: "primary",
                        onPress: () => alert(modules2.findProp("inspect")(
                          // biome-ignore lint/security/noGlobalEval: This is intentional
                          globalThis.eval(evalCodeRef.current),
                          {
                            depth: 5
                          }
                        ))
                      }),
                      /* @__PURE__ */ jsx(AlertActionButton, {
                        text: "Cancel",
                        variant: "secondary"
                      })
                    ]
                  })
                }));
              }
            })
          ]
        }),
        /* @__PURE__ */ jsxs(TableRowGroup, {
          title: "Tests",
          children: [
            /* @__PURE__ */ jsx(TableRow, {
              label: "Test CustomPageRenderer",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                source: assets3.getIndexByName("ScreenArrowIcon")
              }),
              onPress: () => navigation.navigate("RevengeCustomPage", {
                title: "Custom Page Test",
                render: () => null
              })
            }),
            /* @__PURE__ */ jsx(TableRow, {
              variant: "danger",
              label: "Test ErrorBoundary",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                variant: "danger",
                source: assets3.getIndexByName("ScreenXIcon")
              }),
              onPress: () => navigation.navigate("RevengeCustomPage", {
                title: "ErrorBoundary Test",
                // @ts-expect-error: This will do it
                render: () => /* @__PURE__ */ jsx("undefined", {})
              })
            })
          ]
        }),
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "Performance",
          children: /* @__PURE__ */ jsx(TableRow, {
            label: "Show Debug Performance Times",
            icon: /* @__PURE__ */ jsx(TableRowIcon, {
              source: assets3.getIndexByName("TimerIcon")
            }),
            onPress: () => navigation.navigate("RevengeDebugPerformanceTimes")
          })
        }),
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "Caches",
          children: /* @__PURE__ */ jsx(TableRow, {
            variant: "danger",
            label: "Recreate Metro Cache",
            subLabel: "Module blacklists, lookup flags, asset index maps, asset module ID maps. This will reload the app.",
            icon: /* @__PURE__ */ jsx(TableRowIcon, {
              variant: "danger",
              source: assets3.getIndexByName("TrashIcon")
            }),
            onPress: () => {
              modules2.metro.invalidateCache();
              BundleUpdaterManager.reload();
            }
          })
        })
      ]
    });
  }
  var init_Developer = __esm({
    "src/plugins/settings/pages/Developer.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_common();
      init_components();
      init_native();
      init_src5();
      init_src4();
    }
  });

  // src/plugins/settings/pages/Revenge.tsx
  function RevengeSettingsPage() {
    var { assets: assets3 } = revenge;
    var navigation = NavigationNative.useNavigation();
    useObservable([
      settings
    ]);
    return /* @__PURE__ */ jsxs(Stack, {
      style: {
        paddingHorizontal: 16,
        paddingVertical: 24
      },
      spacing: 16,
      direction: "vertical",
      children: [
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "Info",
          children: /* @__PURE__ */ jsx(TableRow, {
            label: "About",
            icon: /* @__PURE__ */ jsx(TableRowIcon, {
              source: assets3.getIndexByName("CircleInformationIcon")
            }),
            trailing: /* @__PURE__ */ jsx(TableRow.Arrow, {}),
            onPress: () => navigation.push("RevengeAbout")
          })
        }),
        /* @__PURE__ */ jsx(TableRowGroup, {
          title: "Actions",
          children: /* @__PURE__ */ jsx(TableRow, {
            label: "Reload Discord",
            icon: /* @__PURE__ */ jsx(TableRowIcon, {
              source: assets3.getIndexByName("RetryIcon")
            }),
            // Passing BundleUpdaterManager.reload directly just explodes for some reason. Maybe onPress had args?
            onPress: () => BundleUpdaterManager.reload()
          })
        }),
        /* @__PURE__ */ jsxs(TableRowGroup, {
          title: "Advanced",
          children: [
            /* @__PURE__ */ jsx(TableSwitchRow, {
              label: "Show Developer Options",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                source: assets3.getIndexByName("WrenchIcon")
              }),
              value: settings.developer.settingsPageShown,
              onValueChange: (v2) => settings.developer.settingsPageShown = v2
            }),
            ...rows.map((Row, index) => /* @__PURE__ */ jsx(Row, {}, index.toString()))
          ]
        })
      ]
    });
  }
  function internal_addTableRowsToAdvancedSectionInRevengePage(...comps) {
    rows.push(...comps);
  }
  var rows;
  var init_Revenge = __esm({
    "src/plugins/settings/pages/Revenge.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_common();
      init_components();
      init_native();
      init_src5();
      init_src4();
      rows = [];
    }
  });

  // src/plugins/settings/index.tsx
  var getCustomRows, transformRowToRawRow;
  var init_settings2 = __esm({
    "src/plugins/settings/index.tsx"() {
      "use strict";
      init_components();
      init_internals();
      init_react2();
      init_settings();
      init_src5();
      init_revenge();
      init_About();
      init_CustomPageRenderer();
      init_DebugPerformanceTimes();
      init_Developer();
      init_Revenge();
      registerPlugin({
        name: "Settings",
        author: "The Revenge Team",
        description: "Settings menus for Revenge",
        id: "revenge.settings",
        version: "1.0.0",
        icon: "SettingsIcon",
        afterAppRender({ patcher: patcher5, revenge: { assets: assets3, modules: modules2, ui: { settings: sui } } }) {
          setTimeout(() => {
            var SettingsConstants = modules2.findByProps("SETTING_RENDERER_CONFIG");
            var SettingsOverviewScreen = modules2.findByName("SettingsOverviewScreen", false);
            var originalRendererConfig = SettingsConstants.SETTING_RENDERER_CONFIG;
            var rendererConfig = originalRendererConfig;
            Object.defineProperty(SettingsConstants, "SETTING_RENDERER_CONFIG", {
              enumerable: true,
              configurable: true,
              get: () => ({
                ...getCustomRows(),
                ...rendererConfig
              }),
              set: (v2) => rendererConfig = v2
            });
            patcher5.after(SettingsOverviewScreen, "default", (_2, children) => {
              var registeredCustomRows = new Set(Object.values(customData.sections).flatMap(({ settings: settings2 }) => Object.keys(settings2)));
              var { sections } = findInReactTree(children, (i) => i.props?.sections).props;
              if (sections.findIndex((section2) => section2.settings.some((setting) => registeredCustomRows.has(setting))) !== -1) return;
              var index = -~sections.findIndex((section2) => section2.settings.includes("ACCOUNT")) || 1;
              for (var key in customData.sections) {
                var section = customData.sections[key];
                sections.splice(index++, 0, {
                  label: section.name,
                  settings: Object.keys(section.settings)
                });
              }
            }, "addNewSettingsSections");
            sui.createSection({
              name: "Revenge",
              settings: {
                Revenge: {
                  type: "route",
                  label: "Revenge",
                  icon: {
                    uri: revenge_default
                  },
                  component: RevengeSettingsPage
                },
                RevengeDeveloper: {
                  type: "route",
                  label: "Developer",
                  icon: assets3.getIndexByName("WrenchIcon"),
                  component: DeveloperSettingsPage,
                  predicate: () => settings.developer.settingsPageShown
                }
              }
            });
            sui.createRoute("RevengeAbout", {
              type: "route",
              label: "About",
              component: AboutSettingsPage,
              icon: assets3.getIndexByName("CircleInformationIcon")
            });
            sui.createRoute("RevengeDebugPerformanceTimes", {
              type: "route",
              label: "Debug Performance Times",
              component: DebugPerformanceTimesSettingsPage,
              icon: assets3.getIndexByName("TimerIcon")
            });
            sui.createRoute("RevengeCustomPage", {
              type: "route",
              label: "Revenge Page",
              unsearchable: true,
              component: CustomPageRenderer,
              predicate: () => false
            });
          });
        }
      }, true);
      getCustomRows = () => {
        return [
          ...Object.values(customData.sections),
          {
            name: "(unbound)",
            settings: customData.rows
          }
        ].map((section) => Object.entries(section.settings).reduce((rows2, [key, row]) => {
          rows2[key] = transformRowToRawRow(key, row);
          return rows2;
        }, {})).reduce((rows2, newRows) => Object.assign(rows2, newRows), {});
      };
      transformRowToRawRow = (key, row) => {
        return {
          title: () => row.label,
          parent: row.parent ?? null,
          icon: row.icon,
          IconComponent: row.icon ? () => TableRowIcon({
            source: row.icon
          }) : void 0,
          unsearchable: row.unsearchable,
          screen: row.type === "route" ? {
            route: key,
            getComponent: () => row.component
          } : void 0,
          onPress: row.onPress,
          useDescription: row.description ? () => row.description : void 0,
          useTrailing: row.trailing ? () => row.trailing : void 0,
          useIsDisabled: typeof row.disabled === "boolean" ? () => row.disabled : void 0,
          usePredicate: row.predicate,
          onValueChange: row.onValueChange,
          useValue: () => row.value,
          type: row.type
        };
      };
    }
  });

  // src/plugins/staff-settings/index.tsx
  var originalValue, isStaffSettingsShown;
  var init_staff_settings = __esm({
    "src/plugins/staff-settings/index.tsx"() {
      "use strict";
      init_react_jsx_runtime();
      init_components();
      init_internals();
      init_src4();
      init_Revenge();
      isStaffSettingsShown = () => true;
      registerPlugin({
        name: "Staff Settings",
        author: "The Revenge Team",
        description: "Enables access to staff settings on Discord",
        id: "revenge.staff-settings",
        version: "1.0.0",
        icon: "ic_progress_wrench_24px",
        onMetroModuleLoad(_2, __, exports, unsub) {
          if (exports.default?.constructor?.displayName === "DeveloperExperimentStore") {
            unsub();
            exports.default = new Proxy(exports.default, {
              get(target, property, receiver) {
                if (property === "isDeveloper") {
                  originalValue &&= Reflect.get(target, property, receiver);
                  return isStaffSettingsShown();
                }
                return Reflect.get(target, property, receiver);
              }
            });
          }
        },
        beforeAppRender({ cleanup, storage, revenge: { assets: assets3 } }) {
          cleanup(() => isStaffSettingsShown = () => originalValue);
          isStaffSettingsShown = () => storage[storageContextSymbol].ready ? storage.enabled : true;
          internal_addTableRowsToAdvancedSectionInRevengePage(() => {
            useObservable([
              storage
            ]);
            return /* @__PURE__ */ jsx(TableSwitchRow, {
              label: "Show Discord Staff Settings",
              icon: /* @__PURE__ */ jsx(TableRowIcon, {
                source: assets3.getIndexByName("ic_progress_wrench_24px")
              }),
              value: storage.enabled,
              onValueChange: (v2) => storage.enabled = v2
            });
          });
        },
        initializeStorage: () => ({
          enabled: false
        })
      }, true);
    }
  });

  // src/plugins/index.ts
  var plugins_exports = {};
  var init_plugins = __esm({
    "src/plugins/index.ts"() {
      "use strict";
      init_warnings();
      init_settings2();
      init_staff_settings();
    }
  });

  // src/index.ts
  init_async_to_generator();
  init_functions();
  init_library();
  init_src();
  init_constants();
  init_native();
  init_errors();
  init_src2();
  function initialize() {
    return _initialize.apply(this, arguments);
  }
  function _initialize() {
    _initialize = // ! This function is BLOCKING, so we need to make sure it's as fast as possible
    _async_to_generator(function* () {
      var [{ createModulesLibrary: createModulesLibrary2 }, UIColorsLibrary, { SettingsUILibrary: SettingsUILibrary2 }] = yield Promise.all([
        Promise.resolve().then(() => (init_src3(), src_exports)),
        Promise.resolve().then(() => (init_colors(), colors_exports)),
        Promise.resolve().then(() => (init_settings(), settings_exports))
      ]);
      recordTimestamp("Init_Initialize");
      Object.freeze = Object.seal = (o) => o;
      var UILibrary = {
        settings: SettingsUILibrary2,
        colors: UIColorsLibrary
      };
      try {
        var ModulesLibraryPromise = createModulesLibrary2();
        var [{ AppLibrary: AppLibrary2 }, { AssetsLibrary: AssetsLibrary2 }] = yield Promise.all([
          Promise.resolve().then(() => (init_src6(), src_exports4)),
          Promise.resolve().then(() => (init_src7(), src_exports5))
        ]);
        var ModulesLibrary = yield ModulesLibraryPromise;
        var [{ PluginsLibrary: PluginsLibrary2, startCorePlugins: startCorePlugins2, startCorePluginsMetroModuleSubscriptions: startCorePluginsMetroModuleSubscriptions2 }, { awaitStorage: awaitStorage2 }] = yield Promise.all([
          Promise.resolve().then(() => (init_src8(), src_exports6)),
          Promise.resolve().then(() => (init_src4(), src_exports2))
        ]);
        var PreferencesLibrary = Promise.resolve().then(() => (init_src5(), src_exports3));
        var CorePlugins = Promise.resolve().then(() => (init_plugins(), plugins_exports)).then(() => {
          recordTimestamp("Plugins_CoreImported");
          startCorePluginsMetroModuleSubscriptions2();
        });
        globalThis.revenge = {
          app: AppLibrary2,
          assets: AssetsLibrary2,
          modules: ModulesLibrary,
          plugins: PluginsLibrary2,
          ui: UILibrary
        };
        PreferencesLibrary.then(/* @__PURE__ */ function() {
          var _ref = _async_to_generator(function* ({ settings: settings2 }) {
            yield awaitStorage2(settings2);
            recordTimestamp("Storage_Initialized");
            CorePlugins.then(() => {
              startCorePlugins2();
              recordTimestamp("Plugins_CoreStarted");
            });
          });
          return function(_2) {
            return _ref.apply(this, arguments);
          };
        }());
      } catch (e) {
        onError(e);
      }
    });
    return _initialize.apply(this, arguments);
  }
  function onError(e) {
    console.error(`Failed to load Revenge: ${getErrorStack(e)}`);
    alert([
      "Failed to load Revenge\n",
      `Build Number: ${ClientInfoModule.Build}`,
      getErrorStack(e)
    ].join("\n"));
  }
  var requireFunc;
  var initialized = false;
  var patcher4 = createPatcherInstance("revenge.library.init");
  var logger2 = createLogger("init");
  var ErrorTypeWhitelist = [
    ReferenceError,
    TypeError,
    RangeError
  ];
  Promise._m = (promise, err) => {
    if (err) setTimeout(() => {
      if (promise._h === 0) logger2.error(`Unhandled promise rejection: ${getErrorStack(err)}`);
    }, ErrorTypeWhitelist.some((it) => err instanceof it) ? 0 : 2e3);
  };
  if (typeof __r !== "undefined") initialize();
  function onceIndexRequired() {
    recordTimestamp("Native_RequiredIndex");
    var batchedBridge = __fbBatchedBridge;
    var callQueue = [];
    var unpatch2 = patcher4.instead(batchedBridge, "callFunctionReturnFlushedQueue", (args, orig) => {
      if (args[0] === "AppRegistry" || !batchedBridge.getCallableModule(args[0])) {
        callQueue.push(args);
        return batchedBridge.flushedQueue();
      }
      return orig.apply(batchedBridge, args);
    }, "holdNativeCalls");
    initialize().then(() => {
      recordTimestamp("Init_PromiseResolved");
      unpatch2();
      for (var queue of callQueue) batchedBridge.getCallableModule(queue[0]) && batchedBridge.__callFunction(...queue);
    }).catch(onError);
  }
  Object.defineProperties(globalThis, {
    __r: {
      configurable: true,
      get: () => requireFunc,
      set(metroRequire) {
        requireFunc = function patchedRequire(id) {
          if (id === IndexMetroModuleId) {
            if (initialized) return;
            initialized = true;
            onceIndexRequired();
            requireFunc = metroRequire;
          } else return metroRequire(id);
        };
      }
    },
    __d: {
      configurable: true,
      get() {
        globalThis.modules ??= __c?.();
        return this.value;
      },
      set(v2) {
        this.value = v2;
      }
    }
  });
})();
//# sourceURL=revenge
