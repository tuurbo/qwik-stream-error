import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const fetchStuff = server$(async function () {
  await sleep(5000);

  return {
    success: true,
  };
});

export default component$(() => {
  useVisibleTask$(async () => {
    console.log("started fetch");
    await fetchStuff();
    console.log("ended fetch");
  });

  return (
    <>
      <p>Refresh the page before the 'fetchStuff' request completes.</p>
      <p>
        See{" "}
        <em>
          "Error [ERR_STREAM_DESTROYED]: Cannot call write after a stream was
          destroyed"
        </em>{" "}
        in server console.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
