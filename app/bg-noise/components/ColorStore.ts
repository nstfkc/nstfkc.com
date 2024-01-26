import { Subject } from "@/lib/Subject";
import { useState, useSyncExternalStore } from "react";

function generateRandomId(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function arrayDiff<T>(arr1: T[], arr2: T[]): T {
  for (const x of arr1) {
    if (!arr2.includes(x)) {
      return x;
    }
  }
}

type ColorCodes = Record<string, string>;
type ColorStops = Record<string, number>;

type State = {
  colorCodes: ColorCodes;
  colorStops: ColorStops;
  order: string[];
};

const id = generateRandomId();

const defaultState: State = {
  colorCodes: { [id]: "#000000" },
  colorStops: { [id]: 0 },
  order: [id],
};

export class ColorStore {
  colorCodes$: Subject<ColorCodes>;
  colorStops$: Subject<ColorStops>;
  order$: Subject<string[]>;

  constructor(initialState: State = defaultState) {
    const { colorCodes, colorStops, order } = initialState;
    this.colorCodes$ = new Subject(colorCodes);
    this.colorStops$ = new Subject(colorStops);
    this.order$ = new Subject(order);
  }

  getSubject = (key: keyof State) => {
    switch (key) {
      case "colorCodes":
        return this.colorCodes$;
      case "colorStops":
        return this.colorStops$;
      case "order":
        return this.order$;
    }
  };

  updateOrder = (id1: string, id2: string) => {
    const currentOrder = this.order$.getValue();
    const id1Index = currentOrder.indexOf(id1);
    const id2Index = currentOrder.indexOf(id2);
    currentOrder[id1Index] = id2;
    currentOrder[id2Index] = id1;

    const colorStops = this.colorStops$.getValue();

    const id1Stop = colorStops[id2];
    const id2Stop = colorStops[id1];

    this.colorStops$.next({ ...colorStops, [id1]: id1Stop, [id2]: id2Stop });
    this.order$.next([...currentOrder]);
  };

  updateColorCode = (id: string, code: string) => {
    this.colorCodes$.next({ ...this.colorCodes$.getValue(), [id]: code });
  };

  addColor = (code: string) => {
    let nextId = generateRandomId();

    for (const id of this.order$.getValue()) {
      if (id === nextId) {
      }
    }

    const [biggestColorStopKey, biggestColorStopValue] = Object.entries(
      this.colorStops$.getValue()
    ).reduce(
      (acc, [key, value]) => {
        if (value > acc?.[1]) {
          return [key, value];
        }
        return acc;
      },
      ["", 0]
    );

    let updatedBiggestColorStopValue = biggestColorStopValue;
    if (biggestColorStopValue > 95) {
      updatedBiggestColorStopValue = 95;
    }

    this.colorCodes$.next({ ...this.colorCodes$.getValue(), [nextId]: code });
    this.order$.next([...this.order$.getValue(), nextId]);
    this.colorStops$.next({
      ...this.colorStops$.getValue(),
      [biggestColorStopKey]: updatedBiggestColorStopValue,
      [nextId]: 100,
    });
  };

  removeColor = (id: string) => {
    const { [id]: _, ...nextColorCodes } = this.colorCodes$.getValue();
    const { [id]: __, ...nextColorStops } = this.colorStops$.getValue();
    const currentOrder = this.order$.getValue();
    this.colorCodes$.next(nextColorCodes);
    this.colorStops$.next(nextColorStops);
    this.order$.next(currentOrder.filter((orderId) => orderId !== id));
  };

  updateColorStops = (stop: number[]) => {
    const currentValue = this.colorStops$.getValue();
    const currentOrder = this.order$.getValue();

    const currentStops = currentOrder.map((id) => currentValue[id]);

    let updatedKey = "";
    const diff = arrayDiff(stop, currentStops);

    for (const [key, value] of Object.entries(currentValue)) {
      if (!stop.includes(value)) {
        updatedKey = key;
        break;
      }
    }

    const orderIndex = currentOrder.indexOf(updatedKey);
    const min = this.colorStops$.getValue()[currentOrder[orderIndex - 1]] ?? 0;
    const max =
      this.colorStops$.getValue()[currentOrder[orderIndex + 1]] ?? 100;

    if (diff >= min && diff <= max) {
      this.colorStops$.next({ ...currentValue, [updatedKey]: diff });
    }
  };

  reset = () => {
    this.colorCodes$.next(defaultState.colorCodes);
    this.colorStops$.next(defaultState.colorStops);
    this.order$.next(defaultState.order);
  };
}

export const useColorStoreState = <K extends keyof State>(
  instance: ColorStore,
  key: K
) => {
  const subject$ = instance.getSubject(key);
  return useSyncExternalStore(
    subject$.subscribe,
    subject$.getValue ?? (() => null as any),
    subject$.getValue ?? (() => null as any)
  ) as State[K];
};

export const useColorStore = (initialState = defaultState) => {
  const [instance] = useState(() => new ColorStore(initialState));

  return instance;
};
