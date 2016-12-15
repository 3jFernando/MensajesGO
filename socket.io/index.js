var io = require('socket.io'),
	http = require('http'),
	server = http.createServer(),
	io = io.listen(server);

io.on('connection', function(socket) {
	console.log('Cliente connectado');

	socket.on('join', function(contact){
		socket.join(contact.ping);
	});

	socket.on('message', function(mensajeGO, contact) {
		//io.emit('message', mensajeGO);
		io.sockets.in(contact.ping).emit('message', mensajeGO);
	});

	socket.on('online', function(state) {
		io.emit(state.room+'online', state.data);
	});
	socket.on('offline', function(state) {
		io.emit(state.room+'offline', state.data);
	});

  socket.on('disconnect', function () {
    console.log('Cliente desconnectado');
  });

});

server.listen(3000, function() {
	console.log('Servidor connectado');
});
