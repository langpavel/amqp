import spec from "./amqp-rabbitmq-0.9.1.json" with { type: "json" };

export interface Spec {
  classes: ClassDefinition[];
  domains: string[][];
  constants: ConstantDefinition[];
}

export interface ConstantDefinition {
  name: string;
  value: number;
  class?: string;
  doc?: string;
}

export interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
  name: string;
  properties?: PropertyDefinition[];
  doc?: string;
}

export interface MethodDefinition {
  id: number;
  arguments: ArgumentDefinition[];
  synchronous?: boolean;
  response?: string;
  name: string;
  content?: boolean;
  doc?: string;
}

export interface PropertyDefinition {
  type: string;
  name: string;
  doc?: string;
}

export interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]?: string | number | boolean | Record<string, unknown>;
  doc?: string;
}

export default spec as Spec;
