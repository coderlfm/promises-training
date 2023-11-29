import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const first = async () => {
      await a;
      await createPromise("B");
      await createPromise("D");
    };

    const second = async () => {
      await a;
      await createPromise("C");
      await createPromise("E");
    };

    await Promise.all([first(), second()]);

    await createPromise("F");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = a.then(() => createPromise("B"));
    const d = b.then(() => createPromise("D"));

    const c = a.then(() => createPromise("C"));
    const e = c.then(() => createPromise("E"));

    return Promise.all([d, e]).then(() => createPromise("F"));
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
