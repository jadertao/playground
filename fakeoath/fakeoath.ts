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

  public static toString(): string {
    return 'Fakeoath() { [native code] }'
  }
  public static valueOf(): string {
    return 'Fakeoath() { [native code] }'
  }

  constructor(arg: any) {
    this['[[status]]'] = 'pending'

    switch (Object.prototype.toString.call(arg).toLowerCase().slice(8, -1)) {
      case 'function':
        this['[[value]]'] = undefined
        const resolve = v => {
          this['[[status]]'] = 'resolved'
          this['[[value]]'] = v
          if (this.fullfilledCb) this.fullfilledCb()
        }
        const reject = v => {
          this['[[status]]'] = 'rejected'
          this['[[value]]'] = v
          if (this.rejectedCb) this.rejectedCb()
        }
        this['[[value]]'] = arg(resolve, reject)
        break
      default:
        this['[[status]]'] = 'resolved'
        this['[[value]]'] = arg
      //throw new Error('no argument') 
    }
  }

  public then(f: any, r: any) {
    let _oath = new Fakeoath((f, r) => { })
    this.fullfilledCb = () => {
      _oath['[[value]]'] = f()
      _oath['[[value]]'] = 'resolved'
    }
    this.rejectedCb = () => {
      _oath['[[value]]'] = r()
      _oath['[[status]]'] = 'rejected'
    }
    return _oath
  }

  public catch() { }

  private fullfilledCb
  private rejectedCb
}
