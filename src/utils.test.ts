import { urldesafe, decrypt, urlensafe } from './utils';

const originalData =
  '{"version":2,"type":"user_created","typeTitle":"User created","event":"user_created","eventTitle":"User created","aid":"xxxxxxxxxx","uid":"PNIxxxxxxxxxxxx","timestamp":"1608697694"}';

describe('urlensafe', () => {
  it('should replace unsafe characters with safe ones and return base64 string', () => {
    // Expected result is the same data generated with PHP SDK
    expect(urlensafe(originalData)).toEqual(
      'eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoidXNlcl9jcmVhdGVkIiwidHlwZVRpdGxlIjoiVXNlciBjcmVhdGVkIiwiZXZlbnQiOiJ1c2VyX2NyZWF0ZWQiLCJldmVudFRpdGxlIjoiVXNlciBjcmVhdGVkIiwiYWlkIjoieHh4eHh4eHh4eCIsInVpZCI6IlBOSXh4eHh4eHh4eHh4eCIsInRpbWVzdGFtcCI6IjE2MDg2OTc2OTQifQ'
    );
  });
});

describe('urldesafe', () => {
  it('should replace safe characters with unsafe ones in base64 and return buffer', () => {
    const base64 =
      'eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoidXNlcl9jcmVhdGVkIiwidHlwZVRpdGxlIjoiVXNlciBjcmVhdGVkIiwiZXZlbnQiOiJ1c2VyX2NyZWF0ZWQiLCJldmVudFRpdGxlIjoiVXNlciBjcmVhdGVkIiwiYWlkIjoieHh4eHh4eHh4eCIsInVpZCI6IlBOSXh4eHh4eHh4eHh4eCIsInRpbWVzdGFtcCI6IjE2MDg2OTc2OTQifQ';
    // Expected result is the same data generated with PHP SDK
    const result = urldesafe(base64).toString('utf8');
    expect(result).toEqual(originalData);
  });
});

describe('decrypt', () => {
  it('should decrypt data with correct private key (larger than 32 characters)', () => {
    const privateKey = '0123456789012345678901234567890123456789';
    // Encrypted data using PHP SDK with the above private key
    const encrypted =
      '0-vh0gA_dznqDwF56CFcUjBHL1T5HFKxN41caCTvPPOcuQ4qGW6sBe3i4fN_rO_ca-uA4r73cSdz37oE1E2cM8N42TMOYKd9D_RQ7B3P7HU-FfAeUTlzBw2dg1Ls50_K9GbF9ejWHwzvUiH6aYn21nw_IXE6rizTJ-eJHm9L1px0AaDZyd3kQCqzwnXsfyAw4n1qKZttk5k2nwTS9lHGHRgjTNdyZeo6rPzeJZ8_LHuKm925F80lVZJ8RGte0975~~~iGwxI_eSgZ4zaqPNUNuTAZTEEZ92HRdGluGJG84Nsc0';
    expect(decrypt(privateKey, encrypted)).toEqual(originalData);
  });

  it('should decrypt data with correct private key (shorter than 32 characters)', () => {
    const privateKey = '0123456789';
    // Encrypted data using PHP SDK with the above private key
    const encrypted =
      'sjUlbOPA5Lurt8I7IvywXYnD7HSpn-52NqXkGHKosoBE8nLtduZEdYuHpS6QTrC0JgYfs-BEkjjSoGPchoCFjSZAY2qgih7x-BEhEerfSPbkUGmrFfqyI3ZbAByLEos5r8vb5XN5r1qNuhUt8905Qpfrs_usIRvBMpTqPCViRopj6KG4Em_zhoyUxwIK6V6pJk7KhAoWMUSJxfug-N-j0rJA0WcmFxC9qAZC-7ZE_GOMhUSMComB21N4s7_GIR_w~~~YzRChs62MRqR_cG-Zq3tCd1vtp0wLRvhtiUonrvnV4Q';
    expect(decrypt(privateKey, encrypted)).toEqual(originalData);
  });

  it('should throw an error when providing incorrect private key', () => {
    const privateKey = 'xxxxxxxx';
    const encrypted =
      'sjUlbOPA5Lurt8I7IvywXYnD7HSpn-52NqXkGHKosoBE8nLtduZEdYuHpS6QTrC0JgYfs-BEkjjSoGPchoCFjSZAY2qgih7x-BEhEerfSPbkUGmrFfqyI3ZbAByLEos5r8vb5XN5r1qNuhUt8905Qpfrs_usIRvBMpTqPCViRopj6KG4Em_zhoyUxwIK6V6pJk7KhAoWMUSJxfug-N-j0rJA0WcmFxC9qAZC-7ZE_GOMhUSMComB21N4s7_GIR_w~~~YzRChs62MRqR_cG-Zq3tCd1vtp0wLRvhtiUonrvnV4Q';
    expect(() => {
      decrypt(privateKey, encrypted);
    }).toThrow();
  });
});
