type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const res = [];
    for (const item of list) {
       res.push(await postData(item))
    }
    return res;
  };
