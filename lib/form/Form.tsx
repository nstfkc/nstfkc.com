import {
  ComponentProps,
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

import * as z from "zod";

class InputSubject {
  type: string;
  private state = {
    isDirty: false,
    value: null,
    error: null,
    isFocused: false,
    isTouched: false,
    isInvalid: false,
  };
  private subscribers: Set<any> = new Set();
  public validateFn: (value: any) => string | null;

  constructor(
    initialValue: any,
    type: string,
    validateFn?: (value: any) => string | null
  ) {
    this.state.value = initialValue;
    this.validateFn = validateFn ?? (() => null);
    this.type = type;
  }

  subscribe = (fn: any) => {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  };

  getState = () => {
    return this.state;
  };

  next = (state: any) => {
    this.state = {
      ...this.state,
      ...state,
      isInvalid: !!state.error,
    };
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };
}

interface FormProps<T = {}> extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: (e: any, formState: any) => void;
  schema?: z.ZodType<T>;
}

interface FormContextValue {
  validateSingleField: (name: string, value: any) => string | null;
  getInputValueSubject: (props: ComponentProps<typeof Input>) => InputSubject;
  getInputValueSubjectByName: (name: string) => InputSubject;
}

const FormContext = createContext({} as FormContextValue);

const inputTypeInitialValueMap = {
  text: "",
  number: 0,
  checkbox: false,
  email: "",
  password: "",
} as const;

export function Form<T>(props: FormProps<T>) {
  const { onSubmit, schema, ...rest } = props;

  const inputSubjectsRef = useRef<Map<string, InputSubject>>(new Map());

  const getInputValueSubject = (props: ComponentProps<typeof Input>) => {
    if (!inputSubjectsRef.current.has(props.name)) {
      const initialValue =
        props.value ??
        props.defaultValue ??
        inputTypeInitialValueMap?.[
          props.type! as keyof typeof inputTypeInitialValueMap
        ] ??
        "";

      inputSubjectsRef.current.set(
        props.name,
        new InputSubject(initialValue, props.type ?? "text", props.validate)
      );
    }
    return inputSubjectsRef.current.get(props.name)!;
  };

  const getInputValueSubjectByName = (name: string) => {
    return inputSubjectsRef.current.get(name)!;
  };

  const validateSingleField = (name: string, value: any) => {
    let values: Record<string, any> = {};

    for (const [name, inputSubject] of inputSubjectsRef.current.entries()) {
      const { value } = inputSubject.getState();
      values[name] = value;
    }

    values[name] = value;

    const inputSubject = inputSubjectsRef.current.get(name);

    if (inputSubject) {
      const error = inputSubject.validateFn(value);
      if (error) {
        return error;
      }
      if (schema) {
        const result = schema.safeParse(values);
        if (!result.success) {
          for (let schemaError of result.error.errors) {
            if (schemaError.path[0] === name) {
              return schemaError.message;
            }
          }
        }
      }
    }

    return null;
  };

  const beforeSubmit = () => {
    let values: Record<string, any> = {};
    let errors: Record<string, any> = {};

    for (const [name, inputSubject] of inputSubjectsRef.current.entries()) {
      const { value } = inputSubject.getState();
      const error = inputSubject.validateFn(values[name]);
      values[name] = value;
      errors[name] = error;
    }

    if (schema) {
      const result = schema.safeParse(values);

      if (!result.success) {
        result.error.errors.forEach((schemaError) => {
          errors[String(schemaError.path[0])] = schemaError.message;
        });
      }
    }

    for (const [name, inputSubject] of inputSubjectsRef.current.entries()) {
      const error = errors[name] ? errors[name] : null;
      inputSubject?.next({ error, isTouched: true });
    }

    return {
      errors,
      values,
    };
  };

  const reset = () => {
    for (const [, inputSubject] of inputSubjectsRef.current.entries()) {
      inputSubject.next({
        error: null,
        isDirty: false,
        isTouched: false,
        isInvalid: false,
        value:
          inputTypeInitialValueMap?.[
            inputSubject.type as keyof typeof inputTypeInitialValueMap
          ] ?? "",
      });
    }
  };

  return (
    <FormContext.Provider
      value={{
        getInputValueSubject,
        getInputValueSubjectByName,
        validateSingleField,
      }}
    >
      <form
        {...rest}
        onSubmit={(e) => {
          e.preventDefault();
          const { errors, values } = beforeSubmit();
          const hasErrors = Object.values(errors).some((error) => error);
          if (!hasErrors) {
            onSubmit(e, { values, reset });
          }
        }}
      />
    </FormContext.Provider>
  );
}

export function useInputState(props: ComponentProps<typeof Input>) {
  const { getInputValueSubject } = useContext(FormContext);

  const subject = getInputValueSubject(props);
  return useSyncExternalStore(
    subject.subscribe,
    subject.getState,
    subject.getState
  );
}

export const Input = (
  props: ComponentProps<"input"> & {
    name: string;
    validate?: (value: any) => string | null;
  }
) => {
  const {
    validate = () => null,
    defaultValue: _,
    onChange,
    onBlur,
    onFocus,
    ...inputProps
  } = props;
  const { getInputValueSubject, validateSingleField } = useContext(FormContext);
  const subject = getInputValueSubject(props);
  const { value, isDirty, error, isInvalid } = useInputState(props);

  return (
    <input
      value={value!}
      onChange={(e) => {
        const nextValue = e.target.value;
        const nextError = validateSingleField(props.name, nextValue);
        subject.next({
          error: isInvalid ? nextError : error,
          value: nextValue,
          isDirty: true,
        });
        onChange?.(e);
      }}
      onBlur={(e) => {
        subject.next({
          error: isDirty ? validateSingleField(props.name, value) : null,
          isFocused: false,
          isTouched: true,
        });
        onBlur?.(e);
      }}
      onFocus={(e) => {
        subject.next({ isFocused: true });
        onFocus?.(e);
      }}
      type="text"
      {...inputProps}
    />
  );
};

export const Checkbox = (
  props: ComponentProps<"input"> & {
    name: string;
    validate?: (value: any) => string | null;
  }
) => {
  const {
    validate = () => null,
    defaultValue: _,
    defaultChecked: __,
    onChange,
    onBlur,
    onFocus,
    type = "checkbox",
    ...inputProps
  } = props;
  const { getInputValueSubject, validateSingleField } = useContext(FormContext);
  const subject = getInputValueSubject({ ...props, type: "checkbox" });
  const { value, isDirty } = useInputState(props);

  return (
    <input
      checked={value!}
      onChange={(e) => {
        const nextValue = e.target.checked;
        subject.next({
          error: validateSingleField(props.name, nextValue),
          value: nextValue,
          isDirty: true,
        });
        onChange?.(e);
      }}
      onBlur={(e) => {
        subject.next({
          error: isDirty ? validateSingleField(props.name, value) : null,
          isFocused: false,
          isTouched: true,
        });
        onBlur?.(e);
      }}
      onFocus={(e) => {
        subject.next({ isFocused: true });
        onFocus?.(e);
      }}
      type="checkbox"
      {...inputProps}
    />
  );
};

function useInputError(name: string) {
  const { getInputValueSubjectByName } = useContext(FormContext);
  const subject = getInputValueSubjectByName(name);
  const state = useSyncExternalStore(
    subject.subscribe,
    subject.getState,
    subject.getState
  );
  return state.error;
}

export const ErrorMessage = (
  props: ComponentProps<"span"> & {
    name: string;
    render?: (error: string) => React.ReactNode;
  }
) => {
  const { name, render, ...spanProps } = props;
  const error = useInputError(props.name);
  if (error) {
    if (render) {
      return render(error);
    }
    return <span {...spanProps}>{error}</span>;
  }
  return null;
};

// TODO:
// - Make errors an array to show how many errors there are
