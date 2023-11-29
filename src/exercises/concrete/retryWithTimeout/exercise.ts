type Context = {
  postData: (data: string) => Promise<string>;
  now: () => number;
};

export default ({ postData, now }: Context) =>
  async (data: string) => {
    const start = now();
    const errors: Array<unknown> = [];

    while (now() - start <= 2000) {
      try {
        const res = await postData(data);
        return res;
      } catch (error) {
        errors.push(error);
      }
    }

    throw errors;
  };
