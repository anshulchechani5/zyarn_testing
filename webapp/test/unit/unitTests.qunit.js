/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Zppyarn_testing/zppyartesting/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
