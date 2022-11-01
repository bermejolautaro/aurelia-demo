import { IPartnerDigitalForm, PartnerDigitalForm } from "./partner-digital-form";

describe('Partner Digital Form', () => {
  loginIsRequiredWhenActiveIsEnabled();
  externalSystemIsRequiredWhenActiveIsEnabled();
})

function externalSystemIsRequiredWhenActiveIsEnabled() {
  it('WHEN active is enable AND external system is empty THEN error because external system should be required', () => {
    const partialForm: IPartnerDigitalForm = withForm('VALIDLOGIN', null);

    const result = PartnerDigitalForm.tryCreate(partialForm);
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.find(x => x === 'External System is required')).toBe('External System is required');
    } else {
      throw new Error('result should be an array');
    }
  });

  it('WHEN active is enable AND external system is not empty THEN ok', () => {
    const partialForm: IPartnerDigitalForm = withForm('VALIDLOGIN', 1);
    const result = PartnerDigitalForm.tryCreate(partialForm);
    expect(result instanceof PartnerDigitalForm).toBe(true);
  });
}

function loginIsRequiredWhenActiveIsEnabled() {
  it('WHEN active is enable AND login is empty THEN error because login should be required', () => {
    const partialForm: IPartnerDigitalForm = withForm('', 1);

    const result = PartnerDigitalForm.tryCreate(partialForm);
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.find(x => x === 'Collaborator login is required')).toBe('Collaborator login is required');
    } else {
      throw new Error('result should be an array');
    }
  });

  it('WHEN active is enable AND login is not empty THEN ok', () => {
    const partialForm: IPartnerDigitalForm = withForm('VALIDLOGIN', 1);

    const result = PartnerDigitalForm.tryCreate(partialForm);
    expect(result instanceof PartnerDigitalForm).toBe(true);
  });
}

function withForm(login: string, externalSystem: number | null = null) {
  return {
    active: true,
    login,
    associateAuthorizationCode: '',
    authorizationDate: '',
    authorizerName: '',
    category: '',
    digitalCredential: null,
    digitalRole: null,
    emailAddress: '',
    externalEnrollment: true,
    externalSystem,
    masterAuthorizationCode: '',
    phoneNumber: '',
    selectedDigitalPartner: null
  };
}
