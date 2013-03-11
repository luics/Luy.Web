/**
 * This function returns the exchange rate between the currencies of two
 * countries.  It determines the exchange rate by making a SOAP request to a
 * demonstration web service hosted by XMethods (http://www.xmethods.net).
 * The service is for demonstration only and is not guaranteed to be 
 * responsive, available, or to return accurate data. Please do not 
 * overload XMethod's servers by running this example too often.
 * See http://www.xmethods.net/v2/demoguidelines.html
 */
function getExchangeRate(country1, country2) {
    // In Firefox we must ask the user to grant the privileges we need to run.
    // We need special privileges because we're talking to a web server other
    // than the one that this script was served from.  UniversalXPConnect
    // allows us to make an XMLHttpRequest to the server, and 
    // UniversalBrowserRead allows us to look at its response.
    // In IE, the user must instead enable "Access data sources across domains"
    // in the Tools->Internet Options->Security dialog.
    if (typeof netscape != "undefined") {
        netscape.security.PrivilegeManager.
                enablePrivilege("UniversalXPConnect UniversalBrowserRead");
    }

    // Create an XMLHttpRequest to issue the SOAP request.  This is a utility
    // function defined in the last chapter
    var request = HTTP.newRequest();

    // We're going to be POSTing to this URL and want a synchronous response
    request.open("POST", "http://services.xmethods.net/soap", false);

    // Set some headers: the body of this POST request is XML
    request.setRequestHeader("Content-Type", "text/xml");

    // This header is a required part of the SOAP protocol
    request.setRequestHeader("SOAPAction", '""');

    // Now send an XML-formatted SOAP request to the server
    request.send(
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<soap:Envelope' +
        '  xmlns:ex="urn:xmethods-CurrencyExchange"' +
        '  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
        '  xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"' +
        '  xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
        '   <soap:Body ' +
        '     soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
        '      <ex:getRate>' +
        '         <country1 xsi:type="xs:string">' + country1 + '</country1>' +
        '         <country2 xsi:type="xs:string">' + country2 + '</country2>' +
        '      </ex:getRate>' +
        '   </soap:Body>' +
        '</soap:Envelope>'
        );

    // If we got an HTTP error, throw an exception
    if (request.status != 200) throw request.statusText;

    // This XPath query gets us the <getRateResponse> element from the document
    var query = "/s:Envelope/s:Body/ex:getRateResponse";

    // This object defines the namespaces used in the query
    var namespaceMapping = {
        s:  "http://schemas.xmlsoap.org/soap/envelope/",  // SOAP namespace
        ex: "urn:xmethods-CurrencyExchange" // the service-specific namespace
    };

    // Extract the <getRateResponse> element from the response document
    var responseNode=XML.getNode(request.responseXML, query, namespaceMapping);

    // The actual result is contained in a text node within a <Result> node
    // within the <getRateReponse>
    return responseNode.firstChild.firstChild.nodeValue;
}
