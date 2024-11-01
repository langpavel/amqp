import { AmqpConnection } from "./amqp_connection.ts";
import { AmqpSocket } from "./amqp_socket.ts";
import {
  type AmqpConnectOptions,
  type AmqpConnectTlsOptions,
  parseOptions,
} from "./amqp_connect_options.ts";

export type { AmqpConnectOptions };

export async function connect(): Promise<AmqpConnection>;
export async function connect(
  options?: AmqpConnectOptions,
  tlsOptions?: AmqpConnectTlsOptions,
): Promise<AmqpConnection>;
export async function connect(
  uri?: string,
  tlsOptions?: AmqpConnectTlsOptions,
): Promise<AmqpConnection>;
export async function connect(
  optionsOrUrl?: AmqpConnectOptions | string,
  tlsOptions?: AmqpConnectTlsOptions,
): Promise<AmqpConnection> {
  const {
    hostname = Deno.env.get("AMQP_HOSTNAME") || "localhost",
    port = Number(Deno.env.get("AMQP_PORT")) || 5672,
    username = Deno.env.get("AMQP_USERNAME") || "guest",
    password = Deno.env.get("AMQP_PASSWORD") || "guest",
    vhost = Deno.env.get("AMQP_VHOST") || "/",
    heartbeatInterval = undefined,
    frameMax = undefined,
    loglevel = "none",
  } = parseOptions(optionsOrUrl);

  const conn = tlsOptions
    ? await Deno.connectTls({ port, hostname, ...tlsOptions })
    : await Deno.connect({ port, hostname });
  const socket = new AmqpSocket(conn);

  const connection = new AmqpConnection(socket, {
    username,
    password,
    heartbeatInterval,
    frameMax,
    loglevel,
    vhost,
  });

  await connection.open();

  return connection;
}
