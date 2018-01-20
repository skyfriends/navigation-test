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
})({14:[function(require,module,exports) {
pageinfo = [[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716896,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null],
	[1509716897,0,0,0,null]];
pagedata = [ ["./001_000_001.aspx","Hills Pet Nutrition","Hills Pet Nutrition System Overview Figure 1 APM System Important Links Customer Specific Documents Vendor Information ",""],
["./001_001_001.aspx","General Information","1 General Information 1.1 Document Overview This APM Control System User manual document is intended to be useful in training new users how to ope...",""],
["./001_001_002.aspx","Acronyms","1 General Information 1.2 Acronyms A list of the acronyms that appear in this document, and what they stand for, is provided in Table 1.1 . Table ...",""],
["./001_001_003.aspx","Equipment Description","1 General Information 1.3 Equipment Description 1.3.1 Section Overview This section provides information regarding the physical equipment that is ...",""],
["./001_002_001.aspx","APM Startup","2 APM Startup 2.1 Overview This chapter addresses what the operator will need to know to get the APM computer up and running and to the point that...",""],
["./001_003_001.aspx","APM Screens","3 APM Screens 3.1 Information Common to All Screens 3.1.1 Section Overview This section addresses some of the Automated Process Management (APM) s...",""],
["./001_003_002.aspx","Main Screen","3 APM Screens 3.2 Main Screen 3.2.1 Section Overview This chapter will discuss the four rectangular color-coded regions of the Main screen and the...",""],
["./001_003_003.aspx","Extruder Overview Screen","3 APM Screens 3.3 Extruder Overview Screen 3.3.1 Section Overview This section discusses the Extruder Overview screen. The operation of most of th...",""],
["./001_003_004.aspx","Extruder Barrel Temperatures Screen","3 APM Screens 3.4 Extruder Barrel Temperatures Screen 3.4.1 Section Overview The Extruder Barrel Temperatures screen displays the measured tempera...",""],
["./001_003_005.aspx","Extruder Liquids 1 Screen","3 APM Screens 3.5 Extruder Liquids 1 Screen 3.5.1 Section Overview The Extruder Liquids 1 screen allows the user to monitor and control the flow r...",""],
["./001_003_006.aspx","Extruder Liquids 2 Screen","3 APM Screens 3.6 Extruder Liquids 2 Screen 3.6.1 Section Overview Although the Extruder Liquids 2 screen is not a standard feature for all extrud...",""],
["./001_003_007.aspx","Trends Screen","3 APM Screens 3.7 Trends Screen 3.7.1 Section Overview A trend is a graphical representation of changes to tag values over time. The trends screen...",""],
["./001_003_008.aspx","Formula Screen","3 APM Screens 3.8 Formula Screen 3.8.1 Section Overview Formulas, also referred to as recipes, are collections of extruder system parameters (e.g....",""],
["./001_003_009.aspx","Utility Screen","3 APM Screens 3.9 Utility Screen 3.9.1 Section Overview The Utility screen features a handful of buttons that allow the operator to execute some m...",""],
["./001_003_010.aspx","Maintenance Screen","3 APM Screens 3.10 Maintenance Screen 3.10.1 Section Overview Wenger recommends that customers perform certain reoccurring maintenance operations ...",""],
["./001_003_011.aspx","Alarm Summary Screen","3 APM Screens 3.11 Alarm Summary Screen 3.11.1 Section Overview The Alarm Summary screen displays all currently active alarms, both unacknowledged...",""],
["./001_003_012.aspx","Alarm Log Viewer Screen","3 APM Screens 3.12 Alarm Log Viewer Screen 3.12.1 Section Overview The Alarm Log Viewer screen displays the alarms that have occurred during the m...",""],
["./001_003_013.aspx","Totalizer Screen","3 APM Screens 3.13 Totalizer Screen 3.13.1 Section Overview The Totalizer screen displays a running total of the mass of each product ingredient t...",""],
["./001_003_014.aspx","Print Data Sheet Screen","3 APM Screens 3.14 Print Data Sheet Screen 3.14.1 Section Overview The Print Data Sheet screen displays what are generally considered the most imp...",""],
["./001_003_015.aspx","Display Languages switching","3 APM Screens 3.15 Display Languages switching 3.15.1 Section Overview Where the APM is supplied to Non-English speaking CE countries, Wenger will...",""],
["./001_004_001.aspx","Programmable Logic Controller","4 Programmable Logic Controller 4.1 Section Overview This chapter describes in detail a handful of Wenger-developed Programmable Logic Controller ...",""],
["./001_004_002.aspx","Definitions","4 Programmable Logic Controller 4.2 Definitions Knowing the following definitions will help make the procedures that follow easier to grasp. Table...",""],
["./001_004_003.aspx","Extruder Startup Initial Conditions Checklist","4 Programmable Logic Controller 4.3 Extruder Startup Initial Conditions Checklist The following should be verified prior to attempting any type of...",""],
["./001_004_004.aspx","Extruder System Normal Startup Sequence","4 Programmable Logic Controller 4.4 Extruder System Normal Startup Sequence To initiate a PLC-managed extruder system normal startup, the operator...",""],
["./001_004_005.aspx","Extruder System Normal Operation After Startup","4 Programmable Logic Controller 4.5 Extruder System Normal Operation After Startup After PLC executes the extruder system&#39;s startup sequence to co...",""],
["./001_004_006.aspx","Extruder System Normal Shutdown Sequence","4 Programmable Logic Controller 4.6 Extruder System Normal Shutdown Sequence To initiate an PLC-managed extruder system normal shutdown, the opera...",""],
["./001_004_007.aspx","Extruder System Empty Bins Shutdown Sequence","4 Programmable Logic Controller 4.7 Extruder System Empty Bins Shutdown Sequence To initiate an PLC-controlled extruder system empty bins shutdown...",""],
["./001_004_008.aspx","Extruder System Warm Restart Sequence","4 Programmable Logic Controller 4.8 Extruder System Warm Restart Sequence There is a short time interval following an extruder system shutdown dur...",""],
["./001_004_009.aspx","Extruder Barrel Flush Sequence","4 Programmable Logic Controller 4.9 Extruder Barrel Flush Sequence The extruder barrel flush sequence is a maintenance utility whose purpose is to...",""],
["./001_004_010.aspx","Preconditioner Flush Sequences","4 Programmable Logic Controller 4.10 Preconditioner Flush Sequences There are two preconditioner flush sequences whose purpose is to assist is rem...",""],
["./001_004_011.aspx","Dry Feed Test Mode Sequence","4 Programmable Logic Controller 4.11 Dry Feed Test Mode Sequence The purpose of the PLC-managed dry feed test mode utility is to facilitate calibr...",""],
["./001_004_012.aspx","Other Operations","4 Programmable Logic Controller 4.12 Other Operations 4.12.1 Emergency-Stopping Each extruder system features two emergency stop (E-Stop) pushbutt...",""],
["./001_005_001.aspx","Alarms","5 Alarms 5.1 Chapter Overview Alarms are an important part of Wenger Automated Process Management (APM) Control Systems because they alert operato...",""],
["./001_005_002.aspx","Details","5 Alarms 5.2 Details All currently active alarms are always displayed in a field in the top right corner of the APM monitor Figure 5.1 , regardles...",""],
["./001_005_003.aspx","Immediate Shutdown Alarms","5 Alarms 5.3 Immediate Shutdown Alarms When any one of the alarms occur that are listed in Table 5.1 , the PLC executes an immediate extruder syst...",""],
["./001_005_004.aspx","Quick Shutdown Alarms","5 Alarms 5.4 Quick Shutdown Alarms When any one of the alarms occurs that are listed in Table 5.2 , the PLC executes a quick extruder system shutd...",""],
["./001_005_005.aspx","Normal Shutdown Alarms","5 Alarms 5.5 Normal Shutdown Alarms When any one of the alarms occurs that are listed in Table 5.3 , the PLC executes a normal extruder system shu...",""],
["./001_005_006.aspx","Annunciation Only Alarms","5 Alarms 5.6 Annunciation Only Alarms The alarms that are listed in Table 5.4 , are annunciation-only alarms; they do not cause the PLC to shutdow...",""],
["./001_006_001.aspx","Customer Specific Documents","6 Customer Specific Documents 6.1 System Technical Specification Overview Order Entry Form ",""],
["./001_006_002.aspx","Equipment Utility Specifications","6 Customer Specific Documents 6.2 Equipment Utility Specifications Utility Specifications are not included in this manual, contact Wenger Engineer...",""],
["./001_006_003.aspx","Engineering Drawings","6 Customer Specific Documents 6.3 Engineering Drawings 6.3.1 Plant Layout and General Dimension Drawings Plant Layout and General Dimension Drawin...",""],
["./001_007_001.aspx","Vendor Information","7 Vendor Information 7.1 Vendor Documents 82514139-PLATE-ANTI ROTATION (800F-ALC1) 82515321-SW-SEL, 2 POSN, 22MM SPR TO LFT 82516301-PB-EXT HD,22M...",""],
["./001_008_001.aspx","Manuals Evaluation Form","8 Manuals Evaluation Form 8.1 (Suggestions for Improvement) The startup and commission of the Wenger Equipment, by the startup service technician�...",""],
["./csd.aspx","Engineering Drawings","6 Customer Specific Documents 6.3 Engineering Drawings 6.3.1 Plant Layout and General Dimension Drawings Plant Layout and General Dimension Drawin...",""],
["./vi.aspx","Vendor Information","7 Vendor Information 7.1 Vendor Documents 82514139-PLATE-ANTI ROTATION (800F-ALC1) 82515321-SW-SEL, 2 POSN, 22MM SPR TO LFT 82516301-PB-EXT HD,22M...",""]];

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
},{}]},{},[0,14])