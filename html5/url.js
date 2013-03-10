/*
 * 
URL规则（RFC 1738）
<scheme>:<scheme-specific-part>
	<scheme>
		ftp                     File Transfer protocol
		http                    Hypertext Transfer Protocol
		gopher                  The Gopher protocol
		mailto                  Electronic mail address
		news                    USENET news
		nntp                    USENET news using NNTP access
		telnet                  Reference to interactive sessions
		wais                    Wide Area Information Servers
		file                    Host-specific file names
		prospero                Prospero Directory Service
	<scheme-specific-part>
		//<user>:<password>@<host>:<port>/<url-path>
			<url-path>
				path[;parameters][?query][#fragment]

hostname规则（RFC 1034 3.5、RFC 1123 2.1） 
DNS规定，域名中的标号都由英文字母和数字组成，每一个标号不超过63个字符，也不区分大小写字母。标号中除连字符（-）外不能使用其他的标点符号。级别最低的域名写在最左边，而级别最高的域名写在最右边。由多个标号组成的完整域名总共不超过255个字符。 
 

 */

var Url = {};
Url.parse = function(url){
  var segments = {
    schema: '',
    user: '',
    password: '',
    host: '',
    port: '',
    path: '',
    query: {},
    fragment: ''
  };
}

