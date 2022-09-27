<script>
  import { auth, db } from "../firebase";

  export let user;
  export let target_uid;

  async function getTargetData() {
    const doc = await db.collection("users").doc(target_uid).get();
    const snapshot = doc.data();
    return snapshot;
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
              }}>Logout</button
            >
          {/if}
        </div>
      </div>

      <div class="card-content">
        <p>Joined the: { target.created }</p>
      </div>
    {/await}
  </div>
</div>
