import {MigrationInterface, QueryRunner} from "typeorm";

export class UserProducts1644342041723 implements MigrationInterface {
    name = 'UserProducts1644342041723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("uuid" character varying NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdOn" character varying NOT NULL, "updatedOn" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users_cart_products" ("usersUuid" character varying NOT NULL, "productsUuid" character varying NOT NULL, CONSTRAINT "PK_4708bae6fdd13286f6c0dcea2a9" PRIMARY KEY ("usersUuid", "productsUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_779c0167c573acbd90821eec45" ON "users_cart_products" ("usersUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bc494502093b48a64814cbf9" ON "users_cart_products" ("productsUuid") `);
        await queryRunner.query(`ALTER TABLE "users_cart_products" ADD CONSTRAINT "FK_779c0167c573acbd90821eec454" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_cart_products" ADD CONSTRAINT "FK_d2bc494502093b48a64814cbf9c" FOREIGN KEY ("productsUuid") REFERENCES "products"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_cart_products" DROP CONSTRAINT "FK_d2bc494502093b48a64814cbf9c"`);
        await queryRunner.query(`ALTER TABLE "users_cart_products" DROP CONSTRAINT "FK_779c0167c573acbd90821eec454"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2bc494502093b48a64814cbf9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_779c0167c573acbd90821eec45"`);
        await queryRunner.query(`DROP TABLE "users_cart_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
