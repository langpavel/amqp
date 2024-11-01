# amqp

This is a fork of the fantastic
[`deno-amqp`](https://github.com/lenkan/deno-amqp) AMQP 0.9.1 implementation.

[![JSR](https://jsr.io/badges/@nashaddams/amqp)](https://jsr.io/@nashaddams/amqp)
[![main](https://github.com/nashaddams/amqp/actions/workflows/tests.yml/badge.svg)](https://github.com/nashaddams/amqp/actions)

## Usage

### Consuming messages

```ts
import { connect } from "jsr:@nashaddams/amqp";

const connection = await connect();
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
import { connect } from "jsr:@nashaddams/amqp";

const connection = await connect();
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

## Testing

```sh
podman run -d --rm \
  -p 15672:15672 \
  -p 5671:5671 \
  -p 5672:5672 \
  -v ./test/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf \
  -v ./test/cert/ca_certificate.pem:/etc/ssl/certs/rabbitmq/ca_certificate.pem \
  -v ./test/cert/server_certificate.pem:/etc/ssl/certs/rabbitmq/server_certificate.pem \
  -v ./test/cert/server_key.pem:/etc/ssl/certs/rabbitmq/server_key.pem \
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
make
make alias-leaf-artifacts

result/ca_certificate.pem
result/client_certificate.pem
result/client_key.pem
result/server_certificate.pem
result/server_key.pem
```

## Acknowledgments

Thanks to [@lenkan](https://github.com/lenkan) for creating
[`deno-amqp`](https://github.com/lenkan/deno-amqp).
