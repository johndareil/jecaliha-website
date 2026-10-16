import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: '6ad1c3e109a148865917c0db',
  serverUrl: 'https://jecaliha-builders-corporation-copy-5917c0db.base44.app'
});

export const db = base44;
export default base44;