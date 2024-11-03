import { connect } from "../src/amqp_connect.ts";

Deno.test("should not crash when sending large content frames concurrently", async () => {
  const conn = await connect({
    hostname: "127.0.0.1",
    port: 5672,
    heartbeatInterval: 0,
    frameMax: 4096,
  });
  const message = new TextEncoder().encode("a".repeat(100000));

  try {
    const channel1 = await conn.openChannel();
    const routingKey = `tmp_${crypto.randomUUID()}`;

    for (const _ of Array.from({ length: 10 })) {
      await Promise.all(
        Array.from({ length: 100 }).map(() =>
          channel1.publish({ routingKey }, {}, message)
        ),
      );
    }
  } finally {
    await conn.close();
    await conn.closed();
  }
});
