const joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate( req.body );
            if ( result.error ) {
                return res.status( 400 ).json( result.error );
            }

            if( !req.value ) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        authSchema: joi.object().keys({
            userName: joi.string().required(),
            packCode: joi.string().required(),
            price: joi.number().required()
        })
    }
}
