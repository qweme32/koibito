import { createClient } from '@clickhouse/client';
import { config } from 'dotenv';

config();
const clickhouse = createClient( {
    host: process.env.HOST,
    username: process.env.CHUSER,
    password: process.env.PASS,
    database: process.env.NAME,
} );

export async function getUserViews(
    user: string,
    inc: boolean = true,
): Promise< number > {
    if ( ! /^[a-zA-Z0-9 -]+$/.test( user ) ) {
        return 1337;
    }

    let query = await clickhouse.query( {
        query: `SELECT * FROM koibito.users WHERE login='${ user }'`,
        format: 'JSONEachRow',
    } );
    let res: Array< any > = await query.json();

    if ( ! res.length ) {
        await clickhouse.exec( {
            query: `INSERT INTO koibito.users (login, views) VALUES ('${ user }', 1)`,
        } );

        return 1;
    } else {
        let user = res[ 0 ];

        if ( inc ) {
            await clickhouse.exec( {
                query: `ALTER TABLE koibito.users UPDATE views = ${
                    user.views + 1
                } WHERE login='${ user.login }'`,
            } );

            return user.views + 1;
        }

        return user.views;
    }
}

export async function getRepoViews(
    user: string,
    repo: string,
    inc: boolean = true,
): Promise< number > {
    if (
        ! /^[a-zA-Z0-9 -]+$/.test( user ) ||
        ! /^[a-zA-Z0-9 -]+$/.test( repo )
    ) {
        return 1337;
    }

    let query = await clickhouse.query( {
        query: `SELECT * FROM koibito.repos WHERE login='${ user }' AND repo='${ repo }'`,
        format: 'JSONEachRow',
    } );
    let res: Array< any > = await query.json();

    if ( ! res.length ) {
        await clickhouse.exec( {
            query: `INSERT INTO koibito.repos (login, repo, views) VALUES ('${ user }', '${ repo }', 1)`,
        } );

        return 1;
    } else {
        let repo = res[ 0 ];

        if ( inc ) {
            await clickhouse.exec( {
                query: `ALTER TABLE koibito.repos UPDATE views = ${
                    repo.views + 1
                } WHERE login='${ repo.login }' AND repo='${ repo.repo }'`,
            } );

            return repo.views + 1;
        }

        return repo.views;
    }
}

export async function init() {
    let { success } = await clickhouse.ping();
    if ( ! success ) throw new Error( "Can't connect to clickhouse" );

    console.log( '[CLICKHOUSE] Connected.' );

    // Clickhouse tables
    await clickhouse.exec( {
        query: `
        CREATE DATABASE IF NOT EXISTS koibito`,
    } );
    await clickhouse.exec( {
        query: `
        CREATE TABLE IF NOT EXISTS koibito.users
        (
            login String,
            views UInt32,
        )
        ENGINE = MergeTree()
        PRIMARY KEY (login)`,
    } );
    await clickhouse.exec( {
        query: `
        CREATE TABLE IF NOT EXISTS koibito.repos
        (
            login String,
            repo String,
            views UInt32,
        )
        ENGINE = MergeTree()
        PRIMARY KEY (login, repo)`,
    } );

    console.log( '[CLICKHOUSE] Initialized.' );
}
