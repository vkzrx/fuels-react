type AsyncFaillable<T> = { failed: true; reason: unknown } | { failed: false; result: Awaited<T> };

export const asyncFaillable = async <T>(fn: Promise<T>): Promise<AsyncFaillable<T>> => {
  try {
    const result = await fn;
    return { failed: false, result };
  } catch (error) {
    return { failed: true, reason: error };
  }
};
