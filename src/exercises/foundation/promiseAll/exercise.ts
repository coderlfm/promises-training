export default async <T>(promises: Array<Promise<T>>): Promise<Array<T>> => {
  const results: Array<T> = [];
  let successCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      item
        .then((res) => {
          results[index] = res;
          successCount++;
          if (successCount === promises.length) resolve(results);
        })
        .catch((error) => reject(error));
    });
  });
};
