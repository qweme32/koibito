import mongoose from 'mongoose';
import { config } from 'dotenv';
import { RepoCache, UserCache } from './cache';

config();

// Models
const userModel = mongoose.model(
    'users',
    new mongoose.Schema( {
        user: { type: String, unique: false },
        views: Number,
    } ),
);

const repoModel = mongoose.model(
    'repos',
    new mongoose.Schema( {
        repo: { type: String, unique: false },
        user: { type: String, unique: false },
        views: Number,
    } ),
);

export async function getRepoViews( user: string, repo: string ) {
    let data = await repoModel.findOne( { user: user, repo: repo } ).exec();

    if ( ! data ) {
        data = await repoModel.create( {
            user: user,
            repo: repo,
            views: 1,
        } );
    }

    return data;
}

export async function getUserViews( user: string ) {
    let data = await userModel.findOne( { user: user } ).exec();

    console.log( data );

    if ( ! data ) {
        data = await userModel.create( {
            user: user,
            views: 1,
        } );
    }

    return data;
}

export async function saveData(
    users: Array< UserCache >,
    repos: Array< RepoCache >,
) {
    const usersBulk = users.map( ( cache: UserCache ) => {
        return {
            updateOne: {
                filter: { user: cache.user },
                update: { $inc: { views: cache.viewsToAdd } },
                upsert: true,
            },
        };
    } );

    const reposBulk = repos.map( ( cache: RepoCache ) => {
        return {
            updateOne: {
                filter: { user: cache.user, repo: cache.repo },
                update: { $inc: { views: cache.viewsToAdd } },
                upsert: true,
            },
        };
    } );

    if ( usersBulk.length ) {
        await userModel.bulkWrite( usersBulk );
    }

    if ( reposBulk.length ) {
        await repoModel.bulkWrite( reposBulk );
    }
}

export async function connect() {
    await mongoose.connect( process.env.MONGO_URI as string );
    console.log( '[MONGO] Connected.' );
}
