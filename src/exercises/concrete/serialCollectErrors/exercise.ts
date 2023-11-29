type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const successes: string[] = [];
    const errors: unknown[] = [];

    for (const item of list) {
      try {
        successes.push(await postData(item));
      } catch (error) {
        errors.push(error);
      }
    }

    return { successes, errors };
  };
