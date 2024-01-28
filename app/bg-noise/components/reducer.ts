import { arrayDiff, generateRandomId } from "./helpers";
import { Reducer } from "react";

export type Color = {
  id: string;
  code: string;
  stop: number;
};

export type State = {
  colors: Color[];
  gradientAngle: number;
  gradientType: "linear-gradient" | "radial-gradient";
  noiseType: "turbulence" | "fractalNoise";
  noiseIntensity: number;
  noiseOpacity: number;
};

export const defaultState: State = {
  colors: [
    {
      id: generateRandomId(),
      code: "#000000",
      stop: 0,
    },
  ],
  gradientAngle: 0,
  gradientType: "linear-gradient",
  noiseType: "turbulence",
  noiseIntensity: 0.5,
  noiseOpacity: 0.5,
};

type AddColor = {
  type: "ADD_COLOR";
  payload: {
    code?: string;
  };
};

type RemoveColor = {
  type: "REMOVE_COLOR";
  payload: {
    id: string;
  };
};

type SwapColors = {
  type: "SWAP_COLORS";

  payload: {
    id1: string;
    id2: string;
  };
};

type UpdateColorCode = {
  type: "UPDATE_COLOR_CODE";
  payload: {
    id: string;
    code?: string;
  };
};

type UpdateColorStops = {
  type: "UPDATE_COLOR_STOPS";
  payload: {
    colorStopsArray: number[];
  };
};

type UpdateGradientAngle = {
  type: "UPDATE_GRADIENT_ANGLE";
  payload: {
    gradientAngle: number;
  };
};

type UpdateGradientType = {
  type: "UPDATE_GRADIENT_TYPE";
  payload: {
    gradientType: "linear-gradient" | "radial-gradient";
  };
};

type UpdateNoiseType = {
  type: "UPDATE_NOISE_TYPE";
  payload: {
    noiseType: "turbulence" | "fractalNoise";
  };
};

type UpdateNoiseIntensity = {
  type: "UPDATE_NOISE_INTENSITY";
  payload: {
    noiseIntensity: number;
  };
};

type UpdateNoiseOpacity = {
  type: "UPDATE_NOISE_OPACITY";
  payload: {
    noiseOpacity: number;
  };
};

type Reset = {
  type: "RESET";
  payload: {};
};

export type Action =
  | AddColor
  | RemoveColor
  | SwapColors
  | UpdateColorCode
  | UpdateColorStops
  | UpdateGradientAngle
  | UpdateGradientType
  | UpdateNoiseType
  | UpdateNoiseIntensity
  | UpdateNoiseOpacity
  | Reset;

type Handler<T extends Action> = (payload: T["payload"], state: State) => State;

const addColor: Handler<AddColor> = (payload, state) => {
  let nextId = generateRandomId();

  const colorWithBiggestStop = state.colors.reduce((acc, color) => {
    if (color.stop > acc.stop) {
      return color;
    }
    return acc;
  }, state.colors[0]);

  let updatedBiggestColorStopValue = colorWithBiggestStop.stop;
  if (updatedBiggestColorStopValue > 95) {
    updatedBiggestColorStopValue = 95;
  }

  return {
    ...state,
    colors: [
      ...state.colors,
      {
        id: nextId,
        code: payload.code || "#000000",
        stop: 100,
      },
    ].map((color) => {
      if (color.id === colorWithBiggestStop.id) {
        return {
          ...color,
          stop: updatedBiggestColorStopValue,
        };
      }
      return color;
    }),
  };
};

const removeColor: Handler<RemoveColor> = (payload, state) => {
  return {
    ...state,
    colors: state.colors.filter((color) => color.id !== payload.id),
  };
};

const swapColors: Handler<SwapColors> = (payload, state) => {
  const { id1, id2 } = payload;

  const color1 = state.colors.find((color) => color.id === id1);
  const color2 = state.colors.find((color) => color.id === id2);

  if (!color1 || !color2) {
    return state;
  }

  const color1Index = state.colors.indexOf(color1);
  const color2Index = state.colors.indexOf(color2);

  const colors = [...state.colors];

  colors[color1Index] = {
    ...color2,
    stop: color1.stop,
  };

  colors[color2Index] = {
    ...color1,
    stop: color2.stop,
  };

  return {
    ...state,
    colors,
  };
};

const updateColorCode: Handler<UpdateColorCode> = (payload, state) => {
  const { id, code } = payload;

  return {
    ...state,
    colors: state.colors.map((color) => {
      if (color.id === id) {
        return {
          ...color,
          code: code || color.code,
        };
      }
      return color;
    }),
  };
};

const updateColorStops: Handler<UpdateColorStops> = (payload, state) => {
  const currentStops = state.colors.map((color) => color.stop);

  let updatedColorId = "";
  const diff = arrayDiff(payload.colorStopsArray, currentStops);

  if (!diff) {
    return state;
  }

  for (const color of state.colors) {
    if (!payload.colorStopsArray.includes(color.stop)) {
      updatedColorId = color.id;
      break;
    }
  }

  const updatedColorIndex = state.colors
    .map((color, index) => (color.id === updatedColorId ? index : undefined))
    .filter((index) => index !== undefined)[0];

  if (updatedColorIndex === undefined) {
    return state;
  }

  const min = state.colors?.[updatedColorIndex - 1]?.stop ?? 0;
  const max = state.colors?.[updatedColorIndex + 1]?.stop ?? 100;

  if (diff >= min && diff <= max) {
    return {
      ...state,
      colors: state.colors.map((color) => {
        if (color.id === updatedColorId) {
          return {
            ...color,
            stop: diff,
          };
        }
        return color;
      }),
    };
  }
  return state;
};

const updateGradientAngle: Handler<UpdateGradientAngle> = (payload, state) => {
  return {
    ...state,
    gradientAngle: payload.gradientAngle,
  };
};

const updateGradientType: Handler<UpdateGradientType> = (payload, state) => {
  return {
    ...state,
    gradientType: payload.gradientType,
  };
};

const updateNoiseType: Handler<UpdateNoiseType> = (payload, state) => {
  return {
    ...state,
    noiseType: payload.noiseType,
  };
};
const updateNoiseIntensity: Handler<UpdateNoiseIntensity> = (
  payload,
  state
) => {
  return {
    ...state,
    noiseIntensity: payload.noiseIntensity,
  };
};

const updateNoiseOpacity: Handler<UpdateNoiseOpacity> = (payload, state) => {
  return {
    ...state,
    noiseOpacity: payload.noiseOpacity,
  };
};

const reset = (): State => defaultState;

export const reducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "ADD_COLOR": {
      return addColor(action.payload, state);
    }
    case "REMOVE_COLOR": {
      return removeColor(action.payload, state);
    }
    case "SWAP_COLORS": {
      return swapColors(action.payload, state);
    }
    case "UPDATE_COLOR_CODE": {
      return updateColorCode(action.payload, state);
    }
    case "UPDATE_COLOR_STOPS": {
      return updateColorStops(action.payload, state);
    }
    case "UPDATE_GRADIENT_ANGLE": {
      return updateGradientAngle(action.payload, state);
    }
    case "UPDATE_GRADIENT_TYPE": {
      return updateGradientType(action.payload, state);
    }
    case "UPDATE_NOISE_TYPE": {
      return updateNoiseType(action.payload, state);
    }
    case "UPDATE_NOISE_INTENSITY": {
      return updateNoiseIntensity(action.payload, state);
    }
    case "UPDATE_NOISE_OPACITY": {
      return updateNoiseOpacity(action.payload, state);
    }
    case "RESET": {
      return reset();
    }
    default:
      return state;
  }
};
