if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
	require("swan-game-adapter.js");
	require("libs/laya.bdmini.js");
} else if (typeof wx!=="undefined") {
	require("weapp-adapter.js");
	require("libs/laya.wxmini.js");
}
window.loadLib = require;
window.screenOrientation="portrait",loadLib("libs/laya.core.js"),loadLib("libs/laya.ui.js"),loadLib("libs/laya.physics.js"),loadLib("js/bundle.js");;