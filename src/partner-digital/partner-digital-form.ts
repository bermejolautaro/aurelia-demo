export type Category = 'Standard' | 'Master' | 'Associate';

export class MasterForm {
  public readonly kind: Category = 'Master'
  public readonly authorizerName: string;
  public readonly phoneNumber: string;
  public readonly emailAddress: string;
  public readonly authorizationDate: string;
  public readonly masterAuthorizationCode: string;

  private constructor(
    authorizerName: string,
    phoneNumber: string,
    emailAddress: string,
    authorizationDate: string,
    masterAuthorizationCode: string
  ) {
    this.authorizerName = authorizerName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
    this.authorizationDate = authorizationDate;
    this.masterAuthorizationCode = masterAuthorizationCode;
  }

  public static tryCreate(
    authorizerName: string,
    phoneNumber: string,
    emailAddress: string,
    authorizationDate: string,
    masterAuthorizationCode: string
  ): MasterForm | string[] {
    const errors: string[] = [];

    if (!authorizerName) {
      errors.push('Authorizer Name is required');
    }

    if (authorizerName.length > 50) {
      errors.push('Authorizer Name must be less than 50 characters');
    }

    if (!phoneNumber) {
      errors.push('Phone number is required');
    }

    if (phoneNumber.length !== 10) {
      errors.push('Phone number must be exactly 10 characters');
    }

    if (!emailAddress) {
      errors.push('Email address is required');
    }

    if (emailAddress.length > 20) {
      errors.push('Email address must be less than 20 characters');
    }

    if (!emailAddress.includes('@')) {
      errors.push('Invalid email. Must have an @ character');
    }

    errors.push(...validateAuthorizationCode(masterAuthorizationCode));

    if (errors.length > 0) {
      return errors;
    } else {
      return new MasterForm(authorizerName, phoneNumber, emailAddress, authorizationDate, masterAuthorizationCode);
    }
  }
}

export class AssociateForm {
  public readonly kind: Category = 'Associate'

  public readonly associateAuthorizationCode: string;
  public readonly selectedDigitalPartner: number;

  private constructor(
    associateAuthorizationCode: string,
    selectedDigitalPartner: number
  ) {
    this.associateAuthorizationCode = associateAuthorizationCode;
    this.selectedDigitalPartner = selectedDigitalPartner;
  }

  public static tryCreate(
    associateAuthorizationCode: string,
    selectedDigitalPartner: number | null
  ): AssociateForm | string[] {
    const errors: string[] = [];

    errors.concat(validateAuthorizationCode(associateAuthorizationCode));

    if (!selectedDigitalPartner) {
      errors.push('A selected digital partner is required');
    }

    if (errors.length > 0) {
      return errors;
    } else {
      if (!selectedDigitalPartner) throw new Error('Impossible state');
      return new AssociateForm(associateAuthorizationCode, selectedDigitalPartner);
    }
  }
}

export class StandardForm {
  public readonly kind: Category = 'Standard';
}

export class ActiveCommonForm {
  public readonly kind: string = 'active'

  public readonly externalEnrollment: boolean;
  public readonly active: boolean = true;
  public readonly login: string;
  public readonly externalSystem: number;
  public readonly digitalRole: number | null;
  public readonly digitalCredential: number | null

  private constructor(
    externalEnrollment: boolean,
    login: string,
    externalSystem: number,
    digitalRole: number | null,
    digitalCredential: number | null
  ) {
    this.externalEnrollment = externalEnrollment;
    this.login = login;
    this.externalSystem = externalSystem;
    this.digitalRole = digitalRole;
    this.digitalCredential = digitalCredential;
  }

  public static tryCreate(
    externalEnrollment: boolean,
    login: string,
    externalSystem: number | null,
    digitalRole: number | null,
    digitalCredential: number | null
  ): ActiveCommonForm | string[] {
    const errors: string[] = [];

    if (!login) {
      errors.push('Collaborator login is required');
    }

    if (login.length > 50) {
      errors.push('Collaborator login must be less than 50 characters');
    }

    if (!login.match(/^[0-9A-Z]+$/)) {
      errors.push('Collaborator login must be all uppercase characters');
    }

    if (!externalSystem) {
      errors.push('External System is required');
    }

    if (errors.length > 0) {
      return errors;
    } else {
      if (!externalSystem) throw new Error('Impossible state: external system should not be falsy here.');

      return new ActiveCommonForm(externalEnrollment, login, externalSystem, digitalRole, digitalCredential);
    }
  }
}

export class DeactiveCommonForm {
  public readonly kind: string = 'deactive';

  public readonly externalEnrollment: boolean;
  public readonly active: boolean = false;
  public readonly login: string;
  public readonly externalSystem: number | null;
  public readonly digitalRole: number | null;
  public readonly digitalCredential: number | null

  private constructor(
    externalEnrollment: boolean,
    login: string,
    externalSystem: number | null,
    digitalRole: number | null,
    digitalCredential: number | null
  ) {
    this.externalEnrollment = externalEnrollment;
    this.login = login;
    this.externalSystem = externalSystem
    this.digitalRole = digitalRole,
      this.digitalCredential = digitalCredential;
  }

  public static tryCreate(
    externalEnrollment: boolean,
    login: string,
    externalSystem: number | null,
    digitalRole: number | null,
    digitalCredential: number | null
  ): DeactiveCommonForm | string[] {
    return new DeactiveCommonForm(externalEnrollment, login, externalSystem, digitalRole, digitalCredential);
  }
}

export class PartnerDigitalForm {

  private constructor(
    public readonly activeOrDeactiveCommonForm: ActiveCommonForm | DeactiveCommonForm,
    public readonly masterOrAssociateForm: StandardForm | MasterForm | AssociateForm
  ) { }

  public static tryCreate(partialForm: IPartnerDigitalForm): PartnerDigitalForm | string[] {
    const errors: string[] = [];
    let activeOrDeactiveCommonForm: ActiveCommonForm | DeactiveCommonForm | null = null;

    if (partialForm.active) {
      const result = tryCreateActiveCommonForm(partialForm);

      if (result instanceof ActiveCommonForm) {
        activeOrDeactiveCommonForm = result;
      } else {
        errors.push(...result);
      }
    } else {
      const result = tryCreateDeactiveCommonForm(partialForm);

      if (result instanceof DeactiveCommonForm) {
        activeOrDeactiveCommonForm = result;
      } else {
        errors.push(...result);
      }
    }

    let masterOrAssociateOrStandardForm: MasterForm | AssociateForm | StandardForm = new StandardForm();

    const category = partialForm.category as Category;

    if (category === 'Master') {
      const result = tryCreateMasterForm(partialForm);

      if (result instanceof MasterForm) {
        masterOrAssociateOrStandardForm = result;
      } else {
        errors.push(...result);
      }

    } else if (category === 'Associate') {
      const result = tryCreateAssociateForm(partialForm);

      if (result instanceof AssociateForm) {
        masterOrAssociateOrStandardForm = result;
      } else {
        errors.push(...result);
      }
    } else {
      masterOrAssociateOrStandardForm = new StandardForm();
    }

    if (errors.length > 0) {
      return errors;
    }

    if (!activeOrDeactiveCommonForm) {
      throw new Error('Impossible state');
    }

    return new PartnerDigitalForm(activeOrDeactiveCommonForm, masterOrAssociateOrStandardForm);
  }
}

export interface IPartnerDigitalForm {
  // Common
  externalEnrollment: boolean;
  active: boolean;
  login: string;
  externalSystem: number | null;
  digitalRole: number | null;
  digitalCredential: number | null;
  category: string;

  // Master
  authorizerName: string;
  phoneNumber: string;
  emailAddress: string;
  authorizationDate: string;
  masterAuthorizationCode: string;

  // Associate
  associateAuthorizationCode: string;
  selectedDigitalPartner: number | null;
}

export function createDefaultForm(): IPartnerDigitalForm {
  return {
    externalEnrollment: false,
    active: false,
    login: '',
    externalSystem: null,
    digitalRole: null,
    digitalCredential: null,
    category: 'Standard',
    authorizerName: '',
    phoneNumber: '',
    emailAddress: '',
    authorizationDate: '',
    masterAuthorizationCode: '',
    associateAuthorizationCode: '',
    selectedDigitalPartner: null
  };
}

function tryCreateActiveCommonForm(partialForm: IPartnerDigitalForm): ActiveCommonForm | string[] {
  return ActiveCommonForm.tryCreate(
    partialForm.externalEnrollment,
    partialForm.login,
    partialForm.externalSystem,
    partialForm.digitalRole,
    partialForm.digitalCredential);
}

function tryCreateDeactiveCommonForm(partialForm: IPartnerDigitalForm): DeactiveCommonForm | string[] {
  return DeactiveCommonForm.tryCreate(
    partialForm.externalEnrollment,
    partialForm.login,
    partialForm.externalSystem,
    partialForm.digitalRole,
    partialForm.digitalCredential);
}

function tryCreateMasterForm(partialForm: IPartnerDigitalForm): MasterForm | string[] {
  return MasterForm.tryCreate(
    partialForm.authorizerName,
    partialForm.phoneNumber,
    partialForm.emailAddress,
    partialForm.authorizationDate,
    partialForm.masterAuthorizationCode);
}

function tryCreateAssociateForm(partialForm: IPartnerDigitalForm): AssociateForm | string[] {
  return AssociateForm.tryCreate(
    partialForm.associateAuthorizationCode,
    partialForm.selectedDigitalPartner);
}

function validateAuthorizationCode(authorizationCode: string): string[] {
  const errors: string[] = []
  if (!authorizationCode) {
    errors.push('Authorization Code is required');
  }

  if (authorizationCode.length !== 6) {
    errors.push('Authorization code must be exactly 6 characters');
  }

  if (!authorizationCode.match(/^[0-9a-zA-Z]+$/)) {
    errors.push('Authorization code must be alphanumeric characters');
  }

  return errors;
}
