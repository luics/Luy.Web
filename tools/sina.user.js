(function () {
  var jq = document.createElement('script');
  jq.src = 'http://code.jquery.com/jquery-1.8.1.min.js';
  jq.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(jq);
  
  function wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(wait, 100);
    } else {
      $ = unsafeWindow.jQuery;
      $(function () {
        main();
      });
    }
  }
  wait();
  
  function main() {
    console.log($);
  }
})();