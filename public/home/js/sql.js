var deferred = require('deferred');
var server = require('server');
var sql = require('mssql');

var xSQL = {
	_isProductionEnvironment: true,
	_config: {
		production: {
			user: 'devteam@live', // 'devteam@devel',
			password: 'proY3ct0',
			server: 'equipovision.com', // or 'localhost\\instance' to connect to named instance
			port: '1433', // or port:'800',
			database: 'EquipoVision', // 'EquipoVision_DEVEL',
			stream: true, // You can enable streaming globally
			requestTimeout: 9000000,
			// options: {
			//  encrypt: true, // Use this if you're on Windows Azure
			//  driver: 'node-tds'
			// },
			pool: {
				max: 10,
				min: 0,
				idleTimeoutMillis: 9000000
			}
		},
		development: {
			user: 'devteam@devel', // 'devteam@devel',
			password: 'proY3ct0',
			server: 'equipovision.com', // or 'localhost\\instance' to connect to named instance
			port: '1433', // or port:'800',
			database: 'EquipoVision_DEVEL', // 'EquipoVision_DEVEL',
			stream: true, // You can enable streaming globally
			requestTimeout: 9000000,
			// options: {
			//  encrypt: true, // Use this if you're on Windows Azure
			//  driver: 'node-tds'
			// },
			pool: {
				max: 10,
				min: 0,
				idleTimeoutMillis: 9000000
			}
		},
	},
	runQuery: function (query) {
		var config = this._isProductionEnvironment ? this._config.production : this._config.development;
		var def = deferred();
		if (typeof query !== 'string') {
			def.reject(server.auxBuilder.errorResponse('Invalid query'));
		}
		try {
			sql.connect(config, function (err) {
				var rows = [];
				var request = new sql.Request({
					stream: true,
					verbose: true,
				});
				request.on('row', function (row) {
					rows.push(row);
				}).on('error', function (e) {
					def.reject(server.auxBuilder.errorResponse('SQL Error', e));
				}).on('done', function () {
					def.resolve(server.auxBuilder.successResponse(rows));
				});
				request.query(query);
			});
		} catch (e) {
			def.reject(server.auxBuilder.errorResponse('Internal Error', e));
		}
		return def.promise;
	},
	tablesSeparator: function (rows) {
		var tables = [];
		var tableIndex = -1;
		var columnHeadings = [];
		rows = rows ? rows : [];
		rows.forEach(function (row) {
			var different = false;
			var newColumnHeadings = [];
			for (var key in row) {
				newColumnHeadings.push(key);
			}
			if (newColumnHeadings.length !== columnHeadings.length) {
				different = true;
			} else {
				for (var i = 0; i < columnHeadings.length; i++) {
					if (columnHeadings[i] !== newColumnHeadings[i]) {
						different = true;
					}
				}
			}
			if (different) {
				columnHeadings = newColumnHeadings;
				tables.push([row]);
				tableIndex += 1;
			} else {
				tables[tableIndex].push(row);
			}
		});
		return tables;
	},
	findMailByIds: function (ids) {
		var defaultRecipient = 'agomez@supermas.mx';
		var def = deferred();
		if (!this._isProductionEnvironment) {
			def.resolve(defaultRecipient);
			return def.promise;
		}
		var query = 'SELECT usrSimpleId, Email FROM EQV_Users_usr LEFT OUTER JOIN aspnet_Membership ON usrFK_UserId = UserId WHERE usrSimpleID IN (' + ids + ')';
		this.runQuery(query).then(function (r) {
			try {
				var mails = defaultRecipient;
				r.data.forEach(function (user) {
					mails += ',' + user.Email;
				});
				mails = mails.replace(new RegExp(defaultRecipient, 'g'), '');
				mails += defaultRecipient;
				if (mails[0] === ',') {
					mails = mails.substring(1);
				}
				if (mails[mails.length - 1] === ',') {
					mails = mails.substring(0, mails.length - 1);
				}
			} catch (e) {}
			def.resolve(mails);
		}).catch(function (e) {
			def.reject(server.auxBuilder.errorResponse('Failure in retrieving emails', e));
		});
		return def.promise;
	}
};

module.exports = xSQL;
