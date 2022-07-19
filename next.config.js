module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/ftx/:path*',
            destination: 'https://ftx.com/api/:path*',
          },
        ]
      },
  };