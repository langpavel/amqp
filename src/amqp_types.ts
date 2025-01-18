// deno-lint-ignore-file no-empty-interface

/** The Basic class provides methods that support an industry-standard messaging model. */
export interface BasicProperties {
  contentType?: string;
  contentEncoding?: string;
  headers?: Record<string, unknown>;
  deliveryMode?: number;
  priority?: number;
  correlationId?: string;
  replyTo?: string;
  expiration?: string;
  messageId?: string;
  timestamp?: number;
  type?: string;
  userId?: string;
  appId?: string;
  clusterId?: string;
}

/** The connection class provides methods for a client to establish a network connection to a server, and for both peers to operate the connection thereafter. */
/** @ignore */
export interface ConnectionProperties {
}

/** The channel class provides methods for a client to establish a channel to a server and for both peers to operate the channel thereafter. */
/** @ignore */
export interface ChannelProperties {
}

/** @ignore */
export interface AccessProperties {
}

/** Exchanges match and distribute messages across queues. Exchanges can be configured in the server or declared at runtime. */
/** @ignore */
export interface ExchangeProperties {
}

/** Queues store and forward messages. Queues can be configured in the server or created at runtime. Queues must be attached to at least one exchange in order to receive messages from publishers. */
/** @ignore */
export interface QueueProperties {
}

/** The Tx class allows publish and ack operations to be batched into atomic units of work. The intention is that all publish and ack requests issued within a transaction will complete successfully or none of them will. Servers SHOULD implement atomic transactions at least where all publish or ack requests affect a single queue. Transactions that cover multiple queues may be non-atomic, given that queues can be created and destroyed asynchronously, and such events do not form part of any transaction. Further, the behaviour of transactions with respect to the immediate and mandatory flags on Basic.Publish methods is not defined. */
/** @ignore */
export interface TxProperties {
}

/** @ignore */
export interface ConfirmProperties {
}

/** This method requests a specific quality of service. The QoS can be specified for the current channel or for all channels on the connection. The particular properties and semantics of a qos method always depend on the content class semantics. Though the qos method could in principle apply to both peers, it is currently meaningful only for the server. */
export interface BasicQosArgs {
  /** The client can request that messages be sent in advance so that when the client finishes processing a message, the following message is already held locally, rather than needing to be sent down the channel. Prefetching gives a performance improvement. This field specifies the prefetch window size in octets. The server will send a message in advance if it is equal to or smaller in size than the available prefetch size (and also falls into other prefetch limits). May be set to zero, meaning no specific limit, although other prefetch limits may still apply. The prefetch-size is ignored if the no-ack option is set. */
  prefetchSize?: number; /** Default 0 */
  /** Specifies a prefetch window in terms of whole messages. This field may be used in combination with the prefetch-size field; a message will only be sent in advance if both prefetch windows (and those at the channel and connection level) allow it. The prefetch-count is ignored if the no-ack option is set. */
  prefetchCount?: number; /** Default 0 */
  /** By default the QoS settings apply to the current channel only. If this field is set, they are applied to the entire connection. */
  global?: boolean; /** Default false */
}

/** This method tells the client that the requested QoS levels could be handled by the server. The requested QoS applies to all active consumers until a new QoS is defined. */
/** @ignore */
export interface BasicQosOkArgs {
}

/** This method asks the server to start a consumer, which is a transient request for messages from a specific queue. Consumers last as long as the channel they were declared on, or until the client cancels them. */
export interface BasicConsumeArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to consume from. */
  queue?: string; /** Default "" */
  /** Specifies the identifier for the consumer. The consumer tag is local to a channel, so two clients can use the same consumer tags. If this field is empty the server will generate a unique tag. */
  consumerTag?: string; /** Default "" */
  noLocal?: boolean; /** Default false */
  noAck?: boolean; /** Default false */
  /** Request exclusive consumer access, meaning only this consumer can access the queue. */
  exclusive?: boolean; /** Default false */
  /** A set of arguments for the consume. The syntax and semantics of these arguments depends on the server implementation. */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** The server provides the client with a consumer tag, which is used by the client for methods called on the consumer at a later stage. */
export interface BasicConsumeOkArgs {
  /** Holds the consumer tag specified by the client or provided by the server. */
  consumerTag: string;
}

/** This method cancels a consumer. This does not affect already delivered messages, but it does mean the server will not send any more messages for that consumer. The client may receive an arbitrary number of messages in between sending the cancel method and receiving the cancel-ok reply. */
export interface BasicCancelArgs {
  consumerTag: string;
}

/** This method confirms that the cancellation was completed. */
export interface BasicCancelOkArgs {
  consumerTag: string;
}

/** This method publishes a message to a specific exchange. The message will be routed to queues as defined by the exchange configuration and distributed to any active consumers when the transaction, if any, is committed. */
export interface BasicPublishArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the exchange to publish to. The exchange name can be empty, meaning the default exchange. If the exchange name is specified, and that exchange does not exist, the server will raise a channel exception. */
  exchange?: string; /** Default "" */
  /** Specifies the routing key for the message. The routing key is used for routing messages depending on the exchange configuration. */
  routingKey?: string; /** Default "" */
  /** This flag tells the server how to react if the message cannot be routed to a queue. If this flag is set, the server will return an unroutable message with a Return method. If this flag is zero, the server silently drops the message. */
  mandatory?: boolean; /** Default false */
  /** This flag tells the server how to react if the message cannot be routed to a queue consumer immediately. If this flag is set, the server will return an undeliverable message with a Return method. If this flag is zero, the server will queue the message, but with no guarantee that it will ever be consumed. */
  immediate?: boolean; /** Default false */
}

/** This method returns an undeliverable message that was published with the immediate flag set, or an unroutable message published with the mandatory flag set. The reply code and text provide information about the reason that the message was undeliverable. */
export interface BasicReturnArgs {
  replyCode: number;
  replyText?: string; /** Default "" */
  /** Specifies the name of the exchange that the message was originally published to. May be empty, meaning the default exchange. */
  exchange: string;
  /** Specifies the routing key name specified when the message was published. */
  routingKey: string;
}

/** This method delivers a message to the client, via a consumer. In the asynchronous message delivery model, the client starts a consumer using the Consume method, then the server responds with Deliver methods as and when messages arrive for that consumer. */
export interface BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: number;
  redelivered?: boolean; /** Default false */
  /** Specifies the name of the exchange that the message was originally published to. May be empty, indicating the default exchange. */
  exchange: string;
  /** Specifies the routing key name specified when the message was published. */
  routingKey: string;
}

/** This method provides a direct access to the messages in a queue using a synchronous dialogue that is designed for specific types of application where synchronous functionality is more important than performance. */
export interface BasicGetArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to get a message from. */
  queue?: string; /** Default "" */
  noAck?: boolean; /** Default false */
}

/** This method delivers a message to the client following a get method. A message delivered by 'get-ok' must be acknowledged unless the no-ack option was set in the get method. */
export interface BasicGetOkArgs {
  deliveryTag: number;
  redelivered?: boolean; /** Default false */
  /** Specifies the name of the exchange that the message was originally published to. If empty, the message was published to the default exchange. */
  exchange: string;
  /** Specifies the routing key name specified when the message was published. */
  routingKey: string;
  messageCount: number;
}

/** This method tells the client that the queue has no messages available for the client. */
export interface BasicGetEmptyArgs {
  clusterId?: string; /** Default "" */
}

/** This method acknowledges one or more messages delivered via the Deliver or Get-Ok methods. The client can ask to confirm a single message or a set of messages up to and including a specific message. */
export interface BasicAckArgs {
  deliveryTag?: number; /** Default 0 */
  /** If set to 1, the delivery tag is treated as up to and including, so that the client can acknowledge multiple messages with a single method. If set to zero, the delivery tag refers to a single message. If the multiple field is 1, and the delivery tag is zero, tells the server to acknowledge all outstanding messages. */
  multiple?: boolean; /** Default false */
}

/** This method allows a client to reject a message. It can be used to interrupt and cancel large incoming messages, or return untreatable messages to their original queue. */
export interface BasicRejectArgs {
  deliveryTag: number;
  /** If requeue is true, the server will attempt to requeue the message. If requeue is false or the requeue attempt fails the messages are discarded or dead-lettered. */
  requeue?: boolean; /** Default true */
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method is deprecated in favour of the synchronous Recover/Recover-Ok. */
export interface BasicRecoverAsyncArgs {
  /** If this field is zero, the message will be redelivered to the original recipient. If this bit is 1, the server will attempt to requeue the message, potentially then delivering it to an alternative subscriber. */
  requeue?: boolean; /** Default false */
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method replaces the asynchronous Recover. */
export interface BasicRecoverArgs {
  /** If this field is zero, the message will be redelivered to the original recipient. If this bit is 1, the server will attempt to requeue the message, potentially then delivering it to an alternative subscriber. */
  requeue?: boolean; /** Default false */
}

/** This method acknowledges a Basic.Recover method. */
/** @ignore */
export interface BasicRecoverOkArgs {
}

export interface BasicNackArgs {
  deliveryTag?: number; /** Default 0 */
  multiple?: boolean; /** Default false */
  requeue?: boolean; /** Default true */
}

/** This method starts the connection negotiation process by telling the client the protocol version that the server proposes, along with a list of security mechanisms which the client can use for authentication. */
export interface ConnectionStartArgs {
  /** The major version number can take any value from 0 to 99 as defined in the AMQP specification. */
  versionMajor?: number; /** Default 0 */
  /** The minor version number can take any value from 0 to 99 as defined in the AMQP specification. */
  versionMinor?: number; /** Default 9 */
  serverProperties: Record<string, unknown>;
  /** A list of the security mechanisms that the server supports, delimited by spaces. */
  mechanisms?: string; /** Default "PLAIN" */
  /** A list of the message locales that the server supports, delimited by spaces. The locale defines the language in which the server will send reply texts. */
  locales?: string; /** Default "en_US" */
}

/** This method selects a SASL security mechanism. */
export interface ConnectionStartOkArgs {
  clientProperties: Record<string, unknown>;
  /** A single security mechanisms selected by the client, which must be one of those specified by the server. */
  mechanism?: string; /** Default "PLAIN" */
  /** A block of opaque data passed to the security mechanism. The contents of this data are defined by the SASL security mechanism. */
  response: string;
  /** A single message locale selected by the client, which must be one of those specified by the server. */
  locale?: string; /** Default "en_US" */
}

/** The SASL protocol works by exchanging challenges and responses until both peers have received sufficient information to authenticate each other. This method challenges the client to provide more information. */
export interface ConnectionSecureArgs {
  /** Challenge information, a block of opaque binary data passed to the security mechanism. */
  challenge: string;
}

/** This method attempts to authenticate, passing a block of SASL data for the security mechanism at the server side. */
export interface ConnectionSecureOkArgs {
  /** A block of opaque data passed to the security mechanism. The contents of this data are defined by the SASL security mechanism. */
  response: string;
}

/** This method proposes a set of connection configuration values to the client. The client can accept and/or adjust these. */
export interface ConnectionTuneArgs {
  /** Specifies highest channel number that the server permits. Usable channel numbers are in the range 1..channel-max. Zero indicates no specified limit. */
  channelMax?: number; /** Default 0 */
  /** The largest frame size that the server proposes for the connection, including frame header and end-byte. The client can negotiate a lower value. Zero means that the server does not impose any specific limit but may reject very large frames if it cannot allocate resources for them. */
  frameMax?: number; /** Default 0 */
  /** The delay, in seconds, of the connection heartbeat that the server wants. Zero means the server does not want a heartbeat. */
  heartbeat?: number; /** Default 0 */
}

/** This method sends the client's connection tuning parameters to the server. Certain fields are negotiated, others provide capability information. */
export interface ConnectionTuneOkArgs {
  /** The maximum total number of channels that the client will use per connection. */
  channelMax?: number; /** Default 0 */
  /** The largest frame size that the client and server will use for the connection. Zero means that the client does not impose any specific limit but may reject very large frames if it cannot allocate resources for them. Note that the frame-max limit applies principally to content frames, where large contents can be broken into frames of arbitrary size. */
  frameMax?: number; /** Default 0 */
  /** The delay, in seconds, of the connection heartbeat that the client wants. Zero means the client does not want a heartbeat. */
  heartbeat?: number; /** Default 0 */
}

/** This method opens a connection to a virtual host, which is a collection of resources, and acts to separate multiple application domains within a server. The server may apply arbitrary limits per virtual host, such as the number of each type of entity that may be used, per connection and/or in total. */
export interface ConnectionOpenArgs {
  /** The name of the virtual host to work with. */
  virtualHost?: string; /** Default "/" */
  capabilities?: string; /** Default "" */
  insist?: boolean; /** Default false */
}

/** This method signals to the client that the connection is ready for use. */
export interface ConnectionOpenOkArgs {
  knownHosts?: string; /** Default "" */
}

/** This method indicates that the sender wants to close the connection. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ConnectionCloseArgs {
  replyCode: number;
  replyText?: string; /** Default "" */
  /** When the close is provoked by a method exception, this is the class of the method. */
  classId: number;
  /** When the close is provoked by a method exception, this is the ID of the method. */
  methodId: number;
}

/** This method confirms a Connection.Close method and tells the recipient that it is safe to release resources for the connection and close the socket. */
/** @ignore */
export interface ConnectionCloseOkArgs {
}

export interface ConnectionBlockedArgs {
  reason?: string; /** Default "" */
}

/** @ignore */
export interface ConnectionUnblockedArgs {
}

export interface ConnectionUpdateSecretArgs {
  newSecret: string;
  reason: string;
}

/** @ignore */
export interface ConnectionUpdateSecretOkArgs {
}

/** This method opens a channel to the server. */
export interface ChannelOpenArgs {
  outOfBand?: string; /** Default "" */
}

/** This method signals to the client that the channel is ready for use. */
export interface ChannelOpenOkArgs {
  channelId?: string; /** Default "" */
}

/** This method asks the peer to pause or restart the flow of content data sent by a consumer. This is a simple flow-control mechanism that a peer can use to avoid overflowing its queues or otherwise finding itself receiving more messages than it can process. Note that this method is not intended for window control. It does not affect contents returned by Basic.Get-Ok methods. */
export interface ChannelFlowArgs {
  /** If 1, the peer starts sending content frames. If 0, the peer stops sending content frames. */
  active: boolean;
}

/** Confirms to the peer that a flow command was received and processed. */
export interface ChannelFlowOkArgs {
  /** Confirms the setting of the processed flow method: 1 means the peer will start sending or continue to send content frames; 0 means it will not. */
  active: boolean;
}

/** This method indicates that the sender wants to close the channel. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ChannelCloseArgs {
  replyCode: number;
  replyText?: string; /** Default "" */
  /** When the close is provoked by a method exception, this is the class of the method. */
  classId: number;
  /** When the close is provoked by a method exception, this is the ID of the method. */
  methodId: number;
}

/** This method confirms a Channel.Close method and tells the recipient that it is safe to release resources for the channel. */
/** @ignore */
export interface ChannelCloseOkArgs {
}

export interface AccessRequestArgs {
  realm?: string; /** Default "/data" */
  exclusive?: boolean; /** Default false */
  passive?: boolean; /** Default true */
  active?: boolean; /** Default true */
  write?: boolean; /** Default true */
  read?: boolean; /** Default true */
}

export interface AccessRequestOkArgs {
  ticket?: number; /** Default 1 */
}

/** This method creates an exchange if it does not already exist, and if the exchange exists, verifies that it is of the correct and expected class. */
export interface ExchangeDeclareArgs {
  ticket?: number; /** Default 0 */
  exchange: string;
  /** Each exchange belongs to one of a set of exchange types implemented by the server. The exchange types define the functionality of the exchange - i.e. how messages are routed through it. It is not valid or meaningful to attempt to change the type of an existing exchange. */
  type?: string; /** Default "direct" */
  /** If set, the server will reply with Declare-Ok if the exchange already exists with the same name, and raise an error if not. The client can use this to check whether an exchange exists without modifying the server state. When set, all other method fields except name and no-wait are ignored. A declare with both passive and no-wait has no effect. Arguments are compared for semantic equivalence. */
  passive?: boolean; /** Default false */
  /** If set when creating a new exchange, the exchange will be marked as durable. Durable exchanges remain active when a server restarts. Non-durable exchanges (transient exchanges) are purged if/when a server restarts. */
  durable?: boolean; /** Default false */
  autoDelete?: boolean; /** Default false */
  internal?: boolean; /** Default false */
  /** A set of arguments for the declaration. The syntax and semantics of these arguments depends on the server implementation. */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** This method confirms a Declare method and confirms the name of the exchange, essential for automatically-named exchanges. */
/** @ignore */
export interface ExchangeDeclareOkArgs {
}

/** This method deletes an exchange. When an exchange is deleted all queue bindings on the exchange are cancelled. */
export interface ExchangeDeleteArgs {
  ticket?: number; /** Default 0 */
  exchange: string;
  /** If set, the server will only delete the exchange if it has no queue bindings. If the exchange has queue bindings the server does not delete it but raises a channel exception instead. */
  ifUnused?: boolean; /** Default false */
}

/** This method confirms the deletion of an exchange. */
/** @ignore */
export interface ExchangeDeleteOkArgs {
}

export interface ExchangeBindArgs {
  ticket?: number; /** Default 0 */
  destination: string;
  source: string;
  routingKey?: string; /** Default "" */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** @ignore */
export interface ExchangeBindOkArgs {
}

export interface ExchangeUnbindArgs {
  ticket?: number; /** Default 0 */
  destination: string;
  source: string;
  routingKey?: string; /** Default "" */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** @ignore */
export interface ExchangeUnbindOkArgs {
}

/** This method creates or checks a queue. When creating a new queue the client can specify various properties that control the durability of the queue and its contents, and the level of sharing for the queue. */
export interface QueueDeclareArgs {
  ticket?: number; /** Default 0 */
  queue?: string; /** Default "" */
  /** If set, the server will reply with Declare-Ok if the queue already exists with the same name, and raise an error if not. The client can use this to check whether a queue exists without modifying the server state. When set, all other method fields except name and no-wait are ignored. A declare with both passive and no-wait has no effect. Arguments are compared for semantic equivalence. */
  passive?: boolean; /** Default false */
  /** If set when creating a new queue, the queue will be marked as durable. Durable queues remain active when a server restarts. Non-durable queues (transient queues) are purged if/when a server restarts. Note that durable queues do not necessarily hold persistent messages, although it does not make sense to send persistent messages to a transient queue. */
  durable?: boolean; /** Default false */
  /** Exclusive queues may only be accessed by the current connection, and are deleted when that connection closes. Passive declaration of an exclusive queue by other connections are not allowed. */
  exclusive?: boolean; /** Default false */
  /** If set, the queue is deleted when all consumers have finished using it. The last consumer can be cancelled either explicitly or because its channel is closed. If there was no consumer ever on the queue, it won't be deleted. Applications can explicitly delete auto-delete queues using the Delete method as normal. */
  autoDelete?: boolean; /** Default false */
  /** A set of arguments for the declaration. The syntax and semantics of these arguments depends on the server implementation. */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** This method confirms a Declare method and confirms the name of the queue, essential for automatically-named queues. */
export interface QueueDeclareOkArgs {
  /** Reports the name of the queue. If the server generated a queue name, this field contains that name. */
  queue: string;
  messageCount: number;
  /** Reports the number of active consumers for the queue. Note that consumers can suspend activity (Channel.Flow) in which case they do not appear in this count. */
  consumerCount: number;
}

/** This method binds a queue to an exchange. Until a queue is bound it will not receive any messages. In a classic messaging model, store-and-forward queues are bound to a direct exchange and subscription queues are bound to a topic exchange. */
export interface QueueBindArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to bind. */
  queue?: string; /** Default "" */
  exchange: string;
  /** Specifies the routing key for the binding. The routing key is used for routing messages depending on the exchange configuration. Not all exchanges use a routing key - refer to the specific exchange documentation. If the queue name is empty, the server uses the last queue declared on the channel. If the routing key is also empty, the server uses this queue name for the routing key as well. If the queue name is provided but the routing key is empty, the server does the binding with that empty routing key. The meaning of empty routing keys depends on the exchange implementation. */
  routingKey?: string; /** Default "" */
  /** A set of arguments for the binding. The syntax and semantics of these arguments depends on the exchange class. */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** This method confirms that the bind was successful. */
/** @ignore */
export interface QueueBindOkArgs {
}

/** This method removes all messages from a queue which are not awaiting acknowledgment. */
export interface QueuePurgeArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to purge. */
  queue?: string; /** Default "" */
}

/** This method confirms the purge of a queue. */
export interface QueuePurgeOkArgs {
  /** Reports the number of messages purged. */
  messageCount: number;
}

/** This method deletes a queue. When a queue is deleted any pending messages are sent to a dead-letter queue if this is defined in the server configuration, and all consumers on the queue are cancelled. */
export interface QueueDeleteArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to delete. */
  queue?: string; /** Default "" */
  /** If set, the server will only delete the queue if it has no consumers. If the queue has consumers the server does does not delete it but raises a channel exception instead. */
  ifUnused?: boolean; /** Default false */
  /** If set, the server will only delete the queue if it has no messages. */
  ifEmpty?: boolean; /** Default false */
}

/** This method confirms the deletion of a queue. */
export interface QueueDeleteOkArgs {
  /** Reports the number of messages deleted. */
  messageCount: number;
}

/** This method unbinds a queue from an exchange. */
export interface QueueUnbindArgs {
  ticket?: number; /** Default 0 */
  /** Specifies the name of the queue to unbind. */
  queue?: string; /** Default "" */
  /** The name of the exchange to unbind from. */
  exchange: string;
  /** Specifies the routing key of the binding to unbind. */
  routingKey?: string; /** Default "" */
  /** Specifies the arguments of the binding to unbind. */
  arguments?: Record<string, unknown>; /** Default {} */
}

/** This method confirms that the unbind was successful. */
/** @ignore */
export interface QueueUnbindOkArgs {
}

/** This method sets the channel to use standard transactions. The client must use this method at least once on a channel before using the Commit or Rollback methods. */
/** @ignore */
export interface TxSelectArgs {
}

/** This method confirms to the client that the channel was successfully set to use standard transactions. */
/** @ignore */
export interface TxSelectOkArgs {
}

/** This method commits all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a commit. */
/** @ignore */
export interface TxCommitArgs {
}

/** This method confirms to the client that the commit succeeded. Note that if a commit fails, the server raises a channel exception. */
/** @ignore */
export interface TxCommitOkArgs {
}

/** This method abandons all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a rollback. Note that unacked messages will not be automatically redelivered by rollback; if that is required an explicit recover call should be issued. */
/** @ignore */
export interface TxRollbackArgs {
}

/** This method confirms to the client that the rollback succeeded. Note that if an rollback fails, the server raises a channel exception. */
/** @ignore */
export interface TxRollbackOkArgs {
}

/** @ignore */
export interface ConfirmSelectArgs {
}

/** @ignore */
export interface ConfirmSelectOkArgs {
}

/** This method requests a specific quality of service. The QoS can be specified for the current channel or for all channels on the connection. The particular properties and semantics of a qos method always depend on the content class semantics. Though the qos method could in principle apply to both peers, it is currently meaningful only for the server. */
export interface BasicQos extends BasicQosArgs {
  prefetchSize: number;
  prefetchCount: number;
  global: boolean;
}

/** This method tells the client that the requested QoS levels could be handled by the server. The requested QoS applies to all active consumers until a new QoS is defined. */
/** @ignore */
export interface BasicQosOk extends BasicQosOkArgs {
}

/** This method asks the server to start a consumer, which is a transient request for messages from a specific queue. Consumers last as long as the channel they were declared on, or until the client cancels them. */
export interface BasicConsume extends BasicConsumeArgs {
  ticket: number;
  queue: string;
  consumerTag: string;
  noLocal: boolean;
  noAck: boolean;
  exclusive: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** The server provides the client with a consumer tag, which is used by the client for methods called on the consumer at a later stage. */
export interface BasicConsumeOk extends BasicConsumeOkArgs {
  consumerTag: string;
}

/** This method cancels a consumer. This does not affect already delivered messages, but it does mean the server will not send any more messages for that consumer. The client may receive an arbitrary number of messages in between sending the cancel method and receiving the cancel-ok reply. */
export interface BasicCancel extends BasicCancelArgs {
  consumerTag: string;
  nowait: boolean;
}

/** This method confirms that the cancellation was completed. */
export interface BasicCancelOk extends BasicCancelOkArgs {
  consumerTag: string;
}

/** This method publishes a message to a specific exchange. The message will be routed to queues as defined by the exchange configuration and distributed to any active consumers when the transaction, if any, is committed. */
export interface BasicPublish extends BasicPublishArgs {
  ticket: number;
  exchange: string;
  routingKey: string;
  mandatory: boolean;
  immediate: boolean;
}

/** This method returns an undeliverable message that was published with the immediate flag set, or an unroutable message published with the mandatory flag set. The reply code and text provide information about the reason that the message was undeliverable. */
export interface BasicReturn extends BasicReturnArgs {
  replyCode: number;
  replyText: string;
  exchange: string;
  routingKey: string;
}

/** This method delivers a message to the client, via a consumer. In the asynchronous message delivery model, the client starts a consumer using the Consume method, then the server responds with Deliver methods as and when messages arrive for that consumer. */
export interface BasicDeliver extends BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}

/** This method provides a direct access to the messages in a queue using a synchronous dialogue that is designed for specific types of application where synchronous functionality is more important than performance. */
export interface BasicGet extends BasicGetArgs {
  ticket: number;
  queue: string;
  noAck: boolean;
}

/** This method delivers a message to the client following a get method. A message delivered by 'get-ok' must be acknowledged unless the no-ack option was set in the get method. */
export interface BasicGetOk extends BasicGetOkArgs {
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

/** This method tells the client that the queue has no messages available for the client. */
export interface BasicGetEmpty extends BasicGetEmptyArgs {
  clusterId: string;
}

/** This method acknowledges one or more messages delivered via the Deliver or Get-Ok methods. The client can ask to confirm a single message or a set of messages up to and including a specific message. */
export interface BasicAck extends BasicAckArgs {
  deliveryTag: number;
  multiple: boolean;
}

/** This method allows a client to reject a message. It can be used to interrupt and cancel large incoming messages, or return untreatable messages to their original queue. */
export interface BasicReject extends BasicRejectArgs {
  deliveryTag: number;
  requeue: boolean;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method is deprecated in favour of the synchronous Recover/Recover-Ok. */
export interface BasicRecoverAsync extends BasicRecoverAsyncArgs {
  requeue: boolean;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method replaces the asynchronous Recover. */
export interface BasicRecover extends BasicRecoverArgs {
  requeue: boolean;
}

/** This method acknowledges a Basic.Recover method. */
/** @ignore */
export interface BasicRecoverOk extends BasicRecoverOkArgs {
}

export interface BasicNack extends BasicNackArgs {
  deliveryTag: number;
  multiple: boolean;
  requeue: boolean;
}

/** This method starts the connection negotiation process by telling the client the protocol version that the server proposes, along with a list of security mechanisms which the client can use for authentication. */
export interface ConnectionStart extends ConnectionStartArgs {
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, unknown>;
  mechanisms: string;
  locales: string;
}

/** This method selects a SASL security mechanism. */
export interface ConnectionStartOk extends ConnectionStartOkArgs {
  clientProperties: Record<string, unknown>;
  mechanism: string;
  response: string;
  locale: string;
}

/** The SASL protocol works by exchanging challenges and responses until both peers have received sufficient information to authenticate each other. This method challenges the client to provide more information. */
export interface ConnectionSecure extends ConnectionSecureArgs {
  challenge: string;
}

/** This method attempts to authenticate, passing a block of SASL data for the security mechanism at the server side. */
export interface ConnectionSecureOk extends ConnectionSecureOkArgs {
  response: string;
}

/** This method proposes a set of connection configuration values to the client. The client can accept and/or adjust these. */
export interface ConnectionTune extends ConnectionTuneArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

/** This method sends the client's connection tuning parameters to the server. Certain fields are negotiated, others provide capability information. */
export interface ConnectionTuneOk extends ConnectionTuneOkArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

/** This method opens a connection to a virtual host, which is a collection of resources, and acts to separate multiple application domains within a server. The server may apply arbitrary limits per virtual host, such as the number of each type of entity that may be used, per connection and/or in total. */
export interface ConnectionOpen extends ConnectionOpenArgs {
  virtualHost: string;
  capabilities: string;
  insist: boolean;
}

/** This method signals to the client that the connection is ready for use. */
export interface ConnectionOpenOk extends ConnectionOpenOkArgs {
  knownHosts: string;
}

/** This method indicates that the sender wants to close the connection. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ConnectionClose extends ConnectionCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

/** This method confirms a Connection.Close method and tells the recipient that it is safe to release resources for the connection and close the socket. */
/** @ignore */
export interface ConnectionCloseOk extends ConnectionCloseOkArgs {
}

export interface ConnectionBlocked extends ConnectionBlockedArgs {
  reason: string;
}

/** @ignore */
export interface ConnectionUnblocked extends ConnectionUnblockedArgs {
}

export interface ConnectionUpdateSecret extends ConnectionUpdateSecretArgs {
  newSecret: string;
  reason: string;
}

/** @ignore */
export interface ConnectionUpdateSecretOk extends ConnectionUpdateSecretOkArgs {
}

/** This method opens a channel to the server. */
export interface ChannelOpen extends ChannelOpenArgs {
  outOfBand: string;
}

/** This method signals to the client that the channel is ready for use. */
export interface ChannelOpenOk extends ChannelOpenOkArgs {
  channelId: string;
}

/** This method asks the peer to pause or restart the flow of content data sent by a consumer. This is a simple flow-control mechanism that a peer can use to avoid overflowing its queues or otherwise finding itself receiving more messages than it can process. Note that this method is not intended for window control. It does not affect contents returned by Basic.Get-Ok methods. */
export interface ChannelFlow extends ChannelFlowArgs {
  active: boolean;
}

/** Confirms to the peer that a flow command was received and processed. */
export interface ChannelFlowOk extends ChannelFlowOkArgs {
  active: boolean;
}

/** This method indicates that the sender wants to close the channel. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ChannelClose extends ChannelCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

/** This method confirms a Channel.Close method and tells the recipient that it is safe to release resources for the channel. */
/** @ignore */
export interface ChannelCloseOk extends ChannelCloseOkArgs {
}

export interface AccessRequest extends AccessRequestArgs {
  realm: string;
  exclusive: boolean;
  passive: boolean;
  active: boolean;
  write: boolean;
  read: boolean;
}

export interface AccessRequestOk extends AccessRequestOkArgs {
  ticket: number;
}

/** This method creates an exchange if it does not already exist, and if the exchange exists, verifies that it is of the correct and expected class. */
export interface ExchangeDeclare extends ExchangeDeclareArgs {
  ticket: number;
  exchange: string;
  type: string;
  passive: boolean;
  durable: boolean;
  autoDelete: boolean;
  internal: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** This method confirms a Declare method and confirms the name of the exchange, essential for automatically-named exchanges. */
/** @ignore */
export interface ExchangeDeclareOk extends ExchangeDeclareOkArgs {
}

/** This method deletes an exchange. When an exchange is deleted all queue bindings on the exchange are cancelled. */
export interface ExchangeDelete extends ExchangeDeleteArgs {
  ticket: number;
  exchange: string;
  ifUnused: boolean;
  nowait: boolean;
}

/** This method confirms the deletion of an exchange. */
/** @ignore */
export interface ExchangeDeleteOk extends ExchangeDeleteOkArgs {
}

export interface ExchangeBind extends ExchangeBindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** @ignore */
export interface ExchangeBindOk extends ExchangeBindOkArgs {
}

export interface ExchangeUnbind extends ExchangeUnbindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** @ignore */
export interface ExchangeUnbindOk extends ExchangeUnbindOkArgs {
}

/** This method creates or checks a queue. When creating a new queue the client can specify various properties that control the durability of the queue and its contents, and the level of sharing for the queue. */
export interface QueueDeclare extends QueueDeclareArgs {
  ticket: number;
  queue: string;
  passive: boolean;
  durable: boolean;
  exclusive: boolean;
  autoDelete: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** This method confirms a Declare method and confirms the name of the queue, essential for automatically-named queues. */
export interface QueueDeclareOk extends QueueDeclareOkArgs {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

/** This method binds a queue to an exchange. Until a queue is bound it will not receive any messages. In a classic messaging model, store-and-forward queues are bound to a direct exchange and subscription queues are bound to a topic exchange. */
export interface QueueBind extends QueueBindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

/** This method confirms that the bind was successful. */
/** @ignore */
export interface QueueBindOk extends QueueBindOkArgs {
}

/** This method removes all messages from a queue which are not awaiting acknowledgment. */
export interface QueuePurge extends QueuePurgeArgs {
  ticket: number;
  queue: string;
  nowait: boolean;
}

/** This method confirms the purge of a queue. */
export interface QueuePurgeOk extends QueuePurgeOkArgs {
  messageCount: number;
}

/** This method deletes a queue. When a queue is deleted any pending messages are sent to a dead-letter queue if this is defined in the server configuration, and all consumers on the queue are cancelled. */
export interface QueueDelete extends QueueDeleteArgs {
  ticket: number;
  queue: string;
  ifUnused: boolean;
  ifEmpty: boolean;
  nowait: boolean;
}

/** This method confirms the deletion of a queue. */
export interface QueueDeleteOk extends QueueDeleteOkArgs {
  messageCount: number;
}

/** This method unbinds a queue from an exchange. */
export interface QueueUnbind extends QueueUnbindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  arguments: Record<string, unknown>;
}

/** This method confirms that the unbind was successful. */
/** @ignore */
export interface QueueUnbindOk extends QueueUnbindOkArgs {
}

/** This method sets the channel to use standard transactions. The client must use this method at least once on a channel before using the Commit or Rollback methods. */
/** @ignore */
export interface TxSelect extends TxSelectArgs {
}

/** This method confirms to the client that the channel was successfully set to use standard transactions. */
/** @ignore */
export interface TxSelectOk extends TxSelectOkArgs {
}

/** This method commits all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a commit. */
/** @ignore */
export interface TxCommit extends TxCommitArgs {
}

/** This method confirms to the client that the commit succeeded. Note that if a commit fails, the server raises a channel exception. */
/** @ignore */
export interface TxCommitOk extends TxCommitOkArgs {
}

/** This method abandons all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a rollback. Note that unacked messages will not be automatically redelivered by rollback; if that is required an explicit recover call should be issued. */
/** @ignore */
export interface TxRollback extends TxRollbackArgs {
}

/** This method confirms to the client that the rollback succeeded. Note that if an rollback fails, the server raises a channel exception. */
/** @ignore */
export interface TxRollbackOk extends TxRollbackOkArgs {
}

export interface ConfirmSelect extends ConfirmSelectArgs {
  nowait: boolean;
}

/** @ignore */
export interface ConfirmSelectOk extends ConfirmSelectOkArgs {
}
