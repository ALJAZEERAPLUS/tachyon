var tachyon = require( './index' )

exports.handler = function( event, context ) {
	var region = process.env.S3_REGION
	var bucket = process.env.S3_BUCKET
	var key = event.key
	var args = event.args
	return tachyon.s3( { region: region, bucket: bucket }, key, args, function( err, data, info ) {
		if ( err ) {
			context.fail( err )
		} else {
			context.succeed( {
				data: new Buffer( data ).toString( 'base64' ),
				format: info.format,
				size: info.size
			} )
		}

		data = null
		info = null
		err = null
	} )
}
