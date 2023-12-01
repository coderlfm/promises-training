type Context = {
  fetchFirstData: (input: string) => Promise<string>;
  fetchSecondData: (input: string) => Promise<string>;
  setData: (data: string) => void;
};

export default ({ fetchFirstData, fetchSecondData, setData }: Context) => {
  let runid = 0;

  return async (input: string) => {
    runid++;
    
    const currentId = runid;

    const first = await fetchFirstData(input);

    if (runid !== currentId) return;

    const second = await fetchSecondData(first);

    if (runid !== currentId) return;

    setData(second);
  };
};
