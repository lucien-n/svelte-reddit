<script>
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs";
  import { navigate } from "svelte-navigator";
  import { auth, db } from "../firebase";
  import PostPreview from "../post/PostPreview.svelte";

  export let user;
  export let target_uid;

  const query = db
    .collection("posts")
    .where("uid", "==", user.uid)
    .orderBy("created");

  const user_posts = collectionData(query, { idField: "id" }).pipe(
    startWith([])
  );

  async function getTargetData() {
    const doc = await db.collection("users").doc(target_uid).get();
    const snapshot = doc.data();
    return snapshot;
  }

  function formatDate(date_epoch) {
    let date = new Date(date_epoch);
    return date.toDateString();
  }

  let target = getTargetData();
</script>

<div class="column column is-four-fifths">
  <div class="card ">
    {#await target}
      <h1 style="text-align: center;">Fetching target user data</h1>
    {:then target}
      <div class="card-header">
        <div class="card-header-title" style="justify-content: space-between;">
          {target.displayName}

          {#if user.uid == target_uid}
            <button
              class="button is-danger is-outlined"
              on:click={() => {
                auth.signOut();
                navigate("/");
              }}>Logout</button
            >
          {/if}
        </div>
      </div>

      <div class="card-content">
        <p>Joined: {formatDate(target.created)}</p>
        <p>
          Total Karma: {target.karmaPost + target.karmaComment} ({target.karmaPost}
          post, {target.karmaComment} comment)
        </p>
      </div>
    {/await}
  </div>
  {#each $user_posts as post}
    <PostPreview {post} {user} />
  {/each}
</div>
