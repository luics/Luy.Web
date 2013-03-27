/**
 * Validate.js: unobtrusive HTML form validation.
 *
 * On document load, this module scans the document for HTML forms and
 * textfield form elements.  If it finds elements that have a "required" or 
 * "pattern" attribute, it adds appropriate event handlers for client-side 
 * form validation.
 *
 * If a form element has a "pattern" attribute, the value of that attribute
 * is used as a JavaScript regular expression, and the element is given an
 * onchange event handler that tests the user's input against the pattern.
 * If the input does not match the pattern, the background color of the
 * input element is changed to bring the error to the user's attention.
 * By default, the textfield value must contain some substring that matches
 * the pattern. If you want to require the complete value to match precisely,
 * use the ^ and $ anchors at the beginning and end of the pattern.
 *
 * A form element with a "required" attribute must have a value provided.
 * The presence of "required" is shorthand for pattern="\S".  That is, it 
 * simply requires that the value contain a single non-whitespace character
 *
 * If a form element passes validation, its "class" attribute is set to 
 * "valid".  And if it fails validation, its class is set to "invalid".
 * In order for this module to be useful, you must use it in conjunction with
 * a CSS stylesheet that defines styles for "invalid" class.  For example:
 *
 *    <!-- attention grabbing orange background for invalid form elements -->
 *    <style>input.invalid { background: #fa0; }</style>
 *
 * When a form is submitted the textfield elements subject to validation are
 * revalidated.  If any fail, the submission is blocked and a dialog box
 * is displayed to the user letting him know that the form is incomplete
 * or incorrect.
 *
 * You may not use this module to validate any form fields or forms on which
 * you define your own onchange or onsubmit event handlers, or any fields
 * for which you define a class attribute.
 *
 * This module places all its code within an anonymous function and does
 * not define any symbols in the global namespace.
 */
(function() { // Do everything in this one anonymous function
    // When the document finishes loading, call init()
    if (window.addEventListener) window.addEventListener("load", init, false);
    else if (window.attachEvent) window.attachEvent("onload", init);

    // Define event handlers for any forms and form elements that need them.
    function init() {
        // Loop through all forms in the document
        for(var i = 0; i < document.forms.length; i++) {
            var f = document.forms[i];  // the form we're working on now

            // Assume, for now, that this form does not need any validation
            var needsValidation = false;

            // Now loop through the elements in our form
            for(j = 0; j < f.elements.length; j++) {
                var e = f.elements[j];  // the element we're working on

                // We're only interested in <input type="text"> textfields
                if (e.type != "text") continue;

                // See if it has attributes that require validation
                var pattern = e.getAttribute("pattern");
                // We could use e.hasAttribute() but IE doesn't support it
                var required = e.getAttribute("required") != null;

                // Required is just a shortcut for a simple pattern
                if (required && !pattern) {
                    pattern = "\\S";
                    e.setAttribute("pattern", pattern);
                }

                // If this element requires validation,
                if (pattern) {
                    // validate the element each time it changes
                    e.onchange = validateOnChange;
                    // Remember to add an onsubmit handler to this form
                    needsValidation = true;
                }
            }

            // If at least one of the form elements needed validation,
            // we also need an onsubmit event handler for the form
            if (needsValidation) f.onsubmit = validateOnSubmit;
        }
    }
          
    // This function is the onchange event handler for textfields that 
    // require validation.  Remember that we converted the required attribute
    // to a pattern attribute in init().
    function validateOnChange() {
        var textfield = this;                            // the textfield
        var pattern = textfield.getAttribute("pattern"); // the pattern
        var value = this.value;                          // the user's input

        // If the value does not match the pattern set the class to "invalid".
        if (value.search(pattern) == -1) textfield.className = "invalid";
        else textfield.className = "valid";
    }

    // This function is the onsubmit event handler for any form that 
    // requires validation.
    function validateOnSubmit() {
        // When the form is submitted, we revalidate all the fields in the
        // form and then check their classNames to see if they are invalid.
        // If any of those fields are invalid, display an alert and prevent
        // form submission.
        var invalid = false;  // Start by assuming everything is valid
        // Loop through all form elements
        for(var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];
            // If the element is a text field and has our onchange handler
            if (e.type == "text" && e.onchange == validateOnChange) {
                e.onchange(); // Invoke the handler to re-validate
                // If validation fails for the element, it fails for the form
                if (e.className == "invalid") invalid = true;
            }
        }

        // If the form is invalid, alert user and block submission
        if (invalid) {
            alert("The form is incompletely or incorrectly filled out.\n" +
                  "Please correct the  highlighted fields and try again.");
            return false;
        }
    }
})();
