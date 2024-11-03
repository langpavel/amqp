import { AmqpConnection } from "./amqp_connection.ts";
import { AmqpSocket } from "./amqp_socket.ts";

/**
 * Options for the connection to an AMQP broker.
 */
export interface AmqpConnectOptions
  extends Deno.ConnectTlsOptions, Partial<Deno.TlsCertifiedKeyPem> {
  /**
   * Username for authenticating towards the AMQP broker. Defaults to 'guest'.
   */
  username?: string;

  /**
   * Password for authenticating towards the AMQP broker. Defaults to 'guest'.
   */
  password?: string;

  /**
   * AMQP virtual host. Defaults to "/"
   */
  vhost?: string;

  /**
   * Interval in seconds for the AMQP heartbeat frames. If not provided, the suggested heartbeat interval from
   * the AMQP broker will be used (usually 60s).
   *
   * If explicitly set to 0, heartbeat frames will be disabled.
   */
  heartbeatInterval?: number;

  /**
   * Sets the maximum frame size in number of bytes.
   *
   * This is negotiated with the broker during the connection handshake.
   */
  frameMax?: number;

  /**
   * SASL authentication mechanism.
   *
   * Use "EXTERNAL" to authenticate client connections using X.509 certificates.
   */
  mechanism?: "PLAIN" | "EXTERNAL";

  /**
   * **UNSTABLE**
   * Controls the log level. Currently setting it to 'debug' will print received and sent frames on byte level.
   *
   * This should eventually be able to turn logging on and off on different levels such as framing/methods/connection.
   */
  loglevel?: "debug" | "none";
}

/**
 * Create and open an AMQP connection.
 *
 * @param {AmqpConnectOptions} options
 * @returns {Promise<AmqpConnection>}
 *
 * **Connect**
 * ```ts
 * const connection = await connect({
 *   hostname: "127.0.0.1",
 *   port: 5672,
 * });
 * ```
 *
 * **Connect TLS**
 * ```ts
 * const tlsConn = await connect({
 *   hostname: "127.0.0.1",
 *   port: 5671,
 *   key: "...",
 *   cert: "...",
 *   caCerts: ["..."],
 * });
 * ```
 */
export async function connect(
  options?: AmqpConnectOptions,
): Promise<AmqpConnection> {
  const tls = options?.key || options?.cert || options?.caCerts;
  const {
    // Transport options
    hostname = "127.0.0.1",
    port = tls ? 5671 : 5672,
    key = undefined,
    cert = undefined,
    caCerts = undefined,
    // AMQP options
    username = "guest",
    password = "guest",
    vhost = "/",
    heartbeatInterval = undefined,
    frameMax = undefined,
    mechanism = tls ? "EXTERNAL" : "PLAIN",
    // Other options
    loglevel = "none",
  } = options || {};

  const conn = new AmqpConnection(
    new AmqpSocket(
      tls
        ? await Deno.connectTls({ hostname, port, key, cert, caCerts })
        : await Deno.connect({ hostname, port }),
    ),
    {
      username,
      password,
      vhost,
      heartbeatInterval,
      frameMax,
      mechanism,
      loglevel,
    },
  );

  await conn.open();

  return conn;
}
