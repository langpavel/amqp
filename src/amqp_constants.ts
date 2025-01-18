export const FRAME_METHOD = 1 as const;
export const FRAME_HEADER = 2 as const;
export const FRAME_BODY = 3 as const;
export const FRAME_HEARTBEAT = 8 as const;
export const FRAME_MIN_SIZE = 4096 as const;
export const FRAME_END = 206 as const;
/** Indicates that the method completed successfully. This reply code is reserved for future use - the current protocol design does not use positive confirmation and reply codes are sent only in case of an error. */
export const REPLY_SUCCESS = 200 as const;
/** The client attempted to transfer content larger than the server could accept at the present time. The client may retry at a later time. */
export const SOFT_ERROR_CONTENT_TOO_LARGE = 311 as const;
export const SOFT_ERROR_NO_ROUTE = 312 as const;
/** When the exchange cannot deliver to a consumer when the immediate flag is set. As a result of pending data on the queue or the absence of any consumers of the queue. */
export const SOFT_ERROR_NO_CONSUMERS = 313 as const;
/** The client attempted to work with a server entity to which it has no access due to security settings. */
export const SOFT_ERROR_ACCESS_REFUSED = 403 as const;
/** The client attempted to work with a server entity that does not exist. */
export const SOFT_ERROR_NOT_FOUND = 404 as const;
/** The client attempted to work with a server entity to which it has no access because another client is working with it. */
export const SOFT_ERROR_RESOURCE_LOCKED = 405 as const;
/** The client requested a method that was not allowed because some precondition failed. */
export const SOFT_ERROR_PRECONDITION_FAILED = 406 as const;
/** An operator intervened to close the connection for some reason. The client may retry at some later date. */
export const HARD_ERROR_CONNECTION_FORCED = 320 as const;
/** The client tried to work with an unknown virtual host. */
export const HARD_ERROR_INVALID_PATH = 402 as const;
/** The sender sent a malformed frame that the recipient could not decode. This strongly implies a programming error in the sending peer. */
export const HARD_ERROR_FRAME_ERROR = 501 as const;
/** The sender sent a frame that contained illegal values for one or more fields. This strongly implies a programming error in the sending peer. */
export const HARD_ERROR_SYNTAX_ERROR = 502 as const;
/** The client sent an invalid sequence of frames, attempting to perform an operation that was considered invalid by the server. This usually implies a programming error in the client. */
export const HARD_ERROR_COMMAND_INVALID = 503 as const;
/** The client attempted to work with a channel that had not been correctly opened. This most likely indicates a fault in the client layer. */
export const HARD_ERROR_CHANNEL_ERROR = 504 as const;
/** The peer sent a frame that was not expected, usually in the context of a content header and body. This strongly indicates a fault in the peer's content processing. */
export const HARD_ERROR_UNEXPECTED_FRAME = 505 as const;
/** The server could not complete the method because it lacked sufficient resources. This may be due to the client creating too many of some type of entity. */
export const HARD_ERROR_RESOURCE_ERROR = 506 as const;
/** The client tried to work with some entity in a manner that is prohibited by the server, due to security settings or by some other criteria. */
export const HARD_ERROR_NOT_ALLOWED = 530 as const;
/** The client tried to use functionality that is not implemented in the server. */
export const HARD_ERROR_NOT_IMPLEMENTED = 540 as const;
/** The server could not complete the method because of an internal error. The server may require intervention by an operator in order to resume normal operations. */
export const HARD_ERROR_INTERNAL_ERROR = 541 as const;
export const BASIC = 60 as const;
export const BASIC_QOS = 10 as const;
export const BASIC_QOS_OK = 11 as const;
export const BASIC_CONSUME = 20 as const;
export const BASIC_CONSUME_OK = 21 as const;
export const BASIC_CANCEL = 30 as const;
export const BASIC_CANCEL_OK = 31 as const;
export const BASIC_PUBLISH = 40 as const;
export const BASIC_RETURN = 50 as const;
export const BASIC_DELIVER = 60 as const;
export const BASIC_GET = 70 as const;
export const BASIC_GET_OK = 71 as const;
export const BASIC_GET_EMPTY = 72 as const;
export const BASIC_ACK = 80 as const;
export const BASIC_REJECT = 90 as const;
export const BASIC_RECOVER_ASYNC = 100 as const;
export const BASIC_RECOVER = 110 as const;
export const BASIC_RECOVER_OK = 111 as const;
export const BASIC_NACK = 120 as const;
export const CONNECTION = 10 as const;
export const CONNECTION_START = 10 as const;
export const CONNECTION_START_OK = 11 as const;
export const CONNECTION_SECURE = 20 as const;
export const CONNECTION_SECURE_OK = 21 as const;
export const CONNECTION_TUNE = 30 as const;
export const CONNECTION_TUNE_OK = 31 as const;
export const CONNECTION_OPEN = 40 as const;
export const CONNECTION_OPEN_OK = 41 as const;
export const CONNECTION_CLOSE = 50 as const;
export const CONNECTION_CLOSE_OK = 51 as const;
export const CONNECTION_BLOCKED = 60 as const;
export const CONNECTION_UNBLOCKED = 61 as const;
export const CONNECTION_UPDATE_SECRET = 70 as const;
export const CONNECTION_UPDATE_SECRET_OK = 71 as const;
export const CHANNEL = 20 as const;
export const CHANNEL_OPEN = 10 as const;
export const CHANNEL_OPEN_OK = 11 as const;
export const CHANNEL_FLOW = 20 as const;
export const CHANNEL_FLOW_OK = 21 as const;
export const CHANNEL_CLOSE = 40 as const;
export const CHANNEL_CLOSE_OK = 41 as const;
export const ACCESS = 30 as const;
export const ACCESS_REQUEST = 10 as const;
export const ACCESS_REQUEST_OK = 11 as const;
export const EXCHANGE = 40 as const;
export const EXCHANGE_DECLARE = 10 as const;
export const EXCHANGE_DECLARE_OK = 11 as const;
export const EXCHANGE_DELETE = 20 as const;
export const EXCHANGE_DELETE_OK = 21 as const;
export const EXCHANGE_BIND = 30 as const;
export const EXCHANGE_BIND_OK = 31 as const;
export const EXCHANGE_UNBIND = 40 as const;
export const EXCHANGE_UNBIND_OK = 51 as const;
export const QUEUE = 50 as const;
export const QUEUE_DECLARE = 10 as const;
export const QUEUE_DECLARE_OK = 11 as const;
export const QUEUE_BIND = 20 as const;
export const QUEUE_BIND_OK = 21 as const;
export const QUEUE_PURGE = 30 as const;
export const QUEUE_PURGE_OK = 31 as const;
export const QUEUE_DELETE = 40 as const;
export const QUEUE_DELETE_OK = 41 as const;
export const QUEUE_UNBIND = 50 as const;
export const QUEUE_UNBIND_OK = 51 as const;
export const TX = 90 as const;
export const TX_SELECT = 10 as const;
export const TX_SELECT_OK = 11 as const;
export const TX_COMMIT = 20 as const;
export const TX_COMMIT_OK = 21 as const;
export const TX_ROLLBACK = 30 as const;
export const TX_ROLLBACK_OK = 31 as const;
export const CONFIRM = 85 as const;
export const CONFIRM_SELECT = 10 as const;
export const CONFIRM_SELECT_OK = 11 as const;
