import { checkIsValidSender } from '../helpers/checkIsValidSender';

describe('checkIsValidSender tests', () => {
  test('should return true if senderAccount is null', () => {
    expect(
      checkIsValidSender(
        null,
        'drt1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q6pec6c'
      )
    ).toBe(true);
  });

  test('should return true if address matches senderAccount.address', () => {
    const mockAccount = {
      address: 'drt1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6sh0rz42'
    };

    expect(
      checkIsValidSender(
        mockAccount,
        'drt1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6sh0rz42'
      )
    ).toBe(true);
  });

  test('should return true if address matches senderAccount.activeGuardianAddress', () => {
    const mockAccount = {
      address: 'drt1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6sh0rz42',
      activeGuardianAddress:
        'drt1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqa7ealn'
    };
    expect(
      checkIsValidSender(
        mockAccount,
        'drt1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqa7ealn'
      )
    ).toBe(true);
  });

  test('should return false if address does not match any in senderAccount', () => {
    const mockAccount = {
      address: 'drt1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6sh0rz42',
      activeGuardianAddress:
        'drt1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqa7ealn'
    };
    expect(
      checkIsValidSender(
        mockAccount,
        'drt1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q6pec6c'
      )
    ).toBe(false);
  });
});
