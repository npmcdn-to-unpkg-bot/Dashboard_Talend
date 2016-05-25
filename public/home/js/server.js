var server = {
	auxBuilder: {
		errorResponse: function (errorMsg, errorData) {
			console.log('errorResponse'.red, errorMsg, errorData ? errorData : '');
			return {
				'success': false,
				'error': {
					'message': errorMsg,
					'data': errorData || {}
				}
			};
		},
		successResponse: function (data) {
			// console.log('Action completed successfully ;)'.green, data);
			console.log('Action completed successfully ;)'.green);
			return {
				'success': true,
				'data': data
			};
		},
	},
	response: function (res, req, response, status) {
		var callback = req.query.callback;
		status = status ? status : 200;
		if (callback !== undefined) {
			res.writeHead(200, {
				'Content-Type': 'text/javascript'
			});
			res.write(callback + '(' + JSON.stringify(response) + ');');
			res.end();
		} else {
			res.status(status).send(response).end();
		}
		console.log('______________________________ END QUERY ______________________________'.green);
		console.log('_______________________________________________________________________'.green);
	},
};

module.exports = server;
