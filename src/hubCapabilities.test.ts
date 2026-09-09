import { describe, expect, it } from 'vitest';

import { generationHintFromFirmware, generationHintFromHubName } from './hubCapabilities.js';

describe('generationHintFromFirmware', () => {
  it('identifies a Gen 1 hub from mainProcessor.revision', () => {
    // Observed on a real Gen 1 hub: /api/fwversion returns
    // {"firmware":{"mainProcessor":{"name":"PowerView Hub","revision":1,...}}}
    expect(generationHintFromFirmware({ mainProcessor: { revision: 1 } })).toBe('gen1');
  });

  it('identifies a Gen 2 hub from mainProcessor.revision', () => {
    expect(generationHintFromFirmware({ mainProcessor: { revision: 2 } })).toBe('gen2');
  });

  it('returns unknown when the firmware block is absent', () => {
    expect(generationHintFromFirmware(undefined)).toBe('unknown');
    expect(generationHintFromFirmware({})).toBe('unknown');
  });

  it('documents why the hub name alone cannot work', () => {
    // Both generations report this same mainProcessor.name.
    expect(generationHintFromHubName('PowerView Hub')).toBe('unknown');
  });
});
