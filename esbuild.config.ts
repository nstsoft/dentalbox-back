import esbuild from 'esbuild';
import path from 'path';

esbuild
  .build({
    entryPoints: [path.resolve(__dirname, 'src/main.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20',
    minify: true,
    outfile: path.resolve(__dirname, 'dist/index.js'),
    external: [],
    sourcemap: false,
  })
  .catch(() => process.exit(1));
