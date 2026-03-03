import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "tenant_announcements_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tenant_announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'page_tenant_id_tenants_id_fk'
      AND table_name = 'page'
    ) THEN
      ALTER TABLE "page" DROP CONSTRAINT "page_tenant_id_tenants_id_fk";
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = '_page_v_version_tenant_id_tenants_id_fk'
      AND table_name = '_page_v'
    ) THEN
      ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk";
    END IF;
  END $$;
  
  DROP INDEX IF EXISTS "page_tenant_idx";
  DROP INDEX IF EXISTS "_page_v_version_version_tenant_idx";
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'tenants' 
      AND column_name = 'created_by_id'
    ) THEN
      ALTER TABLE "tenants" ADD COLUMN "created_by_id" integer;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'payload_locked_documents_rels' 
      AND column_name = 'tenant_announcements_id'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tenant_announcements_id" integer;
    END IF;
  END $$;
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'tenant_announcements_announcements_parent_id_fk'
      AND table_name = 'tenant_announcements_announcements'
    ) THEN
      ALTER TABLE "tenant_announcements_announcements" ADD CONSTRAINT "tenant_announcements_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenant_announcements"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'tenant_announcements_tenant_id_tenants_id_fk'
      AND table_name = 'tenant_announcements'
    ) THEN
      ALTER TABLE "tenant_announcements" ADD CONSTRAINT "tenant_announcements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'tenant_announcements_created_by_id_users_id_fk'
      AND table_name = 'tenant_announcements'
    ) THEN
      ALTER TABLE "tenant_announcements" ADD CONSTRAINT "tenant_announcements_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tenant_announcements_announcements_order_idx" ON "tenant_announcements_announcements" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tenant_announcements_announcements_parent_id_idx" ON "tenant_announcements_announcements" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tenant_announcements_tenant_idx" ON "tenant_announcements" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "tenant_announcements_created_by_idx" ON "tenant_announcements" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "tenant_announcements_updated_at_idx" ON "tenant_announcements" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tenant_announcements_created_at_idx" ON "tenant_announcements" USING btree ("created_at");
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'tenants_created_by_id_users_id_fk'
      AND table_name = 'tenants'
    ) THEN
      ALTER TABLE "tenants" ADD CONSTRAINT "tenants_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'payload_locked_documents_rels_tenant_announcements_fk'
      AND table_name = 'payload_locked_documents_rels'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenant_announcements_fk" FOREIGN KEY ("tenant_announcements_id") REFERENCES "public"."tenant_announcements"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tenants_created_by_idx" ON "tenants" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tenant_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("tenant_announcements_id");
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'tenants' 
      AND column_name = 'slug'
    ) THEN
      ALTER TABLE "tenants" DROP COLUMN "slug";
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'page' 
      AND column_name = 'tenant_id'
    ) THEN
      ALTER TABLE "page" DROP COLUMN "tenant_id";
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = '_page_v' 
      AND column_name = 'version_tenant_id'
    ) THEN
      ALTER TABLE "_page_v" DROP COLUMN "version_tenant_id";
    END IF;
  END $$;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "tenant_announcements_announcements" CASCADE;
  DROP TABLE IF EXISTS "tenant_announcements" CASCADE;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'tenants_created_by_id_users_id_fk'
      AND table_name = 'tenants'
    ) THEN
      ALTER TABLE "tenants" DROP CONSTRAINT "tenants_created_by_id_users_id_fk";
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'payload_locked_documents_rels_tenant_announcements_fk'
      AND table_name = 'payload_locked_documents_rels'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tenant_announcements_fk";
    END IF;
  END $$;
  
  DROP INDEX IF EXISTS "tenants_created_by_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tenant_announcements_id_idx";
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'page' 
      AND column_name = 'tenant_id'
    ) THEN
      ALTER TABLE "page" ADD COLUMN "tenant_id" integer;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = '_page_v' 
      AND column_name = 'version_tenant_id'
    ) THEN
      ALTER TABLE "_page_v" ADD COLUMN "version_tenant_id" integer;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'tenants' 
      AND column_name = 'slug'
    ) THEN
      ALTER TABLE "tenants" ADD COLUMN "slug" varchar;
      UPDATE "tenants" SET "slug" = "domain" WHERE "slug" IS NULL;
      ALTER TABLE "tenants" ALTER COLUMN "slug" SET NOT NULL;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'page_tenant_id_tenants_id_fk'
      AND table_name = 'page'
    ) THEN
      ALTER TABLE "page" ADD CONSTRAINT "page_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = '_page_v_version_tenant_id_tenants_id_fk'
      AND table_name = '_page_v'
    ) THEN
      ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_tenant_idx" ON "page" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "_page_v_version_version_tenant_idx" ON "_page_v" USING btree ("version_tenant_id");
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'tenants' 
      AND column_name = 'created_by_id'
    ) THEN
      ALTER TABLE "tenants" DROP COLUMN "created_by_id";
    END IF;
  END $$;
  
  DO $$ 
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'payload_locked_documents_rels' 
      AND column_name = 'tenant_announcements_id'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tenant_announcements_id";
    END IF;
  END $$;`)
}
