type Context = {
  firstStep: (data: string) => Promise<string>;
  secondStep: (data: string) => Promise<string>;
  thirdStep: (data: string) => Promise<string>;
};

export default ({ firstStep, secondStep, thirdStep }: Context) =>
  async (list: Array<string>) => {
    // const promises = list.map(item => {
    //   const run = () =>{
    //     return new Promise(async (resolve)  => {
    //         const fist = await firstStep(item);
    //         const second = await secondStep(fist);
    //         const third = await thirdStep(second);

    //         resolve(third)

    //         return null;
            
    //     })
    //   }
      
    //   return run 
    // })

    return await Promise.all(list.map(item => firstStep(item).then(secondStep).then(thirdStep)))
    
  };
