import { autoinject } from 'aurelia-framework';
import { FluentRuleCustomizer, Rule, ValidateEvent, validateTrigger, ValidationController, ValidationControllerFactory, ValidationRules, Validator } from 'aurelia-validation';
import { Person, PersonClass } from '../person';

interface PersonForm {
  age: string;
  name: string;
}

@autoinject
export class AureliaValidationDemo {

  private readonly builder: FluentRuleCustomizer<Person, any> =
    ValidationRules
      .ensure((x: PersonClass) => x.age)
      .between(0, 100)
      .ensure((x: PersonClass) => x.name)
      .required()

  private readonly personFormRules: Rule<Person, unknown>[][] = this.builder.rules;

  private controller: ValidationController;

  public personForm: PersonForm = {
    age: '',
    name: ''
  }

  public constructor(
    controllerFactory: ValidationControllerFactory,
    private validator: Validator) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.change;
    this.validator = validator;

    // this.builder.on(this.personForm);
    console.log({...this.personForm});
    this.controller.addObject(this.personForm, this.personFormRules);
    console.log({...this.personForm});

    this.controller.subscribe(async (event: ValidateEvent) => {
      console.log(event);
    })
  }

  public async onClickValidate(): Promise<void> {
    const result = await this.validator.validateObject(this.personForm, this.personFormRules);
    this.personForm = {
      age: '24',
      name: 'Lautaro Bermejo'
    }
    console.log(result);
  }
}
