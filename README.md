# @langpavel/amqp

This is a fork of the [`nashaddams/amqp`](https://github.com/nashaddams/amqp) at
[this commit](https://github.com/nashaddams/amqp/commit/b71a69e0fbf7def434f7bc914b4ed6b0b3bef813)
AMQP 0.9.1 implementation, which is fork of
[`lenkan/deno-amqp`](https://github.com/lenkan/deno-amqp) AMQP 0.9.1
implementation.

[![JSR](https://jsr.io/badges/@langpavel/amqp)](https://jsr.io/@langpavel/amqp)
[![main](https://github.com/langpavel/amqp/actions/workflows/tests.yml/badge.svg)](https://github.com/langpavel/amqp/actions)

## Usage

### Consuming messages

```ts
import { connect } from "jsr:@langpavel/amqp";

const connection = await connect({
  hostname: "127.0.0.1",
  port: 5672,
});
const channel = await connection.openChannel();

const queueName = "my.queue";
await channel.declareQueue({ queue: queueName });
await channel.consume(
  { queue: queueName },
  async (args, props, data) => {
    console.log(JSON.stringify(args));
    console.log(JSON.stringify(props));
    console.log(new TextDecoder().decode(data));
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);
```

### Publishing messages

```ts
import { connect } from "jsr:@langpavel/amqp";

const connection = await connect({
  hostname: "127.0.0.1",
  port: 5672,
});
const channel = await connection.openChannel();

const queueName = "my.queue";
await channel.declareQueue({ queue: queueName });
await channel.publish(
  { routingKey: queueName },
  { contentType: "application/json" },
  new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
);

await connection.close();
```

### TLS

```ts
import { connect } from "jsr:@langpavel/amqp";

const connection = await connect({
  hostname: "127.0.0.1",
  port: 5671,
  key: "...",
  cert: "...",
  caCerts: ["..."],
});

// ...
```

## Testing

```sh
podman run -d --rm \
  -p 15672:15672 \
  -p 5671:5671 \
  -p 5672:5672 \
  -v ./test/conf/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
  -v ./test/conf/enabled_plugins:/etc/rabbitmq/enabled_plugins \
  -v ./test/cert/ca_certificate.pem:/etc/ssl/certs/rabbitmq/ca_certificate.pem \
  -v ./test/cert/server_guest_certificate.pem:/etc/ssl/certs/rabbitmq/server_guest_certificate.pem \
  -v ./test/cert/server_guest_key.pem:/etc/ssl/certs/rabbitmq/server_guest_key.pem \
  rabbitmq:4-management

deno task test
deno task test:mod
```

### Generating certificates

The certificates are generated with
[`tls-gen`](https://github.com/rabbitmq/tls-gen):

```sh
git clone https://github.com/rabbitmq/tls-gen.git
cd basic
make CN=guest

result/ca_certificate.pem
result/client_guest_certificate.pem
result/client_guest_key.pem
result/server_guest_certificate.pem
result/server_guest_key.pem
```

## Acknowledgments

Thanks to [@nashaddams](https://github.com/nashaddams) for maintaining
[`amqp`](https://github.com/nashaddams/amqp).

Thanks to [@lenkan](https://github.com/lenkan) for creating
[`deno-amqp`](https://github.com/lenkan/deno-amqp).
