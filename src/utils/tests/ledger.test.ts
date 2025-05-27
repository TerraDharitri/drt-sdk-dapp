import {
  openTransportReplayer,
  RecordStore
} from '@ledgerhq/hw-transport-mocker';
import { HWProvider } from '@terradharitri/sdk-hw-provider/out/hwProvider';
import LedgerApp from '@terradharitri/sdk-hw-provider/out/ledgerApp';

jest.mock('@terradharitri/sdk-hw-provider/out/ledgerApp', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAddress: jest.fn().mockResolvedValue({ address: 'mockAddress' }),
      setAddress: jest.fn().mockResolvedValue({}),
      signTransaction: jest.fn().mockResolvedValue('mockSignature'),
      signMessage: jest.fn().mockResolvedValue('mockSignature'),
      getAppConfiguration: jest.fn().mockResolvedValue({ version: '1.0.0' })
    };
  });
});

test('HWProvider login', async () => {
 const store = RecordStore.fromString(`
    => e016000000
    <= 000000050107426974636f696e034254439000
  `);
  const transport = await openTransportReplayer(store);

     const ledgerApp = new LedgerApp(transport);

  const provider = new HWProvider(ledgerApp);

  const address = await provider.login({ addressIndex: 0 });
  expect(address).toBe('mockAddress');
});
