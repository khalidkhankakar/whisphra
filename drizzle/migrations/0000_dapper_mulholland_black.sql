CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"email" varchar,
	"emailVerified" timestamp,
	"image" varchar,
	"provider" varchar NOT NULL,
	"providerAccountId" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
