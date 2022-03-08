import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1646247370038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'emails',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'subject',
            type: 'varchar'
          },
          {
            name: 'template',
            type: 'text'
          },
          {
            name: 'priority',
            type: 'number'
          },
          {
            name: 'status',
            type: 'number'
          },
          {
            name: 'createDate',
            type: 'number'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('emails');
  }
}
