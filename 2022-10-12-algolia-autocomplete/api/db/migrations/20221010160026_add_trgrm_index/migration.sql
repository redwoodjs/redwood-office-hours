-- DropIndex
DROP INDEX IF EXISTS "index_entity_on_fullname_like";

-- DropIndex
DROP INDEX IF EXISTS "index_entity_on_postal_address_like";


CREATE INDEX IF NOT EXISTS index_entity_on_fullname_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("fullName" COLLATE pg_catalog."default");


CREATE INDEX IF NOT EXISTS index_entity_on_postal_address_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("postalAddress" COLLATE pg_catalog."default");


CREATE EXTENSION IF NOT EXISTS pg_trgm with schema demo_algolia_autocomplete;

CREATE INDEX IF NOT EXISTS trgm_idx_person_postal_addreess ON "demo_algolia_autocomplete"."Person" USING gin ("postalAddress" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS trgm_idx_person_full_name ON "demo_algolia_autocomplete"."Person" USING gin ("fullName" gin_trgm_ops);
