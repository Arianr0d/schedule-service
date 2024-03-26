import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   database: 'SchedulesDB',
   synchronize: true,
   logging: true,
   entities: [
      'src/server/entities/*.ts',
   ],
   migrations: [
      'src/migrations/*.ts'
   ]
});
