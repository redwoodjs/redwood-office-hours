# 10 Ways to Become a Better RedwoodJS Developer

1. How to Ask Questions

1. Postgres and General Data Design

   - [Prisma's Data Guide](https://www.prisma.io/dataguide)
     Learn how databases work, how to choose the right one, and how to use databases with your applications to their full potential
   - [About PostgreSQL](https://www.prisma.io/dataguide#postgresql)

1. Postgres CTEs & Window Functions

   ### Window Functions

   - Window functions provide the ability to perform calculations across sets of rows that are related to the current query row
   - https://www.postgresql.org/docs/15/functions-window.html
   - `row_number()`
   - `dense_rank()`
   - `ntile()`
   - `lag()`
   - `lead()`
   - the `OVER` clause
   - the `PARTITION BY` [list](https://www.postgresql.org/docs/15/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS)

   ### Example

   ```ts
   /**
    * Calculates the leaders for a leaderboard based on the number of plays,
    * the total correct, incorrect, and unanswered.
    *
    * Uses a CTE and a Postgres DENSE_RANK() window function to ranking each players place
    *
    * Dense ranking gives the player with teh same score, the same rank (ie, share place)
    *
    * The top player is the one with the most correct plays.
    *
    * I *really* wish Prisma supported views.
    *
    * @returns an array of <Leaderboard>
    * @see Postgres Window Functions https://www.postgresql.org/docs/current/functions-window.html
    */
   export const leaderboards = async () => {
     // how can I import the Leaderboard type for the graphql types (not Prisma types)?
     const leaders = await db.$queryRaw<typeof Leaderboard[]>`
   WITH correct_counts AS (
       SELECT
       p. "playerId",
       1 AS played,
       CASE WHEN correctness = TRUE THEN
           1
       END AS correct,
       CASE WHEN correctness = FALSE THEN
           1
       END AS incorrect,
       CASE WHEN correctness IS NULL THEN
           1
       END AS unanswered
       FROM
       "Play" p
   ),
   totals AS (
       SELECT
       "playerId",
       coalesce(sum(played),
           0) AS "playedTotal",
       coalesce(sum(correct),
           0) AS "correctTotal",
       coalesce(sum(incorrect),
           0) AS "incorrectTotal",
       coalesce(sum(unanswered),
           0) AS "unansweredTotal"
       FROM
       correct_counts
       GROUP BY
       "playerId"
   )
   SELECT
       t. "playerId",
       p.name,
       p. "gravatarHash",
       t. "playedTotal",
       t. "correctTotal",
       t. "incorrectTotal",
       t. "unansweredTotal",
       DENSE_RANK() OVER (ORDER BY t. "correctTotal" DESC) AS place,
           ROW_NUMBER() OVER () AS "leaderboardRowNumber"
       FROM
       totals t
       JOIN "Player" p ON p.id = t. "playerId"
       ORDER BY
       "leaderboardRowNumber" ASC,
       place DESC,
       p.name ASC`;

     return leaders;
   };
   ```

1. Postgres Functions & Triggers

1. Views and Materialized Views

1. Prisma Nested Reads and Writes

   When to use [`connect`](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record), [`create` or `createMany`](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record) and [`connectOrCreate`](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-or-create-a-record).

   - https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-reads
   - https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes

   Office Hours Example: - https://github.com/redwoodjs/redwood-office-hours/tree/main/2022-10-26-nested-writes-demo

1. Data Model vs GraphQL API

1. Understanding Resolvers

   - Default Resolvers: https://redwoodjs.com/docs/graphql#understanding-default-resolvers
   - Relation Resolvers: https://redwoodjs.com/docs/typescript/strict-mode#relation-resolvers-in-services

1. Naming

1. Caching

   No when to hold them ... when to walk way. when to ru.

1. Documentation

   - reading
   - writing
   - Docusaurus
