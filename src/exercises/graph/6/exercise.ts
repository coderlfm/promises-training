import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const c = createPromise("C");

    const first = async () => {
      await Promise.all([createPromise("B"), c]);
      await createPromise("E");
    };

    const second = async () => {
      await Promise.all([createPromise("D"), c]);
      await createPromise("F");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = a.then(() => createPromise("D"));

    const e = Promise.all([b, c]).then(() => createPromise("E"));
    const f = Promise.all([d, c]).then(() => createPromise("F"));

    return Promise.all([e, f]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
