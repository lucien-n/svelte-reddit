<script>
  import { increment } from "firebase/firestore";
  import { db } from "../firebase";

  export let user;

  let content;
  let title;

  async function submitPost() {
    const post = await db.collection("posts").add({
      title: title,
      content: content,
      votes: 1,
      sub: "seddit",
      uid: user.uid,
      created: Date.now(),
    });

    // Adding karma to the user
    db.collection("users").doc(user.uid).update({ karma: increment(1) })

    // Registering vote on the user
    db.collection("users").doc(user.uid).collection("posts").doc(post.id).set({ vote: 1 })
  }
</script>

<div class="column is-four-fifths">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">New Post</p>
    </div>
    <div class="card-content">
      <div class="field">
        <label for="title" class="label">Title</label>
        <div class="control">
          <input bind:value={title} type="text" class="input" id="title" />
        </div>
      </div>
      <div class="field">
        <label for="content" class="label">Content</label>
        <textarea
          bind:value={content}
          id="content"
          cols="30"
          rows="20"
          class="textarea"
        />
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" on:click={submitPost}>Post</button>
        </div>
      </div>
    </div>
  </div>
</div>
