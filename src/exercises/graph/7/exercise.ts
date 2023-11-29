import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const first = async () => {
      await a;
      await createPromise("C");
      await b;
      await createPromise("E");
    };

    const second = async () => {
      await Promise.all([a, b]);
      await createPromise("D");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = a.then(() => createPromise("C"));
    const e = Promise.all([c, b]).then(() => createPromise("E"));

    const d = Promise.all([a, b]).then(() => createPromise("D"));

    return Promise.all([e, d]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
