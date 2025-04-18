import React, { createContext, useContext, PropsWithChildren } from 'react';

type Constructable<T = any> = new (...args: any[]) => T
type Token<T = any> = Constructable<T> | symbol;
type Contract = <T>(token: Token<T>) => T;
function defaultValue<T>() { return {} as T }
const Context = createContext<Contract>(defaultValue);
export function useInjection<T>(token: Token<T>): T {
  return useContext(Context)<T>(token);
}
interface Container {
  resolve<T>(token: Token<T>): T
}
interface Props {
  container: Container
}
export function InjectionProvider({ container, children }: PropsWithChildren<Props>): React.JSX.Element {
  return (
    <Context.Provider value={container.resolve.bind(container)}>
      {children}
    </Context.Provider>
  )
}