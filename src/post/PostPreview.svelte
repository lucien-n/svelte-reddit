<script>
  import { Link } from "svelte-navigator";
  import { db } from "../firebase";
  import { Pulse } from "svelte-loading-spinners";
  import { increment } from "firebase/firestore";

  export let post;
  export let user;

  let posterData = getPosterData();
  let userVote;
  if (user) userVote = getUserVote();

  async function getPosterData() {
    const userDoc = await db.collection("users").doc(post.uid).get();
    const userDocSnapshot = userDoc.data();
    return userDocSnapshot;
  }

  async function getUserVote() {
    const userDoc = await db
      .collection("users")
      .doc(user.uid)
      .collection("posts")
      .doc(post.id)
      .get();

    if (userDoc === undefined) {
      db.collection("users")
        .doc(user.uid)
        .collection("posts")
        .doc(post.id)
        .set({ vote: 0 });
    }

    const userDocSnapshot = userDoc.data();
    return userDocSnapshot === undefined ? 0 : userDocSnapshot.vote;
  }

  async function vote(vote) {
    // If user already voted the same vote
    if ((await userVote) == 1 && vote == 1) return;
    if ((await userVote) == -1 && vote == -1) return;

    // ex: user upvoted but now downvotes → removes the upvote and add a down vote so the post vote value is changing by two
    let voteValue;
    if ((await userVote) == 1 && vote == -1) voteValue = -2;
    else if ((await userVote) == -1 && vote == 1) voteValue = 2;
    else voteValue = vote;

    // Updating votes button
    userVote = vote;

    // Adding karma to the poster
    db.collection("users")
      .doc(post.uid)
      .update({ karmaPost: increment(voteValue) });

    // Registering vote on the user
    db.collection("users")
      .doc(user.uid)
      .collection("posts")
      .doc(post.id)
      .set({ vote: vote });

    // Adding vote to the post
    db.collection("posts")
      .doc(post.id)
      .update({ votes: increment(voteValue) });
  }

  function deletePost() {
    db.collection("posts").doc(post.id).delete();
  }
</script>

<div class="column is-four-fifths">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title" style="justify-content: space-between;">
        {post.title}
        {#await posterData}
          <Pulse size="40" color="orange" unit="px" />
        {:then data}
          <i style="font-weight: lighter;"
            ><Link to="/u/{data.uid}">{data.displayName}</Link></i
          >
        {/await}
      </p>
    </div>
    <div class="card-content">
      <p>{post.content}</p>
    </div>
    <div class="card-footer">
      {#if user}
        <div class="card-footer-item" style="flex-grow: 0; border: 0;">
          {#await userVote}
            <Pulse size="40" color="orange" unit="px" />
          {:then uVote}
            <button class="button" style="border: 0;" on:click={() => vote(+1)}>
              <span class="icon">
                <i
                  class="far fa-circle-up"
                  class:fas={uVote === 1 ? true : false}
                />
              </span>
            </button>

            <p>{post.votes}</p>

            <button class="button" style="border: 0;" on:click={() => vote(-1)}>
              <span class="icon">
                <i
                  class="far fa-circle-down"
                  class:fas={uVote === -1 ? true : false}
                />
              </span>
            </button>
          {/await}
        </div>
      {:else}
        <p class="card-footer-item">
          <Link to="login">Sign In</Link>&nbsp;to gain full acces to seddit.
        </p>
      {/if}
      <Link
        to="/r/{post.sub}/{post.id}"
        class="card-footer-item"
        style="flex-grow: 0;"
      >
        <span class="icon">
          <i class="far fa-message" />
        </span>
      </Link>
      {#if user && posterData.uid === user.uid}
        <button class="button is-danger card-footer-item" on:click={deletePost}>
          Delete
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .fas {
    color: orange;
  }
</style>
