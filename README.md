# Bunda
[![NPM Version](https://img.shields.io/npm/v/@y0x54a/bunda)](https://www.npmjs.com/package/@y0x54a/bunda)
[![CI](https://github.com/y0x54a/bunda/workflows/ci/badge.svg?branch=main)](https://github.com/y0x54a/bunda/actions)

Bunda (Mother) - A lightweight web framework for the [Bun](https://bun.sh) javascript runtime.

## Installing
```sh
bun add @y0x54a/bunda
```

## Example
```ts
import {Bunda} from "@y0x54a/bunda";

const app = await Bunda.serve();

app.router.get("/", ctx => ctx.text("Hi!"));
```

Using **StackRouter**
```ts
import {Bunda, StackRouter} from "@y0x54a/bunda";

const app = await Bunda.serve({
  services: {
    router: Bunda.classService(StackRouter)
  }
});

app.router.use(ctx => ctx.text("Hi!"));
```

Using **PathnameRouter**
```ts
import {Bunda, PathnameRouter} from "@y0x54a/bunda";

const app = await Bunda.serve({
  services: {
    router: Bunda.classService(PathnameRouter)
  }
});

app.router.use((ctx, next) => next(ctx));

app.router.get("/", ctx => ctx.text("Hi!"), [(ctx, next) => next(ctx)]);

app.router.get("/ping", ctx => ctx.text("Pong!"));
```

Using **FetchHandler**
```ts
import {Bunda, FetchHandler} from "@y0x54a/bunda";

const app = await Bunda.serve({
  services: {
    fetchHandler: Bunda.rawService(new FetchHandler({status: 403, message: "Forbidden"}))
  }
});

app.router.get("/ping", ctx => ctx.text("Pong!"));
```

Using **ErrorHandler**
```ts
import {Bunda, ErrorHandler} from "@y0x54a/bunda";

const app = await Bunda.serve({
  services: {
    errorHandler: Bunda.rawService(new ErrorHandler({message: "Please see your server logs!"}))
  }
});

app.router.get("/", () => Promise.reject(new Error()));
```

## API

- ### Bunda

  - **Props**

  - `router`

  - `fetchHandler`

  - `errorHandler`

  - `isServed`

  - `isDevelopment`

  <!-- Container -->

  - `names`

  - `services`

  - **Methods**

  - `constructor({services?})`

  - `serve()`

  - `stop()`

  <!-- Container -->

  - `has(name)`

  - `get(name)`

  - `getIf(name)`

  - `raw(name, value)`

  - `rawIf(name, value)`

  - `class(name, value)`

  - `classIf(name, value)`

  - `factory(name, value)`

  - `factoryIf(name, value)`

  - `register(name, service)`

  - `registers(services)`

  - `registerIf(name, service)`

  - `registersIf(services)`

  - `unregister(name)`

  - `unregisters(names)`

  - `unregisterIf(name)`

  - `unregistersIf(names)`

  - `resolve(name, args?)`

  - `resolveIf(name, args?, retval?)`

  - `create(name, args?)`

  - `createIf(name, args?, retval?)`

  - **Static Methods**

  - `create({services?})`

  - `serve({services?})`

  <!-- Container -->

  - `rawService(value)`

  - `classService(value)`

  - `factoryService(value)`

- ### Context

  - **Props**

  - `container`

  - `request`

  - `state`

  - `url`

  - `method`

  - `headers`

  - `path`

  - `pathname`

  - `query`

  - `queryParams`

  - `search`

  - `searchParams`

  - **Methods**

  - `constructor({container, request, state?})`

  - `redirect(url, status?, headers?, options?)`

  - `response(body, status?, headers?, options?)`

  - `json(json, status?, headers?, options?)`

  - `text(text, status?, headers?, options?)`

  - `html(html, status?, headers?, options?)`

- ### Errinfo

  - **Props**

  - `code`

  - `error`

  - `context?`

  - **Methods**

  - `constructor({code, error, context?})`

  - **Static Props**

  - `FETCH`

  - `ERROR`

  - **Static Methods**

  - `fetch(error, context)`

  - `error(error)`

- ### Url

  - **Props**

  - `scheme`

  - `protocol`

  - `username`

  - `password`

  - `host`

  - `hostname`

  - `port`

  - `path`

  - `pathname`

  - `query`

  - `queryParams`

  - `search`

  - `searchParams`

  - `hash`

  - `fragment`

  - `origin`

  - `href`

  - **Methods**

  - `constructor(url, base?)`

  - `toString()`

  - `toJSON()`

- ### Container

  - **Props**

  - `names`

  - `services`

  - **Methods**

  - `constructor(services?)`

  - `has(name)`

  - `get(name)`

  - `getIf(name)`

  - `raw(name, value)`

  - `rawIf(name, value)`

  - `class(name, value)`

  - `classIf(name, value)`

  - `factory(name, value)`

  - `factoryIf(name, value)`

  - `register(name, service)`

  - `registers(services)`

  - `registerIf(name, service)`

  - `registersIf(services)`

  - `unregister(name)`

  - `unregisters(names)`

  - `unregisterIf(name)`

  - `unregistersIf(names)`

  - `resolve(name, args?)`

  - `resolveIf(name, args?, retval?)`

  - `create(name, args?)`

  - `createIf(name, args?, retval?)`

  - **Static Methods**

  - `rawService(value)`

  - `classService(value)`

  - `factoryService(value)`

- ### Service

  - **Props**

  - `value`

  - `exports`

  - `isResolved`

  - **Methods**

  - `constructor(value)`

  - `resolve(args?)`

  - `create(args?)`

- ### RawService

  - **Props**

  - `value`

  - `exports`

  - `isResolved`

  - **Methods**

  - `constructor(value)`

  - `resolve(args?)`

  - `create(args?)`

- ### ClassService

  - **Props**

  - `value`

  - `exports`

  - `isResolved`

  - **Methods**

  - `constructor(value)`

  - `resolve(args?)`

  - `create(args?)`

- ### FactoryService

  - **Props**

  - `value`

  - `exports`

  - `isResolved`

  - **Methods**

  - `constructor(value)`

  - `resolve(args?)`

  - `create(args?)`

- ### FetchHandler

  - **Props**

  - `status`

  - `message`

  - **Methods**

  - `constructor({status?, message?})`

  - `handle(context)`

- ### ErrorHandler

  - **Props**

  - `status`

  - `message`

  - `fallback`

  - **Methods**

  - `constructor({status?, message?, fallback?})`

  - `handle(errinfo)`

- ### StackRouter

  - **Props**

  - `length`

  - `factories`

  - **Methods**

  - `constructor(factories?)`

  - `use(factory)`

  - `uses(factories)`

  - `unuse(factory)`

  - `unuses(factories)`

  - `handle(context, next)`

- ### PathnameRouter

  - **Props**

  - `path`

  - `routes`

  - `middleware`

  - **Methods**

  - `constructor({path?, routes?, middleware?})`

  - `use(factory)`

  - `uses(factories)`

  - `unuse(factory)`

  - `unuses(factories)`

  - `get(path, factory, middleware?)`

  - `head(path, factory, middleware?)`

  - `post(path, factory, middleware?)`

  - `put(path, factory, middleware?)`

  - `delete(path, factory, middleware?)`

  - `connect(path, factory, middleware?)`

  - `options(path, factory, middleware?)`

  - `trace(path, factory, middleware?)`

  - `patch(path, factory, middleware?)`

  - `register(route)`

  - `registers(routes)`

  - `unregister(route)`

  - `unregisters(routes)`

  - `handle(context, next)`

- ### PathnameRoute

  - **Props**

  - `path`

  - `method`

  - `factory`

  - `middleware`

  - **Methods**

  - `constructor({path, method, factory, middleware?})`

  - `use(factory)`

  - `uses(factories)`

  - `unuse(factory)`

  - `unuses(factories)`

  - `handle(context)`