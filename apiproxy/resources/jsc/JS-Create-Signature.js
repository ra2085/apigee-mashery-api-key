 var timestamp = context.getVariable("system.timestamp");
 timestamp = timestamp.toString();
 timestamp = timestamp.slice(0, -3);
 var _md5 = crypto.getMD5();
 _md5.update(context.getVariable("verifyapikey.VK-Verfy-Key.client_id"));
 _md5.update(context.getVariable("verifyapikey.VK-Verfy-Key.client_secret"));
 _md5.update(timestamp);
 var toCompare = _md5.digest64();
 context.setVariable("flow.signature.created", toCompare);