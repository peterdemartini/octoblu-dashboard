angular.module('octobluDashboard')
  .service('meshbluService', function($http) {
    var self = this, conn, creds = {};

    self.getCredentials = function() {
      return $http.get('/credentials').then(function(res) {
      	var credentials = res.data || {};
	    	creds = credentials;
        return creds;
      });
    };

    self.saveCredentials = function(credentials) {
    	creds = credentials;
      return $http.post('/credentials', credentials);
    };

    self.start = function(resolve, reject) {
      self.getCredentials()
        .then(function(creds) {
          conn = skynet.createConnection(creds);
          conn.on('ready', function(data) {
            console.log('Connected to Meshblu', data);
            self.saveCredentials(data);
            resolve(conn);
          });
          conn.on('notReady', function() {
            console.log('Not connected to Meshblu');

            conn.register({
              'type': 'octobluDashboard'
            }, function(data) {
              console.log(data);
              self.saveCredentials(data);

              conn.authenticate({
                'uuid': data.uuid,
                'token': data.token
              }, function(data) {
                console.log(data);
              });
            });
          });
          conn.on('disconnect', function(){
          	reject();
          });
        });
    };

    self.getConnection = function(resolve, reject) {
      if (conn) {
        resolve(conn, creds);
      } else {
        self.start(function(){
        	resolve(conn, creds);
        }, function(){
        	reject();
        });
      }
    };

    return self;
  });