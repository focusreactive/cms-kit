import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_hero" DROP CONSTRAINT "page_blocks_hero_experiment_id_experiments_id_fk";
  
  ALTER TABLE "page_blocks_testimonials_list" DROP CONSTRAINT "page_blocks_testimonials_list_experiment_id_experiments_id_fk";
  
  ALTER TABLE "_page_v_blocks_hero" DROP CONSTRAINT "_page_v_blocks_hero_experiment_id_experiments_id_fk";
  
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP CONSTRAINT "_page_v_blocks_testimonials_list_experiment_id_experiments_id_fk";
  
  DROP INDEX "page_blocks_hero_experiment_idx";
  DROP INDEX "page_blocks_testimonials_list_experiment_idx";
  DROP INDEX "_page_v_blocks_hero_experiment_idx";
  DROP INDEX "_page_v_blocks_testimonials_list_experiment_idx";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "use_experiment";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "experiment_id";
  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN "use_experiment";
  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN "experiment_id";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "use_experiment";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "experiment_id";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN "use_experiment";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN "experiment_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_hero" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "page_blocks_hero" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_hero_experiment_idx" ON "page_blocks_hero" USING btree ("experiment_id");
  CREATE INDEX "page_blocks_testimonials_list_experiment_idx" ON "page_blocks_testimonials_list" USING btree ("experiment_id");
  CREATE INDEX "_page_v_blocks_hero_experiment_idx" ON "_page_v_blocks_hero" USING btree ("experiment_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_experiment_idx" ON "_page_v_blocks_testimonials_list" USING btree ("experiment_id");`)
}
