import { parse } from "../deps_dev.ts";
import type { Spec } from "./amqp_spec.ts";

export interface SpecWithDocs {
  amqp: {
    constant: { name: string; doc?: string }[];
    domain: { name: string; doc?: string }[];
    class: {
      name: string;
      doc: string | [];
      method: {
        name: string;
        doc: string;
        field?: { name: string; doc?: string }[];
      }[];
    }[];
  };
}

const specCodegenUrl =
  "https://raw.githubusercontent.com/rabbitmq/rabbitmq-server/refs/heads/main/deps/rabbitmq_codegen/amqp-rabbitmq-0.9.1.json";
const specCodegen: Spec = await (await fetch(specCodegenUrl)).json();

const specWithDocsUrl =
  "https://www.rabbitmq.com/resources/specs/amqp0-9-1.xml";

const specWithDocs: SpecWithDocs = JSON.parse(
  JSON.stringify(
    parse(await (await fetch(specWithDocsUrl)).text()),
    null,
    2,
  )
    .replaceAll("@", "")
    .replaceAll("#", ""),
);

const formatDoc = (doc: string | []) => {
  const formattedDoc = Array.isArray(doc)
    ? doc.filter((d) => typeof d === "string").join(" ")
    : doc;
  return formattedDoc.replaceAll("\n", "").replaceAll('"', "").replace(
    /\s\s+/g,
    " ",
  );
};

const spec: Spec = {
  ...specCodegen,
  domains: specCodegen.domains.map((domain) => {
    const docDomain = specWithDocs.amqp.domain.find((d) =>
      d.name.toLowerCase() === domain[0].toLowerCase()
    );
    return [...domain, ...docDomain?.doc ? [formatDoc(docDomain.doc)] : []];
  }),
  constants: specCodegen.constants.map((constant) => {
    const docConstant = specWithDocs.amqp.constant.find((c) =>
      c.name.toLowerCase() === constant.name.toLowerCase()
    );
    return {
      ...constant,
      ...(docConstant?.doc ? { doc: formatDoc(docConstant.doc) } : {}),
    };
  }),
  classes: specCodegen.classes.map((clazz) => {
    const docClass = specWithDocs.amqp.class.find((c) =>
      c.name.toLowerCase() === clazz.name.toLowerCase()
    );
    return {
      ...clazz,
      ...(docClass?.doc ? { doc: formatDoc(docClass.doc) } : {}),
      methods: clazz.methods.map((method) => {
        const docMethod = docClass?.method?.find((m) =>
          m.name.toLowerCase() === method.name.toLowerCase()
        );

        return {
          ...method,
          ...(docMethod?.doc ? { doc: formatDoc(docMethod.doc) } : {}),
          arguments: method.arguments.map((argument) => {
            const field = Array.isArray(docMethod?.field)
              ? docMethod.field
              : [docMethod?.field].filter(Boolean);
            const docArgument = field?.find((f) =>
              f?.name.toLowerCase() === argument.name.toLowerCase()
            );
            return {
              ...argument,
              ...(docArgument?.doc ? { doc: formatDoc(docArgument.doc) } : {}),
            };
          }),
        };
      }),
    };
  }),
};

Deno.writeTextFileSync(
  "codegen/amqp-rabbitmq-0.9.1.json",
  `${JSON.stringify(spec, null, 2)}\n`,
);
