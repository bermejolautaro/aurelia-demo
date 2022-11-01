import { createDefaultForm, IPartnerDigitalForm, PartnerDigitalForm } from "./partner-digital-form";
import { Rule, ValidationRules } from 'aurelia-validation';

export class PartnerDigital {
  public readonly form: IPartnerDigitalForm = createDefaultForm();
  private readonly rules: Rule<IPartnerDigitalForm, unknown>[][] = getValidationRulesForPartnerDigitalForm();

  public constructor() {

  }

  public save(): void {
    const result = PartnerDigitalForm.tryCreate(this.form);

    console.log(result);
  }

  public debug(): void {
    console.log(this.form);
  }
}

function getValidationRulesForPartnerDigitalForm(): Rule<IPartnerDigitalForm, any>[][] {
  return ValidationRules
    .ensure((x: IPartnerDigitalForm) => x.login)
    .required()
    .maxLength(50)
    .rules;
}
