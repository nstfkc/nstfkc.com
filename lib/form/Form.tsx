import {
  ComponentProps,
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

class InputSubject {
  private state = {
    isDirty: false,
    isValid: true,
    value: null,
    error: null,
  };
  private subscribers: Set<any> = new Set();
  private validateFn: (value: any) => string | null;

  constructor(initialValue?: any, validateFn?: (value: any) => string | null) {
    this.validateFn = validateFn ?? (() => null);
    if (initialValue) {
      this.state = { ...this.state, value: initialValue };
    }
  }

  validate = (value: any) => {
    const error = this.validateFn(value);
    if (error) {
      this.next({
        value: this.state.value,
        isDirty: true,
        isValid: false,
        error,
      });
      return error;
    }
    return null;
  };

  setError = (error: string | null) => {
    this.next({
      ...this.state,
      error,
    });
  };

  setIsDirty = (isDirty: boolean) => {
    if (isDirty !== this.state.isDirty) {
      this.next({
        ...this.state,
        isDirty,
      });
    }
  };

  setIsValid = (isValid: boolean) => {
    if (isValid !== this.state.isValid) {
      this.next({
        ...this.state,
        isValid,
      });
    }
  };

  setValue = (value: any) => {
    if (value !== this.state.value) {
      this.next({
        ...this.state,
        value,
      });
    }
  };

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
    };
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };
}

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: (e: any, formState: any) => void;
}

interface FormContextValue {
  getInputValueSubject: (
    name: string,
    initialValue?: any,
    validateFn?: any
  ) => InputSubject;
}

const FormContext = createContext({} as FormContextValue);

export const Form = (props: FormProps) => {
  const { onSubmit, ...rest } = props;

  const subjectsRef = useRef<Map<string, InputSubject>>(new Map());

  const getInputValueSubject = (
    name: string,
    initialValue?: any,
    validateFn?: (value: any) => string | null
  ) => {
    if (!subjectsRef.current.has(name)) {
      subjectsRef.current.set(name, new InputSubject(initialValue, validateFn));
    }
    return subjectsRef.current.get(name)!;
  };

  const beforeSubmit = () => {
    let values: Record<string, any> = {};
    let errors: Record<string, any> = {};

    for (const [name, subject] of subjectsRef.current.entries()) {
      const state = subject.getState();
      errors[name] = subject.validate(state.value);
      values[name] = state.value;
    }

    return {
      errors,
      values,
    };
  };

  return (
    <FormContext.Provider value={{ getInputValueSubject }}>
      <form
        {...rest}
        onSubmit={(e) => {
          e.preventDefault();
          const { errors, values } = beforeSubmit();
          const hasErrors = Object.values(errors).some((error) => error);
          if (!hasErrors) {
            onSubmit(e, {});
          }
        }}
      />
    </FormContext.Provider>
  );
};

export function useInputState(props: ComponentProps<typeof Input>) {
  const { getInputValueSubject } = useContext(FormContext);
  const initialValue = props.value ?? props.defaultValue;
  const subject = getInputValueSubject(
    props.name,
    initialValue,
    props.validate
  );
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
  const { validate = () => null, ...inputProps } = props;
  const { error, isDirty, value } = useInputState(props);
  const { getInputValueSubject } = useContext(FormContext);
  const subject = getInputValueSubject(props.name);

  return (
    <input
      value={value ?? ""}
      onChange={(e) => {
        const nextValue = e.target.value;
        const error = validate(nextValue);
        subject.next({
          error,
          value: nextValue,
          isDirty,
        });
      }}
      onBlur={(e) => {
        const error = validate(e.target.value);
        const value = e.target.value;
        subject.next({
          error,
          isDirty: value !== "" || value !== null,
          value,
        });
      }}
      onFocus={() => {
        // focus
      }}
      type="text"
      {...inputProps}
    />
  );
};
