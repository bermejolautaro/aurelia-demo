export class JsonValueConverter {
  public toView(value: unknown) {
    return JSON.stringify(value, null, 2);
  }
}
