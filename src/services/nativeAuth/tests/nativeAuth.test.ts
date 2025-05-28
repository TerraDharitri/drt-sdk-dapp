import { nativeAuth } from '../nativeAuth'; // Adjust path if needed

// Mock getLatestBlockHash to return a valid block hash and timestamp
jest.mock('../helpers/getLatestBlockHash', () => ({
  getLatestBlockHash: jest.fn().mockResolvedValue({
    hash: 'mockedhash123',
    timestamp: 1680000000000,
  }),
}));

import { getLatestBlockHash } from '../helpers/getLatestBlockHash';
import { NativeAuthClient } from '@terradharitri/sdk-native-auth-client';

// Mock NativeAuthClient.getCurrentBlockHash method
NativeAuthClient.prototype.getCurrentBlockHash = jest.fn().mockResolvedValue('mockedhash123');

describe('Native Auth Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Latest block should return signable token - API', async () => {
    const client = nativeAuth({
      origin: 'https://example.com',
      apiAddress: 'https://api.example.com',
      expirySeconds: 3600,
      blockHashShard: 0,
      extraInfo: { user: 'test' },
      gatewayUrl: '',
      extraRequestHeaders: {},
    });

    // Call initialize without providing latestBlockInfo so it calls getLatestBlockHash internally
    const token = await client.initialize();

    // Check that the token contains the mocked hash
    expect(token).toContain('mockedhash123');

    // Verify that getLatestBlockHash was called once
    expect(getLatestBlockHash).toHaveBeenCalledTimes(1);
  });

  it('Initialize should throw error if block hash is missing', async () => {
    // Mock getLatestBlockHash to return null simulating failure
    (getLatestBlockHash as jest.Mock).mockResolvedValueOnce(null);

    const client = nativeAuth({
      origin: 'https://example.com',
      apiAddress: 'https://api.example.com',
      expirySeconds: 3600,
      blockHashShard: 0,
      extraInfo: {},
      gatewayUrl: '',
      extraRequestHeaders: {},
    });

    await expect(client.initialize()).rejects.toThrow('Failed to retrieve latest block hash');
  });
});
