export default {
  // The port that the main server will listen on
  port: 8080,
  // The port to use for the metrics server (0 to disable)
  metricsPort: 9100,
  // MongoDB connection string
  dbConnection: 'mongodb://localhost:27017/metaltest',
  // How many salt rounds to run, make this as high as possible without
  // performance issues
  saltRounds: 10,
  // How long should the access token be valid? Keep this low to prevent
  // token stealing attacks
  accessTokenTTL: '15m',
  // How long should user sessions last once logged in?
  refreshTokenTTL: '30d',
  // JWT Server Keys
  // It is important that these are kept secure - do not use the keys from the
  // test.ts config.
  // Generate keys with the following commands
  //   ssh-keygen -t rsa -b 4096 -m PEM -f jwtAccess.key # Don't add a passphrase
  //   openssl rsa -in jwtAccess.key -pubout -outform PEM -out jwtAccess.pub
  // The contents of jwtAccess.key is the private key, and jwtAccess.pub will
  // contain the public key. Once done, repeat for the refresh token.
  // Loading keys directly from files is a work in progress.
  accessTokenPrivateKey: `< PUT AN RSA KEY HERE >`,
  accessTokenPublicKey: `< PUT AN RSA KEY HERE >`,
  refreshTokenPrivateKey: `< PUT AN RSA KEY HERE >`,
  refreshTokenPublicKey: `< PUT AN RSA KEY HERE >`
}
