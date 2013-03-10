// 
// This function implements a breakpoint. It repeatedly prompts the user
// for an expression, evaluates it with the supplied self-inspecting closure,
// and displays the result.  It is the closure that provides access to the
// scope to be inspected, so each function must supply its own closure.
// 
// Inspired by Steve Yen's breakpoint() function at
// http://trimpath.com/project/wiki/TrimBreakpoint
//
function inspect(inspector, title) {
    var expression, result;

    // You can use a breakpoint to turn off subsequent breakpoints by
    // creating a property named "ignore" on this function.
    if ("ignore" in arguments.callee) return;

    while(true) {
        // Figure out how to prompt the user
        var message = "";
        // If we were given a title, display that first
        if (title) message = title + "\n";
        // If we've already evaluated an expression, display it and its value
        if (expression) message += "\n" + expression + " ==> " + result + "\n";
        else expression = "";
        // We always display at least a basic prompt:
        message += "Enter an expression to evaluate:";

        // Get the user's input, displaying our prompt and using the
        // last expression as the default value this time.
        expression = prompt(message, expression);

        // If the user didn't enter anything (or clicked Cancel),
        // they're done and so we return, ending the breakpoint.
        if (!expression) return;

        // Otherwise, use the supplied closure to evaluate the expression
        // in the scope that is being inspected. 
        // The result will be displayed on the next iteration.
        result = inspector(expression);
    }
}
