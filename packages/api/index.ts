import ws from "@fastify/websocket";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import type { FastifyRequest } from "fastify/types/request";

import { appRouter } from "./src/root";
import type { AppRouter } from "./src/root";
import { createTRPCContext } from "./src/trpc";

export { appRouter, type AppRouter } from "./src/root";
export { createTRPCContext } from "./src/trpc";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const prefix = "/";
const server = fastify({ logger: dev });

void server.register(ws);
void server.register(fastifyTRPCPlugin, {
  prefix,
  useWSS: true,
  trpcOptions: {
    router: appRouter,
    ctx: createTRPCContext,
    createContext: ({ req }: { req: FastifyRequest }) => {
      return createTRPCContext({ req });
    },
  },
});

const start = async () => {
  try {
    await server.listen({ port });
    console.log("listening on port", port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
