const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const hello = async ({ next }) => {
  const response = await next();
  response.headers.set('X-Hello', 'Hello from functions Middleware!');
  return response;
};

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

export const onRequestGet = [errorHandler, hello];
