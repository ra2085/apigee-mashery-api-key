 var timestamp = context.getVariable("system.timestamp");
 timestamp = timestamp.toString();
 timestamp = timestamp.slice(0, -3);
 timestamp = parseInt(timestamp);
 var upperTimeLimit = timestamp + 301;
 var lowerTimeLimit = timestamp - 300;
 var _md5 = crypto.getMD5();
 for(var i = lowerTimeLimit; i < upperTimeLimit; i++){
     _md5.update(context.getVariable("verifyapikey.VK-Verfy-Key.client_id"));
     _md5.update(context.getVariable("verifyapikey.VK-Verfy-Key.client_secret"));
     _md5.update(""+i);
     var toCompare = _md5.digest64();
     if(context.getVariable("request.queryparam.sig") == toCompare){
         context.setVariable("flow.signature.valid", true);
         break;
     } else {
         context.setVariable("flow.signature.valid", false);
     }
 }