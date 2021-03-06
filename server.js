//cluster is to maximize perfomance by utilizing all processors for heroku
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

//var urlencode = require('urlencode');
//http server 
//var http = require('http'); 
//var url = require('url');
var express=require('express');

var app=express();

var server=app.listen(3000,function() {});


//Classes to import for wolfapi
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('U72E65-ARQERXR86Y');
    
    
    //encode then decode
//Sample problem
//Possibly remove whitespaces
var userInput = "prove by induction sum of j from 1 to n = n(n+1)/2 for n>0";
var query = userInput.replace(/\s/g, "X");  
    
//mathjax-node library
/*var mjAPI = require("mathjax-node");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});*/

//WolfAPI function call
//Define API
   
 
//Server run instance
   /* var server = http.createServer(function (req, res) {
    const { headers, method, url } = req;
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('<script type="text/javascript" src="ASCIIMathML.js"></script>'); //include mathml
    console.log(url);
    //var call = url.substr(1);*/
app.get('/',function(req,res)
{
     API();
     function API(){
      if(userInput ==""){
        res.send('<html><body><h1>There was an error please refresh.</h1></body></html>');
      }
      else{
        waApi.getFull({
          input: query,
          //numpods: '2',
          //includepodid: 'Input',
          podstate: 'Step-by-step',
          assumption: '*C.is+divisible+by-_*ProveWord-', 
          //appid: waApi,
          format: 'plaintext',  // change back to image
          output: 'image',
          scanner: 'Simplification',
          primary: 'true',
          
        }).then((queryresult) => {
           res.send(queryresult) //console.log(queryresult.pods[0].subpods[0].plaintext), 
        }).catch(console.error)
         
      }
  }

});
var server=app.listen(process.env.PORT,function() {});   

//}).listen(process.env.PORT || 5000); 





/*then((queryresult) => {
          const pods = queryresult.pods;
          const output = pods.map((pod) => {
          const subpodContent = pod.subpods.map(subpod =>
          `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
        ).join('\n');
          return `<h2>${pod.title}</h2>\n${subpodContent}`;
        }).join('\n');
          res.end(output);
        }).catch(console.error);
*/
/*
//Distribut cluster load
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
   cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else { 
  
  server.timeout= 30000;
}*/