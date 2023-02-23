// https://github.com/pmndrs/valtio/issues/327
import 'valtio';
declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
}
