import { Router } from "../../../lib/concreteExercise/Router";

type Context = {
  router: Router;
};

export default ({ router }: Context) =>
  async (url: string) => {
    return new Promise<void>((resolve, reject) => {
      const routeChangeComplete = () => {
        resolve();
        cleanAll();
      };
      const routeChangeError = () => {
        reject();
        cleanAll();
      };

      const cleanAll = () => {
        router.off("routeChangeComplete", routeChangeComplete);
        router.off("routeChangeError", routeChangeError);
      };

      router.on("routeChangeComplete", routeChangeComplete);
      router.on("routeChangeError", routeChangeError);

      router.push(url);
    });
  };
