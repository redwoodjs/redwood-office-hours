#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

# This script loads raw csv data into the database
# Note that for the demo, we are not using the public schema, but loading into "demo_copycat_seed"

echo "🎉Loading World Cities ..."

# The connection information will be loaded from .env when run from the rw exec command
# Be sure to set these in your .env file
# PGHOST=
# PGPORT=5821
# PGDATABASE=railway
# PGUSER=postgres
# PGPASSWORD=

psql -c "truncate demo_copycat_seed.\"WorldCity\" RESTART IDENTITY"

psql -c "\copy demo_copycat_seed.\"WorldCity\" FROM 'scripts/data/word_cities.csv'
with (format csv, header true, force_null(population));"
