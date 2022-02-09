import {MigrationInterface, QueryRunner} from "typeorm";

export class addingImageUrl1644414783477 implements MigrationInterface {
    name = 'addingImageUrl1644414783477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "imageUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
    }

}
