// deno-lint-ignore-file no-explicit-any
import * as enc from "./encoding/mod.ts";
import type * as t from "./amqp_types.ts";

const methodNames: Record<number, Record<number, string>> = {
  [60]: {
    [10]: "basic.qos",
    [11]: "basic.qos-ok",
    [20]: "basic.consume",
    [21]: "basic.consume-ok",
    [30]: "basic.cancel",
    [31]: "basic.cancel-ok",
    [40]: "basic.publish",
    [50]: "basic.return",
    [60]: "basic.deliver",
    [70]: "basic.get",
    [71]: "basic.get-ok",
    [72]: "basic.get-empty",
    [80]: "basic.ack",
    [90]: "basic.reject",
    [100]: "basic.recover-async",
    [110]: "basic.recover",
    [111]: "basic.recover-ok",
    [120]: "basic.nack",
  },
  [10]: {
    [10]: "connection.start",
    [11]: "connection.start-ok",
    [20]: "connection.secure",
    [21]: "connection.secure-ok",
    [30]: "connection.tune",
    [31]: "connection.tune-ok",
    [40]: "connection.open",
    [41]: "connection.open-ok",
    [50]: "connection.close",
    [51]: "connection.close-ok",
    [60]: "connection.blocked",
    [61]: "connection.unblocked",
    [70]: "connection.update-secret",
    [71]: "connection.update-secret-ok",
  },
  [20]: {
    [10]: "channel.open",
    [11]: "channel.open-ok",
    [20]: "channel.flow",
    [21]: "channel.flow-ok",
    [40]: "channel.close",
    [41]: "channel.close-ok",
  },
  [30]: {
    [10]: "access.request",
    [11]: "access.request-ok",
  },
  [40]: {
    [10]: "exchange.declare",
    [11]: "exchange.declare-ok",
    [20]: "exchange.delete",
    [21]: "exchange.delete-ok",
    [30]: "exchange.bind",
    [31]: "exchange.bind-ok",
    [40]: "exchange.unbind",
    [51]: "exchange.unbind-ok",
  },
  [50]: {
    [10]: "queue.declare",
    [11]: "queue.declare-ok",
    [20]: "queue.bind",
    [21]: "queue.bind-ok",
    [30]: "queue.purge",
    [31]: "queue.purge-ok",
    [40]: "queue.delete",
    [41]: "queue.delete-ok",
    [50]: "queue.unbind",
    [51]: "queue.unbind-ok",
  },
  [90]: {
    [10]: "tx.select",
    [11]: "tx.select-ok",
    [20]: "tx.commit",
    [21]: "tx.commit-ok",
    [30]: "tx.rollback",
    [31]: "tx.rollback-ok",
  },
  [85]: {
    [10]: "confirm.select",
    [11]: "confirm.select-ok",
  },
};

export function getMethodName(
  classId: number,
  methodId: number,
): string | undefined {
  return methodNames[classId] && methodNames[classId][methodId];
}

export type WithNowait<T> = T & { nowait?: boolean };

/** This method requests a specific quality of service. The QoS can be specified for the current channel or for all channels on the connection. The particular properties and semantics of a qos method always depend on the content class semantics. Though the qos method could in principle apply to both peers, it is currently meaningful only for the server. */
export interface ReceiveBasicQos {
  classId: 60;
  methodId: 10;
  args: t.BasicQos;
}

/** This method tells the client that the requested QoS levels could be handled by the server. The requested QoS applies to all active consumers until a new QoS is defined. */
export interface ReceiveBasicQosOk {
  classId: 60;
  methodId: 11;
  args: t.BasicQosOk;
}

/** This method asks the server to start a consumer, which is a transient request for messages from a specific queue. Consumers last as long as the channel they were declared on, or until the client cancels them. */
export interface ReceiveBasicConsume {
  classId: 60;
  methodId: 20;
  args: t.BasicConsume;
}

/** The server provides the client with a consumer tag, which is used by the client for methods called on the consumer at a later stage. */
export interface ReceiveBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: t.BasicConsumeOk;
}

/** This method cancels a consumer. This does not affect already delivered messages, but it does mean the server will not send any more messages for that consumer. The client may receive an arbitrary number of messages in between sending the cancel method and receiving the cancel-ok reply. */
export interface ReceiveBasicCancel {
  classId: 60;
  methodId: 30;
  args: t.BasicCancel;
}

/** This method confirms that the cancellation was completed. */
export interface ReceiveBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: t.BasicCancelOk;
}

/** This method publishes a message to a specific exchange. The message will be routed to queues as defined by the exchange configuration and distributed to any active consumers when the transaction, if any, is committed. */
export interface ReceiveBasicPublish {
  classId: 60;
  methodId: 40;
  args: t.BasicPublish;
}

/** This method returns an undeliverable message that was published with the immediate flag set, or an unroutable message published with the mandatory flag set. The reply code and text provide information about the reason that the message was undeliverable. */
export interface ReceiveBasicReturn {
  classId: 60;
  methodId: 50;
  args: t.BasicReturn;
}

/** This method delivers a message to the client, via a consumer. In the asynchronous message delivery model, the client starts a consumer using the Consume method, then the server responds with Deliver methods as and when messages arrive for that consumer. */
export interface ReceiveBasicDeliver {
  classId: 60;
  methodId: 60;
  args: t.BasicDeliver;
}

/** This method provides a direct access to the messages in a queue using a synchronous dialogue that is designed for specific types of application where synchronous functionality is more important than performance. */
export interface ReceiveBasicGet {
  classId: 60;
  methodId: 70;
  args: t.BasicGet;
}

/** This method delivers a message to the client following a get method. A message delivered by 'get-ok' must be acknowledged unless the no-ack option was set in the get method. */
export interface ReceiveBasicGetOk {
  classId: 60;
  methodId: 71;
  args: t.BasicGetOk;
}

/** This method tells the client that the queue has no messages available for the client. */
export interface ReceiveBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: t.BasicGetEmpty;
}

/** This method acknowledges one or more messages delivered via the Deliver or Get-Ok methods. The client can ask to confirm a single message or a set of messages up to and including a specific message. */
export interface ReceiveBasicAck {
  classId: 60;
  methodId: 80;
  args: t.BasicAck;
}

/** This method allows a client to reject a message. It can be used to interrupt and cancel large incoming messages, or return untreatable messages to their original queue. */
export interface ReceiveBasicReject {
  classId: 60;
  methodId: 90;
  args: t.BasicReject;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method is deprecated in favour of the synchronous Recover/Recover-Ok. */
export interface ReceiveBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: t.BasicRecoverAsync;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method replaces the asynchronous Recover. */
export interface ReceiveBasicRecover {
  classId: 60;
  methodId: 110;
  args: t.BasicRecover;
}

/** This method acknowledges a Basic.Recover method. */
export interface ReceiveBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: t.BasicRecoverOk;
}

export interface ReceiveBasicNack {
  classId: 60;
  methodId: 120;
  args: t.BasicNack;
}

/** This method starts the connection negotiation process by telling the client the protocol version that the server proposes, along with a list of security mechanisms which the client can use for authentication. */
export interface ReceiveConnectionStart {
  classId: 10;
  methodId: 10;
  args: t.ConnectionStart;
}

/** This method selects a SASL security mechanism. */
export interface ReceiveConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: t.ConnectionStartOk;
}

/** The SASL protocol works by exchanging challenges and responses until both peers have received sufficient information to authenticate each other. This method challenges the client to provide more information. */
export interface ReceiveConnectionSecure {
  classId: 10;
  methodId: 20;
  args: t.ConnectionSecure;
}

/** This method attempts to authenticate, passing a block of SASL data for the security mechanism at the server side. */
export interface ReceiveConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: t.ConnectionSecureOk;
}

/** This method proposes a set of connection configuration values to the client. The client can accept and/or adjust these. */
export interface ReceiveConnectionTune {
  classId: 10;
  methodId: 30;
  args: t.ConnectionTune;
}

/** This method sends the client's connection tuning parameters to the server. Certain fields are negotiated, others provide capability information. */
export interface ReceiveConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: t.ConnectionTuneOk;
}

/** This method opens a connection to a virtual host, which is a collection of resources, and acts to separate multiple application domains within a server. The server may apply arbitrary limits per virtual host, such as the number of each type of entity that may be used, per connection and/or in total. */
export interface ReceiveConnectionOpen {
  classId: 10;
  methodId: 40;
  args: t.ConnectionOpen;
}

/** This method signals to the client that the connection is ready for use. */
export interface ReceiveConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: t.ConnectionOpenOk;
}

/** This method indicates that the sender wants to close the connection. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ReceiveConnectionClose {
  classId: 10;
  methodId: 50;
  args: t.ConnectionClose;
}

/** This method confirms a Connection.Close method and tells the recipient that it is safe to release resources for the connection and close the socket. */
export interface ReceiveConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: t.ConnectionCloseOk;
}

export interface ReceiveConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: t.ConnectionBlocked;
}

export interface ReceiveConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: t.ConnectionUnblocked;
}

export interface ReceiveConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: t.ConnectionUpdateSecret;
}

export interface ReceiveConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: t.ConnectionUpdateSecretOk;
}

/** This method opens a channel to the server. */
export interface ReceiveChannelOpen {
  classId: 20;
  methodId: 10;
  args: t.ChannelOpen;
}

/** This method signals to the client that the channel is ready for use. */
export interface ReceiveChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: t.ChannelOpenOk;
}

/** This method asks the peer to pause or restart the flow of content data sent by a consumer. This is a simple flow-control mechanism that a peer can use to avoid overflowing its queues or otherwise finding itself receiving more messages than it can process. Note that this method is not intended for window control. It does not affect contents returned by Basic.Get-Ok methods. */
export interface ReceiveChannelFlow {
  classId: 20;
  methodId: 20;
  args: t.ChannelFlow;
}

/** Confirms to the peer that a flow command was received and processed. */
export interface ReceiveChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: t.ChannelFlowOk;
}

/** This method indicates that the sender wants to close the channel. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface ReceiveChannelClose {
  classId: 20;
  methodId: 40;
  args: t.ChannelClose;
}

/** This method confirms a Channel.Close method and tells the recipient that it is safe to release resources for the channel. */
export interface ReceiveChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: t.ChannelCloseOk;
}

export interface ReceiveAccessRequest {
  classId: 30;
  methodId: 10;
  args: t.AccessRequest;
}

export interface ReceiveAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: t.AccessRequestOk;
}

/** This method creates an exchange if it does not already exist, and if the exchange exists, verifies that it is of the correct and expected class. */
export interface ReceiveExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: t.ExchangeDeclare;
}

/** This method confirms a Declare method and confirms the name of the exchange, essential for automatically-named exchanges. */
export interface ReceiveExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: t.ExchangeDeclareOk;
}

/** This method deletes an exchange. When an exchange is deleted all queue bindings on the exchange are cancelled. */
export interface ReceiveExchangeDelete {
  classId: 40;
  methodId: 20;
  args: t.ExchangeDelete;
}

/** This method confirms the deletion of an exchange. */
export interface ReceiveExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: t.ExchangeDeleteOk;
}

export interface ReceiveExchangeBind {
  classId: 40;
  methodId: 30;
  args: t.ExchangeBind;
}

export interface ReceiveExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: t.ExchangeBindOk;
}

export interface ReceiveExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: t.ExchangeUnbind;
}

export interface ReceiveExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: t.ExchangeUnbindOk;
}

/** This method creates or checks a queue. When creating a new queue the client can specify various properties that control the durability of the queue and its contents, and the level of sharing for the queue. */
export interface ReceiveQueueDeclare {
  classId: 50;
  methodId: 10;
  args: t.QueueDeclare;
}

/** This method confirms a Declare method and confirms the name of the queue, essential for automatically-named queues. */
export interface ReceiveQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: t.QueueDeclareOk;
}

/** This method binds a queue to an exchange. Until a queue is bound it will not receive any messages. In a classic messaging model, store-and-forward queues are bound to a direct exchange and subscription queues are bound to a topic exchange. */
export interface ReceiveQueueBind {
  classId: 50;
  methodId: 20;
  args: t.QueueBind;
}

/** This method confirms that the bind was successful. */
export interface ReceiveQueueBindOk {
  classId: 50;
  methodId: 21;
  args: t.QueueBindOk;
}

/** This method removes all messages from a queue which are not awaiting acknowledgment. */
export interface ReceiveQueuePurge {
  classId: 50;
  methodId: 30;
  args: t.QueuePurge;
}

/** This method confirms the purge of a queue. */
export interface ReceiveQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: t.QueuePurgeOk;
}

/** This method deletes a queue. When a queue is deleted any pending messages are sent to a dead-letter queue if this is defined in the server configuration, and all consumers on the queue are cancelled. */
export interface ReceiveQueueDelete {
  classId: 50;
  methodId: 40;
  args: t.QueueDelete;
}

/** This method confirms the deletion of a queue. */
export interface ReceiveQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: t.QueueDeleteOk;
}

/** This method unbinds a queue from an exchange. */
export interface ReceiveQueueUnbind {
  classId: 50;
  methodId: 50;
  args: t.QueueUnbind;
}

/** This method confirms that the unbind was successful. */
export interface ReceiveQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: t.QueueUnbindOk;
}

/** This method sets the channel to use standard transactions. The client must use this method at least once on a channel before using the Commit or Rollback methods. */
export interface ReceiveTxSelect {
  classId: 90;
  methodId: 10;
  args: t.TxSelect;
}

/** This method confirms to the client that the channel was successfully set to use standard transactions. */
export interface ReceiveTxSelectOk {
  classId: 90;
  methodId: 11;
  args: t.TxSelectOk;
}

/** This method commits all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a commit. */
export interface ReceiveTxCommit {
  classId: 90;
  methodId: 20;
  args: t.TxCommit;
}

/** This method confirms to the client that the commit succeeded. Note that if a commit fails, the server raises a channel exception. */
export interface ReceiveTxCommitOk {
  classId: 90;
  methodId: 21;
  args: t.TxCommitOk;
}

/** This method abandons all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a rollback. Note that unacked messages will not be automatically redelivered by rollback; if that is required an explicit recover call should be issued. */
export interface ReceiveTxRollback {
  classId: 90;
  methodId: 30;
  args: t.TxRollback;
}

/** This method confirms to the client that the rollback succeeded. Note that if an rollback fails, the server raises a channel exception. */
export interface ReceiveTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: t.TxRollbackOk;
}

export interface ReceiveConfirmSelect {
  classId: 85;
  methodId: 10;
  args: t.ConfirmSelect;
}

export interface ReceiveConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: t.ConfirmSelectOk;
}

/** This method requests a specific quality of service. The QoS can be specified for the current channel or for all channels on the connection. The particular properties and semantics of a qos method always depend on the content class semantics. Though the qos method could in principle apply to both peers, it is currently meaningful only for the server. */
export interface SendBasicQos {
  classId: 60;
  methodId: 10;
  args: t.BasicQosArgs;
}

/** This method tells the client that the requested QoS levels could be handled by the server. The requested QoS applies to all active consumers until a new QoS is defined. */
export interface SendBasicQosOk {
  classId: 60;
  methodId: 11;
  args: t.BasicQosOkArgs;
}

/** This method asks the server to start a consumer, which is a transient request for messages from a specific queue. Consumers last as long as the channel they were declared on, or until the client cancels them. */
export interface SendBasicConsume {
  classId: 60;
  methodId: 20;
  args: WithNowait<t.BasicConsumeArgs>;
}

/** The server provides the client with a consumer tag, which is used by the client for methods called on the consumer at a later stage. */
export interface SendBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: t.BasicConsumeOkArgs;
}

/** This method cancels a consumer. This does not affect already delivered messages, but it does mean the server will not send any more messages for that consumer. The client may receive an arbitrary number of messages in between sending the cancel method and receiving the cancel-ok reply. */
export interface SendBasicCancel {
  classId: 60;
  methodId: 30;
  args: WithNowait<t.BasicCancelArgs>;
}

/** This method confirms that the cancellation was completed. */
export interface SendBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: t.BasicCancelOkArgs;
}

/** This method publishes a message to a specific exchange. The message will be routed to queues as defined by the exchange configuration and distributed to any active consumers when the transaction, if any, is committed. */
export interface SendBasicPublish {
  classId: 60;
  methodId: 40;
  args: t.BasicPublishArgs;
}

/** This method returns an undeliverable message that was published with the immediate flag set, or an unroutable message published with the mandatory flag set. The reply code and text provide information about the reason that the message was undeliverable. */
export interface SendBasicReturn {
  classId: 60;
  methodId: 50;
  args: t.BasicReturnArgs;
}

/** This method delivers a message to the client, via a consumer. In the asynchronous message delivery model, the client starts a consumer using the Consume method, then the server responds with Deliver methods as and when messages arrive for that consumer. */
export interface SendBasicDeliver {
  classId: 60;
  methodId: 60;
  args: t.BasicDeliverArgs;
}

/** This method provides a direct access to the messages in a queue using a synchronous dialogue that is designed for specific types of application where synchronous functionality is more important than performance. */
export interface SendBasicGet {
  classId: 60;
  methodId: 70;
  args: t.BasicGetArgs;
}

/** This method delivers a message to the client following a get method. A message delivered by 'get-ok' must be acknowledged unless the no-ack option was set in the get method. */
export interface SendBasicGetOk {
  classId: 60;
  methodId: 71;
  args: t.BasicGetOkArgs;
}

/** This method tells the client that the queue has no messages available for the client. */
export interface SendBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: t.BasicGetEmptyArgs;
}

/** This method acknowledges one or more messages delivered via the Deliver or Get-Ok methods. The client can ask to confirm a single message or a set of messages up to and including a specific message. */
export interface SendBasicAck {
  classId: 60;
  methodId: 80;
  args: t.BasicAckArgs;
}

/** This method allows a client to reject a message. It can be used to interrupt and cancel large incoming messages, or return untreatable messages to their original queue. */
export interface SendBasicReject {
  classId: 60;
  methodId: 90;
  args: t.BasicRejectArgs;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method is deprecated in favour of the synchronous Recover/Recover-Ok. */
export interface SendBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: t.BasicRecoverAsyncArgs;
}

/** This method asks the server to redeliver all unacknowledged messages on a specified channel. Zero or more messages may be redelivered. This method replaces the asynchronous Recover. */
export interface SendBasicRecover {
  classId: 60;
  methodId: 110;
  args: t.BasicRecoverArgs;
}

/** This method acknowledges a Basic.Recover method. */
export interface SendBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: t.BasicRecoverOkArgs;
}

export interface SendBasicNack {
  classId: 60;
  methodId: 120;
  args: t.BasicNackArgs;
}

/** This method starts the connection negotiation process by telling the client the protocol version that the server proposes, along with a list of security mechanisms which the client can use for authentication. */
export interface SendConnectionStart {
  classId: 10;
  methodId: 10;
  args: t.ConnectionStartArgs;
}

/** This method selects a SASL security mechanism. */
export interface SendConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: t.ConnectionStartOkArgs;
}

/** The SASL protocol works by exchanging challenges and responses until both peers have received sufficient information to authenticate each other. This method challenges the client to provide more information. */
export interface SendConnectionSecure {
  classId: 10;
  methodId: 20;
  args: t.ConnectionSecureArgs;
}

/** This method attempts to authenticate, passing a block of SASL data for the security mechanism at the server side. */
export interface SendConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: t.ConnectionSecureOkArgs;
}

/** This method proposes a set of connection configuration values to the client. The client can accept and/or adjust these. */
export interface SendConnectionTune {
  classId: 10;
  methodId: 30;
  args: t.ConnectionTuneArgs;
}

/** This method sends the client's connection tuning parameters to the server. Certain fields are negotiated, others provide capability information. */
export interface SendConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: t.ConnectionTuneOkArgs;
}

/** This method opens a connection to a virtual host, which is a collection of resources, and acts to separate multiple application domains within a server. The server may apply arbitrary limits per virtual host, such as the number of each type of entity that may be used, per connection and/or in total. */
export interface SendConnectionOpen {
  classId: 10;
  methodId: 40;
  args: t.ConnectionOpenArgs;
}

/** This method signals to the client that the connection is ready for use. */
export interface SendConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: t.ConnectionOpenOkArgs;
}

/** This method indicates that the sender wants to close the connection. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface SendConnectionClose {
  classId: 10;
  methodId: 50;
  args: t.ConnectionCloseArgs;
}

/** This method confirms a Connection.Close method and tells the recipient that it is safe to release resources for the connection and close the socket. */
export interface SendConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: t.ConnectionCloseOkArgs;
}

export interface SendConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: t.ConnectionBlockedArgs;
}

export interface SendConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: t.ConnectionUnblockedArgs;
}

export interface SendConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: t.ConnectionUpdateSecretArgs;
}

export interface SendConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: t.ConnectionUpdateSecretOkArgs;
}

/** This method opens a channel to the server. */
export interface SendChannelOpen {
  classId: 20;
  methodId: 10;
  args: t.ChannelOpenArgs;
}

/** This method signals to the client that the channel is ready for use. */
export interface SendChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: t.ChannelOpenOkArgs;
}

/** This method asks the peer to pause or restart the flow of content data sent by a consumer. This is a simple flow-control mechanism that a peer can use to avoid overflowing its queues or otherwise finding itself receiving more messages than it can process. Note that this method is not intended for window control. It does not affect contents returned by Basic.Get-Ok methods. */
export interface SendChannelFlow {
  classId: 20;
  methodId: 20;
  args: t.ChannelFlowArgs;
}

/** Confirms to the peer that a flow command was received and processed. */
export interface SendChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: t.ChannelFlowOkArgs;
}

/** This method indicates that the sender wants to close the channel. This may be due to internal conditions (e.g. a forced shut-down) or due to an error handling a specific method, i.e. an exception. When a close is due to an exception, the sender provides the class and method id of the method which caused the exception. */
export interface SendChannelClose {
  classId: 20;
  methodId: 40;
  args: t.ChannelCloseArgs;
}

/** This method confirms a Channel.Close method and tells the recipient that it is safe to release resources for the channel. */
export interface SendChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: t.ChannelCloseOkArgs;
}

export interface SendAccessRequest {
  classId: 30;
  methodId: 10;
  args: t.AccessRequestArgs;
}

export interface SendAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: t.AccessRequestOkArgs;
}

/** This method creates an exchange if it does not already exist, and if the exchange exists, verifies that it is of the correct and expected class. */
export interface SendExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: WithNowait<t.ExchangeDeclareArgs>;
}

/** This method confirms a Declare method and confirms the name of the exchange, essential for automatically-named exchanges. */
export interface SendExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: t.ExchangeDeclareOkArgs;
}

/** This method deletes an exchange. When an exchange is deleted all queue bindings on the exchange are cancelled. */
export interface SendExchangeDelete {
  classId: 40;
  methodId: 20;
  args: WithNowait<t.ExchangeDeleteArgs>;
}

/** This method confirms the deletion of an exchange. */
export interface SendExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: t.ExchangeDeleteOkArgs;
}

export interface SendExchangeBind {
  classId: 40;
  methodId: 30;
  args: WithNowait<t.ExchangeBindArgs>;
}

export interface SendExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: t.ExchangeBindOkArgs;
}

export interface SendExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: WithNowait<t.ExchangeUnbindArgs>;
}

export interface SendExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: t.ExchangeUnbindOkArgs;
}

/** This method creates or checks a queue. When creating a new queue the client can specify various properties that control the durability of the queue and its contents, and the level of sharing for the queue. */
export interface SendQueueDeclare {
  classId: 50;
  methodId: 10;
  args: WithNowait<t.QueueDeclareArgs>;
}

/** This method confirms a Declare method and confirms the name of the queue, essential for automatically-named queues. */
export interface SendQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: t.QueueDeclareOkArgs;
}

/** This method binds a queue to an exchange. Until a queue is bound it will not receive any messages. In a classic messaging model, store-and-forward queues are bound to a direct exchange and subscription queues are bound to a topic exchange. */
export interface SendQueueBind {
  classId: 50;
  methodId: 20;
  args: WithNowait<t.QueueBindArgs>;
}

/** This method confirms that the bind was successful. */
export interface SendQueueBindOk {
  classId: 50;
  methodId: 21;
  args: t.QueueBindOkArgs;
}

/** This method removes all messages from a queue which are not awaiting acknowledgment. */
export interface SendQueuePurge {
  classId: 50;
  methodId: 30;
  args: WithNowait<t.QueuePurgeArgs>;
}

/** This method confirms the purge of a queue. */
export interface SendQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: t.QueuePurgeOkArgs;
}

/** This method deletes a queue. When a queue is deleted any pending messages are sent to a dead-letter queue if this is defined in the server configuration, and all consumers on the queue are cancelled. */
export interface SendQueueDelete {
  classId: 50;
  methodId: 40;
  args: WithNowait<t.QueueDeleteArgs>;
}

/** This method confirms the deletion of a queue. */
export interface SendQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: t.QueueDeleteOkArgs;
}

/** This method unbinds a queue from an exchange. */
export interface SendQueueUnbind {
  classId: 50;
  methodId: 50;
  args: t.QueueUnbindArgs;
}

/** This method confirms that the unbind was successful. */
export interface SendQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: t.QueueUnbindOkArgs;
}

/** This method sets the channel to use standard transactions. The client must use this method at least once on a channel before using the Commit or Rollback methods. */
export interface SendTxSelect {
  classId: 90;
  methodId: 10;
  args: t.TxSelectArgs;
}

/** This method confirms to the client that the channel was successfully set to use standard transactions. */
export interface SendTxSelectOk {
  classId: 90;
  methodId: 11;
  args: t.TxSelectOkArgs;
}

/** This method commits all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a commit. */
export interface SendTxCommit {
  classId: 90;
  methodId: 20;
  args: t.TxCommitArgs;
}

/** This method confirms to the client that the commit succeeded. Note that if a commit fails, the server raises a channel exception. */
export interface SendTxCommitOk {
  classId: 90;
  methodId: 21;
  args: t.TxCommitOkArgs;
}

/** This method abandons all message publications and acknowledgments performed in the current transaction. A new transaction starts immediately after a rollback. Note that unacked messages will not be automatically redelivered by rollback; if that is required an explicit recover call should be issued. */
export interface SendTxRollback {
  classId: 90;
  methodId: 30;
  args: t.TxRollbackArgs;
}

/** This method confirms to the client that the rollback succeeded. Note that if an rollback fails, the server raises a channel exception. */
export interface SendTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: t.TxRollbackOkArgs;
}

export interface SendConfirmSelect {
  classId: 85;
  methodId: 10;
  args: WithNowait<t.ConfirmSelectArgs>;
}

export interface SendConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: t.ConfirmSelectOkArgs;
}

export interface BasicHeader {
  classId: 60;
  props: t.BasicProperties;
  size: number;
}

export interface ConnectionHeader {
  classId: 10;
  props: t.ConnectionProperties;
  size: number;
}

export interface ChannelHeader {
  classId: 20;
  props: t.ChannelProperties;
  size: number;
}

export interface AccessHeader {
  classId: 30;
  props: t.AccessProperties;
  size: number;
}

export interface ExchangeHeader {
  classId: 40;
  props: t.ExchangeProperties;
  size: number;
}

export interface QueueHeader {
  classId: 50;
  props: t.QueueProperties;
  size: number;
}

export interface TxHeader {
  classId: 90;
  props: t.TxProperties;
  size: number;
}

export interface ConfirmHeader {
  classId: 85;
  props: t.ConfirmProperties;
  size: number;
}

export type ReceiveMethod =
  | ReceiveBasicQos
  | ReceiveBasicQosOk
  | ReceiveBasicConsume
  | ReceiveBasicConsumeOk
  | ReceiveBasicCancel
  | ReceiveBasicCancelOk
  | ReceiveBasicPublish
  | ReceiveBasicReturn
  | ReceiveBasicDeliver
  | ReceiveBasicGet
  | ReceiveBasicGetOk
  | ReceiveBasicGetEmpty
  | ReceiveBasicAck
  | ReceiveBasicReject
  | ReceiveBasicRecoverAsync
  | ReceiveBasicRecover
  | ReceiveBasicRecoverOk
  | ReceiveBasicNack
  | ReceiveConnectionStart
  | ReceiveConnectionStartOk
  | ReceiveConnectionSecure
  | ReceiveConnectionSecureOk
  | ReceiveConnectionTune
  | ReceiveConnectionTuneOk
  | ReceiveConnectionOpen
  | ReceiveConnectionOpenOk
  | ReceiveConnectionClose
  | ReceiveConnectionCloseOk
  | ReceiveConnectionBlocked
  | ReceiveConnectionUnblocked
  | ReceiveConnectionUpdateSecret
  | ReceiveConnectionUpdateSecretOk
  | ReceiveChannelOpen
  | ReceiveChannelOpenOk
  | ReceiveChannelFlow
  | ReceiveChannelFlowOk
  | ReceiveChannelClose
  | ReceiveChannelCloseOk
  | ReceiveAccessRequest
  | ReceiveAccessRequestOk
  | ReceiveExchangeDeclare
  | ReceiveExchangeDeclareOk
  | ReceiveExchangeDelete
  | ReceiveExchangeDeleteOk
  | ReceiveExchangeBind
  | ReceiveExchangeBindOk
  | ReceiveExchangeUnbind
  | ReceiveExchangeUnbindOk
  | ReceiveQueueDeclare
  | ReceiveQueueDeclareOk
  | ReceiveQueueBind
  | ReceiveQueueBindOk
  | ReceiveQueuePurge
  | ReceiveQueuePurgeOk
  | ReceiveQueueDelete
  | ReceiveQueueDeleteOk
  | ReceiveQueueUnbind
  | ReceiveQueueUnbindOk
  | ReceiveTxSelect
  | ReceiveTxSelectOk
  | ReceiveTxCommit
  | ReceiveTxCommitOk
  | ReceiveTxRollback
  | ReceiveTxRollbackOk
  | ReceiveConfirmSelect
  | ReceiveConfirmSelectOk;
export type SendMethod =
  | SendBasicQos
  | SendBasicQosOk
  | SendBasicConsume
  | SendBasicConsumeOk
  | SendBasicCancel
  | SendBasicCancelOk
  | SendBasicPublish
  | SendBasicReturn
  | SendBasicDeliver
  | SendBasicGet
  | SendBasicGetOk
  | SendBasicGetEmpty
  | SendBasicAck
  | SendBasicReject
  | SendBasicRecoverAsync
  | SendBasicRecover
  | SendBasicRecoverOk
  | SendBasicNack
  | SendConnectionStart
  | SendConnectionStartOk
  | SendConnectionSecure
  | SendConnectionSecureOk
  | SendConnectionTune
  | SendConnectionTuneOk
  | SendConnectionOpen
  | SendConnectionOpenOk
  | SendConnectionClose
  | SendConnectionCloseOk
  | SendConnectionBlocked
  | SendConnectionUnblocked
  | SendConnectionUpdateSecret
  | SendConnectionUpdateSecretOk
  | SendChannelOpen
  | SendChannelOpenOk
  | SendChannelFlow
  | SendChannelFlowOk
  | SendChannelClose
  | SendChannelCloseOk
  | SendAccessRequest
  | SendAccessRequestOk
  | SendExchangeDeclare
  | SendExchangeDeclareOk
  | SendExchangeDelete
  | SendExchangeDeleteOk
  | SendExchangeBind
  | SendExchangeBindOk
  | SendExchangeUnbind
  | SendExchangeUnbindOk
  | SendQueueDeclare
  | SendQueueDeclareOk
  | SendQueueBind
  | SendQueueBindOk
  | SendQueuePurge
  | SendQueuePurgeOk
  | SendQueueDelete
  | SendQueueDeleteOk
  | SendQueueUnbind
  | SendQueueUnbindOk
  | SendTxSelect
  | SendTxSelectOk
  | SendTxCommit
  | SendTxCommitOk
  | SendTxRollback
  | SendTxRollbackOk
  | SendConfirmSelect
  | SendConfirmSelectOk;
export type Header =
  | BasicHeader
  | ConnectionHeader
  | ChannelHeader
  | AccessHeader
  | ExchangeHeader
  | QueueHeader
  | TxHeader
  | ConfirmHeader;

export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  const methodId = decoder.read("uint16");
  switch (classId) {
    case 60: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              prefetchSize: decoder.read("uint32"),
              prefetchCount: decoder.read("uint16"),
              global: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              consumerTag: decoder.read("shortstr"),
              noLocal: decoder.read("bit"),
              noAck: decoder.read("bit"),
              exclusive: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
            },
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              mandatory: decoder.read("bit"),
              immediate: decoder.read("bit"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
            },
          };

        case 60:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
              deliveryTag: decoder.read("uint64"),
              redelivered: decoder.read("bit"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
            },
          };

        case 70:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              noAck: decoder.read("bit"),
            },
          };

        case 71:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              redelivered: decoder.read("bit"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              messageCount: decoder.read("uint32"),
            },
          };

        case 72:
          return {
            classId,
            methodId,
            args: {
              clusterId: decoder.read("shortstr"),
            },
          };

        case 80:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              multiple: decoder.read("bit"),
            },
          };

        case 90:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              requeue: decoder.read("bit"),
            },
          };

        case 100:
          return {
            classId,
            methodId,
            args: {
              requeue: decoder.read("bit"),
            },
          };

        case 110:
          return {
            classId,
            methodId,
            args: {
              requeue: decoder.read("bit"),
            },
          };

        case 111:
          return {
            classId,
            methodId,
            args: {},
          };

        case 120:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              multiple: decoder.read("bit"),
              requeue: decoder.read("bit"),
            },
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'basic'");
      }
    }

    case 10: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              versionMajor: decoder.read("uint8"),
              versionMinor: decoder.read("uint8"),
              serverProperties: decoder.read("table"),
              mechanisms: decoder.read("longstr"),
              locales: decoder.read("longstr"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              clientProperties: decoder.read("table"),
              mechanism: decoder.read("shortstr"),
              response: decoder.read("longstr"),
              locale: decoder.read("shortstr"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              challenge: decoder.read("longstr"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              response: decoder.read("longstr"),
            },
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              channelMax: decoder.read("uint16"),
              frameMax: decoder.read("uint32"),
              heartbeat: decoder.read("uint16"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              channelMax: decoder.read("uint16"),
              frameMax: decoder.read("uint32"),
              heartbeat: decoder.read("uint16"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              virtualHost: decoder.read("shortstr"),
              capabilities: decoder.read("shortstr"),
              insist: decoder.read("bit"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {
              knownHosts: decoder.read("shortstr"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              classId: decoder.read("uint16"),
              methodId: decoder.read("uint16"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };

        case 60:
          return {
            classId,
            methodId,
            args: {
              reason: decoder.read("shortstr"),
            },
          };

        case 61:
          return {
            classId,
            methodId,
            args: {},
          };

        case 70:
          return {
            classId,
            methodId,
            args: {
              newSecret: decoder.read("longstr"),
              reason: decoder.read("shortstr"),
            },
          };

        case 71:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'connection'",
          );
      }
    }

    case 20: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              outOfBand: decoder.read("shortstr"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              channelId: decoder.read("longstr"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              active: decoder.read("bit"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              active: decoder.read("bit"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              classId: decoder.read("uint16"),
              methodId: decoder.read("uint16"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'channel'",
          );
      }
    }

    case 30: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              realm: decoder.read("shortstr"),
              exclusive: decoder.read("bit"),
              passive: decoder.read("bit"),
              active: decoder.read("bit"),
              write: decoder.read("bit"),
              read: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
            },
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'access'");
      }
    }

    case 40: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              type: decoder.read("shortstr"),
              passive: decoder.read("bit"),
              durable: decoder.read("bit"),
              autoDelete: decoder.read("bit"),
              internal: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              ifUnused: decoder.read("bit"),
              nowait: decoder.read("bit"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              destination: decoder.read("shortstr"),
              source: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {},
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              destination: decoder.read("shortstr"),
              source: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'exchange'",
          );
      }
    }

    case 50: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              passive: decoder.read("bit"),
              durable: decoder.read("bit"),
              exclusive: decoder.read("bit"),
              autoDelete: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              queue: decoder.read("shortstr"),
              messageCount: decoder.read("uint32"),
              consumerCount: decoder.read("uint32"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              messageCount: decoder.read("uint32"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              ifUnused: decoder.read("bit"),
              ifEmpty: decoder.read("bit"),
              nowait: decoder.read("bit"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {
              messageCount: decoder.read("uint32"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              arguments: decoder.read("table"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'queue'");
      }
    }

    case 90: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {},
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {},
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {},
          };

        case 31:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'tx'");
      }
    }

    case 85: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              nowait: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'confirm'",
          );
      }
    }

    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeMethod(method: SendMethod): Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", method.classId);
  encoder.write("uint16", method.methodId);
  switch (method.classId) {
    case 60: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint32",
            method.args.prefetchSize !== undefined
              ? method.args.prefetchSize
              : 0,
          );
          encoder.write(
            "uint16",
            method.args.prefetchCount !== undefined
              ? method.args.prefetchCount
              : 0,
          );
          encoder.write(
            "bit",
            method.args.global !== undefined ? method.args.global : false,
          );
          break;

        case 11:
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "shortstr",
            method.args.consumerTag !== undefined
              ? method.args.consumerTag
              : "",
          );
          encoder.write(
            "bit",
            method.args.noLocal !== undefined ? method.args.noLocal : false,
          );
          encoder.write(
            "bit",
            method.args.noAck !== undefined ? method.args.noAck : false,
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 21:
          encoder.write("shortstr", method.args.consumerTag);
          break;

        case 30:
          encoder.write("shortstr", method.args.consumerTag);
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 31:
          encoder.write("shortstr", method.args.consumerTag);
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.exchange !== undefined ? method.args.exchange : "",
          );
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.mandatory !== undefined ? method.args.mandatory : false,
          );
          encoder.write(
            "bit",
            method.args.immediate !== undefined ? method.args.immediate : false,
          );
          break;

        case 50:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          break;

        case 60:
          encoder.write("shortstr", method.args.consumerTag);
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.redelivered !== undefined
              ? method.args.redelivered
              : false,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          break;

        case 70:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.noAck !== undefined ? method.args.noAck : false,
          );
          break;

        case 71:
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.redelivered !== undefined
              ? method.args.redelivered
              : false,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          encoder.write("uint32", method.args.messageCount);
          break;

        case 72:
          encoder.write(
            "shortstr",
            method.args.clusterId !== undefined ? method.args.clusterId : "",
          );
          break;

        case 80:
          encoder.write(
            "uint64",
            method.args.deliveryTag !== undefined ? method.args.deliveryTag : 0,
          );
          encoder.write(
            "bit",
            method.args.multiple !== undefined ? method.args.multiple : false,
          );
          break;

        case 90:
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : true,
          );
          break;

        case 100:
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : false,
          );
          break;

        case 110:
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : false,
          );
          break;

        case 111:
          break;

        case 120:
          encoder.write(
            "uint64",
            method.args.deliveryTag !== undefined ? method.args.deliveryTag : 0,
          );
          encoder.write(
            "bit",
            method.args.multiple !== undefined ? method.args.multiple : false,
          );
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : true,
          );
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'basic'",
          );
      }
      break;
    }

    case 10: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint8",
            method.args.versionMajor !== undefined
              ? method.args.versionMajor
              : 0,
          );
          encoder.write(
            "uint8",
            method.args.versionMinor !== undefined
              ? method.args.versionMinor
              : 9,
          );
          encoder.write("table", method.args.serverProperties);
          encoder.write(
            "longstr",
            method.args.mechanisms !== undefined
              ? method.args.mechanisms
              : "PLAIN",
          );
          encoder.write(
            "longstr",
            method.args.locales !== undefined ? method.args.locales : "en_US",
          );
          break;

        case 11:
          encoder.write("table", method.args.clientProperties);
          encoder.write(
            "shortstr",
            method.args.mechanism !== undefined
              ? method.args.mechanism
              : "PLAIN",
          );
          encoder.write("longstr", method.args.response);
          encoder.write(
            "shortstr",
            method.args.locale !== undefined ? method.args.locale : "en_US",
          );
          break;

        case 20:
          encoder.write("longstr", method.args.challenge);
          break;

        case 21:
          encoder.write("longstr", method.args.response);
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.channelMax !== undefined ? method.args.channelMax : 0,
          );
          encoder.write(
            "uint32",
            method.args.frameMax !== undefined ? method.args.frameMax : 0,
          );
          encoder.write(
            "uint16",
            method.args.heartbeat !== undefined ? method.args.heartbeat : 0,
          );
          break;

        case 31:
          encoder.write(
            "uint16",
            method.args.channelMax !== undefined ? method.args.channelMax : 0,
          );
          encoder.write(
            "uint32",
            method.args.frameMax !== undefined ? method.args.frameMax : 0,
          );
          encoder.write(
            "uint16",
            method.args.heartbeat !== undefined ? method.args.heartbeat : 0,
          );
          break;

        case 40:
          encoder.write(
            "shortstr",
            method.args.virtualHost !== undefined
              ? method.args.virtualHost
              : "/",
          );
          encoder.write(
            "shortstr",
            method.args.capabilities !== undefined
              ? method.args.capabilities
              : "",
          );
          encoder.write(
            "bit",
            method.args.insist !== undefined ? method.args.insist : false,
          );
          break;

        case 41:
          encoder.write(
            "shortstr",
            method.args.knownHosts !== undefined ? method.args.knownHosts : "",
          );
          break;

        case 50:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("uint16", method.args.classId);
          encoder.write("uint16", method.args.methodId);
          break;

        case 51:
          break;

        case 60:
          encoder.write(
            "shortstr",
            method.args.reason !== undefined ? method.args.reason : "",
          );
          break;

        case 61:
          break;

        case 70:
          encoder.write("longstr", method.args.newSecret);
          encoder.write("shortstr", method.args.reason);
          break;

        case 71:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'connection'",
          );
      }
      break;
    }

    case 20: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "shortstr",
            method.args.outOfBand !== undefined ? method.args.outOfBand : "",
          );
          break;

        case 11:
          encoder.write(
            "longstr",
            method.args.channelId !== undefined ? method.args.channelId : "",
          );
          break;

        case 20:
          encoder.write("bit", method.args.active);
          break;

        case 21:
          encoder.write("bit", method.args.active);
          break;

        case 40:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("uint16", method.args.classId);
          encoder.write("uint16", method.args.methodId);
          break;

        case 41:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'channel'",
          );
      }
      break;
    }

    case 30: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "shortstr",
            method.args.realm !== undefined ? method.args.realm : "/data",
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : true,
          );
          encoder.write(
            "bit",
            method.args.active !== undefined ? method.args.active : true,
          );
          encoder.write(
            "bit",
            method.args.write !== undefined ? method.args.write : true,
          );
          encoder.write(
            "bit",
            method.args.read !== undefined ? method.args.read : true,
          );
          break;

        case 11:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 1,
          );
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'access'",
          );
      }
      break;
    }

    case 40: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.type !== undefined ? method.args.type : "direct",
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : false,
          );
          encoder.write(
            "bit",
            method.args.durable !== undefined ? method.args.durable : false,
          );
          encoder.write(
            "bit",
            method.args.autoDelete !== undefined
              ? method.args.autoDelete
              : false,
          );
          encoder.write(
            "bit",
            method.args.internal !== undefined ? method.args.internal : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 11:
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "bit",
            method.args.ifUnused !== undefined ? method.args.ifUnused : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 21:
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.destination);
          encoder.write("shortstr", method.args.source);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 31:
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.destination);
          encoder.write("shortstr", method.args.source);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 51:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'exchange'",
          );
      }
      break;
    }

    case 50: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : false,
          );
          encoder.write(
            "bit",
            method.args.durable !== undefined ? method.args.durable : false,
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.autoDelete !== undefined
              ? method.args.autoDelete
              : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 11:
          encoder.write("shortstr", method.args.queue);
          encoder.write("uint32", method.args.messageCount);
          encoder.write("uint32", method.args.consumerCount);
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 21:
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 31:
          encoder.write("uint32", method.args.messageCount);
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.ifUnused !== undefined ? method.args.ifUnused : false,
          );
          encoder.write(
            "bit",
            method.args.ifEmpty !== undefined ? method.args.ifEmpty : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 41:
          encoder.write("uint32", method.args.messageCount);
          break;

        case 50:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 51:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'queue'",
          );
      }
      break;
    }

    case 90: {
      switch (method.methodId) {
        case 10:
          break;

        case 11:
          break;

        case 20:
          break;

        case 21:
          break;

        case 30:
          break;

        case 31:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'tx'",
          );
      }
      break;
    }

    case 85: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 11:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'confirm'",
          );
      }
      break;
    }

    default:
      throw new Error("Unknown class " + (method as any).classId);
  }
  return encoder.result();
}

export function decodeHeader(data: Uint8Array): Header {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  // weight unused
  decoder.read("uint16");
  const size = decoder.read("uint64");
  const flags = decoder.read("flags");
  switch (classId) {
    case 60:
      return {
        classId,
        size,
        props: {
          contentType: flags[0] ? decoder.read("shortstr") : undefined,
          contentEncoding: flags[1] ? decoder.read("shortstr") : undefined,
          headers: flags[2] ? decoder.read("table") : undefined,
          deliveryMode: flags[3] ? decoder.read("uint8") : undefined,
          priority: flags[4] ? decoder.read("uint8") : undefined,
          correlationId: flags[5] ? decoder.read("shortstr") : undefined,
          replyTo: flags[6] ? decoder.read("shortstr") : undefined,
          expiration: flags[7] ? decoder.read("shortstr") : undefined,
          messageId: flags[8] ? decoder.read("shortstr") : undefined,
          timestamp: flags[9] ? decoder.read("uint64") : undefined,
          type: flags[10] ? decoder.read("shortstr") : undefined,
          userId: flags[11] ? decoder.read("shortstr") : undefined,
          appId: flags[12] ? decoder.read("shortstr") : undefined,
          clusterId: flags[13] ? decoder.read("shortstr") : undefined,
        },
      };
    case 10:
      return {
        classId,
        size,
        props: {},
      };
    case 20:
      return {
        classId,
        size,
        props: {},
      };
    case 30:
      return {
        classId,
        size,
        props: {},
      };
    case 40:
      return {
        classId,
        size,
        props: {},
      };
    case 50:
      return {
        classId,
        size,
        props: {},
      };
    case 90:
      return {
        classId,
        size,
        props: {},
      };
    case 85:
      return {
        classId,
        size,
        props: {},
      };
    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeHeader(header: Header): Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", header.classId);
  encoder.write("uint16", 0);
  encoder.write("uint64", header.size);
  switch (header.classId) {
    case 60:
      encoder.write("flags", [
        header.props.contentType !== undefined,
        header.props.contentEncoding !== undefined,
        header.props.headers !== undefined,
        header.props.deliveryMode !== undefined,
        header.props.priority !== undefined,
        header.props.correlationId !== undefined,
        header.props.replyTo !== undefined,
        header.props.expiration !== undefined,
        header.props.messageId !== undefined,
        header.props.timestamp !== undefined,
        header.props.type !== undefined,
        header.props.userId !== undefined,
        header.props.appId !== undefined,
        header.props.clusterId !== undefined,
      ]);

      if (header.props.contentType !== undefined) {
        encoder.write("shortstr", header.props.contentType);
      }

      if (header.props.contentEncoding !== undefined) {
        encoder.write("shortstr", header.props.contentEncoding);
      }

      if (header.props.headers !== undefined) {
        encoder.write("table", header.props.headers);
      }

      if (header.props.deliveryMode !== undefined) {
        encoder.write("uint8", header.props.deliveryMode);
      }

      if (header.props.priority !== undefined) {
        encoder.write("uint8", header.props.priority);
      }

      if (header.props.correlationId !== undefined) {
        encoder.write("shortstr", header.props.correlationId);
      }

      if (header.props.replyTo !== undefined) {
        encoder.write("shortstr", header.props.replyTo);
      }

      if (header.props.expiration !== undefined) {
        encoder.write("shortstr", header.props.expiration);
      }

      if (header.props.messageId !== undefined) {
        encoder.write("shortstr", header.props.messageId);
      }

      if (header.props.timestamp !== undefined) {
        encoder.write("uint64", header.props.timestamp);
      }

      if (header.props.type !== undefined) {
        encoder.write("shortstr", header.props.type);
      }

      if (header.props.userId !== undefined) {
        encoder.write("shortstr", header.props.userId);
      }

      if (header.props.appId !== undefined) {
        encoder.write("shortstr", header.props.appId);
      }

      if (header.props.clusterId !== undefined) {
        encoder.write("shortstr", header.props.clusterId);
      }

      break;
    case 10:
      encoder.write("flags", []);

      break;
    case 20:
      encoder.write("flags", []);

      break;
    case 30:
      encoder.write("flags", []);

      break;
    case 40:
      encoder.write("flags", []);

      break;
    case 50:
      encoder.write("flags", []);

      break;
    case 90:
      encoder.write("flags", []);

      break;
    case 85:
      encoder.write("flags", []);

      break;
    default:
      throw new Error("Unknown class " + (header as any).classId);
  }

  return encoder.result();
}
