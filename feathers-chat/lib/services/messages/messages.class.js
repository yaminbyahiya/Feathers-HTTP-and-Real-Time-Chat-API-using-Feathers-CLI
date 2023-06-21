"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.MessageService = void 0;
const mongodb_1 = require("@feathersjs/mongodb");
// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
class MessageService extends mongodb_1.MongoDBService {
}
exports.MessageService = MessageService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mongodbClient').then((db) => db.collection('messages'))
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=messages.class.js.map