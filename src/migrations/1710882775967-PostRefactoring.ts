import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1710882775967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE OR REPLACE FUNCTION "addRequirement"(
                IN "scheduleId" integer,
                IN "requirementId" integer,
                IN "descriptionRequirement" character varying
            )
                RETURNS void
                LANGUAGE 'plpgsql'
            AS $BODY$
            DECLARE
                requirementExist bool;
            BEGIN
                requirementExist = EXISTS(SELECT requirement_id FROM schedule_requirement
                    WHERE schedule_id = "scheduleId");
        
                IF requirementExist = true THEN
                    UPDATE schedule_requirement SET requirement_id = "requirementId", description = "descriptionRequirement"
                        WHERE schedule_id = "scheduleId";
                ELSE
                    INSERT INTO schedule_requirement (description, schedule_id, requirement_id)
                        VALUES ("descriptionRequirement", "scheduleId", "requirementId");
                END IF;
            END;
            $BODY$;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP FUNCTION addRequirement;`)
    }

}
