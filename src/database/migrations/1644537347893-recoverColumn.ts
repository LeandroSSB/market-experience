import {MigrationInterface, QueryRunner} from "typeorm";

export class recoverColumn1644537347893 implements MigrationInterface {
    name = 'recoverColumn1644537347893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "recover" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recover"`);
    }

}
