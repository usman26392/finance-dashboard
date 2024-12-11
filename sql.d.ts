import { sql } from '@vercel/postgres';

declare module '@vercel/postgres' {
  export { sql };
}
