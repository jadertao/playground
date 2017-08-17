class Fakeoath {
  static resolve(rsl: any): Fakeoath {
    let _oath = new Fakeoath(rsl)
    _oath['[[status]]'] = 'resolve'
    return _oath
  }
  static reject(rsl: any): Fakeoath {
    let _oath = new Fakeoath(rsl)
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

  constructor(rsl: any) {
    this['[[status]]'] = 'pending'

    if (Object.prototype.toString.call(rsl).toLowerCase().slice(8, -1) === 'function') {
      this['[[value]]'] = undefined
      const resolve = v => {
        setTimeout(() => {
          this['[[status]]'] = 'resolved'
          this['[[value]]'] = v
          if (this.fullfilledCb) this.fullfilledCb()
        }, 0)
      }

      const reject = v => {
        setTimeout(() => {
          this['[[status]]'] = 'rejected'
          this['[[value]]'] = v
          if (this.rejectedCb) this.rejectedCb()
        }, 0)
      }
      try {
        const _value = rsl(resolve, reject)
        if (_value && !this['[[value]]']) this['[[value]]'] = _value
      } catch (e) {
        this['[[status]]'] = 'rejected'
        this['[[value]]'] = e
        setTimeout(() => {
          throw e
        }, 0)
      }
    } else {
      throw `Uncaught: Fakeoath resolver ${rsl} is not a function`
    }
  }

  public then(f: any, r?: any): Fakeoath {
    let _oath = new Fakeoath((resolve, reject) => { })
    this.fullfilledCb = () => {
      _oath['[[value]]'] = f(this['[[value]]'])
      _oath['[[status]]'] = 'resolved'
    }
    this.rejectedCb = () => {
      _oath['[[value]]'] = r(this['[[value]]'])
      _oath['[[status]]'] = 'resolved'
    }
    return _oath
  }

  public catch(r: any): Fakeoath {
    if (this['[[status]]'] === 'rejected') {
      return new Fakeoath((resolve, reject) => {
        r(this['[[value]]'])
        resolve()
      })
    } else {
      return this
    }
  }

  private fullfilledCb
  private rejectedCb
  private errorHandler
}
