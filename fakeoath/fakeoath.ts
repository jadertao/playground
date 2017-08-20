class Fakeoath {
  public static resolve(rsl: any): Fakeoath {
    const oath = new Fakeoath(rsl)
    oath['[[status]]'] = 'resolve'
    return oath
  }
  public static reject(rsl: any): Fakeoath {
    const oath = new Fakeoath(rsl)
    oath['[[status]]'] = 'reject'
    return oath
  }
  public static all() {
    // TODO:
  }
  static race() {
    // TODO:
  }

  public static toString(): string {
    return 'Fakeoath() { [native code] }'
  }
  public static valueOf(): string {
    return 'Fakeoath() { [native code] }'
  }

  private fullfilledCb
  private rejectedCb
  private errorHandler

  constructor(rsl: any) {
    this['[[status]]'] = 'pending'

    if (Object.prototype.toString.call(rsl).toLowerCase().slice(8, -1) === 'function') {
      this['[[value]]'] = undefined

      const resolve = (v) => {
        setTimeout(() => {
          this['[[status]]'] = 'resolved'
          this['[[value]]'] = v
          if (this.fullfilledCb) { this.fullfilledCb() }
        }, 0)
      }

      const reject = (v) => {
        setTimeout(() => {
          this['[[status]]'] = 'rejected'
          this['[[value]]'] = v
          if (this.rejectedCb) { this.rejectedCb() }
        }, 0)
      }
      try {
        setTimeout(() => {
          const value = rsl(resolve, reject)
          if (value && !this['[[value]]']) {
            this['[[value]]'] = value
          }
        }, 0)

      } catch (e) {
        this['[[status]]'] = 'rejected'
        this['[[value]]'] = e

        setTimeout(() => {
          throw e
        }, 0)
      }
    } else {
      throw new Error(`Uncaught: Fakeoath resolver ${rsl} is not a function`)
    }
  }

  public then(f: any, r?: any): Fakeoath {
    const oath = new Fakeoath((resolve, reject) => { })
    if (f) {
      this.fullfilledCb = () => {
        oath['[[value]]'] = f(this['[[value]]'])
        oath['[[status]]'] = 'resolved'
      }
    }
    if (r) {
      this.rejectedCb = () => {
        oath['[[value]]'] = r(this['[[value]]'])
        oath['[[status]]'] = 'resolved'
      }
    }
    if (this['[[value]]']) {
      if (this['[[status]]'] === 'resolved') {
        oath['[[value]]'] = f(this['[[value]]'])
        oath['[[status]]'] = 'resolved'
      } else {
        oath['[[value]]'] = r(this['[[value]]'])
        oath['[[status]]'] = 'resolved'
      }
    }

    return oath
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
}
