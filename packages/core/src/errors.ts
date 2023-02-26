class ProviderNotDefined extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ProviderNotDefined.prototype);
  }
}

class UserWalletNotDefined extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UserWalletNotDefined.prototype);
  }
}

class UserAlreadyConnected extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UserAlreadyConnected.prototype);
  }
}

class UserAlreadyDisconnected extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UserAlreadyDisconnected.prototype);
  }
}

class AddressNotCorrect extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AddressNotCorrect.prototype);
  }
}

class ContractNotFound extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ContractNotFound.prototype);
  }
}

class TransactionIDNotCorrect extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AddressNotCorrect.prototype);
  }
}

class BlockNotFound extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BlockNotFound.prototype);
  }
}

class TransactionNotFound extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, TransactionNotFound.prototype);
  }
}

class TransactionRequestNotCorrect extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, TransactionRequestNotCorrect.prototype);
  }
}

export {
  AddressNotCorrect,
  BlockNotFound,
  ContractNotFound,
  ProviderNotDefined,
  TransactionIDNotCorrect,
  TransactionNotFound,
  TransactionRequestNotCorrect,
  UserAlreadyConnected,
  UserAlreadyDisconnected,
  UserWalletNotDefined,
};
