# Piano Security Utils

This is unofficial Node.js porting of `TPSecurityUtils.php` included in [Piano PHP SDK](https://docs.piano.io/sdk/).

## Installation

```text
npm install piano-security-utils
```

or

```text
yarn add piano-security-utils
```

## Usage examples

### Decrypt an encrypted webhook data

```typescript
import { decrypt } from 'piano-security-utils';

const webhookData = '<encrypted webholk data>';
const privateKey = '<your piano private key>';

const result = decrypt(privateKey, webhookData);
```

## Status

The following `TPSecurityUtils` methods are currently supported:

- [ ] hashCode
- [ ] encrypt
- [x] urlensafe
- [x] urldesafe
- [x] decrypt
- [ ] hashHmacSha1
- [ ] hashHmacSha256
- [ ] hashHmacSha
- [ ] createUserRef
