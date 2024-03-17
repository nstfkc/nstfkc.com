import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

class Observable {
  subscriber: () => { value: any; error: string | null } = () => ({
    value: null,
    error: null,
  });

  subscribe = (sub: () => { value: any; error: string | null }) => {
    this.subscriber = sub;
    return () => {
      this.subscriber = () => ({ error: null, value: null });
    };
  };

  next = () => {
    return this?.subscriber();
  };
}

class InputSubject {
  private state = {
    isDirty: false,
    value: null,
    error: null,
  };
  private subscribers: Set<any> = new Set();

  constructor(initialValue?: any) {
    if (initialValue) {
      this.state = { ...this.state, value: initialValue };
    }
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
  getObservables: (name: string) => Observable;
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

  const observablesRef = useRef<Map<string, Observable>>(new Map());

  const getInputValueSubject = (name: string, initialValue?: any) => {
    if (!subjectsRef.current.has(name)) {
      subjectsRef.current.set(name, new InputSubject(initialValue));
    }
    return subjectsRef.current.get(name)!;
  };

  const getObservables = (name: string) => {
    if (!observablesRef.current.has(name)) {
      observablesRef.current.set(name, new Observable());
    }
    return observablesRef.current.get(name)!;
  };

  const beforeSubmit = () => {
    let values: Record<string, any> = {};
    let errors: Record<string, any> = {};

    let cbs = [];
    for (const [name, observable] of observablesRef.current.entries()) {
      const { error, value } = observable.next();
      values[name] = value;
      errors[name] = error;
    }

    return {
      errors,
      values,
    };
  };

  return (
    <FormContext.Provider value={{ getInputValueSubject, getObservables }}>
      <form
        {...rest}
        onSubmit={async (e) => {
          e.preventDefault();
          const { errors, values } = await beforeSubmit();
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
  const { getInputValueSubject, getObservables } = useContext(FormContext);
  const subject = getInputValueSubject(props.name);
  const observable = getObservables(props.name);
  const { isDirty, value } = useInputState(props);

  const validateFn = useCallback(() => {
    const { value, isDirty } = subject.getState();
    const error = validate(value);
    subject.next({
      value,
      error,
      isDirty,
    });
    return {
      error,
      value,
    };
  }, [validate, subject]);

  useEffect(() => {
    return observable.subscribe(validateFn);
  }, [validateFn, observable]);

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
