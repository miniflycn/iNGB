<?php

/*!
 * iNGB Framework Stacktrace.php
 *   堆栈跟踪服务端模块
 * @author yangwj@ipanel.cn
 * @version v1.0
 ***/

if(!count($_REQUEST)){
?>

<html>
<head>
	<title>堆栈跟踪服务</title>
</head>

<body>
<p id="result"></p>
<script>
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		var sta = xhr.status;
		if(sta == 200 || sta == 304){
			document.getElementById("result").innerHTML = xhr.responseText.replace(/\n/g, "<br />");
		}else{
		
		}
	}
}

xhr.open("GET", "log.txt", true);
xhr.send(null);


</script>

</body>

</html>
<?php
}else{
	$fp = fopen("log.txt", "a");
	
	if($_REQUEST["log"]){
		fwrite($fp, "{LOG} " . $_REQUEST["log"] . "\r\n\r\n"); 
	}else if($_REQUEST["url"] && $_REQUEST["msg"] && $_REQUEST["line"]){
		fwrite($fp, "{ERROR}\r\n"); 
		fwrite($fp, "[file] " . $_REQUEST["url"] . "\r\n");
		fwrite($fp, "[msg] " . $_REQUEST["msg"] . "\r\n");
		fwrite($fp, "[line] " . $_REQUEST["line"] . "\r\n\r\n");
	}
	
	fclose($fp);
}

?>