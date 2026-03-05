import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "presets_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer
  );
  
  ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_testimonials_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_testimonials_fk";
  
  ALTER TABLE "presets_rels" DROP CONSTRAINT "presets_rels_testimonials_fk";
  
  DROP INDEX "page_rels_testimonials_id_idx";
  DROP INDEX "_page_v_rels_testimonials_id_idx";
  DROP INDEX "presets_rels_testimonials_id_idx";
  ALTER TABLE "page_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "_page_v_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "_page_v_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_order_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_locale_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_testimon_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_order_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_locale_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_testi_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "presets_testimonials_list_testimonial_items_order_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "presets_testimonials_list_testimonial_items_parent_id_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "presets_testimonials_list_testimonial_items_testimonial_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  ALTER TABLE "page_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "presets_rels" DROP COLUMN "testimonials_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "presets_testimonials_list_testimonial_items" CASCADE;
  ALTER TABLE "page_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "presets_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_rels_testimonials_id_idx" ON "page_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "_page_v_rels_testimonials_id_idx" ON "_page_v_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "presets_rels_testimonials_id_idx" ON "presets_rels" USING btree ("testimonials_id");`)
}
