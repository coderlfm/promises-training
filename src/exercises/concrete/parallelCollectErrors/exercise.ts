type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results = await Promise.allSettled(
      list.map((item) => postData(item))
    );

    return {
      successes: (
        results.filter((item) => item.status === "fulfilled") as Array<
          PromiseSettledResult<string>
        >
      ).map((item) => item.value),
      errors: (
        results.filter((item) => item.status === "rejected") as Array<
          PromiseSettledResult<string>
        >
      ).map((item) => item.reason),
    };
  };
