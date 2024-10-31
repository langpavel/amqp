# amqp

This is a fork of the fantastic
[`deno-amqp`](https://github.com/lenkan/deno-amqp) AMQP 0.9.1 implementation.

[![JSR](https://jsr.io/badges/@nashaddams/amqp)](https://jsr.io/@nashaddams/amqp)

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
podman run -d --rm -p 15672:15672 -p 5672:5672 rabbitmq:4-management # or
docker run -d --rm -p 15672:15672 -p 5672:5672 rabbitmq:4-management

deno task test
deno task test:mod
```

## Acknowledgments

Thanks to [@lenkan](https://github.com/lenkan) for creating
[`deno-amqp`](https://github.com/lenkan/deno-amqp).
