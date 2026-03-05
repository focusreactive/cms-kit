import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_variants_tenants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_variants_tenants" CASCADE;
  ALTER TABLE "page_variants" DROP CONSTRAINT "page_variants_tenant_id_tenants_id_fk";
  
  DROP INDEX "page_variants_tenant_idx";
  ALTER TABLE "page_variants" DROP COLUMN "tenant_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_variants_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  ALTER TABLE "page_variants" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "page_variants_tenants" ADD CONSTRAINT "page_variants_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_tenants" ADD CONSTRAINT "page_variants_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_variants_tenants_order_idx" ON "page_variants_tenants" USING btree ("_order");
  CREATE INDEX "page_variants_tenants_parent_id_idx" ON "page_variants_tenants" USING btree ("_parent_id");
  CREATE INDEX "page_variants_tenants_tenant_idx" ON "page_variants_tenants" USING btree ("tenant_id");
  ALTER TABLE "page_variants" ADD CONSTRAINT "page_variants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_variants_tenant_idx" ON "page_variants" USING btree ("tenant_id");`)
}
