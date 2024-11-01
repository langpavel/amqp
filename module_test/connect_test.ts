import { assertRejects } from "../deps_dev.ts";
import { connect } from "../mod.ts";

Deno.test(
  "connect url",
  async () => {
    const conn = await connect("amqp://guest:guest@127.0.0.1:5672");
    await conn.close();
  },
);

Deno.test(
  "connect url - missing port",
  async () => {
    const conn = await connect("amqp://guest:guest@127.0.0.1");
    await conn.close();
  },
);

Deno.test(
  "connect url - invalid username/password",
  async () => {
    await assertRejects(
      async () => {
        await connect("amqp://invaliduser:somepass@127.0.0.1:5672");
      },
      Error,
      "EOF",
    );
    await Promise.resolve();
  },
);

Deno.test(
  "connect url - wrong port",
  async () => {
    await assertRejects(
      async () => {
        await connect("amqp://guest:guest@127.0.0.1:5673");
      },
      Deno.errors.ConnectionRefused,
    );
  },
);

// Has to be run with the --unsafely-ignore-certificate-errors=127.0.0.1
// flag to circumvent the hostname verification.
// Revisit after https://github.com/denoland/deno/issues/26190 has been addressed.
Deno.test(
  "connect tls",
  async () => {
    const conn = await connect("amqps://127.0.0.1:5671", {
      key: Deno.readTextFileSync("test/cert/client_key.pem"),
      cert: Deno.readTextFileSync("test/cert/client_certificate.pem"),
      caCerts: [Deno.readTextFileSync("test/cert/ca_certificate.pem")],
    });
    await conn.close();
  },
);
