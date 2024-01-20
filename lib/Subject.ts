export class Subject<T> {
  private value: T;
  private subscribers: Set<(v: T) => void> = new Set();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  public getValue = (): T => {
    return this.value;
  };

  public subscribe = (fn: (value: T) => void): (() => void) => {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  };

  public next = (value: T): void => {
    this.value = value;
    this.subscribers.forEach((fn) => fn(value));
  };
}
