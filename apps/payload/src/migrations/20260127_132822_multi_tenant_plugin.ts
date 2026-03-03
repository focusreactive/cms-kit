import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL
  );
  
  ALTER TABLE "page" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  ALTER TABLE "page" ADD CONSTRAINT "page_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_tenant_idx" ON "page" USING btree ("tenant_id");
  CREATE INDEX "_page_v_version_version_tenant_idx" ON "_page_v" USING btree ("version_tenant_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_tenants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_tenants" CASCADE;
  ALTER TABLE "page" DROP CONSTRAINT "page_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk";
  
  DROP INDEX "page_tenant_idx";
  DROP INDEX "_page_v_version_version_tenant_idx";
  ALTER TABLE "page" DROP COLUMN "tenant_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_tenant_id";`)
}
