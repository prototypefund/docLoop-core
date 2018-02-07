'use_strict'

var DocloopCore 			= 	require('./docloop-core.js'),
	DocloopAdapter			=	require('./docloop-adapter.js'),
	DocloopEndpoint			=	require('./docloop-endpoint.js'),
	DocloopLink				=	require('./docloop-link.js'),
	DocloopErrorHandling	=	require('./docloop-error-handling.js'),
	EventQueue				=	require('./event-queue.js'),
	manageCalls				=	require('./manage-calls.js')


/**
 * TODO: Description for tis module
 * @module Docloop
 */
module.exports = {
	DocloopCore,
	DocloopAdapter,
	DocloopEndpoint,
	DocloopLink,
	...DocloopErrorHandling,
	EventQueue,
	manageCalls,

}