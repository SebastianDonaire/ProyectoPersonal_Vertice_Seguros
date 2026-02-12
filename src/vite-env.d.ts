declare module 'vite-plugin-handlebars' {
    import { Plugin } from 'vite';

    interface HandlebarsOptions {
        partialDirectory?: string | string[];
        context?: object | ((pagePath: string) => object);
        reloadOnPartialChange?: boolean;
        compileOptions?: any;
        runtimeOptions?: any;
    }

    export default function handlebars(options?: HandlebarsOptions): Plugin;
}

declare module 'path' {
    export function resolve(...paths: string[]): string;
    export function join(...paths: string[]): string;
    export function dirname(p: string): string;
    export function basename(p: string, ext?: string): string;
    export function extname(p: string): string;
    export const sep: string;
}

declare var __dirname: string;
