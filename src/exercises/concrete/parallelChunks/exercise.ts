import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const group = chunk(list, 5) as Array<Array<string>>;
    const result: string[] = [];

    for (const slice of group) {
      const res = await Promise.all(slice.map((item) => postData(item)));
      result.push(...res)
    }

    return result;
  };
