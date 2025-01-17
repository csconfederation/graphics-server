// Native
import path from 'path';

// Packages
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import appRootPath from 'app-root-path';
export * from './entity';

// Ours
import { User } from './entity/User';
import { Session } from './entity/Session';
import { Role } from './entity/Role';
import { Replicant } from './entity/Replicant';
import { Permission } from './entity/Permission';
import { Identity } from './entity/Identity';
import { ApiKey } from './entity/ApiKey';

const dbPath = path.join(appRootPath.path, 'db/nodecg.sqlite3');
export const testing = process.env.NODECG_TEST?.toLowerCase() === 'true';

const dataSource = new DataSource({
	type: 'better-sqlite3',

	/**
	 * TypeORM has this special :memory: key which indicates
	 * that an in-memory version of SQLite should be used.
	 *
	 * I can't find ANY documentation on this,
	 * only references to it in GitHub issue threads
	 * and in the TypeORM source code.
	 *
	 * But, bad docs aside, it is still useful
	 * and we use it for tests.
	 */
	database: testing ? ':memory:' : dbPath,
	logging: false,
	entities: [ApiKey, Identity, Permission, Replicant, Role, Session, User],
	migrations: [path.join(appRootPath.path, 'build/typeorm/migration/**/*.js')],
	subscribers: [path.join(appRootPath.path, 'build/typeorm/subscriber/**/*.js')],
	migrationsRun: true,
	synchronize: false,
});

export default dataSource;
