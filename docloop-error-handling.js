'use strict'

/**
 * Custom error. Since most http requests will be handled by the docloop core or one of the base classes, 
 * it is difficult for adapters to set the status code themselves. 
 * This error class lets them make a proposal for the error code, for when the error at hand eventually causes a request to fail.
 * 
 * @memberof module:Docloop
 * @alias	DocloopError
 * 
 * @param {String} message 	Error description
 * @param {Number} status	Proposed HTML status code in case this error causes a request to fail.
 */
class DocloopError extends Error {

	constructor (message, status) {

		super(message);

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);

		this.status = status || 500;

	}

}

/**
 * Wrapper for express request handlers to catch rejected promises or async methods.
 * @memberof module:Docloop
 * @param  {Function}	fn		Express request handler to wrap
 * @return {Function}			Wrapped request handler
 */
function catchAsyncErrors(fn) {
	return (...args) => Promise.resolve(fn(...args)).catch(args[2])
}


/**
 * Custom Express error handler, tailored to work with {@link DocloopError}. Will terminate a request with a 
 * proposed error code if error is instance of {@link DocloopError}, will use 500 if not.
 * @memberof module:Docloop
 * @param  {Object}				Express error
 * @param  {Object}				Express request
 * @param  {Object}				Express result
 * @param  {Function}			Express next
 * @return {undefined}
 */
function errorHandler(err, req, res, next){

	console.log('# Docloop error handler:')

	if(err instanceof DocloopError) return res.status(err.status).send(err.toString())

	res.status(500).send(err.toString())	
}




module.exports = {DocloopError,	catchAsyncErrors, errorHandler}