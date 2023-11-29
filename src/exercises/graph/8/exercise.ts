import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const first = async () => {
      await createPromise("A");

      await Promise.all([createPromise("B"), createPromise("C")]);

      await createPromise("D");
    };

    const second = async () => {
      await createPromise("E");

      await Promise.all([createPromise("F"), createPromise("G")]);

      await createPromise("H");
    };

    await Promise.all([first(), second()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const d = createPromise("A")
      .then(() => Promise.all([createPromise("B"), createPromise("C")]))
      .then(() => createPromise("D"));

    const h = createPromise("E")
      .then(() => Promise.all([createPromise("F"), createPromise("G")]))
      .then(() => createPromise("H"));

    return Promise.all([d, h]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
