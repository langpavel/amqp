import { assertRejects } from "../deps_dev.ts";
import { connect } from "../mod.ts";

Deno.test("connect", async () => {
  const conn = await connect({
    hostname: "127.0.0.1",
    port: 5672,
    username: "guest",
    password: "guest",
  });
  await conn.close();
});

Deno.test("connect - invalid username/password", async () => {
  await assertRejects(
    async () => {
      await connect({
        hostname: "127.0.0.1",
        port: 5672,
        username: "invaliduser",
        password: "somepass",
      });
    },
    Error,
    "EOF",
  );
  await Promise.resolve();
});

Deno.test("connect - wrong port", async () => {
  await assertRejects(
    async () => {
      await connect({
        hostname: "127.0.0.1",
        port: 5673,
        username: "guest",
        password: "guest",
      });
    },
    Deno.errors.ConnectionRefused,
  );
});

// Has to be run with the --unsafely-ignore-certificate-errors=127.0.0.1
// flag to circumvent the hostname verification.
// Revisit after https://github.com/denoland/deno/issues/26190 has been addressed.
Deno.test("connect - tls", async () => {
  const conn = await connect(
    {
      hostname: "127.0.0.1",
      port: 5671,
      key: Deno.readTextFileSync("test/cert/client_guest_key.pem"),
      cert: Deno.readTextFileSync("test/cert/client_guest_certificate.pem"),
      caCerts: [Deno.readTextFileSync("test/cert/ca_certificate.pem")],
    },
  );
  await conn.close();
});
