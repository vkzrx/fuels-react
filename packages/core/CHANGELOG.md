# fuels-react

## 0.2.2

### Patch Changes

- 8c57a2e: Minor: change default `QueryClient` config

## 0.2.1

### Patch Changes

- 6f30d29: Fix: useSignMessage -> pass message to config
- 2dc3003: Add `localhost` support
- 8b305b7: Minor fix: set back user status to `connected` if disconnecting has failed

## 0.2.0

### Minor Changes

- e836efd: feat: add new hooks

  - useCoins()
  - useSendTransaction()
  - useMessages()

  Update the documentation

### Patch Changes

- c21b5cc: Fix: Incorrect `block` return data

## 0.1.8

### Patch Changes

- 1cc9e6c: feat: Make `types` more intuitive

  - `BN` -> `string`
  - Add missing `onSuccess` and `onError` callbacks
  - Allow to pass `null` as transaction request to useTransactionCost()

## 0.1.7

### Patch Changes

- cfd287b: Unify `queries` and `mutations`

  - Move out `transfer` from `useWallet` to `useTransfer`
  - Move out `signMessage` from `useWallet` to `useSignMessage`

## 0.1.6

### Patch Changes

- 779ad05: Fix `Fuel` loading and add `peerDependencies`

## 0.1.5

### Patch Changes

- fefc5d2: Another attempt to fix module resolution...

## 0.1.4

### Patch Changes

- beb2c3e: Attempt to fix module resolution

## 0.1.3

### Patch Changes

- 1a25628: Another attempt to fix module resolution

## 0.1.2

### Patch Changes

- 185c719: Attempt to fix `build` module resolution

## 0.1.1

### Patch Changes

- 24ac407: Fix `build` module resolution

## 0.1.0

### Minor Changes

- f855f7f: First release!
