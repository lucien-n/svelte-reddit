<script>
  import { Link } from "svelte-navigator";
  import { db } from "../firebase";
  import { Pulse } from "svelte-loading-spinners";

  export let post;
  export let user;

  async function getUsername() {
    const userDoc = await db.collection("users").doc(post.uid).get();
    const snapshot = userDoc.data();
    return snapshot.displayName;
  }

  async function votePost(vote) {
    db.collection("users")
      .doc(user.uid)
      .collection("votes")
      .doc(post.id)
      .set({ vote: vote });

    userVote = vote;

    const postDoc = await db.collection("posts").doc(post.id).get();
    const postDocSnapshot = postDoc.data();
    db.collection("posts")
      .doc(post.id)
      .update({
        votes: postDocSnapshot.votes + vote,
      });
  }

  async function getUserVote() {
    const userVoteDoc = await db
      .collection("users")
      .doc(user.uid)
      .collection("votes")
      .doc(post.id)
      .get();
    const userVoteDocSnapshot = userVoteDoc.data();
    return userVoteDocSnapshot.vote;
  }

  let username = getUsername();
  let userVote = getUserVote();
</script>

<div class="column is-four-fifths">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title" style="justify-content: space-between;">
        {post.title}
        {#await username}
          <i>fetching username</i>
        {:then name}
          <i style="font-weight: lighter;"><Link to="/u/{user.uid}">{name}</Link></i>
        {/await}
      </p>
    </div>
    <div class="card-content">
      <p>{post.content}</p>
    </div>
    <div class="card-footer">
      <div class="card-footer-item" style="flex-grow: 0; border: 0;">
        {#await userVote}
          <Pulse size="32" color="orange" unit="px" />
        {:then uVote}
          <button
            class="button"
            style="border: 0;"
            on:click={() => votePost(1)}
          >
            <span class="icon">
              <i
                class="far fa-circle-up"
                class:fas={uVote === 1 ? true : false}
              />
            </span>
          </button>
          <p>{post.votes}</p>
          <button
            class="button"
            style="border: 0;"
            on:click={() => votePost(-1)}
          >
            <span class="icon">
              <i
                class="far fa-circle-down"
                class:fas={uVote === -1 ? true : false}
              />
            </span>
          </button>
        {/await}
      </div>

      <Link
        to="/r/{post.sub}/{post.id}"
        class="card-footer-item"
        style="flex-grow: 0;"
      >
        <span class="icon">
          <i class="far fa-message" />
        </span>
      </Link>
    </div>
  </div>
</div>

<style>
  .fas {
    color: orange;
  }
</style>
