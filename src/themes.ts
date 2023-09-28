// const fs = require('fs');

import { readFileSync } from 'fs';
import { glob } from 'glob';
import { join } from 'path';
import { platform } from 'os';

export class Theme {
    private items: Record< string, string > = {};
    constructor( private readonly path: string ) {
        const globalPath: string = join( __dirname, '..', 'themes', path );
        glob.sync( `${ globalPath }/*.svg` ).forEach( ( svgPath ) => {
            const sym = platform() === 'win32' ? '\\' : '/';
            const splitedPath = svgPath.split( sym );
            const number =
                splitedPath[ splitedPath.length - 1 ].split( '.' )[ 0 ];

            this.items[ number ] = readFileSync( svgPath, 'utf8' );
        } );
    }

    render( number: number, length: number, scale: number = 2 ): string {
        if ( length > 10 ) {
            length = 10;
        }
        let numberAsString = number.toString();
        const paddingLength = Math.max( 0, length - numberAsString.length );
        numberAsString = '0'.repeat( paddingLength ) + numberAsString;

        let output = `<svg width="${ length * 45 * scale }" height="${
            100 * scale
        }" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">`;

        numberAsString
            .split( '' )
            .forEach( ( value: string, index: number ) => {
                output += `<svg x="${ index * 45 * scale }" y="0" width="${
                    45 * scale
                }" height="${ 100 * scale }">${ this.items[ value ] }</svg>`;
            } );

        return output + '</svg>';
    }
}

export class ThemeStorage {
    public themes: Record< string, Theme > = {};
    public themeNames: Array< string > = [];
    constructor() {
        const globalPath: string = join( __dirname, '..', 'themes' );

        glob.sync( `${ globalPath }/*` ).forEach( ( themePath ) => {
            const sym = platform() === 'win32' ? '\\' : '/';
            const splitedPath = themePath.split( sym );
            const name = splitedPath[ splitedPath.length - 1 ];

            console.log( '[THEMES] Loading -', name, '.' );

            this.themes[ name ] = new Theme( name );
            this.themeNames.push( name );
        } );

        console.log( '[THEMES] Loaded', this.themeNames.length, 'themes.' );
    }

    get( name: string ): Theme {
        return this.themes[ name ];
    }
}
