// source: schema.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.transaction.CreateTransactionReply', null, global);
goog.exportSymbol('proto.transaction.CreateTransactionRequest', null, global);
goog.exportSymbol('proto.transaction.EmptyReply', null, global);
goog.exportSymbol('proto.transaction.GetTransactionBreakdownReply', null, global);
goog.exportSymbol('proto.transaction.GetTransactionBreakdownRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transaction.CreateTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transaction.CreateTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transaction.CreateTransactionRequest.displayName = 'proto.transaction.CreateTransactionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transaction.CreateTransactionReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transaction.CreateTransactionReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transaction.CreateTransactionReply.displayName = 'proto.transaction.CreateTransactionReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transaction.GetTransactionBreakdownRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transaction.GetTransactionBreakdownRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transaction.GetTransactionBreakdownRequest.displayName = 'proto.transaction.GetTransactionBreakdownRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transaction.GetTransactionBreakdownReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transaction.GetTransactionBreakdownReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transaction.GetTransactionBreakdownReply.displayName = 'proto.transaction.GetTransactionBreakdownReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.transaction.EmptyReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.transaction.EmptyReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.transaction.EmptyReply.displayName = 'proto.transaction.EmptyReply';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transaction.CreateTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.transaction.CreateTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transaction.CreateTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.CreateTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fromCurrency: jspb.Message.getFieldWithDefault(msg, 2, ""),
    toCurrency: jspb.Message.getFieldWithDefault(msg, 3, ""),
    amount: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    priceId: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transaction.CreateTransactionRequest}
 */
proto.transaction.CreateTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transaction.CreateTransactionRequest;
  return proto.transaction.CreateTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transaction.CreateTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transaction.CreateTransactionRequest}
 */
proto.transaction.CreateTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFromCurrency(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setToCurrency(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAmount(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPriceId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transaction.CreateTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transaction.CreateTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transaction.CreateTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.CreateTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFromCurrency();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getToCurrency();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
  f = message.getPriceId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.transaction.CreateTransactionRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionRequest} returns this
 */
proto.transaction.CreateTransactionRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string from_currency = 2;
 * @return {string}
 */
proto.transaction.CreateTransactionRequest.prototype.getFromCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionRequest} returns this
 */
proto.transaction.CreateTransactionRequest.prototype.setFromCurrency = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string to_currency = 3;
 * @return {string}
 */
proto.transaction.CreateTransactionRequest.prototype.getToCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionRequest} returns this
 */
proto.transaction.CreateTransactionRequest.prototype.setToCurrency = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float amount = 4;
 * @return {number}
 */
proto.transaction.CreateTransactionRequest.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.transaction.CreateTransactionRequest} returns this
 */
proto.transaction.CreateTransactionRequest.prototype.setAmount = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional string price_id = 5;
 * @return {string}
 */
proto.transaction.CreateTransactionRequest.prototype.getPriceId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionRequest} returns this
 */
proto.transaction.CreateTransactionRequest.prototype.setPriceId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transaction.CreateTransactionReply.prototype.toObject = function(opt_includeInstance) {
  return proto.transaction.CreateTransactionReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transaction.CreateTransactionReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.CreateTransactionReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    expiresAt: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transaction.CreateTransactionReply}
 */
proto.transaction.CreateTransactionReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transaction.CreateTransactionReply;
  return proto.transaction.CreateTransactionReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transaction.CreateTransactionReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transaction.CreateTransactionReply}
 */
proto.transaction.CreateTransactionReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setExpiresAt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transaction.CreateTransactionReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transaction.CreateTransactionReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transaction.CreateTransactionReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.CreateTransactionReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getExpiresAt();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string transaction_id = 1;
 * @return {string}
 */
proto.transaction.CreateTransactionReply.prototype.getTransactionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionReply} returns this
 */
proto.transaction.CreateTransactionReply.prototype.setTransactionId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string expires_at = 2;
 * @return {string}
 */
proto.transaction.CreateTransactionReply.prototype.getExpiresAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.CreateTransactionReply} returns this
 */
proto.transaction.CreateTransactionReply.prototype.setExpiresAt = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.transaction.GetTransactionBreakdownRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transaction.GetTransactionBreakdownRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.GetTransactionBreakdownRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fromCurrency: jspb.Message.getFieldWithDefault(msg, 2, ""),
    toCurrency: jspb.Message.getFieldWithDefault(msg, 3, ""),
    amount: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transaction.GetTransactionBreakdownRequest}
 */
proto.transaction.GetTransactionBreakdownRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transaction.GetTransactionBreakdownRequest;
  return proto.transaction.GetTransactionBreakdownRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transaction.GetTransactionBreakdownRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transaction.GetTransactionBreakdownRequest}
 */
proto.transaction.GetTransactionBreakdownRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFromCurrency(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setToCurrency(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transaction.GetTransactionBreakdownRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transaction.GetTransactionBreakdownRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.GetTransactionBreakdownRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFromCurrency();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getToCurrency();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAmount();
  if (f !== 0.0) {
    writer.writeFloat(
      4,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownRequest} returns this
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string from_currency = 2;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.getFromCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownRequest} returns this
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.setFromCurrency = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string to_currency = 3;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.getToCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownRequest} returns this
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.setToCurrency = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional float amount = 4;
 * @return {number}
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.getAmount = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.transaction.GetTransactionBreakdownRequest} returns this
 */
proto.transaction.GetTransactionBreakdownRequest.prototype.setAmount = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.toObject = function(opt_includeInstance) {
  return proto.transaction.GetTransactionBreakdownReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transaction.GetTransactionBreakdownReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.GetTransactionBreakdownReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    currencyPair: jspb.Message.getFieldWithDefault(msg, 1, ""),
    price: jspb.Message.getFieldWithDefault(msg, 2, ""),
    exchangeRate: jspb.Message.getFieldWithDefault(msg, 3, ""),
    exchangeRateResult: jspb.Message.getFieldWithDefault(msg, 4, ""),
    fee: jspb.Message.getFieldWithDefault(msg, 5, ""),
    feeResult: jspb.Message.getFieldWithDefault(msg, 6, ""),
    totalResult: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transaction.GetTransactionBreakdownReply}
 */
proto.transaction.GetTransactionBreakdownReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transaction.GetTransactionBreakdownReply;
  return proto.transaction.GetTransactionBreakdownReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transaction.GetTransactionBreakdownReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transaction.GetTransactionBreakdownReply}
 */
proto.transaction.GetTransactionBreakdownReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrencyPair(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPrice(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setExchangeRate(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setExchangeRateResult(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setFee(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeeResult(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setTotalResult(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transaction.GetTransactionBreakdownReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transaction.GetTransactionBreakdownReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.GetTransactionBreakdownReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCurrencyPair();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPrice();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExchangeRate();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getExchangeRateResult();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getFee();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFeeResult();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getTotalResult();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string currency_pair = 1;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getCurrencyPair = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setCurrencyPair = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string price = 2;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getPrice = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setPrice = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string exchange_rate = 3;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getExchangeRate = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setExchangeRate = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string exchange_rate_result = 4;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getExchangeRateResult = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setExchangeRateResult = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string fee = 5;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getFee = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setFee = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string fee_result = 6;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getFeeResult = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setFeeResult = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string total_result = 7;
 * @return {string}
 */
proto.transaction.GetTransactionBreakdownReply.prototype.getTotalResult = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.transaction.GetTransactionBreakdownReply} returns this
 */
proto.transaction.GetTransactionBreakdownReply.prototype.setTotalResult = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.transaction.EmptyReply.prototype.toObject = function(opt_includeInstance) {
  return proto.transaction.EmptyReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.transaction.EmptyReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.EmptyReply.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.transaction.EmptyReply}
 */
proto.transaction.EmptyReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.transaction.EmptyReply;
  return proto.transaction.EmptyReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.transaction.EmptyReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.transaction.EmptyReply}
 */
proto.transaction.EmptyReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.transaction.EmptyReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.transaction.EmptyReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.transaction.EmptyReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.transaction.EmptyReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


goog.object.extend(exports, proto.transaction);
