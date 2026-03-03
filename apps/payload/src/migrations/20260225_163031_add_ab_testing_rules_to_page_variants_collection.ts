import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_variants" ADD COLUMN "ab_testing_rules_pass_percentage" numeric DEFAULT 50 NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_variants" DROP COLUMN "ab_testing_rules_pass_percentage";`)
}
