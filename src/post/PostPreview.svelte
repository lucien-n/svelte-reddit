<script>
  import { Link } from "svelte-navigator";
  import { db } from "../firebase";

  export let post;
  export let user;

  async function getUsername() {
    const userDoc = await db.collection("users").doc(post.uid).get();
    const snapshot = userDoc.data();
    return snapshot.displayName;
  }

  let username = getUsername();
</script>

<div class="column is-four-fifths">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title" style="justify-content: space-between;">
        {post.title}
        {#await username}
          <i>fetching username</i>
        {:then name}
          <i style="font-weight: lighter;">{name}</i>
        {/await}
      </p>
    </div>
    <div class="card-content">
      <p>{post.content}</p>
    </div>
    <div class="card-footer">
      <div class="card-footer-item" style="flex-grow: 0; border: 0;">
        <button class="button" style="border: 0;">
          <span class="icon">
            <i class="fas fa-up-long" />
          </span>
        </button>
        <p>{ post.upVotes - post.downVotes }</p>
        <button class="button" style="border: 0;">
          <span class="icon">
            <i class="fa-down-long" class:fas={downVote} />
          </span>
        </button>
      </div>

      <Link to="/r/{post.sub}/{post.id}" class="card-footer-item" style="flex-grow: 0;">
        <span class="icon">
          <i class="far fa-message" />
        </span>
      </Link>
    </div>
  </div>
</div>
