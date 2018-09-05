# Apigee - Mashery Authentication

## Use Case

A Company wants to migrate existing API/Services from Mashery into Apigee. Mashery [requires](https://developer.mashery.com/docs/read/mashery_api/20/Authentication) that every api call must be signed. The signature function is:
```
apikey = '4tlgrg34454ge433443fsf';  
secret = '34gffregf37';  
timestamp = gmdate('U'); // UNIX timestamp   
sig = md5(apikey . secret . timestamp);
```
Sample request:
```
http://api.mashery.com/v2/json-rpc/resource?apikey=4tlgrg34454ge433443fsf&sig=56547745gfbdg545645fvdfgfgfhfgh45fd
```
In order for a signature to be valid, the timestamp that was used to generate it must fall within a 5 minute range on either side of the current timestamp.

## Solution

This repository contains a sample proxy that has two resources:

### GET /signature 
Issues Mashery compatible signatures that are generated using an App Consumer Key (API key) and a Consumer Secret.
Sample request:
```
GET /test_mashery_key/signature?apikey=VC7kPpie2HrP1xlxtFZHrDQ3AleGkZeI
```
Sample response:
```
X-Signature: sqz6udHPpVR3o7qWtFL1iA==
200 OK
```
### GET /test 
Validates the API Key and Signature included in the request. Note: the 'JS-Compare-Hash' execution time is ~2ms, pretty good considering it's Javascript on Rhino ;) .
Sample request:
```
GET /test_mashery_key/test?sig=sqz6udHPpVR3o7qWtFL1iA%3D%3D&apikey=VC7kPpie2HrP1xlxtFZHrDQ3AleGkZeI
```
Sample response:
```
200 OK
```