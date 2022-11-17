# Contributing

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```bash
pnpm dev
```

## Development

To develop the project locally, you'll need a recent version of Node.js and `pnpm`.

Install deps:

```bash
pnpm install
```

Copy `.env.example` to `.env.local` and update the environment variables.

```bash
cp .env.example .env.local
```

The only required environment variable is `DATABASE_URL` which is used by Prisma to connect to a Postgres instance. See [populate-movies](https://github.com/transitive-bullshit/populate-movies) for how to generate your own local movie database. Please open an issue to let me know if you'd like a public, read-only test database or an easier way to seed example movies.

Now you can run the local Next.js dev server:

```bash
pnpm dev
```

You should now be able to open `http://localhost:3000` to view the webapp.
