//-------------------------------------------------------------------
// Fabric Client Wrangler - Wrapper library for the Hyperledger Fabric Client SDK
//-------------------------------------------------------------------

module.exports = function (g_options, logger) {
	var deploy_cc = require('./parts/deploy_cc.js')(logger);
	var enrollment = require('./parts/enrollment.js')(logger);
	var fcw = {};
	var invoke_cc = require('./parts/invoke_cc.js')(g_options, logger);
	var query_cc = require('./parts/query_cc.js')(logger);
	var query_peer = require('./parts/query_peer.js')(logger);
	var ha = require('./parts/high_availability.js')(logger);

	// ------------------------------------------------------------------------
	// Chaincode Functions
	// ------------------------------------------------------------------------

	// Install Chaincode
	fcw.install_chaincode = function (obj, options, cb_done) {
		deploy_cc.install_chaincode(obj, options, cb_done);
	};

	// Instantiate Chaincode
	fcw.instantiate_chaincode = function (obj, options, cb_done) {
		deploy_cc.instantiate_chaincode(obj, options, cb_done);
	};

	// Upgrade Chaincode
	fcw.upgrade_chaincode = function (obj, options, cb_done) {
		deploy_cc.upgrade_chaincode(obj, options, cb_done);
	};
    
    // ------------------------------------------------------------------------
	// Enrollment Functions
	// ------------------------------------------------------------------------

	// enroll an enrollId with the ca
	fcw.enroll = function (options, cb_done) {
		let opts = ha.get_ca(options);
		enrollment.enroll(opts, function (err, resp) {
			if (err != null) {
				opts = ha.get_next_ca(options);		//try another CA
				if (opts) {
					logger.info('Retrying enrollment on different ca');
					fcw.enroll(options, cb_done);
				} else {
					if (cb_done) cb_done(err, resp);	//out of CAs, give up
				}
			} else {
				ha.success_ca_position = ha.using_ca_position;			//remember the last good one
				if (cb_done) cb_done(err, resp);
			}
		});
	};

	// enroll with admin cert
	fcw.enrollWithAdminCert = function (options, cb_done) {
		enrollment.enrollWithAdminCert(options, cb_done);
	};

	// Invoke Chaincode
	fcw.invoke_chaincode = function (obj, options, cb_done) {
		options.target_event_url = ha.get_event_url(options);	//get the desired event url to use
		invoke_cc.invoke_chaincode(obj, options, function (err, resp) {
			if (err != null) {											//looks like an error with the request
				if (ha.switch_peer(obj, options) == null) {	//try another peer
					logger.info('Retrying invoke on different peer');
					fcw.invoke_chaincode(obj, options, cb_done);
				} else {
					if (cb_done) cb_done(err, resp);	//out of peers, give up
				}
			} else {	//all good, pass resp back to callback
				ha.success_peer_position = ha.using_peer_position;		//remember the last good one
				if (cb_done) cb_done(err, resp);
			}
		});
	};

	// Query Chaincode
	fcw.query_chaincode = function (obj, options, cb_done) {
		query_cc.query_chaincode(obj, options, function (err, resp) {
			if (err != null) {											//looks like an error with the request
				if (ha.switch_peer(obj, options) == null) {	//try another peer
					logger.info('Retrying query on different peer');
					fcw.query_chaincode(obj, options, cb_done);
				} else {
					if (cb_done) cb_done(err, resp);//out of peers, give up
				}
			} else {	//all good, pass resp back to callback
				ha.success_peer_position = ha.using_peer_position;		//remember the last good one
				if (cb_done) cb_done(err, resp);
			}
		});
	};

	// ------------------------------------------------------------------------
	// Ledger Functions
	// ------------------------------------------------------------------------
	// Get Block Data
	fcw.query_block = function (obj, options, cb_done) {
		query_peer.query_block(obj, options, cb_done);
	};


	// ------------------------------------------------------------------------
	// Channel Functions
	// ------------------------------------------------------------------------
	// Get Members on Channel
	fcw.query_channel_members = function (obj, options, cb_done) {
		query_peer.query_channel_members(obj, options, cb_done);
	};

	// Get Block Height of Channel
	fcw.query_channel = function (obj, options, cb_done) {
		query_peer.query_channel(obj, options, function (err, resp) {
			if (err != null) {											//looks like an error with the request
				if (ha.switch_peer(obj, options) == null) {	//try another peer
					logger.info('Retrying query on different peer');
					fcw.query_channel(obj, options, cb_done);
				} else {
					if (cb_done) cb_done(err, resp);//out of peers, give up
				}
			} else {	//all good, pass resp back to callback
				ha.success_peer_position = ha.using_peer_position;		//remember the last good one
				if (cb_done) cb_done(err, resp);
			}
		});
	};

	// Get list of installed cc's
	fcw.query_installed_cc = function (obj, options, cb_done) {
		query_peer.query_installed_cc(obj, options, cb_done);
	};

	// get list of instantiated cc's
	fcw.query_instantiated_cc = function (obj, options, cb_done) {
		query_peer.query_instantiated_cc(obj, options, cb_done);
	};

	// get list of channels
	fcw.query_list_channels = function (obj, options, cb_done) {
		query_peer.query_list_channels(obj, options, cb_done);
	};


	return fcw;
};
