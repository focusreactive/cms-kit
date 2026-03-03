import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_footer_nav_items_group_links_link_type" RENAME TO "enum_footer_nav_items_links_link_type";
  ALTER TABLE "footer_nav_items_group_links" RENAME TO "footer_nav_items_links";
  ALTER TABLE "footer_nav_items_group" RENAME TO "footer_nav_items";
  ALTER TABLE "footer_nav_items_links" DROP CONSTRAINT "footer_nav_items_group_links_parent_id_fk";
  
  ALTER TABLE "footer_nav_items" DROP CONSTRAINT "footer_nav_items_group_parent_id_fk";
  
  DROP INDEX "footer_nav_items_group_links_order_idx";
  DROP INDEX "footer_nav_items_group_links_parent_id_idx";
  DROP INDEX "footer_nav_items_group_order_idx";
  DROP INDEX "footer_nav_items_group_parent_id_idx";
  ALTER TABLE "footer_nav_items_links" ADD CONSTRAINT "footer_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_links_order_idx" ON "footer_nav_items_links" USING btree ("_order");
  CREATE INDEX "footer_nav_items_links_parent_id_idx" ON "footer_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_footer_nav_items_links_link_type" RENAME TO "enum_footer_nav_items_group_links_link_type";
  ALTER TABLE "footer_nav_items_links" RENAME TO "footer_nav_items_group_links";
  ALTER TABLE "footer_nav_items" RENAME TO "footer_nav_items_group";
  ALTER TABLE "footer_nav_items_group_links" DROP CONSTRAINT "footer_nav_items_links_parent_id_fk";
  
  ALTER TABLE "footer_nav_items_group" DROP CONSTRAINT "footer_nav_items_parent_id_fk";
  
  DROP INDEX "footer_nav_items_links_order_idx";
  DROP INDEX "footer_nav_items_links_parent_id_idx";
  DROP INDEX "footer_nav_items_order_idx";
  DROP INDEX "footer_nav_items_parent_id_idx";
  ALTER TABLE "footer_nav_items_group_links" ADD CONSTRAINT "footer_nav_items_group_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items_group"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_group" ADD CONSTRAINT "footer_nav_items_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_group_links_order_idx" ON "footer_nav_items_group_links" USING btree ("_order");
  CREATE INDEX "footer_nav_items_group_links_parent_id_idx" ON "footer_nav_items_group_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_group_order_idx" ON "footer_nav_items_group" USING btree ("_order");
  CREATE INDEX "footer_nav_items_group_parent_id_idx" ON "footer_nav_items_group" USING btree ("_parent_id");`)
}
