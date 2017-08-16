class Fakeoath {
  static resolve(arg: any): Fakeoath {
    let _oath = new Fakeoath(arg)
    _oath['[[status]]'] = 'resolve'
    return _oath
  }
  static reject(arg: any): Fakeoath {
    let _oath = new Fakeoath(arg)
    _oath['[[status]]'] = 'reject'
    return _oath
  }
  static all() { }
  static race() { }

  constructor(arg: any) {
    this['[[status]]'] = 'pending'
    this['[[value]]'] = arg
    switch (Object.prototype.toString.call(arg).toLowerCase().slice(8, -1)) {
      case 'function':
        const resolve = v => { this['[[status]]'] = 'resolved', this['[[value]]'] = v }
        const reject = v => { this['[[status]]'] = 'rejected', this['[[value]]'] = v }
        arg(resolve, reject)
        break
      case 'number':
      case 'string':
        this['[[status]]'] = 'resolved'
        this['[[value]]'] = arg
        break
      default:
        this['[[status]]'] = 'resolved'
        this['[[value]]'] = arg
      //throw new Error('no argument')
    }

  }

  public then(onFullfilled: any, onRejected: any) {
    return this['[[status]]'] === 'resolved'
      ? new Fakeoath(onFullfilled(this['[[value]]']))
      : new Fakeoath(onRejected(this['[[value]]']))
  }
  public catch() { }

}

