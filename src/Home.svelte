<script>
  import { db } from "./firebase";
  import PostPreview from "./post/PostPreview.svelte";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let sub;
  export let user;

  const query = db.collection("posts").where("sub", "==", sub).orderBy("votes");
  const posts_promise = () => {
    return collectionData(query, { idField: "id" }).pipe(startWith([]));
  };
</script>

<div class="container">
  <div class="tile is-ancestor">
    <div class="tile is-9 is-vertical is-parent">
      {#await posts_promise}
        <h1>Fetching posts</h1>
      {:then posts}
        {#each posts as post}
          <div class="tile is-child">
            <PostPreview {post} {user} />
          </div>
        {/each}
      {/await}
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <strong><p class="title">{sub}</p></strong>
        <hr />
        <p class="title">Info</p>
        <p>Seddit est un remake de reddit en svelte.</p>
        <p>
          Il utilise firebase pour l'authentification et le stockage des
          données.
        </p>
        <br />
        <p>
          <i><a class="link" href="https://github.com/Scaffus">Github</a></i>
        </p>
      </div>
    </div>
  </div>
</div>
