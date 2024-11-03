import {
  type AmqpConnection,
  type AmqpConnectOptions,
  connect,
} from "../mod.ts";

export interface Queue {
  name: string;
}

export interface Exchange {
  name: string;
}

const url = `http://guest:guest@localhost:15672/api`;

async function handleResponse(r: Response) {
  if (r.status === 404) {
    await r.json();
    return null;
  }

  if (!r.ok) {
    await r.text();
    throw new Error(`${r.url} ${r.status} ${r.statusText}`);
  }

  return await r.json();
}

export function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function listQueues(): Promise<Queue[]> {
  const r = await fetch(`${url}/queues/%2F`);
  return handleResponse(r);
}

export async function getQueue(name: string): Promise<Queue | null> {
  const res = await fetch(`${url}/queues/%2F/${name}`);
  return handleResponse(res);
}

export async function getQueueBindings(name: string) {
  const res = await fetch(`${url}/queues/%2F/${name}/bindings`);
  return handleResponse(res);
}

export async function getExchange(name: string): Promise<Exchange | null> {
  const res = await fetch(`${url}/exchanges/%2F/${name}`);
  return handleResponse(res);
}

export async function getExchangeBindings(name: string) {
  const res = await fetch(`${url}/exchanges/%2F/${name}/bindings/source`);
  return handleResponse(res);
}

export interface AmqpConnectionTest {
  (conn: AmqpConnection): Promise<void>;
}

function tryCheckEnv(name: string) {
  try {
    return !!Deno.env.get(name);
  } catch (_e) {
    // do nothing
  }
}

export function withConnection(
  tester: AmqpConnectionTest,
  options?: Partial<AmqpConnectOptions>,
): () => Promise<void> {
  return async () => {
    const connection = await connect({
      hostname: "127.0.0.1",
      port: 5672,
      heartbeatInterval: 0,
      loglevel: tryCheckEnv("DEBUG") ? "debug" : "none",
      ...options,
    });

    try {
      await tester(connection);
    } finally {
      await connection.close();
    }
  };
}

// Has to be run with the --unsafely-ignore-certificate-errors=127.0.0.1
// flag to circumvent the hostname verification.
// Revisit after https://github.com/denoland/deno/issues/26190 has been addressed.
export function withConnectionTls(
  tester: AmqpConnectionTest,
  options?: Partial<AmqpConnectOptions>,
): () => Promise<void> {
  return async () => {
    const connection = await connect({
      hostname: "127.0.0.1",
      port: 5671,
      key: Deno.readTextFileSync("test/cert/client_guest_key.pem"),
      cert: Deno.readTextFileSync("test/cert/client_guest_certificate.pem"),
      caCerts: [Deno.readTextFileSync("test/cert/ca_certificate.pem")],
      heartbeatInterval: 0,
      loglevel: tryCheckEnv("DEBUG") ? "debug" : "none",
      mechanism: "EXTERNAL",
      ...options,
    });

    try {
      await tester(connection);
    } finally {
      await connection.close();
    }
  };
}
