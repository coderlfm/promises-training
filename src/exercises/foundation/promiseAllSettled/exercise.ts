export default async <T>(promises: Array<Promise<T>>) => {
  const results: Array<any> = [];
  let successCount = 0;

  return new Promise((resolve) => {
    promises.forEach((item, index) => {
      item
        .then((res) => {
          results[index] = { status: "fulfilled", value: res };
        })
        .catch((error) => {
          results[index] = { status: "rejected", reason: error };
        })
        .finally(() => {
          successCount++;
          if (successCount === promises.length) resolve(results);
        });
    });
  });
};
