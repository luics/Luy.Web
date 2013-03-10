/**
 * Stylesheet.js: utility methods for scripting CSS stylesheets.
 * 
 * This module defines a Stylesheet class that is a simple wrapper
 * around an element of the document.styleSheets[] array.  It defines useful
 * cross-platform methods for querying and modifying the stylesheet.
 **/

// Construct a new Stylesheet object that wraps the specified CSSStylesheet.
// If ss is a number, look up the stylesheet in the styleSheet[] array.
function Stylesheet(ss) {
    if (typeof ss == "number") ss = document.styleSheets[ss];
    this.ss = ss;
}

// Return the rules array for this stylesheet.
Stylesheet.prototype.getRules = function() {
    // Use the W3C property if defined; otherwise use the IE property
    return this.ss.cssRules?this.ss.cssRules:this.ss.rules;
}

// Return a rule of the stylesheet.  If s is a number, we return the rule
// at that index.  Otherwise, we assume s is a selector and look for a rule
// that matches that selector.
Stylesheet.prototype.getRule = function(s) {
    var rules = this.getRules();
    if (!rules) return null;
    if (typeof s == "number") return rules[s];
   
    // Assume s is a selector
    // Loop backward through the rules so that if there is more than one
    // rule that matches s, we find the one with the highest precedence.
    s = s.toLowerCase();
    for(var i = rules.length-1; i >= 0; i--) {
        if (rules[i].selectorText.toLowerCase() == s) return rules[i];
    }
    return null;
};

// Return the CSS2Properties object for the specified rule.
// Rules can be specified by number or by selector
Stylesheet.prototype.getStyles = function(s) {
    var rule = this.getRule(s);
    if (rule && rule.style) return rule.style;
    else return null;
};

// Return the style text for the specified rule.
Stylesheet.prototype.getStyleText = function(s) {
    var rule = this.getRule(s);
    if (rule && rule.style && rule.style.cssText) return rule.style.cssText;
    else return "";
};

// Insert a rule into the stylesheet.
// The rule consists of the specified selector and style strings.
// It is inserted at index n.  If n is omitted, it is appended to the end.
Stylesheet.prototype.insertRule = function(selector, styles, n) {
    if (n == undefined) {
        var rules = this.getRules();
        n = rules.length;
    }
    if (this.ss.insertRule)   // Try the W3C API first
        this.ss.insertRule(selector + "{" + styles + "}", n);
    else if (this.ss.addRule) // Otherwise use the IE API
        this.ss.addRule(selector, styles, n);
};

// Remove the rule from the specified position in the stylesheet.
// If s is a number, delete the rule at that position.
// If s is a string, delete the rule with that selector.
// If n is not specified, delete the last rule in the stylesheet.
Stylesheet.prototype.deleteRule = function(s) {
    // If s is undefined, make it the index of the last rule
    if (s == undefined) {
        var rules = this.getRules();
        s = rules.length-1;
    }

    // If s is not a number, look for a matching rule and get its index
    if (typeof s != "number") {
        s = s.toLowerCase();    // convert to lowercase
        var rules = this.getRules();
        for(var i = rules.length-1; i >= 0; i--) {
            if (rules[i].selectorText.toLowerCase() == s) {
                s = i;  // Remember the index of the rule to delete
                break;  // And stop searching
            }
        }

        // If we didn't' find a match, just give up
        if (i == -1) return;
    }

    // At this point s will be a number.
    // Try the W3C API first, then try the IE API
    if (this.ss.deleteRule) this.ss.deleteRule(s);
    else if (this.ss.removeRule) this.ss.removeRule(s);
};
