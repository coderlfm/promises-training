export default async <T>(promises: Array<Promise<T>>): Promise<T> => {
  const errors: Array<string> = [];
  let errorCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      item.then(resolve).catch((error) => {
        errors[index] = error;
        errorCount++;
        if (errorCount === promises.length) reject(errors);
      });
    });
  });
};
