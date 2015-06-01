/*jshint node:true */
/*jshint esnext:true */
'use strict';
var app = require('./app');
var cluster = require('cluster');


if (cluster.isMaster) {

  var totalWorkers = require('os').cpus().length - 1;



  for (var i = 0; i < totalWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', function(worker) {
    console.log('Worker %d died', worker.id); //TODO logs
    cluster.fork();
  });
} else {

  console.log('Worker PID:', process.pid);
  if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
  }

}

app.on('error', function(err){
  console.error('server error', err);
});
