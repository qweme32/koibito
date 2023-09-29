// Koibito
// With <3 by @qweme32

import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { ThemeStorage } from './themes';
import { CacheSystem } from './cache';
import { connect } from './mongo';

const themes = new ThemeStorage();
const cache = new CacheSystem();
const app = Fastify();

app.get(
    '/@:user',
    {
        schema: {
            params: {
                type: 'object',
                properties: {
                    user: { type: 'string', minLength: 1, maxLength: 128 },
                },
                required: [ 'user' ],
            },
            querystring: {
                type: 'object',
                properties: {
                    theme: {
                        type: 'string',
                        enum: themes.themeNames,
                        default: 'chainsaw-man',
                    },
                    scale: {
                        type: 'number',
                        default: 2,
                        minimum: 0.5,
                        maximum: 10,
                    },
                    length: {
                        type: 'number',
                        default: 0,
                        minimum: 0,
                        maximum: 8,
                    },
                },
            },
        },
    },
    async ( request: FastifyRequest, reply: FastifyReply ) => {
        let params = request.params as Record< string, any >;
        let query = request.query as Record< string, any >;

        const views = await cache.getUser(
            params.user,
            // Check github user-agent
            request.headers[ 'user-agent' ] &&
                request.headers[ 'user-agent' ].startsWith( 'github-camo' )
                ? true
                : false,
        );

        reply
            .header( 'Content-Type', 'image/svg+xml' )
            .header(
                // For github
                'Cache-Control',
                'max-age=0, no-cache, no-store, must-revalidate',
            )
            .send(
                themes.get( query.theme ).render(
                    views,
                    // If length equals 0, use auto length for number
                    query.length == 0 ? views.toString().length : query.length,
                    query.scale,
                ),
            );
    },
);

app.get(
    '/@:user/:repo',
    {
        schema: {
            params: {
                type: 'object',
                properties: {
                    user: { type: 'string', minLength: 1, maxLength: 128 },
                    repo: { type: 'string', minLength: 1, maxLength: 128 },
                },
                required: [ 'user', 'repo' ],
            },
            querystring: {
                type: 'object',
                properties: {
                    theme: {
                        type: 'string',
                        enum: themes.themeNames,
                        default: 'chainsaw-man',
                    },
                    scale: {
                        type: 'number',
                        default: 2,
                        minimum: 0.5,
                        maximum: 10,
                    },
                    length: {
                        type: 'number',
                        default: 0,
                        minimum: 0,
                        maximum: 8,
                    },
                },
            },
        },
    },
    async ( request: FastifyRequest, reply: FastifyReply ) => {
        let params = request.params as Record< string, any >;
        let query = request.query as Record< string, any >;

        const views = await cache.getRepo(
            params.user,
            params.repo,
            // Check github user-agent
            request.headers[ 'user-agent' ] &&
                request.headers[ 'user-agent' ].startsWith( 'github-camo' )
                ? true
                : false,
        );

        reply
            .header( 'Content-Type', 'image/svg+xml' )
            .header(
                // For github
                'Cache-Control',
                'max-age=0, no-cache, no-store, must-revalidate',
            )
            .send(
                themes.get( query.theme ).render(
                    views,
                    // If length equals 0, use auto length for number
                    query.length == 0 ? views.toString().length : query.length,
                    query.scale,
                ),
            );
    },
);

app.get(
    '/demo',
    {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    theme: {
                        type: 'string',
                        enum: themes.themeNames,
                    },
                },

                required: [ 'theme' ],
            },
        },
    },
    async ( request: FastifyRequest, reply: FastifyReply ) => {
        let query = request.query as Record< string, any >;

        reply
            .header( 'Content-Type', 'image/svg+xml' )
            .header(
                // For github
                'Cache-Control',
                'max-age=0, no-cache, no-store, must-revalidate',
            )
            .send( themes.get( query.theme ).render( 123456789, 10, 1 ) );
    },
);

app.get( '/usages', ( request: FastifyRequest, reply: FastifyReply ) => {
    reply
        .header( 'Content-Type', 'application/json' )
        .send( { value: cache.usage } );
} );

app.listen( { port: 9993 }, async () => {
    console.log( '[SERVER] Listening on 9993 port.' );
    await connect();
} );
