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
    const c = createPromise("C");

    const d = (async () => {
      await Promise.all([a, b]);
      await createPromise("D");
    })();

    const e = (async () => {
      await Promise.any([d, Promise.all([b, c])]);
      await createPromise("E");
    })();

    const f = (async () => {
      await Promise.all([b, c]);
      await createPromise("F");
    })();

    const g = (async () => {
      await Promise.any([b, Promise.all([a, c])]);
      await createPromise("G");
    })();

    await Promise.all([e, f, g]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");

    const d = Promise.all([a, b]).then(() => createPromise("D"));
    const e = Promise.any([d, Promise.all([b, c])]).then(() =>
      createPromise("E")
    );
    const f = Promise.all([b, c]).then(() => createPromise("F"));
    const g = Promise.any([b, Promise.all([a, c])]).then(() =>
      createPromise("G")
    );

    return Promise.all([e, f, g]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: (thenCatch),
};
