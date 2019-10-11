var log = require('logger')('model-contacts');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongins = require('mongins');
var validators = require('validators');
var model = require('model');

var types = validators.types;
var requires = validators.requires;

var schema = Schema({
    name: {
        type: String,
        required: true,
        validator: types.string({
            length: 200
        })
    },
    email: {
        type: String,
        require: requires.contacts(),
        validator: types.email()
    },
    phones: {
        type: [String],
        require: requires.contacts(),
        validator: types.phones({
            max: 5
        })
    },
    viber: {
        type: String,
        require: requires.contacts(),
        validator: types.string({
            length: 100
        })
    },
    whatsapp: {
        type: String,
        require: requires.contacts(),
        validator: types.string({
            length: 100
        })
    },
    messenger: {
        type: String,
        require: requires.contacts(),
        validator: types.string({
            length: 100
        })
    },
    skype: {
        type: String,
        require: requires.contacts(),
        validator: types.string({
            length: 100
        })
    }
}, {collection: 'contacts'});

schema.plugin(mongins());
schema.plugin(mongins.user);
schema.plugin(mongins.permissions({
    workflow: 'model'
}));
schema.plugin(mongins.status({
    workflow: 'model'
}));
schema.plugin(mongins.visibility({
    workflow: 'model'
}));
schema.plugin(mongins.createdAt());
schema.plugin(mongins.updatedAt());

model.ensureIndexes(schema, [
    {createdAt: 1, _id: 1}
]);

module.exports = mongoose.model('contacts', schema);
