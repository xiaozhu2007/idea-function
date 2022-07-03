import graphQLPlugin from "@cloudflare/pages-plugin-graphql";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello, world!";
        },
      },
    },
  }),
});

export async function onRequest(context) {
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    let url = new URL(request.url);
    url.hostname = "git.pig2333.workers.dev";// 多 重 代 理
    return fetch(new Request(url, request))
}

export const onRequestGet: PagesFunction = graphQLPlugin({
  schema,
  graphql,
});
