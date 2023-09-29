import { getUserViews, getRepoViews, saveData, usageCount } from './mongo';

export interface UserCache {
    viewsToAdd: number;
    user: string;
    views: number;
}

export interface RepoCache {
    viewsToAdd: number;
    user: string;
    repo: string;
    views: number;
}

export class CacheSystem {
    private userCaches: Array< UserCache > = [];
    private repoCaches: Array< RepoCache > = [];
    public usage: number = 0;

    constructor() {
        setInterval(
            async () => {
                await saveData( this.userCaches, this.repoCaches );
                this.userCaches = [];
                this.repoCaches = [];

                console.log( '[Cache] Saved.' );
            },
            30 * 60 * 1000,
        );

        setInterval(
            async () => {
                this.usage = await usageCount();
            },
            5 * 60 * 1000,
        );

        process.on( 'SIGINT', async () => {
            await saveData( this.userCaches, this.repoCaches );
            console.log( '[Cache] Graceful saved.' );

            process.exit( 0 );
        } );
    }

    async getUser( user: string, update: boolean = true ): Promise< number > {
        let data = this.userCaches.find( ( val: UserCache ) => {
            return val.user === user;
        } );

        if ( ! data ) {
            let res = await getUserViews( user );

            data = {
                viewsToAdd: 1,
                user: user,
                views: ( res.views as number ) + ( update ? 1 : 0 ),
            };

            this.userCaches.push( data );
        } else {
            data.viewsToAdd += update ? 1 : 0;
            data.views += update ? 1 : 0;
        }

        return data.views;
    }

    async getRepo(
        user: string,
        repo: string,
        update: boolean = true,
    ): Promise< number > {
        let data = this.repoCaches.find( ( val: RepoCache ) => {
            return val.user === user && val.repo === repo;
        } );

        if ( ! data ) {
            let res = await getRepoViews( user, repo );

            data = {
                viewsToAdd: 1,
                user: user,
                repo: repo,
                views: ( res.views as number ) + ( update ? 1 : 0 ),
            };

            this.repoCaches.push( data );
        } else {
            data.viewsToAdd += update ? 1 : 0;
            data.views += update ? 1 : 0;
        }

        return data.views;
    }
}
