import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
      try {
        await createPromise("B");
      } catch {}
    } catch {
      try {
        await createPromise("C");
      } catch {
      } finally {
        await createPromise("D");
      }
    }
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));

    const d = a.catch(() =>
      createPromise("C").finally(() => createPromise("D"))
    );

    return Promise.all([b, d]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
