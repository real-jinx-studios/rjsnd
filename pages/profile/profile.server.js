import Loader from "../../components/loader";
import React from "react";

export default function Profile({}) {
  return (
    <main>
      <section>
        <h1>no js apparently required</h1>
        <p>if page is set with server in its js name</p>
      </section>
      <aside>
        <p>you can also fetch data without get serverside props</p>
        {/* <Suspense
                fallback={
                    <div>loading shit</div>
                }
                >
                    <Loader/>
                </Suspense>*/}
      </aside>
    </main>
  );
}
