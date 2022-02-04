import {MigrationInterface, QueryRunner} from "typeorm";

export class tableUserAndProducts1643913002685 implements MigrationInterface {
    name = 'tableUserAndProducts1643913002685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("uuid" character varying NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "userIdUuid" character varying, CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdOn" character varying NOT NULL, "updatedOn" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b78b794f65389f4eb2e36cadf59" FOREIGN KEY ("userIdUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b78b794f65389f4eb2e36cadf59"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
