<script>
  import { db } from "./firebase";
  import PostPreview from "./post/PostPreview.svelte";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let user;

  const query = db.collection("posts").orderBy("votes");
  const posts = collectionData(query, { idField: "id" }).pipe(startWith([]));
</script>

<div class="container">
<div class="tile is-ancestor">
  <div class="tile is-9 is-vertical is-parent">
    {#each $posts as post}
      <div class="tile is-child">
        <PostPreview {post} {user} />
      </div>
    {/each}
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">Info</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
        veritatis quam
      </p>
      <p>
        odio accusamus consequatur itaque rerum sequi libero facere corrupti,
        autem
      </p>
      <p>labore nam cumque, totam commodi quos earum ut voluptatibus.</p>
    </div>
  </div>
</div>
</div>