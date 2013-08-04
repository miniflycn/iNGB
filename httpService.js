var Http = require('http'), 
	Url = require('url'),
	Fs = require("fs"),
	Path = require("path"),
	config = JSON.parse(Fs.readFileSync('./package.json'));

function getContentType(path){ 
	var contentType, 
		ext = Path.extname(path); 

	switch(ext){ 
		case '.html':
		case '.htm':
			contentType = 'text/html'; 
			break; 
		case '.js':
			contentType = 'text/javascript'; 
			break; 
		case '.css':
			contentType = 'text/css';
			break;
		case '.gif':
			contentType = 'image/gif';
			break; 
		case '.jpg':
			contentType = 'image/jpeg'; 
			break;
		case '.png': 
			contentType = 'image/png'; 
			break; 
		case '.ico':
			contentType = 'image/icon'; 
			break;
		default:
			contentType = 'application/octet-stream'; 
	} 
	
	return contentType; 
}

function httpService(req, res){ 
	var reqUrl = req.url,
		pathName = Url.parse(reqUrl).pathname,
		filePath;

	if(Path.extname(pathName) === ""){ 
		pathName += "/";
	} 
	if(pathName.charAt(pathName.length - 1) === "/"){ 
		pathName += "init.html";
	} 

	filePath = Path.join('./', pathName);  
	Fs.exists(filePath, function(exists){ 
		if(exists){
			res.writeHead(200, {'Content-Type': getContentType(filePath)});  
			var stream = Fs.createReadStream(filePath, {flags : "r", encoding : null}); 
				stream.on('error', function(){ 
					res.writeHead(404);
					res.end('<h1>404 Read Error</h1>');
			});
			stream.pipe(res); 
		}else{
			res.writeHead(404, {'Content-Type': 'text/html'}); 
			res.end('<h1>404 Not Found</h1>'); 
		} 
	}); 

}

var webService = Http.createServer(httpService);
webService.on('error', function(error){ 
	console.log('[WebService][error] ' + error);
}); 
webService.listen(config.port, function(){ 
	console.log('[WebService][Start] running at http://127.0.0.1:' + config.port + '/'); 
});