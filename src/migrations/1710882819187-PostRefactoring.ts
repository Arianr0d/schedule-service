import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1710882819187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE OR REPLACE FUNCTION "deleteRequirement"(
                IN "scheduleId" integer,
                IN "requirementId" integer
            )
                RETURNS void
                LANGUAGE 'sql'
            AS $BODY$
                DELETE FROM schedule_requirement
	                WHERE schedule_id = "scheduleId" AND requirement_id = "requirementId";
            $BODY$;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP FUNCTION deleteRequirement;`)
    }

}
