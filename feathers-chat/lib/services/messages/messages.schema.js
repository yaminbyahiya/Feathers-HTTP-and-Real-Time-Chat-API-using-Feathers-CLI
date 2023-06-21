"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageQueryResolver = exports.messageQueryValidator = exports.messageQuerySchema = exports.messageQueryProperties = exports.messagePatchResolver = exports.messagePatchValidator = exports.messagePatchSchema = exports.messageDataResolver = exports.messageDataValidator = exports.messageDataSchema = exports.messageExternalResolver = exports.messageResolver = exports.messageValidator = exports.messageSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const typebox_2 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const users_schema_1 = require("../users/users.schema");
// Main data model schema
exports.messageSchema = typebox_1.Type.Object({
    _id: (0, typebox_2.ObjectIdSchema)(),
    text: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Number(),
    userId: typebox_1.Type.String({ objectid: true }),
    user: typebox_1.Type.Ref(users_schema_1.userSchema)
}, { $id: 'Message', additionalProperties: false });
exports.messageValidator = (0, typebox_1.getValidator)(exports.messageSchema, validators_1.dataValidator);
exports.messageResolver = (0, schema_1.resolve)({
    user: (0, schema_1.virtual)(async (message, context) => {
        // Associate the user that sent the message
        return context.app.service('users').get(message.userId);
    })
});
exports.messageExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.messageDataSchema = typebox_1.Type.Pick(exports.messageSchema, ['text'], {
    $id: 'MessageData'
});
exports.messageDataValidator = (0, typebox_1.getValidator)(exports.messageDataSchema, validators_1.dataValidator);
exports.messageDataResolver = (0, schema_1.resolve)({
    userId: async (_value, _message, context) => {
        // Associate the record with the id of the authenticated user
        return context.params.user._id;
    },
    createdAt: async () => {
        return Date.now();
    }
});
// Schema for updating existing entries
exports.messagePatchSchema = typebox_1.Type.Partial(exports.messageSchema, {
    $id: 'MessagePatch'
});
exports.messagePatchValidator = (0, typebox_1.getValidator)(exports.messagePatchSchema, validators_1.dataValidator);
exports.messagePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.messageQueryProperties = typebox_1.Type.Pick(exports.messageSchema, ['_id', 'text', 'createdAt', 'userId']);
exports.messageQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.messageQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.messageQueryValidator = (0, typebox_1.getValidator)(exports.messageQuerySchema, validators_1.queryValidator);
exports.messageQueryResolver = (0, schema_1.resolve)({
    userId: async (value, user, context) => {
        // We want to be able to find all messages but
        // only let a user modify their own messages otherwise
        if (context.params.user && context.method !== 'find') {
            return context.params.user._id;
        }
        return value;
    }
});
//# sourceMappingURL=messages.schema.js.map