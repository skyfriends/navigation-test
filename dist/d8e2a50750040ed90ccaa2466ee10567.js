// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
let thing = document.getElementById('container-fluid');
console.log(thing);

let reading = () => $(thing).load('001_000_001.html #container-fluid');
console.log(reading);

var menuText = '';

menuText += '<ul class="sidenav dropable sticky">';
menuText +=
  '<li id="a000" onclick="reading()"><a href="001_000_001.html">Royal Canin</a>';
menuText += '<ul>';
menuText += '<li><a href="001_000_001.html#d6e23">System Overview</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li id="a001"><a href="001_001_001.html">General Information</a>';
menuText += '<ul>';
menuText += '<li><a href="001_001_001.html#d6e304">Document Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_001_002.html#id172NEK090PF">Acronyms</a>';
menuText += '</li>';
menuText += '<li><a href="001_001_003.html#d6e494">Equipment Description</a>';
menuText += '<ul>';
menuText += '<li><a href="001_001_003.html#d6e498">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_001_003.html#d6e517">Control Room Console</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_001_003.html#d6e779">Auxiliary Factory Floor Station</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li id="a002"><a href="001_002_001.html">APM Startup</a>';
menuText += '<ul>';
menuText += '<li><a href="001_002_001.html#d6e814">Overview</a>';
menuText += '<ul>';
menuText += '<li><a href="001_002_001.html#d6e847">User Accounts</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_002_001.html#d6e860">Windows Operating System User Accounts</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_002_001.html#d6e882">APM Software User Accounts</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_002_001.html#d6e960">Powering Up the Computer, and Logging into Windows</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_002_001.html#d6e1039">Switching APM Software User Types</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li id="a003"><a href="001_003_001.html">APM Screens</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_003_001.html#d6e1154">Information Common to All Screens</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_001.html#d6e1158">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_001.html#d6e1187">Header and Status Bar</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_003_001.html#d6e1223">Main Screen Header - Left Zone</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e1243">Main Screen Header - Mid Zone</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e1263">Main Screen Header - Right Zone</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_001.html#d6e1283">Status Bar</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e1299">Graphical Shapes and Cooler Conventions</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_001.html#d6e1303">Devices</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_001.html#d6e1377">Process Flows</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e1415">Hand-Off-Auto and Proportional-Integral-Derivative Faceplate’s</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_003_001.html#d6e1516">HOA Faceplate’s for Motors Driving Fixed-Speed Devices</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e1868">HOA Faceplate’s for Motors Driving Variable-Speed Devices</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e2129">HOA Faceplate’s for Gates</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e2390">PID Faceplate’s for Controlling Flow Rates</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_001.html#d6e2616">PID Faceplate’s for Controlling Temperatures</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_002.html#CECEIDBEF2">Main Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_002.html#d6e2873">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_002.html#d6e2889">Screen Regions</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_002.html#d6e2960">Extruder System Function Buttons</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_002.html#d6e3083">General Purpose Function Buttons</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_003.html#BABBFGJJF7">Extruder Overview Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_003.html#d6e3320">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e3354">Entire Screen</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e3382">Feeder Section</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_003_003.html#CJAJIJGCC2">Gravimetric Feed Mode</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e3707">Volumetric Feed Mode</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e3717">Preconditioner Section</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#CIHCCCJHD5">Extruder Section</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e4942">Knife Section</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_003.html#d6e5190">Miscellaneous Features</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_004.html#BABBEEJFE0">Extruder Barrel Temperatures Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_004.html#d6e5532">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_004.html#d6e5545">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_005.html#id17AIF0F07Y4">Extruder Liquids 1 Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_005.html#d6e5748">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_005.html#d6e5781">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_006.html#id17AIF5080HS">Extruder Liquids 2 Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_006.html#d6e5996">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_006.html#d6e6006">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_007.html#id17AIFB00SUI">Trends Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_007.html#d6e6449">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_007.html#d6e6462">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_008.html#id17AIFE00OYK">Formula Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_008.html#d6e6573">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_008.html#d6e6643">Formula Screen</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_008.html#d6e6812">Load Formula Screen</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e6933">Add/Edit Formula Screen</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e7016">Creating a Completely New Formula</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e7090">Creating a New Formula from an Existing Formula</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e7205">Modifying an Existing Formula</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e7304">Deleting an Existing Formula</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_008.html#d6e7375">Updating Formula Values with Current PLC Setpoints</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_009.html#id17AIFF008HT">Utility Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_009.html#d6e7481">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_009.html#d6e7491">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_010.html#id17AIFF010PF">Maintenance Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_010.html#d6e7625">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_010.html#d6e7635">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_011.html#id17AIFG00JPN">Alarm Summary Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_011.html#d6e7809">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_011.html#d6e7819">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_012.html#id17AIFG0A07Q">Alarm Log Viewer Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_012.html#d6e7908">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_012.html#d6e7915">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li><a href="001_003_013.html#id17AIFH00H30">Totalizer Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_013.html#d6e7984">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_013.html#d6e7991">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_014.html#id17AIFH080RO">Print Data Sheet Screen</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_014.html#d6e8073">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_014.html#d6e8080">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li><a href="001_003_015.html#id17AIFI00DE9">Display Languages switching</a>';
menuText += '<ul>';
menuText += '<li><a href="001_003_015.html#d6e8140">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_003_015.html#d6e8156">Details</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li id="a004"><a href="001_004_001.html">Programmable Logic Controller</a>';
menuText += '<ul>';
menuText += '<li><a href="001_004_001.html#d6e8223">Section Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_004_002.html#d6e8268">Definitions</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_003.html#d6e8334">Extruder Startup Initial Conditions Checklist</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_004.html#d6e8407">Extruder System Normal Startup Sequence</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_005.html#d6e8687">Extruder System Normal Operation After Startup</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_006.html#d6e8747">Extruder System Normal Shutdown Sequence</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_007.html#d6e8927">Extruder System Empty Bins Shutdown Sequence</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_008.html#d6e8946">Extruder System Warm Restart Sequence</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_009.html#CHDIDIEHC5">Extruder Barrel Flush Sequence</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_010.html#CHDIFACEF2">Preconditioner Flush Sequences</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_011.html#CHDGIAIHF3">Dry Feed Test Mode Sequence</a>';
menuText += '</li>';
menuText += '<li><a href="001_004_012.html#d6e9509">Other Operations</a>';
menuText += '<ul>';
menuText += '<li><a href="001_004_012.html#d6e9513">Emergency-Stopping</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_012.html#d6e9529">Changing the Downspout Position</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_012.html#d6e9536">Changing the Knife Speed</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_004_012.html#d6e9543">Recovering from Excessive Extruder Motor Load</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li id="a005"><a href="001_005_001.html">Alarms</a>';
menuText += '<ul>';
menuText += '<li><a href="001_005_001.html#d6e9573">Chapter Overview</a>';
menuText += '</li>';
menuText += '<li><a href="001_005_002.html#d6e9583">Details</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_005_003.html#BABHDDHHA2">Immediate Shutdown Alarms</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_005_004.html#BABGEDBDC8">Quick Shutdown Alarms</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_005_005.html#BABFHFCCJ8">Normal Shutdown Alarms</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_005_006.html#BABFEIEJB9">Annunciation Only Alarms</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li id="a006"><a href="001_006_001.html">Customer Specific Documents</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_006_001.html#System_Technical_Specifications_Overview">System Technical Specification Overview</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_006_002.html#Equipment_Utility_Specifications">Equipment Utility Specifications</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_006_003.html#Engineering_Drawings">Engineering Drawings</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_006_003.html#Plant_Layout_and_General_Dimension_Drawings">Plant Layout and General Dimension Drawings</a>';
menuText += '</li>';
menuText +=
  '<li><a href="001_006_003.html#Diagrams_and_Schematics">Diagrams and Schematics</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li id="a007"><a href="001_007_001.html">Vendor Information</a>';
menuText += '<ul>';
menuText += '<li><a href="001_007_001.html#d6e13681">Vendor Documents</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText +=
  '<li id="a008"><a href="001_008_001.html">Manuals Evaluation Form</a>';
menuText += '<ul>';
menuText +=
  '<li><a href="001_008_001.html#CIAGFIFDG2">(Suggestions for Improvement)</a>';
menuText += '</li>';
menuText += '</ul>';
menuText += '</li>';
menuText += '<li>&nbsp;</li>';
menuText += '</ul>';

},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:56308/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = () => {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,11])