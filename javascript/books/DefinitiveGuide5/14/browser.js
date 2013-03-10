/**
 * browser.js: a simple client sniffer
 * 
 * This module defines an object named "browser" that is easier to use than
 * the "navigator" object.
 */
var browser = {
    version: parseInt(navigator.appVersion),
    isNetscape: navigator.appName.indexOf("Netscape") != -1, 
    isMicrosoft: navigator.appName.indexOf("Microsoft") != -1
};
