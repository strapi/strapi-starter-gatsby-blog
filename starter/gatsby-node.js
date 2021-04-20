exports.onCreateWebpackConfig = ({
    actions,
    plugins,
    stage
  }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          path: require.resolve("path-browserify")
        },
        fallback: {
          fs: false,
        }
      }
    })
    if (stage === 'build-javascript' || stage === 'develop') {
      actions.setWebpackConfig({
        plugins: [
          plugins.provide({ process: 'process/browser' })
        ]
      })
    }
  }