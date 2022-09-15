import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['**/**/*.entity.js'],
        synchronize: false,
        migrations: ['migrations/*.js'],
        migrationsTableName: 'migrations',
      });

      return dataSource.initialize();
    },
  },
];
