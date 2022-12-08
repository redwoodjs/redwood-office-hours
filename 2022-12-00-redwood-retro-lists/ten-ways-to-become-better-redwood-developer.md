# 10 Ways to Become a Better RedwoodJS Developer

1. How to Ask Questions

1. Postgres and General Data Design

   - [Prisma's Data Guide](https://www.prisma.io/dataguide)
     Learn how databases work, how to choose the right one, and how to use databases with your applications to their full potential
   - [About PostgreSQL](https://www.prisma.io/dataguide#postgresql)

1. Postgres CTEs & Window Functions

   Prisma is a great ORM, but sometimes you need to go native and write raw SQL to perform complex calculations or queries.

   ### Common Table Expressions (CTEs)

   - "mini temp tables" with selected data that you can query in subsequent selects
   - break down very large queries into management steps
   - the `WITH`
   - WITH provides a way to write auxiliary statements for use in a larger query. These statements, which are often referred to as Common Table Expressions or CTEs, can be thought of as defining temporary tables that exist just for one query.
   - https://www.postgresql.org/docs/15/queries-with.html
   - Extra credit `RECURSIVE` and `UNION` queries

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

   - Triggers can calculate on insert, update, delete
   - See updating [vote counts example](https://github.com/supabase-community/supabase-graphql-example/blob/main/data/supabase/06-update-post-vote-counts.sql) for the [supanews](https://supabase-graphql-example.vercel.app) demo

   ```sql
   CREATE OR REPLACE FUNCTION public.update_vote_counts()
   RETURNS trigger as $$
   BEGIN

   WITH r AS (
   SELECT
       coalesce("Vote"."postId", "Post".id) AS "postId",
       count(1) "voteTotal",
       count(1) FILTER (WHERE direction = 'UP') "upVoteTotal",
       count(1) FILTER (WHERE direction = 'DOWN') "downVoteTotal",
       coalesce(sum(
               CASE WHEN direction = 'UP' THEN
                   1
               WHEN direction = 'DOWN' THEN
                   -1
               ELSE
                   0
               END), 0) "voteDelta",
       round(coalesce((sum(
           CASE WHEN direction = 'UP' THEN
               1
           WHEN direction = 'DOWN' THEN
               -1
           ELSE
               0
           END ) - 1) / (DATE_PART('hour', now() - max("Vote"."createdAt")) + 2) ^ 1.8 * 100000, -2147483648)::numeric, 0) AS "score",
       rank() OVER (ORDER BY round(coalesce((sum( CASE WHEN direction = 'UP' THEN
               1
           WHEN direction = 'DOWN' THEN
               -1
           ELSE
               0
           END) - 1) / (DATE_PART('hour', now() - max("Vote"."createdAt")) + 2) ^ 1.8 * 100000, -2147483648)::numeric, 0)
           DESC,
           "Post"."createdAt" DESC,
           "Post".title ASC) "voteRank"
   FROM
       "Vote"
       RIGHT JOIN "Post" ON "Vote"."postId" = "Post".id
   GROUP BY
       "Post".id,
       "Vote"."postId"
   )

   UPDATE
       public. "Post"
   SET
       "upVoteTotal" = r. "upVoteTotal",
       "downVoteTotal" = r. "downVoteTotal",
       "voteTotal" = r. "voteTotal",
   "voteDelta" = r. "voteDelta",
       "voteRank" = r. "voteRank",
   "score" = r. "score"
   FROM
       r
   WHERE
       r."postId" = public. "Post".id;

   RETURN new;
   END;
   $$ language plpgsql security definer;

   CREATE TRIGGER on_vote_created AFTER INSERT ON public."Vote" FOR EACH ROW EXECUTE FUNCTION public.update_vote_counts();
   CREATE TRIGGER on_vote_deleted AFTER DELETE ON public."Vote" FOR EACH ROW EXECUTE FUNCTION public.update_vote_counts();
   ```

1. Views and Materialized Views

   - Save it for later
   - Views https://www.postgresql.org/docs/15/sql-createview.html
   - Materialized Views are stored. Great for precalculating complex queries. Can be refreshed.- https://www.postgresql.org/docs/15/sql-creatematerializedview.html

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

   - No when to hold them ... when to walk way. Know when to run.

1. Documentation

   - reading
   - writing
   - Docusaurus
