CREATE INDEX IF NOT EXISTS index_entity_on_fullname_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("fullName" COLLATE pg_catalog."default");


CREATE INDEX IF NOT EXISTS index_entity_on_postal_address_like
  ON "demo_algolia_autocomplete"."Person"
  USING btree
  ("postalAddress" COLLATE pg_catalog."default");
