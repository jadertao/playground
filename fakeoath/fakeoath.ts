class Fakeoath {
  static resolve(arg: any) { return new Fakeoath(arg) }
  static reject() { }
  static all() { }
  static race() { }
  constructor(arg: any) {
    this['[[status]]'] = 'pending'
    // if (this.detect(arg, 'function')) {
    //   arg()
    // }
    this['[[value]]'] = arg
  }
  public then() { }
  public catch() { }
  private value: any
  private detect(target, type: string): boolean {
    return Object.prototype.toString.call(target).toLowerCase().includes(type.toLowerCase())
  }

}

