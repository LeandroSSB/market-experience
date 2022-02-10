import {MigrationInterface, QueryRunner} from "typeorm";

export class userRelations1644523725679 implements MigrationInterface {
    name = 'userRelations1644523725679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "userUuid" character varying`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_4b252d65360f9e480a07fd2e4df" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_4b252d65360f9e480a07fd2e4df"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "userUuid"`);
    }

}
