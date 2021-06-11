import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';

delete process.env.TS_NODE_PROJECT;

type Arguments = {
    mode?: 'production' | 'development' | 'none';
    environment?: string;
    publicPath?: string;
};

const configure: (env: string, argv: Arguments) => Configuration = (
    _,
    argv
) => {
    const mode = argv.mode || 'production';
    const environment = argv.environment || 'production';
    const devMode = mode === 'development';

    const devtool: string | undefined = devMode
        ? 'eval-cheap-module-source-map'
        : undefined;

    // const publicPath = argv.publicPath || '/';

    const productionPrePlugins =
        mode === 'production' ? [new CleanWebpackPlugin()] : [];
    const productionPostPlugins = mode === 'production' ? [] : [];

    return {
        mode,
        devtool,
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [new TsconfigPathsPlugin()],
        },

        entry: [path.resolve(__dirname, 'src/main.ts')],

        output: {
            library: 'PetsFront',
            libraryTarget: 'window',
            path: path.resolve(__dirname, '../Pets/Pets/wwwroot/libs/pets'),
            filename: 'js/[name].js',
            // publicPath,
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(
                                    __dirname,
                                    'tsconfig.json'
                                ),
                            },
                        },
                    ],
                },
                {
                    test: /\.template.html$/,
                    use: 'vue-template-loader',
                },
            ],
        },

        optimization: {
            // chunkIds: 'named',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
        },

        plugins: [
            ...productionPrePlugins,
            new DefinePlugin({
                ENVIRONMENT: JSON.stringify(environment),
            }),
            ...productionPostPlugins,
        ],
        devServer: {
            compress: true,
            historyApiFallback: true,
            disableHostCheck: true,
        },
    };
};

export default configure;
